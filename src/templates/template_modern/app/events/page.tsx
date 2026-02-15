import React from 'react';
import { ANNOUNCEMENTS, SCHOOL_NAME, UPCOMING_EVENTS } from '../../constants';

const Broadcast: React.FC = () => {
    return (
        <div className="bg-white">
            {/* 1. Immersive Hero Section - Styled like Contact/About page */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Events Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>

                <div className="relative z-10 text-center space-y-8 max-w-5xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Live Campus Feed</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">
                        Events & Announcements
                    </h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        Stay connected with the vibrant heartbeat of {SCHOOL_NAME}. From academic milestones to cultural celebrations.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* 2. Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 py-32 space-y-32">

                <div className="grid lg:grid-cols-12 gap-20">

                    {/* LEFT: Latest Announcements (Editorial Style) */}
                    <div className="lg:col-span-8 space-y-16">
                        <div className="flex items-end justify-between border-b-2 border-gray-100 pb-10">
                            <div className="space-y-2">
                                <span className="text-blue-600 font-black uppercase tracking-widest text-xs">Stay Informed</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-primary font-playfair">Campus Newsroom</h2>
                            </div>
                            <div className="hidden md:block">
                                <button className="text-primary font-black text-[10px] uppercase tracking-widest border-2 border-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-all">
                                    Filter by Priority
                                </button>
                            </div>
                        </div>

                        <div className="space-y-12">
                            {ANNOUNCEMENTS.map((ann, idx) => (
                                <div key={ann.id} className="group relative grid md:grid-cols-[1fr_2.5fr] gap-12 p-10 bg-white rounded-[3rem] border border-gray-100 hover:border-accent hover:shadow-3xl hover:shadow-blue-900/5 transition-all duration-500">
                                    <div className="space-y-6">
                                        <div className="aspect-square bg-blue-50 rounded-[2.5rem] flex items-center justify-center text-4xl group-hover:bg-accent group-hover:scale-105 transition-all duration-500">
                                            {idx === 0 ? '📢' : idx === 1 ? '📚' : '🌎'}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Posted On</p>
                                            <p className="font-bold text-primary">{ann.date}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${ann.priority === 'High' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                                }`}>
                                                {ann.priority} Priority
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-primary group-hover:text-blue-700 transition-colors leading-tight font-playfair">
                                            {ann.title}
                                        </h3>
                                        <p className="text-gray-500 text-lg leading-relaxed">
                                            {ann.content}
                                        </p>
                                        <button className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.2em] group/btn">
                                            Read Full Detail
                                            <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Academic Calendar & Quick Actions */}
                    <div className="lg:col-span-4 space-y-16">
                        <div className="space-y-10">
                            <h2 className="text-3xl font-bold text-primary font-playfair">Academic Calendar</h2>

                            <div className="bg-primary rounded-[3.5rem] p-10 space-y-12 shadow-2xl relative overflow-hidden group">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

                                <div className="space-y-8 relative z-10">
                                    {UPCOMING_EVENTS.map((event, i) => (
                                        <div key={event.id} className="flex gap-8 group/item cursor-pointer">
                                            <div className="text-center shrink-0">
                                                <p className="text-[10px] font-black text-accent tracking-widest uppercase mb-1 opacity-70 group-hover/item:opacity-100 transition-opacity">
                                                    {event.date.split(' ')[0]}
                                                </p>
                                                <p className="text-3xl font-black text-white leading-none">
                                                    {event.date.split(' ')[1].replace(',', '')}
                                                </p>
                                            </div>
                                            <div className="flex-1 border-l border-white/10 pl-8 group-hover/item:border-accent/50 transition-colors">
                                                <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest mb-1">{event.category}</p>
                                                <p className="font-bold text-white text-lg leading-tight group-hover/item:text-accent transition-colors font-playfair">
                                                    {event.title}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 relative z-10 pt-4">
                                    <button className="w-full py-5 bg-accent text-primary font-black uppercase tracking-widest text-xs rounded-[2rem] hover:bg-white hover:scale-[1.02] transition-all shadow-xl">
                                        Download Master Calendar
                                    </button>
                                    <p className="text-center text-[10px] text-blue-100/40 font-bold uppercase tracking-widest">Version 2024.01 Updated</p>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter / Contact Card */}
                        <div className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 space-y-8">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">✉️</div>
                            <h3 className="text-2xl font-bold text-primary leading-tight font-playfair">Never miss a beat.</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Subscribe to our monthly newsletter to get the highlights of campus life delivered to your inbox.
                            </p>
                            <div className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="w-full px-6 py-4 bg-white rounded-2xl border-none focus:ring-2 focus:ring-accent outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                />
                                <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-accent hover:text-primary transition-all">
                                    Join Circle
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. Featured Highlight Spotlight */}
            <section className="bg-primary-dark py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-center relative z-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-accent rounded-[4rem] rotate-3 translate-x-4 translate-y-4 transition-transform group-hover:rotate-6"></div>
                        <img
                            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200"
                            className="relative z-10 rounded-[4rem] shadow-2xl aspect-video object-cover"
                            alt="Highlight Event"
                        />
                    </div>
                    <div className="space-y-8 text-white">
                        <span className="bg-accent text-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Event Spotlight</span>
                        <h2 className="text-5xl font-bold leading-tight font-playfair">Annual Science & <br /> Innovation Fair 2024</h2>
                        <p className="text-blue-100/70 text-lg leading-relaxed">
                            Witness the power of youthful curiosity as our students present their year-long research projects in Robotics, AI, and Sustainability. Featuring guest lecturers from world-renowned tech institutes.
                        </p>
                        <div className="flex gap-8 pt-4">
                            <div>
                                <p className="text-accent font-black text-2xl">Oct 15</p>
                                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Main Auditorium</p>
                            </div>
                            <div className="w-px h-12 bg-white/10"></div>
                            <div>
                                <p className="text-accent font-black text-2xl">9:00 AM</p>
                                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Morning Session</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </section>

            {/* 4. Final CTA */}
            <section className="py-32 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4 space-y-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-primary font-playfair">Experience it yourself.</h2>
                    <p className="text-gray-500 text-xl leading-relaxed">
                        Guests and parents are welcome to join most of our cultural and academic events. Please register your attendance in advance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                        <button className="bg-primary text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-primary transition-all shadow-2xl">RSVP for Events</button>
                        <button className="border-2 border-primary text-primary px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all">School Contact</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Broadcast;
