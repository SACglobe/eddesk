# EdDesk — Complete Home Screen SEO: Title, Meta Tags, Keywords & Structured Data
# ─────────────────────────────────────────────────────────────────────────────

## Context

Files to read before starting:
  - src/core/utils/seo.ts                            ← you will rewrite generateTenantMetadata()
  - src/app/layout.tsx                               ← global metadata (do not change this)
  - src/app/tenant/[[...path]]/page.tsx              ← inject JSON-LD here
  - src/app/demo/[templateSlug]/[[...path]]/page.tsx ← mirror same JSON-LD here
  - src/core/viewmodels/tenant.viewmodel.ts          ← data contract reference

DO NOT touch any template files.
ALL changes go in seo.ts and the two page.tsx files only.

---

## What Currently Exists (Gaps to Fix)

Current generateTenantMetadata() is missing:
  ✗ keywords meta tag
  ✗ authors meta tag
  ✗ category meta tag
  ✗ applicationName meta tag
  ✗ Smart description (uses hardcoded generic text, not real data)
  ✗ openGraph: locale, images with width/height/alt
  ✗ twitter: site handle, creator
  ✗ icons (school favicon from logoUrl)
  ✗ metadataBase (required for Next.js absolute URL resolution)

Current generateSchoolJsonLd() is missing:
  ✗ sameAs social links
  ✗ principal as employee
  ✗ logo as ImageObject (not just string)
  ✗ postalCode in address

Missing functions entirely:
  ✗ generateEventsJsonLd()       ← Event rich results
  ✗ generatePrincipalJsonLd()    ← Person schema
  ✗ generateBreadcrumbJsonLd()   ← for all inner pages (build now, use later)
  ✗ generateHomeKeywords()       ← keyword builder utility

---

## TASK 1 — Rewrite generateTenantMetadata() in seo.ts

Replace the entire existing generateTenantMetadata() function with the version below.
Preserve the function signature: (data: TenantViewModel, domain: string, isDemo = false)

