/**
 * Database Reference Constants
 * This file maps physical database table and column names to logical variables.
 * Usage: Importing these variables ensures that schema changes only require updates in this file.
 * 
 * NOTE: Updated to match Supabase schema (adjxsdihvjwntavpymhg)
 * Maintenance note: Keep variable names (COL_*) stable to avoid breaking imports.
 */

// --- Table Names ---
export const TABLE_SCHOOLS = "schools";
export const TABLE_HOMEPAGE_SECTIONS = "templatecomponents"; // Map to new table
export const TABLE_COMPONENT_REGISTRY = "componentregistry";
export const TABLE_HERO_MEDIA = "herocontent";
export const TABLE_ANNOUNCEMENTS = "broadcastcontent";
export const TABLE_ACADEMIC_RESULTS = "academicresults";
export const TABLE_ACHIEVEMENTS = "achievements";
export const TABLE_PERSONNEL = "faculty";
export const TABLE_CAMPUS_STATISTICS = "schoolstats";
export const TABLE_FACILITY_CATEGORIES = "infrastructure"; // Aliased to infrastructure for now if schema changed
export const TABLE_FACILITIES = "infrastructure"; // Aliased for compatibility
export const TABLE_INFRASTRUCTURE = "infrastructure";
export const TABLE_MEDIA_LIBRARY = "gallery";
export const TABLE_EVENTS = "events";
export const TABLE_ADMISSION_STEPS = "admissioninstructions";
export const TABLE_SCHOOL_IDENTITY = "schools"; // Combined into schools table typically, or principalmessage? 
// For now, keeping TABLE_SCHOOL_IDENTITY as "schools" or "academics" depending on where fields went.
// In the discovered schema, mission/vision moved to 'schools' themeconfig or specific tables.
// Let's use 'principalmessage' or 'contactdetails' if needed. For now mapping to 'schools' to avoid nulls.

export const TABLE_TESTIMONIALS = "testimonialcontent";
export const TABLE_PRINCIPAL_MESSAGE = "principalmessage";
export const TABLE_ACADEMICS = "academics";
export const TABLE_ACTIVITIES = "activities";
export const TABLE_CONTACT_DETAILS = "contactdetails";
export const TABLE_TEMPLATES = "templates";
export const TABLE_TEMPLATE_SCREENS = "templatescreens";
export const TABLE_FORM_SUBMISSIONS = "formsubmissions";

// --- Columns: Global / Shared ---
export const COL_ID = "key";
export const COL_SCHOOL_ID = "schoolkey";
export const COL_CREATED_AT = "createdat";
export const COL_UPDATED_AT = "updatedat";
export const COL_IS_ACTIVE = "isactive";
export const COL_DISPLAY_ORDER = "displayorder";

// --- Columns: schools ---
export const COL_SCHOOLS_ID = "key";
export const COL_SCHOOLS_NAME = "name";
export const COL_SCHOOLS_SLUG = "slug";
export const COL_SCHOOLS_CUSTOM_DOMAIN = "customdomain";
export const COL_SCHOOLS_LOGO_URL = "logo_url";
export const COL_SCHOOLS_EMAIL = "email";
export const COL_SCHOOLS_PHONE = "phone";
export const COL_SCHOOLS_ADDRESS = "address";
export const COL_SCHOOLS_CITY = "city";
export const COL_SCHOOLS_STATE = "state";
export const COL_SCHOOLS_COUNTRY = "country";
export const COL_SCHOOLS_POSTAL_CODE = "postal_code";
export const COL_SCHOOLS_TEMPLATE_ID = "templatekey";
export const COL_SCHOOLS_THEME_CONFIG = "themeconfig";
export const COL_SCHOOLS_IS_ACTIVE = "isactive";
export const COL_SCHOOLS_CREATED_AT = "createdat";
export const COL_SCHOOLS_UPDATED_AT = "updatedat";
export const COL_SCHOOLS_EXPIRATION_DATE = "expirationdate"; // Added back
export const COL_SCHOOLS_PAYMENTGATEWAY_URL = "paymentgateway_url"; // Added back

