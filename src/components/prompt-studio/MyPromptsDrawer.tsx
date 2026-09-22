"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  Trash2,
  Copy,
  Edit2,
  FolderOpen,
  Search,
  Tag,
  Download,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { SavedPrompt } from "@/lib/prompt-engine/types";
import { exportAsFile } from "@/lib/prompt-engine/storage";

interface MyPromptsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: SavedPrompt[];
  onSelectPrompt: (prompt: SavedPrompt) => void;
  onDeletePrompt: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDuplicatePrompt: (prompt: SavedPrompt) => void;
  onRenamePrompt?: (id: string, newTitle: string) => void;
}

export default function MyPromptsDrawer({
  isOpen,
  onClose,
  prompts,
  onSelectPrompt,
  onDeletePrompt,
  onToggleFavorite,
  onDuplicatePrompt,
  onRenamePrompt,
}: MyPromptsDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  if (!isOpen) return null;

  const filtered = prompts.filter((p) => {
    if (filterFavorites && !p.isFavorite) return false;
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleExportPrompt = (p: SavedPrompt, e: React.MouseEvent) => {
    e.stopPropagation();
    const activeVersion = p.versions[p.activeVersionIndex] || p.versions[p.versions.length - 1];
    const filename = `${p.title.toLowerCase().replace(/\s+/g, "_")}.md`;
    exportAsFile(activeVersion?.content || "", filename, "text/markdown");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-[#060a20] border-l border-brand-blue/30 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 bg-[#080e2e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
              <FolderOpen className="w-4 h-4 text-brand-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                MY SAVED PROMPTS
              </h2>
              <p className="text-[11px] text-text-muted">
                {prompts.length} engineered prompts in your personal OS vault
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

        {/* Search & Filters */}
        <div className="p-3 border-b border-white/10 bg-[#05081a] flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tag, or keyword..."
              className="w-full bg-[#040614] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-brand-blue"
            />
          </div>
          <button
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`p-2 rounded-lg border transition-colors ${
              filterFavorites
                ? "bg-amber-500/20 border-amber-500 text-amber-400"
                : "bg-[#040614] border-white/10 text-text-muted hover:text-white"
            }`}
            title="Filter Favorites"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* Prompts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-text-muted text-xs">
              No saved prompts matching your query.
            </div>
          ) : (
            filtered.map((p) => {
              const activeVer = p.versions[p.activeVersionIndex] || p.versions[0];
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectPrompt(p);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-surface-100/40 hover:bg-brand-blue/15 border border-white/10 hover:border-brand-blue/40 transition-all cursor-pointer flex flex-col gap-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(p.id);
                        }}
                        className={`p-1 rounded transition-colors ${
                          p.isFavorite ? "text-amber-400" : "text-text-muted hover:text-white"
                        }`}
                        title={p.isFavorite ? "Unfavorite" : "Favorite"}
                      >
                        <Star className={`w-3.5 h-3.5 ${p.isFavorite ? "fill-amber-400" : ""}`} />
                      </button>
                      {editingId === p.id ? (
                        <div
                          className="flex items-center gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="bg-[#05081a] border border-brand-cyan/60 rounded px-2 py-0.5 text-xs text-white focus:outline-none"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (editingTitle.trim() && onRenamePrompt) {
                                onRenamePrompt(p.id, editingTitle.trim());
                              }
                              setEditingId(null);
                            }}
                            className="px-2 py-0.5 rounded bg-brand-cyan text-black font-bold text-[10px]"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="text-text-muted hover:text-white text-[10px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <h3 className="text-xs font-bold text-white group-hover:text-brand-cyan transition-colors font-display">
                          {p.title}
                        </h3>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-brand-blue/20 text-brand-cyan">
                        v{activeVer?.version || 1}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-surface-200 text-text-muted uppercase">
                        {p.targetAI}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-text-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Quick item actions */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(p.id);
                          setEditingTitle(p.title);
                        }}
                        className="p-1 rounded text-text-muted hover:text-brand-cyan transition-colors"
                        title="Rename Prompt"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicatePrompt(p);
                        }}
                        className="p-1 rounded text-text-muted hover:text-brand-cyan transition-colors"
                        title="Duplicate Prompt"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleExportPrompt(p, e)}
                        className="p-1 rounded text-text-muted hover:text-white transition-colors"
                        title="Export as Markdown"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete prompt "${p.title}"?`)) {
                            onDeletePrompt(p.id);
                          }
                        }}
                        className="p-1 rounded text-text-muted hover:text-brand-red transition-colors"
                        title="Delete Prompt"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
