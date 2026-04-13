"use client";

import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import ContactForm from '@/components/contact/ContactForm';
import CallbackForm from '@/components/contact/CallbackForm';
import HeroSlider from '../../components/HeroSlider';

const Contact: React.FC<{ data?: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? '';
    const schoolKey = data?.school?.key as string;
    const contact = data?.contactDetails;
    const sections = data?.homepageSections ?? [];

    // Check component visibility from templatecomponents
    const heroSection = sections.find(s => s.sectionKey === 'hero');
    const contactSection = sections.find(s => s.sectionKey === 'contactdetails');

    const isHeroActive = heroSection?.isEnabled ?? false;
    const isContactActive = contactSection?.isEnabled ?? false;

    // Get dynamic hero data (active)
    const activeHeroes = (data?.heroMedia ?? [])
        .filter(h => h.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);
    
    // Contact fields
    const address = contact?.address;
    const phone = contact?.phone;
    const email = contact?.email;
    const officeHours = contact?.officeHours;
    const mapEmbedUrl = contact?.mapEmbedUrl;
    
    const hasSocial = !!(contact?.facebook || contact?.instagram || contact?.twitter || contact?.youtube);
    const socialText = [contact?.facebook, contact?.instagram, contact?.twitter, contact?.youtube].filter(Boolean).join(', ');

    // Map Validation & Fallback
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
        mapSource = mapEmbedUrl as string;
    } else if (searchParams) {
        mapSource = `https://maps.google.com/maps?q=${encodeURIComponent(searchParams)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }

    const canShowMap = !!mapSource;

    return (
        <div className="pb-24 bg-gray-50 min-h-screen">
            {/* 1. Home-Style Hero Slider */}
            {isHeroActive && activeHeroes.length > 0 && (
                <HeroSlider slides={activeHeroes} />
            )}

            {/* 2. Main Contact Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-start">
                    <div className="space-y-16">
                        {isContactActive && (
                            <>
                                <div className="space-y-6">
                                    <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Reach Out</span>
                                    <h2 className="text-4xl md:text-5xl font-bold text-primary font-playfair">Direct Channels</h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-12">
                                    {address && (
                                        <div className="space-y-4 group">
                                            <div className="w-14 h-14 bg-primary text-accent rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:scale-110">📍</div>
                                            <h4 className="font-bold text-primary text-xl font-playfair">Main Campus</h4>
                                            <p className="text-gray-500 leading-relaxed text-sm">{address}</p>
                                        </div>
                                    )}
                                    {(phone || email) && (
                                        <div className="space-y-4 group">
                                            <div className="w-14 h-14 bg-accent text-primary rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:scale-110">📞</div>
                                            <h4 className="font-bold text-primary text-xl font-playfair">Contact</h4>
                                            <p className="text-gray-500 leading-relaxed text-sm">
                                                {phone && <>{phone}<br /></>}
                                                {email && <span className="break-all">{email}</span>}
                                            </p>
                                        </div>
                                    )}
                                    {officeHours && (
                                        <div className="space-y-4 group">
                                            <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-2xl text-primary transition-transform group-hover:scale-110">⏰</div>
                                            <h4 className="font-bold text-primary text-xl font-playfair">Visiting Hours</h4>
                                            <p className="text-gray-500 leading-relaxed text-sm">{officeHours}</p>
                                        </div>
                                    )}
                                    {hasSocial && (
                                        <div className="space-y-4 group">
                                            <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110">✉️</div>
                                            <h4 className="font-bold text-primary text-xl font-playfair">Connect Socially</h4>
                                            <p className="text-gray-500 leading-relaxed text-sm italic">{socialText}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Map Area */}
                                <div className="space-y-6">
                                    {canShowMap ? (
                                        <div className="h-96 w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white relative group">
                                            <iframe 
                                                src={mapSource} 
                                                width="100%" 
                                                height="100%" 
                                                style={{ border: 0 }} 
                                                allowFullScreen={true} 
                                                loading="lazy" 
                                                className="grayscale hover:grayscale-0 transition-all duration-700"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <div className="h-96 bg-blue-100 rounded-[3rem] overflow-hidden shadow-inner flex items-center justify-center relative group">
                                            {/* Final fallback if no map at all */}
                                            <div className="relative z-10 bg-white/90 backdrop-blur-md px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-primary shadow-2xl border border-white/50">
                                                Location Map
                                            </div>
                                        </div>
                                    )}

                                    {isMappable && (
                                        <a 
                                            href={mapEmbedUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group"
                                        >
                                            <span className="bg-primary text-white p-2 rounded-lg group-hover:bg-accent transition-colors">🗺️</span>
                                            Open in Google Maps
                                        </a>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden lg:sticky lg:top-32 h-fit">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <h3 className="text-3xl font-bold text-primary mb-10 font-playfair">Send a Message</h3>
                        
                        <ContactForm schoolkey={schoolKey} schoolname={schoolName} />

                        <div className="mt-12 pt-12 border-t border-slate-100">
                            <CallbackForm schoolkey={schoolKey} schoolname={schoolName} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
