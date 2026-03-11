# EdDesk — Phase 1, Step 7
# Delete src/core/services/config.service.ts
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU DO ANYTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files in order:
  1. src/core/services/config.service.ts          ← file you will delete
  2. src/app/tenant/[[...path]]/page.tsx           ← only importer

Search the entire codebase for any import of config.service before proceeding:
  grep -rn "config.service\|getGracePeriodDays" src/

Do not delete anything until you have confirmed the search results.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHY THIS FILE IS BEING DELETED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

config.service.ts existed to fetch grace_period_days from a
separate Supabase config table with a fallback of 7.

After Steps 1–4:
  - The RPC get_screen_data now returns plan.graceperiod directly
  - buildTenantViewModel maps it to viewModel.plan.gracePeriod
  - checkSubscription reads viewModel.plan.gracePeriod
  - No code anywhere needs to call getGracePeriodDays() anymore

The file has exactly one importer:
  src/app/tenant/[[...path]]/page.tsx
    line 21:  import { getGracePeriodDays } from '@/core/services/config.service';
    line 132: const gracePeriodDays = await getGracePeriodDays();

That importer is rewritten in Step 8. It will no longer import
getGracePeriodDays after Step 8 runs.

Deleting config.service.ts NOW (before Step 8) will cause a TypeScript
error in tenant/page.tsx — that is EXPECTED and ACCEPTABLE.
The error will be resolved when Step 8 rewrites tenant/page.tsx.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED ACTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  DELETE: src/core/services/config.service.ts

Do NOT modify tenant/page.tsx or any other file.
Do NOT create a replacement file.
Do NOT leave a stub or empty file at that path.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — CONFIRM BEFORE DELETING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Answer both questions before deleting:

  Q1. How many files import from config.service or call getGracePeriodDays?
      (Run the grep. Expected answer: exactly 1 — tenant/page.tsx)

  Q2. Is config.service.ts imported by any file other than tenant/page.tsx?
      (Expected answer: No)

If the answer to Q1 is more than 1, or Q2 is Yes — STOP.
Do not delete. Report the unexpected importer instead.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — DELETE THE FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Once you have confirmed Q1 and Q2 above:

  Delete: src/core/services/config.service.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [ ] src/core/services/config.service.ts no longer exists
  [ ] No stub or empty file left at that path
  [ ] No other files were modified
  [ ] tenant/page.tsx still contains the broken import (expected — fixed in Step 8)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File deleted:     src/core/services/config.service.ts
  Other files:      NONE

  Expected TS error after this step:
    tenant/page.tsx — cannot find module '@/core/services/config.service'
    This will be resolved in Step 8.

  Guardrails violated: NONE
