import React from 'react';
import { getActivePlans } from '@/app/core/data/supabase/plans.service';
import PricingClient from './PricingClient';

/**
 * Server Component for the Pricing page.
 * Fetches dynamic plan data from Supabase and passes it to the Client Component.
 */
export default async function PricingPage() {
    const dynamicPlans = await getActivePlans();

    return (
        <PricingClient dynamicPlans={dynamicPlans} />
    );
}

// Ensure the page is not statically generated at build time to always show fresh DB prices
export const revalidate = 3600; // rebuid every 1 hour, or use 0 for always dynamic
