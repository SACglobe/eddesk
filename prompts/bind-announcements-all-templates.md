# EdDesk — Bind Announcements Broadcast Ticker → All 3 Templates
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Replace hardcoded broadcast ticker data in all 3 templates with
#   live announcements from TenantViewModel, with two conditions:
#
#   CONDITION 1 — Section gate:
#     data.homepageSections → find sectionKey === 'announcements'
#     if isEnabled === false → hide entire ticker, render nothing
#
#   CONDITION 2 — Announcement filter (apply both):
#     a.isActive === true
#     AND (a.expiresAt === null OR new Date(a.expiresAt) > new Date())
#
# POSITION (DO NOT CHANGE):
#   template_classic  → BroadcastTicker.js  → above hero (in index.tsx layout)
#   template_modern   → sticky section in page.tsx → below hero slider
#   template_premium  → BroadcastBar in Navigation.tsx → above hero
#
# DATA SHAPE from TenantViewModel:
#   data.announcements[]:
#     title      → announcement heading (bold prefix)
#     message    → announcement body text
#     isActive   → boolean
#     expiresAt  → ISO string or null
#
# PREREQUISITE: unify-data-shape.md must be completed first.
# RUN ORDER: Run each prompt separately, one at a time.
# ─────────────────────────────────────────────────────────────────────


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHARED FILTER LOGIC — use identically in all three templates
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Paste this exact logic wherever announcements are derived:

  // Section gate — check if announcements section is enabled
  const announcementsEnabled = (data?.homepageSections ?? [])
    .find(s => s.sectionKey === 'announcements')
    ?.isEnabled ?? true;

  // Filter — active and not expired
  const now = new Date();
  const activeAnnouncements = (data?.announcements ?? []).filter(a =>
    a.isActive &&
    (a.expiresAt == null || new Date(a.expiresAt) > now)
  );

If announcementsEnabled is false → render null (hide ticker entirely)
If activeAnnouncements is empty  → render null (nothing to show)
Otherwise → render the ticker with activeAnnouncements


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT A — Bind announcements → template_classic
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
  - src/templates/template_classic/components/BroadcastTicker.js

Forbidden: ALL other files including HomeScreen.js, mockData.js.

─────────────────────────────────────────────────────────────
PHASE 1 — What the ticker currently does
─────────────────────────────────────────────────────────────
BroadcastTicker.js:
  - Imports MOCK_DATA from constants/mockData
  - Reads: MOCK_DATA.BROADCAST.announcements.slice(0, 3)
  - Each item shape: { title, description }
  - Renders: "{news.title}: {news.description}" in marquee
  - Duplicates the array once for seamless loop

index.tsx:
  - Always renders <BroadcastTicker /> above <main>
  - BroadcastTicker receives no props currently

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
Two files need changes:

1. index.tsx — pass data to BroadcastTicker and gate it:

   Before:
     <BroadcastTicker />

   After:
     Derive filter at the top of Renderer:
       const announcementsEnabled = (data?.homepageSections ?? [])
         .find(s => s.sectionKey === 'announcements')
         ?.isEnabled ?? true;
       const now = new Date();
       const activeAnnouncements = (data?.announcements ?? []).filter(a =>
         a.isActive &&
         (a.expiresAt == null || new Date(a.expiresAt) > now)
       );

     Then conditionally render:
       {announcementsEnabled && activeAnnouncements.length > 0 && (
         <BroadcastTicker announcements={activeAnnouncements} />
       )}

