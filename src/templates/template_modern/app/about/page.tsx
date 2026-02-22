"use client";

import React, { useRef } from 'react';

// Note: Dynamic title is set by the Renderer's parent page.tsx

const About: React.FC<{ data?: any }> = ({ data }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 450, behavior: 'smooth' });
        }
    };

    const sections = data?.homepageSections ?? [];
    const identityEnabled = sections.find((s: any) => s.sectionKey === 'identity')?.isEnabled ?? true;
    const principalEnabled = sections.find((s: any) => s.sectionKey === 'principal')?.isEnabled ?? true;

    const schoolName = data?.school?.name ?? 'Our School';
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

    // Management team: All personnel EXCEPT principal and faculty
    const managementTeam = (data?.personnel ?? []).filter((p: any) => {
        const type = (p.personType || '').toUpperCase();
        return type !== 'PRINCIPAL' && type !== 'FACULTY';
    });

    // Board messages: All personnel with type BOARD
    const boardMessages = (data?.personnel ?? []).filter((p: any) =>
        (p.personType || '').toUpperCase() === 'BOARD'
    );

    return (
        <div className="pb-24">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/90 to-[#0f172a] backdrop-blur-2xl"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Established Legacy</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">{aboutTitle || 'More Than a School'}</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80">
                        {aboutDescription || 'A sanctuary of learning where curiosity meets opportunity and character meets excellence.'}
                    </p>
                </div>
            </section>

            {/* Philosophy Section */}
            {identityEnabled && (
                <section className="max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-3 gap-8">
                    <div className="bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-accent space-y-6">
                        <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">👁️</div>
                        <h3 className="text-3xl font-bold text-primary uppercase tracking-tighter">Vision</h3>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            {vision || "To be the global benchmark in school education by creating leaders who are empathetic, innovative, and culturally aware."}
                        </p>
                    </div>
                    <div className="bg-primary p-12 rounded-[3rem] shadow-xl space-y-6 transform lg:-translate-y-8 transition-transform">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner">🚀</div>
                        <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Mission</h3>
                        <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                            {mission || "To provide a holistic and rigorous academic environment supported by professional development and creative exploration."}
                        </p>
                    </div>
                    <div className="bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-yellow-600 space-y-6">
                        <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">🛡️</div>
                        <h3 className="text-3xl font-bold text-primary uppercase tracking-tighter">Motto</h3>
                        <p className="text-2xl font-serif italic text-primary leading-relaxed">
                            "{motto || "Knowledge is Freedom, Excellence is Power."}"
                        </p>
                    </div>
                </section>
            )}

            {/* Principal's Message Board */}
            {principalEnabled && (
                <section className="max-w-7xl mx-auto px-4 py-24 border-t border-gray-100">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary rounded-[4rem] rotate-3 translate-x-4 translate-y-4 transition-transform group-hover:rotate-6"></div>
                            <div className="relative overflow-hidden rounded-[4rem] shadow-2xl aspect-[4/5]">
                                {principalPhoto ? (
                                    <img
                                        src={principalPhoto}
                                        alt={principalName}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-8xl text-primary/30 font-bold uppercase">
                                            {principalName.charAt(0) || 'P'}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
                            </div>
                            <div className="absolute -bottom-10 -right-6 bg-accent p-8 rounded-[2.5rem] shadow-2xl z-20 hidden md:block border-4 border-white">
                                <p className="font-serif italic text-blue-950 text-lg uppercase">"Lead with purpose, learn for life."</p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">Direct Correspondence</span>
                                <h2 className="text-5xl md:text-7xl font-bold text-primary leading-tight">Principal's Message Board</h2>
                            </div>

                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    As the Principal of {schoolName}, I am honored to lead an institution that prioritizes the holistic development of every child. We don't just teach subjects; we nurture souls, spark imaginations, and build resilience.
                                </p>
                                <p>
                                    {principalMsg || "Our classrooms are vibrant ecosystems of inquiry where students are encouraged to challenge the status quo. We believe that true education is about finding one's purpose and using that knowledge to positively impact the world."}
                                </p>
                            </div>

                            <div className="pt-8 flex items-center gap-8">
                                <div className="space-y-1">
                                    <p className="font-serif italic text-3xl text-primary font-playfair uppercase">{principalName || "School Principal"}</p>
                                    <p className="text-yellow-600 font-black uppercase tracking-widest text-xs">Principal & Academic Dean</p>
                                </div>
                                <div className="w-16 h-px bg-gray-200"></div>
                                <button className="text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-accent pb-1 hover:border-primary transition-colors">View Annual Report</button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Message from the Board of Management */}
            {boardMessages.length > 0 && (
                <section className="bg-primary-dark py-32 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-[120px]"></div>

                    <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-12">
                        {boardMessages.map((member: any, idx: number) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-[4rem] p-12 md:p-20 border border-white/10 shadow-2xl">
                                <div className="flex flex-col items-center text-center space-y-10">
                                    <div className="inline-block px-6 py-2 bg-accent text-primary rounded-full text-xs font-black uppercase tracking-[0.3em]">
                                        Board of Management
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight font-playfair">Message from {member.name}</h2>
                                    <div className="relative">
                                        <span className="absolute -top-12 -left-8 text-8xl text-accent/20 font-serif">“</span>
                                        <p className="text-blue-100/90 text-xl md:text-3xl font-medium leading-relaxed italic">
                                            {member.bio || `At ${schoolName}, our collective vision is to cultivate an environment where every student feels seen, heard, and empowered. We are dedicated to maintaining the highest standards of educational integrity while embracing the innovations of the future.`}
                                        </p>
                                        <span className="absolute -bottom-16 -right-8 text-8xl text-accent/20 font-serif rotate-180">“</span>
                                    </div>
                                    <div className="pt-8 border-t border-white/10 w-full flex flex-col items-center">
                                        <div className="w-24 h-px bg-accent mb-6"></div>
                                        <p className="text-white font-bold text-2xl mb-1">{member.name}</p>
                                        <p className="text-accent/60 font-medium uppercase tracking-[0.2em] text-sm uppercase">{member.designation || 'Board Member'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Meet the Management Section */}
            {(managementTeam.length > 0) && (
                <section className="max-w-[100vw] overflow-hidden py-32 bg-gray-50/50 relative">
                    <div className="max-w-7xl mx-auto px-4 mb-20 space-y-4 text-center">
                        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Leadership</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-primary">Academic Leadership & Management</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">The visionary team steering our institution towards new horizons of academic brilliance.</p>
                    </div>

                    <div className="relative group/scroll-container">
                        <div
                            ref={scrollRef}
                            className="management-scroll flex overflow-x-auto gap-12 px-6 md:px-[calc((100vw-80rem)/2+1rem)] pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                        >
                            {managementTeam.map((member: any, i: number) => {
                                const photo = member.photoUrl;
                                const role = member.designation || member.personType;
                                return (
                                    <div key={i} className="min-w-[300px] md:min-w-[420px] snap-center group">
                                        <div className="relative mb-8 overflow-hidden rounded-[4rem] aspect-[4/5] shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                                            {photo ? (
                                                <img
                                                    src={photo}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                    <span className="text-6xl text-primary/30 font-bold uppercase">
                                                        {member.name?.charAt(0) || 'M'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className="absolute bottom-10 left-10 right-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2">Executive Profile</p>
                                                <p className="text-white text-sm leading-relaxed line-clamp-4 font-medium italic">
                                                    {member.bio}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-center px-4">
                                            <h3 className="text-3xl font-bold text-primary mb-1 group-hover:text-blue-600 transition-colors font-playfair uppercase">{member.name}</h3>
                                            <p className="text-yellow-600 font-black uppercase tracking-[0.2em] text-xs">{role}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Floating Right Scroll Arrow */}
                        <button
                            onClick={scrollRight}
                            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 bg-white/80 backdrop-blur-md text-primary p-6 rounded-full shadow-2xl border border-primary/10 opacity-0 group-hover/scroll-container:opacity-100 transition-all duration-500 hover:bg-accent hover:scale-110 hidden lg:flex items-center justify-center"
                            aria-label="Scroll Right"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>

                        {/* Mobile Indicator */}
                        <div className="max-w-7xl mx-auto px-4 mt-8 flex items-center justify-center gap-4 opacity-50 lg:hidden">
                            <div className="h-1 w-24 bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-1/3 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Swipe to view our team</span>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Parents Choose Our School */}
            <section className="bg-white py-32">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">Excellence Simplified</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight font-playfair">Why Choose Us</h2>
                        </div>
                        <div className="space-y-12">
                            {(whyChooseUs.length > 0 ? whyChooseUs.slice(0, 4).map((item, i) => ({
                                t: item.title, d: item.description, i: (item.icon || ['✨', '🌍', '🛡️', '⭐'][i]) ?? '⭐'
                            })) : highlights.length > 0 ? highlights.slice(0, 4).map((item: any, i: number) => ({
                                t: item.title, d: item.description, i: ['✨', '🌍', '🛡️', '⭐'][i] ?? '⭐'
                            })) : [
                                { t: 'Personalized Learning', d: 'Small class ratios ensuring every child gets the attention they deserve.', i: '✨' },
                                { t: 'Global Perspectives', d: 'Curriculum designed to make students comfortable anywhere in the world.', i: '🌍' },
                                { t: 'Safety First', d: 'A secure campus with 24/7 monitoring and a nurturing environment.', i: '🛡️' }
                            ]).map((item, i) => (
                                <div key={i} className="flex gap-8 group">
                                    <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm group-hover:bg-accent transition-colors shrink-0">{item.i}</div>
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-bold text-primary font-playfair uppercase">{item.t}</h4>
                                        <p className="text-gray-500 leading-relaxed text-lg uppercase">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary rounded-[4rem] translate-x-8 -translate-y-8"></div>
                        <img src="https://images.unsplash.com/photo-1544717297-fa154da09f9b?auto=format&fit=crop&q=80&w=800" className="relative z-10 rounded-[4rem] shadow-2xl w-full" alt="Academic Excellence" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

