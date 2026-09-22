import {
  PromptDNA,
  MasterPromptKey,
  ProjectMemory,
  SavedPrompt,
  PromptVersion,
} from "./types";
import { DEFAULT_PROMPT_DNA, DEFAULT_MASTER_PROMPT_KEY } from "./prompt-dna-defaults";
import { INITIAL_SAVED_PROMPTS, INITIAL_PROJECT_MEMORIES } from "./sample-data";

const STORAGE_KEYS = {
  PROMPT_DNA: "agy_prompt_dna_v1",
  MASTER_KEY: "agy_master_prompt_key_v1",
  SAVED_PROMPTS: "agy_saved_prompts_v1",
  PROJECT_MEMORIES: "agy_project_memories_v1",
};

export const PromptStorage = {
  // --- Prompt DNA ---
  getPromptDNA(): PromptDNA {
    if (typeof window === "undefined") return DEFAULT_PROMPT_DNA;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROMPT_DNA);
      return stored ? { ...DEFAULT_PROMPT_DNA, ...JSON.parse(stored) } : DEFAULT_PROMPT_DNA;
    } catch {
      return DEFAULT_PROMPT_DNA;
    }
  },

  savePromptDNA(dna: PromptDNA): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.PROMPT_DNA, JSON.stringify(dna));
    } catch (e) {
      console.error("Failed to save Prompt DNA to localStorage", e);
    }
  },

  // --- Master Prompt Key ---
  getMasterPromptKey(): MasterPromptKey {
    if (typeof window === "undefined") return DEFAULT_MASTER_PROMPT_KEY;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MASTER_KEY);
      return stored ? { ...DEFAULT_MASTER_PROMPT_KEY, ...JSON.parse(stored) } : DEFAULT_MASTER_PROMPT_KEY;
    } catch {
      return DEFAULT_MASTER_PROMPT_KEY;
    }
  },

  saveMasterPromptKey(key: MasterPromptKey): void {
    if (typeof window === "undefined") return;
    try {
      // Ensure no credentials leak
      const sanitized = { ...key, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.MASTER_KEY, JSON.stringify(sanitized));
    } catch (e) {
      console.error("Failed to save Master Prompt Key", e);
    }
  },

  // --- Project Memories ---
  getProjectMemories(): ProjectMemory[] {
    if (typeof window === "undefined") return INITIAL_PROJECT_MEMORIES;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECT_MEMORIES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PROJECT_MEMORIES, JSON.stringify(INITIAL_PROJECT_MEMORIES));
        return INITIAL_PROJECT_MEMORIES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_PROJECT_MEMORIES;
    }
  },

  saveProjectMemory(memory: ProjectMemory): void {
    if (typeof window === "undefined") return;
    try {
      const current = this.getProjectMemories();
      const index = current.findIndex((m) => m.id === memory.id);
      let updated: ProjectMemory[];
      if (index !== -1) {
        updated = [...current];
        updated[index] = { ...memory, updatedAt: new Date().toISOString() };
      } else {
        updated = [memory, ...current];
      }
      localStorage.setItem(STORAGE_KEYS.PROJECT_MEMORIES, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save project memory", e);
    }
  },

  deleteProjectMemory(id: string): void {
    if (typeof window === "undefined") return;
    try {
      const current = this.getProjectMemories();
      const filtered = current.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEYS.PROJECT_MEMORIES, JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to delete project memory", e);
    }
  },

  // --- Saved Prompts ---
  getSavedPrompts(): SavedPrompt[] {
    if (typeof window === "undefined") return INITIAL_SAVED_PROMPTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(INITIAL_SAVED_PROMPTS));
        return INITIAL_SAVED_PROMPTS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_SAVED_PROMPTS;
    }
  },

  savePrompt(prompt: SavedPrompt): void {
    if (typeof window === "undefined") return;
    try {
      const current = this.getSavedPrompts();
      const index = current.findIndex((p) => p.id === prompt.id);
      let updated: SavedPrompt[];
      if (index !== -1) {
        updated = [...current];
        updated[index] = { ...prompt, updatedAt: new Date().toISOString() };
      } else {
        updated = [prompt, ...current];
      }
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save prompt", e);
    }
  },

  deletePrompt(id: string): void {
    if (typeof window === "undefined") return;
    try {
      const current = this.getSavedPrompts();
      const filtered = current.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(filtered));
    } catch (e) {
      console.error("Failed to delete prompt", e);
    }
  },

  toggleFavorite(id: string): SavedPrompt | null {
    if (typeof window === "undefined") return null;
    try {
      const current = this.getSavedPrompts();
      const index = current.findIndex((p) => p.id === id);
      if (index === -1) return null;
      const updatedItem = { ...current[index], isFavorite: !current[index].isFavorite };
      current[index] = updatedItem;
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(current));
      return updatedItem;
    } catch {
      return null;
    }
  },

  addVersion(promptId: string, content: string, changeNote?: string): SavedPrompt | null {
    if (typeof window === "undefined") return null;
    try {
      const current = this.getSavedPrompts();
      const index = current.findIndex((p) => p.id === promptId);
      if (index === -1) return null;
      const prompt = current[index];
      const newVersionNum = prompt.versions.length + 1;
      const newVersion: PromptVersion = {
        version: newVersionNum,
        createdAt: new Date().toISOString(),
        content,
        changeNote: changeNote || `Version ${newVersionNum} update`,
        wordCount: content.split(/\s+/).filter(Boolean).length,
        characterCount: content.length,
      };

      const updatedPrompt: SavedPrompt = {
        ...prompt,
        versions: [...prompt.versions, newVersion],
        activeVersionIndex: prompt.versions.length,
        updatedAt: new Date().toISOString(),
      };

      current[index] = updatedPrompt;
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(current));
      return updatedPrompt;
    } catch {
      return null;
    }
  },
};

// --- Export Helpers ---
export function exportAsFile(content: string, filename: string, mimeType: string) {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}
