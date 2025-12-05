import React, { useEffect, useState } from 'react';
import { getAutoNews } from '../services/geminiService';
import { NewsResult } from '../types';
import { Newspaper, Globe, ExternalLink, RotateCw } from 'lucide-react';

const ProNews: React.FC = () => {
  const [data, setData] = useState<NewsResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const result = await getAutoNews();
    setData(result);
    setLoading(false);
    setHasLoaded(true);
  };

  useEffect(() => {
    if (!hasLoaded) {
        fetchNews();
    }
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider flex items-center gap-3">
                Pro <span className="text-green-500">Новости</span>
                <Newspaper className="text-slate-500" size={28}/>
            </h2>
            <p className="text-slate-400 mt-2">
                Свежие сводки автомира. Поиск в реальном времени.
            </p>
        </div>
        <button 
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg border border-slate-600 transition-colors disabled:opacity-50"
        >
            <RotateCw size={18} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Загрузка...' : 'Обновить ленту'}
        </button>
      </div>

      {loading && !data && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p>Сканируем интернет...</p>
        </div>
      )}

      {data && !loading && (
        <div className="grid gap-6 animate-fade-in-up">
            {/* Main Content */}
            <div className="bg-slate-800 rounded-xl p-6 md:p-8 shadow-xl border border-slate-700">
                 <div className="prose prose-invert prose-green max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: data.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                 </div>
            </div>

            {/* Sources */}
            {data.sources.length > 0 && (
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Globe size={16} /> Источники информации
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {data.sources.map((source, idx) => (
                            <a 
                                key={idx}
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-3 rounded-lg border border-slate-700 hover:border-green-500/50 transition-colors group"
                            >
                                <span className="text-sm text-slate-300 truncate font-medium">{source.title}</span>
                                <ExternalLink size={14} className="text-slate-500 group-hover:text-green-400 flex-shrink-0 ml-2" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ProNews;