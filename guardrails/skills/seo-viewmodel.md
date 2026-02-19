---
name: seo-viewmodel
description: >
  Generates all SEO metadata (title, description, OG, JSON-LD)
  from HomePageProps. No DB access. No template involvement.
scope: core/viewmodels/seo.viewmodel.ts
version: 1.0
---

# Skill: SEO ViewModel

## Purpose
Produce Next.js `Metadata` object and JSON-LD schema from
already-prepared `HomePageProps`. Called in page.tsx before template mount.

---

## Input
`HomePageProps` — the full output of `home.viewmodel.ts`.
No additional data fetching allowed here.

---

## Output

### 1. Next.js Metadata object
```ts
{
  title:       string,
  description: string,
  openGraph: {
    title, description, url, siteName,
    images: [{ url: logoUrl }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title, description
  }
}
```

### 2. JSON-LD Schema (EducationalOrganization)
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "...",
  "url": "...",
  "logo": "...",
  "address": { "@type": "PostalAddress", ... },
  "telephone": "...",
  "email": "..."
}
```

---

## Generation Rules
- Title: `{school.name} | Official Website`
- Description: Use `identity.motto` if available, else `{school.name} — {school.city}`
- OG image: `school.logoUrl` (or fallback to `/og-default.png`)
- JSON-LD: only include fields that have non-empty values
- All values come from `HomePageProps` — never hardcoded

---

## Where This Lives
`src/core/viewmodels/seo.viewmodel.ts`

Called in `page.tsx` via Next.js `generateMetadata()` export:
```ts
export async function generateMetadata(): Promise<Metadata> {
  const result = await getTenantData(domain, templateId);
  const props   = prepareHomePageProps(result.data);
  return prepareSeoMetadata(props);
}
```

---

## Forbidden
- No SEO generation inside templates
- No hardcoded school names, descriptions, or URLs
- No client-side metadata injection
- No fetching data inside this ViewModel

---

## Stop Conditions
- If required SEO fields are empty → use safe fallbacks (never leave title blank)
- If JSON-LD type is unclear → default to `EducationalOrganization`
