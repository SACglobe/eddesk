
const BroadcastTicker = ({ announcements }) => {
    const tickerNews = [...announcements, ...announcements, ...announcements, ...announcements];

    return (
        <section className="bg-emerald-900 text-white overflow-hidden py-2.5 border-t border-emerald-800">
            <div className="relative flex whitespace-nowrap overflow-hidden">
                <div className="animate-marquee flex items-center">
                    {tickerNews.map((news, idx) => {
                        const getPriorityStyles = (priority) => {
                            switch (priority) {
                                case 3: return "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)] border-red-500";
                                case 2: return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)] border-yellow-400";
                                case 1:
                                default: return "bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.4)] border-emerald-500";
                            }
                        };
                        return (
                            <div key={`news-1-${idx}`} className="flex items-center">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">
                                    {news.title}: {news.message}
                                </span>
                                <div className={`w-2 h-2 rounded-full mx-4 border ${getPriorityStyles(news.priority)}`}></div>
                            </div>
                        );
                    })}
                    {tickerNews.map((news, idx) => {
                        const getPriorityStyles = (priority) => {
                            switch (priority) {
                                case 3: return "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)] border-red-500";
                                case 2: return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)] border-yellow-400";
                                case 1:
                                default: return "bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.4)] border-emerald-500";
                            }
                        };
                        return (
                            <div key={`news-2-${idx}`} className="flex items-center">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest px-8">
                                    {news.title}: {news.message}
                                </span>
                                <div className={`w-2 h-2 rounded-full mx-4 border ${getPriorityStyles(news.priority)}`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BroadcastTicker;
