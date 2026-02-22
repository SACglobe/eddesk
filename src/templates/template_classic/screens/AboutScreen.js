import React from 'react';

const AboutScreen = ({ data }) => {
    const sections = data?.homepageSections ?? [];
    const identityEnabled = sections.find(s => s.sectionKey === 'identity')?.isEnabled ?? true;
    const principalEnabled = sections.find(s => s.sectionKey === 'principal')?.isEnabled ?? true;

    const schoolName = data?.school?.name || 'Our Institution';
    const vision = data?.identity?.vision || '';
    const mission = data?.identity?.mission || '';
    const motto = data?.identity?.motto || '';
    const aboutTitle = data?.identity?.aboutTitle || '';
    const aboutDescription = data?.identity?.aboutDescription || '';
    const whyChooseUs = data?.identity?.whyChooseUs || [];

    const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;
    const principalName = principal?.name || '';
    const principalMsg = principal?.bio || '';
    const principalPhoto = principal?.photoUrl || '';

    const highlights = data?.achievements || [];

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

            {/* Overview & Core Values */}
            <section className="py-24 bg-white">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="prose prose-emerald prose-lg max-w-none serif text-slate-700 leading-relaxed">
                            <h2 className="text-3xl font-bold text-emerald-900 uppercase tracking-widest not-italic mb-8 border-b border-emerald-50 pb-4">Our Heritage</h2>
                            <p>{aboutDescription || 'Education is about more than just textbooks and exams; it is about uncovering the potential within every student and providing the environment for that potential to flourish.'}</p>
                            {aboutDescription && <p className="mt-6">At {schoolName}, we believe that true education is a symbiotic relationship between intellectual development and moral character. Our roots are deep, but our vision is future-oriented.</p>}
                            {!aboutDescription && <p className="mt-6">At {schoolName}, we believe that true education is a symbiotic relationship between intellectual development and moral character. Our roots are deep, but our vision is future-oriented.</p>}
                        </div>
                        {identityEnabled && (
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
                        )}
                    </div>
                </div>
            </section>

            {/* Why Parents Choose Section */}
            {(whyChooseUs.length > 0 || highlights.length > 0) && (
                <section className="py-24 bg-slate-50 border-y border-slate-200">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Why Choose Us</h2>
                            <div className="h-1 w-20 bg-emerald-900 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {(whyChooseUs.length > 0 ? whyChooseUs : highlights).slice(0, 4).map((item, idx) => (
                                <div key={idx} className="bg-white p-10 border border-slate-200 text-center hover:border-emerald-300 hover:shadow-xl transition-all group">
                                    {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
                                    {!item.icon && <div className="w-12 h-12 bg-emerald-900 mx-auto mb-6 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">{idx + 1}</div>}
                                    <h4 className="font-bold text-slate-900 serif uppercase text-sm mb-4 tracking-tight">{item.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-widest group-hover:text-emerald-600 transition-colors uppercase">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Board's Perspective */}
            {(data?.personnel || []).filter(p => (p.personType || '').toUpperCase() === 'BOARD').length > 0 && (
                <section className="py-24 bg-emerald-950 text-white">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="text-center mb-16">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Governance</span>
                            <h2 className="text-3xl font-bold text-white uppercase tracking-widest serif mb-2">The Board's Perspective</h2>
                            <div className="h-1 w-20 bg-emerald-400 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {(data?.personnel || [])
                                .filter(p => (p.personType || '').toUpperCase() === 'BOARD')
                                .map((member, idx) => (
                                    <div key={idx} className="bg-emerald-900/50 p-12 border border-emerald-800/50 relative group">
                                        <div className="absolute -top-4 -left-4 text-6xl text-emerald-400/20 serif italic">“</div>
                                        <p className="text-xl serif italic leading-relaxed text-emerald-50 mb-8 relative z-10">
                                            {member.bio || "Our commitment to excellence ensures that every student receives a world-class education focused on academic rigor and character development."}
                                        </p>
                                        <div className="flex items-center gap-6 border-t border-emerald-800/50 pt-8">
                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-400/30">
                                                <img src={member.photoUrl || '/school/image/default-avatar.png'} alt={member.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg text-white uppercase tracking-tight">{member.name}</p>
                                                <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">{member.designation || 'Board Member'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Leadership & Management */}
            {(data?.personnel || []).filter(p => {
                const type = (p.personType || '').toUpperCase();
                return type !== 'PRINCIPAL' && type !== 'FACULTY';
            }).length > 0 && (
                    <section className="py-24 bg-white border-b border-slate-100">
                        <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Leadership & Management</h2>
                                <div className="h-1 w-20 bg-emerald-900 mx-auto"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                                {(data?.personnel || [])
                                    .filter(p => {
                                        const type = (p.personType || '').toUpperCase();
                                        return type !== 'PRINCIPAL' && type !== 'FACULTY';
                                    })
                                    .map((member, idx) => (
                                        <div key={idx} className="text-center group">
                                            <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-full border-4 border-slate-50 group-hover:border-emerald-100 transition-all shadow-lg">
                                                <img src={member.photoUrl || '/school/image/default-avatar.png'} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            </div>
                                            <h4 className="font-bold text-slate-900 serif uppercase text-lg mb-1 tracking-tight">{member.name}</h4>
                                            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em]">{member.designation}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>
                )}

            {/* Principal detailed section */}
            {principalEnabled && (
                <section className="py-24 bg-white">
                    <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
                            <div className="w-full md:w-5/12">
                                {principalPhoto ? (
                                    <img src={principalPhoto} alt={principalName} className="w-full border border-slate-200 shadow-2xl rounded-sm object-cover object-top" />
                                ) : (
                                    <div className="w-full aspect-[4/5] bg-slate-100 border border-slate-200 flex items-center justify-center">
                                        <span className="text-6xl text-slate-400 font-bold uppercase">
                                            {principalName.charAt(0) || 'P'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-7/12">
                                <h2 className="text-3xl font-bold text-emerald-900 uppercase tracking-widest serif mb-2">From the Principal's Desk</h2>
                                <div className="h-1 w-20 bg-emerald-900 mb-10"></div>
                                <div className="prose prose-emerald prose-lg serif text-slate-700 italic">
                                    <p>"{principalMsg}"</p>
                                </div>
                                <div className="mt-12">
                                    <p className="font-bold text-2xl serif text-slate-900 uppercase">{principalName}</p>
                                    <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-[0.3em]">Chief Academic Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default AboutScreen;
