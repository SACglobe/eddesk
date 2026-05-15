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
    discount_type?: 'none' | 'percentage' | 'flat' | 'free_days' | 'free_months';
    discount_percentage?: number;
    discount_flat?: number;
    discount_free_days?: number;
    discount_free_months?: number;
    discount_label?: string;
    discount_active?: boolean;
    discount_expires_at?: string;
    idx?: number;
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
            .select(`
                *,
                discount_type,
                discount_percentage,
                discount_flat,
                discount_free_days,
                discount_free_months,
                discount_label,
                discount_active,
                discount_expires_at
            `)
            .eq('isactive', true)
            .order('idx', { ascending: true });

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
