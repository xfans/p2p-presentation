
import React from 'react';
import { NodePosition } from '../types';

interface Props {
  node: NodePosition;
  active?: boolean;
}

const NetworkNode: React.FC<Props> = ({ node, active }) => {
  const getIcon = () => {
    switch (node.type) {
      case 'client':
        return (
          <path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        );
      case 'router':
        return (
          <path d="M12 2v20M2 12h20M7 7l10 10M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        );
      case 'server':
        return (
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
        );
    }
  };

  const colorClass = node.type === 'client' ? 'text-blue-400' : node.type === 'router' ? 'text-amber-400' : 'text-emerald-400';

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <circle 
        r="35" 
        fill="currentColor" 
        className={`${colorClass} opacity-10 transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`} 
      />
      <circle 
        r="28" 
        fill="transparent" 
        stroke="currentColor" 
        className={colorClass} 
        strokeWidth="2" 
        strokeDasharray={active ? '0' : '4 2'} 
      />
      
      <g className={colorClass} transform="translate(-12, -12) scale(1.2)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          {getIcon()}
        </svg>
      </g>

      <text 
        y="55" 
        textAnchor="middle" 
        className="text-[14px] font-bold fill-white"
      >
        {node.label}
      </text>
      <text 
        y="72" 
        textAnchor="middle" 
        className="text-[11px] fill-slate-400 font-mono"
      >
        {node.ip}
      </text>
    </g>
  );
};

export default NetworkNode;
