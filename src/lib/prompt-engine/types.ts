export type TargetAI =
  | "antigravity"
  | "claude"
  | "gemini"
  | "chatgpt"
  | "cursor"
  | "lovable"
  | "bolt"
  | "replit"
  | "windsurf"
  | "v0"
  | "generic"
  | "image-ai";

export type ProjectType =
  | "Website"
  | "Web App"
  | "SaaS"
  | "Mobile App"
  | "API"
  | "SEO"
  | "Marketing"
  | "Content"
  | "Research"
  | "Automation"
  | "UI/UX"
  | "Coding"
  | "Debugging"
  | "Image"
  | "Video"
  | "Business";

export type ComplexityLevel =
  | "Simple"
  | "Intermediate"
  | "Advanced"
  | "Production";

export type ProjectMode = "new" | "existing";

export interface PromptDNA {
  structure: "Compact" | "Detailed" | "Master";
  tone: "Professional" | "Technical" | "Direct" | "Creative";
  instructionStyle: "Step-by-step" | "Specification" | "Checklist" | "Hybrid";
  codebaseBehavior: "Inspect first" | "Modify existing" | "Rebuild if necessary";
  validation: "Basic" | "Detailed" | "Production";
  outputPreference: "Copy-ready" | "Markdown" | "Plain Text" | "JSON";
  includeConstraints: boolean;
  includeTesting: boolean;
  includeAuditChecklist: boolean;
  preserveNonDestructive: boolean;
  errorPrevention: boolean;
  targetAITuning: boolean;
}

export interface MasterPromptKey {
  id: string;
  name: string;
  updatedAt: string;
  dna: PromptDNA;
  preferredSections: string[];
  preferredTerminology: string[];
  technicalDepth: "standard" | "in-depth" | "maximum-precision";
  validationStyle: "smoke-test" | "unit-integration" | "production-grade";
  projectBehavior: "conservative" | "pragmatic" | "aggressive";
  aiPlatformPreferences: Record<TargetAI, { emphasis: string[] }>;
}

export interface ProjectMemory {
  id: string;
  name: string;
  description?: string;
  stack: string[];
  style: {
    colorTheme?: string;
    mode?: "dark" | "light" | "futuristic" | "minimal";
    typography?: string;
    visualElements?: string[];
  };
  role?: string;
  existingArchitecture?: string;
  constraints?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VisualSection {
  id: string;
  title: string;
  type:
    | "role"
    | "objective"
    | "context"
    | "requirements"
    | "features"
    | "ui"
    | "ux"
    | "animation"
    | "three_d"
    | "backend"
    | "database"
    | "api"
    | "auth"
    | "seo"
    | "aeo"
    | "geo"
    | "performance"
    | "responsiveness"
    | "accessibility"
    | "security"
    | "testing"
    | "deployment"
    | "constraints"
    | "do_not"
    | "checklist"
    | "custom";
  content: string;
  enabled: boolean;
  placeholder?: string;
}

export interface PromptVersion {
  version: number;
  createdAt: string;
  content: string;
  changeNote?: string;
  wordCount: number;
  characterCount: number;
}

export interface SavedPrompt {
  id: string;
  title: string;
  description: string;
  category: "Development" | "Design" | "SEO" | "Marketing" | "AI" | "General";
  tags: string[];
  targetAI: TargetAI;
  projectType: ProjectType;
  complexity: ComplexityLevel;
  mode: ProjectMode;
  projectMemoryId?: string;
  sections: VisualSection[];
  versions: PromptVersion[];
  activeVersionIndex: number;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PromptAuditDimension {
  name:
    | "Clarity"
    | "Context"
    | "Specificity"
    | "Structure"
    | "Technical Completeness"
    | "Constraints"
    | "Testability"
    | "AI Compatibility";
  rating: "High" | "Medium" | "Needs Improvement";
  summary: string;
  details: string[];
}

export interface PromptAuditResult {
  dimensions: PromptAuditDimension[];
  overallSummary: string;
  strengths: string[];
  weaknesses: string[];
  actionableFixes: string[];
  detectedSections: string[];
  missingCrucialSections: string[];
}

export interface PromptImprovementResult {
  original: string;
  issuesFound: string[];
  improvedPrompt: string;
  rationale: string[];
}

export interface RefinementMessage {
  id: string;
  sender: "user" | "assistant";
  timestamp: string;
  content: string;
  promptVersionGenerated?: number;
}
