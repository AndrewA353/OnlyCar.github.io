import React, { useState } from 'react';
import { generatePDDScenario, checkPDDAnswer } from '../services/geminiService';
import { ShieldCheck, AlertTriangle, MessageSquare, Play } from 'lucide-react';

const ProPDD: React.FC = () => {
  const [scenario, setScenario] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const startScenario = async () => {
    setLoading(true);
    setScenario('');
    setFeedback('');
    setUserAnswer('');
    const text = await generatePDDScenario();
    setScenario(text);
    setLoading(false);
  };

  const handleCheck = async () => {
    if (!userAnswer.trim()) return;
    setChecking(true);
    const result = await checkPDDAnswer(scenario, userAnswer);
    setFeedback(result);
    setChecking(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-white uppercase tracking-wider mb-2">
          Pro <span className="text-red-500">ПДД</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Проверь свои знания. ИИ генерирует случайные дорожные ситуации. 
          Твоя задача - разрулить правильно.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="md:col-span-12 flex justify-center mb-6">
          <button 
            onClick={startScenario}
            disabled={loading}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-red-900/50 transition-all transform hover:scale-105 active:scale-95"
          >
            {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
                <Play size={20} fill="currentColor" />
            )}
            {scenario ? 'Новая ситуация' : 'Начать тест'}
          </button>
        </div>

        {/* Scenario Card */}
        {scenario && (
            <div className="md:col-span-12 bg-slate-800 border-l-4 border-yellow-500 rounded-r-lg p-6 shadow-xl mb-6">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="text-yellow-500 min-w-[24px]" size={24} />
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Дорожная ситуация:</h3>
                        <div className="text-lg text-slate-200 leading-relaxed">
                            {scenario}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Answer Section */}
        {scenario && (
            <div className="md:col-span-12 bg-slate-800 rounded-lg p-6 border border-slate-700">
                <label className="block text-slate-400 mb-2 font-medium">Твое решение:</label>
                <div className="flex flex-col gap-4">
                    <textarea 
                        className="w-full bg-slate-900 text-white border border-slate-600 rounded-lg p-4 focus:border-red-500 focus:outline-none min-h-[100px]"
                        placeholder="Я считаю, что уступить должен..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                    />
                    <button 
                        onClick={handleCheck}
                        disabled={checking || !userAnswer}
                        className="self-end flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                         {checking ? 'Проверяю...' : 'Проверить ответ'}
                         <ShieldCheck size={18} />
                    </button>
                </div>
            </div>
        )}

        {/* Feedback Section */}
        {feedback && (
            <div className="md:col-span-12 mt-4 animate-fade-in-up">
                 <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <div className="flex items-start gap-3">
                        <MessageSquare className="text-green-500 mt-1" />
                        <div>
                            <h4 className="font-bold text-white text-lg mb-2">Вердикт Инспектора AI:</h4>
                            <div className="text-slate-300 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: feedback.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')}} />
                        </div>
                    </div>
                 </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProPDD;