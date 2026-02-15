"use client";

import React from 'react';
import { SCHOOL_NAME } from '../../constants';

const Contact: React.FC = () => {
    return (
        <div className="pb-24">
            {/* 1. Immersive Hero Section - Styled like About page */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Contact Center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Global Communications</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">Let's Connect</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        Whether you're a prospective parent, an alumnus, or a community member, your journey starts with a conversation.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </section>

            {/* 2. Main Contact Grid */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-start">
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">Reach Out</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary font-playfair">Direct Channels</h2>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                Our administrative offices are open to assist you with admissions, academic inquiries, and general campus information.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-12">
                            <div className="space-y-4 group">
                                <div className="w-14 h-14 bg-primary text-accent rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:scale-110">📍</div>
                                <h4 className="font-bold text-primary text-xl font-playfair">Main Campus</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">123 Education Lane, Springfield, IL 62704</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-14 h-14 bg-accent text-primary rounded-2xl flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:scale-110">📞</div>
                                <h4 className="font-bold text-primary text-xl font-playfair">Contact</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">Admin: +1 (555) 123-4567<br />Email: office@standrews.edu</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-14 h-14 bg-white shadow-xl rounded-2xl flex items-center justify-center text-2xl text-primary transition-transform group-hover:scale-110">⏰</div>
                                <h4 className="font-bold text-primary text-xl font-playfair">Visiting Hours</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">Mon - Fri: 8 AM - 4 PM<br />Sat: 9 AM - 12 PM</p>
                            </div>
                            <div className="space-y-4 group">
                                <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110">✉️</div>
                                <h4 className="font-bold text-primary text-xl font-playfair">Connect Socially</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">Follow our daily updates<br />@standrewsacademy</p>
                            </div>
                        </div>

                        <div className="h-96 bg-blue-100 rounded-[3rem] overflow-hidden shadow-inner flex items-center justify-center relative group cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" alt="Map Preview" />
                            <div className="relative z-10 bg-white/90 backdrop-blur-md px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-primary shadow-2xl border border-white/50 group-hover:bg-accent transition-colors">
                                Open Map Navigator
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 relative overflow-hidden lg:sticky lg:top-32">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <h3 className="text-3xl font-bold text-primary mb-10 font-playfair">Send a Quick Message</h3>
                        <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon."); }}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Full Name</label>
                                    <input type="text" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner" placeholder="Jane Doe" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Email Address</label>
                                    <input type="email" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner" placeholder="jane@example.com" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Subject</label>
                                <input type="text" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner" placeholder="Admission Inquiry" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Message</label>
                                <textarea rows={5} required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="submit" className="w-full py-6 bg-primary text-accent font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-accent hover:text-primary transition-all shadow-xl shadow-blue-100/50">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
