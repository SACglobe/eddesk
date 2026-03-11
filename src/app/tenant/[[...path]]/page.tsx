// src/app/tenant/[[...path]]/page.tsx
//
// SSR-only Server Component for all tenant (customer) domains.
//
// Flow:
//   1. getSchoolByDomain(hostname)     → domain guard (not-configured gate)
//   2. fetchTenantScreen(...)          → RPC call, returns ScreenDataResult
//   3. buildTenantViewModel(payload)   → maps ScreenDataPayload → TenantViewModel
//   4. checkSubscription(viewModel)    → reads mode + subscription + plan from viewModel
//   5. render correct SystemPopup variant or template
//
// Guardrails:
//   - No client-side data fetching
//   - templateSlug comes from viewModel.school.templateId (RPC response), never from URL
//   - Subscription checks run AFTER RPC — grace period + mode come from RPC
//   - config.service is deleted — grace period lives in plan.gracePeriod

import React from 'react'
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { getSchoolByDomain } from '@/core/services/school.service';
import { fetchTenantScreen, pathToScreenName, normalizeDomain } from '@/core/services/screenData.service';
import { buildTenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { checkSubscription } from '@/core/business/subscription';
import {
    generateTenantMetadata,
    generateSchoolJsonLd,
    generateEventsJsonLd,
    generatePrincipalJsonLd,
    generateAboutMetadata,
    generateAboutJsonLd,
} from '@/core/utils/seo';
import TemplateRenderer from '../../demo/[templateSlug]/[[...path]]/TemplateRenderer';
import { TenantState } from '@/core/context/TenantContext';
import SystemPopup from '@/components/system/SystemPopup';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ path?: string[] }>
}): Promise<Metadata> {
    const { path: pathSegments } = await params;
    const path = '/' + (pathSegments?.join('/') ?? '');

    const headersList = await headers();
    const host = headersList.get('host') || '';
    const hostname = normalizeDomain(host);
    const screenName = pathSegments?.[0] || 'home';

    const result = await fetchTenantScreen(hostname, screenName);
    if (result.status === 'success') {
        const viewModel = buildTenantViewModel(result.payload);
        if (path === '/about') {
            return generateAboutMetadata(viewModel, hostname, false);
        }
        return generateTenantMetadata(viewModel, hostname, false);
    }

    return { title: 'Loading Site... | EdDesk' };
}

export default async function TenantPage({
    params,
}: {
    params: Promise<{ path?: string[] }>
}) {
    const { path: pathSegments } = await params;
    const path = '/' + (pathSegments?.join('/') ?? '');

    const headersList = await headers();
    const host = headersList.get('host') || '';
    const hostname = normalizeDomain(host);

    // Step 1: Domain guard — check if this domain is registered at all
    const schoolConfig = await getSchoolByDomain(hostname);

    if (!schoolConfig) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(145deg, #020617 0%, #0d1526 50%, #0f172a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-plus-jakarta-sans, "Plus Jakarta Sans", system-ui, sans-serif)',
                padding: '1rem',
            }}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '440px',
                    borderRadius: '1.5rem',
                    background: 'linear-gradient(145deg, #0d1526 0%, #111827 60%, #0f172a 100%)',
                    border: '1px solid rgba(99,102,241,0.22)',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                    padding: '2.75rem 2.25rem 2.25rem',
                    textAlign: 'center',
                    color: '#f1f5f9',
                    overflow: 'hidden',
                    animation: 'ed-fadeIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
                }}>
                    <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
                        Site Not Configured
                    </h1>
                    <p style={{ color: '#64748b', marginTop: '1rem' }}>
                        This domain is not yet active.
                    </p>
                </div>
            </div>
        );
    }

    const screenName = pathToScreenName(path);
    const result = await fetchTenantScreen(hostname, screenName);

    // Step 3: Handle RPC failure states BEFORE subscription check
    if (result.status === 'error') {
        return (
            <SystemPopup
                variant="error"
                errorMessage={result.error}
            />
        );
    }

    if (result.status === 'empty') {
        return (
            <SystemPopup
                variant="empty"
                errorMessage={result.message}
            />
        );
    }

    // Step 4: Build viewModel from the correctly unwrapped payload
    const viewModel = buildTenantViewModel(result.payload);

    // Step 5: Subscription check (reads mode, subscription.endDate, plan.gracePeriod)
    const subscriptionCheck = checkSubscription(viewModel);

    if (!subscriptionCheck.isAccessAllowed) {
        if (subscriptionCheck.status === 'inactive') {
            return <SystemPopup variant="inactive" />;
        }
        if (subscriptionCheck.status === 'expired') {
            return <SystemPopup variant="expired" />;
        }
        return (
            <SystemPopup
                variant="error"
                errorMessage={subscriptionCheck.message}
            />
        );
    }

    // Step 6: Build TenantState for context + TemplateRenderer
    const tenantState: TenantState = {
        status: 'success',
        data: viewModel,
        message: '',
    };

    // Step 7: Render — templateSlug now comes from viewModel (not schoolConfig)
    return (
        <>
            {tenantState.data && (
                <>
                    {/* 1. School / EducationalOrganization — always present */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(generateSchoolJsonLd(tenantState.data, hostname)),
                        }}
                    />

                    {/* 2. About page schema — only on /about */}
                    {path === '/about' && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(generateAboutJsonLd(tenantState.data, hostname)),
                            }}
                        />
                    )}

                    {/* 3. Upcoming Events — home screen only, skip if no upcoming events */}
                    {screenName === 'home' && (() => {
                        const eventsLd = generateEventsJsonLd(tenantState.data, hostname);
                        return eventsLd ? (
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsLd) }}
                            />
                        ) : null;
                    })()}

                    {/* 4. Principal Person schema — home screen only, skip if no principal */}
                    {screenName === 'home' && (() => {
                        const principalLd = generatePrincipalJsonLd(tenantState.data, hostname);
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
                templateSlug={viewModel.school.templateId}
                path={path}
                tenantState={tenantState}
            />
        </>
    );
}
