
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adjxsdihvjwntavpymhg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkanhzZGlodmp3bnRhdnB5bWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTc4NTQsImV4cCI6MjA4NzMzMzg1NH0.5GhNR2DzMh9SMY4_IafLu4ql2_hHMNpwNXX8pQg4clY';

async function testManualFetch() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const schoolkey = 'bbe79277-b0f0-4b09-b873-e8b1e48f321c';
    const month = 3;
    const year = 2026;
    
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];
    
    console.log(`QUERY: schoolkey=${schoolkey}, startDate=${startDate}, endDate=${endDate}`);
    
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('schoolkey', schoolkey)
        .eq('isactive', true)
        .gte('eventdate', startDate)
        .lte('eventdate', endDate)
        .order('eventdate', { ascending: true });
        
    if (error) {
        console.error('FETCH ERROR:', error);
    } else {
        console.log(`FETCH SUCCESS: found ${data.length} events`);
        console.log(JSON.stringify(data, null, 2));
    }
}

testManualFetch();
