CREATE OR REPLACE FUNCTION get_screen_data(
    p_domain TEXT,
    p_screen_slug TEXT DEFAULT 'home',
    p_template_slug TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_schoolkey UUID;
    v_templatekey UUID;
    v_screenkey UUID;

    v_component_key UUID;
    v_component_code TEXT;
    v_datasource TEXT;
    v_variant TEXT;
    v_itemcount INT;
    v_filters JSONB;
    v_group TEXT;
    v_groupmode TEXT;
    v_selectionmethod TEXT;

    v_query TEXT;
    v_filter_sql TEXT := '';
    v_custom_filter TEXT := '';        -- FIX: separate accumulator for custom filter conditions
    v_component_data JSONB;

    v_data JSONB := '{}'::jsonb;

    v_school JSONB;
    v_subscription JSONB;
    v_plan JSONB;

    v_component_variants JSONB := '{}'::jsonb;

    v_filter_key TEXT;
    v_filter_value TEXT;
    v_operator TEXT;
    v_logic TEXT;
    v_condition_sql TEXT;
    v_in_values TEXT;

BEGIN

--------------------------------------------------
-- 1️⃣ Parameter Validation
--------------------------------------------------
IF p_domain IS NULL OR p_screen_slug IS NULL THEN
    RETURN jsonb_build_object('error', 'Invalid parameters');
END IF;

--------------------------------------------------
-- 2️⃣ LIVE MODE
--------------------------------------------------
IF p_template_slug IS NULL THEN

    SELECT key, templatekey, componentvariants
    INTO v_schoolkey, v_templatekey, v_component_variants
    FROM schools
    WHERE customdomain = p_domain
      AND isactive = true
      AND (isdemo IS NULL OR isdemo = false)
    LIMIT 1;

    IF v_schoolkey IS NULL THEN
        RETURN jsonb_build_object('error', 'School not found');
    END IF;

--------------------------------------------------
-- 3️⃣ DEMO MODE
--------------------------------------------------
ELSE

    SELECT key
    INTO v_templatekey
    FROM templates
    WHERE templateslug = p_template_slug
      AND isactive = true
    LIMIT 1;

    IF v_templatekey IS NULL THEN
        RETURN jsonb_build_object('error', 'Template not found');
    END IF;

    SELECT key, componentvariants
    INTO v_schoolkey, v_component_variants
    FROM schools
    WHERE customdomain = p_domain
      AND isdemo = true
      AND isactive = true
    LIMIT 1;

END IF;

--------------------------------------------------
-- 4️⃣ Load School
--------------------------------------------------
SELECT to_jsonb(s)
INTO v_school
FROM schools s
WHERE s.key = v_schoolkey;

--------------------------------------------------
-- 5️⃣ Load Subscription + Plan
--------------------------------------------------
SELECT to_jsonb(sub), to_jsonb(p)
INTO v_subscription, v_plan
FROM subscriptions sub
JOIN plans p ON p.key = sub.plankey
WHERE sub.schoolkey = v_schoolkey
LIMIT 1;

--------------------------------------------------
-- 6️⃣ Resolve Screen
--------------------------------------------------
SELECT key
INTO v_screenkey
FROM templatescreens
WHERE templatekey = v_templatekey
  AND screenslug = p_screen_slug
  AND isactive = true
LIMIT 1;

--------------------------------------------------
-- 7️⃣ Component Loop
--------------------------------------------------
FOR
    v_component_key,
    v_component_code,
    v_datasource,
    v_variant,
    v_itemcount,
    v_filters,
    v_group,
    v_groupmode,
    v_selectionmethod
IN
    SELECT
        tc.key,
        cr.componentcode,
        -- FIX 1: Normalize legacy table names transparently
        CASE cr.tablename
            WHEN 'hero'      THEN 'herocontent'
            WHEN 'broadcast' THEN 'broadcastcontent'
            ELSE cr.tablename
        END,
        tc.config->>'variant',
        COALESCE((tc.config->>'itemcount')::int, 100),
        tc.config->'filters',
        tc.config->>'group',
        tc.config->>'groupmode',
        tc.config->>'selectionmethod'
    FROM templatecomponents tc
    JOIN componentregistry cr
      ON cr.key = tc.componentregistrykey
    WHERE tc.templatescreenkey = v_screenkey
      AND tc.isactive = true
    ORDER BY tc.displayorder
LOOP

--------------------------------------------------
-- Exclusive Hero Variant (Home only)
--------------------------------------------------
IF v_groupmode = 'exclusive'
   AND v_group = 'hero'
   AND p_screen_slug = 'home'
THEN
    IF v_component_variants ? v_group THEN
        IF v_variant IS DISTINCT FROM v_component_variants->>v_group THEN
            CONTINUE;
        END IF;
    END IF;
END IF;

--------------------------------------------------
-- MANUAL CONTENT SELECTION
--------------------------------------------------
IF v_selectionmethod = 'manual' THEN

    v_query := format(
        'SELECT COALESCE(jsonb_agg(
            to_jsonb(t) || jsonb_build_object(''componentkey'', %L)
            ORDER BY cp.displayorder
        ), ''[]''::jsonb)
        FROM componentplacement cp
        JOIN %I t ON t.key = cp.contentkey
        WHERE cp.templatecomponentkey = %L
          AND cp.schoolkey = %L
          AND cp.isactive = true',
        v_component_key::text,
        v_datasource,
        v_component_key,
        v_schoolkey
    );

    EXECUTE v_query INTO v_component_data;

