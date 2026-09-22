"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  Wand2,
  ShieldCheck,
  Save,
  Maximize2,
  Minimize2,
  Eye,
  Code2,
  ListTree,
  FileDown,
  Sparkles,
  Share2,
  CopyPlus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface PromptEditorPanelProps {
  markdown: string;
  onMarkdownChange: (newContent: string) => void;
  onCopy: () => void;
  onImprove: () => void;
  onAudit: () => void;
  onSavePrompt: () => void;
  onDuplicate?: () => void;
  onExport: () => void;
  isCopied?: boolean;
}

export default function PromptEditorPanel({
  markdown,
  onMarkdownChange,
  onCopy,
  onImprove,
  onAudit,
  onSavePrompt,
  onDuplicate,
  onExport,
  isCopied,
}: PromptEditorPanelProps) {
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "outline">("preview");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSectionCollapse = (secTitle: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [secTitle]: !prev[secTitle],
    }));
  };

  // Metrics
  const words = markdown.trim() ? markdown.trim().split(/\s+/).filter(Boolean).length : 0;
  const chars = markdown.length;
  const tokens = Math.round(words * 1.35);
  const readingTime = Math.max(1, Math.ceil(words / 200));

  // Extract outline headings
  const headings = markdown
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = (line.match(/^#+/) || ["#"])[0].length;
      const text = line.replace(/^#+\s*/, "");
      return { level, text };
    });

  return (
    <div
      className={`flex flex-col h-full bg-[#040716] border-l border-white/10 transition-all ${
        isFullscreen ? "fixed inset-0 z-50 p-4 bg-[#030614]" : "p-3 sm:p-4"
      }`}
    >
      {/* Editor Top Bar */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 gap-2">
        {/* Left View Mode Tabs */}
        <div className="flex items-center gap-1 bg-surface-100/80 p-0.5 rounded-lg border border-white/10 text-xs">
          <button
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              viewMode === "preview"
                ? "bg-brand-blue text-white shadow-glow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => setViewMode("edit")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              viewMode === "edit"
                ? "bg-brand-blue text-white shadow-glow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Raw Markdown</span>
          </button>

          <button
            onClick={() => setViewMode("outline")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              viewMode === "outline"
                ? "bg-brand-blue text-white shadow-glow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <ListTree className="w-3.5 h-3.5" />
            <span>Outline ({headings.length})</span>
          </button>
        </div>

        {/* Right Stats & Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Metrics */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-text-muted pr-2">
            <span>{words} words</span>
            <span>•</span>
            <span className="text-brand-cyan">~{tokens} tokens</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>

          {/* Action Buttons */}
          <button
            onClick={onCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-glow-sm ${
              isCopied
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white"
            }`}
            title="Copy formatted prompt to clipboard"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? "Copied!" : "Copy Prompt"}</span>
          </button>

          <button
            onClick={onImprove}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 hover:border-amber-400/40 text-amber-300 text-xs font-medium transition-all"
            title="Run prompt improver to diagnose weaknesses"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Improve</span>
          </button>

          <button
            onClick={onAudit}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 hover:border-emerald-400/40 text-emerald-300 text-xs font-medium transition-all"
            title="Audit 8 engineering dimensions"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Audit</span>
          </button>

          {onDuplicate && (
            <button
              onClick={onDuplicate}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 hover:border-brand-blue text-brand-cyan text-xs font-medium transition-all"
              title="Duplicate prompt into new version snapshot"
            >
              <CopyPlus className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="hidden lg:inline">Duplicate</span>
            </button>
          )}

          <button
            onClick={onSavePrompt}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 hover:border-brand-blue text-white text-xs font-medium transition-all"
            title="Save prompt as new version"
          >
            <Save className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="hidden md:inline">Save</span>
          </button>

          <button
            onClick={onExport}
            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 text-text-secondary hover:text-white transition-colors"
            title="Export Prompt"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 text-text-secondary hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Workspace"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Content Area based on ViewMode */}
      <div className="flex-1 mt-3 overflow-y-auto custom-scrollbar">
        {viewMode === "edit" ? (
          /* Raw Markdown Editor */
          <div className="h-full flex flex-col">
            <textarea
              value={markdown}
              onChange={(e) => onMarkdownChange(e.target.value)}
              className="w-full h-full min-h-[480px] bg-[#05081c] border border-white/10 rounded-xl p-4 text-xs font-mono text-emerald-300/90 focus:text-white focus:outline-none focus:border-brand-blue leading-relaxed resize-none selection:bg-brand-blue/30 selection:text-white"
              spellCheck={false}
              placeholder="Your engineered prompt will appear here..."
            />
          </div>
        ) : viewMode === "preview" ? (
          /* Formatted Markdown Live Preview */
          <div className="h-full bg-[#05081a] border border-white/10 rounded-xl p-4 sm:p-6 text-text-primary text-xs sm:text-sm font-sans leading-relaxed space-y-4 shadow-inner">
            {/* Group into sections for collapsible preview */}
            {(() => {
              const lines = markdown.split("\n");
              const parsedSections: { title: string; lines: string[] }[] = [];
              let currentTitle = "OVERVIEW";
              let currentLines: string[] = [];

              lines.forEach((line) => {
                if (line.startsWith("## ")) {
                  if (currentLines.length > 0 || currentTitle !== "OVERVIEW") {
                    parsedSections.push({ title: currentTitle, lines: currentLines });
                  }
                  currentTitle = line.replace(/^##\s+/, "").trim();
                  currentLines = [];
                } else {
                  currentLines.push(line);
                }
              });
              if (currentLines.length > 0 || currentTitle !== "OVERVIEW") {
                parsedSections.push({ title: currentTitle, lines: currentLines });
              }

              return parsedSections.map((sec, secIdx) => {
                const isCollapsed = collapsedSections[sec.title];
                const contentText = sec.lines.join("\n").trim();

                return (
                  <div key={secIdx} className="border-b border-white/5 pb-3">
                    {sec.title === "OVERVIEW" ? (
                      <div>
                        {contentText.split("\n\n").map((c, i) => (
                          <h1
                            key={i}
                            className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-blue font-display tracking-wide pb-2"
                          >
                            {c.replace(/^#\s+/, "")}
                          </h1>
                        ))}
                      </div>
                    ) : (
                      <div
                        onClick={() => toggleSectionCollapse(sec.title)}
                        className="flex items-center justify-between py-1 cursor-pointer select-none group"
                      >
                        <h2 className="text-sm font-extrabold text-brand-cyan font-mono tracking-wider flex items-center gap-2 group-hover:text-white transition-colors">
                          <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-glow-sm" />
                          <span>{sec.title}</span>
                        </h2>
                        <div className="flex items-center gap-1.5 text-text-muted group-hover:text-brand-cyan transition-colors">
                          <span className="text-[10px] font-mono">{sec.lines.length} lines</span>
                          {isCollapsed ? (
                            <ChevronRight className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    )}

                    {!isCollapsed && contentText && (
                      <div className="mt-2 space-y-2 text-xs font-sans text-text-secondary leading-relaxed pl-1">
                        {contentText.split("\n\n").map((chunk, chunkIdx) => {
                          const trimmed = chunk.trim();
                          if (trimmed.startsWith("[ ]") || trimmed.startsWith("- [ ]")) {
                            return (
                              <div
                                key={chunkIdx}
                                className="flex flex-col gap-1.5 p-3 rounded-lg bg-[#070c26] border border-brand-cyan/20 my-2"
                              >
                                {trimmed.split("\n").map((it, idx) => (
                                  <label
                                    key={idx}
                                    className="flex items-start gap-2 text-xs font-mono text-text-secondary cursor-pointer hover:text-white"
                                  >
                                    <input
                                      type="checkbox"
                                      className="mt-0.5 rounded border-white/20 bg-surface-200 text-brand-blue focus:ring-0"
                                    />
                                    <span>{it.replace(/^[-*]?\s*\[\s*\]\s*/, "")}</span>
                                  </label>
                                ))}
                              </div>
                            );
                          }
                          if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                            return (
                              <ul key={chunkIdx} className="list-disc list-inside space-y-1">
                                {trimmed.split("\n").map((li, idx) => (
                                  <li key={idx}>{li.replace(/^[-*]\s+/, "")}</li>
                                ))}
                              </ul>
                            );
                          }
                          if (/^\d+\.\s/.test(trimmed)) {
                            return (
                              <ol key={chunkIdx} className="list-decimal list-inside space-y-1">
                                {trimmed.split("\n").map((li, idx) => (
                                  <li key={idx}>{li.replace(/^\d+\.\s+/, "")}</li>
                                ))}
                              </ol>
                            );
                          }
                          return <p key={chunkIdx}>{trimmed}</p>;
                        })}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        ) : (
          /* Outline View */
          <div className="h-full bg-[#05081a] border border-white/10 rounded-xl p-4 sm:p-6 flex flex-col gap-2">
            <h3 className="text-xs font-mono uppercase text-brand-cyan tracking-wider font-bold mb-2">
              Prompt Structure Hierarchy
            </h3>
            {headings.map((h, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-lg bg-surface-100/50 border border-white/5 text-xs font-mono"
                style={{ paddingLeft: `${(h.level - 1) * 16 + 8}px` }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                <span className={h.level === 1 ? "font-bold text-white" : "text-text-secondary"}>
                  {h.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
