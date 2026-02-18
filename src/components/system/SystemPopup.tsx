/**
 * SystemPopup.tsx
 * Enhanced premium popup component — EdDesk marketing theme.
 * Two variants: 'empty' (not configured) and 'error' (connection error).
 *
 * Rules:
 * - No API calls
 * - No data fetching
 * - No template-specific logic
 * - Triggered only by SystemPopupProvider
 */

'use client';

import React, { useEffect, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type PopupVariant = 'empty' | 'error';

interface SystemPopupProps {
    variant: PopupVariant;
    errorMessage?: string;
    onRetry?: () => void;
    onDismiss?: () => void;
}

// ─── Keyframe injection ───────────────────────────────────────────────────────

const KEYFRAMES = `
@keyframes ed-fadeIn {
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes ed-backdropIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes ed-pulse-indigo {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.55), 0 0 32px rgba(99,102,241,0.3); }
  50%       { box-shadow: 0 0 0 10px rgba(99,102,241,0), 0 0 48px rgba(99,102,241,0.5); }
}
@keyframes ed-pulse-red {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.55), 0 0 32px rgba(239,68,68,0.3); }
  50%       { box-shadow: 0 0 0 10px rgba(239,68,68,0), 0 0 48px rgba(239,68,68,0.5); }
}
@keyframes ed-spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes ed-orb-float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-18px) scale(1.04); }
}
@keyframes ed-shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

function injectKeyframes() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('ed-popup-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'ed-popup-keyframes';
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SystemPopup({
    variant,
    errorMessage,
    onRetry,
    onDismiss,
}: SystemPopupProps) {
    const isEmpty = variant === 'empty';
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        injectKeyframes();
        // Slight delay for mount animation
        const t = setTimeout(() => setVisible(true), 30);
        return () => clearTimeout(t);
    }, []);

    // ── Color tokens ──────────────────────────────────────────────────────────
    const accent = isEmpty
        ? { h: '99,102,241', hex: '#6366f1', dark: '#4f46e5', light: '#a5b4fc' }
        : { h: '239,68,68', hex: '#ef4444', dark: '#dc2626', light: '#fca5a5' };

    const pulseAnim = isEmpty ? 'ed-pulse-indigo 2.4s ease-in-out infinite' : 'ed-pulse-red 2.4s ease-in-out infinite';

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="System notification"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-plus-jakarta-sans, "Plus Jakarta Sans", system-ui, sans-serif)',
                animation: 'ed-backdropIn 0.25s ease forwards',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.25s ease',
            }}
        >
            {/* ── Backdrop ── */}
            <div
                onClick={onDismiss}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(2, 6, 23, 0.80)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
            />

            {/* ── Card ── */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '440px',
                    margin: '1rem',
                    borderRadius: '1.5rem',
                    background: 'linear-gradient(145deg, #0d1526 0%, #111827 60%, #0f172a 100%)',
                    border: `1px solid rgba(${accent.h}, 0.22)`,
                    boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(${accent.h}, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    padding: '2.75rem 2.25rem 2.25rem',
                    textAlign: 'center',
                    color: '#f1f5f9',
                    overflow: 'hidden',
                    animation: 'ed-fadeIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
                }}
            >
                {/* ── Background orbs ── */}
                <div style={{
                    position: 'absolute', top: '-60px', right: '-60px',
                    width: '200px', height: '200px', borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(${accent.h}, 0.12) 0%, transparent 70%)`,
                    animation: 'ed-orb-float 5s ease-in-out infinite',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-40px', left: '-40px',
                    width: '160px', height: '160px', borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(${accent.h}, 0.08) 0%, transparent 70%)`,
                    animation: 'ed-orb-float 7s ease-in-out infinite reverse',
                    pointerEvents: 'none',
                }} />

                {/* ── Dismiss button ── */}
                {onDismiss && (
                    <button
                        onClick={onDismiss}
                        aria-label="Dismiss"
                        style={{
                            position: 'absolute', top: '1.1rem', right: '1.1rem',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0.5rem',
                            color: '#64748b',
                            cursor: 'pointer',
                            width: '28px', height: '28px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#64748b'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
                    >
                        ✕
                    </button>
                )}

                {/* ── Animated icon ring ── */}
                <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1.75rem' }}>
                    {/* Outer spinning dashed ring */}
                    <div style={{
                        position: 'absolute', inset: '-8px',
                        borderRadius: '50%',
                        border: `2px dashed rgba(${accent.h}, 0.35)`,
                        animation: 'ed-spin-slow 8s linear infinite',
                    }} />
                    {/* Middle ring */}
                    <div style={{
                        position: 'absolute', inset: '-2px',
                        borderRadius: '50%',
                        border: `1px solid rgba(${accent.h}, 0.15)`,
                    }} />
                    {/* Icon circle */}
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: `linear-gradient(135deg, ${accent.dark} 0%, ${accent.hex} 100%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem',
                        animation: pulseAnim,
                    }}>
                        {isEmpty ? '⚙️' : '⚡'}
                    </div>
                </div>

                {/* ── Badge ── */}
                <div style={{ marginBottom: '0.875rem' }}>
                    <span style={{
                        display: 'inline-block',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.9rem',
                        borderRadius: '999px',
                        background: `rgba(${accent.h}, 0.12)`,
                        color: accent.light,
                        border: `1px solid rgba(${accent.h}, 0.28)`,
                    }}>
                        {isEmpty ? '⚙ Not Configured' : '⚠ Connection Error'}
                    </span>
                </div>

                {/* ── Heading ── */}
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    lineHeight: 1.3,
                    marginBottom: '0.625rem',
                    color: '#f8fafc',
                    letterSpacing: '-0.01em',
                }}>
                    {isEmpty
                        ? 'Your website data is not configured yet.'
                        : "We couldn't load your website data."}
                </h2>

                {/* ── Subtitle ── */}
                <p style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem',
                }}>
                    {isEmpty
                        ? 'Set up your school profile, sections, and content from the EdDesk Admin Panel to go live.'
                        : 'A server or network error occurred while loading your school data. Please retry or refresh.'}
                </p>

                {/* ── Empty: Admin link pill ── */}
                {isEmpty && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <a
                            href="https://admin.eddesk.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: accent.light,
                                textDecoration: 'none',
                                padding: '0.45rem 1rem',
                                borderRadius: '0.625rem',
                                background: `rgba(${accent.h}, 0.1)`,
                                border: `1px solid rgba(${accent.h}, 0.22)`,
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${accent.h}, 0.18)`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${accent.h}, 0.1)`; }}
                        >
                            <span style={{ fontSize: '0.75rem' }}>🔗</span>
                            admin.eddesk.in
                            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>↗</span>
                        </a>
                    </div>
                )}

                {/* ── Error: Error detail box ── */}
                {!isEmpty && errorMessage && (
                    <div style={{
                        background: 'rgba(239,68,68,0.07)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: '0.625rem',
                        padding: '0.7rem 1rem',
                        marginBottom: '1.5rem',
                        textAlign: 'left',
                        fontSize: '0.78rem',
                        color: '#fca5a5',
                        lineHeight: 1.55,
                        wordBreak: 'break-word',
                        fontFamily: 'monospace',
                    }}>
                        {errorMessage}
                    </div>
                )}

                {/* ── Divider ── */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                    marginBottom: '1.5rem',
                }} />

                {/* ── Buttons ── */}
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {isEmpty ? (
                        <a href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <button
                                style={{
                                    padding: '0.7rem 1.75rem',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    fontSize: '0.875rem',
                                    background: `linear-gradient(135deg, ${accent.dark} 0%, #7c3aed 100%)`,
                                    color: '#fff',
                                    boxShadow: `0 4px 20px rgba(${accent.h}, 0.4)`,
                                    letterSpacing: '0.01em',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px rgba(${accent.h}, 0.5)`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 20px rgba(${accent.h}, 0.4)`; }}
                            >
                                Go to Admin Panel →
                            </button>
                        </a>
                    ) : (
                        <>
                            {onRetry && (
                                <button
                                    onClick={onRetry}
                                    style={{
                                        padding: '0.7rem 1.5rem',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        fontSize: '0.875rem',
                                        background: `linear-gradient(135deg, ${accent.dark} 0%, #b91c1c 100%)`,
                                        color: '#fff',
                                        boxShadow: `0 4px 20px rgba(${accent.h}, 0.4)`,
                                        letterSpacing: '0.01em',
                                        transition: 'all 0.2s',
                                        fontFamily: 'inherit',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
                                >
                                    ↺ Retry
                                </button>
                            )}
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    padding: '0.7rem 1.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid rgba(148,163,184,0.2)',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    background: 'rgba(255,255,255,0.04)',
                                    color: '#94a3b8',
                                    letterSpacing: '0.01em',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#cbd5e1'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'; }}
                            >
                                ⟳ Refresh Page
                            </button>
                        </>
                    )}
                </div>

                {/* ── EdDesk brand footer ── */}
                <div style={{
                    marginTop: '1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    fontSize: '0.7rem',
                    color: '#1e293b',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '16px', height: '16px',
                        borderRadius: '4px',
                        background: `linear-gradient(135deg, ${accent.dark}, ${accent.hex})`,
                        opacity: 0.6,
                    }} />
                    Powered by EdDesk
                </div>
            </div>
        </div>
    );
}
