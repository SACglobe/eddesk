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
                return <HomeScreen data={data} academicEnabled={academicEnabled} latestResult={latestResult} academicAchievements={academicAchievements} eventsEnabled={eventsEnabled} eventsToShow={eventsToShow} />;
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
                return <HomeScreen data={data} academicEnabled={academicEnabled} latestResult={latestResult} academicAchievements={academicAchievements} eventsEnabled={eventsEnabled} eventsToShow={eventsToShow} />;
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

    const academicEnabled = (data?.homepageSections ?? [])
        .find((s: any) => s.sectionKey === 'academic_results')
        ?.isEnabled ?? true;

    const latestResult = (data?.academicResults ?? [])
        .sort((a, b) => b.year - a.year)[0] ?? null;

    const academicAchievements = (data?.achievements ?? [])
        .filter((a: any) => a.achievementType === 'academic')
        .sort((a: any, b: any) => b.year - a.year || a.displayOrder - b.displayOrder);

    const eventsEnabled = (data?.homepageSections ?? [])
        .find((s: any) => s.sectionKey === 'events')
        ?.isEnabled ?? true;

    const eventsToShow = (data?.events ?? [])
        .filter((e: any) => {
            if (!e.isFeatured) return false;
            const eventDateTime = new Date(`${e.eventDate}T${e.startTime}`);
            return eventDateTime > now;
        })
        .sort((a: any, b: any) =>
            new Date(`${a.eventDate}T${a.startTime}`).getTime() -
            new Date(`${b.eventDate}T${b.startTime}`).getTime()
        )
        .slice(0, 3);

    return (
        <div className="classic-template-wrapper">
            <div className="sticky top-0 z-[100] bg-white">
                <Header school={data.school} />
                <BroadcastTicker announcements={activeAnnouncements} />
            </div>
            <main>
                {renderScreen()}
            </main>
            <Footer school={data.school} />
        </div>
    );
};
