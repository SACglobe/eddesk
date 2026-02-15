import React from 'react';

const Academics: React.FC = () => {
    const levels = [
        { title: 'Primary School', grade: 'Grade 1-5', desc: 'Focusing on foundational literacy, numeracy, and social-emotional growth.' },
        { title: 'Middle School', grade: 'Grade 6-8', desc: 'Fostering critical thinking, independence, and exploration of diverse subjects.' },
        { title: 'High School', grade: 'Grade 9-12', desc: 'Rigorous college-preparatory curriculum with specialized elective streams.' }
    ];

    return (
        <div className="pb-24">
            {/* 1. Immersive Hero Section - Styled like About page */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Library and Research Center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90"></div>
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Scholarly Pursuits</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">Academic Excellence</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        A curriculum designed to challenge, inspire, and prepare students for a global future of intellectual discovery.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {levels.map((level, i) => (
                        <div key={i} className="group bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:border-accent hover:-translate-y-2 transition-all">
                            <span className="text-blue-600 font-black uppercase tracking-widest text-[10px] bg-blue-50 px-4 py-1.5 rounded-full mb-6 inline-block">
                                {level.grade}
                            </span>
                            <h3 className="text-3xl font-bold text-primary mb-4 group-hover:text-blue-700 transition-colors font-playfair">{level.title}</h3>
                            <p className="text-gray-500 leading-relaxed mb-8">{level.desc}</p>
                            <button className="text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-accent pb-1 hover:border-primary transition-colors">Explore Curriculum</button>
                        </div>
                    ))}
                </div>

                <section className="bg-gray-50 rounded-[4rem] p-12 md:p-20 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Our Philosophy</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary font-playfair">Pedagogical Approach</h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            We move away from rote learning toward inquiry-based education. Students are encouraged to ask "Why?" and "How?", making them active participants in their own intellectual journey through project-based exploration.
                        </p>
                        <ul className="space-y-5">
                            {['Project Based Learning (PBL)', 'Global IB Standards Alignment', 'Integrated STEM Laboratory Works', 'Personalized Mentorship Framework'].map(item => (
                                <li key={item} className="flex items-center gap-4 text-primary font-bold group">
                                    <span className="w-10 h-[2px] bg-accent group-hover:w-14 transition-all"></span>
                                    <span className="group-hover:translate-x-2 transition-transform">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary rounded-[3rem] rotate-3 translate-x-4 translate-y-4 -z-10 group-hover:rotate-6 transition-transform"></div>
                        <img
                            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200"
                            className="rounded-[3rem] shadow-2xl relative z-10 w-full"
                            alt="Classroom Collaboration"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Academics;