2. BroadcastTicker.js — accept announcements prop, remove MOCK_DATA:

   Before:
     import { MOCK_DATA } from '../constants/mockData';
     const BroadcastTicker = () => {
       const { BROADCAST } = MOCK_DATA;
       const tickerNews = BROADCAST.announcements.slice(0, 3);

   After:
     const BroadcastTicker = ({ announcements }) => {
       const tickerNews = announcements;   // already filtered in index.tsx

   Replace item field mapping:
     Before: {news.title}: {news.description}
     After:  {news.title}: {news.message}

   The duplicate array for seamless marquee — keep exactly as is:
     {tickerNews.map((news, idx) => (...))}   ← first copy
     {tickerNews.map((news, idx) => (...))}   ← second copy (already exists)

WHAT DOES NOT CHANGE:
  - The marquee animation and CSS classes
  - The green dot separator (bg-emerald-400)
  - The section styling (bg-emerald-900, text-white)
  - The text styling classes
  - The position (above hero in index.tsx layout)

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] BroadcastTicker no longer imports MOCK_DATA
  - [ ] BroadcastTicker accepts announcements prop
  - [ ] news.description replaced with news.message
  - [ ] Ticker hidden if announcementsEnabled === false
  - [ ] Ticker hidden if activeAnnouncements is empty
  - [ ] Expiry filter applied (expiresAt > now)
  - [ ] isActive filter applied
  - [ ] Marquee duplicate pattern preserved
  - [ ] All CSS classes unchanged
  - [ ] No other file modified

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Announcements Binding Report — template_classic

Files changed:
  src/templates/template_classic/index.tsx          gated ticker, passes announcements
  src/templates/template_classic/components/BroadcastTicker.js  reads from prop

MOCK_DATA.BROADCAST removed:    YES
Data source:                    data.announcements[]
Section gate (isEnabled):       YES
Active filter:                  YES
Expiry filter:                  YES
Ticker hidden when empty:       YES
CSS changed:                    NO
Guardrails violated:            NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT B — Bind announcements → template_modern
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first:
  guardrails/guardrails.md
  guardrails/skills/template-data-injection.md
  src/core/viewmodels/tenant.viewmodel.ts

─────────────────────────────────────────────────────────────
PHASE 0 — Declare scope
─────────────────────────────────────────────────────────────
Allowed files (ONLY this 1):
  - src/templates/template_modern/app/page.tsx

Forbidden: constants.tsx, HeroSlider.tsx, any other file.

─────────────────────────────────────────────────────────────
PHASE 1 — What the ticker currently does
─────────────────────────────────────────────────────────────
In page.tsx, inside the Home component:

  const broadcastNews = ANNOUNCEMENTS.slice(0, 3);

  Renders a sticky section BELOW HeroSlider:
    <section className="sticky top-20 z-40 ...">
      ...
      {[...broadcastNews, ...broadcastNews, ...broadcastNews].map((news, idx) => (
        <span>{news.title}: {news.content}</span>
      ))}
    </section>

  Item shape from ANNOUNCEMENTS constant: { id, title, content }
  The array is tripled (x3) for the seamless marquee loop.

─────────────────────────────────────────────────────────────
PHASE 2 — Plan the changes
─────────────────────────────────────────────────────────────
Only page.tsx needs changes:

1. Remove ANNOUNCEMENTS from the constants import:
   Before: import { SCHOOL_NAME, STATS, ACTIVITIES, UPCOMING_EVENTS, ANNOUNCEMENTS } from '../constants';
   After:  import { SCHOOL_NAME, STATS, ACTIVITIES, UPCOMING_EVENTS } from '../constants';

2. Derive announcements from data prop at top of Home component
   (after heroSlide and principal derivations):

   const announcementsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'announcements')
     ?.isEnabled ?? true;
   const now = new Date();
   const activeAnnouncements = (data?.announcements ?? []).filter(a =>
     a.isActive &&
     (a.expiresAt == null || new Date(a.expiresAt) > now)
   );

3. Replace broadcastNews derivation:
   Before: const broadcastNews = ANNOUNCEMENTS.slice(0, 3);
   After:  (removed — activeAnnouncements used directly)

