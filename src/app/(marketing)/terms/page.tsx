// src/app/(marketing)/terms/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme, mCard } from '@/lib/marketing/theme';
import { FileText, Shield, Scale, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | EdDesk',
  description: 'Legal terms and conditions for using the EdDesk school website platform.',
  alternates: { canonical: 'https://eddesk.in/terms' },
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Service Description",
      icon: <FileText className="w-5 h-5" />,
      content: "EdDesk provides a subscription-based platform for schools to create and manage their websites. This includes hosting, templates, and an administrative dashboard."
    },
    {
      title: "2. Ownership & Intellectual Property",
      icon: <Shield className="w-5 h-5" />,
      content: "All platform infrastructure, including code, templates, and designs, remain the exclusive property of EdDesk. Schools retain ownership of their unique content (text, photos) and their custom domain names."
    },
    {
      title: "3. Subscription & Payments",
      icon: <Scale className="w-5 h-5" />,
      content: "Services are billed on a monthly or annual basis. Failure to pay may result in temporary suspension of the public-facing website."
    },
    {
      title: "4. Termination",
      icon: <AlertCircle className="w-5 h-5" />,
      content: "Either party may terminate the agreement at any time. Upon termination, EdDesk will assist in domain transfer if requested, but the hosted website remains EdDesk property."
    }
  ];

  return (
    <div className="pt-20">
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
            <span className={mLabel}>Legal Agreement</span>
            <h1 className={`${mDisplay} text-5xl mt-6 mb-12 text-white`}>Terms & Conditions</h1>
            
            <div className="space-y-12">
              <p className={marketingTheme.type.bodyLg}>
                Last Updated: January 2026. These terms govern the use of the EdDesk platform by educational institutions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((s, i) => (
                  <div key={i} className={mCard}>
                    <div className="flex items-center space-x-3 mb-6 text-indigo-400">
                      {s.icon}
                      <h2 className="text-xl font-black text-white">{s.title}</h2>
                    </div>
                    <p className={marketingTheme.type.body}>{s.content}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[32px]">
                <h2 className="text-2xl font-black text-white mb-6">5. Limitation of Liability</h2>
                <p className={marketingTheme.type.body}>
                  EdDesk provides its platform 'as-is' and shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service. We strive for 99.9% uptime but do not guarantee uninterrupted service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
