# EdDesk — Phase 1, Step 8
# Update tenant/page.tsx and demo/page.tsx
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read ALL of these files before writing a single line:

  1. src/app/tenant/[[...path]]/page.tsx                  ← file A you will rewrite
  2. src/app/demo/[templateSlug]/[[...path]]/page.tsx      ← file B you will rewrite
  3. src/core/services/screenData.service.ts               ← Step 2 output — new function names + types
  4. src/core/viewmodels/tenant.viewmodel.ts               ← Step 3 output — buildTenantViewModel signature
  5. src/core/business/subscription.ts                     ← Step 4 output — checkSubscription
  6. src/components/system/SystemPopup.tsx                 ← Step 5 output — new variants
  7. src/core/services/school.service.ts                   ← still used for domain → not-configured gate
  8. src/core/context/TenantContext.tsx                    ← TenantState shape

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHAT IS CHANGING AND WHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After Steps 1–7, the pipeline looks like this:

  OLD (tenant/page.tsx today):
    1. getSchoolByDomain(hostname)      ← Supabase query #1
    2. if !isActive → show error popup  ← reads schoolConfig.isActive
    3. getGracePeriodDays()             ← Supabase query #2 (config table) ← DELETED Step 7
    4. if expired → show error popup    ← reads schoolConfig.expirationDate
    5. fetchScreenData(...)             ← Supabase RPC call (old shim)
    6. buildTenantViewModel(result.data) ← wrong type, wrong input

  NEW (after this step):
    1. getSchoolByDomain(hostname)      ← still needed — fast domain guard + not-configured gate
    2. fetchTenantScreen(domain, screen) ← RPC call — returns ScreenDataResult
    3. buildTenantViewModel(payload)    ← correct type: ScreenDataPayload
    4. checkSubscription(viewModel)     ← reads viewModel.mode + subscription + plan
    5. if !isAccessAllowed → show correct SystemPopup variant
    6. render template

KEY CHANGES:
  - getGracePeriodDays() is GONE (file deleted in Step 7)
  - fetchScreenData() shim still exists but should no longer be used — use
    fetchTenantScreen() for tenant page and fetchDemoScreen() for demo page
  - buildTenantViewModel() now accepts ScreenDataPayload (result.payload),
    NOT result.data (the old array shape)
  - checkSubscription() now handles inactive, expired, grace_period, demo_bypass
  - SystemPopup now has 'inactive' and 'expired' variants (Step 5)
  - subscription checks moved AFTER the RPC call (not before it)
    because grace period and mode now come from the RPC response

WHY SUBSCRIPTION CHECKS MOVE AFTER THE RPC CALL:
  The old code checked isActive and expirationDate from school.service BEFORE
  the RPC call. The new code checks AFTER because:
    - plan.gracePeriod now comes from the RPC response (not config table)
    - mode ('demo'|'live') comes from the RPC response
    - We need the full viewModel to call checkSubscription()
  school.service still runs first — but only for the "not configured" gate
  (domain not found → show not-configured screen). isActive and expiry checks
  are delegated to checkSubscription() after the RPC returns.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/app/tenant/[[...path]]/page.tsx              ← rewrite
  src/app/demo/[templateSlug]/[[...path]]/page.tsx ← rewrite

Do NOT touch school.service.ts, screenData.service.ts,
subscription.ts, SystemPopup.tsx, or any template file.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For tenant/page.tsx:
  Q1. What does result.data refer to in the current code?
      Is it ScreenDataPayload or TenantApiDataItem[]?
      (Check screenData.service.ts Step 2 output — result.payload is the new field)

  Q2. What does schoolConfig.templateId provide today?
      After Step 3, where does the template slug come from instead?
      (Hint: viewModel.school.templateId)

  Q3. The current code uses variant="error" for both inactive and expired.
      What are the correct new variant names from Step 5?

For demo/page.tsx:
  Q4. Does the demo page currently call fetchScreenData() or fetchDemoScreen()?
  Q5. Does demo/page.tsx run any subscription checks? Should it after this step?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — REWRITE tenant/page.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─────────────────────────────────────────────────────────────
1A. Replace the imports block
─────────────────────────────────────────────────────────────

REMOVE these imports:
  import { getGracePeriodDays } from '@/core/services/config.service';  ← deleted file
  import { fetchScreenData, pathToScreenName } ...                       ← replace with new functions

