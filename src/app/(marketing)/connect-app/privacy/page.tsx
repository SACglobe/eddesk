// src/app/(marketing)/connect-app/privacy/page.tsx
import React from 'react';
import type { Metadata } from 'next';
import {
  mContainer,
  mSection,
  mLabel,
  mDisplay,
  marketingTheme,
} from '@/lib/marketing/theme';
import {
  Shield,
  Database,
  Share2,
  ShieldCheck,
  Mail,
  Smartphone,
  Bell,
  Users,
  Lock,
  Eye,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | EdDesk Connect Parent App | EdDesk',
  description:
    'How the EdDesk Connect parent and guardian app collects, uses, shares and protects information, and how to ask for your data to be deleted.',
  alternates: { canonical: 'https://eddesk.in/connect-app/privacy' },
};

export default function ConnectAppPrivacyPage() {
  return (
    <div className="pt-20">
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <span className={mLabel}>Parent App</span>
            <h1 className={`${mDisplay} text-5xl mt-6 mb-4 text-white`}>
              EdDesk Connect Parent App<br />Privacy Policy
            </h1>
            <p className="text-slate-500 text-sm mb-12">
              Effective date: 25 November 2026 &nbsp;|&nbsp; Last updated: 25 November 2026
            </p>

            <div className="space-y-14">

              {/* Introduction */}
              <div className="space-y-5">
                <p className={marketingTheme.type.bodyLg}>
                  This Privacy Policy describes how SAC Globe Tech (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), trading as EdDesk, collects, uses, shares and protects information when you use the EdDesk Connect mobile application (&quot;the App&quot;) on Android or iOS. The App is designed for parents and guardians of students enrolled in schools that subscribe to the EdDesk school-management platform.
                </p>
                <p className={marketingTheme.type.body}>
                  Schools that subscribe to EdDesk may publish the App under their own school brand name (for example &quot;Sunrise Academy Parent App&quot;). Regardless of the name shown on your device, this policy applies to all versions of the App.
                </p>
                <p className={marketingTheme.type.body}>
                  By downloading, installing or using the App you agree to the collection and use of information described in this policy. If you do not agree, please uninstall the App and contact your school to arrange an alternative way to receive updates.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-slate-900/30 border border-white/5 p-8 rounded-[32px]">
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Contents
                </h2>
                <ol className="space-y-2 text-sm text-slate-400 list-none">
                  {[
                    ['who-we-are', 'Who we are and who is responsible for your data'],
                    ['information-we-collect', 'Information we collect'],
                    ['how-we-use', 'How we use your information'],
                    ['consent', 'Consent and the basis for using your information'],
                    ['sharing', 'Who we share information with'],
                    ['permissions', 'Permissions the app asks for'],
                    ['devices-and-login', 'Your phone and your login'],
                    ['security', 'How we keep your information safe'],
                    ['retention', 'How long we keep your information'],
                    ['children', "Children's information"],
                    ['your-rights', 'Your rights and how to delete your account'],
                    ['third-party-links', 'Links to other websites'],
                    ['data-location', 'Where your information is processed'],
                    ['changes', 'Changes to this policy'],
                    ['contact', 'Contact us and grievances'],
                  ].map(([anchor, label], i) => (
                    <li key={anchor}>
                      <a
                        href={`#${anchor}`}
                        className="hover:text-purple-400 transition-colors"
                      >
                        {i + 1}. {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Main Policy Sections */}
              <div className="bg-slate-900/30 border border-white/5 p-10 rounded-[32px] space-y-12">

                {/* 1. Who we are */}
                <div id="who-we-are">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-400" />
                    1. Who we are and who is responsible for your data
                  </h2>
                  <p className={marketingTheme.type.body}>
                    The data controller is SAC Globe Tech, a company registered in Tamil Nadu, India, trading as EdDesk. We build and operate school-management software and the EdDesk Connect parent mobile application.
                  </p>
                  <div className="mt-4 space-y-1 text-slate-400 text-sm">
                    <p><span className="text-white font-medium">Trading name:</span> EdDesk</p>
                    <p><span className="text-white font-medium">Legal name:</span> SAC Globe Tech</p>
                    <p><span className="text-white font-medium">Country:</span> India</p>
                    <p><span className="text-white font-medium">State:</span> Tamil Nadu</p>
                    <p><span className="text-white font-medium">Support e-mail:</span>{' '}
                      <a href="mailto:support@eddesk.in" className="hover:text-purple-400 transition-colors">support@eddesk.in</a>
                    </p>
                    <p><span className="text-white font-medium">Support phone:</span>{' '}
                      <a href="tel:+918122333929" className="hover:text-purple-400 transition-colors">+91 81223 33929</a>
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* 2. Information we collect */}
                <div id="information-we-collect">
                  <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <Database className="w-5 h-5 text-purple-400" />
                    2. Information we collect
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.1 Account information</h3>
                      <p className={marketingTheme.type.body}>
                        When your school sets up your parent account, your mobile number and your child&apos;s name and class are stored in EdDesk. You do not register directly with SAC Globe Tech; your school&apos;s administrator creates and manages your account.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.2 Authentication data</h3>
                      <p className={marketingTheme.type.body}>
                        We use your mobile number to send a one-time password (OTP) each time you log in. We do not store your OTP after it has been verified. We store a secure session token on your device so you do not need to enter your OTP every time you open the App.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.3 Messages and attachments</h3>
                      <p className={marketingTheme.type.body}>
                        The App lets parents and teachers exchange messages. We store the text and any files you send (photos, documents) so the other person can read them. We do not read your messages except to operate the service or to investigate a reported safety concern.
                      </p>
                      <ul className="mt-3 space-y-1 text-slate-400 text-sm list-disc list-inside">
                        <li>Maximum 5 attachments per message</li>
                        <li>Maximum 5 MB per attachment</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.4 Push-notification tokens</h3>
                      <p className={marketingTheme.type.body}>
                        When you first open the App, your device generates a Firebase Cloud Messaging (FCM) token. We store this token so we can send you push notifications from your school (announcements, homework reminders, fee alerts, etc.). The token changes if you reinstall the App or switch devices; we update it automatically.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.5 Technical and log data</h3>
                      <p className={marketingTheme.type.body}>
                        Our servers automatically record your IP address, device type, operating system version, App version, and the date and time of each request. We use this data only for security monitoring and troubleshooting. We do not use it for advertising, analytics profiling, or any purpose unrelated to running the service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* 3. How we use */}
                <div id="how-we-use">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-400" />
                    3. How we use your information
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-4`}>We use the information we collect to:</p>
                  <ul className="space-y-2 text-slate-400 text-sm list-disc list-inside">
                    <li>Verify your identity when you log in</li>
                    <li>Display school notices, circulars, homework, attendance records, fee details, and other content that your school has authorised you to see</li>
                    <li>Deliver messages between parents and teachers</li>
                    <li>Send push notifications from your school</li>
                    <li>Send OTP SMS messages to authenticate you</li>
                    <li>Maintain the security of your account and our platform</li>
                    <li>Provide customer support when you contact us</li>
                    <li>Meet our legal obligations under Indian law</li>
                  </ul>
                  <p className={`${marketingTheme.type.body} mt-4`}>
                    We do not use your information for advertising, behavioural profiling, or any commercial purpose beyond operating the EdDesk platform for schools.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 4. Consent */}
                <div id="consent">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    4. Consent and the basis for using your information
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-4`}>
                    We process your personal data under the following bases:
                  </p>
                  <ul className="space-y-3 text-slate-400 text-sm list-disc list-inside">
                    <li>
                      <span className="text-white font-medium">Contract performance:</span> we need your mobile number and account information to provide the App service that your school has contracted with us to deliver to parents.
                    </li>
                    <li>
                      <span className="text-white font-medium">Legitimate interests:</span> we store log data and security information to protect the platform and your account from unauthorised access.
                    </li>
                    <li>
                      <span className="text-white font-medium">Consent:</span> you give consent when you download the App and accept the notification permission prompt. You can withdraw consent for push notifications at any time in your device&apos;s system settings.
                    </li>
                  </ul>
                </div>

                <div className="border-t border-white/10" />

                {/* 5. Sharing */}
                <div id="sharing">
                  <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-purple-400" />
                    5. Who we share information with
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-6`}>
                    We do not sell, rent, or trade your personal data. We share data only with the following sub-processors and only to operate the App:
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-sm text-slate-400">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left p-4 text-white font-semibold">Sub-processor / Who</th>
                          <th className="text-left p-4 text-white font-semibold">What data</th>
                          <th className="text-left p-4 text-white font-semibold">Why</th>
                          <th className="text-left p-4 text-white font-semibold">Where</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="p-4">Amazon Web Services (AWS)</td>
                          <td className="p-4">All App data</td>
                          <td className="p-4">Cloud hosting and storage</td>
                          <td className="p-4">Mumbai, India (ap-south-1)</td>
                        </tr>
                        <tr>
                          <td className="p-4">Google Firebase Cloud Messaging</td>
                          <td className="p-4">Device FCM token</td>
                          <td className="p-4">Deliver push notifications</td>
                          <td className="p-4">Google data centres</td>
                        </tr>
                        <tr>
                          <td className="p-4">TRAI-registered telecom operators (Airtel, Jio, Vodafone Idea, BSNL)</td>
                          <td className="p-4">Mobile number, OTP text</td>
                          <td className="p-4">SMS OTP delivery</td>
                          <td className="p-4">India</td>
                        </tr>
                        <tr>
                          <td className="p-4">Your school&apos;s administrator</td>
                          <td className="p-4">Your account profile, messages</td>
                          <td className="p-4">The school manages parent accounts and reads messages as the data controller for school content</td>
                          <td className="p-4">India (school premises or remote)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* 6. Permissions */}
                <div id="permissions">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-purple-400" />
                    6. Permissions the app asks for
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-5`}>The App requests the following device permissions:</p>
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Push notifications',
                        why: 'To receive school announcements and updates. You can deny this permission; you will still be able to use all other App features.',
                      },
                      {
                        name: 'Camera and photo library (optional)',
                        why: 'Only if you choose to send a photo as a message attachment. The App does not access your camera or photos without your explicit action.',
                      },
                      {
                        name: 'File storage (Android)',
                        why: 'To allow you to attach documents from your device to messages.',
                      },
                    ].map((p) => (
                      <div key={p.name} className="bg-white/5 rounded-xl p-5">
                        <p className="text-white font-semibold text-sm mb-1">{p.name}</p>
                        <p className="text-slate-400 text-sm">{p.why}</p>
                      </div>
                    ))}
                  </div>
                  <p className={`${marketingTheme.type.body} mt-5`}>
                    The App does not request access to your location, contacts, microphone, call logs, or any other sensitive permission not listed above.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 7. Devices and login */}
                <div id="devices-and-login">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Lock className="w-5 h-5 text-purple-400" />
                    7. Your phone and your login
                  </h2>
                  <ul className="space-y-3 text-slate-400 text-sm list-disc list-inside">
                    <li>Your account may be active on a maximum of <span className="text-white font-medium">2 devices</span> at the same time. If you log in on a third device, the oldest session is automatically logged out.</li>
                    <li>Sessions expire automatically after <span className="text-white font-medium">30 days of inactivity</span>. You will need to enter a new OTP to log back in.</li>
                    <li>You can log out manually at any time from the App&apos;s settings screen. Logging out removes the session token from your device and from our servers.</li>
                  </ul>
                </div>

                <div className="border-t border-white/10" />

                {/* 8. Security */}
                <div id="security">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    8. How we keep your information safe
                  </h2>
                  <ul className="space-y-3 text-slate-400 text-sm list-disc list-inside">
                    <li>All data is transmitted over HTTPS/TLS encrypted connections.</li>
                    <li>Data at rest is stored on AWS infrastructure in the Mumbai (ap-south-1) region, with encryption enabled.</li>
                    <li>Access to production systems is restricted to authorised SAC Globe Tech engineers and is protected by multi-factor authentication.</li>
                    <li>We do not store OTPs after verification; they are single-use and expire after 10 minutes.</li>
                  </ul>
                  <p className={`${marketingTheme.type.body} mt-4`}>
                    No digital system can guarantee absolute security. If you believe your account has been compromised, please contact us immediately at{' '}
                    <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline">support@eddesk.in</a>.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 9. Retention */}
                <div id="retention">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Database className="w-5 h-5 text-purple-400" />
                    9. How long we keep your information
                  </h2>
                  <ul className="space-y-3 text-slate-400 text-sm list-disc list-inside">
                    <li>Your account and associated data are kept for as long as your school&apos;s subscription to EdDesk is active.</li>
                    <li>When a school ends its subscription, the school&apos;s data (including parent accounts) is deleted from our servers within <span className="text-white font-medium">90 days</span>.</li>
                    <li>Log and security data are retained for up to <span className="text-white font-medium">12 months</span> and then deleted.</li>
                    <li>You may request deletion of your personal data at any time (see Section 11). We will action your request within <span className="text-white font-medium">30 days</span> unless we are required by law to retain certain records.</li>
                  </ul>
                </div>

                <div className="border-t border-white/10" />

                {/* 10. Children */}
                <div id="children">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-400" />
                    10. Children&apos;s information
                  </h2>
                  <p className={marketingTheme.type.body}>
                    The App is designed for parents and guardians who are adults (18 years or older). We do not knowingly collect personal information directly from children under 18. Children&apos;s names and class information are stored because they are associated with a parent&apos;s account, as provided by the school&apos;s administrator. If you believe a child&apos;s data has been collected without appropriate authorisation, please contact your school or contact us at{' '}
                    <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline">support@eddesk.in</a>.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 11. Your rights */}
                <div id="your-rights">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-400" />
                    11. Your rights and how to delete your account
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-4`}>You have the right to:</p>
                  <ul className="space-y-2 text-slate-400 text-sm list-disc list-inside mb-5">
                    <li><span className="text-white font-medium">Access</span> the personal data we hold about you</li>
                    <li><span className="text-white font-medium">Correct</span> inaccurate data (please contact your school&apos;s administrator to update your name or mobile number)</li>
                    <li><span className="text-white font-medium">Delete</span> your account and personal data</li>
                    <li><span className="text-white font-medium">Object</span> to or restrict processing in certain circumstances</li>
                    <li><span className="text-white font-medium">Lodge a complaint</span> with the relevant data-protection authority in India</li>
                  </ul>
                  <p className={marketingTheme.type.body}>
                    To delete your account and data, visit{' '}
                    <a href="/delete-account" className="text-purple-400 hover:underline">eddesk.in/delete-account</a>{' '}
                    or e-mail{' '}
                    <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline">support@eddesk.in</a>{' '}
                    with the subject line &quot;Delete my EdDesk Connect account&quot;. We will confirm deletion within 30 days. Note that your school&apos;s administrator may need to remove your account from the school&apos;s roster as well.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 12. Third-party links */}
                <div id="third-party-links">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    12. Links to other websites
                  </h2>
                  <p className={marketingTheme.type.body}>
                    School administrators may share links to external websites in notices or messages. EdDesk is not responsible for the privacy practices or content of those websites. We encourage you to read the privacy policy of any external site you visit.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 13. Data location */}
                <div id="data-location">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-400" />
                    13. Where your information is processed
                  </h2>
                  <p className={marketingTheme.type.body}>
                    All App data is stored and processed on AWS servers in the Mumbai, India (ap-south-1) region. Push notification tokens pass through Google Firebase Cloud Messaging servers, which may be located outside India. OTP SMS messages are delivered by TRAI-registered operators within India. By using the App you consent to this processing.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 14. Changes */}
                <div id="changes">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Bell className="w-5 h-5 text-purple-400" />
                    14. Changes to this policy
                  </h2>
                  <p className={marketingTheme.type.body}>
                    We may update this Privacy Policy from time to time. When we make a significant change we will notify you via a push notification or an in-app message, and we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the App after the effective date of any change constitutes your acceptance of the revised policy.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 15. Contact */}
                <div id="contact">
                  <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    15. Contact us and grievances
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-6`}>
                    For questions, requests, or grievances relating to this Privacy Policy or your personal data, please contact our Grievance Officer:
                  </p>
                  <div className="bg-indigo-500/5 border border-indigo-500/10 p-8 rounded-2xl">
                    <p className="font-bold text-white mb-5">SAC Globe Tech – EdDesk</p>
                    <div className={`${marketingTheme.type.body} space-y-4`}>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📍</span>
                        <span>Tamil Nadu, India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <a
                          href="mailto:support@eddesk.in"
                          className="hover:text-purple-400 transition-colors"
                        >
                          support@eddesk.in
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <a
                          href="tel:+918122333929"
                          className="hover:text-purple-400 transition-colors"
                        >
                          +91 81223 33929
                        </a>
                      </div>
                    </div>
                    <p className={`${marketingTheme.type.body} mt-5 text-sm`}>
                      We will respond to all data-related requests within <span className="text-white font-medium">30 days</span> of receipt.
                    </p>
                  </div>
                </div>

              </div>

              {/* Back to top */}
              <div className="text-center pt-4">
                <a
                  href="#"
                  className="text-sm text-slate-500 hover:text-purple-400 transition-colors"
                >
                  ↑ Back to top
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