```ts
export function generateTenantMetadata(
  data: TenantViewModel,
  domain: string,
  isDemo = false
): Metadata {
  const school = data.school;

  // ── Title ─────────────────────────────────────────────────────────────────
  // Pattern: "School Name - Official Website | City"
  // Demo gets a [PREVIEW] prefix and is never the same as live title.
  const title = isDemo
    ? `[PREVIEW] ${school.name} | EdDesk Templates`
    : school.city
      ? `${school.name} - Official Website | ${school.city}`
      : `${school.name} - Official School Website`;

  // ── Description ───────────────────────────────────────────────────────────
  // Build from real data — prioritise stats, then location, then contact.
  // Must stay under 160 characters. Trim to fit if needed.
  const firstStat = data.stats?.[0];
  const statSnippet = firstStat
    ? `${firstStat.value} ${firstStat.label}.`
    : null;

  const locationSnippet = [school.city, school.state]
    .filter(Boolean)
    .join(', ');

  const descriptionFull = [
    `Welcome to ${school.name}`,
    locationSnippet ? `located in ${locationSnippet}` : null,
    statSnippet,
    school.phone ? `Call us: ${school.phone}` : null,
  ]
    .filter(Boolean)
    .join('. ')
    .concat('.');

  const description = descriptionFull.length > 160
    ? descriptionFull.slice(0, 157) + '...'
    : descriptionFull;

  // ── Keywords ──────────────────────────────────────────────────────────────
  // Layer 1: Core school identity (always present)
  const coreKeywords = [
    school.name,
    school.city ? `school in ${school.city}` : null,
    school.state ? `school in ${school.state}` : null,
    school.city ? `best school ${school.city}` : null,
    'school admissions',
    'school website',
    'CBSE school',
    'education',
  ].filter(Boolean) as string[];

  // Layer 2: From active sections (data-driven)
  const sectionKeywords: string[] = [];

  if ((data.achievements ?? []).length > 0)
    sectionKeywords.push('award winning school', 'school achievements');

  if ((data.faculty ?? []).length > 0)
    sectionKeywords.push('qualified teachers', 'experienced faculty');

  if ((data.events ?? []).length > 0)
    sectionKeywords.push('school events', 'school activities');

  if ((data.facilities ?? []).length > 0)
    sectionKeywords.push('school infrastructure', 'modern campus');

  if (data.academicResult)
    sectionKeywords.push('board results', 'academic excellence', '100% results');

  if ((data.activities ?? []).length > 0)
    sectionKeywords.push('extracurricular activities', 'sports school');

  // Layer 3: Location variants
  const locationKeywords = [
    school.city ? `${school.name} ${school.city}` : null,
    school.city ? `schools near ${school.city}` : null,
    school.postalCode ? `school ${school.postalCode}` : null,
  ].filter(Boolean) as string[];

  const keywords = [
    ...coreKeywords,
    ...sectionKeywords,
    ...locationKeywords,
  ].join(', ');

  // ── Open Graph image ───────────────────────────────────────────────────────
  // Use hero image if available, fall back to logo
  const heroImage = data.heroMedia?.[0]?.mediaUrl as string | undefined;
  const ogImage = heroImage || school.logoUrl;

  const ogImages = ogImage
    ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${school.name} - Official School Website`,
        },
      ]
    : [];

  return {
    // ── Core ────────────────────────────────────────────────────────────────
    title,
    description,
    keywords,                   // <meta name="keywords">
    authors: [{ name: school.name, url: `https://${domain}` }],
    category: 'education',
    applicationName: school.name,
    generator: 'EdDesk',

    // ── Robots ──────────────────────────────────────────────────────────────
    robots: isDemo
      ? { index: false, follow: false, noarchive: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    // ── Canonical ───────────────────────────────────────────────────────────
    alternates: {
      canonical: `https://${domain}`,
    },

    // ── metadataBase ────────────────────────────────────────────────────────
    // Required for Next.js to resolve relative image URLs in OG/twitter
    metadataBase: new URL(`https://${domain}`),

    // ── Open Graph ──────────────────────────────────────────────────────────
    openGraph: {
      title,
      description,
      url: `https://${domain}`,
      siteName: school.name,
      locale: 'en_IN',
      type: 'website',
      images: ogImages,
    },

    // ── Twitter / X Card ────────────────────────────────────────────────────
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map(img => img.url),
    },

    // ── Icons ───────────────────────────────────────────────────────────────
    // School logo as favicon. Falls back to global /icon.svg from layout.tsx.
    icons: school.logoUrl
      ? {
          icon: school.logoUrl,
          apple: school.logoUrl,
        }
      : undefined,
  };
}
```

---

## TASK 2 — Upgrade generateSchoolJsonLd() in seo.ts

Replace the existing generateSchoolJsonLd() with this version.
Keep the same signature: (data: TenantViewModel, domain: string)

```ts
export function generateSchoolJsonLd(data: TenantViewModel, domain: string) {
  const school = data.school;
  const contact = data.contactDetails as any;

  // Build sameAs array from social links — only include non-empty values
  const sameAs = [
    contact?.facebook,
    contact?.instagram,
    contact?.twitter,
    contact?.youtube,
  ].filter(Boolean);

  // Principal as employee — only if data exists
  const principal = data.principal as any;
  const employeeBlock = principal
    ? {
        employee: {
          '@type': 'Person',
          name: principal.name,
          jobTitle: principal.designation || 'Principal',
          ...(principal.imageUrl ? { image: principal.imageUrl } : {}),
        },
      }
    : {};

  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'School'],
    name: school.name,
    url: `https://${domain}`,
    logo: {
      '@type': 'ImageObject',
      url: school.logoUrl,
      width: 200,
      height: 200,
    },
    image: school.logoUrl,
    description: `Official website of ${school.name}. Located in ${school.city}, ${school.state}.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: school.address || school.fullAddress,
      addressLocality: school.city || '',
      addressRegion: school.state || '',
      postalCode: school.postalCode || '',
      addressCountry: school.country || 'IN',
    },
    telephone: school.phone,
    email: school.email,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...employeeBlock,
  };
}
```

---

## TASK 3 — Add generateEventsJsonLd() to seo.ts

Add this new export function after generateSchoolJsonLd():

