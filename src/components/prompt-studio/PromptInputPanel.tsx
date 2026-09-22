"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Cpu,
  Zap,
  ShieldCheck,
  FolderGit2,
  Database,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import {
  ProjectType,
  ComplexityLevel,
  TargetAI,
  ProjectMode,
  ProjectMemory,
} from "@/lib/prompt-engine/types";

interface PromptInputPanelProps {
  userIdea: string;
  onUserIdeaChange: (val: string) => void;
  projectType: ProjectType;
  onProjectTypeChange: (val: ProjectType) => void;
  complexity: ComplexityLevel;
  onComplexityChange: (val: ComplexityLevel) => void;
  targetAI: TargetAI;
  onTargetAIChange: (val: TargetAI) => void;
  mode: ProjectMode;
  onModeChange: (val: ProjectMode) => void;
  projectMemories: ProjectMemory[];
  selectedMemoryId: string | null;
  onSelectMemoryId: (id: string | null) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

const PROJECT_TYPES: ProjectType[] = [
  "Website",
  "Web App",
  "SaaS",
  "Mobile App",
  "API",
  "SEO",
  "Marketing",
  "Content",
  "Research",
  "Automation",
  "UI/UX",
  "Coding",
  "Debugging",
  "Image",
  "Video",
  "Business",
];

const COMPLEXITIES: ComplexityLevel[] = [
  "Simple",
  "Intermediate",
  "Advanced",
  "Production",
];

const QUICK_IDEAS = [
  "I want a 3D SEO portfolio.",
  "Make my portfolio mobile friendly.",
  "Antigravity Final Fix & Premium UI Refinement.",
  "Add Supabase backend with authentication and RLS.",
  "Comprehensive Technical SEO and GEO Audit.",
];

export default function PromptInputPanel({
  userIdea,
  onUserIdeaChange,
  projectType,
  onProjectTypeChange,
  complexity,
  onComplexityChange,
  targetAI,
  onTargetAIChange,
  mode,
  onModeChange,
  projectMemories,
  selectedMemoryId,
  onSelectMemoryId,
  onGenerate,
  isGenerating,
}: PromptInputPanelProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050816] border-r border-white/10 p-3 sm:p-4 overflow-y-auto custom-scrollbar gap-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center">
            <Lightbulb className="w-3.5 h-3.5 text-brand-cyan" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-wide font-display">
              PROMPT INPUT & CONTEXT
            </h2>
            <p className="text-[10px] text-text-muted">Transform simple ideas into master specs</p>
          </div>
        </div>

        {/* Existing / New Mode Switch */}
        <div className="flex items-center bg-surface-100 p-0.5 rounded-lg border border-white/10 text-[11px]">
          <button
            type="button"
            onClick={() => onModeChange("new")}
            className={`px-2 py-1 rounded-md transition-all font-medium ${
              mode === "new"
                ? "bg-brand-blue text-white shadow-glow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            New
          </button>
          <button
            type="button"
            onClick={() => onModeChange("existing")}
            className={`px-2 py-1 rounded-md transition-all font-medium ${
              mode === "existing"
                ? "bg-brand-red text-white shadow-glow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Existing
          </button>
        </div>
      </div>

      {/* Existing Project Banner if mode is existing */}
      {mode === "existing" && (
        <div className="p-2.5 rounded-lg bg-brand-red/10 border border-brand-red/30 flex items-start gap-2 text-[11px] text-red-200">
          <ShieldCheck className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-white">Existing Project Guard:</span>
            <span className="block text-[10px] text-red-300 mt-0.5">
              Injects non-destructive rules: inspect first, preserve working functionality, and re-crawl after edits.
            </span>
          </div>
        </div>
      )}

      {/* Idea Textarea */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <label htmlFor="user-idea-input" className="font-semibold text-text-secondary">
            Your Idea or Requirement
          </label>
          <span className="text-[10px] font-mono text-text-muted">Ctrl + Enter to run</span>
        </div>
        <textarea
          id="user-idea-input"
          value={userIdea}
          onChange={(e) => onUserIdeaChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. I want a 3D SEO portfolio with Three.js universe and live Nepal time..."
          rows={5}
          className="w-full rounded-lg bg-[#080d24] border border-white/10 focus:border-brand-cyan/60 focus:ring-1 focus:ring-brand-cyan/40 p-3 text-xs text-white placeholder:text-text-muted resize-none focus:outline-none transition-all leading-relaxed font-sans"
        />
      </div>

      {/* Quick Idea Pills */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] uppercase tracking-wider font-mono text-text-muted">
          Quick Starters:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_IDEAS.map((idea) => (
            <button
              key={idea}
              type="button"
              onClick={() => onUserIdeaChange(idea)}
              className="px-2 py-1 rounded bg-surface-100/70 hover:bg-surface-200 border border-white/5 hover:border-brand-blue/30 text-[10px] text-text-secondary hover:text-white transition-all text-left truncate max-w-full"
            >
              {idea}
            </button>
          ))}
        </div>
      </div>

      {/* Project Configuration Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
        {/* Project Type */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
            <FolderGit2 className="w-3 h-3 text-brand-blue" />
            Project Type
          </label>
          <select
            value={projectType}
            onChange={(e) => onProjectTypeChange(e.target.value as ProjectType)}
            className="w-full bg-[#080d24] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-brand-blue"
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#070b24]">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Complexity Level */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            Complexity
          </label>
          <select
            value={complexity}
            onChange={(e) => onComplexityChange(e.target.value as ComplexityLevel)}
            className="w-full bg-[#080d24] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-brand-blue"
          >
            {COMPLEXITIES.map((c) => (
              <option key={c} value={c} className="bg-[#070b24]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Project Memory Context */}
      <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
        <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
          <span className="flex items-center gap-1 uppercase">
            <Database className="w-3 h-3 text-purple-400" />
            Project Memory Context
          </span>
          {selectedMemoryId && (
            <button
              onClick={() => onSelectMemoryId(null)}
              className="text-brand-cyan hover:underline text-[10px]"
            >
              Clear
            </button>
          )}
        </div>
        <select
          value={selectedMemoryId || ""}
          onChange={(e) => onSelectMemoryId(e.target.value || null)}
          className="w-full bg-[#080d24] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-400"
        >
          <option value="" className="bg-[#070b24]">
            No Project Context (Generic Greenfield)
          </option>
          {projectMemories.map((m) => (
            <option key={m.id} value={m.id} className="bg-[#070b24]">
              {m.name} ({m.stack.slice(0, 3).join(", ")})
            </option>
          ))}
        </select>
      </div>

      {/* Big Action Button */}
      <div className="pt-2 mt-auto">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !userIdea.trim()}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-blue via-blue-600 to-brand-cyan hover:from-blue-600 hover:to-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs shadow-glow-md flex items-center justify-center gap-2 group transition-all"
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
          <span>{isGenerating ? "Engineering Master Prompt..." : "GENERATE MASTER PROMPT"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
