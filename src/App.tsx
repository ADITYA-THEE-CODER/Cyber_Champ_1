import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import { 
  Shield, Zap, Lock, Cpu, ArrowRight, Activity, Eye, Terminal, 
  CheckCircle2, Layers, FileCode, QrCode, Globe, Sparkles, 
  Download, BarChart3, Database, ShieldAlert, AlertTriangle, 
  RefreshCw, Radio, HardDrive, Server, Play, Trash2, Pause
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Interactive state for Telemetry streaming logs
  const [isStreaming, setIsStreaming] = useState(true);
  const [telemetryLogs, setTelemetryLogs] = useState<Array<{ id: number; time: string; type: string; msg: string }>>([
    { id: 1, time: '15:10:01', type: 'SYS', msg: 'ZeroTrust Core Engine v2.0 online.' },
    { id: 2, time: '15:10:02', type: 'NET', msg: 'Gateway target mapped to cyber-champ-2.onrender.com.' },
    { id: 3, time: '15:10:05', type: 'POL', msg: '7-Layer Default-Deny rulebook loaded into memory.' },
    { id: 4, time: '15:10:12', type: 'NODE', msg: 'Groq Llama-3 consensus worker initialized.' },
    { id: 5, time: '15:10:18', type: 'NODE', msg: 'DeepSeek V3 analysis node online.' },
  ]);

  // Real-time log streamer effect
  useEffect(() => {
    if (activeTab !== 'telemetry' || !isStreaming) return;

    const mockEvents = [
      { type: 'NET', msg: 'Incoming vector request from Chrome Extension extension_node_948' },
      { type: 'SEC', msg: 'Entropy analysis complete for string payload. Score: 0.12 (NOMINAL)' },
      { type: 'NODE', msg: 'Groq Llama-3 node heartbeat check OK (14ms response)' },
      { type: 'NODE', msg: 'DeepSeek V3 consensus pipeline latency nominal (28ms response)' },
      { type: 'WARN', msg: 'Suspicious TLD lookup intercepted (.xyz domain structure detected)' },
      { type: 'POL', msg: 'Zero Trust Sanitizer stripped query parameter track_id=48201' },
      { type: 'SIEM', msg: 'Telemetry stream synced with central logging database.' }
    ];

    let counter = 6;
    const interval = setInterval(() => {
      const nextEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      setTelemetryLogs(prev => [...prev.slice(-12), { id: counter++, time: now, type: nextEvent.type, msg: nextEvent.msg }]);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeTab, isStreaming]);

  const handleDownloadExtension = () => {
    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Turn on 'Developer mode' and click 'Load unpacked'.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none animate-pulse duration-[4000ms]" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Global Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Router */}
      <main className="pb-24 relative z-10">
        {/* ================= HOMEPAGE VIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-28">
            <section className="max-w-7xl mx-auto px-6 pt-16 text-center space-y-8 animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Sparkles className="h-3.5 w-3.5 animate-spin" /> Unified Zero Trust & AI Cyber Defense Ecosystem
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase max-w-5xl mx-auto leading-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                Autonomous Threat Detection & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Multi-LLM Consensus</span>
              </h1>

              <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto font-mono leading-relaxed">
                ZeroTrust One protects enterprise endpoints across web forms, emails, file hashes, QR code matrices, and deep links—running every payload through a 7-layer validation pipeline.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.03]"
                >
                  <Zap className="h-4 w-4 animate-bounce" />
                  <span>Launch Threat Gateway</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleDownloadExtension}
                  className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/30 flex items-center gap-3 shadow-lg"
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

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-5xl mx-auto">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">System Health</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> 100% ONLINE
                  </div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">FastAPI Core Gateway</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Multi-LLM Matrix</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">GROQ + DEEPSEEK</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Unified Consensus Engine</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Detection Pipeline</div>
                  <div className="text-2xl font-black text-white mt-1">07 LAYERS</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Zero Trust Sanitization</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/50 transition-all">
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

        {/* ================= DASHBOARD VIEW ================= */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-500">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  Enterprise Security Operations Center
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  Real-time threat inspection metrics & node health monitoring
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-400 shadow-lg shadow-cyan-950/50">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Gateway Status: ACTIVE</span>
              </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Total Scanned Payloads</div>
                <div className="text-3xl font-black text-white mt-2">1,284</div>
                <div className="text-emerald-400 text-xs font-mono mt-1">↑ 24.5% vs last hour</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-rose-500/50 transition-all">
                <div className="text-rose-400 text-xs font-mono uppercase tracking-wider">Intercepted Threat Vectors</div>
                <div className="text-3xl font-black text-rose-400 mt-2">142</div>
                <div className="text-slate-400 text-xs font-mono mt-1">11.0% threat ratio</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Consensus Score</div>
                <div className="text-3xl font-black text-cyan-400 mt-2">99.4%</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Groq + DeepSeek aligned</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-blue-400/50 transition-all">
                <div className="text-blue-400 text-xs font-mono uppercase tracking-wider">Connected Nodes</div>
                <div className="text-3xl font-black text-blue-400 mt-2">328</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Browser extensions active</div>
              </div>
            </div>

            {/* Visual Threat Activity Histogram */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-400" /> Vector Scan Density (Past 12 Hours)
                </div>
                <span className="text-cyan-400 animate-pulse">● Live Telemetry Feed</span>
              </div>

              <div className="grid grid-cols-12 gap-3 h-36 items-end pt-4 border-b border-cyan-500/10 pb-2">
                {[40, 65, 30, 85, 45, 95, 75, 50, 90, 35, 70, 100].map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div 
                      style={{ height: `${val}%` }} 
                      className="w-full bg-gradient-to-t from-cyan-600 via-blue-500 to-indigo-400 rounded-t-lg group-hover:from-cyan-400 group-hover:to-indigo-300 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    />
                    <span className="text-[10px] font-mono text-slate-500">{idx * 2}h</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Event Feed */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-400 animate-pulse" /> Intercepted Attack Log
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
        )}

        {/* ================= FULL TELEMETRY VIEW ================= */}
        {activeTab === 'telemetry' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  Live Network & System Telemetry Stream
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  WebSocket real-time event pipeline & consensus node inspector
                </p>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className={`px-4 py-2 rounded-2xl border font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                    isStreaming 
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50' 
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                  }`}
                >
                  {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{isStreaming ? 'Pause Stream' : 'Resume Stream'}</span>
                </button>

                <button
                  onClick={() => setTelemetryLogs([{ id: 0, time: new Date().toLocaleTimeString('en-US', { hour12: false }), type: 'SYS', msg: 'Console buffer cleared.' }])}
                  className="px-4 py-2 rounded-2xl bg-slate-900 border border-cyan-500/30 text-slate-300 font-mono text-xs hover:text-white hover:border-cyan-400 transition-all flex items-center gap-2"
                >
                  <Trash2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Clear Logs</span>
                </button>
              </div>
            </div>

            {/* Sidebar Stats + Main Console Split */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column: System Status Nodes */}
              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-3">
                  <div className="text-cyan-400 text-xs font-mono uppercase font-bold flex items-center gap-2">
                    <Server className="h-4 w-4" /> Core Gateway Endpoint
                  </div>
                  <div className="font-mono text-xs text-white bg-slate-950 p-3 rounded-xl border border-cyan-500/20 break-all">
                    cyber-champ-2.onrender.com
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span>Protocol: HTTPS/WSS</span>
                    <span className="text-emerald-400 font-bold">200 OK</span>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-3">
                  <div className="text-cyan-400 text-xs font-mono uppercase font-bold flex items-center gap-2">
                    <Cpu className="h-4 w-4" /> Consensus Node Cluster
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">Groq (Llama-3)</span>
                      <span className="text-emerald-400 font-bold text-[10px]">READY (12ms)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">DeepSeek V3</span>
                      <span className="text-emerald-400 font-bold text-[10px]">READY (24ms)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">Gemini 1.5 Flash</span>
                      <span className="text-emerald-400 font-bold text-[10px]">READY (18ms)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Terminal Stream */}
              <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl font-mono text-xs space-y-4 relative min-h-[500px] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-slate-300 font-bold">zerotrust-event-pipeline.sh</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Radio className="h-3.5 w-3.5 animate-pulse" />
                    <span className="text-[11px]">{isStreaming ? 'STREAMING ACTIVE' : 'STREAM PAUSED'}</span>
                  </div>
                </div>

                {/* Log Line Rows */}
                <div className="space-y-3 overflow-y-auto max-h-[380px] pr-2 flex-1">
                  {telemetryLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 animate-in slide-in-from-left-2 duration-200">
                      <span className="text-slate-600 shrink-0">[{log.time}]</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        log.type === 'SYS' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' :
                        log.type === 'NET' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                        log.type === 'WARN' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                        'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {log.type}
                      </span>
                      <span className="text-slate-200 leading-relaxed">{log.msg}</span>
                    </div>
                  ))}
                </div>

                {/* Cursor Prompt */}
                <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-cyan-400 font-bold">
                  <span>sys_root@zerotrust-telemetry:~$</span>
                  <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