```ts
/**
 * Generates Event schema for upcoming school events.
 * Used on home screen. Returns null if no upcoming events.
 */
export function generateEventsJsonLd(
  data: TenantViewModel,
  domain: string
): object | null {
  const now = new Date();

  const upcoming = (data.events ?? [])
    .filter((e: any) => {
      const dt = new Date(`${e.eventDate}T${e.startTime || '00:00'}`);
      return dt > now;
    })
    .sort((a: any, b: any) =>
      new Date(`${a.eventDate}T${a.startTime || '00:00'}`).getTime() -
      new Date(`${b.eventDate}T${b.startTime || '00:00'}`).getTime()
    )
    .slice(0, 10);

  if (upcoming.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Upcoming Events at ${data.school.name}`,
    itemListElement: upcoming.map((event: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        description: event.description || '',
        startDate: `${event.eventDate}T${event.startTime || '00:00'}`,
        ...(event.endTime
          ? { endDate: `${event.eventDate}T${event.endTime}` }
          : {}),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: event.location || data.school.name,
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.school.city || '',
            addressRegion: data.school.state || '',
            addressCountry: data.school.country || 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: data.school.name,
          url: `https://${domain}`,
        },
        ...(event.imageUrl || data.school.logoUrl
          ? { image: event.imageUrl || data.school.logoUrl }
          : {}),
      },
    })),
  };
}
```

---

## TASK 4 — Add generatePrincipalJsonLd() to seo.ts

Add this new export function:

```ts
/**
 * Generates Person schema for the school principal.
 * Returns null if no principal data exists.
 */
export function generatePrincipalJsonLd(
  data: TenantViewModel,
  domain: string
): object | null {
  const principal = data.principal as any;
  if (!principal) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: principal.name,
    jobTitle: principal.designation || 'Principal',
    ...(principal.message || principal.bio
      ? { description: principal.message || principal.bio }
      : {}),
    ...(principal.imageUrl ? { image: principal.imageUrl } : {}),
    worksFor: {
      '@type': 'EducationalOrganization',
      name: data.school.name,
      url: `https://${domain}`,
    },
  };
}
```

---

## TASK 5 — Add generateBreadcrumbJsonLd() to seo.ts

Add this utility function (used by all inner pages — not home):

```ts
/**
 * Generates BreadcrumbList schema for inner pages.
 * Home page does NOT need a breadcrumb — it is the root.
 *
 * Usage:
 *   generateBreadcrumbJsonLd('school.com', [{ name: 'Faculty', path: '/faculty' }])
 */
export function generateBreadcrumbJsonLd(
  domain: string,
  crumbs: Array<{ name: string; path: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://${domain}`,
      },
      ...crumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `https://${domain}${crumb.path}`,
      })),
    ],
  };
}
```

---

## TASK 6 — Update imports in tenant/page.tsx

Replace the existing seo import line with:

```ts
import {
  generateTenantMetadata,
  generateSchoolJsonLd,
  generateEventsJsonLd,
  generatePrincipalJsonLd,
  generateAboutMetadata,
  generateAboutJsonLd,
} from '@/core/utils/seo';
```

(generateBreadcrumbJsonLd is not needed on home — add it when building inner pages)

---

## TASK 7 — Inject new JSON-LD blocks in tenant/page.tsx

Find the existing JSON-LD injection block (around line 161-170).
It currently only has generateSchoolJsonLd and generateAboutJsonLd.
Replace the entire block with:

```tsx
{tenantState.data && (
  <>
    {/* 1. School / EducationalOrganization — always present */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchoolJsonLd(tenantState.data, hostname)),
      }}
    />

    {/* 2. About page schema — only on /about */}
    {path === '/about' && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateAboutJsonLd(tenantState.data, hostname)),
        }}
      />
    )}

    {/* 3. Upcoming Events — home screen only, skip if no upcoming events */}
    {screenName === 'home' && (() => {
      const eventsLd = generateEventsJsonLd(tenantState.data, hostname);
      return eventsLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsLd) }}
        />
      ) : null;
    })()}

    {/* 4. Principal Person schema — home screen only, skip if no principal */}
    {screenName === 'home' && (() => {
      const principalLd = generatePrincipalJsonLd(tenantState.data, hostname);
      return principalLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(principalLd) }}
        />
      ) : null;
    })()}
  </>
)}
```

Also ensure screenName is declared before this block:
```ts
const screenName = pathToScreenName(path);
```
(It should already exist — verify it's declared before the JSX return, not only in generateMetadata)

---

## TASK 8 — Mirror same JSON-LD in demo/page.tsx

Find the JSON-LD injection block in demo/page.tsx.
Apply the exact same changes as Task 7.

Update the import line in demo/page.tsx:
```ts
import {
  generateTenantMetadata,
  generateSchoolJsonLd,
  generateEventsJsonLd,
  generatePrincipalJsonLd,
  generateAboutMetadata,
  generateAboutJsonLd,
} from '@/core/utils/seo';
```

---

## TASK 9 — Fix generateAboutMetadata() spread issue

The current generateAboutMetadata() does:
```ts
return {
  ...generateTenantMetadata(data, domain, isDemo),
  title,
  description,
  openGraph: { title, description, url: `https://${domain}/about`, type: 'website' }
}
```

The spread from generateTenantMetadata now includes metadataBase, keywords, authors, etc.
The openGraph override is INCOMPLETE — it loses siteName, images, locale from the base.

Replace with:

```ts
export function generateAboutMetadata(
  data: TenantViewModel,
  domain: string,
  isDemo = false
): Metadata {
  const school = data.school;
  const base = generateTenantMetadata(data, domain, isDemo);

  const title = isDemo
    ? `[PREVIEW] About Us - ${school.name} | EdDesk`
    : `About Us | ${school.name}`;

  const description = [
    `Learn about ${school.name}`,
    school.city ? `in ${school.city}` : null,
    data.identity?.vision
      ? `— ${data.identity.vision.slice(0, 80)}`
      : '— our vision, mission, and academic leadership.',
  ]
    .filter(Boolean)
    .join(' ');

  const trimmedDesc = description.length > 160
    ? description.slice(0, 157) + '...'
    : description;

  return {
    ...base,
    title,
    description: trimmedDesc,
    alternates: { canonical: `https://${domain}/about` },
    openGraph: {
      ...(base.openGraph as object),
      title,
      description: trimmedDesc,
      url: `https://${domain}/about`,
    },
  };
}
```

---

## What the Final <head> Will Produce

After these changes, Google will see the following for a real school homepage:

```html
<!-- Core -->
<title>Green Valley School - Official Website | Thoothukudi</title>
<meta name="description" content="Welcome to Green Valley School located in Thoothukudi, Tamil Nadu. 1500+ Students. Call us: 9876543210.">
<meta name="keywords" content="Green Valley School, school in Thoothukudi, school in Tamil Nadu, best school Thoothukudi, school admissions, award winning school, qualified teachers, board results, academic excellence, ...">
<meta name="author" content="Green Valley School">
<meta name="category" content="education">
<meta name="application-name" content="Green Valley School">
<meta name="generator" content="EdDesk">

