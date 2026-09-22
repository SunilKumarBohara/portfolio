"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Sparkles,
  Layers,
  CheckCircle2,
  CornerDownLeft,
  Bot,
  User,
} from "lucide-react";
import { RefinementMessage } from "@/lib/prompt-engine/types";

interface RefinementChatPanelProps {
  messages: RefinementMessage[];
  onSendMessage: (instruction: string) => void;
  isRefining?: boolean;
}

const QUICK_REFINEMENTS = [
  "Add Supabase with RLS policies",
  "Make the animation 3D Three.js universe",
  "Remove the authentication and login system",
  "Add stricter multi-viewport testing benchmarks",
  "Enhance GEO and Answer Engine structured data",
];

export default function RefinementChatPanel({
  messages,
  onSendMessage,
  isRefining,
}: RefinementChatPanelProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isRefining) return;
    onSendMessage(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#050920] border-t lg:border-t-0 lg:border-l border-white/10 p-3 sm:p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-display tracking-wide">
              PROMPT REFINEMENT CHAT
            </h3>
            <p className="text-[10px] text-text-muted">
              Surgically tweak the active prompt without regenerating
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-3 space-y-3">
        {messages.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-white/10 text-center flex flex-col items-center justify-center gap-2 my-auto">
            <Bot className="w-7 h-7 text-text-muted opacity-40" />
            <p className="text-xs text-text-secondary">No active refinement conversation</p>
            <p className="text-[10px] text-text-muted max-w-xs">
              Type an instruction like &ldquo;Add Supabase&rdquo; or &ldquo;Make animations more advanced&rdquo; to modify the active prompt.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 text-xs ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "assistant" && (
                <div className="w-6 h-6 rounded bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-brand-cyan" />
                </div>
              )}
              <div
                className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-brand-blue text-white rounded-tr-none"
                    : "bg-[#080d28] border border-white/10 text-text-secondary rounded-tl-none"
                }`}
              >
                <p>{msg.content}</p>
                {msg.promptVersionGenerated && (
                  <div className="mt-1 pt-1 border-t border-white/10 text-[9px] font-mono text-brand-cyan flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Created Version v{msg.promptVersionGenerated}</span>
                  </div>
                )}
              </div>
              {msg.sender === "user" && (
                <div className="w-6 h-6 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Prompts */}
      <div className="pt-2 border-t border-white/5">
        <span className="text-[9px] font-mono uppercase text-text-muted block mb-1">
          Quick Suggestions:
        </span>
        <div className="flex flex-wrap gap-1 mb-2">
          {QUICK_REFINEMENTS.map((sug, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendMessage(sug)}
              className="text-[10px] px-2 py-0.5 rounded bg-surface-100/60 hover:bg-purple-900/30 border border-white/5 hover:border-purple-400/30 text-text-muted hover:text-white transition-all text-left"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Add Supabase, or Remove auth..."
            disabled={isRefining}
            className="flex-1 bg-[#040718] border border-white/15 focus:border-purple-400 rounded-lg px-3 py-2 text-xs text-white placeholder:text-text-muted focus:outline-none"
          />
          <button
            type="submit"
            disabled={isRefining || !input.trim()}
            className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all shadow-glow-sm"
            title="Apply Refinement"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
