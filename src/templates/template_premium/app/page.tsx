"use client";

import React, { useState, useRef, useEffect } from 'react';
import { schoolData } from '../data';
import { SectionHeader, Card, Button, StatCounter, TestimonialSlider, useIntersectionObserver } from '../components/Shared';
import Link from 'next/link';
import LayoutWrapper from '../components/LayoutWrapper';

const Hero: React.FC = () => {
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => console.warn("Autoplay muted video"));
    }
  }, []);

  return (
    <section className="h-screen relative overflow-hidden bg-signature-navy">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
          poster="https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=2000"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-university-building-with-a-large-fountain-in-front-4354-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-signature-navy/80 via-signature-navy/40 to-signature-navy z-[1]"></div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-signature-gold/60"></div>
            <p className="text-signature-gold uppercase tracking-[0.8em] text-[10px] md:text-xs font-bold">
              ESTABLISHED MCMLXXXVIII
            </p>
          </div>

          <h1 className="text-white text-7xl md:text-[10rem] font-serif leading-[0.9] mb-12 tracking-tighter animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            The Art of <br />
            <span className="italic text-signature-gold block mt-4">Mastery.</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-12 justify-center items-center mt-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Link href="/admissions">
              <Button variant="gold">Institutional Prospectus</Button>
            </Link>

            <button
              onClick={() => setIsFilmOpen(true)}
              className="group flex items-center gap-6 text-white/80 hover:text-white transition-all"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-signature-gold group-hover:bg-signature-gold/10 transition-all duration-700">
                <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M3 22V2l18 10L3 22z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold">View Film</span>
                <span className="block text-sm font-serif italic text-white/40 group-hover:text-white/80 transition-colors">The Sterling Story</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {isFilmOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-signature-navy/95 backdrop-blur-2xl" onClick={() => setIsFilmOpen(false)}></div>
          <div className="relative w-full max-w-6xl aspect-video bg-black z-[105] shadow-2xl border border-white/5">
            <video autoPlay controls className="w-full h-full">
              <source src="https://assets.mixkit.co/videos/preview/mixkit-university-building-with-a-large-fountain-in-front-4354-large.mp4" type="video/mp4" />
            </video>
            <button
              onClick={() => setIsFilmOpen(false)}
              className="absolute -top-16 right-0 text-white/50 hover:text-white flex items-center gap-4 group"
            >
              <span className="text-[10px] uppercase tracking-widest">Close screening</span>
              <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-all duration-500">✕</div>
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="w-px h-12 bg-gradient-to-b from-signature-gold/50 to-transparent"></div>
        <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold">Scroll to Explore</span>
      </div>
    </section>
  );
};

