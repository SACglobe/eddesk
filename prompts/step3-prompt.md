# EdDesk — Phase 1, Step 3
# Rewrite src/core/viewmodels/tenant.viewmodel.ts
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files in order:
  1. src/core/viewmodels/tenant.viewmodel.ts              ← file you will rewrite
  2. src/core/services/screenData.service.ts              ← ScreenDataPayload type (Step 2 output)
  3. src/lib/constants/reference.js                       ← all COL_* constants (Step 1 output)
  4. src/core/utils/seo.ts                                ← consumes TenantViewModel fields
  5. src/templates/template_modern/app/page.tsx           ← consumes TenantViewModel fields
  6. src/templates/template_classic/screens/HomeScreen.js ← consumes TenantViewModel fields

Do not write a single line until you have read all six.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHY THIS REWRITE IS NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After Step 2, buildTenantViewModel now receives a ScreenDataPayload:

  payload = {
    mode:         'demo' | 'live',
    screen:       'home',
    school:       { name, templateslug, isactive, logo_url, ... },
    subscription: { enddate, status, ... },
    plan:         { graceperiod, name, ... },
    data: {
      hero:               [ ...rows ],     ← ARRAY
      broadcast:          [ ...rows ],     ← ARRAY
      faculty:            [ ...rows ],     ← ARRAY  (teachers)
      leadership:         [ ...rows ],     ← ARRAY  (principal, chairman, board, etc.)
      schoolstats:        [ ...rows ],     ← ARRAY
      achievements:       [ ...rows ],     ← ARRAY
      events:             [ ...rows ],     ← ARRAY
      gallery:            [ ...rows ],     ← ARRAY
      activities:         [ ...rows ],     ← ARRAY
      infrastructure:     [ ...rows ],     ← ARRAY
      templatecomponents: [ ...rows ],     ← ARRAY  (section visibility)
      academicresults:    { ...row },      ← SINGLE OBJECT (not array)
      contactdetails:     { ...row },      ← SINGLE OBJECT (not array)
    }
  }

The current buildTenantViewModel(data: TenantApiDataItem[]) accepts the old
wrong type and processes it incorrectly. It must be rewritten to accept
ScreenDataPayload and map every field correctly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL RULE — BACKWARD COMPATIBILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following files use TenantViewModel today and are NOT changed in this step:
  src/templates/template_modern/app/page.tsx
  src/templates/template_classic/screens/HomeScreen.js
  src/templates/template_premium/app/page.tsx
  src/core/utils/seo.ts
  src/core/business/subscription.ts
  src/app/demo/.../TemplateRenderer.tsx

These files access these exact field names on TenantViewModel:
  data.school.name
  data.school.logoUrl
  data.school.isActive
  data.school.templateId       ← used by TemplateRenderer
  data.personnel               ← used by templates and seo.ts
  data.heroMedia               ← used by templates
  data.announcements           ← used by templates
  data.statistics              ← used by templates
  data.achievements            ← used by templates
  data.events                  ← used by templates
  data.facilities              ← used by templates
  data.mediaLibrary            ← used by templates
  data.academicResults         ← used by templates (as array currently)
  data.homepageSections        ← used by templates
  data.identity                ← used by seo.ts

ALL of these field names must still exist on TenantViewModel after this rewrite.
Renaming any of them breaks templates and seo.ts — do not rename them.

The NEW fields being added (leadership, principal, broadcast, stats,
contactDetails, components, subscription, plan) are additions, not replacements.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/core/viewmodels/tenant.viewmodel.ts   ← ONLY this file

Do NOT touch templates, seo.ts, subscription.ts, or any page files.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Q1. What type does buildTenantViewModel currently accept?
      Is it ScreenDataPayload or TenantApiDataItem[]?

  Q2. List every field on TenantViewModel that templates currently access.
      (Read template_modern/app/page.tsx and HomeScreen.js carefully.)

  Q3. Does the current TenantViewModel have a `personnel` field?
      What shape is it?

  Q4. Does the current TenantViewModel have a `leadership` field?
      Does it have a `principal` convenience field?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — NEW TenantViewModel INTERFACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the TenantViewModel interface with this exact definition.
Do not add or remove fields. Do not rename fields.

export interface TenantViewModel {

    // ── Meta ──────────────────────────────────────────────────────────────────
    mode:   'demo' | 'live';
    screen: string;

