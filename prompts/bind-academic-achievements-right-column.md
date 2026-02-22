# EdDesk — Bind Academic Achievements (Right Column) → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   The "Achievements & Glories" right column inside the academic_results
#   section currently shows hardcoded items. This prompt replaces them
#   with live data from TenantViewModel.achievements[], filtered to
#   achievementType === 'academic' only.
#
# CONTEXT:
#   This is the RIGHT COLUMN of the InstitutionalStats / academic results
#   section. The LEFT COLUMN (board results stats) was bound in the
#   previous academic_results prompt. This prompt targets ONLY the right
#   column — the "Achievements & Glories" list.
#
# FILTER:
#   achievementType === 'academic'   ← student academic achievements only
#   Sort: year desc, then displayOrder asc
#   Display: top 2 items on homepage (slice(0, 2))
#
# DATA FIELDS:
#   a.year         → year badge
#   a.category     → badge label (e.g. "Board Examinations", "Science Olympiad")
#   a.title        → achievement heading
#   a.description  → detail paragraph
#
# SECTION GATE:
#   Same as academic_results section — already gated by academicEnabled.
#   Do not add a second gate — the gate already exists on the outer section.
#   Right column: if academicAchievements is empty → render null for that column.
#
# DATA DERIVATION (derive alongside latestResult in index.tsx or Home):
#   const academicAchievements = (data?.achievements ?? [])
#     .filter(a => a.achievementType === 'academic')
#     .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);
#
# NOTE ON achievementType CASING:
#   DB stores: 'academic' (lowercase)
#   TenantViewModel maps: achievementType (camelCase field name)
#   Filter: a.achievementType === 'academic'   ← lowercase string, exact match
#   Do NOT call .toLowerCase() — not needed
#
# WHAT STAYS THE SAME:
#   - Section heading "Achievements & Glories" — design copy, NOT data
#   - "Institutional Recognition" supertitle — design copy, NOT data
#   - "Know more about our heritage" link — design element
#   - All CSS classes and animations
#
# PREREQUISITE: bind-academic-results-all-templates.md must be run first.
# That prompt handles the left column (board stats) and outer section gate.
# This prompt handles ONLY the right column.
#
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind academic achievements right column → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_classic/index.tsx
  - src/templates/template_classic/screens/HomeScreen.js

Forbidden: mockData.js and all other files.

─────────────────────────────────────────────────────────────
PHASE 1 — What the right column currently does
─────────────────────────────────────────────────────────────
Inside the 3-column academic results grid:
  Col 1: board stats (already bound by previous prompt)
  Cols 2-3: recentAchievements.map() → ACHIEVEMENTS.school_achievements.slice(0, 3)
    OR: already replaced by recognitionItems from previous prompt

  Each card renders:
    - achievement.year (emerald-100 text, large serif)
    - achievement.title (uppercase, bold)
    - achievement.description (italic)
    - Hardcoded "Institutional Recognition" label at bottom

  FIRST: Check if this was already replaced by the academic_results prompt.
  If recognitionItems is already being used → change the filter from
  achievementType !== 'sports' to achievementType === 'academic'.
  If still using recentAchievements/school_achievements → replace fully.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive academicAchievements:

   IF the previous prompt already added recognitionItems derivation:
     Replace:
       const recognitionItems = (data?.achievements ?? [])
         .filter(a => a.achievementType !== 'sports')
         ...
     With:
       const academicAchievements = (data?.achievements ?? [])
         .filter(a => a.achievementType === 'academic')
         .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);

   IF the previous prompt was NOT yet run → derive fresh:
     const academicAchievements = (data?.achievements ?? [])
       .filter(a => a.achievementType === 'academic')
       .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);

   Update prop passed to HomeScreen:
   Before: recognitionItems={recognitionItems}
   After:  academicAchievements={academicAchievements}
   (or add it if not yet present)

