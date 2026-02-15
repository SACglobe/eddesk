"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { schoolData } from '../../data';
import { SectionHeader } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';

export default function Portrait() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

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
            setSelectedIndex((selectedIndex + 1) % schoolData.gallery.length);
            setIsLoaded(false);
        }
    }, [selectedIndex]);

    const navigatePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
        e?.stopPropagation();
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + schoolData.gallery.length) % schoolData.gallery.length);
            setIsLoaded(false);
        }
    }, [selectedIndex]);

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

    // Handle safely if no gallery data
    const gallery = schoolData.gallery || [];
    const selectedItem = selectedIndex !== null ? gallery[selectedIndex] : null;

    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-2xl">
                            <SectionHeader title="Institutional Portrait" subtitle="The Signature Gallery" />
                            <h1 className="text-6xl font-serif">A Legacy <span className="italic text-signature-gold">Visualized</span></h1>
                        </div>
                        <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold pb-4 border-b border-signature-navy/10">
                            Authorized Photographic Archive
                        </p>
                    </header>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                        {gallery.map((item, i) => (
                            <div
                                key={i}
                                className="break-inside-avoid overflow-hidden group cursor-pointer bg-signature-navy relative"
                                onClick={() => openLightbox(i)}
                            >
                                <div className="overflow-hidden aspect-auto">
                                    <img
                                        src={item.url}
                                        className="w-full grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-1000 ease-out opacity-80 group-hover:opacity-100"
                                        alt={item.caption}
                                        loading="lazy"
                                    />
                                </div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-signature-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 rounded-full border border-signature-gold/50 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-700">
                                            <svg className="w-4 h-4 text-signature-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                        <span className="text-white text-[9px] uppercase tracking-[0.4em] font-bold">Inspect Archive</span>
                                    </div>
                                </div>
                                {/* Caption Bar */}
                                <div className="p-5 bg-white border-t border-black/5 flex justify-between items-center relative z-10">
                                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Registry No. {1000 + i}</span>
                                    <span className="text-[10px] font-serif italic text-signature-navy/60">{item.caption.split(' ').slice(0, 3).join(' ')}...</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cinematic Lightbox Modal */}
                {selectedItem && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
                        onClick={closeLightbox}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-signature-navy/98 backdrop-blur-3xl cursor-zoom-out" />

                        {/* Progress Indicator */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-[120]">
                            <div
                                className="h-full bg-signature-gold transition-all duration-700 ease-in-out"
                                style={{ width: `${((selectedIndex! + 1) / gallery.length) * 100}%` }}
                            />
                        </div>

                        {/* Controls UI */}
                        <div className="absolute top-10 right-10 z-[130]">
                            <button
                                className="text-white/40 hover:text-signature-gold transition-all flex items-center gap-4 group p-2"
                                onClick={closeLightbox}
                            >
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Exit Archive</span>
                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-signature-gold group-hover:rotate-90 transition-all duration-500">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                aria-label="Previous image"
                            >
                                <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:border-signature-gold group-hover:bg-signature-gold/10 transition-all duration-500">
                                    <svg className="h-6 w-6 md:h-8 md:w-8 text-white/20 group-hover:text-signature-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </div>
                            </button>

                            <button
                                className="pointer-events-auto group flex items-center gap-6"
                                onClick={navigateNext}
                                aria-label="Next image"
                            >
                                <div className="w-14 h-14 md:w-24 md:h-24 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center group-hover:border-signature-gold group-hover:bg-signature-gold/10 transition-all duration-500">
                                    <svg className="h-6 w-6 md:h-8 md:w-8 text-white/20 group-hover:text-signature-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Image Display Area */}
                        <div
                            className="relative max-w-6xl w-full max-h-full flex flex-col items-center justify-center z-[115]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative group/image max-w-full">
                                {!isLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center z-0">
                                        <div className="w-12 h-12 border border-signature-gold/20 border-t-signature-gold rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <img
                                    key={selectedItem.url}
                                    src={selectedItem.url}
                                    alt={selectedItem.caption}
                                    onLoad={() => setIsLoaded(true)}
                                    className={`max-w-full max-h-[65vh] object-contain shadow-[0_0_150px_rgba(0,0,0,0.8)] border border-white/5 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                />
                                {/* Corner Accents */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-signature-gold/40"></div>
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-signature-gold/40"></div>
                            </div>

                            {/* Metadata & Description */}
                            <div className="mt-12 max-w-3xl px-6 text-center animate-in slide-in-from-bottom-8 duration-1000">
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="w-10 h-px bg-signature-gold/30"></div>
                                    <span className="text-signature-gold text-[9px] uppercase tracking-[0.6em] font-bold">
                                        Archive Entry {String(selectedIndex! + 1).padStart(2, '0')}
                                    </span>
                                    <div className="w-10 h-px bg-signature-gold/30"></div>
                                </div>

                                <h4 className="text-white font-serif italic text-3xl md:text-5xl mb-6 leading-tight tracking-tight">
                                    {selectedItem.caption}
                                </h4>

                                <p className="text-white/40 text-base md:text-lg leading-loose font-light max-w-2xl mx-auto mb-10 italic">
                                    {selectedItem.description || "Captured within the historic grounds of Sterling Academy, reflecting the intersection of rigorous thought and architectural beauty."}
                                </p>

                                <div className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold flex flex-col items-center gap-4">
                                    <div className="w-px h-12 bg-white/5"></div>
                                    <span>Institutional Property — Do Not Reproduce</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Hints */}
                        <div className="absolute bottom-10 left-10 z-[130] hidden lg:block">
                            <div className="flex items-center gap-4 text-white/20 text-[9px] uppercase tracking-[0.4em] font-bold">
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 border border-current rounded">ESC</span>
                                    <span className="px-2 py-1 border border-current rounded">←</span>
                                    <span className="px-2 py-1 border border-current rounded">→</span>
                                </div>
                                <span>Navigation Active</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutWrapper>
    );
}
