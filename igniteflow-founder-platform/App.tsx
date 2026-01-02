
import React, { useState } from 'react';
import { LayoutGrid, BarChart3, Presentation, Palette, BookOpen, Settings, Zap, Award } from 'lucide-react';
import { ModuleType, SidebarItem } from './types';
import StrategyRoom from './components/StrategyRoom';

const sidebarItems: SidebarItem[] = [
  { id: ModuleType.FOUNDER_CENTRAL, label: 'Founder Central', icon: <LayoutGrid size={20} /> },
  { id: ModuleType.MARKET_INTEL, label: 'Market Intel', icon: <BarChart3 size={20} /> },
  { id: ModuleType.PITCH_LAB, label: 'Pitch Lab', icon: <Presentation size={20} /> },
  { id: ModuleType.BRAND_STUDIO, label: 'Brand Studio', icon: <Palette size={20} /> },
  { id: ModuleType.STRATEGY_ROOM, label: 'Strategy Room', icon: <BookOpen size={20} /> },
];

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.STRATEGY_ROOM);

  const renderContent = () => {
    switch (activeModule) {
      case ModuleType.STRATEGY_ROOM:
        return <StrategyRoom />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
            <div className="p-8 rounded-full bg-slate-900 border border-slate-800">
              {sidebarItems.find(i => i.id === activeModule)?.icon}
            </div>
            <h2 className="text-xl font-medium text-slate-200">
              {sidebarItems.find(i => i.id === activeModule)?.label}
            </h2>
            <p className="max-w-xs text-center opacity-60">
              This module is currently being optimized for high-performance strategic workflows.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col bg-[#05091a]">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap size={24} className="text-white fill-current" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">IgniteFlow</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeModule === item.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 glow-blue'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
              {activeModule === item.id && (
                <div className="ml-auto w-1 h-4 bg-blue-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2 text-yellow-500">
              <Award size={16} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Contest Ready</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Build your GFS Startup School entry with enterprise-grade AI modules.
            </p>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold text-sm">
              F4
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-200 truncate">Founder #4021</h4>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Tier: Scaler Pro</p>
            </div>
            <Settings size={18} className="text-slate-500 cursor-pointer hover:text-slate-300" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0a1f] to-[#020617] relative">
        <div className="max-w-5xl mx-auto p-12">
          {renderContent()}
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      </main>
    </div>
  );
};

export default App;
