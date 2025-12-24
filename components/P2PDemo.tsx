
import React, { useState, useEffect } from 'react';
import NetworkNode from './NetworkNode';
import { NodePosition } from '../types';

const P2PDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [packetProgress, setPacketProgress] = useState(0);
  
  const nodes: Record<string, NodePosition> = {
    clientA: { x: 100, y: 300, label: '用户 A', ip: '192.168.1.2', type: 'client' },
    routerA: { x: 250, y: 300, label: '路由器 A', ip: '8.8.8.1', type: 'router' },
    serverC: { x: 400, y: 100, label: '信令服务器', ip: '1.2.3.4', type: 'server' },
    routerB: { x: 550, y: 300, label: '路由器 B', ip: '9.9.9.2', type: 'router' },
    clientB: { x: 700, y: 300, label: '用户 B', ip: '192.168.0.7', type: 'client' }
  };

  const steps = [
    { text: "1. 初始注册", sub: "A 与 B 分别连接信令服务器。各自路由器分配公网映射端口。" },
    { text: "2. 交换坐标", sub: "服务器将 A 的公网信息告知 B，将 B 的公网信息告知 A。" },
    { text: "3. A 发起打洞", sub: "A 向 B 的地址发包，虽然会被 B 的路由器拦截，但 A 开启了出站许可。" },
    { text: "4. B 响应对冲", sub: "B 向 A 发包。此时 A 的路由器认为这是刚才发包的回信，予以放行。" },
    { text: "5. 连接建立", sub: "双方现在可以直接通信，不再需要服务器转发。" }
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
      packets.push({ from: nodes.clientA, via: nodes.routerA, to: nodes.serverC, color: '#60a5fa' });
      packets.push({ from: nodes.clientB, via: nodes.routerB, to: nodes.serverC, color: '#60a5fa' });
    } else if (step === 1) {
      packets.push({ from: nodes.serverC, via: nodes.routerA, to: nodes.clientA, color: '#fbbf24' });
      packets.push({ from: nodes.serverC, via: nodes.routerB, to: nodes.clientB, color: '#fbbf24' });
    } else if (step === 2) {
      packets.push({ from: nodes.clientA, via: nodes.routerA, to: nodes.routerB, color: '#ef4444' });
    } else if (step === 3) {
      packets.push({ from: nodes.clientB, via: nodes.routerB, to: nodes.clientA, color: '#34d399' });
    } else if (step === 4) {
      packets.push({ from: nodes.clientA, via: nodes.routerA, to: nodes.clientB, color: '#34d399' });
      packets.push({ from: nodes.clientB, via: nodes.routerB, to: nodes.clientA, color: '#34d399' });
    }

    return packets.map((p, i) => {
      let x, y;
      if (packetProgress < 50) {
        const lp = packetProgress * 2 / 100;
        x = p.from.x + (p.via.x - p.from.x) * lp;
        y = p.from.y + (p.via.y - p.from.y) * lp;
      } else {
        const lp = (packetProgress - 50) * 2 / 100;
        x = p.via.x + (p.to.x - p.via.x) * lp;
        y = p.via.y + (p.to.y - p.via.y) * lp;
      }
      return <circle key={i} transform={`translate(${x}, ${y})`} r="7" fill={p.color} className="animate-pulse" />;
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="w-full bg-slate-800 rounded-2xl p-4 shadow-2xl relative overflow-hidden border border-slate-700 flex-1 flex flex-col">
        <svg viewBox="0 0 800 450" className="flex-1 w-full h-full">
          <line x1="100" y1="300" x2="700" y2="300" stroke="#1e293b" strokeWidth="2" />
          <line x1="250" y1="300" x2="400" y2="100" stroke="#334155" strokeWidth="2" />
          <line x1="550" y1="300" x2="400" y2="100" stroke="#334155" strokeWidth="2" />
          <NetworkNode node={nodes.clientA} active={step === 4} />
          <NetworkNode node={nodes.routerA} active={step >= 2} />
          <NetworkNode node={nodes.serverC} active={step <= 1} />
          <NetworkNode node={nodes.routerB} active={step >= 2} />
          <NetworkNode node={nodes.clientB} active={step === 4} />
          {renderPackets()}
        </svg>
      </div>

      <div className="w-full bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl shrink-0 flex items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-emerald-400 mb-1">{steps[step].text} ({step + 1}/5)</h3>
          <p className="text-sm text-slate-400">{steps[step].sub}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleNext} disabled={step === steps.length - 1} className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 px-6 py-2 rounded-lg font-bold">下一步</button>
          <button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-bold">重置</button>
        </div>
      </div>
    </div>
  );
};

export default P2PDemo;
