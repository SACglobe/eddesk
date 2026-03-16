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
//

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { fetchDemoScreen, pathToScreenName } from '@/core/services/screenData.service';
import { buildTenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { isOwnerDomain } from '@/lib/proxy/domain-classifier';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import type { TenantState } from '@/core/context/TenantContext';
import { templateRegistry } from '@/lib/template/registry';
import TemplateRenderer from './TemplateRenderer';
import {
    generateTenantMetadata,
    generateSchoolJsonLd,
    generateEventsJsonLd,
    generatePrincipalJsonLd,
    generateAboutMetadata,
    generateAboutJsonLd,
} from '@/core/utils/seo';
import { Metadata } from 'next';
import LeadCapturePopup from '@/components/lead/LeadCapturePopup';
import SystemPopupProvider from '@/components/system/SystemPopupProvider';
import SystemPopup from '@/components/system/SystemPopup';

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

    // 1. Validate template slug — Removed hardcoded check to allow TemplateRenderer 
    // to handle invalid slugs with a premium SystemPopup.

    // 2. Domain guard: Only allow owner domains
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const domainOnly = host.split(':')[0].toLowerCase();

    const isOwner = isOwnerDomain(domainOnly);
    if (!isOwner) {
        return notFound();
    }

    // C1: fetchDemoScreen with 2 args only — domain is always eddesk.in internally
    const result = await fetchDemoScreen('eddesk.in', templateSlug, screenName);


    let tenantState: TenantState;

    // Check if template exists in registry
    const templateExists = !!templateRegistry[templateSlug];

    if (!templateExists) {
        tenantState = {
            status: 'template_not_found',
            data: null,
            message: `Template "${templateSlug}" is not available in the system.`,
        };
    } else if (result.status === 'success') {
        const viewModel = buildTenantViewModel(result.payload);

        // Step 4.1: Validation check (NEW)
        const validation = validateRequiredSections(viewModel);
        if (!validation.isValid) {
            return (
                <SystemPopup
                    variant="content_missing"
                    missingSection={validation.missingSection}
                />
            );
        }

        tenantState = {
            status: 'success',
            data: viewModel,
            message: '',
        };
    } else if (result.status === 'empty') {
        // C5: If empty, we still want to render the template so it can show SectionWarnings
        // We'll treat it as success but with empty data
        tenantState = {
            status: 'success',
            data: buildTenantViewModel({} as any),
            message: result.message || '',
        };
    } else {
        tenantState = {
            status: 'error',
            data: null,
            message: result.error,
        };
    }

    return (
        <SystemPopupProvider tenantState={tenantState}>
            {tenantState.data && (
                <>
                    {/* 1. School / EducationalOrganization — always present */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            // C4: use 'eddesk.in' constant directly (hostname removed)
                            __html: JSON.stringify(generateSchoolJsonLd(tenantState.data, 'eddesk.in'))
                        }}
                    />

                    {/* 2. About page schema — only on /about */}
                    {path === '/about' && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(generateAboutJsonLd(tenantState.data, 'eddesk.in'))
                            }}
                        />
                    )}

                    {/* 3. Upcoming Events — home screen only, skip if no upcoming events */}
                    {screenName === 'home' && (() => {
                        const eventsLd = generateEventsJsonLd(tenantState.data, 'eddesk.in');
                        return eventsLd ? (
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsLd) }}
                            />
                        ) : null;
                    })()}

                    {/* 4. Principal Person schema — home screen only, skip if no principal */}
                    {screenName === 'home' && (() => {
                        const principalLd = generatePrincipalJsonLd(tenantState.data, 'eddesk.in');
                        return principalLd ? (
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(principalLd) }}
                            />
                        ) : null;
                    })()}
                </>
            )}
            <TemplateRenderer
                templateSlug={templateSlug}
                path={path}
                tenantState={tenantState}
            />
            {templateExists && <LeadCapturePopup templateSlug={templateSlug} />}
        </SystemPopupProvider>
    );
}