2. HomeScreen.js — update/add prop:
   Add academicAchievements to props destructure.
   If recognitionItems was the old name → replace it.

3. Replace the right-column map:

   Current pattern (whichever version is present):
     {recentAchievements.map(...)  OR  {recognitionItems.slice(0,2).map(...}

   New pattern:
     {academicAchievements.slice(0, 2).map((item, idx) => (
       <div key={idx} className="p-10 bg-slate-50 border border-slate-200
                                 hover:border-emerald-200 transition-all group
                                 flex flex-col justify-between h-full">
         <div>
           <div className="text-3xl font-bold text-emerald-100 serif mb-6
                           group-hover:text-emerald-900 transition-colors">
             {item.year}
           </div>
           <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight
                          serif mb-4 leading-tight">
             {item.title}
           </h3>
           <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
             {item.description}
           </p>
         </div>
         <div className="pt-6 border-t border-slate-200 text-[10px] font-bold
                         text-emerald-600 uppercase tracking-widest flex items-center gap-2">
           <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
           {item.category}
         </div>
       </div>
     ))}

   Key changes:
   - achievement.year → item.year
   - achievement.title → item.title
   - achievement.description → item.description
   - Hardcoded "Institutional Recognition" → item.category (actual data)

4. If academicAchievements is empty → the right 2 columns render nothing.
   The left stats column still shows independently.
   No extra gate needed — the map produces nothing automatically.

WHAT DOES NOT CHANGE:
  - The left board stats panel (col 1)
  - The outer section gate (academicEnabled)
  - The "Know more" link below the grid
  - All CSS classes on the cards

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Filter: achievementType === 'academic' (not !== 'sports')
  - [ ] Sorted: year desc, then displayOrder asc
  - [ ] Sliced to 2 items (classic 3-col grid: 1 stats + 2 achievement cards)
  - [ ] item.year used (not hardcoded year)
  - [ ] item.title used and displayed uppercase (CSS handles it)
  - [ ] item.description used
  - [ ] item.category used at card bottom (not hardcoded "Institutional Recognition")
  - [ ] ACHIEVEMENTS.school_achievements no longer referenced
  - [ ] Left column stats unchanged
  - [ ] "Know more" link unchanged
  - [ ] All CSS classes unchanged

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Academic Achievements Right Column Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       derives academicAchievements
  src/templates/template_classic/screens/HomeScreen.js  reads from academicAchievements

Filter:                   achievementType === 'academic'
Sort:                     year desc → displayOrder asc
Display count:            slice(0, 2)
item.category as label:   YES (replaces hardcoded "Institutional Recognition")
item.year, title, desc:   YES
Left column untouched:    YES
CSS changed:              NO
Guardrails violated:      NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind academic achievements right column → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_modern/index.tsx
  - src/templates/template_modern/app/page.tsx

─────────────────────────────────────────────────────────────
PHASE 1 — What the right column currently does
─────────────────────────────────────────────────────────────
Inside the lg:col-span-7 right column:
  2 FULLY HARDCODED achievement divs:
    1. year: AnimatedNumber value={2023}, badge: "State Recognition",
             title: "Best Disciplined School Award"
    2. year: AnimatedNumber value={2022}, badge: "Board Milestone",
             title: "Academic Excellence Trophy"

  Each div uses grid-cols-[80px_1fr] layout:
    - Left cell: year label + AnimatedNumber
    - Right cell: badge div + h4 title + p description

  First item style: text-yellow-600 year, bg-yellow-50 badge
  Second item style: text-primary/40 year (muted), bg-blue-50 badge

  OR: already replaced by recognitionItems from previous prompt → update filter.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. In Home component — derive academicAchievements:

   IF recognitionItems already exists from previous prompt:
     Replace:
       const recognitionItems = (data?.achievements ?? [])
         .filter(a => a.achievementType !== 'sports')
         ...
     With:
       const academicAchievements = (data?.achievements ?? [])
         .filter(a => a.achievementType === 'academic')
         .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);

   IF previous prompt not yet run → derive fresh in Home component.

2. Replace the 2 hardcoded divs (OR recognitionItems.map if already replaced)
   with a single unified map pattern:

   Before: [2 hardcoded divs with distinct first/second styling]
   After:
     {academicAchievements.slice(0, 2).map((item, i) => (
       <div key={i}
            className="group relative grid grid-cols-[80px_1fr] gap-8 p-8
                       hover:bg-white rounded-[2rem] transition-all duration-500
                       hover:shadow-2xl hover:shadow-primary/5 border
                       border-transparent hover:border-gray-50">
         <div className="flex flex-col items-center justify-center border-r
                         border-gray-100 group-hover:border-accent-hover transition-colors">
           <span className="text-[10px] font-black text-yellow-600 mb-1 tracking-widest">
             YEAR
           </span>
           <span className="text-3xl font-black text-primary tracking-tighter">
             <AnimatedNumber value={item.year} duration={1000} />
           </span>
         </div>
         <div className="space-y-3">
           <div className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700
                           rounded-lg text-[9px] font-black uppercase tracking-widest">
             {item.category}
           </div>
           <h4 className="text-2xl font-bold text-blue-950">{item.title}</h4>
           <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
         </div>
       </div>
     ))}

   Note: Use uniform first-item styling for all items (yellow-600 year, yellow-50 badge).
   The second item's muted styling was a design choice for hardcoded content — with
   dynamic data, uniform styling is cleaner and future-proof.

3. AnimatedNumber: already imported in page.tsx — keep it receiving item.year.

4. If academicAchievements is empty → space-y-10 div renders nothing. Keep
   the "Know more" link below always visible.

WHAT DOES NOT CHANGE:
  - The "Achievements & Glories" heading and "Institutional Recognition" supertitle
  - The grid-cols-[80px_1fr] card layout
  - The AnimatedNumber component
  - The hover effects (bg-white, shadow)
  - The "Know more about our heritage" link at the bottom
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Filter: achievementType === 'academic'
  - [ ] Sorted: year desc, displayOrder asc
  - [ ] Sliced to 2
  - [ ] AnimatedNumber receives item.year (not hardcoded 2023/2022)
  - [ ] item.category used as badge text (not hardcoded "State Recognition")
  - [ ] item.title used
  - [ ] item.description used
  - [ ] Uniform styling applied (no first/second distinction)
  - [ ] "Know more" link preserved
  - [ ] "Achievements & Glories" heading preserved
  - [ ] All CSS classes unchanged
  - [ ] No other section changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Academic Achievements Right Column Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  right column reads from academicAchievements

Filter:                   achievementType === 'academic'
Sort:                     year desc → displayOrder asc
Display count:            slice(0, 2)
AnimatedNumber dynamic:   YES — item.year
item.category as badge:   YES (uniform yellow-50 styling)
Hardcoded awards removed: YES
CSS changed:              NO (uniform styling vs first/second distinction)
Guardrails violated:      NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind academic achievements right column → template_premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  - src/templates/template_premium/index.tsx
  - src/templates/template_premium/app/page.tsx

Forbidden: data.ts, Shared.tsx, Navigation.tsx.

─────────────────────────────────────────────────────────────
PHASE 1 — What the right column currently does
─────────────────────────────────────────────────────────────
Inside InstitutionalStats component, right panel:
  2 FULLY HARDCODED achievement divs (flex gap-12 group layout):
    1. year: "2023" (signature-gold color), badge: "State Recognition",
             title: "Best Disciplined School Award"
       Has vertical connector line: w-px flex-grow bg-signature-navy/5
    2. year: "2022" (gray-300, muted), badge: "Board Milestone",
             title: "Academic Excellence Trophy"
       No connector line after last item

  OR: already replaced by recognitionItems from previous prompt → update filter.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. InstitutionalStats props — update/add academicAchievements:

   IF recognitionItems prop was added by previous prompt:
     Interface: replace recognitionItems with academicAchievements (same type)
     Prop name in component: recognitionItems → academicAchievements

   IF previous prompt not yet run → add fresh prop:
     interface InstitutionalStatsProps {
       latestResult: { ... } | null;
       academicAchievements: Array<{
         year: number; category: string; title: string; description: string;
       }>;
       enabled: boolean;
     }

2. In Home component — derive academicAchievements:

   IF recognitionItems already exists → replace filter:
     Change: .filter(a => a.achievementType !== 'sports')
     To:     .filter(a => a.achievementType === 'academic')
     Rename variable: recognitionItems → academicAchievements

   IF not yet added → derive fresh:
     const academicAchievements = (data?.achievements ?? [])
       .filter(a => a.achievementType === 'academic')
       .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);

   Pass to InstitutionalStats:
   Before: recognitionItems={recognitionItems}
   After:  academicAchievements={academicAchievements}

