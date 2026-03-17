import React from 'react';
import { validateRequiredSections } from '../../../core/utils/sectionValidator';
import { isValidImageUrl } from '../../../core/utils/url';

const FacultyScreen = ({ data }) => {
    // 1. Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) return null;

    // 2. Data Extraction
    const getComponent = (code) => data.components?.find(c => c.componentCode?.toLowerCase() === code.toLowerCase());

    const heroComp = getComponent('hero');
    const heroMedia = (data?.heroMedia || []).filter(h => h.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
    const heroEnabled = heroComp?.isActive ?? true;

    const facultyComp = getComponent('faculty');
    const facultyEnabled = facultyComp?.isActive ?? true;
    const facultyMembers = (data?.faculty || []).filter(f => f.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const contactComp = getComponent('contactdetails');
    const contactEnabled = contactComp?.isActive ?? true;
    const contactData = data?.contactDetails?.[0];

    return (
        <div className="faculty-screen bg-white">
            {/* 1. Hero Section */}
            {heroEnabled && heroMedia.length > 0 && (
                <section className="classic-hero" style={{
                    height: '350px',
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
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
                            {heroMedia[0].headline || 'Our Faculty'}
                        </h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                            {heroMedia[0].subheadline || 'A legacy of excellence in education and leadership.'}
                        </p>
                    </div>
                </section>
            )}

            {/* 2. Faculty Section (Classic Asymmetrical Profile) */}
            {facultyEnabled && (
                <section style={{ padding: '80px 0' }}>
                    <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                        {facultyMembers.map((member, index) => (
                            <div key={member.key} style={{ 
                                display: 'flex', 
                                flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
                                alignItems: 'center',
                                gap: '60px',
                                marginBottom: '100px'
                            }} className="faculty-row">
                                {/* Image Container */}
                                <div style={{ flex: '0 0 400px', position: 'relative' }}>
                                    <div style={{ 
                                        borderRadius: '60px', 
                                        overflow: 'hidden', 
                                        aspectRatio: '4/5',
                                        boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                                        border: '5px solid #f8f9fa'
                                    }}>
                                        {isValidImageUrl(member.imageUrl) ? (
                                            <img 
                                                src={member.imageUrl} 
                                                alt={member.name} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>
                                                👨‍🏫
                                            </div>
                                        )}
                                    </div>

                                    {/* Floating Designation Card */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '30px',
                                        right: index % 2 !== 0 ? 'auto' : '-20px',
                                        left: index % 2 !== 0 ? '-20px' : 'auto',
                                        background: 'white',
                                        padding: '15px 25px',
                                        borderRadius: '20px',
                                        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                                        borderLeft: '4px solid #f97316'
                                    }}>
                                        <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#003366', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                                            {member.designation || 'Faculty'}
                                        </p>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#003366', marginBottom: '10px', lineHeight: 1.1 }}>
                                        {member.name}
                                    </h2>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f97316', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {member.qualification}
                                    </h4>
                                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '35px' }}>
                                        {member.description}
                                    </p>

                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <button style={{ 
                                            padding: '12px 30px', 
                                            background: '#003366', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '12px', 
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}>
                                            Full Profile
                                        </button>
                                        <button style={{ 
                                            padding: '12px 30px', 
                                            background: 'transparent', 
                                            color: '#003366', 
                                            border: '2px solid #003366', 
                                            borderRadius: '12px', 
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}>
                                            Contact Office
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 3. Contact Details Section */}
            {contactEnabled && contactData && (
                <section style={{ background: '#f8f9fa', padding: '60px 0', borderTop: '1px solid #eee' }}>
                    <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
                        <div style={{ flex: 1 }}>
                            <h5 style={{ color: '#f97316', fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase' }}>Visit Us</h5>
                            <p style={{ color: '#003366', marginTop: '10px', fontWeight: '600' }}>{contactData.address}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h5 style={{ color: '#f97316', fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase' }}>Inquire</h5>
                            <p style={{ color: '#003366', marginTop: '10px', fontWeight: '600' }}>{contactData.email}<br/>{contactData.phone}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h5 style={{ color: '#f97316', fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase' }}>Locate</h5>
                            <a href={contactData.mapEmbedUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '10px', fontWeight: '800', color: '#003366', textDecoration: 'none', borderBottom: '2px solid #f97316' }}>
                                VIEW ON MAP →
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default FacultyScreen;
