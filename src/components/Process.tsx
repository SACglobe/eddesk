"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Settings2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <MousePointer2 className="w-8 h-8" />,
    title: "1. Choose Template",
    description: "Select from our library of premium multi-page templates built specifically for schools.",
    color: "bg-blue-600"
  },
  {
    icon: <Settings2 className="w-8 h-8" />,
    title: "2. Personalize Content",
    description: "Use our powerful visual editor to customize your school's motto, staff profiles, and event calendar.",
    color: "bg-indigo-600"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "3. Go Live",
    description: "Connect your custom domain and launch your institutional portal to the world.",
    color: "bg-purple-600"
  }
];

export const Process: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
          >
            Launch in Three <span className="text-indigo-500">Simple Steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            We've simplified institutional branding so you can focus on what matters most: education.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Background Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-800 -translate-y-12"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-[2rem] ${step.color} text-white flex items-center justify-center mb-8 shadow-2xl transition-transform group-hover:rotate-12 duration-500`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed px-4">
                {step.description}
              </p>

              {idx < 2 && (
                <div className="md:hidden mt-8 text-slate-700 animate-bounce">
                  <ArrowRight className="rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};