
"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { isValidImageUrl } from '@/core/utils/url';

const Header = ({ school, activePath }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const moreRef = useRef(null);
    const pathname = usePathname();

    // Use the passed activePath if available (e.g. in demo mode), otherwise fallback to usePathname()
    const currentPath = activePath || pathname;

    const showLogo = school.logoUrl && isValidImageUrl(school.logoUrl);

    const mainLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Events', path: '/events' },
        { name: 'Admissions', path: '/admissions' },
        { name: 'Contact', path: '/contact' },
    ];

    const moreLinks = [
        { name: 'Academics', path: '/academics' },
        { name: 'Activities', path: '/activities' },
        { name: 'Infrastructure', path: '/infrastructure' },
        { name: 'Gallery', path: '/gallery' },
    ];

    // Helper to check if a path is active
    const isActive = (path) => {
        if (path === '/' && currentPath === '/') return true;
        if (path !== '/' && currentPath?.startsWith(path)) return true;
        return false;
    };

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
                        {showLogo && (
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform duration-500">
                                <img
                                    src={school.logoUrl}
                                    alt={""}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight serif uppercase group-hover:text-emerald-900 transition-colors leading-tight">
                                {school.name}
                            </span>
                            {school.slogan && (
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none mt-1">
                                    {school.slogan}
                                </span>
                            )}
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-2">
                        {mainLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                                    isActive(link.path)
                                        ? 'bg-emerald-900 text-white shadow-lg scale-105'
                                        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                                }`}
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
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-widest ${
                                    isMoreOpen || moreLinks.some(l => isActive(l.path))
                                        ? 'bg-emerald-900 text-white shadow-lg' 
                                        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                                }`}
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
                                    <div className="bg-white border border-slate-100 shadow-2xl py-2 border-t-2 border-t-emerald-900 rounded-lg overflow-hidden">
                                        {moreLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                onClick={() => setIsMoreOpen(false)}
                                                className={`block px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b border-slate-50 last:border-0 ${
                                                    isActive(link.path)
                                                        ? 'bg-emerald-900 text-white'
                                                        : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-900'
                                                }`}
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
                                className={`block px-3 py-3 text-sm font-bold border-b border-slate-50 uppercase tracking-widest transition-colors ${
                                    isActive(link.path)
                                        ? 'text-emerald-900 bg-emerald-50'
                                        : 'text-slate-600 hover:text-emerald-700'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* "More" items as standard links on mobile */}
                        <div className="pt-4 bg-slate-50 px-3 pb-4 rounded-xl mt-2">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-4 px-1">Discover More</span>
                            <div className="grid grid-cols-1 gap-1">
                                {moreLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                                            isActive(link.path)
                                                ? 'bg-emerald-900 text-white shadow-md'
                                                : 'text-emerald-900 hover:bg-emerald-100/50'
                                        }`}
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