// --- Columns: herocontent (TABLE_HERO_MEDIA) ---
export const COL_HERO_MEDIA_ID = "key";
export const COL_HERO_MEDIA_SCHOOL_ID = "schoolkey";
export const COL_HERO_MEDIA_PAGE_TYPE = "pagetype";
export const COL_HERO_MEDIA_TYPE = "mediatype";
export const COL_HERO_MEDIA_URL = "mediaurl";
export const COL_HERO_MEDIA_HEADLINE = "headline";
export const COL_HERO_MEDIA_SUBHEADLINE = "subheadline";
export const COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT = "primarybuttontext";
export const COL_HERO_MEDIA_PRIMARY_BUTTON_URL = "primarybuttonurl";
export const COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT = "secondarybuttontext";
export const COL_HERO_MEDIA_SECONDARY_BUTTON_URL = "secondarybuttonurl";
export const COL_HERO_MEDIA_DISPLAY_ORDER = "displayorder";
export const COL_HERO_MEDIA_IS_ACTIVE = "isactive";

// --- Columns: broadcastcontent (TABLE_ANNOUNCEMENTS) ---
export const COL_ANNOUNCEMENTS_ID = "key";
export const COL_ANNOUNCEMENTS_SCHOOL_ID = "schoolkey";
export const COL_ANNOUNCEMENTS_TITLE = "title";
export const COL_ANNOUNCEMENTS_MESSAGE = "message";
export const COL_ANNOUNCEMENTS_PRIORITY = "priority";
export const COL_ANNOUNCEMENTS_EXPIRES_AT = "expiresat";
export const COL_ANNOUNCEMENTS_IS_ACTIVE = "isactive";

// --- Columns: academicresults (TABLE_ACADEMIC_RESULTS) ---
export const COL_ACADEMIC_RESULTS_ID = "key";
export const COL_ACADEMIC_RESULTS_SCHOOL_ID = "schoolkey";
export const COL_ACADEMIC_RESULTS_YEAR = "year";
export const COL_ACADEMIC_RESULTS_PASS_PERCENTAGE = "passpercentage";
export const COL_ACADEMIC_RESULTS_DISTINCTIONS = "distinctions";
export const COL_ACADEMIC_RESULTS_FIRST_CLASS = "firstclass";
export const COL_ACADEMIC_RESULTS_LEGACY_QUOTE = "legacyquote";

// --- Columns: achievements ---
export const COL_ACHIEVEMENTS_ID = "key";
export const COL_ACHIEVEMENTS_SCHOOL_ID = "schoolkey";
export const COL_ACHIECHIEVEMENTS_YEAR = "year"; // Restored original prefix if possible? Actually was COL_ACHIEVEMENTS_YEAR.
export const COL_ACHIEVEMENTS_YEAR = "year";
export const COL_ACHIEVEMENTS_CATEGORY = "category";
export const COL_ACHIEVEMENTS_TITLE = "title";
export const COL_ACHIEVEMENTS_DESCRIPTION = "description";
export const COL_ACHIEVEMENTS_PHOTO_URL = "imageurl"; // Restored original name
export const COL_ACHIEVEMENTS_IMAGE_URL = "imageurl"; // Alias
export const COL_ACHIEVEMENTS_AWARD_LEVEL = "awardlevel";
export const COL_ACHIEVEMENTS_DISPLAY_ORDER = "displayorder";
export const COL_ACHIEVEMENTS_IS_FEATURED = "isfeatured";
export const COL_ACHIEVEMENTS_TYPE = "achievement_type"; // Restored name if it existed

