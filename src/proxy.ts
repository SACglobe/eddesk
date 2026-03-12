// src/proxy.ts
// Next.js Edge proxy — domain-based routing
//
// Routes:
//   Owner domains (localhost:3000, eddesk.in) → marketing page (NextResponse.next())
//   /demo/* routes from owner domains          → demo template (NextResponse.next())
//   /demo/* routes from tenant domains         → 404
//   All other domains                          → rewrite to /tenant/[...path]
//
// domain_data source: src/lib/constants/constants.js
// Will be replaced with Supabase lookup in a future migration step.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import domain_data from '@/lib/constants/constants';
import { isOwnerDomain } from '@/lib/proxy/domain-classifier';
import { findDomainConfig } from '@/lib/proxy/domain-lookup';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';
    // A3 FIX: preserve port so 'localhost:3000' matches domain_data entries
    const hostname = host.toLowerCase().replace(/^www\./, '');

    console.log(`[EdDesk Proxy DEBUG] Request: ${url.pathname}, Host: ${host}, Method: ${request.method}`);

    // 0. IMMEDIATE BYPASS for internal/static
    if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api') || url.pathname.includes('.')) {
        return NextResponse.next();
    }

    // 0.1 EXPLICIT BYPASS for demo routes on local/owner
    if (url.pathname.startsWith('/demo')) {
        const isOwner = isOwnerDomain(hostname);
        if (isOwner) {
            console.log(`[EdDesk Proxy DEBUG] Owner detected for demo route. BYPASSING proxy for: ${url.pathname}`);
            return NextResponse.next();
        } else {
            console.warn(`[EdDesk Proxy DEBUG] Non-owner blocked for demo route: ${host}`);
            return new NextResponse('Not Found', { status: 404 });
        }
    }

    // 1. Find the domain configuration
    const config = domain_data.find((d: { domain: string }) => d.domain === host) ||
        domain_data.find((d: { domain: string }) => d.domain === hostname);

    console.log(`[EdDesk Proxy DEBUG] Found Config:`, config?.domain || 'NONE', 'Type:', config?.type || 'NONE');

    // 2. Handle Owner Domains (Root Marketing)
    if (isOwnerDomain(hostname)) {
        return NextResponse.next();
    }

    // 4. Handle Tenant Domains
    if (!url.pathname.startsWith('/tenant')) {
        url.pathname = `/tenant${url.pathname}`;
        console.log(`[EdDesk Proxy DEBUG] REWRITING to: ${url.pathname}`);
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export default proxy;

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
};
