/**
 * Database Reference Constants
 * This file maps physical database table and column names to logical variables.
 * Usage: Importing these variables ensures that schema changes only require updates in this file.
 */

// --- Table Names ---
export const TABLE_SCHOOLS = "schools";
export const TABLE_HOMEPAGE_SECTIONS = "homepage_sections";
export const TABLE_HERO_MEDIA = "hero_media";
export const TABLE_ANNOUNCEMENTS = "announcements";
export const TABLE_ACADEMIC_RESULTS = "academic_results";
export const TABLE_ACHIEVEMENTS = "achievements";
export const TABLE_PERSONNEL = "personnel";
export const TABLE_CAMPUS_STATISTICS = "campus_statistics";
export const TABLE_FACILITY_CATEGORIES = "facility_categories";
export const TABLE_FACILITIES = "facilities";
export const TABLE_MEDIA_LIBRARY = "media_library";
export const TABLE_EVENTS = "events";
export const TABLE_ADMISSION_STEPS = "admission_steps";
export const TABLE_SCHOOL_IDENTITY = "school_identity";

// --- Columns: schools ---
export const COL_SCHOOLS_ID = "id";
export const COL_SCHOOLS_NAME = "name";
export const COL_SCHOOLS_SLUG = "slug";
export const COL_SCHOOLS_CUSTOM_DOMAIN = "custom_domain";
export const COL_SCHOOLS_LOGO_URL = "logo_url";
export const COL_SCHOOLS_EMAIL = "email";
export const COL_SCHOOLS_PHONE = "phone";
export const COL_SCHOOLS_ADDRESS = "address";
export const COL_SCHOOLS_CITY = "city";
export const COL_SCHOOLS_STATE = "state";
export const COL_SCHOOLS_COUNTRY = "country";
export const COL_SCHOOLS_POSTAL_CODE = "postal_code";
export const COL_SCHOOLS_PLAN_TYPE = "plan_type";
export const COL_SCHOOLS_SUBSCRIPTION_STATUS = "subscription_status";
export const COL_SCHOOLS_IS_ACTIVE = "is_active";
export const COL_SCHOOLS_CREATED_AT = "created_at";
export const COL_SCHOOLS_UPDATED_AT = "updated_at";
export const COL_SCHOOLS_TEMPLATE_ID = "template_id";
export const COL_SCHOOLS_EXPIRATION_DATE = "expiration_date";
export const COL_SCHOOLS_PAYMENTGATEWAY_URL = "paymentgateway_url";

// --- Columns: homepage_sections ---
export const COL_HOMEPAGE_SECTIONS_ID = "id";
export const COL_HOMEPAGE_SECTIONS_SCHOOL_ID = "school_id";
export const COL_HOMEPAGE_SECTIONS_SECTION_KEY = "section_key";
export const COL_HOMEPAGE_SECTIONS_IS_ENABLED = "is_enabled";
export const COL_HOMEPAGE_SECTIONS_DISPLAY_ORDER = "display_order";
export const COL_HOMEPAGE_SECTIONS_SETTINGS = "settings";
export const COL_HOMEPAGE_SECTIONS_CREATED_AT = "created_at";

// --- Columns: hero_media ---
export const COL_HERO_MEDIA_ID = "id";
export const COL_HERO_MEDIA_SCHOOL_ID = "school_id";
export const COL_HERO_MEDIA_TYPE = "media_type";
export const COL_HERO_MEDIA_URL = "media_url";
export const COL_HERO_MEDIA_HEADLINE = "headline";
export const COL_HERO_MEDIA_SUBHEADLINE = "subheadline";
export const COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT = "primary_button_text";
export const COL_HERO_MEDIA_PRIMARY_BUTTON_URL = "primary_button_url";
export const COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT = "secondary_button_text";
export const COL_HERO_MEDIA_SECONDARY_BUTTON_URL = "secondary_button_url";
export const COL_HERO_MEDIA_DISPLAY_ORDER = "display_order";
export const COL_HERO_MEDIA_IS_ACTIVE = "is_active";

// --- Columns: announcements ---
export const COL_ANNOUNCEMENTS_ID = "id";
export const COL_ANNOUNCEMENTS_SCHOOL_ID = "school_id";
export const COL_ANNOUNCEMENTS_TITLE = "title";
export const COL_ANNOUNCEMENTS_MESSAGE = "message";
export const COL_ANNOUNCEMENTS_PRIORITY = "priority";
export const COL_ANNOUNCEMENTS_EXPIRES_AT = "expires_at";
export const COL_ANNOUNCEMENTS_IS_ACTIVE = "is_active";

// --- Columns: academic_results ---
export const COL_ACADEMIC_RESULTS_ID = "id";
export const COL_ACADEMIC_RESULTS_SCHOOL_ID = "school_id";
export const COL_ACADEMIC_RESULTS_YEAR = "year";
export const COL_ACADEMIC_RESULTS_PASS_PERCENTAGE = "pass_percentage";
export const COL_ACADEMIC_RESULTS_DISTINCTIONS = "distinctions";
export const COL_ACADEMIC_RESULTS_FIRST_CLASS = "first_class";
export const COL_ACADEMIC_RESULTS_LEGACY_QUOTE = "legacy_quote";

