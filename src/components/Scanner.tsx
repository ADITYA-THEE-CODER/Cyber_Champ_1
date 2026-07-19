import React, { useState } from 'react';
import { Radar, ShieldAlert, ShieldCheck, Loader2, Terminal, Cpu } from 'lucide-react';

interface ScanResult {
  threat_level: string;
  risk_score: string;
  source: string;
  explanation: string;
}

export default function Scanner() {
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

    try {
      const response = await fetch('https://comp-app-0k3a.onrender.com/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: input }),
      });

      if (!response.ok) throw new Error('Network firewall rejected execution path.');
      const data = await response.json();
      setResult(data);

      window.dispatchEvent(new CustomEvent('zerotrust-scan-completed', {
        detail: {
          timestamp: new Date().toLocaleTimeString(),
          payload: input,
          threat_level: data.threat_level,
          risk_score: data.risk_score,
          source: data.source,
        },
      }));

    } catch (err: any) {
      setError(err.message || 'Fatal error during parsing routing.');
    } finally {
      setLoading(false);
    }
  };

  const isThreat = result?.threat_level.includes('🔴') || result?.threat_level.includes('HIGH') || result?.threat_level.includes('CRITICAL');

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8 relative">
      {/* Top Header Deck */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
            Threat Analytics Gateway
          </h2>
          <p className="text-neutral-500 text-xs font-mono mt-1">SECURE PORT // CORE MATRIX DEPLOYMENT ACTIVE</p>
        </div>
        <Cpu className={`h-5 w-5 text-purple-500/50 ${loading ? 'animate-spin' : ''}`} />
      </div>

      {/* Input Core Console */}
      <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
        {loading && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent absolute top-0 animate-cyber-scan" />
            <div className="absolute inset-0 bg-purple-500/5 animate-pulse" />
          </div>
        )}
        
        <form onSubmit={handleScan} className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
            <Terminal className="h-3 w-3 text-purple-400" />
            <span>sys_root@zerotrust:~# input_payload --verify</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inject raw system tokens or deep links for live validation..." 
              className="flex-1 px-4 py-3 bg-black/60 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 text-sm font-mono transition-all duration-300"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-800 disabled:text-neutral-600 font-bold tracking-wide uppercase text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/10 min-w-[140px] hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Radar className="h-3.5 w-3.5 animate-pulse" />
                  Deploy Scan
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error Output Stack */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-300">
          [!] EXCEPTION DETECTED: {error}
        </div>
      )}

      {/* Modern High-End Verdict Report Display */}
      {result && (
        <div className={`p-6 rounded-2xl border backdrop-blur-xl transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${isThreat ? 'border-red-500/30 bg-red-500/5 glow-red' : 'border-emerald-500/30 bg-emerald-500/5 glow-emerald'}`}>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${isThreat ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  {isThreat ? <ShieldAlert className="h-5 w-5 animate-bounce" /> : <ShieldCheck className="h-5 w-5 text-emerald-400" />}
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">SYSTEM DIAGNOSTIC SUMMARY</div>
                  <span className="font-black text-xl tracking-tight text-white">Verdict: {result.threat_level}</span>
                </div>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed font-medium bg-black/20 p-4 rounded-xl border border-white/5">
                {result.explanation}
              </p>
              <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-500">
                <span>NODE: {result.source}</span>
                <span>STATUS: PARSING_COMPLETE</span>
              </div>
            </div>
            
            <div className="text-center sm:text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
              <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">CONFIDENCE LEVEL</div>
              <div className={`text-5xl font-black tracking-tighter mt-1 tabular-nums ${isThreat ? 'text-red-400' : 'text-emerald-400'}`}>
                {result.risk_score}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
