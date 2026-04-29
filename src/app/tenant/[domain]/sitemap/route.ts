import { NextRequest, NextResponse } from 'next/server';
import { createPublicSupabaseClient } from '@/lib/supabase';
import { normalizeDomain } from '@/lib/domain';

const SCREEN_SLUGS = ['about', 'gallery', 'events', 'admission', 'contact', 'academics', 'activities', 'infrastructure', 'faculty'];

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    const { domain: rawDomain } = await params;
    const domain = normalizeDomain(decodeURIComponent(rawDomain));
    const baseUrl = `https://${domain}`;

    try {
        const supabase = await createPublicSupabaseClient();
        
        // 1. Fetch screens
        const { data: screens } = await supabase
            .from('templatescreens')
            .select('slug, updatedat')
            .eq('isactive', true);

        // 2. Build XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

        if (screens && screens.length > 0) {
            for (const s of screens) {
                if (s.slug === 'home' || s.slug === '/') continue;
                xml += `
  <url>
    <loc>${baseUrl}/${s.slug}</loc>
    <lastmod>${new Date(s.updatedat || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
            }
        } else {
            for (const s of SCREEN_SLUGS) {
                xml += `
  <url>
    <loc>${baseUrl}/${s}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
            }
        }

        xml += `
</urlset>`;

        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
            },
        });
    } catch (err) {
        console.error('[tenant.sitemap] Error:', err);
        return new NextResponse('Error generating sitemap', { status: 500 });
    }
}
