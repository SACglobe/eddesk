# EdDesk — Core Infrastructure Setup
# ─────────────────────────────────────────────────────────────────────
# PURPOSE:
#   Build all missing core infrastructure files so the demo route works.
#   Agent creates files in dependency order. No template files touched.
#
# RUN THIS: Before discovery prompt. Before section binding.
#           Only needs to run ONCE.
#
# PREREQUISITE FILES (must already exist in repo):
#   guardrails/guardrails.md
#   guardrails/skills/local-dummy-data.md
#   guardrails/skills/data-source-switch.md
#   src/core/constants/reference.js
#   src/core/data/local/tenant.data.js
#   src/core/data/index.js
# ─────────────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EdDesk: Core Infrastructure Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read first (in this order, fully):
  guardrails/guardrails.md
  guardrails/guardrails-api.md
  guardrails/workflow.md
  src/core/constants/reference.js
  src/core/data/local/tenant.data.js

Then build the following files IN THIS EXACT ORDER.
Do not skip. Do not reorder. Each file depends on the one before it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 1 — Constants (no dependencies)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 1: src/core/constants/constants.js
  Purpose: System-wide enums. No business logic.
  Must contain:
    TEMPLATE_IDS     = { CLASSIC: 'template_classic', MODERN: 'template_modern', PREMIUM: 'template_premium' }
    ROUTING_MODE     = { MARKETING: 'marketing', DEMO: 'demo', TENANT: 'tenant' }
    API_STATUS       = { SUCCESS: 'success', EMPTY: 'empty', ERROR: 'error' }
    POPUP_TYPE       = { ERROR: 'error', WARNING: 'warning', EMPTY: 'empty', INFO: 'info' }
    DOMAINS          = { EDDESK: 'eddesk.in', ADMIN: 'admin.eddesk.in', LOCALHOST: 'localhost' }
  Forbidden: No imports from templates. No business logic.

