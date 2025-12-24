
import React from 'react';

const P2PApps: React.FC = () => {
  const apps = [
    {
      title: "文件分发 (BitTorrent / 游戏更新)",
      desc: "如 Transmission、uTorrent。大型游戏（如魔兽世界、英雄联盟）的更新器常采用 P2P 补丁分发，避免了数百万玩家同时从单机服务器下载导致的出口带宽崩溃。",
      icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
      color: "blue"
    },
    {
      title: "实时通信 (WebRTC / Discord)",
      desc: "腾讯会议、Discord 和 Zoom 在两人通话时优先尝试 P2P。这消除了数据中转产生的“绕路延迟”，在视频通话这种高带宽、高实时要求的场景中体验最佳。",
      icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
      color: "emerald"
    },
    {
      title: "区块链与加密货币 (Bitcoin)",
      desc: "比特币是去中心化 P2P 的终极应用。没有中央银行或服务器，每一个节点都参与交易记录的维护和验证，确保了极高的安全性与抗审查性。",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.407 2.67 1M12 8V7m0 1c-1.11 0-2.08-.407-2.67-1M12 8V7m0 11c-1.11 0-2.08-.407-2.67-1m2.67 1v1m0-1c1.11 0 2.08.407 2.67 1m-2.67-1v1m-5-10V5a1 1 0 011-1h2a1 1 0 011 1v2m3 10v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2",
      color: "amber"
    },
    {
      title: "私有云同步 (Syncthing / Resilio)",
      desc: "不同于百度网盘或 iCloud，Syncthing 直接在你的电脑、手机、NAS 之间同步文件。数据不经过第三方服务器，不仅速度受限于你的带宽极限，且隐私性极高。",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
      color: "purple"
    }
  ];

  const benefits = [
    {
      label: "负载分担 (Bandwidth)",
      detail: "服务器不再是唯一的出货口。随着用户增加，系统的整体带宽反而会线性增长，这是 C/S 架构无法比拟的。",
      color: "text-blue-400"
    },
    {
      label: "无单点故障 (Robustness)",
      detail: "网络中没有单一的核心服务器。即使 50% 的节点宕机，只要还有节点拥有副本，数据依然可以在剩余节点间流通。",
      color: "text-emerald-400"
    },
    {
      label: "性能优化 (Latency)",
      detail: "对于实时对战游戏或语音，P2P 避免了前往远端机房的往返时间，提供了最低的响应延迟（Ping 值）。",
      color: "text-amber-400"
    },
    {
      label: "成本控制 (Economics)",
      detail: "企业无需支付巨额的 CDN 或带宽费用。用户利用自己的上传带宽互相帮助，实现“人人为我，我为人人”。",
      color: "text-indigo-400"
    }
  ];

  return (
    <div className="w-full max-w-6xl space-y-12 animate-in fade-in zoom-in-95 duration-500">
      {/* Introduction */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">P2P 技术：互联网的“去中心化”力量</h2>
        <p className="text-slate-400 max-w-3xl mx-auto">
          P2P (Peer-to-Peer) 改变了“客户端向服务器索取”的传统模式，让每一台终端都具备了服务他人的能力。
        </p>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl hover:bg-slate-700/50 transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${app.color}-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-${app.color}-500/10 transition-colors`}></div>
            <div className={`w-14 h-14 bg-${app.color}-500/10 rounded-xl flex items-center justify-center text-${app.color}-400 mb-6 group-hover:scale-110 transition-transform`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={app.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{app.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              {app.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
        <h3 className="text-2xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          P2P 技术带来的核心好处
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {benefits.map((benefit, i) => (
            <div key={i} className="space-y-3 p-4 rounded-xl bg-slate-900/40 hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-700">
              <div className={`text-lg font-bold flex items-center gap-2 ${benefit.color}`}>
                <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>
                {benefit.label}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {benefit.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Insight */}
      <div className="bg-indigo-900/10 border border-indigo-500/20 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="bg-indigo-500/20 p-4 rounded-full">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-indigo-300 font-bold mb-1">你知道吗？</h4>
          <p className="text-indigo-200/60 text-sm leading-relaxed">
            早期的 Spotify 实际上是建立在 P2P 技术之上的。它利用桌面端用户的缓存来互相传输音乐片段，这在当时大大降低了公司的流媒体服务器成本，是其能够提供免费服务的关键技术支柱。
          </p>
        </div>
      </div>
    </div>
  );
};

export default P2PApps;
