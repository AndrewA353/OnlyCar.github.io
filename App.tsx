import React, { useState } from 'react';
import { Tab } from './types';
import ProDevice from './components/ProDevice';
import ProModels from './components/ProModels';
import ProPDD from './components/ProPDD';
import ProTips from './components/ProTips';
import ProNews from './components/ProNews';
import { Car, Settings, BookOpen, Menu, X, Zap, Newspaper, Wrench } from 'lucide-react';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.DEVICE:
        return <ProDevice />;
      case Tab.MODELS:
        return <ProModels />;
      case Tab.PDD:
        return <ProPDD />;
      case Tab.TIPS:
        return <ProTips />;
      case Tab.NEWS:
        return <ProNews />;
      case Tab.HOME:
      default:
        return <Hero setTab={setCurrentTab} />;
    }
  };

  const navItems = [
    { id: Tab.HOME, label: 'Главная', icon: <Zap size={18} /> },
    { id: Tab.DEVICE, label: 'Pro Устройство', icon: <Settings size={18} /> },
    { id: Tab.MODELS, label: 'Pro Модели', icon: <Car size={18} /> },
    { id: Tab.TIPS, label: 'Советы', icon: <Wrench size={18} /> },
    { id: Tab.PDD, label: 'ПДД', icon: <BookOpen size={18} /> },
    { id: Tab.NEWS, label: 'Новости', icon: <Newspaper size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentTab(Tab.HOME)}>
              <div className="bg-red-600 p-1.5 rounded mr-2 rotate-3">
                <Car className="text-white" size={20} />
              </div>
              <span className="font-black text-xl tracking-tighter italic text-white">
                Only<span className="text-red-500">Car</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentTab === item.id
                        ? 'bg-red-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-b border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium ${
                    currentTab === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-6 border-t border-slate-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2024 OnlyCar. Создано для пацанов.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Hero Component (Internal)
const Hero: React.FC<{ setTab: (t: Tab) => void }> = ({ setTab }) => (
  <div className="relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <img src="https://picsum.photos/1920/1080?grayscale" alt="bg" className="w-full h-full object-cover" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
        Всё про <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Тачки</span>
      </h1>
      <p className="mt-4 max-w-2xl text-xl text-slate-300 mb-10">
        Узнай как работает двигатель, выбери модель мечты, получи советы по уходу и прокачай знания ПДД.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={() => setTab(Tab.MODELS)}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
        >
          Смотреть Тачки
        </button>
        <button 
          onClick={() => setTab(Tab.NEWS)}
          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-full text-lg border border-slate-600 hover:border-slate-400 transition-all"
        >
          Свежие Новости
        </button>
      </div>
    </div>
    
    {/* Features Grid */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-xl hover:border-red-500/50 transition-colors">
                <Settings className="text-red-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Техника</h3>
                <p className="text-slate-400">Подробный разбор узлов.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-xl hover:border-red-500/50 transition-colors">
                <Wrench className="text-red-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Уход</h3>
                <p className="text-slate-400">Советы по обслуживанию.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-xl hover:border-red-500/50 transition-colors">
                <Newspaper className="text-red-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Новости</h3>
                <p className="text-slate-400">Тренды и новинки рынка.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-6 rounded-xl hover:border-red-500/50 transition-colors">
                <BookOpen className="text-red-500 w-10 h-10 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">ПДД</h3>
                <p className="text-slate-400">Разбор сложных ситуаций.</p>
            </div>
        </div>
    </div>
  </div>
);

export default App;