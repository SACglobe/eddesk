/**
 * tenant.viewmodel.ts
 * Normalizes raw API data into template-ready SchoolContent.
 *
 * Rules:
 * - All field access uses reference.js constants
 * - No hardcoded table or column names
 * - No API calls here — only data transformation
 */

import type { TenantApiDataItem } from '@/core/services/tenantApi.service';
import {
    TABLE_SCHOOLS,
    TABLE_HOMEPAGE_SECTIONS,
    TABLE_HERO_MEDIA,
    TABLE_ANNOUNCEMENTS,
    TABLE_ACADEMIC_RESULTS,
    TABLE_ACHIEVEMENTS,
    TABLE_PERSONNEL,
    TABLE_CAMPUS_STATISTICS,
    TABLE_FACILITY_CATEGORIES,
    TABLE_FACILITIES,
    TABLE_MEDIA_LIBRARY,
    TABLE_EVENTS,
    TABLE_ADMISSION_STEPS,
    TABLE_SCHOOL_IDENTITY,
    COL_SCHOOLS_NAME,
    COL_SCHOOLS_LOGO_URL,
    COL_SCHOOLS_EMAIL,
    COL_SCHOOLS_PHONE,
    COL_SCHOOLS_ADDRESS,
    COL_SCHOOLS_CITY,
    COL_SCHOOLS_STATE,
    COL_SCHOOLS_COUNTRY,
    COL_SCHOOLS_TEMPLATE_ID,
    COL_SCHOOLS_PAYMENTGATEWAY_URL,
    COL_HERO_MEDIA_TYPE,
    COL_HERO_MEDIA_URL,
    COL_HERO_MEDIA_HEADLINE,
    COL_HERO_MEDIA_SUBHEADLINE,
    COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT,
    COL_HERO_MEDIA_PRIMARY_BUTTON_URL,
    COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT,
    COL_HERO_MEDIA_SECONDARY_BUTTON_URL,
    COL_HERO_MEDIA_DISPLAY_ORDER,
    COL_HERO_MEDIA_IS_ACTIVE,
    COL_ANNOUNCEMENTS_TITLE,
    COL_ANNOUNCEMENTS_MESSAGE,
    COL_ANNOUNCEMENTS_IS_ACTIVE,
    COL_ANNOUNCEMENTS_EXPIRES_AT,
    COL_ACADEMIC_RESULTS_YEAR,
    COL_ACADEMIC_RESULTS_PASS_PERCENTAGE,
    COL_ACADEMIC_RESULTS_DISTINCTIONS,
    COL_ACADEMIC_RESULTS_FIRST_CLASS,
    COL_ACADEMIC_RESULTS_LEGACY_QUOTE,
    COL_ACHIEVEMENTS_TITLE,
    COL_ACHIEVEMENTS_DESCRIPTION,
    COL_ACHIEVEMENTS_YEAR,
    COL_ACHIEVEMENTS_CATEGORY,
    COL_ACHIEVEMENTS_TYPE,
    COL_ACHIEVEMENTS_DISPLAY_ORDER,
    COL_PERSONNEL_NAME,
    COL_PERSONNEL_DESIGNATION,
    COL_PERSONNEL_BIO,
    COL_PERSONNEL_PHOTO_URL,
    COL_PERSONNEL_TYPE,
    COL_PERSONNEL_IS_FEATURED,
    COL_CAMPUS_STATISTICS_LABEL,
    COL_CAMPUS_STATISTICS_VALUE,
    COL_CAMPUS_STATISTICS_ICON,
    COL_CAMPUS_STATISTICS_DISPLAY_ORDER,
    COL_MEDIA_LIBRARY_URL,
    COL_MEDIA_LIBRARY_CATEGORY,
    COL_MEDIA_LIBRARY_CAPTION,
    COL_MEDIA_LIBRARY_IS_FEATURED,
    COL_EVENTS_TITLE,
    COL_EVENTS_DATE,
    COL_EVENTS_DESCRIPTION,
    COL_EVENTS_LOCATION,
    COL_EVENTS_CATEGORY,
    COL_EVENTS_IS_FEATURED,
    COL_ADMISSION_STEPS_NUMBER,
    COL_ADMISSION_STEPS_TITLE,
    COL_ADMISSION_STEPS_DESCRIPTION,
    COL_SCHOOL_IDENTITY_VISION,
    COL_SCHOOL_IDENTITY_MISSION,
    COL_SCHOOL_IDENTITY_MOTTO,
    COL_HOMEPAGE_SECTIONS_SECTION_KEY,
    COL_HOMEPAGE_SECTIONS_IS_ENABLED,
    COL_HOMEPAGE_SECTIONS_DISPLAY_ORDER,
    COL_HOMEPAGE_SECTIONS_SETTINGS,
} from '@/lib/constants/reference';

