'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getMonthEventsAction } from '@/app/actions/events';
import { isValidImageUrl, formatHeroUrl } from '@/core/utils/url';
import Link from 'next/link';

const EventsScreen = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    const schoolKey = data?.school?.key;

    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState(data?.events || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    // --- Visibility and Data Extraction ---
    const getComponent = (code) => {
        return data?.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    const isSectionEnabled = (code) => getComponent(code)?.isActive ?? true;

    // 1. Hero
    const heroEnabled = isSectionEnabled('hero');
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

    const fetchEvents = useCallback(async (m, y) => {
        if (!schoolKey) return;
        setLoading(true);
        setError(null);
        try {
            const result = await getMonthEventsAction(schoolKey, m, y);
            if (result.status === 'success') {
                setEvents(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch events');
        } finally {
            setLoading(false);
        }
    }, [schoolKey]);

    useEffect(() => {
        const initialDate = new Date();
        if (currentDate.getMonth() !== initialDate.getMonth() || currentDate.getFullYear() !== initialDate.getFullYear()) {
            fetchEvents(month, year);
        }
    }, [currentDate, month, year, fetchEvents]);

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const heroTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(heroTimer);
    }, [heroSlides.length]);

    const handlePrevMonth = () => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() - 1);
            return d;
        });
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() + 1);
            return d;
        });
    };

    return (
        <div className="fade-in">
            <div className="flex flex-col">
                {heroEnabled && heroSlides.length > 0 && (
                    <section className="h-[60vh] md:h-[70vh] relative overflow-hidden bg-slate-900">
                        {heroSlides.map((slide, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                                style={{ transition: 'opacity 1s ease-in-out, transform 10s linear' }}
                            >
                                {slide.mediaUrl && isValidImageUrl(slide.mediaUrl) ? (
                                    <>
                                        <img src={slide.mediaUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/30 z-10" />
                                    </>
                                ) : null}
                            </div>
                        ))}

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6 animate-fade-up">{heroSlides[currentSlide]?.subheadline}</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 serif tracking-tight leading-tight max-w-5xl animate-fade-up-delayed">
                                {heroSlides[currentSlide]?.headline || `${schoolName} Events & Calendar`}
                            </h1>
                            <div className="flex gap-4 animate-fade-up-extra">
                                {formatHeroUrl(heroSlides[currentSlide]?.primaryButtonUrl) && heroSlides[currentSlide]?.primaryButtonText && (
                                    <Link href={formatHeroUrl(heroSlides[currentSlide]?.primaryButtonUrl)} className="px-8 py-3 bg-white text-emerald-900 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl inline-block">{heroSlides[currentSlide].primaryButtonText}</Link>
                                )}
                                {formatHeroUrl(heroSlides[currentSlide]?.secondaryButtonUrl) && heroSlides[currentSlide]?.secondaryButtonText && (
                                    <Link href={formatHeroUrl(heroSlides[currentSlide]?.secondaryButtonUrl)} className="px-8 py-3 bg-transparent border border-white text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all inline-block">{heroSlides[currentSlide].secondaryButtonText}</Link>
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

                {!heroEnabled && (
                    <section className="bg-emerald-900 py-24 text-center">
                        <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                            <span className="text-emerald-300 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">{schoolName} Calendar</span>
                            <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest">{schoolName} Events</h1>
                            <div className="h-1 w-20 bg-emerald-400 mx-auto mt-8"></div>
                        </div>
                    </section>
                )}

                <div className="max-w-[1600px] mx-auto px-2 md:px-6 py-20">
                    <div className="text-center mb-16">
                        <span className="text-emerald-700 font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">{schoolName} Calendar</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-widest serif">Events & Activities</h2>
                        <div className="h-1 w-20 bg-emerald-900 mx-auto mt-6"></div>
                    </div>

                    {/* Month Navigator */}
                    <div className="flex items-center justify-between bg-white border border-slate-200 p-6 mb-12 shadow-sm">
                        <button
                            onClick={handlePrevMonth}
                            className="flex items-center gap-2 text-emerald-900 font-bold uppercase tracking-widest text-[10px] hover:text-emerald-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Prev Month
                        </button>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900 serif tracking-tight uppercase">
                                {monthName} <span className="ml-2">{year}</span>
                            </h2>
                        </div>
                        <button
                            onClick={handleNextMonth}
                            className="flex items-center gap-2 text-emerald-900 font-bold uppercase tracking-widest text-[10px] hover:text-emerald-600 transition-colors"
                        >
                            Next Month
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-40">
                            <div className="w-12 h-12 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Updating Calendar...</p>
                        </div>
                    ) : events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event, idx) => {
                                const dateObj = new Date(event.eventDate);
                                const day = dateObj.getDate();
                                const monthShort = dateObj.toLocaleString('en-US', { month: 'short' });

                                return (
                                    <div key={event.key} className="bg-white border border-slate-200 p-8 hover:border-emerald-300 hover:shadow-xl transition-all group">
                                        <div className="flex items-start gap-6 mb-6">
                                            <div className="bg-emerald-900 text-white p-4 flex flex-col items-center justify-center min-w-[70px] shadow-md group-hover:bg-emerald-800 transition-colors">
                                                <span className="text-xl font-bold serif">{day}</span>
                                                <span className="text-[10px] uppercase font-bold tracking-tighter text-emerald-300">{monthShort}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block">{event.category || 'Event'}</span>
                                                <h3 className="text-lg font-bold text-slate-900 serif leading-tight group-hover:text-emerald-900 transition-colors">{event.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                                            {event.description}
                                        </p>
                                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{event.startTime || '9:00 AM'}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-40 border-2 border-dashed border-slate-200 bg-white">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">No scheduled events</p>
                            <p className="text-slate-300 text-xs">There are no events listed for {monthName} {year}.</p>
                        </div>
                    )}

                </div>

                <style jsx>{`
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .animate-fade-up-delayed { animation: fadeUp 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-up-extra { animation: fadeUp 1s ease-out 0.6s forwards; opacity: 0; }
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
            </div>
        </div>
    );
};

export default EventsScreen;
