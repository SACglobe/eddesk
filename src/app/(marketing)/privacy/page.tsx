// src/app/(marketing)/privacy/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme, mCard } from '@/lib/marketing/theme';
import { Lock, Eye, Database, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | EdDesk',
  description: 'How EdDesk handles and protects data for schools and their students.',
  alternates: { canonical: 'https://eddesk.in/privacy' },
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data We Collect",
      icon: <Database className="w-5 h-5" />,
      content: "We collect minimal data required to provide our service: user account details, school identity information, and public content uploaded to websites."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content: "All data is stored in encrypted databases via Supabase. We implement enterprise-grade security protocols to protect school information."
    },
    {
      title: "No Third-Party Sharing",
      icon: <Share2 className="w-5 h-5" />,
      content: "EdDesk does not sell, rent, or trade school or student data to third parties. Data is used solely for platform functionality."
    },
    {
      title: "Visibility Control",
      icon: <Eye className="w-5 h-5" />,
      content: "Schools have full control over what information is made public via their websites. The admin panel allows for granular content management."
    }
  ];

  return (
    <div className="pt-20">
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
            <span className={mLabel}>Data Protection</span>
            <h1 className={`${mDisplay} text-5xl mt-6 mb-12 text-white`}>Privacy Policy</h1>
            
            <div className="space-y-12">
              <p className={marketingTheme.type.bodyLg}>
                Last Updated: January 2026. EdDesk is committed to maintaining the highest standards of data privacy for educational institutions in India.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((s, i) => (
                  <div key={i} className={mCard}>
                    <div className="flex items-center space-x-3 mb-6 text-purple-400">
                      {s.icon}
                      <h2 className="text-xl font-black text-white">{s.title}</h2>
                    </div>
                    <p className={marketingTheme.type.body}>{s.content}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[32px]">
                <h2 className="text-2xl font-black text-white mb-6">Cookie Policy</h2>
                <p className={marketingTheme.type.body}>
                  We use essential cookies to maintain browser sessions and improve platform performance. We do not use tracking or advertising cookies on school websites or the admin panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
