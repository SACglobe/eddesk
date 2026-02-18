// src/app/tenant/[[...path]]/page.tsx
// Reached via internal rewrite for unknown/unconfigured domains.
// Valid tenants are rewritten to /demo/... and do NOT land here.

import React from 'react'

const KEYFRAMES = `
@keyframes ed-fadeIn {
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes ed-pulse-indigo {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.55), 0 0 32px rgba(99,102,241,0.3); }
  50%       { box-shadow: 0 0 0 10px rgba(99,102,241,0), 0 0 48px rgba(99,102,241,0.5); }
}
@keyframes ed-spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes ed-orb-float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-18px) scale(1.04); }
}
`;

export default async function TenantPage() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(145deg, #020617 0%, #0d1526 50%, #0f172a 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-plus-jakarta-sans, "Plus Jakarta Sans", system-ui, sans-serif)',
                padding: '1rem',
            }}>
                {/* Card */}
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
                    {/* Background orbs */}
                    <div style={{
                        position: 'absolute', top: '-60px', right: '-60px',
                        width: '200px', height: '200px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
                        animation: 'ed-orb-float 5s ease-in-out infinite',
                        pointerEvents: 'none',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-40px', left: '-40px',
                        width: '160px', height: '160px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
                        animation: 'ed-orb-float 7s ease-in-out infinite reverse',
                        pointerEvents: 'none',
                    }} />

                    {/* Animated icon ring */}
                    <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1.75rem' }}>
                        <div style={{
                            position: 'absolute', inset: '-8px',
                            borderRadius: '50%',
                            border: '2px dashed rgba(99,102,241,0.35)',
                            animation: 'ed-spin-slow 8s linear infinite',
                        }} />
                        <div style={{
                            position: 'absolute', inset: '-2px',
                            borderRadius: '50%',
                            border: '1px solid rgba(99,102,241,0.15)',
                        }} />
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2rem',
                            animation: 'ed-pulse-indigo 2.4s ease-in-out infinite',
                        }}>
                            🌐
                        </div>
                    </div>

                    {/* Badge */}
                    <div style={{ marginBottom: '0.875rem' }}>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            padding: '0.3rem 0.9rem',
                            borderRadius: '999px',
                            background: 'rgba(99,102,241,0.12)',
                            color: '#a5b4fc',
                            border: '1px solid rgba(99,102,241,0.28)',
                        }}>
                            ⚙ Domain Not Configured
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 style={{
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        lineHeight: 1.3,
                        marginBottom: '0.625rem',
                        color: '#f8fafc',
                        letterSpacing: '-0.01em',
                    }}>
                        This website is not configured yet.
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        lineHeight: 1.65,
                        marginBottom: '1.75rem',
                    }}>
                        This domain is not yet active. Please configure your website settings via the EdDesk admin panel to go live.
                    </p>

                    {/* Admin link pill */}
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
                                color: '#a5b4fc',
                                textDecoration: 'none',
                                padding: '0.45rem 1rem',
                                borderRadius: '0.625rem',
                                background: 'rgba(99,102,241,0.1)',
                                border: '1px solid rgba(99,102,241,0.22)',
                            }}
                        >
                            <span style={{ fontSize: '0.75rem' }}>🔗</span>
                            admin.eddesk.in
                            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>↗</span>
                        </a>
                    </div>

                    {/* Divider */}
                    <div style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                        marginBottom: '1.5rem',
                    }} />

                    {/* CTA Button */}
                    <a href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <button style={{
                            padding: '0.7rem 1.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            color: '#fff',
                            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                            letterSpacing: '0.01em',
                            fontFamily: 'inherit',
                        }}>
                            Go to Admin Panel →
                        </button>
                    </a>

                    {/* EdDesk brand */}
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
                            background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
                            opacity: 0.6,
                        }} />
                        Powered by EdDesk
                    </div>
                </div>
            </div>
        </>
    )
}