ADD / KEEP these imports:
  import React from 'react'
  import { headers } from 'next/headers';
  import { Metadata } from 'next';
  import { getSchoolByDomain } from '@/core/services/school.service';
  import { fetchTenantScreen, pathToScreenName, normalizeDomain } from '@/core/services/screenData.service';
  import { buildTenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
  import { checkSubscription } from '@/core/business/subscription';
  import { generateTenantMetadata, generateSchoolJsonLd, generateAboutMetadata, generateAboutJsonLd } from '@/core/utils/seo';
  import TemplateRenderer from '../../demo/[templateSlug]/[[...path]]/TemplateRenderer';
  import { TenantState } from '@/core/context/TenantContext';
  import SystemPopup from '@/components/system/SystemPopup';

─────────────────────────────────────────────────────────────
1B. Update domain normalization
─────────────────────────────────────────────────────────────

Replace all instances of:
  const hostname = host.split(':')[0].toLowerCase().replace(/^www\./, '');

With:
  const hostname = normalizeDomain(host);

This uses the normalizeDomain() helper from screenData.service (Step 2).
It strips www. but keeps the port — required for localhost:3001, :3002, :3003.
Apply this change in BOTH generateMetadata and TenantPage.

─────────────────────────────────────────────────────────────
1C. Update generateMetadata
─────────────────────────────────────────────────────────────

BEFORE:
  const result = await fetchScreenData(hostname, screenName, null);
  if (result.status === 'success') {
    const viewModel = buildTenantViewModel(result.data);
    ...
  }

AFTER:
  const result = await fetchTenantScreen(hostname, screenName);
  if (result.status === 'success') {
    const viewModel = buildTenantViewModel(result.payload);   // ← .payload not .data
    ...
  }

─────────────────────────────────────────────────────────────
1D. Replace the full TenantPage function body
─────────────────────────────────────────────────────────────

Replace the body of TenantPage with this exact flow.
Keep all existing JSX for the "not configured" screen exactly as it is — do not change it.

NEW FLOW:

  // Step 1: Domain guard — check if this domain is registered at all
  // school.service does a fast single-row Supabase query
  // Returns null if domain is not in schools table
  const schoolConfig = await getSchoolByDomain(hostname);

  if (!schoolConfig) {
    return ( ...existing "not configured" JSX — keep exactly as is... );
  }

  // Step 2: Fetch screen data via RPC
  // All subscription data (mode, endDate, gracePeriod) comes from here
  const screenName = pathToScreenName(path);
  const result = await fetchTenantScreen(hostname, screenName);

  // Step 3: Handle RPC failure states BEFORE subscription check
  if (result.status === 'error') {
    return (
      <SystemPopup
        variant="error"
        errorMessage={result.error}
      />
    );
  }

  if (result.status === 'empty') {
    return (
      <SystemPopup
        variant="empty"
        errorMessage={result.message}
      />
    );
  }

  // Step 4: Build viewModel from the correctly unwrapped payload
  const viewModel = buildTenantViewModel(result.payload);   // ← .payload not .data

  // Step 5: Subscription check (reads mode, subscription.endDate, plan.gracePeriod)
  // checkSubscription returns demo_bypass instantly if mode === 'demo'
  const subscriptionCheck = checkSubscription(viewModel);

  if (!subscriptionCheck.isAccessAllowed) {
    if (subscriptionCheck.status === 'inactive') {
      return <SystemPopup variant="inactive" />;
    }
    if (subscriptionCheck.status === 'expired') {
      return <SystemPopup variant="expired" />;
    }
    // Fallback for any future status
    return (
      <SystemPopup
        variant="error"
        errorMessage={subscriptionCheck.message}
      />
    );
  }

  // Step 6: Build TenantState for context + TemplateRenderer
  const tenantState: TenantState = {
    status: 'success',
    data: viewModel,
    message: '',
  };

  // Step 7: Render — templateSlug now comes from viewModel (not schoolConfig)
  return (
    <>
      {tenantState.data && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchoolJsonLd(tenantState.data, hostname)) }}
          />
          {path === '/about' && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAboutJsonLd(tenantState.data, hostname)) }}
            />
          )}
        </>
      )}
      <TemplateRenderer
        templateSlug={viewModel.school.templateId}   // ← was schoolConfig.templateId
        path={path}
        tenantState={tenantState}
      />
    </>
  );

