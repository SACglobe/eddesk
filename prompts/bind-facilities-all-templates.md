# EdDesk — Bind Facilities (Campus Infrastructure) Section → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded infrastructure/facilities data in classic + modern,
#   and CREATE a new facilities section from scratch in premium.
#
# DATA SOURCE:
#   data.facilities[]  — flat array, each item:
#     name          → facility item name (e.g. "Smart Classrooms")
#     description   → facility description
#     categoryName  → grouping label (e.g. "Academics", "Sports", "Arts")
#     categoryId    → category grouping key
#
#   data.homepageSections[]  — gate entire section:
#     sectionKey === 'facilities' AND isEnabled → show section
#     isEnabled === false → hide entire section, render nothing
#
# DATA GROUPING (required by all templates):
#   Facilities are stored as flat items — templates display them by CATEGORY.
#   Derive category groups from the flat array:
#
#   const grouped = (data?.facilities ?? []).reduce((acc, f) => {
#     const key = f.categoryName;
#     if (!acc[key]) acc[key] = { categoryName: key, items: [] };
#     acc[key].items.push(f);
#     return acc;
#   }, {} as Record<string, { categoryName: string; items: typeof data.facilities }>);
#   const facilityGroups = Object.values(grouped);
#   // Each group: { categoryName: string, items: Array<{name, description, ...}> }
#
# SECTION GATE (same in all templates):
#   const facilitiesEnabled = (data?.homepageSections ?? [])
#     .find(s => s.sectionKey === 'facilities')
#     ?.isEnabled ?? true;
#   If false OR facilityGroups empty → render null
#
# ICON STRATEGY:
#   Classic: NO icons — text-only list (matches current design)
#   Modern:  Uses emoji icons in colored boxes. Map categoryName → emoji:
#     'Academics'   → '🔬'  color: 'bg-primary'
#     'Sports'      → '⚽'  color: 'bg-blue-600'
#     'Arts'        → '🎨'  color: 'bg-accent'
#     'Technology'  → '💻'  color: 'bg-primary'
#     'Wellness'    → '🏥'  color: 'bg-blue-600'
#     unknown       → '🏫'  color: 'bg-primary'
#   Premium: NO icons — uses gold underline SectionHeader pattern
#
# FIELDS DISPLAYED:
#   All templates: group.categoryName as column/card header
#   All templates: item.name as list bullet item
#   Classic + Premium: no description shown (list only)
#   Modern: no description shown (list only)
#   Description is NOT shown on homepage — it's for inner pages
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# RUN ORDER: Run each template prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind facilities → template_classic
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
HomeScreen.js reads MOCK_DATA.INFRASTRUCTURE with 3 hardcoded arrays:
  INFRASTRUCTURE.labs[]        → "Laboratories" column
  INFRASTRUCTURE.classrooms[]  → "Academic Areas" column
  INFRASTRUCTURE.playground[]  → "Physical Fitness" column

Each column renders: hardcoded <h3> header + bullet list of string items.
Layout: fixed 3-column grid (grid-cols-1 md:grid-cols-3).

Current structure: 3 separate hardcoded divs, each with different header.
New structure: dynamic map over facilityGroups.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
1. In index.tsx — derive facility data and pass to HomeScreen:

   const facilitiesEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'facilities')
     ?.isEnabled ?? true;

   const grouped = (data?.facilities ?? []).reduce((acc, f) => {
     const key = f.categoryName;
     if (!acc[key]) acc[key] = { categoryName: key, items: [] };
     acc[key].items.push(f);
     return acc;
   }, {});
   const facilityGroups = Object.values(grouped);

   Pass to HomeScreen:
   <HomeScreen data={data} ... facilitiesEnabled={facilitiesEnabled}
               facilityGroups={facilityGroups} />

2. HomeScreen.js — accept new props:
   Add: facilitiesEnabled, facilityGroups to props.

3. Remove INFRASTRUCTURE from MOCK_DATA destructure.
   Check if INFRASTRUCTURE is still used elsewhere in HomeScreen.js.
   INFRASTRUCTURE.campus_images is used by the gallery carousel below
   the facilities section — check line ~21. If still used there,
   keep INFRASTRUCTURE in the destructure but remove only the 3 column refs.
   If campus_images has already been replaced in a previous binding task,
   remove INFRASTRUCTURE entirely.

