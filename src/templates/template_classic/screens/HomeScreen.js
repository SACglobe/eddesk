"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HomeScreen = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const principal = data?.personnel?.find(p => p.personType === 'principal') ?? null;

    const heroSlides = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    if (heroSlides.length === 0) {
        heroSlides.push({
            headline: '',
            subheadline: '',
            mediaUrl: '',
            primaryButtonText: '',
            primaryButtonUrl: '',
            secondaryButtonText: '',
            secondaryButtonUrl: ''
        });
    }

    // Latest Academic Results
    const latestResults = data?.academicResults?.[0] || {
        year: '2023',
        passPercentage: 100,
        distinctions: 84,
        firstClass: 96
    };

    // Filter institutional/academic achievements
    const recentAchievements = (data?.achievements ?? [])
        .filter(a => a.achievementType === 'academic' || a.achievementType === 'recognition')
        .slice(0, 3);


    const statisticsList = (data?.statistics ?? [])
        .sort((a, b) => a.displayOrder - b.displayOrder);

    const allFaculty = (data?.personnel ?? [])
        .filter(p => p.personType === 'faculty');

    const sportsAchievements = (data?.achievements ?? [])
        .filter(a => a.achievementType === 'sports')
        .slice(0, 6);

    const groupedFacilities = (data?.facilities ?? []).reduce((acc, facility) => {
        const category = facility.categoryName || 'Common Facilities';
        if (!acc[category]) acc[category] = [];
        acc[category].push(facility.name);
        return acc;
    }, {});

    const campusGallery = (data?.mediaLibrary ?? [])
        .filter(m => m.isFeatured || m.category === 'campus')
        .map(m => m.url);

    const displayCount = 4;
    const totalGalleryImages = campusGallery.length || 1;

    useEffect(() => {
        const heroTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        const galleryTimer = setInterval(() => {
            if (totalGalleryImages > 1) {
                setGalleryIndex((prev) => (prev + 1) % totalGalleryImages);
            }
        }, 3000);

        return () => {
            clearInterval(heroTimer);
            clearInterval(galleryTimer);
        };
    }, [totalGalleryImages, heroSlides.length]);

    // Compute the 4 images that should be visible starting from galleryIndex
    const getVisibleImages = () => {
        const visible = [];
        if (campusGallery.length === 0) return [];
        for (let i = 0; i < displayCount; i++) {
            visible.push(campusGallery[(galleryIndex + i) % totalGalleryImages]);
        }
        return visible;
    };

    const visibleGallery = getVisibleImages();

    return (
        <div className="fade-in">
            {/* 1. Full Screen Image Slider */}
            <section className="relative h-[85vh] w-full overflow-hidden bg-emerald-950">
                {heroSlides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                        style={{ transition: 'opacity 1s ease-in-out, transform 10s linear' }}
                    >
                        <div className="absolute inset-0 bg-emerald-950/40 z-10" />
                        {slide.mediaUrl && <img src={slide.mediaUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />}
                    </div>
                ))}

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                    <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.5em] mb-6 animate-fade-up">{heroSlides[currentSlide]?.subheadline}</span>
                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 serif tracking-tight leading-tight max-w-5xl animate-fade-up-delayed">
                        {heroSlides[currentSlide]?.headline}
                    </h1>
                    <div className="flex gap-4 animate-fade-up-extra">
                        {heroSlides[currentSlide]?.primaryButtonText && (
                            <Link href={heroSlides[currentSlide]?.primaryButtonUrl || '#'} className="px-8 py-3 bg-white text-emerald-900 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-xl inline-block">{heroSlides[currentSlide].primaryButtonText}</Link>
                        )}
                        {heroSlides[currentSlide]?.secondaryButtonText && (
                            <Link href={heroSlides[currentSlide]?.secondaryButtonUrl || '#'} className="px-8 py-3 bg-transparent border border-white text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all inline-block">{heroSlides[currentSlide].secondaryButtonText}</Link>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {heroSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-12 h-1 transition-all ${idx === currentSlide ? 'bg-emerald-400' : 'bg-white/30 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </section>

            {/* 2. School Achievements & Academic Results Section */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="text-center mb-16">
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">Institutional Merit</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Honors & Academic Results</h2>
                        <div className="h-1 w-20 bg-emerald-900 mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <div className="p-10 bg-emerald-900 text-white flex flex-col justify-between h-full shadow-xl">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-[1px] bg-emerald-400"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Board Results {latestResults.year}</span>
                                </div>
                                <h3 className="text-2xl font-bold serif mb-6">Academic Merit Summary</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end border-b border-emerald-800 pb-2">
                                        <span className="text-xs uppercase text-emerald-300 font-bold">Pass Percentage</span>
                                        <span className="text-xl font-bold serif text-white">{latestResults.passPercentage}%</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-emerald-800 pb-2">
                                        <span className="text-xs uppercase text-emerald-300 font-bold">Distinctions</span>
                                        <span className="text-xl font-bold serif text-white">{latestResults.distinctions}%</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-emerald-800 pb-2">
                                        <span className="text-xs uppercase text-emerald-300 font-bold">First Class</span>
                                        <span className="text-xl font-bold serif text-white">{latestResults.firstClass}%</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-8 text-[10px] text-emerald-400 uppercase tracking-widest leading-relaxed">
                                {latestResults.legacyQuote || "Consistently maintaining a legacy of academic excellence for over 15 consecutive years."}
                            </p>
                        </div>

                        {recentAchievements.map((achievement, idx) => (
                            <div key={idx} className="p-10 bg-slate-50 border border-slate-200 hover:border-emerald-200 transition-all group flex flex-col justify-between h-full">
                                <div>
                                    <div className="text-3xl font-bold text-emerald-100 serif mb-6 group-hover:text-emerald-900 transition-colors">
                                        {achievement.year}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight serif mb-4 leading-tight">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                                        {achievement.description}
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-200 text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                    Institutional Recognition
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/about"
                            className="px-10 py-4 border-2 border-emerald-900 text-emerald-900 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-900 hover:text-white transition-all inline-block"
                        >
                            Know more
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. A Message from Our Principal */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl"></div>

                <div className="max-w-[1600px] mx-auto px-2 md:px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute -top-10 -left-10 w-full h-full bg-slate-50 border border-slate-100 -z-10 translate-x-4 translate-y-4"></div>
                            <div className="relative group">
                                <img
                                    src={principal?.photoUrl ?? ''}
                                    alt={principal?.name ?? 'Principal'}
                                    className="w-full aspect-[4/5] lg:aspect-auto lg:h-[650px] object-cover shadow-2xl transition-all duration-1000 group-hover:scale-[1.02]"
                                />
                                <div className="absolute bottom-10 left-10 p-8 bg-emerald-900 text-white shadow-2xl hidden lg:block border-l-4 border-emerald-400">
                                    <div className="text-xs uppercase font-bold tracking-[0.3em] mb-1">Academic Head</div>
                                    <div className="text-xl font-bold serif">Dean of Students</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-7/12 lg:-ml-24 z-20">
                            <div className="bg-white p-8 md:p-16 lg:p-20 shadow-[-20px_20px_60px_rgba(0,0,0,0.05)] border border-slate-100 relative">
                                <div className="absolute top-0 left-10 -translate-y-1/2 text-8xl text-emerald-900/10 serif leading-none font-black italic">"</div>

                                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.5em] block mb-6">Institutional Vision</span>
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 uppercase tracking-widest serif mb-8 leading-tight">
                                    Word from the <br /> Principal's Desk
                                </h2>

                                <div className="h-[2px] w-24 bg-emerald-900 mb-12"></div>

                                <div className="relative">
                                    <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed serif mb-12 relative z-10">
                                        "{principal?.bio ?? ''}"
                                    </p>
                                    <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900 serif tracking-wide uppercase">{principal?.name ?? ''}</p>
                                            <p className="text-[10px] text-emerald-600 uppercase tracking-[0.3em] font-bold mt-2">{principal?.designation ?? 'Principal'}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <Link href="/about" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-900 transition-colors py-2 border-b border-transparent hover:border-emerald-900">Read Full Address →</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Statistics Counter Section */}
            <section className="py-20 bg-emerald-900 text-white relative z-20 shadow-2xl">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {statisticsList.map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="text-4xl md:text-6xl font-bold mb-2 serif text-emerald-50 group-hover:scale-110 transition-transform inline-block">
                                    {stat.value}
                                </div>
                                <div className="text-[10px] text-emerald-200 uppercase tracking-[0.3em] font-bold border-t border-emerald-800 pt-4 mt-2">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Our Distinguished Educators */}
            <section className="py-24 bg-white">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="text-center mb-16">
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">Intellectual Capital</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Our Distinguished Educators</h2>
                        <div className="h-1 w-20 bg-emerald-900 mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {allFaculty.map((teacher, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <div className="relative mb-6">
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:border-emerald-500 transition-all duration-500 group-hover:scale-105">
                                        <img
                                            src={teacher.photoUrl}
                                            alt={teacher.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:rotate-3"
                                        />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border border-emerald-900/10 scale-110 -z-10"></div>
                                </div>

                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-slate-900 serif mb-2 group-hover:text-emerald-900 transition-colors">
                                        {teacher.name}
                                    </h4>
                                    <div className="h-[1px] w-8 bg-emerald-200 mx-auto mb-3 group-hover:w-16 transition-all duration-500"></div>
                                    <p className="text-[10px] text-emerald-600 uppercase tracking-[0.2em] font-bold leading-tight">
                                        {teacher.designation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 6. Sports Activities and Achievements Section (HORIZONTAL SCROLL) */}
            <section className="py-24 bg-emerald-50/30 border-t border-slate-100">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="text-left">
                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">Athletic Excellence</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Sports & Physical Achievements</h2>
                            <div className="h-1 w-20 bg-emerald-900 mt-6"></div>
                        </div>
                        <div className="hidden md:flex items-center gap-3 text-slate-400">
                            <span className="text-[10px] uppercase font-bold tracking-widest">Swipe horizontally</span>
                            <div className="w-12 h-px bg-slate-300"></div>
                        </div>
                    </div>

                    <div className="flex gap-8 overflow-x-auto pb-12 pt-4 no-scrollbar snap-x snap-mandatory">
                        {sportsAchievements.map((item, idx) => (
                            <div
                                key={idx}
                                className="min-w-[300px] md:min-w-[400px] bg-white border border-slate-100 shadow-md snap-start group/card hover:shadow-2xl transition-all duration-500 flex flex-col"
                            >
                                <div className="relative h-60 overflow-hidden">
                                    {item.photoUrl && (
                                        <img
                                            src={item.photoUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                        />
                                    )}
                                    {!item.photoUrl && (
                                        <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                                            <span className="text-emerald-200 font-bold serif text-4xl">{item.year}</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-emerald-900 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                        {item.year}
                                    </div>
                                </div>
                                <div className="p-8 flex-grow border-t-4 border-emerald-900">
                                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] block mb-3">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 serif leading-tight mb-4 group-hover/card:text-emerald-900 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {item.description}
                                    </p>
                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.achievementType}</span>
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Campus Highlights (Infrastructure Grid) */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Campus Infrastructure</h2>
                            <div className="h-1 w-20 bg-emerald-900"></div>
                        </div>
                        <p className="text-slate-500 text-sm max-w-md mt-4 md:mt-0 italic">State-of-the-art facilities designed for academic rigor and holistic development.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
                        {Object.entries(groupedFacilities).map(([category, items]) => (
                            <div key={category} className="p-10 bg-white hover:bg-emerald-50 transition-colors">
                                <h3 className="font-bold text-lg mb-4 serif uppercase text-emerald-900">{category}</h3>
                                <ul className="space-y-3">
                                    {items.map(item => (
                                        <li key={item} className="text-sm text-slate-600 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Image Gallery Preview with Auto-Scrolling Infinite Carousel */}
            <section className="py-12 px-2">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 overflow-hidden">
                    {/* Slots 1-4: The Auto-Scrolling Carousel */}
                    <div className="col-span-1 md:col-span-4 overflow-hidden relative">
                        <div
                            className="flex transition-transform duration-1000 ease-in-out"
                            style={{ transform: `translateX(0)` }}
                        >
                            {visibleGallery.map((img, idx) => (
                                <div key={`${galleryIndex}-${idx}`} className="flex-none w-1/2 md:w-1/4 px-1">
                                    <div className="aspect-square overflow-hidden border border-slate-100 group relative">
                                        <img
                                            src={img}
                                            alt="Campus"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slot 5: Static Call to Action */}
                    <div className="bg-emerald-900 flex flex-col items-center justify-center p-4 text-center aspect-square col-span-1">
                        <span className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">View Full</span>
                        <span className="text-emerald-300 text-[10px] uppercase font-bold">Campus Portrait</span>
                        <Link href="/portrait" className="mt-4 text-white text-[10px] font-bold underline underline-offset-4 tracking-widest hover:text-emerald-200">Enter Gallery</Link>
                    </div>
                </div>
            </section>

            <style jsx>{`
        .animate-fade-up { animation: fadeUp 1s ease-out forwards; }
        .animate-fade-up-delayed { animation: fadeUp 1s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-up-extra { animation: fadeUp 1s ease-out 0.6s forwards; opacity: 0; }
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default HomeScreen;
