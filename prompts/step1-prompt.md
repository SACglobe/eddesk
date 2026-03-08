# EdDesk — Phase 1, Step 1
# Update src/lib/constants/reference.js
# ─────────────────────────────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU WRITE ANY CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these files first:
  1. src/lib/constants/reference.js          ← file you will edit
  2. src/core/services/tenantApi.service.ts  ← imports TABLE_* constants
  3. src/core/viewmodels/tenant.viewmodel.ts ← imports TABLE_* and COL_* constants
  4. src/core/services/school.service.ts     ← imports COL_SCHOOLS_* constants

Do not write a single line until you have read all four.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTEXT — WHY THIS CHANGE IS NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The project calls a Supabase RPC: get_screen_data(domain, screen, templateslug)

The RPC returns data with these exact table keys in the response:
  hero, broadcast, faculty, leadership, schoolstats, achievements,
  events, gallery, activities, infrastructure, academicresults,
  contactdetails, templatecomponents

The current reference.js has WRONG table name values for several constants.
For example TABLE_HERO_MEDIA = "herocontent" but the RPC returns "hero".
This means the viewmodel reads the wrong key and gets empty data.

This step fixes only the string values in reference.js.
No other files are changed in this step.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLOWED FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/lib/constants/reference.js   ← ONLY this file

Do NOT touch any other file in this step.
tenantApi.service.ts, tenant.viewmodel.ts, school.service.ts
are all touched in later steps — not now.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — AUDIT (answer before writing code)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For each constant below, state its current value and whether it needs updating:

  TABLE_HERO_MEDIA       current: ___   correct: "hero"
  TABLE_ANNOUNCEMENTS    current: ___   correct: "broadcast"
  TABLE_PERSONNEL        current: ___   correct: — (table split — see instructions)
  TABLE_HOMEPAGE_SECTIONS current: ___  correct: "templatecomponents"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — EXACT CHANGES TO MAKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

─────────────────────────────────────────────────────────────
1A. TABLE NAME CONSTANTS — update string values
─────────────────────────────────────────────────────────────

Make these exact value changes. Do NOT rename the variable names.
Variable names (TABLE_*, COL_*) stay exactly the same — only the string values change.

  TABLE_HERO_MEDIA        "herocontent"      → "hero"
  TABLE_ANNOUNCEMENTS     "broadcastcontent" → "broadcast"
  TABLE_HOMEPAGE_SECTIONS "templatecomponents" ← already correct, keep as is

─────────────────────────────────────────────────────────────
1B. ADD NEW TABLE CONSTANTS (add after existing TABLE_* block)
─────────────────────────────────────────────────────────────

Add these new constants. They do not exist yet:

  export const TABLE_LEADERSHIP = "leadership";
  export const TABLE_BROADCAST  = "broadcast";   // alias for TABLE_ANNOUNCEMENTS
  export const TABLE_HERO       = "hero";         // alias for TABLE_HERO_MEDIA

─────────────────────────────────────────────────────────────
1C. ADD NEW COLUMN CONSTANTS — leadership table
─────────────────────────────────────────────────────────────

The personnel table is now split into faculty + leadership in the RPC response.
TABLE_PERSONNEL already points to "faculty" which is correct for faculty rows.
Add a new section for leadership columns:

  // --- Columns: leadership ---
  export const COL_LEADERSHIP_ID           = "key";
  export const COL_LEADERSHIP_SCHOOL_ID    = "schoolkey";
  export const COL_LEADERSHIP_NAME         = "name";
  export const COL_LEADERSHIP_ROLE         = "role";        // 'principal' | 'chairman' | 'board' | others
  export const COL_LEADERSHIP_DESIGNATION  = "designation";
  export const COL_LEADERSHIP_MESSAGE      = "message";
  export const COL_LEADERSHIP_IMAGE_URL    = "imageurl";
  export const COL_LEADERSHIP_SIGNATURE_URL = "signatureurl";
  export const COL_LEADERSHIP_IS_ACTIVE    = "isactive";
  export const COL_LEADERSHIP_DISPLAY_ORDER = "displayorder";

─────────────────────────────────────────────────────────────
1D. ADD NEW COLUMN CONSTANTS — schools table (new fields)
─────────────────────────────────────────────────────────────

Add these missing school columns found in the RPC response:

  export const COL_SCHOOLS_TEMPLATE_SLUG = "templateslug";  // e.g. "template_classic"
  export const COL_SCHOOLS_IS_DEMO       = "isdemo";         // boolean

─────────────────────────────────────────────────────────────
1E. ADD NEW COLUMN CONSTANTS — subscription table
─────────────────────────────────────────────────────────────

  // --- Columns: subscription ---
  export const COL_SUBSCRIPTION_ID         = "key";
  export const COL_SUBSCRIPTION_SCHOOL_ID  = "schoolkey";
  export const COL_SUBSCRIPTION_PLAN_ID    = "plankey";
  export const COL_SUBSCRIPTION_STATUS     = "status";
  export const COL_SUBSCRIPTION_START_DATE = "startdate";
  export const COL_SUBSCRIPTION_END_DATE   = "enddate";      // expiry date

