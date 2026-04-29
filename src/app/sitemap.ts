import { MetadataRoute } from 'next'
import { createPublicSupabaseClient } from '@/lib/supabase'
import { normalizeDomain, isOwnerDomain, OWNER_BASE_URL } from '@/lib/domain'

export const revalidate = 3600; // Cache sitemap for 1 hour

const TEMPLATE_SLUGS = ['template_classic', 'template_modern', 'template_premium']
const SCREEN_SLUGS = ['about', 'gallery', 'events', 'admission', 'contact', 'academics', 'activities', 'infrastructure', 'faculty']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return buildOwnerSitemap()
}

function buildOwnerSitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [
        { url: OWNER_BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${OWNER_BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${OWNER_BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
        { url: `${OWNER_BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${OWNER_BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${OWNER_BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
        { url: `${OWNER_BASE_URL}/refund-cancellation`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 }
    ]

    for (const t of TEMPLATE_SLUGS) {
        entries.push({
            url: `${OWNER_BASE_URL}/demo/${t}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9
        })
        for (const s of SCREEN_SLUGS) {
            entries.push({
                url: `${OWNER_BASE_URL}/demo/${t}/${s}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7
            })
        }
    }

    return entries
}

function buildTenantSitemap(domain: string, screens: { slug: string, updatedat?: string }[]): MetadataRoute.Sitemap {
    const baseUrl = `https://${domain}`
    const entries: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 }
    ]

    if (screens && screens.length > 0) {
        for (const s of screens) {
            if (s.slug === 'home' || s.slug === '/') continue
            entries.push({
                url: `${baseUrl}/${s.slug}`,
                lastModified: new Date(s.updatedat || new Date()),
                changeFrequency: 'weekly',
                priority: 0.8
            })
        }
    } else {
        // Fallback for screens if template screens not found
        for (const s of SCREEN_SLUGS) {
            entries.push({
                url: `${baseUrl}/${s}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8
            })
        }
    }

    return entries
}
