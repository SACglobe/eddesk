import React, { useState, useEffect } from 'react';
import { isValidImageUrl, resolveImageUrl } from '@/core/utils/url';
import { validateRequiredSections } from '@/core/utils/sectionValidator';

const GalleryScreen = ({ data }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Helper to get component configuration
    const getComponent = (code) => {
        return data?.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    const galleryComp = getComponent('gallery');
    const heroComp = getComponent('hero');

    // Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) {
        return null; // The parent (TemplateRenderer) handles SystemPopup via TenantContext if state is set, 
                     // but here we just return null to avoid rendering incomplete UI.
                     // The TemplateRenderer actually checks for state.
    }

    // Hero Data
    const heroSlides = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    // Gallery Data
    const allMedia = (data?.gallery ?? [])
        .filter(m => m.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const categories = ['all', ...new Set(allMedia.map(m => m.mediaType?.toLowerCase()).filter(Boolean))];

    const filteredMedia = activeFilter === 'all' 
        ? allMedia 
        : allMedia.filter(m => m.mediaType?.toLowerCase() === activeFilter);

    const schoolName = data.school?.name || 'Our Institution';

    useEffect(() => {
        if (heroSlides.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [heroSlides.length]);

    const openLightbox = (media) => setSelectedMedia(media);
    const closeLightbox = () => setSelectedMedia(null);

    return (
        <div className="fade-in bg-white min-h-screen">
            {/* 1. Hero Section */}
            {heroSlides.length > 0 ? (
                <section className="h-[50vh] relative overflow-hidden bg-slate-900">
                    {heroSlides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                        >
                            {slide.mediaUrl && (
                                <>
                                    <img src={slide.mediaUrl} alt={slide.headline || `${schoolName} Gallery`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 z-10" />
                                </>
                            )}
                        </div>
                    ))}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">{schoolName} Archive</span>
                        <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest mb-6">
                            {heroSlides[currentSlide]?.headline || `${schoolName} Gallery`}
                        </h1>
                        <div className="h-1 w-20 bg-emerald-400 mx-auto"></div>
                    </div>
                </section>
            ) : (
                <section className="bg-emerald-900 py-24 text-center">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <span className="text-emerald-300 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">{schoolName} Portraits</span>
                        <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest">{schoolName} Gallery</h1>
                        <div className="h-1 w-20 bg-emerald-400 mx-auto mt-8"></div>
                    </div>
                </section>
            )}

            {/* 2. Media Filter & Grid */}
            <section className="py-24">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    {/* Filters */}
                    {categories.length > 2 && (
                        <div className="flex flex-wrap justify-center gap-8 mb-16">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`text-[10px] font-bold uppercase tracking-[0.3em] pb-2 border-b-2 transition-all ${
                                        activeFilter === cat 
                                        ? 'text-emerald-900 border-emerald-900' 
                                        : 'text-slate-400 border-transparent hover:text-slate-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredMedia.map((item, idx) => (
                            <div 
                                key={item.key || idx}
                                className="group relative aspect-square overflow-hidden bg-slate-100 cursor-pointer"
                                onClick={() => openLightbox(item)}
                            >
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title || 'Gallery item'} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/40 transition-all duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center">
                                        {item.mediaType === 'video' ? (
                                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                                        )}
                                    </div>
                                </div>
                                {(item.title || item.category) && (
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-emerald-900/90 text-white">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-1">{item.category}</p>
                                        <h3 className="text-sm font-bold serif truncate uppercase">{item.title}</h3>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredMedia.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed border-slate-100">
                            <p className="text-slate-400 serif italic">No media found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. Lightbox */}
            {selectedMedia && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm animate-in fade-in duration-300">
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>

                    <div className="max-w-6xl w-full max-h-[85vh] relative group">
                        {selectedMedia.mediaType === 'video' ? (
                            <div className="aspect-video bg-black rounded shadow-2xl overflow-hidden">
                                <iframe
                                    src={selectedMedia.mediaUrl?.replace('watch?v=', 'embed/')}
                                    className="w-full h-full"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <div className="relative">
                                <img 
                                    src={selectedMedia.imageUrl} 
                                    alt={selectedMedia.title}
                                    className="w-full h-auto max-h-[80vh] object-contain shadow-2xl border border-white/10"
                                />
                            </div>
                        )}
                        <div className="mt-8 text-center">
                             <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">{selectedMedia.category || 'Portfolio'}</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-white serif uppercase tracking-widest">{selectedMedia.title || 'Campus Moment'}</h2>
                            {selectedMedia.description && (
                                <p className="mt-4 text-slate-400 italic text-lg max-w-2xl mx-auto">{selectedMedia.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .fade-in { animation: fadeIn 1s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
};

export default GalleryScreen;