─────────────────────────────────────────────────────────────
1E. Remove the KEYFRAMES constant and <style> injection
─────────────────────────────────────────────────────────────

The tenant page currently injects keyframes via:
  const KEYFRAMES = `@keyframes ed-fadeIn { ... }`;
  <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

This was only needed for the inline "not configured" card.
SystemPopup now handles its own keyframe injection.

KEEP the "not configured" JSX but:
  - Remove the KEYFRAMES constant
  - Remove the <style dangerouslySetInnerHTML... /> wrapper
  - The "not configured" card JSX still returns as-is without the style tag

─────────────────────────────────────────────────────────────
1F. Update the file header comment
─────────────────────────────────────────────────────────────

Replace the comment block at the top with:

// src/app/tenant/[[...path]]/page.tsx
//
// SSR-only Server Component for all tenant (customer) domains.
//
// Flow:
//   1. getSchoolByDomain(hostname)     → domain guard (not-configured gate)
//   2. fetchTenantScreen(...)          → RPC call, returns ScreenDataResult
//   3. buildTenantViewModel(payload)   → maps ScreenDataPayload → TenantViewModel
//   4. checkSubscription(viewModel)    → reads mode + subscription + plan from viewModel
//   5. render correct SystemPopup variant or template
//
// Guardrails:
//   - No client-side data fetching
//   - templateSlug comes from viewModel.school.templateId (RPC response), never from URL
//   - Subscription checks run AFTER RPC — grace period + mode come from RPC
//   - config.service is deleted — grace period lives in plan.gracePeriod

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — REWRITE demo/page.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─────────────────────────────────────────────────────────────
2A. Replace the imports block
─────────────────────────────────────────────────────────────

REMOVE:
  import { fetchScreenData, pathToScreenName } ...   ← replace with dedicated function

