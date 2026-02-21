// src/templates/template_classic/index.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import AdmissionScreen from './screens/AdmissionScreen';
import ContactScreen from './screens/ContactScreen';
import BroadcastScreen from './screens/BroadcastScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import BroadcastTicker from './components/BroadcastTicker';
import './app/globals.css';

import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

export * from './template.config';

export const Renderer = ({ data, path }: { data: TenantViewModel, path?: string }) => {
    const router = useRouter();

    // Intercept navigation to absolute paths within the template
    useEffect(() => {
        const handleNavigation = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('a');
            if (target && target.getAttribute('href')?.startsWith('/')) {
                const href = target.getAttribute('href');
                if (href && !href.startsWith('/demo/template_classic')) {
                    e.preventDefault();
                    router.push(`/demo/template_classic${href === '/' ? '' : href}`);
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
                return <HomeScreen data={data} />;
            case '/about':
                return <AboutScreen data={data} />;
            case '/admission':
            case '/admissions':
                return <AdmissionScreen data={data} />;
            case '/contact':
                return <ContactScreen data={data} />;
            case '/notices':
            case '/broadcast':
                return <BroadcastScreen data={data} />;
            default:
                return <HomeScreen data={data} />;
        }
    };

    const announcementsEnabled = (data?.homepageSections ?? [])
        .find((s: any) => s.sectionKey === 'announcements')
        ?.isEnabled ?? true;
    const now = new Date();
    const activeAnnouncements = announcementsEnabled
        ? (data?.announcements ?? []).filter((a: any) =>
            a.isActive &&
            (a.expiresAt == null || new Date(a.expiresAt) > now)
        )
        : [];

    return (
        <div className="classic-template-wrapper">
            <div className="sticky top-0 z-[100] bg-white">
                <Header />
                <BroadcastTicker announcements={activeAnnouncements} />
            </div>
            <main>
                {renderScreen()}
            </main>
            <Footer />
        </div>
    );
};
