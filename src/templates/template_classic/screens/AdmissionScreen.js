"use client";
import React from 'react';

const AdmissionScreen = ({ data }) => {
    const ADMISSION = {
        admission_overview: data?.about || "Our institution welcomes students from all backgrounds. We value diversity and seek to provide a platform for holistic growth.",
        admission_process: [
            "Online Application Submission",
            "Document Verification",
            "Entrance Evaluation / Interaction",
            "Provisional Admission Offer",
            "Fee Remittance & Enrollment"
        ],
        fee_payment_url: data?.paymentLinks?.find(l => l.linkType === 'admission_fee')?.url || '#',
        admission_form_fields: [
            { label: "Student Full Name", type: "text", required: true },
            { label: "Applied Grade", type: "select", required: true },
            { label: "Parent/Guardian Name", type: "text", required: true },
            { label: "Contact Phone", type: "tel", required: true },
            { label: "Email Address", type: "email", required: true }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 fade-in">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-widest serif">Admission Inquiry</h1>
                <div className="h-1 w-20 bg-emerald-900 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest serif mb-6 border-b border-emerald-50 pb-4">Overview</h2>
                        <p className="text-slate-700 leading-relaxed">{ADMISSION.admission_overview}</p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest serif mb-6 border-b border-emerald-50 pb-4">Procedural Steps</h2>
                        <ul className="space-y-4">
                            {ADMISSION.admission_process.map((step, idx) => (
                                <li key={idx} className="flex gap-4 items-start border-l-2 border-emerald-900 pl-6 py-2 bg-emerald-50/20">
                                    <span className="text-emerald-900 font-bold uppercase tracking-widest text-xs">Step {idx + 1}</span>
                                    <p className="text-slate-700 font-medium text-sm">{step}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="p-8 bg-emerald-900 text-white shadow-xl">
                        <h3 className="text-xl font-bold serif uppercase tracking-widest mb-4">Online Fee Remittance</h3>
                        <p className="text-emerald-300 text-sm mb-8 leading-relaxed">Please utilize our secure portal for admission fees and term fee payments. Managed via CC Avenue.</p>
                        <a
                            href={ADMISSION.fee_payment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 bg-white text-emerald-900 text-xs font-bold uppercase tracking-[0.2em] hover:bg-emerald-50 transition-colors"
                        >
                            Access Payment Portal
                        </a>
                    </section>
                </div>

                <div className="bg-white border border-emerald-100 shadow-2xl p-10 border-t-8 border-t-emerald-900">
                    <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest serif mb-2">Inquiry Form</h2>
                    <p className="text-emerald-600 text-xs uppercase tracking-widest mb-8 font-bold">Formal Application of Interest</p>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        {ADMISSION.admission_form_fields.map((field, idx) => (
                            <div key={idx}>
                                <label className="block text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                {field.type === 'select' ? (
                                    <select className="w-full bg-emerald-50/30 border border-emerald-100 p-3 text-sm focus:outline-none focus:border-emerald-900 transition-colors">
                                        <option value="">Select Option</option>
                                        <option value="kg">Kindergarten</option>
                                        <option value="primary">Primary School</option>
                                        <option value="high">High School</option>
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        required={field.required}
                                        className="w-full bg-emerald-50/30 border border-emerald-100 p-3 text-sm focus:outline-none focus:border-emerald-900 transition-colors"
                                        placeholder={`Enter ${field.label}`}
                                    />
                                )}
                            </div>
                        ))}
                        <button className="w-full py-4 bg-emerald-900 text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-emerald-800 transition-colors shadow-lg">
                            Submit Formal Inquiry
                        </button>
                        <p className="text-[10px] text-center text-emerald-600 font-bold uppercase tracking-widest mt-4">
                            Our office will contact you within 48 business hours.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdmissionScreen;
