"use client";

import React from 'react';
import { schoolData } from '../../data';
import { SectionHeader, Card } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';

const ActivitySection: React.FC<{ title: string; items: any[] }> = ({ title, items }) => (
    <div className="mb-32 last:mb-0">
        <SectionHeader title={title} subtitle="Enrichment Programs" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => (
                <Card key={i} title={item.title} description={item.description} image={item.image} />
            ))}
        </div>
    </div>
);

export default function Activities() {
    const { activities } = schoolData;
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

                    <ActivitySection title="Academic Enrichment" items={activities.academic} />
                    <ActivitySection title="Our Active Clubs" items={activities.clubs} />
                    <ActivitySection title="Sports & Development" items={activities.sports} />
                    <ActivitySection title="Extra Curricular Activities" items={activities.extraCurricular} />
                    <ActivitySection title="Arts, Culture & Creativity" items={activities.arts} />
                    <ActivitySection title="Life Skills & Leadership" items={activities.leadership} />
                </div>
            </div>
        </LayoutWrapper>
    );
}
