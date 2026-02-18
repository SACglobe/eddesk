// src/app/tenant/[[...path]]/page.tsx

import React from 'react'

export default async function TenantPage() {
    // This page is reached via internal rewrite for unknown domains.
    // Valid tenants are rewritten to /demo/... and do NOT land here.

    return (
        <div style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 600, margin: '100px auto', textAlign: 'center', border: '1px solid #eee', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h1 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '16px' }}>Website not configured</h1>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '16px' }}>
                This domain is not yet active. Please configure your website settings via the EdDesk admin panel.
            </p>
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                Visit: <strong style={{ color: '#4f46e5' }}>admin.eddesk.in</strong>
            </div>
        </div>
    )
}
