'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { getMonthEventsAction } from '@/app/actions/events';
import HeroSlider from '../../components/HeroSlider';
import { motion, AnimatePresence } from 'framer-motion';

const EventsScreen: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    const schoolKey = data?.school?.key;

    // Hero Section Configuration
    const getComponent = (code: string) => {
        return data?.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };
    const heroComp = getComponent('hero');
    const heroEnabled = heroComp?.isActive ?? true;
    const heroMedia = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<any[]>(data?.events || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const fetchEvents = useCallback(async (m: number, y: number) => {
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
        } catch (err: any) {
            setError(err.message || 'Failed to fetch events');
        } finally {
            setLoading(false);
        }
    }, [schoolKey]);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            const today = new Date();
            if (month === today.getMonth() + 1 && year === today.getFullYear()) {
                return;
            }
        }
        fetchEvents(month, year);
    }, [month, year, fetchEvents]);

    const [view, setView] = useState<'list' | 'calendar'>('list');

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

    const nowForBanner = new Date();
    nowForBanner.setHours(0, 0, 0, 0);

    const { upcoming, past } = events.reduce((acc, e) => {
        const eDate = new Date(e.eventDate + 'T00:00:00');
        if (eDate >= nowForBanner) acc.upcoming.push(e);
        else acc.past.push(e);
        return acc;
    }, { upcoming: [] as any[], past: [] as any[] });

    upcoming.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    past.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

    const bannerEvent = upcoming.length > 0 
        ? (upcoming.find((e: any) => e.isFeatured) || upcoming[0])
        : (past.length > 0 ? (past.find((e: any) => e.isFeatured) || past[0]) : null);
    
    const bannerLabel = upcoming.length > 0 ? "Upcoming Event" : "Recent Event";

    // Calendar Grid Logic
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 1. Immersive Hero Section */}
            {heroEnabled && heroMedia.length > 0 ? (
                <HeroSlider slides={heroMedia} heightClass="h-[60vh]" />
            ) : (
                <div className="bg-primary py-24 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white font-serif tracking-tighter">
                        School Events & <span className="text-accent italic">Calendar</span>
                    </h1>
                </div>
            )}

            {/* 2. Calendar Header / Month Selector */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/50 backdrop-blur-xl">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={handlePrevMonth}
                            className="p-4 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <div className="text-center min-w-[200px]">
                            <h2 className="text-3xl font-bold text-slate-800 font-serif tracking-tight">
                                {monthName} {year}
                            </h2>
                        </div>
                        <button 
                            onClick={handleNextMonth}
                            className="p-4 rounded-2xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                        <button 
                            onClick={() => setView('list')}
                            className={`px-6 py-3 rounded-xl text-xs font-bold  tracking-widest transition-all ${view === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            List View
                        </button>
                        <button 
                            onClick={() => setView('calendar')}
                            className={`px-6 py-3 rounded-xl text-xs font-bold  tracking-widest transition-all ${view === 'calendar' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Calendar View
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Event Listings / Calendar Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-40"
                        >
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                            <p className="text-slate-400 font-bold  tracking-widest text-xs">Fetching school events...</p>
                        </motion.div>
                    ) : view === 'list' ? (
                        events.length > 0 ? (
                            <motion.div 
                                key="events-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid lg:grid-cols-2 gap-10"
                            >
                                {events.map((event, idx) => {
                                    const dateObj = new Date(event.eventDate);
                                    const day = dateObj.getDate();
                                    const monthShort = dateObj.toLocaleString('en-US', { month: 'short' });
                                    
                                    return (
                                        <motion.div 
                                            key={event.key}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="group bg-white rounded-[2rem] p-8 flex gap-10 border border-transparent hover:border-blue-100 hover:shadow-3xl transition-all duration-500"
                                        >
                                            <div className="flex flex-col items-center justify-center bg-blue-50 rounded-3xl px-6 py-8 min-w-[100px] h-fit group-hover:bg-blue-600 transition-colors duration-500">
                                                <span className="text-4xl font-black text-blue-600 group-hover:text-white transition-colors">{day}</span>
                                                <span className="text-xs font-black  tracking-widest text-blue-400 group-hover:text-blue-100 transition-colors mt-2">{monthShort}</span>
                                            </div>
                                            
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-slate-100 text-[10px] font-black text-slate-400  tracking-widest rounded-lg">
                                                        {event.category || 'General'}
                                                    </span>
                                                    <span className="text-[10px] text-slate-300 font-bold">•</span>
                                                    <span className="text-[10px] text-slate-400 font-bold  tracking-widest">
                                                        {event.startTime && `${event.startTime} Onwards`}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-serif leading-tight">
                                                    {event.title}
                                                </h3>
                                                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="no-events"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-100"
                            >
                                <div className="text-6xl mb-6 grayscale opacity-20">📅</div>
                                <h3 className="text-2xl font-bold text-slate-400 font-serif mb-2">No Events This Month</h3>
                                <p className="text-slate-300">Check surrounding months for school activities.</p>
                            </motion.div>
                        )
                    ) : (
                        <motion.div 
                            key="calendar-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[3rem] p-4 md:p-12 shadow-xl border border-slate-100 overflow-hidden"
                        >
                            <div className="grid grid-cols-7 mb-8">
                                {weekDays.map(day => (
                                    <div key={day} className="text-center py-4 text-[10px] font-black  tracking-[0.2em] text-slate-400">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden">
                                {blanks.map(b => (
                                    <div key={`blank-${b}`} className="bg-slate-50 min-h-[120px] md:min-h-[160px]" />
                                ))}
                                {days.map(day => {
                                    const dayEvents = events.filter(e => new Date(e.eventDate).getDate() === day);
                                    const isToday = day === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear();

                                    return (
                                        <div key={day} className={`bg-white min-h-[120px] md:min-h-[160px] p-4 group transition-colors hover:bg-slate-50/50 ${isToday ? 'relative' : ''}`}>
                                            {isToday && (
                                                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                            )}
                                            <span className={`text-lg font-bold mb-4 block transition-colors ${isToday ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-600'}`}>
                                                {day}
                                            </span>
                                            <div className="space-y-2">
                                                {dayEvents.map(e => (
                                                    <div 
                                                        key={e.key}
                                                        className="text-[9px] font-black  tracking-tighter p-2 bg-blue-50 text-blue-600 rounded-lg truncate border border-blue-100 hover:bg-blue-600 hover:text-white transition-all cursor-default"
                                                        title={e.title}
                                                    >
                                                        {e.title}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 4. Highlight Carousel / Banner */}
            {bannerEvent && (
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="bg-blue-900 rounded-[4rem] overflow-hidden relative shadow-3xl">
                        {bannerEvent.imageUrl ? (
                            <img 
                                src={bannerEvent.imageUrl} 
                                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
                                alt="Featured"
                            />
                        ) : (
                            <div className="absolute inset-0 w-full h-full bg-blue-900 opacity-50"></div>
                        )}
                        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center p-16 md:p-24">
                            <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
                                <span className="bg-blue-400/20 text-blue-400 px-6 py-2 rounded-full text-[10px] font-black  tracking-widest border border-blue-400/10">Feature Highlight</span>
                                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight font-serif">{bannerLabel}: <br/><span className="text-blue-400">{bannerEvent.title}</span></h2>
                                <p className="text-blue-100/60 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    {bannerEvent.description}
                                </p>
                                <div className="flex gap-10 justify-center lg:justify-start pt-6">
                                    <div>
                                        <p className="text-white font-black text-2xl">{new Date(bannerEvent.eventDate + 'T00:00:00').toLocaleDateString()}</p>
                                        <p className="text-[10px] font-black text-blue-400  tracking-widest mt-1">Calendar Date</p>
                                    </div>
                                    <div className="w-px h-12 bg-white/10"></div>
                                    <div>
                                        <p className="text-white font-black text-2xl">{bannerEvent.location || 'Campus Center'}</p>
                                        <p className="text-[10px] font-black text-blue-400  tracking-widest mt-1">Venue</p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 group">
                                {bannerEvent.imageUrl ? (
                                    <motion.img 
                                        whileHover={{ scale: 1.02 }}
                                        src={bannerEvent.imageUrl} 
                                        className="rounded-[3rem] shadow-4xl w-full aspect-square md:aspect-video object-cover"
                                        alt="Featured Event"
                                    />
                                ) : (
                                    <div className="rounded-[3rem] shadow-4xl w-full aspect-square md:aspect-video bg-blue-950/50 flex items-center justify-center">
                                        <span className="text-6xl">📅</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default EventsScreen;
