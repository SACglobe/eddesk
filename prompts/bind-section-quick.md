# bind-section-quick.md
# ─────────────────────────────────────────────────────────────
# DAILY USE: Copy the block, fill section + template, paste.
#
# FIRST TIME? Run discover-template-props.md once before this.
#
# Sections: hero | announcements | stats | academic_results |
#           achievements | principal | faculty | facilities |
#           gallery | events | admissions | identity
#
# Templates: template_classic | template_modern | template_premium
# ─────────────────────────────────────────────────────────────

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

If guardrails/template-props/[TEMPLATE_ID].md does not exist:
  STOP — run prompts/discover-template-props.md first.

Then follow workflow-section-agent.md phases 0–10.
End with the Phase 10 report only. No other output.

Rules:
  - ONE section: [SECTION_KEY]
  - ONE template: [TEMPLATE_ID]
  - Template props come from guardrails/template-props/[TEMPLATE_ID].md
  - Templates are READ ONLY — never write to them
  - Data source: src/core/data/local/tenant.data.js
  - Field names: must match reference.js constants
  - Logic: ViewModels only, never templates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
