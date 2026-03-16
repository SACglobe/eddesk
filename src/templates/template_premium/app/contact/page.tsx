"use client";

import React from 'react';
import { TenantViewModel } from '@/core/viewmodels/tenant.viewmodel';
import { SectionHeader } from '../../components/Shared';
import LayoutWrapper from '../../components/LayoutWrapper';
import { schoolData } from '../../data';


export default function Contact({ data }: { data?: TenantViewModel }) {
    const sections = data?.homepageSections ?? [];
    const section = sections.find((s: any) => s.sectionKey === 'contact');
    const isEnabled = section?.isEnabled ?? true;
    const isRequired = section?.isRequired ?? false;
    const contact = data?.contactDetails;

    if (!isEnabled) return null;

    const email = contact?.email || schoolData.contact.email;
    const phone = contact?.phone || schoolData.contact.phone;
    const address = contact?.address || schoolData.contact.address;
    const hours = schoolData.contact.hours; // Hours usually static or not in schema yet

    return (
        <LayoutWrapper>
            <div className="fade-in pt-48 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <div>
                            <SectionHeader title="Reach the Academy" subtitle="Direct Connections" />
                            <div className="space-y-16 mt-24">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold mb-4">The Address</h4>
                                    <p className="text-3xl font-serif text-signature-navy leading-tight">{address}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-12">
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold mb-4">Direct Dial</h4>
                                        <p className="text-xl font-serif">{phone}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-signature-gold mb-4">Institutional Hours</h4>
                                        <p className="text-xl font-serif">{hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-signature-ivory p-12 lg:p-24 border border-black/5">
                            <h3 className="text-4xl font-serif mb-12">Registry <span className="italic">Contact</span></h3>
                            <form className="space-y-12" onSubmit={e => e.preventDefault()}>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold">Your Official Name</label>
                                    <input type="text" className="w-full bg-transparent border-b border-signature-navy/20 focus:border-signature-gold outline-none py-2 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold">Nature of Inquiry</label>
                                    <select className="w-full bg-transparent border-b border-signature-navy/20 focus:border-signature-gold outline-none py-2 transition-colors">
                                        <option>General Correspondence</option>
                                        <option>Alumni Relations</option>
                                        <option>Recruitment</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold">Message Text</label>
                                    <textarea rows={4} className="w-full bg-transparent border-b border-signature-navy/20 focus:border-signature-gold outline-none py-2 transition-colors resize-none"></textarea>
                                </div>
                                <button className="w-full bg-signature-navy text-white py-6 uppercase tracking-[0.4em] text-[11px] font-bold hover:bg-signature-gold transition-all duration-500">Dispatch Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}
