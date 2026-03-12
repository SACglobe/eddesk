# EdDesk — Fix Demo Routing (3 files)
# Demo shows dummy data instead of Supabase data
# proxy never executes because it's named wrong
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these four files in order:
  1. src/proxy.ts                                          ← will be moved + fixed
  2. src/core/services/screenData.service.ts               ← fetchDemoScreen fix
  3. src/app/demo/[templateSlug]/[[...path]]/page.tsx      ← call site fix
  4. src/app/demo/[templateSlug]/[[...path]]/TemplateRenderer.tsx ← understand fallback

Do not touch any other files.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROOT CAUSE SUMMARY — THREE BUGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUG 1 — src/proxy.ts is NEVER executed
  Next.js only runs a file named exactly proxy.ts at src/proxy.ts.
  src/proxy.ts is ignored entirely. Tenant domains are never rewritten.
  Fix: rename the file AND fix two bugs inside it.

BUG 2 — fetchDemoScreen sends wrong domain to RPC
  demo/page.tsx calls: fetchDemoScreen(hostname, templateSlug, screenName)
  hostname = 'localhost:3000' (the browser host)
  This makes the RPC query p_domain='localhost:3000' which maps to the
  live abc-school in Supabase — NOT the demo school.
  The demo school lives at domain='eddesk.in' in Supabase.
  Fix: fetchDemoScreen must always use the internal DEMO_DOMAIN='eddesk.in'
  constant — the caller should never pass a domain for demo routes.

BUG 3 — demo/page.tsx swallows RPC empty/error as 'success'
  When the RPC returns status='empty', the page sets:
    status: 'success', data: null
  TemplateRenderer sees status='success' but data=null, falls through
  to buildTenantViewModelFromLocal(LOCAL_TENANT_DATA) and renders
  dummy data with no error shown and no way to know the RPC failed.
  Fix: pass the real status ('empty' or 'error') through to TemplateRenderer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Q1. What does src/proxy.ts currently import domain_data from?
      (The path is wrong — you must fix it when you move the file.)

  Q2. What is the current signature of fetchDemoScreen()?
      How many parameters does it take?

  Q3. In demo/page.tsx, what value does hostname hold when running
      on localhost:3000? Is it 'localhost:3000' or 'eddesk.in'?

  Q4. In TemplateRenderer.tsx, what happens when
      tenantState.status === 'success' AND tenantState.data === null?
      Does it use Supabase data or LOCAL_TENANT_DATA?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX A — Move and fix src/proxy.ts → src/proxy.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE: src/proxy.ts
DELETE: src/proxy.ts

The content of src/proxy.ts is the full content of src/proxy.ts
with the following FOUR changes applied:

─────────────────────────────────────────────────────────────
A1. Rename the export function from 'proxy' to 'proxy'
─────────────────────────────────────────────────────────────

