import React from 'react';
import { 
  BarChart3, ShieldAlert, CheckCircle2, Cpu, Activity, 
  TrendingUp, AlertTriangle, ArrowUpRight, Lock 
} from 'lucide-react';

export default function DashboardView() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Dashboard Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-cyan-400" />
            Security Operations Center (SOC)
          </h2>
          <p className="text-slate-400 font-mono text-xs uppercase mt-1">
            Global threat surface telemetry & multi-LLM consensus matrix
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Node Matrix: NOMINAL</span>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all">
          <div className="text-cyan-400 text-xs font-mono uppercase font-bold">24H Inspected Payloads</div>
          <div className="text-3xl font-black text-white mt-2 font-mono">14,290</div>
          <div className="text-emerald-400 text-xs font-mono mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +18.2% vs previous period
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-rose-500/40 transition-all">
          <div className="text-rose-400 text-xs font-mono uppercase font-bold">Blocked Threat Vectors</div>
          <div className="text-3xl font-black text-rose-400 mt-2 font-mono">1,042</div>
          <div className="text-slate-400 text-xs font-mono mt-1">7.2% overall risk score</div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all">
          <div className="text-cyan-400 text-xs font-mono uppercase font-bold">Consensus Precision</div>
          <div className="text-3xl font-black text-cyan-400 mt-2 font-mono">99.8%</div>
          <div className="text-slate-400 text-xs font-mono mt-1">3 LLM Quorum Agreement</div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-blue-400/40 transition-all">
          <div className="text-blue-400 text-xs font-mono uppercase font-bold">Active Endpoint Extensions</div>
          <div className="text-3xl font-black text-blue-400 mt-2 font-mono">842</div>
          <div className="text-slate-400 text-xs font-mono mt-1">Connected Chrome Nodes</div>
        </div>
      </div>

      {/* Main Equalizer Visual Chart */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between font-mono text-xs">
          <div className="text-white font-bold uppercase flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" /> Hourly Threat Vector Volume Distribution
          </div>
          <span className="text-cyan-400 animate-pulse">● Live Analytics Sync</span>
        </div>

        <div className="grid grid-cols-12 gap-3 h-40 items-end pt-4 border-b border-cyan-500/10 pb-2">
          {[35, 50, 25, 80, 45, 90, 65, 40, 85, 30, 75, 95].map((height, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
              <div 
                style={{ height: `${height}%` }}
                className="w-full bg-gradient-to-t from-cyan-600 via-blue-500 to-indigo-400 rounded-t-lg group-hover:from-cyan-400 group-hover:to-indigo-300 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              />
              <span className="text-[10px] font-mono text-slate-500">{(idx * 2).toString().padStart(2, '0')}:00</span>
            </div>
          ))}
        </div>
      </div>

      {/* Intercepted Threat Stream */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <div className="text-white font-bold uppercase flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-400" /> Intercepted Threat Incident Log
          </div>
          <span className="text-slate-500">Updated Real-Time</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-cyan-500/20 text-slate-400">
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">VECTOR</th>
                <th className="py-3 px-4">PAYLOAD TARGET</th>
                <th className="py-3 px-4">VERDICT</th>
                <th className="py-3 px-4">RISK SCORE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10 text-slate-300">
              <tr className="hover:bg-cyan-950/20 transition-colors">
                <td className="py-3.5 px-4 text-slate-500">15:28:10 IST</td>
                <td className="py-3.5 px-4 text-cyan-400 font-bold">URL / Phishing</td>
                <td className="py-3.5 px-4">verify-your-wallet.xyz/login</td>
                <td className="py-3.5 px-4 text-rose-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> CRITICAL
                </td>
                <td className="py-3.5 px-4 font-bold text-rose-400">95/100</td>
              </tr>
              <tr className="hover:bg-cyan-950/20 transition-colors">
                <td className="py-3.5 px-4 text-slate-500">15:24:02 IST</td>
                <td className="py-3.5 px-4 text-blue-400 font-bold">QR / Quishing</td>
                <td className="py-3.5 px-4">bit.ly/claim-free-crypto</td>
                <td className="py-3.5 px-4 text-amber-400 font-bold">HIGH RISK</td>
                <td className="py-3.5 px-4 font-bold text-amber-400">88/100</td>
              </tr>
              <tr className="hover:bg-cyan-950/20 transition-colors">
                <td className="py-3.5 px-4 text-slate-500">15:19:40 IST</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">File Checksum</td>
                <td className="py-3.5 px-4">e3b0c44298fc1c149afbf4c899...</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">NOMINAL</td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">04/100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
