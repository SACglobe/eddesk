import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
    const domain = 'localhost:3000';
    const screen = 'home';
    const templateSlug = 'template_modern';

    console.log(`Calling get_screen_data for domain: ${domain}, screen: ${screen}, templateSlug: ${templateSlug}`);

    const { data: raw, error } = await supabase.rpc('get_screen_data', {
        p_domain: domain,
        p_screen_slug: screen,
        p_template_slug: templateSlug,
    });

    if (error) {
        console.error('RPC Error:', error);
    } else {
        console.log('RPC Success. Raw items count:', raw?.length);
        console.log('Raw JSON:', JSON.stringify(raw, null, 2));
    }
}

run();