4. Replace the 3 hardcoded column divs with a dynamic map.

   Before:
     <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
       <div className="p-10 bg-white hover:bg-emerald-50 ...">
         <h3 ...>Laboratories</h3>
         <ul>{INFRASTRUCTURE.labs.map(item => <li>{item}</li>)}</ul>
       </div>
       <div ...>  {/* Academic Areas */}  </div>
       <div ...>  {/* Physical Fitness */}  </div>
     </div>

   After:
     <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
       {facilityGroups.map((group, idx) => (
         <div key={idx} className="p-10 bg-white hover:bg-emerald-50 transition-colors">
           <h3 className="font-bold text-lg mb-4 serif uppercase text-emerald-900">
             {group.categoryName}
           </h3>
           <ul className="space-y-3">
             {group.items.map((item, i) => (
               <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                 {item.name}
               </li>
             ))}
           </ul>
         </div>
       ))}
     </div>

5. Gate the entire facilities section:
   Before: <section className="py-24 bg-slate-50">
   After:  {facilitiesEnabled && facilityGroups.length > 0 && (
             <section className="py-24 bg-slate-50">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - Section heading "Campus Infrastructure"
  - The italic subtitle paragraph
  - All CSS classes on section, grid, and list items
  - The hover:bg-emerald-50 transition
  - The gallery carousel section below (untouched)

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] INFRASTRUCTURE.labs/classrooms/playground replaced
  - [ ] facilityGroups derived by grouping on categoryName
  - [ ] facilitiesEnabled gates section
  - [ ] Section hidden if facilityGroups empty
  - [ ] group.categoryName used as column header
  - [ ] item.name used as bullet text (not item as string)
  - [ ] Grid still renders dynamic number of columns
  - [ ] All CSS classes unchanged
  - [ ] Gallery carousel section NOT changed
  - [ ] No other section of HomeScreen.js changed

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Facilities Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx       groups facilities, passes to HomeScreen
  src/templates/template_classic/screens/HomeScreen.js  reads from facilityGroups prop

INFRASTRUCTURE.labs/classrooms removed:  YES
Data source:                             data.facilities[] grouped by categoryName
Section gate (isEnabled):                YES — sectionKey 'facilities'
Group header:                            group.categoryName
Item display:                            item.name
Gallery carousel untouched:              YES
CSS changed:                             NO
Guardrails violated:                     NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind facilities → template_modern
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
In page.tsx, hardcoded const infrastructureData = [...] at file top (lines ~74-91).
Item shape: { category, icon (emoji), items (string[]), color (bg-class) }
Each card: emoji icon in colored box + category heading + bullet list.
Layout: grid lg:grid-cols-3 gap-12, inside rounded-[3rem] white cards.

─────────────────────────────────────────────────────────────
PHASE 2 — Icon and color mapping
─────────────────────────────────────────────────────────────
Define inside Home component (after other derivations):

  const FACILITY_ICON_MAP: Record<string, { icon: string; color: string }> = {
    'Academics':   { icon: '🔬', color: 'bg-primary' },
    'Sports':      { icon: '⚽', color: 'bg-blue-600' },
    'Arts':        { icon: '🎨', color: 'bg-accent' },
    'Technology':  { icon: '💻', color: 'bg-primary' },
    'Wellness':    { icon: '🏥', color: 'bg-blue-600' },
  };
  const getFacilityMeta = (cat: string) =>
    FACILITY_ICON_MAP[cat] ?? { icon: '🏫', color: 'bg-primary' };

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
1. Remove hardcoded infrastructureData array from page.tsx file top.

2. Derive facility data inside Home component:
   const facilitiesEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'facilities')
     ?.isEnabled ?? true;

   const grouped = (data?.facilities ?? []).reduce((acc, f) => {
     const key = f.categoryName;
     if (!acc[key]) acc[key] = { categoryName: key, items: [] as typeof data.facilities };
     acc[key].items.push(f);
     return acc;
   }, {} as Record<string, { categoryName: string; items: typeof data.facilities }>);
   const facilityGroups = Object.values(grouped);

3. Add FACILITY_ICON_MAP and getFacilityMeta helper (from Phase 2).

