# EdDesk — Complete Project Context
# Read this FIRST before making any changes to any file.
# Last updated: March 2026
# ─────────────────────────────────────────────────────────────────────────────

## What is EdDesk?

EdDesk is a **multi-tenant SaaS platform** that builds and hosts school websites.
Each school gets their own website powered by one of three design templates.
EdDesk manages everything — hosting, content, subscriptions — through a single
Next.js codebase that serves all schools simultaneously.

**End Game:**
- Schools sign up via admin.eddesk.in
- They get a website at their own domain (e.g. greenvalley.com)
- Their site renders from their Supabase data automatically
- EdDesk team can preview any template at eddesk.in/demo/template_modern
- Schools can be activated, deactivated, or expired based on subscription

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, SSR only) |
| Database | Supabase (PostgreSQL + RPC functions) |
| Hosting | Vercel |
| Styling | Tailwind CSS |
| Language | TypeScript + JavaScript (mixed — classic template is JS) |

---

## Repository & Branch Strategy

```
main          → eddesk.in (production — stable)
phase/1       → test.eddesk.in (current active development)
phase/2       → next phase (created after phase/1 merges)
```

**Rules:**
- Never commit directly to main
- All work goes on the current phase branch
- Merge to main only when confirmed working on test.eddesk.in
- Each merge to main = a rollback checkpoint

**Vercel mapping:**
- eddesk.in → main branch
- test.eddesk.in → phase/1 branch (preview URL on Hobby plan)

---

## Project File Structure (Key Files Only)

```
src/
├── middleware.ts                          ← CRITICAL: domain routing (was proxy.ts — must be middleware.ts)
├── proxy.ts                               ← OLD NAME — Next.js ignores this, rename to middleware.ts
│
├── app/
│   ├── page.tsx                           ← EdDesk marketing homepage (localhost:3000, eddesk.in)
│   ├── tenant/[[...path]]/page.tsx        ← All school tenant websites
│   └── demo/[templateSlug]/[[...path]]/
│       ├── page.tsx                       ← Demo/preview routes
│       └── TemplateRenderer.tsx           ← Client component that renders templates
│
├── core/
│   ├── services/
│   │   ├── screenData.service.ts          ← RPC caller — ONLY data entry point
│   │   └── school.service.ts             ← getSchoolByDomain() domain guard
│   ├── viewmodels/
│   │   └── tenant.viewmodel.ts           ← Maps RPC payload → TenantViewModel
│   └── business/
│       └── subscription.ts              ← Subscription status checker
│
├── lib/
│   ├── constants/
│   │   ├── reference.js                  ← ALL table/column name constants
│   │   └── constants.js                  ← Domain → template mapping (local, pre-Supabase)
│   └── supabase.ts                       ← Supabase client factory
│
├── components/
│   ├── system/
│   │   ├── SystemPopup.tsx               ← Full-screen error/state overlays
│   │   ├── SectionWarning.tsx            ← Inline section-level warnings (built, not yet wired)
│   │   └── SystemPopupProvider.tsx       ← Context provider for SystemPopup
│   └── lead/
│       └── LeadCapturePopup.tsx          ← Lead capture on demo routes only
│
└── templates/
    ├── registry.ts                        ← Template slug → component mapping
    ├── template_classic/                  ← JS template (older, screens/*.js)
    ├── template_modern/                   ← TSX template (screens in app/page.tsx etc.)
    └── template_premium/                  ← TSX template (screens in app/page.tsx etc.)
```

---

## Domain Routing — How It Works

### The Middleware (src/middleware.ts)

⚠️ CRITICAL BUG — currently named `src/proxy.ts`. Next.js ONLY runs `src/middleware.ts`.
The file must be renamed for tenant routing to work in production.

**Routing decision tree:**

```
Request comes in
│
├── pathname starts with /_next, /api, or has a dot (.)
│   → NextResponse.next() [static/internal bypass]
│
├── pathname starts with /demo
│   ├── host includes 'localhost' OR '127.0.0.1' OR 'eddesk.in'
│   │   → NextResponse.next() [owner can access demo]
│   └── any other host
│       → 404 [tenants cannot access demo routes]
│
├── domain found in constants.js with type='owner'
│   OR host is 'localhost:3000' or '127.0.0.1:3000'
│   OR hostname is 'eddesk.in'
│   → NextResponse.next() [marketing page]
│
└── any other domain (tenant domain like greenvalley.com)
    → rewrite URL to /tenant{pathname}
    → tenant/[[...path]]/page.tsx handles it
```

### Domain Data Source (currently local, future: Supabase)

`src/lib/constants/constants.js` maps known domains:

