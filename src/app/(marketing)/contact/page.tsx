// src/app/(marketing)/contact/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Mail, Globe, MapPin, Send, MessageSquare, ChevronDown } from 'lucide-react';
import { mContainer, mSection, mLabel, mDisplay, mCard, marketingTheme, mBtnPrimary } from '@/lib/marketing/theme';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact EdDesk | Get Your School Online',
  description: 'Contact EdDesk to get your school\'s professional website live. We respond within 2 business days. Email: eddesktech@gmail.com',
  alternates: { canonical: 'https://eddesk.in/contact' },
};

export default function ContactPage() {
  const faqs = [
    {
      q: "How long does it take to get my school's website live?",
      a: "Typically 2–5 days after your school information and content is submitted."
    },
    {
      q: "What happens to my domain if I cancel?",
      a: "Your domain is yours. We provide DNS guidance to redirect it wherever you choose."
    },
    {
      q: "Do I need technical knowledge to manage the website?",
      a: "No. The EdDesk admin panel is designed for school administrators, not developers."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto text-center">
            <span className={mLabel}>Get in Touch</span>
            <h1 className={`${mDisplay} text-5xl md:text-7xl mt-6 mb-8 ${marketingTheme.gradients.text}`}>
              Let's Get Your School Online
            </h1>
            <p className={`${marketingTheme.type.bodyLg} text-xl max-w-2xl mx-auto`}>
              Reach out with any question about EdDesk. We respond within 2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className={`${mSection} border-t ${marketingTheme.colors.border}`}>
        <div className={mContainer}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Left Column: Info Cards */}
            <div className="space-y-8">
              <div className={mCard}>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-1">Email Us</h3>
                    <div className="text-xl font-bold text-white mb-2">eddesktech@gmail.com</div>
                    <p className="text-slate-500 text-sm">We respond within 2 business days</p>
                  </div>
                </div>
              </div>

              <div className={mCard}>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest mb-1">Visit Us</h3>
                    <div className="text-xl font-bold text-white mb-2">eddesk.in</div>
                    <p className="text-slate-500 text-sm">See live template demos</p>
                  </div>
                </div>
              </div>

              <div className={mCard}>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-1">Based In</h3>
                    <div className="text-xl font-bold text-white mb-2">Tamil Nadu, India</div>
                    <p className="text-slate-500 text-sm">Serving schools across India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className={mCard}>
              <form action="/api/contact" method="POST" className="space-y-6">
                <input type="hidden" name="_source" value="marketing-contact" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">School Name</label>
                    <input name="school_name" type="text" required placeholder="e.g. St. Peters Academy" 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500/50 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                    <input name="name" type="text" required placeholder="Full Name" 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500/50 focus:outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input name="email" type="email" required placeholder="name@school.com" 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500/50 focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                    <input name="phone" type="tel" placeholder="+91 00000 00000" 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500/50 focus:outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea name="message" rows={4} required placeholder="How can we help your school?" 
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-indigo-500/50 focus:outline-none transition-all resize-none"></textarea>
                </div>

                <button type="submit" className={`${mBtnPrimary} w-full py-5 flex items-center justify-center space-x-3 group`}>
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <p className="text-center text-[11px] text-slate-600 font-bold uppercase tracking-widest pt-4">
                  By submitting this form you agree to our <Link href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Strip Section */}
      <section className={`${mSection} bg-slate-900/50 border-t ${marketingTheme.colors.border}`}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`${mDisplay} text-4xl text-white mb-16 text-center`}>Common Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {faqs.map((faq, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="text-lg font-black text-white flex items-start space-x-3">
                    <span className="text-indigo-400">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className={`${marketingTheme.type.body} pl-8 border-l border-indigo-500/20`}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
