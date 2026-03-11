import { Metadata } from 'next';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

/**
 * Generates dynamic Next.js Metadata for EdDesk tenants.
 */
export function generateTenantMetadata(
    data: TenantViewModel,
    domain: string,
    isDemo = false
): Metadata {
    const school = data.school;

    // ── Title ─────────────────────────────────────────────────────────────────
    // Pattern: "School Name - Official Website | City"
    const title = isDemo
        ? `[PREVIEW] ${school.name} | EdDesk Templates`
        : school.city
            ? `${school.name} - Official Website | ${school.city}`
            : `${school.name} - Official School Website`;

    // ── Description ───────────────────────────────────────────────────────────
    const firstStat = data.stats?.[0];
    const statSnippet = firstStat
        ? `${firstStat.value} ${firstStat.label}.`
        : null;

    const locationSnippet = [school.city, school.state]
        .filter(Boolean)
        .join(', ');

    const descriptionFull = [
        `Welcome to ${school.name}`,
        locationSnippet ? `located in ${locationSnippet}` : null,
        statSnippet,
        school.phone ? `Call us: ${school.phone}` : null,
    ]
        .filter(Boolean)
        .join('. ')
        .concat('.');

    const description = descriptionFull.length > 160
        ? descriptionFull.slice(0, 157) + '...'
        : descriptionFull;

    // ── Keywords ──────────────────────────────────────────────────────────────
    const coreKeywords = [
        school.name,
        school.city ? `school in ${school.city}` : null,
        school.state ? `school in ${school.state}` : null,
        school.city ? `best school ${school.city}` : null,
        'school admissions',
        'school website',
        'CBSE school',
        'education',
    ].filter(Boolean) as string[];

    const sectionKeywords: string[] = [];
    if ((data.achievements ?? []).length > 0)
        sectionKeywords.push('award winning school', 'school achievements');
    if ((data.faculty ?? []).length > 0)
        sectionKeywords.push('qualified teachers', 'experienced faculty');
    if ((data.events ?? []).length > 0)
        sectionKeywords.push('school events', 'school activities');
    if (((data as any).facilities ?? []).length > 0)
        sectionKeywords.push('school infrastructure', 'modern campus');
    if (data.academicResult)
        sectionKeywords.push('board results', 'academic excellence', '100% results');
    if ((data.activities ?? []).length > 0)
        sectionKeywords.push('extracurricular activities', 'sports school');

    const locationKeywords = [
        school.city ? `${school.name} ${school.city}` : null,
        school.city ? `schools near ${school.city}` : null,
        school.postalCode ? `school ${school.postalCode}` : null,
    ].filter(Boolean) as string[];

    const keywords = [
        ...coreKeywords,
        ...sectionKeywords,
        ...locationKeywords,
    ].join(', ');

    // ── Open Graph image ───────────────────────────────────────────────────────
    const heroImage = data.heroMedia?.[0]?.mediaUrl as string | undefined;
    const ogImage = heroImage || school.logoUrl;

    const ogImages = ogImage
        ? [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: `${school.name} - Official School Website`,
            },
        ]
        : [];

    return {
        title,
        description,
        keywords,
        authors: [{ name: school.name, url: `https://${domain}` }],
        category: 'education',
        applicationName: school.name,
        generator: 'EdDesk',
        robots: isDemo
            ? { index: false, follow: false, noarchive: true }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
        alternates: {
            canonical: `https://${domain}`,
        },
        metadataBase: new URL(`https://${domain}`),
        openGraph: {
            title,
            description,
            url: `https://${domain}`,
            siteName: school.name,
            locale: 'en_IN',
            type: 'website',
            images: ogImages,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImages.map(img => img.url),
        },
        icons: school.logoUrl
            ? {
                icon: school.logoUrl,
                apple: school.logoUrl,
            }
            : undefined,
    };
}

/**
 * Generates JSON-LD Structured Data for Local Business (School).
 */
export function generateSchoolJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    const contact = data.contactDetails as any;

    const sameAs = [
        contact?.facebook,
        contact?.instagram,
        contact?.twitter,
        contact?.youtube,
    ].filter(Boolean);

    const principal = data.principal as any;
    const employeeBlock = principal
        ? {
            employee: {
                '@type': 'Person',
                name: principal.name,
                jobTitle: principal.designation || 'Principal',
                ...(principal.imageUrl ? { image: principal.imageUrl } : {}),
            },
        }
        : {};

    return {
        '@context': 'https://schema.org',
        '@type': ['EducationalOrganization', 'School'],
        name: school.name,
        url: `https://${domain}`,
        logo: {
            '@type': 'ImageObject',
            url: school.logoUrl,
            width: 200,
            height: 200,
        },
        image: school.logoUrl,
        description: `Official website of ${school.name}. Located in ${school.city}, ${school.state}.`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: school.address || school.fullAddress,
            addressLocality: school.city || '',
            addressRegion: school.state || '',
            postalCode: school.postalCode || '',
            addressCountry: school.country || 'IN',
        },
        telephone: school.phone,
        email: school.email,
        ...(sameAs.length > 0 ? { sameAs } : {}),
        ...employeeBlock,
    };
}

