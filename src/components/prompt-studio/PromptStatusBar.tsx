"use client";

import React from "react";
import { Terminal, Dna, Cpu, Layers, CheckCircle2, ShieldAlert } from "lucide-react";
import { TargetAI, PromptDNA, ProjectMemory, ProjectMode } from "@/lib/prompt-engine/types";

interface PromptStatusBarProps {
  targetAI: TargetAI;
  promptDNA: PromptDNA;
  activeProjectMemory?: ProjectMemory | null;
  mode: ProjectMode;
  wordCount: number;
  charCount: number;
  lastSavedAt?: string;
  isDirty?: boolean;
}

export default function PromptStatusBar({
  targetAI,
  promptDNA,
  activeProjectMemory,
  mode,
  wordCount,
  charCount,
  lastSavedAt,
  isDirty,
}: PromptStatusBarProps) {
  return (
    <footer className="w-full bg-[#03050e] border-t border-white/10 px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted select-none z-20">
      {/* Left status items */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Terminal Indicator */}
        <div className="flex items-center gap-1 text-emerald-400">
          <Terminal className="w-3 h-3" />
          <span className="hidden sm:inline">IDE READY</span>
        </div>

        {/* Target AI */}
        <div className="flex items-center gap-1 text-text-secondary">
          <Cpu className="w-3 h-3 text-brand-cyan" />
          <span className="uppercase">{targetAI}</span>
        </div>

        {/* Prompt DNA */}
        <div className="hidden md:flex items-center gap-1 text-text-secondary">
          <Dna className="w-3 h-3 text-brand-blue" />
          <span>DNA: {promptDNA.structure} / {promptDNA.tone}</span>
        </div>

        {/* Project Mode */}
        <div className="flex items-center gap-1">
          {mode === "existing" ? (
            <span className="px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px]">
              EXISTING PROJECT
            </span>
          ) : (
            <span className="px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px]">
              NEW PROJECT
            </span>
          )}
        </div>

        {/* Active Project Memory */}
        {activeProjectMemory && (
          <div className="hidden lg:flex items-center gap-1 text-text-secondary">
            <Layers className="w-3 h-3 text-purple-400" />
            <span className="truncate max-w-[140px]">{activeProjectMemory.name}</span>
          </div>
        )}
      </div>

      {/* Right status items */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Save Status */}
        <div className="flex items-center gap-1">
          {isDirty ? (
            <span className="flex items-center gap-1 text-amber-400 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Unsaved
            </span>
          ) : (
            <span className="flex items-center gap-1 text-emerald-400/80 text-[10px]">
              <CheckCircle2 className="w-3 h-3" />
              Saved
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-text-muted">
          <span>{charCount} chars</span>
          <span>•</span>
          <span>{wordCount} words</span>
        </div>

        {/* Encoding */}
        <div className="hidden sm:inline text-[10px] text-text-muted uppercase">
          UTF-8
        </div>
      </div>
    </footer>
  );
}
