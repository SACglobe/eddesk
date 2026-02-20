---
name: template-renderer-bridge
skill: 20
description: >
  Governs TemplateRenderer.tsx, TenantContext.tsx, and SystemPopupProvider.tsx —
  the three files that bridge SSR data into the client-side template tree.
  These files have strict rules. Agents must not modify them without reading this skill.
files:
  - src/app/demo/[templateSlug]/[[...path]]/TemplateRenderer.tsx
  - src/core/context/TenantContext.tsx
  - src/components/system/SystemPopupProvider.tsx
version: 1.0
---

# Skill 20: Template Renderer Bridge

## What These Three Files Do Together

```
page.tsx (SSR Server Component)
  ↓ fetches tenant data, builds TenantState
  ↓ passes tenantState to <TemplateRenderer>

TemplateRenderer.tsx (Client Component)
  ↓ looks up template in registry by templateSlug
  ↓ resolves data: tenantState.data ?? demoSchoolData
  ↓ wraps everything in <SystemPopupProvider tenantState={tenantState}>
  ↓ renders <Renderer data={data} path={path} />

SystemPopupProvider.tsx (Client Component)
  ↓ wraps children in <TenantProvider> (sets TenantContext)
  ↓ shows <SystemPopup> if status is 'empty' or 'error'
  ↓ popup is dismissible for errors, not for empty state

TenantContext.tsx
  ↓ provides TenantState to any component via useTenantContext()
  ↓ read-only — nothing writes to it after initialization
```

---

## The Data Resolution Rule (Critical)

```ts
// In TemplateRenderer.tsx — this is the ONLY place data is resolved
const data = (tenantState.status === 'success' && tenantState.data)
    ? (tenantState.data as unknown as typeof demoSchoolData)
    : demoSchoolData;
```

This means:
- **Tenant domain with data** → `TenantViewModel` from API
- **Demo mode (idle status)** → `demoSchoolData` fallback
- **Empty or error** → `demoSchoolData` fallback (popup shown on top)

The template always renders. The popup overlays it for empty/error states.
**This is intentional** — the template never shows a blank screen.

---

## TenantState Shape

```ts
interface TenantState {
    data:    TenantViewModel | null;
    status:  'success' | 'empty' | 'error' | 'idle';
    message: string;
}
```

| Status | Meaning | Popup shown? |
|--------|---------|--------------|
| `success` | API returned data | No |
| `empty` | School exists, no content configured | Yes — not dismissible |
| `error` | Fetch failed | Yes — dismissible |
| `idle` | Demo mode, no API call made | No |

---

## Allowed Changes to These Files

**TemplateRenderer.tsx:**
- [ ] Update data resolution logic ONLY if `demoSchoolData` shape changes
- [ ] Nothing else

**TenantContext.tsx:**
- [ ] Add fields to `TenantState` interface if a new status type is needed
- [ ] Never add business logic here

**SystemPopupProvider.tsx:**
- [ ] Update popup trigger conditions if new status types are added
- [ ] Never add data fetching here

---

## Forbidden Actions

**TemplateRenderer.tsx:**
- [ ] Do not add conditional rendering based on template slug
- [ ] Do not add data transformation logic here
- [ ] Do not import from `src/templates/` directly (registry handles that)
- [ ] Do not remove the `SystemPopupProvider` wrapper

**TenantContext.tsx:**
- [ ] Do not add writable context (no setState, no dispatch)
- [ ] Do not add data fetching
- [ ] Do not import templates

**SystemPopupProvider.tsx:**
- [ ] Do not add API calls
- [ ] Do not add business logic
- [ ] Do not move the popup inside the template tree
- [ ] Do not make empty state dismissible (school must configure data)

---

## The Current Known Problem

`demoSchoolData` (type: `SchoolContent`) and `TenantViewModel` are
two different shapes. `TemplateRenderer` casts between them unsafely:

```ts
tenantState.data as unknown as typeof demoSchoolData  // ← unsafe cast
```

This means a real tenant domain gets `TenantViewModel` data
but the template expects `SchoolContent` shape — they don't match.

**This is Gap 3** — resolved by the `unify-data-shape` prompt.
Do not attempt to fix this here. Fix it by running that prompt first.

---

## Stop Conditions

- Any of these three files adds a `fetch()` call → STOP
- Popup is moved inside a template component → STOP
- `TenantContext` becomes writable → STOP
- `TemplateRenderer` imports a template directly (bypassing registry) → STOP
- Data transformation logic added to `TemplateRenderer` → STOP, belongs in ViewModel
