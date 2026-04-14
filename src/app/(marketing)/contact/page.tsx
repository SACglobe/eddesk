"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Globe, MapPin, Send, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { mContainer, mSection, mLabel, mDisplay, mCard, marketingTheme, mBtnPrimary } from '@/lib/marketing/theme';
import { JsonLd } from '@/components/JsonLd';
import Link from 'next/link';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    // --- Rate Limiting Logic (Local Storage) ---
    const today = new Date().toLocaleDateString();
    const storedData = localStorage.getItem('eddesk_contact_limit');
    let submissionData = storedData ? JSON.parse(storedData) : { count: 0, date: today };

    if (submissionData.date !== today) {
      submissionData = { count: 0, date: today };
    }

    if (submissionData.count >= 5) {
      setStatus('rate-limited');
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send message');
      }

      // Update Rate Limit
      submissionData.count += 1;
      localStorage.setItem('eddesk_contact_limit', JSON.stringify(submissionData));

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact EdDesk Team",
          "description": "Get in touch with the EdDesk team for school management and website support.",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "EdDesk",
            "image": "https://www.eddesk.in/assets/images/icon.png",
            "@id": "https://www.eddesk.in/#organization",
            "url": "https://www.eddesk.in",
            "telephone": "+91 7010779096",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "49/3, Nadar Street, Keela Eral",
              "addressLocality": "Tuticorin",
              "addressRegion": "Tamil Nadu",
              "postalCode": "628908",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Sales and Support",
              "email": "support@eddesk.in"
            }
          }
        }}
      />
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
              "name": "Contact",
              "item": "https://www.eddesk.in/contact"
            }
          ]
        }}
      />
      <JsonLd 
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How long does it take to get my school's website live?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Typically 2–5 days after your school information and content is submitted."
              }
            },
            {
              "@type": "Question",
              "name": "What happens to my domain if I cancel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Your domain is yours. We provide DNS guidance to redirect it wherever you choose."
              }
            },
            {
              "@type": "Question",
              "name": "Do I need technical knowledge to manage the website?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. The EdDesk admin panel is designed for school administrators, not developers."
              }
            }
          ]
        }}
      />
      {/* Hero Section */}
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto text-center">
            <span className={mLabel}>Get in Touch</span>
            <h1 className={`${mDisplay} text-5xl md:text-7xl mt-6 mb-8 ${marketingTheme.gradients.text}`}>
              Let's Get Your School Online
            </h1>
            <p className={`${marketingTheme.type.bodyLg} text-xl max-w-2xl mx-auto`}>
              Reach out with any question about EdDesk. Our team is ready to help you digitize your institution.
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
                    <div className="text-xl font-bold text-white mb-2">support@eddesk.in</div>
                    <p className="text-slate-500 text-sm">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className={mCard}>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest mb-1">Call Us</h3>
                    <div className="text-xl font-bold text-white mb-2">+91 70107 79096</div>
                    <p className="text-slate-500 text-sm">Mon-Sat, 9 AM to 6 PM IST</p>
                  </div>
                </div>
              </div>

              <div className={mCard}>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-1">Visit Us</h3>
                    <div className="text-xl font-bold text-white leading-relaxed mb-2">
                      49/3, Nadar Street<br/>
                      Keela Eral, Tuticorin<br/>
                      Tamil Nadu – 628908
                    </div>
                    <p className="text-slate-500 text-sm">Registered Office</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className={mCard}>
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black text-white">Message Sent!</h2>
                  <p className="text-slate-400 max-w-xs mx-auto">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-indigo-400 font-bold hover:underline pt-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
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

                  {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center space-x-3 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {status === 'rate-limited' && (
                    <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex items-center space-x-3 text-orange-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Daily submission limit reached (5/day). Please try again tomorrow.</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading || status === 'rate-limited'}
                    className={`${mBtnPrimary} w-full py-5 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-600 font-bold uppercase tracking-widest pt-4">
                    By submitting this form you agree to our <Link href="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              )}
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
