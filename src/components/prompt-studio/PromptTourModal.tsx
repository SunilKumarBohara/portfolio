"use client";

import React from "react";
import {
  X,
  Sparkles,
  Dna,
  Cpu,
  Layers,
  Sliders,
  ShieldCheck,
  History,
  Command,
  ArrowRight,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface PromptTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDNA: () => void;
  onOpenLibrary: () => void;
}

export default function PromptTourModal({
  isOpen,
  onClose,
  onOpenDNA,
  onOpenLibrary,
}: PromptTourModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#070b24] border border-brand-cyan/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e30]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-cyan p-[1px] shadow-glow-sm">
              <div className="w-full h-full rounded-lg bg-[#070b24] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                PROMPT ENGINEERING OS — USER GUIDE & ARCHITECTURE
              </h2>
              <p className="text-[11px] text-text-muted">
                How Prompt DNA, Target AI adapters, and non-destructive heuristics work
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
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
          {/* Section 1: The Core Philosophy */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-brand-blue/15 via-surface-100/60 to-brand-cyan/15 border border-brand-cyan/30">
            <h3 className="text-xs font-mono font-bold text-brand-cyan uppercase mb-1.5 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              1. Transforming Simple Ideas into Enterprise Specifications
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Standard AI chatbots generate vague, generic boilerplate when given brief instructions.
              The <strong>Prompt Engineering OS</strong> behaves as a compiler: it ingests your high-level idea, runs it through your configured <strong>Prompt DNA</strong>, injects existing codebase guardrails, and outputs an exhaustive, implementation-ready software specification.
            </p>
          </div>

          {/* Section 2: Core Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Concept A: Prompt DNA */}
            <div className="p-3.5 rounded-xl bg-surface-100/50 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-blue font-mono uppercase">
                <Dna className="w-4 h-4" />
                Prompt DNA
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Your permanent internal writing style. Controls whether prompts are formatted as numbered specs, enforcement of non-destructive modification, mandatory testing commands, and error prevention checklists.
              </p>
            </div>

            {/* Concept B: Existing Project Mode */}
            <div className="p-3.5 rounded-xl bg-surface-100/50 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-red font-mono uppercase">
                <ShieldCheck className="w-4 h-4" />
                Existing Project Guard
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Protects active codebases from being wiped or replaced. Injects strict directives: <em>Inspect first, preserve existing working functionality, modify only what is necessary, and crawl the codebase after edits.</em>
              </p>
            </div>

            {/* Concept C: Target AI Adapters */}
            <div className="p-3.5 rounded-xl bg-surface-100/50 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-cyan font-mono uppercase">
                <Cpu className="w-4 h-4" />
                Target AI Tuning
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Adapts terminology and structure specifically for <strong>Antigravity</strong> (codebase crawl & verified build), <strong>Cursor</strong> (repo file diffs), <strong>Claude</strong> (deep reasoning), <strong>Gemini</strong> (GEO citations), or <strong>Image/Video AI</strong> (cameras & lighting).
              </p>
            </div>

            {/* Concept D: Project Memory */}
            <div className="p-3.5 rounded-xl bg-surface-100/50 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-400 font-mono uppercase">
                <Layers className="w-4 h-4" />
                Project Memory Vault
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Stores your project&apos;s active tech stack, aesthetic tokens (e.g. Sunil Portfolio&apos;s dark theme with blue & red accents), and roles so you never have to retype background context.
              </p>
            </div>
          </div>

          {/* Section 3: Keyboard Shortcuts */}
          <div className="p-4 rounded-xl bg-surface-100/60 border border-white/10">
            <h3 className="text-xs font-mono font-bold text-white uppercase mb-2 flex items-center gap-1.5">
              <Command className="w-4 h-4 text-brand-cyan" />
              Keyboard Shortcuts Reference:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-[#050818] border border-white/5">
                <span className="text-text-muted">Command Palette</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-[10px]">Ctrl K</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#050818] border border-white/5">
                <span className="text-text-muted">Generate Prompt</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-[10px]">Ctrl Enter</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#050818] border border-white/5">
                <span className="text-text-muted">New Spec</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-[10px]">Alt N</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#050818] border border-white/5">
                <span className="text-text-muted">Improve Prompt</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-[10px]">Alt I</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#050818] border border-white/5">
                <span className="text-text-muted">Prompt Audit</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-[10px]">Alt A</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#050818] border border-white/5">
                <span className="text-text-muted">Template Library</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-[10px]">Alt L</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#080d28] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenDNA();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-brand-blue/20 text-brand-cyan text-xs font-semibold transition-colors"
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Customize Prompt DNA</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenLibrary();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white font-bold text-xs shadow-glow-sm transition-all"
          >
            <span>Explore 20+ Master Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
