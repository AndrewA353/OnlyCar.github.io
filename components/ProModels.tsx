import React, { useState } from 'react';
import { getCarReview } from '../services/geminiService';
import { CarModel } from '../types';
import { Zap, Search, DollarSign, Wallet, Gauge, Calendar } from 'lucide-react';

const INITIAL_CARS: CarModel[] = [
  { id: 1, make: 'BMW', model: 'M5 F90', year: '2021', type: 'Седан', imageSeed: 111 },
  { id: 2, make: 'Mercedes', model: 'AMG GT', year: '2022', type: 'Купе', imageSeed: 222 },
  { id: 3, make: 'Audi', model: 'RS6 Avant', year: '2023', type: 'Универсал', imageSeed: 333 },
  { id: 4, make: 'Porsche', model: '911 Turbo S', year: '2022', type: 'Купе', imageSeed: 444 },
  { id: 5, make: 'Toyota', model: 'Supra MK5', year: '2020', type: 'Купе', imageSeed: 555 },
  { id: 6, make: 'Nissan', model: 'GTR R35', year: '2019', type: 'Купе', imageSeed: 666 },
];

const ProModels: React.FC = () => {
  const [cars, setCars] = useState<CarModel[]>(INITIAL_CARS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeReviewId, setActiveReviewId] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleReview = async (id: number, carName: string) => {
    if (activeReviewId === id) {
        setActiveReviewId(null);
        return;
    }
    setActiveReviewId(id);
    setLoading(true);
    setReviewText('');
    const text = await getCarReview(carName);
    setReviewText(text);
    setLoading(false);
  };

  const handleTradeAction = () => {
    alert("Функционал покупки/продажи в разработке");
  };

  const filteredCars = cars.filter(c => 
    `${c.make} ${c.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatReviewText = (text: string) => {
    return { __html: text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') };
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
            Pro <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Модели</span>
            </h2>
            <p className="text-slate-400 mt-2 font-medium">Каталог легендарных авто с AI-аналитикой</p>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-3.5 text-slate-500 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
          <input 
            type="text"
            placeholder="Найти модель..."
            className="w-full bg-slate-800/50 backdrop-blur border border-slate-700 text-white pl-12 pr-5 py-3 rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <div key={car.id} className="group relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-red-500/30 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.2)] flex flex-col h-full hover:-translate-y-2">
            
            {/* Image Area */}
            <div className="relative h-64 overflow-hidden shrink-0">
              <img 
                src={`https://picsum.photos/800/600?random=${car.imageSeed}`} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80"></div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                 <div className="bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-slate-700 flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-400"/>
                    {car.year}
                 </div>
              </div>
              
              <div className="absolute bottom-4 left-6 right-6">
                 <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{car.make}</p>
                 <h3 className="text-3xl font-black text-white leading-none tracking-tight mb-1">{car.model}</h3>
                 <div className="h-1 w-12 bg-red-600 rounded-full mt-3 group-hover:w-20 transition-all duration-500"></div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow bg-slate-800">
              
              <div className="flex items-center justify-between text-slate-400 text-sm mb-6 pb-4 border-b border-slate-700/50">
                 <span className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg">
                    <Gauge size={14} className="text-slate-500" />
                    {car.type}
                 </span>
                 <span className="font-mono text-slate-600 text-xs">ID: {car.id}024</span>
              </div>
              
              <div className="mt-auto space-y-3">
                <button 
                    onClick={() => handleReview(car.id, `${car.make} ${car.model}`)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all font-bold text-sm border shadow-sm ${activeReviewId === car.id ? 'bg-slate-700 text-white border-red-500 shadow-red-500/10' : 'bg-slate-700/30 text-slate-300 border-slate-600/50 hover:bg-slate-700 hover:text-white hover:border-slate-500'}`}
                >
                    <Zap size={16} className={activeReviewId === car.id ? 'text-red-500' : 'text-yellow-500 group-hover:text-yellow-400'} />
                    {activeReviewId === car.id ? 'Свернуть обзор' : 'AI Обзор модели'}
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={handleTradeAction}
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 active:scale-95 border border-emerald-500/50"
                    >
                        <DollarSign size={16} />
                        Купить
                    </button>
                    <button 
                        onClick={handleTradeAction}
                        className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 px-3 rounded-xl font-bold text-sm transition-all active:scale-95 border border-slate-600 shadow-lg shadow-slate-900/20"
                    >
                        <Wallet size={16} />
                        Продать
                    </button>
                </div>
              </div>

              {/* Expandable Review Panel */}
              <div className={`grid transition-all duration-500 ease-out ${activeReviewId === car.id ? 'grid-rows-[1fr] opacity-100 mt-5' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                <div className="overflow-hidden">
                    <div className="p-5 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-300 relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent rounded-l-xl"></div>
                        {loading ? (
                            <div className="flex flex-col gap-2 animate-pulse">
                                <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                                <div className="h-2 bg-slate-700 rounded w-full"></div>
                                <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                            </div>
                        ) : (
                            <div className="leading-relaxed prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={formatReviewText(reviewText)} />
                        )}
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProModels;