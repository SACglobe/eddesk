import React, { useRef } from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import HeroSlider from '../../components/HeroSlider';

// Note: Dynamic title is set by the Renderer's parent page.tsx

const About: React.FC<{ data?: TenantViewModel }> = ({ data }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 450, behavior: 'smooth' });
        }
    };

    // Help helper
    const getComponent = (code: string) => {
        return data?.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    const schoolName = data?.school?.name ?? 'Our School';
    const vision = data?.identity?.vision ?? '';
    const mission = data?.identity?.mission ?? '';
    const motto = data?.identity?.motto ?? '';
    const aboutTitle = data?.identity?.aboutTitle ?? '';
    const aboutDescription = data?.identity?.aboutDescription ?? '';
    const whyChooseUs = data?.whyChooseUs ?? [];
    
    // Leadership data from standardized properties
    const principal = data?.principal?.[0] ?? null;
    const chairman = data?.chairman?.[0] ?? null;
    const boardMembers = data?.boardMembers ?? [];
    
    const hasPrincipalData = !!(principal?.name || principal?.message || principal?.imageUrl);
    const hasChairmanData = !!(chairman?.name || chairman?.message || chairman?.imageUrl);
    const hasBoardData = boardMembers.length > 0;
    
    const identityComp = getComponent('identity') || getComponent('visionmission');
    const identityEnabled = identityComp?.isActive ?? true;
    const hasIdentityData = !!(data?.identity?.aboutTitle || data?.identity?.aboutDescription || data?.identity?.vision || data?.identity?.mission);
    const heroMedia = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    return (
        <div className="pb-24">
            {/* Hero Section */}
            {heroMedia.length > 0 ? (
                <HeroSlider slides={heroMedia} heightClass="h-[60vh]" />
            ) : (
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a]/90 to-[#0f172a] backdrop-blur-2xl"></div>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                        <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Established Legacy</span>
                        <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">{aboutTitle || `About ${schoolName}`}</h1>
                        {aboutDescription && (
                            <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80">
                                {aboutDescription}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Philosophy Section */}
            {identityEnabled && hasIdentityData && (
                <section className="max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-3 gap-8">
                    {vision && (
                        <div className="bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-accent space-y-6">
                            <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">👁️</div>
                            <h3 className="text-3xl font-bold text-primary uppercase tracking-tighter">Vision</h3>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                {vision}
                            </p>
                        </div>
                    )}
                    {mission && (
                        <div className="bg-primary p-12 rounded-[3rem] shadow-xl space-y-6 transform lg:-translate-y-8 transition-transform">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner">🚀</div>
                            <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Mission</h3>
                            <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                                {mission}
                            </p>
                        </div>
                    )}
                    {motto && (
                        <div className="bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-yellow-600 space-y-6">
                            <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner">🛡️</div>
                            <h3 className="text-3xl font-bold text-primary uppercase tracking-tighter">Motto</h3>
                            <p className="text-2xl font-serif italic text-primary leading-relaxed">
                                "{motto}"
                            </p>
                        </div>
                    )}
                </section>
            )}

            {/* Principal's Message Board */}
            {(getComponent('leadership')?.isActive || getComponent('principalmessage')?.isActive) && hasPrincipalData && (
                <section className="max-w-7xl mx-auto px-4 py-24 border-t border-gray-100">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary rounded-[4rem] rotate-3 translate-x-4 translate-y-4 transition-transform group-hover:rotate-6"></div>
                            <div className="relative overflow-hidden rounded-[4rem] shadow-2xl aspect-[4/5]">
                                {principal?.imageUrl ? (
                                    <img
                                        src={principal.imageUrl}
                                        alt={principal.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-8xl text-primary/30 font-bold uppercase">
                                            {principal?.name?.charAt(0) || 'P'}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">Direct Correspondence</span>
                                <h2 className="text-5xl md:text-7xl font-bold text-primary leading-tight">Principal's Message Board</h2>
                            </div>

                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    As the Principal of {schoolName}, I am honored to lead an institution that prioritizes the holistic development of every child.
                                </p>
                                {principal?.message && (
                                    <p>
                                        {principal.message}
                                    </p>
                                )}
                            </div>

                            <div className="pt-8 flex items-center gap-8">
                                <div className="space-y-1">
                                    <p className="font-serif italic text-3xl text-primary font-playfair uppercase">{principal?.name || "School Principal"}</p>
                                    <p className="text-yellow-600 font-black uppercase tracking-widest text-xs">{principal?.designation || "Principal"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Chairman / Board Message */}
            {(getComponent('leadership')?.isActive || getComponent('boardmembersmessage')?.isActive) && (hasChairmanData || data?.identity?.boardMessage) && (
                 <section className="bg-primary py-32 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
                    <div className="max-w-5xl mx-auto px-4 relative z-10">
                        <div className="space-y-12 text-center lg:text-left">
                             <div className="space-y-4">
                                <span className="text-accent font-black uppercase tracking-[0.4em] text-xs">Message from the Board</span>
                                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight font-playfair uppercase">A Message from the Board</h2>
                            </div>
                            { (chairman?.message || data?.identity?.boardMessage) && (
                                <p className="text-blue-100 text-xl md:text-2xl font-light leading-relaxed italic border-l-4 border-accent pl-8 text-left">
                                    "{chairman?.message || data?.identity?.boardMessage}"
                                </p>
                            )}
                        </div>
                    </div>
                 </section>
            )}

            {/* Board Members Section */}
            {getComponent('boardmembers')?.isActive && hasBoardData && (
                <section className="max-w-[100vw] overflow-hidden py-32 bg-gray-50/50 relative">
                    <div className="max-w-7xl mx-auto px-4 mb-20 space-y-4 text-center">
                        <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Governance</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-primary">Academic Leadership & Management</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">The visionary team steering our institution towards new horizons of academic brilliance.</p>
                    </div>

                    <div className="relative group/scroll-container">
                        <div
                            ref={scrollRef}
                            className="management-scroll flex overflow-x-auto gap-12 px-6 md:px-[calc((100vw-80rem)/2+1rem)] pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
                        >
                            {boardMembers.map((member: any, i: number) => {
                                const photo = member.imageUrl;
                                const role = member.designation || member.role;
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
                                                        {member.name?.charAt(0) || 'L'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className="absolute bottom-10 left-10 right-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                <p className="text-accent font-black uppercase tracking-[0.3em] text-[10px] mb-2">Executive Profile</p>
                                                <p className="text-white text-sm leading-relaxed line-clamp-4 font-medium italic">
                                                    {member.message}
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
                    </div>
                    {/* Mobile Indicator */}
                    <div className="max-w-7xl mx-auto px-4 mt-8 flex items-center justify-center gap-4 opacity-50 lg:hidden">
                        <div className="h-1 w-24 bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-1/3 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Swipe to view our team</span>
                    </div>
                </section>
            )}

            {/* Why Choose Us Section */}
            {getComponent('whychooseus')?.isActive && whyChooseUs.length > 0 && (
                <section className="bg-gray-50 py-32">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center space-y-4 mb-20">
                            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">Excellence Simplified</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-primary leading-tight font-playfair uppercase">Why Choose Us</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whyChooseUs.map((item, i) => (
                                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-100">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm mb-8 group-hover:bg-accent group-hover:text-white transition-colors">
                                        {(item.icon && item.icon.length < 4) ? item.icon : (['✨', '🌍', '🛡️', '⭐', '🎓', '🏆', '🚀', '🔬'][i] || '⭐')}
                                    </div>
                                    <h4 className="text-xl font-bold text-primary font-playfair uppercase mb-4">{item.title}</h4>
                                    <p className="text-gray-500 leading-relaxed uppercase text-sm">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default About;
