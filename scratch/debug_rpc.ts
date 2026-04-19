
import { debugTenantByDomain } from './src/app/core/data/supabase/tenant.service.ts';

async function test() {
    const domain = 'crescentthoothukudi.in';
    console.log(`Testing RPC for ${domain}...`);
    const { data, error } = await debugTenantByDomain(domain);
    
    if (error) {
        console.error('RPC Error:', error);
    } else {
        console.log('RPC Data keys:', Object.keys(data || {}));
        if (data && data.data) {
            console.log('Tables in data:', Object.keys(data.data));
            console.log('Hero data sample:', JSON.stringify(data.data.hero?.[0] || 'NONE', null, 2));
        }
    }
}

test();
