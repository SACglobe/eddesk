# EdDesk — Bind Principal Section → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded principal name, bio, and image in all 3 templates
#   with data from TenantViewModel.personnel[]
#
# PREREQUISITE: unify-data-shape.md must be completed first.
#
# DATA SOURCE:
#   data.personnel[] — find the principal with:
#     person_type === 'principal'
#   Fields used:
#     name       → principal's name
#     bio        → principal's message / quote
#     photoUrl   → principal's photo
#     designation → principal's title (e.g. "Principal")
#
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind principal → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_classic/index.tsx       (if data not yet passed)
  - src/templates/template_classic/screens/HomeScreen.js

─────────────────────────────────────────────────────────────
PHASE 1 — What the principal section currently uses
─────────────────────────────────────────────────────────────
In HomeScreen.js, the principal section reads from MOCK_DATA.LEADERSHIP:

  LEADERSHIP.principal_image   → <img src={...}>
  LEADERSHIP.principal_name    → name display + alt text
  LEADERSHIP.principal_message → quoted bio text

These are hardcoded in constants/mockData.js inside the template.

─────────────────────────────────────────────────────────────
PHASE 2 — Data available in TenantViewModel
─────────────────────────────────────────────────────────────
  const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

  principal.name        → replaces LEADERSHIP.principal_name
  principal.bio         → replaces LEADERSHIP.principal_message
  principal.photoUrl    → replaces LEADERSHIP.principal_image
  principal.designation → replaces hardcoded "Principal & Chief Administrator"

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. Confirm data prop is already passed to HomeScreen from index.tsx.
   If not: pass it now — <HomeScreen data={data} />

2. In HomeScreen.js, derive principal at top of component:
   const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

3. Replace LEADERSHIP reads in the principal section:

   Before: src={LEADERSHIP.principal_image}
   After:  src={principal?.photoUrl ?? ''}

   Before: alt={LEADERSHIP.principal_name}
   After:  alt={principal?.name ?? 'Principal'}

   Before: "{LEADERSHIP.principal_message}"
   After:  "{principal?.bio ?? ''}"

   Before: {LEADERSHIP.principal_name}
   After:  {principal?.name ?? ''}

   Before: hardcoded "Principal & Chief Administrator"
   After:  {principal?.designation ?? 'Principal'}

4. If LEADERSHIP is now unused in HomeScreen.js, remove it from
   the destructure at the top: remove LEADERSHIP from the MOCK_DATA line.
   Do NOT remove MOCK_DATA entirely — other sections still use it.

WHAT DOES NOT CHANGE:
  - The section JSX structure and layout
  - All CSS classes
  - The decorative overlay card on the image
  - The "Read Full Address →" link

─────────────────────────────────────────────────────────────
PHASE 4 — Fallback rule
─────────────────────────────────────────────────────────────
If principal is null (no personnel with personType === 'principal'):
  - All ?? fallbacks activate
  - Photo src = '' → broken image, acceptable
  - Name = '' → empty string shown
  - Bio = '' → empty quote shown
  Do NOT crash.

─────────────────────────────────────────────────────────────
PHASE 5 — Validate
─────────────────────────────────────────────────────────────
  - [ ] LEADERSHIP.principal_image replaced with principal?.photoUrl
  - [ ] LEADERSHIP.principal_name replaced with principal?.name
  - [ ] LEADERSHIP.principal_message replaced with principal?.bio
  - [ ] principal?.designation used for title label
  - [ ] principal derived from data.personnel.find(personType === 'principal')
  - [ ] LEADERSHIP removed from MOCK_DATA destructure (if unused)
  - [ ] No CSS changes
  - [ ] No other section of HomeScreen.js changed

