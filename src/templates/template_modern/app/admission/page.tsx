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
        <div className="bg-white">
            {/* 1. Hero Section (Same as Home) */}
            {heroMedia.length > 0 && (
                <HeroSlider slides={heroMedia} />
            )}

            {/* 2. Admission Form Section */}
            <div className="py-20 relative overflow-hidden bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter mb-4">
                            Apply <span className="text-emerald-500">Now</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-emerald-500 mx-auto"></div>
                    </motion.div>
                    
                    <div className="max-w-4xl mx-auto">
                        <AdmissionForm schoolkey={schoolKey} schoolname={schoolName} />
                    </div>
                </div>
            </div>

            {/* 3. Admission Instructions Section */}
            {admissionInstructions.length > 0 && (
                <div className="py-20 bg-white">
                    <AdmissionInstructions steps={admissionInstructions} schoolName={schoolName} />
                </div>
            )}

            {/* 4. Support Footer Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                        
                        <h3 className="text-4xl md:text-5xl font-black mb-8 italic uppercase tracking-tight relative z-10">Need Assistance?</h3>
                        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto relative z-10">Our admission coordinators are here to help you with the registration process or any specific queries about the academy.</p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative z-10">
                            <a href={`tel:${data?.school?.phone}`} className="flex flex-col items-center gap-4 group/item">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover/item:bg-emerald-600 transition-colors duration-300">
                                    <span className="text-2xl italic">📞</span>
                                </div>
                                <span className="text-xl font-bold">{data?.school?.phone || '+91 98765 43210'}</span>
                                <span className="text-xs uppercase tracking-widest text-slate-500 font-black">Call Support</span>
                            </a>
                            
                            <a href={`mailto:${data?.school?.email}`} className="flex flex-col items-center gap-4 group/item">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover/item:bg-emerald-600 transition-colors duration-300">
                                    <span className="text-2xl italic">✉️</span>
                                </div>
                                <span className="text-xl font-bold">{data?.school?.email || 'admissions@school.com'}</span>
                                <span className="text-xs uppercase tracking-widest text-slate-500 font-black">Email Desk</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Admissions;
