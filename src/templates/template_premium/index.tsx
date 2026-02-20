
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Home from './app/page';
import About from './app/about/page';
import Academics from './app/academics/page';
import Activities from './app/activities/page';
import Admissions from './app/admissions/page';
import Contact from './app/contact/page';
import Events from './app/events/page';
import Faculty from './app/faculty/page';
import Infrastructure from './app/infrastructure/page';
import Portrait from './app/portrait/page';
import { Header, Footer } from './components/Navigation';
import './app/globals.css';

export * from './template.config';

export const Renderer = ({ data, path }: { data: any, path: string }) => {
    const router = useRouter();

    // Inject fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    // Intercept navigation to absolute paths within the template
    useEffect(() => {
        const handleNavigation = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (target && target.getAttribute('href')?.startsWith('/')) {
                const href = target.getAttribute('href');
                if (href && !href.startsWith('/demo/template_premium')) {
                    e.preventDefault();
                    router.push(`/demo/template_premium${href === '/' ? '' : href}`);
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
            case '/academics':
                return <Academics />;
            case '/activities':
                return <Activities />;
            case '/admissions':
                return <Admissions />;
            case '/contact':
                return <Contact />;
            case '/events':
                return <Events />;
            case '/faculty':
                return <Faculty />;
            case '/infrastructure':
                return <Infrastructure />;
            case '/portrait':
                return <Portrait />;
            default:
                return <Home data={data} />;
        }
    };

    return (
        <div className="premium-template-wrapper antialiased bg-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {renderScreen()}
            </main>
            <Footer />
        </div>
    );
};
