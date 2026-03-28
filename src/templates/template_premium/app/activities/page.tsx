"use client";

import React, { useState } from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';
import Link from 'next/link';
import { useMemo } from 'react';

const ActivitiesPage: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    const [selectedActivity, setSelectedActivity] = useState<any>(null);

    // 1. Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) return null;

    // 2. Data Extraction
    const getComponent = (code: string) => data.components?.find(c => c.componentCode?.toLowerCase() === code.toLowerCase());

    const heroComp = getComponent('hero');
    const heroMedia = (data?.heroMedia || []).filter(h => h.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
    const heroEnabled = heroComp?.isActive ?? true;

    const activitiesComp = getComponent('activities');
    const activitiesEnabled = activitiesComp?.isActive ?? true;
    const activities = (data?.activities || []).filter(a => a.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return (
        <div className="premium-activities-page bg-[#050505] text-white min-h-screen">
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
                                        alt={heroMedia[0].headline || 'Campus Life'}
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
                                    {heroMedia[0].subheadline || `Quality Since MCMLXXXVIII at ${data.school.name}`}
                                </p>
                            </div>
                            
                            <h1 className="text-white text-6xl md:text-9xl font-serif italic leading-[0.9] tracking-tighter">
                                {heroMedia[0].headline || `${data.school.name} Engagement`}
                            </h1>

                            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12">
                                <Link href="#activities" className="px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-500">
                                    Explore Engagement
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

            {/* 2. Activities Masonry/Grid */}
            {activitiesEnabled && (
                <section id="activities" className="py-24 px-4 sm:px-8 lg:px-16 container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl space-y-4">
                            <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-xs">{data?.school?.name || 'Institutional'} Portfolio</span>
                            <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-none italic font-serif">{data?.school?.name || 'Campus'} <span className="opacity-40">&</span> Engagement</h2>
                        </div>
                        <div className="hidden md:block h-px flex-1 bg-white/10 mx-12 mb-4"></div>
                        <p className="text-white/40 max-w-xs text-sm leading-relaxed text-right font-light">
                            A showcase of institutional commitment to holistic development and student agency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {activities.map((activity, index) => (
                            <div 
                                key={activity.key}
                                className="activity-premium-card group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                                onClick={() => setSelectedActivity(activity)}
                            >
                                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                                    {isValidImageUrl(activity.imageUrl) ? (
                                        <img 
                                            src={activity.imageUrl} 
                                            alt={activity.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-[#111] flex items-center justify-center">
                                            <span className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity">🏅</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                
                                <div className="absolute inset-x-0 bottom-0 p-10 space-y-6 flex flex-col justify-end h-full">
                                    <div className="space-y-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        <span className="text-gold-400 font-black uppercase tracking-widest text-[10px] bg-white/10 backdrop-blur-md px-3 py-1 rounded-sm">
                                            {activity.tag}
                                        </span>
                                        <h3 className="text-3xl font-serif italic text-white leading-tight">
                                            {activity.title}
                                        </h3>
                                    </div>

                                    <div className="border-t border-white/20 pt-6">
                                        <p className="text-white/60 text-sm font-light line-clamp-2 leading-relaxed h-[3em]">
                                            {activity.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        {activity.highlightStat && (
                                            <span className="text-xs font-bold tracking-widest text-white/40 uppercase">
                                                {activity.highlightStat}
                                            </span>
                                        )}
                                        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {activities.length === 0 && (
                        <div className="py-40 text-center opacity-20">
                            <p className="text-2xl font-serif italic">The registry is currently being curated.</p>
                        </div>
                    )}
                </section>
            )}

            {/* 3. Cinematic Lightbox */}
            {selectedActivity && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-700"
                    onClick={() => setSelectedActivity(null)}
                >
                    <button className="absolute top-10 right-10 text-white hover:text-gold-400 transition-colors p-4 rounded-full border border-white/10 hover:border-gold-400/50">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="max-w-7xl w-full flex flex-col md:flex-row h-full max-h-[85vh] bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="md:w-[60%] relative h-[40vh] md:h-full bg-black">
                            <img 
                                src={selectedActivity.imageUrl} 
                                className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" 
                                alt={selectedActivity.title} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block"></div>
                        </div>

                        <div className="flex-1 p-12 md:p-24 flex flex-col justify-center space-y-12">
                            <div className="space-y-6">
                                <span className="text-gold-400 font-bold uppercase tracking-[0.4em] text-[10px] block mb-2">{selectedActivity.tag}</span>
                                <h2 className="text-6xl md:text-8xl font-serif italic tracking-tight leading-[0.9]">
                                    {selectedActivity.title}
                                </h2>
                            </div>

                            <div className="max-w-md">
                                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                                    {selectedActivity.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
                                <div>
                                    <span className="text-white/30 text-[9px] font-black uppercase tracking-widest block mb-2">Institutional Stat</span>
                                    <p className="text-2xl font-serif italic text-gold-400">{selectedActivity.highlightStat || 'Global Benchmark'}</p>
                                </div>
                                <div>
                                    <span className="text-white/30 text-[9px] font-black uppercase tracking-widest block mb-2">Distinction</span>
                                    <p className="text-2xl font-serif italic text-white">{selectedActivity.highlightTag || 'Peer Excellence'}</p>
                                </div>
                            </div>

                            <div className="pt-12">
                                <button className="group relative px-10 py-5 bg-gold-500 text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white transition-all overflow-hidden">
                                    <span className="relative z-10 font-bold">Initiate Registration</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivitiesPage;
