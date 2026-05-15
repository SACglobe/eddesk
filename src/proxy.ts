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
import { isOwnerDomain } from '@/lib/proxy/domain-classifier';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';
    // A3 FIX: preserve port so 'localhost:3000' matches domain_data entries
    const hostname = host.toLowerCase().replace(/^www\./, '');
    const isOwner = isOwnerDomain(hostname);

    console.log(`[EdDesk Proxy] 📥 INCOMING | Path: ${url.pathname} | Host: ${host} | isOwner: ${isOwner}`);

    // 0. IMMEDIATE BYPASS for internal/static (but allow .xml, .txt for rewrites)
    if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api')) {
        return NextResponse.next();
    }
    
    // Bypass files with extensions (images, assets) BUT allow robots.txt, sitemap.xml, llms.txt to proceed to rewrites
    if (url.pathname.includes('.') && 
        !url.pathname.endsWith('robots.txt') && 
        !url.pathname.endsWith('sitemap.xml') && 
        !url.pathname.endsWith('llms.txt')) {
        const res = NextResponse.next();
        res.headers.set('x-eddesk-proxy-bypass', 'static-asset');
        return res;
    }

    // 0.1 EXPLICIT BYPASS for demo routes on local/owner
    if (url.pathname.startsWith('/demo')) {
        if (isOwner) {
            console.log(`[EdDesk Proxy] 🎨 Owner detected for demo route | Path: ${url.pathname} | Host: ${host}`);
            const res = NextResponse.next();
            res.headers.set('x-eddesk-proxy-mode', 'demo-bypass');
            return res;
        } else {
            console.warn(`[EdDesk Proxy] 🛑 Non-owner blocked for demo route | Host: ${host} attempted access to ${url.pathname}`);
            return new NextResponse('Not Found', { status: 404 });
        }
    }

    // 2. Handle Owner Domains (Root Marketing)
    if (isOwner) {
        console.log(`[EdDesk Proxy] 🏠 OWNER DIRECT | Host: ${host}`);
        const res = NextResponse.next();
        res.headers.set('x-eddesk-proxy-mode', 'owner-direct');
        return res;
    }

    // 4. Handle Tenant Domains
    if (!url.pathname.startsWith('/tenant')) {
        // Special handling for robots.xml and sitemap.xml to match our new routes
        let targetPath = url.pathname;
        if (targetPath === '/robots.txt') targetPath = '/robots';
        if (targetPath === '/sitemap.xml') targetPath = '/sitemap';
        
        const rewritePath = `/tenant/${hostname}${targetPath}`;
        console.log(`[EdDesk Proxy] 🔀 TENANT REWRITE | ${host}${url.pathname} -> ${rewritePath}`);
        
        url.pathname = rewritePath;
        const res = NextResponse.rewrite(url);
        res.headers.set('x-eddesk-proxy-mode', 'tenant-rewrite');
        res.headers.set('x-eddesk-tenant', hostname);
        return res;
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
