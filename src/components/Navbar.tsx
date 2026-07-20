import React from 'react';
import { Shield, Download, LayoutDashboard, Radar, Activity, Star } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const handleDownloadExtension = () => {
    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Turn on 'Developer mode' and click 'Load unpacked'.");
  };

  return (
    <nav className="border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-cyan-950/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Cyber Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveTab('scanner')}
        >
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-black text-lg tracking-tight text-white uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            ZeroTrust<span className="text-cyan-400">One</span>
          </span>
        </div>

        {/* Navigation Bar */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-slate-900/90 border border-cyan-500/20 rounded-xl shadow-inner shadow-cyan-950/50">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase transition-all flex items-center gap-2 ${
              activeTab === 'scanner' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40' 
                : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40'
            }`}
          >
            <Radar className="h-3.5 w-3.5" />
            Scanner
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase transition-all flex items-center gap-2 ${
              activeTab === 'dashboard' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40' 
                : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase transition-all flex items-center gap-2 ${
              activeTab === 'telemetry' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40' 
                : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Telemetry
          </button>
        </div>

        {/* Electric Cyan CTA */}
        <button
          onClick={handleDownloadExtension}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-300/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="h-3.5 w-3.5 animate-bounce" />
          <span>Download Extension</span>
        </button>
      </div>
    </nav>
  );
}
