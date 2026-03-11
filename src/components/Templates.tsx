"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme } from '@/lib/marketing/theme';
import Link from 'next/link';
import { ExternalLink, Play, CheckCircle2, LayoutGrid, ArrowRight } from 'lucide-react';

interface TemplatesProps {
  onSelectTemplate: (id: number) => void;
}

const templateList = [
  {
    id: 0,
    name: "Modern Vision",
    category: "Modern Academy",
    description: "Sleek, fast, and minimalist. Perfect for high-performance international institutions and urban schools.",
    features: ["Dynamic Notice Tickers", "Social Media Integration", "Modern Faculty Grid"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-600 to-indigo-600",
    accent: "text-blue-400",
    glow: "shadow-blue-500/40",
    externalLink: "/demo/template_modern"
  },
  {
    id: 1,
    name: "Classic Heritage",
    category: "Classical Institution",
    description: "Elegance and prestige. Ideal for schools with long legacies that value tradition and institutional history.",
    features: ["Rich Principal Bio", "Academic Showcase", "Gallery & Events"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756cdfb3f?auto=format&fit=crop&q=80&w=1200",
    color: "from-amber-600 to-orange-600",
    accent: "text-amber-400",
    glow: "shadow-amber-500/40",
    externalLink: "/demo/template_classic"
  },
  {
    id: 2,
    name: "Premium Tech",
    category: "STEM & Excellence",
    description: "Futuristic and data-centric. Built for technology hubs, coding academies, and premium institutes.",
    features: ["Live Broadcast Bar", "Integrated Dashboard", "Advanced Data Cards"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    color: "from-emerald-600 to-teal-600",
    accent: "text-emerald-400",
    glow: "shadow-emerald-500/40",
    externalLink: "/demo/template_premium"
  }
];

export const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200';
  };

  return (
    <section id="templates" className={`${mSection} bg-slate-950 relative overflow-hidden`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className={mContainer}>
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 space-y-8 md:space-y-0">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={mLabel}
            >
              <span>The Design Gallery</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${mDisplay} text-5xl md:text-7xl mb-8 leading-[1] text-white`}
            >
              Institutional <span className={marketingTheme.gradients.text}>Blueprints.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`${marketingTheme.type.body} text-xl leading-relaxed max-w-2xl`}
            >
              Choose from our curated collection of professional templates, each meticulously engineered for your school's success in the digital era.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-slate-500 bg-slate-900 border border-white/5 px-6 py-3 rounded-2xl"
          >
            <LayoutGrid size={14} className="text-indigo-500" />
            <span className="text-sm font-bold uppercase tracking-widest">3 Unique Blueprints Available</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          {templateList.map((temp) => (
            <motion.div
              key={temp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: temp.id * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col h-full"
            >
              <div
                className={`relative aspect-[16/11] rounded-[2.5rem] overflow-hidden mb-10 transition-all duration-700 border border-white/10 group-hover:border-indigo-500/50 cursor-pointer 
                  shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] 
                  group-hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.3)]`}
                onClick={() => window.open(temp.externalLink, '_blank')}
              >
                <img
                  src={temp.image}
                  alt={temp.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                />

                {/* Visual Label */}
                <div className="absolute top-6 left-6 flex flex-col items-start space-y-2 z-10">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r ${temp.color} shadow-2xl border border-white/10`}>
                    {temp.category}
                  </div>
                </div>

                {/* Interaction Overlay */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500">
                  <div className="bg-white text-slate-950 px-8 py-4 rounded-full font-black text-sm flex items-center space-x-3 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span>Explore Theme</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col px-2">
                <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors mb-4 tracking-tight">
                  {temp.name}
                </h3>
                <p className={`${marketingTheme.type.body} text-lg mb-8 leading-relaxed`}>
                  {temp.description}
                </p>

                <div className="grid grid-cols-1 gap-4 mt-auto mb-10">
                  {temp.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-500">
                      <CheckCircle2 size={16} className={temp.accent} />
                      <span className="text-slate-400">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Link
                    href={temp.externalLink}
                    target="_blank"
                    className="flex-1 py-5 bg-slate-900 border border-white/5 hover:border-indigo-500/50 hover:bg-slate-800 text-white rounded-2xl font-black text-center transition-all shadow-xl group/btn"
                  >
                    Live Demo
                  </Link>
                  <Link
                    href="/contact"
                    className="w-16 h-16 flex items-center justify-center border border-white/5 hover:border-indigo-500/50 rounded-2xl text-slate-500 hover:text-indigo-400 transition-all bg-slate-900/50"
                  >
                    <ExternalLink size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Extension Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-950/40 to-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="text-4xl font-black text-white mb-6 leading-tight">Need a customized identity?</h3>
            <p className={marketingTheme.type.body + " text-lg"}>Our design team provides specialized customization services to build unique digital identities for premium institutions.</p>
          </div>
          <Link
            href="/contact"
            className="whitespace-nowrap bg-white text-slate-950 px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-3xl"
          >
            Get Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
