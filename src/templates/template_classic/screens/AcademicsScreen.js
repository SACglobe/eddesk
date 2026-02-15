import React from 'react';
import { MOCK_DATA } from '../constants/mockData';

const AcademicsScreen = () => {
    const { ACADEMICS } = MOCK_DATA;

    return (
        <div className="max-w-[1600px] mx-auto px-2 md:px-6 py-20 fade-in">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-widest serif">Academic Standards</h1>
                <div className="h-1 w-20 bg-emerald-900 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-16">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest serif border-b border-emerald-50 pb-4 mb-8">Curriculum Overview</h2>
                        <p className="text-slate-700 leading-relaxed text-lg">{ACADEMICS.curriculum}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest serif border-b border-emerald-50 pb-4 mb-8">Code of Conduct</h2>
                        <ul className="space-y-6">
                            {ACADEMICS.rules_and_regulations.map((rule, idx) => (
                                <li key={idx} className="flex gap-4 items-start group">
                                    <span className="text-emerald-100 text-3xl font-bold leading-none group-hover:text-emerald-500 transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                                    <p className="text-slate-700 font-medium pt-1">{rule}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest serif border-b border-emerald-50 pb-4 mb-8">Dress Code</h2>
                        <div className="p-8 bg-emerald-50 border-l-4 border-emerald-900 text-slate-700 leading-relaxed shadow-sm">
                            {ACADEMICS.dress_code}
                        </div>
                    </section>
                </div>

                <div className="space-y-12">
                    <div className="p-8 border border-emerald-100 bg-white shadow-lg">
                        <h2 className="text-xl font-bold text-emerald-900 uppercase tracking-widest serif mb-6">School Hours</h2>
                        <div className="space-y-4">
                            {ACADEMICS.school_timings.map((time, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-emerald-50 pb-3">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">{time.period}</span>
                                    <span className="text-sm font-bold text-emerald-900">{time.time}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-emerald-50 text-[10px] text-emerald-400 uppercase tracking-widest text-center font-bold">
                            Standard Academic Schedule
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicsScreen;