const InstitutionalStats: React.FC = () => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={containerRef} className="bg-white border-b border-signature-navy/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-signature-navy/5 -translate-x-1/2 z-10"></div>

        <div className={`py-24 px-8 lg:pr-24 lg:pl-16 bg-[#F0F7FF] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-signature-gold"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold">Institutional Merit</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-signature-navy mb-12 leading-tight tracking-tight">Honors & Academic <br />Results</h2>

          <div className="mb-12">
            <h3 className="text-2xl font-serif text-signature-navy mb-2">Board Results 2023</h3>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Academic Merit Summary</p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-end border-b border-signature-navy/5 pb-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-signature-navy/60">Pass Percentage</span>
              <span className="text-5xl font-serif text-signature-navy">100%</span>
            </div>
            <div className="flex justify-between items-end border-b border-signature-navy/5 pb-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-signature-navy/60">Distinctions</span>
              <span className="text-5xl font-serif text-signature-gold">84%</span>
            </div>
            <div className="flex justify-between items-end border-b border-signature-navy/5 pb-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-signature-navy/60">First Class</span>
              <span className="text-5xl font-serif text-signature-navy">96%</span>
            </div>
          </div>
        </div>

        <div className={`py-24 px-8 lg:pl-24 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-signature-navy/20"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Institutional Recognition</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-signature-navy mb-16 tracking-tight">Achievements & Glories</h2>

          <div className="space-y-20 mb-20">
            <div className="flex gap-12 group">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-signature-gold mb-2">Year</span>
                <span className="text-4xl font-serif text-signature-navy group-hover:text-signature-gold transition-colors">2023</span>
                <div className="w-px flex-grow bg-signature-navy/5 mt-4"></div>
              </div>
              <div className="flex-grow pt-2">
                <span className="inline-block bg-signature-gold/10 text-signature-gold text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">State Recognition</span>
                <h4 className="text-2xl font-serif mb-4 text-signature-navy group-hover:text-signature-gold transition-colors">Best Disciplined School Award</h4>
                <p className="text-base text-gray-500 leading-loose">Awarded by the State Education Board for excellence in maintaining institutional decorum and student conduct.</p>
              </div>
            </div>

            <div className="flex gap-12 group">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-2">Year</span>
                <span className="text-4xl font-serif text-gray-300 group-hover:text-signature-gold transition-colors">2022</span>
              </div>
              <div className="flex-grow pt-2">
                <span className="inline-block bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Board Milestone</span>
                <h4 className="text-2xl font-serif mb-4 text-signature-navy group-hover:text-signature-gold transition-colors">Academic Excellence Trophy</h4>
                <p className="text-base text-gray-500 leading-loose">Recognized for achieving 100% pass rate in State Board examinations for 15 consecutive years.</p>
              </div>
            </div>
          </div>

          <Link href="/about" className="inline-flex items-center gap-8 group">
            <div className="w-16 h-16 rounded-full bg-signature-navy flex items-center justify-center group-hover:bg-signature-gold transition-all duration-500 shadow-2xl">
              <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-navy group-hover:text-signature-gold transition-colors">Know more about our heritage</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

const SchoolDashboard: React.FC = () => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const stats = [
    {
      label: "Successful Alumni", value: "8,500+", icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      label: "Expert Faculty", value: "150+", icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: "Campus Acres", value: "25", icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      label: "Student Ratio", value: "15:1", icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ];

  return (
    <section ref={containerRef} className="bg-[#F0F7FF] py-24 px-8 border-b border-signature-navy/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col items-center text-center px-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-${i * 150} lg:border-r last:border-0 border-signature-navy/10`}>
              <div className="text-signature-gold mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                {stat.icon}
              </div>
              <div className="text-5xl md:text-6xl font-serif text-signature-navy mb-4 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold whitespace-nowrap">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FacultyHighlights: React.FC = () => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const educators = [
    {
      name: "Dr. Alistair Thorne",
      role: "Head of Humanities",
      image: "school/image/teacher1.png",
      bio: "Former fellow at the Royal Society of Arts with a focus on classical philosophy and epistemology."
    },
    {
      name: "Dr. Sofia Moretti",
      role: "Dean of Sciences",
      image: "school/image/teacher2.png",
      bio: "Leading research in molecular biology and sustainable ecological systems in partnership with global labs."
    },
    {
      name: "Sir Richard Vane",
      role: "Director of Arts",
      image: "school/image/teacher3.png",
      bio: "World-renowned curator and advocate for interdisciplinary visual expression and historic preservation."
    }
  ];

  return (
    <section ref={containerRef} className="py-48 px-8 bg-white border-b border-signature-navy/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div>
            <SectionHeader title="Intellectual Capital" subtitle="Our Distinguished Educators" />
            <p className="text-xl text-signature-navy/50 max-w-md font-light italic leading-relaxed mt-4">
              World-class mentors dedicated to fostering excellence and innovation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {educators.map((edu, i) => (
            <div key={i} className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden mb-8">
                <img src={edu.image} alt={edu.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-signature-gold/30"></div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4 block">{edu.role}</span>
              <h3 className="text-3xl font-serif mb-6 group-hover:text-signature-gold transition-colors">{edu.name}</h3>
              <p className="text-gray-500 font-light leading-relaxed mb-8">{edu.bio}</p>
              <div className="w-8 h-px bg-signature-navy/20 group-hover:w-16 group-hover:bg-signature-gold transition-all duration-700"></div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link href="/faculty">
            <Button variant="outline">Meet Entire Faculty</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const AthleticExcellence: React.FC = () => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const sportsAchievements = [
    {
      title: "Champions of the Chess",
      category: "Chess",
      image: "school/image/sports_chess.png",
      description: "Our varsity track squad secured the National Invitational Shield, setting three new record benchmarks in the 400m hurdles."
    },
    {
      title: "Sterling XI Premier Glory",
      category: "BasketBall",
      image: "school/image/sports_basketball.png",
      description: "The senior football collective achieved an undefeated season, culminating in the Independent Schools' Premier Trophy victory."
    },
    {
      title: "The Sovereign Cup",
      category: "Cricket",
      image: "school/image/sports_cricket.png",
      description: "A masterclass in precision and strategy led our cricket team to retain the Sovereign Cup for the fifth consecutive year."
    }
  ];

  return (
    <section ref={containerRef} className="py-48 px-8 bg-signature-ivory border-b border-signature-navy/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div>
            <SectionHeader title="Athletic Excellence" subtitle="Sports & Physical Achievements" />
            <p className="text-xl text-signature-navy/50 max-w-md font-light italic leading-relaxed mt-4">
              Nurturing champions on and off the field through competitive spirit and physical discipline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {sportsAchievements.map((sport, i) => (
            <div key={i} className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden mb-8">
                <img src={sport.image} alt={sport.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-signature-gold/30"></div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-signature-gold font-bold mb-4 block">{sport.category}</span>
              <h3 className="text-3xl font-serif mb-6 group-hover:text-signature-gold transition-colors">{sport.title}</h3>
              <p className="text-gray-500 font-light leading-relaxed mb-8">{sport.description}</p>
              <div className="w-8 h-px bg-signature-navy/20 group-hover:w-16 group-hover:bg-signature-gold transition-all duration-700"></div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <Link href="/activities">
            <Button variant="outline">View All Achievements</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const UpcomingEvents: React.FC = () => {
  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const events = schoolData.events.slice(0, 3);

  return (
    <section ref={containerRef} className="bg-signature-navy text-white py-48 px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-signature-gold/5 -skew-x-12 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Upcoming Events" subtitle="Institutional Engagements" light center />

        <div className="mt-24 space-y-0 border-t border-white/10">
          {events.map((event, i) => (
            <Link
              key={event.id}
              href="/events"
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10 group hover:bg-white/[0.02] transition-all duration-700 px-4 md:px-8 block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="md:col-span-3">
                <div className="text-signature-gold font-serif italic text-3xl mb-2">{event.date.split(',')[0]}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{event.category}</div>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-3xl font-serif mb-4 group-hover:text-signature-gold transition-colors">{event.title}</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed line-clamp-2">{event.description}</p>
              </div>
              <div className="md:col-span-2 flex items-center justify-end">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-signature-gold group-hover:bg-signature-gold/10 transition-all duration-500">
                  <svg className="w-5 h-5 text-white/20 group-hover:text-signature-gold transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={`mt-24 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/events">
            <button className="px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-signature-navy transition-all duration-500">
              View Full Calendar
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { containerRef: introRef, isVisible: introVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <LayoutWrapper>
      <div className="fade-in bg-signature-ivory">
        <Hero />

        <InstitutionalStats />

        <section ref={introRef} className="pt-48 pb-24 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
          <div className={`lg:col-span-7 transition-all duration-1000 ${introVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <SectionHeader title="A Message from the Principal" subtitle="Academic Leadership" />
            <p className="text-4xl md:text-5xl font-serif italic text-signature-navy mb-12 leading-[1.2] tracking-tight">
              "{schoolData.principalMessage.text}"
            </p>
            <div className="flex items-center gap-8">
              <img src={schoolData.principalMessage.image} className="w-24 h-24 rounded-full object-cover grayscale border-2 border-signature-gold/20" alt="Principal" />
              <div>
                <h4 className="font-bold text-2xl tracking-tight">{schoolData.principalMessage.name}</h4>
                <p className="text-[11px] uppercase tracking-[0.4em] text-signature-gold font-bold">The Academy Principal</p>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-5 bg-signature-navy p-16 md:p-24 text-white relative transition-all duration-1000 delay-300 ${introVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-signature-gold/10"></div>
            <SectionHeader title={schoolData.boardMessage.title} subtitle="Institutional Governance" light />
            <p className="text-white/50 leading-loose mb-12 font-light text-xl">
              {schoolData.boardMessage.text}
            </p>
            <Link href="/about">
              <Button variant="outline">Governance Archive</Button>
            </Link>
          </div>
        </section>

        <SchoolDashboard />

        <FacultyHighlights />

        <AthleticExcellence />

        <section className="py-48 px-8 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <SectionHeader title="Campus Masterpiece" subtitle="The Sterling Experience" />
              <Link href="/activities">
                <Button variant="outline">Explore Enrichment</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {schoolData.highlights.slice(0, 3).map((h, i) => (
                <Card key={i} title={h.title} image={h.image} tag={h.tag} />
              ))}
            </div>
          </div>
        </section>

        <UpcomingEvents />

        <section className="py-48 bg-signature-gold text-white text-center px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-signature-navy/10"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-[12px] uppercase tracking-[0.6em] font-bold mb-10">2024-2025 ADMISSIONS</p>
            <h2 className="text-6xl md:text-8xl font-serif mb-16 leading-tight">Start your <br /><span className="italic">Signature Journey.</span></h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/admissions">
                <button className="px-16 py-6 bg-white text-signature-navy text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-signature-navy hover:text-white transition-all duration-500 shadow-2xl">
                  Begin Application
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-16 py-6 border border-white/40 text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-signature-navy transition-all duration-500">
                  Request Prospectus
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  );
}
