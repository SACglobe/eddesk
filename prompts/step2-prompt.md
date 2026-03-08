# EdDesk — Phase 1, Step 2
# Rewrite src/core/services/screenData.service.ts
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files in order:
  1. src/core/services/screenData.service.ts       ← file you will rewrite
  2. src/core/services/tenantApi.service.ts         ← has TenantApiResult type used by callers
  3. src/app/tenant/[[...path]]/page.tsx            ← calls fetchScreenData, uses result
  4. src/app/demo/[templateSlug]/[[...path]]/page.tsx ← calls fetchScreenData, uses result
  5. src/lib/supabase.ts                            ← createServerSupabaseClient pattern

Do not write a single line until you have read all five.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHY THIS REWRITE IS NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Supabase RPC get_screen_data returns this structure:

  [                                      ← outer array, always 1 item
    {
      "get_screen_data": {               ← wrapper key
        "mode": "demo" | "live",
        "screen": "home",
        "school": { ...single object },
        "subscription": { ...single object },
        "plan": { ...single object, graceperiod: 7 },
        "data": {
          "hero":              [ ...rows ],
          "broadcast":         [ ...rows ],
          "faculty":           [ ...rows ],
          "leadership":        [ ...rows ],
          "schoolstats":       [ ...rows ],
          "achievements":      [ ...rows ],
          "events":            [ ...rows ],
          "gallery":           [ ...rows ],
          "activities":        [ ...rows ],
          "infrastructure":    [ ...rows ],
          "templatecomponents":[ ...rows ],
          "academicresults":   { ...single object },
          "contactdetails":    { ...single object }
        }
      }
    }
  ]

The current code does NOT unwrap this correctly.
It treats the response as a flat array of row objects, which is wrong.
The result is that buildTenantViewModel receives the wrong input
and returns empty data for every field.

This rewrite fixes the unwrapping and defines the correct types.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/core/services/screenData.service.ts   ← ONLY this file

Do NOT touch any other file in this step.
tenant/page.tsx and demo/page.tsx are updated in Step 6.
tenant.viewmodel.ts is updated in Step 3.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Q1. What does the current code do with the raw Supabase response?
      Does it unwrap response[0].get_screen_data? Yes / No

  Q2. What type does fetchScreenData currently return?
      (Check the return type annotation)

  Q3. What do tenant/page.tsx and demo/page.tsx expect from fetchScreenData?
      Specifically: what does result.status and result.data look like
      when they call buildTenantViewModel(result.data)?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — EXACT CODE TO WRITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the entire contents of screenData.service.ts with the following.
Copy exactly — do not paraphrase or restructure.

─────────────────────────────────────────────────────────────
FILE: src/core/services/screenData.service.ts
─────────────────────────────────────────────────────────────

/**
 * screenData.service.ts
 * SSR-ONLY. Never import this in client components or templates.
 *
 * Calls get_screen_data RPC and correctly unwraps the response.
 *
 * RPC response shape:
 *   response[0].get_screen_data = { mode, screen, school, subscription, plan, data }
 *
 * Calling conventions:
 *   Tenant home:   fetchTenantScreen('school.com', 'home')
 *   Tenant about:  fetchTenantScreen('school.com', 'about')
 *   Demo home:     fetchDemoScreen('template_classic', 'home')
 *   Demo about:    fetchDemoScreen('template_classic', 'about')
 *
 * Caching:
 *   Tenant routes → cached 60 seconds (reduces Supabase usage)
 *   Demo routes   → NO cache (marketing team needs instant updates)
 */

import { unstable_cache } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEMO_DOMAIN = 'eddesk.in';
const TENANT_CACHE_TTL = 60; // seconds

// ─── Types ────────────────────────────────────────────────────────────────────

/** The data section of the RPC response — one key per table */
export type ScreenDataTables = {
    hero?:               Record<string, unknown>[];
    broadcast?:          Record<string, unknown>[];
    faculty?:            Record<string, unknown>[];
    leadership?:         Record<string, unknown>[];
    schoolstats?:        Record<string, unknown>[];
    achievements?:       Record<string, unknown>[];
    events?:             Record<string, unknown>[];
    gallery?:            Record<string, unknown>[];
    activities?:         Record<string, unknown>[];
    infrastructure?:     Record<string, unknown>[];
    templatecomponents?: Record<string, unknown>[];
    academicresults?:    Record<string, unknown> | null;
    contactdetails?:     Record<string, unknown> | null;
};

