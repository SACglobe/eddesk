import React from 'react';
import { MOCK_DATA } from '../constants/mockData';

const FacultyScreen = () => {
    const { FACULTY, ACHIEVEMENTS } = MOCK_DATA;

    return (
        <div className="max-w-[1600px] mx-auto px-2 md:px-6 py-20 fade-in">
            {/* Page Header */}
            <div className="text-center mb-16">
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.5em] block mb-4">Institutional Personnel</span>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-widest serif">Our Educators & Mentors</h1>
                <div className="h-1 w-20 bg-emerald-900 mx-auto mt-6"></div>
            </div>

            {/* Governing Board Section */}
            <section className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-[1px] w-12 bg-emerald-900"></div>
                    <h2 className="text-2xl font-bold text-emerald-900 uppercase tracking-widest serif">Governing Board</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {FACULTY.board_members.map((member, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="aspect-[3/4] overflow-hidden group-hover:shadow-2xl transition-all duration-700 mb-6 border border-slate-200">
                                <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 serif uppercase tracking-tight group-hover:text-emerald-900 transition-colors">{member.name}</h3>
                            <p className="text-[10px] text-emerald-600 uppercase tracking-[0.3em] mt-2 font-bold">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Teaching Faculty Section (Round Photos) */}
            <section className="mb-32">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-[1px] w-12 bg-emerald-900"></div>
                    <h2 className="text-2xl font-bold text-emerald-900 uppercase tracking-widest serif">Teaching Faculty</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {FACULTY.teachers.map((teacher, idx) => (
                        <div key={idx} className="flex flex-col items-center group p-8 bg-white border border-slate-50 hover:border-emerald-100 hover:shadow-xl transition-all duration-500">
                            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg group-hover:border-emerald-500 transition-all duration-500">
                                <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 serif text-center group-hover:text-emerald-900 transition-colors">{teacher.name}</h3>
                            <div className="h-[1px] w-6 bg-emerald-200 my-3 group-hover:w-12 transition-all"></div>
                            <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-[0.2em] text-center leading-tight">
                                {teacher.subject}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sports Activities and Achievements Section (HORIZONTAL SCROLL) */}
            <section className="mt-40 pt-20 border-t border-slate-100 bg-slate-50 -mx-2 md:-mx-6 px-2 md:px-6 pb-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="text-left">
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.4em] block mb-4">Athletic Merit</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Sports & Athletic Excellence</h2>
                        <div className="h-1 w-20 bg-emerald-900 mt-6"></div>
                    </div>
                    <div className="hidden md:flex items-center gap-3 text-slate-400">
                        <span className="text-[10px] uppercase font-bold tracking-widest">Swipe for more</span>
                        <div className="flex gap-1">
                            <div className="w-8 h-px bg-slate-300"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Wrapper */}
                <div className="relative">
                    <div className="flex gap-8 overflow-x-auto pb-12 pt-4 no-scrollbar snap-x snap-mandatory">
                        {ACHIEVEMENTS.student_achievements.map((item, idx) => (
                            <div
                                key={idx}
                                className="min-w-[320px] md:min-w-[420px] bg-white border border-slate-100 shadow-md snap-start group/card hover:shadow-2xl transition-all duration-500 flex flex-col"
                            >
                                {/* Image Section with Overlay */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                    />
                                    <div className="absolute top-0 left-0 w-full h-full bg-emerald-950/20 group-hover/card:bg-emerald-950/0 transition-colors"></div>
                                    <div className="absolute top-6 right-6 bg-emerald-900 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                                        {item.year}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-10 flex-grow border-t-4 border-emerald-900">
                                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] block mb-3 italic">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 serif leading-tight mb-6 group-hover/card:text-emerald-900 transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 text-emerald-900">
                                                <svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Official Record</span>
                                        </div>
                                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Internal Custom CSS for the Horizontal Scroller */}
            <style>{`
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

export default FacultyScreen;
