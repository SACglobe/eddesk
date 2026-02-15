import React from 'react';

const ZONES = [
    {
        id: 'innovation',
        title: 'The Innovation Hub',
        subtitle: 'Scientific Exploration',
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
        desc: 'Our state-of-the-art laboratories are designed for hands-on discovery. From 3D printing stations to advanced chemical analysis rigs, we provide the tools for tomorrow\'s breakthroughs.',
        specs: ['AR/VR Simulation Lab', 'Robotics Assembly Line', 'Clean Room Environment'],
        accent: 'border-blue-500'
    },
    {
        id: 'knowledge',
        title: 'The Knowledge Nexus',
        subtitle: 'Information Architecture',
        img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200',
        desc: 'Far more than a library, this is a multi-dimensional learning commons. It features quiet zones, collaborative pods, and access to a global network of digital research journals.',
        specs: ['50k+ Physical Volumes', 'Fiber-Optic Study Pods', 'Archives & Manuscripts'],
        accent: 'border-accent'
    },
    {
        id: 'sports',
        title: 'The Olympic Pavilion',
        subtitle: 'Athletic Performance',
        img: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=1200',
        desc: 'Physical excellence is fostered in our world-class arena. Our facilities are designed to support both professional-level training and general wellness for every student.',
        specs: ['Temperature Controlled Pool', 'FIFA Grade Turf', 'High-Performance Gym'],
        accent: 'border-primary'
    },
    {
        id: 'arts',
        title: 'The Creative Wing',
        subtitle: 'Artistic Expression',
        img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
        desc: 'A sanctuary for the imagination. Our art wing provides expansive studios for fine arts, acoustics-perfected music rooms, and a digital media suite for the next gen of creators.',
        specs: ['Dolby Atmos Music Room', 'Natural Light Studios', 'Digital Editing Suite'],
        accent: 'border-yellow-600'
    }
];

const Infrastructure: React.FC = () => {
    return (
        <div className="bg-white overflow-hidden pb-24">
            {/* 1. Immersive Hero Section - Styled like About/Contact page */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Campus Architecture"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                <div className="relative z-10 text-center space-y-8 max-w-5xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">25 Acre Modern Estate</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">Spaces Built to Inspire</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        Infrastructure that breathes life into imagination and turns curiosity into capability.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* 2. Metrics Ribbon */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { l: 'Energy Source', v: '100% Solar', i: '☀️' },
                        { l: 'Connectivity', v: '10 Gbps Fiber', i: '🌐' },
                        { l: 'Security', v: 'AI-24/7 Monitoring', i: '🛡️' },
                        { l: 'Green Space', v: '40% Of Campus', i: '🌳' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{item.i}</span>
                            <div>
                                <p className="text-gray-400 font-black text-[9px] uppercase tracking-widest">{item.l}</p>
                                <p className="text-primary font-bold text-sm">{item.v}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Zone Explorer - Asymmetrical Editorial Layout */}
            <section className="py-32 space-y-48">
                {ZONES.map((zone, i) => (
                    <div key={zone.id} className="max-w-7xl mx-auto px-4">
                        <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
                            {/* Image Side */}
                            <div className="w-full lg:w-3/5 relative group">
                                <div className={`absolute inset-0 bg-gray-100 rounded-[4rem] translate-x-6 translate-y-6 -z-10 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700`}></div>
                                <div className="relative overflow-hidden rounded-[4rem] shadow-2xl aspect-[16/10]">
                                    <img
                                        src={zone.img}
                                        alt={zone.title}
                                        className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[2000ms]"
                                    />
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700"></div>
                                </div>
                                {/* Float Badge */}
                                <div className="absolute -top-6 -right-6 md:-right-12 bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-8 border-accent max-w-[200px] hidden md:block">
                                    <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest mb-2">Technical Hub</p>
                                    <p className="font-bold text-primary text-sm leading-tight">{zone.specs[0]}</p>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full lg:w-2/5 space-y-8">
                                <div className="space-y-4">
                                    <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs block">{zone.subtitle}</span>
                                    <h2 className="text-4xl md:text-6xl font-bold text-primary leading-tight font-playfair">
                                        {zone.title}
                                    </h2>
                                </div>
                                <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
                                    {zone.desc}
                                </p>

                                <div className="pt-8 border-t border-gray-100">
                                    <ul className="grid grid-cols-1 gap-4">
                                        {zone.specs.map((spec, idx) => (
                                            <li key={idx} className="flex items-center gap-4 text-primary/70 font-bold group/item">
                                                <div className="w-6 h-[2px] bg-accent group-hover/item:w-10 transition-all"></div>
                                                <span className="group-hover/item:text-primary transition-colors font-playfair">{spec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-8">
                                    <button className="flex items-center gap-4 group/btn">
                                        <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:text-primary transition-all duration-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </div>
                                        <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] border-b-2 border-transparent hover:border-accent transition-all pb-1">Request a guided tour</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* 4. Smart Campus / Future Proofing */}
            <section className="bg-primary-dark py-32 relative">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-20 space-y-4">
                        <span className="text-accent font-black uppercase tracking-[0.3em] text-xs">Sustainability</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white font-playfair">The Smart Campus Ecosystem</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { t: 'Zero-Waste Initiative', d: 'Our smart waste management system recycles 90% of campus refuse into compost and raw materials.', i: '♻️' },
                            { t: 'Digital Backbone', v: 'Every corner of our campus is blanketed with secure, high-speed Wi-Fi 6 for seamless learning.', i: '📡' },
                            { t: 'Bio-Climatic Design', d: 'Buildings are oriented to optimize natural airflow and sunlight, reducing cooling needs by 30%.', i: '🍃' }
                        ].map((card, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group">
                                <div className="text-5xl mb-8 group-hover:scale-125 transition-transform duration-500 inline-block">{card.i}</div>
                                <h4 className="text-2xl font-bold text-white mb-4 font-playfair">{card.t}</h4>
                                <p className="text-blue-100/60 leading-relaxed">{card.d || 'Advanced infrastructure designed for the 21st century learner.'}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            </section>

            {/* 5. Final CTA */}
            <section className="py-32 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4 space-y-12">
                    <div className="w-24 h-24 bg-blue-50 text-primary rounded-[2.5rem] flex items-center justify-center text-4xl mx-auto shadow-inner">🏫</div>
                    <h2 className="text-5xl md:text-7xl font-bold text-primary leading-tight font-playfair">Seeing is Believing.</h2>
                    <p className="text-gray-500 text-xl leading-relaxed">
                        While photos capture the space, nothing beats the feeling of standing in our Innovation Hub or walking the Knowledge Nexus. We host tours every Tuesday and Thursday.
                    </p>
                    <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-primary transition-all shadow-2xl">Book Campus Tour</button>
                        <button className="border-2 border-primary text-primary px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all">Download Masterplan PDF</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Infrastructure;
