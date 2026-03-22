"use client";

import React from 'react';
import { SectionHeader, Button } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import AdmissionForm from '@/components/admission/AdmissionForm';
import AdmissionInstructions from '@/components/admission/AdmissionInstructions';
import { motion } from 'framer-motion';
import { isValidImageUrl } from '@/core/utils/url';
import { useRef, useState, useEffect } from 'react';

const Hero: React.FC<{ heroSlide: any }> = ({ heroSlide }) => {
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
            <Button variant="gold">{heroSlide?.primaryButtonText || 'Institutional Prospectus'}</Button>

            {heroSlide?.secondaryButtonText && (
              <Button variant="outline">{heroSlide.secondaryButtonText}</Button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-px h-12 bg-gradient-to-b from-signature-gold/50 to-transparent"></div>
        <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold">Scroll to Explore</span>
      </div>
    </section>
  );
};

export default function Admissions({ data }: { data?: TenantViewModel }) {
    const schoolName = data?.school?.name ?? 'The Academy';
    const admissionInstructions = data?.admissionInstructions ?? [];
    const schoolKey = data?.school?.key ?? '';
    
    // Check if section is enabled in config
    const sections = data?.homepageSections ?? [];
    const section = sections.find((s: any) => s.sectionKey === 'admission' || s.sectionKey === 'admissions');
    const isEnabled = section?.isEnabled ?? true;

    if (!isEnabled) return null;

    return (
        <LayoutWrapper>
            <div className="bg-signature-ivory min-h-screen">
                {/* 1. Hero Section (Same as Home) */}
                <Hero heroSlide={data?.heroMedia?.[0] || null} />

                {/* 2. Form Section */}
                <div className="py-32 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-signature-navy/5 -skew-y-3 origin-top-left" />
                    
                    <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl font-serif mb-6">Online Enrollment Portal</h2>
                            <p className="text-signature-navy/40 uppercase tracking-[0.4em] text-[10px] font-bold">Confidential Registry Protocol Active</p>
                        </div>
                        
                        <div className="max-w-4xl mx-auto">
                            <AdmissionForm schoolkey={schoolKey} schoolname={schoolName} />
                        </div>
                    </div>
                </div>

                {/* 3. Instructions Section */}
                {admissionInstructions.length > 0 && (
                    <div className="bg-white/50 border-t border-signature-gold/10">
                        <AdmissionInstructions steps={admissionInstructions} schoolName={schoolName} />
                    </div>
                )}

                {/* 4. Support Banner */}
                <div className="py-24 bg-signature-navy text-white text-center rounded-t-[4rem]">
                    <div className="max-w-4xl mx-auto px-8">
                        <h3 className="text-3xl font-serif mb-6 text-signature-gold">Registry Assistance</h3>
                        <p className="text-white/50 mb-12 font-light leading-relaxed">Our coordinators are available for guidance throughout the enrollment cycle.</p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
                            <div className="group cursor-pointer">
                                <p className="text-[10px] uppercase tracking-[0.4em] text-signature-gold mb-2 font-bold opacity-50 group-hover:opacity-100 transition-opacity">Direct Line</p>
                                <a href={`tel:${data?.school?.phone}`} className="text-2xl font-serif">{data?.school?.phone || '+91 98765 43210'}</a>
                            </div>
                            <div className="group cursor-pointer">
                                <p className="text-[10px] uppercase tracking-[0.4em] text-signature-gold mb-2 font-bold opacity-50 group-hover:opacity-100 transition-opacity">Registry Desk</p>
                                <a href={`mailto:${data?.school?.email}`} className="text-2xl font-serif">{data?.school?.email || 'registry@academy.com'}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
