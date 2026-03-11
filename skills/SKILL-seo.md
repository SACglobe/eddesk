# SKILL: EdDesk SEO Implementation
# Version: 1.0
# Use this skill whenever implementing SEO on any screen in the EdDesk project.
# ─────────────────────────────────────────────────────────────────────────────

## What This Skill Covers

This skill tells you exactly how to implement SEO for any EdDesk screen.
It covers Metadata, JSON-LD structured data schemas, and the rules
every agent must follow when touching SEO-related files.

---

## Architecture Rules — Read Before Writing Any Code

### Rule 1 — SEO lives in two places only

```
src/core/utils/seo.ts           ← ALL JSON-LD generators and Metadata generators
src/app/tenant/[[...path]]/page.tsx   ← calls generateMetadata() and injects JSON-LD
src/app/demo/[templateSlug]/[[...path]]/page.tsx  ← same
```

Templates (template_modern, template_classic, template_premium) are CLIENT components.
They CANNOT generate metadata or inject JSON-LD.
Never put structured data inside template files.

### Rule 2 — seo.ts is the single source of truth

Every JSON-LD generator and every Metadata generator lives in `src/core/utils/seo.ts`.
When adding a new schema for a new screen:
  1. Add the generator function to seo.ts
  2. Call it in the relevant page.tsx
  3. Inject as <script type="application/ld+json"> in the page

### Rule 3 — Data comes only from TenantViewModel

All SEO generators take `(data: TenantViewModel, domain: string, isDemo?: boolean)`.
Never import from Supabase or services directly inside seo.ts.
The viewModel already has all the data you need.

### Rule 4 — Demo routes are never indexed

```ts
robots: { index: !isDemo, follow: !isDemo }
```
Always pass isDemo through. Demo routes must never appear in Google.

### Rule 5 — JSON-LD is injected in page.tsx, not in templates

```tsx
// In tenant/page.tsx or demo/page.tsx:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(generateXxxJsonLd(data, domain)) }}
/>
```

---

## TenantViewModel Fields Available for SEO

These are the fields you can use in seo.ts generators:

```
data.school.name             → school name
data.school.logoUrl          → logo image URL
data.school.email            → contact email
data.school.phone            → contact phone
data.school.address          → street address
data.school.city             → city
data.school.state            → state
data.school.country          → country (default 'IN')
data.school.postalCode       → postal code
data.school.fullAddress      → combined address string
data.school.customDomain     → school's domain

data.principal               → { name, designation, bio, imageUrl } | null
data.leadership[]            → [{ name, role, designation, message, imageUrl }]
data.faculty[]               → [{ name, designation, bio, qualification, imageUrl }]
data.achievements[]          → [{ title, category, year, description, awardLevel }]
data.events[]                → [{ title, description, category, eventDate, startTime, endTime, location }]
data.stats[]                 → [{ label, value }]
data.contactDetails          → { phone, email, address, facebook, instagram, twitter, youtube, mapEmbedUrl }
data.broadcast[]             → [{ title, message, priority }]
data.academicResult          → { year, passPercentage, distinctions, firstClass, legacyQuote } | null
```

---

## Schema Reference — Which Schema for Which Screen

| Screen | Schemas to implement |
|--------|---------------------|
| Home | EducationalOrganization, BreadcrumbList, Event (upcoming), Person (principal) |
| About | AboutPage, EducationalOrganization, Person (principal + leadership) |
| Faculty | ProfilePage per faculty member, ItemList |
| Events | Event per event, ItemList |
| Gallery | ImageGallery, ImageObject per image |
| Admissions | FAQPage (from admission steps), BreadcrumbList |
| Contact | EducationalOrganization (with geo coords), BreadcrumbList |
| Infrastructure | BreadcrumbList |
| Academics | BreadcrumbList, possibly Course if curriculum data exists |

---

## Schema Implementations

### 1. EducationalOrganization (Home + Contact)

```ts
export function generateSchoolJsonLd(data: TenantViewModel, domain: string) {
  const school = data.school;
  const contact = data.contactDetails;

  const social = [
    contact?.facebook,
    contact?.instagram,
    contact?.twitter,
    contact?.youtube,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'School'],
    name: school.name,
    url: `https://${domain}`,
    logo: {
      '@type': 'ImageObject',
      url: school.logoUrl,
    },
    image: school.logoUrl,
    description: `Official website of ${school.name}. Excellence in education.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: school.address,
      addressLocality: school.city,
      addressRegion: school.state,
      postalCode: school.postalCode,
      addressCountry: school.country || 'IN',
    },
    telephone: school.phone,
    email: school.email,
    ...(social.length > 0 ? { sameAs: social } : {}),
    ...(data.principal ? {
      employee: {
        '@type': 'Person',
        name: data.principal.name,
        jobTitle: data.principal.designation || 'Principal',
        image: data.principal.imageUrl || undefined,
      }
    } : {}),
  };
}
```

