import React from 'react';
import { MOCK_DATA } from '../constants/mockData';

const ActivitiesScreen = () => {
    const { ACTIVITIES } = MOCK_DATA;

    const ActivityBlock = ({ title, items, index }) => (
        <div className={`p-10 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-emerald-100 serif">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-bold text-emerald-900 uppercase tracking-widest serif">{title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                        <div className="w-2 h-2 bg-emerald-900 group-hover:scale-125 group-hover:bg-emerald-500 transition-all"></div>
                        <span className="text-slate-600 font-medium text-sm uppercase tracking-widest group-hover:text-emerald-800">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="fade-in">
            <section className="bg-emerald-900 py-24 text-center">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <span className="text-emerald-300 text-xs font-bold uppercase tracking-[0.5em] mb-4 block">Holistic Framework</span>
                    <h1 className="text-4xl md:text-6xl text-white font-bold serif uppercase tracking-widest leading-tight">Extra-Curricular <br /> Pillars</h1>
                    <div className="h-1 w-20 bg-emerald-400 mx-auto mt-8"></div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
                        <ActivityBlock title="Academic Enrichment" items={ACTIVITIES.academic} index={0} />
                        <ActivityBlock title="Our Active Clubs" items={["Science Club", "Math Guild", "Literary Circle", "Debate Forum"]} index={1} />
                        <ActivityBlock title="Sports & Development" items={ACTIVITIES.sports} index={2} />
                        <ActivityBlock title="Extra Curricular" items={["Chess Mastery", "Robotics Guild", "Environment Club"]} index={3} />
                        <ActivityBlock title="Arts & Creativity" items={ACTIVITIES.arts} index={4} />
                        <ActivityBlock title="Leadership Skills" items={ACTIVITIES.life_skills} index={5} />
                    </div>
                </div>
            </section>

            <section className="py-24 bg-emerald-50 border-t border-emerald-100">
                <div className="max-w-[1600px] mx-auto px-2 md:px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-emerald-900 serif uppercase tracking-widest mb-8">Participation Standards</h2>
                        <p className="text-emerald-800 italic leading-relaxed serif text-lg mb-10">"We mandate every student to choose at least two activities beyond the academic curriculum, fostering a balanced growth of the mind, body, and spirit."</p>
                        <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.3em]">Office of Extra-Curricular Affairs</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ActivitiesScreen;
