import React, { useState } from 'react';
import { explainCarPart } from '../services/geminiService';
import { CarPart } from '../types';
import { Wrench, Settings, Battery, CircleDashed, Thermometer, Wind } from 'lucide-react';

const PARTS: CarPart[] = [
  { id: 'engine', name: 'Двигатель (ДВС)', icon: 'engine', shortDesc: 'Сердце тачки' },
  { id: 'transmission', name: 'Трансмиссия (КПП)', icon: 'gears', shortDesc: 'Передает момент' },
  { id: 'brakes', name: 'Тормозная система', icon: 'disc', shortDesc: 'Главное - вовремя встать' },
  { id: 'suspension', name: 'Подвеска', icon: 'spring', shortDesc: 'Держит дорогу' },
  { id: 'turbo', name: 'Турбонаддув', icon: 'wind', shortDesc: 'Дает пинка' },
  { id: 'cooling', name: 'Система охлаждения', icon: 'temp', shortDesc: 'Чтоб не закипел' },
];

const ProDevice: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = async (part: CarPart) => {
    setSelectedPart(part);
    setLoading(true);
    setExplanation('');
    const text = await explainCarPart(part.name);
    setExplanation(text);
    setLoading(false);
  };

  const renderIcon = (icon: string) => {
    const className = "w-8 h-8 text-red-500 mb-2";
    switch (icon) {
      case 'engine': return <Settings className={className} />;
      case 'gears': return <Wrench className={className} />;
      case 'disc': return <CircleDashed className={className} />;
      case 'spring': return <Settings className={className} />; // Placeholder
      case 'wind': return <Wind className={className} />;
      case 'temp': return <Thermometer className={className} />;
      default: return <Wrench className={className} />;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold text-white mb-6 uppercase tracking-wider">
        Pro <span className="text-red-500">Устройство</span>
      </h2>
      <p className="text-gray-400 mb-8">
        Выбери узел, чтобы узнать как он работает. AI Механик пояснит за матчасть.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARTS.map((part) => (
          <div 
            key={part.id}
            onClick={() => handleSelect(part)}
            className={`cursor-pointer bg-slate-800 p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${selectedPart?.id === part.id ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'border-slate-700 hover:border-slate-500'}`}
          >
            {renderIcon(part.icon)}
            <h3 className="text-xl font-bold text-white">{part.name}</h3>
            <p className="text-slate-400 text-sm mt-1">{part.shortDesc}</p>
          </div>
        ))}
      </div>

      {selectedPart && (
        <div className="mt-10 bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            <h3 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
                {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>}
                {loading ? 'AI Механик думает...' : `Пояснение за ${selectedPart.name}`}
            </h3>
            <div className="prose prose-invert max-w-none text-slate-300">
                {loading ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                        <div className="h-4 bg-slate-700 rounded w-full"></div>
                        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: explanation.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br />') }} />
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default ProDevice;