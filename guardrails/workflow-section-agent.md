# EdDesk Workflow: Section Binding Agent
# Version: 2.0
# Trigger: prompts/bind-section-quick.md
#
# PREREQUISITE: guardrails/template-props/[template_id].md must exist.
# If it doesn't → run prompts/discover-template-props.md first.
#
# ONE section per agent run. No exceptions. No scope expansion.
# ─────────────────────────────────────────────────────────────────────

## Phase 0 — Agent Self-Check

Read these files before doing anything:
  1. guardrails/guardrails.md
  2. guardrails/template-props/[TEMPLATE_ID].md   ← MUST exist
  3. guardrails/skills/section-data-binding.md
  4. guardrails/skills/local-dummy-data.md
  5. src/core/constants/reference.js

If guardrails/template-props/[TEMPLATE_ID].md does not exist:
  → STOP. Tell user: "Run discover-template-props.md first."
  → Do NOT proceed. Do NOT read template files as a substitute.

Agent declares scope:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION BINDING AGENT — START
Section:   [SECTION_KEY]
Template:  [TEMPLATE_ID]
Props from: guardrails/template-props/[TEMPLATE_ID].md
Templates:  READ ONLY (will not open for this run)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Valid SECTION_KEY values:
  hero | announcements | stats | academic_results | achievements |
  principal | faculty | facilities | gallery | events | admissions | identity

If SECTION_KEY is not in the list → STOP, report invalid section.

---

## Phase 1 — Identify Allowed Files

Files agent may WRITE to this run (max 3):
  - src/core/data/local/tenant.data.js
  - src/core/viewmodels/home.viewmodel.ts
  - src/core/viewmodels/hero.viewmodel.ts   (only if section = hero)

Files agent may READ (never write):
  - guardrails/template-props/[TEMPLATE_ID].md
  - src/core/constants/reference.js
  - src/templates/[TEMPLATE_ID]/  ← read only if template-props file is unclear

Files agent may NEVER touch:
  - Any template JSX or CSS file (for writing)
  - Any file outside src/core/

---

## Phase 2 — Read Template Contract

Open: guardrails/template-props/[TEMPLATE_ID].md
Find the row for [SECTION_KEY] in the Section Prop Map table.

Extract:
```
Template prop name:  [from table]
Type:                [from table]
Required:            [yes/no]
Notes:               [any special shape]
```

If the section is listed under "Sections Not Present":
  → STOP. This section doesn't exist in this template. Report to user.

---

## Phase 3 — Read ViewModel Output

Open: src/core/viewmodels/home.viewmodel.ts
Find the output interface for [SECTION_KEY].

Section → ViewModel interface map:
  hero             → HeroSectionProps       (from hero.viewmodel.ts)
  announcements    → AnnouncementsSectionProps
  stats            → StatsSectionProps
  academic_results → AcademicResultsSectionProps
  achievements     → AchievementsSectionProps
  principal        → PrincipalSectionProps
  faculty          → FacultySectionProps
  facilities       → FacilitiesSectionProps
  gallery          → GallerySectionProps
  events           → EventsSectionProps
  admissions       → AdmissionsSectionProps
  identity         → IdentitySectionProps

Extract current ViewModel output key and shape.

---

## Phase 4 — Alignment Check

Compare Phase 2 (template expects) vs Phase 3 (ViewModel outputs).

For each prop:
  ✅ MATCH   — names and types align, no change needed
  ⚠️ RENAME  — ViewModel key name differs, rename in ViewModel only
  ❌ MISSING — ViewModel doesn't produce this prop yet, must add it

Rules:
  ✅ → proceed
  ⚠️ → fix ViewModel output key name, never touch template
  ❌ → check tenant.data.js has the data, then add to ViewModel

STOP if:
  - Template prop requires data not in the DB schema
  - Fixing requires editing template JSX
  - Nested shape is unclear → ask user, do not guess

---

## Phase 5 — Dummy Data Check

Open: src/core/data/local/tenant.data.js

Section → data key:
  hero             → hero_media[]
  announcements    → announcements[]
  stats            → campus_statistics[]
  academic_results → academic_results[]
  achievements     → achievements[]
  principal        → personnel[] where person_type='principal'
  faculty          → personnel[] where person_type='faculty'
  facilities       → facility_categories[] + facilities[]
  gallery          → media_library[]
  events           → events[]
  admissions       → admission_steps[]
  identity         → school_identity{}

Check:
  - [ ] Key exists in LOCAL_TENANT_DATA
  - [ ] Has at least 2 realistic records
  - [ ] All field names match reference.js constants

If missing → add data following local-dummy-data.md rules.

---

## Phase 6 — Section Enable Check

In tenant.data.js → sections[]:
  - [ ] Entry exists for this section_key
  - [ ] is_enabled: true
  - [ ] display_order is set

If missing or disabled → fix it, document the change.

---

## Phase 7 — Dry Run Trace

Trace end-to-end before writing any code:

```
tenant.data.js → [data key for section]
  ↓ getTenantData()           core/data/index.js
  ↓ prepareHomePageProps()    home.viewmodel.ts
  ↓ homePageProps.[section]
  ↓ <TemplateHome {...homePageProps} />
  ↓ template receives prop: [template prop name from Phase 2]
  ↓ section renders with dummy data ✅
```

If trace breaks → fix that step, re-trace. Do not write code until clean.

---

## Phase 8 — Make Changes

Only in these files:
  - tenant.data.js (data missing or wrong field names)
  - home.viewmodel.ts (output key mismatch or missing mapping)
  - hero.viewmodel.ts (hero section only)

Document every change:
```
File:    [path]
Change:  [what]
Reason:  [why — must reference Phase 4 finding]
```

---

## Phase 9 — Final Validation

  - [ ] No template file was written to
  - [ ] No template JSX changed
  - [ ] No CSS touched
  - [ ] All field names in tenant.data.js match reference.js
  - [ ] ViewModel output key matches template prop name from template-props.md
  - [ ] section is_enabled: true
  - [ ] Dry run trace is clean

---

## Phase 10 — Report

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION BINDING REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section:             [SECTION_KEY]
Template:            [TEMPLATE_ID]
Props source:        guardrails/template-props/[TEMPLATE_ID].md
Status:              ✅ COMPLETE  /  ⚠️ BLOCKED

Files changed:
  [file]             [what changed]

ViewModel key:       [key in homePageProps]
Template prop:       [prop name from template-props.md]
Dummy data key:      [key in tenant.data.js]
Section enabled:     YES

Template modified:   NO
Guardrails violated: NONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
