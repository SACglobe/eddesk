
"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_DATA } from '../constants/mockData';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const { SCHOOL_PROFILE } = MOCK_DATA;
    const moreRef = useRef(null);

    const mainLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Events', path: '/broadcast' },
        { name: 'Admissions', path: '/admission' },
        { name: 'Contact', path: '/contact' },
    ];

    const moreLinks = [
        { name: 'Academics', path: '/academics' },
        { name: 'Activities', path: '/activities' },
        { name: 'Infrastructure', path: '/infrastructure' },
    ];

    // Handle clicking outside to close the "More" dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreRef.current && !moreRef.current.contains(event.target)) {
                setIsMoreOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-white border-b border-slate-200 w-full border-t-4 border-t-emerald-900 relative">
            <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                        <img
                            src={SCHOOL_PROFILE.logo}
                            alt={`${SCHOOL_PROFILE.school_name} Logo`}
                            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight serif uppercase group-hover:text-emerald-900 transition-colors leading-tight">
                                {SCHOOL_PROFILE.school_name}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mt-1">
                                {SCHOOL_PROFILE.motto}
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className="text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* More Dropdown Wrapper */}
                        <div
                            ref={moreRef}
                            className="relative"
                            onMouseEnter={() => setIsMoreOpen(true)}
                            onMouseLeave={() => setIsMoreOpen(false)}
                        >
                            <button
                                className={`flex items-center gap-1.5 text-xs font-bold transition-colors uppercase tracking-widest ${isMoreOpen ? 'text-emerald-700' : 'text-slate-600 hover:text-emerald-700'}`}
                            >
                                More
                                <svg
                                    className={`w-3 h-3 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu - Wrapped in a container with padding to bridge the gap */}
                            {isMoreOpen && (
                                <div className="absolute top-full right-0 pt-2 w-56 z-[60] animate-fade-in">
                                    <div className="bg-white border border-slate-100 shadow-2xl py-2 border-t-2 border-t-emerald-900">
                                        {moreLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                onClick={() => setIsMoreOpen(false)}
                                                className="block px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] hover:bg-emerald-50 hover:text-emerald-900 transition-all border-b border-slate-50 last:border-0"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                        <div className="px-6 py-4 bg-slate-50">
                                            <Link
                                                href="/faculty"
                                                onClick={() => setIsMoreOpen(false)}
                                                className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block hover:underline"
                                            >
                                                Meet Faculty →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-slate-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-200 animate-slide-down">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {/* Standard Links */}
                        {mainLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-3 text-sm font-bold text-slate-600 border-b border-slate-50 uppercase tracking-widest hover:text-emerald-700"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* "More" items as standard links on mobile */}
                        <div className="pt-4 bg-slate-50 px-3 pb-4">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-4 px-1">Discover More</span>
                            <div className="grid grid-cols-1 gap-1">
                                {moreLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2.5 text-xs font-bold text-emerald-900 uppercase tracking-widest hover:text-emerald-700"
                                    >
                                        • {link.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-2">
                                <Link href="/disclosures" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-bold uppercase p-2 bg-white border border-slate-200 text-slate-600 text-center tracking-widest">Disclosures</Link>
                                <Link href="/faculty" onClick={() => setIsMenuOpen(false)} className="text-[10px] font-bold uppercase p-2 bg-emerald-900 text-white text-center tracking-widest">Faculty</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