3. Replace 2 hardcoded divs inside InstitutionalStats with dynamic map:

   Before: [2 hardcoded divs]

   After:
     {academicAchievements.slice(0, 2).map((item, i) => (
       <div key={i} className="flex gap-12 group">
         <div className="flex flex-col items-center">
           <span className="text-[10px] uppercase tracking-widest font-bold
                            text-signature-gold mb-2">Year</span>
           <span className="text-4xl font-serif text-signature-navy
                            group-hover:text-signature-gold transition-colors">
             {item.year}
           </span>
           {i < academicAchievements.slice(0, 2).length - 1 && (
             <div className="w-px flex-grow bg-signature-navy/5 mt-4"></div>
           )}
         </div>
         <div className="flex-grow pt-2">
           <span className="inline-block bg-signature-gold/10 text-signature-gold
                            text-[9px] font-bold uppercase tracking-widest px-3
                            py-1 rounded-full mb-4">
             {item.category}
           </span>
           <h4 className="text-2xl font-serif mb-4 text-signature-navy
                          group-hover:text-signature-gold transition-colors">
             {item.title}
           </h4>
           <p className="text-base text-gray-500 leading-loose">{item.description}</p>
         </div>
       </div>
     ))}

   Key pattern: connector line (w-px flex-grow) renders only between items,
   NOT after the last one — use index check: i < slice.length - 1

   Uniform styling for all items (signature-gold year, gold badge).
   The second item's gray-300 muted style was for hardcoded content — drop it.

