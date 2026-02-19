# EdDesk — Schema Change
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Safely update the codebase when the database schema changes.
#   Agent follows the 5-step sequence from Skill 15.
#   No steps skipped. No steps reordered.
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Schema change → [CHANGE_TYPE] [FIELD_OR_TABLE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Valid CHANGE_TYPE values:
  add-column | add-table | remove-column | remove-table | rename-column

Examples:
  EdDesk: Schema change → add-column established_year to schools
  EdDesk: Schema change → add-table testimonials
  EdDesk: Schema change → remove-column legacy_quote from academic_results

Read first (in this order):
  guardrails/guardrails.md
  guardrails/skills/schema-change-management.md
  guardrails/skills/local-dummy-data.md
  src/core/constants/reference.js
  src/core/models/tenant.model.ts

Then follow the Skill 15 sequence exactly:

─────────────────────────────────────────────────────────────
For ADD-COLUMN or ADD-TABLE:
─────────────────────────────────────────────────────────────
Step 1 → reference.js          add constant(s)
Step 2 → tenant.model.ts       add field to interface (nullable)
Step 3 → tenant.data.js        add realistic dummy value
Step 4 → viewmodel             consume new field if relevant
Step 5 → verify                run verify-infrastructure.md

─────────────────────────────────────────────────────────────
For REMOVE-COLUMN or REMOVE-TABLE:
─────────────────────────────────────────────────────────────
Step 1 → viewmodel             remove field from output FIRST
Step 2 → tenant.data.js        remove from dummy data
Step 3 → tenant.model.ts       remove from interface
Step 4 → reference.js          remove constant LAST
Step 5 → verify                run verify-infrastructure.md

─────────────────────────────────────────────────────────────
For RENAME-COLUMN:
─────────────────────────────────────────────────────────────
Treat as ADD then REMOVE:
  First: add-column [new name]    (Steps 1–4)
  Then:  remove-column [old name] (Steps 1–4)
  Then:  verify                   (Step 5)

─────────────────────────────────────────────────────────────
RULES
─────────────────────────────────────────────────────────────
✅ Follow the sequence for the change type — no reordering
✅ All new fields in tenant.data.js use field names from reference.js
✅ All new interface fields are nullable (field | null) unless DB has NOT NULL
✅ All new ViewModel mappings use ?? null or ?? '' fallbacks
✅ Multiple schools consideration: new fields must be nullable so schools
   that don't have the field yet don't crash

❌ Do not modify any template file
❌ Do not hardcode field names anywhere except reference.js
❌ Do not skip the verify step

─────────────────────────────────────────────────────────────
END REPORT FORMAT
─────────────────────────────────────────────────────────────
```
Schema Change Report
Change type:       [CHANGE_TYPE]
Field/Table:       [name]

Files changed:
  Step 1: [reference.js]      [what changed]
  Step 2: [model file]        [what changed]
  Step 3: [tenant.data.js]    [what changed]
  Step 4: [viewmodel file]    [what changed / N/A]
  Step 5: verify              [PASSED / needs fix]

Template modified:  NO
Guardrails:         NONE violated
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
