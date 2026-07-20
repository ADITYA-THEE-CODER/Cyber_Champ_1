import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Scanner from './components/Scanner';
import { ShieldCheck, Cpu, Terminal, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');

  return (
    <div className="min-h-screen bg-black text-white grid-bg selection:bg-purple-500 selection:text-white">
      {/* Global Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View Switcher */}
      <main className="pb-16">
        {activeTab === 'scanner' && <Scanner />}

        {activeTab === 'dashboard' && (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-black uppercase text-white tracking-tight">Enterprise Defense Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl">
                <div className="text-neutral-500 text-xs font-mono uppercase">System Health</div>
                <div className="text-3xl font-black text-emerald-400 mt-2">100% OPERATIONAL</div>
                <div className="text-neutral-400 text-xs mt-1">Zero Trust Gateway Active</div>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl">
                <div className="text-neutral-500 text-xs font-mono uppercase">Multi-LLM Consensus</div>
                <div className="text-3xl font-black text-purple-400 mt-2">ACTIVE</div>
                <div className="text-neutral-400 text-xs mt-1">Groq + DeepSeek + Gemini</div>
              </div>
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl">
                <div className="text-neutral-500 text-xs font-mono uppercase">Active Defense Vectors</div>
                <div className="text-3xl font-black text-white mt-2">03 MODULES</div>
                <div className="text-neutral-400 text-xs mt-1">URL / File Hash / QR Code</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-black uppercase text-white tracking-tight">System Telemetry Log</h2>
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-xl font-mono text-xs text-neutral-400 space-y-3">
              <div className="text-purple-400">[SYSTEM]: Real-time event stream connected.</div>
              <div>[INFO]: Zero Trust policy rulebook initialized.</div>
              <div>[NODE]: FastAPI endpoint cyber-champ-2.onrender.com online.</div>
              <div>[READY]: Waiting for next input payload dispatch...</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
