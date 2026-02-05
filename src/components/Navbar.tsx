"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Layout, Settings, Rocket, Menu, X, MessageSquare, ChevronDown, Monitor, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['features', 'templates', 'admin', 'testimonials'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between rounded-full border px-6 py-2 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 border-slate-800/50 backdrop-blur-xl shadow-2xl shadow-indigo-500/10' : 'bg-transparent border-transparent'}`}>
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-600/20">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              EduCanvas
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              href="#features"
              icon={<Rocket className="w-4 h-4" />}
              isActive={activeSection === 'features'}
              onClick={(e) => scrollToSection(e, 'features')}
            >
              Features
            </NavLink>
            <NavLink
              href="#templates"
              icon={<Layout className="w-4 h-4" />}
              isActive={activeSection === 'templates'}
              onClick={(e) => scrollToSection(e, 'templates')}
            >
              Templates
            </NavLink>
            <NavLink
              href="#admin"
              icon={<Settings className="w-4 h-4" />}
              isActive={activeSection === 'admin'}
              onClick={(e) => scrollToSection(e, 'admin')}
            >
              Admin Panel
            </NavLink>
            <NavLink
              href="#testimonials"
              icon={<MessageSquare className="w-4 h-4" />}
              isActive={activeSection === 'testimonials'}
              onClick={(e) => scrollToSection(e, 'testimonials')}
            >
              Success
            </NavLink>
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={(e) => scrollToSection(e, 'templates')}
              className="relative overflow-hidden bg-white text-slate-950 px-8 py-2.5 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5 group"
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-300 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col space-y-4">
              {['features', 'templates', 'admin', 'testimonials'].map((id) => (
                <button
                  key={id}
                  onClick={(e) => scrollToSection(e, id)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl text-left transition-all ${activeSection === id ? 'bg-indigo-600/10 text-white' : 'text-slate-400'}`}
                >
                  <span className="font-bold capitalize">{id.replace('-', ' ')}</span>
                </button>
              ))}
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={(e) => scrollToSection(e, 'templates')}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-500/20"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void
}> = ({ href, children, icon, isActive, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-all group"
  >
    <span className={`transition-colors duration-300 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'}`}>
      {icon}
    </span>
    <span className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
      {children}
    </span>
    {isActive && (
      <motion.div
        layoutId="nav-active"
        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      />
    )}
  </a>
);
