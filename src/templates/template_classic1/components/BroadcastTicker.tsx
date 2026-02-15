
import React from 'react';
import { SchoolContent } from '../../../lib/constants/types';
import styles from '../styles/scoped.module.css';

interface BroadcastTickerProps {
    data: SchoolContent;
}

const BroadcastTicker: React.FC<BroadcastTickerProps> = ({ data }) => {
    if (!data.broadcast?.runningMessage) return null;

    return (
        <section className="bg-emerald-900 text-white overflow-hidden py-2.5 border-t border-emerald-800">
            <div className="relative flex whitespace-nowrap overflow-hidden">
                <div className={`${styles.animateMarquee} flex items-center`}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center">
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">
                                {data.broadcast.runningMessage}
                            </span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mx-4 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default BroadcastTicker;
