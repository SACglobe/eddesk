import type { Config } from "tailwindcss";

const config: Config = {
    important: '#eddesk-app',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
                display: ['var(--font-space-grotesk)', 'sans-serif'],
                serif: ['var(--font-crimson-pro)', 'serif'],
            },
            animation: {
                blob: "blob 7s infinite alternate",
            },
            keyframes: {
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
