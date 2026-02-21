import React from 'react';

const BroadcastScreen = ({ data }) => {
    const now = new Date();
    const activeAnnouncements = (data?.announcements ?? []).filter(a =>
        a.isActive && (a.expiresAt == null || new Date(a.expiresAt) > now)
    ).map(a => ({
        publish_date: new Date(a.createdAt || Date.now()).toLocaleDateString(),
        title: a.title,
        description: a.message
    }));

    const upcomingEvents = (data?.events ?? []).filter(e =>
        e.isActive && (e.eventDate && new Date(e.eventDate) >= now)
    ).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
        .map(e => ({
            event_date: e.eventDate,
            title: e.title,
            description: e.description
        }));

    const circulars = (data?.circulars ?? []).filter(c => c.isActive)
        .map(c => ({
            title: c.title,
            pdf_url: c.fileUrl
        }));

    const academicCalendar = (data?.academicCalendar ?? []).filter(e => e.isActive)
        .map(e => ({
            date: new Date(e.eventDate).toLocaleDateString(),
            title: e.title,
            type: e.eventType // assuming eventType maps to "Holiday" or "Academic"
        }));

    const BROADCAST = {
        announcements: activeAnnouncements,
        events: upcomingEvents,
        circulars: circulars,
        academic_calendar: academicCalendar
    };

    return (
        <div className="max-w-[1600px] mx-auto px-2 md:px-6 py-20 fade-in">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-widest serif">Notices & Events</h1>
                <div className="h-1 w-20 bg-emerald-900 mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left Column: Announcements & Circulars */}
                <div className="space-y-16">
                    <section>
                        <h2 className="text-xl font-bold text-emerald-900 uppercase tracking-widest serif mb-8 border-b border-emerald-50 pb-4">Latest Announcements</h2>
                        <div className="space-y-6">
                            {BROADCAST.announcements.map((item, idx) => (
                                <div key={idx} className="bg-white p-6 border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors">
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">{item.publish_date}</span>
                                    <h3 className="text-lg font-bold text-slate-900 serif mb-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-emerald-900 uppercase tracking-widest serif mb-8 border-b border-emerald-50 pb-4">Circulars & Downloads</h2>
                        <div className="bg-emerald-50/50 p-8 border border-emerald-100">
                            <ul className="space-y-4">
                                {BROADCAST.circulars.map((item, idx) => (
                                    <li key={idx} className="flex justify-between items-center bg-white p-4 border border-emerald-50 shadow-sm group">
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-900 transition-colors">{item.title}</span>
                                        <a href={item.pdf_url} className="text-xs font-bold text-emerald-900 uppercase tracking-widest border-b border-emerald-900 hover:text-emerald-600 hover:border-emerald-600 transition-colors">Download PDF</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>

                {/* Right Column: Events & Calendar */}
                <div className="space-y-16">
                    <section>
                        <h2 className="text-xl font-bold text-emerald-900 uppercase tracking-widest serif mb-8 border-b border-emerald-50 pb-4">Upcoming Events</h2>
                        <div className="space-y-6">
                            {BROADCAST.events.map((item, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="bg-emerald-900 text-white p-4 flex flex-col items-center justify-center min-w-[100px] h-fit shadow-lg group-hover:bg-emerald-800 transition-colors">
                                        <span className="text-2xl font-bold serif">{item.event_date.split('-')[2]}</span>
                                        <span className="text-[10px] uppercase font-bold tracking-tighter text-emerald-300">
                                            {new Date(item.event_date).toLocaleString('default', { month: 'short' })} {item.event_date.split('-')[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 serif mb-1 group-hover:text-emerald-900 transition-colors">{item.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-emerald-900 uppercase tracking-widest serif mb-8 border-b border-emerald-50 pb-4">Academic Calendar</h2>
                        <div className="overflow-hidden border border-emerald-100 rounded-sm shadow-sm bg-white">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-emerald-50/50 border-b border-emerald-100">
                                    <tr>
                                        <th className="px-6 py-3 font-bold text-emerald-900 uppercase tracking-widest text-[10px]">Date</th>
                                        <th className="px-6 py-3 font-bold text-emerald-900 uppercase tracking-widest text-[10px]">Event</th>
                                        <th className="px-6 py-3 font-bold text-emerald-900 uppercase tracking-widest text-[10px]">Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-emerald-50">
                                    {BROADCAST.academic_calendar.map((entry, idx) => (
                                        <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-500 whitespace-nowrap">{entry.date}</td>
                                            <td className="px-6 py-4 font-bold text-slate-900">{entry.title}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full ${entry.type === 'Holiday' ? 'bg-red-50 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {entry.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BroadcastScreen;
