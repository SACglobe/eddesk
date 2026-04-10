"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MoveRight, Globe, Shield, Star } from 'lucide-react';
import { mContainer, mSection, mLabel, mDisplay, mBtnPrimary, mBtnSecondary, marketingTheme } from '@/lib/marketing/theme';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.12)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`${mDisplay} text-6xl md:text-8xl lg:text-9xl mb-10 leading-[0.95]`}
        >
          Next-Gen <br />
          <span className={marketingTheme.gradients.text}>
            School Management.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Launch a professional digital presence for your educational institution in days. 
          The complete ecosystem for school websites, admissions, and academic administration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8 mb-24"
        >
          <Link
            href="/#templates"
            className={`${mBtnPrimary} px-12 py-6 text-xl flex items-center justify-center space-x-3 group w-full sm:w-auto`}
          >
            <span>View Templates</span>
            <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className={`${mBtnSecondary} px-12 py-6 text-xl text-white w-full sm:w-auto flex items-center justify-center`}
          >
            <span>Schedule a Demo</span>
          </Link>
        </motion.div>

        {/* Dynamic Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center"><Globe className="w-5 h-5 text-indigo-400" /></div>
            <span className="font-bold tracking-widest text-[10px] uppercase text-white">Cloud Hosting Included</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center"><Shield className="w-5 h-5 text-indigo-400" /></div>
            <span className="font-bold tracking-widest text-[10px] uppercase text-white">Secure Data Vault</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center"><Star className="w-5 h-5 text-indigo-400" /></div>
            <span className="font-bold tracking-widest text-[10px] uppercase text-white">Expert Setup Support</span>
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
    </section>
  );
};
