import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* View Switcher */}
      <main className="pb-16 relative z-10">
        {activeTab === 'scanner' && <Scanner />}

        {activeTab === 'dashboard' && (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">
            <h2 className="text-2xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              Enterprise Defense Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-lg shadow-cyan-950/20 hover:border-cyan-400/40 transition-all">
                <div className="text-cyan-400/70 text-xs font-mono uppercase tracking-wider">System Health</div>
                <div className="text-3xl font-black text-emerald-400 mt-2">100% OPERATIONAL</div>
                <div className="text-slate-400 text-xs mt-1">Zero Trust Gateway Active</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-lg shadow-cyan-950/20 hover:border-cyan-400/40 transition-all">
                <div className="text-cyan-400/70 text-xs font-mono uppercase tracking-wider">Multi-LLM Consensus</div>
                <div className="text-3xl font-black text-cyan-400 mt-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                  ACTIVE
                </div>
                <div className="text-slate-400 text-xs mt-1">Groq + DeepSeek + Gemini</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-lg shadow-cyan-950/20 hover:border-cyan-400/40 transition-all">
                <div className="text-cyan-400/70 text-xs font-mono uppercase tracking-wider">Active Defense Vectors</div>
                <div className="text-3xl font-black text-white mt-2">03 MODULES</div>
                <div className="text-slate-400 text-xs mt-1">URL / File Hash / QR Code</div>
              </div>
            </div>
          </div>
        )}

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
