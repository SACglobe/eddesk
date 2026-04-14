import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { normalizeDomain, isOwnerDomain } from '@/lib/domain';
import { createPublicSupabaseClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
    const headersList = await headers();
    const host = headersList.get('host') || 'www.eddesk.in';
    const domain = normalizeDomain(host);
    const isOwner = isOwnerDomain(domain);

    let content = '';

    if (isOwner) {
        content = `# EdDesk | Transforming School Management

> The next-generation digital platform for educational institutions.

## About
EdDesk provides state-of-the-art school websites, administration tools, and digital presence as a service. We empower schools with multi-tenant SaaS solutions that are fast, secure, and SEO-optimized.

## Key Features
- **Dynamic Site Generation**: Instantly deploy premium school websites.
- **Academic Management**: Track results, achievements, and faculty.
- **Infrastructure Showcase**: Highlight campus facilities and labs.
- **Event Lifecycle**: Manage school calendars and cultural events.
- **Admissions Engine**: Streamlined digital admission workflows.

## Templates
- **Modern**: Bold, high-contrast, and dynamic.
- **Classic**: Professional, elegant, and timeless.
- **Premium**: Luxurious, serif-driven, and heritage-focused.

## For Developers
Integrated with Supabase, Next.js 15+, and Tailwind CSS. Built for performance and extreme SEO readiness.

---
© 2026 EdDesk. Built for the future of education.
`;
    } else {
        // Tenant-specific llms.txt
        try {
            const supabase = await createPublicSupabaseClient();
            const { data: school } = await supabase
                .from('schools')
                .select('name, description, city, state, address')
                .eq('customdomain', domain)
                .maybeSingle();

            if (school) {
                content = `# ${school.name} | Official Information

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
            } else {
                return new NextResponse('School not found', { status: 404 });
            }
        } catch (err) {
            return new NextResponse('Error generating llms.txt', { status: 500 });
        }
    }

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
        },
    });
}
