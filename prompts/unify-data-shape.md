# EdDesk — Unify Data Source
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Make LOCAL_TENANT_DATA (src/core/data/local/tenant.data.js) the
#   single source of truth for all demo and fallback data.
#
#   Currently:
#     - Demo/fallback data → src/lib/constants/demo-data.ts (SchoolContent shape)
#     - API data           → TenantViewModel shape
#     - These are DIFFERENT shapes → causes unsafe cast in TemplateRenderer
#
#   After this prompt:
#     - Demo/fallback data → src/core/data/local/tenant.data.js (LOCAL_TENANT_DATA)
#     - API data           → TenantViewModel shape
#     - Both flow through buildTenantViewModel() → SAME shape everywhere
#     - src/lib/constants/demo-data.ts → DELETED (no longer needed)
#
# PREREQUISITE: Infrastructure setup and verification must be complete.
# DO NOT modify any template file during this task.
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Switch to LOCAL_TENANT_DATA as single demo data source
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first (in this order):
  guardrails/guardrails.md
  guardrails/skills/template-renderer-bridge.md
  guardrails/skills/tenant-viewmodel.md
  guardrails/skills/tenant-data-source.md
  src/core/viewmodels/tenant.viewmodel.ts        ← buildTenantViewModel()
  src/core/data/local/tenant.data.js             ← LOCAL_TENANT_DATA (the real source)
  src/lib/constants/demo-data.ts                 ← to be deleted
  src/app/demo/[templateSlug]/[[...path]]/TemplateRenderer.tsx

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/app/demo/[templateSlug]/[[...path]]/TemplateRenderer.tsx
  - src/lib/constants/demo-data.ts  (to be deleted)

Forbidden: ALL template files. Do NOT touch tenant.data.js —
           it is already correct and must not be changed.

─────────────────────────────────────────────────────────────
PHASE 1 — Understand the current problem
─────────────────────────────────────────────────────────────
Read TemplateRenderer.tsx. It currently does this:

  import { demoSchoolData } from '@/lib/constants/demo-data';
  ...
  const data = (tenantState.status === 'success' && tenantState.data)
      ? (tenantState.data as unknown as typeof demoSchoolData)  ← UNSAFE CAST
      : demoSchoolData;                                          ← WRONG SOURCE

Two problems:
  1. demoSchoolData is SchoolContent shape — different from TenantViewModel
  2. It imports from the wrong file — should use LOCAL_TENANT_DATA

─────────────────────────────────────────────────────────────
PHASE 2 — Understand LOCAL_TENANT_DATA
─────────────────────────────────────────────────────────────
Read src/core/data/local/tenant.data.js.

LOCAL_TENANT_DATA has this top-level shape:
  {
    school:              { ... }   ← raw DB row shape
    sections:            [ ... ]   ← homepage_sections rows
    hero_media:          [ ... ]   ← hero_media rows
    announcements:       [ ... ]
    academic_results:    [ ... ]
    achievements:        [ ... ]
    personnel:           [ ... ]
    campus_statistics:   [ ... ]
    facility_categories: [ ... ]
    facilities:          [ ... ]
    media_library:       [ ... ]
    events:              [ ... ]
    admission_steps:     [ ... ]
    school_identity:     { ... }
  }

This is RAW data — it matches the DB shape, NOT TenantViewModel shape.
It must pass through buildTenantViewModel() to become TenantViewModel.

─────────────────────────────────────────────────────────────
PHASE 3 — Understand buildTenantViewModel()
─────────────────────────────────────────────────────────────
Read src/core/viewmodels/tenant.viewmodel.ts.

buildTenantViewModel() currently accepts:
  TenantApiDataItem[]  ← expects an ARRAY of flat objects

But LOCAL_TENANT_DATA is a structured OBJECT, not a flat array.

This means we need a thin adapter that converts LOCAL_TENANT_DATA
into the shape buildTenantViewModel() expects, OR we call a simpler
direct mapping function.

The cleanest solution: create a new exported function in tenant.viewmodel.ts:

  export function buildTenantViewModelFromLocal(
    data: typeof LOCAL_TENANT_DATA
  ): TenantViewModel

This function maps the structured LOCAL_TENANT_DATA object directly
to TenantViewModel — without needing the flat array format.

─────────────────────────────────────────────────────────────
PHASE 4 — Plan the changes (NO code yet)
─────────────────────────────────────────────────────────────
Two changes needed:

