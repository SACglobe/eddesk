"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Shield, Bell, Award, Users, Settings } from 'lucide-react';
import { mContainer, mSection, mLabel, mDisplay, mCard, marketingTheme } from '@/lib/marketing/theme';

const features = [
  {
    icon: <Layout className="w-6 h-6" />,
    color: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
    title: "Premium Templates",
    description: "Choose from Modern, Classic, or Tech themes. Each designed to make your institution look world-class."
  },
  {
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    title: "Faculty Profiles",
    description: "Showcase your expertise. Manage teacher bios, qualifications, and department details with ease."
  },
  {
    icon: <Bell className="w-6 h-6" />,
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
    title: "Smart Notices",
    description: "Post circulars, exam dates, and holiday alerts. Automated tickers keep parents informed 24/7."
  },
  {
    icon: <Award className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    title: "Academic Results",
    description: "Secure system to publish and manage student results. Parents can view performance instantly."
  },
  {
    icon: <Settings className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    title: "Manager Dashboard",
    description: "A single control center for your entire website. Update content in seconds, no technical skills required."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    color: "from-slate-500/20 to-blue-500/20",
    iconColor: "text-slate-400",
    title: "Data Protection",
    description: "Secure institutional data hosting. Daily backups and encrypted storage for your peace of mind."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="features" className={`${mSection} bg-slate-950 relative`}>
      {/* Accent Light */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className={mContainer}>
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={mLabel}
            >
              <span>Platform Capabilities</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${mDisplay} text-5xl md:text-7xl mb-8`}
            >
              The Full Spectrum of <br />
              <span className={marketingTheme.gradients.textAlt}>School Control.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`${marketingTheme.type.body} max-w-md text-lg mb-4`}
          >
            A powerful, all-in-one suite built specifically for educational pioneers who demand digital excellence.
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
              className={`relative ${mCard} overflow-hidden group`}
            >
              {/* Card Glow */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${feature.color} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              <div className={`w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5 ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-white group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
              <p className={marketingTheme.type.body}>
                {feature.description}
              </p>

              <div className="mt-10 flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                <span>Core Feature</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
