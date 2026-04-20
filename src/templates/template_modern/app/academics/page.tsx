import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import HeroSlider from '../../components/HeroSlider';

const Academics: React.FC<{ data?: TenantViewModel }> = ({ data }) => {
    // Current TenantViewModel doesn't have academics.levels, so we use a fallback or hardcoded for now
    // until we extend the ViewModel if needed.
    const academicList = (data?.academicsList ?? [])
        .filter(l => l.isActive);

    const highlighted = (data?.highlightedAcademics ?? [])
        .filter(h => h.isActive);

    const results = data?.academicResults || [];

    const colors = ['bg-emerald-50', 'bg-blue-50', 'bg-purple-50', 'bg-rose-50', 'bg-amber-50'];
    const icons = ['🎨', '🔬', '🎓', '📚', '🚀'];

    // 3. Hero Section Data
    const heroMedia = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    return (
        <div className="pb-24">
            {/* 1. Hero Section */}
            {heroMedia.length > 0 && (
                <HeroSlider slides={heroMedia} heightClass="h-[60vh]" />
            )}

            {/* 2. Highlighted Academic Features (e.g. NEET Coaching, HIFLU) */}
            {highlighted.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-24">
                    {highlighted.map((item, idx) => (
                        <div key={item.key} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center mb-24 last:mb-0`}>
                            <div className="flex-1 space-y-8">
                                <span className="bg-accent/10 text-accent px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest leading-none inline-block">
                                    Special Program
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold font-playfair text-primary leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed italic border-l-4 border-accent pl-6">
                                    {item.description}
                                </p>
                                {item.bulletinPoints.length > 0 && (
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {item.bulletinPoints.map((point, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700 font-medium group">
                                                <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {item.imageUrl && (
                                <div className="flex-1 w-full relative">
                                    <div className="absolute -inset-4 bg-accent/5 rounded-[3rem] -rotate-2" />
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title}
                                        className="relative rounded-[2.5rem] w-full h-auto shadow-2xl"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* 3. Academic Levels Grid */}
            {academicList.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-24">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-primary">Academic Levels</h2>
                        <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {academicList.map((level, i) => (
                            <div key={level.key} className={`${colors[i % colors.length]} p-12 rounded-[3.5rem] space-y-8 hover:scale-[1.02] transition-transform duration-500 shadow-xl group border border-black/5`}>
                                <div className="text-6xl group-hover:scale-110 transition-transform inline-block">
                                    {icons[i % icons.length]}
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-bold text-primary font-playfair">{level.title}</h3>
                                    {level.subtitle && (
                                        <p className="text-accent-hover font-black uppercase tracking-widest text-[10px]">{level.subtitle}</p>
                                    )}
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium">{level.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 3. Academic Results Section (Dynamic) */}
            {results.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-12">
                    <div className="bg-primary p-12 md:p-20 rounded-[4rem] text-white">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-6xl font-bold font-playfair">Academic Achievements</h2>
                            <p className="text-blue-100 opacity-60">Consistently setting higher standards every year.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12">
                            {results.map((result, idx) => (
                                <div key={idx} className="text-center space-y-4 border-r border-white/10 last:border-0">
                                    <h4 className="text-5xl font-black text-accent">{result.passPercentage}%</h4>
                                    <p className="text-xs uppercase tracking-[0.3em] font-black text-blue-200">Class of {result.year} Pass Rate</p>
                                    <div className="pt-4 space-y-2">
                                        <p className="text-sm opacity-80">{result.distinctions} Distinctions</p>
                                        <p className="text-sm opacity-80">{result.firstClass} First Classes</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Academics;
