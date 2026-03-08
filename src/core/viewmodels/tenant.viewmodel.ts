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
    COL_ACADEMIC_RESULTS_DISTINCTIONS,
    COL_ACADEMIC_RESULTS_FIRST_CLASS,
    COL_ACADEMIC_RESULTS_LEGACY_QUOTE,

    COL_INFRASTRUCTURE_TITLE,
    COL_INFRASTRUCTURE_DESCRIPTION,
    COL_INFRASTRUCTURE_TAG,

    COL_CONTACT_DETAILS_ID,
    COL_CONTACT_DETAILS_PHONE,
    COL_CONTACT_DETAILS_EMAIL,
    COL_CONTACT_DETAILS_ADDRESS,
    COL_CONTACT_DETAILS_MAP_URL,
    COL_CONTACT_DETAILS_FACEBOOK,
    COL_CONTACT_DETAILS_INSTAGRAM,
    COL_CONTACT_DETAILS_TWITTER,
    COL_CONTACT_DETAILS_YOUTUBE,

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
        paymentGatewayUrl: string;  // kept for compat — may be empty string
        gracePeriodDays: number;
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

    // ── Section visibility (from templatecomponents, deduplicated) ────────────
    components: Array<{
        componentCode: string;   // 'hero' | 'broadcast' | 'faculty' | etc.
        isActive: boolean;
        isRequired: boolean;
        displayOrder: number;
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
        aboutTitle: string;
        aboutDescription: string;
    };

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

    // ── Principal (convenience — derived from leadership) ─────────────────────
    principal: {
        key: string;
        name: string;
        role: string;
        designation: string;
        message: string;
        imageUrl: string;
        signatureUrl: string;
    } | null;

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
        caption: string;
        category: string;
        mediaType: string;
        isFeatured: boolean;
        displayOrder: number;
    }>;

    // ── Also kept as mediaLibrary for template backward compatibility ──────────
    mediaLibrary: Array<{
        url: string;
        mediaType: string;
        category: string;
        caption: string;
        isFeatured: boolean;
    }>;

    // ── Academic Results (SINGLE OBJECT — nullable) ───────────────────────────
    academicResult: {            // new canonical name — single object
        key: string;
        year: number;
        passPercentage: number;
        distinctions: number;
        firstClass: number;
        legacyQuote: string;
    } | null;

    // ── Also kept as academicResults array for template backward compat ────────
    // Wraps single object in array — or empty array if null
    academicResults: Array<{
        year: number;
        passPercentage: number;
        distinctions: number;
        firstClass: number;
        legacyQuote: string;
    }>;

    // ── Activities ────────────────────────────────────────────────────────────
    activities: Array<Record<string, unknown>>;

    // ── Infrastructure ────────────────────────────────────────────────────────
    infrastructure: Array<Record<string, unknown>>;

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
        facebook: string;
        instagram: string;
        twitter: string;
        youtube: string;
    } | null;
    admissionSteps: Array<Record<string, unknown>>;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function str(val: unknown): string {
    return typeof val === 'string' ? val : '';
}
function num(val: unknown): number {
    return typeof val === 'number' ? val : Number(val) || 0;
}
function bool(val: unknown): boolean {
    return val === true || val === 'true';
}

// ─── ViewModel Builder ────────────────────────────────────────────────────────

/**
 * Transforms ScreenDataPayload into a normalized TenantViewModel.
 * All field access uses reference.js constants — no hardcoded strings.
 */