─────────────────────────────────────────────────────────────
1F. ADD NEW COLUMN CONSTANTS — plan table (from plandetails)
─────────────────────────────────────────────────────────────

  // --- Columns: plan (plandetails) ---
  export const COL_PLAN_ID           = "key";
  export const COL_PLAN_NAME         = "name";
  export const COL_PLAN_CODE         = "code";
  export const COL_PLAN_GRACE_PERIOD = "graceperiod";        // number of days
  export const COL_PLAN_IS_ACTIVE    = "isactive";

─────────────────────────────────────────────────────────────
1G. ADD NEW COLUMN CONSTANTS — templatecomponents (missing ones)
─────────────────────────────────────────────────────────────

The existing templatecomponents constants are mostly correct.
Add only the missing one:

  export const COL_TEMPLATE_COMPONENTS_CODE = "componentcode";  // 'hero' | 'broadcast' | etc.

─────────────────────────────────────────────────────────────
1H. UPDATE SECTION COMMENT for hero columns
─────────────────────────────────────────────────────────────

The comment above hero columns currently says "herocontent".
Update it to say "hero":

  // --- Columns: hero (TABLE_HERO_MEDIA) ---

─────────────────────────────────────────────────────────────
1I. UPDATE SECTION COMMENT for broadcast columns
─────────────────────────────────────────────────────────────

The comment above announcements columns currently says "broadcastcontent".
Update it to say "broadcast":

  // --- Columns: broadcast (TABLE_ANNOUNCEMENTS) ---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — WHAT NOT TO CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do NOT rename any existing variable names. They are imported by other files.
Renaming would break imports in tenantApi.service.ts and tenant.viewmodel.ts.

Specifically, keep these variable names exactly as they are:
  TABLE_HERO_MEDIA        ← keep name, only value changes
  TABLE_ANNOUNCEMENTS     ← keep name, only value changes
  TABLE_PERSONNEL         ← keep name and value ("faculty") — already correct
  TABLE_HOMEPAGE_SECTIONS ← keep name and value ("templatecomponents") — already correct
  TABLE_CAMPUS_STATISTICS ← keep name and value ("schoolstats") — already correct
  TABLE_MEDIA_LIBRARY     ← keep name and value ("gallery") — already correct
  All COL_HERO_MEDIA_*    ← keep all names, column values are already correct
  All COL_ANNOUNCEMENTS_* ← keep all names, column values are already correct
  All COL_PERSONNEL_*     ← keep all names, column values are already correct
  All COL_SCHOOLS_*       ← keep all names, only ADD new ones (1D)

Do NOT remove any existing constants even if they look unused.
Other steps will clean those up when the files that use them are rewritten.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — VALIDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check every box before reporting done:

  [ ] TABLE_HERO_MEDIA        value is now "hero"
  [ ] TABLE_ANNOUNCEMENTS     value is now "broadcast"
  [ ] TABLE_HOMEPAGE_SECTIONS value is still "templatecomponents"
  [ ] TABLE_PERSONNEL         value is still "faculty"
  [ ] TABLE_LEADERSHIP        added with value "leadership"
  [ ] TABLE_BROADCAST         added with value "broadcast"
  [ ] TABLE_HERO              added with value "hero"
  [ ] COL_LEADERSHIP_*        all 10 constants added
  [ ] COL_SCHOOLS_TEMPLATE_SLUG added with value "templateslug"
  [ ] COL_SCHOOLS_IS_DEMO       added with value "isdemo"
  [ ] COL_SUBSCRIPTION_*      all 6 constants added
  [ ] COL_PLAN_*              all 5 constants added
  [ ] COL_TEMPLATE_COMPONENTS_CODE added with value "componentcode"
  [ ] Hero section comment updated to "hero (TABLE_HERO_MEDIA)"
  [ ] Broadcast section comment updated to "broadcast (TABLE_ANNOUNCEMENTS)"
  [ ] No existing variable names were renamed
  [ ] No existing constants were deleted
  [ ] No other files were modified

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  File modified:    src/lib/constants/reference.js
  Other files:      NONE

  Values changed:
    TABLE_HERO_MEDIA:     "herocontent" → "hero"
    TABLE_ANNOUNCEMENTS:  "broadcastcontent" → "broadcast"

  Constants added:
    TABLE_LEADERSHIP, TABLE_BROADCAST, TABLE_HERO
    COL_LEADERSHIP_* (10 constants)
    COL_SCHOOLS_TEMPLATE_SLUG, COL_SCHOOLS_IS_DEMO
    COL_SUBSCRIPTION_* (6 constants)
    COL_PLAN_* (5 constants)
    COL_TEMPLATE_COMPONENTS_CODE

  Constants renamed:    NONE
  Constants deleted:    NONE
  Other files changed:  NONE
  Guardrails violated:  NONE
