"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layers, LayoutPanelLeft, Sparkles, Bell, Users, Award } from 'lucide-react';
import { mContainer, mSection, mLabel, mDisplay, mBtnPrimary, marketingTheme } from '@/lib/marketing/theme';
import Link from 'next/link';

export const AdminPreview: React.FC = () => {
  return (
    <section id="admin" className={`${mSection} bg-gradient-to-b from-[#020617] to-indigo-950/20 relative overflow-hidden`}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className={mContainer}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={mLabel}>
              <span>Management Power</span>
            </div>
            <h2 className={`${mDisplay} text-4xl md:text-5xl mb-8`}>
              Complete Control. <br />
              <span className={marketingTheme.gradients.textAlt}>Zero Technical Debt.</span>
            </h2>
            <p className={`${marketingTheme.type.body} text-lg mb-10 leading-relaxed`}>
              Our bespoke Manager Dashboard gives you complete control over your institution's digital presence.
              Update notices, manage student records, and switch themes in seconds—all with zero coding required.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              <AdminFeature icon={<Bell size={20} />} label="Instant Notice Tickers" />
              <AdminFeature icon={<Award size={20} />} label="Result Management" />
              <AdminFeature icon={<Users size={20} />} label="Faculty Directory" />
              <AdminFeature icon={<Palette size={20} />} label="Live Theme Switcher" />
            </div>

            <Link
              href="/contact"
              className={mBtnPrimary + " inline-flex px-10 py-5 rounded-full font-bold shadow-2xl flex items-center space-x-3 group"}
            >
              <span>See the Dashboard</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            {/* Visual representation of an editor */}
            <div className="bg-slate-900 rounded-[3rem] border border-white/10 p-4 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="bg-slate-950 rounded-[2.5rem] p-8 aspect-[4/3] relative overflow-hidden border border-white/5">
                {/* Simulated Interface Top Bar */}
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center space-x-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/30 flex items-center justify-center">
                      <LayoutPanelLeft className="text-white w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-32 h-2.5 bg-white/20 rounded-full"></div>
                      <div className="w-20 h-2 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="w-20 h-9 rounded-full bg-slate-800 border border-slate-700"></div>
                    <div className="w-9 h-9 rounded-full bg-indigo-600 shadow-xl shadow-indigo-500/20"></div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-4 space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-10 bg-slate-900/80 rounded-2xl border border-white/5 p-2 flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20"></div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-8 space-y-6">
                    <div className="aspect-video bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl border border-indigo-500/20 flex items-center justify-center relative group">
                      <div className="text-center">
                        <Palette className="w-16 h-16 text-indigo-500/30 mb-3 mx-auto" />
                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Institutional Profile</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2.5 bg-white/5 rounded-full w-full"></div>
                      <div className="h-2.5 bg-white/5 rounded-full w-2/3"></div>
                      <div className="h-2.5 bg-white/5 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>

                {/* Animated Cursor */}
                <motion.div
                  animate={{
                    x: [150, 400, 250, 180],
                    y: [120, 80, 200, 150]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute pointer-events-none z-20"
                >
                  <div className="relative group">
                    <svg className="w-8 h-8 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2l12 11.013-4.504.469 3.012 6.518-2.508 1.157-3-6.574-4.012 3.917V2z" />
                    </svg>
                    <div className="absolute top-8 left-8 bg-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-xl text-white whitespace-nowrap shadow-xl border border-white/20 uppercase tracking-widest">
                      ADMINISTRATOR
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Card Decors */}
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/30 blur-[100px] rounded-full"
            ></motion.div>
            <motion.div
              animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -bottom-12 -left-12 w-56 h-56 bg-indigo-600/30 blur-[100px] rounded-full"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AdminFeature: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center space-x-4 text-slate-300 group cursor-default">
    <div className="w-12 h-12 bg-slate-900 border border-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
      {icon}
    </div>
    <span className="font-bold text-base tracking-tight">{label}</span>
  </div>
);
