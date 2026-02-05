"use client";
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "EduCanvas transformed our online presence in a matter of weeks. The enrollment process is now 40% faster and parents love the new portal.",
    author: "Dr. Sarah Jenkins",
    role: "Principal, Oakwood Academy",
    school: "Oakwood Academy",
    rating: 5
  },
  {
    quote: "The admin panel is incredibly intuitive. Even our non-technical staff can update class schedules and school news without any training.",
    author: "Mark Thompson",
    role: "IT Director, Heritage Global",
    school: "Heritage Global",
    rating: 5
  },
  {
    quote: "Switching to this SAAS was the best decision we made this academic year. The AI-powered branding tools helped us refresh our look effortlessly.",
    author: "Elena Rodriguez",
    role: "Marketing Head, Vision Tech School",
    school: "Vision Tech School",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-3 rounded-2xl bg-slate-900 border border-slate-800 mb-6"
          >
            <Star className="text-yellow-500 w-6 h-6 fill-current" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
          >
            Trusted by Elite Schools
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Join 500+ educational institutions that have elevated their digital standard with our platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] relative group"
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

              <div className="mt-8 pt-6 border-t border-slate-800/50 flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest font-bold text-slate-600">Verified Client</div>
                <div className="text-sm font-display font-semibold text-slate-400 group-hover:text-indigo-400 transition-colors">{t.school}</div>
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
          className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale"
        >
          {['SCHOOLS', 'ACADEMY', 'INSTITUTE', 'COLLEGE', 'KINDERGARTEN'].map((logo, i) => (
            <div key={i} className="text-xl font-display font-bold text-slate-500 border-2 border-slate-800 px-6 py-2 rounded-xl">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
