/**
 * reference.js
 * ─────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for all database table and column names.
 *
 * GUARDRAIL: No table or column name may be hardcoded anywhere else.
 * All DB/API field access must use these constants.
 *
 * Skill: Database Constants Mapping (skills.md § Skill 2)
 * ─────────────────────────────────────────────────────────────────────
 */

// ── Table Names ────────────────────────────────────────────────────
export const TABLES = {
  SCHOOLS:              'schools',
  HOMEPAGE_SECTIONS:    'homepage_sections',
  HERO_MEDIA:           'hero_media',
  ANNOUNCEMENTS:        'announcements',
  ACADEMIC_RESULTS:     'academic_results',
  ACHIEVEMENTS:         'achievements',
  PERSONNEL:            'personnel',
  CAMPUS_STATISTICS:    'campus_statistics',
  FACILITY_CATEGORIES:  'facility_categories',
  FACILITIES:           'facilities',
  MEDIA_LIBRARY:        'media_library',
  EVENTS:               'events',
  ADMISSION_STEPS:      'admission_steps',
  SCHOOL_IDENTITY:      'school_identity',
};

// ── schools columns ────────────────────────────────────────────────
export const SCHOOLS = {
  ID:                   'id',
  NAME:                 'name',
  SLUG:                 'slug',
  CUSTOM_DOMAIN:        'custom_domain',
  LOGO_URL:             'logo_url',
  EMAIL:                'email',
  PHONE:                'phone',
  ADDRESS:              'address',
  CITY:                 'city',
  STATE:                'state',
  COUNTRY:              'country',
  POSTAL_CODE:          'postal_code',
  PLAN_TYPE:            'plan_type',
  SUBSCRIPTION_STATUS:  'subscription_status',
  IS_ACTIVE:            'is_active',
  TEMPLATE_ID:          'template_id',
  EXPIRATION_DATE:      'expiration_date',
  PAYMENT_GATEWAY_URL:  'paymentgateway_url',
  CREATED_AT:           'created_at',
  UPDATED_AT:           'updated_at',
};

// ── homepage_sections columns ──────────────────────────────────────
export const HOMEPAGE_SECTIONS = {
  ID:             'id',
  SCHOOL_ID:      'school_id',
  SECTION_KEY:    'section_key',
  IS_ENABLED:     'is_enabled',
  DISPLAY_ORDER:  'display_order',
  SETTINGS:       'settings',
  CREATED_AT:     'created_at',
};

// ── hero_media columns ─────────────────────────────────────────────
export const HERO_MEDIA = {
  ID:                     'id',
  SCHOOL_ID:              'school_id',
  MEDIA_TYPE:             'media_type',
  MEDIA_URL:              'media_url',
  HEADLINE:               'headline',
  SUBHEADLINE:            'subheadline',
  PRIMARY_BUTTON_TEXT:    'primary_button_text',
  PRIMARY_BUTTON_URL:     'primary_button_url',
  SECONDARY_BUTTON_TEXT:  'secondary_button_text',
  SECONDARY_BUTTON_URL:   'secondary_button_url',
  DISPLAY_ORDER:          'display_order',
  IS_ACTIVE:              'is_active',
};

// ── announcements columns ──────────────────────────────────────────
export const ANNOUNCEMENTS = {
  ID:          'id',
  SCHOOL_ID:   'school_id',
  TITLE:       'title',
  MESSAGE:     'message',
  PRIORITY:    'priority',
  EXPIRES_AT:  'expires_at',
  IS_ACTIVE:   'is_active',
};

// ── academic_results columns ───────────────────────────────────────
export const ACADEMIC_RESULTS = {
  ID:               'id',
  SCHOOL_ID:        'school_id',
  YEAR:             'year',
  PASS_PERCENTAGE:  'pass_percentage',
  DISTINCTIONS:     'distinctions',
  FIRST_CLASS:      'first_class',
  LEGACY_QUOTE:     'legacy_quote',
};

// ── achievements columns ───────────────────────────────────────────
export const ACHIEVEMENTS = {
  ID:               'id',
  SCHOOL_ID:        'school_id',
  YEAR:             'year',
  CATEGORY:         'category',
  TITLE:            'title',
  DESCRIPTION:      'description',
  ACHIEVEMENT_TYPE: 'achievement_type',
  DISPLAY_ORDER:    'display_order',
};

// ── personnel columns ──────────────────────────────────────────────
export const PERSONNEL = {
  ID:             'id',
  SCHOOL_ID:      'school_id',
  NAME:           'name',
  DESIGNATION:    'designation',
  BIO:            'bio',
  PHOTO_URL:      'photo_url',
  PERSON_TYPE:    'person_type',
  DISPLAY_ORDER:  'display_order',
  IS_FEATURED:    'is_featured',
};

// ── campus_statistics columns ──────────────────────────────────────
export const CAMPUS_STATISTICS = {
  ID:             'id',
  SCHOOL_ID:      'school_id',
  LABEL:          'label',
  VALUE:          'value',
  ICON:           'icon',
  DISPLAY_ORDER:  'display_order',
};

