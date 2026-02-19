---
name: data-source-switch
description: >
  Implements and governs core/data/index.js — the single toggle
  between local dummy data and the live API.
  All ViewModels use ONLY this file for data access.
scope: core/data
version: 1.0
---

# Skill: Data Source Switch

## Purpose
Ensure `core/data/index.js` is the ONLY entry point for data in ViewModels.
Switching from dummy data → live API requires changing ONE environment variable.

---

## The Contract

```js
// core/data/index.js exports ONE function:
export async function getTenantData(domain, templateId)
// Returns: TenantDataResult { status, data, error }
```

- `status: 'success'` → data is populated, error is null
- `status: 'empty'`   → data is null, no error (not configured)
- `status: 'error'`   → data is null, error has message

---

## Environment Variable

```env
# .env.local
USE_LOCAL_DATA=true    # → uses tenant.data.js (development / demo)
USE_LOCAL_DATA=false   # → calls live API via tenantApi.service.ts
```

Changing this one flag is the ONLY thing needed to swap data sources.

---

## Import Rules

### ✅ Allowed imports of getTenantData:
- `src/app/tenant/[[...path]]/page.tsx`
- `src/app/demo/[templateId]/[[...path]]/page.tsx`

### ❌ Forbidden imports of getTenantData:
- Any template file
- Any ViewModel file
- Any component file
- Any client-side file

### ❌ ViewModels must NEVER import:
- `core/data/local/tenant.data.js` directly
- `core/services/tenantApi.service.ts` directly

---

## Adding a Future Data Source (e.g. direct Supabase)
1. Create `core/services/supabaseService.ts`
2. Add a new condition in `core/data/index.js`:
   ```js
   if (process.env.USE_SUPABASE === 'true') {
     return await supabaseService.fetch(domain, templateId);
   }
   ```
3. Return same `TenantDataResult` shape
→ Zero changes needed in ViewModels, templates, or pages

---

## Stop Conditions
- If a ViewModel is importing from service directly → refactor to use index.js
- If a template is importing data from anywhere → guardrail violation, STOP
- If the return shape differs between local/API → normalize in the switch layer
