import React from 'react';
import { MOCK_DATA } from '../constants/mockData';

const InfrastructureScreen = () => {
    const { INFRASTRUCTURE } = MOCK_DATA;

    const FacilityCard = ({ title, items, icon, color }) => (
        <div className="bg-white border border-slate-200 p-10 hover:shadow-2xl hover:border-emerald-300 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 transition-transform group-hover:scale-110 opacity-10 ${color}`}></div>
            <div className="mb-6 text-emerald-900">{icon}</div>
            <h3 className="text-xl font-bold text-slate-900 serif uppercase tracking-widest mb-6">{title}</h3>
            <ul className="space-y-3">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="fade-in">
            {/* Hero Header */}
            <section className="bg-emerald-900 py-24 text-center">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <span className="text-emerald-300 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Campus Environment</span>
                    <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest">Institutional Infrastructure</h1>
                    <div className="h-1 w-20 bg-emerald-400 mx-auto mt-8"></div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-24 bg-white">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-8 border-b border-emerald-50 pb-4">Built for Brilliance</h2>
                            <p className="text-slate-700 leading-relaxed text-lg serif italic">
                                Our campus is a synthesis of traditional architectural integrity and modern educational technology. We provide an ecosystem where every square foot is optimized for cognitive growth and physical well-being.
                            </p>
                            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-emerald-50 pt-10">
                                <div>
                                    <span className="block text-3xl font-bold text-emerald-900 serif mb-1">15+</span>
                                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Specialized Centers</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-bold text-emerald-900 serif mb-1">100%</span>
                                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Smart-Enabled</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative group">
                                <img src={INFRASTRUCTURE.campus_images[0]} alt="Campus Aerial" className="w-full aspect-video object-cover shadow-2xl rounded-sm group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute -bottom-6 -right-6 bg-emerald-900 text-white p-6 hidden lg:block shadow-xl">
                                    <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Master Plan 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FacilityCard
                            title="Science & Tech Labs"
                            items={INFRASTRUCTURE.labs}
                            color="bg-emerald-900"
                            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.506.326l-1.838-.307a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 102.828 2.828l3.182-3.182h3.182l3.182 3.182a2 2 0 102.828-2.828l-2.387-2.387zM8 11V7a4 4 0 118 0v4M12 11v4" /></svg>}
                        />
                        <FacilityCard
                            title="Learning Spaces"
                            items={INFRASTRUCTURE.classrooms}
                            color="bg-emerald-900"
                            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                        />
                        <FacilityCard
                            title="Athletic Grounds"
                            items={INFRASTRUCTURE.playground}
                            color="bg-emerald-900"
                            icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        />
                    </div>
                </div>
            </section>

            {/* Visual Catalog Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Visual Catalog</h2>
                        <div className="h-1 w-20 bg-emerald-900 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {INFRASTRUCTURE.campus_images.map((img, idx) => (
                            <div key={idx} className="aspect-[4/3] overflow-hidden border border-white shadow-lg group">
                                <img
                                    src={img}
                                    alt={`Campus Detail ${idx}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-emerald-950 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold serif uppercase tracking-[0.2em] mb-6">Experience it in Person</h2>
                    <p className="text-emerald-400 mb-10 tracking-widest text-xs uppercase font-bold">Guided Institutional Tours available every Saturday</p>
                    <button className="px-10 py-4 bg-white text-emerald-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-50 transition-all shadow-xl">Schedule a Campus Visit</button>
                </div>
            </section>
        </div>
    );
};

export default InfrastructureScreen;
