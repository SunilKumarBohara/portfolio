"use client";

import React, { useState } from "react";
import {
  X,
  History,
  GitCompare,
  RotateCcw,
  Check,
  Calendar,
  Clock,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import { PromptVersion } from "@/lib/prompt-engine/types";

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  versions: PromptVersion[];
  activeVersionIndex: number;
  onSelectVersion: (index: number) => void;
  promptTitle: string;
}

export default function VersionHistoryModal({
  isOpen,
  onClose,
  versions,
  activeVersionIndex,
  onSelectVersion,
  promptTitle,
}: VersionHistoryModalProps) {
  const [selectedV1Index, setSelectedV1Index] = useState<number>(
    Math.max(0, versions.length - 2)
  );
  const [selectedV2Index, setSelectedV2Index] = useState<number>(
    Math.max(0, versions.length - 1)
  );
  const [isComparing, setIsComparing] = useState(false);

  if (!isOpen) return null;

  const v1 = versions[selectedV1Index] || versions[0];
  const v2 = versions[selectedV2Index] || versions[versions.length - 1];

  // Basic line diff computation
  const computeLineDiff = (text1: string, text2: string) => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const maxLen = Math.max(lines1.length, lines2.length);
    const diffRows = [];

    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] ?? "";
      const l2 = lines2[i] ?? "";
      const isDifferent = l1 !== l2;
      diffRows.push({
        lineNum: i + 1,
        left: l1,
        right: l2,
        isDifferent,
        isAdded: lines1[i] === undefined && lines2[i] !== undefined,
        isRemoved: lines1[i] !== undefined && lines2[i] === undefined,
      });
    }
    return diffRows;
  };

  const diffRows = computeLineDiff(v1?.content || "", v2?.content || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[90vh] bg-[#070b24] border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e30]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <History className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                VERSION TIMELINE & DIFF COMPARISON
              </h2>
              <p className="text-[11px] text-text-muted">
                {promptTitle} • {versions.length} versions recorded
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComparing(!isComparing)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isComparing
                  ? "bg-purple-600 text-white border-purple-400"
                  : "bg-surface-100 text-text-secondary hover:text-white border-white/10"
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>{isComparing ? "Close Diff" : "Compare Versions"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6">
          {isComparing ? (
            /* Side-by-side Diff View */
            <div className="flex flex-col gap-4">
              {/* Selectors */}
              <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-surface-100/60 border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-muted uppercase">Base:</span>
                  <select
                    value={selectedV1Index}
                    onChange={(e) => setSelectedV1Index(Number(e.target.value))}
                    className="bg-[#05081a] border border-white/10 rounded px-2 py-1 text-xs text-white"
                  >
                    {versions.map((v, i) => (
                      <option key={i} value={i}>
                        v{v.version} ({new Date(v.createdAt).toLocaleTimeString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <span className="text-xs font-mono text-text-muted uppercase">Target:</span>
                  <select
                    value={selectedV2Index}
                    onChange={(e) => setSelectedV2Index(Number(e.target.value))}
                    className="bg-[#05081a] border border-white/10 rounded px-2 py-1 text-xs text-white"
                  >
                    {versions.map((v, i) => (
                      <option key={i} value={i}>
                        v{v.version} ({new Date(v.createdAt).toLocaleTimeString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Side-by-side diff table */}
              <div className="border border-white/10 rounded-xl overflow-hidden font-mono text-[11px] max-h-[440px] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 bg-[#050816] border-b border-white/10 p-2 text-text-muted text-[10px] uppercase font-bold">
                  <div>Version {v1?.version} (Baseline)</div>
                  <div>Version {v2?.version} (Modified)</div>
                </div>
                {diffRows.map((row) => (
                  <div
                    key={row.lineNum}
                    className={`grid grid-cols-2 border-b border-white/5 py-0.5 px-2 ${
                      row.isDifferent
                        ? "bg-amber-500/10 text-amber-200"
                        : "text-text-muted hover:bg-white/5"
                    }`}
                  >
                    <div className="pr-2 truncate border-r border-white/5 flex items-start gap-1.5">
                      <span className="text-white/20 select-none text-[9px] w-5 text-right shrink-0">
                        {row.lineNum}
                      </span>
                      <span className={row.isRemoved ? "line-through text-red-400" : ""}>
                        {row.left}
                      </span>
                    </div>
                    <div className="pl-2 truncate flex items-start gap-1.5">
                      <span className="text-white/20 select-none text-[9px] w-5 text-right shrink-0">
                        {row.lineNum}
                      </span>
                      <span className={row.isAdded ? "text-emerald-400 font-semibold" : ""}>
                        {row.right}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Timeline List View */
            <div className="space-y-3">
              {versions.map((v, idx) => {
                const isActive = idx === activeVersionIndex;
                return (
                  <div
                    key={v.version}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isActive
                        ? "bg-purple-950/30 border-purple-500/50 shadow-glow-sm"
                        : "bg-surface-100/40 border-white/10 hover:border-brand-blue/30"
                    }`}
                  >
                    {/* Left details */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          isActive
                            ? "bg-purple-600 text-white shadow-glow-sm"
                            : "bg-surface-200 text-text-muted"
                        }`}
                      >
                        v{v.version}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-mono">
                            Version {v.version}
                          </span>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono">
                              Active in Editor
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">
                          {v.changeNote || "Standard prompt version update"}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-text-muted mt-1.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(v.createdAt).toLocaleDateString()}{" "}
                            {new Date(v.createdAt).toLocaleTimeString()}
                          </span>
                          <span>•</span>
                          <span>{v.wordCount} words</span>
                          <span>•</span>
                          <span>{v.characterCount} chars</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Action */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {!isActive && (
                        <button
                          onClick={() => {
                            onSelectVersion(idx);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-surface-200 hover:bg-brand-blue text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Load Version</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
