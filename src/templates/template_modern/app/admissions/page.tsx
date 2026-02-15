"use client";

import React, { useState } from 'react';
import { SCHOOL_NAME } from '../../constants';

const Admissions: React.FC = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        grade: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Inquiry submitted successfully! Our admission office will contact you soon.");
    };

    return (
        <div className="pb-24">
            {/* 1. Immersive Hero Section - Styled like About page */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                    alt="Admissions Center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90"></div>
                <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
                    <span className="text-accent font-black uppercase tracking-[0.5em] text-sm animate-pulse">Admissions 2025-26</span>
                    <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight font-playfair">Enroll for the Future</h1>
                    <p className="text-blue-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                        Start your journey with {SCHOOL_NAME} today. We invite you to be part of a legacy that values character and competence.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-gray-100">
                    <h2 className="text-3xl font-bold text-primary mb-8 font-playfair">Admission Inquiry</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Student's Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                value={formData.studentName}
                                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                placeholder="Ex: John Doe"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Parent/Guardian Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                value={formData.parentName}
                                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                placeholder="Ex: Sarah Doe"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Phone Number</label>
                            <input
                                type="tel"
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        <div className="space-y-3 sm:col-span-2">
                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Grade for Admission</label>
                            <select
                                required
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all shadow-inner appearance-none cursor-pointer"
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            >
                                <option value="">Select Level</option>
                                <option value="Pre-K">Pre-K</option>
                                <option value="Primary">Primary (Grade 1-5)</option>
                                <option value="Middle">Middle (Grade 6-8)</option>
                                <option value="High">High School (Grade 9-12)</option>
                            </select>
                        </div>
                        <div className="space-y-3 sm:col-span-2">
                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Additional Message</label>
                            <textarea
                                rows={4}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tell us about your child's interests or any specific queries..."
                            ></textarea>
                        </div>
                        <div className="sm:col-span-2 pt-4">
                            <button
                                type="submit"
                                className="w-full py-5 bg-primary text-accent font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-accent hover:text-primary transition-all shadow-2xl shadow-blue-100/50"
                            >
                                Send Admission Request
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-12">
                    <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                        <h3 className="text-2xl font-bold text-primary mb-8 font-playfair">Enrollment Pathway</h3>
                        <ul className="space-y-8">
                            {[
                                { s: '1', t: 'Digital Inquiry', d: 'Submit the form above to start.' },
                                { s: '2', t: 'Campus Preview', d: 'Visit us for a personalized walkthrough.' },
                                { s: '3', t: 'Interaction', d: 'An informal session with our mentors.' },
                                { s: '4', t: 'Onboarding', d: 'Formalize registration and join the community.' }
                            ].map((step) => (
                                <li key={step.s} className="flex gap-5 group">
                                    <div className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center font-black shadow-md border border-gray-100 group-hover:bg-accent transition-colors shrink-0">{step.s}</div>
                                    <div>
                                        <h5 className="font-bold text-primary text-lg mb-1 font-playfair">{step.t}</h5>
                                        <p className="text-sm text-gray-500 leading-relaxed">{step.d}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-primary p-10 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                        <h3 className="text-2xl font-bold relative z-10 font-playfair">Assistance Center</h3>
                        <p className="text-blue-100/70 text-sm leading-relaxed relative z-10">Our admission coordinators are available to guide you through every step of the process.</p>
                        <div className="space-y-4 pt-4 relative z-10">
                            <div className="flex items-center gap-4">
                                <span className="text-accent">📞</span>
                                <span className="font-bold">+1 (555) 999-0000</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-accent">✉️</span>
                                <span className="font-bold">admissions@standrews.edu</span>
                            </div>
                        </div>
                        <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Schedule a Call</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
