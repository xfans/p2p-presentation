
import React, { useState } from 'react';
import { DemoType } from './types';
import NATDemo from './components/NATDemo';
import P2PDemo from './components/P2PDemo';
import P2PUseCases from './components/P2PUseCases';
import P2PBenefits from './components/P2PBenefits';
import P2PRelay from './components/P2PRelay';
import Home from './components/Home';
import End from './components/End';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DemoType>(DemoType.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case DemoType.HOME: return <Home onStart={setActiveTab} />;
      case DemoType.CASE: return <P2PUseCases />;
      case DemoType.WHY: return <P2PBenefits />;
      case DemoType.NAT: return <NATDemo />;
      case DemoType.P2P: return <P2PDemo />;
      case DemoType.RELAY: return <P2PRelay />;
      case DemoType.END: return <End onRestart={setActiveTab} />;
      default: return <Home onStart={setActiveTab} />;
    }
  };

  const navItems = [
    { type: DemoType.HOME, label: '封面', color: 'bg-slate-600' },
    { type: DemoType.CASE, label: '应用场景', color: 'bg-blue-600' },
    { type: DemoType.WHY, label: '技术优势', color: 'bg-indigo-600' },
    { type: DemoType.NAT, label: 'NAT 原理', color: 'bg-amber-600' },
    { type: DemoType.P2P, label: 'P2P 打洞', color: 'bg-emerald-600' },
    { type: DemoType.RELAY, label: 'P2P 局限', color: 'bg-rose-600' },
    { type: DemoType.END, label: '结束', color: 'bg-slate-500' },
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 text-slate-100 overflow-hidden">
      {/* Navigation */}
      <nav className="shrink-0 flex justify-center py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="inline-flex p-1 bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-x-auto max-w-[95vw] no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.type}
              onClick={() => setActiveTab(item.type)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === item.type 
                  ? `${item.color} text-white shadow-lg` 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 relative overflow-hidden p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