    // ── School ────────────────────────────────────────────────────────────────
    school: {
        key:              string;
        name:             string;
        slug:             string;
        customDomain:     string;
        templateSlug:     string;   // e.g. 'template_classic'
        templateId:       string;   // alias for templateSlug — kept for TemplateRenderer compat
        isActive:         boolean;
        isDemo:           boolean;
        logoUrl:          string;
        email:            string;
        phone:            string;
        address:          string;
        city:             string;
        state:            string;
        country:          string;
        postalCode:       string;
        fullAddress:      string;
        themeConfig:      Record<string, unknown>;
        paymentGatewayUrl: string;  // kept for compat — may be empty string
    };

    // ── Subscription ──────────────────────────────────────────────────────────
    subscription: {
        status:  string;   // 'active' | 'expired' | etc.
        endDate: string;   // ISO date string — use for expiry check
    };

    // ── Plan ─────────────────────────────────────────────────────────────────
    plan: {
        name:        string;
        gracePeriod: number;   // days — replaces hardcoded gracePeriodDays: 7
    };

    // ── Section visibility (from templatecomponents, deduplicated) ────────────
    components: Array<{
        componentCode: string;   // 'hero' | 'broadcast' | 'faculty' | etc.
        isActive:      boolean;
        isRequired:    boolean;
        displayOrder:  number;
    }>;

    // ── Also kept as homepageSections for template backward compatibility ──────
    homepageSections: Array<{
        sectionKey:   string;
        isEnabled:    boolean;
        isRequired:   boolean;
        displayOrder: number;
    }>;

    // ── Identity (kept for seo.ts compat) ─────────────────────────────────────
    identity: {
        vision:            string;
        mission:           string;
        motto:             string;
        aboutTitle:        string;
        aboutDescription:  string;
    };

    // ── Hero ─────────────────────────────────────────────────────────────────
    heroMedia: Array<{           // kept as heroMedia for template compat
        key:                  string;
        headline:             string;
        subheadline:          string;
        mediaType:            string;   // 'image' | 'video'
        mediaUrl:             string;
        primaryButtonText:    string;
        primaryButtonUrl:     string;
        secondaryButtonText:  string;
        secondaryButtonUrl:   string;
        isActive:             boolean;
        displayOrder:         number;
    }>;

    // ── Broadcast / Announcements ─────────────────────────────────────────────
    broadcast: Array<{
        key:       string;
        title:     string;
        message:   string;
        priority:  number;
        isActive:  boolean;
        expiresAt: string;
    }>;

    // ── Also kept as announcements for template backward compatibility ─────────
    announcements: Array<{
        title:     string;
        message:   string;
        isActive:  boolean;
        expiresAt: string;
    }>;

    // ── Faculty (teachers only) ───────────────────────────────────────────────
    faculty: Array<{
        key:             string;
        name:            string;
        designation:     string;
        description:     string;
        qualification:   string;
        experienceYears: number;
        imageUrl:        string;
        email:           string;
        phone:           string;
        isActive:        boolean;
        displayOrder:    number;
    }>;

    // ── Leadership (principal, chairman, board, others) ───────────────────────
    leadership: Array<{
        key:          string;
        name:         string;
        role:         string;   // 'principal' | 'chairman' | 'board' | others
        designation:  string;
        message:      string;
        imageUrl:     string;
        signatureUrl: string;
        isActive:     boolean;
        displayOrder: number;
    }>;

    // ── Principal (convenience — derived from leadership) ─────────────────────
    principal: {
        key:          string;
        name:         string;
        role:         string;
        designation:  string;
        message:      string;
        imageUrl:     string;
        signatureUrl: string;
    } | null;

    // ── Also kept as personnel for template + seo.ts backward compatibility ────
    // Merges faculty + leadership into one array using personType field
    personnel: Array<{
        key:        string;
        name:       string;
        designation: string;
        bio:        string;        // maps from description (faculty) or message (leadership)
        photoUrl:   string;        // maps from imageUrl
        personType: string;        // maps from role (leadership) or 'faculty' (faculty)
        isFeatured: boolean;
        isActive:   boolean;
    }>;

    // ── Stats ─────────────────────────────────────────────────────────────────
    stats: Array<{               // new canonical name
        key:          string;
        label:        string;
        value:        string;
        icon:         string;
        displayOrder: number;
    }>;

    // ── Also kept as statistics for template backward compatibility ────────────
    statistics: Array<{
        label:        string;
        value:        string;
        icon:         string;
        displayOrder: number;
    }>;

