import React from 'react';
import Link from 'next/link';
interface FooterProps {
    school?: any;
}

const Footer: React.FC<FooterProps> = ({ school }) => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-white text-xl font-bold">{school?.name}</h3>
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
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li>{school.fullAddress}</li>
                            <li>Phone: {school.phone}</li>
                            <li>Email: {school.email}</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs space-y-4">
                    <p>© {new Date().getFullYear()} {school.name}. All rights reserved.</p>
                    <p className="text-gray-500">
                        Powered by <a href="https://eddesk.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors font-medium">EdDesk</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
