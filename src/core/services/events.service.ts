/**
 * events.service.ts
 * SSR ONLY. Never import in client components.
 * 
 * Logic for fetching events with complex filters (e.g. by month).
 */

import { createPublicSupabaseClient } from '@/lib/supabase';
import { 
    TABLE_EVENTS, 
    COL_EVENTS_SCHOOL_ID, 
    COL_EVENTS_DATE,
    COL_IS_ACTIVE
} from '@/lib/constants/reference';

export type EventData = {
    key: string;
    title: string;
    description: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    category: string;
    location: string;
    imageUrl: string;
    isFeatured: boolean;
};

export type EventsResult = 
    | { status: 'success'; data: EventData[] }
    | { status: 'error'; message: string };

/**
 * Fetch all active events for a specific school within a given month and year.
 */
export async function fetchMonthEvents(
    schoolkey: string,
    month: number, // 1-12
    year: number
): Promise<EventsResult> {
    try {
        const supabase = await createPublicSupabaseClient();

        // Construct start and end dates for the month (Avoiding UTC conversion issues)
        const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
        const lastDay = new Date(year, month, 0).getDate();
        const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

        const { data, error } = await supabase
            .from(TABLE_EVENTS)
            .select('*')
            .eq(COL_EVENTS_SCHOOL_ID, schoolkey)
            .eq(COL_IS_ACTIVE, true)
            .gte(COL_EVENTS_DATE, startDate)
            .lte(COL_EVENTS_DATE, endDate)
            .order(COL_EVENTS_DATE, { ascending: true });

        if (error) {
            console.error('[events.service] fetchMonthEvents error:', error.message);
            return { status: 'error', message: error.message };
        }

        if (data && data.length > 0) {
            console.log('[events.service] fetchMonthEvents raw data (first 2):', data.slice(0, 2));
        } else {
            console.log('[events.service] fetchMonthEvents: No data found for the given criteria.');
        }

        // Map database naming to logical naming used in templates/viewmodels
        const events: EventData[] = (data || []).map(r => ({
            key: r['key'],
            title: r['title'],
            description: r['description'],
            eventDate: r['eventdate'],
            startTime: r['starttime'],
            endTime: r['endtime'],
            category: r['category'],
            location: r['location'],
            imageUrl: r['imageurl'],
            isFeatured: r['isfeatured'] === true || r['isfeatured'] === 'true',
        }));

        return { status: 'success', data: events };
    } catch (err: any) {
        console.error('[events.service] fetchMonthEvents unexpected error:', err.message);
        return { status: 'error', message: err.message || 'Unknown error' };
    }
}
