# EdDesk — Bind Academic Results + Recognition Section → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded academic stats and recognition achievements in all
#   3 templates. This section has TWO columns fed by TWO data sources.
#
# SECTION LAYOUT (same in all 3 templates):
#   LEFT COLUMN:   Board results — year, pass_percentage, distinctions,
#                  first_class, legacy_quote
#   RIGHT COLUMN:  Recognition achievements — year, category, title,
#                  description (non-sports only)
#
# DATA SOURCES:
#
#   LEFT — data.academicResults[]:
#     year             → e.g. 2024
#     passPercentage   → e.g. 98.5  (display as "98.5%")
#     distinctions     → e.g. 142   (display as "142%")
#     firstClass       → e.g. 87    (display as "87%")
#     legacyQuote      → nullable string (only show if not null)
#
#     Most recent year = academicResults.sort by year desc, take [0]
#     Show year in "Board Results {year}" heading
#
#   RIGHT — data.achievements[]:
#     Filter: achievementType !== 'sports'   (academic + recognition)
#     Sort: by year desc, then displayOrder asc
#     Show: year, category, title, description
#
# SECTION GATE:
#   const academicEnabled = (data?.homepageSections ?? [])
#     .find(s => s.sectionKey === 'academic_results')
#     ?.isEnabled ?? true;
#
#   Left column visible: academicEnabled AND academicResults?.length > 0
#   Right column visible: achievements (non-sports) exist
#   If both are empty → hide entire section (render null)
#
# DERIVED DATA (compute in index.tsx or inside Home, pass as props):
#
#   // Latest board results (most recent year)
#   const latestResult = (data?.academicResults ?? [])
#     .sort((a, b) => b.year - a.year)[0] ?? null;
#
#   // Non-sports achievements for recognition column
#   const recognitionItems = (data?.achievements ?? [])
#     .filter(a => a.achievementType !== 'sports')
#     .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);
#
# SUFFIX RULE:
#   passPercentage and firstClass: append "%" when rendering
#   distinctions: it is a COUNT of students — display as number only
#                 (e.g. "142" not "142%") — unless the design shows %
#                 CHECK the existing design in each template carefully
#                 and match what the current hardcoded display shows.
#
# LEGACY QUOTE:
#   Only render the quote block if latestResult.legacyQuote is not null.
#   If null → hide the quote section entirely.
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind academic results → template_classic
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
PHASE 1 — What the section currently does
─────────────────────────────────────────────────────────────
Section layout: 3-column grid
  Col 1 (bg-emerald-900):  Board results panel — FULLY HARDCODED values
    - "Board Results 2023" (hardcoded year)
    - Pass Percentage: hardcoded "100%"
    - Distinctions: hardcoded "84%"
    - First Class: hardcoded "96%"
    - Hardcoded legacy quote text
  Cols 2-3: recentAchievements.map() from ACHIEVEMENTS.school_achievements
    - Shows: achievement.year, achievement.title, achievement.description
    - Bottom: hardcoded "Institutional Recognition" label

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive both data sources:

   const academicEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'academic_results')
     ?.isEnabled ?? true;

   const latestResult = (data?.academicResults ?? [])
     .sort((a, b) => b.year - a.year)[0] ?? null;

   const recognitionItems = (data?.achievements ?? [])
     .filter(a => a.achievementType !== 'sports')
     .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);

   Pass to HomeScreen:
   <HomeScreen data={data} ... academicEnabled={academicEnabled}
               latestResult={latestResult} recognitionItems={recognitionItems} />

2. HomeScreen.js — accept new props:
   Add: academicEnabled, latestResult, recognitionItems to props.

3. Remove recentAchievements usage from this section.
   (recentAchievements = ACHIEVEMENTS.school_achievements.slice(0,3))
   Replace .map with recognitionItems.map
   Keep ACHIEVEMENTS in MOCK_DATA destructure only if used elsewhere.
   Check all other usages before removing.

4. LEFT COLUMN — replace hardcoded values:

   Before: <span ...>Board Results 2023</span>
   After:  <span ...>Board Results {latestResult?.year ?? '—'}</span>

   Before: <span ...>100%</span>   (Pass Percentage)
   After:  <span ...>{latestResult ? `${latestResult.passPercentage}%` : '—'}</span>

   Before: <span ...>84%</span>    (Distinctions)
   After:  <span ...>{latestResult ? `${latestResult.distinctions}%` : '—'}</span>
   Note: Classic shows this as percentage — match existing "84%" pattern.

   Before: <span ...>96%</span>    (First Class)
   After:  <span ...>{latestResult ? `${latestResult.firstClass}%` : '—'}</span>

   Before: <p ...>Consistently maintaining a legacy...</p>
   After:  {latestResult?.legacyQuote && (
             <p className="mt-8 text-[10px] text-emerald-400 uppercase tracking-widest leading-relaxed">
               {latestResult.legacyQuote}
             </p>
           )}

