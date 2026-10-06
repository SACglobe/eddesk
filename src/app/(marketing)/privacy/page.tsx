// src/app/(marketing)/privacy/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme, mCard } from '@/lib/marketing/theme';
import { Lock, Eye, Database, Share2, ShieldCheck, Mail, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection for Schools',
  description: 'Learn how EdDesk handles and protects data for schools, administrators, and students. Committed to security and transparency.',
  alternates: { canonical: 'https://www.eddesk.in/privacy' },
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Introduction",
      icon: <Eye className="w-5 h-5" />,
      content: "This Privacy Policy explains how SAC Globe Tech (\"Company\", \"we\", \"our\", \"us\"), operating under the brand name EdDesk, collects, uses, stores, and protects information of schools and users accessing our SaaS platform."
    },
    {
      title: "2. Company Details",
      icon: <ShieldCheck className="w-5 h-5" />,
      content: "SAC Globe Tech (EdDesk) operates from Tamil Nadu, India, providing a specialized SaaS website platform for educational institutions."
    },
    {
      title: "3. Information We Collect",
      icon: <Database className="w-5 h-5" />,
      content: "We collect school identity details, authorized contact information, technical browser data, and billing history. Important: We do not store sensitive financial info like CVV or UPI credentials."
    },
    {
      title: "4. Purpose of Data",
      icon: <Lock className="w-5 h-5" />,
      content: "Data is used to operate EdDesk services, enable customization, manage billing, provide support, and send service-related notifications."
    }
  ];

  const details = [
    {
        title: "5. Data Sharing",
        icon: <Share2 className="w-5 h-5" />,
        text: "We do not sell, rent, or trade personal data. Data is shared only with trusted third-party providers (hosting, payment gateways) or when legally required under Indian laws."
    },
    {
        title: "6. Data Security",
        icon: <ShieldCheck className="w-5 h-5" />,
        text: "We implement administrative, technical, and physical safeguards. However, no digital platform can guarantee absolute security, and users acknowledge this risk."
    },
    {
        title: "7. Data Retention",
        icon: <Database className="w-5 h-5" />,
        text: "We retain data for the duration of the active subscription and for a limited period after termination as required for legal or accounting purposes."
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
                Last Updated: 06/10/2026. EdDesk is committed to protecting the privacy of educational institutions. This policy explains our commitment to transparency and security.
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

              <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[32px] space-y-10">
                {details.map((d, i) => (
                    <div key={i}>
                        <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                            <span className="text-purple-400">{d.icon}</span>
                            {d.title}
                        </h2>
                        <p className={marketingTheme.type.body}>{d.text}</p>
                    </div>
                ))}
                
                <div className="pt-8 border-t border-white/10 grid md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-2xl font-black text-white mb-4">8. User Rights</h2>
                        <p className={marketingTheme.type.body}>
                        Schools have the right to request access to their data, correction of inaccuracies, or deletion after service termination.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white mb-4">9. Third-Party Links</h2>
                        <p className={marketingTheme.type.body}>
                        EdDesk websites may contain links to external services. We are not responsible for their privacy practices.
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-black text-white mb-4">10. Changes to Policy</h2>
                    <p className={marketingTheme.type.body}>
                    We may update this Privacy Policy periodically. Updated versions will be published on our website with a revised "Last Updated" date.
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 bg-purple-500/5 p-8 rounded-2xl">
                    <h2 className="text-xl font-black text-white mb-6">11. Contact Information</h2>
                    <div className={marketingTheme.type.body}>
                        <p className="font-bold text-white mb-4">SAC Globe Tech – EdDesk</p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">📍</span>
                                <span>Tamil Nadu, India</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-purple-400" />
                                <a href="mailto:support@eddesk.in" className="hover:text-purple-400 transition-colors">support@eddesk.in</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-lg">📞</span>
                                <a href="tel:+918122333929" className="hover:text-purple-400 transition-colors">+91 81223 33929</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-purple-400" />
                        12. Mobile Numbers &amp; SMS Authentication Policy
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">12.1 Purpose of Collection</h3>
                            <p className={marketingTheme.type.body}>
                                EdDesk (operated by SAC Globe Tech) collects user mobile telephone numbers strictly for providing secure identity verification, two-factor authentication (2FA), and authorized account administration for enrolled school administrators, faculty members, and parents.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">12.2 Transactional Messaging Only</h3>
                            <p className={marketingTheme.type.body}>
                                We utilize mobile numbers exclusively for user-initiated, transactional one-time password (OTP) delivery. EdDesk does not send unsolicited promotional marketing, advertising blasts, or mass broadcast campaigns via SMS.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">12.3 Telecom Delivery &amp; Regulatory Compliance</h3>
                            <p className={marketingTheme.type.body}>
                                All SMS communications dispatched by EdDesk are routed through government-approved telecom gateways registered under the Telecom Regulatory Authority of India (TRAI) Distributed Ledger Technology (DLT) regulations under Principal Entity SAC GLOBE TECH (Entity ID: 1401474120000080432) utilizing the approved sender header EDDOTP.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">12.4 Data Protection &amp; Non-Disclosure</h3>
                            <p className={marketingTheme.type.body}>
                                Mobile numbers registered on EdDesk are stored using encrypted AWS infrastructure located in Mumbai, India. We do not sell, rent, monetize, or distribute mobile phone numbers or user contact information to any third-party advertisers or external data brokers. Numbers are transmitted solely to licensed telecom network operators (Airtel, Jio, Vodafone-Idea, BSNL) for the explicit technical purpose of SMS message delivery.
                            </p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
