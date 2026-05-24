/**
 * tenant.viewmodel.ts
 * Normalizes ScreenDataPayload from RPC into template-ready ViewModel.
 *
 * Rules:
 * - All field access uses reference.js constants
 * - No hardcoded table or column names
 * - Maintains strict backward compatibility for templates and SEO
 * - No API calls here — only data transformation
 */

import type { ScreenDataPayload } from '@/core/services/screenData.service';
import { isValidImageUrl, resolveImageUrl } from '@/core/utils/url';
import {
    COL_SCHOOLS_ID,
    COL_SCHOOLS_KEY,
    COL_SCHOOLS_NAME,
    COL_SCHOOLS_SLUG,
    COL_SCHOOLS_CUSTOM_DOMAIN,
    COL_SCHOOLS_TEMPLATE_SLUG,
    COL_SCHOOLS_IS_ACTIVE,
    COL_SCHOOLS_IS_DEMO,
    COL_SCHOOLS_LOGO_URL,
    COL_SCHOOLS_EMAIL,
    COL_SCHOOLS_PHONE,
    COL_SCHOOLS_ADDRESS,
    COL_SCHOOLS_CITY,
    COL_SCHOOLS_STATE,
    COL_SCHOOLS_COUNTRY,
    COL_SCHOOLS_POSTAL_CODE,
    COL_SCHOOLS_TEMPLATE_ID,
    COL_SCHOOLS_THEME_CONFIG,
    COL_SCHOOLS_PAYMENTGATEWAY_URL,
    COL_SCHOOLS_EXPIRATION_DATE,
    COL_SCHOOLS_SLOGAN,
    COL_SCHOOLS_DESCRIPTION,

    COL_SUBSCRIPTION_STATUS,
    COL_SUBSCRIPTION_END_DATE,

    COL_PLAN_NAME,
    COL_PLAN_GRACE_PERIOD,

    COL_TEMPLATE_COMPONENTS_CODE,
    COL_TEMPLATE_COMPONENTS_IS_ACTIVE,
    COL_TEMPLATE_COMPONENTS_REQUIRED,
    COL_TEMPLATE_COMPONENTS_ORDER,

    COL_HERO_MEDIA_ID,
    COL_HERO_MEDIA_HEADLINE,
    COL_HERO_MEDIA_SUBHEADLINE,
    COL_HERO_MEDIA_TYPE,
    COL_HERO_MEDIA_URL,
    COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT,
    COL_HERO_MEDIA_PRIMARY_BUTTON_URL,
    COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT,
    COL_HERO_MEDIA_SECONDARY_BUTTON_URL,
    COL_HERO_MEDIA_IS_ACTIVE,
    COL_HERO_MEDIA_DISPLAY_ORDER,

    COL_ANNOUNCEMENTS_ID,
    COL_ANNOUNCEMENTS_TITLE,
    COL_ANNOUNCEMENTS_MESSAGE,
    COL_ANNOUNCEMENTS_PRIORITY,
    COL_ANNOUNCEMENTS_IS_ACTIVE,
    COL_ANNOUNCEMENTS_EXPIRES_AT,

    COL_PERSONNEL_ID,
    COL_PERSONNEL_NAME,
    COL_PERSONNEL_DESIGNATION,
    COL_PERSONNEL_BIO,
    COL_PERSONNEL_QUALIFICATION,
    COL_PERSONNEL_EXPERIENCE,
    COL_PERSONNEL_IMAGE_URL,
    COL_PERSONNEL_EMAIL,
    COL_PERSONNEL_PHONE,
    COL_PERSONNEL_IS_ACTIVE,
    COL_PERSONNEL_DISPLAY_ORDER,
    COL_PERSONNEL_IS_FEATURED,

    COL_LEADERSHIP_ID,
    COL_LEADERSHIP_NAME,
    COL_LEADERSHIP_ROLE,
    COL_LEADERSHIP_DESIGNATION,
    COL_LEADERSHIP_MESSAGE,
    COL_LEADERSHIP_IMAGE_URL,
    COL_LEADERSHIP_SIGNATURE_URL,
    COL_LEADERSHIP_IS_ACTIVE,
    COL_LEADERSHIP_DISPLAY_ORDER,

    COL_CAMPUS_STATISTICS_ID,
    COL_CAMPUS_STATISTICS_LABEL,
    COL_CAMPUS_STATISTICS_VALUE,
    COL_CAMPUS_STATISTICS_ICON,
    COL_CAMPUS_STATISTICS_DISPLAY_ORDER,

    COL_ACHIEVEMENTS_ID,
    COL_ACHIEVEMENTS_TITLE,
    COL_ACHIEVEMENTS_DESCRIPTION,
    COL_ACHIEVEMENTS_CATEGORY,
    COL_ACHIEVEMENTS_YEAR,
    COL_ACHIEVEMENTS_AWARD_LEVEL,
    COL_ACHIEVEMENTS_IMAGE_URL,
    COL_ACHIEVEMENTS_IS_FEATURED,
    COL_ACHIEVEMENTS_DISPLAY_ORDER,

    COL_EVENTS_ID,
    COL_EVENTS_TITLE,
    COL_EVENTS_DESCRIPTION,
    COL_EVENTS_CATEGORY,
    COL_EVENTS_LOCATION,
    COL_EVENTS_DATE,
    COL_EVENTS_START_TIME,
    COL_EVENTS_END_TIME,
    COL_EVENTS_IMAGE_URL,
    COL_EVENTS_IS_FEATURED,

    COL_MEDIA_LIBRARY_ID,
    COL_MEDIA_LIBRARY_URL,
    COL_MEDIA_LIBRARY_CAPTION,
    COL_MEDIA_LIBRARY_CATEGORY,
    COL_MEDIA_LIBRARY_TYPE,
    COL_MEDIA_LIBRARY_IS_FEATURED,
    COL_MEDIA_LIBRARY_DISPLAY_ORDER,

    COL_ACADEMIC_RESULTS_ID,
    COL_ACADEMIC_RESULTS_YEAR,
    COL_ACADEMIC_RESULTS_PASS_PERCENTAGE,
    COL_ACADEMIC_RESULTS_TENTH_PASS_PERCENTAGE,
    COL_ACADEMIC_RESULTS_PLUS_TWO_PASS_PERCENTAGE,
    COL_ACADEMIC_RESULTS_LEGACY_QUOTE,

    COL_INFRASTRUCTURE_ID,
    COL_INFRASTRUCTURE_TITLE,
    COL_INFRASTRUCTURE_DESCRIPTION,
    COL_INFRASTRUCTURE_TAG,
    COL_INFRASTRUCTURE_IMAGE_URL,
    COL_INFRASTRUCTURE_ICON,
    COL_INFRASTRUCTURE_DISPLAY_ORDER,

    COL_FACILITIES_NAME,
    COL_FACILITIES_DESCRIPTION,
    COL_FACILITIES_CATEGORY_NAME,

    COL_CONTACT_DETAILS_ID,
    COL_CONTACT_DETAILS_PHONE,
    COL_CONTACT_DETAILS_EMAIL,
    COL_CONTACT_DETAILS_ADDRESS,
    COL_CONTACT_DETAILS_MAP_URL,

    COL_WHY_CHOOSE_US_ID,
    COL_WHY_CHOOSE_US_TITLE,
    COL_WHY_CHOOSE_US_DESCRIPTION,
    COL_WHY_CHOOSE_US_ICON,

    COL_SCHOOL_IDENTITY_VISION,
    COL_SCHOOL_IDENTITY_MISSION,
    COL_SCHOOL_IDENTITY_MOTTO,
    COL_SCHOOL_IDENTITY_HISTORY,
    COL_SCHOOL_IDENTITY_FOUNDED_YEAR,

    COL_BOARD_MEMBERS_ID,
    COL_BOARD_MEMBERS_NAME,
    COL_BOARD_MEMBERS_DESIGNATION,
    COL_BOARD_MEMBERS_QUALIFICATION,
    COL_BOARD_MEMBERS_PROFILE,
    COL_BOARD_MEMBERS_IMAGE_URL,
    COL_BOARD_MEMBERS_DISPLAY_ORDER,
    COL_BOARD_MEMBERS_IS_ACTIVE,
    COL_CONTACT_DETAILS_FACEBOOK,
    COL_CONTACT_DETAILS_INSTAGRAM,
    COL_CONTACT_DETAILS_TWITTER,
    COL_CONTACT_DETAILS_YOUTUBE,
    COL_CONTACT_DETAILS_OFFICE_HOURS,
    COL_CONTACT_DETAILS_HOURS,

    COL_TESTIMONIALS_ID,
    COL_TESTIMONIALS_RATING,
    COL_TESTIMONIALS_MESSAGE,
    COL_TESTIMONIALS_AUTHOR,
    COL_TESTIMONIALS_DESIGNATION,
    COL_TESTIMONIALS_PHOTO_URL,
    COL_TESTIMONIALS_IS_ACTIVE,
    COL_TESTIMONIALS_DISPLAY_ORDER,

    COL_IS_ACTIVE,
} from '@/lib/constants/reference';

