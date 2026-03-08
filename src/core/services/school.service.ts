// src/core/services/school.service.ts
//
// Looks up a school by its custom domain from the Supabase `schools` table.
// Used as a lightweight domain validity check before making the full RPC call.
//
// Returns a minimal SchoolTenant object if found, or null if the domain is not registered.

import { createPublicSupabaseClient } from '@/lib/supabase';

export interface SchoolTenant {
    id: string;
    domain: string;
    templateId: 'template_classic' | 'template_modern' | 'template_premium';
}

/**
 * Checks if a school with this custom domain exists in Supabase.
 * Queries the `schools` table by `customdomain` column.
 */
export async function getSchoolByDomain(
    domain: string
): Promise<SchoolTenant | null> {
    try {
        const supabase = await createPublicSupabaseClient();

        const { data, error } = await supabase
            .from('schools')
            .select('key, customdomain, templateslug')
            .eq('customdomain', domain)
            .eq('isactive', true)
            .maybeSingle();

        if (error || !data) {
            console.warn('[school.service] getSchoolByDomain: not found for domain:', domain, error?.message ?? '');
            return null;
        }

        return {
            id: data.key,
            domain: data.customdomain,
            templateId: data.templateslug as SchoolTenant['templateId'],
        };
    } catch (err) {
        console.error('[school.service] getSchoolByDomain: unexpected error', err);
        return null;
    }
}
