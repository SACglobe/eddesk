# EdDesk — Bind About Page → All 3 Templates
# ═══════════════════════════════════════════════════════════════
# PURPOSE:
#   Replace all hardcoded data in the About screens of all 3 templates
#   with live data from tenant.data.js via the data prop.
#   Also add SEO metadata for the about page.
#
# ARCHITECTURE FACTS (critical — read before starting):
#   - Renderer in each index.tsx receives: { data, path }
#   - data = demoSchoolData (SchoolContent shape from lib/constants/types.ts)
#   - AboutScreen/About is mounted via: case '/about': return <AboutScreen />;
#   - Currently none of the screens receive the data prop — they read MOCK_DATA
#     or schoolData directly. This must be fixed.
#   - Pattern: Renderer passes data → index mounts screen → screen reads props
#   - NO new ViewModel files needed — data is already in the data prop
#   - Templates are VIEW ONLY — only the 3 allowed files per template may change
#
# DATA AVAILABLE IN data PROP (demoSchoolData shape):
#   data.meta.schoolName          → school name
#   data.branding.logoUrl         → logo
#   data.contact.address/phone/email → contact info
#   data.visionMission.vision     → vision text
#   data.visionMission.mission    → mission text
#   data.meta.motto               → motto
#   data.principal.name           → principal name
#   data.principal.message        → principal message
#   data.principal.photoUrl       → principal photo
#   data.highlights[]             → { title, description } reasons cards
#   data.personnel[]              → array with person_type field
#     person_type === 'board'     → board members
#     person_type === 'faculty'   → faculty (used in modern management carousel)
#   data.announcements[] / data.broadcast[] → for section gating check
#
#   SECTION GATING via sections[] (if data.sections exists):
#   The about page shows/hides sections based on sections array.
#   Check: (data.sections ?? []).find(s => s.section_key === KEY)?.is_enabled ?? true
#   Keys to check: 'announcements', 'identity', 'principal'
#
# FIELDS USED PER TEMPLATE:
#   Classic:
#     - SCHOOL_PROFILE.school_overview → data.meta.schoolName context (or hardcoded prose)
#     - SCHOOL_PROFILE.school_name     → data.meta.schoolName
#     - SCHOOL_PROFILE.vision          → data.visionMission.vision
#     - SCHOOL_PROFILE.mission         → data.visionMission.mission
#     - SCHOOL_PROFILE.motto           → data.meta.motto
#     - LEADERSHIP.principal_image     → data.principal.photoUrl
#     - LEADERSHIP.principal_message   → data.principal.message
#     - LEADERSHIP.principal_name      → data.principal.name
#     - reasons[]                      → data.highlights[] (title + description)
#
#   Modern:
#     - SCHOOL_NAME                    → data.meta.schoolName
#     - Vision card                    → data.visionMission.vision
#     - Mission card                   → data.visionMission.mission
#     - Motto card                     → data.meta.motto
#     - Principal photo                → data.principal.photoUrl
#     - Principal message              → data.principal.message (3 paras, use full)
#     - Principal name                 → data.principal.name
#     - LEADERSHIP_MEMBERS[]           → data.personnel filter person_type === 'board'
#                                        fields: name, role/designation, image/photoUrl, bio
#     - Why Parents reasons            → data.highlights[]
#
#   Premium:
#     - schoolData.vision              → data.visionMission.vision
#     - schoolData.mission             → data.visionMission.mission
#     - schoolData.motto               → data.meta.motto
#     - schoolData.principalMessage.image → data.principal.photoUrl
#     - schoolData.principalMessage.text  → data.principal.message
#     - schoolData.principalMessage.name  → data.principal.name
#     - Why Parents hardcoded list     → data.highlights[]
#
# SECTION GATING (about page only):
#   - If sections.announcements is_enabled → show BroadcastTicker (already in layout)
#   - If sections.identity is_enabled false → hide Vision/Mission/Motto block
#   - If sections.principal is_enabled false → hide principal section
#   - If all hidden and data empty → show graceful empty state
#
# IMAGE SAFETY (Skill 21 applies):
#   principal.photoUrl may be empty string → show placeholder avatar
#   board member photoUrl may be empty → show placeholder
#   Placeholder: div with person's initial, bg-slate-200, same dimensions as img
#
# RUN ORDER: Run each PROMPT separately. ONE template at a time.
# ═══════════════════════════════════════════════════════════════


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind About screen → template_classic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-binding.md    (or section-data-binding.md)
  guardrails/skills/image-video-safety.md

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  src/templates/template_classic/index.tsx
  src/templates/template_classic/screens/AboutScreen.js

