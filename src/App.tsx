import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import { Shield, Zap, Lock, Cpu, ArrowRight, Activity, Eye, Terminal, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Router */}
      <main className="pb-20 relative z-10">
        {/* HOMEPAGE VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-24">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-6 pt-16 text-center space-y-8 animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Shield className="h-3.5 w-3.5" /> Zero Trust Multi-Layer Security Platform
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase max-w-4xl mx-auto leading-tight drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                Real-Time AI Cyber Defense & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">Threat Intelligence</span>
              </h1>

              <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto font-mono leading-relaxed">
                ZeroTrust One safeguards enterprise endpoints using fine-tuned transformer heuristics, multi-LLM consensus verification, and live browser extensions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.02]"
                >
                  <Zap className="h-4 w-4" />
                  <span>Launch Threat Gateway</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Turn on 'Developer mode' and click 'Load unpacked'.");
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/20 flex items-center justify-center gap-3"
                >
                  <Lock className="h-4 w-4 text-cyan-400" />
                  <span>Get Chrome Extension</span>
                </button>
              </div>

              {/* Live Metric Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-5xl mx-auto">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Engine Status</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">ONLINE</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Zero Trust Gateway v2.0</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Scan Latency</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">&lt; 120ms</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Real-time Heuristics</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left">
                  <div className="text-cyan-400 text-xs font-mono uppercase">AI Defense Layers</div>
                  <div className="text-2xl font-black text-white mt-1">07 LAYERS</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Multi-LLM Consensus</div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Vector Coverage</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">100%</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">URL / File Hash / QR</div>
                </div>
              </div>
            </section>

            {/* Architecture Section */}
            <section className="max-w-6xl mx-auto px-6 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Multi-Layer Defense Matrix
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                  Every payload undergoes full spectrum zero trust evaluation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">1. Endpoint Inspection</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Static analysis checks payload formatting, domain age, cryptographic checksums, and hidden redirects before granting network passage.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">2. Multi-LLM Consensus</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Combines pattern detection models to evaluate social engineering threats, quishing matrices, and prompt injections without single points of failure.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all">
                  <div className="p-3 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">3. Human-Analyst Reports</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Generates concise 5-6 line explanations with threat scoring, MITRE ATT&CK mapping, and immediate actionable remediation steps.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SCANNER VIEW */}
        {activeTab === 'scanner' && <Scanner />}

        {/* DASHBOARD VIEW */}
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

        {/* TELEMETRY VIEW */}
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
