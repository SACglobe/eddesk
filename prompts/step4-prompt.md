# EdDesk — Phase 1, Step 4
# Rewrite src/core/business/subscription.ts
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files in order:
  1. src/core/business/subscription.ts          ← file you will rewrite
  2. src/core/viewmodels/tenant.viewmodel.ts     ← TenantViewModel shape (Step 3 output)
  3. src/app/tenant/[[...path]]/page.tsx         ← current inline subscription logic
  4. src/core/services/config.service.ts         ← will be deleted after this step

Do not write a single line until you have read all four.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHY THIS REWRITE IS NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The current subscription.ts reads from fields that no longer exist:
  school.expirationDate    ← REMOVED from TenantViewModel in Step 3
  school.gracePeriodDays   ← REMOVED from TenantViewModel in Step 3

After Step 3, the correct fields are:
  data.school.isActive             ← isactive check
  data.subscription.endDate        ← expiry date (was school.expirationDate)
  data.plan.gracePeriod            ← grace period in days (was hardcoded 7)
  data.mode                        ← 'demo' | 'live' — skip all checks if 'demo'

The current checkSubscription is also never called anywhere.
The tenant page does its own inline checks using the old school.service
and a separate config.service fetch. After this step, checkSubscription
will be the single place for all subscription logic — the inline checks
in tenant/page.tsx will be removed in Step 6.

The demo school has isactive = false in the database.
This means if we run isactive check on demo, it always fails.
The mode === 'demo' bypass is what prevents this.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/core/business/subscription.ts   ← ONLY this file

Do NOT touch tenant/page.tsx, demo/page.tsx, or any other file.
The pages are wired up in Step 6.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Q1. What fields does the current checkSubscription read from TenantViewModel?
      Do school.expirationDate and school.gracePeriodDays still exist
      on TenantViewModel after Step 3? Yes / No

  Q2. Does the current code have any handling for mode === 'demo'? Yes / No

  Q3. Is checkSubscription called anywhere outside subscription.ts? Yes / No
      (Search the codebase before answering.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — EXACT CODE TO WRITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the entire contents of subscription.ts with the following.
Copy exactly — do not paraphrase or restructure.

─────────────────────────────────────────────────────────────
FILE: src/core/business/subscription.ts
─────────────────────────────────────────────────────────────

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
    | 'inactive';     // school.isactive = false

export interface SubscriptionCheckResult {
    status:           SubscriptionStatus;
    isAccessAllowed:  boolean;
    daysRemaining?:   number;   // set when status is 'grace_period'
    message:          string;   // human-readable reason
}

// ─── Logic ────────────────────────────────────────────────────────────────────

/**
 * Check whether the tenant is allowed to access their website.
 *
 * @param data - Full TenantViewModel from buildTenantViewModel()
 * @returns SubscriptionCheckResult with status and isAccessAllowed
 */
export function checkSubscription(data: TenantViewModel): SubscriptionCheckResult {

    // ── Step 1: Demo bypass ───────────────────────────────────────────────────
    // Demo school has isactive = false in DB — we must skip all checks.
    // mode comes from the RPC response — 'demo' or 'live'.
    if (data.mode === 'demo') {
        return {
            status:          'demo_bypass',
            isAccessAllowed: true,
            message:         'Demo mode — subscription checks skipped.',
        };
    }

    // ── Step 2: isActive check ────────────────────────────────────────────────
    // school.isActive maps from schools.isactive (boolean)
    if (!data.school.isActive) {
        return {
            status:          'inactive',
            isAccessAllowed: false,
            message:         'This website is inactive. Please raise a ticket at admin.eddesk.in.',
        };
    }

    // ── Step 3: Expiry + grace period check ───────────────────────────────────
    // subscription.endDate  → subscription table enddate column
    // plan.gracePeriod      → plandetails table graceperiod column (number of days)
    //
    // Formula: access allowed if currentDate <= endDate + gracePeriod days
    const endDateStr  = data.subscription?.endDate;
    const gracePeriod = data.plan?.gracePeriod ?? 0;

    if (endDateStr) {
        const now       = new Date();
        const endDate   = new Date(endDateStr);

        // Calculate effective expiry = endDate + gracePeriod days
        const effectiveExpiry = new Date(
            endDate.getTime() + gracePeriod * 24 * 60 * 60 * 1000
        );

        if (now > effectiveExpiry) {
            // Past effective expiry — access denied
            return {
                status:          'expired',
                isAccessAllowed: false,
                message:         'Your subscription has expired. Please renew at admin.eddesk.in.',
            };
        }

        if (now > endDate) {
            // Past endDate but within grace period — access allowed with warning
            const diffInMs   = effectiveExpiry.getTime() - now.getTime();
            const daysRemaining = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
            return {
                status:          'grace_period',
                isAccessAllowed: true,
                daysRemaining,
                message:         `Subscription expired. ${daysRemaining} grace period day(s) remaining.`,
            };
        }
    }

    // ── Step 4: Active ────────────────────────────────────────────────────────
    return {
        status:          'active',
        isAccessAllowed: true,
        message:         'Subscription is active.',
    };
}

─────────────────────────────────────────────────────────────
END OF FILE CONTENT
─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [ ] SubscriptionStatus union includes 'demo_bypass' as first variant
  [ ] SubscriptionCheckResult has: status, isAccessAllowed, daysRemaining?, message
  [ ] checkSubscription accepts TenantViewModel (not individual fields)
  [ ] Step 1: mode === 'demo' returns demo_bypass with isAccessAllowed: true
  [ ] Step 2: !school.isActive returns inactive with isAccessAllowed: false
  [ ] Step 3: reads data.subscription.endDate (not school.expirationDate)
  [ ] Step 3: reads data.plan.gracePeriod (not school.gracePeriodDays)
  [ ] Step 3: gracePeriod defaults to 0 if plan is missing (safe fallback)
  [ ] Step 3: expired returns isAccessAllowed: false
  [ ] Step 3: grace_period returns isAccessAllowed: true with daysRemaining set
  [ ] Step 4: active returns isAccessAllowed: true
  [ ] No reference to school.expirationDate anywhere in file
  [ ] No reference to school.gracePeriodDays anywhere in file
  [ ] No import from config.service.ts
  [ ] No import from screenData.service.ts
  [ ] No fetch() or async calls — pure synchronous logic only
  [ ] Only subscription.ts was modified

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File rewritten:   src/core/business/subscription.ts
  Other files:      NONE

  Status types:     demo_bypass | active | grace_period | expired | inactive
  New fields read:  data.mode, data.subscription.endDate, data.plan.gracePeriod
  Removed fields:   school.expirationDate, school.gracePeriodDays
  Demo bypass:      mode === 'demo' → skip all checks, return demo_bypass
  Async:            NO — pure synchronous function
  Guardrails:       NONE violated
