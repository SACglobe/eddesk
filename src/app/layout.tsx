import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Crimson_Pro } from "next/font/google";
import "./globals.css";

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
        default: 'EdDesk | Revolutionizing School Management',
    },
    description: "Revolutionizing School Management with EdDesk. Empowering educational institutions with state-of-the-art digital presence.",
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/icon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        title: 'EdDesk | Revolutionizing School Management',
        description: 'Empowering educational institutions with state-of-the-art digital presence.',
        url: 'https://www.eddesk.in',
        siteName: 'EdDesk',
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'EdDesk | School Management Reinvented',
        description: 'Next-gen school websites and management solutions.',
    },
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
                    {children}
                </div>
            </body>
        </html>
    );
}
