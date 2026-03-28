import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { createPublicSupabaseClient } from '@/lib/supabase'
import { normalizeDomain, isOwnerDomain, OWNER_BASE_URL } from '@/lib/domain'

const TEMPLATE_SLUGS = ['template_classic', 'template_modern', 'template_premium']
const SCREEN_SLUGS = ['about', 'gallery', 'events', 'admission', 'contact', 'academics', 'activities', 'infrastructure', 'faculty']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const headersList = await headers()
    const host = headersList.get('host') || 'www.eddesk.in'
    const domain = normalizeDomain(host)
    const isOwner = isOwnerDomain(domain)

    if (isOwner) {
        return buildOwnerSitemap()
    }

    try {
        const supabase = await createPublicSupabaseClient()
        
        // Find school by domain
        let { data: school } = await supabase
            .from('schools')
            .select('key, customdomain')
            .eq('customdomain', domain)
            .eq('isactive', true)
            .maybeSingle()

        if (!school && host !== domain) {
            const { data: fallbackSchool } = await supabase
                .from('schools')
                .select('key, customdomain')
                .eq('customdomain', host)
                .eq('isactive', true)
                .maybeSingle()
            school = fallbackSchool
        }

        if (!school) {
            return []
        }

        const { data: screens } = await supabase
            .from('templatescreens')
            .select('slug, updatedat')
            .eq('isactive', true)

        return buildTenantSitemap(domain, screens || [])
    } catch (err) {
        console.error('[sitemap.ts] Error:', err)
        return []
    }
}

function buildOwnerSitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [
        { url: OWNER_BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 }
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
