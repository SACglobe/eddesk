import React, { useState } from 'react';
import { validateRequiredSections } from '../../../core/utils/sectionValidator';
import { isValidImageUrl } from '../../../core/utils/url';

const ActivitiesScreen = ({ data }) => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    // 1. Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) return null;

    // 2. Data Extraction
    const getComponent = (code) => data.components?.find(c => c.componentCode?.toLowerCase() === code.toLowerCase());

    const heroComp = getComponent('hero');
    const heroMedia = (data?.heroMedia || []).filter(h => h.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
    const heroEnabled = heroComp?.isActive ?? true;

    const activitiesComp = getComponent('activities');
    const activitiesEnabled = activitiesComp?.isActive ?? true;
    const activities = (data?.activities || []).filter(a => a.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return (
        <div className="activities-screen">
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
                            {heroMedia[0].headline || 'Extracurricular Activities'}
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                            {heroMedia[0].subheadline || 'Nurturing well-rounded individuals through participation and excellence.'}
                        </p>
                    </div>
                </section>
            )}

            {/* 2. Activities Grid */}
            {activitiesEnabled && (
                <section style={{ padding: '80px 0', background: '#f9f9f9' }}>
                    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '15px' }}>Our Activities</h2>
                            <div style={{ width: '60px', height: '4px', background: '#007bff', margin: '0 auto' }}></div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '30px'
                        }}>
                            {activities.map((activity) => (
                                <div 
                                    key={activity.key} 
                                    className="activity-card"
                                    style={{
                                        background: 'white',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                        transition: 'transform 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setSelectedActivity(activity)}
                                >
                                    <div style={{ height: '240px', overflow: 'hidden' }}>
                                        {isValidImageUrl(activity.imageUrl) ? (
                                            <img 
                                                src={activity.imageUrl} 
                                                alt={activity.title} 
                                                style={{ width: '100%', height: '100%', objectCover: 'cover' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ fontSize: '3rem' }}>🎭</span>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '25px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#007bff', letterSpacing: '1px' }}>
                                                {activity.tag}
                                            </span>
                                            {activity.highlightStat && (
                                                <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: '#e7f1ff', color: '#007bff', borderRadius: '20px', fontWeight: '600' }}>
                                                    {activity.highlightStat}
                                                </span>
                                            )}
                                        </div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#222' }}>{activity.title}</h3>
                                        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                                            {activity.description}
                                        </p>
                                        {activity.highlightTag && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#444' }}>
                                                <span>⭐</span>
                                                <span style={{ fontWeight: '600' }}>{activity.highlightTag}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {activities.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '100px 0', color: '#999' }}>
                                <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>No activities currently listed.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* 3. Lightbox Modal */}
            {selectedActivity && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.9)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px'
                    }}
                    onClick={() => setSelectedActivity(null)}
                >
                    <div 
                        style={{
                            background: 'white',
                            maxWidth: '900px',
                            width: '100%',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                border: 'none',
                                background: 'white',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                                fontSize: '20px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                zIndex: 10
                            }}
                            onClick={() => setSelectedActivity(null)}
                        >
                            ✕
                        </button>

                        <div style={{ height: '400px', background: '#f0f0f0' }}>
                            <img 
                                src={selectedActivity.imageUrl} 
                                alt={selectedActivity.title} 
                                style={{ width: '100%', height: '100%', objectCover: 'cover' }}
                            />
                        </div>

                        <div style={{ padding: '40px' }}>
                            <span style={{ color: '#007bff', fontWeight: '800', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>
                                {selectedActivity.tag}
                            </span>
                            <h2 style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '20px' }}>{selectedActivity.title}</h2>
                            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '30px' }}>
                                {selectedActivity.description}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
                                <div>
                                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', fontWeight: '700' }}>Notable Achievement</p>
                                    <p style={{ fontWeight: '700', color: '#222' }}>{selectedActivity.highlightTag || 'Active Participation'}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#999', fontWeight: '700' }}>Impact/Statistic</p>
                                    <p style={{ fontWeight: '700', color: '#222' }}>{selectedActivity.highlightStat || 'Global Standards'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivitiesScreen;
