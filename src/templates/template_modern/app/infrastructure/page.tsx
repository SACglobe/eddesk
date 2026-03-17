"use client";

import React from 'react';
import HeroSlider from '../../components/HeroSlider';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';

const InfrastructurePage: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    
    // 1. Validation for required sections
    const validation = validateRequiredSections(data);
    if (!validation.isValid) {
        return null;
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

    // 4. Infrastructure Data
    const infraComp = getComponent('infrastructure');
    const infraEnabled = infraComp?.isActive ?? true;
    const infraItems = (data?.infrastructure ?? [])
        .filter(i => i.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return (
        <div className="pb-20 bg-white">
            {/* 1. Hero Section */}
            {heroEnabled && heroMedia.length > 0 && (
                <section className="relative">
                    {heroMedia.length > 1 ? (
                        <HeroSlider slides={heroMedia.map(m => ({
                            ...m,
                            mediaUrl: m.mediaUrl || '',
                            mediaType: m.mediaType || 'image',
                            headline: m.headline || 'World-Class Infrastructure',
                            subheadline: m.subheadline || `Modern facilities at ${schoolName}`,
                            primaryButtonText: m.primaryButtonText || 'View Admissions',
                            primaryButtonUrl: m.primaryButtonUrl || '/admissions',
                            secondaryButtonText: m.secondaryButtonText || 'Contact Us',
                            secondaryButtonUrl: m.secondaryButtonUrl || '/contact',
                            isActive: m.isActive,
                            displayOrder: m.displayOrder
                        }))} />
                    ) : (
                        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                            {isValidImageUrl(heroMedia[0]?.mediaUrl) ? (
                                <img
                                    src={heroMedia[0]?.mediaUrl}
                                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                                    alt="Infrastructure Hero"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-primary/20"></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                            <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                                <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Our Campus</span>
                                <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">
                                    {heroMedia[0]?.headline || 'Campus Infrastructure'}
                                </h1>
                                <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                                    {heroMedia[0]?.subheadline || 'Modern facilities designed to foster innovation, collaboration, and excellence.'}
                                </p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                        </div>
                    )}
                </section>
            )}

            {/* 2. Refined Infrastructure Section (Matching Design Image) */}
            {infraEnabled && (
                <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
                    {infraItems.map((item, index) => (
                        <div key={item.key} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Left Side: Image with floating card */}
                            <div className="lg:w-1/2 relative">
                                <div className="relative overflow-hidden rounded-[4rem] md:rounded-[6rem] lg:rounded-[8rem] aspect-[4/3] shadow-2xl">
                                    {isValidImageUrl(item.imageUrl) ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-7xl">🏢</div>
                                    )}
                                </div>
                                
                                {/* Floating Card Overlay */}
                                <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl max-w-[240px] md:max-w-[280px] border-t-8 border-accent transform transition-transform hover:scale-105 duration-500">
                                    <div className="space-y-2 md:space-y-4">
                                        <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                                            {item.tag || 'Technical Hub'}
                                        </p>
                                        <h4 className="text-lg md:text-2xl font-bold text-primary leading-tight font-primary">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Typography and Details */}
                            <div className="lg:w-1/2 space-y-10 lg:pl-12">
                                <div className="space-y-6">
                                    <h2 className="text-6xl md:text-8xl font-bold text-primary leading-[0.9] tracking-tighter">
                                        {item.title.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
                                    </h2>
                                    <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Feature List (using bulletins/highlights) */}
                                <div className="space-y-4 pt-8 border-t border-gray-100">
                                    {[item.highlightTitle, item.highlightDescription].filter(Boolean).map((feat, i) => (
                                        <div key={i} className="flex items-center gap-6 group">
                                            <div className="h-0.5 w-8 bg-accent group-hover:w-12 transition-all duration-300"></div>
                                            <p className="text-lg font-bold text-primary tracking-tight font-primary">{feat}</p>
                                        </div>
                                    ))}
                                    {(!item.highlightTitle && !item.highlightDescription) && (
                                        <>
                                            <div className="flex items-center gap-6 group">
                                                <div className="h-0.5 w-8 bg-accent group-hover:w-12 transition-all duration-300"></div>
                                                <p className="text-lg font-bold text-primary tracking-tight font-primary">Advanced Equipment</p>
                                            </div>
                                            <div className="flex items-center gap-6 group">
                                                <div className="h-0.5 w-8 bg-accent group-hover:w-12 transition-all duration-300"></div>
                                                <p className="text-lg font-bold text-primary tracking-tight font-primary">Collaborative Space</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Guided Tour CTA */}
                                <div className="pt-10 flex items-center gap-8">
                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl shadow-xl hover:bg-accent hover:text-primary transition-all cursor-pointer group">
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                    <button className="text-[11px] font-black text-primary uppercase tracking-[0.4em] hover:text-accent transition-colors">
                                        Request a Guided Tour
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {infraItems.length === 0 && (
                        <div className="py-24 text-center border-t border-gray-100">
                             <p className="text-gray-400 font-playfair italic text-xl">Information about campus infrastructure is being updated.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InfrastructurePage;