// ─── Normalized Output Type ───────────────────────────────────────────────────

export interface TenantViewModel {
    school: {
        name: string;
        logoUrl: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        country: string;
        templateId: string;
        paymentGatewayUrl: string;
    };
    identity: {
        vision: string;
        mission: string;
        motto: string;
    };
    heroMedia: Array<{
        mediaType: string;
        mediaUrl: string;
        headline: string;
        subheadline: string;
        primaryButtonText: string;
        primaryButtonUrl: string;
        secondaryButtonText: string;
        secondaryButtonUrl: string;
        displayOrder: number;
        isActive: boolean;
    }>;
    announcements: Array<{
        title: string;
        message: string;
        isActive: boolean;
        expiresAt: string;
    }>;
    academicResults: Array<{
        year: number;
        passPercentage: number;
        distinctions: number;
        firstClass: number;
        legacyQuote: string;
    }>;
    achievements: Array<{
        title: string;
        description: string;
        year: number;
        category: string;
        type: string;
        displayOrder: number;
    }>;
    personnel: Array<{
        name: string;
        designation: string;
        bio: string;
        photoUrl: string;
        personType: string;
        isFeatured: boolean;
    }>;
    statistics: Array<{
        label: string;
        value: string;
        icon: string;
        displayOrder: number;
    }>;
    mediaLibrary: Array<{
        url: string;
        category: string;
        caption: string;
        isFeatured: boolean;
    }>;
    events: Array<{
        title: string;
        date: string;
        description: string;
        location: string;
        category: string;
        isFeatured: boolean;
    }>;
    admissionSteps: Array<{
        stepNumber: number;
        title: string;
        description: string;
    }>;
    homepageSections: Array<{
        sectionKey: string;
        isEnabled: boolean;
        displayOrder: number;
        settings: Record<string, unknown>;
    }>;
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
 * Transforms raw API data array into a normalized TenantViewModel.
 * All field access uses reference.js constants — no hardcoded strings.
 */
export function buildTenantViewModel(data: TenantApiDataItem[]): TenantViewModel {
    // Collect rows by table
    const schoolRows = data.map(d => d[TABLE_SCHOOLS]).filter(Boolean) as Record<string, unknown>[];
    const identityRows = data.map(d => d[TABLE_SCHOOL_IDENTITY]).filter(Boolean) as Record<string, unknown>[];
    const heroRows = data.map(d => d[TABLE_HERO_MEDIA]).filter(Boolean) as Record<string, unknown>[];
    const announcementRows = data.map(d => d[TABLE_ANNOUNCEMENTS]).filter(Boolean) as Record<string, unknown>[];
    const academicRows = data.map(d => d[TABLE_ACADEMIC_RESULTS]).filter(Boolean) as Record<string, unknown>[];
    const achievementRows = data.map(d => d[TABLE_ACHIEVEMENTS]).filter(Boolean) as Record<string, unknown>[];
    const personnelRows = data.map(d => d[TABLE_PERSONNEL]).filter(Boolean) as Record<string, unknown>[];
    const statsRows = data.map(d => d[TABLE_CAMPUS_STATISTICS]).filter(Boolean) as Record<string, unknown>[];
    const mediaRows = data.map(d => d[TABLE_MEDIA_LIBRARY]).filter(Boolean) as Record<string, unknown>[];
    const eventRows = data.map(d => d[TABLE_EVENTS]).filter(Boolean) as Record<string, unknown>[];
    const admissionRows = data.map(d => d[TABLE_ADMISSION_STEPS]).filter(Boolean) as Record<string, unknown>[];
    const sectionRows = data.map(d => d[TABLE_HOMEPAGE_SECTIONS]).filter(Boolean) as Record<string, unknown>[];

    const school = schoolRows[0] ?? {};
    const identity = identityRows[0] ?? {};

    return {
        school: {
            name: str(school[COL_SCHOOLS_NAME]),
            logoUrl: str(school[COL_SCHOOLS_LOGO_URL]),
            email: str(school[COL_SCHOOLS_EMAIL]),
            phone: str(school[COL_SCHOOLS_PHONE]),
            address: str(school[COL_SCHOOLS_ADDRESS]),
            city: str(school[COL_SCHOOLS_CITY]),
            state: str(school[COL_SCHOOLS_STATE]),
            country: str(school[COL_SCHOOLS_COUNTRY]),
            templateId: str(school[COL_SCHOOLS_TEMPLATE_ID]),
            paymentGatewayUrl: str(school[COL_SCHOOLS_PAYMENTGATEWAY_URL]),
        },
        identity: {
            vision: str(identity[COL_SCHOOL_IDENTITY_VISION]),
            mission: str(identity[COL_SCHOOL_IDENTITY_MISSION]),
            motto: str(identity[COL_SCHOOL_IDENTITY_MOTTO]),
        },
        heroMedia: heroRows.map(r => ({
            mediaType: str(r[COL_HERO_MEDIA_TYPE]),
            mediaUrl: str(r[COL_HERO_MEDIA_URL]),
            headline: str(r[COL_HERO_MEDIA_HEADLINE]),
            subheadline: str(r[COL_HERO_MEDIA_SUBHEADLINE]),
            primaryButtonText: str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT]),
            primaryButtonUrl: str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_URL]),
            secondaryButtonText: str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT]),
            secondaryButtonUrl: str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_URL]),
            displayOrder: num(r[COL_HERO_MEDIA_DISPLAY_ORDER]),
            isActive: bool(r[COL_HERO_MEDIA_IS_ACTIVE]),
        })),
        announcements: announcementRows.map(r => ({
            title: str(r[COL_ANNOUNCEMENTS_TITLE]),
            message: str(r[COL_ANNOUNCEMENTS_MESSAGE]),
            isActive: bool(r[COL_ANNOUNCEMENTS_IS_ACTIVE]),
            expiresAt: str(r[COL_ANNOUNCEMENTS_EXPIRES_AT]),
        })),
        academicResults: academicRows.map(r => ({
            year: num(r[COL_ACADEMIC_RESULTS_YEAR]),
            passPercentage: num(r[COL_ACADEMIC_RESULTS_PASS_PERCENTAGE]),
            distinctions: num(r[COL_ACADEMIC_RESULTS_DISTINCTIONS]),
            firstClass: num(r[COL_ACADEMIC_RESULTS_FIRST_CLASS]),
            legacyQuote: str(r[COL_ACADEMIC_RESULTS_LEGACY_QUOTE]),
        })),
        achievements: achievementRows.map(r => ({
            title: str(r[COL_ACHIEVEMENTS_TITLE]),
            description: str(r[COL_ACHIEVEMENTS_DESCRIPTION]),
            year: num(r[COL_ACHIEVEMENTS_YEAR]),
            category: str(r[COL_ACHIEVEMENTS_CATEGORY]),
            type: str(r[COL_ACHIEVEMENTS_TYPE]),
            displayOrder: num(r[COL_ACHIEVEMENTS_DISPLAY_ORDER]),
        })),
        personnel: personnelRows.map(r => ({
            name: str(r[COL_PERSONNEL_NAME]),
            designation: str(r[COL_PERSONNEL_DESIGNATION]),
            bio: str(r[COL_PERSONNEL_BIO]),
            photoUrl: str(r[COL_PERSONNEL_PHOTO_URL]),
            personType: str(r[COL_PERSONNEL_TYPE]),
            isFeatured: bool(r[COL_PERSONNEL_IS_FEATURED]),
        })),
        statistics: statsRows.map(r => ({
            label: str(r[COL_CAMPUS_STATISTICS_LABEL]),
            value: str(r[COL_CAMPUS_STATISTICS_VALUE]),
            icon: str(r[COL_CAMPUS_STATISTICS_ICON]),
            displayOrder: num(r[COL_CAMPUS_STATISTICS_DISPLAY_ORDER]),
        })),
        mediaLibrary: mediaRows.map(r => ({
            url: str(r[COL_MEDIA_LIBRARY_URL]),
            category: str(r[COL_MEDIA_LIBRARY_CATEGORY]),
            caption: str(r[COL_MEDIA_LIBRARY_CAPTION]),
            isFeatured: bool(r[COL_MEDIA_LIBRARY_IS_FEATURED]),
        })),
        events: eventRows.map(r => ({
            title: str(r[COL_EVENTS_TITLE]),
            date: str(r[COL_EVENTS_DATE]),
            description: str(r[COL_EVENTS_DESCRIPTION]),
            location: str(r[COL_EVENTS_LOCATION]),
            category: str(r[COL_EVENTS_CATEGORY]),
            isFeatured: bool(r[COL_EVENTS_IS_FEATURED]),
        })),
        admissionSteps: admissionRows.map(r => ({
            stepNumber: num(r[COL_ADMISSION_STEPS_NUMBER]),
            title: str(r[COL_ADMISSION_STEPS_TITLE]),
            description: str(r[COL_ADMISSION_STEPS_DESCRIPTION]),
        })),
        homepageSections: sectionRows.map(r => ({
            sectionKey: str(r[COL_HOMEPAGE_SECTIONS_SECTION_KEY]),
            isEnabled: bool(r[COL_HOMEPAGE_SECTIONS_IS_ENABLED]),
            displayOrder: num(r[COL_HOMEPAGE_SECTIONS_DISPLAY_ORDER]),
            settings: (r[COL_HOMEPAGE_SECTIONS_SETTINGS] as Record<string, unknown>) ?? {},
        })),
    };
}