// ── facility_categories columns ────────────────────────────────────
export const FACILITY_CATEGORIES = {
  ID:             'id',
  SCHOOL_ID:      'school_id',
  NAME:           'name',
  ICON:           'icon',
  DISPLAY_ORDER:  'display_order',
};

// ── facilities columns ─────────────────────────────────────────────
export const FACILITIES = {
  ID:             'id',
  SCHOOL_ID:      'school_id',
  CATEGORY_ID:    'category_id',
  NAME:           'name',
  DESCRIPTION:    'description',
  CATEGORY_NAME:  'category_name',
};

// ── media_library columns ──────────────────────────────────────────
export const MEDIA_LIBRARY = {
  ID:           'id',
  SCHOOL_ID:    'school_id',
  MEDIA_TYPE:   'media_type',
  CATEGORY:     'category',
  URL:          'url',
  CAPTION:      'caption',
  IS_FEATURED:  'is_featured',
  CREATED_AT:   'created_at',
};

// ── events columns ─────────────────────────────────────────────────
export const EVENTS = {
  ID:           'id',
  SCHOOL_ID:    'school_id',
  EVENT_DATE:   'event_date',
  START_TIME:   'start_time',
  END_TIME:     'end_time',
  TITLE:        'title',
  CATEGORY:     'category',
  DESCRIPTION:  'description',
  LOCATION:     'location',
  IS_FEATURED:  'is_featured',
};

// ── admission_steps columns ────────────────────────────────────────
export const ADMISSION_STEPS = {
  ID:           'id',
  SCHOOL_ID:    'school_id',
  STEP_NUMBER:  'step_number',
  TITLE:        'title',
  DESCRIPTION:  'description',
  STATUS:       'status',
};

// ── school_identity columns ────────────────────────────────────────
export const SCHOOL_IDENTITY = {
  ID:         'id',
  SCHOOL_ID:  'school_id',
  VISION:     'vision',
  MISSION:    'mission',
  MOTTO:      'motto',
};

// ── Section Keys (homepage_sections.section_key values) ───────────
export const SECTION_KEYS = {
  HERO:              'hero',
  ANNOUNCEMENTS:     'announcements',
  STATS:             'stats',
  ACADEMIC_RESULTS:  'academic_results',
  ACHIEVEMENTS:      'achievements',
  PRINCIPAL:         'principal',
  FACULTY:           'faculty',
  SPORTS:            'sports',
  FACILITIES:        'facilities',
  GALLERY:           'gallery',
  EVENTS:            'events',
  ADMISSIONS:        'admissions',
  IDENTITY:          'identity',
};

// ── Person Types (personnel.person_type values) ────────────────────
export const PERSON_TYPES = {
  PRINCIPAL:   'principal',
  FACULTY:     'faculty',
  BOARD:       'board',
  LEADERSHIP:  'leadership',
};

// ── Achievement Types ──────────────────────────────────────────────
export const ACHIEVEMENT_TYPES = {
  ACADEMIC:     'academic',
  SPORTS:       'sports',
  RECOGNITION:  'recognition',
};

// ── Media Types ────────────────────────────────────────────────────
export const MEDIA_TYPES = {
  IMAGE:  'image',
  VIDEO:  'video',
};

// ── Plan Types ─────────────────────────────────────────────────────
export const PLAN_TYPES = {
  BASIC:    'basic',
  PRO:      'pro',
  PREMIUM:  'premium',
};

// ── Convenience: named DB export ───────────────────────────────────
// Usage: import { DB } from '@/core/constants/reference'
//        DB.TABLES.SCHOOLS, DB.SCHOOLS.NAME, DB.SECTION_KEYS.HERO
export const DB = {
  TABLES:               { ...TABLES },
  SCHOOLS:              { ...SCHOOLS },
  HOMEPAGE_SECTIONS:    { ...HOMEPAGE_SECTIONS },
  HERO_MEDIA:           { ...HERO_MEDIA },
  ANNOUNCEMENTS:        { ...ANNOUNCEMENTS },
  ACADEMIC_RESULTS:     { ...ACADEMIC_RESULTS },
  ACHIEVEMENTS:         { ...ACHIEVEMENTS },
  PERSONNEL:            { ...PERSONNEL },
  CAMPUS_STATISTICS:    { ...CAMPUS_STATISTICS },
  FACILITY_CATEGORIES:  { ...FACILITY_CATEGORIES },
  FACILITIES:           { ...FACILITIES },
  MEDIA_LIBRARY:        { ...MEDIA_LIBRARY },
  EVENTS:               { ...EVENTS },
  ADMISSION_STEPS:      { ...ADMISSION_STEPS },
  SCHOOL_IDENTITY:      { ...SCHOOL_IDENTITY },
  SECTION_KEYS:         { ...SECTION_KEYS },
  PERSON_TYPES:         { ...PERSON_TYPES },
  ACHIEVEMENT_TYPES:    { ...ACHIEVEMENT_TYPES },
  MEDIA_TYPES:          { ...MEDIA_TYPES },
  PLAN_TYPES:           { ...PLAN_TYPES },
};

export default DB;
