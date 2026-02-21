# EdDesk — Bind Achievements (Sports) Section → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded sports achievements in all 3 templates with live
#   data from TenantViewModel.achievements[], filtered to sports only,
#   gated by the sections array.
#
# DATA SOURCE:
#   data.achievements[]  — filter to sports only:
#     achievementType === 'sports'      ← only sports achievements shown here
#     sorted by displayOrder ascending
#
#   data.homepageSections[]  — gate entire section:
#     sectionKey === 'achievements' AND isEnabled → show section
#     isEnabled === false → hide entire section, render nothing
#
# FILTER LOGIC (identical in all 3 templates):
#   const achievementsEnabled = (data?.homepageSections ?? [])
#     .find(s => s.sectionKey === 'achievements')
#     ?.isEnabled ?? true;
#   const sportsAchievements = (data?.achievements ?? [])
#     .filter(a => a.achievementType === 'sports')
#     .sort((a, b) => a.displayOrder - b.displayOrder);
#   If achievementsEnabled === false OR sportsAchievements empty → render null
#
# NOTE ON achievement_type CASING:
#   The DB stores it as lowercase: 'sports', 'academic', 'recognition'
#   TenantViewModel maps it as: achievementType (camelCase)
#   Filter comparison: a.achievementType === 'sports'   ← lowercase, no .toLowerCase() needed
#   Display (category label): let CSS uppercase class handle display case
#   Do NOT call .toUpperCase() on achievementType in JS
#
# FIELDS USED:
#   a.year             → year badge on card
#   a.category         → sport/category label (e.g. "Football", "Swimming")
#   a.title            → achievement title
#   a.description      → achievement description
#   a.photoUrl         → achievement image (may be empty string or null)
#
# IMAGE HANDLING — CRITICAL (Skill 21 applies):
#   photoUrl may be empty string '' or null for some achievements.
#   When photoUrl is empty/null → show TROPHY PLACEHOLDER instead of broken img.
#
#   Trophy placeholder SVG (use inline, no external deps):
#     <div className="w-full h-full flex items-center justify-center bg-[color]">
#       <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-30"
#            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
#         <path strokeLinecap="round" strokeLinejoin="round"
#           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
#         <path strokeLinecap="round" strokeLinejoin="round"
#           d="M8 21h8m-4-4v4M7 7H4a2 2 0 00-2 2v1a4 4 0 004 4h.5M17 7h3
#              a2 2 0 012 2v1a4 4 0 01-4 4h-.5M7 7V5a5 5 0 0110 0v2M7 7h10" />
#       </svg>
#     </div>
#
#   Pattern for conditional render:
#     {a.photoUrl ? (
#       <img src={a.photoUrl} alt={a.title} className="w-full h-full object-cover ..." />
#     ) : (
#       <div className="w-full h-full flex items-center justify-center bg-[placeholder-color]">
#         <svg ...trophy icon... />
#       </div>
#     )}
#
#   Placeholder bg color per template:
#     Classic:  bg-emerald-50  (light green, matches template palette)
#     Modern:   bg-blue-950/30 (dark blue, matches card gradient palette)
#     Premium:  bg-signature-ivory (matches template bg color)
#
# IMAGE CONTAINER SAFETY (Skill 21 applies):
#   Classic:  h-60 overflow-hidden → already present ✅
#   Modern:   aspect-[16/10] overflow-hidden → already present ✅
#   Premium:  aspect-[4/5] overflow-hidden → already present ✅
#   Add object-cover object-center to all imgs (landscape action photos)
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# Read: guardrails/skills/image-video-safety.md before touching any image.
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind achievements → template_classic
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
PHASE 1 — What the section currently does
─────────────────────────────────────────────────────────────
HomeScreen.js reads MOCK_DATA.ACHIEVEMENTS.student_achievements[]:
  Item shape: { title, category, year, image }
  Card renders:
    - Image in h-60 container with item.image as src
    - Year badge (bg-emerald-900) top-right of image
    - item.category as label (text-emerald-600 uppercase)
    - item.title as heading
    - "Honorary Mention" hardcoded at card bottom
    - No description shown

Note: there is also ACHIEVEMENTS.school_achievements used elsewhere
on the page (lines ~123). Do NOT touch that part — only the
student_achievements horizontal scroll section (lines ~288 onward).

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive achievements and pass to HomeScreen:

   const achievementsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'achievements')
     ?.isEnabled ?? true;
   const sportsAchievements = (data?.achievements ?? [])
     .filter(a => a.achievementType === 'sports')
     .sort((a, b) => a.displayOrder - b.displayOrder);

   Pass to HomeScreen:
   <HomeScreen data={data} ... achievementsEnabled={achievementsEnabled}
               sportsAchievements={sportsAchievements} />

