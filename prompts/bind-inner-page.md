# EdDesk — Inner Page Binding
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Wire dummy data to ONE inner page (About, Admissions, Contact, etc.)
#   Agent creates the page ViewModel and connects it to the template.
#   Templates are never modified.
#
# PREREQUISITE: Infrastructure setup and discovery must be complete.
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Bind inner page → [PAGE_NAME] on [TEMPLATE_ID]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Valid PAGE_NAME values:
  about | admissions | contact | facilities | gallery | events | results

Read first (in this order):
  guardrails/guardrails.md
  guardrails/template-props/[TEMPLATE_ID].md
  guardrails/skills/inner-page-viewmodel.md
  guardrails/skills/section-data-binding.md
  src/core/constants/reference.js

Then follow these phases:

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
State:
  Page:          [PAGE_NAME]
  Template:      [TEMPLATE_ID]
  Allowed files: (list max 3 — ViewModel file + demo page.tsx + tenant.data.js if needed)
  Forbidden:     ALL template files (no writing)

─────────────────────────────────────────────────────────────
PHASE 1 — Read template contract for this page
─────────────────────────────────────────────────────────────
Open: guardrails/template-props/[TEMPLATE_ID].md
Find the inner page component for [PAGE_NAME] in the Inner Page Components table.

Extract:
  Component name:   [from table]
  Entry file:       [from table]
  Props interface:  [from table]

If the page is not listed → STOP. Report: "Template does not have a [PAGE_NAME] page."

─────────────────────────────────────────────────────────────
PHASE 2 — Check if ViewModel exists
─────────────────────────────────────────────────────────────
Check: src/core/viewmodels/pages/[PAGE_NAME].viewmodel.ts

If exists → read it, go to Phase 3.
If missing → create it following Skill 14 rules:
  - Accept TenantData as input
  - Pull ONLY the sections this page needs (see Skill 14 table)
  - Export a typed [PageName]PageProps interface
  - Export a prepare[PageName]PageProps(data) function

─────────────────────────────────────────────────────────────
PHASE 3 — Alignment check
─────────────────────────────────────────────────────────────
Compare template props (Phase 1) vs ViewModel output (Phase 2).
Fix mismatches in ViewModel only — never in template.

─────────────────────────────────────────────────────────────
PHASE 4 — Wire in demo page.tsx
─────────────────────────────────────────────────────────────
Open: src/app/demo/[templateId]/[[...path]]/page.tsx

Add routing for this inner page:
  - Read params.path to detect the page slug (e.g. ['about'])
  - Call prepare[PageName]PageProps(LOCAL_TENANT_DATA)
  - Dynamically import the correct template component
  - Render with spread props

Do NOT refactor existing homepage routing. Add alongside it.

─────────────────────────────────────────────────────────────
PHASE 5 — Validate
─────────────────────────────────────────────────────────────
  - [ ] No template file was written to
  - [ ] ViewModel only uses TenantData fields from reference.js
  - [ ] Demo route accessible at: eddesk.in/demo/[TEMPLATE_ID]/[PAGE_NAME]
  - [ ] Falls back to SystemPopup if page not found

─────────────────────────────────────────────────────────────
PHASE 6 — Report
─────────────────────────────────────────────────────────────
```
Page:              [PAGE_NAME]
Template:          [TEMPLATE_ID]
ViewModel created: [yes/already existed]
Files changed:     [list]
Demo URL:          eddesk.in/demo/[TEMPLATE_ID]/[PAGE_NAME]
Template modified: NO
Guardrails:        NONE violated
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
