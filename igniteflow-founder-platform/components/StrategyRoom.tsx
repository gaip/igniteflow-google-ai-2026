
import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, ShieldCheck, Loader2, AlertCircle, Clock } from 'lucide-react';
import { generateVCAnalysis } from '../services/geminiService';

const StrategyRoom: React.FC = () => {
  const [idea, setIdea] = useState<string>('AI tutoring platform for K-12');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalysis = async () => {
    if (!idea.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    setTimer(0);

    try {
      const response = await generateVCAnalysis(idea);
      setResult(response.text);
    } catch (err: any) {
      setError("Error generating strategy. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-400" size={28} />
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            Strategy Room
            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
              Gemini 3 Pro
            </span>
          </h1>
        </div>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Deep strategic analysis powered by Gemini 3 Pro's advanced reasoning with extended thinking.
        </p>
      </header>

      <section className="relative">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 w-full group">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your startup idea in detail..."
              className="w-full h-40 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all focus:ring-4 focus:ring-blue-500/5 resize-none text-lg leading-relaxed"
            />
          </div>
          
          <button
            onClick={handleAnalysis}
            disabled={loading || !idea.trim()}
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 glow-blue shrink-0 shadow-lg shadow-blue-900/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <ShieldCheck size={20} />
            )}
            RUN VC ANALYSIS
          </button>
        </div>
      </section>

      {(loading || result || error) && (
        <div className="mt-12 animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-[#0f172a]/80 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="px-8 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
              <div className="flex items-center gap-3 text-purple-400">
                <Sparkles size={18} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  {loading ? 'ANALYZING MARKET DYNAMICS...' : 'STRATEGIC ANALYSIS COMPLETE'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-semibold tracking-wide">
                  <Clock size={12} />
                  GENERATED IN {timer}s WITH EXTENDED THINKING
                </div>
              </div>
            </div>

            <div className="p-10">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full animate-ping absolute" />
                    <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin relative z-10" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-slate-300 font-medium text-lg">Running deep reasoning sequences...</p>
                    <p className="text-slate-500 text-sm italic">"Evaluating total addressable market and competitive moats"</p>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-400">
                  <AlertCircle className="shrink-0 mt-0.5" size={20} />
                  <p className="font-medium">{error}</p>
                </div>
              ) : (
                <div className="prose prose-invert prose-blue max-w-none space-y-8">
                  {result?.split('\n\n').map((para, i) => (
                    <div key={i} className="group transition-all">
                      {para.includes('1.') || para.includes('2.') || para.includes('3.') || para.includes('4.') || para.includes('5.') ? (
                        <h3 className="text-blue-400 font-bold text-xl mb-4 flex items-center gap-3">
                          <span className="w-1 h-6 bg-blue-500/50 rounded-full" />
                          {para.replace(/\*\*/g, '')}
                        </h3>
                      ) : (
                        <p className="text-slate-300 text-lg leading-relaxed opacity-90 group-hover:opacity-100">
                          {para.replace(/\*\*/g, '')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyRoom;
