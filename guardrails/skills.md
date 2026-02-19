# EdDesk Skills Definition
# Version: 2.0
#
# This file defines the ONLY skills agents are allowed to use.
# Each skill has a fixed responsibility boundary.
# If a task does not fit any skill → agent MUST STOP.
#
# All checks must pass 100%.
# ─────────────────────────────────────────────────────────────────────

---

## Skill 1: Domain Resolution
**File:** guardrails/skills/domain-resolution.md
**Purpose:** Resolve request domain → routing mode (marketing / demo / tenant). SSR only.
**Allowed:** Read hostname, return routing decision.
**Forbidden:** DB access, template rendering, client-side logic, business logic.

---

## Skill 2: Database Constants Mapping
**File:** guardrails/skills/local-dummy-data.md (reference section)
**Purpose:** Single source of truth for all table and column names in reference.js.
**Allowed:** Define/export table constants, column constants, update on schema change.
**Forbidden:** Writing queries, fetching data, formatting data, hardcoding names elsewhere.

---

## Skill 3: Data Models (POJO)
**File:** src/core/models/tenant.model.ts
**Purpose:** TypeScript interfaces matching DB schema exactly. No logic.
**Allowed:** Define interfaces, match DB schema, export for ViewModels.
**Forbidden:** DB access, business logic, formatting, side effects.

---

## Skill 4: Database Access Service
**File:** guardrails/skills/data-source-switch.md
**Purpose:** Centralized data access via core/data/index.js. Switches local ↔ API.
**Allowed:** Fetch data, handle errors, return TenantDataResult shape.
**Forbidden:** UI logic, template imports, routing decisions, SEO logic.

---

## Skill 5: ViewModel — Home Page
**File:** src/core/viewmodels/home.viewmodel.ts
**Purpose:** Aggregate all homepage section data into HomePageProps.
**Allowed:** Consume TenantData, apply enable/disable/ordering/fallback, produce typed props.
**Forbidden:** Rendering UI, importing templates, direct DB access, client-side execution.

---

## Skill 6: ViewModel — SEO
**File:** guardrails/skills/seo-viewmodel.md
**Purpose:** Generate meta title, description, Open Graph, JSON-LD from HomePageProps.
**Allowed:** Generate metadata, accept ViewModel output as input.
**Forbidden:** Writing SEO inside templates, client-side SEO, fetching DB data directly.

---

## Skill 7: Template Mounting
**File:** guardrails/skills/tenant-routing.md
**Purpose:** Dynamically import and mount a template without modifying it.
**Allowed:** Dynamic import via registry, pass props, SSR render.
**Forbidden:** Editing template JSX/CSS, adding logic to templates, refactoring templates.

---

## Skill 8: Error Handling (Non-Visual)
**File:** src/components/system/SystemPopup.tsx
**Purpose:** Show system error/empty states outside templates.
**Allowed:** Detect missing data, show fallback UI, log server-side errors.
**Forbidden:** Error UI inside templates, silent failures, client-side error masking.

---

## Skill 9: Agent Execution Control
**File:** guardrails/workflow-section-agent.md
**Purpose:** Ensure agents operate safely within declared scope.
**Allowed:** Declare scope, list files, work one section at a time, stop on conflict.
**Forbidden:** Scope expansion, batch operations without permission, making assumptions.

---

## Skill 10: Section Data Binding
**File:** guardrails/skills/section-data-binding.md
**Purpose:** Wire ViewModel output to template section props. One section per run.
**Allowed:** Read template-props contract, align ViewModel keys, update ViewModel only.
**Forbidden:** Editing templates, renaming template props, adding logic inside templates.

---

## Skill 11: Local Dummy Data
**File:** guardrails/skills/local-dummy-data.md
**Purpose:** Maintain tenant.data.js as single local data source mirroring API shape.
**Allowed:** Define/update dummy data, match reference.js field names, raw values only.
**Forbidden:** Computed values, business logic, importing templates, inventing field names.

---

## Skill 12: Data Source Switch
**File:** guardrails/skills/data-source-switch.md
**Purpose:** core/data/index.js as the ONE toggle between local data and live API.
**Allowed:** Read USE_LOCAL_DATA flag, route to correct source, return consistent shape.
**Forbidden:** Importing data sources directly in ViewModels, caching, client-side calls.

---

## Skill 13: Hero Data Mapping
**File:** guardrails/skills/hero-data-mapping.md
**Purpose:** Transform hero_media[] into HeroSectionProps (filter, sort, media type detect).
**Allowed:** Filter inactive, sort by display_order, resolve image/video type, map to props.
**Forbidden:** Rendering UI, importing templates, direct DB access, client-side execution.

---

## Skill 14: Inner Page ViewModel
**File:** guardrails/skills/inner-page-viewmodel.md
**Purpose:** Prepare minimal focused props for a single inner page (About, Admissions, etc.).
**Allowed:** Accept TenantData, pull only needed sections, produce typed PageProps.
**Forbidden:** Reusing home.viewmodel, fetching data, importing templates, pulling all sections.

---

## Skill 15: Schema Change Management
**File:** guardrails/skills/schema-change-management.md
**Purpose:** Safe 5-step sequence for updating codebase when DB schema changes.
**Allowed:** Update reference.js → model → dummy data → ViewModel → verify (in that order).
**Forbidden:** Skipping steps, reordering steps, updating template for schema changes.

---

## Skill 16: Template Props Discovery
**File:** guardrails/skills/template-props-discovery.md
**Purpose:** Read templates once, extract prop contracts, write to guardrails/template-props/.
**Allowed:** Read template files, document prop names/types, write contract files.
**Forbidden:** Modifying any template file, renaming props, writing outside template-props/.

---

## Skill Selection Guide

| If the task is...                          | Use skill |
|--------------------------------------------|-----------|
| New section needs data wired               | 10        |
| DB column or table added/removed/renamed   | 15        |
| New inner page (About, Contact, etc.)      | 14        |
| Template was updated, props changed        | 16 then 10|
| SEO metadata missing or wrong              | 6         |
| New school domain needs to load correctly  | 1, 7      |
| Local dummy data needs updating            | 11        |
| Switching from dummy data to live API      | 12        |
| Error states not showing correctly         | 8         |
| Agent went off-track / scope creep         | 9         |

---

## Final Acceptance Checklist

- [ ] Task matches exactly ONE skill above
- [ ] No forbidden actions were taken
- [ ] Guardrails were respected
- [ ] Output is deterministic and scoped

If any check fails → task is INVALID.
