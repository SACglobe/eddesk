---
name: section-data-binding
description: >
  Safely wire ViewModel output into template sections via props only.
  No template JSX or CSS is touched. Ever.
scope: viewmodel → template boundary
version: 1.0
---

# Skill: Section Data Binding

## Purpose
Map ViewModel-prepared data into a template's expected prop shape —
one section at a time — without modifying any template file.

---

## Guardrail Acknowledgement
Before starting, agent MUST confirm:
- [ ] guardrails.md has been read
- [ ] Templates are VIEW-ONLY — no JSX, no CSS changes
- [ ] Only ONE section is in scope per execution

---

## Execution Steps (follow in order)

### Step 1 — Declare Scope
State explicitly:
- Which section: e.g. `hero`, `faculty`, `events`
- Which template: e.g. `template_classic`
- Which files are allowed: ViewModel file + page.tsx only

### Step 2 — Read Template Props Contract
Open the template's entry file (e.g. `template_classic/index.tsx`).
Read ONLY what props it accepts. Do NOT modify anything.
Write down the prop names expected by the template.

### Step 3 — Check ViewModel Output
Open `home.viewmodel.ts`.
Find the section's output interface (e.g. `HeroSectionProps`).
Compare template prop names vs ViewModel output names.

### Step 4 — Resolve Mismatch (ViewModel only)
If template prop name ≠ ViewModel output name:
→ Update the ViewModel output key to match the template.
→ NEVER rename props inside the template.
→ NEVER add aliases inside the template.

### Step 5 — Pass Props in page.tsx
In `src/app/tenant/[[...path]]/page.tsx` (or demo equivalent):
Pass the ViewModel output to the template like:
```tsx
<TemplateHome {...homePageProps} />
```
No conditional logic here. No data shaping here.
All shaping is done in the ViewModel.

### Step 6 — Validate
- [ ] No template file was opened for editing
- [ ] No template prop was renamed
- [ ] No template CSS was touched
- [ ] ViewModel output matches template prop names
- [ ] Section renders with live dummy data

---

## Stop Conditions
Agent MUST stop if:
- Template requires a prop that doesn't exist in the DB/dummy data
  → Document the gap, stop, do NOT assume or hardcode
- Template prop shape is deeply nested and unclear
  → Ask for clarification, do NOT guess
- Section requires logic inside the template
  → Guardrail violation — STOP

---

## Output Report (required)
After each section binding task:
```
Section: [section_key]
Template: [template_id]
Files changed: [list]
ViewModel key used: [key]
Template prop matched: [prop name]
Guardrails violated: NONE
```

---

## Anti-Patterns (forbidden)
❌ Adding `if` statements inside template JSX
❌ Passing raw DB data directly to template
❌ Calling `getTenantData()` inside a template
❌ Renaming template CSS classes to match data
❌ Adding `useEffect` or `useState` to templates
