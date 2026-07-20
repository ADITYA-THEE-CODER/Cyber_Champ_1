import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import { 
  Shield, Zap, Lock, Cpu, ArrowRight, Activity, Eye, Terminal, 
  CheckCircle2, AlertTriangle, Layers, FileCode, QrCode, Globe, 
  Sparkles, Database, Download, Play, MessageSquare, Star
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
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.02] active:scale-[0.98]"
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
                  <div className="pt-2 font-mono text-[11px] text-cyan-400/80">Example Payload: verify-wallet.xyz/login</div>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all relative overflow-hidden group">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <FileCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">2. File Hash Vector</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Evaluates SHA-256, SHA-1, and MD5 cryptographic signatures against global vulnerability databases to flag malware executables.
                  </p>
                  <div className="pt-2 font-mono text-[11px] text-cyan-400/80">Example Payload: 64-char Hex Checksum</div>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all relative overflow-hidden group">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">3. QR Code / Quishing</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Decodes visual matrix structures and isolates embedded shortlinks designed to bypass traditional email spam filters.
                  </p>
                  <div className="pt-2 font-mono text-[11px] text-cyan-400/80">Example Payload: bit.ly/claim-crypto-reward</div>
                </div>
              </div>
            </section>

            {/* 3. 7-LAYER DEFENSE PIPELINE ARCHITECTURE */}
            <section className="max-w-7xl mx-auto px-6 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                  7-Layer Zero Trust Architecture
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                  Every payload passes through sequential security gates before execution
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-3 font-mono text-xs">
                {[
                  { step: "01", name: "Input Ingestion", desc: "Sanitizes raw text string" },
                  { step: "02", name: "Zero Trust Policy", desc: "Default-Deny validation" },
                  { step: "03", name: "Static Heuristics", desc: "Checksum & pattern match" },
                  { step: "04", name: "Threat Intelligence", desc: "Database cross-reference" },
                  { step: "05", name: "Multi-LLM Analysis", desc: "Groq & DeepSeek consensus" },
                  { step: "06", name: "MITRE Mapping", desc: "Tactic ID alignment" },
                  { step: "07", name: "Analyst Report", desc: "5-6 line natural explanation" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-400/50 transition-all">
                    <div>
                      <div className="text-cyan-400 font-bold text-sm">{item.step}</div>
                      <div className="text-white font-bold mt-1 text-[11px] uppercase">{item.name}</div>
                    </div>
                    <div className="text-slate-400 text-[10px] mt-3 leading-tight">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. CHROME EXTENSION BANNER */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="p-10 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 backdrop-blur-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-cyan-950/50">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[11px] uppercase border border-cyan-400/30">
                    <Shield className="h-3.5 w-3.5" /> Browser Guard Companion
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    CyberShield AI Chrome Extension v2.0
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed">
                    Protect your active browser session in real time. Automatically scans loading web pages, flags suspicious login forms, inspects right-clicked links, and provides floating risk score overlays without leaving your tab.
                  </p>
                </div>

                <button
                  onClick={handleDownloadExtension}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.05]"
                >
                  <Download className="h-4 w-4 animate-bounce" />
                  <span>Install Extension Package</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ================= SCANNER VIEW ================= */}
        {activeTab === 'scanner' && <Scanner />}

        {/* ================= DASHBOARD VIEW ================= */}
        {activeTab === 'dashboard' && (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">
            <h2 className="text-2xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              Enterprise Defense Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
                <div className="text-cyan-400/70 text-xs font-mono uppercase tracking-wider">System Health</div>
                <div className="text-3xl font-black text-emerald-400 mt-2">100% OPERATIONAL</div>
                <div className="text-slate-400 text-xs mt-1">Zero Trust Gateway Active</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
                <div className="text-cyan-400/70 text-xs font-mono uppercase tracking-wider">Multi-LLM Consensus</div>
                <div className="text-3xl font-black text-cyan-400 mt-2">ACTIVE</div>
                <div className="text-slate-400 text-xs mt-1">Groq + DeepSeek + Gemini</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl">
                <div className="text-cyan-400/70 text-xs font-mono uppercase tracking-wider">Active Defense Vectors</div>
                <div className="text-3xl font-black text-white mt-2">03 MODULES</div>
                <div className="text-slate-400 text-xs mt-1">URL / File Hash / QR Code</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TELEMETRY VIEW ================= */}
        {activeTab === 'telemetry' && (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">
            <h2 className="text-2xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              System Telemetry Log
            </h2>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl font-mono text-xs text-slate-300 space-y-3 shadow-inner shadow-black/60">
              <div className="text-cyan-400">[SYSTEM]: Real-time event stream connected to ZeroTrust core.</div>
              <div className="text-slate-400">[INFO]: Zero Trust policy rulebook initialized successfully.</div>
              <div className="text-slate-400">[NODE]: FastAPI endpoint cyber-champ-2.onrender.com online.</div>
              <div className="text-blue-400">[READY]: Awaiting input payload dispatch...</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