FILE 2: src/core/constants/templates.js
  Purpose: Template registry mapping IDs to import paths.
  Must contain:
    TEMPLATE_REGISTRY object keyed by template ID
    isValidTemplateId(templateId) function → boolean
    getTemplateConfig(templateId) function → config object or null
  Import from: constants.js only
  Forbidden: No template imports. No dynamic imports here.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 2 — Models (depends on Batch 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 3: src/core/models/tenant.model.ts
  Purpose: TypeScript interfaces for all DB entities. POJO only.
  Must contain interfaces for:
    School, HomepageSection, HeroMedia, Announcement, AcademicResult,
    Achievement, Personnel, CampusStat, FacilityCategory, Facility,
    MediaItem, SchoolEvent, AdmissionStep, SchoolIdentity
  Plus:
    TenantData     — the full data shape (all tables combined)
    TenantDataResult — { status, data, error } wrapper
  Rules:
    - Field names must exactly match reference.js constants
    - No methods, no logic, no computed values
    - All nullable DB fields must be typed as string | null (not just string)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 3 — Business Utilities (depends on Batch 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 4: src/core/business/validators.ts
  Purpose: Pure value check functions. No side effects.
  Must contain:
    isEmpty(value)           → boolean — true if null/undefined/empty string/empty array
    hasValue(value)          → boolean — inverse of isEmpty
    isValidUrl(value)        → boolean — http/https or relative path starting with /
    hasItems(arr)            → boolean — array with at least 1 item
    isSectionEnabled(val)    → boolean — true only if val === true

FILE 5: src/core/business/formatters.ts
  Purpose: Pure string/value formatting. No side effects.
  Must contain:
    toString(value, fallback) → string — safe cast, returns fallback if empty
    formatDate(dateStr)       → string — ISO date to readable (e.g. "February 22, 2025")
    formatTime(timeStr)       → string — HH:MM:SS to "8:30 AM"
    formatPercentage(value)   → string — number to "98.5%"
    truncate(text, maxLength) → string — cuts with ellipsis
  Import from: validators.ts only

FILE 6: src/core/business/media.ts
  Purpose: Image vs video detection. Pure functions.
  Must contain:
    isImageUrl(url)           → boolean — checks file extension
    isVideoUrl(url)           → boolean — checks file extension
    resolveMediaType(mediaTypeField, url) → 'image' | 'video' | null
    isMediaVisible(isActive, url) → boolean — active AND has url
  Import from: validators.ts, reference.js (MEDIA_TYPES) only
  Image extensions: jpg, jpeg, png, gif, webp, avif, svg
  Video extensions: mp4, webm, ogg, mov, avi

FILE 7: src/core/business/urls.ts
  Purpose: Domain normalization. Pure functions.
  Must contain:
    normalizeDomain(raw)     → string — lowercase, strip protocol/www/trailing slash
    isLocalhost(domain)      → boolean
    isEdDeskDomain(domain)   → boolean — matches eddesk.in or *.eddesk.in
    isTenantDomain(domain)   → boolean — not localhost AND not eddesk
  Import from: constants.js (DOMAINS) only

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 4 — Services (depends on Batches 1–3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 8: src/core/constants/api.js
  Purpose: API URL builder. Base URL from env only.
  Must contain:
    buildTenantApiUrl(domain, templateId) → string
    Format: {NEXT_PUBLIC_API_BASE_URL}/tenant/get?domain=X&template=Y
  Rules:
    - Throw clear error if NEXT_PUBLIC_API_BASE_URL is not set
    - Never hardcode any URL

FILE 9: src/core/services/tenantApi.service.ts
  Purpose: SSR-only API fetch. Never called client-side.
  Must contain:
    fetchTenantFromApi(domain, templateId) → Promise<TenantDataResult>
  Rules:
    - Uses buildTenantApiUrl() from api.js
    - cache: 'no-store' on fetch (always fresh for SSR)
    - Returns { status: 'success', data, error: null } on success
    - Returns { status: 'empty', data: null, error: null } if response has no school
    - Returns { status: 'error', data: null, error: message } on any failure
    - No UI logic. No template imports.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 5 — ViewModels (depends on Batches 1–4)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 10: src/core/viewmodels/hero.viewmodel.ts
  Purpose: Hero section business logic only.
  Must contain:
    HeroSlideProps interface
    HeroSectionProps interface
    prepareHeroProps(heroMedia[]) → HeroSectionProps
  Processing rules (in this order):
    1. Filter: is_active === true only
    2. Sort: ascending by display_order
    3. Map: use resolveMediaType() for mediaType field
    4. Fallback: all string fields default to '' if null
    5. hasSecondaryButton: true ONLY if both text AND url are non-empty
  Import from: models, business/media.ts, business/formatters.ts, business/validators.ts

FILE 11: src/core/viewmodels/home.viewmodel.ts
  Purpose: Aggregate ALL section data into HomePageProps.
  Must contain one interface per section:
    SchoolInfoProps, AnnouncementsSectionProps, StatsSectionProps,
    AcademicResultsSectionProps, AchievementsSectionProps,
    PrincipalSectionProps, FacultySectionProps, FacilitiesSectionProps,
    GallerySectionProps, EventsSectionProps, AdmissionsSectionProps,
    IdentitySectionProps
  Plus:
    HomePageProps — top-level object containing all section props + sectionOrder[]
    prepareHomePageProps(data: TenantData) → HomePageProps
  Section processing rules:
    - announcements: filter is_active, sort by priority ascending
    - stats: sort by display_order
    - academic_results: sort by year descending, expose latestResult separately
    - achievements: sort by year desc then display_order asc
    - principal: find first personnel where person_type = 'principal'
    - faculty: filter person_type = 'faculty', sort by display_order
    - facilities: group facilities under their category
    - gallery: expose both items[] (all) and featured[] (is_featured: true only)
    - events: sort by event_date ascending
    - admissions: sort by step_number ascending, include school email + phone
    - identity: map from school_identity record
    - sectionOrder: enabled sections sorted by display_order, returns section_key[]
  Import from: hero.viewmodel, models, business utilities, reference.js constants
  Forbidden: No direct DB access. No template imports. No client-side code.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 6 — Router (depends on Batches 1–3)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 12: src/core/router/domainResolver.ts
  Purpose: SSR-only domain classification.
  Must contain:
    DomainResolution type — { mode: RoutingMode, domain: string }
    resolveDomain(pathname?) → DomainResolution
  Routing rules:
    - Read host from next/headers only (never window/document)
    - localhost or eddesk.in + path starts with /demo/ → mode: 'demo'
    - localhost or eddesk.in → mode: 'marketing'
    - anything else → mode: 'tenant'
  Import from: constants.js, business/urls.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 7 — System Components (no template dependencies)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 13: src/components/system/SystemPopup.tsx
  Purpose: Error and empty state UI. Shown OUTSIDE templates.
  Props: { type: 'error'|'empty'|'warning'|'info', message: string, adminUrl?: string }
  Must show:
    - Icon and title based on type
    - The message
    - "Try Again" button (window.location.reload)
    - "Go to Admin Panel" link if adminUrl provided
  Styling: inline styles only (no CSS files, no Tailwind classes from templates)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BATCH 8 — App Routes (depends on everything above)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILE 14: src/app/demo/[templateId]/[[...path]]/page.tsx
  Purpose: Demo SSR entry point. Serves eddesk.in/demo/[templateId]
  Must:
    1. Validate templateId using isValidTemplateId()
    2. Load LOCAL_TENANT_DATA directly (demo always uses local data)
    3. Call prepareHomePageProps(LOCAL_TENANT_DATA)
    4. Dynamically import template using getTemplateConfig(templateId).importPath
    5. Render <TemplateHome {...homePageProps} />
  Rules:
    export const dynamic = 'force-dynamic'
    No API calls for demo route (guardrails-api.md § 2)
    Show SystemPopup if template ID is invalid

FILE 15: .env.local.example
  Purpose: Documents required env vars. Never committed.
  Must contain:
    USE_LOCAL_DATA=true
    NEXT_PUBLIC_API_BASE_URL=https://api.eddesk.in

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL RULES FOR ALL FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ All field names must reference reference.js constants — never hardcoded strings
✅ All files must have a top comment: purpose, skill reference, guardrail reference
✅ TypeScript files use proper types — no `any`
✅ Every nullable field handled — no silent null crashes
❌ No template files touched
❌ No CSS modifications
❌ No hardcoded domain names, table names, or column names
❌ No client-side data fetching

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
END REPORT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After all 15 files are created, output this report:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INFRASTRUCTURE SETUP REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Files created: 15

Batch 1 — Constants
  ✅ src/core/constants/constants.js
  ✅ src/core/constants/templates.js

Batch 2 — Models
  ✅ src/core/models/tenant.model.ts

Batch 3 — Business Utilities
  ✅ src/core/business/validators.ts
  ✅ src/core/business/formatters.ts
  ✅ src/core/business/media.ts
  ✅ src/core/business/urls.ts

Batch 4 — Services
  ✅ src/core/constants/api.js
  ✅ src/core/services/tenantApi.service.ts

Batch 5 — ViewModels
  ✅ src/core/viewmodels/hero.viewmodel.ts
  ✅ src/core/viewmodels/home.viewmodel.ts

Batch 6 — Router
  ✅ src/core/router/domainResolver.ts

Batch 7 — System Components
  ✅ src/components/system/SystemPopup.tsx

Batch 8 — App Routes
  ✅ src/app/demo/[templateId]/[[...path]]/page.tsx
  ✅ .env.local.example

Template files modified:  NONE
Guardrails violated:      NONE
Ready for next step:      YES — run discover-template-props.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

No other output. No explanations. Report only.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
