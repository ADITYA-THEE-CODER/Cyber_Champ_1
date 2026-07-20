import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import { 
  Shield, Zap, Lock, Cpu, ArrowRight, Activity, Eye, Terminal, 
  CheckCircle2, Layers, FileCode, QrCode, Globe, Sparkles, 
  Download, BarChart3, Database, ShieldAlert, AlertTriangle, RefreshCw, Radio
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Interactive state for Telemetry live updates
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "[SYSTEM INIT]: ZeroTrust Core Engine v2.0 online.",
    "[CONFIG]: Gateway target mapped to cyber-champ-2.onrender.com.",
    "[POLICY]: Default-Deny rulebook loaded.",
  ]);

  // Simulate real-time streaming logs in Telemetry
  useEffect(() => {
    if (activeTab !== 'telemetry') return;

    const streamEvents = [
      "[REALTIME]: Monitoring browser extension WebSocket connections...",
      "[HEURISTICS]: Running background string entropy check on URL cache.",
      "[NODE 02]: Groq Llama-3 consensus node health check OK (12ms).",
      "[NODE 05]: DeepSeek V3 consensus node health check OK (28ms).",
      "[SIEM]: Log telemetry batch dispatched to PostgreSQL cluster.",
      "[INSPECTOR]: Active payload buffer cleared. Zero threats pending."
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < streamEvents.length) {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        setTelemetryLogs(prev => [...prev.slice(-7), `[${time}] ${streamEvents[index]}`]);
        index++;
      } else {
        index = 0;
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleDownloadExtension = () => {
    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Turn on 'Developer mode' and click 'Load unpacked'.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Animated Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none animate-pulse duration-[4000ms]" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Global Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Router */}
      <main className="pb-24 relative z-10">
        {/* ================= HOMEPAGE VIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-28">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-16 text-center space-y-8 animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105 transition-transform">
                <Sparkles className="h-3.5 w-3.5 animate-spin" /> Unified Zero Trust & AI Cyber Defense Ecosystem
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase max-w-5xl mx-auto leading-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                Autonomous Threat Detection & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Multi-LLM Consensus</span>
              </h1>

              <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto font-mono leading-relaxed">
                ZeroTrust One protects enterprise endpoints across web forms, emails, file hashes, QR code matrices, and deep links—running every payload through a 7-layer validation pipeline.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4 animate-bounce" />
                  <span>Launch Threat Gateway</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleDownloadExtension}
                  className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/30 flex items-center gap-3 shadow-lg hover:border-cyan-400/50"
                >
                  <Download className="h-4 w-4 text-cyan-400" />
                  <span>Download Chrome Extension</span>
                </button>

                <button
                  onClick={() => setActiveTab('telemetry')}
                  className="px-6 py-4 rounded-2xl bg-cyan-950/30 hover:bg-cyan-950/50 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/20 flex items-center gap-2"
                >
                  <Terminal className="h-4 w-4" />
                  <span>View Telemetry Stream</span>
                </button>
              </div>

              {/* Live Metric Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-5xl mx-auto">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">System Health</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> 100% ONLINE
                  </div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">FastAPI Core Gateway</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Multi-LLM Matrix</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">GROQ + DEEPSEEK</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Unified Consensus Engine</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Detection Pipeline</div>
                  <div className="text-2xl font-black text-white mt-1">07 LAYERS</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Zero Trust Sanitization</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Avg Scan Speed</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">&lt; 140ms</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Real-time Response Time</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= SCANNER VIEW ================= */}
        {activeTab === 'scanner' && <Scanner />}

        {/* ================= ANIMATED DASHBOARD VIEW ================= */}
        {activeTab === 'dashboard' && (
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  Enterprise Defense Dashboard
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  Real-time threat intelligence & live session analytics
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Live Gateway Operational</span>
              </div>
            </div>

            {/* Pulsing Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all transform hover:-translate-y-1 duration-300">
                <div className="text-cyan-400/80 text-xs font-mono uppercase tracking-wider">Total Vector Scans</div>
                <div className="text-3xl font-black text-white mt-2">1,284</div>
                <div className="text-emerald-400 text-xs font-mono mt-1 flex items-center gap-1">
                  <span className="animate-bounce">↑</span> 18.4% today
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-rose-500/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all transform hover:-translate-y-1 duration-300">
                <div className="text-rose-400/80 text-xs font-mono uppercase tracking-wider">Threats Neutralized</div>
                <div className="text-3xl font-black text-rose-400 mt-2">142</div>
                <div className="text-slate-400 text-xs font-mono mt-1">11.0% risk rate</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all transform hover:-translate-y-1 duration-300">
                <div className="text-cyan-400/80 text-xs font-mono uppercase tracking-wider">Consensus Accuracy</div>
                <div className="text-3xl font-black text-cyan-400 mt-2">99.2%</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Zero Trust verified</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all transform hover:-translate-y-1 duration-300">
                <div className="text-blue-400/80 text-xs font-mono uppercase tracking-wider">Active Extensions</div>
                <div className="text-3xl font-black text-blue-400 mt-2">328</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Browser nodes connected</div>
              </div>
            </div>

            {/* Animated Threat Activity Bar Chart Visual */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-400" /> Vector Threat Frequency (24H Trend)
                </div>
                <span className="text-cyan-400/80 animate-pulse">● Live Stream</span>
              </div>

              {/* Animated CSS Equalizer Bars */}
              <div className="grid grid-cols-12 gap-2 h-32 items-end pt-4 border-b border-cyan-500/10 pb-2">
                {[35, 60, 45, 80, 50, 95, 70, 40, 85, 30, 65, 90].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div 
                      style={{ height: `${height}%` }}
                      className="w-full bg-gradient-to-t from-cyan-600 to-blue-400 rounded-t-lg transition-all duration-500 group-hover:from-cyan-400 group-hover:to-indigo-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    />
                    <span className="text-[9px] font-mono text-slate-500">{i * 2}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intercepted Threat Live Table */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-400 animate-pulse" /> Live Intercepted Threat Stream
                </div>
                <span className="text-slate-500">Auto-refreshing</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-cyan-500/20 text-slate-400">
                      <th className="py-3 px-4">TIMESTAMP</th>
                      <th className="py-3 px-4">VECTOR</th>
                      <th className="py-3 px-4">PAYLOAD TARGET</th>
                      <th className="py-3 px-4">VERDICT</th>
                      <th className="py-3 px-4">RISK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-500/10 text-slate-300">
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-3 px-4 text-slate-500">JUST NOW</td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">URL / Phishing</td>
                      <td className="py-3 px-4">verify-wallet.xyz/login</td>
                      <td className="py-3 px-4 text-rose-400 font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> CRITICAL
                      </td>
                      <td className="py-3 px-4 font-bold text-rose-400">95/100</td>
                    </tr>
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-3 px-4 text-slate-500">2 MINS AGO</td>
                      <td className="py-3 px-4 text-blue-400 font-bold">QR / Quishing</td>
                      <td className="py-3 px-4">bit.ly/claim-crypto-reward</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">HIGH RISK</td>
                      <td className="py-3 px-4 font-bold text-amber-400">88/100</td>
                    </tr>
                    <tr className="hover:bg-cyan-950/20 transition-colors">
                      <td className="py-3 px-4 text-slate-500">5 MINS AGO</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">File Checksum</td>
                      <td className="py-3 px-4">2cf24dba5fb0a30e...</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">NOMINAL</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">08/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= ANIMATED TELEMETRY VIEW ================= */}
        {activeTab === 'telemetry' && (
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  Live System Telemetry
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  Real-time event stream & consensus execution terminal
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 font-mono text-xs">
                  <Radio className="h-4 w-4 animate-pulse text-cyan-400" />
                  <span>Streaming Websocket</span>
                </div>

                <button
                  onClick={() => setTelemetryLogs(["[CLEARED]: Terminal logs reset."])}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-300 font-mono text-xs hover:text-white hover:border-cyan-400/50 transition-all"
                >
                  Clear Console
                </button>
              </div>
            </div>

            {/* Interactive Animated Terminal Output Box */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl font-mono text-xs space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-slate-400">zerotrust-event-daemon.sh</span>
                </div>
                <span>Status: LISTENING</span>
              </div>

              <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-2">
                {telemetryLogs.map((log, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 animate-in slide-in-from-left-2 duration-300"
                  >
                    <span className="text-cyan-500 shrink-0">❯</span>
                    <span className={
                      log.includes('CRITICAL') || log.includes('ERR') 
                        ? 'text-rose-400 font-bold' 
                        : log.includes('OK') || log.includes('ONLINE')
                        ? 'text-emerald-400'
                        : log.includes('HEURISTICS')
                        ? 'text-amber-300'
                        : 'text-slate-300'
                    }>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              {/* Glowing Blinking Cursor Line */}
              <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-cyan-400 font-bold">
                <span>sys_root@zerotrust-telemetry:~$</span>
                <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
