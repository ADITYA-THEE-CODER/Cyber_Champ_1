import React, { useState } from 'react';
import { Radar, ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: input }),
      });

      if (!response.ok) {
        throw new Error('Network bridge rejected payload confirmation matrix.');
      }

      const data = await response.json();
      setResult(data);

      // Dispatches a universal global alert system telemetry packet to the dashboard page automatically
      const scanEvent = new CustomEvent('zerotrust-scan-completed', {
        detail: {
          timestamp: new Date().toLocaleTimeString(),
          payload: input,
          threat_level: data.threat_level,
          risk_score: data.risk_score,
          source: data.source,
        },
      });
      window.dispatchEvent(scanEvent);

    } catch (err: any) {
      setError(err.message || 'Fatal exception during cloud engine parsing routing.');
    } finally {
      setLoading(false);
    }
  };

  const isThreat = result?.threat_level.includes('🔴') || result?.threat_level.includes('HIGH') || result?.threat_level.includes('CRITICAL');

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Threat Gateway</h2>
        <p className="text-neutral-400 text-sm mt-1">Submit dynamic system footprints, raw payload patterns, or deep links for live validation.</p>
      </div>

      <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste transmission logs, suspicious text tokens, or suspicious urls here..." 
          className="flex-1 px-4 py-3 bg-neutral-900 border border-white/15 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 text-sm transition"
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-800 disabled:text-neutral-500 font-semibold transition flex items-center justify-center gap-2 min-w-[130px]"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <Radar className="h-4 w-4" />
              Deploy Scan
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className={`p-6 rounded-xl border backdrop-blur-md transition-all duration-300 ${isThreat ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {isThreat ? <ShieldAlert className="h-5 w-5 text-red-500" /> : <ShieldCheck className="h-5 w-5 text-emerald-500" />}
                <span className="font-bold text-lg tracking-tight">System Verdict: {result.threat_level}</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">{result.explanation}</p>
              <div className="text-[11px] text-neutral-500 pt-2 font-mono">
                Telemetry Provider: {result.source}
              </div>
            </div>
            
            <div className="text-right shrink-0">
              <div className="text-xs uppercase tracking-wider text-neutral-500">Risk Score</div>
              <div className={`text-4xl font-extrabold tracking-tight mt-1 ${isThreat ? 'text-red-500' : 'text-emerald-500'}`}>
                {result.risk_score}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
