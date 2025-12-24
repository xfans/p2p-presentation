
import React from 'react';
import { DemoType } from '../types';

interface Props {
  onRestart: (tab: DemoType) => void;
}

const End: React.FC<Props> = ({ onRestart }) => {
  const summaries = [
    { title: "NAT 是双刃剑", desc: "它解决了 IPv4 地址枯竭，提供了内网保护，但也让点对点直连变得复杂。" },
    { title: "打洞是核心", desc: "STUN 穿透技术让 P2P 成为可能，实现了低成本、高性能的大规模分发。" },
    { title: "中转是兜底", desc: "对称型 NAT 下直连会失效，TURN 服务器是保障 100% 连通率的最后防线。" }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-10 p-6 bg-emerald-500/10 rounded-full text-emerald-400">
        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
        探索完成！
      </h2>
      
      <p className="text-lg text-slate-400 mb-12 max-w-2xl">
        恭喜你了解了现代互联网分发的核心技术。从基础的 NAT 到复杂的 P2P 穿透，这些技术正支撑着你每一次的流畅视频和极速下载。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
        {summaries.map((s, i) => (
          <div key={i} className="p-5 bg-slate-800/40 border border-slate-700/50 rounded-xl text-left">
            <h4 className="font-bold text-emerald-400 mb-2">{s.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <button 
        onClick={() => onRestart(DemoType.HOME)}
        className="group relative px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold text-lg transition-all border border-slate-600 active:scale-95 flex items-center gap-3"
      >
        <span>再次探索</span>
        <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
};

export default End;
