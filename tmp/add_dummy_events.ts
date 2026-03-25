import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addDummyEvents() {
    const schoolkey = 'bbe79277-b0f0-4b09-b873-e8b1e48f321c'; // Demo School
    
    const events = [
        {
            schoolkey,
            title: 'Annual Sports Day 2026',
            description: 'Join us for a day of athletic excellence and school spirit.',
            eventdate: '2026-04-15',
            starttime: '09:00:00',
            endtime: '14:00:00',
            category: 'Sports',
            isactive: true,
            isfeatured: true
        },
        {
            schoolkey,
            title: 'Science Fair Exhibition',
            description: 'Innovative projects by our brightest young minds.',
            eventdate: '2026-04-22',
            starttime: '10:00:00',
            endtime: '16:00:00',
            category: 'Academic',
            isactive: true,
            isfeatured: false
        }
    ];

    console.log('Inserting dummy events...');
    const { data, error } = await supabase.from('events').insert(events);
    
    if (error) {
        console.error('Error inserting events:', error);
    } else {
        console.log('Successfully inserted events:', data);
    }
}

addDummyEvents();
