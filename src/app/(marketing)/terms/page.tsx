// src/app/(marketing)/terms/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme, mCard } from '@/lib/marketing/theme';
import { FileText, Shield, Scale, AlertCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Platform Usage & Agreement',
  description: 'Legal terms and conditions for schools and educational institutions using the EdDesk platform.',
  alternates: { canonical: 'https://www.eddesk.in/terms' },
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance",
      icon: <Shield className="w-5 h-5" />,
      content: "By accessing or using EdDesk, you agree to be bound by these Terms and Conditions. Our platform provides school websites and admin panels for content management."
    },
    {
      title: "2. Ownership",
      icon: <FileText className="w-5 h-5" />,
      content: "The EdDesk platform, including software and design, is the property of SAC Globe Tech. Clients retain exclusive ownership of their uploaded content."
    },
    {
      title: "3. Plans & Pricing",
      icon: <Scale className="w-5 h-5" />,
      content: "Monthly Plan: ₹1100/month. Yearly Plan: ₹12,100/year. All prices are exclusive of applicable taxes (GST)."
    },
    {
      title: "4. Payment Policy",
      icon: <AlertCircle className="w-5 h-5" />,
      content: "Billing cycle is the 5th of every month. If payment is not received by the 5th, admin access will be suspended from the 6th. Website services suspended after the 12th."
    }
  ];

  const legalDetails = [
    {
        title: "5. Late Payment & Pro-Rata",
        content: "Service restoration after the 12th is not guaranteed. If allowed, charges will be calculated on a pro-rata basis: ₹1100 ÷ 30 × remaining days until next billing cycle."
    },
    {
        title: "6. Refund Policy",
        content: "All payments are strictly non-refundable. No refunds for partial usage, service suspension, or termination due to non-payment."
    },
    {
        title: "7. Suspension & Termination",
        content: "We reserve the right to suspend services for non-payment or terminate accounts for repeated violations or illegal use."
    },
    {
        title: "8. Client Responsibilities",
        content: "Clients agree to provide accurate information, use the platform lawfully, ensure timely payments, and maintain proper backups of critical data."
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
                Last Updated: 23/04/2026. These terms govern the use of the EdDesk platform. By using our services, you agree to be bound by these Terms of Service under the jurisdiction of Tamil Nadu, India.
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

              <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[32px] space-y-10">
                {legalDetails.map((d, i) => (
                    <div key={i}>
                        <h2 className="text-2xl font-black text-white mb-4">{d.title}</h2>
                        <p className={marketingTheme.type.body}>{d.content}</p>
                    </div>
                ))}

                <div className="grid md:grid-cols-2 gap-10 pt-8 border-t border-white/10">
                    <div>
                        <h2 className="text-2xl font-black text-white mb-4">9. Intellectual Property</h2>
                        <p className={marketingTheme.type.body}>
                        Software, design, and infrastructure are exclusive property of SAC Globe Tech. Clients own their uploaded content.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white mb-4">10. Availability</h2>
                        <p className={marketingTheme.type.body}>
                        We strive for high uptime but do not guarantee uninterrupted service. Downtime may occur for maintenance or technical issues.
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-black text-white mb-4">11. Limitation of Liability</h2>
                    <p className={marketingTheme.type.body}>
                    SAC Globe Tech shall not be liable for data loss due to user negligence, downtime by external providers, or incidental damages.
                    </p>
                </div>

                <div className="pt-8 border-t border-white/10">
                    <h2 className="text-2xl font-black text-white mb-4">12. Governing Law</h2>
                    <p className={marketingTheme.type.body}>
                    Governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Tamil Nadu.
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 bg-indigo-500/5 p-8 rounded-2xl">
                    <h2 className="text-xl font-black text-white mb-6">13. Contact Information</h2>
                    <div className={marketingTheme.type.body}>
                        <p className="font-bold text-white mb-4">SAC Globe Tech – EdDesk</p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-indigo-400" />
                                <a href="mailto:support@eddesk.in" className="hover:text-indigo-400 transition-colors">support@eddesk.in</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-lg">📞</span>
                                <a href="tel:+918122333929" className="hover:text-indigo-400 transition-colors">+91 81223 33929</a>
                            </div>
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
