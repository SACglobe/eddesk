import React from 'react';
import { validateRequiredSections } from '../../../core/utils/sectionValidator';
import { isValidImageUrl } from '../../../core/utils/url';

const InfrastructureScreen = ({ data }) => {
    // 1. Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) return null;

    // 2. Data Extraction
    const getComponent = (code) => data.components?.find(c => c.componentCode?.toLowerCase() === code.toLowerCase());

    const heroComp = getComponent('hero');
    const heroMedia = (data?.heroMedia || []).filter(h => h.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
    const heroEnabled = heroComp?.isActive ?? true;

    const infraComp = getComponent('infrastructure');
    const infraEnabled = infraComp?.isActive ?? true;
    const infrastructure = (data?.infrastructure || []).filter(i => i.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return (
        <div className="infrastructure-screen bg-white">
            {/* 1. Hero Section */}
            {heroEnabled && heroMedia.length > 0 && (
                <section className="classic-hero" style={{
                    height: '400px',
                    position: 'relative',
                    background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroMedia[0].mediaUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div className="container">
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem' }}>
                            {heroMedia[0].headline || 'Campus Infrastructure'}
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                            {heroMedia[0].subheadline || 'Modern facilities providing an ideal environment for learning and growth.'}
                        </p>
                    </div>
                </section>
            )}

            {/* 2. Refined Infrastructure Section */}
            {infraEnabled && (
                <section style={{ padding: '100px 0' }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                        {infrastructure.map((item, index) => (
                            <div key={item.key} style={{ 
                                display: 'flex', 
                                flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
                                alignItems: 'center',
                                gap: '80px',
                                marginBottom: '120px'
                            }} className="infra-row">
                                {/* Image Container */}
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <div style={{ 
                                        borderRadius: '80px', 
                                        overflow: 'hidden', 
                                        aspectSize: '4/3', 
                                        height: '500px',
                                        boxShadow: '0 30px 60px rgba(0,0,0,0.1)' 
                                    }}>
                                        {isValidImageUrl(item.imageUrl) ? (
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.title} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
                                                🏢
                                            </div>
                                        )}
                                    </div>

                                    {/* Small floating info card for Classic */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        right: index % 2 !== 0 ? 'auto' : '-20px',
                                        left: index % 2 !== 0 ? '-20px' : 'auto',
                                        background: 'white',
                                        padding: '30px',
                                        borderRadius: '30px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                        maxWidth: '220px',
                                        borderTop: '6px solid #007bff'
                                    }}>
                                        <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#999', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                                            {item.tag || 'Facility'}
                                        </p>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#333', margin: 0 }}>
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', color: '#222', marginBottom: '30px' }}>
                                        {item.title}
                                    </h2>
                                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666', marginBottom: '40px' }}>
                                        {item.description}
                                    </p>

                                    <div style={{ marginBottom: '50px' }}>
                                        {[item.highlightTitle, item.highlightDescription].filter(Boolean).map((feat, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                                                <div style={{ height: '3px', width: '30px', background: '#007bff' }}></div>
                                                <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#333' }}>{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ 
                                            width: '60px', 
                                            height: '60px', 
                                            background: '#007bff', 
                                            borderRadius: '50%', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '1.5rem',
                                            cursor: 'pointer'
                                        }}>
                                            →
                                        </div>
                                        <span style={{ fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: '#007bff' }}>
                                            Request a Guided Tour
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {infrastructure.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '100px 0', color: '#999' }}>
                                <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>Details about our facilities are being updated.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default InfrastructureScreen;