2. HomeScreen.js — accept new props:
   Add: achievementsEnabled, sportsAchievements to props destructure.

3. Remove student_achievements from ACHIEVEMENTS destructure usage.
   Keep ACHIEVEMENTS.school_achievements reference (used separately).
   Do NOT remove ACHIEVEMENTS from MOCK_DATA destructure.

4. Replace ACHIEVEMENTS.student_achievements.map with sportsAchievements.map:
   Before: {ACHIEVEMENTS.student_achievements.map((item, idx) => (
   After:  {sportsAchievements.map((item, idx) => (

5. Replace field mapping:
   Before: src={item.image}
   After:  (see image handling below)

   Before: {item.year}      → keep as {item.year}

   Before: {item.category}  → keep as {item.category}

   Before: {item.title}     → keep as {item.title}

6. Image handling — replace the <img> with conditional render:
   Before:
     <div className="relative h-60 overflow-hidden">
       <img src={item.image} alt={item.title}
            className="w-full h-full object-cover ..." />

   After:
     <div className="relative h-60 overflow-hidden">
       {item.photoUrl ? (
         <img src={item.photoUrl} alt={item.title}
              className="w-full h-full object-cover object-center
                         transition-transform duration-1000 group-hover/card:scale-110" />
       ) : (
         <div className="w-full h-full flex items-center justify-center bg-emerald-50">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-emerald-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
             <path strokeLinecap="round" strokeLinejoin="round"
               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
             <path strokeLinecap="round" strokeLinejoin="round"
               d="M8 21h8m-4-4v4M7 7H4a2 2 0 00-2 2v1a4 4 0 004 4h.5
                  M17 7h3a2 2 0 012 2v1a4 4 0 01-4 4h-.5
                  M7 7V5a5 5 0 0110 0v2M7 7h10" />
           </svg>
         </div>
       )}
       <div className="absolute top-4 right-4 bg-emerald-900 text-white px-3 py-1
                       text-[10px] font-bold uppercase tracking-widest shadow-lg">
         {item.year}
       </div>
     </div>

7. Gate the entire sports achievements horizontal-scroll section:
   Wrap the section that contains student_achievements with:
   {achievementsEnabled && sportsAchievements.length > 0 && (
     <section ...>...</section>
   )}
   NOTE: This gates ONLY the sports scroll section, NOT the
   school_achievements cards at the top of the achievements area.
   They are separate — do not gate them together.

WHAT DOES NOT CHANGE:
  - The horizontal scroll container (overflow-x-auto, snap-x)
  - The year badge styling and position
  - The "Honorary Mention" hardcoded label at card bottom
  - The emerald border-t-4 on card body
  - The hover shadow and scale effects
  - All CSS classes except image handling

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] student_achievements replaced with sportsAchievements prop
  - [ ] Filter: achievementType === 'sports' applied
  - [ ] Sorted by displayOrder
  - [ ] achievementsEnabled gates the sports scroll section only
  - [ ] item.photoUrl used with conditional render
  - [ ] Trophy placeholder shown when photoUrl is falsy
  - [ ] Placeholder uses bg-emerald-50 with trophy SVG
  - [ ] Year badge still renders inside the image container
  - [ ] object-center added to img (action/landscape photos)
  - [ ] school_achievements section NOT changed
  - [ ] All CSS classes unchanged
  - [ ] No other section of HomeScreen.js changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Achievements Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       derives achievements, passes to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  reads from sportsAchievements prop

Data source:                    data.achievements[] filtered achievementType === 'sports'
Section gate (isEnabled):       YES — sectionKey 'achievements'
Sorted by displayOrder:         YES
Image: photoUrl conditional:    YES — img if present, trophy SVG if empty
Placeholder color:              bg-emerald-50
school_achievements changed:    NO (separate section, untouched)
CSS changed:                    image handling only
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind achievements → template_modern
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
PHASE 1 — What the section currently does
─────────────────────────────────────────────────────────────
In page.tsx, hardcoded const sportsAchievements = [...] at file top (lines 36-70).
Item shape: { year, title, category, image, description }
Card renders as a full-bleed image card (aspect-[16/10], rounded-[3rem]):
  - achievement.image as full background (absolute inset-0 object-cover)
  - gradient overlay from bottom
  - Year badge top-left (backdrop-blur box)
  - achievement.category uppercase label bottom-left
  - achievement.title as heading bottom-left
  - achievement.description as paragraph bottom-left
Uses AnimatedNumber for year display.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. Remove hardcoded sportsAchievements array (lines ~36-70) from page.tsx.

2. Derive achievements at top of Home component:
   const achievementsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'achievements')
     ?.isEnabled ?? true;
   const sportsAchievements = (data?.achievements ?? [])
     .filter(a => a.achievementType === 'sports')
     .sort((a, b) => a.displayOrder - b.displayOrder);

3. Replace sportsAchievements.map field mapping:

   Before: src={achievement.image}
   After:  (see image handling below)

   Before: <AnimatedNumber value={achievement.year} duration={1000} />
   After:  <AnimatedNumber value={achievement.year} duration={1000} />
           (year field name unchanged — keep as-is)

   Before: {achievement.category}  → keep as {achievement.category}
   Before: {achievement.title}     → keep as {achievement.title}
   Before: {achievement.description} → keep as {achievement.description}

4. Image handling — this card uses image as full background:
   The current pattern has <img className="absolute inset-0 w-full h-full object-cover ...">
   Replace with conditional:

   Before:
     <img src={achievement.image} alt={achievement.title}
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-110 transition-transform duration-700" />

   After:
     {achievement.photoUrl ? (
       <img src={achievement.photoUrl} alt={achievement.title}
            className="absolute inset-0 w-full h-full object-cover object-center
                       group-hover:scale-110 transition-transform duration-700" />
     ) : (
       <div className="absolute inset-0 w-full h-full flex items-center
                       justify-center bg-blue-950/30">
         <svg xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-white/20"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="1">
           <path strokeLinecap="round" strokeLinejoin="round"
             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           <path strokeLinecap="round" strokeLinejoin="round"
             d="M8 21h8m-4-4v4M7 7H4a2 2 0 00-2 2v1a4 4 0 004 4h.5
                M17 7h3a2 2 0 012 2v1a4 4 0 01-4 4h-.5
                M7 7V5a5 5 0 0110 0v2M7 7h10" />
         </svg>
       </div>
     )}

   IMPORTANT: The gradient overlay div and all overlaid text must remain
   AFTER the image/placeholder element in DOM order so they render on top.
   Do not change the z-order of the gradient or text elements.

5. Gate the entire Athletic Excellence section:
   Before: <section className="max-w-[100vw] overflow-hidden py-24 ...">
   After:  {achievementsEnabled && sportsAchievements.length > 0 && (
             <section className="max-w-[100vw] overflow-hidden py-24 ...">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The gradient overlay (bg-gradient-to-t from-blue-950)
  - The AnimatedNumber component for year
  - The horizontal scroll container with snap and cursor-grab
  - The year badge box (backdrop-blur-md, rounded-2xl)
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hardcoded sportsAchievements array removed from file top
  - [ ] sportsAchievements derived from data.achievements inside Home
  - [ ] Filter: achievementType === 'sports' applied
  - [ ] Sorted by displayOrder
  - [ ] achievementsEnabled gates entire section
  - [ ] achievement.photoUrl used with conditional render
  - [ ] Trophy placeholder: bg-blue-950/30 with white/20 SVG
  - [ ] Gradient overlay preserved (renders after image/placeholder)
  - [ ] AnimatedNumber for year preserved
  - [ ] object-center added to img
  - [ ] All CSS classes unchanged
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Achievements Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  reads from data.achievements

Hardcoded sportsAchievements removed:  YES
Data source:                           data.achievements[] filtered achievementType === 'sports'
Section gate (isEnabled):              YES — sectionKey 'achievements'
Sorted by displayOrder:                YES
Image: photoUrl conditional:           YES — img if present, trophy SVG if empty
Placeholder color:                     bg-blue-950/30 (matches card dark palette)
Gradient overlay preserved:            YES
AnimatedNumber preserved:              YES
CSS changed:                           image handling only
Guardrails violated:                   NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind achievements → template_premium
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
PHASE 1 — What the section currently does
─────────────────────────────────────────────────────────────
In page.tsx, AthleticExcellence component:
  Hardcoded const sportsAchievements = [...] inside the component.
  Item shape: { title, category, image, description }   ← NO year field
  Card renders: portrait image aspect-[4/5] overflow-hidden ✅
                sport.category as gold label (uppercase)
                sport.title as serif heading
                sport.description as paragraph
  Component accepts no props.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. AthleticExcellence must receive props:
   Before: const AthleticExcellence: React.FC = () => {
   After:
     interface SportAchievement {
       title: string; category: string; photoUrl: string;
       description: string; year: number; displayOrder: number;
     }
     interface AthleticExcellenceProps {
       sportsAchievements: SportAchievement[];
       achievementsEnabled: boolean;
     }
     const AthleticExcellence: React.FC<AthleticExcellenceProps> =
       ({ sportsAchievements, achievementsEnabled }) => {

2. Inside AthleticExcellence:
   - Remove the hardcoded const sportsAchievements = [...] entirely
   - Add gate: if (!achievementsEnabled || sportsAchievements.length === 0) return null;

3. In Home component, derive achievements:
   const achievementsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'achievements')
     ?.isEnabled ?? true;
   const sportsAchievements = (data?.achievements ?? [])
     .filter(a => a.achievementType === 'sports')
     .sort((a, b) => a.displayOrder - b.displayOrder);

4. Pass to AthleticExcellence:
   Before: <AthleticExcellence />
   After:  <AthleticExcellence
             sportsAchievements={sportsAchievements}
             achievementsEnabled={achievementsEnabled} />

5. Replace field mapping in sportsAchievements.map:

   Before: src={sport.image}
   After:  (see image handling below)

   Before: {sport.category}    → keep as {sport.category}
   Before: {sport.title}       → keep as {sport.title}
   Before: {sport.description} → keep as {sport.description}

6. Image handling — replace <img> with conditional render:
   Current container: <div className="relative aspect-[4/5] overflow-hidden mb-8">

   Before:
     <img src={sport.image} alt={sport.title}
          className="w-full h-full object-cover grayscale
                     group-hover:grayscale-0 group-hover:scale-105
                     transition-all duration-1000" />

   After:
     {sport.photoUrl ? (
       <img src={sport.photoUrl} alt={sport.title}
            className="w-full h-full object-cover object-center grayscale
                       group-hover:grayscale-0 group-hover:scale-105
                       transition-all duration-1000" />
     ) : (
       <div className="w-full h-full flex items-center justify-center
                       bg-signature-ivory">
         <svg xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-signature-navy/20"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth="1">
           <path strokeLinecap="round" strokeLinejoin="round"
             d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           <path strokeLinecap="round" strokeLinejoin="round"
             d="M8 21h8m-4-4v4M7 7H4a2 2 0 00-2 2v1a4 4 0 004 4h.5
                M17 7h3a2 2 0 012 2v1a4 4 0 01-4 4h-.5
                M7 7V5a5 5 0 0110 0v2M7 7h10" />
         </svg>
       </div>
     )}
     <div className="absolute top-0 right-0 w-12 h-12
                     border-t border-r border-signature-gold/30"></div>

   Keep the gold corner decoration div — it renders after the image/placeholder.

WHAT DOES NOT CHANGE:
  - isVisible intersection observer animation
  - The gold corner decoration (absolute top-0 right-0)
  - The animated underline (w-8 h-px group-hover:w-16)
  - The grayscale → color hover on img (preserved in conditional img)
  - The "View All Achievements" button
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hardcoded sportsAchievements[] removed from AthleticExcellence
  - [ ] AthleticExcellence accepts sportsAchievements + achievementsEnabled props
  - [ ] Home derives sportsAchievements from data.achievements
  - [ ] Filter: achievementType === 'sports' applied
  - [ ] Sorted by displayOrder
  - [ ] Gate: returns null if achievementsEnabled false OR array empty
  - [ ] sport.photoUrl used with conditional render
  - [ ] Trophy placeholder: bg-signature-ivory, text-signature-navy/20 SVG
  - [ ] Gold corner decoration preserved after img/placeholder
  - [ ] Grayscale hover effect on <img> preserved
  - [ ] object-center added to img
  - [ ] aspect-[4/5] overflow-hidden container unchanged ✅
  - [ ] isVisible animation preserved
  - [ ] All CSS classes unchanged
  - [ ] No other section of page.tsx changed
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Achievements Binding Report — template_premium

Files changed:
  src/templates/template_premium/index.tsx      passes data to Home
  src/templates/template_premium/app/page.tsx   AthleticExcellence reads from props

Hardcoded sportsAchievements[] removed:  YES
Data source:                             data.achievements[] filtered achievementType === 'sports'
Section gate (isEnabled):                YES — sectionKey 'achievements'
Sorted by displayOrder:                  YES
Image: photoUrl conditional:             YES — img if present, trophy SVG if empty
Placeholder color:                       bg-signature-ivory (matches template bg)
Gold corner decoration preserved:        YES
Grayscale hover preserved:               YES
CSS changed:                             image handling + object-center only
Guardrails violated:                     NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
