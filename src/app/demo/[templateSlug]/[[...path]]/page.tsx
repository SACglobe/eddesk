// src/app/demo/[templateSlug]/[[...path]]/page.tsx
//
// SSR-only Server Component for demo/preview routes.
// Accessible ONLY from owner domains (eddesk.in, localhost:*).
//
// Flow:
//   1. Validate templateSlug against VALID_SLUGS
//   2. Guard: notFound() if accessed from non-owner domain
//   3. fetchDemoScreen(templateSlug, screen)  → NO cache, domain always eddesk.in
//   4. buildTenantViewModel(payload)          → maps ScreenDataPayload → TenantViewModel
//   5. render template (NO subscription checks — demo bypasses all of them)
//
// Guardrails:
//   - No subscription checks — checkSubscription returns demo_bypass for mode='demo'
//   - No getSchoolByDomain call — demo does not have a registered domain
//   - templateSlug comes from URL param — validated against VALID_SLUGS server-side

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { fetchDemoScreen, pathToScreenName } from '@/core/services/screenData.service';
import { buildTenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import type { TenantState } from '@/core/context/TenantContext';
import TemplateRenderer from './TemplateRenderer';
import { generateTenantMetadata, generateSchoolJsonLd, generateAboutMetadata, generateAboutJsonLd } from '@/core/utils/seo';
import { Metadata } from 'next';
import LeadCapturePopup from '@/components/lead/LeadCapturePopup';

// Known valid template slugs
const VALID_SLUGS = ['template_classic', 'template_modern', 'template_premium'];

// Owner domains allowed to access demo routes
const OWNER_DOMAINS = ['eddesk.in', 'localhost', '127.0.0.1', 'test.eddesk.in'];

export async function generateMetadata({
    params,
}: {
    params: Promise<{ templateSlug: string; path?: string[] }>
}): Promise<Metadata> {
    const { templateSlug, path: pathSegments } = await params;
    const screenName = pathSegments?.[0] || 'home';

    // Metadata for demo routes
    return {
        title: `Demo [${templateSlug}] - ${screenName.charAt(0).toUpperCase() + screenName.slice(1)} | EdDesk`,
        description: 'Previewing EdDesk school templates.',
        robots: { index: false, follow: false },
    };
}

export default async function TemplateDemoPage({
    params,
}: {
    params: Promise<{ templateSlug: string; path?: string[] }>
}) {
    const { templateSlug, path: pathSegments } = await params;
    const path = '/' + (pathSegments?.join('/') ?? '');
    const screenName = pathSegments?.[0] || 'home';

    // 1. Validate template slug
    if (!VALID_SLUGS.includes(templateSlug)) {
        return notFound();
    }

    // 2. Domain guard: Only allow owner domains
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const domainOnly = host.split(':')[0].toLowerCase();

    const isOwner = OWNER_DOMAINS.includes(domainOnly);
    if (!isOwner) {
        return notFound();
    }

    // C1: fetchDemoScreen with 2 args only — domain is always eddesk.in internally
    const result = await fetchDemoScreen('eddesk.in', templateSlug, screenName);


    let tenantState: TenantState;

    if (result.status === 'success') {
        tenantState = {
            status: 'success',
            data: buildTenantViewModel(result.payload),
            message: '',
        };
    } else if (result.status === 'empty') {
        // C5: Pass real 'empty' status — do not pretend success
        tenantState = {
            status: 'empty',
            data: null,
            message: result.message,
        };
    } else {
        tenantState = {
            status: 'error',
            data: null,
            message: result.error,
        };
    }

    return (
        <>
            {tenantState.data && (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            // C4: use 'eddesk.in' constant directly (hostname removed)
                            __html: JSON.stringify(generateSchoolJsonLd(tenantState.data, 'eddesk.in'))
                        }}
                    />
                    {path === '/about' && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(generateAboutJsonLd(tenantState.data, 'eddesk.in'))
                            }}
                        />
                    )}
                </>
            )}
            <TemplateRenderer
                templateSlug={templateSlug}
                path={path}
                tenantState={tenantState}
            />
            <LeadCapturePopup templateSlug={templateSlug} />
        </>
    );
}
