
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adjxsdihvjwntavpymhg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkanhzZGlodmp3bnRhdnB5bWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTc4NTQsImV4cCI6MjA4NzMzMzg1NH0.5GhNR2DzMh9SMY4_IafLu4ql2_hHMNpwNXX8pQg4clY';

async function checkSchool() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    console.log('Fetching school for slug: crescent-school...');
    const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('slug', 'crescent-school')
        .single();
        
    if (error) {
        console.error('Error fetching school:', error);
        return;
    }
    
    console.log('School Info:', JSON.stringify(data, null, 2));
}

checkSchool();
