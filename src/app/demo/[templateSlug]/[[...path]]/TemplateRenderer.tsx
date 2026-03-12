"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { templateRegistry } from '@/lib/template/registry';
import SystemPopupProvider from '@/components/system/SystemPopupProvider';
import SystemPopup from '@/components/system/SystemPopup';
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
        return null; // SystemPopupProvider will handle showing the template_not_found variant
    }

    const Renderer = template.Renderer as any as React.ComponentType<{ data: TenantViewModel; path: string }>;

    const data: TenantViewModel | null = (tenantState.status === 'success' && tenantState.data)
        ? tenantState.data
        : null;

    if (!data) return null;

    return (
        <SystemPopupProvider tenantState={tenantState}>
            <Renderer data={data} path={path} />
        </SystemPopupProvider>
    );
}
