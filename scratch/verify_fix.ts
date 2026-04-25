
import { fetchTenantScreen } from '../src/core/services/screenData.service';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function verify() {
    const domain = 'crescentthoothukudi.in';
    const screen = 'infrastructure';

    console.log(`Testing fetchTenantScreen for ${domain}/${screen}...`);
    
    // First call (should fetch and cache)
    const start1 = Date.now();
    try {
        const result1 = await fetchTenantScreen(domain, screen);
        console.log(`First call took ${Date.now() - start1}ms. Status: ${result1.status}`);

        if (result1.status === 'success') {
            console.log('Success! Payload keys:', Object.keys(result1.payload.data));
        } else if (result1.status === 'error') {
            console.error('Error:', result1.error);
        }
    } catch (e: any) {
        console.error('Crash in fetchTenantScreen:', e.message);
    }
}

verify();
