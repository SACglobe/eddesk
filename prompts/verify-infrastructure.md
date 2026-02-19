# EdDesk — Infrastructure Verification
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Run after setup-infrastructure.md completes.
#   Agent checks every connection in the data flow end-to-end.
#   Catches problems before section binding begins.
#   Does NOT modify any file.
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Verify Infrastructure (read-only check)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md

This is a READ-ONLY task. You must NOT modify any file.
Check each item below and report pass ✅ or fail ❌ with reason.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECK 1 — All infrastructure files exist
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirm each file exists:
  src/core/constants/constants.js
  src/core/constants/reference.js
  src/core/constants/templates.js
  src/core/constants/api.js
  src/core/models/tenant.model.ts
  src/core/business/validators.ts
  src/core/business/formatters.ts
  src/core/business/media.ts
  src/core/business/urls.ts
  src/core/services/tenantApi.service.ts
  src/core/viewmodels/hero.viewmodel.ts
  src/core/viewmodels/home.viewmodel.ts
  src/core/router/domainResolver.ts
  src/core/data/index.js
  src/core/data/local/tenant.data.js
  src/components/system/SystemPopup.tsx
  src/app/demo/[templateId]/[[...path]]/page.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECK 2 — Data flow trace
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Trace this exact path by reading each file:

  tenant.data.js exports LOCAL_TENANT_DATA
    ↓ imported by core/data/index.js
    ↓ getTenantData() returns it when USE_LOCAL_DATA=true
    ↓ called by demo/[templateId]/page.tsx
    ↓ result.data passed to prepareHomePageProps()
    ↓ home.viewmodel.ts returns HomePageProps
    ↓ HomePageProps spread into <TemplateHome {...homePageProps} />

Confirm at each step:
  - Import path is correct
  - Function signature matches call site
  - Return shape matches what the next step expects

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECK 3 — Reference.js coverage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open tenant.data.js. For every field name used:
  - Confirm a matching constant exists in reference.js
  - Flag any field name used in tenant.data.js that is NOT in reference.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECK 4 — ViewModel coverage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open home.viewmodel.ts. Confirm:
  - Every key in LOCAL_TENANT_DATA is consumed by the ViewModel
  - Every section in sections[] has a corresponding output in HomePageProps
  - sectionOrder[] is derived from sections[].display_order

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECK 5 — Template registry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open templates.js. Confirm:
  - template_classic, template_modern, template_premium all registered
  - importPath for each points to a folder that exists in src/templates/
  - isValidTemplateId() and getTemplateConfig() are exported

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECK 6 — Demo route
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open src/app/demo/[templateId]/[[...path]]/page.tsx. Confirm:
  - export const dynamic = 'force-dynamic' is present
  - templateId is validated before use
  - LOCAL_TENANT_DATA is used directly (no API call)
  - SystemPopup shown for invalid templateId
  - Template dynamically imported using getTemplateConfig()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHECK 7 — Guardrail compliance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scan all created files and confirm:
  - No hardcoded table or column names (all from reference.js)
  - No template files imported by any core file
  - No client-side data fetching (no useEffect with fetch)
  - No business logic inside any template file
  - tenantApi.service.ts has cache: 'no-store'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFRASTRUCTURE VERIFICATION REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CHECK 1 — Files exist
  ✅/❌ [file] — [pass or reason for fail]
  ... (one line per file)

CHECK 2 — Data flow trace
  ✅/❌ tenant.data.js → index.js
  ✅/❌ index.js → demo/page.tsx
  ✅/❌ demo/page.tsx → prepareHomePageProps()
  ✅/❌ home.viewmodel → HomePageProps shape
  ✅/❌ HomePageProps → TemplateHome spread

CHECK 3 — Reference.js coverage
  ✅ All field names covered
  ❌ Missing: [field name] used in [file] but not in reference.js

CHECK 4 — ViewModel coverage
  ✅/❌ All tenant.data.js keys consumed
  ✅/❌ sectionOrder derived correctly

CHECK 5 — Template registry
  ✅/❌ All 3 templates registered
  ✅/❌ Import paths exist

CHECK 6 — Demo route
  ✅/❌ dynamic = 'force-dynamic'
  ✅/❌ No API call in demo route
  ✅/❌ SystemPopup on invalid template

CHECK 7 — Guardrail compliance
  ✅/❌ No hardcoded schema names
  ✅/❌ No template imports in core
  ✅/❌ No client-side fetching
  ✅/❌ cache: 'no-store' present

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERALL: ✅ READY / ❌ NEEDS FIXES

If NEEDS FIXES — list each fix needed:
  1. [file] — [what to fix]
  2. ...

Next step: [run discover-template-props.md / fix issues above first]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

No other output. Report only.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
