// src/app/(marketing)/refund-cancellation/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import { mContainer, mSection, mLabel, mDisplay, marketingTheme, mCard } from '@/lib/marketing/theme';
import { RefreshCcw, HandCoins, HardDriveDownload, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Cancellation | Data Integrity Policy',
  description: 'Understand the withdrawal and refund policies for EdDesk school management subscriptions, including our data handover commitment.',
  alternates: { canonical: 'https://www.eddesk.in/refund-cancellation' },
};

export default function RefundCancellationPage() {
  const sections = [
    {
      title: "1. Right to Cancel Anytime",
      icon: <XCircle className="w-5 h-5" />,
      content: "As a subscriber, you can cancel your EdDesk subscription at any time. Cancellation requests can be made directly from your admin dashboard or by emailing support@eddesk.in."
    },
    {
      title: "2. Pro-rated Billing & Refunds",
      icon: <HandCoins className="w-5 h-5" />,
      content: "When you cancel, your usage is calculated on a pro-rated basis. You will only be charged for the exact number of days you have utilized the platform. Any remaining balance paid in advance for the unused portion of your billing cycle will be refunded to your original payment method."
    },
    {
      title: "3. Data Export & Handover",
      icon: <HardDriveDownload className="w-5 h-5" />,
      content: "Upon cancellation, you are fully entitled to an export of your raw data. This includes the text content, documents, and images you uploaded. We will package and deliver this data to you upon request."
    },
    {
      title: "4. Intellectual Property Restrictions",
      icon: <RefreshCcw className="w-5 h-5" />,
      content: "EdDesk provides the software platform and infrastructure. On cancellation, we strictly ONLY provide the user's raw data. You will NOT receive the website design, the frontend templates, the core codebase, or continuing platform access. The digital presence hosted by EdDesk will be taken down."
    }
  ];

  return (
    <div className="pt-20">
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
            <span className={mLabel}>Billing Terms</span>
            <h1 className={`${mDisplay} text-5xl mt-6 mb-12 text-white`}>Refund & Cancellation Policy</h1>
            
            <div className="space-y-12">
              <p className={marketingTheme.type.bodyLg}>
                Last Updated: April 2026. EdDesk operates a strict pro-rated usage model to ensure fair billing for all educational institutions leveraging our platform.
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
                    <h2 className="text-2xl font-black text-white mb-4">Refund Processing Timeline</h2>
                    <p className={marketingTheme.type.body}>
                    Once a cancellation request is confirmed and the pro-rated usage is calculated, any eligible refund amount will be initiated within 5 to 7 business days. The refund will exclusively be credited back to the original source of payment (Bank Account, Credit Card, etc.) utilized during the initial transaction via Razorpay.
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <h2 className="text-xl font-black text-white mb-4">Support Contact For Billing & Cancellations</h2>
                    <p className={marketingTheme.type.body}>
                    If you have questions regarding your invoice or wish to initiate a cancellation, please reach out to us at:
                    <br/><br/>
                    <strong>EdDesk Billing</strong><br/>
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
