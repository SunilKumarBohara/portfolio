"use client";

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sliders,
  Sparkles,
  CheckSquare,
  FileCode,
  Shield,
  Layers,
  Wand2,
  GripVertical,
} from "lucide-react";
import { VisualSection } from "@/lib/prompt-engine/types";
import { AVAILABLE_SECTION_DEFS } from "@/lib/prompt-engine/master-templates";

interface PromptBuilderPanelProps {
  sections: VisualSection[];
  onSectionsChange: (sections: VisualSection[]) => void;
}

export default function PromptBuilderPanel({
  sections,
  onSectionsChange,
}: PromptBuilderPanelProps) {
  const [showAddPicker, setShowAddPicker] = useState(false);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newSections = [...sections];
    const [movedItem] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, movedItem);

    onSectionsChange(newSections);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Move section up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    const temp = newSections[index - 1];
    newSections[index - 1] = newSections[index];
    newSections[index] = temp;
    onSectionsChange(newSections);
  };

  // Move section down
  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    const temp = newSections[index + 1];
    newSections[index + 1] = newSections[index];
    newSections[index] = temp;
    onSectionsChange(newSections);
  };

  // Toggle enabled
  const handleToggle = (id: string) => {
    const newSections = sections.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    onSectionsChange(newSections);
  };

  // Delete section
  const handleDelete = (id: string) => {
    const newSections = sections.filter((s) => s.id !== id);
    onSectionsChange(newSections);
  };

  // Content change
  const handleContentChange = (id: string, newContent: string) => {
    const newSections = sections.map((s) =>
      s.id === id ? { ...s, content: newContent } : s
    );
    onSectionsChange(newSections);
  };

  // Add a section from the available list
  const handleAddSection = (def: (typeof AVAILABLE_SECTION_DEFS)[0]) => {
    const newSection: VisualSection = {
      id: `sec-${def.type}-${Date.now()}`,
      title: def.title,
      type: def.type,
      enabled: true,
      content: def.defaultTemplate,
    };
    onSectionsChange([...sections, newSection]);
    setShowAddPicker(false);
    setExpandedSectionId(newSection.id);
  };

  return (
    <div className="flex flex-col h-full bg-[#070b22] border-r border-white/10 p-3 sm:p-4 overflow-y-auto custom-scrollbar gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
            <Sliders className="w-3.5 h-3.5 text-brand-cyan" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-wide font-display">
              VISUAL SECTION BUILDER
            </h2>
            <p className="text-[10px] text-text-muted">
              {sections.filter((s) => s.enabled).length} of {sections.length} sections active
            </p>
          </div>
        </div>

        {/* Add Section Trigger */}
        <button
          onClick={() => setShowAddPicker(!showAddPicker)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-blue/20 hover:bg-brand-blue/30 border border-brand-blue/40 text-brand-cyan hover:text-white text-xs font-medium transition-all shadow-glow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Add Section Picker Popover / Drawer */}
      {showAddPicker && (
        <div className="p-3 rounded-xl bg-[#0a1033] border border-brand-blue/40 shadow-glass-card flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <span className="text-xs font-bold text-brand-cyan font-mono uppercase">
              Choose Section to Add
            </span>
            <button
              onClick={() => setShowAddPicker(false)}
              className="text-text-muted hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
            {AVAILABLE_SECTION_DEFS.map((def) => {
              const alreadyAdded = sections.some((s) => s.title === def.title);
              return (
                <button
                  key={def.type}
                  onClick={() => handleAddSection(def)}
                  className="flex flex-col text-left p-2 rounded-lg bg-surface-100/60 hover:bg-brand-blue/20 border border-white/5 hover:border-brand-blue/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white group-hover:text-brand-cyan font-mono">
                      {def.title}
                    </span>
                    {alreadyAdded && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-brand-blue/30 text-brand-cyan">
                        In Spec
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-text-muted line-clamp-1 mt-0.5">
                    {def.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sections List */}
      <div className="flex flex-col gap-2 mt-1">
        {sections.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-white/15 text-center flex flex-col items-center justify-center gap-2">
            <Layers className="w-8 h-8 text-text-muted opacity-50" />
            <p className="text-xs text-text-secondary">No sections in active specification</p>
            <p className="text-[11px] text-text-muted">
              Generate a prompt from the input panel or click &ldquo;Add Section&rdquo; to build visually.
            </p>
          </div>
        ) : (
          sections.map((section, idx) => {
            const isExpanded = expandedSectionId === section.id;
            const isBeingDragged = draggedIndex === idx;
            return (
              <div
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                className={`rounded-xl border transition-all ${
                  isBeingDragged ? "opacity-30 scale-[0.98] border-brand-cyan border-dashed" : ""
                } ${
                  section.enabled
                    ? isExpanded
                      ? "bg-[#090e2b] border-brand-cyan/50 shadow-glow-sm"
                      : "bg-[#070c26] border-white/10 hover:border-brand-blue/30"
                    : "bg-surface-100/30 border-white/5 opacity-50"
                }`}
              >
                {/* Section Item Header */}
                <div className="p-2.5 flex items-center justify-between gap-2 select-none">
                  {/* Left Title & Status */}
                  <div
                    onClick={() => setExpandedSectionId(isExpanded ? null : section.id)}
                    className="flex items-center gap-2 flex-1 cursor-pointer truncate"
                  >
                    <span
                      className="cursor-grab active:cursor-grabbing text-text-muted hover:text-brand-cyan transition-colors"
                      title="Drag to reorder section"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GripVertical className="w-3.5 h-3.5" />
                    </span>
                    <span className="w-4 h-4 rounded text-[10px] font-mono bg-white/5 flex items-center justify-center text-text-muted shrink-0">
                      {idx + 1}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold truncate ${
                        section.enabled ? "text-white" : "text-text-muted line-through"
                      }`}
                    >
                      {section.title}
                    </span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Move Up */}
                    <button
                      onClick={() => handleMoveUp(idx)}
                      disabled={idx === 0}
                      className="p-1 text-text-muted hover:text-white disabled:opacity-20 transition-colors"
                      title="Move Section Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>

                    {/* Move Down */}
                    <button
                      onClick={() => handleMoveDown(idx)}
                      disabled={idx === sections.length - 1}
                      className="p-1 text-text-muted hover:text-white disabled:opacity-20 transition-colors"
                      title="Move Section Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Toggle Enable/Disable */}
                    <button
                      onClick={() => handleToggle(section.id)}
                      className="p-1 text-text-muted hover:text-brand-cyan transition-colors"
                      title={section.enabled ? "Disable Section" : "Enable Section"}
                    >
                      {section.enabled ? (
                        <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-text-muted" />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(section.id)}
                      className="p-1 text-text-muted hover:text-brand-red transition-colors"
                      title="Remove Section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Content Editor if Expanded */}
                {isExpanded && (
                  <div className="px-3 pb-3 pt-1 border-t border-white/5 flex flex-col gap-2">
                    <textarea
                      value={section.content}
                      onChange={(e) => handleContentChange(section.id, e.target.value)}
                      rows={4}
                      className="w-full bg-[#050818] border border-white/10 rounded-lg p-2.5 text-xs text-text-secondary focus:text-white focus:outline-none focus:border-brand-cyan font-mono leading-relaxed resize-y"
                      placeholder="Enter section engineering directives..."
                    />
                    <div className="flex items-center justify-between text-[10px] text-text-muted font-mono">
                      <span>{section.content.length} characters</span>
                      <button
                        onClick={() => setExpandedSectionId(null)}
                        className="text-brand-cyan hover:underline"
                      >
                        Done Editing
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
