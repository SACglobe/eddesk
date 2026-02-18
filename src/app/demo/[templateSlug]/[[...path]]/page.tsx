/**
 * src/app/demo/[templateSlug]/[[...path]]/page.tsx
 *
 * Server Component — handles API call for real tenant domains.
 * Demo routes (localhost, eddesk.in) skip the API and use demo data.
 *
 * Guardrails:
 * - API is NEVER called for localhost or eddesk.in
 * - API is NEVER called for demo routes
 * - Templates are NOT modified
 */

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { fetchTenantData, isTenantDomain } from '@/core/services/tenantApi.service';
import { buildTenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import type { TenantState } from '@/core/context/TenantContext';
import TemplateRenderer from './TemplateRenderer';

// Known valid template slugs — checked server-side without importing templates
const VALID_SLUGS = ['template_classic', 'template_modern', 'template_premium'];

export default async function TemplateDemoPage({
    params,
}: {
    params: Promise<{ templateSlug: string; path?: string[] }>
}) {
    const { templateSlug, path: pathSegments } = await params;
    const path = '/' + (pathSegments?.join('/') ?? '');

    // Validate template slug server-side without importing template files
    if (!VALID_SLUGS.includes(templateSlug)) {
        return notFound();
    }

    // Read hostname from request headers (SSR only)
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const hostname = host.split(':')[0].toLowerCase().replace(/^www\./, '');

    // Build tenant state — API is called ONLY for real tenant domains
    let tenantState: TenantState;

    if (isTenantDomain(hostname)) {
        // Real tenant domain — call the API
        const result = await fetchTenantData(hostname, templateSlug);

        if (result.status === 'success') {
            tenantState = {
                status: 'success',
                data: buildTenantViewModel(result.data),
                message: '',
            };
        } else if (result.status === 'empty') {
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
    } else {
        // Demo domain (localhost / eddesk.in) — skip API, use demo data
        tenantState = {
            status: 'idle',
            data: null,
            message: '',
        };
    }

    return (
        <TemplateRenderer
            templateSlug={templateSlug}
            path={path}
            tenantState={tenantState}
        />
    );
}
