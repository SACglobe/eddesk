"use client";

import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { SectionHeader, Card } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';

const ActivitySection: React.FC<{ title: string; items: any[] }> = ({ title, items }) => {
    if (items.length === 0) return null;
    return (
        <div className="mb-32 last:mb-0">
            <SectionHeader title={title} subtitle="Enrichment Programs" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => (
                    <Card
                        key={i}
                        title={item.title || item.name}
                        description={item.description || item.bio}
                        image={item.imageUrl || item.image || item.photoUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default function Activities({ data }: { data?: TenantViewModel }) {
    const sections = data?.homepageSections ?? [];
    const section = sections.find((s: any) => s.sectionKey === 'activities');
    const isEnabled = section?.isEnabled ?? true;
    const isRequired = section?.isRequired ?? false;
    const activitiesData = (data?.activities ?? []) as any[];

    if (!isEnabled) return null;

    // Map activities to categories based on tag
    const getByCategory = (tag: string) =>
        activitiesData.filter(a => (a.tag || '').toLowerCase().includes(tag.toLowerCase()));

    const academic = getByCategory('academic');
    const clubs = getByCategory('club');
    const sports = getByCategory('sport');
    const extraCurricular = getByCategory('extra');
    const arts = getByCategory('art');
    const leadership = getByCategory('leadership');

    // If no tags match, show all in a general section if none of the above have items
    const hasCategorized = academic.length > 0 || clubs.length > 0 || sports.length > 0 ||
                          extraCurricular.length > 0 || arts.length > 0 || leadership.length > 0;

    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <header className="mb-24">
                        <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">The Active <span className="not-italic">Signature</span></h1>
                        <p className="text-xl text-gray-500 max-w-2xl font-light">
                            Education extends far beyond the lecture hall. Our activities are designed to build character, resilience, and curiosity.
                        </p>
                    </header>

                    {hasCategorized ? (
                        <>
                            <ActivitySection title="Academic Enrichment" items={academic} />
                            <ActivitySection title="Our Active Clubs" items={clubs} />
                            <ActivitySection title="Sports & Development" items={sports} />
                            <ActivitySection title="Extra Curricular Activities" items={extraCurricular} />
                            <ActivitySection title="Arts, Culture & Creativity" items={arts} />
                            <ActivitySection title="Life Skills & Leadership" items={leadership} />
                        </>
                    ) : (
                        <ActivitySection title="Enrichment Programs" items={activitiesData} />
                    )}
                </div>
            </div>
        </LayoutWrapper>
    );
}
