"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { mContainer, mSection, mLabel, mDisplay, mCard, marketingTheme } from '@/lib/marketing/theme';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "EdDesk transformed our online presence in a matter of weeks. The enrollment process is now 40% faster and parents love the new professional portal.",
    author: "Dr. Rajesh Kumar",
    role: "Principal",
    school: "St. Xavier's International",
    rating: 5
  },
  {
    quote: "The Manager Dashboard is incredibly intuitive. Even our non-technical staff can update fees, notices, and faculty profiles without any training.",
    author: "Mrs. Anjali Sharma",
    role: "Director",
    school: "Green Valley Public School",
    rating: 5
  },
  {
    quote: "Switching to EdDesk was the best decision for our digital identity. The automated theme engine helped us launch a world-class site overnight.",
    author: "Mr. Amit Patel",
    role: "Administrator",
    school: "Bright Future Academy",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className={`${mSection} bg-slate-950 relative overflow-hidden`}>
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full"></div>

      <div className={mContainer}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={mLabel + " mx-auto w-fit mb-6"}
          >
            <span>Institutional Success</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${mDisplay} text-4xl md:text-5xl mb-6`}
          >
            Trusted by <span className={marketingTheme.gradients.text}>EdDesk Schools</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={marketingTheme.type.body + " max-w-2xl mx-auto text-lg"}
          >
            Join hundreds of educational institutions that have elevated their digital standard with our platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`${mCard} p-10 relative group`}
            >
              <Quote className="absolute top-8 right-10 text-indigo-500/10 w-20 h-20 group-hover:text-indigo-500/20 transition-colors" />

              <div className="flex space-x-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-500 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 italic relative z-10">
                "{t.quote}"
              </p>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-slate-500 text-sm">{t.role}</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest font-black text-slate-600">Verified Client</div>
                <div className="text-sm font-bold text-slate-400 group-hover:text-indigo-400 transition-colors">{t.school}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo Cloud Simulator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 flex flex-wrap justify-center items-center gap-12 opacity-40"
        >
          {['ACADEMY', 'INSTITUTE', 'COLLEGE', 'KINDERGARTEN', 'HIGHER ED'].map((logo, i) => (
            <div key={i} className="text-sm font-black text-slate-500 border border-white/5 px-8 py-3 rounded-2xl tracking-[0.3em] uppercase">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
