"use client";

import Link from 'next/link';
import { MoveLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.08)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>

            <div className="max-w-2xl w-full text-center relative z-10">
                <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 mb-8 animate-bounce">
                    <Search className="w-8 h-8 text-indigo-400" />
                </div>

                <h1 className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-6 uppercase tracking-widest">
                    Page Not Found
                </h2>

                <p className="text-slate-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                    The educational resource you're looking for has moved or graduated.
                    Let's get you back on track to the institutional dashboard.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
                    >
                        <MoveLeft className="w-5 h-5" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-900">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">
                        Powered by EdDesk SEO Infrastructure
                    </p>
                </div>
            </div>
        </div>
    );
}
