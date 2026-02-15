"use client";

import React from 'react';
import { schoolData } from '../../data';
import { SectionHeader, Button } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';

export default function About() {
    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-32 max-w-4xl">
                        <SectionHeader title="More Than a School" subtitle="An Institution of Tradition" />
                        <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">Heritage in every <span className="italic text-signature-gold">Decision.</span></h1>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
                        <div className="bg-signature-navy text-white p-12 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-signature-gold opacity-10 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-signature-gold uppercase tracking-[0.4em] text-[11px] font-bold mb-8">Our Vision</h3>
                            <p className="text-2xl font-serif italic leading-relaxed">{schoolData.vision}</p>
                        </div>
                        <div className="bg-signature-gold text-white p-12 relative group overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-signature-navy opacity-10 translate-y-1/2 -translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-signature-navy uppercase tracking-[0.4em] text-[11px] font-bold mb-8">Our Mission</h3>
                            <p className="text-2xl font-serif italic leading-relaxed">{schoolData.mission}</p>
                        </div>
                        <div className="bg-signature-ivory border border-signature-navy/5 p-12 flex flex-col justify-center">
                            <h3 className="text-signature-navy uppercase tracking-[0.4em] text-[11px] font-bold mb-8">Our Motto</h3>
                            <p className="text-4xl font-serif text-signature-navy tracking-tight">{schoolData.motto}</p>
                        </div>
                    </div>

                    <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                        <div className="lg:col-span-5 sticky top-32">
                            <div className="relative">
                                <img src={schoolData.principalMessage.image} className="w-full aspect-[4/5] object-cover grayscale border border-signature-navy/10 shadow-2xl" alt="Principal" />
                                <div className="absolute -bottom-8 -right-8 bg-signature-gold text-white p-10 hidden md:block">
                                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Authorized Signature</span>
                                    <p className="font-serif italic text-xl mt-2">{schoolData.principalMessage.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 pt-12">
                            <SectionHeader title="From the Desk of the Principal" subtitle="Academic Leadership" />
                            <div className="space-y-8 text-xl font-light text-signature-navy/80 leading-loose">
                                <p className="font-serif italic text-3xl text-signature-navy mb-12 border-l-4 border-signature-gold pl-10">
                                    "{schoolData.principalMessage.text}"
                                </p>
                                <p>Education at Sterling is not merely the transmission of data; it is the forging of character. We treat our curriculum as a canvas, where students paint their futures with the strokes of critical inquiry and moral courage.</p>
                                <p>Our faculty, many of whom hold terminal degrees in their fields, serve not just as teachers but as mentors and stewards of the intellectual tradition. We invite you to join a community where mastery is the only standard.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-signature-navy text-white py-32 px-12 md:px-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-signature-gold opacity-5 skew-x-12 translate-x-1/2"></div>
                        <SectionHeader title="Why Parents Choose Our School" subtitle="A Trusted Legacy" light />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 relative z-10">
                            {[
                                { t: "Rigorous Standards", d: "Academic excellence is not a target, it's our institutional baseline, maintained through constant faculty development." },
                                { t: "Individual Attention", d: "Our low student-to-teacher ratio ensures no spark of brilliance is overlooked in the crowd." },
                                { t: "Global Network", d: "Our alumni occupy influential positions in diverse sectors across six continents, providing an unmatched network." },
                                { t: "Ethical Core", d: "Character development and ethical reasoning are central pillars of our holistic curriculum from year one." }
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="w-8 h-px bg-signature-gold mb-6 group-hover:w-16 transition-all duration-500"></div>
                                    <h4 className="text-2xl font-serif mb-4">{item.t}</h4>
                                    <p className="text-white/50 text-base font-light leading-relaxed">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </LayoutWrapper>
    );
}
