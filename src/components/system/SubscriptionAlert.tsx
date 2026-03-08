'use client';

import React from 'react';

type AlertVariant = 'inactive' | 'expired';

interface SubscriptionAlertProps {
    variant: AlertVariant;
    schoolName?: string;
}

export default function SubscriptionAlert({ variant, schoolName }: SubscriptionAlertProps) {
    const isExpired = variant === 'expired';

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(2, 6, 23, 0.95)',
            backdropFilter: 'blur(12px)',
            color: '#f8fafc',
            fontFamily: 'var(--font-plus-jakarta-sans, sans-serif)',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div style={{
                maxWidth: '500px',
                width: '100%',
                background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: '2rem',
                border: `1px solid ${isExpired ? '#ef444433' : '#eab30833'}`,
                padding: '3rem 2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '1.5rem',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    {isExpired ? '⏳' : '🚫'}
                </div>

                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                    background: isExpired
                        ? 'linear-gradient(to right, #fca5a5, #ef4444)'
                        : 'linear-gradient(to right, #fde047, #eab308)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {isExpired ? 'Subscription Expired' : 'Account Inactive'}
                </h1>

                <p style={{
                    color: '#94a3b8',
                    lineHeight: 1.6,
                    marginBottom: '2rem'
                }}>
                    {isExpired
                        ? `The subscription for ${schoolName || 'this institution'} has expired. Please contact your administrator to renew.`
                        : `Your account is currently inactive. Please reach out to our support team to resolve this.`}
                </p>

                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '2rem'
                }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.75rem' }}>
                        To resolve this, please visit the admin portal:
                    </p>
                    <a
                        href="https://admin.eddesk.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#6366f1',
                            fontWeight: 700,
                            textDecoration: 'none',
                            fontSize: '1.1rem',
                            display: 'block'
                        }}
                    >
                        admin.eddesk.in
                    </a>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}} />
            </div>
        </div>
    );
}