    // ── Achievements ──────────────────────────────────────────────────────────
    achievements: Array<{
        key:          string;
        title:        string;
        description:  string;
        category:     string;
        year:         number;
        awardLevel:   string;
        imageUrl:     string;
        isFeatured:   boolean;
        isActive:     boolean;
        displayOrder: number;
        achievementType: string;  // kept for template compat — same as category
        photoUrl:     string;     // kept for template compat — same as imageUrl
    }>;

    // ── Events ────────────────────────────────────────────────────────────────
    events: Array<{
        key:         string;
        id:          string;      // kept for template compat — same as key
        title:       string;
        description: string;
        category:    string;
        location:    string;
        eventDate:   string;
        date:        string;      // kept for template compat — same as eventDate
        startTime:   string;
        endTime:     string;
        imageUrl:    string;
        isFeatured:  boolean;
    }>;

    // ── Gallery ───────────────────────────────────────────────────────────────
    gallery: Array<{
        key:          string;
        url:          string;
        caption:      string;
        category:     string;
        mediaType:    string;
        isFeatured:   boolean;
        displayOrder: number;
    }>;

    // ── Also kept as mediaLibrary for template backward compatibility ──────────
    mediaLibrary: Array<{
        url:       string;
        mediaType: string;
        category:  string;
        caption:   string;
        isFeatured: boolean;
    }>;

    // ── Academic Results (SINGLE OBJECT — nullable) ───────────────────────────
    academicResult: {            // new canonical name — single object
        key:            string;
        year:           number;
        passPercentage: number;
        distinctions:   number;
        firstClass:     number;
        legacyQuote:    string;
    } | null;

    // ── Also kept as academicResults array for template backward compat ────────
    // Wraps single object in array — or empty array if null
    academicResults: Array<{
        year:           number;
        passPercentage: number;
        distinctions:   number;
        firstClass:     number;
        legacyQuote:    string;
    }>;

    // ── Activities ────────────────────────────────────────────────────────────
    activities: Array<Record<string, unknown>>;

    // ── Infrastructure ────────────────────────────────────────────────────────
    infrastructure: Array<Record<string, unknown>>;

    // ── Also kept as facilities for template backward compatibility ────────────
    facilities: Array<{
        name:         string;
        description:  string;
        categoryName: string;
    }>;

