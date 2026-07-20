import React, { useState } from 'react';
import { Shield, Lock, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState('zerotrust');

  const policies = {
    zerotrust: {
      title: "Zero Trust Architecture Policy",
      updated: "2026-06-15",
      sections: [
        {
          heading: "1. Default-Deny Security Model",
          body: "Every network connection, incoming link, or file upload is treated as untrusted by default. Content is never allowed to execute or render on the user's browser without explicit validation by the consensus engine."
        },
        {
          heading: "2. Endpoint Data Isolation",
          body: "Scanned payloads are executed in isolated ephemeral containers. No user identity tokens, session cookies, or private browser state are transmitted to external AI endpoints during analysis."
        }
      ]
    },
    privacy: {
      title: "Data Protection & Anonymization Policy",
      updated: "2026-05-01",
      sections: [
        {
          heading: "1. Zero-Retention Telemetry",
          body: "URL parameters containing sensitive query tokens (e.g., passkeys, session tokens, JWTs) are automatically stripped before logging telemetry to our database."
        },
        {
          heading: "2. LLM Data Privacy Compliance",
          body: "Prompts dispatched to Groq, DeepSeek, or Gemini workers do not store search payloads for model training. All AI provider interactions adhere to enterprise zero-retention SLAs."
        }
      ]
    },
    compliance: {
      title: "Enterprise Compliance & SLA Rules",
      updated: "2026-04-10",
      sections: [
        {
          heading: "1. Service Availability SLA",
          body: "ZeroTrust One guarantees 99.9% uptime for core API scanning endpoints. Failover routes redirect to secondary inference clusters if secondary node latency exceeds 500ms."
        }
      ]
    }
  };

  const current = policies[selectedPolicy as keyof typeof policies];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10 animate-in fade-in duration-300 font-mono">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black uppercase text-white">Security & Governance Policies</h1>
        <p className="text-slate-400 text-xs uppercase tracking-widest">Enterprise Compliance & Rulebooks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
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

        {/* Policy Content Body */}
        <div className="lg:col-span-3 p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4">
            <h2 className="text-2xl font-black uppercase text-white">{current.title}</h2>
            <span className="text-xs text-slate-500">Last Revised: {current.updated}</span>
          </div>

          <div className="space-y-6">
            {current.sections.map((sec, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-base font-bold text-cyan-400 uppercase">{sec.heading}</h3>
                <p className="text-slate-300 text-xs leading-relaxed bg-slate-950 p-4 rounded-2xl border border-cyan-500/10">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