WHAT DOES NOT CHANGE:
  - "Achievements & Glories" heading
  - "Institutional Recognition" supertitle
  - The useIntersectionObserver animation (stays on InstitutionalStats)
  - The slide-in animation classes on left/right panels
  - The "Know more about our heritage" circular arrow link
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Filter: achievementType === 'academic'
  - [ ] Sorted: year desc, displayOrder asc
  - [ ] Sliced to 2
  - [ ] item.year rendered as serif text (not AnimatedNumber — premium doesn't use it)
  - [ ] item.category used as gold badge (replaces "State Recognition"/"Board Milestone")
  - [ ] item.title used
  - [ ] item.description used
  - [ ] Connector line only between items (not after last)
  - [ ] Uniform gold styling for all items (no muted gray second item)
  - [ ] isVisible animation preserved
  - [ ] "Know more" link preserved
  - [ ] All CSS classes unchanged
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Academic Achievements Right Column Report — template_premium

Files changed:
  src/templates/template_premium/app/page.tsx  InstitutionalStats right column

Filter:                       achievementType === 'academic'
Sort:                         year desc → displayOrder asc
Display count:                slice(0, 2)
item.category as gold badge:  YES (replaces "State Recognition"/"Board Milestone")
Connector line between items: YES (not after last)
Uniform gold styling:         YES (removed muted second-item styling)
Hardcoded awards removed:     YES
isVisible animation:          PRESERVED
CSS changed:                  NO
Guardrails violated:          NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
