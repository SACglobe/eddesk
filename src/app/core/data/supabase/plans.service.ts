import { createPublicSupabaseClient } from '@/lib/supabase';

export interface Plan {
    key: string;
    name: string;
    code: string;
    description: string;
    price: number;
    currency: string;
    billingcycle: 'monthly' | 'yearly';
    graceperiod: number;
    isactive: boolean;
}

/**
 * Fetches all active plans from the database.
 * Used on the marketing pricing page.
 */
export async function getActivePlans(): Promise<Plan[]> {
    try {
        const supabase = await createPublicSupabaseClient();
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .eq('isactive', true)
            .order('price', { ascending: true });

        if (error) {
            console.error('[plans.service] Error fetching plans:', error.message);
            return [];
        }

        return data as Plan[];
    } catch (err: any) {
        console.error('[plans.service] Unexpected error:', err.message || err);
        return [];
    }
}
