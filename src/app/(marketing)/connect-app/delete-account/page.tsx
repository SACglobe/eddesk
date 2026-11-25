// src/app/(marketing)/connect-app/delete-account/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  mContainer,
  mSection,
  mLabel,
  mDisplay,
  marketingTheme,
} from '@/lib/marketing/theme';
import {
  Mail,
  Trash2,
  Database,
  Smartphone,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: 'Delete your EdDesk Connect account',
  },
  description:
    'How to request deletion of your EdDesk Connect parent app account and personal data, what data is deleted, and what the school retains.',
  alternates: { canonical: 'https://www.eddesk.in/connect-app/delete-account' },
  openGraph: {
    title: 'Delete your EdDesk Connect account',
    description:
      'How to request deletion of your EdDesk Connect parent app account and personal data, what data is deleted, and what the school retains.',
    url: 'https://www.eddesk.in/connect-app/delete-account',
    siteName: 'EdDesk',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Delete your EdDesk Connect account',
      },
    ],
  },
};

export default function ConnectAppDeleteAccountPage() {
  return (
    <div className="pt-20 font-sans">
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <span className={`${mLabel} inline-block leading-relaxed`}>
              Parent App · EdDesk (SAC Globe Tech)
            </span>
            <h1 className={`${mDisplay} text-3xl sm:text-5xl mt-6 mb-6 text-white`}>
              Delete your EdDesk Connect account
            </h1>
            <p className={`${marketingTheme.type.bodyLg} mb-12`}>
              EdDesk Connect is a parent app for school information, published by EdDesk (SAC Globe Tech). You can ask us to delete your account and the information we hold about you in the app. You do not need the app installed to make this request.
            </p>

            {/* Main Content Sections */}
            <div className="bg-slate-900/30 border border-white/5 p-6 sm:p-10 rounded-[32px] space-y-12">

              {/* 1. How to request deletion */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
                  <span>How to request deletion</span>
                </h2>
                <ol className={`${marketingTheme.type.body} list-decimal pl-5 sm:pl-6 space-y-3 marker:text-purple-400 marker:font-bold`}>
                  <li>
                    Send an email to{' '}
                    <a
                      href="mailto:support@eddesk.in"
                      className="text-purple-400 underline decoration-purple-400/50 underline-offset-4 hover:decoration-purple-400 [overflow-wrap:anywhere]"
                    >
                      support@eddesk.in
                    </a>{' '}
                    from the email address registered with your child&apos;s school, or write from any address and include your registered mobile number.
                  </li>
                  <li>
                    Use the subject line:{' '}
                    <span className="text-white font-medium">
                      Delete my EdDesk Connect account.
                    </span>
                  </li>
                  <li>
                    In the email, give your full name, your registered mobile number, your child&apos;s name and the name of the school.
                  </li>
                  <li>
                    We will confirm your identity by sending an OTP to your registered mobile number.
                  </li>
                  <li>
                    We reply within 30 days and confirm once the deletion is done.
                  </li>
                </ol>
                <div className="mt-6">
                  <a
                    href="mailto:support@eddesk.in?subject=Delete%20my%20EdDesk%20Connect%20account."
                    className={`${marketingTheme.components.btnPrimary} hover:bg-indigo-700 active:bg-indigo-800 px-6 py-4 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-center text-sm sm:text-base leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400`}
                  >
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Send deletion request email</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-white/10" />

              {/* 2. What we delete */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                  <Trash2 className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
                  <span>What we delete</span>
                </h2>
                <p className={marketingTheme.type.body}>
                  When your request is confirmed, we delete your guardian account and the information that identifies you in the app: your mobile number used for sign-in, the phones you signed in on (device identifier, model, app version and notification token), and the requests and attachments you sent through the app.
                </p>
              </div>

              <div className="border-t border-white/10" />

              {/* 3. What we keep, and for how long */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                  <Database className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
                  <span>What we keep, and for how long</span>
                </h2>
                <p className={marketingTheme.type.body}>
                  Your child&apos;s school records belong to the school, not to EdDesk. The school keeps them under its own rules and legal duties, so deleting your account does not delete your child&apos;s school records. Where we must keep a record for security or legal reasons, we keep only what is needed and delete it when that reason ends. When a school stops using EdDesk, we delete that school&apos;s data within 90 days.
                </p>
              </div>

              <div className="border-t border-white/10" />

              {/* 4. What happens to the app */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
                  <span>What happens to the app</span>
                </h2>
                <p className={marketingTheme.type.body}>
                  After deletion you can no longer sign in to the app with that mobile number. If you want to use EdDesk Connect again later, the school can register you again.
                </p>
              </div>

              <div className="border-t border-white/10" />

              {/* 5. Need help? */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
                  <span>Need help?</span>
                </h2>
                <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 sm:p-8 rounded-2xl">
                  <p className="font-sans text-slate-200 leading-relaxed">
                    Email{' '}
                    <a
                      href="mailto:support@eddesk.in"
                      className="text-purple-400 underline decoration-purple-400/50 underline-offset-4 hover:decoration-purple-400 [overflow-wrap:anywhere]"
                    >
                      support@eddesk.in
                    </a>{' '}
                    or call{' '}
                    <a
                      href="tel:+918122333929"
                      className="text-purple-400 underline decoration-purple-400/50 underline-offset-4 hover:decoration-purple-400 sm:whitespace-nowrap"
                    >
                      +91 81223 33929
                    </a>
                    . If you are not satisfied with our reply, you can write to our Grievance Officer at the same email address. See our{' '}
                    <Link
                      href="/connect-app/privacy"
                      className="text-purple-400 underline decoration-purple-400/50 underline-offset-4 hover:decoration-purple-400"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Attribution Strip */}
            <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-slate-400 leading-relaxed [overflow-wrap:anywhere]">
              EdDesk Connect · EdDesk (SAC Globe Tech) · Tamil Nadu, India ·{' '}
              <a
                href="mailto:support@eddesk.in"
                className="text-purple-400 underline decoration-purple-400/50 underline-offset-4 hover:decoration-purple-400 [overflow-wrap:anywhere]"
              >
                support@eddesk.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
