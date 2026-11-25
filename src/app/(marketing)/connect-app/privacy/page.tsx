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
  title: 'Privacy Policy | EdDesk Connect Parent App',
  description:
    'How the EdDesk Connect parent and guardian app collects, uses, shares and protects information, and how to ask for your data to be deleted.',
  alternates: { canonical: 'https://www.eddesk.in/connect-app/privacy' },
  openGraph: {
    title: 'Privacy Policy | EdDesk Connect Parent App',
    description:
      'How the EdDesk Connect parent and guardian app collects, uses, shares and protects information, and how to ask for your data to be deleted.',
    url: 'https://www.eddesk.in/connect-app/privacy',
    siteName: 'EdDesk',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EdDesk Connect Parent App Privacy Policy',
      },
    ],
  },
};

export default function ConnectAppPrivacyPage() {
  return (
    <div className="pt-20 font-sans">
      <section className={mSection}>
        <div className={mContainer}>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <span className={mLabel}>Parent App · SAC Globe Tech (EdDesk)</span>
            <h1 className={`${mDisplay} text-3xl sm:text-5xl mt-6 mb-4 text-white`}>
              EdDesk Connect Parent App<br />Privacy Policy
            </h1>
            <p className="text-slate-400 text-sm mb-12">
              Effective date: 25 November 2026 &nbsp;|&nbsp; Last updated: 25 November 2026
            </p>

            <div className="space-y-14">

              {/* Introduction */}
              <div className="space-y-5">
                <p className={marketingTheme.type.bodyLg}>
                  This Privacy Policy describes how SAC Globe Tech (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), trading as EdDesk, collects, uses, shares and protects information when you use the EdDesk Connect mobile application (&quot;the App&quot;) on Android or iOS. The App is designed for parents and guardians of students enrolled in schools that subscribe to the EdDesk school-management platform.
                </p>
                <p className={marketingTheme.type.body}>
                  Schools that subscribe to EdDesk may publish the App under their own school brand name (for example &quot;Sunrise Academy Parent App&quot;). Regardless of the name shown on your phone, this policy applies to all versions of the App.
                </p>
                <p className={marketingTheme.type.body}>
                  By entering the one-time password (OTP) sent to your registered mobile number and signing in, you confirm that you are your child&apos;s parent or guardian registered with the school, and you agree to this Privacy Policy. You can withdraw your consent at any time by logging out and asking us to delete your account (see{' '}
                  <a href="#delete-account" className="text-purple-400 hover:underline">Deleting your account</a>). If you do not agree, please do not sign in and contact your school to arrange an alternative way to receive updates.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-slate-900/30 border border-white/5 p-6 sm:p-8 rounded-[32px]">
                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>Contents</span>
                </h2>
                <ol className="space-y-2 text-sm text-slate-400 list-none">
                  {[
                    ['who-we-are', 'Who we are and who is responsible for your data'],
                    ['information-we-collect', 'Information we collect'],
                    ['how-we-use', 'How we use your information'],
                    ['consent', 'Consent and how to withdraw it'],
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
              <div className="bg-slate-900/30 border border-white/5 p-6 sm:p-10 rounded-[32px] space-y-12">

                {/* 1. Who we are */}
                <div id="who-we-are" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>1. Who we are and who is responsible for your data</span>
                  </h2>
                  <p className={marketingTheme.type.body}>
                    Your child&apos;s school decides why and how your child&apos;s information is used. Under India&apos;s Digital Personal Data Protection Act, 2023 the school is the Data Fiduciary. EdDesk, a product of SAC Globe Tech, provides the app to the school and processes the information on the school&apos;s behalf as its Data Processor. For anything about your child&apos;s school records, contact the school first. For app, account or privacy questions, contact us at{' '}
                    <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline">support@eddesk.in</a>.
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
                <div id="information-we-collect" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-start sm:items-center gap-3">
                    <Database className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>2. Information we collect</span>
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.1 Account and school information</h3>
                      <p className={marketingTheme.type.body}>
                        When your school sets up your parent account, your mobile number and your child&apos;s name and class are stored in EdDesk. You do not register directly with SAC Globe Tech; your school&apos;s administrator creates and manages your account.
                      </p>
                      <p className={`${marketingTheme.type.body} mt-3`}>
                        The app shows your child&apos;s homework, exam results and class rank, as provided by the school. It also displays school notices and circulars published by your school.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.2 Authentication data</h3>
                      <p className={marketingTheme.type.body}>
                        We use your mobile number to send a one-time password (OTP) each time you sign in. Your one-time password (OTP) is valid for 10 minutes. It is held only temporarily by Amazon Cognito while you sign in and is not stored in our database. We store a secure session token on your phone so you do not need to enter your OTP every time you open the App.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.3 Requests and attachments</h3>
                      <p className={marketingTheme.type.body}>
                        You can send requests to your child&apos;s school through the app and attach files to them. The school&apos;s staff can reply to your request. We store your request text and any files you choose to attach so the school&apos;s staff can read and reply to your request. EdDesk (SAC Globe Tech) does not read request contents except as needed to operate the service or to investigate a reported safety or support issue.
                      </p>
                      <ul className="mt-3 space-y-1 text-slate-400 text-sm list-disc list-inside">
                        <li>Maximum 5 attachments per request</li>
                        <li>Maximum 5 MB per attachment</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.4 Push-notification tokens</h3>
                      <p className={marketingTheme.type.body}>
                        The app sends push notifications about your child&apos;s school updates. You can turn them off in your phone&apos;s settings. To send them, we store a notification token for each phone you are signed in on; it is deleted when you log out. These notifications cover updates such as school notices, circulars, homework reminders, and replies to your requests. The Firebase Cloud Messaging (FCM) token updates automatically if you reinstall the App or switch phones.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2.5 Device and technical log data</h3>
                      <p className={marketingTheme.type.body}>
                        We record a device identifier, the phone model, the app version, when the app was last opened, and the app versions used on that phone. We use this to keep your account secure, enforce the 2-phone limit and send notifications to the right phone.
                      </p>
                      <p className={`${marketingTheme.type.body} mt-3`}>
                        Separately, our servers automatically record technical logs including your IP address, operating system version, and request timestamps. We use these technical logs only for security monitoring and troubleshooting. We do not use them for advertising, analytics tools, or any purpose unrelated to running the service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* 3. How we use */}
                <div id="how-we-use" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>3. How we use your information</span>
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-4`}>We use the information we collect to:</p>
                  <ul className="space-y-2 text-slate-400 text-sm list-disc list-inside">
                    <li>Verify your identity when you sign in using an OTP</li>
                    <li>Display school notices and circulars. The app shows your child&apos;s homework, exam results and class rank, as provided by the school.</li>
                    <li>Send your requests and attached files to your child&apos;s school and display replies from the school&apos;s staff</li>
                    <li>Send push notifications about your child&apos;s school updates (you can turn them off in your phone&apos;s settings)</li>
                    <li>Send one-time password (OTP) SMS to authenticate you</li>
                    <li>Enforce the 2-phone limit and maintain the security of your account and our platform</li>
                    <li>Provide customer support and investigate reported safety or support issues when you contact us</li>
                    <li>Meet our legal obligations under Indian law</li>
                  </ul>
                  <p className={`${marketingTheme.type.body} mt-4`}>
                    We do not sell your information and we do not use advertising or analytics tools in the app. We do not use your information for behavioural profiling or any commercial purpose beyond operating the EdDesk platform for schools.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 4. Consent */}
                <div id="consent" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>4. Consent and how to withdraw it</span>
                  </h2>
                  <p className={marketingTheme.type.body}>
                    By entering the one-time password (OTP) sent to your registered mobile number and signing in, you confirm that you are your child&apos;s parent or guardian registered with the school, and you agree to this Privacy Policy. You can withdraw your consent at any time by logging out and asking us to delete your account (see{' '}
                    <a href="#delete-account" className="text-purple-400 hover:underline">Deleting your account</a>).
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 5. Sharing */}
                <div id="sharing" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-start sm:items-center gap-3">
                    <Share2 className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>5. Who we share information with</span>
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-6`}>
                    We do not sell your information and we do not use advertising or analytics tools in the app. We share information only with the service providers listed below, and only to operate the App:
                  </p>
                  <div className="rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-sm text-slate-400">
                      <thead className="hidden sm:table-header-group">
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left p-4 text-white font-semibold">Provider</th>
                          <th className="text-left p-4 text-white font-semibold">What it does</th>
                          <th className="text-left p-4 text-white font-semibold">Information involved</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 sm:divide-white/5">
                        {[
                          {
                            provider: 'Amazon Cognito (AWS)',
                            what: 'Signs you in with your OTP',
                            info: 'Your registered mobile number',
                          },
                          {
                            provider:
                              'AWS SMS service (routed via TRAI-registered Indian telecom operators: Airtel, Jio, Vodafone Idea, BSNL)',
                            what: 'Sends the OTP text message',
                            info: 'Your registered mobile number',
                          },
                          {
                            provider: 'Amazon Web Services, Mumbai region (ap-south-1)',
                            what: "Hosts the app's servers and database",
                            info: 'All information in the app',
                          },
                          {
                            provider: 'Google Firebase Cloud Messaging',
                            what: 'Delivers push notifications',
                            info: 'A notification token for your phone',
                          },
                        ].map((row) => (
                          <tr
                            key={row.provider}
                            className="block sm:table-row p-4 sm:p-0 space-y-2 sm:space-y-0"
                          >
                            <td className="block sm:table-cell sm:p-4 font-semibold sm:font-normal text-white sm:text-slate-300 break-words">
                              <span className="block text-[11px] uppercase tracking-wider text-slate-500 sm:hidden mb-0.5">
                                Provider
                              </span>
                              {row.provider}
                            </td>
                            <td className="block sm:table-cell sm:p-4 break-words">
                              <span className="block text-[11px] uppercase tracking-wider text-slate-500 sm:hidden mb-0.5">
                                What it does
                              </span>
                              {row.what}
                            </td>
                            <td className="block sm:table-cell sm:p-4 break-words">
                              <span className="block text-[11px] uppercase tracking-wider text-slate-500 sm:hidden mb-0.5">
                                Information involved
                              </span>
                              {row.info}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-5">
                    <p className="text-white font-semibold text-sm mb-1">
                      Your child&apos;s school (Data Fiduciary)
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Your school is not a vendor or service provider to EdDesk — it is the Data Fiduciary responsible for your child&apos;s school records. Authorised school staff and administrators access your account profile and the requests and attachments you send through the app so they can manage parent accounts and reply to your requests.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* 6. Permissions */}
                <div id="permissions" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Smartphone className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>6. Permissions the app asks for</span>
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-5`}>The App requests the following device permission:</p>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-5">
                      <p className="text-white font-semibold text-sm mb-1">Push notifications</p>
                      <p className="text-slate-400 text-sm">
                        To send push notifications about your child&apos;s school updates (such as notices, circulars, homework reminders, and replies to your requests). You can turn them off in your phone&apos;s settings; you will still be able to use all other App features.
                      </p>
                    </div>
                  </div>
                  <p className={`${marketingTheme.type.body} mt-5`}>
                    The app does not access your camera or browse your photos. When you attach a file to a request, you pick it using your phone&apos;s file chooser, and the app receives only the file you select. You can attach up to 5 files of up to 5 MB each.
                  </p>
                  <p className={`${marketingTheme.type.body} mt-4`}>
                    The App does not request access to your camera, photo library, device storage browsing, location, contacts, microphone, call logs, or any other sensitive permission not listed above.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 7. Devices and login */}
                <div id="devices-and-login" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Lock className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>7. Your phone and your login</span>
                  </h2>
                  <ul className="space-y-3 text-slate-400 text-sm list-disc list-inside">
                    <li>You can be signed in on up to 2 phones. If you sign in on a third phone, the app asks which existing phone to sign out.</li>
                    <li>Sessions expire automatically after <span className="text-white font-medium">30 days of inactivity</span>. You will need to enter a new OTP to sign back in.</li>
                    <li>You can log out manually at any time from the App&apos;s settings screen. When you log out, this phone is marked as logged out, its push notification token is deleted, and the login session is removed from the phone. We keep a record that the phone was used, for security history.</li>
                  </ul>
                </div>

                <div className="border-t border-white/10" />

                {/* 8. Security */}
                <div id="security" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>8. How we keep your information safe</span>
                  </h2>
                  <ul className="space-y-3 text-slate-400 text-sm list-disc list-inside">
                    <li>All data is transmitted over HTTPS/TLS encrypted connections.</li>
                    <li>Data at rest is stored on AWS infrastructure in the Mumbai (ap-south-1) region, with encryption enabled.</li>
                    <li>Access to our cloud (AWS) console requires multi-factor authentication.</li>
                    <li>Your one-time password (OTP) is valid for 10 minutes. It is held only temporarily by Amazon Cognito while you sign in and is not stored in our database.</li>
                  </ul>
                  <p className={`${marketingTheme.type.body} mt-4`}>
                    No digital system can guarantee absolute security. If you believe your account has been compromised, please contact us immediately at{' '}
                    <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline">support@eddesk.in</a>.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 9. Retention */}
                <div id="retention" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Database className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>9. How long we keep your information</span>
                  </h2>
                  <ul className="space-y-3 text-slate-400 text-sm list-disc list-inside">
                    <li>Your account and associated data are kept for as long as your school&apos;s subscription to EdDesk is active.</li>
                    <li>We keep school data for up to <span className="text-white font-medium">90 days</span> after the school stops using EdDesk and then delete it.</li>
                    <li>We keep technical logs for security and troubleshooting.</li>
                    <li>
                      You may request deletion of your account and personal data at any time (see{' '}
                      <a href="#delete-account" className="text-purple-400 hover:underline">Deleting your account</a>). We reply within <span className="text-white font-medium">30 days</span>. Records the school must keep for its own legal purposes are held by the school, not by us.
                    </li>
                  </ul>
                </div>

                <div className="border-t border-white/10" />

                {/* 10. Children */}
                <div id="children" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Users className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>10. Children&apos;s information</span>
                  </h2>
                  <p className={marketingTheme.type.body}>
                    The App is designed for parents and guardians who are adults (18 years or older). We do not knowingly collect personal information directly from children under 18. Children&apos;s names, class details, and school academic information are shown because they are associated with a parent&apos;s account, as provided by the school. If you believe a child&apos;s data has been collected without appropriate authorisation, please contact your school first or contact us at{' '}
                    <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline">support@eddesk.in</a>.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 11. Your rights */}
                <div id="your-rights" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Eye className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>11. Your rights and how to delete your account</span>
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-4`}>You have the right to:</p>
                  <ul className="space-y-2 text-slate-400 text-sm list-disc list-inside mb-6">
                    <li><span className="text-white font-medium">Access</span> information about the personal data we process for your account</li>
                    <li><span className="text-white font-medium">Correct</span> inaccurate data (please contact your school&apos;s administrator to update your name, mobile number, or your child&apos;s school records)</li>
                    <li><span className="text-white font-medium">Delete</span> your account and personal data</li>
                    <li><span className="text-white font-medium">Withdraw consent</span> at any time by logging out and asking us to delete your account</li>
                    <li><span className="text-white font-medium">Lodge a complaint</span> with our Grievance Officer or the relevant data-protection authority in India</li>
                  </ul>
                  <div id="delete-account" className="pt-6 border-t border-white/10 scroll-mt-28">
                    <h3 className="text-lg font-bold text-white mb-2">Deleting your account</h3>
                    <p className={marketingTheme.type.body}>
                      To delete your account, visit{' '}
                      <a href="https://www.eddesk.in/delete-account" className="text-purple-400 hover:underline [overflow-wrap:anywhere]">https://www.eddesk.in/delete-account</a>{' '}
                      or email{' '}
                      <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline [overflow-wrap:anywhere]">support@eddesk.in</a>{' '}
                      from your registered contact. We reply within 30 days. Records the school must keep for its own legal purposes are held by the school, not by us. We keep school data for up to 90 days after the school stops using EdDesk and then delete it.
                    </p>
                    <p className={`${marketingTheme.type.body} mt-3`}>
                      Note that your school&apos;s administrator may also need to update or remove your contact details from the school&apos;s roster.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10" />

                {/* 12. Third-party links */}
                <div id="third-party-links" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>12. Links to other websites</span>
                  </h2>
                  <p className={marketingTheme.type.body}>
                    School administrators and staff may share links to external websites in notices or replies to requests. EdDesk is not responsible for the privacy practices or content of those websites. We encourage you to read the privacy policy of any external site you visit.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 13. Data location */}
                <div id="data-location" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>13. Where your information is processed</span>
                  </h2>
                  <p className={marketingTheme.type.body}>
                    The App&apos;s servers and database are hosted on Amazon Web Services (AWS) in the Mumbai, India (ap-south-1) region. Sign-in OTPs are held temporarily by Amazon Cognito (AWS) and delivered via AWS SMS service routed through TRAI-registered telecom operators within India. Push notifications and notification tokens pass through Google Firebase Cloud Messaging servers, which may be located outside India.
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 14. Changes */}
                <div id="changes" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Bell className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>14. Changes to this policy</span>
                  </h2>
                  <p className={marketingTheme.type.body}>
                    We may update this Privacy Policy from time to time. When we make a significant change we will notify you via a push notification or a notice in the App, and we will update the &quot;Last updated&quot; date at the top of this page. If you do not agree with an updated policy, you may log out and ask us to delete your account (see{' '}
                    <a href="#delete-account" className="text-purple-400 hover:underline">Deleting your account</a>).
                  </p>
                </div>

                <div className="border-t border-white/10" />

                {/* 15. Contact */}
                <div id="contact" className="scroll-mt-28">
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-start sm:items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-400 shrink-0 mt-1 sm:mt-0" />
                    <span>15. Contact us and grievances</span>
                  </h2>
                  <p className={`${marketingTheme.type.body} mb-6`}>
                    For questions, requests, or grievances relating to this Privacy Policy or your personal data, please contact our Grievance Officer:
                  </p>
                  <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 sm:p-8 rounded-2xl">
                    <p className="font-bold text-white mb-4">SAC Globe Tech – EdDesk</p>
                    <p className="font-sans text-slate-200 leading-relaxed mb-5">
                      Grievance Officer: Arun, SAC Globe Tech. Email:{' '}
                      <a href="mailto:support@eddesk.in" className="text-purple-400 hover:underline [overflow-wrap:anywhere]">support@eddesk.in</a>. Phone:{' '}
                      <a href="tel:+918122333929" className="text-purple-400 hover:underline whitespace-nowrap">+91 81223 33929</a>. We acknowledge complaints within 48 hours and reply within 30 days.
                    </p>
                    <div className={`${marketingTheme.type.body} space-y-3 text-sm`}>
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📍</span>
                        <span>Tamil Nadu, India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <a
                          href="mailto:support@eddesk.in"
                          className="hover:text-purple-400 transition-colors min-w-0 [overflow-wrap:anywhere]"
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
