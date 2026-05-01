"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Footer Accent Light */}
      <div className="absolute left-1/2 -bottom-48 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-24">
          <div className="lg:col-span-6">
            <Link href="/" className="flex items-center space-x-3 mb-8 cursor-pointer group">
              {/* Logo wrapped in white oval like Navbar */}
              <div className="bg-white rounded-full px-6 py-3 flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-105 transition-transform">
                <img 
                  src="/assets/images/logo.png" 
                  alt="EdDesk Logo" 
                  className="h-8 w-auto object-contain"
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
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-sm">
              Professional school websites with a powerful admin panel. Built for Indian schools.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-10">Product</h4>
            <ul className="space-y-5">
              <li><FooterLink href="/#templates">Templates</FooterLink></li>
              <li><FooterLink href="https://admin.eddesk.in" target="_blank" rel="noopener noreferrer">Admin Panel</FooterLink></li>
              <li><FooterLink href="/pricing">Pricing</FooterLink></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-10">Company</h4>
            <ul className="space-y-5">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/contact">Contact Us</FooterLink></li>
              <li><FooterLink href="/terms">Terms</FooterLink></li>
              <li><FooterLink href="/privacy">Privacy</FooterLink></li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center text-slate-500 text-sm space-y-8 lg:space-y-0">
          <div className="font-bold tracking-tight">
            © 2026 EdDesk Platform • A Product of{' '}
            <a 
              href="https://tech.sacglobe.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-white transition-colors"
            >
              SAC Globe Tech
            </a>
          </div>
          <div className="font-bold uppercase tracking-widest text-[10px]">
             Professional EdTech Solutions
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ children: React.ReactNode; href: string; target?: string; rel?: string }> = ({ children, href, target, rel }) => (
  <Link
    href={href}
    target={target}
    rel={rel}
    className="text-slate-500 hover:text-white transition-colors font-bold block"
  >
    {children}
  </Link>
);
