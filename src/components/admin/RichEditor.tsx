"use client";

import React, { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Eye,
  Edit3,
} from "lucide-react";
import MediaModal from "./MediaModal";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichEditor({
  value,
  onChange,
  placeholder = "Write your blog post content here...",
}: RichEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert formatting at cursor position
  const insertFormat = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;

    const replacement = `${before}${selectedText}${after}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 50);
  };

  const handleInsertImage = (url: string, alt?: string) => {
    insertFormat(`\n![${alt || "Image"}](${url})\n`, "", "");
  };

  const wordCount = (value || "").trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="rounded-2xl border border-white/10 bg-surface-200/80 overflow-hidden shadow-glass-card">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-100/90 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => insertFormat("### ", "\n", "Heading 3")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Heading 2 (H2)"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("#### ", "\n", "Heading 4")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Heading 3 (H3)"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-white/10 mx-1" />
          <button
            type="button"
            onClick={() => insertFormat("**", "**", "bold text")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("*", "*", "italic text")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-white/10 mx-1" />
          <button
            type="button"
            onClick={() => insertFormat("\n* ", "", "List item")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("\n1. ", "", "List item")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("\n> ", "\n", "Quote text")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertFormat("\n```\n", "\n```\n", "code block")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-5 bg-white/10 mx-1" />
          <button
            type="button"
            onClick={() => insertFormat("[", "](https://example.com)", "Link Title")}
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMediaModalOpen(true)}
            className="p-2 rounded-lg bg-brand-green/10 hover:bg-brand-green/20 text-brand-green border border-brand-green/30"
            title="Insert Image from Media Library"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              insertFormat(
                "\n| Column 1 | Column 2 |\n|---|---|\n| Item 1 | Item 2 |\n"
              )
            }
            className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white border border-white/5"
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              !isPreview
                ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              isPreview
                ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="p-4">
        {isPreview ? (
          <div className="min-h-[350px] p-6 rounded-xl bg-surface-100/60 border border-white/5 text-gray-200 font-sans leading-relaxed whitespace-pre-line prose prose-invert max-w-none">
            {value || <span className="text-gray-500 italic">No content to preview yet.</span>}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={16}
            className="w-full p-4 rounded-xl bg-surface-100/50 border border-white/5 text-white placeholder-gray-500 text-sm font-mono leading-relaxed focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all resize-y"
          />
        )}
      </div>

      {/* Editor Status Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-100/60 border-t border-white/5 text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-4">
          <span>Words: <strong className="text-white">{wordCount}</strong></span>
          <span>Est. Reading Time: <strong className="text-brand-cyan">{readingTime} min</strong></span>
        </div>
        <span className="text-brand-green">Markdown Supported</span>
      </div>

      {/* Media Picker Modal */}
      <MediaModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={handleInsertImage}
        title="Insert Image into Post"
      />
    </div>
  );
}
