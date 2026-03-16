"use client";

import React, { useState, useMemo } from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

const Gallery: React.FC<{ data?: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    const mediaItems = data?.gallery || [];

    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
    const [selectedMedia, setSelectedMedia] = useState<typeof mediaItems[0] | null>(null);

    const filteredMedia = useMemo(() =>
        filter === 'all' ? mediaItems : mediaItems.filter(item => item.mediaType === filter),
        [filter, mediaItems]);

    return (
        <div className="pb-24">
            {/* 1. Immersive Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Gallery Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Visual Chronicles</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">Campus Gallery</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        A vibrant tapestry of moments, achievements, and daily life at {schoolName}.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-24 space-y-16">
                {/* 2. Controls & Filters */}
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

                {/* 3. Responsive Media Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredMedia.map((item) => (
                        <div
                            key={item.key}
                            className="group relative flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-50"
                            onClick={() => setSelectedMedia(item)}
                        >
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={item.imageUrl}
                                    alt={item.caption}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors"></div>

                                {/* Type Badge */}
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                    <span className="text-lg">{item.mediaType === 'video' ? '▶️' : '📷'}</span>
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{item.mediaType}</span>
                                </div>

                                {/* Play Icon for Videos */}
                                {item.mediaType === 'video' && (
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
                            {selectedMedia.mediaType === 'video' ? (
                                <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white space-y-6">
                                    <div className="w-24 h-24 bg-accent text-primary rounded-full flex items-center justify-center text-4xl animate-pulse">▶</div>
                                    <p className="text-xl font-bold tracking-widest uppercase opacity-60">Buffering Media Stream...</p>
                                    <p className="text-sm opacity-40">Sample Video Overlay for {selectedMedia.caption}</p>
                                </div>
                            ) : (
                                <img src={selectedMedia.imageUrl} className="w-full h-full object-cover" alt={selectedMedia.caption} />
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
                                Captured on campus grounds during the 2024 academic cycle. All rights reserved by {schoolName}.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
