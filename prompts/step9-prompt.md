# EdDesk — Phase 1, Step 9
# Verify in browser — confirm full pipeline is wired correctly
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU DO ANYTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files first:
  1. src/core/services/screenData.service.ts    ← confirms RPC call and payload shape
  2. src/core/viewmodels/tenant.viewmodel.ts    ← confirms buildTenantViewModel signature
  3. src/core/business/subscription.ts          ← confirms checkSubscription logic
  4. src/app/tenant/[[...path]]/page.tsx         ← confirms Step 8 wiring
  5. src/app/demo/[templateSlug]/[[...path]]/page.tsx ← confirms Step 8 wiring

This step adds temporary debug logging, starts the dev server,
loads specific URLs, reads the terminal output, and verifies
each checkpoint. All debug logs are removed at the end of this step.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — HOW NEXT.JS LOGGING WORKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALL logs in server components and services print to the TERMINAL
(the process that runs `next dev`), NOT to the browser console.
The browser console only shows logs from 'use client' components.

screenData.service.ts is SSR-only — its console.log output appears
in the terminal where `next dev` is running.

To verify this step you must:
  1. Add targeted debug logs to specific files
  2. Start the dev server and load URLs
  3. Read the terminal output
  4. Confirm each checkpoint against expected output
  5. Remove all debug logs

The dev server runs at localhost:3000 (owner/demo routes).
Tenant routes run at localhost:3001, :3002, :3003 — these are
separate school domains stored in Supabase with those exact values.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — ADD TEMPORARY DEBUG LOGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add these console.log statements to the following files.
Mark every added line with the comment // STEP9_DEBUG so they
are easy to find and remove at the end of this step.

─────────────────────────────────────────────────────────────
File: src/core/services/screenData.service.ts
─────────────────────────────────────────────────────────────

In callRPC(), after the successful unwrap of payload, ADD:

  console.log('[STEP9] RPC unwrap OK', {  // STEP9_DEBUG
    mode:          payload.mode,
    screen:        payload.screen,
    schoolName:    payload.school?.name,
    tableKeys:     Object.keys(payload.data ?? {}),
    componentRows: (payload.data?.templatecomponents ?? []).length,
    heroRows:      (payload.data?.hero ?? []).length,
    broadcastRows: (payload.data?.broadcast ?? []).length,
    facultyRows:   (payload.data?.faculty ?? []).length,
    leadershipRows:(payload.data?.leadership ?? []).length,
  });                                       // STEP9_DEBUG

─────────────────────────────────────────────────────────────
File: src/core/viewmodels/tenant.viewmodel.ts
─────────────────────────────────────────────────────────────

In buildTenantViewModel(), after the deduplication step (after seenCodes
and dedupedComponents are built), ADD:

  console.log('[STEP9] templatecomponents dedup', {   // STEP9_DEBUG
    rawCount:    componentRows.length,
    dedupCount:  dedupedComponents.length,
    codes:       dedupedComponents.map(r => r[COL_TEMPLATE_COMPONENTS_CODE]),
  });                                                  // STEP9_DEBUG

