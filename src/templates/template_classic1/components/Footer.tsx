
import React from 'react';
import Link from 'next/link';
import { SchoolContent } from '../../../lib/constants/types';
import styles from '../styles/scoped.module.css';

interface FooterProps {
    data: SchoolContent;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
    return (
        <footer className="bg-emerald-950 text-slate-300 py-16">
            <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-emerald-900 pb-12">
                    {/* Institutional Profile */}
                    <div className="space-y-4">
                        <h3 className={`text-white text-lg font-bold uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block ${styles.serif}`}>Institutional Profile</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={data.branding.logoUrl || "https://cdn-icons-png.flaticon.com/512/2602/2602414.png"}
                                alt="Logo"
                                className="w-10 h-10 brightness-200"
                            />
                            <p className={`text-white font-bold text-sm uppercase leading-tight ${styles.serif}`}>{data.meta.schoolName}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-emerald-100/70">
                            Founded in {data.meta.establishedYear}, {data.meta.schoolName} has been a cornerstone of academic excellence and moral integrity. Our institution is dedicated to nurturing young minds...
                        </p>
                        <p className="text-xs italic text-emerald-500">"Classic Template"</p>
                    </div>

                    {/* Contact Core */}
                    <div className="space-y-4">
                        <h3 className={`text-white text-lg font-bold uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block ${styles.serif}`}>Contact Core</h3>
                        <div className="text-sm space-y-3">
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-emerald-500">ADDR:</span> {data.contact.address}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-bold text-emerald-500">PH:</span> {data.contact.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-bold text-emerald-500">MAIL:</span> {data.contact.email}
                            </p>
                        </div>
                    </div>

                    {/* Directories */}
                    <div className="space-y-4">
                        <h3 className={`text-white text-lg font-bold uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block ${styles.serif}`}>Directories</h3>
                        <ul className="text-sm space-y-2 grid grid-cols-1">
                            {['About School', 'Academic Plan', 'Campus Facilities', 'Extra-Curricular', 'Admissions', 'Public Disclosures', 'Events & Calendar'].map((link) => (
                                <li key={link}>
                                    <Link href="/" className="hover:text-emerald-400 transition-colors uppercase">• {link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="space-y-6">
                        <h3 className={`text-white text-lg font-bold uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block ${styles.serif}`}>Connect</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                                <a
                                    key={platform}
                                    href="#"
                                    className="p-3 bg-emerald-900 hover:bg-emerald-800 transition-all rounded-sm"
                                    aria-label={platform}
                                >
                                    <div className="w-4 h-4 bg-emerald-400 group-hover:bg-white"></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-medium">
                        {data.footer?.copyrightText || `© ${new Date().getFullYear()} ${data.meta.schoolName}`}
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest">Privacy Policy</Link>
                        <Link href="/terms" className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest">Terms of Service</Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-emerald-600 uppercase tracking-[0.2em] font-bold mt-12">
                    <p>© {new Date().getFullYear()} {data.meta.schoolName}. All Rights Reserved.</p>
                    <p className="mt-4 md:mt-0">Design Standards by EduDesk SaaS</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
