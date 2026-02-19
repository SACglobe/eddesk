---
name: inner-page-viewmodel
skill: 14
description: >
  Prepare data for inner pages (About, Admissions, Contact, etc.).
  Each inner page gets its own ViewModel that pulls only what it needs.
  Never reuses the home ViewModel. Never touches templates.
scope: src/core/viewmodels/pages/
version: 1.0
---

# Skill 14: Inner Page ViewModel

## Purpose
Prepare a focused, minimal set of props for a single inner page.
Each page ViewModel is independent — it only fetches the sections it needs.

---

## The Rule: One Page = One ViewModel

| Page       | ViewModel file                          | Sections it needs                        |
|------------|-----------------------------------------|------------------------------------------|
| About      | viewmodels/pages/about.viewmodel.ts     | school, identity, personnel, stats       |
| Admissions | viewmodels/pages/admissions.viewmodel.ts| school, admission_steps, announcements   |
| Contact    | viewmodels/pages/contact.viewmodel.ts   | school (email, phone, address, map)      |
| Facilities | viewmodels/pages/facilities.viewmodel.ts| school, facility_categories, facilities  |
| Gallery    | viewmodels/pages/gallery.viewmodel.ts   | school, media_library                    |
| Events     | viewmodels/pages/events.viewmodel.ts    | school, events                           |
| Results    | viewmodels/pages/results.viewmodel.ts   | school, academic_results, achievements   |

New pages always get a new file. Never expand an existing page ViewModel.

---

## Allowed Responsibilities

- [ ] Accept TenantData as input (never fetch data directly)
- [ ] Pull only the sections this page needs
- [ ] Apply page-specific sorting, filtering, fallback logic
- [ ] Produce a typed PageProps interface
- [ ] Use formatters and validators from core/business/

## Forbidden

- [ ] Importing from home.viewmodel.ts
- [ ] Fetching data directly
- [ ] Importing templates
- [ ] Client-side execution
- [ ] Pulling ALL sections "just in case"

---

## File Structure

```
src/core/viewmodels/
  home.viewmodel.ts        ← homepage only
  hero.viewmodel.ts        ← hero section only
  pages/
    about.viewmodel.ts
    admissions.viewmodel.ts
    contact.viewmodel.ts
    facilities.viewmodel.ts
    gallery.viewmodel.ts
    events.viewmodel.ts
    results.viewmodel.ts
```

---

## Output Shape Pattern

Every inner page ViewModel must export:
```ts
// 1. The props interface
export interface AboutPageProps {
  school:   SchoolInfoProps;
  identity: IdentitySectionProps;
  team:     PersonnelItemProps[];
  stats:    StatItemProps[];
}

// 2. The prepare function
export function prepareAboutPageProps(data: TenantData): AboutPageProps
```

---

## How Inner Pages Load Data

Inner pages use the SAME getTenantData() call as the homepage.
TenantData is fetched once per request — the page ViewModel just
uses a different subset of it.

```
page.tsx (about)
  ↓ getTenantData(domain, templateId)    ← same call, same data
  ↓ prepareAboutPageProps(result.data)   ← different ViewModel
  ↓ <TemplateAbout {...aboutPageProps} /> ← different template component
```

---

## Demo Route for Inner Pages

Inner pages are accessible at:
  eddesk.in/demo/template_classic/about
  eddesk.in/demo/template_classic/admissions
  etc.

The `[[...path]]` catch-all route already handles this.
The demo page.tsx reads `params.path` to decide which ViewModel to call.

---

## Stop Conditions

- If an inner page needs data from a section that doesn't exist in TenantData
  → Add the section to the DB schema and tenant.data.js first (Skill 15)
- If two pages share the same ViewModel
  → They should be separate files, even if output is similar
- If a page needs client-side data (e.g. form submissions)
  → That is a separate concern — server-side props only here
