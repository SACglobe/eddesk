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

export * from './template.config';

export const Renderer = ({ data, path }: { data: any, path: string }) => {
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
                return <HomeScreen
                    data={data}
                    statsEnabled={statsEnabled}
                    statistics={statistics}
                    facultyEnabled={facultyEnabled}
                    faculty={faculty}
                    achievementsEnabled={achievementsEnabled}
                    sportsAchievements={sportsAchievements}
                />;
            case '/about':
                return <AboutScreen />;
            case '/admission':
            case '/admissions':
                return <AdmissionScreen />;
            case '/contact':
                return <ContactScreen />;
            case '/broadcast':
            case '/events':
                return <BroadcastScreen />;
            default:
                return <HomeScreen
                    data={data}
                    statsEnabled={statsEnabled}
                    statistics={statistics}
                    facultyEnabled={facultyEnabled}
                    faculty={faculty}
                    achievementsEnabled={achievementsEnabled}
                    sportsAchievements={sportsAchievements}
                />;
        }
    };

    const announcementsEnabled = (data?.homepageSections ?? [])
        .find((s: any) => s.sectionKey === 'announcements')
        ?.isEnabled ?? true;
    const now = new Date();
    const activeAnnouncements = (data?.announcements ?? []).filter((a: any) =>
        a.isActive &&
        (a.expiresAt == null || new Date(a.expiresAt) > now)
    );

    const statsEnabled = (data?.homepageSections ?? [])
        .find((s: any) => s.sectionKey === 'stats')
        ?.isEnabled ?? true;
    const statistics = (data?.statistics ?? [])
        .sort((a, b) => a.displayOrder - b.displayOrder);

    const achievementsEnabled = (data?.homepageSections ?? [])
        .find((s: any) => s.sectionKey === 'achievements')
        ?.isEnabled ?? true;
    const sportsAchievements = (data?.achievements ?? [])
        .filter((a: any) => a.achievementType === 'sports')
        .sort((a: any, b: any) => a.displayOrder - b.displayOrder);

    const facultySection = (data?.homepageSections ?? [])
        .find((s: any) => s.sectionKey === 'faculty');
    const facultyEnabled = facultySection?.isEnabled ?? true;
    const faculty = (data?.personnel ?? [])
        .filter((p: any) => p.personType === 'faculty')
        .sort((a: any, b: any) => a.displayOrder - b.displayOrder);

    return (
        <div className="classic-template-wrapper">
            <div className="sticky top-0 z-50">
                <Header />
                {announcementsEnabled && activeAnnouncements.length > 0 && (
                    <BroadcastTicker announcements={activeAnnouncements} />
                )}
            </div>
            <main>
                {renderScreen()}
            </main>
            <Footer />
        </div>
    );
};
