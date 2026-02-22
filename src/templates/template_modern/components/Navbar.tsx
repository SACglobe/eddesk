"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
    school?: any;
}

const Navbar: React.FC<NavbarProps> = ({ school }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();

    const mainNavItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Events', href: '/events' },
        { name: 'Admissions', href: '/admissions' },
        { name: 'Contact', href: '/contact' },
    ];

    const moreItems = [
        { name: 'Academics', href: '/academics' },
        { name: 'Activities', href: '/activities' },
        { name: 'Infrastructure', href: '/infrastructure' },
        { name: 'Meet Faculty', href: '/faculty' },
    ];

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsMoreOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsMoreOpen(false);
        }, 150);
    };

    const isActive = (href: string) => {
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10">
                                {school.logoUrl ? (
                                    <img src={school.logoUrl} alt={`${school.name} logo`}
                                        className="w-full h-full object-contain" />
                                ) : (
                                    <div className="bg-accent p-2 rounded-lg flex items-center justify-center w-full h-full">
                                        <span className="text-primary font-bold text-xl">
                                            {school.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <span className="font-bold text-xl tracking-tight hidden sm:block">
                                    {school.name}
                                </span>
                                <p className="text-xs text-accent font-medium hidden sm:block uppercase">Modern Template</p>
                            </div>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        {mainNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${isActive(item.href)
                                    ? 'bg-accent text-primary'
                                    : 'hover:bg-primary-light transition-colors'
                                    } px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* More Dropdown */}
                        <div
                            className="relative py-2"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider transition-colors ${moreItems.some(i => isActive(i.href)) ? 'bg-yellow-500 text-blue-950' : 'hover:bg-primary-light'
                                    }`}
                            >
                                More
                                <svg className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isMoreOpen && (
                                <div className="absolute top-full right-0 w-56 pt-2 z-50">
                                    <div className="bg-white shadow-2xl rounded-xl py-4 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {moreItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsMoreOpen(false)}
                                                className={`block w-full text-left px-6 py-3 text-sm font-bold uppercase tracking-widest ${isActive(item.href) ? 'text-primary bg-accent' : 'text-gray-600 hover:bg-blue-50 hover:text-primary'
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-light focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-blue-800 border-t border-blue-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {mainNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`${isActive(item.href)
                                    ? 'bg-accent text-primary font-bold'
                                    : 'text-gray-300 hover:bg-blue-700'
                                    } block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors`}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="border-t border-blue-700 mt-2 pt-2">
                            <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">Explore More</p>
                            {moreItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`${isActive(item.href)
                                        ? 'bg-accent text-primary font-bold'
                                        : 'text-gray-300 hover:bg-blue-700'
                                        } block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
