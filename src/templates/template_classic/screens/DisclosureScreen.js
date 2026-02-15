import React from 'react';
import { MOCK_DATA } from '../constants/mockData';

const DisclosureScreen = () => {
    const { MANDATORY_DISCLOSURE } = MOCK_DATA;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 fade-in">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-widest serif">Mandatory Disclosures</h1>
                <div className="h-1 w-20 bg-slate-900 mx-auto mt-4"></div>
                <p className="mt-8 text-slate-500 italic">As per State Board & Institutional Regulatory Requirements</p>
            </div>

            <div className="bg-white border border-slate-200 overflow-hidden max-w-4xl mx-auto">
                <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 serif uppercase tracking-tight">Public Disclosure Documents</h2>
                </div>
                <div className="divide-y divide-slate-100">
                    {MANDATORY_DISCLOSURE.documents.map((doc, idx) => (
                        <div key={idx} className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <span className="text-slate-300 font-bold serif text-xl">{idx + 1}</span>
                                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">{doc.title}</h3>
                            </div>
                            <a
                                href={doc.pdf_url}
                                className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                                View Document
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 text-center text-slate-400 text-[10px] uppercase tracking-widest">
                Updated for the Academic Session 2024-25
            </div>
        </div>
    );
};

export default DisclosureScreen;
