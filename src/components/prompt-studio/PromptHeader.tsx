"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Command,
  Save,
  Wand2,
  ShieldCheck,
  History,
  FolderHeart,
  Dna,
  Key,
  Database,
  Download,
  Copy,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { TargetAI, PromptDNA } from "@/lib/prompt-engine/types";

interface PromptHeaderProps {
  targetAI: TargetAI;
  onTargetAIChange: (ai: TargetAI) => void;
  promptDNA: PromptDNA;
  onOpenCommandPalette: () => void;
  onOpenLibrary: () => void;
  onOpenMyPrompts: () => void;
  onOpenDNASettings: () => void;
  onOpenMasterKey: () => void;
  onOpenProjectMemory: () => void;
  onOpenVersionHistory: () => void;
  onOpenAuditor: () => void;
  onOpenImprover: () => void;
  onCopyPrompt: () => void;
  onExport: () => void;
  onOpenTour?: () => void;
  wordCount: number;
  tokenEstimate: number;
  activePromptTitle: string;
}

const TARGET_AI_OPTIONS: { id: TargetAI; label: string; tag: string }[] = [
  { id: "antigravity", label: "Antigravity", tag: "Codebase Crawl" },
  { id: "cursor", label: "Cursor", tag: "Repo Context" },
  { id: "claude", label: "Claude", tag: "Deep Reason" },
  { id: "gemini", label: "Gemini", tag: "GEO / Multi" },
  { id: "chatgpt", label: "ChatGPT", tag: "Structured" },
  { id: "lovable", label: "Lovable", tag: "Tailwind/Supa" },
  { id: "bolt", label: "Bolt.new", tag: "WebContainer" },
  { id: "windsurf", label: "Windsurf", tag: "Cascade Agent" },
  { id: "v0", label: "v0.dev", tag: "shadcn/UI" },
  { id: "replit", label: "Replit", tag: "Full-Stack" },
  { id: "image-ai", label: "Image AI", tag: "FLUX / Midj" },
  { id: "generic", label: "Generic AI", tag: "Standard" },
];

