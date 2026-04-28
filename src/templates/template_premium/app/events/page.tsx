'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { getMonthEventsAction } from '@/app/actions/events';
import LayoutWrapper from '../../components/LayoutWrapper';
import { Button } from '../../components/Shared';
import { isValidImageUrl, formatHeroUrl } from '@/core/utils/url';
import Link from 'next/link';

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

const Hero: React.FC<{ heroSlide: HeroSlide | null, schoolName: string }> = ({ heroSlide, schoolName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => console.warn("Autoplay muted video"));
    }
  }, []);

  return (
    <section className="h-[70vh] relative overflow-hidden bg-signature-navy">
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
                <source src={heroSlide.mediaUrl} type="video/mp4" />
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
              {heroSlide?.subheadline || `Quality Since MCMLXXXVIII at ${schoolName}`}
            </p>
          </div>

          <h1 className="text-white text-5xl md:text-8xl font-serif leading-[0.9] mb-12 tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            {heroSlide?.headline ?? (
              <>
                {schoolName || 'Institutional'} <br />
                <span className="italic text-signature-gold block mt-4 lowercase">Engagements</span>
              </>
            )}
          </h1>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            {formatHeroUrl(heroSlide?.primaryButtonUrl) && heroSlide?.primaryButtonText && (
                <Link href={formatHeroUrl(heroSlide.primaryButtonUrl)}>
                <Button variant="gold">{heroSlide.primaryButtonText}</Button>
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
    </section>
  );
};

const MiniCalendar: React.FC<{ 
    currentDate: Date, 
    events: any[],
    onPrevMonth: () => void,
    onNextMonth: () => void,
    schoolName: string
}> = ({ currentDate, events, onPrevMonth, onNextMonth, schoolName }) => {
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    
    // Calculate days in month
    const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const eventDates = events
        .map(e => {
            const d = new Date(e.eventDate);
            return d.getDate();
        });

    return (
        <div className="font-sans">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onPrevMonth} 
                        className="w-10 h-10 flex items-center justify-center hover:text-signature-gold transition-colors -ml-3"
                        aria-label="Previous Month"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-signature-gold">{schoolName || 'Institutional'} Calendar</h3>
                    <button 
                        onClick={onNextMonth} 
                        className="w-10 h-10 flex items-center justify-center hover:text-signature-gold transition-colors"
                        aria-label="Next Month"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
                <span className="text-xs font-serif italic">{monthName} {year}</span>
            </div>

            <div className="grid grid-cols-7 gap-y-4 text-center border-b border-signature-navy/5 pb-8 mb-8">
                {weekDays.map((d, i) => (
                    <div key={i} className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{d}</div>
                ))}

                {blanks.map(b => (
                    <div key={`blank-${b}`} className="h-8"></div>
                ))}

                {days.map(day => {
                    const hasEvent = eventDates.includes(day);
                    return (
                        <div key={day} className="relative h-8 flex items-center justify-center group">
                            <span className={`text-xs transition-colors ${hasEvent ? 'text-signature-gold font-bold' : 'text-signature-navy/40'}`}>
                                {day}
                            </span>
                            {hasEvent && (
                                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-signature-gold"></div>
                            )}
                            {hasEvent && (
                                <div className="absolute inset-0 border border-signature-gold/20 rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default function Events({ data }: { data: TenantViewModel }) {
    const schoolKey = data?.school?.key;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState(data?.events || []);
    const [loading, setLoading] = useState(false);

    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Hero Logic
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
    const firstSlide = heroMedia[0] ?? null;

    const fetchEvents = useCallback(async (m: number, y: number) => {
        if (!schoolKey) return;
        setLoading(true);
        try {
            const result = await getMonthEventsAction(schoolKey, m, y);
            if (result.status === 'success') {
                setEvents(result.data);
            }
        } catch (err) {
            console.error('Failed to fetch events:', err);
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
        <LayoutWrapper>
            <div className="fade-in">
                {heroEnabled && firstSlide && <Hero heroSlide={firstSlide} schoolName={data?.school?.name || ''} />}
                
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-8">
                            <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-signature-gold mb-12">Upcoming Occasions</h2>
                            
                            {loading ? (
                                <div className="py-20 text-center">
                                    <div className="w-8 h-8 border-2 border-signature-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Updating engagement list...</p>
                                </div>
                            ) : events.length > 0 ? (
                                <div className="space-y-0">
                                    {events.map((event: any) => {
                                        const d = new Date(event.eventDate);
                                        const dayStr = d.getDate();
                                        const monthStr = d.toLocaleString('en-US', { month: 'short' });
                                        
                                        return (
                                            <div key={event.key} className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-signature-navy/10 transition-all hover:bg-signature-ivory/30 px-4 -mx-4 group">
                                                <div className="md:col-span-1">
                                                    <div className="text-4xl font-serif mb-2 text-signature-navy">{dayStr} <span className="text-lg italic text-signature-gold">{monthStr}</span></div>
                                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{event.category || 'General'}</div>
                                                </div>
                                                <div className="md:col-span-3">
                                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-signature-gold transition-colors text-signature-navy">{event.title}</h3>
                                                    <p className="text-gray-500 leading-relaxed mb-8 italic">{event.description}</p>
                                                    <div className="flex gap-4">
                                                        <span className="text-[10px] uppercase tracking-widest font-bold self-center text-signature-navy/60">{event.startTime || '9:00 AM'} • {event.location || 'Campus Center'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-20 text-center border border-dashed border-signature-navy/10 bg-signature-ivory/20">
                                    <p className="text-gray-400 text-sm italic">No scheduled engagements for this period.</p>
                                </div>
                            )}
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="bg-signature-ivory p-10 lg:p-12 border border-signature-navy/5 sticky top-32">
                                <MiniCalendar 
                                    currentDate={currentDate} 
                                    events={events} 
                                    onPrevMonth={handlePrevMonth} 
                                    onNextMonth={handleNextMonth} 
                                    schoolName={data?.school?.name || ''}
                                />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
