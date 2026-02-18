import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { resolveDomain } from './core/router/domainResolver'

export function proxy(request: NextRequest) {
    const url = request.nextUrl
    const hostname = request.headers.get('host') || ''

    // 0. Restrict direct access to /demo/* routes (SSR Only)
    // Only localhost and eddesk.in can access these routes directly.
    if (url.pathname.startsWith('/demo/')) {
        const normalizedHost = hostname.split(':')[0].toLowerCase().replace(/^www\./, '');
        const allowedHosts = ['localhost', 'eddesk.in'];

        if (!allowedHosts.includes(normalizedHost)) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // 1. Skip if it's an internal path, api, or static file
    if (
        url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/icon') ||
        url.pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    const { mode, templateId } = resolveDomain(hostname)

    // 2. Handle Marketing (Owner) Mode
    if (mode === 'marketing') {
        // Marketing site should be served from the root as is
        return NextResponse.next()
    }

    // 3. Handle Tenant Mode (Internal Rewrite)
    if (mode === 'tenant' && templateId) {
        // Internally rewrite to /demo/[templateId]/[path]
        // Browser URL stays at root /
        const rewriteUrl = new URL(`/demo/${templateId}${url.pathname}`, request.url)
        return NextResponse.rewrite(rewriteUrl)
    }

    // 4. Handle Unknown Mode (Rewrite to fallback page)
    if (mode === 'unknown') {
        // Rewrite to the tenant catch-all which will show the fallback message
        const rewriteUrl = new URL(`/tenant${url.pathname}`, request.url)
        return NextResponse.rewrite(rewriteUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