export default function PromptHeader({
  targetAI,
  onTargetAIChange,
  promptDNA,
  onOpenCommandPalette,
  onOpenLibrary,
  onOpenMyPrompts,
  onOpenDNASettings,
  onOpenMasterKey,
  onOpenProjectMemory,
  onOpenVersionHistory,
  onOpenAuditor,
  onOpenImprover,
  onCopyPrompt,
  onExport,
  wordCount,
  tokenEstimate,
  activePromptTitle,
}: PromptHeaderProps) {
  return (
    <header className="w-full bg-[#050816]/95 backdrop-blur-xl border-b border-brand-blue/20 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 select-none sticky top-0 z-30">
      {/* Brand & Active Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none"
          title="Back to Sunil Kumar Bohara Portfolio"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-red p-[1px] shadow-glow-sm">
            <div className="w-full h-full rounded-lg bg-[#070b24] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-white font-display">
                PROMPT <span className="text-brand-cyan">OS</span>
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-brand-blue/20 text-brand-cyan rounded border border-brand-blue/30">
                IDE
              </span>
            </div>
            <span className="text-[10px] text-text-muted font-mono hidden md:inline truncate max-w-[160px]">
              {activePromptTitle || "AI Prompt Engineering Studio"}
            </span>
          </div>
        </Link>

        {/* Separator */}
        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

        {/* Target AI Selector Dropdown */}
        <div className="relative group">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-200/80 border border-brand-blue/30 hover:border-brand-blue transition-colors cursor-pointer text-xs">
            <span className="text-text-muted text-[10px] font-mono uppercase">AI:</span>
            <span className="font-semibold text-brand-cyan capitalize">
              {TARGET_AI_OPTIONS.find((o) => o.id === targetAI)?.label || targetAI}
            </span>
            <ChevronDown className="w-3 h-3 text-text-muted group-hover:text-white transition-colors" />
          </div>
          <select
            value={targetAI}
            onChange={(e) => onTargetAIChange(e.target.value as TargetAI)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            title="Switch Target AI Architecture"
          >
            {TARGET_AI_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-[#070b24] text-white">
                {opt.label} ({opt.tag})
              </option>
            ))}
          </select>
        </div>

        {/* Prompt DNA Badge */}
        <button
          onClick={onOpenDNASettings}
          className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-brand-blue/15 border border-brand-blue/30 hover:border-brand-blue text-xs text-brand-cyan transition-colors"
          title="Configure Prompt DNA Style"
        >
          <Dna className="w-3.5 h-3.5 text-brand-blue" />
          <span className="text-[11px] font-medium">DNA: {promptDNA.structure}</span>
        </button>
      </div>

      {/* Center Command Palette Shortcut */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-100/80 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/40 text-text-secondary text-xs transition-all shadow-inner"
        title="Open Command Palette (Ctrl+K or Cmd+K)"
      >
        <Command className="w-3 h-3 text-brand-cyan" />
        <span className="text-[11px]">Command Palette</span>
        <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white/5 rounded border border-white/10 text-text-muted">
          Ctrl K
        </kbd>
      </button>

      {/* Right Tools & Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Token and Word Counters */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-text-muted">
          <span>{wordCount} words</span>
          <span>•</span>
          <span className="text-brand-cyan font-semibold">~{tokenEstimate} tokens</span>
        </div>

        {/* Navigation & Management Buttons */}
        <button
          onClick={onOpenLibrary}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/30 text-text-secondary hover:text-white text-xs transition-colors flex items-center gap-1.5"
          title="Prompt Templates Library"
        >
          <FolderHeart className="w-3.5 h-3.5 text-brand-blue" />
          <span className="hidden sm:inline text-[11px]">Library</span>
        </button>

        <button
          onClick={onOpenMyPrompts}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/30 text-text-secondary hover:text-white text-xs transition-colors flex items-center gap-1.5"
          title="My Saved Prompts"
        >
          <Save className="w-3.5 h-3.5 text-brand-cyan" />
          <span className="hidden sm:inline text-[11px]">My Prompts</span>
        </button>

        <button
          onClick={onOpenAuditor}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/30 text-text-secondary hover:text-white text-xs transition-colors flex items-center gap-1.5"
          title="Prompt Quality Audit"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline text-[11px]">Audit</span>
        </button>

        <button
          onClick={onOpenImprover}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/30 text-text-secondary hover:text-white text-xs transition-colors flex items-center gap-1.5"
          title="Improve Prompt"
        >
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline text-[11px]">Improve</span>
        </button>

        <button
          onClick={onOpenVersionHistory}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/30 text-text-secondary hover:text-white text-xs transition-colors flex items-center gap-1.5"
          title="Version History & Diff"
        >
          <History className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden md:inline text-[11px]">History</span>
        </button>

        {/* Master Key / Profile */}
        <button
          onClick={onOpenMasterKey}
          className="p-1.5 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/30 text-text-secondary hover:text-brand-cyan transition-colors"
          title="Master Prompt Key Profile"
        >
          <Key className="w-3.5 h-3.5" />
        </button>

        {/* Project Memory */}
        <button
          onClick={onOpenProjectMemory}
          className="p-1.5 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 hover:border-brand-blue/30 text-text-secondary hover:text-brand-cyan transition-colors"
          title="Project Context Memory"
        >
          <Database className="w-3.5 h-3.5" />
        </button>

        {/* Copy Prompt */}
        <button
          onClick={onCopyPrompt}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-500 text-white font-medium text-xs shadow-glow-sm hover:shadow-glow-md transition-all"
          title="Copy Generated Prompt to Clipboard"
        >
          <Copy className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">Copy</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="p-1.5 rounded-lg bg-surface-100/70 hover:bg-surface-200 border border-white/10 text-text-secondary hover:text-white transition-colors"
          title="Export as Markdown, TXT, JSON, or Print"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        {/* Link back to Portfolio */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1 p-1.5 rounded-lg text-text-muted hover:text-brand-cyan text-xs transition-colors"
          title="Return to Main Portfolio"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </header>
  );
}
