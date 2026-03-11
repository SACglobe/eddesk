"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme } from '@/lib/marketing/theme';
import { MousePointer2, Settings2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <MousePointer2 className="w-8 h-8" />,
    title: "1. Select Theme",
    description: "Choose a premium multi-page template that matches your school's vision and brand.",
    color: "bg-indigo-600"
  },
  {
    icon: <Settings2 className="w-8 h-8" />,
    title: "2. Add Details",
    description: "Provide your school's info, faculty list, and images. We handle the heavy lifting of setup.",
    color: "bg-blue-600"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "3. Go Live",
    description: "Connect your domain and launch. Your school is now professional, modern, and accessible.",
    color: "bg-purple-600"
  }
];

export const Process: React.FC = () => {
  return (
    <section className={`${mSection} bg-slate-950/50 relative overflow-hidden`}>
      <div className={mContainer}>
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={mLabel + " mx-auto w-fit"}
          >
            <span>Seamless Onboarding</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${mDisplay} text-4xl md:text-5xl mt-6 mb-6`}
          >
            Launch in Three <span className={marketingTheme.gradients.text}>Simple Steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${marketingTheme.type.body} max-w-2xl mx-auto text-lg`}
          >
            We've simplified institutional branding so you can focus on what matters most: excellence in education.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Background Connecting Line */}
          <div className="hidden md:block absolute top-[48px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-3xl ${step.color} text-white flex items-center justify-center mb-10 shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-6 duration-500 border border-white/10`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{step.title}</h3>
              <p className={marketingTheme.type.body + " px-4 leading-relaxed"}>
                {step.description}
              </p>

              {idx < 2 && (
                <div className="md:hidden mt-8 text-indigo-500 animate-bounce">
                  <ArrowRight className="rotate-90 w-8 h-8" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};