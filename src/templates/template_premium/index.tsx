"use client";

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
import Gallery from './app/gallery/page';
import { Header, Footer } from './components/Navigation';
import './app/globals.css';

import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

export * from './template.config';

export const Renderer = ({ data, path }: { data: TenantViewModel, path?: string }) => {
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
            case '/': {
                const Screen = Home as any;
                return <Screen data={data} />;
            }
            case '/about': {
                const Screen = About as any;
                return <Screen data={data} />;
            }
            case '/academics': {
                const Screen = Academics as any;
                return <Screen data={data} />;
            }
            case '/activities': {
                const Screen = Activities as any;
                return <Screen data={data} />;
            }
            case '/admissions': {
                const Screen = Admissions as any;
                return <Screen data={data} />;
            }
            case '/contact': {
                const Screen = Contact as any;
                return <Screen data={data} />;
            }
            case '/events': {
                const Screen = Events as any;
                return <Screen data={data} />;
            }
            case '/faculty': {
                const Screen = Faculty as any;
                return <Screen data={data} />;
            }
            case '/infrastructure': {
                const Screen = Infrastructure as any;
                return <Screen data={data} />;
            }
            case '/portrait':
            case '/gallery': {
                const Screen = Gallery as any;
                return <Screen data={data} />;
            }
            default: {
                const Screen = Home as any;
                return <Screen data={data} />;
            }
        }
    };

    const getComponent = (code: string) => {
        return data?.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    const announcementsComp = getComponent('broadcast') || getComponent('announcements');
    const announcementsEnabled = announcementsComp?.isActive ?? true;
    const now = new Date();
    const activeAnnouncements = announcementsEnabled
        ? (data?.broadcast ?? []).filter((a: any) =>
            a.isActive &&
            (!a.expiresAt || a.expiresAt === '' || new Date(a.expiresAt.endsWith('Z') ? a.expiresAt : `${a.expiresAt}Z`) > now)
        )
        : [];

    return (
        <div className="premium-template-wrapper antialiased bg-white min-h-screen flex flex-col">
            <Header announcements={activeAnnouncements} school={data.school} activePath={path} />
            <main className="flex-grow">
                {renderScreen()}
            </main>
            <Footer school={data.school} />
        </div>
    );
};
