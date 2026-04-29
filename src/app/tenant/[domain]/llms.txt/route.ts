import { NextRequest, NextResponse } from 'next/server';
import { normalizeDomain } from '@/lib/domain';
import { createPublicSupabaseClient } from '@/lib/supabase';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ domain: string }> }
) {
    const { domain: rawDomain } = await params;
    const domain = normalizeDomain(decodeURIComponent(rawDomain));

    try {
        const supabase = await createPublicSupabaseClient();
        const { data: school } = await supabase
            .from('schools')
            .select('name, description, city, state, address')
            .eq('customdomain', domain)
            .maybeSingle();

        if (school) {
            const content = `# ${school.name} | Official Information

> ${school.description || `Official website of ${school.name} powered by EdDesk.`}

## Location
${school.address || ''}
${school.city || ''}, ${school.state || ''}

## Sections Available
- /about: School heritage, mission, and leadership.
- /academics: Curriculum and board results.
- /faculty: Profiles of our distinguished educators.
- /infrastructure: Campus facilities and infrastructure.
- /gallery: Visual portraits of campus life.
- /events: Upcoming school calendar and programs.
- /admission: Eligibility and application steps.

## Powered by EdDesk
This institution uses the EdDesk Platform for digital governance and excellence in communication.
`;
            return new NextResponse(content, {
                headers: {
                    'Content-Type': 'text/plain; charset=utf-8',
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
                },
            });
        } else {
            return new NextResponse('School not found', { status: 404 });
        }
    } catch (err) {
        console.error('[tenant.llms] Error:', err);
        return new NextResponse('Error generating llms.txt', { status: 500 });
    }
}
