import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createPublicSupabaseClient } from '@/lib/supabase'

const OWNER_DOMAINS = ['eddesk.in', 'localhost', '127.0.0.1', '192.168.1.6']
const OWNER_BASE = 'https://www.eddesk.in'

const TEMPLATE_SLUGS = [
    'template_classic',
    'template_modern',
    'template_premium',
]

const SCREEN_SLUGS = [
    'about',
    'gallery',
    'events',
    'admission',
    'contact',
    'academics',
    'activities',
    'infrastructure',
    'faculty',
]

function normalizeDomain(host: string): string {
    return host.toLowerCase().replace(/^www\./, '').split(':')[0]
}

function urlEntry(
    loc: string,
    priority: number,
    changefreq: string
): string {
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function wrapSitemap(entries: string[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`
}

function buildOwnerSitemap(): string {
    const entries: string[] = []

    entries.push(urlEntry(OWNER_BASE, 1.0, 'weekly'))

    for (const t of TEMPLATE_SLUGS) {
        entries.push(urlEntry(`${OWNER_BASE}/demo/${t}`, 0.9, 'weekly'))
        for (const s of SCREEN_SLUGS) {
            entries.push(urlEntry(`${OWNER_BASE}/demo/${t}/${s}`, 0.7, 'weekly'))
        }
    }

    return wrapSitemap(entries)
}

function buildTenantSitemap(domain: string): string {
    const base = `https://${domain}`
    const entries: string[] = []

    entries.push(urlEntry(base, 1.0, 'weekly'))

    for (const s of SCREEN_SLUGS) {
        entries.push(urlEntry(`${base}/${s}`, 0.8, 'weekly'))
    }

    return wrapSitemap(entries)
}

const XML_HEADERS = {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
}

export async function GET(request: NextRequest) {
    const host = request.headers.get('host') || ''
    const domain = normalizeDomain(host)
    const isOwner = OWNER_DOMAINS.includes(domain)

    if (isOwner) {
        return new NextResponse(buildOwnerSitemap(), { headers: XML_HEADERS })
    }

    try {
        console.log('[sitemap] Request host:', host)
        console.log('[sitemap] Normalized domain:', domain)

        const supabase = await createPublicSupabaseClient()
        
        // Try exact match with normalized domain
        let { data: school, error: schoolError } = await supabase
            .from('schools')
            .select('key, customdomain')
            .eq('customdomain', domain)
            .eq('isactive', true)
            .maybeSingle()

        // Fallback: Try with original host if normalized domain failed
        if (!school && host !== domain) {
            const { data: fallbackSchool } = await supabase
                .from('schools')
                .select('key, customdomain')
                .eq('customdomain', host)
                .eq('isactive', true)
                .maybeSingle()
            school = fallbackSchool
        }

        if (schoolError) {
            console.error('[sitemap] School lookup error:', schoolError.message)
        }

        if (!school) {
            console.warn('[sitemap] No active school found for host:', host, 'or domain:', domain)
            return new NextResponse(wrapSitemap([]), { headers: XML_HEADERS })
        }

        console.log('[sitemap] Found school:', school.key)

        const { data: screens, error: screensError } = await supabase
            .from('templatescreens')
            .select('slug, updatedat')
            .eq('isactive', true)

        if (screensError) {
            console.error('[sitemap] Screens lookup error:', screensError.message)
        }

        return new NextResponse(buildTenantSitemap(domain), { headers: XML_HEADERS })

    } catch (err) {
        console.error('[sitemap] Error:', err)
        return new NextResponse(wrapSitemap([]), { headers: XML_HEADERS })
    }
}