Forbidden: mockData.js, HomeScreen.js, Header.js, Footer.js, all others.

─────────────────────────────────────────────────────────────
PHASE 1 — Current state audit
─────────────────────────────────────────────────────────────
index.tsx currently:
  case '/about': return <AboutScreen />;    ← no data passed

AboutScreen.js currently:
  const { SCHOOL_PROFILE, LEADERSHIP } = MOCK_DATA;  ← direct mock read
  Reads: SCHOOL_PROFILE.school_overview, .school_name, .vision, .mission, .motto
  Reads: LEADERSHIP.principal_image, .principal_message, .principal_name
  Uses local `reasons` array (hardcoded 4 items)

─────────────────────────────────────────────────────────────
PHASE 2 — Plan
─────────────────────────────────────────────────────────────
1. In index.tsx — pass data to AboutScreen:
   Before: case '/about': return <AboutScreen />;
   After:  case '/about': return <AboutScreen data={data} />;

2. In AboutScreen.js — accept data prop and remove MOCK_DATA:

   Remove: import { MOCK_DATA } from '../constants/mockData';
   Remove: const { SCHOOL_PROFILE, LEADERSHIP } = MOCK_DATA;

   Add at top of component:
     const { data } = props;  // or destructure: ({ data })

   Derive section gates:
     const sections = data?.sections ?? [];
     const identityEnabled  = sections.find(s => s.section_key === 'identity')?.is_enabled ?? true;
     const principalEnabled = sections.find(s => s.section_key === 'principal')?.is_enabled ?? true;

   Derive display values:
     const schoolName      = data?.meta?.schoolName ?? 'Our School';
     const vision          = data?.visionMission?.vision ?? '';
     const mission         = data?.visionMission?.mission ?? '';
     const motto           = data?.meta?.motto ?? '';
     const principalPhoto  = data?.principal?.photoUrl ?? '';
     const principalMsg    = data?.principal?.message ?? '';
     const principalName   = data?.principal?.name ?? '';
     const highlights      = data?.highlights ?? [];

