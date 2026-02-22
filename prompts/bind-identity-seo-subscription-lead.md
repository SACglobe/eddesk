# EdDesk — School Identity, SEO, Subscription Guard & Lead Capture
# ═══════════════════════════════════════════════════════════════
# This prompt covers FIVE distinct systems in sequence.
# Run each BATCH separately. Do NOT run all at once.
#
# BATCH 1: School identity in nav/footer (all 3 templates)
# BATCH 2: SEO metadata — layout.tsx + template-level tags
# BATCH 3: Subscription guard — tenant page.tsx
# BATCH 4: Lead capture popup — demo page.tsx + new client component
# BATCH 5: Model + data additions (grace_period_days, School model)
#
# ARCHITECTURE FACTS (read before starting):
#   - Templates live at: src/templates/template_{classic,modern,premium}/
#   - Templates receive: HomePageProps from home.viewmodel.ts
#   - HomePageProps.school = SchoolInfoProps { name, logoUrl, email,
#       phone, address, city, state, country, postalCode, fullAddress }
#   - SchoolInfoProps does NOT currently include subscription fields
#   - Subscription fields (is_active, expiration_date, grace_period_days)
#     live on the raw School model but are NOT passed to templates
#   - Templates are VIEW ONLY — subscription logic is NEVER in templates
#   - Subscription checks belong in tenant/page.tsx (SSR, server-only)
#   - Lead capture popup belongs in demo/page.tsx (client component)
#   - DOMAINS.ADMIN = 'admin.eddesk.in'
# ═══════════════════════════════════════════════════════════════


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 1 — School Identity: Nav + Footer in All 3 Templates
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/image-video-safety.md
  src/core/viewmodels/home.viewmodel.ts   ← understand SchoolInfoProps

─────────────────────────────────────────────────────────────
PHASE 0 — What SchoolInfoProps provides
─────────────────────────────────────────────────────────────
Templates receive props.school with these guaranteed fields:
  props.school.name        → school name string
  props.school.logoUrl     → logo image URL (may be empty string)
  props.school.email       → contact email
  props.school.phone       → phone number
  props.school.address     → street address
  props.school.city        → city name
  props.school.state       → state name
  props.school.country     → country
  props.school.postalCode  → postal code
  props.school.fullAddress → pre-joined address string

─────────────────────────────────────────────────────────────
PHASE 1 — Logo safety rule (CRITICAL — Skill 21 applies)
─────────────────────────────────────────────────────────────
Logo images must NEVER stretch, distort, or collapse the nav.
School logos vary wildly in aspect ratio (square, wide, tall).

Safe logo pattern:
  Container: fixed width + height, flex-shrink-0
  Image:     object-contain (NOT object-cover) + max-h constraint

  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12">
    {props.school.logoUrl ? (
      <img
        src={props.school.logoUrl}
        alt={`${props.school.name} logo`}
        className="w-full h-full object-contain"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center
                      bg-emerald-100 rounded text-emerald-800 font-bold text-lg">
        {props.school.name.charAt(0)}
      </div>
    )}
  </div>

PLACEHOLDER when logoUrl is empty string or null:
  Show a colored circle/square with the school name's first letter.
  DO NOT show a broken <img> tag. DO NOT show an empty space.
  Each template's placeholder background matches its palette:
    Classic: bg-emerald-100 text-emerald-800
    Modern:  bg-accent text-primary  (yellow bg, navy text)
    Premium: bg-signature-gold/20 text-signature-gold

─────────────────────────────────────────────────────────────
SUB-PROMPT A1 — template_classic: Header + Footer
─────────────────────────────────────────────────────────────
FILES (ONLY these):
  src/templates/template_classic/components/Header.js
  src/templates/template_classic/components/Footer.js

CURRENT STATE:
  Header reads: MOCK_DATA.SCHOOL_PROFILE.logo, .school_name, .motto
  Footer reads: MOCK_DATA.SCHOOL_PROFILE.logo, .school_name, .address,
                .phone, .email, .school_overview, .motto

HEADER — props flow:
  Header currently accepts no props. It reads MOCK_DATA directly.
  Change Header to accept: { school } prop (SchoolInfoProps shape).
  The parent (LayoutWrapper or HomeScreen) must pass school prop.
  Check how Header is mounted — find where <Header /> is rendered
  and pass school data there.

  Replace in JSX:
    SCHOOL_PROFILE.logo      → use logo pattern from Phase 1
    SCHOOL_PROFILE.school_name → {props.school.name}
    SCHOOL_PROFILE.motto     → omit (not in SchoolInfoProps; remove or hardcode EdDesk tagline)
    Remove MOCK_DATA import from Header.js

