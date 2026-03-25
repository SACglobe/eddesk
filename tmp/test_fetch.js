
import { fetchMonthEvents } from '../src/core/services/events.service.js';
import { createServiceRoleClient } from '../src/lib/supabase.js';

async function test() {
    try {
        const supabase = await createServiceRoleClient();
        
        // 1. Get school key for 'crescent-school'
        const { data: schools, error: schoolError } = await supabase
            .from('schools')
            .select('key')
            .eq('slug', 'crescent-school')
            .single();
            
        if (schoolError || !schools) {
            console.log('School not found', schoolError);
            return;
        }
        
        const schoolKey = schools.key;
        console.log('Found School Key:', schoolKey);
        
        // 2. Fetch events
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        
        console.log(`Calling fetchMonthEvents(${schoolKey}, ${month}, ${year})...`);
        const result = await fetchMonthEvents(schoolKey, month, year);
        
        console.log('RESULT:', JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Test error:', err);
    }
}

test();
