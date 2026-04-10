// src/app/(marketing)/privacy/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme, mCard } from '@/lib/marketing/theme';
import { Lock, Eye, Database, Share2, ShieldCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection for Schools',
  description: 'Learn how EdDesk handles and protects data for schools, administrators, and students. Committed to security and transparency.',
  alternates: { canonical: 'https://www.eddesk.in/privacy' },
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data We Collect",
      icon: <Database className="w-5 h-5" />,
      content: "We collect information required to provide our SaaS platform: admin account details (name, email, phone), school identity information, billing details, and public content explicitly uploaded by the school administrators."
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content: "Data is stored securely. We implement reasonable security practices and procedures in accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 to prevent unauthorized access."
    },
    {
      title: "No Third-Party Selling",
      icon: <Share2 className="w-5 h-5" />,
      content: "EdDesk does not sell, rent, or trade school administrative data or public website content to third parties for commercial purposes. Data is used solely to facilitate the functioning of the platform and process transactions."
    },
    {
      title: "Data Retention & Export",
      icon: <ShieldCheck className="w-5 h-5" />,
      content: "We retain your data for as long as your account is active. Upon account cancellation or deletion, schools can request an export of their media and text content. We will securely delete data from our active databases upon request."
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
                Last Updated: April 2026. EdDesk is committed to protecting the privacy of educational institutions using our platform. This policy outlines how we collect, use, and safeguard your data.
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

              <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[32px] space-y-6">
                <div>
                    <h2 className="text-2xl font-black text-white mb-4">Cookie Policy</h2>
                    <p className={marketingTheme.type.body}>
                    We use cookies and identical tracking technologies to strictly maintain browser sessions, perform authentication, and ensure platform security (e.g., CSRF tokens). We do not deploy intrusive advertising trackers. By using our platform, you consent to essential operational cookies.
                    </p>
                </div>
                
                <div>
                    <h2 className="text-2xl font-black text-white mb-4">Jurisdiction & Compliance</h2>
                    <p className={marketingTheme.type.body}>
                    This Privacy Policy is published in accordance with the provisions of the Indian Information Technology Act, 2000. Any disputes involving privacy or data integrity shall be subject solely to the jurisdiction of the courts of Tuticorin, Tamil Nadu.
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <h2 className="text-xl font-black text-white mb-4">Grievance Officer</h2>
                    <p className={marketingTheme.type.body}>
                    In accordance with Information Technology Act 2000 and rules made thereunder, the contact details of the Grievance Officer are provided below:
                    <br/><br/>
                    <strong>EdDesk Support Team</strong><br/>
                    49/3, Nadar Street<br/>
                    Keela Eral, Tuticorin<br/>
                    Tamil Nadu – 628908<br/>
                    Email: support@eddesk.in<br/>
                    Phone: +91 81223 33929
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