```js
{ domain: 'localhost:3000',        type: 'owner'  }  // marketing
{ domain: 'eddesk.in',             type: 'owner'  }  // marketing + demo
{ domain: 'localhost:3001',        type: 'tenant', template_id: 'template_classic' }
{ domain: 'localhost:3002',        type: 'tenant', template_id: 'template_modern'  }
{ domain: 'localhost:3003',        type: 'tenant', template_id: 'template_premium' }
{ domain: 'crescentthoothukudi.in',type: 'tenant', template_id: 'template_modern'  }
{ domain: 'selvan.dev',            type: 'tenant', template_id: 'template_classic' }
{ domain: 'thearun.dev',           type: 'tenant', template_id: 'template_premium' }
```

**Known bug in middleware hostname normalization:**
```ts
// WRONG — strips port before matching, breaks localhost:3001
const hostname = host.split(':')[0].toLowerCase().replace(/^www\./, '');

// CORRECT — keep port for matching
const hostname = host.toLowerCase().replace(/^www\./, '');
```

---

## Data Pipeline — How Data Flows

### The Single RPC Function

All data comes from ONE Supabase RPC: `get_screen_data`

```
Parameters:
  p_domain       TEXT   — school's custom domain OR 'eddesk.in' for demo
  p_screen_slug  TEXT   — 'home' | 'about' | 'faculty' | etc.
  p_template_slug TEXT  — null for real schools, 'template_modern' etc. for demo

Returns: Direct JSON object (NOT wrapped in array)
Shape: {
  mode: 'demo' | 'live',
  screen: string,
  school: { ...school row fields },
  subscription: { status, enddate },
  plan: { name, graceperiod },
  data: {
    hero: [...],
    broadcast: [...],
    faculty: [...],
    leadership: [...],
    schoolstats: [...],
    achievements: [...],
    events: [...],
    gallery: [...],
    activities: [...],
    infrastructure: [...],
    templatecomponents: [...],
    academicresults: { ...single object },   ← NOT an array
    contactdetails: { ...single object },    ← NOT an array
  }
}
```

⚠️ IMPORTANT: The RPC returns the payload DIRECTLY as a JSON object.
It is NOT wrapped in `[{ get_screen_data: {...} }]`.
`raw` from `supabase.rpc()` IS the payload. Do not do `raw[0]?.get_screen_data`.

### The Full Data Flow

```
Browser Request
      │
      ▼
middleware.ts         — routes domain to /tenant or passes through for demo/marketing
      │
      ▼
tenant/page.tsx       — OR — demo/page.tsx
      │                         │
      ▼                         ▼
getSchoolByDomain()    [skipped for demo]
(domain guard only)
      │
      ▼
fetchTenantScreen()   — OR — fetchDemoScreen()
  (cached 60s)              (no cache)
      │                         │
      └──────────┬──────────────┘
                 ▼
            callRPC()
         supabase.rpc('get_screen_data', { p_domain, p_screen_slug, p_template_slug })
                 │
                 ▼
         raw = direct payload object
                 │
                 ▼
         ScreenDataResult: { status: 'success' | 'empty' | 'error', payload? }
                 │
                 ▼
      buildTenantViewModel(payload)
         Maps raw DB fields → normalized TenantViewModel
         Uses reference.js constants for all column names
                 │
                 ▼
      checkSubscription(viewModel)      ← ONLY for tenant routes, never demo
         Returns: { status, isAccessAllowed, daysRemaining }
                 │
                 ▼
      TemplateRenderer
         Picks template from registry by templateSlug
         Passes TenantViewModel as `data` prop to template
                 │
                 ▼
      Template (template_modern/app/page.tsx etc.)
         Reads from data.heroMedia, data.announcements, data.personnel, etc.
```

---

## Demo vs Tenant — Key Differences