// ─── Normalized Output Type ───────────────────────────────────────────────────

export interface TenantViewModel {

    // ── Meta ──────────────────────────────────────────────────────────────────
    mode: 'demo' | 'live';
    screen: string;

    // ── School ────────────────────────────────────────────────────────────────
    school: {
        key: string;
        name: string;
        slug: string;
        customDomain: string;
        templateSlug: string;   // e.g. 'template_classic'
        templateId: string;   // alias for templateSlug — kept for TemplateRenderer compat
        isActive: boolean;
        isDemo: boolean;
        logoUrl: string;
        slogan: string;         // short tagline shown below school name in header/navbar
        description: string;    // longer description shown in footer
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
        fullAddress: string;
        themeConfig: Record<string, unknown>;
        componentVariants: Record<string, Record<string, string>>; // Nested by screen
        paymentGatewayUrl: string;  // kept for compat — may be empty string
        gracePeriodDays: number;
        faviconUrl: string;
    };

    // ── Subscription ──────────────────────────────────────────────────────────
    subscription: {
        status: string;   // 'active' | 'expired' | etc.
        endDate: string;   // ISO date string — use for expiry check
    };

    // ── Plan ─────────────────────────────────────────────────────────────────
    plan: {
        name: string;
        gracePeriod: number;   // days — replaces hardcoded gracePeriodDays: 7
    };

    // ── Section visibility (from templatecomponents) ──────────────────────────
    components: Array<{
        componentCode: string;   // 'hero' | 'broadcast' | 'faculty' | etc.
        label: string;           // Display name for the component e.g. "Gallery - Video"
        isActive: boolean;
        isRequired: boolean;
        displayOrder: number;
        config: {
            filters?: {
                category?: string;
                type?: string;
                designation?: string;
                contenttype?: string;
                logic?: 'AND' | 'OR';
                conditions?: Array<{
                    field: string;
                    operator: 'equals' | 'notequals' | 'contains' | 'in';
                    value: any;
                }>;
            } | null;
            datasource?: string;
            variant?: string | null;
            itemcount?: number | null;
        } | null;
    }>;

    // ── Also kept as homepageSections for template backward compatibility ──────
    homepageSections: Array<{
        sectionKey: string;
        isEnabled: boolean;
        isRequired: boolean;
        displayOrder: number;
    }>;

    // ── Identity (kept for seo.ts compat) ─────────────────────────────────────
    identity: {
        vision: string;
        mission: string;
        motto: string;
        history: string;
        foundedYear: number;
        boardMessage: string;
        aboutTitle: string;
        aboutDescription: string;
    };

    whyChooseUs: Array<{ id: string; title: string; description: string; icon: string }>;

