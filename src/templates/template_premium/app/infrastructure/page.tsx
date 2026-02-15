"use client";

import React from 'react';
import { schoolData } from '../../data';
import LayoutWrapper from '../../components/LayoutWrapper';

export default function Infrastructure() {
    return (
        <LayoutWrapper>
            <div className="fade-in pb-24 pt-48">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <h1 className="text-6xl md:text-8xl font-serif mb-12 text-center">Institutional <span className="italic text-signature-gold">Assets</span></h1>
                    <p className="text-xl text-center text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Our campus is a masterpiece of architectural intent, designed to inspire, nurture, and support the highest levels of academic pursuit.
                    </p>
                </div>

                <div className="space-y-32">
                    {schoolData.infrastructure.map((item, i) => (
                        <section key={i} className="group">
                            <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}>
                                <div className="w-full lg:w-2/3 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-[70vh] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                </div>
                                <div className="w-full lg:w-1/3 p-12 lg:p-24 bg-signature-ivory flex flex-col justify-center">
                                    <div className="text-signature-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Facility {i + 1}</div>
                                    <h2 className="text-4xl font-serif mb-6 leading-tight">{item.name}</h2>
                                    <p className="text-gray-500 leading-loose italic">
                                        {item.description}
                                    </p>
                                    <div className="mt-12 w-12 h-[1px] bg-signature-navy"></div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                <section className="max-w-7xl mx-auto px-6 mt-48">
                    <div className="bg-signature-navy text-white p-16 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div>
                            <h2 className="text-4xl font-serif mb-6">Sustainable <span className="italic">Design</span></h2>
                            <p className="text-white/60 max-w-md leading-relaxed">
                                Our campus operates on 100% renewable energy, featuring advanced rainwater harvesting and a zero-waste commitment that informs our daily operations.
                            </p>
                        </div>
                        <button className="px-12 py-5 border border-white/20 hover:bg-white hover:text-signature-navy transition-colors uppercase tracking-[0.3em] text-[10px] font-bold">
                            Campus Tour
                        </button>
                    </div>
                </section>
            </div>
        </LayoutWrapper>
    );
}