// --- Columns: faculty (TABLE_PERSONNEL) ---
export const COL_PERSONNEL_ID = "key";
export const COL_PERSONNEL_SCHOOL_ID = "schoolkey";
export const COL_PERSONNEL_NAME = "name";
export const COL_PERSONNEL_QUALIFICATION = "qualification";
export const COL_PERSONNEL_DESIGNATION = "designation";
export const COL_PERSONNEL_EXPERIENCE = "experience_years";
export const COL_PERSONNEL_BIO = "description"; // Restored name
export const COL_PERSONNEL_DESCRIPTION = "description"; // Alias
export const COL_PERSONNEL_PHOTO_URL = "imageurl"; // Restored name
export const COL_PERSONNEL_IMAGE_URL = "imageurl"; // Alias
export const COL_PERSONNEL_EMAIL = "email";
export const COL_PERSONNEL_PHONE = "phone";
export const COL_PERSONNEL_DISPLAY_ORDER = "displayorder";
export const COL_PERSONNEL_IS_ACTIVE = "isactive";
export const COL_PERSONNEL_TYPE = "person_type"; // Restored
export const COL_PERSONNEL_IS_FEATURED = "isfeatured"; // Restored

// --- Columns: schoolstats (TABLE_CAMPUS_STATISTICS) ---
export const COL_CAMPUS_STATISTICS_ID = "key";
export const COL_CAMPUS_STATISTICS_SCHOOL_ID = "schoolkey";
export const COL_CAMPUS_STATISTICS_LABEL = "label";
export const COL_CAMPUS_STATISTICS_VALUE = "value";
export const COL_CAMPUS_STATISTICS_ICON = "icon";
export const COL_CAMPUS_STATISTICS_DISPLAY_ORDER = "displayorder";

// --- Columns: infrastructure (TABLE_INFRASTRUCTURE) ---
export const COL_INFRASTRUCTURE_ID = "key";
export const COL_INFRASTRUCTURE_SCHOOL_ID = "schoolkey";
export const COL_INFRASTRUCTURE_TITLE = "title";
export const COL_INFRASTRUCTURE_TAG = "tag";
export const COL_INFRASTRUCTURE_DESCRIPTION = "description";
export const COL_INFRASTRUCTURE_IMAGE_URL = "imageurl";
export const COL_INFRASTRUCTURE_HIGHLIGHT_TITLE = "highlighttitle";
export const COL_INFRASTRUCTURE_HIGHLIGHT_DESC = "highlightdescription";
export const COL_INFRASTRUCTURE_ICON = "icon";
export const COL_INFRASTRUCTURE_DISPLAY_ORDER = "displayorder";

// Alias for old FACILITIES table compatibility
export const COL_FACILITIES_NAME = "title";
export const COL_FACILITIES_DESCRIPTION = "description";
export const COL_FACILITIES_CATEGORY_NAME = "tag";

// --- Columns: gallery (TABLE_MEDIA_LIBRARY) ---
export const COL_MEDIA_LIBRARY_ID = "key";
export const COL_MEDIA_LIBRARY_SCHOOL_ID = "schoolkey";
export const COL_MEDIA_LIBRARY_TYPE = "mediatype";
export const COL_MEDIA_LIBRARY_URL = "url";
export const COL_MEDIA_LIBRARY_CAPTION = "caption";
export const COL_MEDIA_LIBRARY_CATEGORY = "category";
export const COL_MEDIA_LIBRARY_IS_FEATURED = "isfeatured";
export const COL_MEDIA_LIBRARY_DISPLAY_ORDER = "displayorder";

// --- Columns: events ---
export const COL_EVENTS_ID = "key";
export const COL_EVENTS_SCHOOL_ID = "schoolkey";
export const COL_EVENTS_TITLE = "title";
export const COL_EVENTS_DESCRIPTION = "description";
export const COL_EVENTS_DATE = "eventdate";
export const COL_EVENTS_START_TIME = "starttime";
export const COL_EVENTS_END_TIME = "endtime";
export const COL_EVENTS_CATEGORY = "category";
export const COL_EVENTS_LOCATION = "location";
export const COL_EVENTS_IMAGE_URL = "imageurl";
export const COL_EVENTS_IS_FEATURED = "isfeatured";

