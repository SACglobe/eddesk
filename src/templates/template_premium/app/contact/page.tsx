"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button, useIntersectionObserver } from '../../components/Shared';
import Link from 'next/link';
import { isValidImageUrl } from '@/core/utils/url';
import LayoutWrapper from '../../components/LayoutWrapper';
import type { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import ContactForm from '@/components/contact/ContactForm';
import CallbackForm from '@/components/contact/CallbackForm';

interface HeroSlide {
  mediaType: string;
  mediaUrl: string;
  headline: string;
  subheadline: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
}

const Hero: React.FC<{ heroSlide: HeroSlide | null }> = ({ heroSlide }) => {
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => console.warn("Autoplay muted video"));
    }
  }, []);

  return (
    <section className="h-screen relative overflow-hidden bg-signature-navy">
      <div className="absolute inset-0 z-0">
        {heroSlide?.mediaUrl && isValidImageUrl(heroSlide.mediaUrl) && (
          <>
            {heroSlide.mediaType === 'video' ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover scale-110"
              >
                <source
                  src={heroSlide.mediaUrl}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                src={heroSlide.mediaUrl}
                alt={""}
                className="w-full h-full object-cover scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent z-[1]"></div>
          </>
        )}
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-signature-gold/60"></div>
            <p className="text-signature-gold uppercase tracking-[0.8em] text-[10px] md:text-xs font-bold">
              {heroSlide?.subheadline || 'ESTABLISHED MCMLXXXVIII'}
            </p>
          </div>

          <h1 className="text-white text-7xl md:text-[10rem] font-serif leading-[0.9] mb-12 tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            {heroSlide?.headline ?? (
              <>
                The Art of <br />
                <span className="italic text-signature-gold block mt-4">Mastery.</span>
              </>
            )}
          </h1>

          <div className="flex flex-col sm:flex-row gap-12 justify-center items-center mt-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            {heroSlide?.primaryButtonText && (
               <Link href={heroSlide?.primaryButtonUrl || '#'}>
                <Button variant="gold">{heroSlide.primaryButtonText}</Button>
              </Link>
            )}

            {heroSlide?.secondaryButtonText && (
              <Link href={heroSlide.secondaryButtonUrl || '#'}>
                <Button variant="outline">{heroSlide.secondaryButtonText}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {isFilmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-signature-navy/95 backdrop-blur-2xl" onClick={() => setIsFilmOpen(false)}></div>
          <div className="relative w-full max-w-6xl aspect-video bg-black z-[105] shadow-2xl border border-white/50">
            <video autoPlay controls className="w-full h-full">
              <source src={heroSlide?.secondaryButtonUrl || heroSlide?.mediaUrl || "https://assets.mixkit.co/videos/preview/mixkit-university-building-with-a-large-fountain-in-front-4354-large.mp4"} type="video/mp4" />
            </video>
            <button
              onClick={() => setIsFilmOpen(false)}
              className="absolute -top-16 right-0 text-white/50 hover:text-white flex items-center gap-4 group"
            >
              <span className="text-[10px] uppercase tracking-widest">Close screening</span>
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-all duration-500">✕</div>
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-px h-12 bg-gradient-to-b from-signature-gold/50 to-transparent"></div>
        <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold">Scroll to Explore</span>
      </div>
    </section>
  );
};

export default function Contact({ data }: { data: TenantViewModel }) {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  const schoolName = data?.school?.name ?? '';
  const schoolKey = data?.school?.key as string;
  const contact = data?.contactDetails;
  const sections = data?.homepageSections ?? [];

  const heroSection = sections.find(s => s.sectionKey === 'hero');
  const contactSection = sections.find(s => s.sectionKey === 'contactdetails');

  const isHeroActive = heroSection?.isEnabled ?? false;
  const isContactActive = contactSection?.isEnabled ?? false;

  const heroSlide = data?.heroMedia?.[0] ?? null;

  const address = contact?.address;
  const phone = contact?.phone;
  const email = contact?.email;
  const officeHours = contact?.officeHours;
  const mapEmbedUrl = contact?.mapEmbedUrl;

  const hasSocial = !!(contact?.facebook || contact?.instagram || contact?.twitter || contact?.youtube);

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
    <LayoutWrapper>
      <div className="bg-white min-h-screen">
        {/* Home-Style Hero */}
        {isHeroActive && heroSlide && (
          <Hero heroSlide={heroSlide as any} />
        )}

        <section ref={containerRef} className="py-48 px-8 bg-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
              
              {/* Informational Column */}
              <div className="space-y-32">
                {isContactActive && (
                  <>
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                      <div className="flex items-center gap-6 mb-8 text-signature-gold">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent to-signature-gold/60"></div>
                        <span className="text-[10px] uppercase tracking-[0.6em] font-bold">Registry</span>
                      </div>
                      <h2 className="text-6xl md:text-8xl font-serif text-signature-navy mb-16 tracking-tighter leading-none">
                        Institutional <br />Channels.
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      {address && (
                        <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-signature-gold">Campus Secretariat</p>
                          <div className="w-8 h-px bg-signature-navy/10"></div>
                          <p className="text-xl text-signature-navy/70 font-light leading-relaxed serif italic">
                            {address}
                          </p>
                        </div>
                      )}
                      {(phone || email) && (
                        <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-signature-gold">Direct Correspondence</p>
                          <div className="w-8 h-px bg-signature-navy/10"></div>
                          <div className="space-y-2">
                            {phone && <p className="text-2xl font-serif text-signature-navy">{phone}</p>}
                            {email && <p className="text-signature-navy/50 font-light">{email}</p>}
                          </div>
                        </div>
                      )}
                      {officeHours && (
                        <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-signature-gold">Visiting Protocol</p>
                          <div className="w-8 h-px bg-signature-navy/10"></div>
                          <p className="text-lg text-signature-navy/70 font-light italic leading-relaxed">
                            {officeHours}
                          </p>
                        </div>
                      )}
                      {hasSocial && (
                        <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                          <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-signature-gold">Digital Presence</p>
                          <div className="w-8 h-px bg-signature-navy/10"></div>
                          <p className="text-lg text-signature-navy/50 font-light uppercase tracking-widest text-[10px]">
                            Connect via Institutional Socials
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Premium Map Integration */}
                    {canShowMap && (
                      <div className={`space-y-12 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                          <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-signature-navy/5 aspect-video md:aspect-[21/9]">
                            <iframe 
                                src={mapSource} 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={true} 
                                loading="lazy"
                                className="grayscale hover:grayscale-0 transition-all duration-1000"
                            ></iframe>
                          </div>

                           {isMappable && (
                             <a 
                                href={mapEmbedUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-12 group"
                             >
                                <div className="w-20 h-20 rounded-full bg-signature-navy flex items-center justify-center group-hover:bg-signature-gold transition-all duration-500 shadow-2xl">
                                    <svg className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-signature-navy group-hover:text-signature-gold transition-colors">Satellite Navigation Registry →</span>
                             </a>
                           )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Message Column */}
              <div className={`bg-gray-50 border border-signature-navy/5 p-12 md:p-20 rounded-[4rem] shadow-[-20px_20px_60px_rgba(0,0,0,0.02)] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                   <h3 className="text-4xl font-serif text-signature-navy mb-4">Inquiry Dossier.</h3>
                   <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-16 italic">Formal Communication Entry</p>

                   <ContactForm schoolkey={schoolKey} schoolname={schoolName} />

                   <div className="mt-16 pt-16 border-t border-signature-navy/5">
                        <CallbackForm schoolkey={schoolKey} schoolname={schoolName} />
                   </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
