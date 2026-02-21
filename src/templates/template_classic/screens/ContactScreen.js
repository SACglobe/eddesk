"use client";
import React from 'react';

const ContactScreen = ({ data }) => {
    const SCHOOL_PROFILE = {
        address: data?.address || '',
        phone: data?.phone || '',
        email: data?.email || '',
        office_hours: data?.officeHours || 'Mon - Fri: 8:00 AM - 4:00 PM'
    };

    return (
        <div className="fade-in">
            <section className="bg-emerald-900 py-24 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <span className="text-emerald-300 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Institutional Access</span>
                    <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest">Connect with Us</h1>
                    <div className="h-1 w-20 bg-emerald-400 mx-auto mt-8"></div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Contact Details */}
                        <div className="space-y-16">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 serif uppercase tracking-widest mb-8 flex items-center gap-4">
                                    <span className="w-8 h-[2px] bg-emerald-900"></span> Institutional Address
                                </h2>
                                <div className="p-8 bg-emerald-50 border border-emerald-100 text-emerald-950 leading-relaxed font-medium serif text-lg italic shadow-sm">
                                    {SCHOOL_PROFILE.address}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 serif uppercase tracking-widest mb-8 flex items-center gap-4">
                                    <span className="w-8 h-[2px] bg-emerald-900"></span> Core Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-6 items-center group">
                                        <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-widest mb-1">Telephone</p>
                                            <p className="font-bold text-slate-900">{SCHOOL_PROFILE.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-center group">
                                        <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center text-emerald-900 group-hover:bg-emerald-900 group-hover:text-white transition-all">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-widest mb-1">Email Domain</p>
                                            <p className="font-bold text-slate-900">{SCHOOL_PROFILE.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 serif uppercase tracking-widest mb-8 flex items-center gap-4">
                                    <span className="w-8 h-[2px] bg-emerald-900"></span> Office Hours
                                </h2>
                                <div className="p-8 border-l-4 border-emerald-900 bg-emerald-50/50">
                                    <p className="font-bold text-emerald-900 uppercase tracking-widest text-sm mb-2">Standard Operations</p>
                                    <p className="text-slate-600 font-medium">{SCHOOL_PROFILE.office_hours}</p>
                                    <p className="text-xs text-emerald-400 mt-4 uppercase tracking-widest font-bold">* Excluding Public Holidays</p>
                                </div>
                            </div>
                        </div>

                        {/* Formal Contact Form */}
                        <div className="bg-white border border-slate-200 shadow-2xl p-10 md:p-16 border-t-8 border-t-emerald-900">
                            <h2 className="text-3xl font-bold text-slate-900 serif uppercase tracking-widest mb-2">Formal Query</h2>
                            <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-12">Institutional Communications</p>

                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest mb-2 block">Full Name</label>
                                        <input type="text" className="w-full bg-slate-100 border-b-2 border-emerald-100 py-3 px-4 focus:outline-none focus:border-emerald-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400" placeholder="e.g. Robert Smith" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest mb-2 block">Contact Number</label>
                                        <input type="tel" className="w-full bg-slate-100 border-b-2 border-emerald-100 py-3 px-4 focus:outline-none focus:border-emerald-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400" placeholder="+91 000 000 0000" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest mb-2 block">Email Address</label>
                                    <input type="email" className="w-full bg-slate-100 border-b-2 border-emerald-100 py-3 px-4 focus:outline-none focus:border-emerald-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400" placeholder="smith@example.com" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest mb-2 block">Query Department</label>
                                    <select className="w-full bg-slate-100 border-b-2 border-emerald-100 py-3 px-4 focus:outline-none focus:border-emerald-900 focus:bg-white transition-all text-slate-900 cursor-pointer">
                                        <option>Admissions & Enrollment</option>
                                        <option>Academic Records</option>
                                        <option>Finance & Fees</option>
                                        <option>General Institutional Inquiry</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] text-emerald-700 uppercase font-bold tracking-widest mb-2 block">Message Detail</label>
                                    <textarea rows={4} className="w-full bg-slate-100 border-b-2 border-emerald-100 py-3 px-4 focus:outline-none focus:border-emerald-900 focus:bg-white transition-all text-slate-900 resize-none placeholder:text-slate-400" placeholder="Provide a detailed brief..."></textarea>
                                </div>
                                <button className="w-full py-5 bg-emerald-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-950 transition-all shadow-lg active:scale-[0.98]">Submit Formal Communication</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactScreen;
