"use client";

import React, { useState, useEffect, useRef } from 'react';
import HeroSlider from '../components/HeroSlider';
import { SCHOOL_NAME, ACTIVITIES, UPCOMING_EVENTS } from '../constants';
import Link from 'next/link';
import type { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';

const highlightImages = [
    "school/image/campus1.png",
    "school/image/campus2.png",
    "school/image/campus3.png",
    "school/image/campus4.png"
];



const sportsAchievements = [
    {
        year: 2023,
        title: "State Chess Champions",
        category: "Chess",
        image: "school/image/sports_chess.png",
        description: "Undefeated run in the regional inter-school tournament."
    },
    {
        year: 2024,
        title: "National Kabadi Gold",
        category: "Kabadi",
        image: "school/image/sports_kabadi.png",
        description: "Setting a new state record in the 4x100m relay event."
    },
    {
        year: 2022,
        title: "Elite Basketball Trophy",
        category: "Basketball",
        image: "school/image/sports_basketball.png",
        description: "Victory in the Annual Metropolitan Schools Invitation."
    },
    {
        year: 2023,
        title: "Track & Field Excellence",
        category: "Athletics",
        image: "school/image/sports_athletics.png",
        description: "Overall champions for 3 consecutive years at the State Meet."
    },
    {
        year: 2024,
        title: "Indoor Cricket Winners",
        category: "Cricket",
        image: "school/image/sports_cricket.png",
        description: "Secured Top 3 positions in both Men's and Women's singles."
    }
];

const infrastructureData = [
    {
        category: "Laboratories",
        icon: "🔬",
        items: ["Physics Lab", "Chemistry Lab", "Biology Lab", "Computer Science Lab"],
        color: "bg-primary"
    },
    {
        category: "Academic Areas",
        icon: "🏢",
        items: ["Smart Classrooms", "AV Room", "Audio-Visual Hall"],
        color: "bg-accent"
    },
    {
        category: "Physical Fitness",
        icon: "⚽",
        items: ["Main Athletic Field", "Indoor Badminton Court", "Basketball Court"],
        color: "bg-blue-600"
    }
];

const AnimatedNumber: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ value, suffix = "", duration = 1500 }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(Math.floor(easedProgress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(value);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, value, duration]);

    return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Home({ data }: { data: TenantViewModel }) {
    const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

    const announcementsEnabled = (data?.homepageSections ?? [])
        .find(s => s.sectionKey === 'announcements')
        ?.isEnabled ?? true;
    const now = new Date();
    const activeAnnouncements = (data?.announcements ?? []).filter(a =>
        a.isActive &&
        (a.expiresAt == null || new Date(a.expiresAt) > now)
    );

    const parseStat = (val: string) => {
        const num = parseInt(val.replace(/[^0-9]/g, '')) || 0;
        const suffix = val.replace(/[0-9]/g, '');
        return { num, suffix };
    };

    const statsEnabled = (data?.homepageSections ?? [])
        .find(s => s.sectionKey === 'stats')
        ?.isEnabled ?? true;
    const statistics = (data?.statistics ?? [])
        .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const ICON_MAP: Record<string, string> = {
        users: '👥',
        graduation: '🎓',
        calendar: '📅',
        map: '🏢',
        trophy: '🏆',
        network: '🌐',
    };
    const getIcon = (name: string) => ICON_MAP[name] ?? '📊';

    const facultySection = (data?.homepageSections ?? [])
        .find(s => s.sectionKey === 'faculty');
    const facultyEnabled = facultySection?.isEnabled ?? true;
    const faculty = (data?.personnel as any[] ?? [])
        .filter((p: any) => p.personType === 'faculty')
        .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
    //
    return (
        <div className="space-y-24 pb-24">
            <HeroSlider slides={data?.heroMedia ?? []} />

            {/* Broadcast Ticker */}
            {announcementsEnabled && activeAnnouncements.length > 0 && (
                <section className="sticky top-20 z-40 flex items-center h-12 overflow-hidden bg-accent shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-y border-yellow-500/20">
                    <div className="absolute left-0 top-0 bottom-0 bg-[#1e293b] text-accent px-6 flex items-center z-30 shadow-[4px_0_15px_rgba(0,0,0,0.3)]">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-40"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                            </span>
                            <span className="font-black uppercase tracking-widest text-[11px] antialiased">Broadcast</span>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center overflow-hidden h-full">
                        <div className="animate-marquee flex items-center ml-48">
                            {[...activeAnnouncements, ...activeAnnouncements, ...activeAnnouncements].map((news, idx) => (
                                <div key={`news-${idx}`} className="flex items-center px-8 whitespace-nowrap group">
                                    <span className="text-[#1e293b] text-sm md:text-base antialiased">
                                        <span className="font-bold">{news.title}:</span> <span className="font-medium opacity-90">{news.message}</span>
                                    </span>
                                    <div className="mx-10 w-2.5 h-2.5 rounded-full bg-blue-700 shadow-[0_0_10px_rgba(29,78,216,0.4)] border border-blue-600"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Institutional Merit & Honors Section */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-5 flex flex-col justify-between py-4 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-8 bg-yellow-500"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40">Institutional Merit</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 leading-tight">Honors & Academic Results</h2>
                            <div className="space-y-1">
                                <h3 className="text-xl font-medium text-primary">Board Results 2023</h3>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Academic Merit Summary</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 py-8 border-y border-gray-100">
                            <div className="flex items-center justify-between group">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Pass Percentage</p>
                                <div className="flex items-center gap-6">
                                    <div className="h-px w-12 bg-gray-100 group-hover:w-24 transition-all duration-500"></div>
                                    <p className="text-4xl font-light text-primary">
                                        <AnimatedNumber value={100} suffix="%" />
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between group">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Distinctions</p>
                                <div className="flex items-center gap-6">
                                    <div className="h-px w-12 bg-gray-100 group-hover:w-24 transition-all duration-500"></div>
                                    <p className="text-4xl font-light text-yellow-600">
                                        <AnimatedNumber value={84} suffix="%" />
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between group">
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">First Class</p>
                                <div className="flex items-center gap-6">
                                    <div className="h-px w-12 bg-gray-100 group-hover:w-24 transition-all duration-500"></div>
                                    <p className="text-4xl font-light text-gray-950">
                                        <AnimatedNumber value={96} suffix="%" />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative p-8 rounded-3xl bg-blue-50/30 border border-blue-50">
                            <span className="absolute -top-4 left-6 text-6xl text-blue-100 font-serif leading-none">“</span>
                            <p className="text-gray-500 leading-relaxed font-medium italic relative z-10">
                                Consistently maintaining a legacy of academic excellence for over 15 consecutive years.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col space-y-12 lg:pl-16 lg:border-l border-gray-100">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-8 bg-primary"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40">Institutional Recognition</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-blue-950 leading-tight">Achievements & Glories</h2>
                        </div>

                        <div className="space-y-10">
                            <div className="group relative grid grid-cols-[80px_1fr] gap-8 p-8 hover:bg-white rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 border border-transparent hover:border-gray-50">
                                <div className="flex flex-col items-center justify-center border-r border-gray-100 group-hover:border-accent-hover transition-colors">
                                    <span className="text-[10px] font-black text-yellow-600 mb-1 tracking-widest">YEAR</span>
                                    <span className="text-3xl font-black text-primary tracking-tighter">
                                        <AnimatedNumber value={2023} duration={1000} />
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-[9px] font-black uppercase tracking-widest">State Recognition</div>
                                    <h4 className="text-2xl font-bold text-blue-950">Best Disciplined School Award</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">Awarded by the State Education Board for excellence in maintaining institutional decorum and student conduct.</p>
                                </div>
                            </div>

                            <div className="group relative grid grid-cols-[80px_1fr] gap-8 p-8 hover:bg-white rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 border border-transparent hover:border-gray-50">
                                <div className="flex flex-col items-center justify-center border-r border-gray-100 group-hover:border-blue-200 transition-colors">
                                    <span className="text-[10px] font-black text-primary/40 mb-1 tracking-widest">YEAR</span>
                                    <span className="text-3xl font-black text-primary/40 tracking-tighter">
                                        <AnimatedNumber value={2022} duration={1000} />
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[9px] font-black uppercase tracking-widest">Board Milestone</div>
                                    <h4 className="text-2xl font-bold text-blue-950">Academic Excellence Trophy</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">Recognized for achieving 100% pass rate in State Board examinations for 15 consecutive years.</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link href="/about" className="flex items-center gap-6 group">
                                    <span className="bg-blue-950 text-white w-12 h-12 flex items-center justify-center rounded-full group-hover:bg-accent group-hover:text-blue-950 transition-all duration-500 shadow-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </span>
                                    <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] border-b border-transparent group-hover:border-accent transition-all pb-1">Know more about our heritage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Message from Our Principal */}
            <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative order-2 lg:order-1 overflow-hidden rounded-[3rem]">
                    <div className="absolute inset-0 bg-accent rounded-[3rem] rotate-3 translate-x-4 translate-y-4"></div>
                    <img
                        src={principal?.photoUrl ?? "school/image/principal.png"}
                        alt="Principal"
                        className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover object-top aspect-[4/5]"
                    />
                    <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-3xl shadow-2xl z-20 max-w-xs hidden md:block">
                        <p className="italic font-serif text-xl">"Nurturing seeds of potential into forests of greatness."</p>
                    </div>
                </div>
                <div className="space-y-8 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        From the Principal's Desk
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-primary leading-[1.1]">Leading with Vision & Integrity</h2>
                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                        "{principal?.bio ?? ''}"
                    </p>
                    <div className="pt-4 border-t-2 border-gray-100">
                        <p className="font-bold text-primary text-2xl mb-1">{principal?.name ?? ''}</p>
                        <p className="text-yellow-600 font-bold uppercase tracking-widest text-sm">{principal?.designation ?? 'Principal'}</p>
                        <Link href="/about" className="mt-8 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-accent hover:text-primary transition-all flex items-center gap-3 group">
                            Read More
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Creative Statistics Section */}
            {statsEnabled && statistics.length > 0 && (
                <section className="bg-primary py-32 relative z-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {statistics.map((stat, i) => {
                                const { num, suffix } = parseStat(stat.value);
                                return (
                                    <div
                                        key={i}
                                        className={`
                    relative group bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                    border-t-[6px] border-accent overflow-hidden transition-all duration-500 hover:-translate-y-4
                    hover:shadow-[0_40px_80px_rgba(234,179,8,0.25)]
                    ${i % 2 !== 0 ? 'lg:translate-y-12' : ''}
                  `}
                                    >
                                        <div className="absolute -right-4 -bottom-4 text-9xl opacity-[0.03] grayscale group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none transform rotate-12">
                                            {getIcon(stat.icon)}
                                        </div>

                                        <div className="relative z-10 flex flex-col items-center lg:items-start space-y-4">
                                            <div className="w-16 h-16 bg-blue-50 text-primary rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:bg-accent group-hover:text-blue-950 transition-colors duration-500">
                                                {getIcon(stat.icon)}
                                            </div>

                                            <div className="space-y-1 text-center lg:text-left">
                                                <h3 className="text-4xl md:text-5xl font-black text-[#1e293b] tracking-tighter">
                                                    <AnimatedNumber value={num} suffix={suffix} />
                                                </h3>
                                                <div className="w-8 h-1 bg-accent rounded-full group-hover:w-16 transition-all duration-500"></div>
                                                <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] pt-2">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}


            {facultyEnabled && faculty.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-24">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-block px-4 py-1.5 bg-blue-50 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            Intellectual Capital
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">Our Distinguished Educators</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg">World-class mentors dedicated to fostering excellence and innovation.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {faculty.map((member, i) => (
                            <div key={i} className="group text-center">
                                <div className="relative inline-block mb-8 overflow-hidden rounded-[2.5rem]">
                                    <div className="absolute inset-0 bg-primary rounded-[2.5rem] rotate-6 scale-95 group-hover:rotate-12 transition-transform duration-500"></div>
                                    <img
                                        src={member.photoUrl ?? ''}
                                        alt={member.name ?? ''}
                                        className="relative w-full aspect-[4/5] object-cover object-top rounded-[2.5rem] shadow-xl border-4 border-white grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-primary group-hover:text-blue-600 transition-colors">{member.name ?? ''}</h3>
                                <p className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-4">{member.designation ?? ''}</p>
                                <p className="text-gray-500 leading-relaxed px-4">{member.bio ?? ''}</p>
                            </div>
                        ))}
                    </div>

                </section>
            )}

            {/* Athletic Excellence */}
            <section className="max-w-[100vw] overflow-hidden py-24 bg-gray-50/50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                            Athletic Excellence
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">Sports & Physical Achievements</h2>
                    </div>
                    <p className="text-gray-500 max-w-md font-medium">Nurturing champions on and off the field through competitive spirit and physical discipline.</p>
                </div>

                <div className="relative">
                    <div className="achievement-scroll flex overflow-x-auto gap-8 px-[max(1rem,calc((100vw-80rem)/2+1rem))] pb-12 snap-x snap-mandatory cursor-grab active:cursor-grabbing">
                        {sportsAchievements.map((achievement, i) => (
                            <div
                                key={i}
                                className="min-w-[320px] md:min-w-[450px] snap-center group relative overflow-hidden rounded-[3rem] aspect-[16/10] shadow-2xl transition-all duration-500 hover:shadow-primary/10"
                            >
                                <img
                                    src={achievement.image}
                                    alt={achievement.title}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent opacity-80"></div>

                                <div className="absolute top-8 left-8 flex flex-col items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <span className="text-[10px] font-black text-accent uppercase tracking-tighter">YEAR</span>
                                    <span className="text-xl font-black text-white leading-none">
                                        <AnimatedNumber value={achievement.year} duration={1000} />
                                    </span>
                                </div>

                                <div className="absolute bottom-10 left-10 right-10 space-y-2">
                                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 inline-block">
                                        {achievement.category}
                                    </span>
                                    <h4 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2 group-hover:text-accent transition-colors">
                                        {achievement.title}
                                    </h4>
                                    <p className="text-blue-50/80 text-sm leading-relaxed line-clamp-2 font-medium">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="max-w-7xl mx-auto px-4 mt-4 flex items-center justify-center gap-2">
                        <div className="h-1 w-12 bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-1/3 rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-black text-primary/30 uppercase tracking-widest">Swipe to explore</span>
                    </div>
                </div>
            </section>

            {/* Campus highlights Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="inline-block px-4 py-1.5 bg-blue-50 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                            Campus highlights
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-blue-950 leading-tight max-w-2xl">
                            Infrastructure
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {infrastructureData.map((zone, i) => (
                        <div key={i} className="group flex flex-col">
                            <div className="bg-white p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-xl group-hover:border-primary/10 group-hover:-translate-y-2 transition-all flex-1 flex flex-col text-left">
                                <div className="mb-10">
                                    <div className={`w-20 h-20 ${zone.color} text-white rounded-[1.75rem] flex items-center justify-center text-4xl shadow-2xl mb-8 transform group-hover:scale-110 transition-transform duration-500`}>
                                        {zone.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-blue-950 tracking-tight mb-2">{zone.category}</h3>
                                    <div className="w-12 h-1 bg-accent rounded-full group-hover:w-20 transition-all duration-500"></div>
                                </div>

                                <ul className="space-y-6">
                                    {zone.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-4 group/item">
                                            <div className={`w-2.5 h-2.5 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-accent'} group-hover/item:scale-125 transition-transform`}></div>
                                            <span className="text-gray-600 font-bold text-lg group-hover/item:text-primary transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 text-center">
                    <Link
                        href="/infrastructure"
                        className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-accent hover:text-primary transition-all shadow-xl group inline-flex items-center gap-4"
                    >
                        Tour Campus Facilities
                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </Link>
                </div>
            </section>

            {/* Gallery & Upcoming Events Section */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-bold text-primary">Gallery</h2>
                            <Link
                                href="/gallery"
                                className="text-blue-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-all"
                            >
                                View Full Gallery →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {highlightImages.map((url, i) => (
                                <div key={i} className="group overflow-hidden rounded-[2rem] relative h-80 shadow-2xl">
                                    <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Gallery highlight" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-90"></div>
                                    <div className="absolute bottom-0 p-8 text-left">
                                        <span className="bg-accent text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Campus Life</span>
                                        <h4 className="text-white font-bold text-xl leading-snug">Moments of discovery and achievement captured.</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12 text-left">
                        <h2 className="text-4xl font-bold text-primary">Upcoming Events</h2>
                        <div className="space-y-6">
                            {UPCOMING_EVENTS.map((event) => (
                                <div key={event.id} className="bg-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all border border-gray-100 group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-primary text-white p-3 rounded-2xl text-center min-w-[60px] group-hover:bg-accent group-hover:text-primary transition-colors">
                                            <p className="text-xs font-bold uppercase tracking-tighter">{event.date.split(' ')[0]}</p>
                                            <p className="text-xl font-black">{event.date.split(' ')[1].replace(',', '')}</p>
                                        </div>
                                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                                            {event.category}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-xl text-primary mb-3">{event.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">{event.description}</p>
                                </div>
                            ))}
                            <Link
                                href="/events"
                                className="block text-center w-full py-5 bg-blue-50 text-primary font-bold rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm"
                            >
                                View Full Calendar
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