4. Gate the entire broadcast section:
   Before: <section className="sticky top-20 z-40 ...">
   After:  {announcementsEnabled && activeAnnouncements.length > 0 && (
             <section className="sticky top-20 z-40 ...">

5. Replace field mapping inside the marquee:
   Before: {news.title}: {news.content}
   After:  {news.title}: {news.message}

6. Replace broadcastNews reference:
   Before: [...broadcastNews, ...broadcastNews, ...broadcastNews]
   After:  [...activeAnnouncements, ...activeAnnouncements, ...activeAnnouncements]

   The triple spread is intentional for seamless marquee — keep it.

WHAT DOES NOT CHANGE:
  - The sticky positioning and z-index
  - The yellow/accent background styling
  - The "BROADCAST" label on the left with pulsing red dot
  - The marquee animation class
  - The blue dot separator between items
  - The section's position (below HeroSlider)
  - All CSS classes

─────────────────────────────────────────────────────────────
PHASE 3 — Validate
─────────────────────────────────────────────────────────────
  - [ ] ANNOUNCEMENTS import removed from constants
  - [ ] activeAnnouncements derived from data.announcements
  - [ ] Section gate: hidden if announcementsEnabled === false
  - [ ] Hidden if activeAnnouncements is empty
  - [ ] news.content replaced with news.message
  - [ ] Triple spread preserved for seamless loop
  - [ ] Sticky section position unchanged (below HeroSlider)
  - [ ] All CSS classes unchanged
  - [ ] No other file modified

─────────────────────────────────────────────────────────────
PHASE 4 — Report
─────────────────────────────────────────────────────────────
```
Announcements Binding Report — template_modern

Files changed:
  src/templates/template_modern/app/page.tsx

ANNOUNCEMENTS constant removed:  YES
Data source:                     data.announcements[]
Section gate (isEnabled):        YES
Active filter:                   YES
Expiry filter:                   YES
Ticker hidden when empty:        YES
Position preserved:              YES (below HeroSlider)
CSS changed:                     NO
Guardrails violated:             NONE
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT C — Bind announcements → template_premium
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
  - src/templates/template_premium/components/Navigation.tsx

Forbidden: data.ts, app/page.tsx, Shared.tsx.

─────────────────────────────────────────────────────────────
PHASE 1 — What the ticker currently does
─────────────────────────────────────────────────────────────
In Navigation.tsx, BroadcastBar component:

  const announcements = [...schoolData.broadcast, ...schoolData.broadcast];

  Renders a pill-shaped floating bar ABOVE the hero:
    - Reads schoolData.broadcast[] from data.ts (internal template data)
    - Item shape: { type, title, content }
    - Shows "Notice" badge if item.type === 'announcement'
    - Shows item.title bold + item.content beside it
    - Duplicates array once for seamless loop

BroadcastBar is rendered inside the Header component in Navigation.tsx,
placing it visually above the hero section on the page.

─────────────────────────────────────────────────────────────
PHASE 2 — The challenge: Navigation.tsx has no data prop
─────────────────────────────────────────────────────────────
Navigation.tsx currently imports schoolData directly from data.ts.
It receives no props from Renderer or from page.tsx.

The clean solution: pass announcements via a React Context.

BUT — adding a context is a significant change.

SIMPLER solution that stays within guardrails:
  Pass announcements as a prop to BroadcastBar from index.tsx,
  and thread it through Header → BroadcastBar.

Read Navigation.tsx to understand how Header renders BroadcastBar.
Then plan the prop threading:
  index.tsx → passes announcements[] to Header
  Header    → passes announcements[] to BroadcastBar
  BroadcastBar → uses announcements[] instead of schoolData.broadcast

─────────────────────────────────────────────────────────────
PHASE 3 — Plan the changes
─────────────────────────────────────────────────────────────
Changes to index.tsx:

1. Derive filtered announcements in Renderer:
   const announcementsEnabled = (data?.homepageSections ?? [])
     .find(s => s.sectionKey === 'announcements')
     ?.isEnabled ?? true;
   const now = new Date();
   const activeAnnouncements = announcementsEnabled
     ? (data?.announcements ?? []).filter(a =>
         a.isActive &&
         (a.expiresAt == null || new Date(a.expiresAt) > now)
       )
     : [];

2. Pass to Header:
   Before: <Header />
   After:  <Header announcements={activeAnnouncements} />

Changes to Navigation.tsx:

3. Header component — accept and pass down announcements:
   Before: const Header: React.FC = () => {
   After:  interface HeaderProps { announcements: Array<{ title: string; message: string; isActive: boolean; expiresAt: string | null }> }
           const Header: React.FC<HeaderProps> = ({ announcements }) => {

   Pass to BroadcastBar:
   Before: <BroadcastBar />
   After:  <BroadcastBar announcements={announcements} />

4. BroadcastBar — accept announcements prop, remove schoolData:
   Before:
     const BroadcastBar: React.FC = () => {
       const announcements = [...schoolData.broadcast, ...schoolData.broadcast];

   After:
     interface BroadcastBarProps { announcements: Array<{ title: string; message: string }> }
     const BroadcastBar: React.FC<BroadcastBarProps> = ({ announcements: items }) => {
       if (items.length === 0) return null;
       const announcements = [...items, ...items];   // duplicate for seamless loop

5. Replace field mapping in the marquee:
   Before: item.type === 'announcement' → shows "Notice" badge
           item.title  → bold heading
           item.content → body text

   After:  always show "Notice" badge (all items from announcements table are notices)
           item.title   → bold heading
           item.message → body text (was: item.content)

6. Remove schoolData import from Navigation.tsx if it is now unused.
   Check all other uses of schoolData in Navigation.tsx first.
   If Header or Footer still use schoolData for other data, keep the import.

WHAT DOES NOT CHANGE:
  - The pill-shaped BroadcastBar design
  - All CSS classes (backdrop-blur, rounded-[24px], etc.)
  - The gold star separator (✦)
  - The "Notice" badge styling
  - The marquee animation
  - The position (inside Header, above hero)
  - Footer component

─────────────────────────────────────────────────────────────
PHASE 4 — Validate
─────────────────────────────────────────────────────────────
  - [ ] BroadcastBar no longer imports schoolData
  - [ ] BroadcastBar accepts announcements prop
  - [ ] BroadcastBar returns null if announcements is empty
  - [ ] Header accepts announcements prop and passes to BroadcastBar
  - [ ] index.tsx passes activeAnnouncements to Header
  - [ ] Section gate applied (announcementsEnabled)
  - [ ] isActive filter applied
  - [ ] Expiry filter applied
  - [ ] item.content replaced with item.message
  - [ ] Duplicate array pattern preserved (x2 for seamless loop)
  - [ ] All CSS classes unchanged
  - [ ] No other section of Navigation.tsx changed
  - [ ] data.ts not touched

─────────────────────────────────────────────────────────────
PHASE 5 — Report
─────────────────────────────────────────────────────────────
```
Announcements Binding Report — template_premium

Files changed:
  src/templates/template_premium/index.tsx             derives and passes announcements
  src/templates/template_premium/components/Navigation.tsx  Header + BroadcastBar accept prop

schoolData.broadcast removed:   YES
Data source:                    data.announcements[]
Section gate (isEnabled):       YES
Active filter:                  YES
Expiry filter:                  YES
BroadcastBar hidden when empty: YES (returns null)
Position preserved:             YES (inside Header, above hero)
CSS changed:                    NO
Guardrails violated:            NONE
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
