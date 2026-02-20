"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { templateRegistry } from '@/lib/template/registry';
import { LOCAL_TENANT_DATA } from '@/core/data/local/tenant.data';
import { buildTenantViewModelFromLocal } from '@/core/viewmodels/tenant.viewmodel';
import SystemPopupProvider from '@/components/system/SystemPopupProvider';
import type { TenantState } from '@/core/context/TenantContext';
import type { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

interface TemplateRendererProps {
    templateSlug: string;
    path: string;
    tenantState: TenantState;
}

export default function TemplateRenderer({ templateSlug, path, tenantState }: TemplateRendererProps) {
    const template = templateRegistry[templateSlug];

    if (!template) {
        return notFound();
    }

    const Renderer = template.Renderer as any as React.ComponentType<{ data: TenantViewModel; path: string }>;

    // For real tenants: use API data if available, fall back to demo data
    const fallbackData = buildTenantViewModelFromLocal(LOCAL_TENANT_DATA);

    const data: TenantViewModel = (tenantState.status === 'success' && tenantState.data)
        ? tenantState.data
        : fallbackData;

    return (
        <SystemPopupProvider tenantState={tenantState}>
            <Renderer data={data} path={path} />
        </SystemPopupProvider>
    );
}
