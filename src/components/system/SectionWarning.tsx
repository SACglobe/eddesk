'use client';

import React, { useState, useEffect } from 'react';

/**
 * SectionWarning.tsx
 * Inline banner for the EdDesk design system.
 * 
 * Shown when a required section is enabled but has no data.
 * Notifies the admin to add content without blocking the entire page.
 */

export interface SectionWarningProps {
    /**
     * The componentCode / sectionKey identifying which section is empty.
     * Examples: 'faculty', 'hero', 'broadcast', 'events', 'gallery'
     */
    sectionKey: string;

    /**
     * Optional human-readable label for the section.
     * If not provided, sectionKey is title-cased and used instead.
     */
    label?: string;

    /**
     * If true, the warning can be dismissed by the user.
     * Default: true
     */
    dismissable?: boolean;
}

/**
 * injectFadeIn
 * Injects a minimal fade-in keyframe once per session.
 */
function injectFadeIn() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('ed-section-warning-kf')) return;
    const style = document.createElement('style');
    style.id = 'ed-section-warning-kf';
    style.textContent = `
    @keyframes ed-sw-fadeIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
    document.head.appendChild(style);
}

export default function SectionWarning({
    sectionKey,
    label,
    dismissable = true
}: SectionWarningProps) {
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        injectFadeIn();
    }, []);

    if (dismissed) return null;

    // 1. Derive Label
    const derivedLabel = label || sectionKey
        .replace(/[_-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // 2. Visual Tokens
    const accent = {
        h: '234,179,8',
        hex: '#eab308',
        dark: '#ca8a04',
        light: '#fde047'
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '80px',
                background: 'linear-gradient(135deg, #0d1526 0%, #111827 100%)',
                border: `1px solid rgba(${accent.h}, 0.25)`,
                borderRadius: '0.75rem',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                overflow: 'hidden',
                fontFamily: 'var(--font-plus-jakarta-sans, "Plus Jakarta Sans", system-ui, sans-serif)',
                animation: 'ed-sw-fadeIn 0.25s ease forwards',
                boxSizing: 'border-box'
            }}
        >
            {/* Left Accent Bar */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    borderRadius: '0.75rem 0 0 0.75rem',
                    background: `linear-gradient(180deg, ${accent.hex}, ${accent.dark})`
                }}
            />

            {/* Icon */}
            <div style={{ fontSize: '1.25rem', flexShrink: 0 }}>⚠️</div>

            {/* Text Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    <div
                        style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            background: `rgba(${accent.h}, 0.12)`,
                            color: accent.light,
                            border: `1px solid rgba(${accent.h}, 0.25)`,
                            borderRadius: '999px',
                            padding: '0.2rem 0.65rem',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {sectionKey}
                    </div>
                    <h3
                        style={{
                            color: '#f1f5f9',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        No data found for {derivedLabel} section.
                    </h3>
                </div>

                <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 0.5rem 0', lineHeight: 1.55 }}>
                    Add content at admin.eddesk.in or disable this section to hide this warning.
                </p>

                <a
                    href="https://admin.eddesk.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: accent.light,
                        textDecoration: 'none',
                        background: `rgba(${accent.h}, 0.08)`,
                        border: `1px solid rgba(${accent.h}, 0.2)`,
                        padding: '0.3rem 0.75rem',
                        borderRadius: '0.5rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `rgba(${accent.h}, 0.15)`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `rgba(${accent.h}, 0.08)`; }}
                >
                    Add at admin.eddesk.in →
                </a>
            </div>

            {/* Dismiss Button */}
            {dismissable && (
                <button
                    onClick={() => setDismissed(true)}
                    style={{
                        alignSelf: 'flex-start',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#475569',
                        fontSize: '0.75rem',
                        padding: '0.25rem',
                        transition: 'color 0.2s',
                        marginTop: '-0.5rem',
                        marginRight: '-0.5rem'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
                    aria-label="Dismiss warning"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
