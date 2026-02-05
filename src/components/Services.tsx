"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Globe, Smartphone, BarChart3, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-6 h-6" />,
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    title: "Global Presence",
    description: "Launch professional, multi-lingual websites for your school in minutes with zero coding."
  },
  {
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-500/20 to-indigo-500/20",
    iconColor: "text-purple-400",
    title: "Student Experience",
    description: "A cohesive digital ecosystem for students to track academics, schedules, and communities."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
    title: "Digital Admissions",
    description: "Streamline your enrollment with integrated paperless application workflows."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-emerald-400",
    title: "Omnichannel Reach",
    description: "Stunning performance and layouts that adapt flawlessly to every screen and device."
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-400",
    title: "Intelligent Insights",
    description: "Data-driven dashboards that reveal institutional performance and engagement metrics."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    title: "Bank-Grade Security",
    description: "Rest easy knowing your institutional and student data is protected by elite encryption."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-[#020617] relative">
      {/* Accent Light */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 text-indigo-400 font-black text-sm uppercase tracking-[0.3em] mb-6"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Core Infrastructure</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-bold mb-8 leading-[1.1]"
            >
              The Full Spectrum of <br />
              <span className="text-slate-500 italic">School Management.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-md text-lg leading-relaxed mb-4"
          >
            A powerful, all-in-one suite built specifically for educational pioneers who demand excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-900/60 transition-all duration-500 group overflow-hidden"
            >
              {/* Card Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${feature.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              <div className={`w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5 ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-white group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                {feature.description}
              </p>

              <div className="mt-10 flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                <span>Learn Details</span>
                <MoveRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MoveRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
);
