"use client";

import React, { useState } from "react";
import { X, Wand2, CheckCircle, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { improvePrompt } from "@/lib/prompt-engine/improver";
import { PromptImprovementResult } from "@/lib/prompt-engine/types";

interface PromptImproverModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrompt: string;
  onApplyImproved: (improvedPrompt: string) => void;
}

export default function PromptImproverModal({
  isOpen,
  onClose,
  currentPrompt,
  onApplyImproved,
}: PromptImproverModalProps) {
  const [inputPrompt, setInputPrompt] = useState(currentPrompt);
  const [result, setResult] = useState<PromptImprovementResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleRunImprover = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = improvePrompt(inputPrompt || currentPrompt);
      setResult(res);
      setIsAnalyzing(false);
    }, 300);
  };

  const handleApply = () => {
    if (result) {
      onApplyImproved(result.improvedPrompt);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[90vh] bg-[#070b24] border border-brand-blue/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e30]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                PROMPT IMPROVER & ENHANCEMENT ENGINE
              </h2>
              <p className="text-[11px] text-text-muted">
                Analyze ambiguity, missing edge cases, and upgrade to master specifications
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 flex flex-col gap-4">
          {/* Top Prompt Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-secondary flex items-center justify-between">
              <span>Paste Prompt to Analyze & Improve:</span>
              <button
                type="button"
                onClick={() => setInputPrompt(currentPrompt)}
                className="text-[10px] text-brand-cyan hover:underline font-mono"
              >
                Use Editor Prompt
              </button>
            </label>
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              rows={4}
              placeholder="Paste any prompt or vague instructions here..."
              className="w-full bg-[#05081a] border border-white/10 rounded-xl p-3 text-xs text-white font-mono placeholder:text-text-muted focus:outline-none focus:border-amber-400/50 resize-y"
            />
            <button
              onClick={handleRunImprover}
              disabled={isAnalyzing || !inputPrompt.trim()}
              className="self-start mt-1 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-glow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? "Auditing Prompt..." : "Analyze & Improve Prompt"}</span>
            </button>
          </div>

          {/* Results Display */}
          {result && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4 border-t border-white/10">
              {/* Left Column: Detected Issues */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-amber-300 font-mono uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Issues Detected ({result.issuesFound.length})
                  </h3>
                  <ul className="space-y-1.5">
                    {result.issuesFound.map((issue, i) => (
                      <li key={i} className="text-[11px] text-amber-100/90 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-amber-400 shrink-0">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-brand-cyan font-mono uppercase flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-brand-blue" />
                    Improvements Applied
                  </h3>
                  <ul className="space-y-1.5">
                    {result.rationale.map((rat, i) => (
                      <li key={i} className="text-[11px] text-blue-100/90 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-brand-cyan shrink-0">✓</span>
                        <span>{rat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Improved Prompt */}
              <div className="lg:col-span-7 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white font-mono uppercase">
                    Improved Master Prompt:
                  </h3>
                  <span className="text-[10px] font-mono text-text-muted">
                    {result.improvedPrompt.split(/\s+/).length} words
                  </span>
                </div>
                <div className="flex-1 max-h-72 overflow-y-auto custom-scrollbar bg-[#050818] border border-brand-blue/30 rounded-xl p-3.5 text-xs font-mono text-emerald-300/90 leading-relaxed whitespace-pre-wrap">
                  {result.improvedPrompt}
                </div>
                <button
                  onClick={handleApply}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-sm flex items-center justify-center gap-2 transition-all mt-1"
                >
                  <span>Apply Improved Prompt to Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