3. Replace SCHOOL_PROFILE references in JSX:

   "Our Heritage" section:
     {SCHOOL_PROFILE.school_overview}
     → Keep the prose paragraph as is (it's design copy about "our school").
       Only replace where school name is interpolated:
       Before: At {SCHOOL_PROFILE.school_name}, we believe...
       After:  At {schoolName}, we believe...

   Vision card (gate: identityEnabled):
     {SCHOOL_PROFILE.vision} → {vision}
     Wrap entire vision+mission+motto block:
     {identityEnabled && (
       <div className="space-y-8">
         ... vision card ...
         ... mission card ...
         ... motto card ...
       </div>
     )}

   Mission card:
     {SCHOOL_PROFILE.mission} → {mission}

   Motto card:
     {SCHOOL_PROFILE.motto} → {motto}

   "Why Parents Choose Us" section:
     Before: hardcoded reasons.map()
     After: highlights.length > 0 ? highlights.slice(0, 4).map((item, idx) => (
       <div key={idx} className="bg-white p-10 border border-slate-200 text-center
                                 hover:border-emerald-300 hover:shadow-xl transition-all group">
         <div className="w-12 h-12 bg-emerald-900 mx-auto mb-6 flex items-center
                         justify-center text-white font-bold group-hover:scale-110 transition-transform">
           {idx + 1}
         </div>
         <h4 className="font-bold text-slate-900 serif uppercase text-sm mb-4 tracking-tight">
           {item.title}
         </h4>
         <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest
                       group-hover:text-emerald-600 transition-colors">
           {item.description}
         </p>
       </div>
     )) : null

4. Replace LEADERSHIP references in JSX (gate: principalEnabled):

   Wrap entire principal section:
   {principalEnabled && (
     <section className="py-24 bg-white">
       ...
     </section>
   )}

   Principal image (Skill 21 — image safety):
   Before: <img src={LEADERSHIP.principal_image} alt="Principal" ... />
   After:
     {principalPhoto ? (
       <img src={principalPhoto} alt={principalName}
            className="w-full border border-slate-200 shadow-2xl rounded-sm
                       object-cover object-top" />
     ) : (
       <div className="w-full aspect-[4/5] bg-slate-100 border border-slate-200
                       flex items-center justify-center">
         <span className="text-6xl text-slate-400 font-bold">
           {principalName.charAt(0) || 'P'}
         </span>
       </div>
     )}

   Principal name:
     {LEADERSHIP.principal_name} → {principalName}

   Principal message:
     {LEADERSHIP.principal_message} → {principalMsg}

5. Remove the local `reasons` array declaration (now using highlights).

─────────────────────────────────────────────────────────────
PHASE 3 — SEO for about page (classic template)
─────────────────────────────────────────────────────────────
Classic uses layout.js (server component). Add metadata export:

FILE: src/templates/template_classic/app/about/page.js

Current: simply imports and returns <AboutScreen />
After: Add data passing AND SEO metadata export:

  Since this template uses the Renderer pattern (not standalone Next.js pages),
  the about page.js is ONLY used in standalone mode, not via demo route.
  Add basic static metadata for standalone use:

  export const metadata = {
    title: 'About Us',
    description: 'Learn about our school — our vision, mission, history, and leadership team.',
  };

  The Renderer (index.tsx) handles the actual rendering in demo/tenant mode.
  Dynamic metadata for demo/tenant is handled at the demo/tenant page.tsx level.

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] MOCK_DATA import removed from AboutScreen.js
  - [ ] data prop accepted: ({ data }) in AboutScreen
  - [ ] index.tsx: <AboutScreen data={data} /> (data passed)
  - [ ] schoolName from data.meta.schoolName
  - [ ] vision/mission/motto from data.visionMission + data.meta.motto
  - [ ] identityEnabled gates vision/mission/motto block
  - [ ] principalEnabled gates entire principal section
  - [ ] highlights.slice(0, 4) used for "Why Parents" cards
  - [ ] principalPhoto: object-cover + placeholder on empty
  - [ ] principalName, principalMsg from data
  - [ ] All CSS classes unchanged
  - [ ] No other screens touched

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
About Page Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx          data passed to AboutScreen
  src/templates/template_classic/screens/AboutScreen.js  data consumed

MOCK_DATA removed:              YES
Section gates:                  identity, principal
data.visionMission used:        YES
data.principal used:            YES
data.highlights used:           YES (4 cards max)
Image safety (Skill 21):        YES — placeholder on empty
CSS changed:                    NO
Other screens affected:         NONE
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind About page → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-binding.md
  guardrails/skills/image-video-safety.md

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  src/templates/template_modern/index.tsx
  src/templates/template_modern/app/about/page.tsx

Forbidden: constants.tsx, Navbar.tsx, Footer.tsx, all others.

─────────────────────────────────────────────────────────────
PHASE 1 — Current state audit
─────────────────────────────────────────────────────────────
index.tsx currently:
  case '/about': return <About />;    ← no data passed

about/page.tsx currently:
  import { SCHOOL_NAME } from '../../constants';
  Uses: SCHOOL_NAME in "As the Principal of {SCHOOL_NAME}..."
        and "At {SCHOOL_NAME}, our collective vision..."
  LEADERSHIP_MEMBERS = hardcoded array of 5 people
  Vision/Mission/Motto = fully hardcoded text
  Principal photo = hardcoded "school/image/principal.png"
  Principal name = hardcoded "Dr. Benjamin Franklin"
  Why Parents items = hardcoded inline array of 3

─────────────────────────────────────────────────────────────
PHASE 2 — Plan
─────────────────────────────────────────────────────────────
1. In index.tsx — pass data to About:
   Before: case '/about': return <About />;
   After:  case '/about': return <About data={data} />;

