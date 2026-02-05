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
    title: "EdDesk | Revolutionizing School Management",
    description: "Revolutionizing School Management with EdDesk",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${crimsonPro.variable} antialiased`}
            >
                <div id="eddesk-app">
                    {children}
                </div>
            </body>
        </html>
    );
}
