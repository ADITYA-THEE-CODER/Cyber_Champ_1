import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import { 
  Shield, Zap, Lock, Cpu, ArrowRight, Activity, Eye, Terminal, 
  CheckCircle2, Layers, FileCode, QrCode, Globe, Sparkles, 
  Download, BarChart3, Database, ShieldAlert, AlertTriangle, RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleDownloadExtension = () => {
    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Turn on 'Developer mode' and click 'Load unpacked'.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Global Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Router */}
      <main className="pb-24 relative z-10">
        {/* ================= HOMEPAGE VIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-28">
            {/* 1. HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-16 text-center space-y-8 animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Unified Zero Trust & AI Cyber Defense Ecosystem
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase max-w-5xl mx-auto leading-tight drop-shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                Autonomous Threat Detection & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Multi-LLM Consensus</span>
              </h1>

              <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto font-mono leading-relaxed">
                ZeroTrust One protects enterprise endpoints across web forms, emails, file hashes, QR code matrices, and deep links—running every payload through a 7-layer validation pipeline.
              </p>

              {/* Action Buttons Hub */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.02]"
                >
                  <Zap className="h-4 w-4" />
                  <span>Launch Threat Gateway</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleDownloadExtension}
                  className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/30 flex items-center gap-3 shadow-lg shadow-black/50"
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
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">System Health</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">100% ONLINE</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">FastAPI Core Gateway</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Multi-LLM Matrix</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">GROQ + DEEPSEEK</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Unified Consensus Engine</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Detection Pipeline</div>
                  <div className="text-2xl font-black text-white mt-1">07 LAYERS</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Zero Trust Sanitization</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Avg Scan Speed</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">&lt; 140ms</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Real-time Response Time</div>
                </div>
              </div>
            </section>

            {/* 2. THREE CORE VECTORS SHOWCASE */}
            <section className="max-w-7xl mx-auto px-6 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  Supported Attack Vector Inspectors
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                  Instantaneous pattern matching & zero trust validation across all input types
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all relative overflow-hidden group">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">1. URL / Phishing Vector</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Profiles domain registration metrics, TLD reputation scores, credential harvesting prompts, and suspicious redirect loops.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all relative overflow-hidden group">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <FileCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">2. File Hash Vector</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Evaluates SHA-256, SHA-1, and MD5 cryptographic signatures against global vulnerability databases to flag malware executables.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all relative overflow-hidden group">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">3. QR Code / Quishing</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Decodes visual matrix structures and isolates embedded shortlinks designed to bypass traditional email spam filters.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= SCANNER VIEW ================= */}
        {activeTab === 'scanner' && <Scanner />}

        {/* ================= DASHBOARD VIEW ================= */}
        {activeTab === 'dashboard' && (
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  Enterprise Defense Dashboard
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  Real-time threat intelligence & session analytics
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Network Gateway Connected
              </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
                <div className="text-cyan-400/70 text-xs font-mono uppercase">Total Vector Scans</div>
                <div className="text-3xl font-black text-white mt-2">1,284</div>
                <div className="text-emerald-400 text-xs font-mono mt-1">↑ 18.4% today</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
                <div className="text-cyan-400/70 text-xs font-mono uppercase">Threats Neutralized</div>
                <div className="text-3xl font-black text-rose-400 mt-2">142</div>
                <div className="text-slate-400 text-xs font-mono mt-1">11.0% attack rate</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
                <div className="text-cyan-400/70 text-xs font-mono uppercase">Consensus Accuracy</div>
                <div className="text-3xl font-black text-cyan-400 mt-2">99.2%</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Zero Trust verified</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
                <div className="text-cyan-400/70 text-xs font-mono uppercase">Active Extensions</div>
                <div className="text-3xl font-black text-blue-400 mt-2">328</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Browser nodes live</div>
              </div>
            </div>

            {/* Recent High Threat Detection Table */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-400" /> Recent Intercepted Vectors
                </div>
                <span className="text-slate-500">Auto-Refreshed</span>
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
                    <tr>
                      <td className="py-3 px-4 text-slate-500">15:18:02 IST</td>
                      <td className="py-3 px-4 text-cyan-400 font-bold">URL / Phishing</td>
                      <td className="py-3 px-4">verify-wallet.xyz/login</td>
                      <td className="py-3 px-4 text-rose-400 font-bold">🔴 CRITICAL</td>
                      <td className="py-3 px-4 font-bold">95/100</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-500">15:12:44 IST</td>
                      <td className="py-3 px-4 text-blue-400 font-bold">QR / Quishing</td>
                      <td className="py-3 px-4">bit.ly/claim-crypto-reward</td>
                      <td className="py-3 px-4 text-amber-400 font-bold">🟠 HIGH RISK</td>
                      <td className="py-3 px-4 font-bold">88/100</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-slate-500">14:55:10 IST</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">File Checksum</td>
                      <td className="py-3 px-4">a1b2c3d4...6400</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">🟢 NOMINAL</td>
                      <td className="py-3 px-4 font-bold">08/100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TELEMETRY VIEW ================= */}
        {activeTab === 'telemetry' && (
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  Live System Telemetry
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  Real-time websocket event log & policy execution monitor
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Telemetry stream cleared.")}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-300 font-mono text-xs hover:text-white"
                >
                  Clear Terminal
                </button>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl font-mono text-xs space-y-3 leading-relaxed">
              <div className="text-cyan-400 font-bold">[SYSTEM INIT]: ZeroTrust Core Engine v2.0 initialized.</div>
              <div className="text-slate-400">[CONFIG]: FastAPI Endpoint: cyber-champ-2.onrender.com</div>
              <div className="text-slate-400">[CONFIG]: Multi-LLM Consensus Matrix: Groq (Llama 3) + DeepSeek V3 + Gemini 1.5</div>
              <div className="text-slate-500">[15:18:02]: Incoming payload received over HTTPS POST /scan</div>
              <div className="text-amber-400">[HEURISTICS]: Flagged suspicious TLD pattern '.xyz' and keyword 'wallet'</div>
              <div className="text-rose-400">[CONSENSUS]: High confidence phishing verdict reached (95/100)</div>
              <div className="text-emerald-400">[POLICY]: Action executed -> Session pathway blocked. Event dispatched to SIEM.</div>
              <div className="text-blue-400 animate-pulse">[READY]: Listening for incoming vector payloads...</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
