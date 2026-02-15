import React from 'react';
import { Header, Footer } from './Navigation';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-signature-gold selection:text-white overflow-x-hidden">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default LayoutWrapper;