// --- Columns: admissioninstructions (TABLE_ADMISSION_STEPS) ---
export const COL_ADMISSION_STEPS_ID = "key";
export const COL_ADMISSION_STEPS_SCHOOL_ID = "schoolkey";
export const COL_ADMISSION_STEPS_DESCRIPTION = "description";
export const COL_ADMISSION_STEPS_EMAIL = "contactemail";
export const COL_ADMISSION_STEPS_PHONE = "contactphone";
export const COL_ADMISSION_STEPS_TITLE = "title"; // Restored
export const COL_ADMISSION_STEPS_NUMBER = "step_number"; // Restored

// --- Columns: principalmessage ---
export const COL_PRINCIPAL_MESSAGE_ID = "key";
export const COL_PRINCIPAL_MESSAGE_SCHOOL_ID = "schoolkey";
export const COL_PRINCIPAL_MESSAGE_NAME = "name";
export const COL_PRINCIPAL_MESSAGE_DESIGNATION = "designation";
export const COL_PRINCIPAL_MESSAGE_MESSAGE = "message";
export const COL_PRINCIPAL_MESSAGE_IMAGE_URL = "imageurl";
export const COL_PRINCIPAL_MESSAGE_SIGNATURE_URL = "signatureurl";

// --- Columns: academics ---
export const COL_ACADEMICS_ID = "key";
export const COL_ACADEMICS_SCHOOL_ID = "schoolkey";
export const COL_ACADEMICS_STANDARD_FROM = "standardfrom";
export const COL_ACADEMICS_STANDARD_TO = "standardto";
export const COL_ACADEMICS_MEDIUM = "medium";
export const COL_ACADEMICS_BOARD_TYPE = "boardtype";
export const COL_ACADEMICS_DESCRIPTION = "description";
export const COL_ACADEMICS_HIGHLIGHT1 = "highlight1";
export const COL_ACADEMICS_HIGHLIGHT2 = "highlight2";
export const COL_ACADEMICS_HIGHLIGHT3 = "highlight3";
export const COL_ACADEMICS_IMAGE_URL = "imageurl";

// --- Columns: activities ---
export const COL_ACTIVITIES_ID = "key";
export const COL_ACTIVITIES_SCHOOL_ID = "schoolkey";
export const COL_ACTIVITIES_TITLE = "title";
export const COL_ACTIVITIES_TAG = "tag";
export const COL_ACTIVITIES_DESCRIPTION = "description";
export const COL_ACTIVITIES_IMAGE_URL = "imageurl";
export const COL_ACTIVITIES_HIGHLIGHT_STAT = "highlightstat";
export const COL_ACTIVITIES_HIGHLIGHT_TAG = "highlighttag";
export const COL_ACTIVITIES_DISPLAY_ORDER = "displayorder";

// --- Columns: contactdetails ---
export const COL_CONTACT_DETAILS_ID = "key";
export const COL_CONTACT_DETAILS_SCHOOL_ID = "schoolkey";
export const COL_CONTACT_DETAILS_PHONE = "phone";
export const COL_CONTACT_DETAILS_EMAIL = "email";
export const COL_CONTACT_DETAILS_ADDRESS = "address";
export const COL_CONTACT_DETAILS_MAP_URL = "mapembedurl";
export const COL_CONTACT_DETAILS_FACEBOOK = "facebook";
export const COL_CONTACT_DETAILS_INSTAGRAM = "instagram";
export const COL_CONTACT_DETAILS_TWITTER = "twitter";
export const COL_CONTACT_DETAILS_YOUTUBE = "youtube";

// --- Columns: testimonialcontent ---
export const COL_TESTIMONIALS_ID = "key";
export const COL_TESTIMONIALS_SCHOOL_ID = "schoolkey";
export const COL_TESTIMONIALS_AUTHOR = "authorname";
export const COL_TESTIMONIALS_DESIGNATION = "designation";
export const COL_TESTIMONIALS_MESSAGE = "message";
export const COL_TESTIMONIALS_PHOTO_URL = "photo_url";
export const COL_TESTIMONIALS_RATING = "rating";
export const COL_TESTIMONIALS_DISPLAY_ORDER = "displayorder";
export const COL_TESTIMONIALS_IS_ACTIVE = "isactive";

