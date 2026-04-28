
import Link from 'next/link';
import { isValidImageUrl } from '@/core/utils/url';

const Footer = ({ school, contactDetails }) => {
    const displayAddress = contactDetails?.address || school?.fullAddress || school?.address;
    const displayPhone = contactDetails?.phone || school?.phone;
    const displayEmail = contactDetails?.email || school?.email;

    const showLogo = school?.logoUrl && isValidImageUrl(school.logoUrl);

    return (
        <footer className="bg-emerald-950 text-slate-300 py-16">
            <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-emerald-900 pb-12">
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold serif uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block">Institutional Profile</h3>
                        <div className="flex items-center gap-4 mb-4">
                            {showLogo ? (
                                <div className="flex-shrink-0 h-10 w-auto flex items-center group-hover:scale-110 transition-transform duration-500">
                                    <img
                                        src={school.logoUrl}
                                        alt={`${school.name} Logo`}
                                        className="h-full w-auto object-contain brightness-200"
                                    />
                                </div>
                            ) : (
                                <p className="text-white font-bold serif text-sm uppercase leading-tight">{school.name}</p>
                            )}
                        </div>
                        {school.description && (
                            <p className="text-sm leading-relaxed text-emerald-100/70">{school.description}</p>
                        )}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold serif uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block">Contact Core</h3>
                        <div className="text-sm space-y-3">
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-emerald-500">ADDR:</span> {displayAddress}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-bold text-emerald-500">PH:</span> {displayPhone}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-bold text-emerald-500">MAIL:</span> {displayEmail}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold serif uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block">Directories</h3>
                        <ul className="text-sm space-y-2 grid grid-cols-1">
                            <li><Link href="/about" className="hover:text-emerald-400 transition-colors">• About School</Link></li>
                            <li><Link href="/academics" className="hover:text-emerald-400 transition-colors">• Academic Plan</Link></li>
                            <li><Link href="/infrastructure" className="hover:text-emerald-400 transition-colors">• Campus Facilities</Link></li>
                            <li><Link href="/activities" className="hover:text-emerald-400 transition-colors">• Extra-Curricular</Link></li>
                            <li><Link href="/admission" className="hover:text-emerald-400 transition-colors">• Admissions</Link></li>
                            <li><Link href="/disclosures" className="hover:text-emerald-400 transition-colors">• Public Disclosures</Link></li>
                            <li><Link href="/broadcast" className="hover:text-emerald-400 transition-colors">• Events & Calendar</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-white text-lg font-bold serif uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block">Connect</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                                <a key={social} href="#" className="p-3 bg-emerald-900 hover:bg-emerald-800 transition-all rounded-sm" aria-label={social}>
                                    <div className="w-4 h-4 bg-emerald-400 group-hover:bg-white"></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-emerald-600 uppercase tracking-[0.2em] font-bold">
                    <p>&copy; {new Date().getFullYear()} {school.name}. All Rights Reserved.</p>
                    <p className="mt-4 md:mt-0 flex items-center gap-2">
                        Powered by <a href="https://eddesk.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-white transition-colors underline decoration-emerald-800 underline-offset-4">EdDesk</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
