"use client";

import React, { useState, useEffect } from "react";
import {
  Command,
  Search,
  Sparkles,
  Wand2,
  ShieldCheck,
  FolderHeart,
  Save,
  Dna,
  Key,
  Database,
  Download,
  Copy,
  PlusCircle,
  FileCode,
  Layers,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  category: "Actions" | "Tools" | "Configuration" | "Navigation";
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewPrompt: () => void;
  onOpenImprover: () => void;
  onOpenAuditor: () => void;
  onOpenLibrary: () => void;
  onOpenMyPrompts: () => void;
  onOpenDNA: () => void;
  onOpenMasterKey: () => void;
  onOpenProjectMemory: () => void;
  onCopyPrompt: () => void;
  onExport: () => void;
}

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onNewPrompt,
  onOpenImprover,
  onOpenAuditor,
  onOpenLibrary,
  onOpenMyPrompts,
  onOpenDNA,
  onOpenMasterKey,
  onOpenProjectMemory,
  onCopyPrompt,
  onExport,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    {
      id: "cmd-new",
      title: "New Master Prompt Specification",
      category: "Actions",
      shortcut: "Alt+N",
      icon: <PlusCircle className="w-4 h-4 text-brand-cyan" />,
      action: () => {
        onNewPrompt();
        onClose();
      },
    },
    {
      id: "cmd-copy",
      title: "Copy Active Prompt to Clipboard",
      category: "Actions",
      shortcut: "Ctrl+C",
      icon: <Copy className="w-4 h-4 text-brand-blue" />,
      action: () => {
        onCopyPrompt();
        onClose();
      },
    },
    {
      id: "cmd-export",
      title: "Export Prompt (Markdown, TXT, JSON, Print)",
      category: "Actions",
      shortcut: "Ctrl+E",
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onExport();
        onClose();
      },
    },
    {
      id: "cmd-improve",
      title: "Improve Prompt (Diagnose Ambiguity & Weaknesses)",
      category: "Tools",
      shortcut: "Alt+I",
      icon: <Wand2 className="w-4 h-4 text-amber-400" />,
      action: () => {
        onOpenImprover();
        onClose();
      },
    },
    {
      id: "cmd-audit",
      title: "Prompt Audit (Evaluate 8 Quality Dimensions)",
      category: "Tools",
      shortcut: "Alt+A",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onOpenAuditor();
        onClose();
      },
    },
    {
      id: "cmd-library",
      title: "Prompt Templates Library (Dev, Design, SEO, Marketing)",
      category: "Navigation",
      shortcut: "Alt+L",
      icon: <FolderHeart className="w-4 h-4 text-brand-blue" />,
      action: () => {
        onOpenLibrary();
        onClose();
      },
    },
    {
      id: "cmd-my-prompts",
      title: "My Saved Prompts Vault",
      category: "Navigation",
      shortcut: "Alt+M",
      icon: <Save className="w-4 h-4 text-brand-cyan" />,
      action: () => {
        onOpenMyPrompts();
        onClose();
      },
    },
    {
      id: "cmd-dna",
      title: "Configure Prompt DNA Preferences",
      category: "Configuration",
      shortcut: "Alt+D",
      icon: <Dna className="w-4 h-4 text-purple-400" />,
      action: () => {
        onOpenDNA();
        onClose();
      },
    },
    {
      id: "cmd-master-key",
      title: "Master Prompt Key (JSON System Profile)",
      category: "Configuration",
      shortcut: "Alt+K",
      icon: <Key className="w-4 h-4 text-amber-300" />,
      action: () => {
        onOpenMasterKey();
        onClose();
      },
    },
    {
      id: "cmd-memory",
      title: "Project Memory Contexts (Stack, Theme, Style)",
      category: "Configuration",
      shortcut: "Alt+P",
      icon: <Database className="w-4 h-4 text-purple-400" />,
      action: () => {
        onOpenProjectMemory();
        onClose();
      },
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#060a22] border border-brand-blue/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Search Input */}
        <div className="p-3.5 border-b border-white/10 bg-[#080e30] flex items-center gap-3">
          <Search className="w-4 h-4 text-brand-cyan shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search actions..."
            className="w-full bg-transparent text-sm text-white placeholder:text-text-muted focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded border border-white/10 text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-text-muted text-xs">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-brand-blue/25 border border-brand-blue/50 text-white shadow-glow-sm"
                      : "text-text-secondary hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-brand-blue/30" : "bg-surface-100/60"
                      }`}
                    >
                      {cmd.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white">{cmd.title}</span>
                      <span className="text-[10px] font-mono text-text-muted">
                        {cmd.category}
                      </span>
                    </div>
                  </div>

                  {cmd.shortcut && (
                    <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded text-text-muted">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-white/10 bg-[#040718] flex items-center justify-between text-[10px] font-mono text-text-muted px-4">
          <span>Navigate: ↑ ↓</span>
          <span>Execute: Enter</span>
          <span>Close: Esc</span>
        </div>
      </div>
    </div>
  );
}
