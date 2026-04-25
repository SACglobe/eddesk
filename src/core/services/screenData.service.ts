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
    academicslist?: Record<string, unknown>[];
    highlightedacademics?: Record<string, unknown>[];
    activitieslist?: Record<string, unknown>[];
    highlightedactivites?: Record<string, unknown>[];
    campusfeatures?: Record<string, unknown>[];
    infrastructurelist?: Record<string, unknown>[];
    highlightedinfrastructure?: Record<string, unknown>[];
    templatecomponents?: Record<string, unknown>[];
    monthwiseevents?: Record<string, unknown>[];
    whychooseus?: Record<string, unknown>[];
    boardmembers?: Record<string, unknown>[];
    principalmessage?: Record<string, unknown>[];
    boardmembersmessage?: Record<string, unknown>[];
    visionmission?: Record<string, unknown>[];
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Core RPC caller ──────────────────────────────────────────────────────────

/**
 * Raw RPC call — shared by both tenant and demo paths.
 * Returns the unwrapped ScreenDataPayload or a typed error/empty result.
 * Includes a retry mechanism for transient network errors.
 */
async function callRPC(
    domain: string,
    screen: string,
    templateSlug: string | null,
    attempt: number = 1
): Promise<ScreenDataResult> {
    const MAX_ATTEMPTS = 3;

    try {
        const supabase = await createPublicSupabaseClient();

        console.log(`[screenData] RPC call (attempt ${attempt}/${MAX_ATTEMPTS}) →`, { domain, screen, templateSlug });

        const { data: raw, error } = await supabase.rpc('get_screen_data', {
            p_domain: domain,
            p_screen_slug: screen,
            p_template_slug: templateSlug,
        });

        // ── Supabase-level error ───────────────────────────────────────────────
        if (error) {
            console.error('[screenData] RPC error:', error.message);
            
            // If it's a transient-looking error (like fetch failed or timeout), retry
            const isTransient = error.message.toLowerCase().includes('fetch failed') || 
                               error.message.toLowerCase().includes('timeout') ||
                               error.message.toLowerCase().includes('network');

            if (isTransient && attempt < MAX_ATTEMPTS) {
                const delay = attempt * 1000;
                console.warn(`[screenData] Transient error detected. Retrying in ${delay}ms...`);
                await sleep(delay);
                return callRPC(domain, screen, templateSlug, attempt + 1);
            }

            return { status: 'error', error: error.message };
        }

        // ── Empty response ─────────────────────────────────────────────────────
        if (!raw) {
            console.warn('[screenData] RPC returned empty response', { domain, screen });
            return {
                status: 'empty',
                message: `No data returned for domain="${domain}" screen="${screen}"`,
            };
        }

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
        console.error(`[screenData] Unexpected error (attempt ${attempt}/${MAX_ATTEMPTS}):`, message);

        const isTransient = message.toLowerCase().includes('fetch failed') || 
                           message.toLowerCase().includes('timeout') ||
                           message.toLowerCase().includes('network');

        if (isTransient && attempt < MAX_ATTEMPTS) {
            const delay = attempt * 1000;
            console.warn(`[screenData] Transient exception detected. Retrying in ${delay}ms...`);
            await sleep(delay);
            return callRPC(domain, screen, templateSlug, attempt + 1);
        }

        return { status: 'error', error: message };
    }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch screen data for a TENANT domain.
 * Result is cached for 60 seconds per domain+screen combination.
 * templateSlug is always null — comes from schools.templateslug in the DB.
 * 
 * IMPORTANT: If the RPC returns an error, we THROW so unstable_cache doesn't 
 * cache the failed state. The outer try/catch then recovers it.
 */
export async function fetchTenantScreen(
    domain: string,
    screen: string
): Promise<ScreenDataResult> {
    try {
        const result = await unstable_cache(
            async () => {
                const res = await callRPC(domain, screen, null);
                if (res.status === 'error') {
                    // Throw to prevent unstable_cache from poisoning the cache with an error result
                    throw new Error(JSON.stringify(res));
                }
                return res;
            },
            [`screen-data-${domain}-${screen}`],
            { revalidate: TENANT_CACHE_TTL }
        )();
        return result;
    } catch (err: any) {
        try {
            // If the error is a stringified ScreenDataResult, return it
            const parsed = JSON.parse(err.message);
            if (parsed.status === 'error') return parsed;
        } catch {
            // Ignore parse error
        }
        return { status: 'error', error: err.message };
    }
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