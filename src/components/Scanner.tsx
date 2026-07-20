import React, { useState } from 'react';
import { ShieldAlert, Globe, Hash, QrCode, Terminal, RefreshCw, Zap, ExternalLink } from 'lucide-react';

type ScannerMode = 'url' | 'file' | 'qrcode';

interface ScanResult {
  threat_level: string;
  risk_score: string;
  source: string;
  explanation: string;
  recommendation?: string;
}

export default function Scanner() {
  const [mode, setMode] = useState<ScannerMode>('url');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    let payloadText = input;
    if (mode === 'file') payloadText = `[FILE_HASH_VECTOR]: ${input}`;
    if (mode === 'qrcode') payloadText = `[QR_CODE_RAW_DATA]: ${input}`;

    try {
      const response = await fetch('https://cyber-champ-2.onrender.com/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: payloadText }),
      });

      if (!response.ok) throw new Error('Network firewall rejected execution path.');
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Threat detection engine unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 animate-in fade-in duration-300">
      {/* Title & Vector Switcher */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Multi-Vector Gateway
        </h1>
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">
          Secure Network Deployment // Modular Shields Active
        </p>

        {/* Vector Selection Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 backdrop-blur-xl gap-2 mt-4 shadow-lg shadow-black/50">
          <button
            type="button"
            onClick={() => { setMode('url'); setResult(null); setError(null); }}
            className={`px-5 py-2 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
              mode === 'url'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            URL / Text
          </button>
          <button
            type="button"
            onClick={() => { setMode('file'); setResult(null); setError(null); }}
            className={`px-5 py-2 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
              mode === 'file'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30'
            }`}
          >
            <Hash className="h-3.5 w-3.5" />
            File Hash
          </button>
          <button
            type="button"
            onClick={() => { setMode('qrcode'); setResult(null); setError(null); }}
            className={`px-5 py-2 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 ${
              mode === 'qrcode'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30'
            }`}
          >
            <QrCode className="h-3.5 w-3.5" />
            QR Code
          </button>
        </div>
      </div>

      {/* Input Form Card */}
      <form onSubmit={handleScan} className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-2xl shadow-xl shadow-cyan-950/20 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
          <Terminal className="h-4 w-4" />
          <span>sys_root@zerotrust:~# input_{mode}_vector --verify</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'url'
                ? 'Inject raw string text tokens or suspicious deep links...'
                : mode === 'file'
                ? 'Paste SHA-256 or MD5 cryptographic file hash string...'
                : 'Paste decoded QR matrix payload link...'
            }
            className="flex-1 bg-slate-950/90 border border-cyan-500/30 rounded-2xl px-5 py-3.5 text-sm text-cyan-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono shadow-inner"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border border-cyan-300/40 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                <span>Scan Vector</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 font-mono text-xs flex items-center gap-3 backdrop-blur-xl">
          <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0" />
          <div>[!] EXCEPTION DETECTED: {error}</div>
        </div>
      )}

      {/* Scan Verdict Report */}
      {result && (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 space-y-6 animate-in slide-in-from-bottom-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/10 pb-6">
            <div>
              <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider">System Verdict</div>
              <div className="text-2xl font-black uppercase text-white mt-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                {result.threat_level}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-slate-400 text-xs font-mono uppercase">Risk Score</div>
                <div className="text-3xl font-black text-cyan-400 font-mono">{result.risk_score}/100</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="text-slate-400">
              <span className="text-cyan-400 font-bold">SOURCE ENGINE:</span> {result.source}
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/10 text-slate-300 leading-relaxed">
              {result.explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
