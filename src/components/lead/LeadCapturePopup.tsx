'use client';

import React, { useState, useEffect } from 'react';
import { leadViewModel, LeadData } from '@/core/viewmodels/lead.viewmodel';

interface LeadCapturePopupProps {
    templateSlug: string;
}

export default function LeadCapturePopup({ templateSlug }: LeadCapturePopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        if (!leadViewModel.shouldShowPopup()) return;

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (window.scrollY / scrollHeight) * 100;

            if (scrollPercentage > 50 && !isVisible) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: LeadData = {
            ...formData,
            templateSlug,
            timestamp: new Date().toISOString()
        };
        const result = await leadViewModel.submitLead(data);
        if (result.success) {
            setIsSubmitted(true);
            setTimeout(() => setIsVisible(false), 3000);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-500">
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
                {/* Header Gradient */}
                <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-indigo-600" />

                <div className="p-8">
                    {!isSubmitted ? (
                        <>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Love this template?</h3>
                                <p className="text-slate-500">Get your institution online with EdDesk in under 24 hours. Leave your details for a free demo.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Work Email"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Phone Number"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Your Message (Optional)"
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                                >
                                    Get Pricing & Demo →
                                </button>

                                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                                    Trusted by 500+ Institutions
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="py-8 text-center animate-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                            <p className="text-slate-500 italic">Our education consulting team will reach out within the next few hours with your custom pricing plan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
