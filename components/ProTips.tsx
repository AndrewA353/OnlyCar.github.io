import React, { useState } from 'react';
import { getCarCareAdvice } from '../services/geminiService';
import { Droplet, Wrench, Sun, Snowflake, Shield, Sparkles } from 'lucide-react';

const TOPICS = [
  { id: 'wash', title: 'Мойка и Детейлинг', icon: <Droplet className="w-8 h-8 text-blue-400" />, desc: 'Как мыть чтобы блестела' },
  { id: 'oil', title: 'Масло и ТО', icon: <Wrench className="w-8 h-8 text-orange-500" />, desc: 'Меняем жижи вовремя' },
  { id: 'winter', title: 'Зимняя подготовка', icon: <Snowflake className="w-8 h-8 text-cyan-300" />, desc: 'Чтоб завелась в -30' },
  { id: 'summer', title: 'Летний сезон', icon: <Sun className="w-8 h-8 text-yellow-400" />, desc: 'Кондей и резина' },
  { id: 'body', title: 'Кузов и ЛКП', icon: <Shield className="w-8 h-8 text-purple-500" />, desc: 'Убираем сколы и рыжики' },
  { id: 'interior', title: 'Салон', icon: <Sparkles className="w-8 h-8 text-pink-400" />, desc: 'Кожа, пластик, химчистка' },
];

const ProTips: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSelect = async (topic: typeof TOPICS[0]) => {
    setSelectedTopic(topic.title);
    setLoading(true);
    setAdvice('');
    const text = await getCarCareAdvice(topic.title);
    setAdvice(text);
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-6 uppercase tracking-wider">
        Pro <span className="text-blue-500">Уход</span>
      </h2>
      <p className="text-gray-400 mb-8">
        Машина любит ласку и смазку. Выбери тему, чтобы получить четкий гайд по обслуживанию.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {TOPICS.map((t) => (
          <div 
            key={t.id}
            onClick={() => handleSelect(t)}
            className={`cursor-pointer bg-slate-800 p-6 rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${selectedTopic === t.title ? 'border-blue-500 bg-slate-800/80' : 'border-slate-700 hover:border-slate-500'}`}
          >
            <div className="mb-4 bg-slate-900 w-14 h-14 rounded-full flex items-center justify-center shadow-inner">
                {t.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{t.title}</h3>
            <p className="text-slate-400 text-sm mt-2">{t.desc}</p>
          </div>
        ))}
      </div>

      {selectedTopic && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl relative animate-fade-in-up">
            <h3 className="text-2xl font-bold text-blue-500 mb-6 flex items-center gap-3">
                {loading && <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>}
                {loading ? 'Формируем список рекомендаций...' : `Гайд: ${selectedTopic}`}
            </h3>
            
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-800 rounded w-full"></div>
                        <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: advice.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br />') }} />
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default ProTips;