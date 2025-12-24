
import React, { useState, useEffect } from 'react';
import NetworkNode from './NetworkNode';
import { NodePosition } from '../types';

const P2PRelay: React.FC = () => {
  const [step, setStep] = useState(0);
  const [packetProgress, setPacketProgress] = useState(0);
  
  const nodes: Record<string, NodePosition> = {
    clientA: { x: 100, y: 300, label: '用户 A', ip: '192.168.1.2', type: 'client' },
    routerA: { x: 250, y: 300, label: '对称型 NAT (A)', ip: '8.8.8.1', type: 'router' },
    relayServer: { x: 400, y: 100, label: '中转服务器 (TURN)', ip: '1.2.3.4', type: 'server' },
    routerB: { x: 550, y: 300, label: '对称型 NAT (B)', ip: '9.9.9.2', type: 'router' },
    clientB: { x: 700, y: 300, label: '用户 B', ip: '192.168.0.7', type: 'client' }
  };

  const steps = [
    { 
      text: "1. 行为差异：端口映射不固定", 
      sub: "对称型 NAT 最致命的特性：它会根据【目的地】不同而分配不同的公网端口。A 访问服务器时分配了端口 :10001，但访问 B 时，路由器会强行分配一个新的端口 :10002。" 
    },
    { 
      text: "2. 信息错位：打洞预测失败", 
      sub: "B 从服务器获取到的 A 的地址是 :10001，于是 B 向该端口发包。但在 A 的路由器看来，只有给 B 发包的 :10002 才是开启的“洞口”。发往 :10001 的包被视为非法入站，直接丢弃。" 
    },
    { 
      text: "3. 启用中转：绕过防火墙封锁", 
      sub: "既然无法直接通信，A 和 B 都主动连接拥有固定公网 IP 的中转服务器 C。因为是 A 和 B 主动发起的“出站”连接，两边的防火墙都会放行。" 
    },
    { 
      text: "4. 最终通信：全路径数据转发", 
      sub: "数据路径变为：A → 路由器 A → 服务器 C → 路由器 B → B。虽然服务器带宽压力巨大且延迟变高，但这在对称型 NAT 环境下是唯一的联通方案。" 
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
      setPacketProgress(0);
    }
  };

  const handleReset = () => {
    setStep(0);
    setPacketProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (packetProgress < 100) {
      interval = setInterval(() => {
        setPacketProgress(p => Math.min(p + 3, 100));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [step]);

  const renderPackets = () => {
    const packets = [];
    
    if (step === 0) {
      // Showing different ports for different targets
      packets.push({ from: nodes.clientA, via: nodes.routerA, to: nodes.relayServer, color: '#60a5fa', label: '访问服务器 → 映射:10001' });
    } else if (step === 1) {
      // Failed hole punch
      packets.push({ from: nodes.clientB, via: nodes.routerB, to: nodes.routerA, color: '#f43f5e', label: 'B 发往:10001 (A 已改用:10002)' });
    } else if (step === 2) {
      // Requesting Relay
      packets.push({ from: nodes.clientA, via: nodes.routerA, to: nodes.relayServer, color: '#f59e0b', label: '寻找中转' });
      packets.push({ from: nodes.clientB, via: nodes.routerB, to: nodes.relayServer, color: '#f59e0b', label: '寻找中转' });
    } else if (step === 3) {
      // Successful relay flow
      packets.push({ from: nodes.clientA, via: nodes.relayServer, to: nodes.clientB, color: '#6366f1', label: 'TURN 转发中' });
      packets.push({ from: nodes.clientB, via: nodes.relayServer, to: nodes.clientA, color: '#6366f1', label: 'TURN 转发中' });
    }

    return packets.map((p, i) => {
      let x, y;
      if (packetProgress < 50) {
        const localProg = packetProgress * 2 / 100;
        x = p.from.x + (p.via.x - p.from.x) * localProg;
        y = p.from.y + (p.via.y - p.from.y) * localProg;
      } else {
        const localProg = (packetProgress - 50) * 2 / 100;
        x = p.via.x + (p.to.x - p.via.x) * localProg;
        y = p.via.y + (p.to.y - p.via.y) * localProg;
      }

      return (
        <g key={i} transform={`translate(${x}, ${y})`}>
          <circle r="7" fill={p.color} className="animate-pulse shadow-glow" />
          {p.label && (
            <g transform="translate(0, -18)">
              <rect x="-70" y="-10" width="140" height="14" rx="4" fill="black" fillOpacity="0.8" />
              <text textAnchor="middle" fill={p.color} className="text-[9px] font-bold" y="0">{p.label}</text>
            </g>
          )}
        </g>
      );
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
      <div className="flex-1 bg-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden border border-slate-700">
        <svg viewBox="0 0 800 450" className="w-full h-auto">
          {/* Paths */}
          <line x1="100" y1="300" x2="250" y2="300" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="700" y1="300" x2="550" y2="300" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
          
          <line x1="250" y1="300" x2="400" y2="100" stroke={step >= 2 ? "#6366f1" : "#334155"} strokeWidth="3" className="transition-colors duration-1000" />
          <line x1="550" y1="300" x2="400" y2="100" stroke={step >= 2 ? "#6366f1" : "#334155"} strokeWidth="3" className="transition-colors duration-1000" />
          
          {/* Blocked Direct Path */}
          <line x1="250" y1="300" x2="550" y2="300" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 4" strokeOpacity="0.2" />
          
          {/* Port Indicators */}
          <g className="text-[10px] font-mono">
             <text x="210" y="270" textAnchor="middle" fill="#94a3b8">目标:服务器 -> :10001</text>
             <text x="210" y="285" textAnchor="middle" fill="#f43f5e" className={step >= 1 ? "opacity-100" : "opacity-0"}>目标:用户B -> :10002</text>
          </g>

          <NetworkNode node={nodes.clientA} active={step === 3} />
          <NetworkNode node={nodes.routerA} active={step === 1} />
          <NetworkNode node={nodes.relayServer} active={step >= 2} />
          <NetworkNode node={nodes.routerB} />
          <NetworkNode node={nodes.clientB} active={step === 3} />

          {renderPackets()}

          {step === 1 && (
            <g transform="translate(400, 300)">
              <circle r="20" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" />
              <text y="40" textAnchor="middle" className="fill-rose-500 font-bold text-xs">打洞失败：无法预测端口</text>
            </g>
          )}
        </svg>

        <div className="absolute top-4 right-4">
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${step >= 3 ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50' : 'bg-rose-500/20 text-rose-400 border-rose-500/50'}`}>
            {step >= 3 ? '● 中转模式 (TURN) 已生效' : '○ 直连受阻 (对称型限制)'}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-1 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-rose-400">中转演进: {step + 1} / 4</h3>
          <div className="min-h-[180px]">
            <p className="text-lg font-semibold leading-tight mb-3 text-slate-100">{steps[step].text}</p>
            <p className="text-sm text-slate-400 leading-relaxed italic">{steps[step].sub}</p>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button 
              onClick={handleNext}
              disabled={step === steps.length - 1}
              className="flex-1 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 py-3 px-4 rounded-lg font-bold transition-all shadow-lg active:scale-95"
            >
              下一步
            </button>
            <button 
              onClick={handleReset}
              className="bg-slate-700 hover:bg-slate-600 py-3 px-4 rounded-lg font-bold transition-all active:scale-95"
            >
              重置
            </button>
          </div>
        </div>

        <div className="bg-rose-900/20 border border-rose-500/30 p-4 rounded-xl">
          <h4 className="text-sm font-bold text-rose-300 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            深度解析：对称型 NAT
          </h4>
          <p className="text-xs text-rose-200/70 leading-normal">
            普通的 NAT（如锥型 NAT）只要内网 IP:端口不变，映射出的公网端口就不变。但对称型 NAT 增加了<b>“目标地址”</b>作为变量。这就像是路由器给每个新朋友都发了一把不同的钥匙，B 拿着 A 给服务器的钥匙（端口）去开 A 给 B 准备的门，自然会失败。
          </p>
        </div>
      </div>
    </div>
  );
};

export default P2PRelay;
