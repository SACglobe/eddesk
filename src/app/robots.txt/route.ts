import { NextRequest, NextResponse } from 'next/server'

function normalizeDomain(host: string): string {
    return host.toLowerCase().replace(/^www\./, '').split(':')[0]
}

const OWNER_DOMAINS = ['eddesk.in', 'localhost']

export async function GET(request: NextRequest) {
    const host = request.headers.get('host') || ''
    const domain = normalizeDomain(host)
    const isOwner = OWNER_DOMAINS.includes(domain)

    const baseUrl = isOwner
        ? 'https://www.eddesk.in'
        : `https://${host}`

    const body = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

    return new NextResponse(body, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}
