import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
    weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: ["300", "400", "500", "600", "700"],
});

const crimsonPro = Crimson_Pro({
    subsets: ["latin"],
    variable: "--font-crimson-pro",
    weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://www.eddesk.in'),
    title: {
        template: '%s | EdDesk',
        default: 'EdDesk | Next-Gen School Management System & Websites',
    },
    description: "EdDesk provides professional school websites and a powerful admin panel to manage admissions, academics, and communication. Launch your institution's digital presence in days.",
    keywords: [
        'School Management System',
        'School ERP India',
        'School Website Builder',
        'Educational Institution Software',
        'Admin Panel for Schools',
        'School Admission Management',
        'Bespoke School Websites'
    ],
    authors: [{ name: 'EdDesk Team', url: 'https://www.eddesk.in' }],
    creator: 'EdDesk',
    publisher: 'EdDesk',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: [
            { url: '/assets/images/icon.png', type: 'image/png' },
        ],
        apple: '/assets/images/icon.png',
    },
    openGraph: {
        title: 'EdDesk | Next-Gen School Management System',
        description: 'Empowering schools with state-of-the-art digital presence and management tools.',
        url: 'https://www.eddesk.in',
        siteName: 'EdDesk',
        images: [
            {
                url: '/assets/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'EdDesk School Management System',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'EdDesk | School Management Reinvented',
        description: 'Next-gen school websites and management solutions for modern institutions.',
        images: ['/assets/images/og-image.png'],
    },
    category: 'SaaS',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${crimsonPro.variable} antialiased`}
                suppressHydrationWarning
            >
                <div id="eddesk-app">
                    <JsonLd
                        data={{
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "EdDesk",
                            "url": "https://www.eddesk.in",
                            "logo": "https://www.eddesk.in/assets/images/icon.png",
                            "description": "Next-gen school management system and professional website ecosystem for educational institutions.",
                            "parentOrganization": {
                                "@type": "Organization",
                                "name": "SAC Globe Tech",
                                "url": "https://tech.sacglobe.com"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+91 70107 79096",
                                "contactType": "customer service",
                                "areaServed": "IN",
                                "availableLanguage": "en"
                            }
                        }}
                    />
                    {children}
                </div>
            </body>
        </html>
    );
}
