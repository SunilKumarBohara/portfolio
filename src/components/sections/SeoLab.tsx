"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { auditPresets, generateDynamicAudit } from "@/data/auditPresets";
import { SeoAuditReport } from "@/types";
import confetti from "canvas-confetti";
import {
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  Smartphone,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Activity,
} from "lucide-react";

export default function SeoLab() {
  const [urlInput, setUrlInput] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [report, setReport] = useState<SeoAuditReport | null>(
    auditPresets["saas-platform"]
  );

  const handleRunAudit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;

    setIsAuditing(true);
    setTimeout(() => {
      const generated = generateDynamicAudit(urlInput);
      setReport(generated);
      setIsAuditing(false);

      if (generated.score >= 90) {
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#00e599", "#00f0ff", "#ffffff"],
          });
        } catch {
          // ignore confetti fallback
        }
      }
    }, 900);
  };

  const handleSelectPreset = (presetKey: string) => {
    setIsAuditing(true);
    setTimeout(() => {
      setReport(auditPresets[presetKey]);
      setUrlInput(auditPresets[presetKey].url);
      setIsAuditing(false);
    }, 400);
  };

  return (
    <section id="seo-lab" className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-radial from-brand-green/10 via-brand-cyan/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Interactive Growth Lab • Demo"
          title="SEO Diagnostic Lab"
          subtitle="Test any domain or select preset architectures to simulate a multi-point technical, on-page, and Core Web Vitals audit."
        />

        {/* Audit Search Bar & Presets Container */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleRunAudit} className="relative flex items-center mb-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Search className="w-5 h-5 text-brand-green" />
              </div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter domain (e.g. yourwebsite.com or https://example.com)..."
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-surface-200/90 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green shadow-glass-card font-mono transition-all"
              />
              <button
                type="submit"
                disabled={isAuditing}
                className="absolute inset-y-1.5 right-1.5 px-6 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {isAuditing ? (
                  <span className="flex items-center gap-1.5 font-mono">
                    <Activity className="w-3.5 h-3.5 animate-spin" />
                    Auditing...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-mono">
                    Run Audit
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Instant Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-500 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                Quick Demos:
              </span>
              <button
                type="button"
                onClick={() => handleSelectPreset("saas-platform")}
                className="px-3 py-1 rounded-lg bg-surface-100/90 hover:bg-surface-50 border border-white/10 text-gray-300 hover:text-brand-green transition-all"
              >
                B2B SaaS
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset("ecommerce-store")}
                className="px-3 py-1 rounded-lg bg-surface-100/90 hover:bg-surface-50 border border-white/10 text-gray-300 hover:text-brand-green transition-all"
              >
                E-Commerce
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset("local-business")}
                className="px-3 py-1 rounded-lg bg-surface-100/90 hover:bg-surface-50 border border-white/10 text-gray-300 hover:text-brand-green transition-all"
              >
                Nepal Local Business
              </button>
            </div>

            <span className="text-[10px] text-brand-cyan/80 bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
              Simulation Engine
            </span>
          </div>
        </div>

        {/* Audit Output Results Dashboard */}
        <AnimatePresence mode="wait">
          {report && (
            <motion.div
              key={report.url + report.score}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-brand-green/30 bg-surface-200/90 p-6 sm:p-8 backdrop-blur-xl shadow-glass-card"
            >
              {/* Header Info */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
                    <span>Audit Subject:</span>
                    <span className="text-white font-bold">{report.url}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    SEO Diagnostic Scorecard
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">
                    {report.summary}
                  </p>
                </div>

                {/* Score Dial */}
                <div className="flex items-center gap-4 bg-surface-100/90 p-4 rounded-2xl border border-white/10 shrink-0">
                  <div className="relative w-16 h-16 rounded-full bg-surface-300 border-2 border-brand-green/40 flex items-center justify-center shadow-glow-sm">
                    <span className="text-xl font-extrabold text-brand-green font-mono">
                      {report.score}
                    </span>
                  </div>
                  <div className="font-mono">
                    <p className="text-xs text-gray-400">SEO Health Grade</p>
                    <p className="text-lg font-bold text-white">
                      Rating: <span className="text-brand-green">{report.grade}</span>
                    </p>
                    <p className="text-[10px] text-gray-500">100-Point Model</p>
                  </div>
                </div>
              </div>

              {/* 6 Audit Check Elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                {/* Title Check */}
                <div className="p-4 rounded-xl bg-surface-100/70 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Title Tag & Snippet</span>
                    {report.checks.title.status === "pass" ? (
                      <span className="flex items-center gap-1 text-brand-green text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pass
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Notice
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-white font-mono">
                    {report.checks.title.text}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {report.checks.title.detail}
                  </p>
                </div>

                {/* Meta Description */}
                <div className="p-4 rounded-xl bg-surface-100/70 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Meta Description</span>
                    {report.checks.meta.status === "pass" ? (
                      <span className="flex items-center gap-1 text-brand-green text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pass
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Length Warn
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-white font-mono">
                    {report.checks.meta.text}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {report.checks.meta.detail}
                  </p>
                </div>

                {/* Heading Hierarchy */}
                <div className="p-4 rounded-xl bg-surface-100/70 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">H1-H6 Hierarchy</span>
                    <span className="flex items-center gap-1 text-brand-green text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white font-mono">
                    {report.checks.headings.text}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {report.checks.headings.detail}
                  </p>
                </div>

                {/* Core Web Vitals */}
                <div className="p-4 rounded-xl bg-surface-100/70 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Core Web Vitals</span>
                    <span className="flex items-center gap-1 text-brand-green text-[11px]">
                      <Zap className="w-3.5 h-3.5" /> {report.checks.coreWebVitals.score}/100
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white font-mono">
                    LCP: {report.checks.coreWebVitals.lcp} | FID: {report.checks.coreWebVitals.fid} | CLS: {report.checks.coreWebVitals.cls}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Page rendering speed meets Google search performance benchmarks.
                  </p>
                </div>

                {/* Indexability */}
                <div className="p-4 rounded-xl bg-surface-100/70 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Indexability & Directives</span>
                    {report.checks.indexability.status === "pass" ? (
                      <span className="flex items-center gap-1 text-brand-green text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Pass
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Caution
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-white font-mono">
                    {report.checks.indexability.text}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {report.checks.indexability.detail}
                  </p>
                </div>

                {/* Schema Structured Data */}
                <div className="p-4 rounded-xl bg-surface-100/70 border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">Schema.org JSON-LD</span>
                    {report.checks.schema.status === "pass" ? (
                      <span className="flex items-center gap-1 text-brand-green text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" /> Detected
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Partial
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-white font-mono">
                    {report.checks.schema.text}
                  </p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {report.checks.schema.detail}
                  </p>
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="p-5 rounded-2xl bg-surface-100/90 border border-brand-green/20">
                <h4 className="text-xs font-mono uppercase tracking-wider text-brand-green mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Prioritized Action Recommendations:
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {report.recommendations.map((rec, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-brand-cyan font-mono font-bold">{rIdx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lab Footer CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs font-mono text-gray-500">
                  Want a comprehensive 100+ point full-site audit for your domain?
                </p>
                <a
                  href="#contact"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-2"
                >
                  <span>Request Full SEO Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
