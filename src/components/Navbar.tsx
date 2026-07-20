import React from 'react';
import { Shield, Download, LayoutDashboard, Radar, Activity, Star } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const handleDownloadExtension = () => {
    // Simulates extension release download for Chrome developer mode loading
    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Turn on 'Developer mode' and click 'Load unpacked'.");
  };

  return (
    <nav className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveTab('scanner')}
        >
          <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 group-hover:border-purple-400 transition-all">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-black text-lg tracking-tight text-white uppercase">
            ZeroTrust<span className="text-purple-500">One</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-neutral-900/80 border border-white/5 rounded-xl">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase transition-all flex items-center gap-2 ${activeTab === 'scanner' ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Radar className="h-3.5 w-3.5" />
            Scanner
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono uppercase transition-all flex items-center gap-2 ${activeTab === 'telemetry' ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Activity className="h-3.5 w-3.5" />
            Telemetry
          </button>
        </div>

        {/* Download Extension CTA */}
        <button
          onClick={handleDownloadExtension}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-600/20 border border-purple-400/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="h-3.5 w-3.5 animate-bounce" />
          <span>Download Extension</span>
        </button>
      </div>
    </nav>
  );
}
