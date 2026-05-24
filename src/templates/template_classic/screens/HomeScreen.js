"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DynamicIcon from '@/components/DynamicIcon';
import { isValidImageUrl, formatHeroUrl } from '@/core/utils/url';

const HomeScreen = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const formatEventDate = (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00');
        return {
            month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
            day: d.getDate().toString()
        };
    };

    // --- Visibility and Data Extraction ---
    const getComponent = (code) => {
        return data?.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    const isSectionEnabled = (code) => getComponent(code)?.isActive ?? true;
    const isSectionRequired = (code) => getComponent(code)?.isRequired ?? false;

    // 1. Hero
    const heroEnabled = isSectionEnabled('hero');
    const heroRequired = isSectionRequired('hero');
    const heroSlides = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    if (heroSlides.length === 0) {
        heroSlides.push({
            headline: '',
            subheadline: '',
            mediaUrl: '',
            primaryButtonText: '',
            primaryButtonUrl: '',
            secondaryButtonText: '',
            secondaryButtonUrl: ''
        });
    }

    // 2. Academic Results & Achievements
    const academicComp = getComponent('academics') || getComponent('academicresults');
    const academicResultsEnabled = academicComp?.isActive ?? true;
    const academicResultsRequired = academicComp?.isRequired ?? false;
    const latestResult = (data?.academicResults ?? [])
        .sort((a, b) => b.year - a.year)[0] ?? null;

    const achievementsComp = getComponent('achievements') || getComponent('schoolachievements');
    const achievementsEnabled = achievementsComp?.isActive ?? true;
    const achievementsRequired = achievementsComp?.isRequired ?? false;
    const academicAchievements = (data?.schoolAchievements ?? [])
        .filter(a => a.category?.toLowerCase() === 'academic')
        .sort((a, b) => b.year - a.year || (a.displayOrder || 0) - (b.displayOrder || 0));

    // 3. Leadership
    const leadershipComp = getComponent('leadership') || getComponent('governance');
    const leadershipEnabled = leadershipComp?.isActive ?? true;
    const leadershipRequired = leadershipComp?.isRequired ?? false;
    const schoolName = data.school?.name || 'Our Institution';
    const leadership = (data?.leadership ?? []).filter(l => 
        l.isActive && 
        (l.role?.toLowerCase() === 'principal' || l.designation?.toLowerCase() === 'principal')
    );

    // 4. Statistics
    const statsComp = getComponent('stats') || getComponent('schoolstats');
    const statsEnabled = statsComp?.isActive ?? true;
    const statsRequired = statsComp?.isRequired ?? false;
    const statisticsList = (data?.stats ?? [])
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    // 5. Faculty
    const facultyComp = getComponent('faculty');
    const facultyEnabled = facultyComp?.isActive ?? true;
    const facultyRequired = facultyComp?.isRequired ?? false;
    const allFaculty = (data?.faculty ?? [])
        .filter(p => p.isActive);

    // 6. Sports
    const sportsComp = getComponent('sports');
    const sportsEnabled = sportsComp?.isActive ?? true;
    const sportsRequired = sportsComp?.isRequired ?? false;
    const sportsAchievements = (data?.schoolAchievements ?? [])
        .filter(a => a.category?.toLowerCase() === 'sports')
        .slice(0, 6);

    // 7. Facilities / Infrastructure
    const facilitiesComp = getComponent('infrastructure') || getComponent('facilities');
    const facilitiesEnabled = facilitiesComp?.isActive ?? true;
    const facilitiesRequired = facilitiesComp?.isRequired ?? false;
    const infrastructure = (data?.infrastructure ?? []).filter(i => i.isActive);

    const groupedFacilities = infrastructure.reduce((acc, facility) => {
        const category = facility.categoryName || 'Common Facilities';
        if (!acc[category]) acc[category] = [];
        acc[category].push(facility.name);
        return acc;
    }, {});
    const groupedFacilitiesKeys = Object.keys(groupedFacilities);

    // 8. Gallery
    const galleryComp = getComponent('gallery');
    const galleryEnabled = galleryComp?.isActive ?? true;
    const galleryRequired = galleryComp?.isRequired ?? false;
    const campusGallery = (data?.gallery ?? [])
        .filter(m => 
            m.isActive && 
            m.imageUrl &&
            (!galleryComp?.config?.filters?.contenttype || m.mediaType?.toLowerCase() === galleryComp.config.filters.contenttype.toLowerCase())
        )
        .map(m => m.imageUrl);

    const displayCount = 4;
    const totalGalleryImages = campusGallery.length || 1;

    // 9. Events
    const eventsComp = getComponent('events');
    const eventsEnabled = eventsComp?.isActive ?? true;
    const eventsRequired = eventsComp?.isRequired ?? false;
    const now = new Date();
    const eventsToShow = (data?.events ?? [])
        .filter(e => {
            const eventDateTime = new Date(`${e.eventDate}T${e.startTime || '00:00:00'}Z`);
            return eventDateTime > now;
        })
        .sort((a, b) =>
            new Date(`${a.eventDate}T${a.startTime || '00:00:00'}Z`).getTime() -
            new Date(`${b.eventDate}T${b.startTime || '00:00:00'}Z`).getTime()
        )
        .slice(0, 3);

    useEffect(() => {
        const heroTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        const galleryTimer = setInterval(() => {
            if (totalGalleryImages > 1) {
                setGalleryIndex((prev) => (prev + 1) % totalGalleryImages);
            }
        }, 3000);

        return () => {
            clearInterval(heroTimer);
            clearInterval(galleryTimer);
        };
    }, [totalGalleryImages, heroSlides.length]);

    // Compute the 4 images that should be visible starting from galleryIndex
    const getVisibleImages = () => {
        const visible = [];
        if (campusGallery.length === 0) return [];
        for (let i = 0; i < displayCount; i++) {
            visible.push(campusGallery[(galleryIndex + i) % totalGalleryImages]);
        }
        return visible;
    };

    const visibleGallery = getVisibleImages();

    return (
        <div className="fade-in">
            <div className="flex flex-col">
            {heroEnabled && heroSlides.length > 0 && (
                <section className="h-[70vh] md:h-[85vh] relative overflow-hidden bg-slate-900">
                    {heroSlides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                            style={{ transition: 'opacity 1s ease-in-out, transform 10s linear' }}
                        >
                            {slide.mediaUrl && isValidImageUrl(slide.mediaUrl) ? (
                                <div className="absolute inset-0">
                                    <Image 
                                        src={slide.mediaUrl} 
                                        alt={slide.headline || `${schoolName} Hero Slide ${idx + 1}`} 
                                        fill
                                        className="object-cover"
                                        priority={idx === 0}
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-black/30 z-10" />
                                </div>
                            ) : null}
                        </div>
                    ))}

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6 animate-fade-up">{heroSlides[currentSlide]?.subheadline}</span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 serif tracking-tight leading-tight max-w-5xl animate-fade-up-delayed">
                            {heroSlides[currentSlide]?.headline}
                        </h1>
                        <div className="flex gap-4 animate-fade-up-extra absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
                            {formatHeroUrl(heroSlides[currentSlide]?.primaryButtonUrl) && heroSlides[currentSlide]?.primaryButtonText && (
                                <Link href={formatHeroUrl(heroSlides[currentSlide]?.primaryButtonUrl)} className="px-8 py-3 bg-white text-emerald-900 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl inline-block">{heroSlides[currentSlide].primaryButtonText}</Link>
                            )}
                            {formatHeroUrl(heroSlides[currentSlide]?.secondaryButtonUrl) && heroSlides[currentSlide]?.secondaryButtonText && (
                                <Link href={formatHeroUrl(heroSlides[currentSlide]?.secondaryButtonUrl)} className="px-8 py-3 bg-transparent border border-white text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:!text-emerald-900 transition-all inline-block">{heroSlides[currentSlide].secondaryButtonText}</Link>
                            )}
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`w-12 h-1 transition-all ${idx === currentSlide ? 'bg-emerald-400' : 'bg-white/30 hover:bg-white/50'}`}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Pay Fees Online Button */}
            {data.school?.paymentGatewayUrl && (
                <section className="max-w-[1600px] mx-auto px-2 md:px-6 -mt-12 relative z-50">
                    <a 
                        href={data.school.paymentGatewayUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col md:flex-row items-center justify-between bg-white p-8 md:p-12 shadow-2xl border border-slate-100 group hover:border-emerald-600 transition-all duration-500"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
                            <div className="w-20 h-20 bg-slate-50 text-emerald-900 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-white transition-colors duration-500 shadow-inner">
                                <span className="text-3xl md:text-4xl">💳</span>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-4xl font-bold text-slate-900 serif uppercase tracking-widest mb-2">Pay Fees Online</h3>
                                <p className="text-emerald-600 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Quick & Secure digital fee remittance portal</p>
                            </div>
                        </div>
                        <div className="mt-8 md:mt-0 px-10 py-4 bg-emerald-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] group-hover:bg-emerald-700 transition-all">
                            Access Portal →
                        </div>
                    </a>
                </section>
            )}

            {/* 2. School Achievements & Academic Results Section */}
            {((academicResultsEnabled && latestResult) || (achievementsEnabled && academicAchievements?.length > 0)) && (
                <section className="py-24 bg-white border-b border-slate-100">
                        <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                            <div className="text-center mb-16">
                                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">{schoolName} Progress</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Honors & Academic Results</h2>
                                <div className="h-1 w-20 bg-emerald-900 mx-auto mt-6"></div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                                {academicResultsEnabled && (academicResultsRequired || latestResult) && (
                                    <div className="p-10 bg-emerald-900 text-white flex flex-col justify-between h-full shadow-xl">
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-8 h-[1px] bg-emerald-400"></div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Board Results {latestResult?.year ?? '—'}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold serif mb-6">Academic Merit Summary</h3>
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-end border-b border-emerald-800 pb-2">
                                                    <span className="text-xs uppercase text-emerald-300 font-bold">Over All Pass Percentage</span>
                                                    <span className="text-xl font-bold serif text-white">{latestResult ? `${latestResult.passPercentage}%` : '—'}</span>
                                                </div>
                                                <div className="flex justify-between items-end border-b border-emerald-800 pb-2">
                                                    <span className="text-xs uppercase text-emerald-300 font-bold">10th Pass Percentage</span>
                                                    <span className="text-xl font-bold serif text-white">{latestResult ? `${latestResult.tenthPassPercentage}%` : '—'}</span>
                                                </div>
                                                <div className="flex justify-between items-end border-b border-emerald-800 pb-2">
                                                    <span className="text-xs uppercase text-emerald-300 font-bold">+2 Pass Percentage</span>
                                                    <span className="text-xl font-bold serif text-white">{latestResult ? `${latestResult.plusTwoPassPercentage}%` : '—'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {latestResult?.legacyQuote && (
                                            <p className="mt-8 text-[10px] text-emerald-400 uppercase tracking-widest leading-relaxed">
                                                {latestResult.legacyQuote}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {achievementsEnabled && (achievementsRequired || academicAchievements?.length > 0) && (
                                    <>
                                        {academicAchievements?.slice(0, 2).map((item, idx) => (
                                            <div key={idx} className="p-10 bg-slate-50 border border-slate-200 hover:border-emerald-200 transition-all group flex flex-col justify-between h-full">
                                                <div>
                                                    <div className="text-3xl font-bold text-emerald-100 serif mb-6 group-hover:text-emerald-900 transition-colors">
                                                        {item.year}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight serif mb-4 leading-tight">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="pt-6 border-t border-slate-200 text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                                    {item.category}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    href="/about"
                                    className="px-10 py-4 border-2 border-emerald-900 text-emerald-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-900 hover:text-white transition-all inline-block"
                                >
                                    Know more
                                </Link>
                            </div>
                        </div>
                    </section>
            )}

            {/* 3. Leadership Section */}
            {leadershipEnabled && leadership.length > 0 && (
                <div className="space-y-32">
                    {leadership.map((member, idx) => (
                        <section key={member.key || idx} className="py-32 bg-white relative overflow-hidden border-b border-slate-50 last:border-b-0">
                            <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>

                            <div className="max-w-[1600px] mx-auto px-2 md:px-6 relative z-10">
                                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                    <div className="w-full lg:w-1/2 relative">
                                        <div className={`absolute -top-10 -left-10 w-full h-full bg-slate-50 border border-slate-100 -z-10 translate-x-4 translate-y-4`}></div>
                                        <div className="relative group">
                                            {member.imageUrl && isValidImageUrl(member.imageUrl) && (
                                                <img
                                                    src={member.imageUrl}
                                                    alt={`${member.name} - ${member.designation || 'Institutional Leader'}`}
                                                    className="w-full aspect-[4/5] lg:aspect-auto lg:h-[650px] object-cover shadow-2xl transition-all duration-1000 group-hover:scale-[1.02]"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className={`w-full lg:w-7/12 ${idx % 2 !== 0 ? 'lg:-mr-24 lg:ml-0' : 'lg:-ml-24'} z-20`}>
                                        <div className="bg-white p-8 md:p-16 lg:p-20 shadow-[-20px_20px_60px_rgba(0,0,0,0.05)] border border-slate-100 relative">
                                            <div className="absolute top-0 left-10 -translate-y-1/2 text-8xl text-emerald-900/10 serif leading-none font-black italic">"</div>

                                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.5em] block mb-6">{member.role?.toUpperCase() || `${schoolName} Leadership`}</span>
                                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 uppercase tracking-widest serif mb-8 leading-tight">
                                                Leading {schoolName} <br /> with Vision
                                            </h2>

                                            <div className="h-[2px] w-24 bg-emerald-900 mb-12"></div>

                                            <div className="relative">
                                                <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed serif mb-12 relative z-10">
                                                    "{member.message ?? ''}"
                                                </p>
                                                <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                    <div>
                                                        <p className="text-2xl font-bold text-slate-900 serif tracking-wide uppercase">{member.name ?? ''}</p>
                                                        <p className="text-[10px] text-emerald-600 uppercase tracking-[0.3em] font-bold mt-2">{member.designation ?? member.role ?? 'Leader'}</p>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <Link href="/about" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-900 transition-colors py-2 border-b border-transparent hover:border-emerald-900">Read More →</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            )}

            {/* 4. Statistics Counter Section */}
            {statsEnabled && statisticsList.length > 0 && (
                <section className="py-20 bg-emerald-900 text-white relative z-20 shadow-2xl">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {statisticsList.map((stat, idx) => (
                                <div key={idx} className="text-center group">
                                    <div className="flex justify-center mb-6">
                                        <DynamicIcon icon={stat.icon} className="w-10 h-10 text-emerald-300/50 group-hover:text-emerald-300 transition-colors" />
                                    </div>
                                    <div className="text-4xl md:text-6xl font-bold mb-2 serif text-emerald-50 group-hover:scale-110 transition-transform inline-block">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] text-emerald-200 uppercase tracking-[0.3em] font-bold border-t border-emerald-800 pt-4 mt-2">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Our Distinguished Educators */}
            {facultyEnabled && allFaculty.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="text-center mb-16">
                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">{schoolName} Educators</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Our Distinguished Faculty</h2>
                            <div className="h-1 w-20 bg-emerald-900 mx-auto mt-6"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                            {allFaculty.map((teacher, idx) => (
                                <div key={idx} className="flex flex-col items-center group">
                                    <div className="relative mb-6">
                                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-emerald-500 transition-all duration-500 group-hover:scale-105">
                                            {teacher.photoUrl && isValidImageUrl(teacher.photoUrl) && (
                                                <img
                                                    src={teacher.photoUrl}
                                                    alt={`${teacher.name} - ${teacher.designation || 'Faculty member'}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:rotate-3"
                                                />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 rounded-full border border-emerald-900/10 scale-110 -z-10"></div>
                                    </div>

                                    <div className="text-center">
                                        <h4 className="text-xl font-bold text-slate-900 serif mb-2 group-hover:text-emerald-900 transition-colors">
                                            {teacher.name}
                                        </h4>
                                        <div className="h-[1px] w-8 bg-emerald-200 mx-auto mb-3 group-hover:w-16 transition-all duration-500"></div>
                                        <p className="text-[10px] text-emerald-600 uppercase tracking-[0.2em] font-bold leading-tight">
                                            {teacher.designation}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            )}

            {/* 6. Sports Activities and Achievements Section (HORIZONTAL SCROLL) */}
            {sportsEnabled && sportsAchievements.length > 0 && (
                <section className="py-24 bg-emerald-50/30 border-t border-slate-100">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                            <div className="text-left">
                                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">Athletic Excellence</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Sports & Physical Achievements</h2>
                                <div className="h-1 w-20 bg-emerald-900 mt-6"></div>
                            </div>
                            <div className="hidden md:flex items-center gap-3 text-slate-400">
                                <span className="text-[10px] uppercase font-bold tracking-widest">Swipe horizontally</span>
                                <div className="w-12 h-px bg-slate-300"></div>
                            </div>
                        </div>

                        <div className="flex gap-8 overflow-x-auto pb-12 pt-4 no-scrollbar snap-x snap-mandatory">
                            {sportsAchievements.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[300px] md:min-w-[400px] bg-white border border-slate-100 shadow-md snap-start group/card hover:shadow-2xl transition-all duration-500 flex flex-col"
                                >
                                    <div className="relative h-60 overflow-hidden">
                                        {item.photoUrl && isValidImageUrl(item.photoUrl) && (
                                            <img
                                                src={item.photoUrl}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                            />
                                        )}
                                        {!item.photoUrl && (
                                            <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                                                <span className="text-emerald-200 font-bold serif text-4xl">{item.year}</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-emerald-900 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                            {item.year}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-grow border-t-4 border-emerald-900">
                                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] block mb-3">
                                            {item.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-slate-900 serif leading-tight mb-4 group-hover/card:text-emerald-900 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.achievementType}</span>
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. Campus Highlights (Infrastructure Grid) */}
            {facilitiesEnabled && groupedFacilitiesKeys.length > 0 && (
                <section className="py-24 bg-slate-50">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">{schoolName} Infrastructure</h2>
                                <div className="h-1 w-20 bg-emerald-900"></div>
                            </div>
                            <p className="text-slate-500 text-sm max-w-md mt-4 md:mt-0 italic">Modern facilities at {schoolName} optimized for student growth and performance.</p>
                        </div>
                            {infrastructure.map((item, i) => (
                                <div key={item.key || i} className="bg-white p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all group relative overflow-hidden flex flex-col md:flex-row gap-8">
                                    <div className="flex-shrink-0 w-24 h-24 bg-emerald-50 rounded-xl overflow-hidden flex items-center justify-center">
                                        <DynamicIcon 
                                            icon={item.icon || 'school'} 
                                            className="w-10 h-10 text-emerald-900/40" 
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] block mb-2">{item.tag}</span>
                                        <h3 className="text-xl font-bold text-slate-900 serif uppercase tracking-tight mb-4 group-hover:text-emerald-900 transition-colors">{item.title}</h3>
                                        {item.bulletinPoints && item.bulletinPoints.length > 0 ? (
                                            <ul className="space-y-2">
                                                {item.bulletinPoints.map((point, idx) => (
                                                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                                        <span className="w-1 h-1 bg-emerald-300 rounded-full mt-1.5 flex-shrink-0"></span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-slate-500 leading-relaxed italic">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            )}

            {/* 8. Image Gallery Preview with Auto-Scrolling Infinite Carousel */}
            {galleryEnabled && visibleGallery.length > 0 && (
                <section className="py-12 px-2">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 overflow-hidden">
                        {/* Slots 1-4: The Auto-Scrolling Carousel */}
                        <div className="col-span-1 md:col-span-4 overflow-hidden relative">
                            <div
                                className="flex transition-transform duration-1000 ease-in-out"
                                style={{ transform: `translateX(0)` }}
                            >
                                {visibleGallery.map((img, idx) => (
                                    <div key={`${galleryIndex}-${idx}`} className="flex-none w-1/2 md:w-1/4 px-1">
                                        <div className="aspect-square overflow-hidden border border-slate-100 group relative">
                                            {img && isValidImageUrl(img) && (
                                                <img
                                                    src={img}
                                                    alt="Campus"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slot 5: Static Call to Action */}
                        <div className="bg-emerald-900 flex flex-col items-center justify-center p-4 text-center aspect-square col-span-1">
                            <span className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">{schoolName} Gallery</span>
                            <span className="text-emerald-300 text-[10px] uppercase font-bold">Visual Perspective</span>
                            <Link href="/gallery" className="mt-4 text-white text-[10px] font-bold underline underline-offset-4 tracking-widest hover:text-emerald-200">Enter Gallery</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* 9. Upcoming Events Section */}
            {eventsEnabled && eventsToShow?.length > 0 && (
                <section className="py-24 bg-white border-t border-slate-100">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">

                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                            <div>
                                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">{schoolName} Updates</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Events & School Life</h2>
                                <div className="h-1 w-20 bg-emerald-900"></div>
                            </div>
                            <Link
                                href="/events"
                                className="mt-6 md:mt-0 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-900 border-b border-emerald-900 pb-1 hover:text-emerald-700 transition-colors"
                            >
                                View Full Calendar
                            </Link>
                        </div>

                        {/* Event List */}
                        <div className="divide-y divide-slate-100">
                            {eventsToShow.map((event) => {
                                const { month, day } = formatEventDate(event.eventDate);
                                return (
                                    <div key={event.id} className="py-10 flex flex-col md:flex-row md:items-center gap-8 group hover:bg-slate-50 px-4 transition-colors">

                                        {/* Date Block */}
                                        <div className="flex-shrink-0 w-24 text-center">
                                            <div className="text-emerald-900 font-bold text-xs uppercase tracking-widest">{month}</div>
                                            <div className="text-4xl font-bold serif text-slate-900 group-hover:text-emerald-900 transition-colors">
                                                {day}
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="hidden md:block w-px h-16 bg-slate-200"></div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] block mb-2">{event.category}</span>
                                            <h3 className="text-xl font-bold text-slate-900 serif uppercase tracking-tight mb-2 group-hover:text-emerald-900 transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className="flex-shrink-0">
                                            <Link
                                                href="/events"
                                                className="w-10 h-10 border border-slate-200 flex items-center justify-center group-hover:border-emerald-900 group-hover:bg-emerald-900 transition-all"
                                            >
                                                <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <style jsx>{`
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .animate-fade-up-delayed { animation: fadeUp 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-up-extra { animation: fadeUp 1s ease-out 0.6s forwards; opacity: 0; }
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
            </div>
        </div>
    );
};

export default HomeScreen;
