import { Metadata } from 'next';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { isValidImageUrl, resolveImageUrl } from '@/core/utils/url';

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

    const resolvedLogo = resolveImageUrl(school.logoUrl);
    const logoUrlValid = isValidImageUrl(resolvedLogo);
    
    // Ensure faviconUrl is absolute for metadataBase to behave correctly
    let faviconUrl = logoUrlValid ? resolvedLogo : '/assets/images/icon.png';
    if (faviconUrl && !faviconUrl.startsWith('http') && !faviconUrl.startsWith('/')) {
        faviconUrl = `/${faviconUrl}`;
    }

    return {
        metadataBase: new URL(`https://${domain}`),
        title,
        description,
        keywords,
        authors: [{ name: school.name, url: `https://${domain}` }],
        category: 'education',
        applicationName: school.name,
        generator: 'EdDesk',
        alternates: {
            canonical: '/',
        },
        formatDetection: {
            telephone: true,
            address: true,
            email: true,
        },
        robots: isDemo
            ? { index: false, follow: false, noarchive: true }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
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
            images: ogImage ? [ogImage] : [],
        },
        icons: {
            icon: [
                { url: faviconUrl, sizes: '32x32', type: 'image/png' },
                { url: faviconUrl, sizes: '16x16', type: 'image/png' },
                { url: faviconUrl },
            ],
            apple: [
                { url: faviconUrl, sizes: '180x180', type: 'image/png' },
            ],
        },
    };
}

/**
 * Generates JSON-LD Structured Data for Local Business (School).
 */

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

/**
 * Generates Gallery Page specific metadata.
 */
export function generateGalleryMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const title = isDemo ? `[PREVIEW] Photo Gallery - ${school.name} | EdDesk` : `Photo Gallery | ${school.name}`;
    return {
        ...base,
        title,
        description: `Explore ${school.name}'s campus, events, and activities through our photo gallery.`,
        alternates: { canonical: `https://${domain}/gallery` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/gallery` },
    };
}

/**
 * Generates Events Page specific metadata.
 */
export function generateEventsMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const title = isDemo ? `[PREVIEW] Events & Programs - ${school.name} | EdDesk` : `Events & Programs | ${school.name}`;
    return {
        ...base,
        title,
        description: `Upcoming events, sports days, and cultural programs at ${school.name}.`,
        alternates: { canonical: `https://${domain}/events` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/events` },
    };
}

/**
 * Generates Faculty Page specific metadata.
 */
export function generateFacultyMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const title = isDemo ? `[PREVIEW] Our Faculty - ${school.name} | EdDesk` : `Our Faculty | ${school.name}`;
    return {
        ...base,
        title,
        description: `Meet the experienced teachers and staff at ${school.name}${school.city ? ` in ${school.city}` : ''}.`,
        alternates: { canonical: `https://${domain}/faculty` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/faculty` },
    };
}

/**
 * Generates Admission Page specific metadata.
 */
export function generateAdmissionMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const year = new Date().getFullYear();
    const title = isDemo ? `[PREVIEW] Admissions ${year} - ${school.name} | EdDesk` : `Admissions ${year} | ${school.name}`;
    return {
        ...base,
        title,
        description: `Apply for admission at ${school.name}. Learn about eligibility, steps, and fees for the upcoming academic year.`,
        alternates: { canonical: `https://${domain}/admission` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/admission` },
    };
}

/**
 * Generates Contact Page specific metadata.
 */
export function generateContactMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const title = isDemo ? `[PREVIEW] Contact Us - ${school.name} | EdDesk` : `Contact Us | ${school.name}`;
    return {
        ...base,
        title,
        description: `Get in touch with ${school.name}. Find our address, phone, email, and map for our campus${school.city ? ` in ${school.city}` : ''}.`,
        alternates: { canonical: `https://${domain}/contact` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/contact` },
    };
}

/**
 * Generates Academics Page specific metadata.
 */
export function generateAcademicsMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const title = isDemo ? `[PREVIEW] Academics - ${school.name} | EdDesk` : `Academics | ${school.name}`;
    return {
        ...base,
        title,
        description: `Academics, curriculum, and educational excellence at ${school.name}.`,
        alternates: { canonical: `https://${domain}/academics` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/academics` },
    };
}

/**
 * Generates Activities Page specific metadata.
 */
export function generateActivitiesMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const title = isDemo ? `[PREVIEW] Activities & Sports - ${school.name} | EdDesk` : `Activities & Sports | ${school.name}`;
    return {
        ...base,
        title,
        description: `Extracurricular activities, sports, and cultural programs at ${school.name}.`,
        alternates: { canonical: `https://${domain}/activities` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/activities` },
    };
}

/**
 * Generates Infrastructure Page specific metadata.
 */
export function generateInfrastructureMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const base = generateTenantMetadata(data, domain, isDemo);
    const title = isDemo ? `[PREVIEW] Campus & Infrastructure - ${school.name} | EdDesk` : `Campus & Infrastructure | ${school.name}`;
    return {
        ...base,
        title,
        description: `Discover the modern facilities and campus infrastructure at ${school.name}.`,
        alternates: { canonical: `https://${domain}/infrastructure` },
        openGraph: { ...(base.openGraph as object), title, url: `https://${domain}/infrastructure` },
    };
}

/**
 * Generates WebSite Schema with SearchAction
 */
