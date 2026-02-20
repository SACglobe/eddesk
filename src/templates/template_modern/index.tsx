// src/templates/template_modern/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Home from './app/page';
import About from './app/about/page';
import Admissions from './app/admissions/page';
import Contact from './app/contact/page';
import Broadcast from './app/events/page';
import Gallery from './app/gallery/page';
import Academics from './app/academics/page';
import Activities from './app/activities/page';
import Infrastructure from './app/infrastructure/page';
import Faculty from './app/faculty/page';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './app/globals.css';

export * from './template.config';

export const Renderer = ({ data, path }: { data: any, path: string }) => {
    const router = useRouter();

    // Intercept navigation to absolute paths within the template
    useEffect(() => {
        const handleNavigation = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (target && target.getAttribute('href')?.startsWith('/')) {
                const href = target.getAttribute('href');
                if (href && !href.startsWith('/demo/template_modern')) {
                    e.preventDefault();
                    router.push(`/demo/template_modern${href === '/' ? '' : href}`);
                }
            }
        };

        document.addEventListener('click', handleNavigation);
        return () => document.removeEventListener('click', handleNavigation);
    }, [router]);

    const renderScreen = () => {
        const normalizedPath = path === '' || path === '/' ? '/' : path;

        switch (normalizedPath) {
            case '/':
                return <Home data={data} />;
            case '/about':
                return <About />;
            case '/admissions':
                return <Admissions />;
            case '/contact':
                return <Contact />;
            case '/events':
                return <Broadcast />;
            case '/gallery':
                return <Gallery />;
            case '/academics':
                return <Academics />;
            case '/activities':
                return <Activities />;
            case '/infrastructure':
                return <Infrastructure />;
            case '/faculty':
                return <Faculty />;
            default:
                return <Home data={data} />;
        }
    };

    return (
        <div className="modern-template-wrapper antialiased bg-white min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {renderScreen()}
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};
