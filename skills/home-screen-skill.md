# EdDesk — Home Screen Binding
# Skill + Guardrails + Prompt
# Version: 1.0 — Reusable for all templates
#
# HOW TO USE THIS FILE
# ────────────────────
# 1. Copy SECTION 3 (the prompt) and give it to the AI agent
# 2. Replace {TEMPLATE_ID} with: template_classic | template_modern | template_premium
# 3. The agent reads SECTION 1 + 2 first, then executes SECTION 3
# 4. When importing a new template, follow SECTION 4 (new template checklist)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — SKILL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1.1 — Where data comes from

The Home component receives ONE prop: `data: TenantViewModel`
This prop is passed from the template's index.tsx Renderer.
The agent does NOT fetch data. The agent does NOT import from constants or data files.
The agent only maps `data.*` fields into the JSX that already exists.

## 1.2 — TenantViewModel field reference

Every field below is safe to access. Always use `data?.field ?? fallback`.

### School identity
  data.school.name              String   School display name
  data.school.logoUrl           String   Logo image URL

### Hero (carousel slides)
  data.heroMedia[]
    .mediaType                  'image' | 'video'
    .mediaUrl                   URL for img src or video src
    .headline                   Main slide heading
    .subheadline                Subtitle text
    .primaryButtonText          CTA button label
    .primaryButtonUrl           CTA button href
    .secondaryButtonText        Second button label (may be empty string)
    .secondaryButtonUrl         Second button href
    .displayOrder               Number — sort ascending
    .isActive                   Boolean — filter out if false

### Announcements / Ticker
  data.announcements[]
    .title
    .message
    .isActive                   Boolean — filter out if false
    .expiresAt                  ISO date string

### Principal / Leadership
  data.personnel[]
    .name
    .designation
    .bio
    .photoUrl
    .personType                 'principal' | 'faculty' | 'board' | 'leadership'
    .isFeatured                 Boolean

  Principal = data.personnel.find(p => p.personType === 'principal') ?? null

### Faculty
  Faculty = data.personnel.filter(p => p.personType === 'faculty')

### Statistics / Counters
  data.statistics[]
    .label
    .value                      String (e.g. "1200+")
    .icon
    .displayOrder

### Achievements
  data.achievements[]
    .title
    .description
    .year
    .category
    .achievementType            'academic' | 'sports' | 'recognition'
    .photoUrl
    .displayOrder

  Academic = .filter(a => a.achievementType === 'academic')
  Sports   = .filter(a => a.achievementType === 'sports')

### Events
  data.events[]
    .title
    .date
    .eventDate
    .startTime
    .description
    .location
    .category
    .isFeatured

### Facilities
  data.facilities[]
    .name
    .description
    .categoryName

### Gallery
  data.mediaLibrary[]
    .url
    .mediaType
    .category
    .caption
    .isFeatured

### Academic Results
  data.academicResults[]
    .year
    .passPercentage
    .distinctions
    .firstClass
    .legacyQuote

### Identity
  data.identity.vision
  data.identity.mission
  data.identity.motto
  data.identity.aboutTitle
  data.identity.aboutDescription

## 1.3 — Section visibility rules (templatecomponents)

Every section has an entry in data.homepageSections[] with three fields:
  sectionKey    matches component name (e.g. 'hero', 'faculty')
  isEnabled     from templatecomponents.isactive
  isRequired    from templatecomponents.isrequired

Decision table — follow for EVERY section:
  isEnabled = false                          → HIDE. Do not read data at all.
  isEnabled = true + isRequired = true       → SHOW. Empty data = console.error + fallback UI (no crash).
  isEnabled = true + isRequired = false      → SHOW only if data array is not empty.

Pattern:
  const section    = data?.homepageSections?.find(s => s.sectionKey === 'SECTION_KEY');
  const isEnabled  = section?.isEnabled  ?? true;
  const isRequired = section?.isRequired ?? false;

  if (!isEnabled) return null;

  if (isRequired && dataArray.length === 0) {
    console.error('[EdDesk] Required section "SECTION_KEY" has no data');
  }

  {isEnabled && (isRequired || dataArray.length > 0) && (
    <section>...</section>
  )}

