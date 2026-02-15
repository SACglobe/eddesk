
import Link from 'next/link';
import { MOCK_DATA } from '../constants/mockData';

const Footer = () => {
    const { SCHOOL_PROFILE } = MOCK_DATA;
    return (
        <footer className="bg-emerald-950 text-slate-300 py-16">
            <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-emerald-900 pb-12">
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold serif uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block">Institutional Profile</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <img src={SCHOOL_PROFILE.logo} alt="Logo" className="w-10 h-10 brightness-200" />
                            <p className="text-white font-bold serif text-sm uppercase leading-tight">{SCHOOL_PROFILE.school_name}</p>
                        </div>
                        <p className="text-sm leading-relaxed text-emerald-100/70">{SCHOOL_PROFILE.school_overview.slice(0, 180)}...</p>
                        <p className="text-xs italic text-emerald-500">"{SCHOOL_PROFILE.motto}"</p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold serif uppercase tracking-widest border-b border-emerald-800 pb-2 inline-block">Contact Core</h3>
                        <div className="text-sm space-y-3">
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-emerald-500">ADDR:</span> {SCHOOL_PROFILE.address}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-bold text-emerald-500">PH:</span> {SCHOOL_PROFILE.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-bold text-emerald-500">MAIL:</span> {SCHOOL_PROFILE.email}
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
                    <p>&copy; {new Date().getFullYear()} {SCHOOL_PROFILE.school_name}. All Rights Reserved.</p>
                    <p className="mt-4 md:mt-0">Design Standards by EduDesk SaaS</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
