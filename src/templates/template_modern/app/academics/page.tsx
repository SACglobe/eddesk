import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import HeroSlider from '../../components/HeroSlider';

const Academics: React.FC<{ data?: TenantViewModel }> = ({ data }) => {
    // Current TenantViewModel doesn't have academics.levels, so we use a fallback or hardcoded for now
    // until we extend the ViewModel if needed.
    const levels = [
        {
            title: 'Primary Education',
            grades: 'Grades 1-5',
            desc: 'A vibrant foundation where curiosity meets structured learning. We focus on core literacy, numeracy, and social-emotional intelligence through play and discovery.',
            icon: '🎨',
            color: 'bg-emerald-50'
        },
        {
            title: 'Middle School',
            grades: 'Grades 6-8',
            desc: 'The bridge to independence. Students begin specialized studies in sciences and humanities while developing critical thinking and collaborative skills.',
            icon: '🔬',
            color: 'bg-blue-50'
        },
        {
            title: 'Senior Secondary',
            grades: 'Grades 9-12',
            desc: 'Preparation for global excellence. Advanced placement curricula designed to secure admissions to the world\'s most prestigious universities.',
            icon: '🎓',
            color: 'bg-purple-50'
        }
    ];

    const results = data?.academicResults || [];

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

            {/* 2. Academic Levels Grid */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid md:grid-cols-3 gap-8">
                    {levels.map((level, i) => (
                        <div key={i} className={`${level.color} p-12 rounded-[3.5rem] space-y-8 hover:scale-[1.02] transition-transform duration-500 shadow-xl group`}>
                            <div className="text-6xl group-hover:scale-110 transition-transform inline-block">{level.icon}</div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold text-primary font-playfair">{level.title}</h3>
                                <p className="text-accent-hover font-black uppercase tracking-widest text-[10px]">{level.grades}</p>
                            </div>
                            <p className="text-gray-600 leading-relaxed font-medium">{level.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

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