5. RIGHT COLUMNS — replace recentAchievements.map:

   Before: {recentAchievements.map((achievement, idx) => (
             ...
             {achievement.year}
             {achievement.title}
             {achievement.description}
             "Institutional Recognition"  ← hardcoded
   After:  {recognitionItems.slice(0, 2).map((item, idx) => (
             ...
             {item.year}
             {item.title}
             {item.description}
             {item.category}   ← use actual category from data
           ))}
   Note: .slice(0, 2) — classic shows 2 achievement cards (3-col grid minus 1 stats card).

6. Gate entire section:
   Before: <section className="py-24 bg-white border-b border-slate-100">
   After:  {academicEnabled && (latestResult || recognitionItems.length > 0) && (
             <section className="py-24 bg-white border-b border-slate-100">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The emerald-900 left panel design
  - The progress row layout (flex justify-between border-b)
  - The achievement card layout (hover effect, border, flex flex-col)
  - The "Know more" link at the bottom
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] latestResult prop used for all left column values
  - [ ] Year shown as "Board Results {latestResult.year}"
  - [ ] passPercentage displayed as "{value}%"
  - [ ] distinctions displayed as "{value}%"
  - [ ] firstClass displayed as "{value}%"
  - [ ] legacyQuote conditionally rendered (null → hidden)
  - [ ] recentAchievements replaced with recognitionItems.slice(0, 2)
  - [ ] item.category used instead of hardcoded "Institutional Recognition"
  - [ ] academicEnabled gates entire section
  - [ ] Section shows if either latestResult OR recognitionItems exist
  - [ ] All CSS classes unchanged
  - [ ] No other section changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Academic Results Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       derives results, passes to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  reads from latestResult + recognitionItems

Left column — hardcoded stats replaced:   YES
Right column — MOCK_DATA.school_achievements replaced: YES → recognitionItems
Section gate (isEnabled):                YES — sectionKey 'academic_results'
legacyQuote conditional:                 YES (null → hidden)
item.category used:                      YES (replaces "Institutional Recognition")
CSS changed:                             NO
Guardrails violated:                     NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind academic results → template_modern
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
PHASE 1 — What the section currently does
─────────────────────────────────────────────────────────────
Section: 12-column grid, lg:col-span-5 + lg:col-span-7

LEFT (col-span-5): Fully hardcoded
  - "Board Results 2023" hardcoded year
  - AnimatedNumber value={100} suffix="%" (Pass Percentage)
  - AnimatedNumber value={84} suffix="%" (Distinctions) — text-yellow-600
  - AnimatedNumber value={96} suffix="%" (First Class)
  - Hardcoded quote paragraph

RIGHT (col-span-7): Fully hardcoded
  - 2 hardcoded achievement divs:
    1. year:2023 → "State Recognition" badge, "Best Disciplined School Award"
    2. year:2022 → "Board Milestone" badge, "Academic Excellence Trophy"
  - AnimatedNumber used for year display
  - "Know more about our heritage" link

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. Derive data in Home component (not in index.tsx — data is already passed):

   const academicEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'academic_results')
     ?.isEnabled ?? true;

   const latestResult = (data?.academicResults ?? [])
     .sort((a, b) => b.year - a.year)[0] ?? null;

   const recognitionItems = (data?.achievements ?? [])
     .filter(a => a.achievementType !== 'sports')
     .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);

2. LEFT COLUMN — replace hardcoded values:

   Before: <h3 ...>Board Results 2023</h3>
   After:  <h3 ...>Board Results {latestResult?.year ?? '—'}</h3>

   Before: <AnimatedNumber value={100} suffix="%" />
   After:  <AnimatedNumber value={latestResult?.passPercentage ?? 0} suffix="%" />

   Before: <AnimatedNumber value={84} suffix="%" />    (Distinctions, text-yellow-600)
   After:  <AnimatedNumber value={latestResult?.distinctions ?? 0} suffix="%" />
   Note: Modern shows distinctions as "%" — match current pattern.

   Before: <AnimatedNumber value={96} suffix="%" />    (First Class)
   After:  <AnimatedNumber value={latestResult?.firstClass ?? 0} suffix="%" />

   Before: <p ...>Consistently maintaining a legacy...</p>
   After:  {latestResult?.legacyQuote && (
             <div className="relative p-8 rounded-3xl bg-blue-50/30 border border-blue-50">
               <span className="absolute -top-4 left-6 text-6xl text-blue-100 font-serif leading-none">"</span>
               <p className="text-gray-500 leading-relaxed font-medium italic relative z-10">
                 {latestResult.legacyQuote}
               </p>
             </div>
           )}

3. RIGHT COLUMN — replace 2 hardcoded achievement divs with dynamic map:

   The hardcoded divs have slightly different styling for first vs second item
   (first: text-yellow-600 year, second: text-primary/40 year with muted color).
   Simplify to consistent styling from the first item pattern — clean and uniform.

   Before: [2 hardcoded divs for specific awards]

   After:  {recognitionItems.slice(0, 2).map((item, i) => (
             <div key={i} className="group relative grid grid-cols-[80px_1fr] gap-8 p-8
                                     hover:bg-white rounded-[2rem] transition-all duration-500
                                     hover:shadow-2xl hover:shadow-primary/5 border
                                     border-transparent hover:border-gray-50">
               <div className="flex flex-col items-center justify-center border-r border-gray-100
                               group-hover:border-accent-hover transition-colors">
                 <span className="text-[10px] font-black text-yellow-600 mb-1 tracking-widest">YEAR</span>
                 <span className="text-3xl font-black text-primary tracking-tighter">
                   <AnimatedNumber value={item.year} duration={1000} />
                 </span>
               </div>
               <div className="space-y-3">
                 <div className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg
                                 text-[9px] font-black uppercase tracking-widest">
                   {item.category}
                 </div>
                 <h4 className="text-2xl font-bold text-blue-950">{item.title}</h4>
                 <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
               </div>
             </div>
           ))}

4. Gate entire section:
   Before: <section className="max-w-7xl mx-auto px-6 py-8">
   After:  {academicEnabled && (latestResult || recognitionItems.length > 0) && (
             <section className="max-w-7xl mx-auto px-6 py-8">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The 12-column grid layout
  - The AnimatedNumber component
  - The progress row layout (flex justify-between, animated underline)
  - The right column card hover effects
  - The "Know more about our heritage" link
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] latestResult used for all left column values
  - [ ] AnimatedNumber receives dynamic values (not hardcoded 100/84/96)
  - [ ] Year shown as "Board Results {latestResult.year}"
  - [ ] legacyQuote conditionally rendered (null → hidden)
  - [ ] 2 hardcoded achievement divs replaced with recognitionItems.slice(0,2).map
  - [ ] item.category used as badge text
  - [ ] item.year used in AnimatedNumber
  - [ ] item.title and item.description used
  - [ ] academicEnabled gates entire section
  - [ ] AnimatedNumber component unchanged
  - [ ] "Know more about our heritage" link preserved
  - [ ] All CSS classes unchanged
  - [ ] No other section changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Academic Results Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  reads from data.academicResults + data.achievements

Left column — hardcoded stats replaced:    YES
Right column — hardcoded awards replaced:  YES → recognitionItems.slice(0,2)
Section gate (isEnabled):                 YES — sectionKey 'academic_results'
legacyQuote conditional:                  YES (null → hidden)
AnimatedNumber receives dynamic data:     YES
item.category used as badge:              YES
CSS changed:                              NO
Guardrails violated:                      NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind academic results → template_premium
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
PHASE 1 — What the section currently does
─────────────────────────────────────────────────────────────
InstitutionalStats is a standalone React component at the top of page.tsx.
It accepts NO props — all data is hardcoded inside it.
It is called in the Home JSX as: <InstitutionalStats />

LEFT side (bg-[#F0F7FF]):
  - "Board Results 2023" hardcoded
  - Pass Percentage: hardcoded "100%"
  - Distinctions: hardcoded "84%" (text-signature-gold)
  - First Class: hardcoded "96%"
  - NO legacy quote shown in premium (not in current design)

RIGHT side:
  - 2 hardcoded achievement items:
    1. year:2023, "State Recognition" badge, "Best Disciplined School Award"
    2. year:2022, "Board Milestone" badge, "Academic Excellence Trophy"
  - "Know more about our heritage" link

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. InstitutionalStats must receive props:

   interface InstitutionalStatsProps {
     latestResult: {
       year: number; passPercentage: number;
       distinctions: number; firstClass: number; legacyQuote: string | null;
     } | null;
     recognitionItems: Array<{
       year: number; category: string; title: string; description: string;
     }>;
     enabled: boolean;
   }
   const InstitutionalStats: React.FC<InstitutionalStatsProps> =
     ({ latestResult, recognitionItems, enabled }) => {

2. Inside InstitutionalStats:
   - Add early return: if (!enabled || (!latestResult && recognitionItems.length === 0)) return null;

3. In Home component, derive data before JSX return:
   const academicEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'academic_results')
     ?.isEnabled ?? true;
   const latestResult = (data?.academicResults ?? [])
     .sort((a, b) => b.year - a.year)[0] ?? null;
   const recognitionItems = (data?.achievements ?? [])
     .filter(a => a.achievementType !== 'sports')
     .sort((a, b) => b.year - a.year || a.displayOrder - b.displayOrder);

4. Pass to InstitutionalStats:
   Before: <InstitutionalStats />
   After:  <InstitutionalStats
             latestResult={latestResult}
             recognitionItems={recognitionItems}
             enabled={academicEnabled} />

5. LEFT side — replace hardcoded values:

   Before: <h3 ...>Board Results 2023</h3>
   After:  <h3 ...>Board Results {latestResult?.year ?? '—'}</h3>

   Before: <span ...>100%</span>   (Pass Percentage)
   After:  <span ...>{latestResult ? `${latestResult.passPercentage}%` : '—'}</span>

   Before: <span className="... text-signature-gold">84%</span>   (Distinctions)
   After:  <span className="... text-signature-gold">
             {latestResult ? `${latestResult.distinctions}%` : '—'}
           </span>

   Before: <span ...>96%</span>   (First Class)
   After:  <span ...>{latestResult ? `${latestResult.firstClass}%` : '—'}</span>

   Note: Premium currently has NO legacy quote — do NOT add one.
   Match the existing design which ends at the three stat rows.

6. RIGHT side — replace 2 hardcoded divs with dynamic map:

   Before: [2 hardcoded divs]

   After:  {recognitionItems.slice(0, 2).map((item, i) => (
             <div key={i} className="flex gap-12 group">
               <div className="flex flex-col items-center">
                 <span className="text-[10px] uppercase tracking-widest font-bold text-signature-gold mb-2">Year</span>
                 <span className="text-4xl font-serif text-signature-navy group-hover:text-signature-gold transition-colors">
                   {item.year}
                 </span>
                 {i < recognitionItems.slice(0, 2).length - 1 && (
                   <div className="w-px flex-grow bg-signature-navy/5 mt-4"></div>
                 )}
               </div>
               <div className="flex-grow pt-2">
                 <span className="inline-block bg-signature-gold/10 text-signature-gold text-[9px]
                                  font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                   {item.category}
                 </span>
                 <h4 className="text-2xl font-serif mb-4 text-signature-navy group-hover:text-signature-gold transition-colors">
                   {item.title}
                 </h4>
                 <p className="text-base text-gray-500 leading-loose">{item.description}</p>
               </div>
             </div>
           ))}
           Note: The vertical connector line (w-px flex-grow bg-signature-navy/5)
           only renders between items, not after the last one.

WHAT DOES NOT CHANGE:
  - The useIntersectionObserver animation
  - The left/right slide-in animation classes
  - The center divider line (absolute left-1/2 w-px)
  - The bg-[#F0F7FF] left panel color
  - The "Know more about our heritage" circular arrow button
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] InstitutionalStats accepts latestResult, recognitionItems, enabled props
  - [ ] Early return if not enabled AND both sides empty
  - [ ] Home derives latestResult from data.academicResults (latest year)
  - [ ] Home derives recognitionItems filtered achievementType !== 'sports'
  - [ ] Left: year shown as "Board Results {latestResult.year}"
  - [ ] Left: passPercentage displayed as "{value}%"
  - [ ] Left: distinctions displayed as "{value}%" in signature-gold
  - [ ] Left: firstClass displayed as "{value}%"
  - [ ] NO legacy quote added (premium doesn't have it)
  - [ ] Right: 2 hardcoded divs replaced with recognitionItems.slice(0,2).map
  - [ ] item.category used as gold badge text
  - [ ] item.year rendered as serif number
  - [ ] item.title and item.description rendered
  - [ ] Connector line only between items (not after last)
  - [ ] useIntersectionObserver animation preserved
  - [ ] Slide-in animation classes preserved
  - [ ] "Know more" link preserved
  - [ ] All CSS classes unchanged
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Academic Results Binding Report — template_premium

Files changed:
  src/templates/template_premium/app/page.tsx  InstitutionalStats reads from props

InstitutionalStats now accepts props:      YES
Left column — hardcoded stats replaced:    YES
Right column — hardcoded awards replaced:  YES → recognitionItems.slice(0,2)
Section gate (isEnabled):                 YES — sectionKey 'academic_results'
legacyQuote:                              NOT added (not in premium design)
item.category used as badge:              YES (gold rounded-full badge)
isVisible animation preserved:            YES
CSS changed:                              NO
Guardrails violated:                      NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
