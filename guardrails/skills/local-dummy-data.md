---
name: local-dummy-data
description: >
  Defines and maintains the local dummy data file (tenant.data.js).
  Shape must mirror the live API response exactly.
  Used only when USE_LOCAL_DATA=true.
scope: core/data/local
version: 1.0
---

# Skill: Local Dummy Data Definition

## Purpose
Maintain `src/core/data/local/tenant.data.js` as the single source
of dummy data for development and demo mode.

---

## Rules

- [ ] File exports ONE object: `LOCAL_TENANT_DATA`
- [ ] Shape matches `TenantData` interface in `tenant.model.ts` exactly
- [ ] All field names match `reference.js` constants (no invented names)
- [ ] No computed values — raw values only (formatters live in ViewModels)
- [ ] No business logic — no filtering, no sorting, no conditionals
- [ ] No imports from templates
- [ ] This file is a POJO — it just holds data

---

## Required Top-Level Keys
The exported object MUST contain all of these keys:

```js
{
  school:              { ... },   // matches: DB.TABLES.SCHOOLS
  sections:            [ ... ],   // matches: DB.TABLES.HOMEPAGE_SECTIONS
  hero_media:          [ ... ],   // matches: DB.TABLES.HERO_MEDIA
  announcements:       [ ... ],   // matches: DB.TABLES.ANNOUNCEMENTS
  academic_results:    [ ... ],   // matches: DB.TABLES.ACADEMIC_RESULTS
  achievements:        [ ... ],   // matches: DB.TABLES.ACHIEVEMENTS
  personnel:           [ ... ],   // matches: DB.TABLES.PERSONNEL
  campus_statistics:   [ ... ],   // matches: DB.TABLES.CAMPUS_STATISTICS
  facility_categories: [ ... ],   // matches: DB.TABLES.FACILITY_CATEGORIES
  facilities:          [ ... ],   // matches: DB.TABLES.FACILITIES
  media_library:       [ ... ],   // matches: DB.TABLES.MEDIA_LIBRARY
  events:              [ ... ],   // matches: DB.TABLES.EVENTS
  admission_steps:     [ ... ],   // matches: DB.TABLES.ADMISSION_STEPS
  school_identity:     { ... },   // matches: DB.TABLES.SCHOOL_IDENTITY
}
```

---

## Sections Config Rules
The `sections` array controls which homepage sections are shown.
Each entry must have:
- `section_key` — must match a value in `SECTION_KEYS` from `reference.js`
- `is_enabled` — boolean (true = show, false = hide)
- `display_order` — integer (lower = shown first)

To disable a section for a template demo: set `is_enabled: false`.
To reorder sections: change `display_order` values.
NEVER touch the template to do this.

---

## How to Add a New Section's Data
1. Add the new table data as a new top-level key
2. Add a matching entry in the `sections` array with correct `section_key`
3. Update `tenant.model.ts` TenantData interface
4. Update the ViewModel to consume the new key
5. Pass the new prop to the template
→ Template is NEVER modified

---

## When to Update This File
- New section added to the homepage
- New field added to existing section
- Demo data needs refreshing
- Schema changes (field renamed/added/removed)

---

## Stop Conditions
- If a required field doesn't exist in `reference.js` → add it to `reference.js` first
- If a value needs to be computed → do NOT compute here, do it in ViewModel
- If the API shape is unknown → document the uncertainty, do NOT guess
