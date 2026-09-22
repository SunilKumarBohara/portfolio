"use client";

import React, { useState } from "react";
import {
  X,
  Key,
  Download,
  Upload,
  RotateCcw,
  Check,
  ShieldCheck,
  Code,
  FileJson,
} from "lucide-react";
import { MasterPromptKey } from "@/lib/prompt-engine/types";
import { exportAsFile } from "@/lib/prompt-engine/storage";
import { DEFAULT_MASTER_PROMPT_KEY } from "@/lib/prompt-engine/prompt-dna-defaults";

interface MasterKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  masterKey: MasterPromptKey;
  onSaveMasterKey: (key: MasterPromptKey) => void;
}

export default function MasterKeyModal({
  isOpen,
  onClose,
  masterKey,
  onSaveMasterKey,
}: MasterKeyModalProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(masterKey, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    exportAsFile(
      JSON.stringify(masterKey, null, 2),
      "master_prompt_key_profile.json",
      "application/json"
    );
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (!parsed.dna || !parsed.preferredSections) {
          throw new Error("Invalid Master Prompt Key profile structure");
        }
        setJsonText(JSON.stringify(parsed, null, 2));
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to parse JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonText);
      onSaveMasterKey(parsed);
      setError(null);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 600);
    } catch (err: any) {
      setError("Syntax Error in JSON: " + err.message);
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(DEFAULT_MASTER_PROMPT_KEY, null, 2));
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#070b24] border border-brand-cyan/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e30]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
              <Key className="w-4 h-4 text-brand-cyan" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display tracking-wide">
                MASTER PROMPT KEY (SYSTEM PROFILE)
              </h2>
              <p className="text-[11px] text-text-muted">
                Your portable JSON prompt-engineering blueprint • No API keys required
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
          {/* Informational banner */}
          <div className="p-3.5 rounded-xl bg-surface-100/60 border border-white/10 flex items-start gap-2.5 text-xs text-text-secondary">
            <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              The <strong>Master Prompt Key</strong> stores your personalized prompt structure, tone, preferred terminology, and validation heuristics. You can export it as JSON to carry your prompt-engineering profile across machines or teams.
            </p>
          </div>

          {/* Import / Export Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 text-white text-xs font-medium transition-all"
              >
                <Download className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Export Profile JSON</span>
              </button>

              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 border border-white/10 text-white text-xs font-medium cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5 text-purple-400" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>

            <button
              onClick={handleReset}
              className="text-text-muted hover:text-white text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Profile</span>
            </button>
          </div>

          {/* JSON Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase text-text-muted flex items-center justify-between">
              <span>Configuration JSON:</span>
              <span className="text-[10px] text-brand-cyan">Strict RFC 8259 JSON</span>
            </label>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={14}
              className="w-full bg-[#040616] border border-white/10 rounded-xl p-3.5 text-xs font-mono text-brand-cyan focus:text-white focus:outline-none focus:border-brand-cyan leading-relaxed resize-y selection:bg-brand-cyan/20"
              spellCheck={false}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300 font-mono">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#080d28] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-100 text-text-secondary hover:text-white text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue hover:from-cyan-400 hover:to-blue-600 text-white font-bold text-xs shadow-glow-sm transition-all"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Key className="w-3.5 h-3.5" />}
            <span>{isSaved ? "Saved Profile!" : "Save Configuration"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
