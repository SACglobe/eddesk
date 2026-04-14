"use client";

import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';

const FacultyPage: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    // 1. Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) return null;

    // 2. Data Extraction
    const getComponent = (code: string) => data.components?.find(c => c.componentCode?.toLowerCase() === code.toLowerCase());

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
        <div className="premium-faculty-page bg-[#050505] text-white min-h-screen">
            {/* 1. Hero Section */}
            {heroEnabled && heroMedia[0] && (
                <section className="relative h-[60vh] w-full overflow-hidden bg-black">
                    <div className="absolute inset-0 z-0">
                        {isValidImageUrl(heroMedia[0].mediaUrl) && (
                            <>
                                <img
                                    src={heroMedia[0].mediaUrl}
                                    alt={heroMedia[0].headline || 'Academic Leadership'}
                                    className="w-full h-full object-cover grayscale opacity-40 scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505] z-[1]"></div>
                            </>
                        )}
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                        <div className="max-w-4xl space-y-6">
                            <span className="text-gold-500 uppercase tracking-[0.8em] text-[10px] font-bold">{data.school.name} Leadership</span>
                            <h1 className="text-white text-5xl md:text-8xl font-serif italic leading-none tracking-tighter">
                                {heroMedia[0].headline || 'Mastering Excellence'}
                            </h1>
                            <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto tracking-wide">
                                {heroMedia[0].subheadline || `A curated assembly of world-class educators and thought leaders at ${data.school.name}.`}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* 2. Faculty Section (Cinematic Asymmetrical Profiles) */}
            {facultyEnabled && (
                <section className="py-40 px-6 sm:px-12 lg:px-24 container mx-auto max-w-7xl">
                    {facultyMembers.map((member, index) => (
                        <div 
                            key={member.key} 
                            className={`flex flex-col lg:flex-row items-center gap-24 mb-60 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Cinematic Profile Image */}
                            <div className="lg:w-1/2 relative group">
                                <div className="absolute -inset-10 border border-white/5 rounded-[5rem] md:rounded-[7rem] group-hover:border-gold-500/20 transition-all duration-1000"></div>
                                <div className="relative overflow-hidden rounded-[5rem] md:rounded-[7rem] aspect-[4/5] shadow-3xl bg-[#111]">
                                    {isValidImageUrl(member.imageUrl) ? (
                                        <img
                                            src={member.imageUrl}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-9xl opacity-10">👨🏾‍💼</div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                                </div>

                                {/* Floating Premium Designation */}
                                <div className={`absolute -top-6 ${index % 2 !== 0 ? '-left-6' : '-right-6'} bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-3xl max-w-[280px] group-hover:border-gold-500/30 transition-all duration-700`}>
                                    <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.6em] mb-4">
                                        {member.designation || 'Academician'}
                                    </p>
                                    <div className="w-12 h-px bg-gold-500/50"></div>
                                </div>
                            </div>

                            {/* Sophisticated Content */}
                            <div className="lg:w-1/2 space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-7xl md:text-9xl font-serif italic font-light tracking-tighter leading-[0.85] text-white">
                                        {member.name.split(' ').map((n, i) => (
                                            <span key={i} className="block">{n}</span>
                                        ))}
                                    </h2>
                                    <p className="text-gold-400/60 font-serif italic text-2xl tracking-wide">
                                        {member.qualification}
                                    </p>
                                </div>

                                <p className="text-white/40 text-xl font-light leading-relaxed max-w-lg">
                                    {member.description}
                                </p>

                                {/* Interactive Buttons */}
                                <div className="pt-12 flex flex-wrap gap-8 items-center">
                                    <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] hover:bg-gold-500 transition-all duration-500 shadow-2xl active:scale-95">
                                        Legacy Portfolio
                                    </button>
                                    <button className="group flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.6em] text-white/30 hover:text-gold-500 transition-colors">
                                        <div className="w-12 h-px bg-white/10 group-hover:bg-gold-500 group-hover:w-20 transition-all duration-700"></div>
                                        Connect
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* 3. Contact Details (Premium Footer-style) */}
            {contactEnabled && contactData && (
                <section className="py-40 bg-[#080808] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-12 lg:px-24 flex flex-wrap justify-between gap-24">
                        <div className="space-y-6">
                            <span className="text-gold-500 text-[9px] font-bold uppercase tracking-[0.8em]">Residence</span>
                            <p className="text-white/60 text-lg font-light tracking-wide max-w-xs">{contactData.address}</p>
                        </div>
                        <div className="space-y-6">
                            <span className="text-gold-500 text-[9px] font-bold uppercase tracking-[0.8em]">Correspondence</span>
                            <div className="space-y-2">
                                <p className="text-white text-xl font-serif italic tracking-wide">{contactData.email}</p>
                                <p className="text-white text-xl font-serif italic tracking-wide">{contactData.phone}</p>
                            </div>
                        </div>
                        <div className="space-y-8 flex flex-col items-center md:items-start">
                            <span className="text-gold-500 text-[9px] font-bold uppercase tracking-[0.8em]">Navigation</span>
                            <a href={contactData.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-4 border border-white/10 text-white/30 text-[9px] font-bold uppercase tracking-[0.5em] hover:border-gold-500 hover:text-gold-500 transition-all duration-500">
                                Digital Location
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default FacultyPage;
