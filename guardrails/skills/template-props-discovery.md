---
name: template-props-discovery
skill: 16
description: >
  Read existing templates and extract their prop contracts into
  guardrails/template-props/[template_id].md files.
  READ ONLY — no template files are ever modified.
scope: guardrails/template-props/
version: 1.0
---

# Skill 16: Template Props Discovery

## Purpose
Create a permanent, readable prop contract for each template
so future agents never need to open template files directly.

Run once per template. Re-run only when a template is updated.

---

## Allowed Responsibilities

- [ ] Read template entry files (READ ONLY)
- [ ] Extract top-level prop interface
- [ ] Map section_key → prop name for each section
- [ ] Write output to guardrails/template-props/ only
- [ ] Note sections that are absent from the template

## Forbidden

- [ ] Modifying any template file
- [ ] Renaming any template prop
- [ ] Refactoring template code
- [ ] Writing anywhere except guardrails/template-props/
- [ ] Making assumptions — document uncertainty explicitly

---

## Output Location

```
guardrails/template-props/
  template_classic.md
  template_modern.md
  template_premium.md
```

One file per template. Overwrite if re-running after a template update.

---

## Output Format (required exactly)

```md
# Template Props Contract: [template_id]
# Source: src/templates/[template_id]/[entry file]
# Generated: [date]
# Re-run this skill if the template is updated.

## Top-Level Props Interface
[paste actual TypeScript interface from the template]

## Section Prop Map

| section_key      | Prop name in template | Type        | Required | Notes |
|------------------|-----------------------|-------------|----------|-------|
| hero             |                       |             |          |       |
| announcements    |                       |             |          |       |
| stats            |                       |             |          |       |
| academic_results |                       |             |          |       |
| achievements     |                       |             |          |       |
| principal        |                       |             |          |       |
| faculty          |                       |             |          |       |
| facilities       |                       |             |          |       |
| gallery          |                       |             |          |       |
| events           |                       |             |          |       |
| admissions       |                       |             |          |       |
| identity         |                       |             |          |       |

## Inner Page Components (if present)

| page       | Component name | Entry file | Props interface |
|------------|---------------|------------|-----------------|
| about      |               |            |                 |
| admissions |               |            |                 |
| contact    |               |            |                 |
| gallery    |               |            |                 |
| events     |               |            |                 |

## Sections Not Present in This Template
- [section_key] — [reason: not implemented / planned / out of scope]

## Uncertainty Log
List anything that was unclear during reading:
- [prop name] — unclear type, assumed [x]
- [section] — could not find component, marked as absent
```

---

## Multiple Schools Consideration

The prop contract is the SAME for all schools using this template.
Different schools get different data — but the same prop names.
Do NOT create per-school prop contracts. One file per template only.

---

## When to Re-run This Skill

- A new section is added to the template
- A prop name is changed in the template (by the template author)
- A new inner page component is added to the template

After re-running: check if any ViewModel output keys need updating
to match the new prop names. Use the section binding workflow.

---

## Stop Conditions

- If the template entry file cannot be found → report file path, STOP
- If a prop type is deeply nested and ambiguous → log in Uncertainty Log, do not guess
- If a section exists in the template but uses a prop name that conflicts
  with reference.js field names → log it, do not resolve automatically
