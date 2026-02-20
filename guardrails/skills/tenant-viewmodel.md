---
name: tenant-viewmodel
skill: 18
description: >
  Normalizes raw API data array into a typed TenantViewModel.
  All field access via reference.js constants. No fetching, no rendering.
file: src/core/viewmodels/tenant.viewmodel.ts
version: 2.0
---

# Skill 18: Tenant ViewModel

## Purpose
`buildTenantViewModel(data)` transforms the raw API array into a clean,
typed object that templates can consume. It knows nothing about where
data came from and nothing about how it will be rendered.

---

## The Function

```ts
// Input:  raw API array (TenantApiDataItem[])
// Output: normalized object (TenantViewModel)
export function buildTenantViewModel(data: TenantApiDataItem[]): TenantViewModel
```

---

## The Three Output States

The ViewModel itself always succeeds if data is provided.
States are determined BEFORE calling the ViewModel, in the page:

```
getTenantData() returns 'success'
  → call buildTenantViewModel(result.data)
  → pass TenantViewModel to template

getTenantData() returns 'empty'
  → do NOT call buildTenantViewModel
  → show SystemPopup: "configure via admin.eddesk.in"

getTenantData() returns 'error'
  → do NOT call buildTenantViewModel
  → show SystemPopup: error message
```

---

## TenantViewModel Shape

```ts
{
  school:           { name, logoUrl, email, phone, address, city, state, country, templateId, paymentGatewayUrl }
  identity:         { vision, mission, motto }
  heroMedia:        Array<{ mediaType, mediaUrl, headline, subheadline, primaryButtonText, ... }>
  announcements:    Array<{ title, message, isActive, expiresAt }>
  academicResults:  Array<{ year, passPercentage, distinctions, firstClass, legacyQuote }>
  achievements:     Array<{ title, description, year, category, type, displayOrder }>
  personnel:        Array<{ name, designation, bio, photoUrl, personType, isFeatured }>
  statistics:       Array<{ label, value, icon, displayOrder }>
  mediaLibrary:     Array<{ url, category, caption, isFeatured }>
  events:           Array<{ title, date, description, location, category, isFeatured }>
  admissionSteps:   Array<{ stepNumber, title, description }>
  homepageSections: Array<{ sectionKey, isEnabled, displayOrder, settings }>
}
```

---

## Field Access Rules

```ts
// ✅ CORRECT — use reference constants
str(school[COL_SCHOOLS_NAME])
num(r[COL_HERO_MEDIA_DISPLAY_ORDER])

// ❌ WRONG — never hardcode field names
school['name']
r['display_order']
```

All constants imported from: `@/lib/constants/reference`

---

## Responsibilities

- [ ] Collect rows by table from the flat API array
- [ ] Map each row to its typed interface using reference constants
- [ ] Use `str()`, `num()`, `bool()` helpers — never raw casts
- [ ] All missing fields default to `''`, `0`, or `false` — never `null` crashes
- [ ] `homepageSections` controls what renders — always include it

---

## Strict MVVM Rules

- [ ] ViewModel MUST NOT fetch data
- [ ] ViewModel MUST NOT read environment variables
- [ ] ViewModel MUST NOT know API URLs
- [ ] ViewModel MUST NOT render UI
- [ ] ViewModel MUST NOT import templates
- [ ] ViewModel MUST NOT call `getTenantData()`

---

## Forbidden Actions

- [ ] Conditional rendering logic inside ViewModel
- [ ] Direct template imports
- [ ] Hardcoded schema key strings
- [ ] Data mutation for styling purposes (e.g. truncating text for display)
- [ ] Sorting or filtering based on template-specific needs

---

## Stop Conditions

- ViewModel imports anything from `src/templates/` → STOP
- ViewModel calls `fetch()` or reads `process.env` → STOP
- ViewModel returns different shapes for different templates → STOP
- Hardcoded field name string found → STOP, add to reference.js first