| Aspect | Demo Route | Tenant Route |
|--------|-----------|--------------|
| URL pattern | /demo/template_modern/* | any other domain/* |
| Who can access | Owner domains only | Anyone with the domain |
| Domain sent to RPC | Always 'eddesk.in' | School's actual domain |
| templateSlug in RPC | URL param (template_modern) | null (comes from DB) |
| Subscription check | NEVER — skipped | Always runs |
| Caching | None | 60 seconds |
| LeadCapturePopup | Yes | No |
| Data source in Supabase | eddesk.in school row | School's own row |

---

## TenantViewModel — The Data Contract

Every template receives a `TenantViewModel` object as its `data` prop.
Never access raw Supabase fields in templates — always go through this contract.

```typescript
TenantViewModel {
  mode: 'demo' | 'live'
  screen: string

  school: {
    key, name, slug, customDomain, templateSlug, templateId (alias),
    isActive, isDemo, logoUrl, email, phone, address, city, state,
    country, postalCode, fullAddress, themeConfig, paymentGatewayUrl
  }

  subscription: { status, endDate }
  plan: { name, gracePeriod }  // gracePeriod in days

  // Section visibility (from templatecomponents table, deduplicated)
  components: [{ componentCode, isActive, isRequired, displayOrder }]

  // SAME DATA — legacy name kept for template backward compat
  homepageSections: [{ sectionKey, isEnabled, isRequired, displayOrder }]

  // Content arrays
  heroMedia: [{ id, headline, subheadline, mediaType, mediaUrl, ... }]
  announcements: [...]   // ← compat alias for broadcast
  broadcast: [...]       // ← canonical new name
  faculty: [...]
  leadership: [...]      // NEW — split from personnel
  principal: { ... } | null  // derived: leadership.find(role==='principal')
  statistics: [...]      // ← compat alias for stats
  stats: [...]           // ← canonical new name
  achievements: [...]
  events: [...]
  mediaLibrary: [...]    // ← compat alias for gallery
  gallery: [...]         // ← canonical new name
  activities: [...]
  facilities: [...]      // ← compat alias for infrastructure
  infrastructure: [...]  // ← canonical new name
  academicResults: [...]  // ← compat: wraps single object in array
  academicResult: {...} | null  // ← canonical: single object from RPC
  contactDetails: {...} | null

  // Legacy merged array — still used by some templates
  personnel: [...]  // leadership rows + faculty rows merged
                    // personType = role for leadership ('principal','chairman')
                    // personType = 'faculty' for faculty rows
  identity: { vision, mission, motto, aboutTitle, aboutDescription }
}
```

---

## Subscription Logic

```
checkSubscription(viewModel) returns one of:

'demo_bypass'  → mode === 'demo'  → isAccessAllowed: true   (skip all checks)
'inactive'     → school.isActive === false  → isAccessAllowed: false
'expired'      → now > endDate + gracePeriod days  → isAccessAllowed: false
'grace_period' → now > endDate but within grace  → isAccessAllowed: true (show warning)
'active'       → subscription valid  → isAccessAllowed: true
```

When `isAccessAllowed` is false, tenant/page.tsx shows `<SystemPopup variant="inactive">` or `<SystemPopup variant="expired">`.

---

## SystemPopup Variants

`<SystemPopup variant="..." />` — full screen overlay

| Variant | Trigger | Color | Action |
|---------|---------|-------|--------|
| empty | RPC returned no data | blue/indigo | link to admin.eddesk.in |
| error | RPC error / unexpected | red | shows error message |
| network_error | offline detection | yellow | auto-retries on reconnect |
| inactive | school.isActive = false | red | link to admin.eddesk.in |
| expired | subscription expired | orange | link to admin.eddesk.in |

---

## Templates

Three templates, all receive identical `TenantViewModel` data prop:

| Slug | Language | Location | Screens |
|------|----------|----------|---------|
| template_classic | JavaScript | src/templates/template_classic/ | HomeScreen, AboutScreen, FacultyScreen, AcademicsScreen, ContactScreen, BlogScreen, PortraitScreen, InfrastructureScreen, AdmissionScreen, ActivitiesScreen, BroadcastScreen, DisclosureScreen |
| template_modern | TypeScript | src/templates/template_modern/ | page.tsx, about, faculty, events, gallery, academics, activities, admissions, contact, infrastructure, portrait |
| template_premium | TypeScript | src/templates/template_premium/ | page.tsx, about, faculty, events, academics, activities, admissions, contact, infrastructure, portrait |

**Template Registry:** `src/templates/registry.ts`
Maps slug → { Renderer } component. TemplateRenderer uses this to pick the right template.

**Fallback data:** `src/core/data/local/tenant.data.js`
LOCAL_TENANT_DATA is used by TemplateRenderer when tenantState has no data.
This is intentional for local development. Do not remove it.

---

## Reference Constants (reference.js)

ALL database table names and column names are in `src/lib/constants/reference.js`.
Never hardcode table or column names anywhere. Always import from reference.js.

Key constants:
```js
TABLE_HERO = 'hero'
TABLE_BROADCAST = 'broadcast'
TABLE_LEADERSHIP = 'leadership'
COL_LEADERSHIP_ROLE = 'role'     // 'principal' | 'chairman' | 'board'
COL_SCHOOLS_TEMPLATE_SLUG = 'templateslug'
COL_SCHOOLS_IS_DEMO = 'isdemo'
COL_SUBSCRIPTION_END_DATE = 'enddate'
COL_PLAN_GRACE_PERIOD = 'graceperiod'
COL_TEMPLATE_COMPONENTS_CODE = 'componentcode'
```

---

## Supabase Schema (Key Tables)

```
schools          — one row per school tenant
  customdomain   — 'greenvalley.com' or 'eddesk.in' for demo
  templateslug   — 'template_classic' | 'template_modern' | 'template_premium'
  isdemo         — boolean
  isactive       — boolean

hero             — hero slides per school per screen
broadcast        — announcements/notices
faculty          — teaching staff
leadership       — principal, chairman, board members (role field)
schoolstats      — stats (students, years, etc.)
achievements     — academic/sports/recognition achievements
events           — upcoming events
gallery          — media library / photo gallery
activities       — extracurricular activities
infrastructure   — campus facilities
academicresults  — single row per school (pass %, distinctions, etc.)
contactdetails   — single row per school (phone, email, social links)
templatecomponents — which sections are enabled per school (componentcode field)
plandetails      — subscription plan details including graceperiod
subscription     — school subscription (status, startdate, enddate, plankey)
```

---

## Known Issues & Pending Fixes

### 🔴 Critical — Must Fix

1. **src/proxy.ts must be renamed to src/middleware.ts**
   Next.js only runs middleware.ts. proxy.ts is completely ignored.
   All the routing logic is written correctly — just wrong filename.
   Also fix the import: `'./app/lib/constants'` → `'@/lib/constants/constants'`
   Also fix hostname normalization: remove `.split(':')[0]` to keep port.

2. **RPC empty check bug in screenData.service.ts**
   The check `!Array.isArray(raw)` always fires because RPC returns an object.
   Should be `if (!raw)` only.
   Then: `const payload = raw as unknown as ScreenDataPayload` (not `raw[0]?.get_screen_data`).

3. **fetchDemoScreen still takes domain as first parameter**
   demo/page.tsx passes `hostname` (localhost:3000) instead of using DEMO_DOMAIN internally.
   Fix: remove domain param, hardcode DEMO_DOMAIN='eddesk.in' inside the function.

### 🟡 Pending — Next Steps

4. **SectionWarning not wired into templates**
   `src/components/system/SectionWarning.tsx` exists but is never imported.
   Templates currently console.error() when required sections are empty.
   Should render `<SectionWarning sectionKey="hero" />` instead.

5. **Legacy deprecated shim in screenData.service.ts**
   `fetchTenantScreenData()` is marked @deprecated — delete once all callers updated.

6. **Domain routing needs Supabase migration**
   constants.js is a hardcoded local file. Production needs middleware to
   query Supabase's schools table for domain → school lookup.
   This is Phase 2 work — do not attempt without a caching strategy.

7. **Inner pages not fully wired**
   About, Faculty, Events, Gallery, Admissions pages exist in templates
   but may still use hardcoded/dummy data. Need same data binding as home.

---

## What Phase 1 Completed

- ✅ RPC service (screenData.service.ts) — correct unwrap, types, caching
- ✅ TenantViewModel rebuild — all new fields, backward compat aliases
- ✅ Subscription logic (subscription.ts) — demo_bypass, grace period from DB
- ✅ SystemPopup — 5 variants (empty, error, network_error, inactive, expired)
- ✅ SectionWarning component — built, not yet wired
- ✅ tenant/page.tsx — full pipeline wired
- ✅ demo/page.tsx — demo routing, no subscription checks
- ✅ reference.js — all new constants added
- ✅ Home screen — data binding complete for template_modern
- ✅ Git branching — main (production) + phase/1 (development)

---

## What Phase 2 Will Cover (planned)

- Wire SectionWarning into all three templates
- Complete inner page data binding (about, faculty, events, etc.)
- Migrate middleware domain lookup from constants.js → Supabase
- Admin panel integration (team member building this separately)
- Production tenant onboarding flow

---

## Rules Every AI Agent Must Follow

1. **Never hardcode table or column names** — always use reference.js constants
2. **Never fetch data in templates or client components** — SSR only, in page.tsx
3. **Never bypass the TenantViewModel** — templates get data only through the contract
4. **Never add subscription checks to demo routes** — demo always bypasses
5. **Never modify the template registry** without updating all three templates
6. **Always use normalizeDomain()** when reading the host header
7. **Keep port in hostname** — localhost:3001 is different from localhost:3002
8. **templateSlug for tenants comes from viewModel.school.templateId** (RPC response)
   — never from URL params or constants.js for real tenants
9. **The RPC returns data directly** — raw IS the payload, not raw[0].get_screen_data
10. **SectionWarning is inline** — SystemPopup is full-screen. Don't mix them up.
11. **Work on phase/1 branch** — never commit directly to main
12. **All files in src/ — no files in app/ root** (the app is inside src/app/)
