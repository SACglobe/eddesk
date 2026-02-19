# EdDesk Workflow: Section Data Binding
# Safe antigravity workflow for connecting dummy data → template sections.

Steps MUST be followed in order.
ONE section per agent run. No exceptions.

---

## Pre-flight Check (MUST pass before ANY work begins)

- [ ] I have read guardrails.md
- [ ] I have read skills/section-data-binding.md
- [ ] I have read skills/local-dummy-data.md
- [ ] Templates are VIEW-ONLY — I will not open any template file for editing
- [ ] I am working on exactly ONE section: _______________
- [ ] I am working on exactly ONE template: _______________

If any check fails → STOP

---

## Phase 0: Scope Declaration

Agent states:
```
Section:          [section_key e.g. hero, faculty, events]
Template:         [template_id e.g. template_classic]
Allowed files:    [list explicitly — max 3 files]
Forbidden files:  all template JSX/CSS files
```

---

## Phase 1: Read Template Props (READ ONLY)

Open the template entry file for the target section.
Read ONLY — do not edit.

Document what props the template expects for this section:
```
Template prop name    Type        Notes
────────────────────────────────────────
e.g. heroSlides       array       [{mediaUrl, headline, ...}]
e.g. schoolName       string
```

STOP if the template file does not exist or cannot be read safely.

---

## Phase 2: Read ViewModel Output

Open `src/core/viewmodels/home.viewmodel.ts`.
Find the interface for this section (e.g. `HeroSectionProps`).

Document what the ViewModel currently outputs:
```
ViewModel key         Type        Notes
────────────────────────────────────────
```

---

## Phase 3: Check Alignment

Compare Phase 1 vs Phase 2.

For each template prop:
- [ ] Does a matching ViewModel key exist?
- [ ] Are the types compatible?
- [ ] Are nested shapes matching?

If YES → proceed to Phase 5 (no changes needed in ViewModel)
If NO → proceed to Phase 4

---

## Phase 4: Fix ViewModel (if needed)

If ViewModel output doesn't match template props:
→ Update `home.viewmodel.ts` or `hero.viewmodel.ts` to produce the correct key name/shape
→ Do NOT touch the template

Document change:
```
Changed file:     [viewmodel file]
Changed key:      [old name] → [new name]
Reason:           template expects [prop name]
```

STOP if the fix requires adding new data not in `tenant.data.js`
→ First add data to `tenant.data.js` following local-dummy-data.md skill

---

## Phase 5: Verify Dummy Data Covers the Section

Open `src/core/data/local/tenant.data.js`.
Check that the section's data key exists and has real values.

- [ ] Key exists in LOCAL_TENANT_DATA
- [ ] Key has at least 1–2 items with non-null meaningful values
- [ ] All field names match reference.js constants

If data is missing → add it to `tenant.data.js` (Phase 5a)
If field names don't match reference.js → fix reference.js first (Phase 5b)

---

## Phase 6: Verify Section is Enabled

In `tenant.data.js` → `sections[]`:
- [ ] Entry for this section_key exists
- [ ] `is_enabled: true`
- [ ] `display_order` is set to a reasonable value

If disabled → set `is_enabled: true` and document the change.

---

## Phase 7: Run Mental Dry-Run

Trace the data flow from end to end WITHOUT touching any file:

```
tenant.data.js[section_key data]
  ↓ getTenantData() [core/data/index.js]
  ↓ prepareHomePageProps(data) [home.viewmodel.ts]
  ↓ homePageProps.[sectionKey]
  ↓ <TemplateHome {...homePageProps} />
  ↓ template renders [section_key] section with real data
```

If any step breaks in the mental trace → fix that step before running code.

---

## Phase 8: Validate (no code needed)

- [ ] No template file was modified
- [ ] No template JSX was changed
- [ ] No CSS was modified
- [ ] Only ViewModel and/or tenant.data.js were touched (if anything)
- [ ] All field names reference reference.js constants

---

## Phase 9: Report

```
─────────────────────────────────────────────
Section Binding Report
─────────────────────────────────────────────
Section:          [section_key]
Template:         [template_id]

Files changed:
  - [file path] — [reason]

ViewModel output key:   [key name]
Template prop matched:  [prop name]
Dummy data key:         [tenant.data.js key]

Guardrails violated:    NONE
Template modified:      NO
─────────────────────────────────────────────
```

---

## Section Binding Sequence (recommended order)

Work through sections in this order for safest results:

| # | section_key      | Notes                                  |
|---|-----------------|----------------------------------------|
| 1 | hero             | Most visible — do first                |
| 2 | stats            | Simple key→value pairs                 |
| 3 | announcements    | Active filter + priority sort          |
| 4 | academic_results | Year sort, latest result               |
| 5 | principal        | Single person_type='principal'         |
| 6 | faculty          | Filtered by person_type='faculty'      |
| 7 | achievements     | Type filter (academic/sports/recognition)|
| 8 | facilities       | Category grouping                      |
| 9 | gallery          | Featured filter                        |
|10 | events           | Date sort                              |
|11 | admissions       | Step number sort                       |
|12 | identity         | Single record (vision/mission/motto)   |

---

## Anti-Pattern Reference Card

❌ Don't do this:
```tsx
// FORBIDDEN: logic inside template
const activeHero = heroData.filter(h => h.is_active);
```

✅ Do this instead:
```ts
// In hero.viewmodel.ts
const slides = heroMedia.filter(h => h.is_active).sort(...)
// Template just receives: slides={heroSectionProps.slides}
```

❌ Don't do this:
```tsx
// FORBIDDEN: data fetch inside template
const data = await supabase.from('hero_media').select()
```

✅ Do this instead:
```ts
// In getTenantData() → ViewModel → template receives props only
```

❌ Don't do this:
```tsx
// FORBIDDEN: rename template prop to match data
<HeroSection heroItems={props.slides} />
// by editing the template to use heroItems instead of slides
```

✅ Do this instead:
```ts
// In ViewModel: rename your output key to match what template expects
return { slides: [...] }  // matches template's expected prop
```
