
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SchoolContent } from '../../../lib/constants/types';
import styles from '../styles/scoped.module.css';

interface HomeProps {
    data: SchoolContent;
}

const Home: React.FC<HomeProps> = ({ data }) => {
    const [activeHero, setActiveHero] = useState(0);
    const heroImages = data.gallery.slice(0, 3).map(g => g.imageUrl);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveHero((prev) => (prev + 1) % heroImages.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[85vh] w-full overflow-hidden bg-emerald-950">
                {heroImages.map((img, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${i === activeHero ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                        style={{ transition: 'opacity 1s ease-in-out, transform 10s linear' }}
                    >
                        <div className="absolute inset-0 bg-emerald-950/40 z-10"></div>
                        <img src={img} alt="Campus" className="w-full h-full object-cover" />
                    </div>
                ))}

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <span className={`text-white text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6 ${styles.animateFadeUp}`}>
                        Est. {data.meta.establishedYear} • Legacy of Excellence
                    </span>
                    <h1 className={`text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight max-w-5xl ${styles.serif} ${styles.animateFadeUpDelayed}`}>
                        The Foundation of <br /> Greatness Begins Here
                    </h1>
                    <div className={`flex gap-4 ${styles.animateFadeUpExtra}`}>
                        <Link href="/admission" className="px-8 py-3 bg-white text-emerald-900 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl inline-block">
                            Admissions {new Date().getFullYear()}
                        </Link>
                        <Link href="/about" className="px-8 py-3 bg-transparent border border-white text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all inline-block">
                            Know more
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {heroImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveHero(i)}
                            className={`w-12 h-1 transition-all ${i === activeHero ? 'bg-emerald-400' : 'bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Institutional Merit Section */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">Institutional Merit</span>
                        <h2 className={`text-3xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tighter mb-2 ${styles.serif}`}>Honors & Academic Results</h2>
                        <div className="h-1.5 w-24 bg-emerald-900 mx-auto mt-8"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
                        {/* Board Results Card */}
                        <div className="p-10 md:p-12 bg-emerald-900 text-white flex flex-col justify-between h-full shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:bg-white/10 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-[1px] bg-emerald-400"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">Board Results 2023</span>
                                </div>
                                <h3 className={`text-2xl md:text-3xl font-bold mb-8 leading-tight ${styles.serif}`}>Academic <br /> Merit Summary</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end border-b border-white/10 pb-3">
                                        <span className="text-[11px] uppercase text-emerald-300 font-bold tracking-wider">Pass Percentage</span>
                                        <span className={`text-2xl font-bold text-white ${styles.serif}`}>100%</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/10 pb-3">
                                        <span className="text-[11px] uppercase text-emerald-300 font-bold tracking-wider">Distinctions</span>
                                        <span className={`text-2xl font-bold text-white ${styles.serif}`}>84%</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/10 pb-3">
                                        <span className="text-[11px] uppercase text-emerald-300 font-bold tracking-wider">First Class</span>
                                        <span className={`text-2xl font-bold text-white ${styles.serif}`}>96%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-12 text-[11px] text-emerald-400 uppercase tracking-widest leading-relaxed font-medium">
                                Consistently maintaining a legacy of academic excellence for over 15 consecutive years.
                            </p>
                        </div>

                        {/* Other highlights as individual cards */}
                        {data.highlights.slice(0, 2).map((h, i) => (
                            <div key={i} className="p-10 md:p-12 bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all group flex flex-col justify-between h-full hover:shadow-xl hover:-translate-y-1">
                                <div>
                                    <div className={`text-4xl font-black text-emerald-950/10 mb-8 group-hover:text-emerald-900/10 transition-colors ${styles.serif}`}>0{i + 1}</div>
                                    <h3 className={`text-xl font-bold text-slate-900 uppercase tracking-tighter mb-4 leading-tight ${styles.serif}`}>{h.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-8 italic opacity-80">{h.description}</p>
                                </div>
                                <div className="pt-8 border-t border-slate-200 text-[10px] font-bold text-emerald-700 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-inner"></span> Academic Recognition
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <Link href="/about" className="px-12 py-4 bg-emerald-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-800 transition-all inline-block shadow-lg">
                            Institutional Profile →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Principal's Message Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-full bg-white -z-10"></div>
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="w-full lg:w-1/2 relative pr-0 lg:pr-12">
                            <div className="relative group overflow-hidden shadow-2xl">
                                <img src={data.principal.photoUrl} alt={data.principal.name} className="w-full aspect-[4/5] lg:aspect-auto lg:h-[700px] object-cover transition-all duration-1000 group-hover:scale-105" />
                                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-emerald-950/90 to-transparent text-white">
                                    <div className="text-[10px] uppercase font-bold tracking-[0.4em] mb-2 text-emerald-400">Leadership Excellence</div>
                                    <div className={`text-2xl font-bold ${styles.serif}`}>{data.principal.name}</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 lg:-ml-20 mt-12 lg:mt-0 z-20">
                            <div className="bg-white p-10 md:p-20 shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-slate-100 relative">
                                <div className={`absolute top-0 left-12 -translate-y-1/2 text-[180px] text-emerald-900/5 leading-none font-black italic select-none ${styles.serif}`}>"</div>
                                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.5em] block mb-6">Institutional Vision</span>
                                <h2 className={`text-3xl md:text-5xl font-extrabold text-slate-900 uppercase tracking-tighter mb-10 leading-tight ${styles.serif}`}>Message from <br /> the Principal</h2>
                                <div className="h-[2px] w-28 bg-emerald-900 mb-12"></div>
                                <div className="relative">
                                    <p className={`text-xl md:text-2xl text-slate-800 italic leading-relaxed mb-12 relative z-10 font-medium ${styles.serif}`}>
                                        "{data.principal.message}"
                                    </p>
                                    <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div>
                                            <p className={`text-2xl font-bold text-slate-900 tracking-wide uppercase ${styles.serif}`}>{data.principal.name}</p>
                                            <p className="text-[10px] text-emerald-700 uppercase tracking-[0.3em] font-bold mt-2">Principal & Chief Administrator</p>
                                        </div>
                                        <div>
                                            <Link href="/about" className="text-[11px] font-bold uppercase tracking-widest text-emerald-900 hover:text-emerald-700 transition-colors py-3 border-b-2 border-emerald-900/20 hover:border-emerald-900">
                                                Read Full Profile →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-24 bg-emerald-950 text-white relative z-20 shadow-inner">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-8">
                        {data.statistics.map((stat, i) => (
                            <div key={i} className="text-center group border-r border-white/5 last:border-0">
                                <div className={`text-5xl md:text-7xl font-black mb-4 text-white group-hover:scale-110 transition-transform duration-500 inline-block ${styles.serif}`}>
                                    {stat.value.replace('+', '')}<span className="text-emerald-500">+</span>
                                </div>
                                <div className="text-[11px] text-emerald-300/60 uppercase tracking-[0.4em] font-bold mt-4">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};


export default Home;
