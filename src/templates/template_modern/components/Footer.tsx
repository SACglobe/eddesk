import React from 'react';
import Link from 'next/link';
import { isValidImageUrl } from '@/core/utils/url';

interface FooterProps {
    school?: any;
    contactDetails?: any;
}

const Footer: React.FC<FooterProps> = ({ school, contactDetails }) => {
    const displayAddress = contactDetails?.address || school?.fullAddress || school?.address;
    const displayPhone = contactDetails?.phone || school?.phone;
    const displayEmail = contactDetails?.email || school?.email;

    const showLogo = school?.logoUrl && isValidImageUrl(school.logoUrl);

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            {showLogo ? (
                                <div className="h-12 w-auto flex-shrink-0 bg-white p-1 rounded">
                                    <img src={school.logoUrl} alt={`${school.name} Logo`} className="h-full w-auto object-contain" />
                                </div>
                            ) : (
                                <h3 className="text-white text-xl font-bold">{school?.name}</h3>
                            )}
                        </div>
                        {school?.description && (
                            <p className="text-sm leading-relaxed">
                                {school.description}
                            </p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/events" className="hover:text-accent transition-colors">Academic Calendar</Link></li>
                            <li><Link href="/admission" className="hover:text-accent transition-colors">Admission Portal</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Career Opportunities</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li>{displayAddress}</li>
                            <li>Phone: {displayPhone}</li>
                            <li>Email: {displayEmail}</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {school?.name}. All rights reserved.</p>
                    <p className="mt-2 text-gray-500">
                        Powered by <a href="https://www.eddesk.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-gray-800">EdDesk</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