CHANGE A — Add buildTenantViewModelFromLocal() to tenant.viewmodel.ts

  This function accepts LOCAL_TENANT_DATA shape and returns TenantViewModel.
  It maps fields directly:

    school:           data.school fields → TenantViewModel.school
    identity:         data.school_identity → TenantViewModel.identity
    heroMedia:        data.hero_media[] → TenantViewModel.heroMedia
    announcements:    data.announcements[] → TenantViewModel.announcements
    academicResults:  data.academic_results[] → TenantViewModel.academicResults
    achievements:     data.achievements[] → TenantViewModel.achievements
    personnel:        data.personnel[] → TenantViewModel.personnel
    statistics:       data.campus_statistics[] → TenantViewModel.statistics
    mediaLibrary:     data.media_library[] → TenantViewModel.mediaLibrary
    events:           data.events[] → TenantViewModel.events
    admissionSteps:   data.admission_steps[] → TenantViewModel.admissionSteps
    homepageSections: data.sections[] → TenantViewModel.homepageSections

  Use the same str(), num(), bool() helpers already in the file.
  Field names from LOCAL_TENANT_DATA match reference.js constants exactly.
  Use safe defaults: str() returns '', num() returns 0, bool() returns false.

CHANGE B — Update TemplateRenderer.tsx

  Before:
    import { demoSchoolData } from '@/lib/constants/demo-data';
    ...
    const data = (tenantState.status === 'success' && tenantState.data)
        ? (tenantState.data as unknown as typeof demoSchoolData)
        : demoSchoolData;

  After:
    import { LOCAL_TENANT_DATA } from '@/core/data/local/tenant.data';
    import { buildTenantViewModelFromLocal } from '@/core/viewmodels/tenant.viewmodel';
    ...
    const fallbackData = buildTenantViewModelFromLocal(LOCAL_TENANT_DATA);

    const data: TenantViewModel = (tenantState.status === 'success' && tenantState.data)
        ? tenantState.data
        : fallbackData;

  Also update Renderer prop type:
    Before: data: any
    After:  data: TenantViewModel

CHANGE C — Delete src/lib/constants/demo-data.ts
  It is no longer imported anywhere after Change B.
  Delete the file entirely.

─────────────────────────────────────────────────────────────
PHASE 5 — Make the changes
─────────────────────────────────────────────────────────────
Execute in this exact order:

  1. Add buildTenantViewModelFromLocal() to tenant.viewmodel.ts
  2. Update TemplateRenderer.tsx to use LOCAL_TENANT_DATA
  3. Confirm no other file imports from demo-data.ts
     (search for: import.*demo-data, from.*demo-data)
  4. Delete src/lib/constants/demo-data.ts

Do NOT change any template file.
Do NOT change tenant.data.js.
Do NOT change the existing buildTenantViewModel() function —
  only ADD the new buildTenantViewModelFromLocal() alongside it.

─────────────────────────────────────────────────────────────
PHASE 6 — Validate
─────────────────────────────────────────────────────────────
  - [ ] buildTenantViewModelFromLocal() exists in tenant.viewmodel.ts
  - [ ] buildTenantViewModelFromLocal() returns TenantViewModel shape
  - [ ] TemplateRenderer imports LOCAL_TENANT_DATA from core/data/local/tenant.data
  - [ ] TemplateRenderer imports buildTenantViewModelFromLocal from tenant.viewmodel
  - [ ] No `as unknown as` cast anywhere in TemplateRenderer.tsx
  - [ ] Renderer data prop typed as TenantViewModel (not any)
  - [ ] No file imports from src/lib/constants/demo-data.ts anymore
  - [ ] src/lib/constants/demo-data.ts is deleted
  - [ ] tenant.data.js was NOT modified
  - [ ] No template file was modified
  - [ ] TypeScript errors: zero

─────────────────────────────────────────────────────────────
PHASE 7 — Report
─────────────────────────────────────────────────────────────
```
Data Source Unification Report

Files changed:
  src/core/viewmodels/tenant.viewmodel.ts   added buildTenantViewModelFromLocal()
  src/app/demo/.../TemplateRenderer.tsx     switched to LOCAL_TENANT_DATA
  src/lib/constants/demo-data.ts            DELETED

Single data source:       src/core/data/local/tenant.data.js
Fallback data function:   buildTenantViewModelFromLocal(LOCAL_TENANT_DATA)
Unsafe cast removed:      YES
Renderer prop type:       TenantViewModel (was: any)
demo-data.ts deleted:     YES
tenant.data.js modified:  NO
Template files modified:  NONE
Guardrails violated:      NONE
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
