
import React from 'react';

const P2PBenefits: React.FC = () => {
  const benefits = [
    {
      label: "负载分担",
      detail: "用户越多带宽越强，彻底摆脱单一服务器的出口瓶颈。",
      color: "text-blue-400"
    },
    {
      label: "高鲁棒性",
      detail: "没有单点故障，部分节点离线不影响全局网络运行。",
      color: "text-emerald-400"
    },
    {
      label: "物理延迟",
      detail: "点对点直连路径最短，无需绕行机房，Ping 值极低。",
      color: "text-amber-400"
    },
    {
      label: "资源利用",
      detail: "通过闲置上传带宽互助，极大地降低了企业的流量成本。",
      color: "text-indigo-400"
    }
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-5xl mx-auto px-4 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">为什么 P2P 是互联网的基石？</h2>
        <p className="text-slate-400">去中心化架构带来的四大核心价值</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
        {benefits.map((benefit, i) => (
          <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
            <div className={`text-xl font-bold mb-3 flex items-center gap-2 ${benefit.color}`}>
              <div className="w-3 h-3 rounded-full bg-current shadow-[0_0_12px_currentColor]"></div>
              {benefit.label}
            </div>
            <p className="text-slate-400 leading-relaxed italic">
              {benefit.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default P2PBenefits;
