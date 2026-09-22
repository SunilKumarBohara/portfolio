"use client";

import React, { useMemo } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { auditPrompt } from "@/lib/prompt-engine/auditor";

interface PromptAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdown: string;
}

export default function PromptAuditorModal({
  isOpen,
  onClose,
  markdown,
}: PromptAuditorModalProps) {
  const audit = useMemo(() => auditPrompt(markdown), [markdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#070b24] border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#08102e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                PROMPT ENGINEERING AUDIT
              </h2>
              <p className="text-[11px] text-text-muted">
                Qualitative evaluation across 8 core software specification dimensions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-5">
          {/* Overall Evaluation Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-surface-100/60 to-brand-blue/10 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-emerald-300 font-mono uppercase">
                Overall Assessment
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              {audit.overallSummary}
            </p>
          </div>

          {/* 8 Dimensions Grid */}
          <div>
            <h3 className="text-xs font-mono uppercase text-text-muted tracking-wider mb-2.5">
              Dimension Evaluation Breakdown:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {audit.dimensions.map((dim) => {
                const isHigh = dim.rating === "High";
                const isMed = dim.rating === "Medium";
                return (
                  <div
                    key={dim.name}
                    className={`p-3 rounded-xl border flex flex-col justify-between gap-1.5 transition-all ${
                      isHigh
                        ? "bg-emerald-950/20 border-emerald-500/30"
                        : isMed
                        ? "bg-amber-950/20 border-amber-500/30"
                        : "bg-red-950/20 border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">{dim.name}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                          isHigh
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : isMed
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : "bg-red-500/20 text-red-300 border border-red-500/40"
                        }`}
                      >
                        {dim.rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">{dim.summary}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-3.5 rounded-xl bg-[#061226] border border-brand-blue/30">
              <h4 className="text-xs font-bold text-brand-cyan font-mono uppercase mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue" />
                Detected Strengths ({audit.strengths.length})
              </h4>
              <ul className="space-y-1.5">
                {audit.strengths.map((str, i) => (
                  <li key={i} className="text-[11px] text-text-secondary flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses / Opportunities */}
            <div className="p-3.5 rounded-xl bg-[#170e18] border border-amber-500/30">
              <h4 className="text-xs font-bold text-amber-300 font-mono uppercase mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Opportunities for Improvement ({audit.weaknesses.length})
              </h4>
              <ul className="space-y-1.5">
                {audit.weaknesses.map((wk, i) => (
                  <li key={i} className="text-[11px] text-text-secondary flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">!</span>
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Recommendations */}
          {audit.actionableFixes.length > 0 && (
            <div className="p-4 rounded-xl bg-surface-100/60 border border-white/10">
              <h4 className="text-xs font-bold text-white font-mono uppercase mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-brand-cyan" />
                Actionable Recommendations:
              </h4>
              <div className="space-y-1.5">
                {audit.actionableFixes.map((fix, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#050818] border border-white/5 text-xs text-text-secondary font-mono flex items-start gap-2"
                  >
                    <span className="text-brand-cyan font-bold">{idx + 1}.</span>
                    <span>{fix}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