<!-- Robots (live) -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">

<!-- Canonical -->
<link rel="canonical" href="https://greenvalley.com">

<!-- Open Graph -->
<meta property="og:title" content="Green Valley School - Official Website | Thoothukudi">
<meta property="og:description" content="Welcome to Green Valley School...">
<meta property="og:url" content="https://greenvalley.com">
<meta property="og:site_name" content="Green Valley School">
<meta property="og:locale" content="en_IN">
<meta property="og:type" content="website">
<meta property="og:image" content="https://...hero-or-logo.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Green Valley School - Official School Website">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Green Valley School - Official Website | Thoothukudi">
<meta name="twitter:description" content="Welcome to Green Valley School...">
<meta name="twitter:image" content="https://...hero-or-logo.jpg">

<!-- JSON-LD blocks -->
<script type="application/ld+json">{ EducationalOrganization + sameAs + principal }</script>
<script type="application/ld+json">{ ItemList of upcoming Events }</script>
<script type="application/ld+json">{ Person — Principal }</script>
```

---

## Validation Checklist

seo.ts:
  [ ] generateTenantMetadata() has: title, description, keywords, authors,
      category, applicationName, generator, robots (with googleBot), alternates,
      metadataBase, openGraph (with locale + image dimensions), twitter, icons
  [ ] generateSchoolJsonLd() has: ['EducationalOrganization','School'] type,
      logo as ImageObject, sameAs social array, employee (principal), full address with postalCode
  [ ] generateEventsJsonLd() added — returns null when no upcoming events
  [ ] generatePrincipalJsonLd() added — returns null when no principal
  [ ] generateBreadcrumbJsonLd() added — takes domain + crumbs array
  [ ] generateAboutMetadata() fixed — spreads base OG correctly, not overwriting it

tenant/page.tsx:
  [ ] Imports include generateEventsJsonLd, generatePrincipalJsonLd
  [ ] screenName variable declared before JSX return (not just inside generateMetadata)
  [ ] 4 JSON-LD script blocks present: School, About (conditional), Events (conditional), Principal (conditional)

demo/page.tsx:
  [ ] Same imports and same 4 JSON-LD blocks mirrored

Test in browser:
  [ ] View Source → count <script type="application/ld+json"> blocks (expect 2-3 on home)
  [ ] Paste each JSON-LD at https://validator.schema.org → zero errors
  [ ] Check https://search.google.com/test/rich-results → EducationalOrganization + Event detected
  [ ] No <meta name="keywords"> on /demo/* routes (robots noindex confirms this is fine)
  [ ] Description under 160 chars for all pages
