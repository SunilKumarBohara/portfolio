"use client";

import React, { useState } from "react";
import {
  X,
  Database,
  Plus,
  Trash2,
  Edit2,
  Check,
  Layers,
  Sparkles,
} from "lucide-react";
import { ProjectMemory } from "@/lib/prompt-engine/types";

interface ProjectMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: ProjectMemory[];
  onSaveMemory: (memory: ProjectMemory) => void;
  onDeleteMemory: (id: string) => void;
  selectedMemoryId: string | null;
  onSelectMemoryId: (id: string | null) => void;
}

export default function ProjectMemoryModal({
  isOpen,
  onClose,
  memories,
  onSaveMemory,
  onDeleteMemory,
  selectedMemoryId,
  onSelectMemoryId,
}: ProjectMemoryModalProps) {
  const [editingMemory, setEditingMemory] = useState<ProjectMemory | null>(null);

  if (!isOpen) return null;

  const handleStartNew = () => {
    setEditingMemory({
      id: `memory-${Date.now()}`,
      name: "New Project Context",
      description: "Project architecture and stack specifications",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      style: {
        colorTheme: "Dark theme with glowing accents",
        mode: "dark",
        typography: "Inter & JetBrains Mono",
        visualElements: ["Glass cards", "Fluid animations"],
      },
      role: "Full-Stack Software Architect",
      existingArchitecture: "Modular App Router components",
      constraints: ["Preserve working routes", "Zero build errors"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemory) return;
    onSaveMemory(editingMemory);
    setEditingMemory(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#070b24] border border-purple-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e32]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Database className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                PROJECT MEMORY CONTEXT
              </h2>
              <p className="text-[11px] text-text-muted">
                Save stack, style guide, and architectural rules to automatically enrich future prompts
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-4">
          {editingMemory ? (
            /* Edit / Create Form */
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-purple-400 font-mono uppercase">
                  {editingMemory.name}
                </span>
                <button
                  type="button"
                  onClick={() => setEditingMemory(null)}
                  className="text-xs text-text-muted hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-text-muted">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={editingMemory.name}
                    onChange={(e) =>
                      setEditingMemory({ ...editingMemory, name: e.target.value })
                    }
                    className="w-full bg-[#050818] border border-white/10 rounded-lg p-2 text-xs text-white"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-text-muted">
                    Target Role / Identity
                  </label>
                  <input
                    type="text"
                    value={editingMemory.role || ""}
                    onChange={(e) =>
                      setEditingMemory({ ...editingMemory, role: e.target.value })
                    }
                    className="w-full bg-[#050818] border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-text-muted">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingMemory.stack.join(", ")}
                  onChange={(e) =>
                    setEditingMemory({
                      ...editingMemory,
                      stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full bg-[#050818] border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-text-muted">
                  Color Scheme & Aesthetic
                </label>
                <input
                  type="text"
                  value={editingMemory.style?.colorTheme || ""}
                  onChange={(e) =>
                    setEditingMemory({
                      ...editingMemory,
                      style: { ...editingMemory.style, colorTheme: e.target.value },
                    })
                  }
                  className="w-full bg-[#050818] border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-text-muted">
                  Existing Architecture & Files
                </label>
                <textarea
                  value={editingMemory.existingArchitecture || ""}
                  onChange={(e) =>
                    setEditingMemory({
                      ...editingMemory,
                      existingArchitecture: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full bg-[#050818] border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMemory(null)}
                  className="px-3 py-1.5 rounded-lg bg-surface-100 text-xs text-text-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-glow-sm"
                >
                  Save Context
                </button>
              </div>
            </form>
          ) : (
            /* Memories List */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-text-muted font-bold">
                  Active Project Contexts ({memories.length})
                </span>
                <button
                  onClick={handleStartNew}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Project Memory</span>
                </button>
              </div>

              {memories.map((mem) => {
                const isSelected = selectedMemoryId === mem.id;
                return (
                  <div
                    key={mem.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col gap-2 ${
                      isSelected
                        ? "bg-purple-950/30 border-purple-500/50 shadow-glow-sm"
                        : "bg-surface-100/40 border-white/10 hover:border-purple-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-400" />
                        <h4 className="text-xs font-bold text-white font-display">
                          {mem.name}
                        </h4>
                        {isSelected && (
                          <span className="px-2 py-0.2 rounded-full text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            Active in Generator
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectMemoryId(isSelected ? null : mem.id)}
                          className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                            isSelected
                              ? "bg-purple-600 text-white"
                              : "bg-surface-200 text-text-secondary hover:text-white"
                          }`}
                        >
                          {isSelected ? "Active" : "Select"}
                        </button>
                        <button
                          onClick={() => setEditingMemory(mem)}
                          className="p-1 text-text-muted hover:text-white"
                          title="Edit Memory"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {mem.id !== "memory-sunil-portfolio" && (
                          <button
                            onClick={() => onDeleteMemory(mem.id)}
                            className="p-1 text-text-muted hover:text-brand-red"
                            title="Delete Memory"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-[11px] text-text-muted space-y-0.5">
                      <p>
                        <strong className="text-text-secondary">Role:</strong> {mem.role || "Architect"}
                      </p>
                      <p>
                        <strong className="text-text-secondary">Stack:</strong> {mem.stack.join(", ")}
                      </p>
                      {mem.style?.colorTheme && (
                        <p>
                          <strong className="text-text-secondary">Style:</strong> {mem.style.colorTheme}
                        </p>
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
