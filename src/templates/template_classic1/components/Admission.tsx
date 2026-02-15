
"use client";
import React from 'react';
import { SchoolContent } from '../../../lib/constants/types';
import styles from '../styles/scoped.module.css';

interface AdmissionProps {
    data: SchoolContent;
}

const Admission: React.FC<AdmissionProps> = ({ data }) => {
    return (
        <div className={`bg-white ${styles.fadeIn}`}>
            {/* Minimal Header */}
            <div className="h-[300px] bg-slate-900 flex items-center justify-center border-b border-emerald-900/20">
                <div className="text-center space-y-4">
                    <div className="text-emerald-500 font-black tracking-[0.5em] text-xs uppercase italic">Join Our Family</div>
                    <h1 className={`text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter ${styles.serif}`}>Admissions</h1>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2 space-y-16">
                        <section>
                            <h2 className={`text-3xl font-bold text-slate-900 uppercase tracking-tighter mb-8 ${styles.serif}`}>Process Overview</h2>
                            <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                {data.admission.overview}
                            </p>
                        </section>

                        <section>
                            <h2 className={`text-3xl font-bold text-slate-900 uppercase tracking-tighter mb-10 ${styles.serif}`}>Steps to Success</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {data.admission.process.split(',').map((step, i) => (
                                    <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-all">
                                        <div className="w-12 h-12 bg-emerald-900 text-white flex items-center justify-center font-black text-xl rounded-sm group-hover:scale-110 transition-transform">
                                            {i + 1}
                                        </div>
                                        <span className="text-lg font-bold text-slate-800 uppercase tracking-widest">{step.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="p-10 bg-emerald-900 text-white rounded-sm shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Secure Your Spot</h3>
                                <p className="text-emerald-100 text-sm mb-10 leading-relaxed font-medium">Click below to proceed to our secure fee payment portal and finalize your registration.</p>
                                <a href={data.admission.feePaymentUrl} target="_blank" className="inline-block px-8 py-4 bg-white text-emerald-900 font-black uppercase tracking-widest text-xs hover:bg-emerald-50 transition-colors shadow-lg">
                                    Pay Admission Fee →
                                </a>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-white border-2 border-slate-100 p-12 sticky top-40 shadow-sm hover:shadow-2xl transition-all">
                            <h3 className={`text-3xl font-bold text-slate-900 uppercase tracking-tighter mb-10 ${styles.serif}`}>Inquiry Form</h3>
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                {data.admission.formFields.map((field, i) => (
                                    <div key={i} className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{field.label}</label>
                                        {field.type === 'select' ? (
                                            <select className="w-full border-b-2 border-slate-200 py-3 focus:outline-none focus:border-emerald-900 font-bold text-slate-800 bg-transparent transition-all">
                                                <option>Select Option</option>
                                                <option>Grade 6</option>
                                                <option>Grade 7</option>
                                                <option>Grade 8</option>
                                            </select>
                                        ) : (
                                            <input
                                                type={field.type}
                                                required={field.required}
                                                className="w-full border-b-2 border-slate-200 py-3 focus:outline-none focus:border-emerald-900 font-bold text-slate-800 bg-transparent transition-all"
                                                placeholder={`Enter ${field.label}...`}
                                            />
                                        )}
                                    </div>
                                ))}
                                <button className="w-full py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-emerald-900 transition-all shadow-xl active:scale-[0.98]">
                                    Submit Inquiry
                                </button>
                                <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-relaxed">
                                    {data.admission.contactNote}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admission;
