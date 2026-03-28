"use client";

import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';
import Link from 'next/link';

const InfrastructurePage: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    // 1. Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) return null;

    // 2. Data Extraction
    const getComponent = (code: string) => data.components?.find(c => c.componentCode?.toLowerCase() === code.toLowerCase());

    const heroComp = getComponent('hero');
    const heroMedia = (data?.heroMedia || []).filter(h => h.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
    const heroEnabled = heroComp?.isActive ?? true;

    const infraComp = getComponent('infrastructure');
    const infraEnabled = infraComp?.isActive ?? true;
    const infrastructure = (data?.infrastructure || []).filter(i => i.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return (
        <div className="premium-infrastructure-page bg-[#050505] text-white min-h-screen">
            {/* 1. Hero Section */}
            {heroEnabled && heroMedia[0] && (
                <section className="relative h-[75vh] w-full overflow-hidden bg-black">
                    <div className="absolute inset-0 z-0">
                        {isValidImageUrl(heroMedia[0].mediaUrl) && (
                            <>
                                {heroMedia[0].mediaType === 'video' ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover scale-110"
                                    >
                                        <source src={heroMedia[0].mediaUrl} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={heroMedia[0].mediaUrl}
                                        alt={heroMedia[0].headline || 'Campus Infrastructure'}
                                        className="w-full h-full object-cover scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505] z-[1]"></div>
                            </>
                        )}
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
                        <div className="max-w-5xl space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold-500/60"></div>
                                <p className="text-gold-500 uppercase tracking-[0.8em] text-[10px] font-bold">
                                    {heroMedia[0].subheadline || `World-Class Environment at ${data.school.name}`}
                                </p>
                            </div>
                            
                            <h1 className="text-white text-6xl md:text-9xl font-serif italic leading-[0.9] tracking-tighter">
                                {heroMedia[0].headline || `${data.school.name} Campus`}
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12">
                                <Link href="#facilities" className="px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-500">
                                    Explore Facilities
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 opacity-30">
                        <div className="w-px h-8 bg-gradient-to-b from-gold-500/50 to-transparent"></div>
                        <span className="text-white text-[8px] uppercase tracking-[0.5em] font-bold">Scroll</span>
                    </div>
                </section>
            )}

            {/* 2. Refined Infrastructure Section (Matching Premium Aesthetic) */}
            {infraEnabled && (
                <section id="facilities" className="py-40 px-6 sm:px-12 lg:px-24 container mx-auto max-w-7xl">
                    {infrastructure.map((item, index) => (
                        <div 
                            key={item.key} 
                            className={`flex flex-col lg:flex-row items-center gap-24 mb-60 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Cinematic Image with Floating Element */}
                            <div className="lg:w-3/5 relative group">
                                <div className="absolute -inset-8 border border-white/5 rounded-[4rem] md:rounded-[6rem] lg:rounded-[8rem] group-hover:border-gold-500/20 transition-all duration-1000"></div>
                                <div className="relative overflow-hidden rounded-[4rem] md:rounded-[6rem] lg:rounded-[8rem] aspect-[16/10] shadow-3xl">
                                    {isValidImageUrl(item.imageUrl) ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#111] flex items-center justify-center text-8xl opacity-10">🏢</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                </div>

                                {/* Floating Premium Card */}
                                <div className={`absolute -top-6 ${index % 2 !== 0 ? '-left-6' : '-right-6'} bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-3xl max-w-[300px] group-hover:border-gold-500/30 transition-all duration-700`}>
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.5em]">
                                            {item.tag || 'Elite Spacial Unit'}
                                        </p>
                                        <h4 className="text-3xl font-serif italic text-white leading-tight">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <div className="mt-8 w-12 h-0.5 bg-gold-500/50"></div>
                                </div>
                            </div>

                            {/* Sophisticated Content */}
                            <div className="lg:w-2/5 space-y-16">
                                <div className="space-y-8">
                                    <h2 className="text-7xl md:text-9xl font-serif italic font-light tracking-tighter leading-[0.85] text-white">
                                        {item.title.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
                                    </h2>
                                    <p className="text-white/40 text-xl font-light leading-relaxed max-w-md">
                                        {item.description}
                                    </p>
                                </div>

                                {/* List Elements */}
                                <div className="space-y-6 pt-12 border-t border-white/10">
                                    {[item.highlightTitle, item.highlightDescription].filter(Boolean).map((feat, i) => (
                                        <div key={i} className="flex items-center gap-6 group/item">
                                            <div className="h-px w-12 bg-gold-500/20 group-hover/item:w-20 group-hover/item:bg-gold-500 transition-all duration-700"></div>
                                            <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/60 group-hover/item:text-gold-400 transition-colors">{feat}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Premium CTA */}
                                <div className="pt-12 flex items-center gap-10 group/cta cursor-pointer">
                                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover/cta:border-gold-500 group-hover/cta:bg-gold-500 transition-all duration-500">
                                        <svg className="w-6 h-6 text-white group-hover/cta:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 group-hover/cta:text-gold-400 Transition-all">
                                        Guided Immersion
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {infrastructure.length === 0 && (
                        <div className="py-40 text-center opacity-20">
                            <p className="text-3xl font-serif italic">Documentation of architectural excellence is in progress.</p>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default InfrastructurePage;