export function buildTenantViewModel(payload: ScreenDataPayload): TenantViewModel {

    // 1. Extract top-level sections from payload
    const school = payload.school ?? {};
    const subscription = payload.subscription ?? {};
    const plan = payload.plan ?? {};
    const d = payload.data ?? {};

    // 2. Extract arrays — default to [] if missing
    const heroRows = (d.hero ?? []) as Record<string, unknown>[];
    const broadcastRows = (d.broadcast ?? []) as Record<string, unknown>[];
    const facultyRows = (d.faculty ?? []) as Record<string, unknown>[];
    const leadershipRows = (d.leadership ?? []) as Record<string, unknown>[];
    const statsRows = (d.schoolstats ?? []) as Record<string, unknown>[];
    const achievementRows = (d.achievements ?? []) as Record<string, unknown>[];
    const eventRows = (d.events ?? []) as Record<string, unknown>[];
    const galleryRows = (d.gallery ?? []) as Record<string, unknown>[];
    const activityRows = (d.activities ?? []) as Record<string, unknown>[];
    const infraRows = (d.infrastructure ?? []) as Record<string, unknown>[];
    const componentRows = (d.templatecomponents ?? []) as Record<string, unknown>[];

    // 3. Extract single objects — default to null if missing
    const academicResultRow = (d.academicresults ?? null) as Record<string, unknown> | null;
    const contactDetailsRow = (d.contactdetails ?? null) as Record<string, unknown> | null;

    // 4. Deduplicate templatecomponents by componentcode
    const seenCodes = new Set<string>();
    const dedupedComponents = componentRows.filter(r => {
        const code = str(r[COL_TEMPLATE_COMPONENTS_CODE]);
        if (seenCodes.has(code)) return false;
        seenCodes.add(code);
        return true;
    });

    // 5. Map leadership into typed array
    const mappedLeadership = leadershipRows.map(r => ({
        key: str(r[COL_LEADERSHIP_ID]),
        name: str(r[COL_LEADERSHIP_NAME]),
        role: str(r[COL_LEADERSHIP_ROLE]),
        designation: str(r[COL_LEADERSHIP_DESIGNATION]),
        message: str(r[COL_LEADERSHIP_MESSAGE]),
        imageUrl: str(r[COL_LEADERSHIP_IMAGE_URL]),
        signatureUrl: str(r[COL_LEADERSHIP_SIGNATURE_URL]),
        isActive: bool(r[COL_LEADERSHIP_IS_ACTIVE]),
        displayOrder: num(r[COL_LEADERSHIP_DISPLAY_ORDER]),
    }));

    // 6. Derive principal from leadership array
    const principal = mappedLeadership.find(l => l.role === 'principal') ?? null;

    // 7. Build personnel array (merged faculty + leadership) for backward compat
    const personnelFromFaculty = facultyRows.map(r => ({
        key: str(r[COL_PERSONNEL_ID]),
        name: str(r[COL_PERSONNEL_NAME]),
        designation: str(r[COL_PERSONNEL_DESIGNATION]),
        bio: str(r[COL_PERSONNEL_BIO]),
        photoUrl: str(r[COL_PERSONNEL_IMAGE_URL]),
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
    const mappedComponents = dedupedComponents.map(r => ({
        componentCode: str(r[COL_TEMPLATE_COMPONENTS_CODE]),
        isActive: bool(r[COL_TEMPLATE_COMPONENTS_IS_ACTIVE]),
        isRequired: bool(r[COL_TEMPLATE_COMPONENTS_REQUIRED]),
        displayOrder: num(r[COL_TEMPLATE_COMPONENTS_ORDER]),
    }));

    const homepageSections = mappedComponents.map(c => ({
        sectionKey: c.componentCode,
        isEnabled: c.isActive,
        isRequired: c.isRequired,
        displayOrder: c.displayOrder,
        settings: {}, // Empty for now as validationconfig isn't used by templates yet
    }));

    // 9. Map achievements
    const mappedAchievements = achievementRows.map(r => ({
        key: str(r[COL_ACHIEVEMENTS_ID]),
        title: str(r[COL_ACHIEVEMENTS_TITLE]),
        description: str(r[COL_ACHIEVEMENTS_DESCRIPTION]),
        category: str(r[COL_ACHIEVEMENTS_CATEGORY]),
        year: num(r[COL_ACHIEVEMENTS_YEAR]),
        awardLevel: str(r[COL_ACHIEVEMENTS_AWARD_LEVEL]),
        imageUrl: str(r[COL_ACHIEVEMENTS_IMAGE_URL]),
        isFeatured: bool(r[COL_ACHIEVEMENTS_IS_FEATURED]),
        isActive: bool(r[COL_IS_ACTIVE]),
        displayOrder: num(r[COL_ACHIEVEMENTS_DISPLAY_ORDER]),
        achievementType: str(r[COL_ACHIEVEMENTS_CATEGORY]),
        photoUrl: str(r[COL_ACHIEVEMENTS_IMAGE_URL]),
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
        imageUrl: str(r[COL_EVENTS_IMAGE_URL]),
        isFeatured: bool(r[COL_EVENTS_IS_FEATURED]),
    }));

    // 11. Map gallery
    const mappedGallery = galleryRows.map(r => ({
        key: str(r[COL_MEDIA_LIBRARY_ID]),
        url: str(r[COL_MEDIA_LIBRARY_URL]),
        caption: str(r[COL_MEDIA_LIBRARY_CAPTION]),
        category: str(r[COL_MEDIA_LIBRARY_CATEGORY]),
        mediaType: str(r[COL_MEDIA_LIBRARY_TYPE]),
        isFeatured: bool(r[COL_MEDIA_LIBRARY_IS_FEATURED]),
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
        distinctions: num(academicResultRow[COL_ACADEMIC_RESULTS_DISTINCTIONS]),
        firstClass: num(academicResultRow[COL_ACADEMIC_RESULTS_FIRST_CLASS]),
        legacyQuote: str(academicResultRow[COL_ACADEMIC_RESULTS_LEGACY_QUOTE]),
    } : null;

    // 14. Map contact details
    const contactDetails = contactDetailsRow ? {
        key: str(contactDetailsRow[COL_CONTACT_DETAILS_ID]),
        email: str(contactDetailsRow[COL_CONTACT_DETAILS_EMAIL]),
        phone: str(contactDetailsRow[COL_CONTACT_DETAILS_PHONE]),
        address: str(contactDetailsRow[COL_CONTACT_DETAILS_ADDRESS]),
        mapEmbedUrl: str(contactDetailsRow[COL_CONTACT_DETAILS_MAP_URL]),
        facebook: str(contactDetailsRow[COL_CONTACT_DETAILS_FACEBOOK]),
        instagram: str(contactDetailsRow[COL_CONTACT_DETAILS_INSTAGRAM]),
        twitter: str(contactDetailsRow[COL_CONTACT_DETAILS_TWITTER]),
        youtube: str(contactDetailsRow[COL_CONTACT_DETAILS_YOUTUBE]),
    } : null;

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
            logoUrl: str(school[COL_SCHOOLS_LOGO_URL]),
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
            paymentGatewayUrl: str(school[COL_SCHOOLS_PAYMENTGATEWAY_URL]),
            gracePeriodDays: num(plan[COL_PLAN_GRACE_PERIOD]),
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
            vision: '',   // not in RPC response — kept for seo.ts compat
            mission: '',
            motto: '',
            aboutTitle: '',
            aboutDescription: '',
        },

        heroMedia: heroRows.map(r => ({
            key: str(r[COL_HERO_MEDIA_ID]),
            headline: str(r[COL_HERO_MEDIA_HEADLINE]),
            subheadline: str(r[COL_HERO_MEDIA_SUBHEADLINE]),
            mediaType: str(r[COL_HERO_MEDIA_TYPE]),
            mediaUrl: str(r[COL_HERO_MEDIA_URL]),
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
            imageUrl: str(r[COL_PERSONNEL_IMAGE_URL]),
            email: str(r[COL_PERSONNEL_EMAIL]),
            phone: str(r[COL_PERSONNEL_PHONE]),
            isActive: bool(r[COL_PERSONNEL_IS_ACTIVE]),
            displayOrder: num(r[COL_PERSONNEL_DISPLAY_ORDER]),
        })),

        leadership: mappedLeadership,
        principal,
        personnel,

        stats: mappedStats,
        statistics: mappedStats,

        achievements: mappedAchievements,
        events: mappedEvents,

        gallery: mappedGallery,
        mediaLibrary: mappedGallery,

        academicResult,
        academicResults: academicResult ? [{
            year: academicResult.year,
            passPercentage: academicResult.passPercentage,
            distinctions: academicResult.distinctions,
            firstClass: academicResult.firstClass,
            legacyQuote: academicResult.legacyQuote,
        }] : [],

        activities: activityRows,
        infrastructure: infraRows,

        facilities: infraRows.map(r => ({
            name: str(r[COL_INFRASTRUCTURE_TITLE] ?? r['title'] ?? ''),
            description: str(r[COL_INFRASTRUCTURE_DESCRIPTION] ?? r['description'] ?? ''),
            categoryName: str(r[COL_INFRASTRUCTURE_TAG] ?? r['tag'] ?? ''),
        })),

        contactDetails,
        admissionSteps: (d.admissionsteps ?? []) as Array<Record<string, unknown>>,
    };
    return vm;
}

/**
 * Transforms a structured LOCAL_TENANT_DATA object into a normalized TenantViewModel.
 * Kept for backward compatibility during transition.
 */
export function buildTenantViewModelFromLocal(data: any): TenantViewModel {
    const school = data.school || {};
    // This is a minimal shim to keep types happy during transition
    // It will be removed in a later step.
    return {
        mode: 'demo',
        screen: 'home',
        school: {
            key: str(school.key),
            name: str(school.name),
            slug: str(school.slug),
            customDomain: str(school.customdomain),
            templateSlug: str(school.templatekey),
            templateId: str(school.templatekey),
            isActive: bool(school.isactive),
            isDemo: true,
            logoUrl: str(school.logo_url),
            slogan: str(school.slogan),
            description: str(school.description),
            email: str(school.email),
            phone: str(school.phone),
            address: str(school.address),
            city: str(school.city),
            state: str(school.state),
            country: str(school.country),
            postalCode: str(school.postal_code),
            // Fallback for fullAddress if available
            fullAddress: [str(school.address), str(school.city), str(school.state)].filter(Boolean).join(', '),
            themeConfig: (school.theme_config as Record<string, unknown>) ?? {},
            paymentGatewayUrl: str(school.paymentgateway_url),
            gracePeriodDays: 7,
        },
        subscription: { status: str(school.subscription_status) || 'active', endDate: str(school.expirationdate) || '' },
        plan: { name: str(school.plan_type) || 'Free', gracePeriod: 7 },
        components: [],

        // Map the sections array to homepageSections
        homepageSections: (data.sections || []).map((s: any) => ({
            id: str(s.key),
            sectionKey: str(s.componentkey),
            isEnabled: bool(s.isactive),
            displayOrder: num(s.displayorder),
            isRequired: false,
            validationConfig: s.validationconfig || {},
        })),

        identity: {
            vision: str(data.school_identity?.vision),
            mission: str(data.school_identity?.mission),
            motto: str(data.school_identity?.motto),
            aboutTitle: str(data.school_identity?.about_title),
            aboutDescription: str(data.school_identity?.about_description)
        },

        // Map media arrays
        heroMedia: (data.hero_media || []).map((h: any) => ({
            key: str(h.key),
            mediaType: str(h.mediatype),
            mediaUrl: str(h.mediaurl),
            headline: str(h.headline),
            subHeadline: str(h.subheadline),
            primaryButtonText: str(h.primarybuttontext),
            primaryButtonUrl: str(h.primarybuttonurl),
            secondaryButtonText: str(h.secondarybuttontext),
            secondaryButtonUrl: str(h.secondarybuttonurl),
            displayOrder: num(h.displayorder),
            isActive: bool(h.isactive),
        })),

        broadcast: (data.announcements || []).map((a: any) => ({
            key: str(a.key),
            title: str(a.title),
            message: str(a.message),
            linkUrl: str(a.linkurl),
            expiresAt: str(a.expiresat),
            isActive: bool(a.isactive),
            priority: num(a.priority),
        })),

        announcements: (data.announcements || []).map((a: any) => ({
            key: str(a.key),
            title: str(a.title),
            message: str(a.message),
            linkUrl: str(a.linkurl),
            expiresAt: str(a.expiresat),
            isActive: bool(a.isactive),
            priority: num(a.priority),
        })),

        // Map personnel arrays
        personnel: (data.personnel || []).map((p: any) => ({
            key: str(p.key),
            name: str(p.name),
            designation: str(p.designation),
            bio: str(p.description),
            photoUrl: str(p.imageurl),
            personType: str(p.person_type),
            isFeatured: bool(p.isfeatured),
            displayOrder: num(p.displayorder),
        })),

        faculty: (data.personnel || [])
            .filter((p: any) => p.person_type === 'faculty')
            .map((p: any) => ({
                key: str(p.key),
                name: str(p.name),
                designation: str(p.designation),
                bio: str(p.description),
                photoUrl: str(p.imageurl),
                personType: 'faculty',
                isFeatured: bool(p.isfeatured),
                displayOrder: num(p.displayorder),
            })),

        leadership: (data.personnel || [])
            .filter((p: any) => p.person_type === 'board')
            .map((p: any) => ({
                key: str(p.key),
                name: str(p.name),
                designation: str(p.designation),
                bio: str(p.description),
                photoUrl: str(p.imageurl),
                personType: 'board',
                isFeatured: bool(p.isfeatured),
                displayOrder: num(p.displayorder),
            })),

        principal: (data.personnel || [])
            .filter((p: any) => p.person_type === 'principal')
            .map((p: any) => ({
                key: str(p.key),
                name: str(p.name),
                designation: str(p.designation),
                bio: str(p.description),
                photoUrl: str(p.imageurl),
                personType: 'principal',
                isFeatured: bool(p.isfeatured),
                displayOrder: num(p.displayorder),
            }))[0] || null,

        stats: (data.campus_statistics || []).map((s: any) => ({
            key: str(s.key),
            label: str(s.label),
            value: str(s.value),
            icon: str(s.icon),
            displayOrder: num(s.displayorder),
        })),

        statistics: (data.campus_statistics || []).map((s: any) => ({
            key: str(s.key),
            label: str(s.label),
            value: str(s.value),
            icon: str(s.icon),
            displayOrder: num(s.displayorder),
        })),

        achievements: (data.achievements || []).map((a: any) => ({
            key: str(a.key),
            year: num(a.year),
            category: str(a.category),
            title: str(a.title),
            description: str(a.description),
            photoUrl: str(a.imageurl),
            achievementType: str(a.achievement_type),
            displayOrder: num(a.displayorder),
        })),

        events: (data.events || []).map((e: any) => ({
            key: str(e.key),
            title: str(e.title),
            description: str(e.description),
            category: str(e.category),
            location: str(e.location),
            eventDate: str(e.eventdate),
            date: str(e.eventdate),
            startTime: str(e.starttime),
            endTime: str(e.endtime),
            imageUrl: str(e.imageurl),
            isFeatured: bool(e.isfeatured),
        })),

        gallery: (data.media_library || []).map((m: any) => ({
            key: str(m.key),
            url: str(m.url),
            caption: str(m.caption),
            category: str(m.category),
            mediaType: str(m.mediatype),
            isFeatured: bool(m.isfeatured),
            displayOrder: num(m.displayorder),
        })),

        mediaLibrary: (data.media_library || []).map((m: any) => ({
            key: str(m.key),
            url: str(m.url),
            caption: str(m.caption),
            category: str(m.category),
            mediaType: str(m.mediatype),
            isFeatured: bool(m.isfeatured),
            displayOrder: num(m.displayorder),
        })),

        academicResult: (data.academic_results || [])[0] ? {
            key: str(data.academic_results[0].key),
            year: num(data.academic_results[0].year),
            passPercentage: num(data.academic_results[0].passpercentage),
            distinctions: num(data.academic_results[0].distinctions),
            firstClass: num(data.academic_results[0].firstclass),
            legacyQuote: str(data.academic_results[0].legacyquote),
        } : null,

        academicResults: (data.academic_results || []).map((a: any) => ({
            key: str(a.key),
            year: num(a.year),
            passPercentage: num(a.passpercentage),
            distinctions: num(a.distinctions),
            firstClass: num(a.firstclass),
            legacyQuote: str(a.legacyquote),
        })),

        facilities: (data.facilities || []).map((f: any) => {
            const cat = (data.facility_categories || []).find((c: any) => c.key === f.category_id);
            return {
                name: str(f.title),
                description: str(f.description),
                categoryName: str(cat?.name || f.tag),
            };
        }),

        activities: [],
        infrastructure: [],
        contactDetails: null,
        admissionSteps: [],
    };
}
