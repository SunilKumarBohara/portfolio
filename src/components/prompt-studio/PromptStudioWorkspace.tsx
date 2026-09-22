"use client";

import React, { useState, useEffect, useCallback } from "react";
import PromptHeader from "./PromptHeader";
import PromptStatusBar from "./PromptStatusBar";
import PromptInputPanel from "./PromptInputPanel";
import PromptBuilderPanel from "./PromptBuilderPanel";
import PromptEditorPanel from "./PromptEditorPanel";
import RefinementChatPanel from "./RefinementChatPanel";
import PromptImproverModal from "./PromptImproverModal";
import PromptAuditorModal from "./PromptAuditorModal";
import VersionHistoryModal from "./VersionHistoryModal";
import PromptLibraryModal from "./PromptLibraryModal";
import MyPromptsDrawer from "./MyPromptsDrawer";
import PromptDNASettingsModal from "./PromptDNASettingsModal";
import MasterKeyModal from "./MasterKeyModal";
import ProjectMemoryModal from "./ProjectMemoryModal";
import CommandPaletteModal from "./CommandPaletteModal";
import ExportModal from "./ExportModal";

import {
  TargetAI,
  ProjectType,
  ComplexityLevel,
  ProjectMode,
  PromptDNA,
  MasterPromptKey,
  ProjectMemory,
  SavedPrompt,
  VisualSection,
  PromptVersion,
  RefinementMessage,
} from "@/lib/prompt-engine/types";
import { generateEngineeredPrompt } from "@/lib/prompt-engine/generator";
import { refinePromptSections } from "@/lib/prompt-engine/refiner";
import { PromptStorage, copyToClipboard } from "@/lib/prompt-engine/storage";
import { LibraryTemplate } from "@/lib/prompt-engine/master-templates";
import { Sliders, Sparkles, Code, MessageSquare, PenTool } from "lucide-react";

