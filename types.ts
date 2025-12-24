
export enum DemoType {
  HOME = 'HOME',
  CASE = 'CASE',
  WHY = 'WHY',
  NAT = 'NAT',
  P2P = 'P2P',
  RELAY = 'RELAY',
  END = 'END'
}

export interface NodePosition {
  x: number;
  y: number;
  label: string;
  ip: string;
  type: 'client' | 'router' | 'server';
}