At the very end of buildTenantViewModel(), just before the return {, ADD:

  console.log('[STEP9] viewModel built', {   // STEP9_DEBUG
    schoolName:        school?.name ?? '(empty)',
    mode:              payload.mode,
    subscriptionEndDate: subscription?.enddate ?? '(missing)',
    planGracePeriod:   plan?.graceperiod ?? '(missing)',
    heroCount:         heroRows.length,
    broadcastCount:    broadcastRows.length,
    facultyCount:      facultyRows.length,
    leadershipCount:   leadershipRows.length,
    statsCount:        statsRows.length,
    eventsCount:       eventRows.length,
    galleryCount:      galleryRows.length,
    achievementsCount: achievementRows.length,
    principalFound:    principal ? principal.name : '(none)',
    sectionsCount:     dedupedComponents.length,
    contactDetailsPresent: mappedContact !== null,
    academicResultPresent: mappedAcademicResult !== null,
  });                                        // STEP9_DEBUG

─────────────────────────────────────────────────────────────
File: src/core/business/subscription.ts
─────────────────────────────────────────────────────────────

At the start of checkSubscription(), after reading the fields, ADD:

  console.log('[STEP9] subscription check', {   // STEP9_DEBUG
    mode:         data.mode,
    isActive:     data.school?.isActive,
    endDate:      data.subscription?.endDate,
    gracePeriod:  data.plan?.gracePeriod,
  });                                            // STEP9_DEBUG

Just before each return statement, ADD a log of the result:

  // Before return { status: 'demo_bypass', ... }:
  console.log('[STEP9] subscription result: demo_bypass');  // STEP9_DEBUG

  // Before return { status: 'inactive', ... }:
  console.log('[STEP9] subscription result: inactive');     // STEP9_DEBUG

  // Before return { status: 'expired', ... }:
  console.log('[STEP9] subscription result: expired');      // STEP9_DEBUG

  // Before return { status: 'grace_period', ... }:
  console.log('[STEP9] subscription result: grace_period, daysRemaining:', daysRemaining);  // STEP9_DEBUG

  // Before return { status: 'active', ... }:
  console.log('[STEP9] subscription result: active');       // STEP9_DEBUG

─────────────────────────────────────────────────────────────
File: src/app/tenant/[[...path]]/page.tsx
─────────────────────────────────────────────────────────────

At the start of TenantPage(), after hostname is resolved, ADD:

  console.log('[STEP9] TenantPage request', { hostname, path });  // STEP9_DEBUG

After fetchTenantScreen() resolves, ADD:

  console.log('[STEP9] fetchTenantScreen result.status:', result.status);  // STEP9_DEBUG

─────────────────────────────────────────────────────────────
File: src/app/demo/[templateSlug]/[[...path]]/page.tsx
─────────────────────────────────────────────────────────────

At the start of TemplateDemoPage(), after hostname is resolved, ADD:

  console.log('[STEP9] DemoPage request', { templateSlug, hostname, path });  // STEP9_DEBUG

After fetchDemoScreen() resolves, ADD:

  console.log('[STEP9] fetchDemoScreen result.status:', result.status);  // STEP9_DEBUG

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — START THE DEV SERVER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Start the Next.js dev server on port 3000 (the owner/demo port):

  npm run dev -- --port 3000

Wait until you see "Ready in Xms" in the terminal output before
proceeding to Phase 3. If the server fails to start, report the
error and stop — do not proceed with verification.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — VERIFY DEMO ROUTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Load this URL (from the terminal using curl or a headless fetch):

  curl -s -o /dev/null http://localhost:3000/demo/template_classic

Then read the terminal output and confirm ALL of the following:

  CHECK D1 — Demo page request logged
    Expected: [STEP9] DemoPage request { templateSlug: 'template_classic', ... }
    Fail if:  Log missing → TemplateDemoPage not reached

  CHECK D2 — RPC called with correct parameters
    Expected: [screenData] RPC call → { domain: 'eddesk.in', screen: 'home', templateSlug: 'template_classic' }
    Fail if:  domain is not 'eddesk.in'
    Fail if:  templateSlug is null (should not be null for demo)

  CHECK D3 — RPC unwrapped correctly
    Expected: [STEP9] RPC unwrap OK { mode: 'demo', screen: 'home', ... }
    Fail if:  mode is 'live' instead of 'demo'
    Fail if:  tableKeys is empty []
    Fail if:  tableKeys does not include 'hero', 'broadcast', 'templatecomponents'

  CHECK D4 — templatecomponents deduplicated
    Expected: [STEP9] templatecomponents dedup { rawCount: N, dedupCount: M, codes: [...] }
    Fail if:  dedupCount === rawCount AND rawCount > 10
              (suggests deduplication not running — raw rows likely have duplicates)
    Fail if:  codes array is empty
    Pass if:  dedupCount < rawCount (deduplication removed duplicates)
    Pass if:  dedupCount === rawCount AND rawCount <= 13
              (no duplicates in this environment — also acceptable)

  CHECK D5 — viewModel built with real data
    Expected: [STEP9] viewModel built { schoolName: '<name>', mode: 'demo', ... }
    Fail if:  schoolName is '(empty)'
    Fail if:  heroCount === 0 AND broadcastCount === 0 AND facultyCount === 0
              (all zero means RPC returned data but viewModel is reading wrong keys)
    NOTE: Some counts being 0 is acceptable — depends on demo school data

  CHECK D6 — subscription check skipped for demo
    Expected: [STEP9] subscription check { mode: 'demo', ... }
    Expected: [STEP9] subscription result: demo_bypass
    Fail if:  subscription result is 'inactive' or 'expired'
    Fail if:  no subscription log at all (tenant page only — demo page does
              NOT call checkSubscription, so these logs should NOT appear)
    IMPORTANT: If these logs DO appear on the demo route, it means
               checkSubscription() is being called on demo — that is a bug.
               The demo page should NOT call checkSubscription at all.

  CHECK D7 — fetchDemoScreen result logged
    Expected: [STEP9] fetchDemoScreen result.status: success
    Fail if:  status is 'error' or 'empty'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — VERIFY TENANT ROUTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For a tenant route, the request Host header must be localhost:3001.
Use curl with an explicit Host header to simulate this:

  curl -s -o /dev/null -H "Host: localhost:3001" http://localhost:3000/

Then read the terminal output and confirm ALL of the following:

  CHECK T1 — Tenant page request logged
    Expected: [STEP9] TenantPage request { hostname: 'localhost:3001', path: '/' }
    Fail if:  hostname is 'localhost' (port stripped — normalizeDomain bug)
    Fail if:  hostname is 'localhost:3000' (using wrong host)

  CHECK T2 — school.service resolved the domain
    Expected: no "[school.service] No school found" error in output
    Fail if:  "No school found for domain: localhost:3001" appears
              → means localhost:3001 is not in the schools table in Supabase

  CHECK T3 — RPC called with correct parameters
    Expected: [screenData] RPC call → { domain: 'localhost:3001', screen: 'home', templateSlug: null }
    Fail if:  templateSlug is not null (tenant calls must always pass null)
    Fail if:  domain is 'localhost' (port stripped — normalizeDomain bug)

  CHECK T4 — RPC unwrapped correctly
    Expected: [STEP9] RPC unwrap OK { mode: 'live', screen: 'home', ... }
    Fail if:  mode is 'demo' (tenant should return 'live')
    Fail if:  tableKeys is empty

  CHECK T5 — viewModel built with real data
    Expected: [STEP9] viewModel built { schoolName: '<school name>', mode: 'live', ... }
    Fail if:  schoolName is '(empty)'
    Fail if:  subscriptionEndDate is '(missing)'
    Fail if:  planGracePeriod is '(missing)'

  CHECK T6 — subscription check runs and logs result
    Expected: [STEP9] subscription check { mode: 'live', isActive: true, endDate: '...', gracePeriod: N }
    Expected: [STEP9] subscription result: active   (or grace_period if near expiry)
    Fail if:  subscription result is 'demo_bypass' on a tenant route
    Fail if:  no subscription log at all (means checkSubscription not called)

  CHECK T7 — fetchTenantScreen result logged
    Expected: [STEP9] fetchTenantScreen result.status: success
    Fail if:  status is 'error' or 'empty'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — TRIAGE FAILURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If any check fails, diagnose before attempting a fix.
Use this table to identify the root cause:

  SYMPTOM                                  LIKELY CAUSE
  ─────────────────────────────────────────────────────────────
  No [STEP9] logs at all                   Server not restarted after code changes
                                           or syntax error in modified file

  tableKeys is empty []                    RPC returning empty data or unwrap failing
                                           Check raw response: add console.log(raw) in callRPC()

  schoolName is '(empty)'                  payload.school is null or missing key
                                           Check COL_SCHOOLS_NAME value in reference.js

  heroCount === 0 (all counts zero)        payload.data keys don't match ScreenDataTables keys
                                           Log Object.keys(payload.data) to verify exact keys

  subscriptionEndDate is '(missing)'       subscription object has different key name
                                           Log payload.subscription to see actual keys

  planGracePeriod is '(missing)'           plan object has different key name
                                           Log payload.plan to see actual keys

  hostname is 'localhost' not ':3001'      normalizeDomain() stripping port
                                           Check normalizeDomain() in screenData.service.ts

  "No school found for localhost:3001"     Domain not in Supabase schools table
                                           Confirm by checking Supabase dashboard —
                                           schools.customdomain should have 'localhost:3001'

  mode is 'live' on demo route             RPC not receiving templateSlug
                                           or demo school not configured in Supabase

  dedupCount === rawCount with rawCount    No duplicates in this env — acceptable
  <= 13                                    Check codes array — should be reasonable count

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6 — REMOVE DEBUG LOGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Once ALL checks pass (or failures have been triaged and fixed):

Search for every line containing // STEP9_DEBUG and remove it.

Files to clean:
  src/core/services/screenData.service.ts
  src/core/viewmodels/tenant.viewmodel.ts
  src/core/business/subscription.ts
  src/app/tenant/[[...path]]/page.tsx
  src/app/demo/[templateSlug]/[[...path]]/page.tsx

Command to verify no debug logs remain:
  grep -rn "STEP9_DEBUG" src/

Expected output: no results.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 7 — FINAL REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Report the result of every check using this format:

  DEMO ROUTE (localhost:3000/demo/template_classic):
    D1 Demo page request logged      PASS / FAIL
    D2 RPC called with eddesk.in     PASS / FAIL
    D3 RPC unwrapped, mode=demo      PASS / FAIL
    D4 templatecomponents deduped    PASS / FAIL — raw: N, dedup: M, codes: [...]
    D5 viewModel has real data       PASS / FAIL — school: '<name>', hero: N
    D6 Subscription skipped (demo)   PASS / FAIL
    D7 fetchDemoScreen success       PASS / FAIL

  TENANT ROUTE (Host: localhost:3001 → localhost:3000/):
    T1 hostname=localhost:3001        PASS / FAIL
    T2 Domain found in Supabase       PASS / FAIL
    T3 RPC called, templateSlug=null  PASS / FAIL
    T4 RPC unwrapped, mode=live       PASS / FAIL
    T5 viewModel fields populated     PASS / FAIL — endDate: '...', grace: N
    T6 Subscription check=active      PASS / FAIL
    T7 fetchTenantScreen success      PASS / FAIL

  Debug logs removed: PASS / FAIL
    grep STEP9_DEBUG result: (empty = pass)

  Any fixes applied during this step:
    (list files changed and what was fixed, or "none")

  Phase 1 complete: YES / NO