// --- Columns: templatecomponents (TABLE_HOMEPAGE_SECTIONS) ---
export const COL_TEMPLATE_COMPONENTS_ID = "key";
export const COL_TEMPLATE_COMPONENTS_SCREEN_KEY = "templatescreenkey";
export const COL_TEMPLATE_COMPONENTS_KEY = "componentkey";
export const COL_TEMPLATE_COMPONENTS_ORDER = "displayorder";
export const COL_TEMPLATE_COMPONENTS_REQUIRED = "isrequired";
export const COL_TEMPLATE_COMPONENTS_VALIDATION = "validationconfig";
export const COL_TEMPLATE_COMPONENTS_IS_ACTIVE = "isactive";

export const COL_HOMEPAGE_SECTIONS_SECTION_KEY = "componentkey"; // Re-mapped
export const COL_HOMEPAGE_SECTIONS_IS_ENABLED = "isactive"; // Re-mapped
export const COL_HOMEPAGE_SECTIONS_DISPLAY_ORDER = "displayorder";
export const COL_HOMEPAGE_SECTIONS_SETTINGS = "validationconfig"; // Best guess mapping or JSON settings?

// --- Columns: componentregistry ---
export const COL_COMPONENT_REGISTRY_ID = "key";
export const COL_COMPONENT_REGISTRY_KEY = "componentkey";
export const COL_COMPONENT_REGISTRY_NAME = "componentname";
export const COL_COMPONENT_REGISTRY_TABLE = "tablename";
export const COL_COMPONENT_REGISTRY_DATATYPE = "datatype";
export const COL_COMPONENT_REGISTRY_ORDERING = "supportsordering";
export const COL_COMPONENT_REGISTRY_IS_ACTIVE = "isactive";

// --- Columns: templates ---
export const COL_TEMPLATES_ID = "key";
export const COL_TEMPLATES_NAME = "name";
export const COL_TEMPLATES_CODE = "code";
export const COL_TEMPLATES_DESCRIPTION = "description";
export const COL_TEMPLATES_IS_ACTIVE = "isactive";

// --- Columns: templatescreens ---
export const COL_TEMPLATE_SCREENS_ID = "key";
export const COL_TEMPLATE_SCREENS_TEMPLATE_KEY = "templatekey";
export const COL_TEMPLATE_SCREENS_NAME = "screenname";
export const COL_TEMPLATE_SCREENS_ROUTE = "route";
export const COL_TEMPLATE_SCREENS_ORDER = "displayorder";
export const COL_TEMPLATE_SCREENS_IS_ACTIVE = "isactive";

// --- Columns: formsubmissions ---
export const COL_FORM_SUBMISSIONS_ID = "key";
export const COL_FORM_SUBMISSIONS_SCHOOL_ID = "schoolkey";
export const COL_FORM_SUBMISSIONS_TYPE = "formtype";
export const COL_FORM_SUBMISSIONS_PAYLOAD = "payload";
export const COL_FORM_SUBMISSIONS_STATUS = "status";

// --- Columns: school_identity (Mapped back for compatibility) ---
// Note: Many of these were previously in school_identity table but are now scattered.
// Mapping to 'academics' or 'schools' columns where appropriate.
export const COL_SCHOOL_IDENTITY_VISION = "vision"; // Might be in themeconfig or contactdetails?
export const COL_SCHOOL_IDENTITY_MISSION = "mission";
export const COL_SCHOOL_IDENTITY_MOTTO = "motto";
export const COL_SCHOOL_IDENTITY_ABOUT_TITLE = "about_title";
export const COL_SCHOOL_IDENTITY_ABOUT_DESCRIPTION = "about_description";
export const COL_SCHOOL_IDENTITY_WHY_CHOOSE_US = "why_choose_us"; // This was likely a JSON array?

export const COL_FACILITY_CATEGORIES_NAME = "tag"; // Compatibility mapping
