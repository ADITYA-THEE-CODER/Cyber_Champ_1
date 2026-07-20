import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Play, Pause, Trash2, Filter, Radio, Server, Cpu, 
  Search, ShieldAlert, ArrowDownCircle, CheckCircle2 
} from 'lucide-react';
import { TelemetryLog } from '../types/security';

const INITIAL_LOGS: TelemetryLog[] = [
  { id: 1, timestamp: '15:10:01.002', subsystem: 'GATEWAY', type: 'SYS', message: 'ZeroTrust Core Gateway listening on port 443.' },
  { id: 2, timestamp: '15:10:01.450', subsystem: 'HEURISTICS', type: 'POL', message: 'Loaded 14,200 active threat signatures into RAM.' },
  { id: 3, timestamp: '15:10:02.110', subsystem: 'CONSENSUS', type: 'NODE', message: 'Groq Llama-3 cluster connected (12ms RTT).' },
  { id: 4, timestamp: '15:10:02.340', subsystem: 'CONSENSUS', type: 'NODE', message: 'DeepSeek V3 consensus engine online (28ms RTT).' },
  { id: 5, timestamp: '15:10:05.890', subsystem: 'EXTENSION', type: 'NET', message: 'Browser extension client #8921 established WebSocket bridge.' }
];

export default function TelemetryView() {
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLog, setSelectedLog] = useState<TelemetryLog | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll log feed
  useEffect(() => {
    if (isStreaming) {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isStreaming]);

  // Real-time event simulator
  useEffect(() => {
    if (!isStreaming) return;

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

      setLogs(prev => [
        ...prev.slice(-49), // Retain last 50 entries
        { id: Date.now(), timestamp: timeStr, ...randomEvent }
      ]);
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'ALL' || log.type === filterType;
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.subsystem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Controller */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <Terminal className="h-8 w-8 text-cyan-400" />
            Live System Telemetry Stream
          </h2>
          <p className="text-slate-400 font-mono text-xs uppercase mt-1">
            Real-time event pipe, microservice status, and consensus inspect
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stream..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-cyan-500/30 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/30 px-3 py-2 rounded-xl text-xs font-mono">
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
              <option value="ERR">ERR</option>
            </select>
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              isStreaming
                ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50'
                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
            }`}
          >
            {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isStreaming ? 'Pause' : 'Stream'}</span>
          </button>

          {/* Clear */}
          <button
            onClick={() => setLogs([])}
            className="p-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-all"
            title="Clear Stream"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Status Panels */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl space-y-3">
            <div className="text-cyan-400 text-xs font-mono font-bold uppercase flex items-center gap-2">
              <Server className="h-4 w-4" /> Active Services
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                <span className="text-slate-300">FastAPI Gateway</span>
                <span className="text-emerald-400 font-bold">100%</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                <span className="text-slate-300">PostgreSQL DB</span>
                <span className="text-emerald-400 font-bold">HEALTHY</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-cyan-500/10">
                <span className="text-slate-300">Redis Cache</span>
                <span className="text-emerald-400 font-bold">0.4ms</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/70 border border-cyan-500/20 backdrop-blur-xl space-y-3">
            <div className="text-cyan-400 text-xs font-mono font-bold uppercase flex items-center gap-2">
              <Cpu className="h-4 w-4" /> Consensus Node Mesh
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded-xl bg-slate-950 border border-cyan-500/10 flex justify-between items-center">
                <span className="text-slate-300">Groq Llama-3</span>
                <span className="text-emerald-400 font-bold">12ms</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-cyan-500/10 flex justify-between items-center">
                <span className="text-slate-300">DeepSeek V3</span>
                <span className="text-emerald-400 font-bold">28ms</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-cyan-500/10 flex justify-between items-center">
                <span className="text-slate-300">Gemini 1.5 Flash</span>
                <span className="text-emerald-400 font-bold">19ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Terminal Window */}
        <div className="lg:col-span-3 p-6 rounded-3xl bg-slate-950 border border-cyan-500/30 shadow-2xl font-mono text-xs flex flex-col h-[550px]">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-300 font-bold">zerotrust-event-daemon.service</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span>{isStreaming ? 'CONNECTED' : 'PAUSED'}</span>
            </div>
          </div>

          {/* Console Log Lines */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className="flex items-start gap-3 p-1.5 rounded hover:bg-cyan-950/30 transition-colors cursor-pointer group"
              >
                <span className="text-slate-600 shrink-0 font-bold">[{log.timestamp}]</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                  log.type === 'SYS' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30' :
                  log.type === 'NET' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                  log.type === 'POL' ? 'bg-purple-950 text-purple-300 border border-purple-500/30' :
                  log.type === 'WARN' ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                  log.type === 'ERR' ? 'bg-rose-950 text-rose-400 border border-rose-500/30' :
                  'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {log.type}
                </span>
                <span className="text-slate-500 shrink-0 uppercase font-bold">[{log.subsystem}]</span>
                <span className="text-slate-200 group-hover:text-cyan-200 truncate">{log.message}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Terminal Footer Prompt */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-cyan-400 font-bold mt-2">
            <div className="flex items-center gap-2">
              <span>sys_root@zerotrust-node:~#</span>
              <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse" />
            </div>
            <span className="text-slate-600 text-[10px]">Buffer: {filteredLogs.length} events</span>
          </div>
        </div>
      </div>

      {/* Selected Log Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 max-w-xl w-full space-y-4 font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-cyan-400 uppercase">Event Inspector #{selectedLog.id}</h3>
              <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <div><span className="text-slate-500">Timestamp:</span> <span className="text-white">{selectedLog.timestamp}</span></div>
              <div><span className="text-slate-500">Subsystem:</span> <span className="text-cyan-300">{selectedLog.subsystem}</span></div>
              <div><span className="text-slate-500">Log Type:</span> <span className="text-amber-300">{selectedLog.type}</span></div>
              <div><span className="text-slate-500">Message Payload:</span></div>
              <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/20 text-slate-200 break-all">
                {selectedLog.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