    // ── Contact Details (SINGLE OBJECT — nullable) ────────────────────────────
    contactDetails: {
        key:         string;
        email:       string;
        phone:       string;
        address:     string;
        mapEmbedUrl: string;
        facebook:    string;
        instagram:   string;
        twitter:     string;
        youtube:     string;
    } | null;
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — NEW buildTenantViewModel FUNCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace buildTenantViewModel with this exact implementation.
Use the COL_* constants from reference.js for every field access.
Do not hardcode any column name strings.

─────────────────────────────────────────────────────────────
IMPORTS TO ADD at the top of the file:
─────────────────────────────────────────────────────────────

import type { ScreenDataPayload } from '@/core/services/screenData.service';

Add these COL_* imports from reference.js (add to existing import list):
  COL_SCHOOLS_KEY (= "key")
  COL_SCHOOLS_SLUG (= "slug")
  COL_SCHOOLS_CUSTOM_DOMAIN (= "customdomain")
  COL_SCHOOLS_TEMPLATE_SLUG (= "templateslug")      ← added in Step 1
  COL_SCHOOLS_IS_DEMO (= "isdemo")                  ← added in Step 1
  COL_SCHOOLS_THEME_CONFIG (= "themeconfig")
  COL_LEADERSHIP_ID (= "key")                       ← added in Step 1
  COL_LEADERSHIP_NAME (= "name")                    ← added in Step 1
  COL_LEADERSHIP_ROLE (= "role")                    ← added in Step 1
  COL_LEADERSHIP_DESIGNATION (= "designation")      ← added in Step 1
  COL_LEADERSHIP_MESSAGE (= "message")              ← added in Step 1
  COL_LEADERSHIP_IMAGE_URL (= "imageurl")           ← added in Step 1
  COL_LEADERSHIP_SIGNATURE_URL (= "signatureurl")   ← added in Step 1
  COL_LEADERSHIP_IS_ACTIVE (= "isactive")           ← added in Step 1
  COL_LEADERSHIP_DISPLAY_ORDER (= "displayorder")   ← added in Step 1
  COL_PERSONNEL_ID (= "key")
  COL_PERSONNEL_IS_ACTIVE (= "isactive")
  COL_PERSONNEL_IMAGE_URL (= "imageurl")
  COL_PERSONNEL_EXPERIENCE (= "experience_years")
  COL_PERSONNEL_EMAIL (= "email")
  COL_PERSONNEL_PHONE (= "phone")
  COL_SUBSCRIPTION_STATUS (= "status")              ← added in Step 1
  COL_SUBSCRIPTION_END_DATE (= "enddate")           ← added in Step 1
  COL_PLAN_NAME (= "name")                          ← added in Step 1
  COL_PLAN_GRACE_PERIOD (= "graceperiod")           ← added in Step 1
  COL_TEMPLATE_COMPONENTS_CODE (= "componentcode")  ← added in Step 1
  COL_TEMPLATE_COMPONENTS_IS_ACTIVE (= "isactive")
  COL_TEMPLATE_COMPONENTS_REQUIRED (= "isrequired")
  COL_TEMPLATE_COMPONENTS_ORDER (= "displayorder")
  COL_ACHIEVEMENTS_IS_ACTIVE (check reference.js — add if missing)
  COL_ACHIEVEMENTS_IS_FEATURED (= "isfeatured")
  COL_ACHIEVEMENTS_AWARD_LEVEL (= "awardlevel")
  COL_ACHIEVEMENTS_IMAGE_URL (= "imageurl")
  COL_EVENTS_END_TIME (= "endtime")
  COL_EVENTS_IMAGE_URL (= "imageurl")
  COL_CONTACT_DETAILS_ID (= "key")
  COL_CONTACT_DETAILS_PHONE (= "phone")
  COL_CONTACT_DETAILS_EMAIL (= "email")
  COL_CONTACT_DETAILS_ADDRESS (= "address")
  COL_CONTACT_DETAILS_MAP_URL (= "mapembedurl")
  COL_CONTACT_DETAILS_FACEBOOK (= "facebook")
  COL_CONTACT_DETAILS_INSTAGRAM (= "instagram")
  COL_CONTACT_DETAILS_TWITTER (= "twitter")
  COL_CONTACT_DETAILS_YOUTUBE (= "youtube")
  COL_MEDIA_LIBRARY_DISPLAY_ORDER (= "displayorder")
  COL_ACADEMIC_RESULTS_ID (= "key")

REMOVE this import — no longer needed:
  import type { TenantApiDataItem } from '@/core/services/tenantApi.service';

─────────────────────────────────────────────────────────────
HELPER FUNCTIONS — keep existing str(), num(), bool()
─────────────────────────────────────────────────────────────

Keep the existing str(), num(), bool() helper functions exactly as they are.

─────────────────────────────────────────────────────────────
buildTenantViewModel LOGIC — follow these rules exactly:
─────────────────────────────────────────────────────────────

export function buildTenantViewModel(payload: ScreenDataPayload): TenantViewModel {

  // 1. Extract top-level sections from payload
  const school       = payload.school       ?? {};
  const subscription = payload.subscription ?? {};
  const plan         = payload.plan         ?? {};
  const d            = payload.data         ?? {};

  // 2. Extract arrays — default to [] if missing
  const heroRows          = (d.hero              ?? []) as Record<string, unknown>[];
  const broadcastRows     = (d.broadcast         ?? []) as Record<string, unknown>[];
  const facultyRows       = (d.faculty           ?? []) as Record<string, unknown>[];
  const leadershipRows    = (d.leadership        ?? []) as Record<string, unknown>[];
  const statsRows         = (d.schoolstats       ?? []) as Record<string, unknown>[];
  const achievementRows   = (d.achievements      ?? []) as Record<string, unknown>[];
  const eventRows         = (d.events            ?? []) as Record<string, unknown>[];
  const galleryRows       = (d.gallery           ?? []) as Record<string, unknown>[];
  const activityRows      = (d.activities        ?? []) as Record<string, unknown>[];
  const infraRows         = (d.infrastructure    ?? []) as Record<string, unknown>[];
  const componentRows     = (d.templatecomponents ?? []) as Record<string, unknown>[];

  // 3. Extract single objects — default to null if missing
  const academicResult = (d.academicresults ?? null) as Record<string, unknown> | null;
  const contactDetails = (d.contactdetails  ?? null) as Record<string, unknown> | null;

  // 4. Deduplicate templatecomponents by componentcode
  //    Response may have duplicate rows (one per registered template)
  //    Keep the first occurrence of each componentcode
  const seenCodes = new Set<string>();
  const dedupedComponents = componentRows.filter(r => {
    const code = str(r[COL_TEMPLATE_COMPONENTS_CODE]);
    if (seenCodes.has(code)) return false;
    seenCodes.add(code);
    return true;
  });

  // 5. Map leadership into typed array
  const mappedLeadership = leadershipRows.map(r => ({
    key:          str(r[COL_LEADERSHIP_ID]),
    name:         str(r[COL_LEADERSHIP_NAME]),
    role:         str(r[COL_LEADERSHIP_ROLE]),
    designation:  str(r[COL_LEADERSHIP_DESIGNATION]),
    message:      str(r[COL_LEADERSHIP_MESSAGE]),
    imageUrl:     str(r[COL_LEADERSHIP_IMAGE_URL]),
    signatureUrl: str(r[COL_LEADERSHIP_SIGNATURE_URL]),
    isActive:     bool(r[COL_LEADERSHIP_IS_ACTIVE]),
    displayOrder: num(r[COL_LEADERSHIP_DISPLAY_ORDER]),
  }));

  // 6. Derive principal from leadership array
  const principal = mappedLeadership.find(l => l.role === 'principal') ?? null;

  // 7. Build personnel array (merged faculty + leadership) for backward compat
  //    Templates use data.personnel.find(p => p.personType === 'principal')
  //    and data.personnel.filter(p => p.personType === 'faculty')
  const personnelFromFaculty = facultyRows.map(r => ({
    key:        str(r[COL_PERSONNEL_ID]),
    name:       str(r[COL_PERSONNEL_NAME]),
    designation: str(r[COL_PERSONNEL_DESIGNATION]),
    bio:        str(r[COL_PERSONNEL_BIO]),
    photoUrl:   str(r[COL_PERSONNEL_IMAGE_URL]),
    personType: 'faculty',
    isFeatured: bool(r[COL_PERSONNEL_IS_FEATURED]),
    isActive:   bool(r[COL_PERSONNEL_IS_ACTIVE]),
  }));
  const personnelFromLeadership = mappedLeadership.map(l => ({
    key:        l.key,
    name:       l.name,
    designation: l.designation,
    bio:        l.message,        // leadership.message maps to bio
    photoUrl:   l.imageUrl,
    personType: l.role,           // 'principal' | 'chairman' | 'board' | etc.
    isFeatured: l.role === 'principal',
    isActive:   l.isActive,
  }));
  const personnel = [...personnelFromLeadership, ...personnelFromFaculty];

  // 8. Map components for both new (components) and old (homepageSections) shape
  const mappedComponents = dedupedComponents.map(r => ({
    componentCode: str(r[COL_TEMPLATE_COMPONENTS_CODE]),
    isActive:      bool(r[COL_TEMPLATE_COMPONENTS_IS_ACTIVE]),
    isRequired:    bool(r[COL_TEMPLATE_COMPONENTS_REQUIRED]),
    displayOrder:  num(r[COL_TEMPLATE_COMPONENTS_ORDER]),
  }));

  // homepageSections kept for template backward compat
  // sectionKey = componentCode, isEnabled = isActive
  const homepageSections = mappedComponents.map(c => ({
    sectionKey:   c.componentCode,
    isEnabled:    c.isActive,
    isRequired:   c.isRequired,
    displayOrder: c.displayOrder,
  }));

  // 9. Map achievements — keep both new fields and old compat fields
  const mappedAchievements = achievementRows.map(r => ({
    key:             str(r[COL_ACHIEVEMENTS_ID]),
    title:           str(r[COL_ACHIEVEMENTS_TITLE]),
    description:     str(r[COL_ACHIEVEMENTS_DESCRIPTION]),
    category:        str(r[COL_ACHIEVEMENTS_CATEGORY]),
    year:            num(r[COL_ACHIEVEMENTS_YEAR]),
    awardLevel:      str(r[COL_ACHIEVEMENTS_AWARD_LEVEL]),
    imageUrl:        str(r[COL_ACHIEVEMENTS_IMAGE_URL]),
    isFeatured:      bool(r[COL_ACHIEVEMENTS_IS_FEATURED]),
    isActive:        bool(r[COL_IS_ACTIVE]),
    displayOrder:    num(r[COL_ACHIEVEMENTS_DISPLAY_ORDER]),
    achievementType: str(r[COL_ACHIEVEMENTS_CATEGORY]),   // compat alias
    photoUrl:        str(r[COL_ACHIEVEMENTS_IMAGE_URL]),  // compat alias
  }));

  // 10. Map events — keep both new fields and old compat fields
  const mappedEvents = eventRows.map(r => ({
    key:         str(r[COL_EVENTS_ID]),
    id:          str(r[COL_EVENTS_ID]),     // compat alias
    title:       str(r[COL_EVENTS_TITLE]),
    description: str(r[COL_EVENTS_DESCRIPTION]),
    category:    str(r[COL_EVENTS_CATEGORY]),
    location:    str(r[COL_EVENTS_LOCATION]),
    eventDate:   str(r[COL_EVENTS_DATE]),
    date:        str(r[COL_EVENTS_DATE]),    // compat alias
    startTime:   str(r[COL_EVENTS_START_TIME]),
    endTime:     str(r[COL_EVENTS_END_TIME]),
    imageUrl:    str(r[COL_EVENTS_IMAGE_URL]),
    isFeatured:  bool(r[COL_EVENTS_IS_FEATURED]),
  }));

  // 11. Map gallery — keep both new and mediaLibrary compat
  const mappedGallery = galleryRows.map(r => ({
    key:          str(r[COL_MEDIA_LIBRARY_ID]),
    url:          str(r[COL_MEDIA_LIBRARY_URL]),
    caption:      str(r[COL_MEDIA_LIBRARY_CAPTION]),
    category:     str(r[COL_MEDIA_LIBRARY_CATEGORY]),
    mediaType:    str(r[COL_MEDIA_LIBRARY_TYPE]),
    isFeatured:   bool(r[COL_MEDIA_LIBRARY_IS_FEATURED]),
    displayOrder: num(r[COL_MEDIA_LIBRARY_DISPLAY_ORDER]),
  }));

  // 12. Map stats — keep both new (stats) and old (statistics) shape
  const mappedStats = statsRows.map(r => ({
    key:          str(r[COL_CAMPUS_STATISTICS_ID]),
    label:        str(r[COL_CAMPUS_STATISTICS_LABEL]),
    value:        str(r[COL_CAMPUS_STATISTICS_VALUE]),
    icon:         str(r[COL_CAMPUS_STATISTICS_ICON]),
    displayOrder: num(r[COL_CAMPUS_STATISTICS_DISPLAY_ORDER]),
  }));

  // 13. academicResult as single object — wrap in array for compat
  const mappedAcademicResult = academicResult ? {
    key:            str(academicResult[COL_ACADEMIC_RESULTS_ID]),
    year:           num(academicResult[COL_ACADEMIC_RESULTS_YEAR]),
    passPercentage: num(academicResult[COL_ACADEMIC_RESULTS_PASS_PERCENTAGE]),
    distinctions:   num(academicResult[COL_ACADEMIC_RESULTS_DISTINCTIONS]),
    firstClass:     num(academicResult[COL_ACADEMIC_RESULTS_FIRST_CLASS]),
    legacyQuote:    str(academicResult[COL_ACADEMIC_RESULTS_LEGACY_QUOTE]),
  } : null;

  // 14. Map contactDetails
  const mappedContact = contactDetails ? {
    key:         str(contactDetails[COL_CONTACT_DETAILS_ID]),
    email:       str(contactDetails[COL_CONTACT_DETAILS_EMAIL]),
    phone:       str(contactDetails[COL_CONTACT_DETAILS_PHONE]),
    address:     str(contactDetails[COL_CONTACT_DETAILS_ADDRESS]),
    mapEmbedUrl: str(contactDetails[COL_CONTACT_DETAILS_MAP_URL]),
    facebook:    str(contactDetails[COL_CONTACT_DETAILS_FACEBOOK]),
    instagram:   str(contactDetails[COL_CONTACT_DETAILS_INSTAGRAM]),
    twitter:     str(contactDetails[COL_CONTACT_DETAILS_TWITTER]),
    youtube:     str(contactDetails[COL_CONTACT_DETAILS_YOUTUBE]),
  } : null;

  // 15. Build templateSlug — this is what TemplateRenderer uses to pick the template
  const templateSlug = str(school[COL_SCHOOLS_TEMPLATE_SLUG]);

  // 16. Assemble and return
  return {
    mode:   payload.mode   ?? 'live',
    screen: payload.screen ?? '',

    school: {
      key:              str(school[COL_SCHOOLS_KEY]),
      name:             str(school[COL_SCHOOLS_NAME]),
      slug:             str(school[COL_SCHOOLS_SLUG]),
      customDomain:     str(school[COL_SCHOOLS_CUSTOM_DOMAIN]),
      templateSlug,
      templateId:       templateSlug,   // compat alias for TemplateRenderer
      isActive:         bool(school[COL_SCHOOLS_IS_ACTIVE]),
      isDemo:           bool(school[COL_SCHOOLS_IS_DEMO]),
      logoUrl:          str(school[COL_SCHOOLS_LOGO_URL]),
      email:            str(school[COL_SCHOOLS_EMAIL]),
      phone:            str(school[COL_SCHOOLS_PHONE]),
      address:          str(school[COL_SCHOOLS_ADDRESS]),
      city:             str(school[COL_SCHOOLS_CITY]),
      state:            str(school[COL_SCHOOLS_STATE]),
      country:          str(school[COL_SCHOOLS_COUNTRY]),
      postalCode:       str(school[COL_SCHOOLS_POSTAL_CODE]),
      fullAddress:      [
        str(school[COL_SCHOOLS_ADDRESS]),
        str(school[COL_SCHOOLS_CITY]),
        str(school[COL_SCHOOLS_STATE]),
      ].filter(Boolean).join(', '),
      themeConfig:      (school[COL_SCHOOLS_THEME_CONFIG] as Record<string, unknown>) ?? {},
      paymentGatewayUrl: str(school[COL_SCHOOLS_PAYMENTGATEWAY_URL]),
    },

    subscription: {
      status:  str(subscription[COL_SUBSCRIPTION_STATUS]),
      endDate: str(subscription[COL_SUBSCRIPTION_END_DATE]),
    },

    plan: {
      name:        str(plan[COL_PLAN_NAME]),
      gracePeriod: num(plan[COL_PLAN_GRACE_PERIOD]),
    },

    components:      mappedComponents,
    homepageSections,

    identity: {
      vision:           '',   // not in RPC response — kept for seo.ts compat
      mission:          '',
      motto:            '',
      aboutTitle:       '',
      aboutDescription: '',
    },

    heroMedia:    heroRows.map(r => ({
      key:                 str(r[COL_HERO_MEDIA_ID]),
      headline:            str(r[COL_HERO_MEDIA_HEADLINE]),
      subheadline:         str(r[COL_HERO_MEDIA_SUBHEADLINE]),
      mediaType:           str(r[COL_HERO_MEDIA_TYPE]),
      mediaUrl:            str(r[COL_HERO_MEDIA_URL]),
      primaryButtonText:   str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT]),
      primaryButtonUrl:    str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_URL]),
      secondaryButtonText: str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT]),
      secondaryButtonUrl:  str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_URL]),
      isActive:            bool(r[COL_HERO_MEDIA_IS_ACTIVE]),
      displayOrder:        num(r[COL_HERO_MEDIA_DISPLAY_ORDER]),
    })),

    broadcast:    broadcastRows.map(r => ({
      key:       str(r[COL_ANNOUNCEMENTS_ID]),
      title:     str(r[COL_ANNOUNCEMENTS_TITLE]),
      message:   str(r[COL_ANNOUNCEMENTS_MESSAGE]),
      priority:  num(r[COL_ANNOUNCEMENTS_PRIORITY]),
      isActive:  bool(r[COL_ANNOUNCEMENTS_IS_ACTIVE]),
      expiresAt: str(r[COL_ANNOUNCEMENTS_EXPIRES_AT]),
    })),

    announcements: broadcastRows.map(r => ({   // compat alias
      title:     str(r[COL_ANNOUNCEMENTS_TITLE]),
      message:   str(r[COL_ANNOUNCEMENTS_MESSAGE]),
      isActive:  bool(r[COL_ANNOUNCEMENTS_IS_ACTIVE]),
      expiresAt: str(r[COL_ANNOUNCEMENTS_EXPIRES_AT]),
    })),

    faculty:      facultyRows.map(r => ({
      key:             str(r[COL_PERSONNEL_ID]),
      name:            str(r[COL_PERSONNEL_NAME]),
      designation:     str(r[COL_PERSONNEL_DESIGNATION]),
      description:     str(r[COL_PERSONNEL_BIO]),
      qualification:   str(r[COL_PERSONNEL_QUALIFICATION]),
      experienceYears: num(r[COL_PERSONNEL_EXPERIENCE]),
      imageUrl:        str(r[COL_PERSONNEL_IMAGE_URL]),
      email:           str(r[COL_PERSONNEL_EMAIL]),
      phone:           str(r[COL_PERSONNEL_PHONE]),
      isActive:        bool(r[COL_PERSONNEL_IS_ACTIVE]),
      displayOrder:    num(r[COL_PERSONNEL_DISPLAY_ORDER]),
    })),

    leadership:   mappedLeadership,
    principal,
    personnel,

    stats:        mappedStats,
    statistics:   mappedStats,   // compat alias — same data, same shape

    achievements: mappedAchievements,
    events:       mappedEvents,

    gallery:      mappedGallery,
    mediaLibrary: mappedGallery,   // compat alias — same data, same shape

    academicResult,
    academicResults: mappedAcademicResult ? [{   // compat alias — wrap in array
      year:           mappedAcademicResult.year,
      passPercentage: mappedAcademicResult.passPercentage,
      distinctions:   mappedAcademicResult.distinctions,
      firstClass:     mappedAcademicResult.firstClass,
      legacyQuote:    mappedAcademicResult.legacyQuote,
    }] : [],

    activities:    activityRows,
    infrastructure: infraRows,

    facilities:   infraRows.map(r => ({   // compat alias mapping infrastructure → facilities shape
      name:         str(r[COL_INFRASTRUCTURE_TITLE] ?? r['title'] ?? ''),
      description:  str(r[COL_INFRASTRUCTURE_DESCRIPTION] ?? r['description'] ?? ''),
      categoryName: str(r[COL_INFRASTRUCTURE_TAG] ?? r['tag'] ?? ''),
    })),

    contactDetails: mappedContact,
  };
}

