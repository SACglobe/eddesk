
"use client";
import React from 'react';
import { SchoolContent } from '../../../lib/constants/types';
import styles from '../styles/scoped.module.css';

interface AboutProps {
    data: SchoolContent;
}

const About: React.FC<AboutProps> = ({ data }) => {
    return (
        <div className={`bg-white ${styles.fadeIn}`}>
            {/* Banner */}
            <div className="relative h-[400px] bg-emerald-950 flex items-center justify-center overflow-hidden">
                <img src={data.gallery[0]?.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110 blur-sm" alt="Background" />
                <div className="relative z-10 text-center space-y-6 px-6">
                    <div className="text-emerald-400 font-black tracking-[0.4em] text-xs uppercase">Our Heritage</div>
                    <h1 className={`text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase ${styles.serif}`}>
                        Legacy of <span className="italic text-emerald-500">Excellence</span>
                    </h1>
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="max-w-[1400px] mx-auto px-6 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    <div className="space-y-10 group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-emerald-900 text-white flex items-center justify-center text-3xl font-black rounded-sm shadow-xl group-hover:rotate-12 transition-transform">V</div>
                            <h2 className={`text-4xl font-bold uppercase tracking-tighter ${styles.serif}`}>Our Vision</h2>
                        </div>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            {data.visionMission.vision}
                        </p>
                    </div>

                    <div className="space-y-10 group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-emerald-600 text-white flex items-center justify-center text-3xl font-black rounded-sm shadow-xl group-hover:rotate-12 transition-transform">M</div>
                            <h2 className={`text-4xl font-bold uppercase tracking-tighter ${styles.serif}`}>Our Mission</h2>
                        </div>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium">
                            {data.visionMission.mission}
                        </p>
                    </div>
                </div>
            </div>

            {/* Principal Detail Section */}
            <div className="bg-slate-50 py-32 border-y border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-2/5">
                            <img src={data.principal.photoUrl} alt="Principal" className="w-full grayscale shadow-2xl rounded-sm border-8 border-white" />
                        </div>
                        <div className="lg:w-3/5 space-y-12">
                            <div className="text-emerald-800 font-bold uppercase tracking-[0.4em] text-xs">The Leadership</div>
                            <h2 className={`text-4xl md:text-6xl font-bold text-slate-900 leading-tight ${styles.serif}`}>A Message from the <br /> Principal</h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                                {data.principal.message.split('\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-slate-200">
                                <div className="text-2xl font-bold text-slate-900 uppercase tracking-tighter">{data.principal.name}</div>
                                <div className="text-emerald-700 font-black text-[10px] uppercase tracking-[0.4em] mt-1">Principal & Academic Head</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