    // ── Hero ─────────────────────────────────────────────────────────────────
    heroMedia: Array<{           // kept as heroMedia for template compat
        key: string;
        headline: string;
        subheadline: string;
        mediaType: string;   // 'image' | 'video'
        mediaUrl: string;
        primaryButtonText: string;
        primaryButtonUrl: string;
        secondaryButtonText: string;
        secondaryButtonUrl: string;
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Broadcast / Announcements ─────────────────────────────────────────────
    broadcast: Array<{
        key: string;
        title: string;
        message: string;
        priority: number;
        isActive: boolean;
        expiresAt: string;
    }>;

    // ── Also kept as announcements for template backward compatibility ─────────
    announcements: Array<{
        title: string;
        message: string;
        isActive: boolean;
        expiresAt: string;
    }>;

    // ── Faculty (teachers only) ───────────────────────────────────────────────
    faculty: Array<{
        key: string;
        name: string;
        designation: string;
        description: string;
        qualification: string;
        experienceYears: number;
        imageUrl: string;
        email: string;
        phone: string;
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Leadership (principal, chairman, board, others) ───────────────────────
    leadership: Array<{
        key: string;
        name: string;
        role: string;   // 'principal' | 'chairman' | 'board' | others
        designation: string;
        message: string;
        imageUrl: string;
        signatureUrl: string;
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Leadership Roles (exposed as arrays per user request/validation) ──────
    principal: Array<{
        key: string;
        name: string;
        role: string;
        designation: string;
        message: string;
        imageUrl: string;
        signatureUrl: string;
    }>;

    chairman: Array<{
        key: string;
        name: string;
        role: string;
        designation: string;
        message: string;
        imageUrl: string;
        signatureUrl: string;
    }>;

    boardMembers: Array<{
        key: string;
        name: string;
        role: string;
        designation: string;
        message: string;
        imageUrl: string;
        signatureUrl: string;
    }>;

    // ── Also kept as personnel for template + seo.ts backward compatibility ────
    // Merges faculty + leadership into one array using personType field
    personnel: Array<{
        key: string;
        name: string;
        designation: string;
        bio: string;        // maps from description (faculty) or message (leadership)
        photoUrl: string;        // maps from imageUrl
        personType: string;        // maps from role (leadership) or 'faculty' (faculty)
        isFeatured: boolean;
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Stats ─────────────────────────────────────────────────────────────────
    stats: Array<{               // new canonical name
        key: string;
        label: string;
        value: string;
        icon: string;
        displayOrder: number;
    }>;

    // ── Also kept as statistics for template backward compatibility ────────────
    statistics: Array<{
        label: string;
        value: string;
        icon: string;
        displayOrder: number;
    }>;

    // ── Achievements ──────────────────────────────────────────────────────────
    achievements: Array<{
        key: string;
        title: string;
        description: string;
        category: string;
        year: number;
        awardLevel: string;
        imageUrl: string;
        isFeatured: boolean;
        isActive: boolean;
        displayOrder: number;
        achievementType: string;  // kept for template compat — same as category
        photoUrl: string;     // kept for template compat — same as imageUrl
    }>;

    schoolAchievements: Array<{
        key: string;
        title: string;
        category: string;      // 'academic' | 'sports'
        year: number;
        awardLevel: string;
        description: string;
        imageUrl: string;
        isFeatured: boolean;
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Testimonials ───────────────────────────────────────────────────────────
    testimonials: Array<{
        key: string;
        rating: number;
        message: string;
        authorName: string;
        designation: string;
        photoUrl: string;
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Events ────────────────────────────────────────────────────────────────
    events: Array<{
        key: string;
        id: string;      // kept for template compat — same as key
        title: string;
        description: string;
        category: string;
        location: string;
        eventDate: string;
        date: string;      // kept for template compat — same as eventDate
        startTime: string;
        endTime: string;
        imageUrl: string;
        isFeatured: boolean;
    }>;

    // ── Gallery ───────────────────────────────────────────────────────────────
    gallery: Array<{
        key: string;
        url: string;
        imageUrl: string;
        caption: string;
        category: string;
        mediaType: string;
        isFeatured: boolean;
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Also kept as mediaLibrary for template backward compatibility ──────────
    mediaLibrary: Array<{
        url: string;
        imageUrl: string;
        mediaType: string;
        category: string;
        caption: string;
        isFeatured: boolean;
        isActive: boolean;
    }>;

    // ── Academic Results (SINGLE OBJECT — nullable) ───────────────────────────
    academicResult: {            // new canonical name — single object
        key: string;
        year: number;
        passPercentage: number;
        tenthPassPercentage: number;
        plusTwoPassPercentage: number;
        legacyQuote: string;
    } | null;

    // ── Also kept as academicResults array for template backward compat ────────
    // Wraps single object in array — or empty array if null
    academicResults: Array<{
        year: number;
        passPercentage: number;
        tenthPassPercentage: number;
        plusTwoPassPercentage: number;
        legacyQuote: string;
    }>;

    // ── Activities ────────────────────────────────────────────────────────────
    activities: Array<{
        key: string;
        title: string;
        tag: string;
        description: string;
        imageUrl: string;
        isActive: boolean;
        displayOrder: number;
        highlightTag: string;
        highlightStat: string;
    }>;

    // ── Infrastructure ────────────────────────────────────────────────────────
    infrastructure: Array<{
        key: string;
        title: string;
        description: string;
        tag: string;
        icon: string;
        imageUrl: string;
        isActive: boolean;
        displayOrder: number;
        highlightTitle: string;
        highlightDescription: string;
        bulletinPoints?: string[];
    }>;

    // ── Also kept as facilities for template backward compatibility ────────────
    facilities: Array<{
        name: string;
        description: string;
        categoryName: string;
    }>;

    // ── Contact Details (SINGLE OBJECT — nullable) ────────────────────────────
    contactDetails: {
        key: string;
        email: string;
        phone: string;
        address: string;
        mapEmbedUrl: string;
        officeHours: string;
        facebook: string;
        instagram: string;
        twitter: string;
        youtube: string;
    } | null;
    admissionInstructions: Array<{
        key: string;
        title: string;
        description: string;
        contactEmail: string;
        contactPhone: string;
        isActive: boolean;
    }>;

    // ── Academics (Dynamic) ───────────────────────────────────────────────────
    academicsList: Array<{
        key: string;
        title: string;
        subtitle: string;
        description: string;
        imageUrl: string;
        isActive: boolean;
        displayOrder: number;
    }>;

    highlightedAcademics: Array<{
        key: string;
        title: string;
        description: string;
        imageUrl: string;
        bulletinPoints: string[];
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Activities (Dynamic) ──────────────────────────────────────────────────
    activitiesList: Array<{
        key: string;
        title: string;
        tag: string;
        description: string;
        imageUrl: string;
        isActive: boolean;
        displayOrder: number;
        highlightTag: string;
        highlightStat: string;
    }>;

    highlightedActivities: Array<{
        key: string;
        title: string;
        description: string;
        imageUrl: string;
        bulletinPoints: string[];
        isActive: boolean;
        displayOrder: number;
    }>;

    // ── Infrastructure (Dynamic) ──────────────────────────────────────────────
    campusFeatures: Array<{
        key: string;
        title: string;
        description: string;
        tag: string;
        icon: string;
        imageUrl: string;
        bulletinPoints: string[];
        isActive: boolean;
        displayOrder: number;
    }>;

    infrastructureList: Array<{
        key: string;
        title: string;
        description: string;
        tag: string;
        icon: string;
        imageUrl: string;
        isActive: boolean;
        displayOrder: number;
        highlightTitle: string;
        highlightDescription: string;
        bulletinPoints: string[];
    }>;

    highlightedInfrastructure: Array<{
        key: string;
        title: string;
        description: string;
        imageUrl: string;
        bulletinPoints: string[];
        isActive: boolean;
        displayOrder: number;
    }>;
}

const COMPONENT_ALIASES: Record<string, string> = {
    'schoolstats': 'stats',
    'studentachievements': 'achievements',
    'schoolachievements': 'achievements',
    'academicresults': 'academics',
    'broadcast': 'announcements',
    'visionmission': 'identity',
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function str(val: unknown): string {
    return typeof val === 'string' ? val.trim() : '';
}
function num(val: unknown): number {
    return typeof val === 'number' ? val : Number(val) || 0;
}
function bool(val: unknown): boolean {
    return val === true || val === 'true';
}

/**
 * Safely extracts a single row object from a value that could be 
 * a single object, an array of objects, or null/undefined.
 */
function extractRow(val: unknown): Record<string, unknown> {
    if (!val) return {};
    if (Array.isArray(val)) return (val[0] as Record<string, unknown>) ?? {};
    return (val as Record<string, unknown>) ?? {};
}

// ─── ViewModel Builder ────────────────────────────────────────────────────────

/**
 * Transforms ScreenDataPayload into a normalized TenantViewModel.
 * All field access uses reference.js constants — no hardcoded strings.
 */
export function buildTenantViewModel(payload: ScreenDataPayload): TenantViewModel {

    // 1. Extract top-level sections from payload
    // Use extractRow to handle potential array-wrapping from RPC response
    const school = extractRow(payload.school);
    const subscription = extractRow(payload.subscription);
    const plan = extractRow(payload.plan);
    const d = payload.data ?? {};

    // 2. Extract arrays — default to [] if missing
    const heroRows = (d.hero ?? []) as Record<string, unknown>[];
    const broadcastRows = (d.broadcast ?? []) as Record<string, unknown>[];
    const facultyRows = (d.faculty ?? []) as Record<string, unknown>[];
    const leadershipRows = (d.leadership ?? []) as Record<string, unknown>[];
    const statsRows = (d.schoolstats ?? []) as Record<string, unknown>[];
    const achievementRows = (d.schoolachievements ?? []) as Record<string, unknown>[];
    const eventRows = (d.events ?? d.monthwiseevents ?? []) as Record<string, unknown>[];
    const galleriesRows = (d.gallery ?? []) as Record<string, unknown>[];
    const activitiesRows = (d.activities ?? []) as Record<string, unknown>[];
    const infraRows = (d.infrastructure ?? []) as Record<string, unknown>[];
    const componentRows = (d.templatecomponents ?? []) as Record<string, unknown>[];
    const whyChooseUsRows = (d.whychooseus ?? []) as Record<string, unknown>[];
    const testimonialRows = (d.testimonial ?? []) as Record<string, unknown>[];
    const academicsListRows = (d.academicslist ?? []) as Record<string, unknown>[];
    const highlightedAcademicsRows = (d.highlightedacademics ?? []) as Record<string, unknown>[];
    const activitiesListRows = (d.activitieslist ?? []) as Record<string, unknown>[];
    const highlightedActivitiesRows = (d.highlightedactivites ?? []) as Record<string, unknown>[];
    const campusFeaturesRows = (d.campusfeatures ?? []) as Record<string, unknown>[];
    const infrastructureListRows = (d.infrastructurelist ?? []) as Record<string, unknown>[];
    const highlightedInfrastructureRows = (d.highlightedinfrastructure ?? []) as Record<string, unknown>[];

    // Combine all leadership related keys from data
    const combinedLeadershipRows = [
        ...((d.leadership ?? []) as Record<string, unknown>[]),
        ...((d.principalmessage ?? []) as Record<string, unknown>[]),
        ...((d.boardmembers ?? []) as Record<string, unknown>[])
    ];

    // 3. Extract single objects — default to null if missing
    // 3. Extract single objects — default to null if missing
    const academicResultRows = (Array.isArray(d.academicresults)
        ? d.academicresults
        : d.academicresults ? [d.academicresults] : []
    ) as Record<string, unknown>[];

    const academicResultRow = academicResultRows
        .filter(r => r['isactive'] !== false)
        .sort((a, b) => num(b['year']) - num(a['year']))[0] ?? null;

    const contactDetailsArr = (Array.isArray(d.contactdetails)
        ? d.contactdetails
        : d.contactdetails ? [d.contactdetails] : []
    ) as Record<string, unknown>[];
    const contactDetailsRow = contactDetailsArr[0] ?? null;

    const schoolIdentityRow = (d.schoolidentity ?? d.visionmission ?? d.boardmembersmessage ?? d.contactdetails ?? [null])[0] as Record<string, unknown> | null;

    // 4. Deduplicate templatecomponents by componentcode
    // 4. Mapped components — no deduplication, supporting multiple instances (e.g., sports vs academic achievements)
    const mappedComponents = componentRows.map(r => ({
        componentCode: str(r[COL_TEMPLATE_COMPONENTS_CODE]),
        label: str(r['editorsname'] || r[COL_TEMPLATE_COMPONENTS_CODE]),
        isActive: bool(r[COL_TEMPLATE_COMPONENTS_IS_ACTIVE]),
        isRequired: bool(r[COL_TEMPLATE_COMPONENTS_REQUIRED]),
        displayOrder: num(r[COL_TEMPLATE_COMPONENTS_ORDER]),
        config: (r['config'] as any) ?? null,
    }));

    const mappedLeadership = combinedLeadershipRows.map(r => ({
            key: str(r[COL_LEADERSHIP_ID]),
            name: str(r[COL_LEADERSHIP_NAME]),
            role: str(r[COL_LEADERSHIP_ROLE] || (str(r[COL_LEADERSHIP_DESIGNATION]).toLowerCase() === 'principal' ? 'principal' : 'board')),
            designation: str(r[COL_LEADERSHIP_DESIGNATION]),
            message: str(r[COL_LEADERSHIP_MESSAGE]),
            imageUrl: resolveImageUrl(str(r[COL_LEADERSHIP_IMAGE_URL])),
            signatureUrl: resolveImageUrl(str(r[COL_LEADERSHIP_SIGNATURE_URL])),
            isActive: bool(r[COL_LEADERSHIP_IS_ACTIVE]),
            displayOrder: num(r[COL_LEADERSHIP_DISPLAY_ORDER]),
            quote: str(r['quote']),
        })).sort((a, b) => a.displayOrder - b.displayOrder);

    // 6. Derive principal and chairman from leadership array
    // 6. Derive leadership roles as arrays (per user request)
    const principal = mappedLeadership.filter(l => l.role?.toLowerCase() === 'principal');
    const chairman = mappedLeadership.filter(l => l.role?.toLowerCase() === 'chairman');
    const boardMembers = mappedLeadership.filter(l => 
        l.role?.toLowerCase() === 'board' || 
        l.designation?.toLowerCase()?.includes('board') ||
        l.designation?.toLowerCase()?.includes('trustee')
    );

    // 7. Build personnel array (merged faculty + leadership) for backward compat
    const personnelFromFaculty = facultyRows.map(r => ({
        key: str(r[COL_PERSONNEL_ID]),
        name: str(r[COL_PERSONNEL_NAME]),
        designation: str(r[COL_PERSONNEL_DESIGNATION]),
        bio: str(r[COL_PERSONNEL_BIO]),
        photoUrl: resolveImageUrl(str(r[COL_PERSONNEL_IMAGE_URL])),
        personType: 'faculty',
        isFeatured: bool(r[COL_PERSONNEL_IS_FEATURED]),
        isActive: bool(r[COL_PERSONNEL_IS_ACTIVE]),
        displayOrder: num(r[COL_PERSONNEL_DISPLAY_ORDER]),
    }));
    const personnelFromLeadership = mappedLeadership.map(l => ({
        key: l.key,
        name: l.name,
        designation: l.designation,
        bio: l.message,
        photoUrl: l.imageUrl,
        personType: l.role,
        isFeatured: l.role === 'principal',
        isActive: l.isActive,
        displayOrder: l.displayOrder,
    }));
    const personnel = [...personnelFromLeadership, ...personnelFromFaculty];

    // 8. Map components for both new (components) and old (homepageSections) shape
    // Handled above in mappedComponents.

    // ── Old homepageSections for backward visibility ────────────

    // Build homepageSections with aliasing and merging for backward compatibility
    const sectionMap = new Map<string, any>();

    mappedComponents.forEach(c => {
        const sectionKey = COMPONENT_ALIASES[c.componentCode] || c.componentCode;

        if (sectionMap.has(sectionKey)) {
            const existing = sectionMap.get(sectionKey);
            // Merge logic: enable if any is active, require if any is required
            sectionMap.set(sectionKey, {
                ...existing,
                isEnabled: existing.isEnabled || c.isActive,
                isRequired: existing.isRequired || c.isRequired,
                displayOrder: Math.min(existing.displayOrder, c.displayOrder),
            });
        } else {
            sectionMap.set(sectionKey, {
                sectionKey,
                isEnabled: c.isActive,
                isRequired: c.isRequired,
                displayOrder: c.displayOrder,
                settings: {}, // Empty for now as validationconfig isn't used by templates yet
            });
        }
    });

    const homepageSections = Array.from(sectionMap.values()).sort((a, b) => a.displayOrder - b.displayOrder);

    // 9. Map achievements
    const schoolAchievements = achievementRows.map(r => ({
        key: str(r[COL_ACHIEVEMENTS_ID] || r['key']),
        title: str(r[COL_ACHIEVEMENTS_TITLE]),
        category: str(r[COL_ACHIEVEMENTS_CATEGORY]),
        year: num(r[COL_ACHIEVEMENTS_YEAR]),
        awardLevel: str(r[COL_ACHIEVEMENTS_AWARD_LEVEL]),
        description: str(r[COL_ACHIEVEMENTS_DESCRIPTION]),
        imageUrl: resolveImageUrl(str(r[COL_ACHIEVEMENTS_IMAGE_URL])),
        isFeatured: bool(r[COL_ACHIEVEMENTS_IS_FEATURED]),
        isActive: bool(r[COL_IS_ACTIVE] || r['isactive']),
        displayOrder: num(r[COL_ACHIEVEMENTS_DISPLAY_ORDER]),
    }));

    const achievements = achievementRows.map(r => ({
        key: str(r[COL_ACHIEVEMENTS_ID] || r['key']),
        title: str(r[COL_ACHIEVEMENTS_TITLE]),
        description: str(r[COL_ACHIEVEMENTS_DESCRIPTION]),
        category: str(r[COL_ACHIEVEMENTS_CATEGORY]),
        year: num(r[COL_ACHIEVEMENTS_YEAR]),
        awardLevel: str(r[COL_ACHIEVEMENTS_AWARD_LEVEL]),
        imageUrl: resolveImageUrl(str(r[COL_ACHIEVEMENTS_IMAGE_URL])),
        isFeatured: bool(r[COL_ACHIEVEMENTS_IS_FEATURED]),
        isActive: bool(r[COL_IS_ACTIVE] || r['isactive']),
        displayOrder: num(r[COL_ACHIEVEMENTS_DISPLAY_ORDER]),
        achievementType: str(r[COL_ACHIEVEMENTS_CATEGORY]), // was COL_ACHIEVEMENTS_TYPE in some contexts, category is the new source
        photoUrl: resolveImageUrl(str(r[COL_ACHIEVEMENTS_IMAGE_URL])),
    }));

    // 10. Map events
    const mappedEvents = eventRows.map(r => ({
        key: str(r[COL_EVENTS_ID]),
        id: str(r[COL_EVENTS_ID]),
        title: str(r[COL_EVENTS_TITLE]),
        description: str(r[COL_EVENTS_DESCRIPTION]),
        category: str(r[COL_EVENTS_CATEGORY]),
        location: str(r[COL_EVENTS_LOCATION]),
        eventDate: str(r[COL_EVENTS_DATE]),
        date: str(r[COL_EVENTS_DATE]),
        startTime: str(r[COL_EVENTS_START_TIME]),
        endTime: str(r[COL_EVENTS_END_TIME]),
        imageUrl: resolveImageUrl(str(r[COL_EVENTS_IMAGE_URL])),
        isFeatured: bool(r[COL_EVENTS_IS_FEATURED]),
    }));

    // 11. Map gallery
    const mappedGallery = galleriesRows.map(r => ({
        key: str(r[COL_MEDIA_LIBRARY_ID]),
        url: resolveImageUrl(str(r[COL_MEDIA_LIBRARY_URL])),
        imageUrl: resolveImageUrl(str(r[COL_MEDIA_LIBRARY_URL])),
        caption: str(r[COL_MEDIA_LIBRARY_CAPTION]),
        category: str(r[COL_MEDIA_LIBRARY_CATEGORY]),
        mediaType: str(r[COL_MEDIA_LIBRARY_TYPE]),
        isFeatured: bool(r[COL_MEDIA_LIBRARY_IS_FEATURED]),
        isActive: bool(r['isactive'] ?? true),
        displayOrder: num(r[COL_MEDIA_LIBRARY_DISPLAY_ORDER]),
    }));

    // 12. Map stats
    const mappedStats = statsRows.map(r => ({
        key: str(r[COL_CAMPUS_STATISTICS_ID]),
        label: str(r[COL_CAMPUS_STATISTICS_LABEL]),
        value: str(r[COL_CAMPUS_STATISTICS_VALUE]),
        icon: str(r[COL_CAMPUS_STATISTICS_ICON]),
        displayOrder: num(r[COL_CAMPUS_STATISTICS_DISPLAY_ORDER]),
    }));

    // 13. Map academic result
    const academicResult = academicResultRow ? {
        key: str(academicResultRow[COL_ACADEMIC_RESULTS_ID]),
        year: num(academicResultRow[COL_ACADEMIC_RESULTS_YEAR]),
        passPercentage: num(academicResultRow[COL_ACADEMIC_RESULTS_PASS_PERCENTAGE]),
        tenthPassPercentage: num(academicResultRow[COL_ACADEMIC_RESULTS_TENTH_PASS_PERCENTAGE]),
        plusTwoPassPercentage: num(academicResultRow[COL_ACADEMIC_RESULTS_PLUS_TWO_PASS_PERCENTAGE]),
        legacyQuote: str(academicResultRow[COL_ACADEMIC_RESULTS_LEGACY_QUOTE]),
    } : null;

    // 14. Map contact details
    const contactDetails = contactDetailsRow ? {
        key: str(contactDetailsRow[COL_CONTACT_DETAILS_ID]),
        email: str(contactDetailsRow[COL_CONTACT_DETAILS_EMAIL]),
        phone: str(contactDetailsRow[COL_CONTACT_DETAILS_PHONE]),
        address: str(contactDetailsRow[COL_CONTACT_DETAILS_ADDRESS]),
        mapEmbedUrl: str(contactDetailsRow[COL_CONTACT_DETAILS_MAP_URL]),
        officeHours: str(contactDetailsRow[COL_CONTACT_DETAILS_OFFICE_HOURS] || contactDetailsRow[COL_CONTACT_DETAILS_HOURS]),
        facebook: str(contactDetailsRow[COL_CONTACT_DETAILS_FACEBOOK]),
        instagram: str(contactDetailsRow[COL_CONTACT_DETAILS_INSTAGRAM]),
        twitter: str(contactDetailsRow[COL_CONTACT_DETAILS_TWITTER]),
        youtube: str(contactDetailsRow[COL_CONTACT_DETAILS_YOUTUBE]),
    } : null;

    // 14b. Map Testimonials
    const testimonials = testimonialRows.map(r => ({
        key: str(r[COL_TESTIMONIALS_ID]),
        rating: num(r[COL_TESTIMONIALS_RATING]),
        message: str(r[COL_TESTIMONIALS_MESSAGE]),
        authorName: str(r[COL_TESTIMONIALS_AUTHOR]),
        designation: str(r[COL_TESTIMONIALS_DESIGNATION]),
        photoUrl: resolveImageUrl(str(r[COL_TESTIMONIALS_PHOTO_URL])),
        isActive: bool(r[COL_TESTIMONIALS_IS_ACTIVE]),
        displayOrder: num(r[COL_TESTIMONIALS_DISPLAY_ORDER]),
    })).filter(t => t.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

    const templateSlug = str(school[COL_SCHOOLS_TEMPLATE_SLUG]);

    // 15. Assemble and return
    const vm: TenantViewModel = {
        mode: payload.mode ?? 'live',
        screen: payload.screen ?? '',

        school: {
            key: str(school[COL_SCHOOLS_KEY]),
            name: str(school[COL_SCHOOLS_NAME]),
            slug: str(school[COL_SCHOOLS_SLUG]),
            customDomain: str(school[COL_SCHOOLS_CUSTOM_DOMAIN]),
            templateSlug,
            templateId: templateSlug,
            isActive: bool(school[COL_SCHOOLS_IS_ACTIVE]),
            isDemo: bool(school[COL_SCHOOLS_IS_DEMO]),
            logoUrl: resolveImageUrl(str(school[COL_SCHOOLS_LOGO_URL])),
            slogan: str(school[COL_SCHOOLS_SLOGAN]),
            description: str(school[COL_SCHOOLS_DESCRIPTION]),
            email: str(school[COL_SCHOOLS_EMAIL]),
            phone: str(school[COL_SCHOOLS_PHONE]),
            address: str(school[COL_SCHOOLS_ADDRESS]),
            city: str(school[COL_SCHOOLS_CITY]),
            state: str(school[COL_SCHOOLS_STATE]),
            country: str(school[COL_SCHOOLS_COUNTRY]),
            postalCode: str(school[COL_SCHOOLS_POSTAL_CODE]),
            fullAddress: [
                str(school[COL_SCHOOLS_ADDRESS]),
                str(school[COL_SCHOOLS_CITY]),
                str(school[COL_SCHOOLS_STATE]),
            ].filter(Boolean).join(', '),
            themeConfig: (school[COL_SCHOOLS_THEME_CONFIG] as Record<string, unknown>) ?? {},
            componentVariants: (school['componentvariants'] ?? {}) as Record<string, Record<string, string>>,
            paymentGatewayUrl: str(school[COL_SCHOOLS_PAYMENTGATEWAY_URL]),
            gracePeriodDays: num(plan[COL_PLAN_GRACE_PERIOD]),
            faviconUrl: resolveImageUrl(str(school['faviconurl'] || (school[COL_SCHOOLS_THEME_CONFIG] as any)?.favicon || '')),
        },

        subscription: {
            status: str(subscription[COL_SUBSCRIPTION_STATUS]),
            endDate: str(subscription[COL_SUBSCRIPTION_END_DATE]),
        },

        plan: {
            name: str(plan[COL_PLAN_NAME]),
            gracePeriod: num(plan[COL_PLAN_GRACE_PERIOD]),
        },

        components: mappedComponents,
        homepageSections,

        identity: {
            vision: schoolIdentityRow ? str(schoolIdentityRow[COL_SCHOOL_IDENTITY_VISION] || schoolIdentityRow['vision']) : '',
            mission: schoolIdentityRow ? str(schoolIdentityRow[COL_SCHOOL_IDENTITY_MISSION] || schoolIdentityRow['mission']) : '',
            motto: schoolIdentityRow ? str(schoolIdentityRow[COL_SCHOOL_IDENTITY_MOTTO] || schoolIdentityRow['motto']) : '',
            history: schoolIdentityRow ? str(schoolIdentityRow['history']) : '',
            foundedYear: schoolIdentityRow ? num(schoolIdentityRow['founded_year']) : 0,
            boardMessage: schoolIdentityRow ? str(schoolIdentityRow['boardmessage']) : '',
            aboutTitle: schoolIdentityRow ? str(schoolIdentityRow[COL_SCHOOL_IDENTITY_VISION] || schoolIdentityRow['vision']) : '', 
            aboutDescription: schoolIdentityRow ? str(schoolIdentityRow[COL_SCHOOL_IDENTITY_MISSION] || schoolIdentityRow['mission']) : '',
        },

        whyChooseUs: whyChooseUsRows.map(r => ({
            id: str(r[COL_WHY_CHOOSE_US_ID]),
            title: str(r[COL_WHY_CHOOSE_US_TITLE]),
            description: str(r[COL_WHY_CHOOSE_US_DESCRIPTION]),
            icon: str(r[COL_WHY_CHOOSE_US_ICON]),
        })),

        heroMedia: heroRows.map(r => ({
            key: str(r[COL_HERO_MEDIA_ID]),
            headline: str(r[COL_HERO_MEDIA_HEADLINE]),
            subheadline: str(r[COL_HERO_MEDIA_SUBHEADLINE]),
            mediaType: str(r[COL_HERO_MEDIA_TYPE]),
            mediaUrl: resolveImageUrl(str(r[COL_HERO_MEDIA_URL])),
            primaryButtonText: str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT]),
            primaryButtonUrl: str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_URL]),
            secondaryButtonText: str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT]),
            secondaryButtonUrl: str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_URL]),
            isActive: bool(r[COL_HERO_MEDIA_IS_ACTIVE]),
            displayOrder: num(r[COL_HERO_MEDIA_DISPLAY_ORDER]),
        })),

        broadcast: broadcastRows.map(r => ({
            key: str(r[COL_ANNOUNCEMENTS_ID]),
            title: str(r[COL_ANNOUNCEMENTS_TITLE]),
            message: str(r[COL_ANNOUNCEMENTS_MESSAGE]),
            priority: num(r[COL_ANNOUNCEMENTS_PRIORITY]),
            isActive: bool(r[COL_ANNOUNCEMENTS_IS_ACTIVE]),
            expiresAt: str(r[COL_ANNOUNCEMENTS_EXPIRES_AT]),
        })),

        announcements: broadcastRows.map(r => ({
            title: str(r[COL_ANNOUNCEMENTS_TITLE]),
            message: str(r[COL_ANNOUNCEMENTS_MESSAGE]),
            isActive: bool(r[COL_ANNOUNCEMENTS_IS_ACTIVE]),
            expiresAt: str(r[COL_ANNOUNCEMENTS_EXPIRES_AT]),
        })),

        faculty: facultyRows.map(r => ({
            key: str(r[COL_PERSONNEL_ID]),
            name: str(r[COL_PERSONNEL_NAME]),
            designation: str(r[COL_PERSONNEL_DESIGNATION]),
            description: str(r[COL_PERSONNEL_BIO]),
            qualification: str(r[COL_PERSONNEL_QUALIFICATION]),
            experienceYears: num(r[COL_PERSONNEL_EXPERIENCE]),
            imageUrl: resolveImageUrl(str(r[COL_PERSONNEL_IMAGE_URL])),
            email: str(r[COL_PERSONNEL_EMAIL]),
            phone: str(r[COL_PERSONNEL_PHONE]),
            isActive: bool(r[COL_PERSONNEL_IS_ACTIVE]),
            displayOrder: num(r[COL_PERSONNEL_DISPLAY_ORDER]),
        })),

        leadership: mappedLeadership,
        principal,
        chairman,
        boardMembers,
        personnel,

        stats: mappedStats,
        statistics: mappedStats,

        achievements,
        schoolAchievements,

        events: mappedEvents,

        gallery: mappedGallery,
        mediaLibrary: mappedGallery,

        testimonials: testimonialRows.map(r => ({
            key: str(r['key']),
            rating: num(r['rating']),
            message: str(r['message']),
            authorName: str(r['authorname']),
            designation: str(r['designation']),
            photoUrl: resolveImageUrl(str(r['photo_url'])),
            isActive: bool(r['isactive']),
            displayOrder: num(r['displayorder']),
        })),

        academicResult,
        academicResults: academicResult ? [{
            year: academicResult.year,
            passPercentage: academicResult.passPercentage,
            tenthPassPercentage: academicResult.tenthPassPercentage,
            plusTwoPassPercentage: academicResult.plusTwoPassPercentage,
            legacyQuote: academicResult.legacyQuote,
        }] : [],

        activities: activitiesRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            tag: str(r['tag']),
            description: str(r['description']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            isActive: bool(r['isactive']),
            displayOrder: num(r['displayorder']),
            highlightTag: str(r['highlighttag']),
            highlightStat: str(r['highlightstat']),
        })),

        infrastructure: infraRows.map(r => ({
            key: str(r[COL_INFRASTRUCTURE_ID] || r['key']),
            title: str(r[COL_INFRASTRUCTURE_TITLE]),
            tag: str(r[COL_INFRASTRUCTURE_TAG]),
            categoryName: str(r[COL_INFRASTRUCTURE_TAG]), // Alias for templates
            description: str(r[COL_INFRASTRUCTURE_DESCRIPTION]),
            imageUrl: resolveImageUrl(str(r[COL_INFRASTRUCTURE_IMAGE_URL])),
            icon: str(r[COL_INFRASTRUCTURE_ICON]),
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r[COL_INFRASTRUCTURE_DISPLAY_ORDER]),
            highlightTitle: str(r['highlighttitle']),
            highlightDescription: str(r['highlightdescription']),
            bulletinPoints: (Array.isArray(r['bulletintextlist']) 
                ? [...r['bulletintextlist']]
                    .sort((a: any, b: any) => (a.displayorder || 0) - (b.displayorder || 0))
                    .map((b: any) => typeof b === 'string' ? b : (b.text || ''))
                    .filter(Boolean)
                : []) as string[],
        })),

