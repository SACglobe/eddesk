"use client";

import React from 'react';

const ScrollToTop: React.FC = () => {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 bg-primary text-accent p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform hidden sm:block"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default ScrollToTop;
