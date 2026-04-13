"use client";
import React, { useState, useEffect } from 'react';
import ContactForm from '@/components/contact/ContactForm';
import CallbackForm from '@/components/contact/CallbackForm';
import { isValidImageUrl } from '@/core/utils/url';

const ContactScreen = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const schoolName = data?.school?.name || '';
    const schoolKey = data?.school?.key;
    const contact = data?.contactDetails;
    const sections = data?.homepageSections ?? [];

    const heroSection = sections.find(s => s.sectionKey === 'hero');
    const contactSection = sections.find(s => s.sectionKey === 'contactdetails');

    const isHeroActive = heroSection?.isEnabled ?? false;
    const isContactActive = contactSection?.isEnabled ?? false;

    const heroSlides = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
    
    const address = contact?.address;
    const phone = contact?.phone;
    const email = contact?.email;
    const officeHours = contact?.officeHours;
    const mapEmbedUrl = contact?.mapEmbedUrl;

    const hasSocial = !!(contact?.facebook || contact?.instagram || contact?.twitter || contact?.youtube);

    const isEmbeddable = mapEmbedUrl?.includes('google.com/maps/embed');
    const isMappable = mapEmbedUrl?.startsWith('https://') && (mapEmbedUrl?.includes('google.com/maps') || mapEmbedUrl?.includes('maps.app.goo.gl'));

    const city = data?.school?.city;
    const state = data?.school?.state;
    // Build a more specific search query: School Name + Address + City + State
    let searchParams = [schoolName, address, city, state].filter(Boolean).join(', ');

    // Smart URL Parsing: Extract location from "Place" links
    if (mapEmbedUrl?.includes('google.com/maps/place/')) {
        const parts = mapEmbedUrl.split('google.com/maps/place/');
        if (parts.length > 1) {
            const queryPart = parts[1].split('/')[0];
            if (queryPart) {
                searchParams = decodeURIComponent(queryPart.replace(/\+/g, ' '));
            }
        }
    }

    let mapSource = "";
    if (isEmbeddable) {
        mapSource = mapEmbedUrl;
    } else if (searchParams) {
        mapSource = `https://maps.google.com/maps?q=${encodeURIComponent(searchParams)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }

    const canShowMap = !!mapSource;

    useEffect(() => {
        if (isHeroActive && heroSlides.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [isHeroActive, heroSlides.length]);

    return (
        <div className="fade-in bg-white min-h-screen pb-24">
            {/* Home-Style Hero Slider */}
            {isHeroActive && heroSlides.length > 0 && (
                <section className="h-[60vh] md:h-[75vh] relative overflow-hidden bg-slate-900 text-center">
                    {heroSlides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                            style={{ transition: 'opacity 1s ease-in-out, transform 10s linear' }}
                        >
                            {slide.mediaUrl && isValidImageUrl(slide.mediaUrl) ? (
                                <>
                                    <img src={slide.mediaUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 z-10" />
                                </>
                            ) : (
                                <div className="w-full h-full bg-emerald-950" />
                            )}
                        </div>
                    ))}

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6">{heroSlides[currentSlide]?.subheadline}</span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 serif tracking-tight leading-tight max-w-5xl">
                            {heroSlides[currentSlide]?.headline}
                        </h1>
                        <div className="h-1 w-20 bg-emerald-400 mx-auto mt-6"></div>
                    </div>

                    {heroSlides.length > 1 && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-12 h-1 transition-all ${idx === currentSlide ? 'bg-emerald-400' : 'bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Details */}
                        <div className="space-y-16">
                            {isContactActive && (
                                <>
                                    {address && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 serif uppercase tracking-widest mb-8 flex items-center gap-4">
                                                <span className="w-8 h-[2px] bg-emerald-900"></span> Institutional Address
                                            </h2>
                                            <div className="p-8 bg-emerald-50 border border-emerald-100 text-emerald-950 leading-relaxed font-medium serif text-lg italic shadow-sm">
                                                {address}
                                            </div>
                                        </div>
                                    )}

                                    {(phone || email || hasSocial) && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 serif uppercase tracking-widest mb-8 flex items-center gap-4">
                                                <span className="w-8 h-[2px] bg-emerald-900"></span> Core Information
                                            </h2>
                                            <div className="space-y-6">
                                                {phone && (
                                                    <div className="flex gap-6 items-center">
                                                        <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center text-emerald-900">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                                        </div>
                                                        <p className="font-bold text-slate-900">{phone}</p>
                                                    </div>
                                                )}
                                                {email && (
                                                    <div className="flex gap-6 items-center">
                                                        <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center text-emerald-900">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                                        </div>
                                                        <p className="font-bold text-slate-900">{email}</p>
                                                    </div>
                                                )}
                                                {hasSocial && (
                                                    <div className="flex gap-6 items-center">
                                                        <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center text-emerald-900 font-bold italic">@</div>
                                                        <p className="font-bold text-slate-900 italic">Socially Connected</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {officeHours && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 serif uppercase tracking-widest mb-8 flex items-center gap-4">
                                                <span className="w-8 h-[2px] bg-emerald-900"></span> Office Hours
                                            </h2>
                                            <p className="p-8 border-l-4 border-emerald-900 bg-emerald-50/50 text-slate-600 font-medium">
                                                {officeHours}
                                            </p>
                                        </div>
                                    )}

                                    {/* Map Integration */}
                                    {(isEmbeddable || isMappable) && (
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900 serif uppercase tracking-widest mb-8 flex items-center gap-4">
                                                <span className="w-8 h-[2px] bg-emerald-900"></span> Institutional Map
                                            </h2>
                                            {canShowMap ? (
                                                <div className="h-80 w-full border border-slate-200 rounded-lg overflow-hidden shadow-inner">
                                                    <iframe 
                                                        src={mapSource} 
                                                        width="100%" 
                                                        height="100%" 
                                                        style={{ border: 0 }} 
                                                        allowFullScreen={true} 
                                                        loading="lazy"
                                                    ></iframe>
                                                </div>
                                            ) : (
                                                <div className="h-80 w-full bg-slate-100 flex items-center justify-center text-slate-400 serif italic border border-slate-200 rounded-lg">
                                                    Interactive Map Available via Link
                                                </div>
                                            )}
                                            {isMappable && (
                                                <a 
                                                    href={mapEmbedUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="mt-6 inline-flex items-center gap-4 text-emerald-900 font-bold uppercase tracking-widest text-xs hover:text-emerald-600 transition-colors"
                                                >
                                                    <span className="bg-emerald-900 text-white p-2">📍</span>
                                                    Open in New Window →
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Formal Contact Form */}
                        <div className="bg-white border border-slate-200 shadow-2xl p-10 md:p-16 border-t-8 border-t-emerald-900 h-fit">
                            <h2 className="text-3xl font-bold text-slate-900 serif uppercase tracking-widest mb-2">Formal Query</h2>
                            <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-12">Communications Registry</p>

                            <ContactForm schoolkey={schoolKey} schoolname={schoolName} />

                            <div className="mt-12 pt-12 border-t border-slate-100">
                                <CallbackForm schoolkey={schoolKey} schoolname={schoolName} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactScreen;
