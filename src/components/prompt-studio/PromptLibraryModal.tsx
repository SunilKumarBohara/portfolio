"use client";

import React, { useState } from "react";
import {
  X,
  FolderHeart,
  Search,
  Tag,
  ArrowRight,
  Code,
  Palette,
  SearchCheck,
  Megaphone,
  Bot,
  Copy,
  Check,
} from "lucide-react";
import { BUILTIN_PROMPTS_LIBRARY, LibraryTemplate } from "@/lib/prompt-engine/master-templates";

interface PromptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: LibraryTemplate) => void;
}

const CATEGORIES = ["All", "Development", "Design", "SEO", "Marketing", "AI"] as const;

export default function PromptLibraryModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: PromptLibraryModalProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredTemplates = BUILTIN_PROMPTS_LIBRARY.filter((tmpl) => {
    const matchesCategory = activeCategory === "All" || tmpl.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tmpl.title.toLowerCase().includes(q) ||
      tmpl.description.toLowerCase().includes(q) ||
      tmpl.subcategory.toLowerCase().includes(q) ||
      tmpl.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (tmpl: LibraryTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tmpl.prompt);
    setCopiedId(tmpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Development":
        return <Code className="w-3.5 h-3.5 text-brand-blue" />;
      case "Design":
        return <Palette className="w-3.5 h-3.5 text-brand-cyan" />;
      case "SEO":
        return <SearchCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case "Marketing":
        return <Megaphone className="w-3.5 h-3.5 text-amber-400" />;
      case "AI":
        return <Bot className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <FolderHeart className="w-3.5 h-3.5 text-white" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-5xl max-h-[90vh] bg-[#070b24] border border-brand-blue/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e30]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center">
              <FolderHeart className="w-4 h-4 text-brand-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                PROMPT ENGINEERING TEMPLATE LIBRARY
              </h2>
              <p className="text-[11px] text-text-muted">
                Curated master prompts for Development, 3D Design, SEO, Marketing, and AI
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

        {/* Filters and Search Bar */}
        <div className="p-4 border-b border-white/10 bg-[#060a22] flex flex-wrap items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-brand-blue text-white shadow-glow-sm"
                    : "bg-surface-100 text-text-secondary hover:text-white"
                }`}
              >
                {cat !== "All" && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates, tags..."
              className="w-full bg-[#050818] border border-white/15 focus:border-brand-blue rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted focus:outline-none"
            />
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.length === 0 ? (
            <div className="col-span-full py-12 text-center text-text-muted text-xs">
              No matching templates found for &ldquo;{searchQuery}&rdquo;
            </div>
          ) : (
            filteredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => {
                  onSelectTemplate(tmpl);
                  onClose();
                }}
                className="p-4 rounded-xl bg-surface-100/50 hover:bg-brand-blue/15 border border-white/10 hover:border-brand-blue/40 transition-all cursor-pointer flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-brand-blue/20 text-brand-cyan border border-brand-blue/30 flex items-center gap-1">
                      {getCategoryIcon(tmpl.category)}
                      {tmpl.subcategory}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted uppercase">
                      Target: {tmpl.targetAI}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors font-display">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2 mt-1 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {tmpl.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopy(tmpl, e)}
                      className="p-1 rounded text-text-muted hover:text-white"
                      title="Copy to clipboard"
                    >
                      {copiedId === tmpl.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="text-xs font-semibold text-brand-cyan flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Load</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
