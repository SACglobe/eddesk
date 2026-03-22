'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  Info,
  ArrowRightCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface AdmissionStep {
  key: string;
  description: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
}

interface AdmissionInstructionsProps {
  steps: AdmissionStep[];
  schoolName: string;
}

const AdmissionInstructions: React.FC<AdmissionInstructionsProps> = ({ steps, schoolName }) => {
  const activeSteps = steps.filter(s => s.isActive);

  if (activeSteps.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-emerald-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-blue-50/30 rounded-full blur-[100px] -z-10 -translate-x-1/4 translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] mb-6 animate-pulse"
          >
            <Clock className="w-3.5 h-3.5" />
            Admissions Timeline & Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 italic uppercase tracking-tighter leading-[0.9]"
          >
            Join the <span className="text-emerald-600">Excellence</span> <br />at {schoolName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 font-medium leading-relaxed"
          >
            Follow these simple steps to secure your child's future. Our admission process is designed to be transparent, efficient, and supportive.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeSteps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Step Number Badge */}
              <div className="absolute top-8 right-8 text-8xl font-black text-slate-50 italic opacity-0 group-hover:opacity-10 scale-150 transition-all duration-700 uppercase">
                {index + 1}
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-slate-200 group-hover:bg-emerald-600 transition-colors duration-500 transform group-hover:rotate-6">
                  <span className="text-2xl font-black italic">{index + 1}</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight italic group-hover:text-emerald-600 transition-colors">
                  Step {index + 1}
                </h3>
                
                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  {step.description}
                </p>

                {(step.contactEmail || step.contactPhone) && (
                  <div className="pt-6 border-t border-slate-50 space-y-3">
                    {step.contactEmail && (
                      <a href={`mailto:${step.contactEmail}`} className="flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                        <Mail className="w-4 h-4" />
                        {step.contactEmail}
                      </a>
                    )}
                    {step.contactPhone && (
                      <a href={`tel:${step.contactPhone}`} className="flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors">
                        <Phone className="w-4 h-4" />
                        {step.contactPhone}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-emerald-50 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="bg-emerald-50/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
            <Info className="w-5 h-5 text-emerald-600" />
            <p className="text-sm font-bold text-emerald-800 italic uppercase tracking-wider">Scroll down to fill the online application form</p>
            <ArrowRightCircle className="w-5 h-5 text-emerald-600 animate-bounce rotate-90" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionInstructions;
