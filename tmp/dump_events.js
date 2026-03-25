
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adjxsdihvjwntavpymhg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkanhzZGlodmp3bnRhdnB5bWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTc4NTQsImV4cCI6MjA4NzMzMzg1NH0.5GhNR2DzMh9SMY4_IafLu4ql2_hHMNpwNXX8pQg4clY';

async function dump() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    console.log('Fetching all events (no filters)...');
    const { data, error } = await supabase
        .from('events')
        .select('*');
        
    if (error) {
        console.error('Error fetching events:', error);
        return;
    }
    
    console.log(`Found ${data.length} events:`);
    console.log(JSON.stringify(data, null, 2));
}

dump();