─────────────────────────────────────────────────────────────
PHASE 6 — Report
─────────────────────────────────────────────────────────────
```
Principal Binding Report — template_classic

Files changed:
  src/templates/template_classic/screens/HomeScreen.js

LEADERSHIP.principal_image replaced:   YES → principal?.photoUrl
LEADERSHIP.principal_name replaced:    YES → principal?.name
LEADERSHIP.principal_message replaced: YES → principal?.bio
Designation from data:                 YES → principal?.designation
Fallbacks:                             YES
CSS changed:                           NO
Other sections affected:               NONE
Guardrails violated:                   NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind principal → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_modern/index.tsx        (if data not yet passed)
  - src/templates/template_modern/app/page.tsx

─────────────────────────────────────────────────────────────
PHASE 1 — What the principal section currently uses
─────────────────────────────────────────────────────────────
In app/page.tsx, the principal section has:

  <img src="school/image/principal.png" ... />   ← hardcoded image path
  <p>Priya</p>                                   ← hardcoded name
  <p>Principal, EdDesk</p>                       ← hardcoded title

No bio/message is currently shown in this template's principal section.
The section does show a hardcoded inspirational quote in the image overlay:
  "Nurturing seeds of potential into forests of greatness."
This quote is separate from the principal — do NOT replace it with bio.

─────────────────────────────────────────────────────────────
PHASE 2 — Data available in TenantViewModel
─────────────────────────────────────────────────────────────
  const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

  principal.name        → replaces hardcoded "Priya"
  principal.photoUrl    → replaces "school/image/principal.png"
  principal.designation → replaces hardcoded "Principal, EdDesk"

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. Confirm data prop is passed to the Home page component from index.tsx.
   The hero binding should have done this already — verify before proceeding.
   If not: add data prop to Home component.

2. Derive principal inside Home component (after heroSlide derivation):
   const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

3. Replace hardcoded values in the principal section:

   Before: src="school/image/principal.png"
   After:  src={principal?.photoUrl ?? 'school/image/principal.png'}

   Before: <p className="...">Priya</p>
   After:  <p className="...">{principal?.name ?? ''}</p>

   Before: <p className="...">Principal, EdDesk</p>
   After:  <p className="...">{principal?.designation ?? 'Principal'}</p>

   The inspirational quote overlay ("Nurturing seeds of potential..."):
   KEEP AS IS — this is template design copy, not school data.

   The intro paragraph mentioning {SCHOOL_NAME}:
   KEEP AS IS — handled separately in school name binding.

WHAT DOES NOT CHANGE:
  - The section JSX structure and layout
  - All CSS classes
  - The decorative image overlay with the inspirational quote
  - The "Read More" link to /about

─────────────────────────────────────────────────────────────
PHASE 4 — Fallback rule
─────────────────────────────────────────────────────────────
If principal is null:
  - photoUrl fallback → 'school/image/principal.png' (keeps original)
  - name fallback → '' (empty)
  - designation fallback → 'Principal'
  Do NOT crash.

─────────────────────────────────────────────────────────────
PHASE 5 — Validate
─────────────────────────────────────────────────────────────
  - [ ] "school/image/principal.png" replaced with principal?.photoUrl
  - [ ] Hardcoded "Priya" replaced with principal?.name
  - [ ] Hardcoded "Principal, EdDesk" replaced with principal?.designation
  - [ ] Inspirational quote overlay NOT changed
  - [ ] No CSS changes
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 6 — Report
─────────────────────────────────────────────────────────────
```
Principal Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx

Hardcoded image replaced:       YES → principal?.photoUrl
Hardcoded "Priya" replaced:     YES → principal?.name
Hardcoded title replaced:       YES → principal?.designation
Inspirational quote preserved:  YES (template design copy)
Fallbacks:                      YES
CSS changed:                    NO
Other sections affected:        NONE
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind principal → template_premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_premium/index.tsx       (if data not yet passed)
  - src/templates/template_premium/app/page.tsx

Forbidden: Do NOT touch data.ts, components/Shared.tsx, Navigation.tsx.

