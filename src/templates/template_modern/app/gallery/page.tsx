"use client";

import React, { useState, useMemo } from 'react';
import HeroSlider from '../../components/HeroSlider';
import Link from 'next/link';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';

const Gallery: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    
    // 1. Validation for required sections
    const validation = validateRequiredSections(data);
    if (!validation.isValid) {
        return null; // TemplateRenderer will show SystemPopup for content_missing
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

    // 4. Gallery Data (Ignore filters on this screen per spec)
    const galleryComp = getComponent('gallery');
    const galleryEnabled = galleryComp?.isActive ?? true;
    const mediaItems = data?.gallery || [];

    // 5. Contact Details
    const contactComp = getComponent('contactdetails') || getComponent('contact');
    const contactEnabled = contactComp?.isActive ?? true;
    const contact = data?.contactDetails;
    const address = contact?.address || '123 Education Lane, Springfield, IL 62704';
    const phone = contact?.phone || '+1 (555) 123-4567';
    const email = contact?.email || 'office@school.edu';

    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
    const [selectedMedia, setSelectedMedia] = useState<typeof mediaItems[0] | null>(null);

    const filteredMedia = useMemo(() =>
        filter === 'all' ? mediaItems : mediaItems.filter(item => item.mediaType?.toLowerCase() === filter),
        [filter, mediaItems]);

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
                            headline: m.headline || 'Campus Gallery',
                            subheadline: m.subheadline || `Visual chronicles of life at ${schoolName}`,
                            primaryButtonText: m.primaryButtonText || 'View Admissions',
                            primaryButtonUrl: m.primaryButtonUrl || '/admission',
                            secondaryButtonText: m.secondaryButtonText || 'Contact Us',
                            secondaryButtonUrl: m.secondaryButtonUrl || '/contact',
                            isActive: m.isActive,
                            displayOrder: m.displayOrder
                        }))} />
                    ) : (
                        <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                            {heroMedia[0]?.mediaUrl ? (
                                <img
                                    src={heroMedia[0].mediaUrl}
                                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                                    alt="Gallery Hero"
                                />
                            ) : (
                                <div className="absolute inset-0 w-full h-full bg-base-300"></div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                            <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                                <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Visual Chronicles</span>
                                <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">
                                    {heroMedia[0]?.headline || 'Campus Gallery'}
                                </h1>
                                <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                                    {heroMedia[0]?.subheadline || `A vibrant tapestry of moments, achievements, and daily life at ${schoolName}.`}
                                </p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
                        </div>
                    )}
                </section>
            )}

            {/* 2. Gallery Section */}
            {galleryEnabled && (
                <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-100 pb-12">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-primary font-playfair">Media Library</h2>
                            <p className="text-gray-500 font-medium">Browse our collection of photos and highlights.</p>
                        </div>
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                            {(['all', 'image', 'video'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${filter === type
                                        ? 'bg-primary text-accent shadow-xl'
                                        : 'text-gray-500 hover:text-primary'
                                        }`}
                                >
                                    {type === 'all' ? 'View All' : `${type}s`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
                        {filteredMedia.map((item) => (
                            <div
                                key={item.key}
                                className="group relative flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-50"
                                onClick={() => setSelectedMedia(item)}
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    {item.imageUrl && isValidImageUrl(item.imageUrl) ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.caption || 'Media item'}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-4xl text-gray-300">🖼️</span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors"></div>

                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                        <span className="text-lg">{item.mediaType?.toLowerCase() === 'video' ? '▶️' : '📷'}</span>
                                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">{item.mediaType}</span>
                                    </div>

                                    {item.mediaType?.toLowerCase() === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-accent text-primary rounded-full flex items-center justify-center text-2xl shadow-2xl group-hover:scale-125 transition-transform duration-500">
                                                ▶
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-[2px] bg-accent"></span>
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.category}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primary leading-tight group-hover:text-blue-700 transition-colors font-playfair">
                                        {item.caption}
                                    </h3>
                                </div>
                            </div>
                        ))}
                        {filteredMedia.length === 0 && <p className="text-gray-400 text-center py-10 col-span-full">No media found in this category.</p>}
                    </div>
                </div>
            )}

            {/* 3. Contact Details Section */}
            {contactEnabled && (
                <section className="bg-gray-50 py-24">
                    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
                        <div className="space-y-4 group">
                            <div className="w-14 h-14 bg-primary text-accent rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:scale-110">📍</div>
                            <h4 className="font-bold text-primary text-xl font-playfair">Visit Us</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">{address}</p>
                        </div>
                        <div className="space-y-4 group">
                            <div className="w-14 h-14 bg-accent text-primary rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:scale-110">📞</div>
                            <h4 className="font-bold text-primary text-xl font-playfair">Call or Email</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">Phone: {phone}<br />Email: {email}</p>
                        </div>
                        <div className="space-y-4 group">
                            <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-2xl text-primary transition-transform group-hover:scale-110">⏰</div>
                            <h4 className="font-bold text-primary text-xl font-playfair">Office Hours</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">Mon - Fri: 8 AM - 4 PM<br />Sat: 9 AM - 12 PM</p>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Lightbox Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-[100] bg-blue-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={() => setSelectedMedia(null)}
                >
                    <button className="absolute top-8 right-8 text-white hover:text-accent transition-colors p-3 bg-white/5 rounded-full">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="max-w-6xl w-full flex flex-col items-center gap-10" onClick={e => e.stopPropagation()}>
                        <div className="relative w-full rounded-[3rem] overflow-hidden shadow-3xl border border-white/10 aspect-video">
                            {selectedMedia.mediaType?.toLowerCase() === 'video' ? (
                                <video
                                    src={selectedMedia.imageUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain bg-black"
                                />
                            ) : (
                                <img src={selectedMedia.imageUrl} className="w-full h-full object-contain" alt={selectedMedia.caption} />
                            )}
                        </div>

                        <div className="text-center space-y-4 max-w-2xl">
                            <div className="flex items-center justify-center gap-4">
                                <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">{selectedMedia.mediaType}</span>
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                                <span className="text-blue-100/60 font-black uppercase tracking-[0.3em] text-xs">{selectedMedia.category}</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight font-playfair">
                                {selectedMedia.caption}
                            </h3>
                            <p className="text-blue-100/40 text-sm leading-relaxed">
                                Captured on campus grounds. All rights reserved by {schoolName}.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;

