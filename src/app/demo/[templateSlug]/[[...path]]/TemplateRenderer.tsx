"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { templateRegistry } from '@/lib/template/registry';
import { demoSchoolData } from '@/lib/constants/demo-data';
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

    const { Renderer } = template;

    // For real tenants: use API data if available, fall back to demo data
    const data = (tenantState.status === 'success' && tenantState.data)
        ? (tenantState.data as unknown as typeof demoSchoolData)
        : demoSchoolData;

    return (
        <SystemPopupProvider tenantState={tenantState}>
            <Renderer data={data} path={path} />
        </SystemPopupProvider>
    );
}
