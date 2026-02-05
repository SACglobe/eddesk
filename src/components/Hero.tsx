"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveRight, CheckCircle, Globe, Shield, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.12)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full text-indigo-400 text-sm font-bold mb-10 shadow-xl shadow-indigo-500/5"
        >
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] overflow-hidden">
                <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
              </div>
            ))}
          </div>
          <span className="text-slate-300">Trusted by 500+ Institutions</span>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <div className="flex items-center text-yellow-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 text-white">4.9/5</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter"
        >
          Redefining the <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-white to-purple-400">
            School Experience.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Empower your school with the world's most sophisticated website builder and administrative ecosystem.
          Beautiful templates. Powerful backend. Seamless growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8 mb-24"
        >
          <button
            onClick={() => scrollToSection('templates')}
            className="w-full sm:w-auto bg-white text-slate-950 px-12 py-6 rounded-2xl font-black text-xl hover:bg-indigo-50 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center space-x-3 group"
          >
            <span>Explore Templates</span>
            <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('admin')}
            className="w-full sm:w-auto bg-slate-900/40 border border-slate-700/50 backdrop-blur-md hover:border-indigo-500/50 px-12 py-6 rounded-2xl font-black text-xl text-white hover:bg-slate-800 transition-all flex items-center justify-center space-x-3"
          >
            <span>Live Admin Demo</span>
          </button>
        </motion.div>

        {/* Dynamic Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"><Globe className="w-5 h-5 text-indigo-400" /></div>
            <span className="font-bold tracking-widest text-xs uppercase text-white">Global Infrastructure</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"><Shield className="w-5 h-5 text-emerald-400" /></div>
            <span className="font-bold tracking-widest text-xs uppercase text-white">Institutional Security</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center"><CheckCircle className="w-5 h-5 text-blue-400" /></div>
            <span className="font-bold tracking-widest text-xs uppercase text-white">Compliant Ready</span>
          </div>
        </motion.div>

        {/* Abstract Floating Elements */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-10 top-[20%] hidden xl:block z-0 pointer-events-none"
        >
          <div className="w-64 h-64 bg-indigo-500/10 rounded-[4rem] blur-[80px]"></div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-[30%] hidden xl:block z-0 pointer-events-none"
        >
          <div className="w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"></div>
        </motion.div>
      </div>

      {/* Hero Mockup */}
      <div className="mt-32 relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[4rem] bg-gradient-to-b from-indigo-500/20 to-transparent p-[1px] shadow-[0_0_120px_rgba(79,70,229,0.2)]"
        >
          <div className="bg-slate-950 rounded-[4rem] overflow-hidden p-4">
            <div className="bg-slate-900/50 rounded-[3rem] overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2426"
                alt="Dashboard Preview"
                className="w-full opacity-60 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Dashboard Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute top-1/4 left-10 md:left-20 bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl max-w-xs"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-black text-xl">Institution Hub</div>
                    <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Active System</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-2.5 bg-white/10 rounded-full"></div>
                  <div className="w-2/3 h-2.5 bg-white/10 rounded-full"></div>
                  <div className="w-1/2 h-2.5 bg-white/5 rounded-full"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-20 right-10 md:right-20 bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl max-w-sm hidden md:block"
              >
                <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Engagement Analytics</div>
                <div className="text-white font-black text-5xl mb-2">+48%</div>
                <div className="text-emerald-400 text-sm font-bold flex items-center mb-6">
                  <MoveRight className="-rotate-45 w-4 h-4 mr-1" /> Higher Admissions Rate
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800"></div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