/**
 * Transforms a structured LOCAL_TENANT_DATA object into a normalized TenantViewModel.
 * All field access uses reference.js constants — no hardcoded strings.
 */
export function buildTenantViewModelFromLocal(data: any): TenantViewModel {
    const school = data.school || {};
    const identity = data.school_identity || {};

    return {
        school: {
            name: str(school[COL_SCHOOLS_NAME]),
            logoUrl: str(school[COL_SCHOOLS_LOGO_URL]),
            email: str(school[COL_SCHOOLS_EMAIL]),
            phone: str(school[COL_SCHOOLS_PHONE]),
            address: str(school[COL_SCHOOLS_ADDRESS]),
            city: str(school[COL_SCHOOLS_CITY]),
            state: str(school[COL_SCHOOLS_STATE]),
            country: str(school[COL_SCHOOLS_COUNTRY]),
            templateId: str(school[COL_SCHOOLS_TEMPLATE_ID]),
            paymentGatewayUrl: str(school[COL_SCHOOLS_PAYMENTGATEWAY_URL]),
        },
        identity: {
            vision: str(identity[COL_SCHOOL_IDENTITY_VISION]),
            mission: str(identity[COL_SCHOOL_IDENTITY_MISSION]),
            motto: str(identity[COL_SCHOOL_IDENTITY_MOTTO]),
        },
        heroMedia: (data.hero_media || []).map((r: any) => ({
            mediaType: str(r[COL_HERO_MEDIA_TYPE]),
            mediaUrl: str(r[COL_HERO_MEDIA_URL]),
            headline: str(r[COL_HERO_MEDIA_HEADLINE]),
            subheadline: str(r[COL_HERO_MEDIA_SUBHEADLINE]),
            primaryButtonText: str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_TEXT]),
            primaryButtonUrl: str(r[COL_HERO_MEDIA_PRIMARY_BUTTON_URL]),
            secondaryButtonText: str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_TEXT]),
            secondaryButtonUrl: str(r[COL_HERO_MEDIA_SECONDARY_BUTTON_URL]),
            displayOrder: num(r[COL_HERO_MEDIA_DISPLAY_ORDER]),
            isActive: bool(r[COL_HERO_MEDIA_IS_ACTIVE]),
        })),
        announcements: (data.announcements || []).map((r: any) => ({
            title: str(r[COL_ANNOUNCEMENTS_TITLE]),
            message: str(r[COL_ANNOUNCEMENTS_MESSAGE]),
            isActive: bool(r[COL_ANNOUNCEMENTS_IS_ACTIVE]),
            expiresAt: str(r[COL_ANNOUNCEMENTS_EXPIRES_AT]),
        })),
        academicResults: (data.academic_results || []).map((r: any) => ({
            year: num(r[COL_ACADEMIC_RESULTS_YEAR]),
            passPercentage: num(r[COL_ACADEMIC_RESULTS_PASS_PERCENTAGE]),
            distinctions: num(r[COL_ACADEMIC_RESULTS_DISTINCTIONS]),
            firstClass: num(r[COL_ACADEMIC_RESULTS_FIRST_CLASS]),
            legacyQuote: str(r[COL_ACADEMIC_RESULTS_LEGACY_QUOTE]),
        })),
        achievements: (data.achievements || []).map((r: any) => ({
            title: str(r[COL_ACHIEVEMENTS_TITLE]),
            description: str(r[COL_ACHIEVEMENTS_DESCRIPTION]),
            year: num(r[COL_ACHIEVEMENTS_YEAR]),
            category: str(r[COL_ACHIEVEMENTS_CATEGORY]),
            type: str(r[COL_ACHIEVEMENTS_TYPE]),
            displayOrder: num(r[COL_ACHIEVEMENTS_DISPLAY_ORDER]),
        })),
        personnel: (data.personnel || []).map((r: any) => ({
            name: str(r[COL_PERSONNEL_NAME]),
            designation: str(r[COL_PERSONNEL_DESIGNATION]),
            bio: str(r[COL_PERSONNEL_BIO]),
            photoUrl: str(r[COL_PERSONNEL_PHOTO_URL]),
            personType: str(r[COL_PERSONNEL_TYPE]),
            isFeatured: bool(r[COL_PERSONNEL_IS_FEATURED]),
        })),
        statistics: (data.campus_statistics || []).map((r: any) => ({
            label: str(r[COL_CAMPUS_STATISTICS_LABEL]),
            value: str(r[COL_CAMPUS_STATISTICS_VALUE]),
            icon: str(r[COL_CAMPUS_STATISTICS_ICON]),
            displayOrder: num(r[COL_CAMPUS_STATISTICS_DISPLAY_ORDER]),
        })),
        mediaLibrary: (data.media_library || []).map((r: any) => ({
            url: str(r[COL_MEDIA_LIBRARY_URL]),
            category: str(r[COL_MEDIA_LIBRARY_CATEGORY]),
            caption: str(r[COL_MEDIA_LIBRARY_CAPTION]),
            isFeatured: bool(r[COL_MEDIA_LIBRARY_IS_FEATURED]),
        })),
        events: (data.events || []).map((r: any) => ({
            title: str(r[COL_EVENTS_TITLE]),
            date: str(r[COL_EVENTS_DATE]),
            description: str(r[COL_EVENTS_DESCRIPTION]),
            location: str(r[COL_EVENTS_LOCATION]),
            category: str(r[COL_EVENTS_CATEGORY]),
            isFeatured: bool(r[COL_EVENTS_IS_FEATURED]),
        })),
        admissionSteps: (data.admission_steps || []).map((r: any) => ({
            stepNumber: num(r[COL_ADMISSION_STEPS_NUMBER]),
            title: str(r[COL_ADMISSION_STEPS_TITLE]),
            description: str(r[COL_ADMISSION_STEPS_DESCRIPTION]),
        })),
        homepageSections: (data.sections || []).map((r: any) => ({
            sectionKey: str(r[COL_HOMEPAGE_SECTIONS_SECTION_KEY]),
            isEnabled: bool(r[COL_HOMEPAGE_SECTIONS_IS_ENABLED]),
            displayOrder: num(r[COL_HOMEPAGE_SECTIONS_DISPLAY_ORDER]),
            settings: (r[COL_HOMEPAGE_SECTIONS_SETTINGS] as Record<string, unknown>) ?? {},
        })),
    };
}
