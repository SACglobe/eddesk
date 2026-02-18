/**
 * tenantApi.service.ts
 * SSR-ONLY. Never import this in client components or templates.
 *
 * Responsibilities:
 * - Build API URL from env
 * - Fetch tenant data for a given domain + templateId
 * - Return typed result: success | empty | error
 *
 * Guardrails:
 * - API is called ONLY for real tenant domains
 * - Domain must NOT be localhost or eddesk.in
 * - Route must NOT be a demo route
 */

import {
    TABLE_SCHOOLS,
    TABLE_HOMEPAGE_SECTIONS,
    TABLE_HERO_MEDIA,
    TABLE_ANNOUNCEMENTS,
    TABLE_ACADEMIC_RESULTS,
    TABLE_ACHIEVEMENTS,
    TABLE_PERSONNEL,
    TABLE_CAMPUS_STATISTICS,
    TABLE_FACILITY_CATEGORIES,
    TABLE_FACILITIES,
    TABLE_MEDIA_LIBRARY,
    TABLE_EVENTS,
    TABLE_ADMISSION_STEPS,
    TABLE_SCHOOL_IDENTITY,
} from '@/lib/constants/reference';

// ─── Types ────────────────────────────────────────────────────────────────────

/** Raw shape of a single item in the API `data` array */
export type TenantApiDataItem = {
    [TABLE_SCHOOLS]?: Record<string, unknown>;
    [TABLE_HOMEPAGE_SECTIONS]?: Record<string, unknown>;
    [TABLE_HERO_MEDIA]?: Record<string, unknown>;
    [TABLE_ANNOUNCEMENTS]?: Record<string, unknown>;
    [TABLE_ACADEMIC_RESULTS]?: Record<string, unknown>;
    [TABLE_ACHIEVEMENTS]?: Record<string, unknown>;
    [TABLE_PERSONNEL]?: Record<string, unknown>;
    [TABLE_CAMPUS_STATISTICS]?: Record<string, unknown>;
    [TABLE_FACILITY_CATEGORIES]?: Record<string, unknown>;
    [TABLE_FACILITIES]?: Record<string, unknown>;
    [TABLE_MEDIA_LIBRARY]?: Record<string, unknown>;
    [TABLE_EVENTS]?: Record<string, unknown>;
    [TABLE_ADMISSION_STEPS]?: Record<string, unknown>;
    [TABLE_SCHOOL_IDENTITY]?: Record<string, unknown>;
};

/** Raw API response envelope */
export type TenantApiResponse = {
    status_code: number;
    message: string;
    data: TenantApiDataItem[];
};

/** Typed result returned by fetchTenantData */
export type TenantApiResult =
    | { status: 'success'; data: TenantApiDataItem[] }
    | { status: 'empty'; message: string }
    | { status: 'error'; error: string };

// ─── Guard ────────────────────────────────────────────────────────────────────

const BLOCKED_HOSTS = ['localhost', 'eddesk.in'];

export function isTenantDomain(hostname: string): boolean {
    const normalized = hostname.split(':')[0].toLowerCase().replace(/^www\./, '');
    return !BLOCKED_HOSTS.includes(normalized);
}

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Fetch tenant data from the EdDesk API.
 * Must be called ONLY on the server (SSR).
 *
 * @param domain   - The school's custom domain (e.g. abcschool.com)
 * @param templateId - The template assigned to this school
 */
export async function fetchTenantData(
    domain: string,
    templateId: string
): Promise<TenantApiResult> {
    const apiBase = process.env.TENANT_FETCH_API;

    // Stop condition: missing env variable
    if (!apiBase) {
        return {
            status: 'error',
            error: 'API base URL is not configured. Set TENANT_FETCH_API in .env.local.',
        };
    }

    // Stop condition: domain is not a real tenant
    if (!isTenantDomain(domain)) {
        return {
            status: 'error',
            error: `fetchTenantData called for a non-tenant domain: ${domain}`,
        };
    }

    const url = `https://${apiBase}?domain=${encodeURIComponent(domain)}&template=${encodeURIComponent(templateId)}`;

    try {
        const response = await fetch(url, {
            // Per-request SSR fetch — no caching
            cache: 'no-store',
        });

        if (!response.ok) {
            return {
                status: 'error',
                error: `API responded with HTTP ${response.status}: ${response.statusText}`,
            };
        }

        const json: TenantApiResponse = await response.json();

        // Empty data state
        if (!json.data || json.data.length === 0) {
            return {
                status: 'empty',
                message: json.message || 'No data returned from API.',
            };
        }

        return {
            status: 'success',
            data: json.data,
        };
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown network error';
        return {
            status: 'error',
            error: `Failed to fetch tenant data: ${message}`,
        };
    }
}
