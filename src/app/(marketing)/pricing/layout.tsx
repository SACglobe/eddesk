import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans | Affordable School Management System',
  description: 'Flexible pricing for schools of all sizes. Professional school websites, admin panels, and reliable hosting with monthly and annual subscription plans.',
  alternates: { canonical: 'https://www.eddesk.in/pricing' },
  openGraph: {
    title: 'EdDesk Pricing | Affordable School ERP & Website Plans',
    description: 'Professional school websites and management admin panels starting at ₹1,100/month. No hidden fees.',
    url: 'https://www.eddesk.in/pricing',
    type: 'website',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
