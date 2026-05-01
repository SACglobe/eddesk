'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface AdmissionStep {
  key: string;
  title: string;
  description: string;
  isActive: boolean;
}

interface AdmissionInstructionsProps {
  steps: AdmissionStep[];
  schoolName: string;
}

const AdmissionInstructions: React.FC<AdmissionInstructionsProps> = ({ steps }) => {
  const activeSteps = steps.filter(s => s.isActive);

  if (activeSteps.length === 0) return null;

  return (
    <div className="space-y-8 md:space-y-12 relative px-2 md:px-0">
      {/* Vertical Line Connector */}
      <div className="absolute left-6 md:left-6 top-4 bottom-4 w-0.5 bg-slate-100 -z-0"></div>

      {activeSteps.map((step, index) => {
        const title = step.title?.trim();
        const content = step.description?.trim();

        return (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 md:gap-8 relative z-10"
          >
            {/* Number Circle */}
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1e3a8a] text-[#fbbf24] shadow-lg shadow-blue-900/10 flex items-center justify-center font-bold text-base md:text-lg">
              {index + 1}
            </div>

            {/* Content */}
            <div className="space-y-2 pt-1 md:pt-2">
              {title && (
                <h4 className="text-base md:text-xl font-bold text-[#1e3a8a] leading-tight uppercase tracking-wide">
                  {title}
                </h4>
              )}
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {content}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AdmissionInstructions;