2. In about/page.tsx — accept data prop:

   Change component signature:
   Before: const About: React.FC = () => {
   After:  const About: React.FC<{ data?: any }> = ({ data }) => {

   Remove: import { SCHOOL_NAME } from '../../constants';

   Derive values at top of component:
     const sections        = data?.sections ?? [];
     const identityEnabled  = sections.find((s: any) => s.section_key === 'identity')?.is_enabled ?? true;
     const principalEnabled = sections.find((s: any) => s.section_key === 'principal')?.is_enabled ?? true;

     const schoolName      = data?.meta?.schoolName ?? 'Our School';
     const vision          = data?.visionMission?.vision ?? '';
     const mission         = data?.visionMission?.mission ?? '';
     const motto           = data?.meta?.motto ?? '';
     const principalPhoto  = data?.principal?.photoUrl ?? '';
     const principalMsg    = data?.principal?.message ?? '';
     const principalName   = data?.principal?.name ?? '';
     const highlights      = data?.highlights ?? [];

     // Board members for the management carousel
     const boardMembers = (data?.personnel ?? [])
       .filter((p: any) => p.person_type === 'board')
       .sort((a: any, b: any) => a.display_order - b.display_order);

     // Fallback: if no board members, show faculty (person_type === 'faculty')
     const managementTeam = boardMembers.length > 0
       ? boardMembers
       : (data?.personnel ?? []).filter((p: any) => p.person_type === 'faculty');

   Remove: const LEADERSHIP_MEMBERS = [...] hardcoded array

3. Replace hardcoded content in JSX:

   PHILOSOPHY SECTION (Vision/Mission/Motto) — gate: identityEnabled:
   Wrap the 3-card grid with:
   {identityEnabled && (
     <section className="max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-3 gap-8">
       {/* Vision card */}
       ... replace hardcoded vision text with {vision}
       {/* Mission card */}
       ... replace hardcoded mission text with {mission}
       {/* Motto card */}
       ... replace hardcoded motto text with {motto}
     </section>
   )}

   PRINCIPAL SECTION — gate: principalEnabled:
   Wrap with:
   {principalEnabled && (
     <section className="max-w-7xl mx-auto px-4 py-24 border-t border-gray-100">
       ...
     </section>
   )}

   Principal image (Skill 21):
   Before: <img src="school/image/principal.png" alt="Principal" ... />
   After:
     {principalPhoto ? (
       <img src={principalPhoto} alt={principalName}
            className="w-full h-full object-cover transition-transform
                       duration-700 group-hover:scale-105" />
     ) : (
       <div className="w-full h-full bg-primary/10 flex items-center justify-center">
         <span className="text-8xl text-primary/30 font-bold">
           {principalName.charAt(0) || 'P'}
         </span>
       </div>
     )}

   Principal name:
     "Dr. Benjamin Franklin" → {principalName}

   Principal message paragraphs:
     Before: 3 hardcoded <p> tags + "As the Principal of {SCHOOL_NAME}..."
     After: principalMsg is a single long string — render as one <p>:
       <p>{principalMsg}</p>
     Keep the surrounding 2 static <p> tags as design copy (no data replacement needed).
     Replace ONLY: "As the Principal of {SCHOOL_NAME}..."
     With:         "As the Principal of {schoolName}..."

   Board message section ("A Message from the Board"):
     "{SCHOOL_NAME}, our collective vision..." → "{schoolName}, our collective vision..."
     "The Governing Body" label → keep as is (design copy)
     "{SCHOOL_NAME}" at bottom → {schoolName}

   LEADERSHIP CAROUSEL — replace LEADERSHIP_MEMBERS.map with managementTeam.map:
   Before:
     {LEADERSHIP_MEMBERS.map((member, i) => (
       <img src={member.image} ... />
       <h3>{member.name}</h3>
       <p>{member.position}</p>
     ))}

   After:
     {managementTeam.map((member: any, i: number) => {
       const photo = member.photoUrl || member.image || '';
       const role  = member.designation || member.role || '';
       return (
         <div key={member.id || i} className="min-w-[300px] md:min-w-[420px] snap-center group">
           <div className="relative mb-8 overflow-hidden rounded-[4rem] aspect-[4/5]
                           shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
             {photo ? (
               <img src={photo} alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0
                               transition-all duration-1000 group-hover:scale-110" />
             ) : (
               <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                 <span className="text-6xl text-primary/30 font-bold">
                   {member.name?.charAt(0) || 'M'}
                 </span>
               </div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20
                             to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="absolute bottom-10 left-10 right-10 translate-y-6 opacity-0
                             group-hover:translate-y-0 group-hover:opacity-100
                             transition-all duration-500 delay-100">
               <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2">
                 Executive Profile
               </p>
               <p className="text-white text-sm leading-relaxed line-clamp-4 font-medium italic">
                 {member.bio}
               </p>
             </div>
           </div>
           <div className="text-center px-4">
             <h3 className="text-3xl font-bold text-primary mb-1 group-hover:text-blue-600
                            transition-colors font-playfair">{member.name}</h3>
             <p className="text-yellow-600 font-black uppercase tracking-[0.2em] text-xs">{role}</p>
           </div>
         </div>
       );
     })}

   WHY PARENTS SECTION — replace hardcoded 3-item inline array:
   Before: {[{ t: 'Personalized Learning', d: '...', i: '✨' }, ...].map(...)}
   After: use highlights.slice(0, 3) (or fall back to 3 hardcoded items if empty):
     {(highlights.length > 0
       ? highlights.slice(0, 3).map((item: any, i: number) => ({
           t: item.title, d: item.description, i: ['✨', '🌍', '🛡️'][i] ?? '⭐'
         }))
       : [
           { t: 'Personalized Learning', d: 'Small class ratios ensuring every child gets the attention they deserve.', i: '✨' },
           { t: 'Global Perspectives', d: 'Curriculum designed to make students comfortable anywhere in the world.', i: '🌍' },
           { t: 'Safety First', d: 'A secure campus with 24/7 monitoring and a nurturing environment.', i: '🛡️' },
         ]
     ).map((item, i) => (
       <div key={i} className="flex gap-8 group">
         <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center
                         justify-center text-3xl shadow-sm group-hover:bg-accent
                         transition-colors shrink-0">{item.i}</div>
         <div className="space-y-2">
           <h4 className="text-2xl font-bold text-primary font-playfair">{item.t}</h4>
           <p className="text-gray-500 leading-relaxed text-lg">{item.d}</p>
         </div>
       </div>
     ))}

─────────────────────────────────────────────────────────────
PHASE 3 — SEO metadata for about page
─────────────────────────────────────────────────────────────
Modern uses layout.tsx with static metadata.
For about page, since schoolName is only available at runtime via data prop,
add a static fallback metadata export that works for standalone mode:

In about/page.tsx (at the top, NOT inside the component):

  // Note: Dynamic title is set by the Renderer's parent page.tsx
  // This metadata is only used in standalone (direct Next.js) mode
  export const metadata = {
    title: 'About Us | Our School',
    description: 'Discover our vision, mission, and the leadership team driving academic excellence.',
  };

  (This does NOT conflict with Renderer mode — the Renderer ignores Next.js metadata.)

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] SCHOOL_NAME import removed from about/page.tsx
  - [ ] LEADERSHIP_MEMBERS array removed
  - [ ] data prop accepted by About component
  - [ ] index.tsx: <About data={data} />
  - [ ] vision/mission/motto from data.visionMission + data.meta.motto
  - [ ] identityEnabled gates philosophy section
  - [ ] principalEnabled gates principal section
  - [ ] Principal photo: object-cover + initial placeholder on empty
  - [ ] Principal name, message from data
  - [ ] schoolName used in board message section
  - [ ] managementTeam derived from data.personnel (board → faculty fallback)
  - [ ] managementTeam.map replaces LEADERSHIP_MEMBERS.map
  - [ ] board member photo: placeholder on empty
  - [ ] highlights.slice(0, 3) used for "Why Parents" with emoji fallback
  - [ ] metadata export added (static)
  - [ ] All CSS classes unchanged (especially rounded-[4rem], aspect-[4/5])
  - [ ] scrollRef and scrollRight function preserved
  - [ ] Guardrails not violated

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
About Page Binding Report — template_modern

Files changed:
  src/templates/template_modern/index.tsx        data passed to About
  src/templates/template_modern/app/about/page.tsx  data consumed

SCHOOL_NAME import removed:     YES
LEADERSHIP_MEMBERS removed:     YES → managementTeam from data.personnel
Section gates:                  identity (philosophy), principal
data.visionMission used:        YES
data.principal used:            YES
managementTeam:                 board members → faculty fallback
highlights used:                YES (3 items, emoji fallback)
Image safety (Skill 21):        YES — all 3 image groups guarded
CSS changed:                    NO
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind About page → template_premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-binding.md
  guardrails/skills/image-video-safety.md

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY these 2):
  src/templates/template_premium/index.tsx
  src/templates/template_premium/app/about/page.tsx

Forbidden: data.ts, Navigation.tsx, LayoutWrapper.tsx, Shared.tsx, all others.

─────────────────────────────────────────────────────────────
PHASE 1 — Current state audit
─────────────────────────────────────────────────────────────
index.tsx currently:
  case '/about': return <About />;    ← no data passed

about/page.tsx currently:
  import { schoolData } from '../../data';
  Reads: schoolData.vision, .mission, .motto
         schoolData.principalMessage.image, .text, .name
         hardcoded "Why Parents" list of 4 items

─────────────────────────────────────────────────────────────
PHASE 2 — Plan
─────────────────────────────────────────────────────────────
1. In index.tsx — pass data to About:
   Before: case '/about': return <About />;
   After:  case '/about': return <About data={data} />;

2. In about/page.tsx — accept data prop and remove schoolData import:

   Remove: import { schoolData } from '../../data';

   Change function signature:
   Before: export default function About() {
   After:  export default function About({ data }: { data?: any }) {

   Derive values at top of function:
     const sections        = data?.sections ?? [];
     const identityEnabled  = sections.find((s: any) => s.section_key === 'identity')?.is_enabled ?? true;
     const principalEnabled = sections.find((s: any) => s.section_key === 'principal')?.is_enabled ?? true;

     const vision         = data?.visionMission?.vision ?? '';
     const mission        = data?.visionMission?.mission ?? '';
     const motto          = data?.meta?.motto ?? '';
     const principalPhoto = data?.principal?.photoUrl ?? '';
     const principalMsg   = data?.principal?.message ?? '';
     const principalName  = data?.principal?.name ?? '';
     const highlights     = data?.highlights ?? [];

3. Replace schoolData references in JSX:

   VISION card:
     {schoolData.vision} → {vision}
   MISSION card:
     {schoolData.mission} → {mission}
   MOTTO card:
     {schoolData.motto} → {motto}

   Wrap the 3-card grid with identityEnabled gate:
   {identityEnabled && (
     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
       ... vision, mission, motto cards ...
     </div>
   )}

   PRINCIPAL SECTION — gate: principalEnabled:
   Wrap entire <section className="mb-40 grid..."> with:
   {principalEnabled && (
     <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
       ...
     </section>
   )}

   Principal image (Skill 21 — image safety):
   Before: <img src={schoolData.principalMessage.image} className="w-full aspect-[4/5] object-cover ..." />
   After:
     {principalPhoto ? (
       <img src={principalPhoto}
            className="w-full aspect-[4/5] object-cover grayscale
                       border border-signature-navy/10 shadow-2xl" alt={principalName} />
     ) : (
       <div className="w-full aspect-[4/5] bg-signature-navy/5 border
                       border-signature-navy/10 shadow-2xl flex items-center justify-center">
         <span className="text-8xl font-serif text-signature-navy/20">
           {principalName.charAt(0) || 'P'}
         </span>
       </div>
     )}

   Principal name (in the gold badge block):
   Before: {schoolData.principalMessage.name}
   After:  {principalName}

   Principal quote (the large italic bordered paragraph):
   Before: "{schoolData.principalMessage.text}"
   After:  "{principalMsg}"

   WHY PARENTS SECTION — replace hardcoded 4-item array:
   The section has a hardcoded inline array:
   [{t: "Rigorous Standards", d: "..."}, ...]

   Replace with:
   {(highlights.length > 0
     ? highlights.slice(0, 4).map((item: any) => ({
         t: item.title, d: item.description
       }))
     : [
         { t: "Rigorous Standards", d: "Academic excellence is not a target, it's our institutional baseline, maintained through constant faculty development." },
         { t: "Individual Attention", d: "Our low student-to-teacher ratio ensures no spark of brilliance is overlooked in the crowd." },
         { t: "Global Network", d: "Our alumni occupy influential positions in diverse sectors across six continents, providing an unmatched network." },
         { t: "Ethical Core", d: "Character development and ethical reasoning are central pillars of our holistic curriculum from year one." },
       ]
   ).map((item, i) => (
     <div key={i} className="group">
       <div className="w-8 h-px bg-signature-gold mb-6 group-hover:w-16 transition-all duration-500" />
       <h4 className="text-2xl font-serif mb-4">{item.t}</h4>
       <p className="text-white/50 text-base font-light leading-relaxed">{item.d}</p>
     </div>
   ))}

   IMPORTANT: schoolData import removed means the schoolData.boardMessage section
   that was in page.tsx (if present) must also be replaced or removed.
   Check: if premium about page has a board message section reading schoolData.boardMessage
   → derive separately:
     const boardMessage = data?.boardMessage?.text ?? '';
   → replace schoolData.boardMessage.text with boardMessage
   → if boardMessage is empty AND no field → hide that section or show nothing

─────────────────────────────────────────────────────────────
PHASE 3 — SEO metadata
─────────────────────────────────────────────────────────────
In about/page.tsx, before the function, add:

  // Static metadata — used only in standalone Next.js mode
  // Dynamic metadata is handled at the demo/tenant page.tsx level
  export const metadata = {
    title: 'About | Our Institution',
    description: 'Our vision, mission, heritage, and the people who make it extraordinary.',
  };

  Note: Premium layout.tsx already has static metadata. This page-level
  export will override it for the /about route in standalone mode.

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] schoolData import removed from about/page.tsx
  - [ ] data prop accepted: ({ data }: { data?: any })
  - [ ] index.tsx: <About data={data} />
  - [ ] vision, mission, motto from data.visionMission + data.meta
  - [ ] identityEnabled gates the 3-card vision/mission/motto grid
  - [ ] principalEnabled gates the principal grid section
  - [ ] Principal image: Skill 21 pattern (aspect-[4/5] preserved)
  - [ ] principalName in gold badge
  - [ ] principalMsg in bordered quote
  - [ ] highlights.slice(0, 4) for Why Parents (4 items, hardcoded fallback)
  - [ ] schoolData.boardMessage handled (derived or section removed)
  - [ ] No CSS classes changed (signature-gold, signature-navy, font-serif preserved)
  - [ ] LayoutWrapper still wraps content (not changed)
  - [ ] metadata export added
  - [ ] data.ts NOT touched
  - [ ] Guardrails not violated

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
About Page Binding Report — template_premium

Files changed:
  src/templates/template_premium/index.tsx        data passed to About
  src/templates/template_premium/app/about/page.tsx  data consumed

schoolData import removed:      YES
Section gates:                  identity (3-card grid), principal (section)
data.visionMission used:        YES
data.principal used:            YES
Image safety (Skill 21):        YES — aspect-[4/5] preserved, initial placeholder
highlights.slice(0, 4) used:    YES (hardcoded fallback if empty)
boardMessage:                   derived or section gated
metadata export:                YES (static, standalone only)
data.ts NOT touched:            YES
CSS changed:                    NO
Guardrails violated:            NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SEO ADDENDUM — About page metadata strategy (all templates)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The about page is an inner page. SEO is handled at TWO levels:

LEVEL 1 — Static metadata in each template's about/page.tsx:
  export const metadata = { title: 'About Us', description: '...' }
  Only used when templates run in standalone Next.js mode (not via Renderer).
  Already covered in PHASE 3 of each prompt above.

LEVEL 2 — Dynamic metadata in demo/[templateSlug]/[[...path]]/page.tsx:
  When path === '/about', the top-level page.tsx can export:

  export async function generateMetadata({ params }):
    const schoolName = demoSchoolData.meta.schoolName;
    return {
      title:       `About Us | ${schoolName}`,
      description: `Learn about ${schoolName} — our vision, mission, history, and leadership.`,
      openGraph: {
        title:       `About | ${schoolName}`,
        description: `Discover the story behind ${schoolName}.`,
      }
    };

  This is the metadata Google actually sees for demo routes.
  It is NOT part of the template modification — it belongs in
  src/app/demo/[templateSlug]/[[...path]]/page.tsx.
  Handle this as a separate task: "add about-page metadata to demo page.tsx".

JSON-LD for about page (append to existing JSON-LD in demo/tenant page.tsx):
  When path includes '/about', add AboutPage schema:
  {
    "@type": "AboutPage",
    "@id": "{siteUrl}/about",
    "url": "{siteUrl}/about",
    "name": "About | {schoolName}",
    "isPartOf": { "@id": "{siteUrl}" }
  }

  This structured data signals to Google that /about is an institutional about page,
  eligible for rich snippets (sitelinks, knowledge panel).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