Section key reference (use exactly these strings):
  'hero'           heroMedia
  'announcements'  announcements
  'stats'          statistics
  'principal'      personnel (personType === 'principal')
  'faculty'        personnel (personType === 'faculty')
  'achievements'   achievements (achievementType === 'academic')
  'sports'         achievements (achievementType === 'sports')
  'events'         events
  'facilities'     facilities
  'gallery'        mediaLibrary
  'academics'      academicResults

## 1.4 — Safe access patterns (mandatory)

  Arrays:   data?.heroMedia ?? []
  Strings:  data?.school?.name ?? ''
  Find:     data?.personnel?.find(p => p.personType === 'principal') ?? null

  Filter + sort:
    (data?.heroMedia ?? []).filter(s => s.isActive).sort((a,b) => a.displayOrder - b.displayOrder)

  Conditional render:
    {slide.secondaryButtonText && <a href={slide.secondaryButtonUrl}>{slide.secondaryButtonText}</a>}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — GUARDRAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Allowed files per template (ONLY these two per run)

  template_classic:
    src/templates/template_classic/screens/HomeScreen.js    ← primary
    src/templates/template_classic/index.tsx                ← only if data prop missing

  template_modern:
    src/templates/template_modern/app/page.tsx              ← primary
    src/templates/template_modern/index.tsx                 ← only if data prop missing

  template_premium:
    src/templates/template_premium/app/page.tsx             ← primary
    src/templates/template_premium/index.tsx                ← only if data prop missing

