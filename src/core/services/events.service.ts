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
    COL_IS_ACTIVE,
    COL_EVENTS_ID,
    COL_EVENTS_TITLE,
    COL_EVENTS_DESCRIPTION,
    COL_EVENTS_CATEGORY,
    COL_EVENTS_LOCATION,
    COL_EVENTS_START_TIME,
    COL_EVENTS_END_TIME,
    COL_EVENTS_IMAGE_URL,
    COL_EVENTS_IS_FEATURED
} from '@/lib/constants/reference';

export type EventData = {
    key: string;
    id: string; // Alias for key (backward compat)
    title: string;
    description: string;
    eventDate: string;
    date: string; // Alias for eventDate (backward compat)
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

        // Map database naming to logical naming used in templates/viewmodels
        const events: EventData[] = (data || []).map(r => ({
            key: str(r[COL_EVENTS_ID]),
            id: str(r[COL_EVENTS_ID]),
            title: str(r[COL_EVENTS_TITLE]),
            description: str(r[COL_EVENTS_DESCRIPTION]),
            eventDate: str(r[COL_EVENTS_DATE]),
            date: str(r[COL_EVENTS_DATE]),
            startTime: str(r[COL_EVENTS_START_TIME]),
            endTime: str(r[COL_EVENTS_END_TIME]),
            category: str(r[COL_EVENTS_CATEGORY]),
            location: str(r[COL_EVENTS_LOCATION]),
            imageUrl: str(r[COL_EVENTS_IMAGE_URL]),
            isFeatured: bool(r[COL_EVENTS_IS_FEATURED]),
        }));

        return { status: 'success', data: events };
    } catch (err: any) {
        console.error('[events.service] fetchMonthEvents unexpected error:', err.message);
        return { status: 'error', message: err.message || 'Unknown error' };
    }
}

function str(val: unknown): string {
    return typeof val === 'string' ? val : '';
}

function bool(val: unknown): boolean {
    return val === true || val === 'true';
}
