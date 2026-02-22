"use client";

import React from 'react';
import { SectionHeader } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';

// Static metadata — used only in standalone Next.js mode
// Dynamic metadata is handled at the demo/tenant page.tsx level

export default function About({ data }: { data?: any }) {
    const sections = data?.homepageSections ?? [];
    const identityEnabled = sections.find((s: any) => s.sectionKey === 'identity')?.isEnabled ?? true;
    const principalEnabled = sections.find((s: any) => s.sectionKey === 'principal')?.isEnabled ?? true;

    const vision = data?.identity?.vision ?? '';
    const mission = data?.identity?.mission ?? '';
    const motto = data?.identity?.motto ?? '';
    const aboutTitle = data?.identity?.aboutTitle ?? '';
    const aboutDescription = data?.identity?.aboutDescription ?? '';
    const whyChooseUs: Array<{ id: string; title: string; description: string; icon: string }> = data?.identity?.whyChooseUs ?? [];
    const principalPhoto = data?.personnel?.find((p: any) => p.personType === 'principal')?.photoUrl ?? '';
    const principalMsg = data?.personnel?.find((p: any) => p.personType === 'principal')?.bio ?? '';
    const principalName = data?.personnel?.find((p: any) => p.personType === 'principal')?.name ?? '';
    const highlights = data?.achievements ?? [];

    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-32 max-w-4xl">
                        <SectionHeader title="More Than a School" subtitle="An Institution of Tradition" />
                        <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">{aboutTitle || 'Heritage in every'} <span className="italic text-signature-gold">{aboutTitle ? '' : 'Decision.'}</span></h1>
                        {aboutDescription && <p className="text-xl font-light text-signature-navy/70 leading-loose max-w-3xl">{aboutDescription}</p>}
                    </header>

                    {identityEnabled && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
                            <div className="bg-signature-navy text-white p-12 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-signature-gold opacity-10 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                                <h3 className="text-signature-gold uppercase tracking-[0.4em] text-[11px] font-bold mb-8">Our Vision</h3>
                                <p className="text-2xl font-serif italic leading-relaxed">{vision || "To be the global benchmark in school education by creating leaders who are empathetic, innovative, and culturally aware."}</p>
                            </div>
                            <div className="bg-signature-gold text-white p-12 relative group overflow-hidden">
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-signature-navy opacity-10 translate-y-1/2 -translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                                <h3 className="text-signature-navy uppercase tracking-[0.4em] text-[11px] font-bold mb-8">Our Mission</h3>
                                <p className="text-2xl font-serif italic leading-relaxed">{mission || "To provide a holistic and rigorous academic environment supported by professional development and creative exploration."}</p>
                            </div>
                            <div className="bg-signature-ivory border border-signature-navy/5 p-12 flex flex-col justify-center">
                                <h3 className="text-signature-navy uppercase tracking-[0.4em] text-[11px] font-bold mb-8">Our Motto</h3>
                                <p className="text-4xl font-serif text-signature-navy tracking-tight uppercase truncate">{motto || "Loyalty & Truth"}</p>
                            </div>
                        </div>
                    )}

                    {principalEnabled && (
                        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                            <div className="lg:col-span-5 sticky top-32">
                                <div className="relative">
                                    {principalPhoto ? (
                                        <img src={principalPhoto} className="w-full aspect-[4/5] object-cover grayscale border border-signature-navy/10 shadow-2xl" alt={principalName} />
                                    ) : (
                                        <div className="w-full aspect-[4/5] bg-signature-navy/5 border border-signature-navy/10 shadow-2xl flex items-center justify-center">
                                            <span className="text-8xl font-serif text-signature-navy/20 uppercase">
                                                {principalName.charAt(0) || 'P'}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute -bottom-8 -right-8 bg-signature-gold text-white p-10 hidden md:block">
                                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Authorized Signature</span>
                                        <p className="font-serif italic text-xl mt-2 uppercase">{principalName || "School Principal"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-7 pt-12">
                                <SectionHeader title="From the Desk of the Principal" subtitle="Academic Leadership" />
                                <div className="space-y-8 text-xl font-light text-signature-navy/80 leading-loose">
                                    <p className="font-serif italic text-3xl text-signature-navy mb-12 border-l-4 border-signature-gold pl-10">
                                        "{principalMsg || "Education is not merely the transmission of data; it is the forging of character. We treat our curriculum as a canvas, where students paint their futures with the strokes of critical inquiry and moral courage."}"
                                    </p>
                                    <p>Our faculty, many of whom hold terminal degrees in their fields, serve not just as teachers but as mentors and stewards of the intellectual tradition. We invite you to join a community where mastery is the only standard.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Board Message Section */}
                    {(data?.personnel || []).filter((p: any) => (p.personType || '').toUpperCase() === 'BOARD').length > 0 && (
                        <section className="mb-40">
                            <SectionHeader title="Board's Vision" subtitle="Governance & Purpose" />
                            <div className="grid grid-cols-1 gap-12">
                                {(data?.personnel || [])
                                    .filter((p: any) => (p.personType || '').toUpperCase() === 'BOARD')
                                    .map((member: any, idx: number) => (
                                        <div key={idx} className="bg-signature-navy/5 p-12 md:p-20 border border-signature-navy/5 relative group">
                                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
                                                <div className="lg:col-span-1">
                                                    <div className="relative">
                                                        <img src={member.photoUrl || '/school/image/default-avatar.png'} className="w-48 h-48 object-cover grayscale border-2 border-signature-gold" alt={member.name} />
                                                        <div className="absolute -bottom-4 -right-4 bg-signature-gold w-12 h-12 flex items-center justify-center text-white">
                                                            <span className="text-2xl italic">“</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="lg:col-span-3">
                                                    <p className="text-2xl font-serif italic text-signature-navy mb-8 leading-relaxed">
                                                        "{member.bio || "Our governance model is built on transparency, academic rigor, and a deep-seated commitment to the holistic development of our student body."}"
                                                    </p>
                                                    <div>
                                                        <p className="font-serif text-2xl uppercase tracking-tighter text-signature-navy mb-1">{member.name}</p>
                                                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-signature-gold">{member.designation || 'Board Member'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </section>
                    )}

                    {/* Leadership & Management Team */}
                    {(data?.personnel || []).filter((p: any) => {
                        const type = (p.personType || '').toUpperCase();
                        return type !== 'PRINCIPAL' && type !== 'FACULTY';
                    }).length > 0 && (
                            <section className="mb-40">
                                <SectionHeader title="Institutional Leadership" subtitle="Management & Strategy" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
                                    {(data?.personnel || [])
                                        .filter((p: any) => {
                                            const type = (p.personType || '').toUpperCase();
                                            return type !== 'PRINCIPAL' && type !== 'FACULTY';
                                        })
                                        .map((member: any, idx: number) => (
                                            <div key={idx} className="group">
                                                <div className="relative mb-8 overflow-hidden aspect-[3/4]">
                                                    <img src={member.photoUrl || '/school/image/default-avatar.png'} className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" alt={member.name} />
                                                    <div className="absolute inset-0 bg-signature-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                                </div>
                                                <h4 className="text-xl font-serif uppercase text-signature-navy mb-2 tracking-tight group-hover:text-signature-gold transition-colors">{member.name}</h4>
                                                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-signature-gold/80">{member.designation}</p>
                                            </div>
                                        ))}
                                </div>
                            </section>
                        )}

                    <section className="bg-signature-navy text-white py-32 px-12 md:px-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-signature-gold opacity-5 skew-x-12 translate-x-1/2"></div>
                        <SectionHeader title="Why Choose Us" subtitle="A Trusted Legacy" light />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 relative z-10">
                            {(whyChooseUs.length > 0 ? whyChooseUs.slice(0, 4).map((item) => ({
                                t: item.title, d: item.description, ic: item.icon
                            })) : highlights.length > 0 ? highlights.slice(0, 4).map((item: any) => ({
                                t: item.title, d: item.description, ic: ''
                            })) : [
                                { t: "Rigorous Standards", d: "Academic excellence is not a target, it's our institutional baseline.", ic: '' },
                                { t: "Individual Attention", d: "Our low student-to-teacher ratio ensures no spark of brilliance is overlooked.", ic: '' },
                                { t: "Global Network", d: "Our alumni occupy influential positions across six continents.", ic: '' },
                                { t: "Ethical Core", d: "Character development and ethical reasoning are central pillars from year one.", ic: '' }
                            ]).map((item, i) => (
                                <div key={i} className="group">
                                    <div className="w-8 h-px bg-signature-gold mb-6 group-hover:w-16 transition-all duration-500"></div>
                                    {item.ic && <span className="text-3xl mb-4 block">{item.ic}</span>}
                                    <h4 className="text-2xl font-serif mb-4 uppercase">{item.t}</h4>
                                    <p className="text-white/50 text-base font-light leading-relaxed uppercase">{item.d}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </LayoutWrapper>
    );
}

