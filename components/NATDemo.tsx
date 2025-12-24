
import React, { useState, useEffect } from 'react';
import NetworkNode from './NetworkNode';
import { NodePosition } from '../types';

const NATDemo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [packetProgress, setPacketProgress] = useState(0);
  const [natTable, setNatTable] = useState<Array<{internal: string, external: string}>>([]);

  const nodes: Record<string, NodePosition> = {
    clientA: { x: 100, y: 200, label: '用户 A (内网)', ip: '192.168.1.5', type: 'client' },
    router: { x: 400, y: 200, label: 'NAT 路由器', ip: '公网: 8.8.8.1', type: 'router' },
    serverC: { x: 700, y: 200, label: '服务器 C (外网)', ip: '1.2.3.4', type: 'server' }
  };

  const steps = [
    { text: "1. 发起请求", sub: "A 发送报文。源: 192.168.1.5，目: 1.2.3.4。" },
    { text: "2. 地址转换", sub: "路由器改写源 IP 为公网 IP 8.8.8.1 并分配端口。" },
    { text: "3. 目标接收", sub: "服务器视角看到的是 8.8.8.1 发起的请求。" },
    { text: "4. 服务器响应", sub: "数据包回传到路由器公网 IP 的对应端口。" },
    { text: "5. 查表转发", sub: "路由器还原目标 IP，精准送达内网用户 A。" }
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
    setNatTable([]);
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

  useEffect(() => {
    if (step === 1 && packetProgress > 50) {
      setNatTable([{ internal: '192.168.1.5:8080', external: '8.8.8.1:12345' }]);
    }
  }, [step, packetProgress]);

  const getPacketPos = () => {
    let start, end;
    if (step === 0 || step === 1) { start = nodes.clientA; end = nodes.router; }
    else if (step === 2) { start = nodes.router; end = nodes.serverC; }
    else if (step === 3) { start = nodes.serverC; end = nodes.router; }
    else { start = nodes.router; end = nodes.clientA; }
    const x = start.x + (end.x - start.x) * (packetProgress / 100);
    const y = start.y + (end.y - start.y) * (packetProgress / 100);
    return { x, y };
  };

  const packetPos = getPacketPos();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="w-full bg-slate-800 rounded-2xl p-4 shadow-2xl relative overflow-hidden border border-slate-700 flex-1 flex flex-col">
        <div className="absolute top-4 left-4 bg-slate-900/90 p-3 rounded-lg border border-slate-700 w-56 shadow-xl z-10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-700 pb-1">NAT 映射表</h4>
          <div className="text-[10px] font-mono">
            {natTable.length === 0 ? <div className="text-slate-600 italic">空...</div> : 
              natTable.map((row, i) => (
                <div key={i} className="flex justify-between text-amber-400">
                  <span>{row.internal}</span>
                  <span>{row.external}</span>
                </div>
              ))
            }
          </div>
        </div>

        <svg viewBox="0 0 800 400" className="flex-1 w-full h-full">
          <line x1="100" y1="200" x2="400" y2="200" stroke="#334155" strokeWidth="4" strokeDasharray="8 4" />
          <line x1="400" y1="200" x2="700" y2="200" stroke="#334155" strokeWidth="4" strokeDasharray="8 4" />
          <NetworkNode node={nodes.clientA} active={step === 0 || step === 4} />
          <NetworkNode node={nodes.router} active={step === 1 || step === 4} />
          <NetworkNode node={nodes.serverC} active={step === 2 || step === 3} />
          <g transform={`translate(${packetPos.x}, ${packetPos.y})`}>
            <circle r="8" fill={step < 3 ? "#60a5fa" : "#34d399"} className="animate-pulse" />
          </g>
        </svg>
      </div>

      <div className="w-full bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl shrink-0 flex items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-400 mb-1">{steps[step].text} ({step + 1}/5)</h3>
          <p className="text-sm text-slate-400">{steps[step].sub}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleNext} disabled={step === steps.length - 1} className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-6 py-2 rounded-lg font-bold">下一步</button>
          <button onClick={handleReset} className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-lg font-bold">重置</button>
        </div>
      </div>
    </div>
  );
};

export default NATDemo;