/** The full unwrapped payload from get_screen_data */
export type ScreenDataPayload = {
    mode:         'demo' | 'live';
    screen:       string;
    school:       Record<string, unknown>;
    subscription: Record<string, unknown>;
    plan:         Record<string, unknown>;
    data:         ScreenDataTables;
};

/** Result returned by fetchTenantScreen and fetchDemoScreen */
export type ScreenDataResult =
    | { status: 'success'; payload: ScreenDataPayload }
    | { status: 'empty';   message: string }
    | { status: 'error';   error: string };

// ─── Path helper ──────────────────────────────────────────────────────────────

/**
 * Convert a URL path to a screen name for the RPC p_screen parameter.
 *   '/'        → 'home'
 *   '/about'   → 'about'
 *   '/faculty' → 'faculty'
 */
export function pathToScreenName(path: string): string {
    const segment = path.replace(/^\//, '').split('/')[0];
    return segment || 'home';
}

/**
 * Normalize a host header for use as a domain.
 * Strips www. prefix. Keeps port intact (required for localhost:3001).
 *   'www.school.com' → 'school.com'
 *   'localhost:3001' → 'localhost:3001'
 */
export function normalizeDomain(host: string): string {
    return host.toLowerCase().replace(/^www\./, '');
}

// ─── Core RPC caller ──────────────────────────────────────────────────────────

/**
 * Raw RPC call — shared by both tenant and demo paths.
 * Returns the unwrapped ScreenDataPayload or a typed error/empty result.
 */
async function callRPC(
    domain: string,
    screen: string,
    templateSlug: string | null
): Promise<ScreenDataResult> {
    try {
        const supabase = await createServerSupabaseClient();

        console.log('[screenData] RPC call →', { domain, screen, templateSlug });

        const { data: raw, error } = await supabase.rpc('get_screen_data', {
            p_domain:      domain,
            p_screen:      screen,
            p_templateslug: templateSlug,
        });

        // ── Supabase-level error ───────────────────────────────────────────────
        if (error) {
            console.error('[screenData] RPC error:', error.message);
            return { status: 'error', error: error.message };
        }

        // ── Empty response ─────────────────────────────────────────────────────
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
            console.warn('[screenData] RPC returned empty response', { domain, screen });
            return {
                status: 'empty',
                message: `No data returned for domain="${domain}" screen="${screen}"`,
            };
        }

        // ── Unwrap response[0].get_screen_data ────────────────────────────────
        const payload: ScreenDataPayload = raw[0]?.get_screen_data;

        if (!payload) {
            console.error('[screenData] Could not unwrap get_screen_data from response');
            return {
                status: 'error',
                error: 'Unexpected response shape from get_screen_data RPC',
            };
        }

        if (!payload.data) {
            console.warn('[screenData] payload.data is empty', { domain, screen });
            return {
                status: 'empty',
                message: `School data is empty for domain="${domain}" screen="${screen}"`,
            };
        }

        console.log('[screenData] Success →', {
            mode:   payload.mode,
            screen: payload.screen,
            school: payload.school?.name,
            tables: Object.keys(payload.data),
        });

        return { status: 'success', payload };

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        console.error('[screenData] Unexpected error:', message);
        return { status: 'error', error: message };
    }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch screen data for a TENANT domain.
 * Result is cached for 60 seconds per domain+screen combination.
 * templateSlug is always null — comes from schools.templateslug in the DB.
 */
export async function fetchTenantScreen(
    domain: string,
    screen: string
): Promise<ScreenDataResult> {
    const cachedFetch = unstable_cache(
        () => callRPC(domain, screen, null),
        [`screen-data-${domain}-${screen}`],
        { revalidate: TENANT_CACHE_TTL }
    );
    return cachedFetch();
}

/**
 * Fetch screen data for a DEMO route.
 * NO cache — marketing team needs changes to reflect instantly.
 * Domain is always DEMO_DOMAIN ('eddesk.in').
 */
export async function fetchDemoScreen(
    templateSlug: string,
    screen: string
): Promise<ScreenDataResult> {
    return callRPC(DEMO_DOMAIN, screen, templateSlug);
}

// ─── Legacy export (kept for backward compatibility during migration) ──────────
// tenant/page.tsx and demo/page.tsx still call fetchScreenData.
// This shim lets them continue to work until Step 6 updates those files.
// DELETE this shim after Step 6 is complete.

/** @deprecated Use fetchTenantScreen or fetchDemoScreen instead */
export async function fetchScreenData(
    domain: string,
    screenName: string,
    templateSlug: string | null
): Promise<ScreenDataResult> {
    if (templateSlug !== null) {
        return fetchDemoScreen(templateSlug, screenName);
    }
    return fetchTenantScreen(domain, screenName);
}

─────────────────────────────────────────────────────────────
END OF FILE CONTENT
─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — IMPORTANT NOTES ON THE LEGACY SHIM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The legacy fetchScreenData shim at the bottom serves one purpose:
tenant/page.tsx and demo/page.tsx currently call fetchScreenData.
Those files are updated in Step 6 of the plan.

Until Step 6 runs, the shim keeps them compiling.
The shim is marked @deprecated and has a DELETE comment.
Do NOT remove the shim in this step.

HOWEVER — the shim changes the return type from the old TenantApiResult
to the new ScreenDataResult. This means tenant/page.tsx and demo/page.tsx
will have TypeScript errors on result.data after this step because the old
type had result.data as TenantApiDataItem[] and the new type has
result.payload as ScreenDataPayload.

This is EXPECTED and ACCEPTABLE. Those TypeScript errors will be fixed
in Steps 3 and 6. Do not try to fix them in this step.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [ ] ScreenDataTables type defined with all 13 table keys
  [ ] ScreenDataPayload type has: mode, screen, school, subscription, plan, data
  [ ] ScreenDataResult is a union: success | empty | error
  [ ] success variant has payload: ScreenDataPayload (NOT data: array)
  [ ] callRPC unwraps raw[0].get_screen_data correctly
  [ ] callRPC logs the unwrapped school name and table keys on success
  [ ] callRPC handles: supabase error | empty array | missing payload | missing data
  [ ] fetchTenantScreen uses unstable_cache with 60s revalidate
  [ ] fetchTenantScreen cache key includes domain and screen
  [ ] fetchDemoScreen does NOT use unstable_cache
  [ ] fetchDemoScreen always passes DEMO_DOMAIN = 'eddesk.in'
  [ ] pathToScreenName: '/' → 'home', '/about' → 'about'
  [ ] normalizeDomain: strips www. but keeps port intact
  [ ] Legacy fetchScreenData shim is present and marked @deprecated
  [ ] Legacy shim routes to fetchDemoScreen when templateSlug !== null
  [ ] Legacy shim routes to fetchTenantScreen when templateSlug is null
  [ ] No import from tenantApi.service (old service — no longer needed here)
  [ ] Only screenData.service.ts was modified

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File rewritten:   src/core/services/screenData.service.ts
  Other files:      NONE

  Types added:
    ScreenDataTables    — 13 table keys matching RPC response
    ScreenDataPayload   — full unwrapped RPC payload
    ScreenDataResult    — union: success | empty | error

  Functions:
    pathToScreenName()  — path → screen name
    normalizeDomain()   — strips www., keeps port
    callRPC()           — private, unwraps response[0].get_screen_data
    fetchTenantScreen() — public, 60s cache
    fetchDemoScreen()   — public, no cache
    fetchScreenData()   — @deprecated shim for backward compat

  Caching:
    Tenant  → unstable_cache 60s
    Demo    → no cache

  TypeScript errors expected in:
    tenant/page.tsx     — result.data → will be fixed in Step 6
    demo/page.tsx       — result.data → will be fixed in Step 6
    tenant.viewmodel.ts — TenantApiDataItem → will be fixed in Step 3

  Guardrails violated: NONE