        facilities: infraRows.map(r => ({
            name: str(r[COL_INFRASTRUCTURE_TITLE] ?? r[COL_FACILITIES_NAME] ?? ''),
            description: str(r[COL_INFRASTRUCTURE_DESCRIPTION] ?? r[COL_FACILITIES_DESCRIPTION] ?? ''),
            categoryName: str(r[COL_INFRASTRUCTURE_TAG] ?? r[COL_FACILITIES_CATEGORY_NAME] ?? ''),
            imageUrl: resolveImageUrl(str(r[COL_INFRASTRUCTURE_IMAGE_URL])),
            icon: str(r[COL_INFRASTRUCTURE_ICON]),
        })),

        contactDetails: contactDetailsRow ? {
            key: str(contactDetailsRow['key']),
            email: str(contactDetailsRow['email']),
            phone: str(contactDetailsRow['phone']),
            address: str(contactDetailsRow['address']),
            mapEmbedUrl: str(contactDetailsRow[COL_CONTACT_DETAILS_MAP_URL] || contactDetailsRow['map_embed_url']),
            officeHours: str(contactDetailsRow[COL_CONTACT_DETAILS_OFFICE_HOURS] || contactDetailsRow[COL_CONTACT_DETAILS_HOURS] || contactDetailsRow['office_hours'] || contactDetailsRow['hours']),
            facebook: str(contactDetailsRow[COL_CONTACT_DETAILS_FACEBOOK] || contactDetailsRow['facebook_url']),
            instagram: str(contactDetailsRow[COL_CONTACT_DETAILS_INSTAGRAM] || contactDetailsRow['instagram_url']),
            twitter: str(contactDetailsRow[COL_CONTACT_DETAILS_TWITTER] || contactDetailsRow['twitter_url']),
            youtube: str(contactDetailsRow[COL_CONTACT_DETAILS_YOUTUBE] || contactDetailsRow['youtube_url']),
        } : null,
        admissionInstructions: ((d.admissioninstructions || d.admissionsteps || []) as Record<string, unknown>[]).map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            description: str(r['description']),
            contactEmail: str(r['contactemail'] || r['contactEmail']),
            contactPhone: str(r['contactphone'] || r['contactPhone']),
            isActive: bool(r['isactive'] ?? true),
        })),

        academicsList: academicsListRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            subtitle: str(r['subtitle']),
            description: str(r['description']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r['displayorder']),
        })).sort((a, b) => a.displayOrder - b.displayOrder),

        highlightedAcademics: highlightedAcademicsRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            description: str(r['description']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            bulletinPoints: (Array.isArray(r['bulletinjson']) ? r['bulletinjson'] : []) as string[],
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r['displayorder']),
        })).sort((a, b) => a.displayOrder - b.displayOrder),

        activitiesList: activitiesListRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            tag: str(r['tag']),
            description: str(r['description']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r['displayorder']),
            highlightTag: str(r['highlighttag']),
            highlightStat: str(r['highlightstat']),
        })).sort((a, b) => a.displayOrder - b.displayOrder),

        highlightedActivities: highlightedActivitiesRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            description: str(r['description']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            bulletinPoints: (Array.isArray(r['bulletinjson']) ? r['bulletinjson'] : []) as string[],
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r['displayorder']),
        })).sort((a, b) => a.displayOrder - b.displayOrder),

        campusFeatures: campusFeaturesRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            description: str(r['description']),
            tag: str(r['tag']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            icon: str(r['icon']),
            bulletinPoints: (Array.isArray(r['bulletintextlist']) ? [...r['bulletintextlist']].sort((a: any, b: any) => (a.displayorder || 0) - (b.displayorder || 0)).map((b: any) => b.text) : []) as string[],
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r['displayorder']),
        })).sort((a, b) => a.displayOrder - b.displayOrder),

        infrastructureList: infrastructureListRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            description: str(r['description']),
            tag: str(r['tag']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            icon: str(r['icon']),
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r['displayorder']),
            highlightTitle: str(r['highlighttitle']),
            highlightDescription: str(r['highlightdescription']),
            bulletinPoints: (Array.isArray(r['bulletintextlist']) ? [...r['bulletintextlist']].sort((a: any, b: any) => (a.displayorder || 0) - (b.displayorder || 0)).map((b: any) => b.text ?? b) : []) as string[],
        })).sort((a, b) => a.displayOrder - b.displayOrder),

        highlightedInfrastructure: highlightedInfrastructureRows.map(r => ({
            key: str(r['key']),
            title: str(r['title']),
            description: str(r['description']),
            imageUrl: resolveImageUrl(str(r['imageurl'])),
            bulletinPoints: (Array.isArray(r['bulletinjson']) ? r['bulletinjson'] : []) as string[],
            isActive: bool(r['isactive'] ?? true),
            displayOrder: num(r['displayorder']),
        })).sort((a, b) => a.displayOrder - b.displayOrder),
    };
    return vm;
}


