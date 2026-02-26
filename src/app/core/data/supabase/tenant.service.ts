import { createServerSupabaseClient } from '@/lib/supabase'

export async function debugTenantByDomain(domain: string) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        console.log('Server', 'Supabase environment variables missing. Skipping debug log.');
        return { data: null, error: 'Environment variables missing' };
    }

    try {
        const supabase = await createServerSupabaseClient();
        console.log('Server', ` === SUPABASE DEBUG: Calling get_home_screen_data ===`);
        console.log('Server', `Domain input: ${domain}`);

        const { data, error } = await supabase.rpc('get_home_screen_data', {
            p_domain: domain
        });

        console.log('=== RAW RESPONSE ===')
        console.log('data:', JSON.stringify(data, null, 2))
        console.log('error:', JSON.stringify(error, null, 2))
        console.log('data type:', typeof data)
        console.log('is array:', Array.isArray(data))
        if (Array.isArray(data)) {
            console.log('array length:', data.length)
            console.log('first item keys:', data[0] ? Object.keys(data[0]) : 'EMPTY')
        }

        return { data, error };
    } catch (err: any) {
        console.error('Server', 'Supabase RPC Error:', err.message || err);
        return { data: null, error: err.message || 'Unknown error' };
    }
}
