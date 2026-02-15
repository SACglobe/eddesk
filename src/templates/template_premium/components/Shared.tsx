"use client";

import React, { useState, useEffect, useRef } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [options]);

    return { containerRef, isVisible };
};

export const SectionHeader: React.FC<{ title: string; subtitle?: string; light?: boolean; center?: boolean }> = ({ title, subtitle, light, center }) => (
    <div className={`mb-16 ${light ? 'text-white' : 'text-signature-navy'} ${center ? 'text-center' : ''}`}>
        <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight tracking-tight">{title}</h2>
        {subtitle && (
            <p className={`uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold ${light ? 'text-signature-gold' : 'text-signature-gold'}`}>
                {subtitle}
            </p>
        )}
        <div className={`mt-8 w-16 h-px bg-signature-gold ${center ? 'mx-auto' : ''}`}></div>
    </div>
);

export const Card: React.FC<{ title: string; image: string; description?: string; tag?: string }> = ({ title, image, description, tag }) => (
    <div className="group overflow-hidden relative bg-white border border-black/5 hover:border-signature-gold/40 transition-all duration-700 shadow-sm hover:shadow-2xl">
        <div className="aspect-[3/4] overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" loading="lazy" />
            <div className="absolute inset-0 bg-signature-navy/10 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>
        <div className="p-10 relative bg-white">
            <div className="absolute top-0 right-10 w-px h-10 bg-signature-gold/20 -translate-y-full"></div>
            {tag && <span className="text-[9px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4 block">{tag}</span>}
            <h3 className="text-2xl font-serif mb-4 tracking-tight group-hover:text-signature-gold transition-colors">{title}</h3>
            {description && <p className="text-sm text-gray-500 leading-relaxed font-light line-clamp-3">{description}</p>}
        </div>
    </div>
);

export const Button: React.FC<{ children: React.ReactNode; variant?: 'primary' | 'outline' | 'gold' }> = ({ children, variant = 'primary' }) => {
    const baseClasses = "px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 relative overflow-hidden group";
    const variants = {
        primary: "bg-signature-navy text-white hover:bg-signature-navy/90",
        outline: "border border-signature-navy text-signature-navy hover:bg-signature-navy hover:text-white",
        gold: "bg-signature-gold text-white hover:bg-signature-navy"
    };

    return (
        <button className={`${baseClasses} ${variants[variant]}`}>
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
    );
};

export const StatCounter: React.FC<{ target: number; suffix: string; label: string }> = ({ target, suffix, label }) => {
    const [count, setCount] = useState(0);
    const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start * 10) / 10);
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isVisible, target]);

    return (
        <div ref={containerRef} className="text-center p-8 border-r border-white/5 last:border-0">
            <div className="text-5xl md:text-7xl font-serif text-signature-gold mb-4 leading-none">
                {count}{suffix}
            </div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">{label}</div>
        </div>
    );
};

export const TestimonialSlider: React.FC<{ testimonials: any[] }> = ({ testimonials }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="relative overflow-hidden py-24 bg-signature-navy text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="text-signature-gold text-6xl font-serif opacity-30 mb-8 select-none">“</div>
                <div className="min-h-[300px] flex items-center justify-center">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className={`absolute inset-x-0 transition-all duration-1000 transform ${i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                                }`}
                        >
                            <p className="text-2xl md:text-4xl font-serif italic mb-12 leading-relaxed px-4 md:px-0">
                                {t.text}
                            </p>
                            <h4 className="text-lg font-bold tracking-tight text-signature-gold">{t.name}</h4>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-2 font-bold">{t.role}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4 mt-12">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-signature-gold w-8' : 'bg-white/10'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
