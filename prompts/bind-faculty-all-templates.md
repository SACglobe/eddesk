# EdDesk — Bind Faculty Section → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded faculty/educators in all 3 templates with live
#   data from TenantViewModel.personnel[], gated by the sections array.
#
# DATA SOURCE:
#   data.personnel[]  — filter to ONLY faculty:
#     personType === 'faculty'          ← exclude principal and board
#     isFeatured === true               ← only featured faculty on homepage
#     sorted by displayOrder ascending
#
#   data.homepageSections[]  — gate entire section:
#     sectionKey === 'faculty' AND isEnabled === true → show section
#     isEnabled === false → hide entire faculty section, render nothing
#
#   section settings:
#     sectionKey === 'faculty' → settings.max_display
#     If max_display is set, slice faculty to that count
#     e.g. max_display: 8 → show at most 8 faculty cards
#
# FILTER LOGIC (identical in all 3 templates):
#   const facultySection = (data?.homepageSections ?? [])
#     .find(s => s.sectionKey === 'faculty');
#   const facultyEnabled = facultySection?.isEnabled ?? true;
#   const maxDisplay = facultySection?.settings?.max_display ?? 999;
#   const faculty = (data?.personnel ?? [])
#     .filter(p => p.personType === 'faculty' && p.isFeatured)
#     .sort((a, b) => a.displayOrder - b.displayOrder)
#     .slice(0, maxDisplay);
#   If facultyEnabled === false OR faculty is empty → render null
#
# DESIGNATION DISPLAY RULE:
#   The designation field is stored in mixed case: "Head of Sciences"
#   Templates display it in UPPERCASE (CSS class handles this OR toUpperCase)
#   Do NOT call .toUpperCase() in JS — let CSS uppercase class handle it.
#   The "principal" personType is excluded by the filter above.
#
# FIELDS USED:
#   p.name         → faculty member's full name
#   p.designation  → role/subject (displayed uppercase by CSS)
#   p.photoUrl     → profile photo
#   p.bio          → short biography (used in modern + premium only)
#
# IMAGE SAFETY (Skill 21 applies):
#   Faculty photos are portrait images of people.
#   Required: overflow-hidden on container, object-cover object-top on img.
#   Classic:  circular container w-48 h-48 rounded-full overflow-hidden ✅
#   Modern:   wrapper div missing overflow-hidden → MUST ADD
#   Premium:  aspect-[4/5] overflow-hidden ✅
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# Read: guardrails/skills/image-video-safety.md before touching any image.
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind faculty → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/image-video-safety.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_classic/index.tsx
  - src/templates/template_classic/screens/HomeScreen.js

Forbidden: mockData.js and all other files.

─────────────────────────────────────────────────────────────
PHASE 1 — What the faculty section currently does
─────────────────────────────────────────────────────────────
In HomeScreen.js:
  Reads: MOCK_DATA.FACULTY.teachers[]
  Item shape: { name, subject, photo }
  Renders: circular photo (w-48 h-48 rounded-full overflow-hidden) ✅
           teacher.name as heading
           teacher.subject as designation label (text-emerald-600)
  No bio shown in this template.
  Max display: not currently limited.

─────────────────────────────────────────────────────────────
PHASE 2 — Image safety check
─────────────────────────────────────────────────────────────
Current image container:
  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ...">
    <img className="w-full h-full object-cover transition-transform ...">
  </div>

Status:
  ✅ Container has overflow-hidden
  ✅ Container has fixed size (w-48 h-48)
  ✅ Image has object-cover
  ⚠️  Image missing object-top → add it (portrait photo, face must show)

Fix: add object-top to the img className.

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive faculty and pass to HomeScreen:

   const facultySection = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'faculty');
   const facultyEnabled = facultySection?.isEnabled ?? true;
   const maxDisplay = facultySection?.settings?.max_display ?? 999;
   const faculty = (data?.personnel ?? [])
     .filter(p => p.personType === 'faculty' && p.isFeatured)
     .sort((a, b) => a.displayOrder - b.displayOrder)
     .slice(0, maxDisplay);

   Pass to HomeScreen:
   Before: <HomeScreen data={data} ... />
   After:  <HomeScreen data={data} ... facultyEnabled={facultyEnabled} faculty={faculty} />

