
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://adjxsdihvjwntavpymhg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkanhzZGlodmp3bnRhdnB5bWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NTc4NTQsImV4cCI6MjA4NzMzMzg1NH0.5GhNR2DzMh9SMY4_IafLu4ql2_hHMNpwNXX8pQg4clY';

async function listSchools() {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    console.log('Listing all schools...');
    const { data, error } = await supabase
        .from('schools')
        .select('key, name, slug, customdomain');
        
    if (error) {
        console.error('Error listing schools:', error);
        return;
    }
    
    console.log('Schools List:', JSON.stringify(data, null, 2));
}

listSchools();
