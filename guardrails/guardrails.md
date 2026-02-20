# EdDesk Guardrails

All checks in this file MUST pass 100%.
If any single check fails, the task is INVALID.

---

## 0. Core Rule

- [ ] Templates are VIEW-ONLY
- [ ] No JSX inside templates was modified
- [ ] No CSS, fonts, spacing, layout, or animations were modified
- [ ] No visual adjustments (minor or major) were made

---

## 1. Template & Design Safety

### Forbidden (all must be FALSE)

- [ ] JSX inside any template was changed
- [ ] CSS files inside templates were changed
- [ ] Global styles were converted to CSS modules
- [ ] Class names were renamed or reorganized
- [ ] Template components were refactored or cleaned up
- [ ] Components were shared between templates
- [ ] Template components were moved to core/shared folders
- [ ] Logic or hooks were added inside templates

---

## 2. Logic Separation (MVVM)

### Templates (View)

- [ ] Templates only receive props
- [ ] Templates do NOT fetch data
- [ ] Templates do NOT contain business logic
- [ ] Templates do NOT handle routing
- [ ] Templates do NOT generate SEO
- [ ] Templates do NOT handle errors

### ViewModels

- [ ] All business logic lives in ViewModels
- [ ] Enable/disable logic handled in ViewModels
- [ ] Ordering logic handled in ViewModels
- [ ] Fallback logic handled in ViewModels
- [ ] Templates receive final, ready-to-render data

### Models

- [ ] Models are POJO/interfaces only
- [ ] Models do NOT fetch data
- [ ] Models contain no business logic

### Services

- [ ] All DB/API calls live in services
- [ ] Services contain no UI logic
- [ ] Errors are normalized in services

---

## 3. Data Access Rules

- [ ] No table names are hardcoded
- [ ] No column names are hardcoded
- [ ] All table/column names come from src/lib/constants/reference.js
- [ ] Templates do NOT import services
- [ ] Templates do NOT access the database directly

---

## 4. Routing & Domain Rules (SSR)

- [ ] Domain detection happens on the server
- [ ] No client-side domain detection is used
- [ ] Templates do NOT read hostname
- [ ] Routing logic does NOT exist in templates

### Domain Behavior

- [ ] localhost loads EdDesk marketing site
- [ ] eddesk.in loads EdDesk marketing site
- [ ] eddesk.in/demo/* loads demo templates
- [ ] All other domains load school tenant site

---

## 5. Template Selection

- [ ] Template selection comes only from schools.template_id
- [ ] Internal routing uses /demo/{template_id}
- [ ] Tenant domains render at root (/)
- [ ] Templates do NOT know which template they are

---

## 6. SEO Rules

- [ ] SEO is generated in ViewModels
- [ ] JSON-LD schema is generated outside templates
- [ ] Templates expose SEO placeholders only

### Forbidden

- [ ] Hardcoded SEO inside templates
- [ ] Client-side SEO generation
- [ ] Schema generation inside templates

---

## 7. Agent Execution Rules

- [ ] Agent declared scope before starting
- [ ] Agent listed allowed files explicitly
- [ ] Agent worked on only ONE template
- [ ] Agent did NOT expand scope
- [ ] Agent reported only changed files and reasons

---

## 8. Stop Conditions

Agent MUST stop if:

- [ ] Template design change is required
- [ ] Required data is missing and assumptions are needed
- [ ] Scope expansion is required
- [ ] A guardrail conflict exists

---

## 9. Final Acceptance

- [ ] All sections above pass 100%
- [ ] No violations exist
- [ ] Visual fidelity is preserved
- [ ] Architecture rules are respected
