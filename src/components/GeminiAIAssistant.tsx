"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Loader2, Sparkles, X } from 'lucide-react';

export const GeminiAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    motto: string;
    mission: string;
    colors: string[];
  } | null>(null);

  const generateBranding = async () => {
    if (!schoolName.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolName }),
      });

      if (!response.ok) throw new Error('Failed to generate branding');

      const data = await response.json();
      setSuggestion(data);
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-indigo-600 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/40 flex items-center space-x-2 group"
      >
        <Sparkles className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
          Brand My School
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-indigo-600/20 p-3 rounded-2xl border border-indigo-500/30">
                  <Bot className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display">Branding Assistant</h3>
                  <p className="text-slate-400 text-sm italic">AI Powered by Gemini</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">School Name</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. Evergreen Heights Academy"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <button
                      onClick={generateBranding}
                      disabled={isLoading || !schoolName}
                      className="bg-indigo-600 disabled:opacity-50 p-3 rounded-2xl hover:bg-indigo-500 transition-colors"
                    >
                      {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {suggestion ? (
                    <motion.div
                      key="suggestion"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6 pt-4 border-t border-slate-800"
                    >
                      <div>
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Recommended Motto</div>
                        <p className="text-xl font-display font-medium text-white italic">"{suggestion.motto}"</p>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Mission Concept</div>
                        <p className="text-slate-300 leading-relaxed text-sm">{suggestion.mission}</p>
                      </div>

                      <div className="flex space-x-3">
                        {suggestion.colors.map((color, i) => (
                          <div key={i} className="flex flex-col items-center space-y-1">
                            <div
                              className="w-12 h-12 rounded-xl border border-slate-700 shadow-inner"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-[10px] text-slate-500 font-mono">{color}</span>
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-slate-800 hover:bg-slate-700 py-3 rounded-2xl font-bold transition-colors">
                        Apply to Template
                      </button>
                    </motion.div>
                  ) : isLoading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 flex flex-col items-center justify-center space-y-4"
                    >
                      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                      <p className="text-slate-400 italic">Curating your school's vision...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
