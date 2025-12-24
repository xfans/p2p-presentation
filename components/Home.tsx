
import React from 'react';
import { DemoType } from '../types';

interface Props {
  onStart: (tab: DemoType) => void;
}

const Home: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center animate-in fade-in zoom-in duration-700">
      <div className="mb-8 p-4 bg-indigo-500/10 rounded-full animate-bounce">
        <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
        网络分发协议<br/>交互式演示
      </h1>
      
      <p className="text-xl text-slate-400 mb-12 leading-relaxed">
        从 NAT 基础到 P2P 穿透，直观理解现代互联网的数据分发奥秘。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="font-bold text-slate-200 mb-2">互联网分发架构</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            从早期的中心化服务器到现在的 P2P 全民共建，互联网一直在寻找更高效率、更低成本的数据交换方案。
          </p>
        </div>
        <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
          <h4 className="font-bold text-slate-200 mb-2">打洞技术的意义</h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            NAT 虽然保护了内网安全，但也阻碍了设备间的直接通信。打洞技术（Hole Punching）通过巧妙利用路由器的状态机，重新实现了点对点的连接。
          </p>
        </div>
      </div>

      <button 
        onClick={() => onStart(DemoType.CASE)}
        className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
      >
        开始探索
      </button>
    </div>
  );
};

export default Home;
