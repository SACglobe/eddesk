import React from 'react';
import Link from 'next/link';
import { SCHOOL_NAME } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-white text-xl font-bold">{SCHOOL_NAME}</h3>
                        <p className="text-sm leading-relaxed">
                            Excellence in education since 1995. Preparing students for the global challenges of tomorrow.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/events" className="hover:text-accent transition-colors">Academic Calendar</Link></li>
                            <li><Link href="/admissions" className="hover:text-accent transition-colors">Admissions Portal</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Career Opportunities</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li>123 Education Lane</li>
                            <li>Springfield, IL 62704</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Email: info@standrews.edu</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Newsletter</h4>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-gray-800 border-none px-4 py-2 rounded flex-1 focus:ring-2 focus:ring-accent outline-none"
                            />
                            <button className="bg-accent text-primary font-bold px-4 py-2 rounded hover:bg-accent-hover transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
                    <p>© {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
