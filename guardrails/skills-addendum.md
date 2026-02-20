## Skill 17: Tenant Data Source
**File:** guardrails/skills/tenant-data-source.md
**Purpose:** `core/data/index.js` is the ONE entry point for all tenant data. Switches local ↔ API via USE_LOCAL_DATA env flag.
**Allowed:** Read env flag, route to correct source, return consistent TenantDataResult shape.
**Forbidden:** Importing tenant.data.js or tenantApi.service.ts anywhere else (except demo page for local data).

---

## Skill 18: Tenant ViewModel
**File:** guardrails/skills/tenant-viewmodel.md
**Purpose:** `buildTenantViewModel(data[])` transforms raw API array into typed TenantViewModel. All field access via reference.js constants.
**Allowed:** Collect rows by table, map to typed interfaces, use str/num/bool helpers, safe defaults.
**Forbidden:** Fetching data, reading env vars, importing templates, hardcoded field name strings.

---

## Skill 19: Template Data Injection
**File:** guardrails/skills/template-data-injection.md
**Purpose:** Pass TenantViewModel into template screens via props — without modifying JSX, CSS, or structure.
**Allowed:** Add `{ data }` to screen props, replace internal constant reads with `data.X` reads, pass `data={data}` to child screens.
**Forbidden:** JSX restructuring, CSS changes, adding fetch/validation logic inside templates, visual changes of any kind.

---

## Updated Skill Selection Guide

| If the task is...                              | Use skill |
|------------------------------------------------|-----------|
| New section needs data wired                   | 10, 19    |
| DB column or table added/removed/renamed       | 15        |
| New inner page (About, Contact, etc.)          | 14        |
| Template was updated, props changed            | 16 then 10|
| SEO metadata missing or wrong                  | 6         |
| New school domain needs to load correctly      | 1, 7      |
| Local dummy data needs updating                | 11        |
| Switching from dummy data to live API          | 12, 17    |
| Error states not showing correctly             | 8         |
| Agent went off-track / scope creep             | 9         |
| Template screen still showing hardcoded data   | 19        |
| ViewModel producing wrong shape                | 18        |
| Data source switch not working                 | 17        |
