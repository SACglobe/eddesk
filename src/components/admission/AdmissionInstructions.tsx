'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface AdmissionStep {
  key: string;
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
    <div className="space-y-10 relative">
      {/* Vertical Line Connector */}
      <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100 -z-0"></div>

      {activeSteps.map((step, index) => {
        // Try to split description into title and content if it contains a colon or newline
        const parts = step.description.includes(':') 
          ? step.description.split(':') 
          : step.description.includes('\n')
            ? step.description.split('\n')
            : [null, step.description];

        const title = parts[0]?.trim();
        const content = (parts.length > 1 ? parts.slice(1).join(':') : parts[0])?.trim();

        return (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-6 relative z-10"
          >
            {/* Number Circle */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center text-slate-900 font-bold text-lg">
              {index + 1}
            </div>

            {/* Content */}
            <div className="space-y-2 pt-1">
              {title && (
                <h4 className="text-lg font-bold text-slate-900 leading-tight">
                  {title}
                </h4>
              )}
              <p className="text-slate-500 text-sm leading-relaxed">
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
