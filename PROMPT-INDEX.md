# EdDesk Antigravity — Complete Prompt Index
# Version: 3.0 — Final
# ─────────────────────────────────────────────────────────────────────
# Everything you need. Pick the task, paste the prompt.
# ─────────────────────────────────────────────────────────────────────

## All Prompts at a Glance

| Prompt                    | When to use                                      | Run   |
|---------------------------|--------------------------------------------------|-------|
| setup-infrastructure.md   | First time setup — builds all 15 core files      | Once  |
| verify-infrastructure.md  | After setup — checks all connections             | Once  |
| discover-template-props.md| After verify — reads templates, writes contracts | Once  |
| bind-section-quick.md     | Wire one homepage section to dummy data          | 12x   |
| bind-inner-page.md        | Wire one inner page (About, Admissions, etc.)    | Per page |
| schema-change.md          | Add/remove/rename DB columns or tables           | Per change |

---

## The Full Sequence (Demo First)

```
1. setup-infrastructure        → builds 15 core files
2. verify-infrastructure       → confirms all connections work
3. discover-template-props     → reads templates, writes prop contracts
4. bind-section × 12           → wires all homepage sections
5. bind-inner-page × N         → wires inner pages as needed
```

After step 4 → eddesk.in/demo/template_classic works.
After step 5 → inner pages work too.

---

## PROMPT 1 — Infrastructure Setup (paste as-is)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Core Infrastructure Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[paste full contents of prompts/setup-infrastructure.md]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
✅ Done when: "Template files modified: NONE"

---

## PROMPT 2 — Verify Infrastructure (paste as-is)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Verify Infrastructure (read-only check)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[paste full contents of prompts/verify-infrastructure.md]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
✅ Done when: "OVERALL: ✅ READY"

---

## PROMPT 3 — Discover Template Props (paste as-is)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Template Props Discovery (one-time setup)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[paste full contents of prompts/discover-template-props.md]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
✅ Done when: "Discovery complete. 3 files written."

---

## PROMPT 4 — Bind Homepage Section (fill section + template)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Bind section → [SECTION_KEY] on [TEMPLATE_ID]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first (in this order):
  guardrails/guardrails.md
  guardrails/template-props/[TEMPLATE_ID].md
  guardrails/workflow-section-agent.md
  guardrails/skills/section-data-binding.md
  guardrails/skills/local-dummy-data.md
  src/core/constants/reference.js

Then follow workflow-section-agent.md phases 0–10.
End with Phase 10 report only. No other output.

Rules:
  - ONE section: [SECTION_KEY]
  - ONE template: [TEMPLATE_ID]
  - Template props from guardrails/template-props/[TEMPLATE_ID].md
  - Templates READ ONLY
  - Data: src/core/data/local/tenant.data.js
  - Field names: match reference.js
  - Logic: ViewModels only
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Section run order for template_classic:

| #  | SECTION_KEY      | ✅ |
|----|------------------|----|
| 1  | hero             |    |
| 2  | stats            |    |
| 3  | announcements    |    |
| 4  | academic_results |    |
| 5  | principal        |    |
| 6  | faculty          |    |
| 7  | achievements     |    |
| 8  | facilities       |    |
| 9  | gallery          |    |
| 10 | events           |    |
| 11 | admissions       |    |
| 12 | identity         |    |

---

## PROMPT 5 — Bind Inner Page (fill page + template)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Bind inner page → [PAGE_NAME] on [TEMPLATE_ID]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[paste full contents of prompts/bind-inner-page.md]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Valid PAGE_NAME: about | admissions | contact | facilities | gallery | events | results
✅ Done when: "Template modified: NO"

---

## PROMPT 6 — Schema Change (fill change type + field/table name)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Schema change → [CHANGE_TYPE] [FIELD_OR_TABLE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[paste full contents of prompts/schema-change.md]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Examples:
  EdDesk: Schema change → add-column established_year to schools
  EdDesk: Schema change → add-table testimonials
  EdDesk: Schema change → remove-column legacy_quote from academic_results

✅ Done when: "Template modified: NO" and "Step 5: verify PASSED"

---

## If Agent Goes Off-Track

```
STOP. Re-read guardrails/guardrails.md section 0.
Templates are VIEW-ONLY. Revert any template changes.
Restart the current prompt from Phase 0.
```

---

## Skills Quick Reference

| Task                              | Skill |
|-----------------------------------|-------|
| Wire homepage section             | 10    |
| Wire inner page                   | 14    |
| DB column/table added or removed  | 15    |
| Template updated, re-read props   | 16    |
| Routing not working               | 1, 7  |
| Error states broken               | 8     |
| SEO missing                       | 6     |
| Local data needs updating         | 11    |
| Switching dummy → live API        | 12    |
| Agent went off-track              | 9     |

Full skill details: guardrails/skills.md
