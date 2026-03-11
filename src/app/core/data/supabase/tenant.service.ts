import { createServerSupabaseClient } from '@/lib/supabase'

export async function debugTenantByDomain(domain: string) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    console.log("domain", domain);
    if (!url || !key) {
        console.log('[EdDesk] Supabase environment variables missing. Skipping debug log.');
        return { data: null, error: 'Environment variables missing' };
    }

    try {
        const supabase = await createServerSupabaseClient();
        console.log('[EdDesk] === SUPABASE DEBUG: Calling get_screen_data ===');
        console.log('[EdDesk] Domain input:', domain);

        const { data, error } = await supabase.rpc('get_screen_data', {
            p_domain: domain,
            p_screen_slug: 'home',
            p_template_slug: null
        });

        console.log('[EdDesk] === RAW RESPONSE ===')
        console.log('data:', JSON.stringify(data, null, 2))
        console.log('error:', JSON.stringify(error, null, 2))

        return { data, error };
    } catch (err: any) {
        console.error('[EdDesk] Supabase RPC Error:', err.message || err);
        return { data: null, error: err.message || 'Unknown error' };
    }
}

/**
 * Fetches tenant screen data from Supabase.
 * - For real tenant domains: template_id = null
 * - For demo domains: template_id = 'template_classic' etc.
 */
export async function fetchScreenData(
    domain: string,
    screen: string = 'home',
    templateId?: string | null
): Promise<any[] | null> {
    try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase.rpc('get_screen_data', {
            p_domain: domain,
            p_screen_slug: screen,
            p_template_slug: templateId ?? null
        });
        console.log("domain", domain);
        console.log("screen", screen);
        console.log("templateId", templateId);
        console.log("error", error);
        console.log("data", JSON.stringify(data));
        // 1. Handle top-level Supabase infrastructure errors
        if (error) {
            console.error('[EdDesk] Supabase RPC infrastructure error:', error.message);
            return null;
        }

        // 2. Handle internal RPC logic errors (returned as { error: '...' })
        if (data && typeof data === 'object' && 'error' in data) {
            console.error('[EdDesk] Supabase RPC business error:', data.error);
            return null;
        }

        // 3. Handle successful response
        // Note: RPC returns jsonb which might be an array of sections or wrapped in an object
        const result = Array.isArray(data) ? data : (data?.data || data);

        if (!Array.isArray(result) || result.length === 0) {
            console.log(`[EdDesk] No Supabase sections found for domain: ${domain}, screen: ${screen}`);
            return null;
        }
        console.log("result", result);
        return result;
    } catch (err: any) {
        console.error('[EdDesk] fetchScreenData error:', err.message || err);
        return null;
    }
}

/**
 * Fetches metadata for a school by domain.
 */
export async function fetchSchoolMetadata(domain: string) {
    try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase
            .from('schools')
            .select('isactive, expirationdate, name')
            .or(`customdomain.eq.${domain},slug.eq.${domain}`)
            .single();

        if (error) {
            console.error('[EdDesk] Error fetching school metadata:', error.message);
            return null;
        }

        return data;
    } catch (err: any) {
        console.error('[EdDesk] fetchSchoolMetadata error:', err.message || err);
        return null;
    }
}

/**
 * Fetches grace period from config table.
 */
export async function getGracePeriod(): Promise<number> {
    try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase
            .from('config')
            .select('graceperiod')
            .single();

        if (error) {
            console.error('[EdDesk] Error fetching grace period:', error.message);
            return 0;
        }

        return data?.graceperiod ?? 0;
    } catch (err: any) {
        console.error('[EdDesk] getGracePeriod error:', err.message || err);
        return 0;
    }
}

// Deprecated: Alias for fetchScreenData with home default
export async function fetchTenantByDomain(domain: string, templateId?: string | null) {
    return fetchScreenData(domain, 'home', templateId);
}
