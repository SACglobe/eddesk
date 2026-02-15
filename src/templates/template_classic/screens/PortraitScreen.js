import React from 'react';
import { MOCK_DATA } from '../constants/mockData';

const PortraitScreen = () => {
    const { INFRASTRUCTURE } = MOCK_DATA;

    return (
        <div className="fade-in">
            <section className="bg-slate-900 py-24 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Visual Archive</span>
                    <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest">Campus Portrait</h1>
                    <div className="h-1 w-20 bg-white mx-auto mt-8"></div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {INFRASTRUCTURE.campus_images.map((img, idx) => (
                            <div key={idx} className="break-inside-avoid relative group overflow-hidden border border-slate-100 shadow-md">
                                <img
                                    src={img}
                                    alt={`Gallery ${idx + 1}`}
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center">
                                    <div className="text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        View High Res
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Added extra placeholders for demonstration */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={`extra-${i}`} className="break-inside-avoid relative group overflow-hidden border border-slate-100 shadow-md">
                                <img
                                    src={`https://picsum.photos/seed/portrait${i}/800/${i % 2 === 0 ? '600' : '1000'}`}
                                    alt={`Gallery Extra ${i}`}
                                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PortraitScreen;
