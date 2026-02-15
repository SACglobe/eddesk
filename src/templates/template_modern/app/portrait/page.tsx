"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { SCHOOL_NAME } from '../../constants';

const BATCH_SIZE = 6;
const INITIAL_LOAD = 12;

// Pool of high-quality Unsplash school-related images
const IMAGE_POOL = [
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1507537362145-9f71485a0ce6?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1600"
];

const categories = ['All', 'Campus', 'Sports', 'Events', 'Classroom'];

const Portrait: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [images, setImages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Helper to generate a batch of images
    const generateImages = useCallback((count: number, startIndex: number) => {
        return Array.from({ length: count }, (_, i) => {
            const id = startIndex + i;
            // Cycle through our high quality pool
            const poolIndex = id % IMAGE_POOL.length;
            return {
                id,
                url: IMAGE_POOL[poolIndex],
                category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
                title: `Campus Excellence Moment ${id + 1}`
            };
        });
    }, []);

    // Initial load
    useEffect(() => {
        setImages(generateImages(INITIAL_LOAD, 0));
    }, [generateImages]);

    // Handle loading more
    const loadMore = useCallback(() => {
        if (isLoading) return;
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setImages(prev => [...prev, ...generateImages(BATCH_SIZE, prev.length)]);
            setIsLoading(false);
        }, 800);
    }, [isLoading, generateImages]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [loadMore]);

    const filteredImages = useMemo(() =>
        filter === 'All' ? images : images.filter(img => img.category === filter),
        [filter, images]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev! + 1) % filteredImages.length);
    }, [selectedIndex, filteredImages.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
    }, [selectedIndex, filteredImages.length]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (event.key === 'Escape') setSelectedIndex(null);
            if (event.key === 'ArrowRight') handleNext();
            if (event.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedIndex]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
            <div className="text-center space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold text-primary font-playfair">Campus Portrait</h1>
                <p className="text-gray-500 text-xl max-w-2xl mx-auto">Visual stories of growth, laughter, and achievement at {SCHOOL_NAME}.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setFilter(cat);
                            setSelectedIndex(null);
                        }}
                        className={`px-10 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg ${filter === cat ? 'bg-primary text-accent' : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredImages.map((img, index) => (
                    <div key={img.id} className="flex flex-col gap-6 group">
                        {/* Image Container */}
                        <div
                            className="relative overflow-hidden rounded-[2.5rem] shadow-xl group-hover:shadow-2xl aspect-square cursor-zoom-in transition-all duration-500 group-hover:-translate-y-2"
                            onClick={() => setSelectedIndex(index)}
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                loading="lazy"
                                className="w-full h-full object-cover scale-100 group-hover:scale-105 brightness-100 group-hover:brightness-110 transition-all duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center flex-col p-10 text-center">
                                <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary font-black shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Caption */}
                        <div className="px-2 space-y-2 transform transition-transform duration-500 group-hover:translate-x-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block group-hover:bg-yellow-100 group-hover:text-yellow-700 transition-colors">
                                {img.category}
                            </span>
                            <h3 className="text-xl font-bold text-primary leading-tight group-hover:text-blue-700 transition-colors font-playfair">
                                {img.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Infinite Scroll Trigger & Loader */}
            <div ref={loaderRef} className="py-20 flex flex-col items-center justify-center space-y-4">
                {isLoading && (
                    <>
                        <div className="w-12 h-12 border-4 border-primary/10 border-t-accent rounded-full animate-spin"></div>
                        <p className="text-primary/40 font-black uppercase tracking-[0.3em] text-[10px]">Loading more stories...</p>
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-primary/98 backdrop-blur-md transition-all duration-300"
                    onClick={() => setSelectedIndex(null)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-[110] p-2 rounded-full hover:bg-white/10"
                        onClick={() => setSelectedIndex(null)}
                        aria-label="Close"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-all z-[110] p-4 rounded-full hover:bg-white/10 hidden sm:block"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-all z-[110] p-4 rounded-full hover:bg-white/10 hidden sm:block"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div
                        className="relative max-w-6xl w-full flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative group w-full flex justify-center">
                            <img
                                src={filteredImages[selectedIndex].url}
                                alt={filteredImages[selectedIndex].title}
                                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20 select-none animate-in zoom-in-95 duration-300"
                            />
                        </div>

                        <div className="mt-8 text-center space-y-3 bg-black/20 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 w-full md:w-auto">
                            <div className="flex items-center justify-center gap-4 text-accent mb-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">{filteredImages[selectedIndex].category}</span>
                                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{selectedIndex + 1} / {filteredImages.length}</span>
                            </div>
                            <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight font-playfair">{filteredImages[selectedIndex].title}</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portrait;
