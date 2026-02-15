"use client";

import React from 'react';
import { schoolData } from '../../data';
import LayoutWrapper from '../../components/LayoutWrapper';

export default function Academics() {
    return (
        <LayoutWrapper>
            <div className="fade-in py-24 pt-48">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-32">
                        <h1 className="text-6xl md:text-8xl font-serif mb-12">Academic <br /><span className="italic text-signature-gold">Framework</span></h1>
                        <p className="text-2xl font-light text-gray-500 max-w-2xl border-l-2 border-signature-gold pl-8">
                            {schoolData.academics.curriculum} — A world-class pedagogy focused on mastery, creativity, and critical inquiry.
                        </p>
                    </header>

                    <section className="space-y-32">
                        {schoolData.academics.levels.map((level, i) => (
                            <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-signature-navy/10 pt-16">
                                <div className="lg:col-span-4">
                                    <div className="text-signature-gold font-bold tracking-[0.5em] uppercase text-[10px] mb-4">Phase {i + 1}</div>
                                    <h2 className="text-4xl font-serif leading-tight">{level.title}</h2>
                                </div>
                                <div className="lg:col-span-8">
                                    <p className="text-2xl font-light text-signature-navy leading-relaxed mb-8">
                                        {level.description}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-500 text-sm leading-loose">
                                        <div>
                                            <h4 className="text-signature-navy font-bold uppercase tracking-widest text-[10px] mb-4">Key Focus Areas</h4>
                                            <ul className="space-y-2 list-disc list-inside">
                                                <li>Interdisciplinary Research</li>
                                                <li>Conceptual Mastery</li>
                                                <li>Collaborative Problem Solving</li>
                                                <li>Ethical Reasoning</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-signature-navy font-bold uppercase tracking-widest text-[10px] mb-4">Outcome</h4>
                                            <p>Graduates are equipped with a portfolio of achievements and the resilience required for top-tier global university environments.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="mt-48 py-24 border-t border-signature-navy/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                            <div>
                                <h3 className="text-2xl font-serif mb-8 italic">Language of Instruction</h3>
                                <p className="text-gray-500 leading-relaxed">English is the primary medium of instruction, supplemented by a rich choice of global languages including French, Spanish, and Mandarin as part of our commitment to producing global citizens.</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif mb-8 italic">Assessment Philosophy</h3>
                                <p className="text-gray-500 leading-relaxed">We move beyond rote memorization. Our assessments are formative and diverse, involving vivas, research papers, and practical projects that mirror real-world professional challenges.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </LayoutWrapper>
    );
}
