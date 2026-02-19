# EdDesk — Section Binding Prompt
# ─────────────────────────────────────────────────────────────────────
# HOW TO USE:
#   Copy everything below the line, replace [SECTION_KEY] and [TEMPLATE_ID],
#   paste it to your AI agent (Cursor, Windsurf, Claude, etc.)
#
# SECTION_KEY options:
#   hero | announcements | stats | academic_results | achievements |
#   principal | faculty | facilities | gallery | events | admissions | identity
#
# TEMPLATE_ID options:
#   template_classic | template_modern | template_premium
# ─────────────────────────────────────────────────────────────────────

════════════════════════════════════════════════════════════
EDDESK SECTION BINDING TASK
════════════════════════════════════════════════════════════

Section:   [SECTION_KEY]
Template:  [TEMPLATE_ID]

════════════════════════════════════════════════════════════
MANDATORY: Before doing anything, read these files in order:
════════════════════════════════════════════════════════════

1. guardrails/guardrails.md
2. guardrails/workflow-section-agent.md
3. guardrails/skills/section-data-binding.md
4. guardrails/skills/local-dummy-data.md
5. src/core/constants/reference.js

Only after reading all five → execute the workflow.

════════════════════════════════════════════════════════════
YOUR CONSTRAINTS (non-negotiable)
════════════════════════════════════════════════════════════

✅ You are wiring ONE section only: [SECTION_KEY]
✅ You are targeting ONE template only: [TEMPLATE_ID]
✅ You may read template files — you may NOT write to them
✅ All data comes from src/core/data/local/tenant.data.js
✅ All field names must match src/core/constants/reference.js
✅ All business logic goes in ViewModels, not templates

❌ Do NOT modify any template JSX
❌ Do NOT modify any CSS
❌ Do NOT work on any other section
❌ Do NOT hardcode values — use reference.js constants
❌ Do NOT fetch data in templates

════════════════════════════════════════════════════════════
EXECUTE: Follow workflow-section-agent.md phases 0 → 10
════════════════════════════════════════════════════════════

End with the Phase 10 report. No other commentary.