─────────────────────────────────────────────────────────────
WHAT TO DO WITH buildTenantViewModelFromLocal
─────────────────────────────────────────────────────────────

Keep buildTenantViewModelFromLocal exactly as it is.
Do NOT modify it in this step.
It will be removed in a later step once local data is fully replaced.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interface:
  [ ] TenantViewModel has mode and screen fields
  [ ] school has: key, templateSlug, templateId, isDemo, themeConfig
  [ ] school does NOT have gracePeriodDays (removed — now in plan.gracePeriod)
  [ ] subscription has: status, endDate
  [ ] plan has: name, gracePeriod
  [ ] components[] has: componentCode, isActive, isRequired, displayOrder
  [ ] homepageSections[] has: sectionKey, isEnabled, isRequired, displayOrder
  [ ] leadership[] exists separately from faculty[]
  [ ] principal is a single object or null (not an array)
  [ ] personnel[] still exists (merged faculty + leadership) for compat
  [ ] heroMedia[] still exists (not renamed to hero)
  [ ] announcements[] still exists (not renamed to broadcast)
  [ ] statistics[] still exists (not renamed to stats)
  [ ] mediaLibrary[] still exists (not renamed to gallery)
  [ ] academicResults[] still exists as array (wraps single object)
  [ ] academicResult is new single object field (nullable)
  [ ] contactDetails is single object (nullable)
  [ ] facilities[] still exists for compat
  [ ] identity still exists with empty strings (for seo.ts compat)

