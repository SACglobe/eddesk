# EdDesk — Bind Campus Statistics (Stats Section) → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded statistics in all 3 templates with live data
#   from TenantViewModel.statistics[], gated by the sections array.
#
# DATA SOURCE:
#   data.statistics[]  — each item has:
#     label          → stat label text (e.g. "Students Enrolled")
#     value          → stat value string (e.g. "3,200+")
#     icon           → icon name string (e.g. 'users', 'graduation')
#     displayOrder   → sort order
#
#   data.homepageSections[]  — gate the entire section:
#     sectionKey === 'stats' and isEnabled === true → show section
#     isEnabled === false → hide entire stats section, render nothing
#
# SECTION GATE (same logic in all 3 templates):
#   const statsEnabled = (data?.homepageSections ?? [])
#     .find(s => s.sectionKey === 'stats')
#     ?.isEnabled ?? true;
#   const statistics = (data?.statistics ?? [])
#     .sort((a, b) => a.displayOrder - b.displayOrder);
#   If statsEnabled === false OR statistics is empty → render null
#
# ICON STRATEGY (differs per template — read carefully):
#   - template_classic: NO icons — only label + value. Skip icon entirely.
#   - template_modern:  Uses emoji strings. Map icon name → emoji.
#   - template_premium: Uses inline SVG. Map icon name → SVG JSX.
#
# ICON NAME → EMOJI MAP (for template_modern):
#   'users'      → '👥'
#   'graduation' → '🎓'
#   'calendar'   → '📅'
#   'map'        → '🏢'
#   'trophy'     → '🏆'
#   'network'    → '🌐'
#   unknown      → '📊'  (safe fallback)
#
# ICON NAME → SVG MAP (for template_premium):
#   Keep the same SVG icons already hardcoded in SchoolDashboard.
#   Map by position: statistics[0] → first SVG, statistics[1] → second, etc.
#   If more stats than SVGs → use a generic fallback SVG.
#   Reason: SVG icons are design elements, not data. The icon name from DB
#   is a hint only — the template's existing SVGs are the correct visual.
#
# VALUE HANDLING — CRITICAL:
#   Values from data are complete strings: "3,200+", "180+", "35+", "14 Acres"
#   Do NOT append an extra "+" — it's already in the value string.
#   Template_classic currently appends a hardcoded "+" in JSX:
#     {stat.value}<span>+</span>
#   This MUST be removed — the value already contains any suffix needed.
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind stats → template_classic
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
PHASE 1 — What the stats section currently does
─────────────────────────────────────────────────────────────
In HomeScreen.js:
  Reads: MOCK_DATA.STATISTICS[] → each item: { label, value }
  Renders: {stat.value}<span className="text-emerald-400">+</span>
           {stat.label}
  No icons in this template — text only.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive stats and pass to HomeScreen:

   const statsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'stats')
     ?.isEnabled ?? true;
   const statistics = (data?.statistics ?? [])
     .sort((a, b) => a.displayOrder - b.displayOrder);

   Pass both to HomeScreen:
   Before: <HomeScreen data={data} />
   After:  <HomeScreen data={data} statsEnabled={statsEnabled} statistics={statistics} />

