"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Layout, Settings, Rocket, Menu, X, MessageSquare, ChevronDown, Monitor } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',      type: 'anchor', id: 'hero',         icon: <Rocket className="w-4 h-4" /> },
  { label: 'Templates',  type: 'anchor', id: 'templates',    icon: <Layout className="w-4 h-4" /> },
  { label: 'Pricing',    type: 'page',   href: '/pricing',   icon: <Settings className="w-4 h-4" /> },
  { label: 'About',      type: 'page',   href: '/about',     icon: <GraduationCap className="w-4 h-4" /> },
  { label: 'Contact',    type: 'page',   href: '/contact',   icon: <MessageSquare className="w-4 h-4" /> },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['features', 'templates', 'pricing', 'admin', 'testimonials'];
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
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
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

  const handleNavClick = (e: React.MouseEvent, item: typeof NAV_ITEMS[0]) => {
    if (item.type === 'anchor' && isHome && item.id) {
      scrollToSection(e, item.id);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between rounded-full border px-6 py-2 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 border-slate-800/50 backdrop-blur-xl shadow-2xl shadow-indigo-500/10' : 'bg-transparent border-transparent'}`}>
          <Link
            href="/"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            {/* Full Logo wrapped in white oval */}
            <div className="bg-white rounded-full px-5 py-2 flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-105 transition-all duration-300">
              <img 
                src="/assets/images/logo.png" 
                alt="EdDesk Logo" 
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const textEl = document.createElement('span');
                  textEl.className = 'text-slate-950 font-black tracking-tight text-xl';
                  textEl.innerText = 'EdDesk';
                  e.currentTarget.parentElement?.appendChild(textEl);
                }}
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                href={item.type === 'anchor' ? (isHome ? `#${item.id}` : `/#${item.id}`) : item.href!}
                icon={item.icon}
                isActive={item.type === 'anchor' ? (isHome && activeSection === item.id) : pathname === item.href}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>


          {/* Right Action - Admin Panel */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="https://admin.eddesk.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-6 py-2 rounded-full font-bold text-sm bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all shadow-lg shadow-indigo-500/5 group"
            >
              <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Admin Login</span>
            </Link>
          </div>
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
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.type === 'anchor' ? (isHome ? `#${item.id}` : `/#${item.id}`) : item.href!}
                  onClick={(e) => {
                    handleNavClick(e, item);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-4 p-4 rounded-2xl text-left transition-all ${
                    (item.type === 'anchor' ? activeSection === item.id : pathname === item.href) 
                    ? 'bg-indigo-600/10 text-indigo-400' 
                    : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="font-bold capitalize">{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-800">
                <Link
                   href="https://admin.eddesk.in"
                   target="_blank"
                   rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold border border-white/5 flex items-center justify-center space-x-3"
                >
                  <Monitor className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Link>
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
  <Link
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
  </Link>
);
