"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface HeroSlide {
    mediaType: string;
    mediaUrl: string;
    headline: string;
    subheadline: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
    isActive: boolean;
    displayOrder: number;
}
export interface HeroSliderProps { slides: HeroSlide[] }

const HeroSlider: React.FC<HeroSliderProps> = ({ slides: rawSlides }) => {
    const slides = rawSlides
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    if (slides.length === 0) return null;

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {slide.mediaType === 'video' ? (
                        <video
                            src={slide.mediaUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${index === current ? 'scale-110' : 'scale-100'
                                }`}
                            style={{ backgroundImage: `url(${slide.mediaUrl})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-white text-4xl md:text-8xl font-bold mb-6 drop-shadow-lg transform transition-all duration-1000 translate-y-0 opacity-100 font-playfair">
                            {slide.headline}
                        </h1>
                        <p className="text-accent text-xl md:text-3xl font-medium mb-12 max-w-2xl drop-shadow-md opacity-90">
                            {slide.subheadline}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href={slide.primaryButtonUrl || '/infrastructure'} className="bg-accent text-primary px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl">
                                {slide.primaryButtonText || 'Explore'}
                            </Link>
                            {slide.secondaryButtonText && (
                                <Link href={slide.secondaryButtonUrl || '/admissions'} className="border-2 border-white/50 backdrop-blur-sm text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all shadow-2xl">
                                    {slide.secondaryButtonText}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-1 transition-all duration-500 rounded-full ${index === current ? 'bg-accent w-16' : 'bg-white/30 w-8 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default HeroSlider;
