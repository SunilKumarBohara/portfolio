"use client";

import React, { useState } from "react";
import { X, Dna, Save, RotateCcw, Check, Sparkles, ShieldCheck } from "lucide-react";
import { PromptDNA } from "@/lib/prompt-engine/types";
import { DEFAULT_PROMPT_DNA } from "@/lib/prompt-engine/prompt-dna-defaults";

interface PromptDNASettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dna: PromptDNA;
  onSaveDNA: (newDNA: PromptDNA) => void;
}

export default function PromptDNASettingsModal({
  isOpen,
  onClose,
  dna,
  onSaveDNA,
}: PromptDNASettingsModalProps) {
  const [formData, setFormData] = useState<PromptDNA>(dna);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveDNA(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const handleReset = () => {
    setFormData(DEFAULT_PROMPT_DNA);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#070b24] border border-brand-blue/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e32]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center">
              <Dna className="w-4 h-4 text-brand-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                PROMPT DNA CONFIGURATION
              </h2>
              <p className="text-[11px] text-text-muted">
                Define the permanent blueprint and behavioral heuristics for your AI prompts
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

        {/* Content Form */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-5">
          {/* Concept summary banner */}
          <div className="p-3.5 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-start gap-2.5 text-xs text-blue-100">
            <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>PROMPT DNA</strong> governs the internal architecture of every generated prompt. It enforces non-destructive modifications, structured engineering breakdowns, and strict validation so your AI outputs consistently feel like senior-architect specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Structure */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-text-muted">Structure Depth</label>
              <select
                value={formData.structure}
                onChange={(e) =>
                  setFormData({ ...formData, structure: e.target.value as PromptDNA["structure"] })
                }
                className="w-full bg-[#050818] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="Compact">Compact (Lean specifications)</option>
                <option value="Detailed">Detailed (In-depth multi-section)</option>
                <option value="Master">Master (Full Enterprise Spec Architecture)</option>
              </select>
            </div>

            {/* 2. Tone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-text-muted">Voice & Tone</label>
              <select
                value={formData.tone}
                onChange={(e) =>
                  setFormData({ ...formData, tone: e.target.value as PromptDNA["tone"] })
                }
                className="w-full bg-[#050818] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="Professional">Professional (Polished senior engineer)</option>
                <option value="Technical">Technical (Precise interfaces & systems)</option>
                <option value="Direct">Direct (Concise and imperative)</option>
                <option value="Creative">Creative (Design and storytelling focus)</option>
              </select>
            </div>

            {/* 3. Instruction Style */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-text-muted">Instruction Style</label>
              <select
                value={formData.instructionStyle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instructionStyle: e.target.value as PromptDNA["instructionStyle"],
                  })
                }
                className="w-full bg-[#050818] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="Specification">Specification (Software Spec Document)</option>
                <option value="Step-by-step">Step-by-step (Sequential execution)</option>
                <option value="Checklist">Checklist (Task-driven milestones)</option>
                <option value="Hybrid">Hybrid (Specification + Checklist)</option>
              </select>
            </div>

            {/* 4. Codebase Behavior */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-text-muted">Codebase Behavior</label>
              <select
                value={formData.codebaseBehavior}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    codebaseBehavior: e.target.value as PromptDNA["codebaseBehavior"],
                  })
                }
                className="w-full bg-[#050818] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="Inspect first">Inspect first (Strict non-destructive)</option>
                <option value="Modify existing">Modify existing (Pragmatic targeted refactor)</option>
                <option value="Rebuild if necessary">Rebuild if necessary (Allow clean rewrites)</option>
              </select>
            </div>

            {/* 5. Validation Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-text-muted">Validation Rigor</label>
              <select
                value={formData.validation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    validation: e.target.value as PromptDNA["validation"],
                  })
                }
                className="w-full bg-[#050818] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="Production">Production (Full build + Viewport + Console check)</option>
                <option value="Detailed">Detailed (Unit testing + Smoke test)</option>
                <option value="Basic">Basic (Basic sanity check)</option>
              </select>
            </div>

            {/* 6. Output Preference */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-text-muted">Output Preference</label>
              <select
                value={formData.outputPreference}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    outputPreference: e.target.value as PromptDNA["outputPreference"],
                  })
                }
                className="w-full bg-[#050818] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              >
                <option value="Markdown">Structured Markdown (GitHub-flavored)</option>
                <option value="Copy-ready">Copy-ready (Optimized for one-click paste)</option>
                <option value="Plain Text">Plain Text (Clean text without symbols)</option>
                <option value="JSON">JSON Schema</option>
              </select>
            </div>
          </div>

          {/* Heuristic Feature Toggles */}
          <div className="pt-3 border-t border-white/10 space-y-2.5">
            <h3 className="text-xs font-mono uppercase text-text-muted font-bold">
              DNA Guardrail Toggles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-100/50 border border-white/5 cursor-pointer hover:bg-white/5">
                <input
                  type="checkbox"
                  checked={formData.preserveNonDestructive}
                  onChange={(e) =>
                    setFormData({ ...formData, preserveNonDestructive: e.target.checked })
                  }
                  className="rounded border-white/20 bg-surface-200 text-brand-blue focus:ring-0"
                />
                <span className="text-xs text-text-secondary">Non-destructive modification rules</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-100/50 border border-white/5 cursor-pointer hover:bg-white/5">
                <input
                  type="checkbox"
                  checked={formData.errorPrevention}
                  onChange={(e) =>
                    setFormData({ ...formData, errorPrevention: e.target.checked })
                  }
                  className="rounded border-white/20 bg-surface-200 text-brand-blue focus:ring-0"
                />
                <span className="text-xs text-text-secondary">Strict &ldquo;DO NOT DO&rdquo; guardrails</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-100/50 border border-white/5 cursor-pointer hover:bg-white/5">
                <input
                  type="checkbox"
                  checked={formData.includeTesting}
                  onChange={(e) =>
                    setFormData({ ...formData, includeTesting: e.target.checked })
                  }
                  className="rounded border-white/20 bg-surface-200 text-brand-blue focus:ring-0"
                />
                <span className="text-xs text-text-secondary">Mandatory testing & build checks</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-100/50 border border-white/5 cursor-pointer hover:bg-white/5">
                <input
                  type="checkbox"
                  checked={formData.includeAuditChecklist}
                  onChange={(e) =>
                    setFormData({ ...formData, includeAuditChecklist: e.target.checked })
                  }
                  className="rounded border-white/20 bg-surface-200 text-brand-blue focus:ring-0"
                />
                <span className="text-xs text-text-secondary">Final verification [ ] checklist</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#080d28] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 text-text-muted hover:text-white text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-sm transition-all"
          >
            {isSaved ? <Check className="w-3.5 h-3.5 text-white" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaved ? "Saved!" : "Save Prompt DNA"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
