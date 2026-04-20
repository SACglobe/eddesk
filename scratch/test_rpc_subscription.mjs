
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testRPC() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.rpc('get_screen_data', {
        p_domain: 'crescentthoothukudi.in',
        p_screen_slug: 'about',
        p_template_slug: null
    });

    if (error) {
        console.error('RPC Error:', error);
        return;
    }

    console.log('RPC Response Subscription:', JSON.stringify(data.subscription, null, 2));
    console.log('RPC Response Mode:', data.mode);
}

testRPC();
