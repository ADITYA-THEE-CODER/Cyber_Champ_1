import React, { useState } from 'react';
import { 
  ShieldCheck, Cpu, Database, Eye, Terminal, Layers, 
  Search, ArrowRight, CheckCircle2, Lock, Zap, Server
} from 'lucide-react';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      title: "1. Payload Ingestion & Sanitization",
      icon: Eye,
      summary: "Normalizes incoming URLs, file signatures, or QR decode vectors.",
      description: "When an input reaches ZeroTrust One, it is stripped of deceptive encoding (like double-URL encoding or unicode homoglyphs). The raw vector is tokenized before being dispatched through parallel inspection workers."
    },
    {
      title: "2. Static Heuristics & Signature Lookup",
      icon: Database,
      summary: "Cross-checks known bad hashes and malicious domain rulebooks.",
      description: "The payload is checked against local RAM signatures and external threat feeds (VirusTotal, abuse.ch, PhishTank). If an exact SHA-256 match or blocklisted TLD is flagged, it is intercepted immediately in <10ms."
    },
    {
      title: "3. Multi-LLM Consensus Matrix",
      icon: Cpu,
      summary: "Groq (Llama-3), DeepSeek V3, and Gemini perform zero-shot evaluation.",
      description: "Uncategorized or zero-day vectors are sent through a quorum of high-speed AI models. Each model independently evaluates domain age, entropy scores, credential-harvesting UI markers, and phishing triggers."
    },
    {
      title: "4. Policy & Risk Scoring Engine",
      icon: Layers,
      summary: "Aggregates model outputs into a unified 0-100 risk score.",
      description: "A weight matrix combines the AI consensus, threat intelligence feedback, and Zero Trust default-deny rules. If the aggregate risk exceeds threshold parameters, the vector is marked as High/Critical Risk."
    },
    {
      title: "5. Real-Time Telemetry & Action",
      icon: Terminal,
      summary: "Streams verdict to client extension and logs to WebSocket pipeline.",
      description: "The response is sent back to your browser extension or web client to block navigation or warn the user. All telemetry data streams directly into the SOC Dashboard."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-300 font-mono">
      {/* Header */}
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

      {/* Pipeline Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Step Selector List */}
        <div className="space-y-3">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
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

        {/* Active Step Detailed Inspector */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
            <span className="text-xs text-cyan-400 font-bold uppercase">Pipeline Phase {activeStep + 1} of 5</span>
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              ● Active Subsystem
            </span>
          </div>

          <h3 className="text-2xl font-black uppercase text-white">
            {pipelineSteps[activeStep].title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed bg-slate-950 p-6 rounded-2xl border border-cyan-500/20">
            {pipelineSteps[activeStep].description}
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
  );
}
