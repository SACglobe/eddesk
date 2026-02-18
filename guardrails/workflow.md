# EdDesk Workflow Definition

This file defines the ONLY valid execution workflow for agents.
Steps MUST be followed in order.
Skipping, reordering, or expanding steps is NOT allowed.

All checks must pass 100%.

---

## Phase 0: Pre-Execution Validation

- [ ] Task objective is clearly stated
- [ ] Task matches exactly ONE skill from skills.md
- [ ] Guardrails.md has been read and acknowledged
- [ ] Scope is explicitly declared
- [ ] Allowed files are explicitly listed
- [ ] Only ONE template (or NONE) is in scope

If any item fails → STOP

---

## Phase 1: Routing & Context Resolution (SSR)

- [ ] Read hostname from server request
- [ ] Determine routing mode:
  - [ ] marketing
  - [ ] demo
  - [ ] tenant
- [ ] No client-side domain logic used
- [ ] No template involved at this stage

If routing cannot be determined → STOP

---

## Phase 2: Tenant Resolution (Tenant Mode Only)

- [ ] Fetch school record using domain
- [ ] Use DB constants for table and column names
- [ ] No hardcoded schema values
- [ ] Handle school-not-found case
- [ ] Do NOT render templates yet

If school data is missing → render system fallback page

---

## Phase 3: Template Selection

- [ ] Read template_id from school record
- [ ] Validate template_id exists in registry
- [ ] Do NOT infer or guess template
- [ ] Do NOT modify template selection logic

If template_id is invalid → STOP

---

## Phase 4: Data Fetching (Services Only)

- [ ] Fetch data via service layer only
- [ ] No direct DB access outside services
- [ ] Fetch only required data
- [ ] Handle service-level errors
- [ ] Return raw or lightly mapped data

If required data cannot be fetched → STOP

---

## Phase 5: ViewModel Preparation

- [ ] Aggregate all fetched data
- [ ] Apply enable/disable rules
- [ ] Apply ordering rules
- [ ] Prepare fallback values
- [ ] Produce template-ready props
- [ ] Produce SEO-ready metadata

Templates must NOT be involved here

---

## Phase 6: SEO Generation

- [ ] Generate meta title and description
- [ ] Generate Open Graph metadata
- [ ] Generate JSON-LD schemas
- [ ] SEO data derived ONLY from ViewModel output
- [ ] No hardcoded SEO in templates

---

## Phase 7: Template Mounting (View Only)

- [ ] Dynamically import template entry point
- [ ] Pass prepared props to template
- [ ] Render template via SSR
- [ ] Preserve 100% visual fidelity
- [ ] No JSX or CSS modifications

If visual changes are required → STOP

---

## Phase 8: Error Handling & Fallbacks

- [ ] Handle system errors outside templates
- [ ] Render fallback pages when required
- [ ] Log errors server-side
- [ ] Do NOT inject error logic into templates

---

## Phase 9: Post-Execution Validation

- [ ] Guardrails checklist passes 100%
- [ ] Skills checklist passes 100%
- [ ] No forbidden files were modified
- [ ] No scope expansion occurred
- [ ] Output matches task objective exactly

If any check fails → task is INVALID

---

## Phase 10: Reporting

- [ ] List files modified
- [ ] Explain why each file was modified
- [ ] Confirm no guardrails were violated
- [ ] Confirm workflow completion

No additional commentary is allowed.

---

## Final Acceptance

- [ ] All phases completed in order
- [ ] No steps skipped
- [ ] No guardrails violated
- [ ] No design changes made

Only if ALL checks pass is the task ACCEPTED.
