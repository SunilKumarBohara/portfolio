"use client";

import React, { useState } from "react";
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  FileCode,
  FileJson,
  Printer,
  Sparkles,
} from "lucide-react";
import { exportAsFile, copyToClipboard } from "@/lib/prompt-engine/storage";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdown: string;
  title: string;
}

export default function ExportModal({
  isOpen,
  onClose,
  markdown,
  title,
}: ExportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const baseFileName = (title || "engineered_ai_prompt")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_")
    .replace(/_+/g, "_");

  const handleCopy = async () => {
    await copyToClipboard(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    exportAsFile(markdown, `${baseFileName}.md`, "text/markdown");
    onClose();
  };

  const handleExportTXT = () => {
    exportAsFile(markdown, `${baseFileName}.txt`, "text/plain");
    onClose();
  };

  const handleExportJSON = () => {
    const jsonPayload = {
      title,
      exportedAt: new Date().toISOString(),
      promptContent: markdown,
      metadata: {
        wordCount: markdown.split(/\s+/).filter(Boolean).length,
        characterCount: markdown.length,
      },
    };
    exportAsFile(JSON.stringify(jsonPayload, null, 2), `${baseFileName}.json`, "application/json");
    onClose();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
              pre { background: #f4f4f4; padding: 15px; border-radius: 8px; white-space: pre-wrap; }
              h1, h2, h3 { color: #000; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
            </style>
          </head>
          <body>
            <pre>${markdown.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#070b24] border border-brand-blue/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#090e30]">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-sm font-bold text-white font-display">EXPORT PROMPT SPECIFICATION</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-text-muted hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Export Formats */}
        <div className="p-4 space-y-2.5">
          <button
            onClick={handleExportMarkdown}
            className="w-full p-3 rounded-xl bg-surface-100/60 hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <FileCode className="w-5 h-5 text-brand-blue" />
              <div className="text-left">
                <span className="text-xs font-bold text-white block group-hover:text-brand-cyan">
                  Markdown (.md)
                </span>
                <span className="text-[10px] text-text-muted">Standard GitHub-flavored spec</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-text-muted group-hover:text-white" />
          </button>

          <button
            onClick={handleExportTXT}
            className="w-full p-3 rounded-xl bg-surface-100/60 hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <span className="text-xs font-bold text-white block group-hover:text-amber-300">
                  Plain Text (.txt)
                </span>
                <span className="text-[10px] text-text-muted">Unformatted portable text</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-text-muted group-hover:text-white" />
          </button>

          <button
            onClick={handleExportJSON}
            className="w-full p-3 rounded-xl bg-surface-100/60 hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <FileJson className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <span className="text-xs font-bold text-white block group-hover:text-purple-300">
                  JSON (.json)
                </span>
                <span className="text-[10px] text-text-muted">Structured payload with metadata</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-text-muted group-hover:text-white" />
          </button>

          <button
            onClick={handlePrint}
            className="w-full p-3 rounded-xl bg-surface-100/60 hover:bg-brand-blue/20 border border-white/10 hover:border-brand-blue/40 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <span className="text-xs font-bold text-white block group-hover:text-emerald-300">
                  Print to PDF
                </span>
                <span className="text-[10px] text-text-muted">Printer and PDF-ready formatting</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-text-muted group-hover:text-white" />
          </button>
        </div>

        {/* Copy to Clipboard Bar */}
        <div className="p-4 border-t border-white/10 bg-[#050818]">
          <button
            onClick={handleCopy}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-gradient-to-r from-brand-blue to-brand-cyan hover:from-blue-600 hover:to-cyan-400 text-white shadow-glow-sm"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied to Clipboard!" : "Copy Full Prompt to Clipboard"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
