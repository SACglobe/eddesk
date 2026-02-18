/**
 * TenantContext.tsx
 * Provides tenant data and API status to the component tree.
 *
 * Rules:
 * - Context is initialized server-side (SSR)
 * - Templates read from context — they never write to it
 * - Popup triggering is handled by SystemPopupProvider
 */

'use client';

import React, { createContext, useContext } from 'react';
import type { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TenantStatus = 'success' | 'empty' | 'error' | 'idle';

export interface TenantState {
    /** Normalized school data from the API */
    data: TenantViewModel | null;
    /** Current API result status */
    status: TenantStatus;
    /** Error or empty message, if any */
    message: string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const TenantContext = createContext<TenantState>({
    data: null,
    status: 'idle',
    message: '',
});

// ─── Provider ─────────────────────────────────────────────────────────────────

interface TenantProviderProps {
    value: TenantState;
    children: React.ReactNode;
}

/**
 * TenantProvider wraps the tenant page tree.
 * The initial value is computed server-side and passed as a prop.
 */
export function TenantProvider({ value, children }: TenantProviderProps) {
    return (
        <TenantContext.Provider value={value}>
            {children}
        </TenantContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useTenantContext — read-only access to tenant state.
 * Safe to use in any component EXCEPT templates (use props instead).
 */
export function useTenantContext(): TenantState {
    return useContext(TenantContext);
}
