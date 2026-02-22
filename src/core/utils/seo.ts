import { Metadata } from 'next';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

/**
 * Generates dynamic Next.js Metadata for EdDesk tenants.
 */
export function generateTenantMetadata(data: TenantViewModel, domain: string, isDemo = false): Metadata {
    const school = data.school;
    const title = isDemo
        ? `[PREVIEW] ${school.name} | EdDesk Templates`
        : `${school.name} - Official Website`;

    const description = `Welcome to ${school.name}. Located at ${school.fullAddress}. Contact us at ${school.phone} or ${school.email}. Excellence in Education.`;

    return {
        title,
        description,
        robots: {
            index: !isDemo,
            follow: !isDemo,
        },
        openGraph: {
            title,
            description,
            url: `https://${domain}`,
            siteName: school.name,
            images: school.logoUrl ? [{ url: school.logoUrl }] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: school.logoUrl ? [school.logoUrl] : [],
        },
        alternates: {
            canonical: `https://${domain}`,
        },
    };
}

/**
 * Generates JSON-LD Structured Data for Local Business (School).
 */
export function generateSchoolJsonLd(data: TenantViewModel, domain: string) {
    const school = data.school;
    return {
        '@context': 'https://schema.org',
        '@type': 'School',
        name: school.name,
        url: `https://${domain}`,
        logo: school.logoUrl,
        image: school.logoUrl,
        description: `Official website of ${school.name}`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: school.fullAddress,
            addressLocality: school.city || 'Default City',
            addressRegion: school.state || 'Default State',
            postalCode: school.zipCode || '000000',
            addressCountry: 'IN',
        },
        telephone: school.phone,
        email: school.email,
    };
}