export function generateWebSiteJsonLd(data: TenantViewModel, domain: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': data.school.name,
        'url': `https://${domain}`,
        'potentialAction': {
            '@type': 'SearchAction',
            'target': `https://${domain}/?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
        }
    };
}

/**
 * Generates ContactPage Schema
 */
export function generateContactJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    const contact = data.contactDetails as any;
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': `Contact ${school.name}`,
        'url': `https://${domain}/contact`,
        'mainEntity': {
            '@type': 'EducationalOrganization',
            'name': school.name,
            'telephone': contact?.phone || school.phone,
            'email': contact?.email || school.email,
            'address': {
                '@type': 'PostalAddress',
                'streetAddress': contact?.address || school.address || school.fullAddress,
                'addressLocality': contact?.city || school.city || '',
                'addressRegion': contact?.state || school.state || '',
                'postalCode': contact?.postalCode || school.postalCode || '',
                'addressCountry': contact?.country || school.country || 'IN'
            }
        }
    };
}

/**
 * Generates Faculty / Person ItemList Schema
 */
export function generateFacultyJsonLd(data: TenantViewModel, domain: string) {
    const faculty = data.faculty || [];
    if (faculty.length === 0) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': `Faculty at ${data.school.name}`,
        'url': `https://${domain}/faculty`,
        'itemListElement': faculty.slice(0, 20).map((member: any, i: number) => ({
            '@type': 'ListItem',
            'position': i + 1,
            'item': {
                '@type': 'Person',
                'name': member.name,
                'jobTitle': member.designation || member.role || 'Teacher',
                ...(member.imageUrl ? { 'image': member.imageUrl } : {}),
                'worksFor': {
                    '@type': 'EducationalOrganization',
                    'name': data.school.name
                }
            }
        }))
    };
}

/**
 * Generates Gallery / ImageGallery Schema
 */
export function generateGalleryJsonLd(data: TenantViewModel, domain: string) {
    const media = data.gallery || [];
    if (media.length === 0) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        'name': `Photo Gallery - ${data.school.name}`,
        'url': `https://${domain}/gallery`,
        'about': {
            '@type': 'EducationalOrganization',
            'name': data.school.name
        }
    };
}

/**
 * Generates Admission / Service Schema
 */
export function generateAdmissionJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': `Admissions at ${school.name}`,
        'url': `https://${domain}/admission`,
        'provider': {
            '@type': 'EducationalOrganization',
            'name': school.name,
            'url': `https://${domain}`
        },
        'serviceType': 'School Admissions'
    };
}

/**
 * Generates Academics / EducationalOccupationalProgram Schema
 */
export function generateAcademicsJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOccupationalProgram',
        'name': `Academics at ${school.name}`,
        'url': `https://${domain}/academics`,
        'provider': {
            '@type': 'EducationalOrganization',
            'name': school.name,
            'url': `https://${domain}`
        }
    };
}
/**
 * Generates School / EducationalOrganization Schema for the homepage.
 */
export function generateSchoolJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    const contact = data.contactDetails as any;
    const principal = data.principal as any;
    const fallbackImage = 'https://eddesk.in/assets/school-fallback.png'; // Global fallback

    const sameAs = [
        contact?.facebook,
        contact?.instagram,
        contact?.twitter,
        contact?.youtube,
        ...(contact?.socialLinks?.map((s: any) => s.url) || [])
    ].filter(Boolean);

    const employeeBlock = principal
        ? {
            employee: {
                '@type': 'Person',
                'name': principal.name,
                'jobTitle': principal.designation || 'Principal',
                ...(principal.imageUrl ? { 'image': principal.imageUrl } : {}),
            },
        }
        : {};

    return {
        '@context': 'https://schema.org',
        '@type': ['EducationalOrganization', 'School'],
        'name': school.name,
        'description': school.description || `Official website of ${school.name}.`,
        'url': `https://${domain}`,
        'logo': school.logoUrl || fallbackImage,
        'image': data.heroMedia?.[0]?.mediaUrl || school.logoUrl || fallbackImage,
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': school.address || school.fullAddress || 'Contact school for address',
            'addressLocality': school.city || '',
            'addressRegion': school.state || '',
            'postalCode': school.postalCode || '',
            'addressCountry': 'IN'
        },
        'telephone': school.phone || 'Contact school office',
        'email': school.email || '',
        'sameAs': sameAs,
        'award': data.schoolAchievements?.map((a: any) => a.title).filter(Boolean) || [],
        ...employeeBlock
    };
}

/**
 * Generates LocalBusiness Schema for Maps presence.
 */
export function generateLocalBusinessJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    const contact = data.contactDetails as any;
    const fallbackImage = 'https://eddesk.in/assets/school-fallback.png';
    
    return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': school.name,
        'image': data.heroMedia?.[0]?.mediaUrl || school.logoUrl || fallbackImage,
        '@id': `https://${domain}`,
        'url': `https://${domain}`,
        'telephone': school.phone || 'Contact school office',
        'priceRange': '₹₹',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': school.address || school.fullAddress || 'Contact school for address',
            'addressLocality': school.city || '',
            'addressRegion': school.state || '',
            'postalCode': school.postalCode || '',
            'addressCountry': 'IN'
        },
        'geo': contact?.latitude && contact?.longitude ? {
            '@type': 'GeoCoordinates',
            'latitude': contact.latitude,
            'longitude': contact.longitude
        } : undefined
    };
}
