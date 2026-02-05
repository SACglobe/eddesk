"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Templates } from '@/components/Templates';
import { AdminPreview } from '@/components/AdminPreview';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';
import { TemplateRenderer } from '@/components/TemplateRenderer';
import { Monitor, Smartphone, Tablet, X as CloseIcon, ChevronLeft, ChevronUp } from 'lucide-react';

export default function Home() {
    const [activeTemplate, setActiveTemplate] = useState<number | null>(null);
    const [demoView, setDemoView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [demoPage, setDemoPage] = useState('home');
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const templates = [
        { id: 0, name: "Lumina International", theme: 'modern', color: "bg-blue-600" },
        { id: 1, name: "Heritage Foundation", theme: 'classic', color: "bg-amber-700" },
        { id: 2, name: "Cybernetics High", theme: 'tech', color: "bg-emerald-500" }
    ];

    const currentTemplate = activeTemplate !== null ? templates[activeTemplate] : null;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectTemplate = (id: number) => {
        setActiveTemplate(id);
        setDemoPage('home');
        setSelectedPostId(null);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseTemplate = () => {
        setActiveTemplate(null);
        document.body.style.overflow = 'unset';
    };

    const handleNavigate = (page: string) => {
        setDemoPage(page);
        setSelectedPostId(null);
        const previewContainer = document.getElementById('preview-scroll-area');
        if (previewContainer) previewContainer.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectPost = (id: number) => {
        setSelectedPostId(id);
        setDemoPage('blog-single');
    };

    return (
        <div className="min-h-screen selection:bg-indigo-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-blob"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[20%] w-[25%] h-[25%] bg-blue-600/5 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <main>
                    <Hero />
                    <Services />
                    <Process />
                    <Templates onSelectTemplate={handleSelectTemplate} />
                    <AdminPreview />
                    <Testimonials />
                </main>
                <Footer />
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed bottom-12 right-8 z-40 bg-slate-900/80 backdrop-blur-md border border-slate-800 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
                        title="Scroll to Top"
                    >
                        <ChevronUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Full Screen Template Showcase Modal */}
            <AnimatePresence>
                {activeTemplate !== null && currentTemplate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-slate-950"
                    >
                        {/* Control Bar */}
                        <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-20 shadow-xl">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleCloseTemplate}
                                    className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                    <span className="font-bold text-sm hidden sm:inline">Back to Portfolio</span>
                                </button>
                                <div className="h-4 w-px bg-slate-800"></div>
                                <div className="flex items-center space-x-3">
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${currentTemplate.color}`}></span>
                                    <span className="text-white font-black text-sm uppercase tracking-wider">{currentTemplate.name}</span>
                                </div>
                            </div>

                            {/* Viewport Controls */}
                            <div className="hidden lg:flex items-center bg-slate-950 rounded-full border border-slate-800 p-1">
                                <button
                                    onClick={() => setDemoView('desktop')}
                                    className={`px-4 py-1.5 rounded-full flex items-center space-x-2 transition-all ${demoView === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    <Monitor size={16} />
                                    <span className="text-xs font-bold">Desktop</span>
                                </button>
                                <button
                                    onClick={() => setDemoView('tablet')}
                                    className={`px-4 py-1.5 rounded-full flex items-center space-x-2 transition-all ${demoView === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    <Tablet size={16} />
                                    <span className="text-xs font-bold">Tablet</span>
                                </button>
                                <button
                                    onClick={() => setDemoView('mobile')}
                                    className={`px-4 py-1.5 rounded-full flex items-center space-x-2 transition-all ${demoView === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    <Smartphone size={16} />
                                    <span className="text-xs font-bold">Mobile</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="bg-white text-slate-950 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hidden sm:block">
                                    Export Project
                                </button>
                                <button
                                    onClick={handleCloseTemplate}
                                    className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                                >
                                    <CloseIcon size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Template Container */}
                        <div className="flex-1 flex overflow-hidden">
                            <div className="flex-1 flex flex-col items-center justify-start py-8 overflow-y-auto bg-slate-950 pattern-grid">
                                <motion.div
                                    layout
                                    className={`transition-all duration-700 shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-slate-800 overflow-hidden ${demoView === 'desktop' ? 'w-full max-w-[1280px] min-h-[90%]' :
                                            demoView === 'tablet' ? 'w-[768px] min-h-[90%]' : 'w-[375px] min-h-[90%]'
                                        } bg-white rounded-t-2xl mb-12 relative`}
                                >
                                    <div id="preview-scroll-area" className="w-full h-full overflow-y-auto">
                                        <TemplateRenderer
                                            templateId={activeTemplate}
                                            page={demoPage}
                                            postId={selectedPostId}
                                            onNavigate={handleNavigate}
                                            onSelectPost={handleSelectPost}
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
