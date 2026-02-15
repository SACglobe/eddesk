"use client";

import React from 'react';
import { schoolData } from '../../data';
import { SectionHeader } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';

export default function Faculty() {
    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-32 text-center max-w-4xl mx-auto">
                        <SectionHeader title="Meet the Faculty" subtitle="Instructional Excellence" center />
                        <h1 className="text-6xl md:text-8xl font-serif mb-12">Architects of <span className="italic text-signature-gold">Mind.</span></h1>
                        <p className="text-2xl font-light text-signature-navy/60 leading-relaxed italic">
                            Our faculty is composed of distinguished scholars, terminal degree holders, and seasoned practitioners dedicated to the stewardship of intellectual growth.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
                        {schoolData.boardMembers.map((member, i) => (
                            <div key={i} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                                <div className="lg:col-span-5 relative overflow-hidden">
                                    <div className="aspect-[4/5] bg-signature-navy">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                        />
                                    </div>
                                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-signature-gold/30"></div>
                                </div>
                                <div className="lg:col-span-7 flex flex-col justify-center h-full">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4">{member.role}</span>
                                    <h3 className="text-4xl font-serif mb-8 group-hover:text-signature-gold transition-colors">{member.name}</h3>
                                    <p className="text-lg text-gray-500 font-light leading-relaxed mb-8">
                                        {member.description}
                                    </p>
                                    <div className="w-12 h-px bg-signature-navy/10 group-hover:w-24 group-hover:bg-signature-gold transition-all duration-700"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <section className="mt-48 py-32 bg-signature-navy text-white px-12 md:px-24 relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-signature-gold/5 pointer-events-none"></div>
                        <div className="max-w-3xl mx-auto relative z-10">
                            <h2 className="text-4xl font-serif mb-8">Continuous <span className="italic">Development</span></h2>
                            <p className="text-white/50 text-xl font-light leading-loose mb-12">
                                Our educators participate in annual colloquiums at Oxford, Cambridge, and Yale to ensure our pedagogy remains at the absolute frontier of global educational standards.
                            </p>
                            <div className="flex justify-center gap-4">
                                <div className="w-1 h-1 bg-signature-gold rounded-full"></div>
                                <div className="w-1 h-1 bg-signature-gold rounded-full"></div>
                                <div className="w-1 h-1 bg-signature-gold rounded-full"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </LayoutWrapper>
    );
}
