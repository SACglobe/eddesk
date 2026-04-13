// src/app/(marketing)/terms/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme, mCard } from '@/lib/marketing/theme';
import { FileText, Shield, Scale, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Platform Usage & Agreement',
  description: 'Legal terms and conditions for schools and educational institutions using the EdDesk platform.',
  alternates: { canonical: 'https://www.eddesk.in/terms' },
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Service Description",
      icon: <FileText className="w-5 h-5" />,
      content: "EdDesk provides a multi-tenant Software-as-a-Service (SaaS) platform for educational institutions to create, host, and manage their websites. This includes hosting infrastructure, application templates, and an administrative dashboard."
    },
    {
      title: "2. Ownership & Intellectual Property",
      icon: <Shield className="w-5 h-5" />,
      content: "All platform infrastructure, codebases, templates, designs, and the administrative portal remain the exclusive, proprietary property of EdDesk. Schools utilizing the platform do not retain any ownership rights over the software. Schools retain exclusive ownership of their user-generated content (text, photos, logos) and their custom domain names."
    },
    {
      title: "3. Subscription & Payments",
      icon: <Scale className="w-5 h-5" />,
      content: "Services are billed strictly on a subscription basis (Monthly/Annual). Access to the platform is contingent upon timely payment. Failure to maintain an active subscription may result in immediate suspension of the public-facing website and admin panel access."
    },
    {
      title: "4. Termination & Export",
      icon: <AlertCircle className="w-5 h-5" />,
      content: "Either party may terminate the agreement at any time. Upon termination, EdDesk will provide an export of user data (text, images, and documents). The hosted website design, domain routing capabilities, and software platform access will be immediately revoked."
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
                Last Updated: April 2026. These terms govern the use of the EdDesk platform by educational institutions. By accessing or using our services, you agree to be bound by these Terms of Service under the jurisdiction of Tamil Nadu, India.
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

              <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[32px] space-y-6">
                <div>
                    <h2 className="text-2xl font-black text-white mb-4">5. Account Usage & Responsibility</h2>
                    <p className={marketingTheme.type.body}>
                    You agree to provide accurate and complete information when registering your school. You are responsible for maintaining the confidentiality of your admin credentials and are solely responsible for all activities that occur under your account. EdDesk strictly prohibits the uploading of offensive, illegal, or inappropriate materials.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white mb-4">6. Limitation of Liability</h2>
                    <p className={marketingTheme.type.body}>
                    EdDesk provides its platform 'as-is' and shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the service. We strive for maximum uptime but do not guarantee uninterrupted service. Liability is limited strictly to the subscription amount paid in the preceding 30 days.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white mb-4">7. Governing Law</h2>
                    <p className={marketingTheme.type.body}>
                    These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts located in Tuticorin, Tamil Nadu.
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <h2 className="text-xl font-black text-white mb-4">Contact Information</h2>
                    <p className={marketingTheme.type.body}>
                    For any legal inquiries regarding these Terms & Conditions, please contact us at:
                    <br/><br/>
                    <strong>EdDesk</strong><br/>
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