Builder:
  [ ] buildTenantViewModel accepts ScreenDataPayload (not TenantApiDataItem[])
  [ ] templatecomponents deduplicated by componentcode before mapping
  [ ] principal derived with leadership.find(l => l.role === 'principal')
  [ ] personnel merges leadership first, then faculty (principal appears first)
  [ ] personType on personnel rows is role value (not hardcoded 'principal')
  [ ] academicresults read as single object (not array)
  [ ] contactdetails read as single object (not array)
  [ ] gracePeriodDays: 7 hardcoded value is GONE
  [ ] plan.graceperiod used instead via COL_PLAN_GRACE_PERIOD
  [ ] No hardcoded column name strings anywhere
  [ ] All column access uses COL_* constants from reference.js
  [ ] Import of TenantApiDataItem from tenantApi.service is REMOVED
  [ ] Import of ScreenDataPayload from screenData.service is ADDED
  [ ] buildTenantViewModelFromLocal is unchanged

Other:
  [ ] Only tenant.viewmodel.ts was modified
  [ ] No template files touched
  [ ] No seo.ts touched
  [ ] No page files touched

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File rewritten:   src/core/viewmodels/tenant.viewmodel.ts
  Other files:      NONE

  Interface changes:
    Added fields:    mode, screen, subscription, plan, components,
                     leadership, principal, faculty, broadcast, stats,
                     gallery, academicResult, contactDetails,
                     activities, infrastructure
    Compat aliases:  homepageSections, announcements, personnel,
                     statistics, mediaLibrary, academicResults, facilities

  Builder changes:
    Input type:      ScreenDataPayload (was TenantApiDataItem[])
    Deduplication:   templatecomponents by componentcode
    Principal:       derived from leadership.find(role === 'principal')
    gracePeriodDays: removed — now plan.gracePeriod from RPC response
    Single objects:  academicresults, contactdetails correctly handled

  Guardrails violated: NONE
