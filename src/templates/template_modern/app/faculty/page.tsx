import React from 'react';
import { BOARD_MEMBERS } from '../../constants';

const Faculty: React.FC = () => {
    return (
        <div className="pb-24">
            {/* 1. Immersive Hero Section - Styled like About/Contact page */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Faculty and Leadership"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Scholars & Mentors</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">Academic Leadership</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        Our mentors are more than educators; they are visionaries committed to nurturing the next generation of global citizens.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* 2. Faculty Listing */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="space-y-32">
                    {BOARD_MEMBERS.map((member, i) => (
                        <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                            <div className="lg:w-1/2 relative group">
                                <div className="absolute inset-0 bg-accent rounded-[3rem] rotate-6 translate-x-4 translate-y-4 -z-10 transition-transform group-hover:rotate-3"></div>
                                <img src={member.image} className="rounded-[3rem] shadow-2xl w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" alt={member.name} />
                            </div>
                            <div className="lg:w-1/2 space-y-8">
                                <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs bg-white border border-blue-100 px-6 py-2 rounded-full shadow-sm inline-block">
                                    {member.position}
                                </span>
                                <h2 className="text-5xl font-bold text-primary leading-tight font-playfair">{member.name}</h2>
                                <p className="text-gray-600 text-xl leading-relaxed italic">"{member.bio}"</p>
                                <div className="pt-8 border-t border-gray-100 space-y-4">
                                    <p className="text-gray-500 leading-relaxed text-lg">
                                        With an unwavering commitment to institutional growth, {member.name.split(' ')[0]} has been instrumental in shaping the academic culture of St. Andrews. Their focus on empathetic leadership and innovative curriculum development has earned the school multiple global awards.
                                    </p>
                                    <div className="flex gap-4 pt-4">
                                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-primary transition-all">Full Profile</button>
                                        <button className="border-2 border-primary text-primary px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">Contact Office</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faculty;