### 2. BreadcrumbList (Every inner page)

```ts
export function generateBreadcrumbJsonLd(
  domain: string,
  crumbs: Array<{ name: string; path: string }>
) {
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

// Usage for /faculty page:
generateBreadcrumbJsonLd(domain, [{ name: 'Faculty', path: '/faculty' }])

// Usage for /about page:
generateBreadcrumbJsonLd(domain, [{ name: 'About Us', path: '/about' }])
```

### 3. Event Schema (Home + Events page)

```ts
export function generateEventsJsonLd(data: TenantViewModel, domain: string) {
  const now = new Date();
  const upcomingEvents = (data.events ?? []).filter((e: any) => {
    const eventDate = new Date(`${e.eventDate}T${e.startTime || '00:00'}`);
    return eventDate > now;
  }).slice(0, 10); // cap at 10 events

  if (upcomingEvents.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Upcoming Events at ${data.school.name}`,
    itemListElement: upcomingEvents.map((event: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        description: event.description || '',
        startDate: `${event.eventDate}T${event.startTime || '00:00'}`,
        endDate: event.endTime ? `${event.eventDate}T${event.endTime}` : undefined,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: event.location || data.school.name,
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.school.city,
            addressRegion: data.school.state,
            addressCountry: data.school.country || 'IN',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: data.school.name,
          url: `https://${domain}`,
        },
        image: event.imageUrl || data.school.logoUrl || undefined,
      },
    })),
  };
}
```

### 4. Person Schema (Principal / Leadership)

```ts
export function generatePrincipalJsonLd(data: TenantViewModel, domain: string) {
  const principal = data.principal;
  if (!principal) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: principal.name,
    jobTitle: principal.designation || 'Principal',
    description: principal.message || principal.bio || undefined,
    image: principal.imageUrl || undefined,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: data.school.name,
      url: `https://${domain}`,
    },
  };
}
```

### 5. FAQPage (Admissions page)

```ts
export function generateFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
```

### 6. ItemList for Faculty page

```ts
export function generateFacultyJsonLd(data: TenantViewModel, domain: string) {
  const faculty = data.faculty ?? [];
  if (faculty.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Faculty at ${data.school.name}`,
    itemListElement: faculty.map((member: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: member.name,
        jobTitle: member.designation,
        description: member.bio || member.qualification || undefined,
        image: member.imageUrl || undefined,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: data.school.name,
          url: `https://${domain}`,
        },
      },
    })),
  };
}
```

---

## Metadata Patterns Per Screen

### Home Page Metadata
```ts
title: `${school.name} - Official Website`
description: `Welcome to ${school.name}, located in ${school.city}, ${school.state}. Contact: ${school.phone}.`
canonical: `https://${domain}`
openGraph type: 'website'
image: school.logoUrl
```

### Inner Page Metadata Pattern
```ts
// Page-specific title always comes first
title: `[Page Name] | ${school.name}`
description: [specific to page content — use real data not generic text]
canonical: `https://${domain}/[path]`
openGraph url: `https://${domain}/[path]`
```

### Description Quality Rules
- Never use generic text like "Excellence in education" alone
- Always include school name + city in description
- If page has real data (faculty names, event titles), use them
- Keep under 160 characters
- Each page must have a unique description

---

## How to Inject Multiple JSON-LD Blocks in page.tsx

```tsx
// In tenant/page.tsx — inject all relevant schemas for the current screen
{tenantState.data && (
  <>
    {/* Always present */}
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(
        generateSchoolJsonLd(tenantState.data, domain)
      )}}
    />
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(
        generateBreadcrumbJsonLd(domain, breadcrumbs)
      )}}
    />

    {/* Conditional — only inject if data exists */}
    {screenName === 'home' && eventsJsonLd && (
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
    )}
  </>
)}
```

Always check for null before injecting. If a generator returns null (no data),
do not inject an empty or null JSON-LD script tag.

---

## Checklist — Before Marking SEO as Done for Any Screen

- [ ] Metadata title is unique and includes school name
- [ ] Metadata description uses real data (not generic placeholder)
- [ ] Canonical URL is set correctly
- [ ] OpenGraph image is set (use school.logoUrl as fallback)
- [ ] robots: { index: !isDemo, follow: !isDemo } is set
- [ ] At minimum one JSON-LD schema injected for this screen
- [ ] BreadcrumbList injected for every inner page (not home)
- [ ] No JSON-LD injected inside template files (client components)
- [ ] All generators return null gracefully when data is missing
- [ ] No hardcoded school names, addresses, or phone numbers
- [ ] isDemo flag passed through correctly everywhere