ADD / KEEP:
  import { headers } from 'next/headers';
  import { notFound } from 'next/navigation';
  import { fetchDemoScreen, pathToScreenName, normalizeDomain } from '@/core/services/screenData.service';
  import { buildTenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
  import type { TenantState } from '@/core/context/TenantContext';
  import TemplateRenderer from './TemplateRenderer';
  import { generateTenantMetadata, generateSchoolJsonLd, generateAboutMetadata, generateAboutJsonLd } from '@/core/utils/seo';
  import { Metadata } from 'next';
  import LeadCapturePopup from '@/components/lead/LeadCapturePopup';

─────────────────────────────────────────────────────────────
2B. Update domain normalization in TemplateDemoPage
─────────────────────────────────────────────────────────────

Replace:
  const hostname = host.split(':')[0].toLowerCase().replace(/^www\./, '');

With:
  const hostname = normalizeDomain(host);

─────────────────────────────────────────────────────────────
2C. Update the RPC call and viewModel build
─────────────────────────────────────────────────────────────

BEFORE:
  const result = await fetchScreenData(DEMO_DOMAIN, screenName, templateSlug);

  if (result.status === 'success') {
    tenantState = {
      status: 'success',
      data: buildTenantViewModel(result.data),   // ← old: result.data (array)
      message: '',
    };
  }

AFTER:
  const result = await fetchDemoScreen(templateSlug, screenName);   // ← new function

  if (result.status === 'success') {
    tenantState = {
      status: 'success',
      data: buildTenantViewModel(result.payload),   // ← new: result.payload (ScreenDataPayload)
      message: '',
    };
  }

The empty and error branches remain the same — only the function call and
the success payload access change.

─────────────────────────────────────────────────────────────
2D. Remove the DEMO_DOMAIN constant
─────────────────────────────────────────────────────────────

BEFORE:
  const DEMO_DOMAIN = 'eddesk.in';
  ...
  const result = await fetchScreenData(DEMO_DOMAIN, screenName, templateSlug);

AFTER: DEMO_DOMAIN is no longer referenced — fetchDemoScreen() handles
the domain internally. Remove the constant.

─────────────────────────────────────────────────────────────
2E. Update the file header comment
─────────────────────────────────────────────────────────────

Replace the comment block at the top with:

// src/app/demo/[templateSlug]/[[...path]]/page.tsx
//
// SSR-only Server Component for demo/preview routes.
// Accessible ONLY from owner domains (eddesk.in, localhost:*).
//
// Flow:
//   1. Validate templateSlug against VALID_SLUGS
//   2. Guard: notFound() if accessed from non-owner domain
//   3. fetchDemoScreen(templateSlug, screen)  → NO cache, domain always eddesk.in
//   4. buildTenantViewModel(payload)          → maps ScreenDataPayload → TenantViewModel
//   5. render template (NO subscription checks — demo bypasses all of them)
//
// Guardrails:
//   - No subscription checks — checkSubscription returns demo_bypass for mode='demo'
//   - No getSchoolByDomain call — demo does not have a registered domain
//   - templateSlug comes from URL param — validated against VALID_SLUGS server-side

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — THINGS TO EXPLICITLY NOT CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In tenant/page.tsx — do NOT change:
  [ ] The "not configured" JSX (the dark card with globe icon)
      Keep every style, every string, every element exactly as-is
      Only remove the outer <style> wrapper tag and KEYFRAMES constant
  [ ] generateMetadata function signature
  [ ] TenantPage function signature
  [ ] TemplateRenderer import path
  [ ] JSON-LD script blocks
  [ ] LeadCapturePopup is NOT in tenant/page.tsx — do not add it

In demo/page.tsx — do NOT change:
  [ ] VALID_SLUGS array
  [ ] OWNER_DOMAINS array
  [ ] The notFound() guard for invalid templateSlug
  [ ] The notFound() guard for non-owner domain access
  [ ] generateMetadata function (no changes needed there)
  [ ] LeadCapturePopup at the bottom of the JSX — keep it
  [ ] JSON-LD script blocks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

tenant/page.tsx:
  [ ] No import from config.service (deleted)
  [ ] No call to getGracePeriodDays()
  [ ] No call to fetchScreenData() (old shim — not used here anymore)
  [ ] fetchTenantScreen() used for RPC call
  [ ] normalizeDomain() used in both generateMetadata and TenantPage
  [ ] result.payload passed to buildTenantViewModel() (not result.data)
  [ ] checkSubscription(viewModel) called after buildTenantViewModel()
  [ ] variant="inactive" used when status === 'inactive'
  [ ] variant="expired" used when status === 'expired'
  [ ] No inline isActive check (removed — checkSubscription handles it)
  [ ] No inline expirationDate check (removed — checkSubscription handles it)
  [ ] No inline gracePeriodDays calculation (removed — in checkSubscription)
  [ ] KEYFRAMES constant removed
  [ ] <style dangerouslySetInnerHTML> wrapper removed
  [ ] "not configured" card JSX preserved exactly (just without the style wrapper)
  [ ] templateSlug for TemplateRenderer comes from viewModel.school.templateId
  [ ] Subscription checks run AFTER fetchTenantScreen(), not before

demo/page.tsx:
  [ ] No import from config.service
  [ ] No call to fetchScreenData() (old shim)
  [ ] fetchDemoScreen() used for RPC call
  [ ] normalizeDomain() used for hostname
  [ ] result.payload passed to buildTenantViewModel() (not result.data)
  [ ] No subscription checks (demo bypasses all)
  [ ] No getSchoolByDomain call
  [ ] DEMO_DOMAIN constant removed (fetchDemoScreen handles it internally)
  [ ] LeadCapturePopup still present at bottom of JSX
  [ ] VALID_SLUGS guard still present
  [ ] OWNER_DOMAINS guard still present

Both files:
  [ ] Only these two files were modified
  [ ] No template files touched
  [ ] No service files touched
  [ ] No component files touched (SystemPopup, SectionWarning, etc.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Files rewritten:   tenant/page.tsx, demo/page.tsx
  Other files:       NONE

  tenant/page.tsx changes:
    Removed:  getGracePeriodDays, fetchScreenData, inline isActive/expiry checks,
              KEYFRAMES constant, <style> wrapper
    Added:    fetchTenantScreen, normalizeDomain, checkSubscription
    Fixed:    result.payload (was result.data), viewModel.school.templateId
              (was schoolConfig.templateId), correct SystemPopup variants

  demo/page.tsx changes:
    Removed:  fetchScreenData, DEMO_DOMAIN constant
    Added:    fetchDemoScreen, normalizeDomain
    Fixed:    result.payload (was result.data)

  Subscription flow:
    Tenant: checkSubscription() after RPC — inactive/expired/grace_period handled
    Demo:   no subscription checks — mode='demo' means demo_bypass in checkSubscription

  Guardrails violated: NONE
