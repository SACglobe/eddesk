import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Get Your School Online Today',
  description: 'Schedule a discovery call or demo with the EdDesk team. We help educational institutions establish a premium digital presence and robust management system.',
  alternates: { canonical: 'https://www.eddesk.in/contact' },
  openGraph: {
    title: 'Contact EdDesk | School Management & Website Experts',
    description: 'Get in touch for a demo or support. We provide end-to-end digital solutions for modern schools.',
    url: 'https://www.eddesk.in/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
