/**
 * SystemPopupProvider.tsx
 * Client Component that wraps the tenant page tree.
 *
 * Responsibilities:
 * - Receives TenantState from the server (SSR)
 * - Provides it to TenantContext
 * - Conditionally renders SystemPopup based on API status
 *
 * Rules:
 * - No API calls here
 * - No data fetching
 * - Popup is shown ONLY for 'empty' or 'error' status
 */

'use client';

import React, { useState } from 'react';
import { TenantProvider, type TenantState } from '@/core/context/TenantContext';
import SystemPopup from '@/components/system/SystemPopup';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SystemPopupProviderProps {
    tenantState: TenantState;
    children: React.ReactNode;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * SystemPopupProvider
 *
 * Usage (in a Server Component page):
 *
 * ```tsx
 * const result = await fetchTenantData(domain, templateId);
 * const tenantState = buildTenantState(result);
 *
 * return (
 *   <SystemPopupProvider tenantState={tenantState}>
 *     <TemplateRenderer data={tenantState.data} />
 *   </SystemPopupProvider>
 * );
 * ```
 */
export default function SystemPopupProvider({
    tenantState,
    children,
}: SystemPopupProviderProps) {
    const [dismissed, setDismissed] = useState(false);

    const showPopup =
        !dismissed &&
        (tenantState.status === 'empty' || tenantState.status === 'error');

    return (
        <TenantProvider value={tenantState}>
            {/* Render children regardless — template shows even if popup is visible */}
            {children}

            {/* System popup — rendered outside template tree */}
            {showPopup && (
                <SystemPopup
                    variant={tenantState.status === 'empty' ? 'empty' : 'error'}
                    errorMessage={tenantState.message}
                    onRetry={() => window.location.reload()}
                    onDismiss={tenantState.status === 'error' ? () => setDismissed(true) : undefined}
                />
            )}
        </TenantProvider>
    );
}