2. In HomeScreen.js — accept new props:
   Before: const HomeScreen = ({ data, statsEnabled, statistics, ... }) => {
   After:  const HomeScreen = ({ data, ..., facultyEnabled, faculty }) => {

3. Remove FACULTY from MOCK_DATA destructure (if now unused).
   Do NOT remove MOCK_DATA — other sections still use it.

4. Replace FACULTY.teachers.map with faculty.map:
   Before: {FACULTY.teachers.map((teacher, idx) => (
   After:  {faculty.map((teacher, idx) => (

5. Replace field mapping:
   Before: src={teacher.photo}
   After:  src={teacher.photoUrl ?? ''}

   Before: alt={teacher.name}
   After:  alt={teacher.name ?? ''}

   Before: {teacher.name}
   After:  {teacher.name ?? ''}

   Before: {teacher.subject}
   After:  {teacher.designation ?? ''}
   Note: CSS already renders this uppercase via tracking-[0.2em] text-emerald-600
         Do NOT call .toUpperCase() in JS — the CSS class uppercase or the
         existing styling handles the visual appearance.

6. Add object-top to image (image safety fix):
   Before: className="w-full h-full object-cover transition-transform ..."
   After:  className="w-full h-full object-cover object-top transition-transform ..."

7. Gate the entire faculty section:
   Before: <section className="py-24 bg-white">
   After:  {facultyEnabled && faculty.length > 0 && (
             <section className="py-24 bg-white">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The circular image container and ring decoration
  - The hover scale and border-emerald-500 effect
  - The h-[1px] divider line between name and designation
  - The "Meet Entire Faculty" button and link
  - All CSS classes except adding object-top

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] FACULTY removed from MOCK_DATA destructure
  - [ ] faculty prop accepted by HomeScreen
  - [ ] Filter: personType === 'faculty' AND isFeatured === true
  - [ ] Sorted by displayOrder
  - [ ] Sliced to maxDisplay (from settings.max_display)
  - [ ] facultyEnabled gates entire section
  - [ ] teacher.photoUrl used for src (not teacher.photo)
  - [ ] teacher.designation used (not teacher.subject)
  - [ ] object-top added to img className
  - [ ] No bio rendered (classic doesn't show bio — correct)
  - [ ] All other CSS classes unchanged
  - [ ] No other section of HomeScreen.js changed

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Faculty Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       derives faculty, passes to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  reads from faculty prop

MOCK_DATA.FACULTY removed:      YES
Data source:                    data.personnel[] filtered to faculty + isFeatured
Section gate (isEnabled):       YES — sectionKey 'faculty'
max_display respected:          YES — sliced to settings.max_display
Filters:                        personType === 'faculty', isFeatured === true
Sorted by displayOrder:         YES
Field: teacher.photo → photoUrl: YES
Field: teacher.subject → designation: YES
Image safety (object-top):      ADDED
Bio shown:                      NO (classic design has no bio)
CSS changed:                    object-top added to img only
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind faculty → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/image-video-safety.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_modern/index.tsx
  - src/templates/template_modern/app/page.tsx

─────────────────────────────────────────────────────────────
PHASE 1 — What the faculty section currently does
─────────────────────────────────────────────────────────────
In page.tsx:
  Hardcoded const facultyMembers = [...] at file top (lines 15-34)
  Item shape: { name, position, image, bio }
  Renders: portrait image aspect-[4/5] object-cover rounded-[2.5rem]
           member.name as heading
           member.position as designation (text-yellow-600 uppercase)
           member.bio as paragraph
  Image wrapper: "relative inline-block mb-8" — MISSING overflow-hidden ⚠️

─────────────────────────────────────────────────────────────
PHASE 2 — Image safety fix (REQUIRED before data binding)
─────────────────────────────────────────────────────────────
Current image wrapper:
  <div className="relative inline-block mb-8">
    <div className="absolute inset-0 bg-primary rounded-[2.5rem] rotate-6 ..."></div>
    <img className="relative w-full aspect-[4/5] object-cover rounded-[2.5rem] ...">
  </div>

Problems:
  ⚠️  Outer wrapper "relative inline-block mb-8" has NO overflow-hidden
      → landscape image will overflow the rounded corners
  ⚠️  Image missing object-top → face may be cropped with landscape uploads

Fixes:
  1. Add overflow-hidden rounded-[2.5rem] to outer wrapper:
     Before: <div className="relative inline-block mb-8">
     After:  <div className="relative inline-block mb-8 overflow-hidden rounded-[2.5rem]">
     Note: rounded-[2.5rem] must match image's border-radius so clip is clean.

  2. Add object-top to img:
     Before: className="relative w-full aspect-[4/5] object-cover rounded-[2.5rem] ..."
     After:  className="relative w-full aspect-[4/5] object-cover object-top rounded-[2.5rem] ..."

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. Verify data prop is passed to Home from index.tsx.

2. Remove hardcoded facultyMembers array from page.tsx (lines ~15-34).

3. Derive faculty at top of Home component:
   const facultySection = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'faculty');
   const facultyEnabled = facultySection?.isEnabled ?? true;
   const maxDisplay = facultySection?.settings?.max_display ?? 999;
   const faculty = (data?.personnel ?? [])
     .filter(p => p.personType === 'faculty' && p.isFeatured)
     .sort((a, b) => a.displayOrder - b.displayOrder)
     .slice(0, maxDisplay);

4. Replace facultyMembers.map with faculty.map:
   Before: {facultyMembers.map((member, i) => (
   After:  {faculty.map((member, i) => (

5. Replace field mapping:
   Before: src={member.image}
   After:  src={member.photoUrl ?? ''}

   Before: {member.name}
   After:  {member.name ?? ''}

   Before: {member.position}
   After:  {member.designation ?? ''}
   Note: CSS class "uppercase tracking-widest" already handles display.
         Do NOT call .toUpperCase() in JS.

   Before: {member.bio}
   After:  {member.bio ?? ''}

6. Apply image safety fixes from Phase 2.

7. Gate the entire faculty section:
   Before: <section className="max-w-7xl mx-auto px-4 py-24">
   After:  {facultyEnabled && faculty.length > 0 && (
             <section className="max-w-7xl mx-auto px-4 py-24">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The rotating blue background div (design element — keep as-is)
  - The grayscale → color hover effect
  - The "Meet Entire Faculty" button and link
  - All CSS classes except the two image safety additions

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hardcoded facultyMembers array removed from file top
  - [ ] faculty derived from data.personnel inside Home component
  - [ ] Filter: personType === 'faculty' AND isFeatured === true
  - [ ] Sorted by displayOrder
  - [ ] Sliced to maxDisplay
  - [ ] facultyEnabled gates entire section
  - [ ] member.photoUrl used for src
  - [ ] member.designation used (not member.position)
  - [ ] member.bio used
  - [ ] overflow-hidden rounded-[2.5rem] added to outer wrapper
  - [ ] object-top added to img
  - [ ] Rotating bg-primary div preserved
  - [ ] All other CSS classes unchanged
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Faculty Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  reads from data.personnel

Hardcoded facultyMembers removed:  YES
Data source:                       data.personnel[] filtered to faculty + isFeatured
Section gate (isEnabled):          YES — sectionKey 'faculty'
max_display respected:             YES
Filters:                           personType === 'faculty', isFeatured === true
Sorted by displayOrder:            YES
Image safety overflow-hidden:      ADDED to wrapper
Image safety object-top:           ADDED to img
Bio shown:                         YES
CSS changed:                       overflow-hidden + rounded + object-top only
Guardrails violated:               NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind faculty → template_premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  guardrails/skills/image-video-safety.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_premium/index.tsx
  - src/templates/template_premium/app/page.tsx

Forbidden: data.ts, Shared.tsx, Navigation.tsx.

─────────────────────────────────────────────────────────────
PHASE 1 — What the faculty section currently does
─────────────────────────────────────────────────────────────
In page.tsx, FacultyHighlights component:
  Hardcoded const educators = [...] inside the component
  Item shape: { name, role, image, bio }
  Renders: portrait image aspect-[4/5] overflow-hidden ✅
           edu.role as designation (text-signature-gold uppercase)
           edu.name as heading (font-serif)
           edu.bio as paragraph
  Component currently accepts NO props.

─────────────────────────────────────────────────────────────
PHASE 2 — Image safety check
─────────────────────────────────────────────────────────────
Current image container:
  <div className="relative aspect-[4/5] overflow-hidden mb-8">
    <img src={edu.image} className="w-full h-full object-cover grayscale ...">
  </div>

Status:
  ✅ Container has overflow-hidden
  ✅ Container has aspect-[4/5]
  ✅ Image has object-cover
  ⚠️  Image missing object-top → add it (portrait photo of person)

Fix: add object-top to img className.

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. Verify data prop is passed to Home from index.tsx.

2. FacultyHighlights must receive faculty and facultyEnabled as props:
   Before: const FacultyHighlights: React.FC = () => {
   After:
     interface FacultyMember {
       name: string; designation: string; photoUrl: string;
       bio: string; displayOrder: number; isFeatured: boolean;
     }
     interface FacultyHighlightsProps {
       faculty: FacultyMember[];
       facultyEnabled: boolean;
     }
     const FacultyHighlights: React.FC<FacultyHighlightsProps> = ({ faculty, facultyEnabled }) => {

3. Inside FacultyHighlights:
   - Remove the hardcoded const educators = [...] array entirely
   - Add gate at top: if (!facultyEnabled || faculty.length === 0) return null;

4. In Home component, derive faculty before JSX return:
   const facultySection = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'faculty');
   const facultyEnabled = facultySection?.isEnabled ?? true;
   const maxDisplay = facultySection?.settings?.max_display ?? 999;
   const faculty = (data?.personnel ?? [])
     .filter(p => p.personType === 'faculty' && p.isFeatured)
     .sort((a, b) => a.displayOrder - b.displayOrder)
     .slice(0, maxDisplay);

5. Pass to FacultyHighlights in Home JSX:
   Before: <FacultyHighlights />
   After:  <FacultyHighlights faculty={faculty} facultyEnabled={facultyEnabled} />

6. Replace educators.map with faculty.map inside FacultyHighlights:
   Before: {educators.map((edu, i) => (
   After:  {faculty.map((edu, i) => (

7. Replace field mapping:
   Before: src={edu.image}
   After:  src={edu.photoUrl ?? ''}

   Before: alt={edu.name}
   After:  alt={edu.name ?? ''}

   Before: {edu.role}
   After:  {edu.designation ?? ''}
   Note: CSS "uppercase tracking-[0.4em]" handles display case.
         Do NOT call .toUpperCase() in JS.

   Before: {edu.name}
   After:  {edu.name ?? ''}

   Before: {edu.bio}
   After:  {edu.bio ?? ''}

8. Add object-top to img (image safety):
   Before: className="w-full h-full object-cover grayscale ..."
   After:  className="w-full h-full object-cover object-top grayscale ..."

WHAT DOES NOT CHANGE:
  - The isVisible intersection observer animation
  - The gold corner decoration (absolute top-0 right-0 border lines)
  - The grayscale → color hover effect
  - The animated underline (w-8 h-px group-hover:w-16)
  - The "Meet Entire Faculty" button
  - All CSS classes except adding object-top

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hardcoded educators[] array removed from FacultyHighlights
  - [ ] FacultyHighlights accepts faculty and facultyEnabled props
  - [ ] Home derives faculty from data.personnel
  - [ ] Filter: personType === 'faculty' AND isFeatured === true
  - [ ] Sorted by displayOrder
  - [ ] Sliced to maxDisplay (from settings.max_display)
  - [ ] Gate: returns null if facultyEnabled === false OR faculty empty
  - [ ] edu.photoUrl used for src
  - [ ] edu.designation used (not edu.role)
  - [ ] edu.name used
  - [ ] edu.bio used
  - [ ] object-top added to img
  - [ ] overflow-hidden on container preserved ✅
  - [ ] isVisible animation preserved
  - [ ] Gold corner decoration preserved
  - [ ] All other CSS classes unchanged
  - [ ] No other section of page.tsx changed
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Faculty Binding Report — template_premium

Files changed:
  src/templates/template_premium/index.tsx      passes data to Home
  src/templates/template_premium/app/page.tsx   FacultyHighlights reads from props

Hardcoded educators[] removed:   YES
Data source:                     data.personnel[] filtered to faculty + isFeatured
Section gate (isEnabled):        YES — sectionKey 'faculty'
max_display respected:           YES — sliced to settings.max_display
Filters:                         personType === 'faculty', isFeatured === true
Sorted by displayOrder:          YES
Image safety object-top:         ADDED
Image container overflow-hidden: already present ✅
Bio shown:                       YES
CSS changed:                     object-top added to img only
Guardrails violated:             NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
