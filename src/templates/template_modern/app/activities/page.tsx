"use client";

import React, { useState, useMemo } from 'react';
import HeroSlider from '../../components/HeroSlider';
import Link from 'next/link';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';

const Activities: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    
    // 1. Validation for required sections
    const validation = validateRequiredSections(data);
    if (!validation.isValid) {
        return null; // TemplateRenderer handles SystemPopup
    }

    // 2. Helper to get component config
    const getComponent = (code: string) => {
        return data.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    // 3. Hero Section Data
    const heroComp = getComponent('hero');
    const heroEnabled = heroComp?.isActive ?? true;
    const heroMedia = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    // 4. Activities Data
    const activitiesComp = getComponent('activities');
    const activitiesEnabled = activitiesComp?.isActive ?? true;
    const activityItems = (data?.activities ?? [])
        .filter(a => a.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const [selectedActivity, setSelectedActivity] = useState<typeof activityItems[0] | null>(null);

    return (
        <div className="pb-0">
            {/* 1. Hero Section */}
            {heroEnabled && heroMedia.length > 0 && (
                <section className="relative">
                    {heroMedia.length > 1 ? (
                        <HeroSlider slides={heroMedia.map(m => ({
                            ...m,
                            mediaUrl: m.mediaUrl || '',
                            mediaType: m.mediaType || 'image',
                            headline: m.headline || 'Beyond the Classroom',
                            subheadline: m.subheadline || `Co-curricular excellence at ${schoolName}`,
                            primaryButtonText: m.primaryButtonText || 'View Admissions',
                            primaryButtonUrl: m.primaryButtonUrl || '/admission',
                            secondaryButtonText: m.secondaryButtonText || 'Events',
                            secondaryButtonUrl: m.secondaryButtonUrl || '/events',
                            isActive: m.isActive,
                            displayOrder: m.displayOrder
                        }))} />
                    ) : (
                        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                            <img
                                src={heroMedia[0]?.mediaUrl || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2000"}
                                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                                alt="Activities Hero"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                            <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                                <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Campus Life</span>
                                <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">
                                    {heroMedia[0]?.headline || 'Student Activities'}
                                </h1>
                                <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                                    {heroMedia[0]?.subheadline || `Nurturing talents and building character through a wide range of extracurricular pursuits.`}
                                </p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                        </div>
                    )}
                </section>
            )}

            {/* 2. Activities Section */}
            {activitiesEnabled && (
                <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-primary font-playfair">Extracurricular Registry</h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-px w-12 bg-accent"></div>
                            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">A Legacy of Participation</p>
                            <div className="h-px w-12 bg-accent"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
                        {activityItems.map((item) => (
                            <div
                                key={item.key}
                                className="group relative flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-50"
                                onClick={() => setSelectedActivity(item)}
                            >
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    {item.imageUrl && isValidImageUrl(item.imageUrl) ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-4xl text-gray-300">🏅</span>
                                        </div>
                                    )}

                                    {/* Tag Badge */}
                                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg z-10">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.tag || 'Activity'}</span>
                                    </div>

                                    {/* Highlight Stat Overlay */}
                                    {item.highlightStat && (
                                        <div className="absolute top-8 right-8 bg-accent text-primary px-4 py-2 rounded-full shadow-lg z-10 scale-90 group-hover:scale-100 transition-transform">
                                            <span className="text-[10px] font-bold uppercase tracking-tight">{item.highlightStat}</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                </div>

                                <div className="p-10 space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold text-primary leading-tight group-hover:text-blue-700 transition-colors font-playfair">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 line-clamp-2 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {item.highlightTag && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-xs">✨</div>
                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.highlightTag}</span>
                                        </div>
                                    )}
                                    
                                    <div className="pt-4 flex items-center justify-between">
                                        <span className="text-[9px] font-black text-primary/30 uppercase tracking-[0.3em]">Institutional Credit</span>
                                        <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-accent transition-all">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {activityItems.length === 0 && (
                        <div className="py-24 text-center border-t border-gray-100">
                             <p className="text-gray-400 font-playfair italic text-xl">No active activities found in the registry.</p>
                        </div>
                    )}
                </div>
            )}

            {/* 3. Activity Modal */}
            {selectedActivity && (
                <div
                    className="fixed inset-0 z-[100] bg-blue-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={() => setSelectedActivity(null)}
                >
                    <button className="absolute top-8 right-8 text-white hover:text-accent transition-colors p-3 bg-white/5 rounded-full">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="max-w-6xl w-full flex flex-col md:flex-row items-stretch gap-0 bg-white rounded-[3.5rem] overflow-hidden shadow-3xl" onClick={e => e.stopPropagation()}>
                        <div className="md:w-1/2 relative bg-gray-100 min-h-[40vh]">
                            <img 
                                src={selectedActivity.imageUrl} 
                                className="w-full h-full object-cover" 
                                alt={selectedActivity.title} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center space-y-10">
                            <div className="space-y-4">
                                <span className="text-accent bg-primary px-5 py-1.5 rounded-full font-black uppercase tracking-widest text-[9px]">
                                    {selectedActivity.tag}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-bold text-primary leading-tight font-playfair">
                                    {selectedActivity.title}
                                </h3>
                            </div>

                            <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
                                {selectedActivity.description}
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                                {selectedActivity.highlightTag && (
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-gray-300">Achievement</p>
                                        <p className="font-bold text-blue-600 font-playfair">{selectedActivity.highlightTag}</p>
                                    </div>
                                )}
                                {selectedActivity.highlightStat && (
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-gray-300">Statistic</p>
                                        <p className="font-bold text-primary font-playfair">{selectedActivity.highlightStat}</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-8">
                                <button className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-accent hover:text-primary transition-all shadow-xl">
                                    Register for Season
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Activities;
