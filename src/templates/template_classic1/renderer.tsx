
"use client";
import React from 'react';
import { SchoolContent } from '../../lib/constants/types';
import Header from './components/Header';
import Footer from './components/Footer';
import BroadcastTicker from './components/BroadcastTicker';
import Home from './components/Home';
import About from './components/About';
import Admission from './components/Admission';
import styles from './styles/scoped.module.css';

interface RendererProps {
    data: SchoolContent;
    path?: string;
}

const TemplateClassicRenderer: React.FC<RendererProps> = ({ data, path = '/' }) => {
    // Basic routing logic
    const renderPage = () => {
        const normalizedPath = path === '' || path === '/' ? '/' : path;

        switch (normalizedPath) {
            case '/':
                return <Home data={data} />;
            case '/about':
                return <About data={data} />;
            case '/admission':
                return <Admission data={data} />;
            default:
                return <Home data={data} />;
        }
    };

    return (
        <div className={`text-slate-900 bg-slate-50 min-h-screen flex flex-col ${styles.fadeIn} ${styles.sans}`}>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap" rel="stylesheet" />
            <div className="sticky top-0 z-50 shadow-md">
                <Header data={data} />
                <BroadcastTicker data={data} />
            </div>
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer data={data} />
        </div>
    );
};

export default TemplateClassicRenderer;
