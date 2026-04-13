// src/app/(marketing)/about/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Monitor, Settings, Shield, Globe, Clock, Smartphone, GraduationCap } from 'lucide-react';
import { mContainer, mSection, mLabel, mDisplay, mCard, marketingTheme } from '@/lib/marketing/theme';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About EdDesk | Empowering Indian Schools Digitally',
  description: 'EdDesk is on a mission to give every educational institution in India a premium digital presence. We build managed school websites and administrative ecosystems.',
  alternates: { canonical: 'https://www.eddesk.in/about' },
  openGraph: {
    title: 'About EdDesk | Next-Gen School Website Ecosystem',
    description: 'Learn how we help schools manage their digital identity and administrative needs in one place.',
    url: 'https://www.eddesk.in/about',
    siteName: 'EdDesk',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.eddesk.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About",
              "item": "https://www.eddesk.in/about"
            }
          ]
        }}
      />
      {/* Hero Section */}
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto text-center">
            <span className={mLabel}>About EdDesk</span>
            <h1 className={`${mDisplay} text-5xl md:text-7xl mt-6 mb-8 ${marketingTheme.gradients.text}`}>
              We Build School Websites That Work
            </h1>
            <p className={`${marketingTheme.type.bodyLg} text-xl max-w-2xl mx-auto`}>
              EdDesk gives every Indian school a professional digital presence — with a website, admin panel, and hosting — all managed in one place.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={`${mSection} border-y ${marketingTheme.colors.border}`}>
        <div className={mContainer}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={mCard}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4">School Websites</h3>
              <p className={marketingTheme.type.body}>
                We design and host professional websites for schools. Each website is built on a refined template, connected to your domain, and ready in days — not months.
              </p>
            </div>

            <div className={mCard}>
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4">Admin Panel</h3>
              <p className={marketingTheme.type.body}>
                Schools manage all content through our admin panel. Update notices, upload faculty photos, post events — no coding, no developers, no technical knowledge needed.
              </p>
            </div>

            <div className={mCard}>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white mb-4">Subscription Model</h3>
              <p className={marketingTheme.type.body}>
                Pay monthly or annually. Your subscription covers hosting, maintenance, and all platform updates. Cancel anytime — your domain stays yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Model Section */}
      <section className={mSection}>
        <div className={mContainer}>
          <div className="bg-slate-900/30 border border-white/5 rounded-[40px] p-8 md:p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 max-w-3xl">
              <span className={mLabel}>Transparent Pricing</span>
              <h2 className={`${mDisplay} text-4xl md:text-5xl mt-6 mb-8 text-white`}>
                How EdDesk Works
              </h2>
              <div className="space-y-6">
                <p className={marketingTheme.type.bodyLg}>
                  EdDesk operates on a subscription model. Schools rent access to the platform — the website templates, admin panel, hosting, and infrastructure all remain EdDesk property.
                </p>
                <p className={marketingTheme.type.bodyLg}>
                  When you subscribe, you get a fully managed school website. When you leave, your custom domain is yours to take elsewhere. The website itself is powered by EdDesk and is not transferable.
                </p>
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-indigo-400 font-bold">
                  <Shield className="w-5 h-5" />
                  <span>You focus on running your school, we handle the technology.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Schools Choose Section */}
      <section className={`${mSection} bg-slate-900/50`}>
        <div className={mContainer}>
          <div className="text-center mb-16">
            <h2 className={`${mDisplay} text-4xl text-white`}>Why Schools Choose EdDesk</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Days, not months', sub: 'To launch your website', icon: <Clock /> },
              { label: 'Zero', sub: 'Technical knowledge needed', icon: <Monitor /> },
              { label: '3 Templates', sub: 'Modern, Classic, Premium', icon: <Smartphone /> },
              { label: '1 Panel', sub: 'Everything managed in one place', icon: <Settings /> },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-slate-950/50 border border-white/5 rounded-3xl">
                <div className="w-10 h-10 mx-auto mb-6 text-indigo-500">{stat.icon}</div>
                <div className="text-2xl font-black text-white mb-2">{stat.label}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={mSection}>
        <div className={mContainer}>
          <div className="text-center">
            <h2 className={`${mDisplay} text-4xl text-white mb-10`}>Ready to get your school online?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className={`${marketingTheme.components.btnPrimary} ${marketingTheme.components.btnPadding} flex items-center space-x-2`}>
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className={`${marketingTheme.components.btnSecondary} ${marketingTheme.components.btnPadding}`}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