BEFORE:
  export function proxy(request: NextRequest) {

AFTER:
  export function proxy(request: NextRequest) {

Also update the default export at the bottom:
  BEFORE: export default proxy;
  AFTER:  export default proxy;

─────────────────────────────────────────────────────────────
A2. Fix the import path for domain_data
─────────────────────────────────────────────────────────────

BEFORE:
  import domain_data from './app/lib/constants';

AFTER:
  import domain_data from '@/lib/constants/constants';

Reason: The file is moving from src/proxy.ts to src/proxy.ts.
The relative path './app/lib/constants' was already wrong (the file
doesn't exist there). The correct location is src/lib/constants/constants.js
which maps to '@/lib/constants/constants' via the tsconfig path alias.

─────────────────────────────────────────────────────────────
A3. Fix the port-stripping bug in hostname normalization
─────────────────────────────────────────────────────────────

BEFORE:
  const hostname = host.split(':')[0].toLowerCase().replace(/^www\./, '');

AFTER:
  const hostname = host.toLowerCase().replace(/^www\./, '');

Reason: The old code strips the port from the host before looking up
in domain_data. But domain_data stores 'localhost:3000' with the port.
Stripping it means 'localhost:3000' becomes 'localhost' which never
matches any entry. Keep the full host including port for matching.

─────────────────────────────────────────────────────────────
A4. Update the comment header
─────────────────────────────────────────────────────────────

Replace the existing console.log at the top with a comment:

  // src/proxy.ts
  // Next.js Edge proxy — domain-based routing
  //
  // Routes:
  //   Owner domains (localhost:3000, eddesk.in) → marketing page (NextResponse.next())
  //   /demo/* routes from owner domains          → demo template (NextResponse.next())
  //   /demo/* routes from tenant domains         → 404
  //   All other domains                          → rewrite to /tenant/[...path]
  //
  // domain_data source: src/lib/constants/constants.js
  // Will be replaced with Supabase lookup in a future migration step.

Keep all existing console.log debug lines — do not remove them.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX B — src/core/services/screenData.service.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─────────────────────────────────────────────────────────────
B1. Remove domain parameter from fetchDemoScreen
─────────────────────────────────────────────────────────────

BEFORE:
  /**
   * Fetch screen data for a DEMO route.
   * NO cache — marketing team needs changes to reflect instantly.
   * Domain is explicitly passed from the request context (e.g. localhost:3000 vs eddesk.in).
   */
  export async function fetchDemoScreen(
      domain: string,
      templateSlug: string,
      screen: string
  ): Promise<ScreenDataResult> {
      return callRPC(domain, screen, templateSlug);
  }

AFTER:
  /**
   * Fetch screen data for a DEMO route.
   * NO cache — marketing team needs changes to reflect instantly.
   * Domain is ALWAYS 'eddesk.in' — the demo school lives there in Supabase.
   * Never pass the browser host here — demo data is not domain-specific.
   */
  export async function fetchDemoScreen(
      templateSlug: string,
      screen: string
  ): Promise<ScreenDataResult> {
      return callRPC(DEMO_DOMAIN, screen, templateSlug);
  }

─────────────────────────────────────────────────────────────
B2. Fix the legacy shim that also calls fetchDemoScreen
─────────────────────────────────────────────────────────────

The deprecated shim at the bottom of the file also calls fetchDemoScreen
with the old 3-argument signature. Update it to match:

BEFORE:
  /** @deprecated Use fetchTenantScreen or fetchDemoScreen instead */
  export async function fetchTenantScreenData(
      domain: string,
      templateSlug: string,
      screen: string
  ): Promise<ScreenDataResult> {
      if (domain === DEMO_DOMAIN) {
          return fetchDemoScreen(domain, templateSlug, screen);
      }
      return fetchTenantScreen(domain, screen);
  }

AFTER:
  /** @deprecated Use fetchTenantScreen or fetchDemoScreen instead */
  export async function fetchTenantScreenData(
      domain: string,
      templateSlug: string,
      screen: string
  ): Promise<ScreenDataResult> {
      if (domain === DEMO_DOMAIN) {
          return fetchDemoScreen(templateSlug, screen);  // domain removed
      }
      return fetchTenantScreen(domain, screen);
  }

─────────────────────────────────────────────────────────────
B3. Update the file header comment calling convention docs
─────────────────────────────────────────────────────────────

BEFORE:
  *   Demo home:     fetchDemoScreen('template_classic', 'home')
  *   Demo about:    fetchDemoScreen('template_classic', 'about')

These are already correct — no change needed if they already show
2 args. If they show 3 args, update to 2 args.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX C — src/app/demo/[templateSlug]/[[...path]]/page.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─────────────────────────────────────────────────────────────
C1. Fix the fetchDemoScreen call — remove hostname argument
─────────────────────────────────────────────────────────────

BEFORE:
  const result = await fetchDemoScreen(hostname, templateSlug, screenName);

AFTER:
  const result = await fetchDemoScreen(templateSlug, screenName);

─────────────────────────────────────────────────────────────
C2. Remove the normalizeDomain import (no longer needed here)
─────────────────────────────────────────────────────────────

BEFORE:
  import { fetchDemoScreen, pathToScreenName, normalizeDomain } from '@/core/services/screenData.service';

AFTER:
  import { fetchDemoScreen, pathToScreenName } from '@/core/services/screenData.service';

─────────────────────────────────────────────────────────────
C3. Remove hostname and normalizeDomain from the function body
─────────────────────────────────────────────────────────────

BEFORE (inside TemplateDemoPage):
  const host = headersList.get('host') || '';
  const hostname = normalizeDomain(host);
  const domainOnly = host.split(':')[0].toLowerCase();

  const isOwner = OWNER_DOMAINS.includes(domainOnly);

AFTER:
  const host = headersList.get('host') || '';
  const domainOnly = host.split(':')[0].toLowerCase();

  const isOwner = OWNER_DOMAINS.includes(domainOnly);

Remove the hostname variable entirely — it is no longer used anywhere
in the function after Fix C1.

─────────────────────────────────────────────────────────────
C4. Fix the JSON-LD script — replace hostname with a constant
─────────────────────────────────────────────────────────────

The JSON-LD block references hostname which we just removed.
Replace it with the demo domain string directly:

BEFORE:
  __html: JSON.stringify(generateSchoolJsonLd(tenantState.data, hostname))
  __html: JSON.stringify(generateAboutJsonLd(tenantState.data, hostname))

AFTER:
  __html: JSON.stringify(generateSchoolJsonLd(tenantState.data, 'eddesk.in'))
  __html: JSON.stringify(generateAboutJsonLd(tenantState.data, 'eddesk.in'))

─────────────────────────────────────────────────────────────
C5. Stop swallowing empty/error as success
─────────────────────────────────────────────────────────────

BEFORE:
  } else {
      // Handle error or empty state
      // DEMO BYPASS: If empty, pretend success so TemplateRenderer falls back to LOCAL_TENANT_DATA silently
      tenantState = {
          status: result.status === 'empty' ? 'success' : 'error',
          data: null as any,
          message: result.status === 'error' ? result.error : result.message,
      };
  }

AFTER:
  } else if (result.status === 'empty') {
      tenantState = {
          status: 'empty',
          data: null,
          message: result.message,
      };
  } else {
      tenantState = {
          status: 'error',
          data: null,
          message: result.error,
      };
  }

Reason: The comment "pretend success so TemplateRenderer falls back to
LOCAL_TENANT_DATA silently" was intentionally hiding RPC failures behind
dummy data. Now that the RPC is fixed to use DEMO_DOMAIN='eddesk.in', the
RPC should return real data. If it returns empty or error, that is a real
problem that should show SystemPopup — not silently render dummy data.

─────────────────────────────────────────────────────────────
C6. Update the file header comment
─────────────────────────────────────────────────────────────

BEFORE:
  //   3. fetchDemoScreen(templateSlug, screen)  → NO cache, domain always eddesk.in

This is already correct if it says 2 args. If it shows 3 args (old),
update it to 2 args. No other changes to the header.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT NOT TO CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Do NOT touch:
    src/core/viewmodels/tenant.viewmodel.ts
    src/app/tenant/[[...path]]/page.tsx
    src/app/demo/[templateSlug]/[[...path]]/TemplateRenderer.tsx
    src/components/system/SystemPopup.tsx
    src/lib/constants/constants.js
    Any template files

  The TemplateRenderer fallback to LOCAL_TENANT_DATA is intentional
  for the tenant page (when a real tenant has no data yet). Do not
  remove it from TemplateRenderer.tsx — only stop the demo page from
  deliberately triggering it by faking a 'success' status.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files created:
  [ ] src/proxy.ts exists

Files deleted:
  [ ] src/proxy.ts no longer exists

proxy.ts:
  [ ] Function is named 'proxy' (not 'proxy')
  [ ] Default export is 'proxy'
  [ ] Import uses '@/lib/constants/constants' (not './app/lib/constants')
  [ ] hostname does NOT call .split(':')[0] — port is preserved
  [ ] config.matcher export is still present at the bottom
  [ ] All existing logic (demo bypass, owner bypass, tenant rewrite) preserved

screenData.service.ts:
  [ ] fetchDemoScreen takes 2 params: (templateSlug, screen)
  [ ] fetchDemoScreen calls callRPC(DEMO_DOMAIN, screen, templateSlug)
  [ ] DEMO_DOMAIN constant is still 'eddesk.in'
  [ ] Legacy shim fetchTenantScreenData updated to call fetchDemoScreen(templateSlug, screen)
  [ ] No TypeScript errors on fetchDemoScreen signature

demo/page.tsx:
  [ ] fetchDemoScreen called with 2 args: (templateSlug, screenName)
  [ ] normalizeDomain removed from import
  [ ] hostname variable removed from function body
  [ ] domainOnly variable still present (used for OWNER_DOMAINS check)
  [ ] JSON-LD uses 'eddesk.in' string directly (not hostname)
  [ ] Empty result sets status: 'empty' (not 'success')
  [ ] Error result sets status: 'error'
  [ ] No 'data: null as any' anywhere — use 'data: null'
  [ ] VALID_SLUGS guard still present
  [ ] OWNER_DOMAINS guard still present
  [ ] LeadCapturePopup still at bottom of JSX

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERIFY IN BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After making changes, restart the dev server and test:

  1. localhost:3000/
     Expected: EdDesk marketing page
     Fail if:  Shows a template or dummy school data

  2. localhost:3000/demo/template_modern
     Expected: template_modern rendering data from Supabase (eddesk.in demo school)
     Fail if:  Shows 'Sunrise International School' or other dummy data
     Fail if:  Shows SystemPopup 'empty' (means RPC returned no data for eddesk.in)

  3. Terminal logs for test 2 should show:
     [screenData] RPC call → { domain: 'eddesk.in', screen: 'home', templateSlug: 'template_modern' }
     NOT: { domain: 'localhost:3000', ... }

  4. localhost:3000/demo/template_classic
     Expected: template_classic rendering Supabase data
     Same checks as test 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Files created:  src/proxy.ts
  Files deleted:  src/proxy.ts
  Files modified: src/core/services/screenData.service.ts
                  src/app/demo/[templateSlug]/[[...path]]/page.tsx

  Bug A fixed: proxy.ts now executes (was proxy.ts — ignored by Next.js)
  Bug B fixed: fetchDemoScreen always uses eddesk.in (was using localhost:3000)
  Bug C fixed: empty/error RPC results show SystemPopup (was silently using dummy data)
