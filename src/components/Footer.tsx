"use client";

import React from 'react';
import { GraduationCap, Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
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
    }
  };

  return (
    <footer className="bg-slate-950 pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Footer Accent Light */}
      <div className="absolute left-1/2 -bottom-48 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-24">
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-8 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V16C20 17.1046 19.1046 18 18 18H6C4.89543 18 4 17.1046 4 16V6Z" fill="white" fillOpacity="0.2" />
                  <path d="M7 7H17V9H7V7Z" fill="white" />
                  <path d="M7 11H17V13H7V11Z" fill="white" />
                  <path d="M7 15H13V17H7V15Z" fill="white" />
                  <path d="M2 20H22V22H2V20Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="font-display font-black text-3xl text-white">EdDesk</span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm">
              The world's most sophisticated digital infrastructure for modern educational institutions. Elevating excellence, one school at a time.
            </p>
            <div className="flex space-x-5">
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Github className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-10">Product</h4>
            <ul className="space-y-5">
              <li><FooterLink onClick={(e) => scrollToSection(e, 'templates')}>Templates</FooterLink></li>
              <li><FooterLink onClick={(e) => scrollToSection(e, 'admin')}>Admin Panel</FooterLink></li>
              <li><FooterLink onClick={(e) => scrollToSection(e, 'features')}>Capabilities</FooterLink></li>
              <li><FooterLink onClick={(e) => scrollToSection(e, 'testimonials')}>Success Stories</FooterLink></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-10">Institutional</h4>
            <ul className="space-y-5">
              <li><FooterLink>Public Portal</FooterLink></li>
              <li><FooterLink>Activities</FooterLink></li>
              <li><FooterLink>Campus Map</FooterLink></li>
              <li><FooterLink>Admissions</FooterLink></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-10">Stay Informed</h4>
            <p className="text-slate-500 text-base mb-8">Receive the latest updates on school management and digital trends.</p>
            <div className="flex bg-slate-900 border border-white/5 rounded-3xl p-1.5 focus-within:border-indigo-500/50 transition-all">
              <input
                type="email"
                placeholder="Institutional Email"
                className="flex-1 bg-transparent border-none px-6 py-3 text-white text-sm focus:outline-none font-bold"
              />
              <button className="bg-indigo-600 w-12 h-12 rounded-2xl text-white hover:bg-indigo-500 transition-all flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-95">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              <span>Spam-free institutional updates</span>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center text-slate-500 text-sm space-y-8 lg:space-y-0">
          <div className="font-bold tracking-tight">© 2024 EdDesk Systems Inc. Crafted for Excellence.</div>
          <div className="flex items-center space-x-10 font-bold uppercase tracking-widest text-[10px]">
            <FooterLink>Privacy Protocols</FooterLink>
            <FooterLink>Legal Terms</FooterLink>
            <FooterLink>System Status</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }> = ({ children, onClick }) => (
  <a
    href="#"
    onClick={onClick}
    className="text-slate-500 hover:text-white transition-colors cursor-pointer block font-bold"
  >
    {children}
  </a>
);

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all">
    {icon}
  </a>
);

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
);
