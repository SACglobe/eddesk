import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const OWNER_DOMAINS = ['eddesk.in', 'localhost']
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
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        const { data: school } = await supabase
            .from('schools')
            .select('key')
            .eq('customdomain', domain)
            .eq('isactive', true)
            .single()

        if (!school) {
            return new NextResponse(wrapSitemap([]), { headers: XML_HEADERS })
        }

        return new NextResponse(buildTenantSitemap(domain), { headers: XML_HEADERS })

    } catch (err) {
        console.error('[sitemap] Error:', err)
        return new NextResponse(wrapSitemap([]), { headers: XML_HEADERS })
    }
}
