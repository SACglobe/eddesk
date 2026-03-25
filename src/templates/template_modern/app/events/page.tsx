'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

    useEffect(() => {
        // Fetch events on mount if empty, or if date changes
        const initialDate = new Date();
        const isDifferentMonth = currentDate.getMonth() !== initialDate.getMonth() || 
                               currentDate.getFullYear() !== initialDate.getFullYear();
        
        if (events.length === 0 || isDifferentMonth) {
            fetchEvents(month, year);
        }
    }, [currentDate, month, year, fetchEvents, events.length]);

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

    const featuredEvent = events.find((e: any) => e.isFeatured) || events[0];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 1. Immersive Hero Section */}
            {heroEnabled && heroMedia.length > 0 && (
                <HeroSlider slides={heroMedia} />
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
                            <h2 className="text-3xl font-bold text-slate-800 font-serif lowercase tracking-tight">
                                {monthName} <span className="text-blue-500 font-sans italic font-normal text-2xl">{year}</span>
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
                        <button className="px-6 py-3 bg-white shadow-sm rounded-xl text-xs font-bold uppercase tracking-widest text-blue-600">List View</button>
                        <button className="px-6 py-3 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600">Calendar View</button>
                    </div>
                </div>
            </div>

            {/* 3. Event Listings */}
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
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching school events...</p>
                        </motion.div>
                    ) : events.length > 0 ? (
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
                                            <span className="text-xs font-black uppercase tracking-widest text-blue-400 group-hover:text-blue-100 transition-colors mt-2">{monthShort}</span>
                                        </div>
                                        
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-lg">
                                                    {event.category || 'General'}
                                                </span>
                                                <span className="text-[10px] text-slate-300 font-bold">•</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                    {event.startTime && `${event.startTime} Onwards`}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-serif lowercase leading-tight">
                                                {event.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                                                {event.description}
                                            </p>
                                            <button className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest group/btn pt-2">
                                                Event Details
                                                <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                                            </button>
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
                            <h3 className="text-2xl font-bold text-slate-400 font-serif mb-2">No events this month</h3>
                            <p className="text-slate-300">Check surrounding months for school activities.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 4. Highlight Carousel / Banner */}
            {featuredEvent && (
                <section className="max-w-7xl mx-auto px-6 pb-32">
                    <div className="bg-blue-900 rounded-[4rem] overflow-hidden relative shadow-3xl">
                        <img 
                            src={featuredEvent.imageUrl || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200"} 
                            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
                            alt="Featured"
                        />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center p-16 md:p-24">
                            <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
                                <span className="bg-blue-400/20 text-blue-400 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-400/10">Feature Highlight</span>
                                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight font-serif lowercase">Upcoming event: <br/><span className="text-blue-400">{featuredEvent.title}</span></h2>
                                <p className="text-blue-100/60 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    {featuredEvent.description}
                                </p>
                                <div className="flex gap-10 justify-center lg:justify-start pt-6">
                                    <div>
                                        <p className="text-white font-black text-2xl lowercase">{new Date(featuredEvent.eventDate).toLocaleDateString()}</p>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">Calendar Date</p>
                                    </div>
                                    <div className="w-px h-12 bg-white/10"></div>
                                    <div>
                                        <p className="text-white font-black text-2xl lowercase">{featuredEvent.location || 'Campus Center'}</p>
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">Venue</p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2 group">
                                <motion.img 
                                    whileHover={{ scale: 1.02 }}
                                    src={featuredEvent.imageUrl || "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200"} 
                                    className="rounded-[3rem] shadow-4xl w-full aspect-square md:aspect-video object-cover"
                                    alt="Featured Event"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default EventsScreen;