// --- Columns: achievements ---
export const COL_ACHIEVEMENTS_ID = "id";
export const COL_ACHIEVEMENTS_SCHOOL_ID = "school_id";
export const COL_ACHIEVEMENTS_YEAR = "year";
export const COL_ACHIEVEMENTS_CATEGORY = "category";
export const COL_ACHIEVEMENTS_TITLE = "title";
export const COL_ACHIEVEMENTS_DESCRIPTION = "description";
export const COL_ACHIEVEMENTS_TYPE = "achievement_type";
export const COL_ACHIEVEMENTS_DISPLAY_ORDER = "display_order";

// --- Columns: personnel ---
export const COL_PERSONNEL_ID = "id";
export const COL_PERSONNEL_SCHOOL_ID = "school_id";
export const COL_PERSONNEL_NAME = "name";
export const COL_PERSONNEL_DESIGNATION = "designation";
export const COL_PERSONNEL_BIO = "bio";
export const COL_PERSONNEL_PHOTO_URL = "photo_url";
export const COL_PERSONNEL_TYPE = "person_type";
export const COL_PERSONNEL_DISPLAY_ORDER = "display_order";
export const COL_PERSONNEL_IS_FEATURED = "is_featured";

// --- Columns: campus_statistics ---
export const COL_CAMPUS_STATISTICS_ID = "id";
export const COL_CAMPUS_STATISTICS_SCHOOL_ID = "school_id";
export const COL_CAMPUS_STATISTICS_LABEL = "label";
export const COL_CAMPUS_STATISTICS_VALUE = "value";
export const COL_CAMPUS_STATISTICS_ICON = "icon";
export const COL_CAMPUS_STATISTICS_DISPLAY_ORDER = "display_order";

// --- Columns: facility_categories ---
export const COL_FACILITY_CATEGORIES_ID = "id";
export const COL_FACILITY_CATEGORIES_SCHOOL_ID = "school_id";
export const COL_FACILITY_CATEGORIES_NAME = "name";
export const COL_FACILITY_CATEGORIES_ICON = "icon";
export const COL_FACILITY_CATEGORIES_DISPLAY_ORDER = "display_order";

// --- Columns: facilities ---
export const COL_FACILITIES_ID = "id";
export const COL_FACILITIES_SCHOOL_ID = "school_id";
export const COL_FACILITIES_CATEGORY_ID = "category_id";
export const COL_FACILITIES_NAME = "name";
export const COL_FACILITIES_DESCRIPTION = "description";
export const COL_FACILITIES_CATEGORY_NAME = "category_name";

// --- Columns: media_library ---
export const COL_MEDIA_LIBRARY_ID = "id";
export const COL_MEDIA_LIBRARY_SCHOOL_ID = "school_id";
export const COL_MEDIA_LIBRARY_TYPE = "media_type";
export const COL_MEDIA_LIBRARY_CATEGORY = "category";
export const COL_MEDIA_LIBRARY_URL = "url";
export const COL_MEDIA_LIBRARY_CAPTION = "caption";
export const COL_MEDIA_LIBRARY_IS_FEATURED = "is_featured";
export const COL_MEDIA_LIBRARY_CREATED_AT = "created_at";

// --- Columns: events ---
export const COL_EVENTS_ID = "id";
export const COL_EVENTS_SCHOOL_ID = "school_id";
export const COL_EVENTS_DATE = "event_date";
export const COL_EVENTS_START_TIME = "start_time";
export const COL_EVENTS_END_TIME = "end_time";
export const COL_EVENTS_TITLE = "title";
export const COL_EVENTS_CATEGORY = "category";
export const COL_EVENTS_DESCRIPTION = "description";
export const COL_EVENTS_LOCATION = "location";
export const COL_EVENTS_IS_FEATURED = "is_featured";

// --- Columns: admission_steps ---
export const COL_ADMISSION_STEPS_ID = "id";
export const COL_ADMISSION_STEPS_SCHOOL_ID = "school_id";
export const COL_ADMISSION_STEPS_NUMBER = "step_number";
export const COL_ADMISSION_STEPS_TITLE = "title";
export const COL_ADMISSION_STEPS_DESCRIPTION = "description";
export const COL_ADMISSION_STEPS_STATUS = "status";

// --- Columns: school_identity ---
export const COL_SCHOOL_IDENTITY_ID = "id";
export const COL_SCHOOL_IDENTITY_SCHOOL_ID = "school_id";
export const COL_SCHOOL_IDENTITY_VISION = "vision";
export const COL_SCHOOL_IDENTITY_MISSION = "mission";
export const COL_SCHOOL_IDENTITY_MOTTO = "motto";