/**
 * Generates Event schema for upcoming school events.
 */
export function generateEventsJsonLd(
    data: TenantViewModel,
    domain: string
): object | null {
    const now = new Date();
    const upcoming = (data.events ?? [])
        .filter((e: any) => {
            const dt = new Date(`${e.eventDate}T${e.startTime || '00:00'}`);
            return dt > now;
        })
        .sort((a: any, b: any) =>
            new Date(`${a.eventDate}T${a.startTime || '00:00'}`).getTime() -
            new Date(`${b.eventDate}T${b.startTime || '00:00'}`).getTime()
        )
        .slice(0, 10);

    if (upcoming.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Upcoming Events at ${data.school.name}`,
        itemListElement: upcoming.map((event: any, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'Event',
                name: event.title,
                description: event.description || '',
                startDate: `${event.eventDate}T${event.startTime || '00:00'}`,
                ...(event.endTime
                    ? { endDate: `${event.eventDate}T${event.endTime}` }
                    : {}),
                eventStatus: 'https://schema.org/EventScheduled',
                eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                location: {
                    '@type': 'Place',
                    name: event.location || data.school.name,
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: data.school.city || '',
                        addressRegion: data.school.state || '',
                        addressCountry: data.school.country || 'IN',
                    },
                },
                organizer: {
                    '@type': 'Organization',
                    name: data.school.name,
                    url: `https://${domain}`,
                },
                ...(event.imageUrl || data.school.logoUrl
                    ? { image: event.imageUrl || data.school.logoUrl }
                    : {}),
            },
        })),
    };
}

/**
 * Generates Person schema for the school principal.
 */
export function generatePrincipalJsonLd(
    data: TenantViewModel,
    domain: string
): object | null {
    const principal = data.principal as any;
    if (!principal) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: principal.name,
        jobTitle: principal.designation || 'Principal',
        ...(principal.message || principal.bio
            ? { description: principal.message || principal.bio }
            : {}),
        ...(principal.imageUrl ? { image: principal.imageUrl } : {}),
        worksFor: {
            '@type': 'EducationalOrganization',
            name: data.school.name,
            url: `https://${domain}`,
        },
    };
}

/**
 * Generates BreadcrumbList schema for inner pages.
 */
export function generateBreadcrumbJsonLd(
    domain: string,
    crumbs: Array<{ name: string; path: string }>
): object {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `https://${domain}`,
            },
            ...crumbs.map((crumb, i) => ({
                '@type': 'ListItem',
                position: i + 2,
                name: crumb.name,
                item: `https://${domain}${crumb.path}`,
            })),
        ],
    };
}

/**
 * Generates About Page specific metadata.
 */
export function generateAboutMetadata(
    data: TenantViewModel,
    domain: string,
    isDemo = false
): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);

    const title = isDemo
        ? `[PREVIEW] About Us - ${school.name} | EdDesk`
        : `About Us | ${school.name}`;

    const description = [
        `Learn about ${school.name}`,
        school.city ? `in ${school.city}` : null,
        data.identity?.vision
            ? `— ${data.identity.vision.slice(0, 80)}`
            : '— our vision, mission, and academic leadership.',
    ]
        .filter(Boolean)
        .join(' ');

    const trimmedDesc = description.length > 160
        ? description.slice(0, 157) + '...'
        : description;

    return {
        ...base,
        title,
        description: trimmedDesc,
        alternates: { canonical: `https://${domain}/about` },
        openGraph: {
            ...(base.openGraph as object),
            title,
            description: trimmedDesc,
            url: `https://${domain}/about`,
        },
    };
}

/**
 * Generates JSON-LD for AboutPage.
 */
export function generateAboutJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    const principal = data.personnel?.find((p: any) => p.personType === 'principal');

    return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'mainEntity': {
            '@type': 'EducationalOrganization',
            'name': school.name,
            'description': data.identity?.vision || `Official website of ${school.name}`,
            'identifier': domain,
            'image': school.logoUrl,
            ...(principal ? {
                'employee': {
                    '@type': 'Person',
                    'name': principal.name,
                    'jobTitle': 'Principal',
                    'description': principal.bio
                }
            } : {})
        }
    };
}
