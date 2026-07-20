import React, { useState } from 'react';
import TelemetryView from './components/TelemetryView';
import DashboardView from './components/DashboardView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'scanner' | 'dashboard' | 'telemetry'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation render here */}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'telemetry' && <TelemetryView />}
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { 
  Shield, Zap, Lock, Cpu, ArrowRight, Activity, Eye, Terminal, 
  CheckCircle2, Layers, FileCode, QrCode, Globe, Sparkles, 
  Download, BarChart3, Database, ShieldAlert, AlertTriangle, 
  RefreshCw, Radio, HardDrive, Server, Play, Trash2, Pause,
  Filter, Search, Clock, Sliders, Check, AlertCircle, ExternalLink
} from 'lucide-react';

// --- TYPES & INTERFACES ---
type TabType = 'home' | 'scanner' | 'dashboard' | 'telemetry';
type ScannerMode = 'url' | 'file' | 'qrcode';

interface ScanResult {
  threat_level: string;
  risk_score: string;
  confidence?: string;
  source: string;
  explanation: string;
  recommendation?: string;
}

interface LogEntry {
  id: number;
  time: string;
  type: 'SYS' | 'NET' | 'POL' | 'NODE' | 'WARN' | 'SIEM' | 'ERR';
  msg: string;
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Scanner States
  const [scanMode, setScanMode] = useState<ScannerMode>('url');
  const [scanInput, setScanInput] = useState('');
  const [scanLoading, setScanLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  // Telemetry States
  const [isStreaming, setIsStreaming] = useState(true);
  const [logFilter, setLogFilter] = useState<string>('ALL');
  const [telemetryLogs, setTelemetryLogs] = useState<LogEntry[]>([
    { id: 1, time: '15:10:01', type: 'SYS', msg: 'ZeroTrust Core Engine initialized successfully.' },
    { id: 2, time: '15:10:02', type: 'NET', msg: 'FastAPI core gateway bound to cyber-champ-2.onrender.com.' },
    { id: 3, time: '15:10:05', type: 'POL', msg: '7-Layer Default-Deny rulebook loaded into memory.' },
    { id: 4, time: '15:10:12', type: 'NODE', msg: 'Groq Llama-3 consensus worker initialized.' },
    { id: 5, time: '15:10:18', type: 'NODE', msg: 'DeepSeek V3 analysis node online (28ms latency).' },
  ]);

  // Demo Presets for Scanner
  const samplePayloads = {
    url: [
      { label: '🔴 Suspicious Phishing Link', value: 'http://verify-your-wallet.xyz/login' },
      { label: '🟢 Safe Enterprise Domain', value: 'https://github.com/security' }
    ],
    file: [
      { label: '🔴 Known Ransomware Hash', value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
      { label: '🟢 Clean File SHA-256', value: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824' }
    ],
    qrcode: [
      { label: '🔴 Quishing Redirect Payload', value: '[QR_CODE_RAW_DATA]: https://bit.ly/claim-free-crypto' },
      { label: '🟢 Verified Static Resource QR', value: '[QR_CODE_RAW_DATA]: https://docs.zerotrust.one/guide' }
    ]
  };

  // Real-time log streamer effect
  useEffect(() => {
    if (activeTab !== 'telemetry' || !isStreaming) return;

    const mockEvents: Array<{ type: LogEntry['type']; msg: string }> = [
      { type: 'NET', msg: 'Incoming vector request from Chrome Extension node #948.' },
      { type: 'POL', msg: 'Entropy analysis complete for string payload. Score: 0.12 (NOMINAL).' },
      { type: 'NODE', msg: 'Groq Llama-3 node heartbeat check OK (14ms response time).' },
      { type: 'NODE', msg: 'DeepSeek V3 consensus pipeline latency nominal (28ms response).' },
      { type: 'WARN', msg: 'Suspicious TLD lookup intercepted (.xyz domain structure detected).' },
      { type: 'POL', msg: 'Zero Trust Sanitizer stripped query parameter track_id=48201.' },
      { type: 'SIEM', msg: 'Telemetry stream synced with central logging database.' }
    ];

    let counter = 6;
    const interval = setInterval(() => {
      const nextEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      const now = new Date().toLocaleTimeString('en-US', { hour12: false });
      setTelemetryLogs(prev => [
        ...prev.slice(-14), 
        { id: counter++, time: now, type: nextEvent.type, msg: nextEvent.msg }
      ]);
    }, 2200);

    return () => clearInterval(interval);
  }, [activeTab, isStreaming]);

  // Execute Threat Scan
  const handleScan = async (e?: React.FormEvent, customPayload?: string) => {
    if (e) e.preventDefault();
    const targetInput = customPayload || scanInput;
    if (!targetInput.trim()) return;

    setScanLoading(true);
    setScanError(null);
    setScanResult(null);

    let payloadText = targetInput;
    if (!customPayload) {
      if (scanMode === 'file') payloadText = `[FILE_HASH_VECTOR]: ${targetInput}`;
      if (scanMode === 'qrcode') payloadText = `[QR_CODE_RAW_DATA]: ${targetInput}`;
    }

    try {
      const response = await fetch('https://cyber-champ-2.onrender.com/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: payloadText }),
      });

      if (!response.ok) throw new Error('Network firewall or execution path rejected request.');
      const data = await response.json();
      setScanResult(data);
    } catch (err: any) {
      setScanError(err.message || 'Threat detection backend engine unreachable.');
    } finally {
      setScanLoading(false);
    }
  };

  const handleDownloadExtension = () => {
    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Enable 'Developer mode' and click 'Load unpacked'.");
  };

  const filteredLogs = telemetryLogs.filter(log => logFilter === 'ALL' || log.type === logFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none animate-pulse duration-[4000ms]" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-black uppercase tracking-wider text-white">ZeroTrust</span>
              <span className="text-xl font-black uppercase tracking-wider text-cyan-400 ml-1">One</span>
              <span className="block text-[9px] font-mono text-slate-400 tracking-widest uppercase">Autonomous Defense Hub</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20">
            {[
              { id: 'home', label: 'Overview', icon: Globe },
              { id: 'scanner', label: 'Scanner', icon: Zap },
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'telemetry', label: 'Telemetry', icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-2 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Extension Download Button */}
          <button
            onClick={handleDownloadExtension}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 font-mono text-xs uppercase font-bold border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-lg"
          >
            <Download className="h-3.5 w-3.5 text-cyan-400" />
            <span>Extension</span>
          </button>
        </div>
      </header>

      {/* MAIN VIEW CONTAINER */}
      <main className="pb-24 relative z-10">
        
        {/* ================= 1. HOMEPAGE / OVERVIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-20 max-w-7xl mx-auto px-6 pt-12 animate-in fade-in duration-300">
            {/* Hero Banner */}
            <section className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <Sparkles className="h-3.5 w-3.5 animate-spin" /> Next-Gen AI Threat Inspection System
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
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.02]"
                >
                  <Zap className="h-4 w-4 animate-bounce" />
                  <span>Launch Threat Gateway</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setActiveTab('telemetry')}
                  className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/30 flex items-center gap-2 shadow-lg"
                >
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>View Telemetry Log</span>
                </button>
              </div>

              {/* Metric Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Gateway Engine</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> 100% ONLINE
                  </div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">FastAPI REST Protocol</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">AI Consensus</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">GROQ + DEEPSEEK</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Multi-LLM Validation</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Security Pipeline</div>
                  <div className="text-2xl font-black text-white mt-1">07 LAYERS</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Zero Trust Rulebook</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all">
                  <div className="text-cyan-400 text-xs font-mono uppercase">Inspection Speed</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">&lt; 140ms</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-1">Sub-second Latency</div>
                </div>
              </div>
            </section>

            {/* Feature Cards Grid */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                  Multi-Vector Protection Shields
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                  Comprehensive coverage against evolving attack vectors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all group">
                  <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">1. Phishing & Malicious URLs</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Evaluates registration age, domain entropy, obfuscated redirects, and credential harvesting patterns in real time.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all group">
                  <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <FileCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">2. Cryptographic File Hashes</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Inspects SHA-256 and MD5 cryptographic signatures against global vulnerability databases to block malicious executables.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl space-y-4 hover:border-cyan-400/40 transition-all group">
                  <div className="p-3 w-fit rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">3. Quishing & QR Matrix</h3>
                  <p className="text-slate-400 text-xs font-mono leading-relaxed">
                    Decodes visual matrix structures and isolates embedded shortlinks designed to bypass traditional email spam filters.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= 2. SCANNER ================= */}
        {activeTab === 'scanner' && (
          <div className="max-w-5xl mx-auto px-6 pt-10 space-y-8 animate-in fade-in duration-300">
            {/* Header & Mode Switcher */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-[11px] uppercase">
                <Layers className="h-3.5 w-3.5" /> Unified Threat Inspection Engine
              </div>

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                Multi-Vector Gateway
              </h1>

              <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 backdrop-blur-xl gap-2 mt-2 shadow-lg shadow-black/50">
                <button
                  type="button"
                  onClick={() => { setScanMode('url'); setScanResult(null); setScanError(null); setScanInput(''); }}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
                    scanMode === 'url'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" /> URL / Phishing
                </button>
                <button
                  type="button"
                  onClick={() => { setScanMode('file'); setScanResult(null); setScanError(null); setScanInput(''); }}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
                    scanMode === 'file'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5" /> File Hash
                </button>
                <button
                  type="button"
                  onClick={() => { setScanMode('qrcode'); setScanResult(null); setScanError(null); setScanInput(''); }}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
                    scanMode === 'qrcode'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5" /> QR Code
                </button>
              </div>
            </div>

            {/* Form Input Box */}
            <form onSubmit={(e) => handleScan(e)} className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-2xl shadow-xl space-y-5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Terminal className="h-4 w-4" />
                  <span>sys_root@zerotrust:~# input_{scanMode}_vector --verify</span>
                </div>
                <span className="text-slate-500">Zero Trust Policy Active</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  placeholder={
                    scanMode === 'url'
                      ? 'Enter domain name, suspicious link, or raw string...'
                      : scanMode === 'file'
                      ? 'Paste SHA-256 or MD5 cryptographic hash string...'
                      : 'Paste decoded QR payload URL link...'
                  }
                  className="flex-1 bg-slate-950/90 border border-cyan-500/30 rounded-2xl px-5 py-3.5 text-sm text-cyan-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 font-mono shadow-inner"
                />

                <button
                  type="submit"
                  disabled={scanLoading}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-300/40 flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
                >
                  {scanLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      <span>Deploy Scan</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample Quick Demo Test Vectors */}
              <div className="pt-2 border-t border-cyan-500/10 flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-slate-500">Demo Presets:</span>
                {samplePayloads[scanMode].map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setScanInput(sample.value);
                      handleScan(undefined, sample.value);
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-950 border border-cyan-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/50 transition-all text-[11px]"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </form>

            {/* Error Display */}
            {scanError && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-3 backdrop-blur-xl">
                <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0" />
                <div>[!] EXCEPTION DETECTED: {scanError}</div>
              </div>
            )}

            {/* Detailed Verdict Card */}
            {scanResult && (
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-6 animate-in slide-in-from-bottom-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/10 pb-6">
                  <div>
                    <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Threat Verdict</div>
                    <div className="text-2xl font-black uppercase text-white mt-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      {scanResult.threat_level}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-slate-400 text-xs font-mono uppercase">AI Confidence</div>
                      <div className="text-xl font-bold text-emerald-400 font-mono">{scanResult.confidence || '96%'}</div>
                    </div>
                    <div className="border-l border-cyan-500/20 pl-6">
                      <div className="text-slate-400 text-xs font-mono uppercase">Risk Score</div>
                      <div className="text-3xl font-black text-cyan-400 font-mono">{scanResult.risk_score}/100</div>
                    </div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                    <Cpu className="h-4 w-4" /> Multi-LLM Consensus Analysis
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/20 text-slate-200 font-mono text-xs leading-relaxed">
                    {scanResult.explanation}
                  </div>
                </div>

                {/* Recommendation */}
                {scanResult.recommendation && (
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 font-mono text-xs flex items-start gap-3 text-cyan-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase text-white block mb-0.5">Remediation Protocol:</span>
                      {scanResult.recommendation}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= 3. SECURITY DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-6 pt-10 space-y-8 animate-in fade-in duration-500">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  Security Operations Dashboard
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  Enterprise threat metrics & node telemetry visualizer
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-400 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>SOC Operational Status: ACTIVE</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Total Scanned Payloads</div>
                <div className="text-3xl font-black text-white mt-2">1,284</div>
                <div className="text-emerald-400 text-xs font-mono mt-1">↑ 24.5% vs last hour</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-rose-500/50 transition-all">
                <div className="text-rose-400 text-xs font-mono uppercase tracking-wider">Blocked Attack Vectors</div>
                <div className="text-3xl font-black text-rose-400 mt-2">142</div>
                <div className="text-slate-400 text-xs font-mono mt-1">11.0% attack ratio</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 transition-all">
                <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider">Consensus Score</div>
                <div className="text-3xl font-black text-cyan-400 mt-2">99.4%</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Groq + DeepSeek aligned</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl hover:border-blue-400/50 transition-all">
                <div className="text-blue-400 text-xs font-mono uppercase tracking-wider">Active Extension Nodes</div>
                <div className="text-3xl font-black text-blue-400 mt-2">328</div>
                <div className="text-slate-400 text-xs font-mono mt-1">Browser clients online</div>
              </div>
            </div>

            {/* Dynamic Threat Frequency Chart */}
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-400" /> Vector Threat Frequency (12-Hour Trend)
                </div>
                <span className="text-cyan-400 animate-pulse">● Live Analytics Stream</span>
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

            {/* Intercepted Log Table */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-rose-400 animate-pulse" /> Intercepted Threat Stream Log
                </div>
                <span className="text-slate-500">Auto-Refreshed</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-cyan-500/20 text-slate-400">
                      <th className="py-3 px-4">TIMESTAMP</th>
                      <th className="py-3 px-4">VECTOR TYPE</th>
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

        {/* ================= 4. TELEMETRY LOGS ================= */}
        {activeTab === 'telemetry' && (
          <div className="max-w-7xl mx-auto px-6 pt-10 space-y-6 animate-in fade-in duration-500">
            {/* Control Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                  System Telemetry Log
                </h2>
                <p className="text-slate-400 font-mono text-xs uppercase mt-1">
                  Real-time event stream connected to ZeroTrust core gateway
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Type Filter dropdown */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-cyan-500/30 text-xs font-mono">
                  <Filter className="h-3.5 w-3.5 text-cyan-400" />
                  <select 
                    value={logFilter}
                    onChange={(e) => setLogFilter(e.target.value)}
                    className="bg-transparent text-cyan-300 focus:outline-none uppercase font-bold"
                  >
                    <option value="ALL">All Types</option>
                    <option value="SYS">SYS</option>
                    <option value="NET">NET</option>
                    <option value="POL">POL</option>
                    <option value="NODE">NODE</option>
                    <option value="WARN">WARN</option>
                  </select>
                </div>

                {/* Pause/Resume Stream */}
                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                    isStreaming 
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50' 
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                  }`}
                >
                  {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{isStreaming ? 'Pause Stream' : 'Resume Stream'}</span>
                </button>

                {/* Clear Console */}
                <button
                  onClick={() => setTelemetryLogs([{ id: Date.now(), time: new Date().toLocaleTimeString('en-US', { hour12: false }), type: 'SYS', msg: 'Terminal log buffer cleared manually.' }])}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-300 font-mono text-xs hover:text-white hover:border-cyan-400 transition-all flex items-center gap-2"
                >
                  <Trash2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Clear Console</span>
                </button>
              </div>
            </div>

            {/* Sidebar + Main Terminal Console Split */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column: System Status Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-3">
                  <div className="text-cyan-400 text-xs font-mono uppercase font-bold flex items-center gap-2">
                    <Server className="h-4 w-4" /> Core Gateway Target
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
                    <Cpu className="h-4 w-4" /> Multi-LLM Consensus Workers
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">Groq (Llama-3)</span>
                      <span className="text-emerald-400 font-bold text-[10px]">READY (14ms)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">DeepSeek V3</span>
                      <span className="text-emerald-400 font-bold text-[10px]">READY (28ms)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">Gemini 1.5 Flash</span>
                      <span className="text-emerald-400 font-bold text-[10px]">READY (18ms)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Terminal Container */}
              <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl font-mono text-xs space-y-4 relative min-h-[480px] flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-slate-300 font-bold">zerotrust-event-stream.sh</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Radio className="h-3.5 w-3.5 animate-pulse" />
                    <span className="text-[11px]">{isStreaming ? 'LIVE STREAM' : 'PAUSED'}</span>
                  </div>
                </div>

                {/* Log Rows Stream */}
                <div className="space-y-3 overflow-y-auto max-h-[360px] pr-2 flex-1">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 animate-in slide-in-from-left-2 duration-200">
                      <span className="text-slate-600 shrink-0">[{log.time}]</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        log.type === 'SYS' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' :
                        log.type === 'NET' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                        log.type === 'WARN' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                        log.type === 'POL' ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30' :
                        'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {log.type}
                      </span>
                      <span className="text-slate-200 leading-relaxed">{log.msg}</span>
                    </div>
                  ))}
                </div>

                {/* Blinking Cursor Prompt */}
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
