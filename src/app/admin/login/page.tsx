"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Sparkles, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { error, success } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        success(`Welcome back, ${data.user.name || data.user.username}!`);
        router.push("/admin");
        router.refresh();
      } else {
        error(data.error || "Invalid username or password");
      }
    } catch (err) {
      error("Network error during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-green/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-cyber-grid bg-[size:32px_32px] opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-brand-green/30 bg-surface-200/90 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-green to-brand-cyan p-[1px] mx-auto mb-4 shadow-glow-sm">
              <div className="w-full h-full rounded-2xl bg-surface-300 flex items-center justify-center text-brand-green font-black text-xl font-mono">
                W
              </div>
            </div>
            <h1 className="text-2xl font-black text-white font-display">
              CMS Admin Login
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Sunil Kumar Bohara Portfolio Suite
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center justify-between">
                <span>Username or Email</span>
                <span className="text-[10px] text-brand-green">Default: admin</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-100 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] text-brand-green">Default: Admin@123456</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-100 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs hover:brightness-110 shadow-glow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
              <span>JWT HTTP-Only & Bcrypt Security</span>
            </div>
            <p className="text-[10px] text-gray-500">
              Passwords can be changed anytime in CMS Users & Roles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
