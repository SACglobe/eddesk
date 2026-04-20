/**
 * subscription.ts
 * Pure logic — no fetching, no imports from services.
 *
 * Checks whether a tenant is allowed to access their website.
 * Called ONLY for tenant routes — never for demo routes.
 *
 * Data source:
 *   data.school.isActive          → isactive column in schools table
 *   data.subscription.endDate     → enddate column in subscription table
 *   data.plan.gracePeriod         → graceperiod column in plandetails table
 *   data.mode                     → 'demo' | 'live' from RPC response
 *
 * Rules:
 *   mode === 'demo'  → return 'demo_bypass' immediately, no checks run
 *   isActive = false → return 'inactive'
 *   currentDate > endDate + gracePeriod days → return 'expired'
 *   otherwise → return 'active' or 'grace_period'
 */

import type { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SubscriptionStatus =
    | 'demo_bypass'   // demo route — all checks skipped
    | 'active'        // subscription is valid
    | 'grace_period'  // past endDate but within grace period
    | 'expired'       // past endDate + grace period
    | 'subscription_missing' // subscription record not found or no end date
    | 'inactive';     // school.isactive = false

export interface SubscriptionCheckResult {
    status: SubscriptionStatus;
    isAccessAllowed: boolean;
    daysRemaining?: number;   // set when status is 'grace_period'
    message: string;   // human-readable reason
}

// ─── Logic ────────────────────────────────────────────────────────────────────

/**
 * Check whether the tenant is allowed to access their website.
 *
 * @param data - Full TenantViewModel from buildTenantViewModel()
 * @returns SubscriptionCheckResult with status and isAccessAllowed
 */
export function checkSubscription(data: TenantViewModel): SubscriptionCheckResult {

    console.log(`[subscription] Checking school: ${data.school.key} (Mode: ${data.mode})`);
    console.log(`[subscription] Status: ${data.subscription.status}, EndDate: ${data.subscription.endDate}`);

    // ── Step 1: Demo bypass ───────────────────────────────────────────────────
    // Demo school has isactive = false in DB — we must skip all checks.
    // mode comes from the RPC response — 'demo' or 'live'.
    if (data.mode === 'demo') {
        return {
            status: 'demo_bypass',
            isAccessAllowed: true,
            message: 'Demo mode — subscription checks skipped.',
        };
    }

    // ── Step 2: isActive check ────────────────────────────────────────────────
    // school.isActive maps from schools.isactive (boolean)
    if (!data.school.isActive) {
        return {
            status: 'inactive',
            isAccessAllowed: false,
            message: 'This website is inactive. Please raise a ticket at admin.eddesk.in.',
        };
    }

    // ── Step 3: Expiry + grace period check ───────────────────────────────────
    // subscription.endDate  → subscription table enddate column
    // plan.gracePeriod      → plandetails table graceperiod column (number of days)
    //
    // Formula: access allowed if currentDate <= endDate + gracePeriod days
    const endDateStr = data.subscription?.endDate;
    const gracePeriod = data.plan?.gracePeriod ?? 0;

    if (endDateStr) {
        const now = new Date();
        const endDate = new Date(endDateStr);

        // Calculate effective expiry = endDate + gracePeriod days
        const effectiveExpiry = new Date(
            endDate.getTime() + gracePeriod * 24 * 60 * 60 * 1000
        );

        if (now > effectiveExpiry) {
            // Past effective expiry — access denied
            return {
                status: 'expired',
                isAccessAllowed: false,
                message: 'Your subscription has expired. Please renew at admin.eddesk.in.',
            };
        }

        if (now > endDate) {
            // Past endDate but within grace period — access allowed with warning
            const diffInMs = effectiveExpiry.getTime() - now.getTime();
            const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
            return {
                status: 'grace_period',
                isAccessAllowed: true,
                daysRemaining,
                message: `Subscription expired. ${daysRemaining} grace period day(s) remaining.`,
            };
        }
    } else {
        // No subscription end date found
        return {
            status: 'subscription_missing',
            isAccessAllowed: false,
            message: 'Subscription required to go live. Please initiate your subscription at admin.eddesk.in.',
        };
    }

    // ── Step 4: Active ────────────────────────────────────────────────────────
    return {
        status: 'active',
        isAccessAllowed: true,
        message: 'Subscription is active.',
    };
}
