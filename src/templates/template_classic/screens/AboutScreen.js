import React from 'react';
import { MOCK_DATA } from '../constants/mockData';

const AboutScreen = () => {
    const { SCHOOL_PROFILE, LEADERSHIP } = MOCK_DATA;

    const reasons = [
        { title: "Academic Rigor", desc: "A curriculum designed to challenge and inspire high-performers." },
        { title: "Disciplined Culture", desc: "A strict yet supportive environment that builds character." },
        { title: "Tradition & Legacy", desc: "72 years of producing leaders and scholars." },
        { title: "Expert Faculty", desc: "Mentors who are subject matter experts and dedicated educators." }
    ];

    return (
        <div className="fade-in">
            {/* Hero Header */}
            <section className="bg-emerald-900 py-24 text-center">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <span className="text-emerald-300 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Institutional History</span>
                    <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest">More Than a School</h1>
                    <div className="h-1 w-20 bg-emerald-400 mx-auto mt-8"></div>
                </div>
            </section>

            {/* Overview & Core Values */}
            <section className="py-24 bg-white">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="prose prose-emerald prose-lg max-w-none serif text-slate-700 leading-relaxed">
                            <h2 className="text-3xl font-bold text-emerald-900 uppercase tracking-widest not-italic mb-8 border-b border-emerald-50 pb-4">Our Heritage</h2>
                            <p>{SCHOOL_PROFILE.school_overview}</p>
                            <p className="mt-6">At {SCHOOL_PROFILE.school_name}, we believe that true education is a symbiotic relationship between intellectual development and moral character. Our roots are deep, but our vision is future-oriented.</p>
                        </div>
                        <div className="space-y-8">
                            <div className="p-10 border border-emerald-100 bg-emerald-50/30 relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-900"></div>
                                <h3 className="text-xl font-bold uppercase tracking-widest serif mb-4 text-emerald-900">Our Vision</h3>
                                <p className="text-slate-600 italic leading-relaxed">"{SCHOOL_PROFILE.vision}"</p>
                            </div>
                            <div className="p-10 border border-emerald-100 bg-emerald-50/30 relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-900"></div>
                                <h3 className="text-xl font-bold uppercase tracking-widest serif mb-4 text-emerald-900">Our Mission</h3>
                                <p className="text-slate-600 italic leading-relaxed">"{SCHOOL_PROFILE.mission}"</p>
                            </div>
                            <div className="p-10 bg-emerald-900 text-white text-center shadow-xl">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-4">Institutional Motto</span>
                                <p className="text-3xl font-bold serif italic uppercase">"{SCHOOL_PROFILE.motto}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Parents Choose Section */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Why Parents Choose Us</h2>
                        <div className="h-1 w-20 bg-emerald-900 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {reasons.map((item, idx) => (
                            <div key={idx} className="bg-white p-10 border border-slate-200 text-center hover:border-emerald-300 hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 bg-emerald-900 mx-auto mb-6 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                                    {idx + 1}
                                </div>
                                <h4 className="font-bold text-slate-900 serif uppercase text-sm mb-4 tracking-tight">{item.title}</h4>
                                <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest group-hover:text-emerald-600 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Principal detailed section */}
            <section className="py-24 bg-white">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
                        <div className="w-full md:w-5/12">
                            <img src={LEADERSHIP.principal_image} alt="Principal" className="w-full border border-slate-200 shadow-2xl rounded-sm" />
                        </div>
                        <div className="w-full md:w-7/12">
                            <h2 className="text-3xl font-bold text-emerald-900 uppercase tracking-widest serif mb-2">From the Principal's Desk</h2>
                            <div className="h-1 w-20 bg-emerald-900 mb-10"></div>
                            <div className="prose prose-emerald prose-lg serif text-slate-700 italic">
                                <p>"{LEADERSHIP.principal_message}"</p>
                            </div>
                            <div className="mt-12">
                                <p className="font-bold text-2xl serif text-slate-900 uppercase">{LEADERSHIP.principal_name}</p>
                                <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-[0.3em]">Chief Academic Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutScreen;
