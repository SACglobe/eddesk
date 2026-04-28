import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { isValidImageUrl, formatHeroUrl } from '@/core/utils/url';
import AdmissionForm from '../../../components/admission/AdmissionForm';
import AdmissionInstructions from '../../../components/admission/AdmissionInstructions';

const AdmissionScreen = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const schoolName = data?.school?.name ?? 'Our School';
    const admissionInstructions = data?.admissionInstructions ?? [];
    const schoolKey = data?.school?.key ?? '';
    const admissionFeeUrl = data?.paymentLinks?.find(l => l.linkType === 'admission_fee')?.url || '#';

    // Hero Data Mapping (Same as Home)
    const heroSlides = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    if (heroSlides.length === 0) {
        heroSlides.push({
            headline: 'Institutional Admission',
            subheadline: 'Session 2025-26',
            mediaUrl: '',
            primaryButtonText: '',
            primaryButtonUrl: '',
            secondaryButtonText: '',
            secondaryButtonUrl: ''
        });
    }

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const heroTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(heroTimer);
    }, [heroSlides.length]);

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero Section (Same as Home) */}
            {heroSlides.length > 0 && (
                <section className="h-[60vh] md:h-[70vh] relative overflow-hidden bg-slate-900 mb-12">
                    {heroSlides.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                            style={{ transition: 'opacity 1s ease-in-out, transform 10s linear' }}
                        >
                            {slide.mediaUrl && isValidImageUrl(slide.mediaUrl) ? (
                                <>
                                    <img src={slide.mediaUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 z-10" />
                                </>
                            ) : (
                                <div className="w-full h-full bg-emerald-900/20" />
                            )}
                        </div>
                    ))}

                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                        <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6 animate-fade-up">
                            {heroSlides[currentSlide]?.subheadline || 'Institutional Admission'}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 serif tracking-tight leading-tight max-w-5xl animate-fade-up-delayed">
                            {heroSlides[currentSlide]?.headline || 'Join Our Legacy'}
                        </h1>
                        <div className="flex gap-4 animate-fade-up-extra">
                            {formatHeroUrl(heroSlides[currentSlide]?.primaryButtonUrl) && heroSlides[currentSlide]?.primaryButtonText && (
                                <Link 
                                    href={formatHeroUrl(heroSlides[currentSlide]?.primaryButtonUrl)} 
                                    className="px-8 py-3 bg-white text-emerald-900 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl inline-block"
                                >
                                    {heroSlides[currentSlide].primaryButtonText}
                                </Link>
                            )}
                            {formatHeroUrl(heroSlides[currentSlide]?.secondaryButtonUrl) && heroSlides[currentSlide]?.secondaryButtonText && (
                                <Link 
                                    href={formatHeroUrl(heroSlides[currentSlide]?.secondaryButtonUrl)} 
                                    className="px-8 py-3 bg-transparent border border-white text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all inline-block"
                                >
                                    {heroSlides[currentSlide].secondaryButtonText}
                                </Link>
                            )}
                        </div>
                    </div>

                    {heroSlides.length > 1 && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-12 h-1 transition-all ${idx === currentSlide ? 'bg-emerald-400' : 'bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* 2. Main Content: Fee & Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Fee & Information */}
                    <div className="lg:col-span-1 space-y-12">
                        <section className="p-10 bg-emerald-900 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"></div>
                            <h3 className="text-2xl font-bold serif uppercase tracking-widest mb-6">Online Fee Remittance</h3>
                            <p className="text-emerald-200 text-sm mb-10 leading-relaxed font-medium">
                                Securely process admission fees and departmental charges through our centralized payment gateway. 
                            </p>
                            <a
                                href={admissionFeeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full py-4 bg-white text-emerald-900 text-center text-xs font-black uppercase tracking-[0.3em] hover:bg-emerald-50 transition-all shadow-xl"
                            >
                                Secure Payment Portal
                            </a>
                        </section>

                        <section className="p-10 border border-slate-200 bg-white">
                            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-emerald-900/10 pb-4 serif">Support Desk</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Telephonic Support</p>
                                    <p className="text-slate-900 font-bold">{data?.school?.phone || '+91 98765 43210'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Electronic Correspondence</p>
                                    <p className="text-slate-900 font-bold overflow-hidden text-ellipsis">{data?.school?.email || 'admissions@school.edu'}</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Admission Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border-t-[10px] border-t-emerald-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-10 md:p-16">
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight serif mb-2">Electronic Application</h2>
                                <p className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.4em]">Section: Institutional Registry Protocol</p>
                            </div>

                            <AdmissionForm schoolkey={schoolKey} schoolname={schoolName} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Instructions Section */}
            {admissionInstructions.length > 0 && (
                <div className="border-y border-slate-100 bg-slate-50/50">
                    <AdmissionInstructions steps={admissionInstructions} schoolName={schoolName} />
                </div>
            )}
            <style jsx>{`
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .animate-fade-up-delayed { animation: fadeUp 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-up-extra { animation: fadeUp 1s ease-out 0.6s forwards; opacity: 0; }
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
        </div>
    );
};

export default AdmissionScreen;
