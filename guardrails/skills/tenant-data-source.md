---
name: tenant-data-source
skill: 17
description: >
  Resolves tenant data from ONE entry point only. Switches between local dummy
  data and live API via env flag. Never called from templates or ViewModels directly.
file: src/core/data/index.js
version: 2.0
---

# Skill 17: Tenant Data Source

## Purpose
`core/data/index.js` is the **single gate** for all tenant data access.
Switching from local → API = change ONE env variable. Nothing else changes.

---

## The Entry Point

```
src/core/data/index.js
  └── getTenantData(domain, templateId) → TenantDataResult
```

Every ViewModel, every page, every SSR route calls THIS function only.
Nothing else imports `tenant.data.js` or `tenantApi.service.ts` directly.

---

## How the Switch Works

```
.env.local: USE_LOCAL_DATA=true
  → returns LOCAL_TENANT_DATA from tenant.data.js

.env.local: USE_LOCAL_DATA=false (or not set)
  → calls fetchTenantFromApi(domain, templateId)
  → returns live API data
```

Both paths return the **identical shape** — callers cannot tell the difference.

---

## Return Shape (always)

```ts
{
  status: 'success' | 'empty' | 'error',
  data:   TenantData | null,
  error:  string | null
}
```

- `success` → data is present, pass to ViewModel
- `empty`   → school exists but no content configured, show admin message
- `error`   → fetch failed, show error state

---

## Responsibilities

- [ ] Provide a SINGLE entry point to fetch tenant data
- [ ] Read `USE_LOCAL_DATA` env flag — nowhere else reads this flag
- [ ] Return identical shape regardless of data source
- [ ] Never transform or filter data — return raw only
- [ ] Never depend on template structure

---

## Allowed Data Sources

- [ ] `src/core/data/local/tenant.data.js` (development / demo)
- [ ] `src/core/services/tenantApi.service.ts` (production)

---

## Import Rules

```ts
// ✅ CORRECT — pages and ViewModels import from here only
import { getTenantData } from '@/core/data/index.js';

// ❌ WRONG — never import these directly
import { LOCAL_TENANT_DATA } from '@/core/data/local/tenant.data.js';
import { fetchTenantData } from '@/core/services/tenantApi.service.ts';
```

**Exception:** `src/app/demo/[templateSlug]/page.tsx` may import
`LOCAL_TENANT_DATA` directly — demo route always uses local data,
never the API. This is intentional and correct.

---

## Forbidden Actions

- [ ] Reading `USE_LOCAL_DATA` outside this file
- [ ] Importing `tenant.data.js` outside demo page and this file
- [ ] Importing `tenantApi.service.ts` outside this file
- [ ] Hardcoding table or column names
- [ ] Returning template-specific data shapes
- [ ] Mutating data values

---

## Stop Conditions

- `tenant.data.js` imported directly in a ViewModel → STOP
- `tenantApi.service.ts` imported directly in a page → STOP
- Multiple files reading `USE_LOCAL_DATA` → STOP
- Local data shape differs from API shape → STOP, fix `tenant.data.js` first
