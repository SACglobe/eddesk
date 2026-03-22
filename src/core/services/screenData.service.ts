/**
 * screenData.service.ts
 * SSR-ONLY. Never import this in client components or templates.
 *
 * Calls get_screen_data RPC and correctly unwraps the response.
 *
 * RPC response shape:
 *   response = { mode, screen, school, subscription, plan, data }
 *   (returned directly as a JSON object — not wrapped in an array)
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
import { createPublicSupabaseClient } from '@/lib/supabase';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEMO_DOMAIN = 'eddesk.in';
const TENANT_CACHE_TTL = 60; // seconds

// ─── Types ────────────────────────────────────────────────────────────────────

/** The data section of the RPC response — one key per table */
export type ScreenDataTables = {
    hero?: Record<string, unknown>[];
    broadcast?: Record<string, unknown>[];
    faculty?: Record<string, unknown>[];
    leadership?: Record<string, unknown>[];
    schoolstats?: Record<string, unknown>[];
    schoolachievements?: Record<string, unknown>[];
    testimonial?: Record<string, unknown>[];
    events?: Record<string, unknown>[];
    gallery?: Record<string, unknown>[];
    activities?: Record<string, unknown>[];
    infrastructure?: Record<string, unknown>[];
    admissionsteps?: Record<string, unknown>[];
    admissioninstructions?: Record<string, unknown>[];
    templatecomponents?: Record<string, unknown>[];
    whychooseus?: Record<string, unknown>[];
    boardmembers?: Record<string, unknown>[];
    academicresults?: Record<string, unknown> | Record<string, unknown>[] | null;
    contactdetails?: Record<string, unknown> | Record<string, unknown>[] | null;
    schoolidentity?: Record<string, unknown> | null;
};

/** The full unwrapped payload from get_screen_data */
export type ScreenDataPayload = {
    mode: 'demo' | 'live';
    screen: string;
    school: Record<string, unknown>;
    subscription: Record<string, unknown>;
    plan: Record<string, unknown>;
    data: ScreenDataTables;
};

/** Result returned by fetchTenantScreen and fetchDemoScreen */
export type ScreenDataResult =
    | { status: 'success'; payload: ScreenDataPayload }
    | { status: 'empty'; message: string }
    | { status: 'error'; error: string };

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
        const supabase = await createPublicSupabaseClient();

        console.log('[screenData] RPC call →', { domain, screen, templateSlug });

        const { data: raw, error } = await supabase.rpc('get_screen_data', {
            p_domain: domain,
            p_screen_slug: screen,
            p_template_slug: templateSlug,
        });

        // ── Supabase-level error ───────────────────────────────────────────────
        if (error) {
            console.error('[screenData] RPC error:', error.message);
            return { status: 'error', error: error.message };
        }

        console.log('[screenData] RPC Raw Output:', JSON.stringify(raw, null, 2));

        // ── Empty response ─────────────────────────────────────────────────────
        // RPC returns the payload directly as a JSON object — not wrapped in an array.
        // Shape: { mode, screen, school, subscription, plan, data: { hero, faculty, ... } }
        if (!raw) {
            console.warn('[screenData] RPC returned empty response', { domain, screen });
            return {
                status: 'empty',
                message: `No data returned for domain="${domain}" screen="${screen}"`,
            };
        }

        // ── Payload is raw directly (RPC returns object, not array) ───────────
        const payload: ScreenDataPayload = raw as unknown as ScreenDataPayload;

        if (!payload) {
            console.error('[screenData] Could not unwrap get_screen_data from response');
            return {
                status: 'error',
                error: 'Unexpected response shape from get_screen_data RPC',
            };
        }

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
 * Domain is explicitly passed from the request context (e.g. localhost:3000 vs eddesk.in).
 */
export async function fetchDemoScreen(
    domain: string,
    templateSlug: string,
    screen: string
): Promise<ScreenDataResult> {
    return callRPC(domain, screen, templateSlug);
}

// ─── Legacy export (kept for backward compatibility during migration) ──────────
// tenant/page.tsx and demo/page.tsx still call fetchScreenData.
// This shim lets them continue to work until Step 6 updates those files.
// DELETE this shim after Step 6 is complete.

/** @deprecated Use fetchTenantScreen or fetchDemoScreen instead */
export async function fetchTenantScreenData(
    domain: string,
    templateSlug: string,
    screen: string
): Promise<ScreenDataResult> {
    if (domain === DEMO_DOMAIN) {
        return fetchDemoScreen(domain, templateSlug, screen);
    }
    return fetchTenantScreen(domain, screen);
}