FOOTER — props flow:
  Same as Header — accept { school } prop.

  Replace in JSX:
    SCHOOL_PROFILE.logo      → logo pattern (Phase 1, bg-emerald-100 placeholder)
    SCHOOL_PROFILE.school_name → {school.name}
    SCHOOL_PROFILE.address   → {school.fullAddress}  (pre-joined string)
    SCHOOL_PROFILE.phone     → {school.phone}
    SCHOOL_PROFILE.email     → {school.email}
    SCHOOL_PROFILE.school_overview → remove (not in props); use empty or remove block
    SCHOOL_PROFILE.motto     → remove or hardcode EdDesk tagline
    Remove MOCK_DATA import from Footer.js

  Footer copyright line:
    Before: © {year} {SCHOOL_NAME}
    After:  © {new Date().getFullYear()} {school.name}

WHAT DOES NOT CHANGE:
  - All CSS classes
  - Nav link structure
  - Social media links (keep as placeholders #)
  - Newsletter section layout

─────────────────────────────────────────────────────────────
SUB-PROMPT A2 — template_modern: Navbar + Footer
─────────────────────────────────────────────────────────────
FILES (ONLY these):
  src/templates/template_modern/components/Navbar.tsx
  src/templates/template_modern/components/Footer.tsx

CURRENT STATE:
  Navbar: hardcoded "ED" box + "EdDesk" text + "Modern Template" subtitle
  Footer: reads SCHOOL_NAME from constants.tsx (string only, no logo)
          Hardcoded address "123 Education Lane, Springfield, IL 62704"
          Hardcoded phone "(555) 123-4567"
          Hardcoded email "info@standrews.edu"

NAVBAR — find where <Navbar /> is mounted in the template,
  add school prop passage. Accept { school } prop.

  Remove:
    <div className="bg-accent p-2 rounded-lg">
      <span className="text-primary font-bold text-2xl">ED</span>
    </div>
    <span>EdDesk</span>
    <p>Modern Template</p>

  Replace with:
    Logo area using Phase 1 logo pattern:
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-10 h-10">
        {school.logoUrl ? (
          <img src={school.logoUrl} alt={`${school.name} logo`}
               className="w-full h-full object-contain" />
        ) : (
          <div className="bg-accent p-2 rounded-lg flex items-center
                          justify-center w-full h-full">
            <span className="text-primary font-bold text-xl">
              {school.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div>
        <span className="font-bold text-xl tracking-tight hidden sm:block">
          {school.name}
        </span>
      </div>
    </div>

FOOTER — accept { school } prop.
  Replace SCHOOL_NAME import with school.name from props.
  Replace hardcoded address/phone/email with:
    <li>{school.fullAddress}</li>
    <li>Phone: {school.phone}</li>
    <li>Email: {school.email}</li>
  Update copyright: © {new Date().getFullYear()} {school.name}
  Remove import of SCHOOL_NAME from constants.tsx in Footer.tsx

WHAT DOES NOT CHANGE:
  - bg-primary nav color
  - Nav link items
  - Quick links column
  - Newsletter subscription input

─────────────────────────────────────────────────────────────
SUB-PROMPT A3 — template_premium: Navigation.tsx
─────────────────────────────────────────────────────────────
FILES (ONLY these):
  src/templates/template_premium/components/Navigation.tsx
  (Premium has no separate footer file — check LayoutWrapper)

CURRENT STATE:
  Navigation.tsx: reads schoolData.name directly (splits on spaces for italic styling)
                  No logo image — text-only header
                  BroadcastBar reads schoolData.broadcast

  Header name rendering uses this word-split italic pattern:
    {schoolData.name.split(' ').map((word, i) => (
      <span key={i} className={i === 1 ? 'italic text-signature-gold' : ''}>{word} </span>
    ))}

  KEEP this italic pattern — it's the premium brand identity.
  Replace schoolData.name with school.name prop.

CHANGES:
  Header must accept { school } prop.

  Logo: Premium header currently shows NO logo image — text only.
  ADD logo BEFORE the school name text:
    {school.logoUrl && (
      <div className="flex-shrink-0 w-10 h-10 mr-2">
        <img src={school.logoUrl} alt={`${school.name} logo`}
             className="w-full h-full object-contain brightness-200" />
      </div>
    )}
  Note: brightness-200 makes logos visible on dark navy background.
  If no logo → nothing shown (premium is text-first by design).

  Replace schoolData.name → school.name (in the word-split pattern)
  Keep the italic word-2 gold pattern unchanged.

  BroadcastBar: currently reads schoolData.broadcast.
  announcements prop is passed separately from the header.
  Check if BroadcastBar is already bound to announcements data.
  If not — leave BroadcastBar reading schoolData.broadcast for now
  (broadcast binding was done in a previous prompt).

  Find and update footer if it exists in premium.
  If no separate footer → check LayoutWrapper for footer content.
  Replace any schoolData.name in footer with school.name.
  Remove schoolData import ONLY if no other schoolData references remain.

─────────────────────────────────────────────────────────────
BATCH 1 VALIDATION
─────────────────────────────────────────────────────────────
  - [ ] All 3 templates: header shows live school.name
  - [ ] All 3 templates: logo renders with object-contain
  - [ ] All 3 templates: placeholder shown when logoUrl is empty
  - [ ] All 3 templates: footer shows school.name, email, phone, fullAddress
  - [ ] All 3 templates: no broken <img> tags for missing logos
  - [ ] MOCK_DATA removed from Header.js and Footer.js (classic)
  - [ ] SCHOOL_NAME constant import removed from Footer.tsx (modern)
  - [ ] schoolData.name replaced with school prop in premium
  - [ ] No CSS changes in any nav or footer
  - [ ] Guardrails not violated

─────────────────────────────────────────────────────────────
BATCH 1 REPORT FORMAT
─────────────────────────────────────────────────────────────
```
School Identity Report

template_classic:
  Header.js:  MOCK_DATA removed → school prop
  Footer.js:  MOCK_DATA removed → school prop
  Logo:       object-contain, bg-emerald-100 placeholder

template_modern:
  Navbar.tsx:  ED hardcode replaced → school.name + logo
  Footer.tsx:  SCHOOL_NAME, hardcoded address replaced
  Logo:        object-contain, bg-accent placeholder

template_premium:
  Navigation.tsx: schoolData.name → school.name prop
  Logo:           optional, brightness-200 on dark bg

Guardrails violated: NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 2 — SEO: Metadata, Structured Data, Breadcrumbs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  src/core/viewmodels/home.viewmodel.ts  (SchoolInfoProps)
  src/app/layout.tsx

─────────────────────────────────────────────────────────────
PHASE 0 — SEO architecture in Next.js App Router
─────────────────────────────────────────────────────────────
Next.js App Router uses generateMetadata() for dynamic SEO.
Static metadata export is for fixed pages (layout.tsx).
Both template routes (demo + tenant) must produce dynamic metadata.

─────────────────────────────────────────────────────────────
PHASE 1 — Files to create/modify
─────────────────────────────────────────────────────────────
Files:
  MODIFY:  src/app/layout.tsx                          (root-level defaults)
  MODIFY:  src/app/demo/[templateId]/[[...path]]/page.tsx
  MODIFY:  src/app/tenant/[[...path]]/page.tsx
  CREATE:  src/core/utils/seo.ts                       (SEO helper functions)

─────────────────────────────────────────────────────────────
PHASE 2 — Create src/core/utils/seo.ts
─────────────────────────────────────────────────────────────
This utility builds all SEO metadata from school data.
Templates never call this — only page.tsx files do.

```typescript
/**
 * seo.ts
 * Generates Next.js Metadata and JSON-LD structured data
 * from SchoolInfoProps. Used by demo and tenant page.tsx.
 */
import type { Metadata } from 'next';

export interface SeoSchoolInput {
  name:        string;
  logoUrl:     string;
  email:       string;
  phone:       string;
  fullAddress: string;
  city:        string;
  state:       string;
  country:     string;
  postalCode:  string;
  domain:      string;   // custom_domain or eddesk.in/demo/... for demo
  isDemo:      boolean;
}

/**
 * Build Next.js Metadata object for a school page.
 * Covers: title, description, openGraph, twitter, robots, canonical.
 */
export function buildSchoolMetadata(school: SeoSchoolInput): Metadata {
  const siteUrl = school.isDemo
    ? `https://eddesk.in/demo`
    : `https://${school.domain}`;

  const title       = `${school.name} | Official School Website`;
  const description = `${school.name} — ${school.city}, ${school.state}. ` +
    `Admissions, academics, events, and more. Official school website powered by EdDesk.`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type:        'website',
      url:         siteUrl,
      title,
      description,
      siteName:    school.name,
      images: school.logoUrl
        ? [{ url: school.logoUrl, alt: `${school.name} logo` }]
        : [],
    },
    twitter: {
      card:        'summary',
      title,
      description,
      images:      school.logoUrl ? [school.logoUrl] : [],
    },
    robots: school.isDemo
      ? { index: false, follow: false }   // demo: no search indexing
      : { index: true,  follow: true },   // tenant: full indexing
    keywords: [
      school.name,
      `${school.name} admissions`,
      `school in ${school.city}`,
      `${school.city} school`,
      `${school.state} school`,
      'CBSE school',
      'school website',
    ],
    authors:   [{ name: school.name }],
    creator:    school.name,
    publisher:  school.name,
  };
}

/**
 * Build JSON-LD structured data for schema.org/School.
 * Returns a <script> tag string — render via dangerouslySetInnerHTML.
 *
 * Covers:
 *  - Organization (School type)
 *  - BreadcrumbList
 *  - LocalBusiness contact/address
 */
export function buildSchoolJsonLd(school: SeoSchoolInput, path: string = '/'): string {
  const siteUrl = school.isDemo
    ? `https://eddesk.in/demo/${school.name.toLowerCase().replace(/\s+/g, '-')}`
    : `https://${school.domain}`;

  const pathParts = path.split('/').filter(Boolean);
  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    ...pathParts.map((part, i) => ({
      '@type':    'ListItem',
      position:   i + 2,
      name:       part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      item:       `${siteUrl}/${pathParts.slice(0, i + 1).join('/')}`,
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      // ── School / Organization ──────────────────────────────────
      {
        '@type':       ['School', 'Organization', 'LocalBusiness'],
        '@id':         siteUrl,
        name:          school.name,
        url:           siteUrl,
        logo: school.logoUrl ? {
          '@type': 'ImageObject',
          url:     school.logoUrl,
        } : undefined,
        image:         school.logoUrl || undefined,
        email:         school.email   || undefined,
        telephone:     school.phone   || undefined,
        address: school.fullAddress ? {
          '@type':           'PostalAddress',
          streetAddress:     school.fullAddress,
          addressLocality:   school.city,
          addressRegion:     school.state,
          postalCode:        school.postalCode,
          addressCountry:    school.country || 'IN',
        } : undefined,
        sameAs: [],
      },

      // ── BreadcrumbList ─────────────────────────────────────────
      {
        '@type':           'BreadcrumbList',
        '@id':             `${siteUrl}#breadcrumb`,
        itemListElement:   breadcrumbs,
      },

      // ── WebSite (for sitelinks search box eligibility) ─────────
      {
        '@type':     'WebSite',
        '@id':       `${siteUrl}#website`,
        url:         siteUrl,
        name:        school.name,
        publisher:   { '@id': siteUrl },
        potentialAction: {
          '@type':       'SearchAction',
          target:        `${siteUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return JSON.stringify(jsonLd);
}
```

─────────────────────────────────────────────────────────────
PHASE 3 — Update src/app/layout.tsx
─────────────────────────────────────────────────────────────
Add base metadata defaults (overridden by page-level generateMetadata):

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default:  'EdDesk — School Websites',
    template: '%s | EdDesk',
  },
  description:   'Beautiful, data-driven school websites powered by EdDesk.',
  metadataBase:  new URL('https://eddesk.in'),
  robots:        { index: false, follow: false },
  openGraph: {
    type:    'website',
    siteName: 'EdDesk',
  },
};
```

─────────────────────────────────────────────────────────────
PHASE 4 — Update demo/[templateId]/[[...path]]/page.tsx
─────────────────────────────────────────────────────────────
Add generateMetadata export ABOVE the default DemoPage function:

```typescript
import { buildSchoolMetadata, buildSchoolJsonLd } from '@/core/utils/seo';

export async function generateMetadata(
  { params }: DemoPageProps
): Promise<Metadata> {
  const data = LOCAL_TENANT_DATA;
  const school = data.school;
  return buildSchoolMetadata({
    name:        school.name,
    logoUrl:     school.logo_url ?? '',
    email:       school.email    ?? '',
    phone:       school.phone    ?? '',
    fullAddress: [school.address, school.city, school.state, school.postal_code]
                   .filter(Boolean).join(', '),
    city:        school.city     ?? '',
    state:       school.state    ?? '',
    country:     school.country  ?? '',
    postalCode:  school.postal_code ?? '',
    domain:      `eddesk.in/demo/${params.templateId}`,
    isDemo:      true,
  });
}
```

Inside DemoPage return, after mounting TemplateHome, add JSON-LD script:

```tsx
return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildSchoolJsonLd({
          name:        homePageProps.school.name,
          logoUrl:     homePageProps.school.logoUrl,
          email:       homePageProps.school.email,
          phone:       homePageProps.school.phone,
          fullAddress: homePageProps.school.fullAddress,
          city:        homePageProps.school.city,
          state:       homePageProps.school.state,
          country:     homePageProps.school.country,
          postalCode:  homePageProps.school.postalCode,
          domain:      `eddesk.in/demo/${templateId}`,
          isDemo:      true,
        }, params.path?.join('/') ?? '/')
      }}
    />
    <TemplateHome {...homePageProps} />
    {/* LeadPopup rendered here — see Batch 4 */}
  </>
);
```

─────────────────────────────────────────────────────────────
PHASE 5 — Update tenant/[[...path]]/page.tsx
─────────────────────────────────────────────────────────────
Add generateMetadata and JSON-LD similarly.
In tenant route, custom_domain IS the canonical domain:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const domain = normalizeDomain(headersList.get('host') ?? '');
  const discovery = await getTenantData(domain, '');
  if (!discovery.data) return {};
  const school = discovery.data.school;
  return buildSchoolMetadata({
    name:        school.name,
    logoUrl:     school.logo_url ?? '',
    email:       school.email    ?? '',
    phone:       school.phone    ?? '',
    fullAddress: [school.address, school.city, school.state, school.postal_code]
                   .filter(Boolean).join(', '),
    city:        school.city     ?? '',
    state:       school.state    ?? '',
    country:     school.country  ?? 'IN',
    postalCode:  school.postal_code ?? '',
    domain,
    isDemo:      false,
  });
}
```

Inside TenantPage return, wrap TemplateHome with JSON-LD:
```tsx
return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildSchoolJsonLd({
          name:        homePageProps.school.name,
          logoUrl:     homePageProps.school.logoUrl,
          email:       homePageProps.school.email,
          phone:       homePageProps.school.phone,
          fullAddress: homePageProps.school.fullAddress,
          city:        homePageProps.school.city,
          state:       homePageProps.school.state,
          country:     homePageProps.school.country,
          postalCode:  homePageProps.school.postalCode,
          domain,
          isDemo:      false,
        }, params.path?.join('/') ?? '/')
      }}
    />
    <TemplateHome {...homePageProps} />
  </>
);
```

─────────────────────────────────────────────────────────────
BATCH 2 VALIDATION
─────────────────────────────────────────────────────────────
  - [ ] seo.ts created with buildSchoolMetadata + buildSchoolJsonLd
  - [ ] layout.tsx updated with base metadata + title template
  - [ ] demo page.tsx: generateMetadata exports Metadata
  - [ ] demo page.tsx: JSON-LD script rendered
  - [ ] tenant page.tsx: generateMetadata exports Metadata
  - [ ] tenant page.tsx: JSON-LD script rendered
  - [ ] demo robots: index: false (not indexed)
  - [ ] tenant robots: index: true (fully indexed)
  - [ ] JSON-LD contains School, BreadcrumbList, WebSite types
  - [ ] No template files modified


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 3 — Subscription Guard (tenant/page.tsx only)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  src/app/tenant/[[...path]]/page.tsx
  src/components/system/SystemPopup.tsx
  src/core/constants/constants.js

─────────────────────────────────────────────────────────────
PHASE 0 — Subscription logic rules
─────────────────────────────────────────────────────────────
ONLY runs on tenant domains (custom school domains).
NEVER runs on demo routes — demo bypasses all subscription checks.
ALL logic is server-side in tenant/page.tsx — no client code.
Templates never see subscription status.

─────────────────────────────────────────────────────────────
PHASE 1 — Model update: add grace_period_days to School
─────────────────────────────────────────────────────────────
FILE: src/core/models/tenant.model.ts

Add to School interface:
  grace_period_days: string | null;   // stored as string e.g. '5'

Add to EMPTY_SCHOOL in tenant.viewmodel.ts:
  grace_period_days: null,

─────────────────────────────────────────────────────────────
PHASE 2 — Subscription check helper in business layer
─────────────────────────────────────────────────────────────
FILE: Create src/core/business/subscription.ts

```typescript
/**
 * subscription.ts
 * Server-side subscription status checks.
 * Never imported by templates.
 */

export type SubscriptionStatus =
  | 'active'
  | 'expired'
  | 'inactive'
  | 'unknown';

export interface SubscriptionCheckResult {
  status:          SubscriptionStatus;
  daysUntilExpiry: number | null;   // negative means past expiry
  isWithinGrace:   boolean;
}

/**
 * Check subscription validity for a school.
 *
 * Logic:
 *   1. If is_active === false → 'inactive' immediately
 *   2. If expiration_date is null → treat as 'active' (no limit)
 *   3. Compute: effectiveExpiry = expirationDate + grace_period_days
 *   4. If today >= effectiveExpiry → 'expired'
 *   5. Otherwise → 'active'
 */
export function checkSubscription(school: {
  is_active:          boolean;
  expiration_date:    string | null;
  grace_period_days:  string | null;
}): SubscriptionCheckResult {

  // Check 1: account deactivated
  if (!school.is_active) {
    return { status: 'inactive', daysUntilExpiry: null, isWithinGrace: false };
  }

  // Check 2: no expiry date → perpetual
  if (!school.expiration_date) {
    return { status: 'active', daysUntilExpiry: null, isWithinGrace: false };
  }

  const graceDays      = parseInt(school.grace_period_days ?? '0', 10) || 0;
  const expiryDate     = new Date(school.expiration_date + 'T00:00:00');
  const effectiveExpiry = new Date(expiryDate);
  effectiveExpiry.setDate(effectiveExpiry.getDate() + graceDays);

  const now            = new Date();
  now.setHours(0, 0, 0, 0);
  effectiveExpiry.setHours(0, 0, 0, 0);

  const msPerDay        = 1000 * 60 * 60 * 24;
  const daysUntilExpiry = Math.floor(
    (effectiveExpiry.getTime() - now.getTime()) / msPerDay
  );

  if (daysUntilExpiry < 0) {
    return {
      status:          'expired',
      daysUntilExpiry,
      isWithinGrace:   false,
    };
  }

  const baseExpiryDays = Math.floor(
    (expiryDate.getTime() - now.getTime()) / msPerDay
  );

  return {
    status:          'active',
    daysUntilExpiry:  baseExpiryDays,
    isWithinGrace:    baseExpiryDays < 0 && daysUntilExpiry >= 0,
  };
}
```

─────────────────────────────────────────────────────────────
PHASE 3 — Add subscription guard to tenant/page.tsx
─────────────────────────────────────────────────────────────
Insert subscription checks AFTER Phase 4 (full data fetch)
and BEFORE Phase 5 (ViewModel preparation).

Add import at top:
  import { checkSubscription } from '@/core/business/subscription';

Insert between result fetch and prepareHomePageProps:

```typescript
  // ── Phase 4b: Subscription Guard ─────────────────────────────
  const subscriptionCheck = checkSubscription(result.data.school);

  if (subscriptionCheck.status === 'inactive') {
    return (
      <SystemPopup
        type="warning"
        message={`${result.data.school.name}'s website has been deactivated. Please contact your administrator to reactivate.`}
        adminUrl={`https://${DOMAINS.ADMIN}`}
      />
    );
  }

  if (subscriptionCheck.status === 'expired') {
    return (
      <SystemPopup
        type="warning"
        message={`${result.data.school.name}'s EdDesk subscription has expired. Please renew your subscription to restore your website.`}
        adminUrl={`https://${DOMAINS.ADMIN}`}
      />
    );
  }

  // ── Phase 5: ViewModel preparation ───────────────────────────
  // (existing code continues unchanged)
  const homePageProps = prepareHomePageProps(result.data);
```

─────────────────────────────────────────────────────────────
BATCH 3 VALIDATION
─────────────────────────────────────────────────────────────
  - [ ] grace_period_days added to School model
  - [ ] grace_period_days added to EMPTY_SCHOOL fallback
  - [ ] subscription.ts created with checkSubscription()
  - [ ] Logic: effectiveExpiry = expirationDate + graceDays
  - [ ] is_active === false → SystemPopup 'warning' (inactive)
  - [ ] expired → SystemPopup 'warning' with admin URL
  - [ ] Demo route NOT modified — no subscription check there
  - [ ] Templates NOT modified — zero subscription logic in templates
  - [ ] DOMAINS.ADMIN used for adminUrl


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 4 — Lead Capture Popup (Demo route only)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  src/app/demo/[templateId]/[[...path]]/page.tsx
  src/app/layout.tsx

─────────────────────────────────────────────────────────────
PHASE 0 — Rules
─────────────────────────────────────────────────────────────
- Popup is ONLY shown on demo routes (eddesk.in/demo/*)
- NEVER shown on tenant routes (school custom domains)
- Uses localStorage to check if lead already submitted
- Shows when user scrolls past 50% of the page
- Popup is MANDATORY — user cannot close it without submitting
- Form calls a lead ViewModel (to be configured when API is ready)
- On submit: saves to localStorage, popup disappears
- Design matches EdDesk marketing style (dark/minimal, not template colors)

─────────────────────────────────────────────────────────────
PHASE 1 — Files to create/modify
─────────────────────────────────────────────────────────────
CREATE: src/core/viewmodels/lead.viewmodel.ts
CREATE: src/components/lead/LeadCapturePopup.tsx
MODIFY: src/app/demo/[templateId]/[[...path]]/page.tsx

─────────────────────────────────────────────────────────────
PHASE 2 — Create src/core/viewmodels/lead.viewmodel.ts
─────────────────────────────────────────────────────────────

```typescript
/**
 * lead.viewmodel.ts
 * Handles lead capture form submission for demo visitors.
 * API endpoint to be configured when ready.
 * Currently saves lead to localStorage on success.
 */

export const LEAD_STORAGE_KEY = 'eddesk_lead_submitted';

export interface LeadFormData {
  mobileNumber: string;
  userName:     string;
  schoolName:   string;
  cityName:     string;
  message:      string;
}

export interface LeadSubmitResult {
  success: boolean;
  error?:  string;
}

/**
 * Check if this browser session has already submitted a lead.
 * Returns true if localStorage has the submission record.
 */
export function hasSubmittedLead(): boolean {
  try {
    return localStorage.getItem(LEAD_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Submit lead form data.
 * TODO: Replace fetch URL with real API endpoint when ready.
 * Until then: simulates success and saves to localStorage.
 */
export async function submitLead(
  data: LeadFormData
): Promise<LeadSubmitResult> {
  try {
    // ── API call (configure endpoint when ready) ───────────────
    // const response = await fetch('/api/leads', {
    //   method:  'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:    JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Submission failed');

    // ── Temporary: simulate API success ───────────────────────
    // Remove this block and uncomment above when API is ready
    await new Promise(resolve => setTimeout(resolve, 800)); // simulate network
    console.log('[LeadViewModel] Lead captured:', data);

    // ── Save to localStorage on success ───────────────────────
    localStorage.setItem(LEAD_STORAGE_KEY, 'true');
    return { success: true };

  } catch (err) {
    return {
      success: false,
      error:   err instanceof Error ? err.message : 'Something went wrong.',
    };
  }
}
```

─────────────────────────────────────────────────────────────
PHASE 3 — Create src/components/lead/LeadCapturePopup.tsx
─────────────────────────────────────────────────────────────
This is a 'use client' component. Uses React hooks.
Design: Dark overlay + centered card matching EdDesk marketing style.
- Dark navy/black background, white text, gold/accent CTA
- Clean minimal form — no template styling leaked in
- Fields: mobile, name, school name, city, message

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  hasSubmittedLead,
  submitLead,
  LeadFormData,
} from '@/core/viewmodels/lead.viewmodel';

const SCROLL_THRESHOLD = 0.50; // 50% of page height

export default function LeadCapturePopup() {
  const [visible,     setVisible]     = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [form,        setForm]        = useState<LeadFormData>({
    mobileNumber: '',
    userName:     '',
    schoolName:   '',
    cityName:     '',
    message:      '',
  });

  // ── Check scroll position to trigger popup ────────────────────
  const handleScroll = useCallback(() => {
    if (visible) return;
    const scrolled = window.scrollY + window.innerHeight;
    const total    = document.documentElement.scrollHeight;
    if (scrolled / total >= SCROLL_THRESHOLD) {
      setVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    // Don't show if already submitted
    if (hasSubmittedLead()) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.mobileNumber.trim() || !form.userName.trim() ||
        !form.schoolName.trim()   || !form.cityName.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!/^\+?[\d\s\-]{8,15}$/.test(form.mobileNumber.trim())) {
      setError('Please enter a valid mobile number.');
      return;
    }

    setSubmitting(true);
    const result = await submitLead(form);
    setSubmitting(false);

    if (result.success) {
      setVisible(false);
    } else {
      setError(result.error ?? 'Submission failed. Please try again.');
    }
  };

  if (!visible) return null;

  return (
    // ── Backdrop ────────────────────────────────────────────────
    <div
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '24px',
        backdropFilter:  'blur(4px)',
      }}
    >
      {/* ── Card ─────────────────────────────────────────────── */}
      <div
        style={{
          background:   '#0D1117',
          border:       '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding:      '48px 40px',
          maxWidth:     '480px',
          width:        '100%',
          boxShadow:    '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <p style={{
            fontSize:       '11px',
            letterSpacing:  '0.3em',
            textTransform:  'uppercase',
            color:          '#D4A017',
            fontWeight:     700,
            marginBottom:   '12px',
          }}>
            EdDesk — School Websites
          </p>
          <h2 style={{
            fontSize:    '24px',
            fontWeight:  700,
            color:       '#FFFFFF',
            margin:      '0 0 12px',
            lineHeight:  1.3,
          }}>
            Loving the demo?
          </h2>
          <p style={{
            fontSize:   '14px',
            color:      'rgba(255,255,255,0.5)',
            lineHeight: 1.6,
            margin:     0,
          }}>
            Tell us about your school and we'll get in touch to help you
            set up your own beautiful website.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {(
            [
              { name: 'userName',     label: 'Your Name *',       type: 'text',  placeholder: 'Rajesh Kumar'           },
              { name: 'mobileNumber', label: 'Mobile Number *',   type: 'tel',   placeholder: '+91 98765 43210'        },
              { name: 'schoolName',   label: 'School Name *',     type: 'text',  placeholder: 'Sunrise International'  },
              { name: 'cityName',     label: 'City *',            type: 'text',  placeholder: 'Coimbatore'             },
            ] as Array<{ name: keyof LeadFormData; label: string; type: string; placeholder: string }>
          ).map(field => (
            <div key={field.name} style={{ marginBottom: '16px' }}>
              <label style={{
                display:     'block',
                fontSize:    '11px',
                fontWeight:  600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color:       'rgba(255,255,255,0.6)',
                marginBottom: '8px',
              }}>
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                style={{
                  width:           '100%',
                  padding:         '12px 16px',
                  background:      'rgba(255,255,255,0.05)',
                  border:          '1px solid rgba(255,255,255,0.12)',
                  borderRadius:    '8px',
                  color:           '#fff',
                  fontSize:        '14px',
                  outline:         'none',
                  boxSizing:       'border-box',
                }}
              />
            </div>
          ))}

          {/* Message textarea */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display:       'block',
              fontSize:      '11px',
              fontWeight:    600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.6)',
              marginBottom:  '8px',
            }}>
              Message (optional)
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Any specific requirements or questions..."
              rows={3}
              style={{
                width:        '100%',
                padding:      '12px 16px',
                background:   'rgba(255,255,255,0.05)',
                border:       '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                color:        '#fff',
                fontSize:     '14px',
                outline:      'none',
                resize:       'vertical',
                boxSizing:    'border-box',
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <p style={{
              color:        '#ff6b6b',
              fontSize:     '13px',
              marginBottom: '16px',
              textAlign:    'center',
            }}>
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width:         '100%',
              padding:       '14px',
              background:    submitting ? '#555' : '#D4A017',
              color:         submitting ? '#999' : '#0D1117',
              border:        'none',
              borderRadius:  '8px',
              fontSize:      '13px',
              fontWeight:    700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor:        submitting ? 'not-allowed' : 'pointer',
              transition:    'all 0.2s',
            }}
          >
            {submitting ? 'Submitting...' : 'Get Your Free Website →'}
          </button>

          <p style={{
            textAlign:  'center',
            fontSize:   '11px',
            color:      'rgba(255,255,255,0.25)',
            marginTop:  '16px',
            marginBottom: 0,
          }}>
            We'll contact you within 24 hours. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}
```

─────────────────────────────────────────────────────────────
PHASE 4 — Update demo/[templateId]/[[...path]]/page.tsx
─────────────────────────────────────────────────────────────
Add LeadCapturePopup to the demo page return:

```tsx
// Add import at top of file
import LeadCapturePopup from '@/components/lead/LeadCapturePopup';

// Update return to include popup
return (
  <>
    <script ... />           {/* JSON-LD from Batch 2 */}
    <TemplateHome {...homePageProps} />
    <LeadCapturePopup />     {/* ← ADD THIS — renders after template */}
  </>
);
```

LeadCapturePopup is a client component ('use client').
It self-manages visibility via scroll detection + localStorage.
The server component (DemoPage) just renders it — no props needed.

─────────────────────────────────────────────────────────────
BATCH 4 VALIDATION
─────────────────────────────────────────────────────────────
  - [ ] lead.viewmodel.ts created with hasSubmittedLead + submitLead
  - [ ] LEAD_STORAGE_KEY = 'eddesk_lead_submitted'
  - [ ] localStorage checked on mount — no popup if already submitted
  - [ ] Scroll listener: shows popup at 50% scroll threshold
  - [ ] Popup has NO close button — mandatory submission
  - [ ] Form fields: mobileNumber, userName, schoolName, cityName, message
  - [ ] Mobile validation: /^\+?[\d\s\-]{8,15}$/
  - [ ] Required fields: mobileNumber, userName, schoolName, cityName
  - [ ] On success: localStorage.setItem, popup disappears
  - [ ] API fetch is COMMENTED OUT — simulated for now
  - [ ] LeadCapturePopup added to demo page.tsx ONLY
  - [ ] Tenant page.tsx NOT modified — no lead popup for real schools
  - [ ] Popup uses dark EdDesk style — no template colors leaked in
  - [ ] z-index: 9999 — above all template content


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERALL EXECUTION ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run in this sequence to avoid dependency issues:

  Step 1: BATCH 3, PHASE 1  → Add grace_period_days to School model
  Step 2: BATCH 1, A1       → Classic: Header.js + Footer.js
  Step 3: BATCH 1, A2       → Modern: Navbar.tsx + Footer.tsx
  Step 4: BATCH 1, A3       → Premium: Navigation.tsx
  Step 5: BATCH 2           → Create seo.ts, update layout + pages
  Step 6: BATCH 3           → Create subscription.ts, update tenant page
  Step 7: BATCH 4           → Create lead.viewmodel + LeadCapturePopup

─────────────────────────────────────────────────────────────
NEW FILES CREATED BY THIS PROMPT
─────────────────────────────────────────────────────────────
  src/core/utils/seo.ts
  src/core/business/subscription.ts
  src/core/viewmodels/lead.viewmodel.ts
  src/components/lead/LeadCapturePopup.tsx

FILES MODIFIED
─────────────────────────────────────────────────────────────
  src/app/layout.tsx
  src/app/demo/[templateId]/[[...path]]/page.tsx
  src/app/tenant/[[...path]]/page.tsx
  src/core/models/tenant.model.ts
  src/core/viewmodels/tenant.viewmodel.ts  (EMPTY_SCHOOL update)
  src/templates/template_classic/components/Header.js
  src/templates/template_classic/components/Footer.js
  src/templates/template_modern/components/Navbar.tsx
  src/templates/template_modern/components/Footer.tsx
  src/templates/template_premium/components/Navigation.tsx

═══════════════════════════════════════════════════════════════
