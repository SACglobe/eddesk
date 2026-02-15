import type { Config } from "tailwindcss";

const config: Config = {
    important: '#eddesk-app',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
                display: ['var(--font-space-grotesk)', 'sans-serif'],
                serif: ['var(--font-crimson-pro)', 'serif'],
                'playfair': ['var(--font-playfair)', 'serif'],
            },
            colors: {
                'signature': {
                    'navy': '#0F172A',
                    'gold': '#D4AF37',
                    'ivory': '#FCFCFA',
                }
            },
            animation: {
                blob: "blob 7s infinite alternate",
                marquee: "marquee 40s linear infinite",
                float: "float 6s ease-in-out infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
