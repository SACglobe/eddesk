
import { createServiceRoleClient } from './src/lib/supabase.js';

async function setup() {
    const supabase = createServiceRoleClient();
    
    // 1. Get school key for 'crescent-school'
    const { data: schools, error: schoolError } = await supabase
        .from('schools')
        .select('key')
        .eq('slug', 'crescent-school')
        .single();
        
    if (schoolError || !schools) {
        console.error('School not found', schoolError);
        return;
    }
    
    const schoolKey = schools.key;
    console.log('Found School Key:', schoolKey);
    
    // 2. Insert sample events
    const today = new Date();
    const events = [
        {
            schoolkey: schoolKey,
            title: 'Annual Sports Meet',
            description: 'A day of athletic competition and sportsmanship for all students.',
            eventdate: today.toISOString().split('T')[0],
            starttime: '09:00:00',
            endtime: '16:00:00',
            category: 'Sports',
            isactive: true,
            isfeatured: true
        },
        {
            schoolkey: schoolKey,
            title: 'Science Exhibition',
            description: 'Students showcasing innovative science projects and experiments.',
            eventdate: today.toISOString().split('T')[0],
            starttime: '10:00:00',
            endtime: '14:00:00',
            category: 'Academic',
            isactive: true,
            isfeatured: false
        },
        {
            schoolkey: schoolKey,
            title: 'Principal Meeting',
            description: 'Monthly parent-teacher interaction with the principal.',
            eventdate: new Date(today.getTime() + 86400000).toISOString().split('T')[0],
            starttime: '11:00:00',
            endtime: '12:00:00',
            category: 'Meeting',
            isactive: true,
            isfeatured: false
        }
    ];
    
    const { error: insertError } = await supabase
        .from('events')
        .insert(events);
        
    if (insertError) {
        console.error('Failed to insert events', insertError);
    } else {
        console.log('Sample events inserted successfully');
    }
}

setup();
