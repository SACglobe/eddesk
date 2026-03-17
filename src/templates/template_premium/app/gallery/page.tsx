"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { SectionHeader } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';

export default function GalleryPage({ data }: { data?: TenantViewModel }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    // Validation
    const validation = validateRequiredSections(data, ['gallery']);
    if (!validation.isValid) {
        return null; 
    }

    const allMedia = (data?.gallery ?? [])
        .filter(m => m.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const categories = ['all', ...new Set(allMedia.map(m => m.mediaType?.toLowerCase()).filter(Boolean))];

    const gallery = activeFilter === 'all' 
        ? allMedia 
        : allMedia.filter(m => m.mediaType?.toLowerCase() === activeFilter);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
        document.body.style.overflow = 'auto';
    };

    const navigateNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % gallery.length);
            setIsLoaded(false);
        }
    }, [selectedIndex, gallery.length]);

    const navigatePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length);
            setIsLoaded(false);
        }
    }, [selectedIndex, gallery.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowRight') navigateNext(e);
            if (e.key === 'ArrowLeft') navigatePrev(e);
            if (e.key === 'Escape') closeLightbox();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, navigateNext, navigatePrev]);

    const selectedItem = selectedIndex !== null ? gallery[selectedIndex] : null;

    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-signature-navy">
                    <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-2xl">
                            <SectionHeader title="Institutional Archive" subtitle="Signature Portfolio" />
                            <h1 className="text-6xl font-serif text-signature-navy">A Legacy <span className="italic text-signature-gold">Visualized</span></h1>
                        </div>
                        <div className="flex flex-col items-end gap-6">
                            <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold pb-4 border-b border-signature-navy/10">
                                Official Media Registry
                            </p>
                            {/* Filter System */}
                            {categories.length > 2 && (
                                <div className="flex gap-8">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveFilter(cat)}
                                            className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all pb-2 border-b ${
                                                activeFilter === cat 
                                                ? 'text-signature-gold border-signature-gold' 
                                                : 'text-gray-300 border-transparent hover:text-signature-navy'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                        {gallery.map((item, i) => (
                            <div
                                key={item.key || i}
                                className="break-inside-avoid overflow-hidden group cursor-pointer bg-signature-navy relative border border-black/5"
                                onClick={() => openLightbox(i)}
                            >
                                <div className="overflow-hidden aspect-auto">
                                    <img
                                        src={item.imageUrl}
                                        className="w-full grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-signature-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full border border-signature-gold/30 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-700">
                                            {item.mediaType === 'video' ? (
                                                <svg className="w-6 h-6 text-signature-gold ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-signature-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                            )}
                                        </div>
                                        <span className="text-white text-[9px] uppercase tracking-[0.6em] font-bold">Inspect {item.mediaType}</span>
                                    </div>
                                </div>
                                {/* Caption Bar */}
                                <div className="p-6 bg-white flex justify-between items-center relative z-10 border-t border-black/5">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase tracking-widest text-signature-gold font-bold mb-1">{item.category || 'Portfolio'}</span>
                                        <span className="text-sm font-serif italic text-signature-navy/80">{item.title}</span>
                                    </div>
                                    <span className="text-[9px] text-gray-300 font-bold">#{100 + i}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {gallery.length === 0 && (
                        <div className="py-40 text-center border-t border-black/5">
                             <p className="font-serif italic text-gray-400 text-2xl">The archive is currently being updated.</p>
                        </div>
                    )}
                </div>

                {/* Cinematic Lightbox Modal */}
                {selectedItem && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
                        onClick={closeLightbox}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-signature-navy/98 backdrop-blur-3xl cursor-zoom-out" />

                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-[120]">
                            <div
                                className="h-full bg-signature-gold transition-all duration-700 ease-in-out"
                                style={{ width: `${((selectedIndex! + 1) / gallery.length) * 100}%` }}
                            />
                        </div>

                        {/* Close UI */}
                        <div className="absolute top-10 right-10 z-[130]">
                            <button
                                className="text-white/40 hover:text-signature-gold transition-all flex items-center gap-4 group p-2"
                                onClick={closeLightbox}
                            >
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Exit Archive</span>
                                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-signature-gold group-hover:rotate-90 transition-all duration-700">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 md:px-12 pointer-events-none z-[120]">
                            <button
                                className="pointer-events-auto group flex items-center gap-6"
                                onClick={navigatePrev}
                                aria-label="Previous"
                            >
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:border-signature-gold group-hover:bg-signature-gold/10 transition-all duration-500">
                                    <svg className="h-6 w-6 md:h-8 md:w-8 text-white/20 group-hover:text-signature-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </div>
                            </button>

                            <button
                                className="pointer-events-auto group flex items-center gap-6"
                                onClick={navigateNext}
                                aria-label="Next"
                            >
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:border-signature-gold group-hover:bg-signature-gold/10 transition-all duration-500">
                                    <svg className="h-6 w-6 md:h-8 md:w-8 text-white/20 group-hover:text-signature-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Display Area */}
                        <div
                            className="relative max-w-6xl w-full max-h-full flex flex-col items-center justify-center z-[115]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group/image max-w-full">
                                {selectedItem.mediaType === 'video' ? (
                                    <div className="aspect-video w-[80vw] max-w-full bg-black rounded shadow-2xl overflow-hidden border border-white/10">
                                        <iframe
                                            src={selectedItem.mediaUrl?.replace('watch?v=', 'embed/')}
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {!isLoaded && (
                                            <div className="absolute inset-0 flex items-center justify-center z-0">
                                                <div className="w-12 h-12 border border-signature-gold/20 border-t-signature-gold rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <img
                                            key={selectedItem.imageUrl}
                                            src={selectedItem.imageUrl}
                                            alt={selectedItem.title}
                                            onLoad={() => setIsLoaded(true)}
                                            className={`max-w-full max-h-[60vh] object-contain shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                        />
                                    </>
                                )}
                                
                                <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-signature-gold/40"></div>
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-signature-gold/40"></div>
                            </div>

                            <div className="mt-12 max-w-3xl px-6 text-center animate-in slide-in-from-bottom-8 duration-1000">
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="w-10 h-px bg-signature-gold/30"></div>
                                    <span className="text-signature-gold text-[9px] uppercase tracking-[0.6em] font-bold">
                                        Archive Entry {String(selectedIndex! + 1).padStart(2, '0')}
                                    </span>
                                    <div className="w-10 h-px bg-signature-gold/30"></div>
                                </div>

                                <h4 className="text-white font-serif italic text-3xl md:text-5xl mb-6 leading-tight tracking-tight">
                                    {selectedItem.title}
                                </h4>

                                <p className="text-white/40 text-base md:text-lg leading-loose font-light max-w-2xl mx-auto mb-10 italic">
                                    {selectedItem.description || "Reflecting the intersection of rigorous thought and architectural beauty at our institution."}
                                </p>

                                <div className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold flex flex-col items-center gap-4">
                                    <div className="w-px h-12 bg-white/5"></div>
                                    <span>Institutional Asset — Do Not Reproduce</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                .fade-in { animation: fadeIn 1.2s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </LayoutWrapper>
    );
}
