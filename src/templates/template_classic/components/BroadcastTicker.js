
import { MOCK_DATA } from '../constants/mockData';

const BroadcastTicker = () => {
    const { BROADCAST } = MOCK_DATA;
    const tickerNews = BROADCAST.announcements.slice(0, 3);

    return (
        <section className="bg-emerald-900 text-white overflow-hidden py-2.5 border-t border-emerald-800">
            <div className="relative flex whitespace-nowrap overflow-hidden">
                <div className="animate-marquee flex items-center">
                    {tickerNews.map((news, idx) => (
                        <div key={`news-1-${idx}`} className="flex items-center">
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">
                                {news.title}: {news.description}
                            </span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mx-4 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                        </div>
                    ))}
                    {tickerNews.map((news, idx) => (
                        <div key={`news-2-${idx}`} className="flex items-center">
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">
                                {news.title}: {news.description}
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