--------------------------------------------------
-- AUTO CONTENT SELECTION
--------------------------------------------------
ELSE

    -- Reset both filter accumulators
    v_filter_sql    := '';
    v_custom_filter := '';

    -- FIX 2: Screen-scoped tables must filter by screenslug
    -- This is separate from custom filters to avoid parenthesis imbalance
    IF v_datasource IN ('herocontent', 'broadcastcontent') THEN
        v_filter_sql := format(' AND screenslug = %L', p_screen_slug);
    END IF;

    -- Build custom filter group (accumulated separately, then wrapped in parens)
    IF v_filters IS NOT NULL THEN

        v_logic := COALESCE(v_filters->>'logic', 'AND');

        FOR v_filter_key, v_filter_value, v_operator IN
            SELECT
                cond->>'field',
                cond->>'value',
                lower(cond->>'operator')
            FROM jsonb_array_elements(v_filters->'conditions') cond
        LOOP

            v_condition_sql := '';

            IF v_operator = 'equals' THEN
                v_condition_sql := format('LOWER(%I) = LOWER(%L)', v_filter_key, v_filter_value);

            ELSIF v_operator = 'notequals' THEN
                v_condition_sql := format('LOWER(%I) <> LOWER(%L)', v_filter_key, v_filter_value);

            ELSIF v_operator = 'contains' THEN
                v_condition_sql := format('LOWER(%I) LIKE LOWER(%L)', v_filter_key, '%' || v_filter_value || '%');

            ELSIF v_operator = 'startswith' THEN
                v_condition_sql := format('LOWER(%I) LIKE LOWER(%L)', v_filter_key, v_filter_value || '%');

            ELSIF v_operator = 'endswith' THEN
                v_condition_sql := format('LOWER(%I) LIKE LOWER(%L)', v_filter_key, '%' || v_filter_value);

            ELSIF v_operator = 'in' THEN

                SELECT string_agg(quote_literal(lower(value)), ',')
                INTO v_in_values
                FROM jsonb_array_elements_text(cond->'value');

                v_condition_sql := format('LOWER(%I) IN (%s)', v_filter_key, v_in_values);

            END IF;

            -- Accumulate into v_custom_filter (NOT v_filter_sql)
            IF v_custom_filter = '' THEN
                v_custom_filter := v_condition_sql;
            ELSE
                v_custom_filter := v_custom_filter || ' ' || v_logic || ' ' || v_condition_sql;
            END IF;

        END LOOP;

        -- Append custom filter group as a balanced parenthesised block
        IF v_custom_filter <> '' THEN
            v_filter_sql := v_filter_sql || ' AND (' || v_custom_filter || ')';
        END IF;

    END IF;

    v_query := format(
        'SELECT COALESCE(jsonb_agg(
            to_jsonb(t) || jsonb_build_object(''componentkey'', %L)
        ), ''[]''::jsonb)
        FROM (
            SELECT *
            FROM %I
            WHERE schoolkey = $1
              AND isactive = true
              %s
            LIMIT %s
        ) t',
        v_component_key::text,
        v_datasource,
        v_filter_sql,
        v_itemcount
    );

    EXECUTE v_query INTO v_component_data USING v_schoolkey;

END IF;

--------------------------------------------------
-- Handle merged groups
--------------------------------------------------
IF v_groupmode = 'merged' THEN

    v_data := jsonb_set(
        v_data,
        ARRAY[v_component_code],
        COALESCE(v_data->v_component_code, '[]'::jsonb) || v_component_data,
        true
    );

ELSE

    v_data := jsonb_set(
        v_data,
        ARRAY[v_component_code],
        v_component_data,
        true
    );

END IF;

END LOOP;

--------------------------------------------------
-- 8️⃣ Add Template Components Metadata
--------------------------------------------------
v_data := v_data || jsonb_build_object(
    'templatecomponents',
    (
        SELECT jsonb_agg(
            to_jsonb(tc) ||
            jsonb_build_object(
                'componentcode', cr.componentcode,
                'componentname', cr.componentname,
                'tablename',     cr.tablename
            )
            ORDER BY tc.displayorder
        )
        FROM templatecomponents tc
        JOIN componentregistry cr ON cr.key = tc.componentregistrykey
        WHERE tc.templatescreenkey = v_screenkey
          AND tc.isactive = true
    )
);

--------------------------------------------------
-- 9️⃣ Final Response
--------------------------------------------------
RETURN jsonb_build_object(
    'mode',         CASE WHEN p_template_slug IS NULL THEN 'live' ELSE 'demo' END,
    'screen',       p_screen_slug,
    'school',       v_school,
    'subscription', v_subscription,
    'plan',         v_plan,
    'data',         v_data
);

END;
$$;
