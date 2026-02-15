"use client";

import React from 'react';
import { schoolData } from '../../data';
import LayoutWrapper from '../../components/LayoutWrapper';

const MiniCalendar: React.FC = () => {
    const monthName = "November";
    const year = 2023;
    const daysInMonth = 30;
    const firstDayOfMonth = 3;

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const eventDates = schoolData.events
        .filter(e => e.date.includes('Nov'))
        .map(e => parseInt(e.date.match(/\d+/)?.[0] || '0'));

    return (
        <div className="font-sans">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-signature-gold">Institutional Calendar</h3>
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

            <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Selected Resources</h4>
                <ul className="space-y-4">
                    {['Academic Calendar 2024', 'Founders Week Program'].map((doc, i) => (
                        <li key={i} className="flex justify-between items-center group cursor-pointer border-b border-signature-navy/5 pb-4">
                            <span className="text-[12px] group-hover:text-signature-gold transition-colors">{doc}</span>
                            <svg className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default function Events() {
    return (
        <LayoutWrapper>
            <div className="fade-in py-24 pt-48">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-6xl md:text-8xl font-serif mb-24">Public <br /><span className="italic text-signature-gold">Engagements</span></h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-8">
                            <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold text-signature-gold mb-12">Upcoming Occasions</h2>
                            <div className="space-y-0">
                                {schoolData.events.map((event) => (
                                    <div key={event.id} className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-signature-navy/10 group cursor-pointer">
                                        <div className="md:col-span-1">
                                            <div className="text-3xl font-serif mb-2">{event.date.split(',')[0]}</div>
                                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{event.category}</div>
                                        </div>
                                        <div className="md:col-span-3">
                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-signature-gold transition-colors">{event.title}</h3>
                                            <p className="text-gray-500 leading-relaxed mb-8">{event.description}</p>
                                            <div className="flex gap-4">
                                                <button className="w-10 h-10 rounded-full border border-signature-navy flex items-center justify-center hover:bg-signature-navy hover:text-white transition-all">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                                </button>
                                                <span className="text-[10px] uppercase tracking-widest font-bold self-center">Add to Calendar</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="bg-signature-ivory p-10 lg:p-12 border border-signature-navy/5 sticky top-32">
                                <MiniCalendar />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
