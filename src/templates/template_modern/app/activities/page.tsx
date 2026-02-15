import React from 'react';
import { ACTIVITIES } from '../../constants';

const Activities: React.FC = () => {
    return (
        <div className="pb-24">
            {/* 1. Immersive Hero Section - Styled like About page */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Campus Activities and Clubs"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90"></div>
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Vibrant Campus Life</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">Beyond the Books</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        Cultivating passions through a diverse range of clubs, competitive sports, and transformative creative arts.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* Main Activities Grid */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {ACTIVITIES.map((activity, i) => (
                        <div key={i} className="group flex flex-col md:flex-row bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100">
                            <div className="md:w-1/2 h-72 md:h-auto overflow-hidden relative">
                                <img
                                    src={activity.image}
                                    alt={activity.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 bg-accent text-primary px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    {activity.category}
                                </div>
                            </div>
                            <div className="md:w-1/2 p-10 flex flex-col justify-center space-y-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-accent-hover transition-colors font-playfair">
                                    {activity.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {activity.description}
                                </p>
                                <div className="pt-2">
                                    <button className="inline-flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-widest hover:gap-5 transition-all group/btn">
                                        Program Overview
                                        <span className="text-accent-hover">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Life Skills & Leadership Banner */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="bg-accent rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
                    <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <span className="text-blue-950 font-black uppercase tracking-[0.3em] text-xs">Excellence Program</span>
                                <h2 className="text-4xl md:text-7xl font-bold text-primary leading-tight font-playfair">Life Skills & Leadership</h2>
                            </div>
                            <p className="text-blue-900/80 text-xl leading-relaxed font-medium">
                                Our signature program designed to create the leaders of tomorrow. We focus on emotional intelligence, public speaking, and critical problem solving as core institutional pillars.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {['Public Speaking', 'Ethics', 'Innovation', 'Financial Literacy'].map(skill => (
                                    <span key={skill} className="bg-primary text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg hover:bg-primary-light transition-colors cursor-default">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] text-center space-y-3 shadow-xl">
                                <h4 className="text-5xl font-black text-primary tracking-tighter">100%</h4>
                                <p className="text-blue-900/60 font-black uppercase tracking-[0.2em] text-[10px]">Student Engagement</p>
                            </div>
                            <div className="bg-white/40 backdrop-blur-md p-10 rounded-[3rem] text-center space-y-3 shadow-xl">
                                <h4 className="text-5xl font-black text-primary tracking-tighter">20+</h4>
                                <p className="text-blue-900/60 font-black uppercase tracking-[0.2em] text-[10px]">Societies & Clubs</p>
                            </div>
                            <div className="bg-primary p-12 rounded-[3rem] text-center space-y-4 col-span-2 shadow-2xl transform hover:scale-[1.02] transition-transform">
                                <h4 className="text-3xl font-black text-accent">Award Winning</h4>
                                <div className="w-12 h-1 bg-accent/30 mx-auto rounded-full"></div>
                                <p className="text-blue-100/60 font-black uppercase tracking-[0.3em] text-xs">Innovation Curriculum 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Activities;
