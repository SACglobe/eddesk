---
name: schema-change-management
skill: 15
description: >
  Safe procedure for updating the codebase when the database schema changes.
  Covers adding columns, adding tables, renaming, and removing fields.
  Defines the exact file update sequence so nothing gets missed.
scope: src/core/constants/, src/core/models/, src/core/data/local/
version: 1.0
---

# Skill 15: Schema Change Management

## Purpose
When the database schema changes, update exactly the right files
in the right order so the whole system stays consistent.

---

## The 5-File Update Sequence

Every schema change touches these files in this exact order.
Never skip a step. Never reorder.

```
Step 1 → reference.js          add the new constant
Step 2 → tenant.model.ts       add the new field to the interface
Step 3 → tenant.data.js        add realistic dummy value for the field
Step 4 → home.viewmodel.ts     consume the new field (if homepage-relevant)
          OR pages/[x].viewmodel.ts (if inner-page-relevant)
Step 5 → Verify                run verify-infrastructure.md prompt
```

Stop after each step and confirm it's correct before moving to the next.

---

## Change Type: Adding a Column to an Existing Table

Example: Adding `established_year` to the `schools` table.

**Step 1 — reference.js**
```js
export const SCHOOLS = {
  ...existing fields...
  ESTABLISHED_YEAR: 'established_year',   // ← add this
};
```

**Step 2 — tenant.model.ts**
```ts
export interface School {
  ...existing fields...
  established_year: number | null;   // ← add this, always nullable
}
```

**Step 3 — tenant.data.js**
```js
school: {
  ...existing fields...
  established_year: 1989,   // ← add realistic value
}
```

**Step 4 — ViewModel (if needed)**
```ts
// In home.viewmodel.ts or relevant page viewmodel:
schoolInfo: {
  ...existing fields...
  establishedYear: data.school.established_year ?? null,
}
```

**Step 5 — Verify**
Run: `prompts/verify-infrastructure.md`

---

## Change Type: Adding a New Table

Example: Adding a `testimonials` table.

**Step 1 — reference.js**
```js
// Add to TABLES:
TESTIMONIALS: 'testimonials',

// Add new column group:
export const TESTIMONIALS = {
  ID:          'id',
  SCHOOL_ID:   'school_id',
  AUTHOR_NAME: 'author_name',
  CONTENT:     'content',
  DESIGNATION: 'designation',
  IS_ACTIVE:   'is_active',
  DISPLAY_ORDER:'display_order',
};
```

**Step 2 — tenant.model.ts**
```ts
export interface Testimonial {
  id:            string;
  school_id:     string;
  author_name:   string;
  content:       string;
  designation:   string | null;
  is_active:     boolean;
  display_order: number;
}

// Add to TenantData interface:
export interface TenantData {
  ...existing...
  testimonials: Testimonial[];   // ← add this
}
```

**Step 3 — tenant.data.js**
```js
// Add to LOCAL_TENANT_DATA:
testimonials: [
  { id: 't-01', school_id: 'demo-school-001', author_name: '...', ... },
  { id: 't-02', school_id: 'demo-school-001', author_name: '...', ... },
],

// Add to sections[] if it's a homepage section:
{ id: 's-14', school_id: 'demo-school-001',
  section_key: 'testimonials', is_enabled: true, display_order: 7, ... },
```

**Step 4 — Add to SECTION_KEYS in reference.js** (if it's a homepage section)
```js
export const SECTION_KEYS = {
  ...existing...
  TESTIMONIALS: 'testimonials',
};
```

**Step 4b — ViewModel**
Add a `TestimonialsSectionProps` interface and mapping in `home.viewmodel.ts`.

**Step 5 — Verify**
Run: `prompts/verify-infrastructure.md`

---

## Change Type: Renaming a Column

Treat this as TWO changes:
1. Add the new name following the Adding a Column procedure
2. Remove the old name following the Removing a Column procedure

Never rename in-place — it breaks tenant.data.js and the model simultaneously.

---

## Change Type: Removing a Column

Order matters — remove from the bottom up:

```
Step 1 → home.viewmodel.ts     remove the field from output
Step 2 → tenant.data.js        remove the field from dummy data
Step 3 → tenant.model.ts       remove the field from the interface
Step 4 → reference.js          remove the constant LAST
Step 5 → Verify
```

Removing from reference.js last ensures nothing references
a constant that no longer has a backing field.

---

## Multiple Schools Consideration

When adding a new field, every school's data must provide it.
In `tenant.data.js` there is only one demo school — but in production,
the API returns data per school. The field must be:
  - Present in the interface (tenant.model.ts)
  - Typed as nullable (field | null)
  - Given a fallback in the ViewModel (use `?? null` or `?? ''`)

This ensures School A having the field and School B not having it
both work without crashing.

---

## Stop Conditions

- If a schema change requires template modification → STOP, guardrail violation
- If a new field's name is not added to reference.js first → STOP
- If dummy data uses a field name not in reference.js → STOP, fix reference.js first
- If removing a column that a ViewModel still reads → fix ViewModel before removing
