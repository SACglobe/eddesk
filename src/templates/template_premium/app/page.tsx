"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SectionHeader, Card, Button, StatCounter, TestimonialSlider, useIntersectionObserver } from '../components/Shared';
import Link from 'next/link';
import NextImage from 'next/image';
import { isValidImageUrl, formatHeroUrl } from '@/core/utils/url';
import LayoutWrapper from '../components/LayoutWrapper';
import type { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { evaluateFilters } from '@/core/utils/filterEngine';

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

const Hero: React.FC<{ heroSlide: HeroSlide | null; schoolName: string }> = ({ heroSlide, schoolName }) => {
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
              <NextImage
                src={heroSlide.mediaUrl}
                alt={heroSlide.headline || `${schoolName} Hero Image`}
                fill
                className="object-cover scale-110"
                priority
                sizes="100vw"
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
              {heroSlide?.subheadline || `${schoolName} — Excellence in Education`}
            </p>
          </div>

          <h1 className="text-white text-7xl md:text-[10rem] font-serif leading-[0.9] mb-12 tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            {heroSlide?.headline ?? (
              <>
                {schoolName} <br />
                <span className="italic text-signature-gold block mt-4">Legacy.</span>
              </>
            )}
          </h1>

          <div className="flex flex-col sm:flex-row gap-12 justify-center items-center mt-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            {formatHeroUrl(heroSlide?.primaryButtonUrl) && (heroSlide?.primaryButtonText || schoolName) && (
              <Link href={formatHeroUrl(heroSlide?.primaryButtonUrl)}>
                <Button variant="gold">{heroSlide?.primaryButtonText || `Join ${schoolName}`}</Button>
              </Link>
            )}

            {formatHeroUrl(heroSlide?.secondaryButtonUrl) && heroSlide?.secondaryButtonText && (
              <Link href={formatHeroUrl(heroSlide.secondaryButtonUrl)}>
                <Button variant="outline">{heroSlide.secondaryButtonText}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {isFilmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-signature-navy/95 backdrop-blur-2xl" onClick={() => setIsFilmOpen(false)}></div>
          <div className="relative w-full max-w-6xl aspect-video bg-black z-[105] shadow-2xl border border-white/5">
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

const InstitutionalStats: React.FC<{
  academicResultsEnabled: boolean;
  latestAcademicResult: any;
  achievementsEnabled: boolean;
  academicAchievements: any[];
}> = ({ academicResultsEnabled, latestAcademicResult, achievementsEnabled, academicAchievements }) => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  if (!((academicResultsEnabled && latestAcademicResult) || (achievementsEnabled && academicAchievements.length > 0))) return null;

  return (
    <section ref={containerRef} className="bg-white border-b border-signature-navy/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-signature-navy/5 -translate-x-1/2 z-10"></div>

        {academicResultsEnabled && latestAcademicResult && (
          <div className={`py-24 px-8 lg:pr-24 lg:pl-16 bg-[#F0F7FF] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-signature-gold"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold">Scholastic Records</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-signature-navy mb-12 leading-tight tracking-tight">Honors & Results</h2>

            <div className="mb-12">
              <h3 className="text-2xl font-serif text-signature-navy mb-2">Board Results {latestAcademicResult.year || '—'}</h3>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Academic Merit Summary</p>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-signature-navy/5 pb-4">
                <span className="text-[11px] uppercase tracking-widest font-bold text-signature-navy/60">Pass Percentage</span>
                <span className="text-5xl font-serif text-signature-navy">{latestAcademicResult.passPercentage ?? 0}%</span>
              </div>
              <div className="flex justify-between items-end border-b border-signature-navy/5 pb-4">
                <span className="text-[11px] uppercase tracking-widest font-bold text-signature-navy/60">Distinctions</span>
                <span className="text-5xl font-serif text-signature-gold">{latestAcademicResult.distinctions ?? 0}%</span>
              </div>
              <div className="flex justify-between items-end border-b border-signature-navy/5 pb-4">
                <span className="text-[11px] uppercase tracking-widest font-bold text-signature-navy/60">First Class</span>
                <span className="text-5xl font-serif text-signature-navy">{latestAcademicResult.firstClass ?? 0}%</span>
              </div>
            </div>

            {latestAcademicResult.legacyQuote && (
              <p className="mt-12 text-lg text-signature-navy/60 font-serif italic leading-relaxed">
                "{latestAcademicResult.legacyQuote}"
              </p>
            )}
          </div>
        )}

        {achievementsEnabled && academicAchievements.length > 0 && (
          <div className={`py-24 px-8 lg:pl-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-signature-navy/20"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Institutional Excellence</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-signature-navy mb-16 tracking-tight">Merits & Achievements</h2>

            <div className="space-y-20 mb-20">
              {academicAchievements.slice(0, 2).map((item, i) => (
                <div key={i} className="flex gap-12 group">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-signature-gold mb-2">Year</span>
                    <span className="text-4xl font-serif text-signature-navy group-hover:text-signature-gold transition-colors">{item.year}</span>
                    {i < academicAchievements.slice(0, 2).length - 1 && (
                      <div className="w-px flex-grow bg-signature-navy/5 mt-4"></div>
                    )}
                  </div>
                  <div className="flex-grow pt-2 text-left">
                    <span className="inline-block bg-signature-gold/10 text-signature-gold text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                      {item.category || "Institutional Recognition"}
                    </span>
                    <h4 className="text-2xl font-serif mb-4 text-signature-navy group-hover:text-signature-gold transition-colors">{item.title}</h4>
                    <p className="text-base text-gray-500 leading-loose">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-full bg-signature-navy flex items-center justify-center group-hover:bg-signature-gold transition-all duration-500 shadow-2xl">
                <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-navy group-hover:text-signature-gold transition-colors">Know more about our heritage</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

interface DashboardProps {
  statistics: Array<{ label: string; value: string; icon: string; displayOrder: number }>;
  statsEnabled: boolean;
  statsRequired: boolean;
}

const SchoolDashboard: React.FC<DashboardProps> = ({ statistics, statsEnabled, statsRequired }) => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const SVG_ICON_MAP: Record<string, React.ReactNode> = {
    users: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    graduation: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    calendar: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    map: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    trophy: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138" />
      </svg>
    ),
    network: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };

  const DEFAULT_SVG = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  const getSvgIcon = (name: string) => SVG_ICON_MAP[name] ?? DEFAULT_SVG;

  if (!statsEnabled || statistics.length === 0) return null;

  return (
    <section ref={containerRef} className="bg-[#F0F7FF] py-24 px-8 border-b border-signature-navy/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {statistics.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center text-center px-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-${i * 150} lg:border-r last:border-0 border-signature-navy/10`}>
              <div className="text-signature-gold mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                {getSvgIcon(stat.icon)}
              </div>
              <div className="text-5xl md:text-6xl font-serif text-signature-navy mb-4 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold whitespace-nowrap">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface FacultyMember {
  name: string;
  designation: string;
  photoUrl: string;
  bio: string;
  displayOrder: number;
  isFeatured: boolean;
}

interface FacultyHighlightsProps {
  faculty: FacultyMember[];
  facultyEnabled: boolean;
  facultyRequired: boolean;
}

const FacultyHighlights: React.FC<FacultyHighlightsProps> = ({ faculty, facultyEnabled, facultyRequired }) => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  if (!facultyEnabled || faculty.length === 0) return null;


  return (
    <section ref={containerRef} className="py-48 px-8 bg-white border-b border-signature-navy/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div>
            <SectionHeader title="Intellectual Capital" subtitle="Our Distinguished Faculty" />
            <p className="text-xl text-signature-navy/50 max-w-md font-light italic leading-relaxed mt-4">
              Mentors dedicated to fostering excellence and innovation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {faculty.map((edu, i) => (
            <div key={i} className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden mb-8">
                {edu.photoUrl && isValidImageUrl(edu.photoUrl) && (
                  <img src={edu.photoUrl} alt={`${edu.name} - Faculty`} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                )}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-signature-gold/30"></div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4 block">{edu.designation || ''}</span>
              <h3 className="text-3xl font-serif mb-6 group-hover:text-signature-gold transition-colors">{edu.name || ''}</h3>
              <p className="text-gray-500 font-light leading-relaxed mb-8">{edu.bio || ''}</p>
              <div className="w-8 h-px bg-signature-navy/20 group-hover:w-16 group-hover:bg-signature-gold transition-all duration-700"></div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

interface SportAchievement {
  title: string;
  category: string;
  photoUrl: string;
  description: string;
  year: number;
  displayOrder: number;
}

interface AthleticExcellenceProps {
  sportsAchievements: SportAchievement[];
  sportsEnabled: boolean;
  sportsRequired: boolean;
}

const AthleticExcellence: React.FC<AthleticExcellenceProps> = ({ sportsAchievements, sportsEnabled, sportsRequired }) => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  if (!sportsEnabled || sportsAchievements.length === 0) return null;

  return (
    <section ref={containerRef} className="py-48 px-8 bg-signature-ivory border-b border-signature-navy/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div>
            <SectionHeader title="Athletic Excellence" subtitle="Sports & Physical Achievements" />
            <p className="text-xl text-signature-navy/50 max-w-md font-light italic leading-relaxed mt-4">
              Nurturing champions on and off the field through competitive spirit and physical discipline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {sportsAchievements.map((sport, i) => (
            <div key={i} className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden mb-8">
                {sport.photoUrl && isValidImageUrl(sport.photoUrl) ? (
                  <img src={sport.photoUrl} alt={sport.title} className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-signature-ivory">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-signature-navy/20"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M8 21h8m-4-4v4M7 7H4a2 2 0 00-2 2v1a4 4 0 004 4h.5
                        M17 7h3a2 2 0 012 2v1a4 4 0 01-4 4h-.5
                        M7 7V5a5 5 0 0110 0v2M7 7h10" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-signature-gold/30"></div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4 block">{sport.category}</span>
              <h3 className="text-3xl font-serif mb-6 group-hover:text-signature-gold transition-colors">{sport.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed mb-8">{sport.description}</p>
              <div className="w-8 h-px bg-signature-navy/20 group-hover:w-16 group-hover:bg-signature-gold transition-all duration-700"></div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link href="/activities">
            <Button variant="outline">View All Achievements</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface FacilityGroup {
  categoryName: string;
  items: Array<{ name: string; description: string }>;
}

interface CampusFacilitiesProps {
  facilityGroups: FacilityGroup[];
  facilitiesEnabled: boolean;
  facilitiesRequired: boolean;
}

const CampusFacilities: React.FC<CampusFacilitiesProps> = ({ facilityGroups, facilitiesEnabled, facilitiesRequired }) => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  if (!facilitiesEnabled || facilityGroups.length === 0) return null;

  return (
    <section ref={containerRef} className="py-48 px-8 bg-white border-b border-signature-navy/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <SectionHeader title="Campus Infrastructure" subtitle="Facilities & Learning Spaces" />
          <Link href="/infrastructure">
            <Button variant="outline">Tour The Campus</Button>
          </Link>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(facilityGroups.length, 4)} gap-0 border border-signature-navy/5`}>
          {facilityGroups.map((group, i) => (
            <div
              key={i}
              className={`
                px-12 py-16 border-r last:border-r-0 border-signature-navy/5
                transition-all duration-1000
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold mb-6">
                {group.categoryName}
              </p>
              <div className="w-full h-px bg-signature-gold/20 mb-10"></div>
              <ul className="space-y-6">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 group/item">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-signature-gold/60 flex-shrink-0
                                     group-hover/item:bg-signature-gold transition-colors"></span>
                    <span className="text-signature-navy/70 font-light leading-relaxed
                                     group-hover/item:text-signature-navy transition-colors">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UpcomingEvents: React.FC<{ eventsToShow: any[], eventsEnabled: boolean, eventsRequired: boolean }> = ({ eventsToShow, eventsEnabled, eventsRequired }) => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  if (!eventsEnabled || eventsToShow.length === 0) return null;

  const formatEventDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = d.getDate();
    return `${month} ${day}`;
  };

  return (
    <section ref={containerRef} className="bg-signature-navy text-white py-48 px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-signature-gold/5 -skew-x-12 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Events & Updates" subtitle="Institutional Calendar" light center />

        <div className="mt-24 space-y-0 border-t border-white/10">
          {eventsToShow.map((event: any, i: number) => (
            <Link
              key={event.id}
              href="/events"
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10 group hover:bg-white/[0.02] transition-all duration-700 px-4 md:px-8 block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="md:col-span-3">
                <div className="text-signature-gold font-serif italic text-3xl mb-2">{formatEventDate(event.eventDate)}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{event.category}</div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-3xl font-serif mb-4 group-hover:text-signature-gold transition-colors">{event.title}</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed line-clamp-2">{event.description}</p>
              </div>
              <div className="md:col-span-2 flex items-center justify-end">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-signature-gold group-hover:bg-signature-gold/10 transition-all duration-500">
                  <svg className="w-5 h-5 text-white/20 group-hover:text-signature-gold transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={`mt-24 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/events">
            <span className="inline-block px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-signature-navy transition-all duration-500">
              View Full Calendar
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function Home({ data }: { data: TenantViewModel }) {
  const { containerRef: introRef, isVisible: introVisible } = useIntersectionObserver({ threshold: 0.1 });

  // 1. Hero
  const getComponent = (code: string) => {
    return data?.components?.find(c =>
      c.componentCode?.toLowerCase() === code.toLowerCase()
    );
  };

  // 1. Hero
  const heroComp = getComponent('hero');
  const heroEnabled = heroComp?.isActive ?? true;
  const heroRequired = heroComp?.isRequired ?? false;
  const heroSlide = data?.heroMedia?.[0] ?? null;

  // 2. Academic Results
  const academicComp = getComponent('academics') || getComponent('academicresults');
  const academicResultsEnabled = academicComp?.isActive ?? true;
  const academicResultsRequired = academicComp?.isRequired ?? false;
  const academicResults = (data?.academicResults ?? []).sort((a, b) => b.year - a.year);
  const latestAcademicResult = academicResults[0] ?? null;

  // 3. Achievements (Split into Academic and Sports)
  const achievementsComp = getComponent('achievements') || getComponent('schoolachievements');
  const achievementsEnabled = achievementsComp?.isActive ?? true;
  const achievementsRequired = achievementsComp?.isRequired ?? false;
  const academicAchievements = (data?.schoolAchievements ?? [])
    .filter(a => a.category?.toLowerCase() === 'academic')
    .sort((a, b) => b.year - a.year || (a.displayOrder || 0) - (b.displayOrder || 0));

  // 4. Leadership
  const leadershipComp = getComponent('leadership') || getComponent('governance') || getComponent('principalmessage');
  const leadershipEnabled = leadershipComp?.isActive ?? true;
  const leadershipRequired = leadershipComp?.isRequired ?? false;
  const leadership = [...(data?.principal || []), ...(data?.chairman || [])];

  // 5. Statistics Dashboard
  const statsComp = getComponent('stats') || getComponent('schoolstats') || getComponent('stats_premium');
  const statsEnabled = statsComp?.isActive ?? true;
  const statsRequired = statsComp?.isRequired ?? false;
  const statisticsList = (data?.stats ?? []).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // 6. Faculty
  const facultyComp = getComponent('faculty');
  const facultyEnabled = facultyComp?.isActive ?? true;
  const facultyRequired = facultyComp?.isRequired ?? false;
  const facultyList = (data?.faculty ?? [])
    .filter(p => p.isActive)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // 7. Sports (Athletic Excellence)
  const sportsComp = getComponent('sports');
  const sportsEnabled = sportsComp?.isActive ?? true;
  const sportsRequired = sportsComp?.isRequired ?? false;
  const sportsAchievements = evaluateFilters(data?.schoolAchievements ?? [], sportsComp?.config?.filters || { category: 'sports' })
    .sort((a, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .map(a => ({
      ...a,
      photoUrl: a.imageUrl // Fix type mismatch for SportAchievement
    })) as any;

  // 8. Facilities
  const facilitiesComp = getComponent('infrastructure') || getComponent('facilities');
  const facilitiesEnabled = facilitiesComp?.isActive ?? true;
  const facilitiesRequired = facilitiesComp?.isRequired ?? false;
  const infrastructure = (data?.infrastructure ?? []).filter(i => i.isActive);

  const groupedFacilities = infrastructure.reduce((acc: any, f: any) => {
    const key = f.categoryName;
    if (!acc[key]) acc[key] = { categoryName: key, items: [] };
    acc[key].items.push(f);
    return acc;
  }, {});
  const facilityGroups = Object.values(groupedFacilities) as any[];

  // 9. Gallery
  const galleryComp = getComponent('gallery');
  const galleryEnabled = galleryComp?.isActive ?? true;
  const galleryRequired = galleryComp?.isRequired ?? false;
  const galleryItems = evaluateFilters(data?.gallery ?? data?.mediaLibrary ?? [], galleryComp?.config?.filters)
    .slice(0, 3);

  // 10. Events
  const eventsComp = getComponent('events');
  const eventsEnabled = eventsComp?.isActive ?? true;
  const eventsRequired = eventsComp?.isRequired ?? false;
  const now = new Date();
  const eventsToShow = (data?.events ?? [])
    .filter((e: any) => {
      const eventDateTime = new Date(`${e.eventDate}T${e.startTime || '00:00:00'}Z`);
      return eventDateTime > now;
    })
    .sort((a: any, b: any) =>
      new Date(`${a.eventDate}T${a.startTime || '00:00:00'}Z`).getTime() -
      new Date(`${b.eventDate}T${b.startTime || '00:00:00'}Z`).getTime()
    )
    .slice(0, 3);

  return (
    <LayoutWrapper>
      <div className="fade-in bg-signature-ivory">
        {heroEnabled ? (
          <Hero heroSlide={heroSlide} schoolName={data.school.name} />
        ) : (
          <section className="bg-signature-navy py-48 text-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-signature-navy/90 backdrop-blur-sm"></div>
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-6">
              <span className="text-signature-gold uppercase tracking-[0.8em] text-[10px] md:text-xs font-bold mb-8 block">
                {data.school.name}
              </span>
              <h1 className="text-white text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter">
                Institutional <br />
                <span className="italic text-signature-gold block mt-4">Legacy.</span>
              </h1>
            </div>
          </section>
        )}

        <div className="flex flex-col">
          {((academicResultsEnabled && latestAcademicResult) || (achievementsEnabled && academicAchievements.length > 0)) && (
            <InstitutionalStats
              academicResultsEnabled={academicResultsEnabled}
              latestAcademicResult={latestAcademicResult}
              achievementsEnabled={achievementsEnabled}
              academicAchievements={academicAchievements}
            />
          )}
        </div>

        {leadershipEnabled && leadership.length > 0 && (
          <div className="space-y-48 bg-white">
            {leadership.map((member, idx) => (
              <section key={member.key || idx} className="py-48 px-8 grid lg:grid-cols-2 gap-24 items-center max-w-[1400px] mx-auto border-b border-signature-navy/5">
                <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl group ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  {member.imageUrl && isValidImageUrl(member.imageUrl) && (
                    <NextImage 
                      src={member.imageUrl} 
                      alt={`${member.name} - ${member.designation || 'Institutional Leader'}`} 
                      fill
                      className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
                    />
                  )}
                  <div className="absolute inset-0 bg-signature-navy/20 mix-blend-multiply"></div>
                </div>
                <div className={`${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <SectionHeader title="Leadership" subtitle={member.role?.toUpperCase() || `${data.school.name} Guidance`} />
                  <p className="text-2xl text-signature-navy/60 font-serif italic mb-12 leading-relaxed">
                    "{member.message || ''}"
                  </p>
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-16 h-px bg-signature-gold"></div>
                    <div>
                      <div className="text-xl font-bold uppercase tracking-widest text-signature-navy">{member.name || ''}</div>
                      <div className="text-signature-gold text-sm tracking-[0.2em] font-bold">{member.designation || member.role || 'Leader'}</div>
                    </div>
                  </div>
                  <Link href="/about">
                    <Button>Discover Our Legacy</Button>
                  </Link>
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="flex flex-col">
          <SchoolDashboard
            statistics={statisticsList}
            statsEnabled={statsEnabled}
            statsRequired={statsRequired}
          />
        </div>

        <div className="flex flex-col">
          <FacultyHighlights
            faculty={facultyList as any}
            facultyEnabled={facultyEnabled}
            facultyRequired={facultyRequired}
          />
        </div>

        <div className="flex flex-col">
          <AthleticExcellence
            sportsAchievements={sportsAchievements}
            sportsEnabled={sportsEnabled}
            sportsRequired={sportsRequired}
          />
        </div>

        <div className="flex flex-col">
          <CampusFacilities
            facilityGroups={facilityGroups}
            facilitiesEnabled={facilitiesEnabled}
            facilitiesRequired={facilitiesRequired}
          />
        </div>

        <div className="flex flex-col">
          {galleryEnabled && galleryItems.length > 0 && (
            <section className="py-48 px-8 bg-white">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                <SectionHeader title="Gallery" subtitle={`${data.school.name} Portraits`} />
                <Link href="/activities">
                  <Button variant="outline">Explore Enrichment</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {galleryItems.map((item, i) => (
                  <div key={i}>
                    {item.mediaType === 'image' && item.url && isValidImageUrl(item.url) ? (
                      <Card
                        title={item.caption || 'Campus Life'}
                        image={item.url}
                        tag="Campus Portrait"
                      />
                    ) : (
                      <div className="group overflow-hidden relative bg-white border border-black/5 hover:border-signature-gold/40 transition-all duration-700 shadow-sm hover:shadow-2xl">
                        <div className="aspect-[3/4] overflow-hidden relative bg-signature-navy/5">
                          {!item.url || !isValidImageUrl(item.url) ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-signature-navy/10"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586
                             a2 2.001 2.001 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6
                             a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          ) : (
                            <video
                              src={item.url}
                              autoPlay muted loop playsInline
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                            />
                          )}
                          <div className="absolute inset-0 bg-signature-navy/10 group-hover:bg-transparent transition-colors duration-700"></div>
                        </div>
                        <div className="p-10 relative bg-white">
                          <div className="absolute top-0 right-10 w-px h-10 bg-signature-gold/20 -translate-y-full"></div>
                          <span className="text-[9px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4 block">Campus Portrait</span>
                          <h3 className="text-2xl font-serif mb-4 tracking-tight group-hover:text-signature-gold transition-colors">
                            {item.caption || 'Campus Life'}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        </div>

        <div className="flex flex-col">
          <UpcomingEvents
            eventsToShow={eventsToShow}
            eventsEnabled={eventsEnabled}
            eventsRequired={eventsRequired}
          />
        </div>

        <section className="py-48 bg-signature-gold text-white text-center px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-signature-navy/10"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-[12px] uppercase tracking-[0.6em] font-bold mb-10">ACADEMIC ADMISSIONS</p>
            <h2 className="text-6xl md:text-8xl font-serif mb-16 leading-tight">Start your <br /><span className="italic">Excellence Journey.</span></h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/admission">
                <span className="inline-block px-16 py-6 bg-white text-signature-navy text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-signature-navy hover:text-white transition-all duration-500 shadow-2xl">
                  Begin Application
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-block px-16 py-6 border border-white/40 text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-signature-navy transition-all duration-500">
                  Request Prospectus
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
