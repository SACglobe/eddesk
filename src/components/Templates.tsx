"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, CheckCircle2, LayoutGrid } from 'lucide-react';

interface TemplatesProps {
  onSelectTemplate: (id: number) => void;
}

const templateList = [
  {
    id: 0,
    name: "modern",
    category: "Modern Academy",
    description: "Sleek, fast, and minimalist. Designed for high-performance international institutions focused on innovation.",
    features: ["Dynamic Event Calendar", "Academic Directory", "Media Galleries"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-600 to-indigo-600",
    accent: "text-blue-400",
    glow: "shadow-blue-500/40",
    externalLink: "demo/template_modern"
  },
  {
    id: 1,
    name: "classic",
    category: "Classical Institution",
    description: "Elegance and prestige. Perfect for schools with a storied history and emphasis on traditional values.",
    features: ["Alumni Ecosystem", "Heritage Archive", "Virtual Campus Tour"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756cdfb3f?auto=format&fit=crop&q=80&w=1200",
    color: "from-amber-600 to-orange-600",
    accent: "text-amber-400",
    glow: "shadow-amber-500/40",
    hasSpecialFeature: true,
    externalLink: "demo/template_classic"
  },
  {
    id: 2,
    name: "premium",
    category: "STEM & Innovation",
    description: "Futuristic and data-centric. Built for coding academies and technology-focused innovation hubs.",
    features: ["Student Dashboards", "LMS Native", "Tech Portfolio Builder"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    color: "from-emerald-600 to-teal-600",
    accent: "text-emerald-400",
    glow: "shadow-emerald-500/40",
    externalLink: "demo/template_premium"
  }
];

export const Templates: React.FC<TemplatesProps> = ({ onSelectTemplate }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {

    e.currentTarget.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200';
  };

  return (
    <section id="templates" className="py-32 bg-slate-950 relative overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 space-y-8 md:space-y-0">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-indigo-400 font-black tracking-[0.4em] text-xs uppercase mb-6"
            >
              The Design Gallery
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-bold mb-8 leading-[1]"
            >
              Institutional <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-white">Blueprints.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-xl leading-relaxed max-w-2xl"
            >
              Choose from our curated collection of enterprise-grade templates,
              each meticulously engineered for engagement and accessibility.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 text-slate-500 bg-slate-900/50 px-6 py-3 rounded-2xl border border-white/5"
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
              whileHover={{ y: -16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: temp.id * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col h-full"
            >
              {/* Preview Box with Intensified Hover Shadows */}
              <div
                className={`relative aspect-[16/12] rounded-[3.5rem] overflow-hidden mb-10 transition-all duration-700 border border-white/10 group-hover:border-indigo-500/50 cursor-pointer 
                  shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] 
                  group-hover:shadow-[0_80px_120px_-20px_rgba(0,0,0,0.8)] 
                  group-hover:${temp.glow}`}
                onClick={() => window.open(temp.externalLink, '_blank')}
              >
                <img
                  src={temp.image}
                  alt={temp.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:blur-[1px] brightness-75 group-hover:brightness-90"
                />

                {/* Visual Label */}
                <div className="absolute top-8 left-8 flex flex-col items-start space-y-2 z-10">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r ${temp.color} shadow-2xl`}>
                    {temp.category}
                  </div>
                  {temp.id === 1 && (
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                      360 VR Enabled
                    </div>
                  )}
                </div>

                {/* Interaction Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center transition-all duration-500"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 20, opacity: 0 }}
                    animate={{
                      scale: 1,
                      y: 0,
                      opacity: 1,
                      transition: { delay: 0.1, type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="bg-white text-slate-950 w-full py-5 rounded-3xl font-black text-lg flex items-center justify-center space-x-4 shadow-3xl transform group-hover:scale-105 transition-transform"
                  >
                    <div className="bg-indigo-600 rounded-full p-2 text-white">
                      <Play size={16} fill="currentColor" />
                    </div>
                    <span>Enter Simulator</span>
                  </motion.div>
                </motion.div>
              </div>

              <div className="flex-1 flex flex-col px-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">
                    {temp.name}
                  </h3>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
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
                  <button
                    onClick={() => window.open(temp.externalLink, '_blank')}
                    className="flex-1 py-5 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-600 text-white rounded-2xl font-black text-base transition-all active:scale-95 shadow-xl"
                  >
                    Preview Design
                  </button>
                  <button
                    onClick={() => window.open(temp.externalLink, '_blank')}
                    className="w-16 h-16 flex items-center justify-center border border-slate-800 hover:border-slate-600 rounded-2xl text-slate-500 hover:text-white transition-all bg-slate-950"
                    title="External Details"
                  >
                    <ExternalLink size={20} />
                  </button>
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
          className="bg-gradient-to-r from-indigo-900/40 to-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-16 flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="text-4xl font-black text-white mb-6 leading-tight">Can't find the perfect fit?</h3>
            <p className="text-slate-400 text-lg">Our architectural team provides custom design services to build unique digital identities for premium institutions.</p>
          </div>
          <button className="whitespace-nowrap bg-white text-slate-950 px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-3xl">
            Request Custom Design
          </button>
        </motion.div>
      </div>
    </section>
  );
};
