
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adjxsdihvjwntavpymhg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkanhzZGlodmp3bnRhdnB5bWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTc4NTQsImV4cCI6MjA4NzMzMzg1NH0.5GhNR2DzMh9SMY4_IafLu4ql2_hHMNpwNXX8pQg4clY';

async function testRPC() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const domain = 'eddesk.in';
    const screen = 'events';
    const templateSlug = 'template_modern';
    
    console.log(`Calling RPC get_screen_data(p_domain=${domain}, p_screen_slug=${screen}, p_template_slug=${templateSlug})...`);
    
    const { data: raw, error } = await supabase.rpc('get_screen_data', {
        p_domain: domain,
        p_screen_slug: screen,
        p_template_slug: templateSlug,
    });
    
    if (error) {
        console.error('RPC ERROR:', error);
    } else {
        console.log('RPC SUCCESS');
        // Check if events exists in data
        const events = raw?.data?.events;
        console.log(`Events in result: ${events ? events.length : 'MISSING'}`);
        if (events && events.length > 0) {
            console.log('First event:', JSON.stringify(events[0], null, 2));
        } else {
            console.log('Full data keys:', Object.keys(raw?.data || {}));
        }
    }
}

testRPC();
