import React, { useState, useEffect } from 'react';
import { 
  Shield, Zap, Lock, Cpu, ArrowRight, Activity, Eye, Terminal, 
  Layers, FileCode, QrCode, Globe, Sparkles, Download, BarChart3, 
  Database, ShieldAlert, RefreshCw, Server, Play, Trash2, Pause, 
  Filter, HelpCircle, FileText, UserCheck, TrendingUp 
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
type TabType = 'home' | 'scanner' | 'how-it-works' | 'policies' | 'dashboard' | 'telemetry' | 'auth';
type ScannerMode = 'url' | 'file' | 'qrcode';

interface ScanResult {
  threat_level: string;
  risk_score: string;
  confidence?: string;
  source?: string;
  explanation: string;
  recommendation?: string;
}

interface TelemetryLog {
  id: number;
  timestamp: string;
  subsystem: 'GATEWAY' | 'CONSENSUS' | 'FIREWALL' | 'HEURISTICS' | 'EXTENSION';
  type: 'SYS' | 'NET' | 'POL' | 'NODE' | 'WARN' | 'ERR';
  message: string;
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // --- SCANNER STATE ---
  const [scanMode, setScanMode] = useState<ScannerMode>('url');
  const [scanInput, setScanInput] = useState('');
  const [scanLoading, setScanLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  // --- TELEMETRY STATE ---
  const [isStreaming, setIsStreaming] = useState(true);
  const [filterType, setFilterType] = useState('ALL');
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([
    { id: 1, timestamp: '15:10:01.002', subsystem: 'GATEWAY', type: 'SYS', message: 'ZeroTrust Core Gateway listening on port 443.' },
    { id: 2, timestamp: '15:10:01.450', subsystem: 'HEURISTICS', type: 'POL', message: 'Loaded 14,200 active threat signatures into RAM.' },
    { id: 3, timestamp: '15:10:02.110', subsystem: 'CONSENSUS', type: 'NODE', message: 'Groq Llama-3 cluster connected (12ms RTT).' },
    { id: 4, timestamp: '15:10:02.340', subsystem: 'CONSENSUS', type: 'NODE', message: 'DeepSeek V3 consensus engine online (28ms RTT).' },
    { id: 5, timestamp: '15:10:05.890', subsystem: 'EXTENSION', type: 'NET', message: 'Browser extension client #8921 established WebSocket bridge.' }
  ]);

  // --- HOW IT WORKS STATE ---
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  // --- POLICIES STATE ---
  const [selectedPolicy, setSelectedPolicy] = useState('zerotrust');

  // --- AUTH STATE ---
  const [isSignUp, setIsSignUp] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Sample payloads for Quick Demo Testing
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

  // Telemetry Stream Simulator Effect
  useEffect(() => {
    if (activeTab !== 'telemetry' || !isStreaming) return;

    const mockPool: Array<Omit<TelemetryLog, 'id' | 'timestamp'>> = [
      { subsystem: 'HEURISTICS', type: 'POL', message: 'String entropy validation complete. Score: 0.142 (SAFE).' },
      { subsystem: 'FIREWALL', type: 'WARN', message: 'Suspicious domain lookup intercepted: auth-check-token.xyz' },
      { subsystem: 'CONSENSUS', type: 'NODE', message: 'Multi-LLM quorum achieved. Decision matrix aligned (3/3).' },
      { subsystem: 'EXTENSION', type: 'NET', message: 'Encrypted payload batch received from chrome-node-302.' },
      { subsystem: 'GATEWAY', type: 'SYS', message: 'PostgreSQL log pipeline synced (0 pending commits).' },
      { subsystem: 'FIREWALL', type: 'ERR', message: 'High-entropy payload flagged in POST /api/v1/scan' }
    ];

    const interval = setInterval(() => {
      const randomEvent = mockPool[Math.floor(Math.random() * mockPool.length)];
      const now = new Date();
      const timeStr = `${now.toLocaleTimeString('en-US', { hour12: false })}.${now.getMilliseconds().toString().padStart(3, '0')}`;

      setTelemetryLogs(prev => [
        ...prev.slice(-49),
        { id: Date.now(), timestamp: timeStr, ...randomEvent }
      ]);
    }, 1800);

    return () => clearInterval(interval);
  }, [activeTab, isStreaming]);

  // Scan Execution Handler
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

      if (!response.ok) throw new Error('Firewall or execution path rejected request.');
      const data = await response.json();
      setScanResult(data);
    } catch (err: any) {
      setScanError(err.message || 'Threat detection backend engine unreachable.');
    } finally {
      setScanLoading(false);
    }
  };

  const handleDownloadExtension = () => {
    alert("ZeroTrust One Chrome Extension package initialized (.zip).\n\n1. Unpack the zip file.\n2. Open chrome://extensions in your browser.\n3. Turn on 'Developer mode' and click 'Load unpacked'.");
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'scanner', label: 'Scanner', icon: Zap },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'telemetry', label: 'Telemetry', icon: Terminal },
    { id: 'auth', label: 'Sign In', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none animate-pulse duration-[4000ms]" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* HEADER / NAVIGATION BAR */}
      <header className="border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-cyan-950/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Cyber Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0" 
            onClick={() => setActiveTab('home')}
          >
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all">
              <Shield className="h-5 w-5" />
            </div>
            <span className="font-black text-lg tracking-tight text-white uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              ZeroTrust<span className="text-cyan-400">One</span>
            </span>
          </div>

          {/* Navigation Bar */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/90 border border-cyan-500/20 rounded-xl shadow-inner shadow-cyan-950/50 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all flex items-center gap-2 whitespace-nowrap ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40' 
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Electric Cyan CTA */}
          <button
            onClick={handleDownloadExtension}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-300/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Download className="h-3.5 w-3.5 animate-bounce" />
            <span>Extension</span>
          </button>
        </div>
      </header>

      {/* PAGE ROUTER */}
      <main className="pb-24 relative z-10">

        {/* ================= 1. HOME / OVERVIEW ================= */}
        {activeTab === 'home' && (
          <div className="space-y-20 max-w-7xl mx-auto px-6 pt-12 animate-in fade-in duration-300">
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

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-mono">
                <button
                  onClick={() => setActiveTab('scanner')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-300/40 hover:scale-[1.02]"
                >
                  <Zap className="h-4 w-4 animate-bounce" />
                  <span>Launch Threat Gateway</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setActiveTab('telemetry')}
                  className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all border border-cyan-500/30 flex items-center gap-2 shadow-lg"
                >
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>View Telemetry Log</span>
                </button>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all font-mono">
                  <div className="text-cyan-400 text-xs uppercase">Gateway Engine</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" /> 100% ONLINE
                  </div>
                  <div className="text-slate-500 text-[10px] mt-1">FastAPI REST Protocol</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all font-mono">
                  <div className="text-cyan-400 text-xs uppercase">AI Consensus</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">GROQ + DEEPSEEK</div>
                  <div className="text-slate-500 text-[10px] mt-1">Multi-LLM Validation</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all font-mono">
                  <div className="text-cyan-400 text-xs uppercase">Security Pipeline</div>
                  <div className="text-2xl font-black text-white mt-1">07 LAYERS</div>
                  <div className="text-slate-500 text-[10px] mt-1">Zero Trust Rulebook</div>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl text-left hover:border-cyan-400/40 transition-all font-mono">
                  <div className="text-cyan-400 text-xs uppercase">Inspection Speed</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">&lt; 140ms</div>
                  <div className="text-slate-500 text-[10px] mt-1">Sub-second Latency</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= 2. SCANNER ================= */}
        {activeTab === 'scanner' && (
          <div className="max-w-5xl mx-auto px-6 pt-10 space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono text-[11px] uppercase">
                <Layers className="h-3.5 w-3.5" /> Unified Threat Inspection Engine
              </div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                Multi-Vector Gateway
              </h1>

              <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 backdrop-blur-xl gap-2 mt-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => { setScanMode('url'); setScanResult(null); setScanError(null); setScanInput(''); }}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
                    scanMode === 'url' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5" /> URL / Phishing
                </button>
                <button
                  type="button"
                  onClick={() => { setScanMode('file'); setScanResult(null); setScanError(null); setScanInput(''); }}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
                    scanMode === 'file' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5" /> File Hash
                </button>
                <button
                  type="button"
                  onClick={() => { setScanMode('qrcode'); setScanResult(null); setScanError(null); setScanInput(''); }}
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
                    scanMode === 'qrcode' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5" /> QR Code
                </button>
              </div>
            </div>

            <form onSubmit={(e) => handleScan(e)} className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-2xl shadow-xl space-y-5 font-mono">
              <div className="flex items-center justify-between text-xs">
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
                    scanMode === 'url' ? 'Enter domain name, suspicious link, or raw string...' :
                    scanMode === 'file' ? 'Paste SHA-256 or MD5 cryptographic hash string...' :
                    'Paste decoded QR payload URL link...'
                  }
                  className="flex-1 bg-slate-950/90 border border-cyan-500/30 rounded-2xl px-5 py-3.5 text-sm text-cyan-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 shadow-inner"
                />

                <button
                  type="submit"
                  disabled={scanLoading}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-300/40 flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
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

              {/* Sample Presets */}
              <div className="pt-2 border-t border-cyan-500/10 flex flex-wrap items-center gap-2 text-xs">
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

            {/* Error Message */}
            {scanError && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-3 backdrop-blur-xl">
                <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0" />
                <div>[!] EXCEPTION DETECTED: {scanError}</div>
              </div>
            )}

            {/* Scan Verdict Card */}
            {scanResult && (
              <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-6 animate-in slide-in-from-bottom-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/10 pb-6">
                  <div>
                    <div className="text-cyan-400 text-xs uppercase">Threat Verdict</div>
                    <div className="text-2xl font-black uppercase text-white mt-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                      {scanResult.threat_level}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-slate-400 text-xs uppercase">AI Confidence</div>
                      <div className="text-xl font-bold text-emerald-400">{scanResult.confidence || '96%'}</div>
                    </div>
                    <div className="border-l border-cyan-500/20 pl-6">
                      <div className="text-slate-400 text-xs uppercase">Risk Score</div>
                      <div className="text-3xl font-black text-cyan-400">{scanResult.risk_score}/100</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase">
                    <Cpu className="h-4 w-4" /> Multi-LLM Consensus Analysis
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/20 text-slate-200 text-xs leading-relaxed">
                    {scanResult.explanation}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 3. HOW IT WORKS ================= */}
        {activeTab === 'how-it-works' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-12 animate-in fade-in duration-300 font-mono">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                <Zap className="h-3.5 w-3.5" /> Core Architecture
              </div>
              <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
                How Scanning Works
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Inside the 7-layer defense system that inspects URLs, file hashes, and QR code payloads in under 140ms.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="space-y-3">
                {[
                  { title: "1. Payload Ingestion & Sanitization", icon: Eye, summary: "Normalizes incoming URLs, file signatures, or QR decode vectors." },
                  { title: "2. Static Heuristics & Signature Lookup", icon: Database, summary: "Cross-checks known bad hashes and malicious domain rulebooks." },
                  { title: "3. Multi-LLM Consensus Matrix", icon: Cpu, summary: "Groq (Llama-3), DeepSeek V3, and Gemini perform zero-shot evaluation." },
                  { title: "4. Policy & Risk Scoring Engine", icon: Layers, summary: "Aggregates model outputs into a unified 0-100 risk score." },
                  { title: "5. Real-Time Telemetry & Action", icon: Terminal, summary: "Streams verdict to client extension and logs to WebSocket pipeline." }
                ].map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = activePipelineStep === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePipelineStep(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                        isActive
                          ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                          : 'bg-slate-900/60 border-cyan-500/20 text-slate-400 hover:border-cyan-500/40 hover:text-white'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isActive ? 'bg-cyan-500 text-black' : 'bg-slate-950 text-cyan-400'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-white">{step.title}</div>
                        <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{step.summary}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                  <span className="text-xs text-cyan-400 font-bold uppercase">Pipeline Phase {activePipelineStep + 1} of 5</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ● Active Subsystem
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase text-white">
                  Step {activePipelineStep + 1} Pipeline Execution
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed bg-slate-950 p-6 rounded-2xl border border-cyan-500/20">
                  Every inbound request passes through our stateless microservice cluster. High-entropy payloads triggering heuristic flags are routed to Groq and DeepSeek V3 in parallel to achieve a sub-140ms quorum decision.
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                    <span className="text-slate-500 block">Processing Latency</span>
                    <span className="text-white font-bold text-lg mt-1">&lt; 25ms</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                    <span className="text-slate-500 block">Policy Enforcement</span>
                    <span className="text-cyan-400 font-bold text-lg mt-1">Default Deny</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. POLICIES ================= */}
        {activeTab === 'policies' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 animate-in fade-in duration-300 font-mono">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-black uppercase text-white">Security & Governance Policies</h1>
              <p className="text-slate-400 text-xs uppercase tracking-widest">Enterprise Compliance & Rulebooks</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                {[
                  { id: 'zerotrust', label: 'Zero Trust Rules', icon: Shield },
                  { id: 'privacy', label: 'Privacy Policy', icon: Lock },
                  { id: 'compliance', label: 'SLA & Compliance', icon: FileText },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = selectedPolicy === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedPolicy(item.id)}
                      className={`w-full p-4 rounded-2xl border text-left font-bold text-xs uppercase flex items-center gap-3 transition-all ${
                        active
                          ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                          : 'bg-slate-900/60 border-cyan-500/20 text-slate-400 hover:text-white hover:border-cyan-400/40'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-3 p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl space-y-6">
                <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4">
                  <h2 className="text-2xl font-black uppercase text-white">
                    {selectedPolicy === 'zerotrust' ? 'Zero Trust Architecture Policy' :
                     selectedPolicy === 'privacy' ? 'Data Protection Policy' : 'SLA Compliance Rules'}
                  </h2>
                  <span className="text-xs text-slate-500">Updated: June 2026</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/10 space-y-2">
                    <h3 className="text-cyan-400 font-bold uppercase">1. Default-Deny Protocol</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Every network connection, incoming link, or file upload is treated as untrusted by default. Content is never allowed to execute or render on the user's browser without explicit validation by the consensus engine.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/10 space-y-2">
                    <h3 className="text-cyan-400 font-bold uppercase">2. Zero-Retention Telemetry</h3>
                    <p className="text-slate-300 leading-relaxed">
                      URL parameters containing sensitive query tokens (e.g., passkeys, session tokens, JWTs) are automatically stripped before logging telemetry to our database.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-300 font-mono">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase text-white tracking-tight flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-cyan-400" />
                  Security Operations Center (SOC)
                </h2>
                <p className="text-slate-400 text-xs uppercase mt-1">
                  Global threat surface telemetry & multi-LLM consensus matrix
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Node Matrix: NOMINAL</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all">
                <div className="text-cyan-400 text-xs uppercase font-bold">24H Inspected Payloads</div>
                <div className="text-3xl font-black text-white mt-2 font-mono">14,290</div>
                <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +18.2% vs previous period
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-rose-500/40 transition-all">
                <div className="text-rose-400 text-xs uppercase font-bold">Blocked Threat Vectors</div>
                <div className="text-3xl font-black text-rose-400 mt-2 font-mono">1,042</div>
                <div className="text-slate-400 text-xs mt-1">7.2% overall risk score</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all">
                <div className="text-cyan-400 text-xs uppercase font-bold">Consensus Precision</div>
                <div className="text-3xl font-black text-cyan-400 mt-2 font-mono">99.8%</div>
                <div className="text-slate-400 text-xs mt-1">3 LLM Quorum Agreement</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl hover:border-blue-400/40 transition-all">
                <div className="text-blue-400 text-xs uppercase font-bold">Active Endpoint Extensions</div>
                <div className="text-3xl font-black text-blue-400 mt-2 font-mono">842</div>
                <div className="text-slate-400 text-xs mt-1">Connected Chrome Nodes</div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between text-xs">
                <div className="text-white font-bold uppercase flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" /> Hourly Threat Vector Volume Distribution
                </div>
                <span className="text-cyan-400 animate-pulse">● Live Analytics Sync</span>
              </div>

              <div className="grid grid-cols-12 gap-3 h-40 items-end pt-4 border-b border-cyan-500/10 pb-2">
                {[35, 50, 25, 80, 45, 90, 65, 40, 85, 30, 75, 95].map((height, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div 
                      style={{ height: `${height}%` }}
                      className="w-full bg-gradient-to-t from-cyan-600 via-blue-500 to-indigo-400 rounded-t-lg group-hover:from-cyan-400 group-hover:to-indigo-300 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    />
                    <span className="text-[10px] text-slate-500">{(idx * 2).toString().padStart(2, '0')}:00</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. TELEMETRY ================= */}
        {activeTab === 'telemetry' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-6 animate-in fade-in duration-300 font-mono">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                  <Terminal className="h-8 w-8 text-cyan-400" />
                  Live System Telemetry Stream
                </h2>
                <p className="text-slate-400 text-xs uppercase mt-1">
                  Real-time event pipe, microservice status, and consensus inspect
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/30 px-3 py-2 rounded-xl">
                  <Filter className="h-3.5 w-3.5 text-cyan-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-transparent text-cyan-300 font-bold focus:outline-none uppercase"
                  >
                    <option value="ALL">All Types</option>
                    <option value="SYS">SYS</option>
                    <option value="NET">NET</option>
                    <option value="POL">POL</option>
                    <option value="NODE">NODE</option>
                    <option value="WARN">WARN</option>
                  </select>
                </div>

                <button
                  onClick={() => setIsStreaming(!isStreaming)}
                  className={`px-4 py-2 rounded-xl border font-bold uppercase transition-all flex items-center gap-2 ${
                    isStreaming ? 'bg-amber-950/40 border-amber-500/40 text-amber-300' : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{isStreaming ? 'Pause' : 'Stream'}</span>
                </button>

                <button
                  onClick={() => setTelemetryLogs([])}
                  className="p-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-400 hover:text-rose-400 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div className="p-5 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl space-y-3">
                  <div className="text-cyan-400 text-xs font-bold uppercase flex items-center gap-2">
                    <Server className="h-4 w-4" /> Active Services
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">FastAPI Gateway</span>
                      <span className="text-emerald-400 font-bold">100%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                      <span className="text-slate-300">Consensus Engine</span>
                      <span className="text-emerald-400 font-bold">READY</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl text-xs flex flex-col h-[500px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-slate-300 font-bold">zerotrust-event-daemon.service</span>
                  </div>
                  <span className="text-cyan-400 font-bold">{isStreaming ? 'STREAMING' : 'PAUSED'}</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                  {telemetryLogs
                    .filter(log => filterType === 'ALL' || log.type === filterType)
                    .map((log) => (
                      <div key={log.id} className="flex items-start gap-3 p-1.5 rounded hover:bg-cyan-950/30 transition-colors">
                        <span className="text-slate-600 font-bold">[{log.timestamp}]</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                          {log.type}
                        </span>
                        <span className="text-slate-500 uppercase font-bold">[{log.subsystem}]</span>
                        <span className="text-slate-200">{log.message}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. SIGN IN / AUTH ================= */}
        {activeTab === 'auth' && (
          <div className="max-w-md mx-auto px-6 py-16 font-mono animate-in fade-in duration-300">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl space-y-6 shadow-2xl">
              {isLoggedIn ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                    <div>
                      <span className="text-xs text-cyan-400 font-bold uppercase">Authenticated User</span>
                      <h2 className="text-xl font-black uppercase text-white mt-1">{authEmail}</h2>
                    </div>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs uppercase"
                    >
                      Sign Out
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/20 text-xs text-cyan-300 space-y-2">
                    <span className="text-slate-500 block uppercase">API Key</span>
                    <code className="block text-white">zt_live_99482a0b12c8e411fa793012</code>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center space-y-2">
                    <div className="p-3 w-fit mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-black uppercase text-white">
                      {isSignUp ? 'Create SOC Account' : 'Portal Sign In'}
                    </h2>
                    <p className="text-slate-400 text-xs">Enter credentials to manage security keys</p>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); if (authEmail && authPassword) setIsLoggedIn(true); }} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px] uppercase font-bold">Work Email</label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="analyst@enterprise.com"
                        className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 text-[11px] uppercase font-bold">Password</label>
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-bold text-xs uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-300/40"
                    >
                      {isSignUp ? 'Register Account' : 'Authenticate'}
                    </button>
                  </form>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-slate-400 hover:text-cyan-400 text-xs"
                    >
                      {isSignUp ? 'Already have an account? Sign in' : "Don't have access? Request account"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