## Forbidden — NEVER touch

  Any component file (Header, Navbar, Footer, HeroSlider, etc.)
  Any CSS or globals file
  Any constants.tsx / data.ts / mockData.js inside any template
  src/core/** | src/app/** | src/lib/**
  Any file belonging to a different template than the one being worked on

## UI rule — Zero visual changes

  Do NOT add, remove, or change any className
  Do NOT change any HTML element, structure, or layout
  The page must look pixel-identical — only the data values change

## Data source rule

  All data comes from `data: TenantViewModel` prop only
  Never import from local template data/constants files
  Never call fetch() or any API inside template files
  Remove unused local imports (schoolData, SCHOOL_NAME, ACTIVITIES, etc.)

## Section visibility rule

  Every section MUST use the isEnabled + isRequired pattern from Section 1.3
  Skipping this check for any section is a guardrail violation

## No-crash rule

  Every array: ?? [] fallback
  Every .find(): ?? null fallback
  Required section + empty data: console.error, not throw

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — PROMPT
(Copy this block. Replace {TEMPLATE_ID} before giving to agent.)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Target template: {TEMPLATE_ID}

─────────────────────────────────────────────────────────────
BEFORE YOU WRITE ANY CODE — read these files first:
  1. This skill file (home-screen-skill.md)
  2. src/core/viewmodels/tenant.viewmodel.ts
  3. The home screen file for {TEMPLATE_ID} (see Section 2 Allowed Files)
─────────────────────────────────────────────────────────────

PHASE 0 — Audit (answer all before writing code)

  Q1. What is the current function signature of the Home component?
      Does it already receive `data: TenantViewModel`?

  Q2. List every import that pulls from a local data or constants file.
      (These will be removed after binding.)

  Q3. For each section, mark its status:
      BOUND     = reads from data.* AND has isEnabled + isRequired check
      PARTIAL   = reads from data.* but missing visibility check
      HARDCODED = still uses local constants or hardcoded values
      MISSING   = section does not exist in this template

      [ ] hero           (data.heroMedia)
      [ ] announcements  (data.announcements)
      [ ] principal      (data.personnel — personType = 'principal')
      [ ] statistics     (data.statistics)
      [ ] achievements   (data.achievements — achievementType = 'academic')
      [ ] sports         (data.achievements — achievementType = 'sports')
      [ ] faculty        (data.personnel — personType = 'faculty')
      [ ] events         (data.events)
      [ ] facilities     (data.facilities)
      [ ] gallery        (data.mediaLibrary)
      [ ] academics      (data.academicResults)

─────────────────────────────────────────────────────────────
PHASE 1 — Plan (still no code)

For each PARTIAL or HARDCODED section from Phase 0:
  - What is hardcoded and what does it map to in TenantViewModel?
  - Does it need isEnabled check added?
  - Does it need isRequired check added?

For BOUND sections: confirm the isEnabled + isRequired pattern is present.
If it is not, reclassify as PARTIAL.

─────────────────────────────────────────────────────────────
PHASE 2 — Execute (one section at a time)

For each PARTIAL or HARDCODED section:

  BEFORE: [paste the current code snippet]
  AFTER:  [paste the updated code]
  CONFIRM:
    [ ] data.* field used (no local import)
    [ ] isEnabled check present
    [ ] isRequired check present (console.error if required + empty)
    [ ] ?? fallback on every array / .find()
    [ ] Zero className changes

After all sections done: remove unused local data imports.

─────────────────────────────────────────────────────────────
PHASE 3 — Validate

Data binding:
  [ ] hero           — data.heroMedia, isActive filter, displayOrder sort
  [ ] announcements  — data.announcements, isEnabled, isRequired
  [ ] principal      — data.personnel.find(personType==='principal'), isEnabled
  [ ] statistics     — data.statistics, isEnabled, isRequired
  [ ] achievements   — data.achievements (academic), isEnabled, isRequired
  [ ] sports         — data.achievements (sports), isEnabled, isRequired
  [ ] faculty        — data.personnel.filter(faculty), isEnabled, isRequired
  [ ] events         — data.events, isEnabled, isRequired
  [ ] facilities     — data.facilities, isEnabled, isRequired
  [ ] gallery        — data.mediaLibrary, isEnabled, isRequired
  [ ] academics      — data.academicResults, isEnabled, isRequired

Cleanup:
  [ ] No local data/constants imports remain
  [ ] TenantViewModel imported if not already

Stability:
  [ ] Every array: ?? [] fallback
  [ ] Every .find(): ?? null fallback
  [ ] Required + empty: console.error logged, no crash
  [ ] Secondary button: only rendered if .secondaryButtonText non-empty

Guardrails:
  [ ] Zero className changes
  [ ] Zero structural changes
  [ ] Only allowed files modified

─────────────────────────────────────────────────────────────
PHASE 4 — Report

Home Screen Binding Report
Template:  {TEMPLATE_ID}
File:      src/templates/{TEMPLATE_ID}/[home screen file]

Sections:
  hero           [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  announcements  [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  principal      [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  statistics     [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  achievements   [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  sports         [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  faculty        [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  events         [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  facilities     [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  gallery        [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]
  academics      [ BOUND | WAS PARTIAL→FIXED | WAS HARDCODED→FIXED | MISSING ]

Local imports removed:  [list them or NONE]
CSS changed:            NO
Other files modified:   [list or NONE]
Guardrails violated:    NONE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — NEW TEMPLATE ONBOARDING CHECKLIST
(Run this before using the prompt on a new template)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [ ] 1. Add slug to VALID_SLUGS in:
         src/app/demo/[templateSlug]/[[...path]]/page.tsx

  [ ] 2. Register in:
         src/lib/template/registry.ts

  [ ] 3. Confirm index.tsx exports:
         export const Renderer = ({ data, path }: { data: TenantViewModel, path?: string })

  [ ] 4. Confirm home screen signature accepts data prop:
         function Home({ data }: { data: TenantViewModel })

  [ ] 5. Check if the template uses non-standard sectionKey strings.
         If so, add them to Section 1.3 of this file before running the prompt.
         (Look at templatecomponents rows for the new template in Supabase.)

  [ ] 6. Run Phase 0 audit to get the full binding status before doing any work.
