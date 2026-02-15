"use client";

import React from 'react';
import { SectionHeader, Button } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';

export default function Admissions() {
    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-48 bg-signature-ivory">
                <div className="max-w-[1400px] mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
                        <div>
                            <SectionHeader title="Institutional Registry" subtitle="Admissions 2024-25" />
                            <h2 className="text-6xl md:text-8xl font-serif mb-16 leading-[1.1] tracking-tighter">
                                Crafting a <br /><span className="italic text-signature-gold underline decoration-signature-gold/20 underline-offset-[12px]">Legacy</span> of Mind.
                            </h2>

                            <p className="text-2xl text-signature-navy/60 font-light leading-relaxed mb-24 max-w-lg italic border-l-2 border-signature-gold pl-12">
                                Entry into Sterling Signature Academy is a selective process designed to identify students who exhibit intellectual curiosity and leadership potential.
                            </p>

                            <div className="space-y-16">
                                {[
                                    { n: "01", t: "Portfolio Submission", d: "A comprehensive submission of academic transcripts, teacher recommendations, and a personal narrative that reveals the candidate's character." },
                                    { n: "02", t: "Signature Assessment", d: "A multi-disciplinary evaluation session focusing on critical reasoning, linguistic agility, and logical inquiry." },
                                    { n: "03", t: "The Registry Interview", d: "A formal dialogue with the Registry Board to assess institutional alignment and mutual aspirations." }
                                ].map((step) => (
                                    <div key={step.n} className="flex gap-12 items-start group">
                                        <div className="text-signature-gold font-serif text-5xl opacity-30 shrink-0 group-hover:opacity-100 transition-all duration-700">
                                            {step.n}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-2xl mb-4 tracking-tight group-hover:text-signature-gold transition-colors">{step.t}</h4>
                                            <p className="text-lg text-gray-500 font-light leading-relaxed">{step.d}</p>
                                            <div className="mt-8 w-8 h-px bg-signature-navy/10 group-hover:w-16 transition-all duration-700"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-signature-navy p-16 md:p-24 text-white shadow-[0_50px_100px_rgba(15,23,42,0.4)] relative">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-signature-gold/10"></div>
                            <div className="mb-16">
                                <h3 className="text-4xl font-serif mb-4">Registration Inquiry</h3>
                                <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Confidential Registry Protocol</p>
                            </div>

                            <form className="space-y-12" onSubmit={e => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold">Candidate Name</label>
                                        <input type="text" placeholder="Full Legal Name" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-signature-gold transition-colors text-lg" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold">Proposed Grade</label>
                                        <select className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-signature-gold transition-colors appearance-none cursor-pointer text-lg">
                                            <option className="bg-signature-navy">Foundation (Ages 3-5)</option>
                                            <option className="bg-signature-navy">Preparatory (Ages 6-10)</option>
                                            <option className="bg-signature-navy">High School (Ages 11-18)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold">Contact Email</label>
                                    <input type="email" placeholder="Institutional or Personal Email" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-signature-gold transition-colors text-lg" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold">Inquiry Narrative</label>
                                    <textarea rows={4} placeholder="Briefly describe the candidate's interests..." className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-signature-gold transition-colors resize-none text-lg"></textarea>
                                </div>
                                <div className="pt-12">
                                    <button className="w-full py-8 bg-signature-gold text-white text-[12px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-signature-navy transition-all duration-1000 shadow-2xl relative group">
                                        <span className="relative z-10">Dispatch Registry Request</span>
                                        <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></div>
                                    </button>
                                    <div className="flex items-center justify-center gap-4 mt-12 opacity-30">
                                        <div className="w-8 h-px bg-white"></div>
                                        <p className="text-[9px] uppercase tracking-[0.6em] italic">Secure Data Protocol Active</p>
                                        <div className="w-8 h-px bg-white"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
