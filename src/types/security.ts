export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NOMINAL';
export type VectorType = 'URL' | 'FILE' | 'QRCODE' | 'DNS' | 'PAYLOAD';

export interface ThreatEvent {
  id: string;
  timestamp: string;
  vector: VectorType;
  target: string;
  verdict: SeverityLevel;
  riskScore: number;
  engineConsensus: {
    groq: boolean;
    deepseek: boolean;
    gemini: boolean;
  };
}

export interface TelemetryLog {
  id: number;
  timestamp: string;
  subsystem: 'GATEWAY' | 'CONSENSUS' | 'FIREWALL' | 'HEURISTICS' | 'EXTENSION';
  type: 'SYS' | 'NET' | 'POL' | 'NODE' | 'WARN' | 'ERR';
  message: string;
  metadata?: Record<string, any>;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  color: string;
}
