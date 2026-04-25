"use client";

import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import AdmissionForm from '@/components/admission/AdmissionForm';
import AdmissionInstructions from '@/components/admission/AdmissionInstructions';
import HeroSlider from '../../components/HeroSlider';
import { motion } from 'framer-motion';

const Admissions: React.FC<{ data?: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    const admissionInstructions = data?.admissionInstructions ?? [];
    const schoolKey = data?.school?.key ?? '';
    
    // 1. Hero
    const heroMedia = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    return (
        <div className="bg-slate-50/50 min-h-screen">
            {/* 1. Hero Section */}
            {heroMedia.length > 0 && (
                <HeroSlider slides={heroMedia} heightClass="h-[40vh] md:h-[50vh]" />
            )}

            <div className="py-12 md:py-20 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-12 items-start">
                    
                    {/* Left Column: Admission Form */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="mb-12">
                                <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a8a] mb-4">
                                    Admission Inquiry
                                </h2>
                                <div className="w-20 h-1 bg-[#fbbf24]"></div>
                            </div>
                            
                            <AdmissionForm schoolkey={schoolKey} schoolname={schoolName} />
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8 sticky top-32">
                        {/* Enrollment Pathway (Instructions) */}
                        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h3 className="text-2xl font-serif text-[#1e3a8a] mb-8">Enrollment Pathway</h3>
                            <AdmissionInstructions steps={admissionInstructions} schoolName={schoolName} />
                        </div>

                        {/* Assistance Center */}
                        <div className="bg-[#1e3a8a] rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                            
                            <h3 className="text-2xl font-serif mb-4 relative z-10 text-[#fbbf24]">Assistance Center</h3>
                            <p className="text-blue-100/60 text-sm mb-10 relative z-10 leading-relaxed">
                                Our admission coordinators are available to guide you through every step of the process.
                            </p>

                            <div className="space-y-6 relative z-10">
                                <a 
                                    href={`tel:${data?.contactDetails?.phone || data?.school?.phone}`} 
                                    className="flex items-center gap-4 group/link"
                                >
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover/link:bg-[#fbbf24] group-hover/link:text-[#1e3a8a] transition-all">
                                        <span className="text-lg">📞</span>
                                    </div>
                                    <span className="text-lg font-bold group-hover/link:text-[#fbbf24] transition-colors">{data?.contactDetails?.phone || data?.school?.phone || '+91 999 0000'}</span>
                                </a>

                                <a 
                                    href={`mailto:${data?.contactDetails?.email || data?.school?.email}`} 
                                    className="flex items-center gap-4 group/link"
                                >
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover/link:bg-[#fbbf24] group-hover/link:text-[#1e3a8a] transition-all">
                                        <span className="text-lg">✉️</span>
                                    </div>
                                    <span className="text-sm font-medium text-blue-100 group-hover/link:text-[#fbbf24] transition-colors">
                                        {data?.contactDetails?.email || data?.school?.email || 'admissions@school.com'}
                                    </span>
                                </a>

                                <button className="w-full mt-4 bg-[#fbbf24] hover:bg-white text-[#1e3a8a] py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-yellow-500/20">
                                    Schedule a Call
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
