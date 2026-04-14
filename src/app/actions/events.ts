'use server';

/**
 * events.ts
 * Server Actions for Event-related data fetching.
 */

import { fetchMonthEvents, EventsResult } from '@/core/services/events.service';

/**
 * Server Action to fetch events for a specific school, month, and year.
 * This can be safely called from 'use client' components.
 */
export async function getMonthEventsAction(
    schoolkey: string,
    month: number,
    year: number
): Promise<EventsResult> {
    if (!schoolkey) {
        return { status: 'error', message: 'School key is required' };
    }
    
    if (month < 1 || month > 12) {
        return { status: 'error', message: 'Invalid month' };
    }

    console.log('[getMonthEventsAction] Called with:', { schoolkey, month, year });
    const result = await fetchMonthEvents(schoolkey, month, year);
    console.log('[getMonthEventsAction] Result status:', result.status, 'Data count:', (result as any).data?.length || 0);
    return result;
}
