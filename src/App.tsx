import React, { useState } from 'react';
import Scanner from './components/Scanner';
import Dashboard from './components/Dashboard';
import { Shield, Radar, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'scanner' | 'dashboard'>('home');

  return (
    <div className="min-h-screen grid-bg bg-[#030303] text-white">
      {/* Universal Navigation Header */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight cursor-pointer" onClick={() => setActiveTab('home')}>
            <Shield className="h-5 w-5 text-purple-500" />
            <span>ZeroTrust <span className="text-purple-500">One</span></span>
          </div>
          <div className="flex gap-1 sm:gap-4 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg transition ${activeTab === 'home' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('scanner')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'scanner' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              <Radar className="h-4 w-4" /> Scanner
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'}`}
            >
              <LayoutDashboard className="h-4 w-4" /> Telemetry
            </button>
          </div>
        </div>
      </nav>

      {/* Main Screen Router Logic */}
      <main>
        {activeTab === 'home' && (
          <div className="mx-auto max-w-4xl px-6 py-20 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs text-purple-400">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse"></span>
              v2.0 Core Threat Core Engine Online
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              Zero-trust cyber defense <br />for the age of AI.
            </h1>
            <p className="text-neutral-400 max-w-xl mx-auto text-base sm:text-lg">
              An integrated decentralized analytical dashboard orchestrating live threat mitigation via cryptographic edge-shields and multi-model LLM verification arrays.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button 
                onClick={() => setActiveTab('scanner')}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 font-semibold shadow-lg shadow-purple-600/20 transition duration-200"
              >
                Launch Live Scanner
              </button>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 font-semibold transition duration-200"
              >
                View Live Telemetry
              </button>
            </div>
          </div>
        )}

        {activeTab === 'scanner' && <Scanner />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}