2. In HomeScreen.js — accept new props:
   Before: const HomeScreen = ({ data }) => {
   After:  const HomeScreen = ({ data, statsEnabled, statistics }) => {

3. Replace STATISTICS read:
   Before: {STATISTICS.map((stat, idx) => (
   After:  {statistics.map((stat, idx) => (

4. Remove STATISTICS from MOCK_DATA destructure (if now unused).
   Do NOT remove MOCK_DATA — other sections still use it.

5. CRITICAL — Fix the hardcoded "+" suffix:
   Before: {stat.value}<span className="text-emerald-400">+</span>
   After:  {stat.value}
   Reason: values already include any suffix ("3,200+", "35+", "14 Acres")
   Appending "+" would produce "3,200++" which is wrong.

6. Gate the entire stats section:
   Before: <section className="py-20 bg-emerald-900 ...">
   After:  {statsEnabled && statistics.length > 0 && (
             <section className="py-20 bg-emerald-900 ...">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The green section background and layout
  - All CSS classes
  - The grid structure (grid-cols-2 md:grid-cols-4)
  - The label styling and border-top separator

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] STATISTICS removed from MOCK_DATA destructure
  - [ ] statistics prop accepted by HomeScreen
  - [ ] statistics sorted by displayOrder
  - [ ] statsEnabled gates the entire section
  - [ ] Section hidden if statsEnabled === false
  - [ ] Section hidden if statistics is empty
  - [ ] Hardcoded "+" span REMOVED from JSX
  - [ ] stat.value renders as-is (no suffix appended)
  - [ ] stat.label renders correctly
  - [ ] All CSS classes unchanged
  - [ ] No other section of HomeScreen.js changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Stats Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       derives stats, passes to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  reads from statistics prop

MOCK_DATA.STATISTICS removed:   YES
Data source:                    data.statistics[]
Section gate (isEnabled):       YES — sectionKey 'stats'
Sorted by displayOrder:         YES
Hardcoded "+" suffix removed:   YES (value already contains suffix)
Icons:                          N/A (classic has no icons)
CSS changed:                    NO
Other sections affected:        NONE
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind stats → template_modern
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

Forbidden: constants.tsx and all other files.

─────────────────────────────────────────────────────────────
PHASE 1 — What the stats section currently does
─────────────────────────────────────────────────────────────
In page.tsx:
  Reads: STATS[] from constants.tsx → each item: { label, value, icon }
  Icon is an emoji string (e.g. '🎓', '👨‍🏫', '🏢', '👥')
  Renders icon twice: once large/faded background, once in blue box
  Uses AnimatedNumber to count up to the numeric part of value
  parseStat() splits value string into { num, suffix }

─────────────────────────────────────────────────────────────
PHASE 2 — Icon mapping
─────────────────────────────────────────────────────────────
Define this map at the top of the Home component (after heroSlide/principal):

  const ICON_MAP: Record<string, string> = {
    users:      '👥',
    graduation: '🎓',
    calendar:   '📅',
    map:        '🏢',
    trophy:     '🏆',
    network:    '🌐',
  };
  const getIcon = (name: string) => ICON_MAP[name] ?? '📊';

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — pass data to Home if not already done.
   (Hero binding should have done this — verify before proceeding.)

2. Remove STATS from constants import in page.tsx:
   Before: import { SCHOOL_NAME, STATS, ACTIVITIES, UPCOMING_EVENTS } from '../constants';
   After:  import { SCHOOL_NAME, ACTIVITIES, UPCOMING_EVENTS } from '../constants';

3. Derive stats at the top of Home component:
   const statsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'stats')
     ?.isEnabled ?? true;
   const statistics = (data?.statistics ?? [])
     .sort((a, b) => a.displayOrder - b.displayOrder);

4. Add ICON_MAP and getIcon helper (from Phase 2 above).

5. Replace STATS.map with statistics.map:
   Before: {STATS.map((stat, i) => {
             const { num, suffix } = parseStat(stat.value);
   After:  {statistics.map((stat, i) => {
             const { num, suffix } = parseStat(stat.value);

6. Replace icon reference:
   Before: {stat.icon}  (used twice — background + box)
   After:  {getIcon(stat.icon)}  (both occurrences)

7. Gate the entire stats section:
   Before: <section className="bg-primary py-32 ...">
   After:  {statsEnabled && statistics.length > 0 && (
             <section className="bg-primary py-32 ...">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - AnimatedNumber component and parseStat function
  - The card layout with staggered rows (i % 2 !== 0 → translate-y-12)
  - The icon box (blue bg, rounded-3xl)
  - The faded background icon (opacity-[0.03])
  - The animated underline on hover
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] STATS import removed from constants
  - [ ] statistics derived from data.statistics
  - [ ] statsEnabled gates the entire section
  - [ ] ICON_MAP and getIcon helper defined
  - [ ] stat.icon replaced with getIcon(stat.icon) (both occurrences)
  - [ ] statistics sorted by displayOrder
  - [ ] AnimatedNumber still receives parsed num and suffix
  - [ ] stat.label renders correctly
  - [ ] Staggered card layout preserved
  - [ ] All CSS classes unchanged
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Stats Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  reads from data.statistics, icon map

STATS constant removed:         YES
Data source:                    data.statistics[]
Section gate (isEnabled):       YES — sectionKey 'stats'
Sorted by displayOrder:         YES
Icon strategy:                  ICON_MAP: icon name string → emoji
Icon fallback:                  '📊' for unknown icon names
AnimatedNumber preserved:       YES
CSS changed:                    NO
Other sections affected:        NONE
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind stats → template_premium
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
PHASE 1 — What the stats section currently does
─────────────────────────────────────────────────────────────
In page.tsx, SchoolDashboard component:
  const stats = [
    { label: "Successful Alumni", value: "8,500+", icon: (<svg...>) },
    { label: "Expert Faculty",    value: "150+",   icon: (<svg...>) },
    { label: "Campus Acres",      value: "25",     icon: (<svg...>) },
    { label: "Student Ratio",     value: "15:1",   icon: (<svg...>) },
  ];
  Stats are hardcoded inside the component.
  Icon is inline SVG JSX — not a string.
  SchoolDashboard receives no props.

─────────────────────────────────────────────────────────────
PHASE 2 — Icon strategy for premium
─────────────────────────────────────────────────────────────
The premium template uses detailed inline SVG icons.
These are design elements — they cannot come from a string name.

Strategy: Keep the existing SVGs, map them by icon name.

Define an SVG map inside SchoolDashboard:

  const SVG_ICON_MAP: Record<string, React.ReactNode> = {
    users: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    graduation: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    calendar: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    map: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    trophy: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    network: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };

  // Fallback SVG for unknown icon names
  const DEFAULT_SVG = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  const getSvgIcon = (name: string) => SVG_ICON_MAP[name] ?? DEFAULT_SVG;

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — pass data to Home if not already done.

2. SchoolDashboard must receive statistics and statsEnabled as props:
   Before: const SchoolDashboard: React.FC = () => {
   After:
     interface DashboardProps {
       statistics: Array<{ label: string; value: string; icon: string; displayOrder: number }>;
       statsEnabled: boolean;
     }
     const SchoolDashboard: React.FC<DashboardProps> = ({ statistics, statsEnabled }) => {

3. In the Home component, derive stats before the JSX return:
   const statsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'stats')
     ?.isEnabled ?? true;
   const statistics = (data?.statistics ?? [])
     .sort((a, b) => a.displayOrder - b.displayOrder);

4. Pass to SchoolDashboard in Home JSX:
   Before: <SchoolDashboard />
   After:  <SchoolDashboard statistics={statistics} statsEnabled={statsEnabled} />

5. Inside SchoolDashboard:
   - Remove the hardcoded const stats = [...] array entirely
   - Add SVG_ICON_MAP and getSvgIcon helper (from Phase 2)
   - Gate the section: if (!statsEnabled || statistics.length === 0) return null;
   - Replace stats.map with statistics.map:
     Before: {stats.map((stat, i) => (
               ...{stat.icon}...
               ...{stat.value}...
               ...{stat.label}...
     After:  {statistics.map((stat, i) => (
               ...{getSvgIcon(stat.icon)}...
               ...{stat.value}...
               ...{stat.label}...

WHAT DOES NOT CHANGE:
  - The isVisible / intersection observer animation
  - The grid layout (grid-cols-2 lg:grid-cols-4)
  - The border-r separator between columns
  - The gold label color (text-signature-gold)
  - The navy value color (text-signature-navy)
  - All CSS classes and Tailwind utilities
  - The delay-${i * 150} stagger animation

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hardcoded stats[] array removed from SchoolDashboard
  - [ ] SchoolDashboard accepts statistics and statsEnabled props
  - [ ] Home derives statistics from data.statistics
  - [ ] Home derives statsEnabled from data.homepageSections
  - [ ] statistics sorted by displayOrder
  - [ ] SVG_ICON_MAP defined with all 6 icon names
  - [ ] getSvgIcon fallback returns DEFAULT_SVG for unknown names
  - [ ] getSvgIcon(stat.icon) used in JSX
  - [ ] statsEnabled gates section (returns null if false)
  - [ ] Returns null if statistics is empty
  - [ ] stat.value renders as-is (no suffix appended)
  - [ ] stat.label renders correctly
  - [ ] isVisible animation preserved
  - [ ] All CSS classes unchanged
  - [ ] No other section of page.tsx changed
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Stats Binding Report — template_premium

Files changed:
  src/templates/template_premium/index.tsx      passes data to Home
  src/templates/template_premium/app/page.tsx   SchoolDashboard reads from props

Hardcoded stats[] removed:      YES
Data source:                    data.statistics[]
Section gate (isEnabled):       YES — sectionKey 'stats'
Sorted by displayOrder:         YES
Icon strategy:                  SVG_ICON_MAP: icon name → inline SVG JSX
Icon fallback:                  DEFAULT_SVG (trend/chart icon)
Value suffix:                   NOT appended — value used as-is
CSS changed:                    NO
Other sections affected:        NONE
Guardrails violated:            NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
