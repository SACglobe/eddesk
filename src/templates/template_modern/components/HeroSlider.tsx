"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=1920',
        title: 'A Tradition of Excellence',
        description: 'Providing world-class education for over 25 years.'
    },
    {
        image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&q=80&w=1920',
        title: 'Inspiring Future Leaders',
        description: 'Nurturing creativity and innovation in every student.'
    },
    {
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1920',
        title: 'Modern Campus Facilities',
        description: 'Learning environments designed for the 21st century.'
    }
];

const HeroSlider: React.FC = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${index === current ? 'scale-110' : 'scale-100'
                            }`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-white text-4xl md:text-8xl font-bold mb-6 drop-shadow-lg transform transition-all duration-1000 translate-y-0 opacity-100 font-playfair">
                            {slide.title}
                        </h1>
                        <p className="text-accent text-xl md:text-3xl font-medium mb-12 max-w-2xl drop-shadow-md opacity-90">
                            {slide.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/infrastructure" className="bg-accent text-primary px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl">
                                Explore Campus
                            </Link>
                            <Link href="/admissions" className="border-2 border-white/50 backdrop-blur-sm text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all shadow-2xl">
                                Apply Now
                            </Link>
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
