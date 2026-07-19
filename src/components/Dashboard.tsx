import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Radar, Shield, TrendingUp } from 'lucide-react';

interface ScanEvent {
  timestamp: string;
  payload: string;
  threat_level: string;
  risk_score: string;
  source: string;
}

export default function Dashboard() {
  const [scans, setScans] = useState<ScanEvent[]>([]);
  const [stats, setStats] = useState({
    scansToday: 0,
    threatsBlocked: 0,
    avgConfidence: 0,
    activeAlerts: 0,
  });

  useEffect(() => {
    const handleNewScan = (e: Event) => {
      const customEvent = e as CustomEvent<ScanEvent>;
      const newScan = customEvent.detail;
      
      setScans((prev) => [newScan, ...prev]);
      
      const isThreat = newScan.threat_level.includes('🔴') || 
                       newScan.threat_level.includes('HIGH') || 
                       newScan.threat_level.includes('CRITICAL');
      const numericScore = parseInt(newScan.risk_score) || 0;

      setStats((prev) => {
        const totalScans = prev.scansToday + 1;
        return {
          scansToday: totalScans,
          threatsBlocked: isThreat ? prev.threatsBlocked + 1 : prev.threatsBlocked,
          activeAlerts: isThreat ? prev.activeAlerts + 1 : prev.activeAlerts,
          avgConfidence: Math.round(((prev.avgConfidence * prev.scansToday) + numericScore) / totalScans),
        };
      });
    };

    window.addEventListener('zerotrust-scan-completed', handleNewScan);
    return () => window.removeEventListener('zerotrust-scan-completed', handleNewScan);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold">Overview</div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Security Dashboard</h1>
          <p className="text-sm text-neutral-400 mt-1">Session-scoped live telemetry from your ZeroTrust infrastructure.</p>
        </div>
        <div className={`px-3 py-1 text-xs font-semibold rounded-full border border-white/10 ${stats.activeAlerts > 0 ? 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
          {stats.activeAlerts > 0 ? `${stats.activeAlerts} Vulnerabilities Flagged` : 'All Systems Nominal'}
        </div>
      </div>

      {/* Numerical Data Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Scans Today', value: stats.scansToday || '—', icon: Radar },
          { label: 'Threats Blocked', value: stats.threatsBlocked || '—', icon: Shield },
          { label: 'Avg Risk Factor', value: stats.avgConfidence ? `${stats.avgConfidence}%` : '—', icon: TrendingUp },
          { label: 'Active Alerts', value: stats.activeAlerts || '—', icon: AlertTriangle },
        ].map((k) => (
          <div key={k.label} className="p-5 bg-neutral-900/60 border border-white/10 rounded-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-neutral-400">
              <span className="text-xs uppercase tracking-wider font-medium">{k.label}</span>
              <k.icon className="h-4 w-4" />
            </div>
            <div className="mt-3 text-3xl font-bold tracking-tight">{k.value}</div>
            <div className="mt-1 text-[10px] text-neutral-500">
              {stats.scansToday > 0 ? 'Real-time pipeline broadcast connected' : 'Awaiting first telemetry input'}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent Events Processing Stream */}
        <div className="lg:col-span-2 p-6 bg-neutral-900/60 border border-white/10 rounded-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-purple-500" />
            <h2 className="font-semibold">Live Threat Log</h2>
          </div>
          
          {scans.length === 0 ? (
            <div className="rounded-xl border border-dashed border-neutral-800 p-12 text-center text-sm text-neutral-500">
              No runtime telemetry detected. Navigate to the Scanner tab to run an execution sequence.
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
              {scans.map((scan, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-black/40 border border-white/5 text-xs">
                  <div className="space-y-1">
                    <div className="font-mono text-neutral-500">{scan.timestamp}</div>
                    <div className="font-medium max-w-md truncate text-neutral-200">Data: {scan.payload}</div>
                    <div className="text-neutral-500 text-[10px] font-mono">Shield Node: {scan.source}</div>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide ${scan.threat_level.includes('🔴') ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'}`}>
                    {scan.threat_level} (Score: {scan.risk_score})
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Integration Health Metrics */}
        <div className="p-6 bg-neutral-900/60 border border-white/10 rounded-xl backdrop-blur-md space-y-4">
          <h2 className="font-semibold">Core Matrix Status</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-neutral-400">Render Cloud Connection</span>
              <span className="font-mono text-emerald-400">LIVE</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-neutral-400">FastAPI Parsing Router</span>
              <span className="font-mono text-emerald-400">ACTIVE</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-neutral-400">Edge Shield Layer</span>
              <span className="font-mono text-purple-400">DEVOPS UNLOCKED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">OpenAI Consensus Check</span>
              <span className="font-mono text-emerald-400">READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
