"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Award, Calendar, ChevronRight, Menu, MapPin, Phone, Mail,
  ArrowRight, Heart, BookOpen, Star, Clock, Search, Filter, ChevronLeft,
  CheckCircle2, Play, Instagram, Facebook, Twitter, Shield, Zap, Target,
  Globe, GraduationCap, Building2, Coffee, Library, Microscope,
  Trophy, Medal, Landmark, Sparkles, Linkedin, Share2, X
} from 'lucide-react';

interface TemplateRendererProps {
  templateId: number;
  page: string;
  postId: number | null;
  onNavigate: (page: string) => void;
  onSelectPost: (id: number) => void;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  templateId, page, postId, onNavigate, onSelectPost
}) => {
  const isModern = templateId === 0;
  const isClassic = templateId === 1;
  const isTech = templateId === 2;

  // Global Theme Configuration
  const theme = {
    primary: isModern ? 'text-blue-600' : isClassic ? 'text-amber-700' : 'text-emerald-400',
    accent: isModern ? 'text-indigo-500' : isClassic ? 'text-slate-600' : 'text-cyan-400',
    bgPrimary: isModern ? 'bg-blue-600' : isClassic ? 'bg-amber-800' : 'bg-emerald-500',
    bgSecondary: isModern ? 'bg-slate-50' : isClassic ? 'bg-stone-50' : 'bg-slate-900',
    bgDark: isModern ? 'bg-slate-900' : isClassic ? 'bg-stone-900' : 'bg-black',
    border: isModern ? 'border-blue-100' : isClassic ? 'border-amber-200' : 'border-emerald-500/20',
    textMain: isTech ? 'text-slate-300' : 'text-slate-700',
    textHeading: isTech ? 'text-white' : 'text-slate-900',
    font: isClassic ? 'font-serif' : 'font-sans',
    card: isTech ? 'bg-slate-800/40 border border-slate-700/50' : 'bg-white shadow-sm border border-slate-100',
    btnRadius: isModern ? 'rounded-lg' : isClassic ? 'rounded-none' : 'rounded-2xl',
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About School' },
    { id: 'activities', label: 'Activities' },
    { id: 'events', label: 'Events' },
    { id: 'blog', label: 'News' },
    { id: 'contact', label: 'Contact' },
  ];

  const getHeroImg = () => {
    if (isModern) return "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920";
    if (isClassic) return "https://images.unsplash.com/photo-1541339907198-e08756cdfb3f?auto=format&fit=crop&q=80&w=1920";
    return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920";
  };

  const getAboutImg = () => {
    if (isModern) return "https://images.unsplash.com/photo-1523050335456-c69462153221?auto=format&fit=crop&q=80&w=800";
    if (isClassic) return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800";
    return "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className={`min-h-full ${theme.font} ${theme.bgSecondary} ${theme.textMain} selection:bg-opacity-30 selection:bg-current`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-30 ${isTech ? 'bg-black/80 backdrop-blur-md' : 'bg-white'} border-b ${theme.border} py-4 px-6 md:px-12 flex justify-between items-center`}>
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <GraduationCap className={`w-8 h-8 ${theme.primary}`} />
          <span className={`text-xl font-black uppercase tracking-tighter ${theme.textHeading}`}>Academy.</span>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-bold uppercase tracking-widest hover:opacity-100 transition-all ${page === item.id ? theme.primary : 'opacity-60'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className={`${theme.bgPrimary} text-white px-6 py-2.5 ${theme.btnRadius} text-sm font-bold shadow-lg hover:scale-105 transition-transform`}>
          Portal Login
        </button>
      </nav>

      {/* Render Pages */}
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="home">
            {/* Hero */}
            <header className="relative h-[80vh] flex items-center overflow-hidden">
              <img src={getHeroImg()} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
              <div className={`absolute inset-0 ${isTech ? 'bg-black/70' : 'bg-gradient-to-r from-slate-900/80 to-transparent'}`}></div>
              <div className="container mx-auto px-12 relative z-10">
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h1 className={`text-5xl md:text-7xl font-black text-white mb-6 leading-tight max-w-3xl ${isClassic ? 'font-serif italic' : ''}`}>
                    {isTech ? "Building Tomorrow's Engineers." : isClassic ? 'Cultivating Wisdom Since 1892.' : 'Excellence in Every Pursuit.'}
                  </h1>
                  <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                    A vibrant community of thinkers, creators, and leaders dedicated to pushing the boundaries of knowledge.
                  </p>
                  <div className="flex space-x-4">
                    <button className={`${theme.bgPrimary} text-white px-8 py-4 ${theme.btnRadius} font-bold text-base shadow-xl hover:brightness-110 transition-all`}>
                      Enroll Now
                    </button>
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 ${theme.btnRadius} font-bold text-base hover:bg-white/20 transition-all">
                      Virtual Tour
                    </button>
                  </div>
                </motion.div>
              </div>
            </header>

            {/* Quick Stats */}
            <div className={`py-12 ${isTech ? 'bg-slate-950 border-y border-white/5' : theme.bgDark}`}>
              <div className="container mx-auto px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <Stat value="2,500+" label="Students" icon={<Users className="w-5 h-5 text-indigo-400" />} />
                  <Stat value="98%" label="Graduation" icon={<Award className="w-5 h-5 text-emerald-400" />} />
                  <Stat value="150+" label="Faculty" icon={<Users className="w-5 h-5 text-blue-400" />} />
                  <Stat value="45+" label="Labs" icon={<Microscope className="w-5 h-5 text-purple-400" />} />
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  <div className="lg:w-1/2">
                    <img src={getAboutImg()} className={`w-full rounded-[3rem] shadow-2xl ${isClassic ? 'rounded-none border-8 border-stone-100' : ''}`} alt="School life" />
                  </div>
                  <div className="lg:w-1/2">
                    <h2 className={`text-4xl md:text-5xl font-black mb-8 ${theme.textHeading}`}>Our Educational Philosophy</h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                      We believe that education is not just about imparting facts but about teaching students how to think critically and solve real-world problems. Our curriculum is designed to challenge students and foster a lifelong love for learning.
                    </p>
                    <button onClick={() => onNavigate('about')} className={`flex items-center space-x-2 font-black ${theme.primary} uppercase tracking-widest text-sm hover:translate-x-2 transition-transform`}>
                      <span>Learn more about our school</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {page === 'about' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-24 px-12 bg-white" key="about">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className={`text-5xl font-black mb-8 ${theme.textHeading}`}>Rooted in Tradition, Focused on Future</h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-16">
                Established over a century ago, our institution has been at the forefront of educational innovation while maintaining the core values of integrity, community, and respect.
              </p>

              <div className="grid md:grid-cols-3 gap-12 text-left">
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${theme.bgPrimary} text-white rounded-xl flex items-center justify-center`}>
                    <Shield size={24} />
                  </div>
                  <h4 className="text-xl font-bold">Integrity</h4>
                  <p className="text-slate-500 text-sm">Honesty and moral principles are at the heart of our community.</p>
                </div>
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${theme.bgPrimary} text-white rounded-xl flex items-center justify-center`}>
                    <Users size={24} />
                  </div>
                  <h4 className="text-xl font-bold">Inclusivity</h4>
                  <p className="text-slate-500 text-sm">We welcome and celebrate diversity in all its forms.</p>
                </div>
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${theme.bgPrimary} text-white rounded-xl flex items-center justify-center`}>
                    <Target size={24} />
                  </div>
                  <h4 className="text-xl font-bold">Ambition</h4>
                  <p className="text-slate-500 text-sm">We empower students to reach for their highest potential.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {page === 'activities' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-12" key="activities">
            <div className="container mx-auto">
              <h2 className={`text-5xl font-black mb-16 text-center ${theme.textHeading}`}>Beyond the Classroom</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ActivityCard
                  title="Elite Athletics"
                  desc="Compete at regional and national levels in football, basketball, and more."
                  img="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
                />
                <ActivityCard
                  title="Creative Arts"
                  desc="Express yourself through painting, sculpture, and digital design studios."
                  img="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800"
                />
                <ActivityCard
                  title="STEM Innovation"
                  desc="Robotics, coding clubs, and advanced mathematics competitions."
                  img="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
                />
              </div>
            </div>
          </motion.div>
        )}

        {page === 'events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-12 bg-white" key="events">
            <div className="container mx-auto max-w-4xl">
              <h2 className={`text-4xl font-black mb-12 text-center ${theme.textHeading}`}>Upcoming Calendar</h2>
              <div className="space-y-6">
                <EventRow date="Oct 12" title="Annual Science Fair" time="09:00 AM" loc="Main Auditorium" />
                <EventRow date="Oct 15" title="Parent-Teacher Summit" time="02:00 PM" loc="Admin Block" />
                <EventRow date="Oct 20" title="Founder's Day Celebration" time="06:00 PM" loc="Stadium Ground" />
                <EventRow date="Oct 25" title="Fall Sports Meet" time="08:00 AM" loc="Sports Complex" />
              </div>
            </div>
          </motion.div>
        )}

        {page === 'blog' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 px-12" key="blog">
            <div className="container mx-auto">
              <h2 className={`text-5xl font-black mb-16 text-center ${theme.textHeading}`}>Institutional News</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <BlogPreview
                  onSelect={() => onSelectPost(1)}
                  title="New Science Labs Inaugurated"
                  date="Sept 28, 2024"
                  excerpt="Cutting-edge facilities now open to all STEM students for advanced research..."
                  img="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
                />
                <BlogPreview
                  onSelect={() => onSelectPost(2)}
                  title="Championship Win in Debate"
                  date="Sept 24, 2024"
                  excerpt="Our seniors took home the first place trophy at the National Forensics League..."
                  img="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800"
                />
              </div>
            </div>
          </motion.div>
        )}

        {page === 'blog-single' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="py-24 px-12 bg-white" key="blog-single">
            <div className="container mx-auto max-w-3xl">
              <button onClick={() => onNavigate('blog')} className="flex items-center space-x-2 text-slate-400 mb-8 hover:text-slate-900 transition-colors">
                <ChevronLeft size={20} />
                <span>Back to News</span>
              </button>
              <h2 className={`text-4xl font-black mb-6 ${theme.textHeading}`}>Institutional Growth Report 2024</h2>
              <div className="flex items-center space-x-4 mb-10 text-slate-400 text-sm">
                <span className="flex items-center space-x-1"><Calendar size={14} /> <span>October 1st, 2024</span></span>
                <span className="flex items-center space-x-1"><Users size={14} /> <span>By Admin Office</span></span>
              </div>
              <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200" className="w-full rounded-3xl mb-12 shadow-xl" alt="article" />
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg space-y-6">
                <p>We are thrilled to announce that our institution has been recognized for its academic excellence for the fifth consecutive year. Our dedication to student growth and holistic development remains unwavering.</p>
                <p>This year, we've invested significantly in our digital infrastructure, ensuring that every student has the tools they need to succeed in a rapidly evolving world. From virtual reality labs to integrated AI learning assistants, we are setting a new standard for education.</p>
              </div>
            </div>
          </motion.div>
        )}

        {page === 'contact' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-24 px-12" key="contact">
            <div className="container mx-auto max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
              <div className={`${theme.bgPrimary} md:w-1/3 p-12 text-white`}>
                <h3 className="text-3xl font-black mb-10">Get in Touch</h3>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <MapPin className="mt-1" size={20} />
                    <div>
                      <div className="font-bold">Visit Us</div>
                      <div className="opacity-70 text-sm">123 Academic Drive, Education District, 90210</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="mt-1" size={20} />
                    <div>
                      <div className="font-bold">Call Us</div>
                      <div className="opacity-70 text-sm">+1 (555) EDU-CANVAS</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="mt-1" size={20} />
                    <div>
                      <div className="font-bold">Email Us</div>
                      <div className="opacity-70 text-sm">admissions@school.edu</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-12">
                <h3 className={`text-2xl font-black mb-8 ${theme.textHeading}`}>Send an Inquiry</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <input type="text" placeholder="Full Name" className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-indigo-500" />
                  <input type="email" placeholder="Email Address" className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 focus:outline-none focus:border-indigo-500" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 mb-6 focus:outline-none focus:border-indigo-500" />
                <textarea placeholder="Message" rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 mb-8 focus:outline-none focus:border-indigo-500"></textarea>
                <button className={`${theme.bgPrimary} text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all`}>
                  Submit Message
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Basic Footer for Simulator */}
      <footer className={`${theme.bgDark} py-12 px-12 border-t ${theme.border} text-white/50 text-sm`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-6 h-6" />
            <span className="font-bold">Academy Portal Simulator</span>
          </div>
          <div className="flex space-x-8">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
            <button className="hover:text-white transition-colors">Support</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Stat: React.FC<{ value: string, label: string, icon: React.ReactNode }> = ({ value, label, icon }) => (
  <div className="text-center group">
    <div className="inline-flex items-center justify-center w-10 h-10 bg-white/5 rounded-xl mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-white text-3xl font-black mb-1">{value}</div>
    <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">{label}</div>
  </div>
);

const ActivityCard: React.FC<{ title: string, desc: string, img: string }> = ({ title, desc, img }) => (
  <div className="group rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all border border-slate-100">
    <div className="h-48 overflow-hidden relative">
      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-6 text-white font-bold">{title}</div>
    </div>
    <div className="p-8">
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
      <button className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center space-x-2">
        <span>Learn More</span>
        <ArrowRight size={14} />
      </button>
    </div>
  </div>
);

const EventRow: React.FC<{ date: string, title: string, time: string, loc: string }> = ({ date, title, time, loc }) => (
  <div className="group p-6 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex items-center justify-between">
    <div className="flex items-center space-x-6">
      <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex flex-col items-center justify-center font-bold">
        <span className="text-xs uppercase opacity-50">{date.split(' ')[0]}</span>
        <span className="text-lg">{date.split(' ')[1]}</span>
      </div>
      <div>
        <h4 className="font-bold text-lg group-hover:text-indigo-600 transition-colors">{title}</h4>
        <div className="flex items-center space-x-4 text-slate-400 text-xs mt-1">
          <span className="flex items-center space-x-1"><Clock size={12} /> <span>{time}</span></span>
          <span className="flex items-center space-x-1"><MapPin size={12} /> <span>{loc}</span></span>
        </div>
      </div>
    </div>
    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      <ChevronRight size={20} />
    </button>
  </div>
);

const BlogPreview: React.FC<{ title: string, date: string, excerpt: string, img: string, onSelect: () => void }> = ({ title, date, excerpt, img, onSelect }) => (
  <div className="group cursor-pointer" onClick={onSelect}>
    <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-6 relative shadow-lg">
      <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={title} />
      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-all"></div>
    </div>
    <div className="px-4">
      <div className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{date}</div>
      <h3 className="text-2xl font-black mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{excerpt}</p>
    </div>
  </div>
);
