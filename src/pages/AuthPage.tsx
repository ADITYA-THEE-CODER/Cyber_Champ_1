import React, { useState } from 'react';
import { Lock, Mail, Key, Shield, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-in fade-in font-mono">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase">Authenticated Session</span>
              <h2 className="text-2xl font-black uppercase text-white mt-1">{email}</h2>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs uppercase hover:bg-rose-900/60 transition-all"
            >
              Sign Out
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Key className="h-4 w-4 text-cyan-400" /> Enterprise API Access Key
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/20 flex items-center justify-between text-xs text-cyan-300">
              <code>zt_live_99482a0b12c8e411fa793012</code>
              <button 
                onClick={() => alert("API key copied to clipboard.")}
                className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 hover:bg-cyan-500/30"
              >
                Copy Key
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16 font-mono animate-in fade-in duration-300">
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-2xl space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="p-3 w-fit mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black uppercase text-white">
            {isSignUp ? 'Create SOC Account' : 'Portal Sign In'}
          </h2>
          <p className="text-slate-400 text-xs">Enter credentials to manage security keys</p>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-slate-400 text-[11px] uppercase font-bold">Work Email</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@enterprise.com"
                className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-[11px] uppercase font-bold">Password</label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-300/40 flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Register Account' : 'Authenticate'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-slate-400 hover:text-cyan-400 text-xs transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have access? Request account"}
          </button>
        </div>
      </div>
    </div>
  );
}