4. Replace infrastructureData.map with facilityGroups.map:

   Before: {infrastructureData.map((zone, i) => (
             <div ...>
               <div className={`w-20 h-20 ${zone.color} ...`}>{zone.icon}</div>
               <h3 ...>{zone.category}</h3>
               {zone.items.map((item, idx) => <li ...>{item}</li>)}

   After:  {facilityGroups.map((group, i) => {
             const { icon, color } = getFacilityMeta(group.categoryName);
             return (
               <div key={i} ...>
                 <div className={`w-20 h-20 ${color} ...`}>{icon}</div>
                 <h3 ...>{group.categoryName}</h3>
                 {group.items.map((item, idx) => (
                   <li key={idx} ...>
                     <div className={`w-2.5 h-2.5 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-accent'} ...`}></div>
                     <span ...>{item.name}</span>
                   </li>
                 ))}
               </div>
             );
           })}

   Note: item was previously a string — now it's an object.
   Replace {item} with {item.name} in the list item span.

5. Gate the entire Campus highlights section:
   Before: <section className="max-w-7xl mx-auto px-4 py-24">
   After:  {facilitiesEnabled && facilityGroups.length > 0 && (
             <section className="max-w-7xl mx-auto px-4 py-24">
             ...
             </section>
           )}

WHAT DOES NOT CHANGE:
  - The rounded card design (rounded-[3rem])
  - The hover lift effect (group-hover:-translate-y-2)
  - The animated underline (w-12 h-1 group-hover:w-20)
  - The "Tour Campus Facilities" button and link
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] Hardcoded infrastructureData removed from file top
  - [ ] facilityGroups derived from data.facilities grouped by categoryName
  - [ ] facilitiesEnabled gates section
  - [ ] FACILITY_ICON_MAP and getFacilityMeta defined
  - [ ] group.categoryName used as card header
  - [ ] icon and color derived from getFacilityMeta
  - [ ] item.name used in list items (not item as string)
  - [ ] All CSS classes unchanged
  - [ ] "Tour Campus Facilities" link preserved
  - [ ] No other section of page.tsx changed

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Facilities Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx  reads from data.facilities

infrastructureData removed:       YES
Data source:                      data.facilities[] grouped by categoryName
Section gate (isEnabled):         YES — sectionKey 'facilities'
Icon/color mapping:               FACILITY_ICON_MAP by categoryName
Group header:                     group.categoryName
Item display:                     item.name
CSS changed:                      NO
Guardrails violated:              NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — CREATE facilities section → template_premium
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

Forbidden: data.ts, Shared.tsx, Navigation.tsx, any other file.

─────────────────────────────────────────────────────────────
PHASE 1 — Premium template design patterns (READ CAREFULLY)
─────────────────────────────────────────────────────────────
Before creating the section, understand the premium design system:

Spacing:      py-48 px-8, max-w-[1400px] mx-auto
Typography:   SectionHeader component (title + subtitle + gold underline)
              from '../components/Shared' — already imported
Colors:       bg-signature-ivory (section bg), bg-white (card bg)
              text-signature-navy, text-signature-gold
              border-signature-navy/5, border-signature-gold/30
Animation:    useIntersectionObserver from '../components/Shared'
              pattern: {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              style={{ transitionDelay: `${i * 200}ms` }}
Cards:        NO rounded corners — premium uses sharp/minimal edges
              Uses border-b border-signature-navy/10 for column separators
Buttons:      <Button variant="outline"> from Shared
Links:        import Link from 'next/link'

Pattern to match (from FacultyHighlights and AthleticExcellence):
  const MySection: React.FC<Props> = ({ data }) => {
    const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
    return (
      <section ref={containerRef} className="py-48 px-8 bg-signature-ivory ...">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader title="..." subtitle="..." />
          ...content...
        </div>
      </section>
    );
  };

─────────────────────────────────────────────────────────────
PHASE 2 — The new CampusFacilities component to create
─────────────────────────────────────────────────────────────
Create a new component in page.tsx named CampusFacilities.

Design: A grid of category columns, each with:
  - Gold category name header (uppercase, tracking-[0.4em], text-signature-gold)
  - Gold horizontal rule below header (w-full h-px bg-signature-gold/20)
  - List of facility names, each with a small gold dot + name text
  - Subtle animation on reveal
  - Border separators between columns (border-r last:border-0 border-signature-navy/10)

Full component to create:

```tsx
interface FacilityGroup {
  categoryName: string;
  items: Array<{ name: string; description: string }>;
}

interface CampusFacilitiesProps {
  facilityGroups: FacilityGroup[];
  facilitiesEnabled: boolean;
}

const CampusFacilities: React.FC<CampusFacilitiesProps> = ({ facilityGroups, facilitiesEnabled }) => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  if (!facilitiesEnabled || facilityGroups.length === 0) return null;

  return (
    <section ref={containerRef} className="py-48 px-8 bg-white border-b border-signature-navy/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <SectionHeader title="Campus Infrastructure" subtitle="Facilities & Learning Spaces" />
          <Link href="/infrastructure">
            <Button variant="outline">Tour The Campus</Button>
          </Link>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(facilityGroups.length, 4)} gap-0 border border-signature-navy/5`}>
          {facilityGroups.map((group, i) => (
            <div
              key={i}
              className={`
                px-12 py-16 border-r last:border-r-0 border-signature-navy/5
                transition-all duration-1000
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold mb-6">
                {group.categoryName}
              </p>
              <div className="w-full h-px bg-signature-gold/20 mb-10"></div>
              <ul className="space-y-6">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 group/item">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-signature-gold/60 flex-shrink-0
                                     group-hover/item:bg-signature-gold transition-colors"></span>
                    <span className="text-signature-navy/70 font-light leading-relaxed
                                     group-hover/item:text-signature-navy transition-colors">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

─────────────────────────────────────────────────────────────
PHASE 3 — Where to place it in the page
─────────────────────────────────────────────────────────────
In the Home component JSX, place CampusFacilities AFTER AthleticExcellence
and BEFORE UpcomingEvents. This matches the section ordering from sections[].

Before (existing order):
  <AthleticExcellence ... />
  <UpcomingEvents />
  ... (campus masterpiece, admissions CTA)

After:
  <AthleticExcellence ... />
  <CampusFacilities facilityGroups={facilityGroups} facilitiesEnabled={facilitiesEnabled} />
  <UpcomingEvents />
  ... (campus masterpiece, admissions CTA)

─────────────────────────────────────────────────────────────
PHASE 4 — Derive and pass data in Home
─────────────────────────────────────────────────────────────
In Home component, add these derivations alongside other section data:

  const facilitiesEnabled = (data?.homepageSections ?? [])
    .find(s => s.sectionKey === 'facilities')
    ?.isEnabled ?? true;

  const grouped = (data?.facilities ?? []).reduce((acc, f) => {
    const key = f.categoryName;
    if (!acc[key]) acc[key] = { categoryName: key, items: [] };
    acc[key].items.push(f);
    return acc;
  }, {} as Record<string, { categoryName: string; items: typeof data.facilities }>);
  const facilityGroups = Object.values(grouped);

─────────────────────────────────────────────────────────────
PHASE 5 — Validate
─────────────────────────────────────────────────────────────
  - [ ] CampusFacilities component created in page.tsx
  - [ ] Uses useIntersectionObserver for entry animation
  - [ ] Uses SectionHeader (already imported from Shared)
  - [ ] Uses Button variant="outline" and Link (already imported)
  - [ ] Returns null if facilitiesEnabled false OR facilityGroups empty
  - [ ] facilityGroups derived from data.facilities grouped by categoryName
  - [ ] group.categoryName as gold uppercase label
  - [ ] item.name as bullet list item
  - [ ] Placed after AthleticExcellence, before UpcomingEvents
  - [ ] No existing component modified (additive only)
  - [ ] Matches premium visual language (sharp edges, gold accents,
        signature-navy text, py-48 spacing)
  - [ ] data.ts not touched
  - [ ] No other file modified

─────────────────────────────────────────────────────────────
PHASE 6 — Report
─────────────────────────────────────────────────────────────
```
Facilities Binding Report — template_premium

Files changed:
  src/templates/template_premium/app/page.tsx   new CampusFacilities component created

Action:                           NEW COMPONENT — additive, nothing removed
Data source:                      data.facilities[] grouped by categoryName
Section gate (isEnabled):         YES — sectionKey 'facilities'
Placed after:                     AthleticExcellence
Placed before:                    UpcomingEvents
Design pattern:                   matches premium — py-48, SectionHeader,
                                  gold accents, intersection observer animation
Icons:                            NONE — premium uses minimal text-based design
Existing components changed:      NONE
CSS changed:                      N/A (new component)
Guardrails violated:              NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
