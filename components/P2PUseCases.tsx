
import React from 'react';

const P2PUseCases: React.FC = () => {
  const apps = [
    {
      title: "文件分发 (BitTorrent)",
      desc: "如游戏补丁包。随着下载者增加，整个网络的带宽反而更强。",
      icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
      color: "blue"
    },
    {
      title: "实时通信 (WebRTC)",
      desc: "Discord、Zoom 通话。P2P 消除中转，提供极致低延迟体验。",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      color: "emerald"
    },
    {
      title: "区块链 (Bitcoin)",
      desc: "去中心化账本。每个节点参与验证，抗审查且无需中心银行。",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7",
      color: "amber"
    },
    {
      title: "云同步 (Syncthing)",
      desc: "私有数据互传。不经过第三方服务器，速度快且隐私性高。",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5",
      color: "purple"
    }
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-6xl mx-auto px-4 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">P2P 典型应用案例</h2>
        <p className="text-slate-400">改变“向中心索取”模式，让每个终端成为服务提供者。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {apps.map((app, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-start gap-4 hover:border-blue-500/50 transition-all shadow-lg">
            <div className={`shrink-0 w-12 h-12 bg-${app.color}-500/10 rounded-xl flex items-center justify-center text-${app.color}-400`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={app.icon} />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{app.title}</h3>
              <p className="text-slate-400 text-sm leading-tight">{app.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default P2PUseCases;