export default function PromptStudioWorkspace() {
  // --- Persistent Engine States ---
  const [dna, setDna] = useState<PromptDNA>(() => PromptStorage.getPromptDNA());
  const [masterKey, setMasterKey] = useState<MasterPromptKey>(() => PromptStorage.getMasterPromptKey());
  const [projectMemories, setProjectMemories] = useState<ProjectMemory[]>(() => PromptStorage.getProjectMemories());
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => PromptStorage.getSavedPrompts());

  // --- Active Generator Controls ---
  const [userIdea, setUserIdea] = useState("I want a 3D SEO portfolio.");
  const [projectType, setProjectType] = useState<ProjectType>("Website");
  const [complexity, setComplexity] = useState<ComplexityLevel>("Production");
  const [targetAI, setTargetAI] = useState<TargetAI>("antigravity");
  const [mode, setMode] = useState<ProjectMode>("existing");
  const [selectedMemoryId, setSelectedMemoryId] = useState<string | null>("memory-sunil-portfolio");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Active Prompt State ---
  const [activeTitle, setActiveTitle] = useState("3D SEO Portfolio Specification");
  const [markdown, setMarkdown] = useState("");
  const [sections, setSections] = useState<VisualSection[]>([]);
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [activeVersionIndex, setActiveVersionIndex] = useState(0);
  const [refinementMessages, setRefinementMessages] = useState<RefinementMessage[]>([]);
  const [isRefining, setIsRefining] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // --- Mobile & Layout Tabs ---
  // On desktop: 3-column workspace; On mobile/tablet: Switch tabs
  const [mobileTab, setMobileTab] = useState<"input" | "builder" | "preview" | "refine">("input");
  const [middleTab, setMiddleTab] = useState<"builder" | "refine">("builder");

  // --- Modal Open States ---
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isMyPromptsOpen, setIsMyPromptsOpen] = useState(false);
  const [isDNASettingsOpen, setIsDNASettingsOpen] = useState(false);
  const [isMasterKeyOpen, setIsMasterKeyOpen] = useState(false);
  const [isProjectMemoryOpen, setIsProjectMemoryOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isAuditorOpen, setIsAuditorOpen] = useState(false);
  const [isImproverOpen, setIsImproverOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Active Project Memory Object
  const activeMemory = projectMemories.find((m) => m.id === selectedMemoryId) || null;

  // Initial load: generate default prompt once on mount
  useEffect(() => {
    const initialPayload = generateEngineeredPrompt({
      userIdea: "I want a 3D SEO portfolio.",
      projectType: "Website",
      complexity: "Production",
      targetAI: "antigravity",
      mode: "existing",
      dna,
      projectMemory: activeMemory,
    });

    setActiveTitle(initialPayload.title);
    setMarkdown(initialPayload.markdown);
    setSections(initialPayload.sections);

    const initialVersion: PromptVersion = {
      version: 1,
      createdAt: new Date().toISOString(),
      content: initialPayload.markdown,
      changeNote: "Initial Master Prompt Generation",
      wordCount: initialPayload.markdown.split(/\s+/).filter(Boolean).length,
      characterCount: initialPayload.markdown.length,
    };
    setVersions([initialVersion]);
    setActiveVersionIndex(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard shortcut listener (Ctrl+K, Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- Prompt Generation Handler ---
  const handleGenerate = useCallback(() => {
    if (!userIdea.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const payload = generateEngineeredPrompt({
        userIdea,
        projectType,
        complexity,
        targetAI,
        mode,
        dna,
        projectMemory: activeMemory,
      });

      setActiveTitle(payload.title);
      setMarkdown(payload.markdown);
      setSections(payload.sections);

      // Create new version
      const newVersionNum = versions.length + 1;
      const newVer: PromptVersion = {
        version: newVersionNum,
        createdAt: new Date().toISOString(),
        content: payload.markdown,
        changeNote: `Generated for ${targetAI} (${mode === "existing" ? "Existing Project" : "New Project"})`,
        wordCount: payload.markdown.split(/\s+/).filter(Boolean).length,
        characterCount: payload.markdown.length,
      };

      setVersions((prev) => [...prev, newVer]);
      setActiveVersionIndex(versions.length);
      setIsDirty(false);
      setIsGenerating(false);

      // Switch to preview tab on mobile for immediate result
      setMobileTab("preview");
    }, 250);
  }, [userIdea, projectType, complexity, targetAI, mode, dna, activeMemory, versions.length]);

  // --- Sync Sections to Markdown ---
  const handleSectionsChange = (updatedSections: VisualSection[]) => {
    setSections(updatedSections);
    // Rebuild markdown
    const lines: string[] = [`# ${activeTitle}\n`];
    updatedSections.forEach((sec) => {
      if (sec.enabled) {
        lines.push(`## ${sec.title}\n${sec.content}\n`);
      }
    });
    setMarkdown(lines.join("\n").trim());
    setIsDirty(true);
  };

  // --- Sync Raw Markdown Edit to Sections ---
  const handleMarkdownChange = (newMd: string) => {
    setMarkdown(newMd);
    setIsDirty(true);
  };

  // --- Copy Handler ---
  const handleCopyPrompt = async () => {
    await copyToClipboard(markdown);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // --- Save Prompt as New Version / Save to Vault ---
  const handleSavePrompt = () => {
    const newVerNum = versions.length + 1;
    const newVer: PromptVersion = {
      version: newVerNum,
      createdAt: new Date().toISOString(),
      content: markdown,
      changeNote: `Manual snapshot v${newVerNum}`,
      wordCount: markdown.split(/\s+/).filter(Boolean).length,
      characterCount: markdown.length,
    };
    const updatedVersions = [...versions, newVer];
    setVersions(updatedVersions);
    setActiveVersionIndex(updatedVersions.length - 1);
    setIsDirty(false);

    // Save to prompt storage
    const promptRecord: SavedPrompt = {
      id: `saved-${Date.now()}`,
      title: activeTitle,
      description: userIdea.slice(0, 120),
      category: "Development",
      tags: [targetAI, projectType, mode],
      targetAI,
      projectType,
      complexity,
      mode,
      projectMemoryId: selectedMemoryId || undefined,
      sections,
      versions: updatedVersions,
      activeVersionIndex: updatedVersions.length - 1,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    PromptStorage.savePrompt(promptRecord);
    setSavedPrompts(PromptStorage.getSavedPrompts());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  // --- Duplicate Active Prompt into New Version ---
  const handleDuplicatePrompt = () => {
    const newVerNum = versions.length + 1;
    const newVer: PromptVersion = {
      version: newVerNum,
      createdAt: new Date().toISOString(),
      content: markdown,
      changeNote: `Duplicated from v${versions[activeVersionIndex]?.version || 1}`,
      wordCount: markdown.split(/\s+/).filter(Boolean).length,
      characterCount: markdown.length,
    };
    const updatedVersions = [...versions, newVer];
    setVersions(updatedVersions);
    setActiveVersionIndex(updatedVersions.length - 1);
    setIsDirty(false);
  };

  // --- Chat Refinement Handler ---
  const handleRefineInstruction = (instruction: string) => {
    setIsRefining(true);
    const userMsg: RefinementMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toISOString(),
      content: instruction,
    };
    setRefinementMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const { updatedMarkdown, updatedSections, summaryOfChange } = refinePromptSections(
        sections,
        markdown,
        instruction
      );

      setSections(updatedSections);
      setMarkdown(updatedMarkdown);

      const newVerNum = versions.length + 1;
      const newVer: PromptVersion = {
        version: newVerNum,
        createdAt: new Date().toISOString(),
        content: updatedMarkdown,
        changeNote: `Refinement: ${summaryOfChange}`,
        wordCount: updatedMarkdown.split(/\s+/).filter(Boolean).length,
        characterCount: updatedMarkdown.length,
      };
      setVersions((prev) => [...prev, newVer]);
      setActiveVersionIndex(versions.length);

      const botMsg: RefinementMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        timestamp: new Date().toISOString(),
        content: summaryOfChange,
        promptVersionGenerated: newVerNum,
      };
      setRefinementMessages((prev) => [...prev, botMsg]);
      setIsRefining(false);
      setIsDirty(false);
    }, 300);
  };

  // --- Load Template from Library ---
  const handleSelectTemplate = (tmpl: LibraryTemplate) => {
    setActiveTitle(tmpl.title);
    setMarkdown(tmpl.prompt);
    setUserIdea(tmpl.description);
    setTargetAI(tmpl.targetAI as TargetAI);

    // Deconstruct sections from template markdown
    const extractedSections: VisualSection[] = [];
    const chunks = tmpl.prompt.split("\n## ");
    chunks.forEach((chunk, i) => {
      if (i === 0) return; // Skip title
      const lines = chunk.split("\n");
      const title = lines[0].trim();
      const content = lines.slice(1).join("\n").trim();
      extractedSections.push({
        id: `sec-lib-${i}-${Date.now()}`,
        title,
        type: "custom",
        enabled: true,
        content,
      });
    });

    setSections(extractedSections);

    const newVer: PromptVersion = {
      version: 1,
      createdAt: new Date().toISOString(),
      content: tmpl.prompt,
      changeNote: `Loaded template: ${tmpl.title}`,
      wordCount: tmpl.prompt.split(/\s+/).filter(Boolean).length,
      characterCount: tmpl.prompt.length,
    };
    setVersions([newVer]);
    setActiveVersionIndex(0);
    setIsDirty(false);
    setMobileTab("preview");
  };

  // --- Load Saved Prompt from Drawer ---
  const handleSelectSavedPrompt = (prompt: SavedPrompt) => {
    setActiveTitle(prompt.title);
    setUserIdea(prompt.description);
    setTargetAI(prompt.targetAI);
    setProjectType(prompt.projectType);
    setComplexity(prompt.complexity);
    setMode(prompt.mode);
    setSelectedMemoryId(prompt.projectMemoryId || null);

    const activeVer = prompt.versions[prompt.activeVersionIndex] || prompt.versions[0];
    setMarkdown(activeVer?.content || "");
    setVersions(prompt.versions);
    setActiveVersionIndex(prompt.activeVersionIndex);
    setSections(prompt.sections.length > 0 ? prompt.sections : []);
    setIsDirty(false);
    setMobileTab("preview");
  };

  // Metrics
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).filter(Boolean).length : 0;
  const tokenEstimate = Math.round(wordCount * 1.35);

  return (
    <div className="flex flex-col h-screen w-full bg-[#050816] text-text-primary overflow-hidden font-sans">
      {/* Top Header */}
      <PromptHeader
        targetAI={targetAI}
        onTargetAIChange={setTargetAI}
        promptDNA={dna}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        onOpenMyPrompts={() => setIsMyPromptsOpen(true)}
        onOpenDNASettings={() => setIsDNASettingsOpen(true)}
        onOpenMasterKey={() => setIsMasterKeyOpen(true)}
        onOpenProjectMemory={() => setIsProjectMemoryOpen(true)}
        onOpenVersionHistory={() => setIsVersionHistoryOpen(true)}
        onOpenAuditor={() => setIsAuditorOpen(true)}
        onOpenImprover={() => setIsImproverOpen(true)}
        onCopyPrompt={handleCopyPrompt}
        onExport={() => setIsExportOpen(true)}
        wordCount={wordCount}
        tokenEstimate={tokenEstimate}
        activePromptTitle={activeTitle}
      />

      {/* Mobile Tab Navigation Bar (visible below xl screens) */}
      <div className="xl:hidden flex items-center bg-[#070b22] border-b border-white/10 px-2 py-1 text-xs select-none">
        <button
          onClick={() => setMobileTab("input")}
          className={`flex-1 py-1.5 rounded-md text-center font-semibold transition-all ${
            mobileTab === "input"
              ? "bg-brand-blue text-white shadow-glow-sm"
              : "text-text-muted hover:text-white"
          }`}
        >
          1. Input
        </button>
        <button
          onClick={() => setMobileTab("builder")}
          className={`flex-1 py-1.5 rounded-md text-center font-semibold transition-all ${
            mobileTab === "builder"
              ? "bg-brand-blue text-white shadow-glow-sm"
              : "text-text-muted hover:text-white"
          }`}
        >
          2. Builder
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-1.5 rounded-md text-center font-semibold transition-all ${
            mobileTab === "preview"
              ? "bg-brand-blue text-white shadow-glow-sm"
              : "text-text-muted hover:text-white"
          }`}
        >
          3. Preview
        </button>
        <button
          onClick={() => setMobileTab("refine")}
          className={`flex-1 py-1.5 rounded-md text-center font-semibold transition-all ${
            mobileTab === "refine"
              ? "bg-brand-blue text-white shadow-glow-sm"
              : "text-text-muted hover:text-white"
          }`}
        >
          4. Refine
        </button>
      </div>

      {/* Main Workspace 3-Column Layout */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden">
        {/* Left Column: Prompt Input & Mode Controls (3.5 cols on xl) */}
        <div
          className={`xl:col-span-4 2xl:col-span-3 h-full overflow-hidden ${
            mobileTab === "input" ? "block" : "hidden xl:block"
          }`}
        >
          <PromptInputPanel
            userIdea={userIdea}
            onUserIdeaChange={setUserIdea}
            projectType={projectType}
            onProjectTypeChange={setProjectType}
            complexity={complexity}
            onComplexityChange={setComplexity}
            targetAI={targetAI}
            onTargetAIChange={setTargetAI}
            mode={mode}
            onModeChange={setMode}
            projectMemories={projectMemories}
            selectedMemoryId={selectedMemoryId}
            onSelectMemoryId={setSelectedMemoryId}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>

        {/* Center Column: Visual Section Builder OR Refinement Chat (4.5 cols on xl) */}
        <div
          className={`xl:col-span-4 2xl:col-span-4 h-full flex flex-col overflow-hidden ${
            mobileTab === "builder" || mobileTab === "refine"
              ? "block"
              : "hidden xl:flex"
          }`}
        >
          {/* Middle panel switcher tabs on desktop */}
          <div className="hidden xl:flex items-center justify-between px-4 py-1.5 bg-[#060a22] border-b border-white/10 text-xs select-none">
            <div className="flex items-center gap-1 bg-surface-100 p-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => setMiddleTab("builder")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
                  middleTab === "builder"
                    ? "bg-brand-blue text-white shadow-glow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <Sliders className="w-3 h-3" />
                <span>Section Builder</span>
              </button>
              <button
                onClick={() => setMiddleTab("refine")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
                  middleTab === "refine"
                    ? "bg-purple-600 text-white shadow-glow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                <span>Refinement Chat</span>
              </button>
            </div>

            <span className="text-[10px] font-mono text-text-muted">
              {middleTab === "builder"
                ? `${sections.filter((s) => s.enabled).length} active sections`
                : `${refinementMessages.length} iterations`}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            {(mobileTab === "refine" || (mobileTab !== "builder" && middleTab === "refine")) ? (
              <RefinementChatPanel
                messages={refinementMessages}
                onSendMessage={handleRefineInstruction}
                isRefining={isRefining}
              />
            ) : (
              <PromptBuilderPanel
                sections={sections}
                onSectionsChange={handleSectionsChange}
              />
            )}
          </div>
        </div>

        {/* Right Column: Prompt Editor & Live Preview (4 cols on xl / 5 cols on 2xl) */}
        <div
          className={`xl:col-span-4 2xl:col-span-5 h-full overflow-hidden ${
            mobileTab === "preview" ? "block" : "hidden xl:block"
          }`}
        >
          <PromptEditorPanel
            markdown={markdown}
            onMarkdownChange={handleMarkdownChange}
            onCopy={handleCopyPrompt}
            onImprove={() => setIsImproverOpen(true)}
            onAudit={() => setIsAuditorOpen(true)}
            onSavePrompt={handleSavePrompt}
            onDuplicate={handleDuplicatePrompt}
            onExport={() => setIsExportOpen(true)}
            isCopied={isCopied}
          />
        </div>
      </main>

      {/* Bottom Status Bar */}
      <PromptStatusBar
        targetAI={targetAI}
        promptDNA={dna}
        activeProjectMemory={activeMemory}
        mode={mode}
        wordCount={wordCount}
        charCount={markdown.length}
        isDirty={isDirty}
      />

      {/* --- Modals & Overlays --- */}

      {/* Command Palette (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNewPrompt={() => {
          setUserIdea("");
          setMarkdown("");
          setSections([]);
        }}
        onOpenImprover={() => setIsImproverOpen(true)}
        onOpenAuditor={() => setIsAuditorOpen(true)}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        onOpenMyPrompts={() => setIsMyPromptsOpen(true)}
        onOpenDNA={() => setIsDNASettingsOpen(true)}
        onOpenMasterKey={() => setIsMasterKeyOpen(true)}
        onOpenProjectMemory={() => setIsProjectMemoryOpen(true)}
        onCopyPrompt={handleCopyPrompt}
        onExport={() => setIsExportOpen(true)}
      />

      {/* Prompt Improver Modal */}
      <PromptImproverModal
        isOpen={isImproverOpen}
        onClose={() => setIsImproverOpen(false)}
        currentPrompt={markdown}
        onApplyImproved={(improved) => {
          setMarkdown(improved);
          const newVerNum = versions.length + 1;
          const newVer: PromptVersion = {
            version: newVerNum,
            createdAt: new Date().toISOString(),
            content: improved,
            changeNote: "Prompt Improver enhancements applied",
            wordCount: improved.split(/\s+/).filter(Boolean).length,
            characterCount: improved.length,
          };
          setVersions((prev) => [...prev, newVer]);
          setActiveVersionIndex(versions.length);
          setIsDirty(false);
        }}
      />

      {/* Prompt Auditor Modal */}
      <PromptAuditorModal
        isOpen={isAuditorOpen}
        onClose={() => setIsAuditorOpen(false)}
        markdown={markdown}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        isOpen={isVersionHistoryOpen}
        onClose={() => setIsVersionHistoryOpen(false)}
        versions={versions}
        activeVersionIndex={activeVersionIndex}
        onSelectVersion={(idx) => {
          setActiveVersionIndex(idx);
          if (versions[idx]) {
            setMarkdown(versions[idx].content);
          }
        }}
        promptTitle={activeTitle}
      />

      {/* Templates Library Modal */}
      <PromptLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* My Prompts Drawer */}
      <MyPromptsDrawer
        isOpen={isMyPromptsOpen}
        onClose={() => setIsMyPromptsOpen(false)}
        prompts={savedPrompts}
        onSelectPrompt={handleSelectSavedPrompt}
        onDeletePrompt={(id) => {
          PromptStorage.deletePrompt(id);
          setSavedPrompts(PromptStorage.getSavedPrompts());
        }}
        onToggleFavorite={(id) => {
          PromptStorage.toggleFavorite(id);
          setSavedPrompts(PromptStorage.getSavedPrompts());
        }}
        onDuplicatePrompt={(prompt) => {
          const dup: SavedPrompt = {
            ...prompt,
            id: `saved-${Date.now()}`,
            title: `${prompt.title} (Copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          PromptStorage.savePrompt(dup);
          setSavedPrompts(PromptStorage.getSavedPrompts());
        }}
        onRenamePrompt={(id, newTitle) => {
          const target = savedPrompts.find((p) => p.id === id);
          if (target) {
            const updated = { ...target, title: newTitle, updatedAt: new Date().toISOString() };
            PromptStorage.savePrompt(updated);
            setSavedPrompts(PromptStorage.getSavedPrompts());
            if (activeTitle === target.title) {
              setActiveTitle(newTitle);
            }
          }
        }}
      />

      {/* Prompt DNA Settings Modal */}
      <PromptDNASettingsModal
        isOpen={isDNASettingsOpen}
        onClose={() => setIsDNASettingsOpen(false)}
        dna={dna}
        onSaveDNA={(newDNA) => {
          setDna(newDNA);
          PromptStorage.savePromptDNA(newDNA);
        }}
      />

      {/* Master Prompt Key Modal */}
      <MasterKeyModal
        isOpen={isMasterKeyOpen}
        onClose={() => setIsMasterKeyOpen(false)}
        masterKey={masterKey}
        onSaveMasterKey={(newKey) => {
          setMasterKey(newKey);
          PromptStorage.saveMasterPromptKey(newKey);
        }}
      />

      {/* Project Memory Modal */}
      <ProjectMemoryModal
        isOpen={isProjectMemoryOpen}
        onClose={() => setIsProjectMemoryOpen(false)}
        memories={projectMemories}
        onSaveMemory={(mem) => {
          PromptStorage.saveProjectMemory(mem);
          setProjectMemories(PromptStorage.getProjectMemories());
        }}
        onDeleteMemory={(id) => {
          PromptStorage.deleteProjectMemory(id);
          setProjectMemories(PromptStorage.getProjectMemories());
        }}
        selectedMemoryId={selectedMemoryId}
        onSelectMemoryId={setSelectedMemoryId}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        markdown={markdown}
        title={activeTitle}
      />
    </div>
  );
}
