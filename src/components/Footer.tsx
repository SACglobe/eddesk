"use client";

import React from 'react';
import Link from 'next/link';
import { Twitter, Linkedin, ArrowRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Footer Accent Light */}
      <div className="absolute left-1/2 -bottom-48 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-24">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center space-x-3 mb-8 cursor-pointer group">
              <img src="/assets/images/logo.png" alt="EdDesk Logo" className="h-12 w-auto object-contain" />
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm">
              Professional school websites with a powerful admin panel. Built for Indian schools.
            </p>
            <div className="flex space-x-5">
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-10">Product</h4>
            <ul className="space-y-5">
              <li><FooterLink href="/#templates">Templates</FooterLink></li>
              <li><FooterLink href="/#features">Admin Panel</FooterLink></li>
              <li><FooterLink href="/#features">Features</FooterLink></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-10">Company</h4>
            <ul className="space-y-5">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/contact">Contact Us</FooterLink></li>
              <li><FooterLink href="/terms">Terms</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy</FooterLink></li>
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
          <div className="font-bold tracking-tight">© 2026 EdDesk Technologies. All rights reserved.</div>
          <div className="flex items-center space-x-10 font-bold uppercase tracking-widest text-[10px]">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms & Conditions</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => (
  <Link
    href={href}
    className="text-slate-500 hover:text-white transition-colors font-bold block"
  >
    {children}
  </Link>
);

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all">
    {icon}
  </a>
);
