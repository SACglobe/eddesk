import { resolveImageUrl } from '@/core/utils/url';

const AboutScreen = ({ data }) => {
    // Helper to get component configuration
    const getComponent = (code) => {
        return data?.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    const schoolName = data?.school?.name || 'Our Institution';
    const vision = data?.identity?.vision || '';
    const mission = data?.identity?.mission || '';
    const motto = data?.identity?.motto || '';
    const aboutTitle = data?.identity?.aboutTitle || '';
    const aboutDescription = data?.identity?.aboutDescription || '';
    const whyChooseUs = data?.whyChooseUs || [];
    
    // Leadership data from standardized properties
    const principal = data?.principal?.[0] || null;
    const chairman = data?.chairman?.[0] || null;
    const boardMembers = data?.boardMembers || [];
    
    const hasPrincipalData = !!(principal?.name || principal?.message || principal?.imageUrl);
    const hasChairmanData = !!(chairman?.name || chairman?.message || chairman?.imageUrl);
    const hasBoardData = boardMembers.length > 0;
    
    const sections = data?.components || [];
    const identityComp = getComponent('identity');
    const identityEnabled = identityComp?.isActive ?? true;
    const hasIdentityData = !!(aboutTitle || aboutDescription || vision || mission);

    const highlights = data?.schoolAchievements || [];

    return (
        <div className="fade-in">
            {/* Hero Header */}
            <section className="bg-emerald-900 py-24 text-center">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <span className="text-emerald-300 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Institutional History</span>
                    <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest">{aboutTitle || 'More Than a School'}</h1>
                    <div className="h-1 w-20 bg-emerald-400 mx-auto mt-8"></div>
                </div>
            </section>

            {/* 1. Identity / Heritage Section */}
            {identityEnabled && hasIdentityData && (
                <section className="py-24 bg-white">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="prose prose-emerald prose-lg max-w-none serif text-slate-700 leading-relaxed">
                                <h2 className="text-3xl font-bold text-emerald-900 uppercase tracking-widest not-italic mb-8 border-b border-emerald-50 pb-4">Our Heritage</h2>
                                <p>{aboutDescription || 'Education is about more than just textbooks and exams; it is about uncovering the potential within every student and providing the environment for that potential to flourish.'}</p>
                                <p>We believe that true learning happens when curiosity meets guidance, and when local tradition meets global standards. Our campus is not just a collection of buildings; it is a vibrant ecosystem where character is forged.</p>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-emerald-900 translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=1200"
                                    alt="Campus Heritage"
                                    className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border border-emerald-900/10"
                                />
                                <div className="absolute top-8 right-8 bg-emerald-900 text-white p-6 shadow-2xl">
                                    <span className="text-3xl font-bold block">{data?.identity?.foundedYear || '1985'}</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium border-t border-emerald-700 mt-2 pt-2 block text-emerald-300">Foundation Year</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Overview & Core Values */}
            {identityEnabled && hasIdentityData && (
                <section className="py-24 bg-white">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="prose prose-emerald prose-lg max-w-none serif text-slate-700 leading-relaxed">
                                <h2 className="text-3xl font-bold text-emerald-900 uppercase tracking-widest not-italic mb-8 border-b border-emerald-50 pb-4">Our Core Values</h2>
                                <p className="mt-6">At {schoolName}, we believe that true education is a symbiotic relationship between intellectual development and moral character. Our roots are deep, but our vision is future-oriented.</p>
                            </div>
                            <div className="space-y-8">
                                <div className="p-10 border border-emerald-100 bg-emerald-50/30 relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-900"></div>
                                    <h3 className="text-xl font-bold uppercase tracking-widest serif mb-4 text-emerald-900">Our Vision</h3>
                                    <p className="text-slate-600 italic leading-relaxed">"{vision}"</p>
                                </div>
                                <div className="p-10 border border-emerald-100 bg-emerald-50/30 relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-900"></div>
                                    <h3 className="text-xl font-bold uppercase tracking-widest serif mb-4 text-emerald-900">Our Mission</h3>
                                    <p className="text-slate-600 italic leading-relaxed">"{mission}"</p>
                                </div>
                                <div className="p-10 bg-emerald-900 text-white text-center shadow-xl">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-4">Institutional Motto</span>
                                    <p className="text-3xl font-bold serif italic uppercase">"{motto}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Parents Choose Section */}
            {getComponent('whychooseus')?.isActive && whyChooseUs.length > 0 && (
                <section className="py-24 bg-slate-50 border-y border-slate-200">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Why Choose Us</h2>
                            <div className="h-1 w-20 bg-emerald-900 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {whyChooseUs.slice(0, 4).map((item, idx) => (
                                <div key={idx} className="bg-white p-10 border border-slate-200 text-center hover:border-emerald-300 hover:shadow-xl transition-all group">
                                    <div className="text-4xl mb-4">{item.icon || (idx + 1)}</div>
                                    <h4 className="font-bold text-slate-900 serif uppercase text-sm mb-4 tracking-tight">{item.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest group-hover:text-emerald-600 transition-colors uppercase">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Chairman's Message */}
            {getComponent('leadership')?.isActive && hasChairmanData && (
                <section className="py-24 bg-emerald-950 text-white">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="flex flex-col md:flex-row gap-16 items-center">
                            <div className="w-full md:w-5/12">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-emerald-400/20 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6"></div>
                                    <img src={chairman.imageUrl || "https://images.unsplash.com/photo-1507679799987-c73774573b8a?auto=format&fit=crop&q=80&w=1200"} alt={chairman.name} className="relative z-10 w-full border border-emerald-800 shadow-2xl rounded-sm object-cover" />
                                </div>
                            </div>
                            <div className="w-full md:w-7/12">
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Chairman's Perspective</span>
                                <h2 className="text-3xl font-bold text-white uppercase tracking-widest serif mb-2">Message from the Chairman</h2>
                                <div className="h-1 w-20 bg-emerald-400 mb-10"></div>
                                <div className="prose prose-invert prose-emerald prose-lg serif italic opacity-90">
                                    <p>"{chairman.message || "Our commitment to excellence ensures that every student receives a world-class education focused on academic rigor and character development."}"</p>
                                </div>
                                <div className="mt-12">
                                    <p className="font-bold text-2xl serif text-emerald-400 uppercase">{chairman.name}</p>
                                    <p className="text-[10px] text-emerald-300/60 uppercase font-bold tracking-[0.3em]">{chairman.designation || 'Chairman'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Principal's Desk */}
            {getComponent('leadership')?.isActive && hasPrincipalData && (
                <section className="py-24 bg-white border-b border-slate-100">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
                            <div className="w-full md:w-5/12">
                                {principal.imageUrl ? (
                                    <img src={principal.imageUrl} alt={principal.name} className="w-full border border-slate-200 shadow-2xl rounded-sm object-cover object-top" />
                                ) : (
                                    <div className="w-full aspect-[4/5] bg-slate-100 border border-slate-200 flex items-center justify-center">
                                        <span className="text-6xl text-slate-400 font-bold uppercase">
                                            {principal.name?.charAt(0) || 'P'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-7/12">
                                <h2 className="text-3xl font-bold text-emerald-900 uppercase tracking-widest serif mb-2">From the Principal's Desk</h2>
                                <div className="h-1 w-20 bg-emerald-900 mb-10"></div>
                                <div className="prose prose-emerald prose-lg serif text-slate-700 italic">
                                    <p>"{principal.message || "Welcome to our school, where we foster an environment of growth, learning, and character building."}"</p>
                                </div>
                                <div className="mt-12">
                                    <p className="font-bold text-2xl serif text-slate-900 uppercase">{principal.name}</p>
                                    <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-[0.3em]">{principal.designation || 'Principal'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Board Members / Governance */}
            {getComponent('boardmembers')?.isActive && hasBoardData && (
                <section className="py-24 bg-slate-50">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="text-center mb-16">
                            <span className="text-emerald-900/40 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Institutional Governance</span>
                            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Our Board Members</h2>
                            <div className="h-1 w-20 bg-emerald-900 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {boardMembers.map((member, idx) => (
                                <div key={idx} className="bg-white p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative group overflow-hidden">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors"></div>
                                     <div className="relative z-10">
                                        <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-emerald-100">
                                            <img src={member.imageUrl || '/school/image/default-avatar.png'} alt={member.name} className="w-full h-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 serif uppercase text-lg mb-1 tracking-tight">{member.name}</h4>
                                        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] mb-4">{member.designation || member.role || 'Board Member'}</p>
                                        <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-3">"{member.message}"</p>
                                     </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default AboutScreen;
