"use client";

import React from 'react';
import HeroSlider from '../../components/HeroSlider';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { validateRequiredSections } from '@/core/utils/sectionValidator';
import { isValidImageUrl } from '@/core/utils/url';

const FacultyPage: React.FC<{ data: TenantViewModel }> = ({ data }) => {
    const schoolName = data?.school?.name ?? 'Our School';
    
    // 1. Validation
    const validation = validateRequiredSections(data);
    if (!validation.isValid) return null;

    // 2. Helper to get component config
    const getComponent = (code: string) => {
        return data.components?.find(c =>
            c.componentCode?.toLowerCase() === code.toLowerCase()
        );
    };

    // 3. Hero Section Data
    const heroComp = getComponent('hero');
    const heroEnabled = heroComp?.isActive ?? true;
    const heroMedia = (data?.heroMedia ?? [])
        .filter(s => s.isActive)
        .sort((a, b) => a.displayOrder - b.displayOrder);

    // 4. Faculty Data
    const facultyComp = getComponent('faculty');
    const facultyEnabled = facultyComp?.isActive ?? true;
    const facultyMembers = (data?.faculty ?? [])
        .filter(f => f.isActive)
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    // 5. Contact Details Data
    const contactComp = getComponent('contactdetails');
    const contactEnabled = contactComp?.isActive ?? true;
    const contactData = data?.contactDetails?.[0];

    return (
        <div className="pb-0 bg-white">
            {/* 1. Hero Section */}
            {heroEnabled && heroMedia.length > 0 && (
                <HeroSlider slides={heroMedia} heightClass="h-[60vh]" />
            )}

            {/* 2. Faculty Section (Asymmetrical Profile Design) */}
            {facultyEnabled && (
                <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
                    {facultyMembers.map((member, index) => (
                        <div key={member.key} className={`flex flex-col lg:flex-row items-center gap-16 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Left Side: Profile Image with Floating Card */}
                            <div className="lg:w-1/2 relative">
                                <div className="relative overflow-hidden rounded-[4rem] md:rounded-[6rem] lg:rounded-[8rem] aspect-[4/5] shadow-2xl bg-gray-50 border-8 border-yellow-400/20">
                                    {isValidImageUrl(member.imageUrl) ? (
                                        <img
                                            src={member.imageUrl}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-9xl opacity-10">👨‍🏫</div>
                                    )}
                                </div>
                                
                                {/* Floating Card: Designation */}
                                <div className="absolute top-12 -right-6 bg-white px-8 py-4 rounded-full shadow-2xl border-t-4 border-accent">
                                    <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.3em]">
                                        {member.designation || 'Faculty Member'}
                                    </span>
                                </div>
                            </div>

                            {/* Right Side: Typography and Details */}
                            <div className="lg:w-1/2 space-y-8 lg:pl-12">
                                <div className="space-y-4">
                                    <h2 className="text-6xl md:text-8xl font-bold text-primary tracking-tighter leading-none font-playfair">
                                        {member.name}
                                    </h2>
                                    <p className="text-accent text-xl font-black italic tracking-wide">
                                        "{member.qualification || 'Experienced Educator'}"
                                    </p>
                                </div>

                                <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                                    {member.description || `${member.name} is a dedicated member of the ${schoolName} team, bringing years of expertise to our academic community.`}
                                </p>

                                {/* Bio Snippet / Highlights */}
                                <div className="space-y-4 pt-10 border-t border-gray-100">
                                    <div className="flex items-center gap-6 group">
                                        <div className="h-0.5 w-8 bg-accent group-hover:w-12 transition-all duration-300"></div>
                                        <p className="text-lg font-bold text-primary uppercase tracking-tight">Visionary Educator</p>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="h-0.5 w-8 bg-accent group-hover:w-12 transition-all duration-300"></div>
                                        <p className="text-lg font-bold text-primary uppercase tracking-tight">Innovative Leadership</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                    {facultyMembers.length === 0 && (
                        <div className="py-24 text-center border-t border-gray-100">
                             <p className="text-gray-400 font-playfair italic text-xl">Information about our faculty is being updated.</p>
                        </div>
                    )}
                </div>
            )}

            {/* 3. Contact Details Section (Modern Grid) */}
            {contactEnabled && contactData && (
                <section className="bg-gray-50 py-24">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-accent uppercase tracking-widest">Connect</span>
                            <h3 className="text-2xl font-bold text-primary font-playfair">Visit Our Campus</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">{contactData.address}</p>
                        </div>
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-accent uppercase tracking-widest">Inquire</span>
                            <h3 className="text-2xl font-bold text-primary font-playfair">Direct Contact</h3>
                            <div className="space-y-1">
                                <p className="text-gray-500 font-medium">{contactData.email}</p>
                                <p className="text-gray-500 font-medium">{contactData.phone}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <span className="text-[10px] font-black text-accent uppercase tracking-widest">Navigate</span>
                            <h3 className="text-2xl font-bold text-primary font-playfair">Our Location</h3>
                            <a href={contactData.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-primary font-black uppercase tracking-[0.2em] text-[10px] border-b border-accent pb-1">
                                View on Map →
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default FacultyPage;