─────────────────────────────────────────────────────────────
PHASE 1 — What the principal section currently uses
─────────────────────────────────────────────────────────────
In app/page.tsx, the principal section reads from schoolData:

  schoolData.principalMessage.text   → quoted bio paragraph
  schoolData.principalMessage.image  → circular photo
  schoolData.principalMessage.name   → name below photo

The section next to it shows a board message panel:
  schoolData.boardMessage.title      → section heading
  schoolData.boardMessage.text       → body paragraph

The board message has NO direct equivalent in TenantViewModel personnel[].
Handle it as follows:
  - boardMessage.title → keep as hardcoded template copy ("The Legacy of Excellence")
  - boardMessage.text  → keep as hardcoded template copy
  These are template design elements, not school data.

─────────────────────────────────────────────────────────────
PHASE 2 — Data available in TenantViewModel
─────────────────────────────────────────────────────────────
  const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

  principal.bio         → replaces schoolData.principalMessage.text
  principal.photoUrl    → replaces schoolData.principalMessage.image
  principal.name        → replaces schoolData.principalMessage.name

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. Confirm data prop is passed to Home component from index.tsx.
   The hero binding should have done this already — verify before proceeding.
   If not: add data prop to Home component.

2. Derive principal inside Home component (after heroSlide derivation):
   const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

3. Replace schoolData.principalMessage reads only:

   Before: "{schoolData.principalMessage.text}"
   After:  "{principal?.bio ?? ''}"

   Before: src={schoolData.principalMessage.image}
   After:  src={principal?.photoUrl ?? ''}

   Before: {schoolData.principalMessage.name}
   After:  {principal?.name ?? ''}

4. The board message panel — keep as template copy:

   Before: <SectionHeader title={schoolData.boardMessage.title} .../>
   After:  <SectionHeader title="The Legacy of Excellence" .../>

   Before: {schoolData.boardMessage.text}
   After:  keep the hardcoded string value that was in schoolData.boardMessage.text
           (copy it directly from data.ts before removing the import)

5. Check if schoolData is still used elsewhere in page.tsx after these changes.
   Find remaining schoolData references: events, highlights.
   Do NOT remove schoolData import yet — those sections are bound separately.
   Only replace the principalMessage and boardMessage references.

WHAT DOES NOT CHANGE:
  - Section layout, grid structure
  - All CSS classes and Tailwind utilities
  - The board message panel visual design
  - The "Governance Archive" button and link

─────────────────────────────────────────────────────────────
PHASE 4 — Fallback rule
─────────────────────────────────────────────────────────────
If principal is null:
  - bio fallback → '' (empty quote)
  - photoUrl fallback → '' (broken image, acceptable)
  - name fallback → ''
  Do NOT crash.

─────────────────────────────────────────────────────────────
PHASE 5 — Validate
─────────────────────────────────────────────────────────────
  - [ ] schoolData.principalMessage.text replaced with principal?.bio
  - [ ] schoolData.principalMessage.image replaced with principal?.photoUrl
  - [ ] schoolData.principalMessage.name replaced with principal?.name
  - [ ] boardMessage.title replaced with hardcoded template copy string
  - [ ] boardMessage.text replaced with hardcoded template copy string
  - [ ] schoolData import NOT removed (events/highlights still reference it)
  - [ ] No CSS changes
  - [ ] No other section of page.tsx changed
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 6 — Report
─────────────────────────────────────────────────────────────
```
Principal Binding Report — template_premium

Files changed:
  src/templates/template_premium/app/page.tsx

principalMessage.text replaced:   YES → principal?.bio
principalMessage.image replaced:  YES → principal?.photoUrl
principalMessage.name replaced:   YES → principal?.name
boardMessage handled:             YES → hardcoded template copy
schoolData import removed:        NO (still used by events/highlights)
Fallbacks:                        YES
CSS changed:                      NO
Other sections affected:          NONE
Guardrails violated:              NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
