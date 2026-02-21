"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { schoolData } from '../data';

interface BroadcastBarProps { announcements: Array<{ title: string; message: string }> }
const BroadcastBar: React.FC<BroadcastBarProps> = ({ announcements: items }) => {
    if (items.length === 0) return null;
    const announcements = [...items, ...items];

    return (
        <div className="w-full flex justify-center py-0 animate-in fade-in duration-1000 slide-in-from-top-4">
            <div className="w-[92%] max-w-7xl h-[48px] bg-signature-navy/50 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden relative group pause-on-hover animate-float transition-all duration-700 hover:scale-[1.01] hover:bg-signature-navy/60">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 ticker-mask pointer-events-none z-10"></div>

                <div className="h-full flex items-center animate-marquee whitespace-nowrap">
                    {announcements.map((item, i) => (
                        <div key={i} className="inline-flex items-center px-12">
                            <span className="text-signature-gold mx-8 text-[8px] select-none opacity-40 group-hover:opacity-80 transition-opacity">✦</span>
                            <span className="mr-4 px-2.5 py-0.5 text-[8px] font-bold tracking-[0.25em] uppercase rounded-full bg-signature-gold/20 text-signature-gold border border-signature-gold/30">
                                Notice
                            </span>
                            <span className="text-white/90 font-sans text-[11px] tracking-[0.12em] font-medium flex items-center gap-2">
                                <span className="text-signature-gold font-bold uppercase text-[9px] tracking-[0.2em]">{item.title}</span>
                                <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-500">{item.message}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface HeaderProps { announcements: Array<{ title: string; message: string; isActive: boolean; expiresAt: string | null }> }
const Header: React.FC<HeaderProps> = ({ announcements }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMoreOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'The School', path: '/about' },
        { label: 'Events', path: '/events' },
        { label: 'Portrait', path: '/portrait' },
        { label: 'Contact', path: '/contact' },
    ];

    const moreItems = [
        { label: 'Academics', path: '/academics' },
        { label: 'Activities', path: '/activities' },
        { label: 'Infrastructure', path: '/infrastructure' },
        { label: 'Meet Faculty', path: '/faculty' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 bg-signature-navy shadow-2xl border-b border-white/5 ${isScrolled
                    ? 'pt-4 pb-4 backdrop-blur-xl'
                    : 'pt-10 pb-10 backdrop-blur-md'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-8 flex flex-col items-center">
                    <div className="flex justify-between items-center w-full">
                        <Link href="/" className="flex items-center gap-6 group">
                            <div className="text-2xl md:text-3xl font-serif font-bold tracking-tighter transition-colors duration-500 text-white">
                                {schoolData.name.split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? 'italic text-signature-gold' : ''}>{word} </span>
                                ))}
                            </div>
                        </Link>

                        <nav className="hidden lg:flex space-x-12 items-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`text-[10px] uppercase tracking-[0.4em] transition-all duration-500 relative group py-2 ${pathname === item.path ? 'text-signature-gold' : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-0 left-0 w-full h-px bg-signature-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${pathname === item.path ? 'scale-x-100' : ''}`}></span>
                                </Link>
                            ))}

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                                    className={`text-[10px] uppercase tracking-[0.4em] transition-all duration-500 flex items-center gap-2 py-2 ${isMoreOpen || moreItems.some(item => pathname === item.path) ? 'text-signature-gold' : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    More
                                    <svg className={`w-3 h-3 transition-transform duration-500 ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div className={`absolute right-0 mt-6 w-64 bg-white border border-signature-navy/10 shadow-2xl transition-all duration-500 origin-top-right z-[70] ${isMoreOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                                    }`}>
                                    <div className="p-6 space-y-4">
                                        {moreItems.map((item) => (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                onClick={() => setIsMoreOpen(false)}
                                                className={`block text-[9px] uppercase tracking-[0.3em] transition-colors py-2 border-b border-signature-navy/5 last:border-0 ${pathname === item.path ? 'text-signature-gold' : 'text-signature-navy/70 hover:text-signature-gold'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </nav>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white focus:outline-none z-50">
                            <div className="relative w-8 h-8">
                                <span className={`absolute block w-8 h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                                <span className={`absolute block w-8 h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                <span className={`absolute block w-8 h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? '-rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                            </div>
                        </button>
                    </div>

                    <div className={`hidden lg:block w-full transition-all duration-700 ${isScrolled ? 'mt-4' : 'mt-10'}`}>
                        <BroadcastBar announcements={announcements} />
                    </div>
                </div>

                <div className={`lg:hidden fixed inset-0 bg-signature-navy transition-all duration-1000 z-40 flex items-center justify-center ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col items-center space-y-8 overflow-y-auto py-20 px-8 w-full text-center">
                        {navItems.map((item) => (
                            <Link key={item.path} href={item.path} onClick={() => setIsMenuOpen(false)} className="text-white text-3xl font-serif hover:text-signature-gold transition-colors">
                                {item.label}
                            </Link>
                        ))}
                        <div className="w-12 h-px bg-signature-gold/20 my-4"></div>
                        {moreItems.map((item) => (
                            <Link key={item.path} href={item.path} onClick={() => setIsMenuOpen(false)} className="text-white/60 text-xl font-serif hover:text-signature-gold transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
            <div className={`transition-all duration-700 bg-signature-navy ${isScrolled ? 'h-[145px]' : 'h-[210px]'}`}></div>
            <div className="lg:hidden bg-signature-navy pb-4">
                <BroadcastBar announcements={announcements} />
            </div>
        </>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-signature-navy text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-signature-gold/5 -skew-x-12 translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-8 pt-32 pb-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 border-b border-white/5 pb-32">
                    <div className="lg:col-span-5">
                        <h2 className="text-5xl font-serif mb-10 text-white leading-tight">
                            Sterling <span className="italic text-signature-gold">Signature</span> Academy
                        </h2>
                        <p className="text-white/40 max-w-md leading-loose font-light text-lg italic mb-10">
                            "We provide a sanctuary for deep thought and a launchpad for global leadership. Excellence is not our goal; it is our tradition."
                        </p>
                        <div className="flex gap-6">
                            {['Instagram', 'LinkedIn', 'YouTube'].map(social => (
                                <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-signature-gold hover:text-white transition-colors">{social}</a>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="text-[11px] uppercase tracking-[0.5em] mb-10 text-signature-gold font-bold">Institutional Registry</h4>
                        <ul className="space-y-6 text-sm text-white/50 font-light">
                            <li><Link href="/about" className="hover:text-signature-gold transition-colors">The School</Link></li>
                            <li><Link href="/academics" className="hover:text-signature-gold transition-colors">Academic Framework</Link></li>
                            <li><Link href="/admissions" className="hover:text-signature-gold transition-colors">Admissions Protocol</Link></li>
                            <li><Link href="/contact" className="hover:text-signature-gold transition-colors">Reach the Academy</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <h4 className="text-[11px] uppercase tracking-[0.5em] mb-10 text-signature-gold font-bold">The Heights</h4>
                        <p className="text-white/50 text-sm leading-relaxed mb-8">
                            {schoolData.contact.address}<br />
                            United Kingdom
                        </p>
                        <p className="text-xl font-serif text-white mb-2">{schoolData.contact.phone}</p>
                        <p className="text-sm text-white/40 tracking-widest uppercase">{schoolData.contact.email}</p>
                    </div>
                </div>

                <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] uppercase tracking-[0.5em] text-white/20">
                        © {new Date().getFullYear()} STERLING ACADEMY. AUTHORED BY TRADITION.
                    </div>
                    <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                        <a href="#" className="hover:text-signature-gold transition-colors">Privacy Charter</a>
                        <a href="#" className="hover:text-signature-gold transition-colors">Legal Archive</a>
                        <a href="#" className="hover:text-signature-gold transition-colors">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Header, Footer };
