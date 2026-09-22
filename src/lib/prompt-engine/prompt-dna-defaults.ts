import { PromptDNA, MasterPromptKey, ProjectMemory } from "./types";

export const DEFAULT_PROMPT_DNA: PromptDNA = {
  structure: "Master",
  tone: "Technical",
  instructionStyle: "Specification",
  codebaseBehavior: "Inspect first",
  validation: "Production",
  outputPreference: "Markdown",
  includeConstraints: true,
  includeTesting: true,
  includeAuditChecklist: true,
  preserveNonDestructive: true,
  errorPrevention: true,
  targetAITuning: true,
};

export const DEFAULT_MASTER_PROMPT_KEY: MasterPromptKey = {
  id: "master-key-default",
  name: "Antigravity Engineering Master Profile",
  updatedAt: new Date().toISOString(),
  dna: DEFAULT_PROMPT_DNA,
  preferredSections: [
    "ROLE",
    "CONTEXT",
    "OBJECTIVE",
    "CORE REQUIREMENTS",
    "DESIGN SYSTEM",
    "USER EXPERIENCE",
    "FUNCTIONAL REQUIREMENTS",
    "TECHNICAL REQUIREMENTS",
    "SEO & GEO",
    "RESPONSIVENESS",
    "ACCESSIBILITY",
    "PERFORMANCE",
    "SECURITY",
    "CONSTRAINTS",
    "DO NOT DO",
    "TESTING & VALIDATION",
    "FINAL VERIFICATION",
    "MOST IMPORTANT INSTRUCTION",
  ],
  preferredTerminology: [
    "production-ready",
    "non-destructive modification",
    "codebase crawl",
    "zero regression",
    "fluid typography",
    "semantic HTML5",
    "typed interfaces",
  ],
  technicalDepth: "maximum-precision",
  validationStyle: "production-grade",
  projectBehavior: "conservative",
  aiPlatformPreferences: {
    antigravity: {
      emphasis: [
        "First inspect existing files and project structure thoroughly",
        "Maintain documentation and codebase integrity",
        "Iterative modification, do not rebuild from scratch",
        "Re-crawl codebase after edits to resolve ripple errors",
        "Confirm production build (`npm run build`) before final handoff",
      ],
    },
    cursor: {
      emphasis: [
        "Target explicit files with repository context paths",
        "Use multi-file edits with precise line diffs",
        "Include unit tests and typed schemas",
      ],
    },
    claude: {
      emphasis: [
        "Deep reasoning before implementation",
        "Exhaustive XML/Markdown structured blocks",
        "Edge-case enumeration and failure prevention",
      ],
    },
    gemini: {
      emphasis: [
        "Large-context architectural synthesis",
        "Multimodal and structured analytical breakdowns",
        "Clear objective hierarchy and concise execution vectors",
      ],
    },
    chatgpt: {
      emphasis: [
        "Rigid system prompt framing",
        "Step-by-step deliverable milestones",
        "Concrete code snippets with full implementations",
      ],
    },
    lovable: {
      emphasis: [
        "Tailwind styling, Lucide icons, Supabase backend integration",
        "Component modularity and clean responsive layout",
      ],
    },
    bolt: {
      emphasis: [
        "WebContainer containerized stack compatibility",
        "Vite / Next.js dependency alignment",
        "In-browser runtime error handling",
      ],
    },
    replit: {
      emphasis: [
        "Environment variable isolation",
        "Server entrypoint resilience",
        "Zero missing package imports",
      ],
    },
    windsurf: {
      emphasis: [
        "Cascade agent step verification",
        "Deep workspace indexing",
        "Predictive cross-file refactoring",
      ],
    },
    v0: {
      emphasis: [
        "shadcn/ui + Tailwind CSS modular components",
        "Accessible ARIA attributes and clean reactive state",
      ],
    },
    generic: {
      emphasis: [
        "Standard structured software engineering prompt",
        "Clear input/output contracts and strict constraints",
      ],
    },
    "image-ai": {
      emphasis: [
        "Subject, medium, composition, lighting, camera angle, color palette, rendering engine, negative prompts",
      ],
    },
  },
};

export const DEFAULT_SUNIL_PORTFOLIO_MEMORY: ProjectMemory = {
  id: "memory-sunil-portfolio",
  name: "Sunil Kumar Bohara Portfolio",
  description: "High-performance 3D SEO Executive & Digital Marketing Portfolio",
  stack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Three.js", "React Three Fiber", "Framer Motion"],
  style: {
    colorTheme: "Deep Dark (#050816) with Electric Blue (#3b82f6), Vibrant Cyan (#38bdf8), and Subtle Crimson Red (#ef4444)",
    mode: "dark",
    typography: "Inter (body), Outfit (headings), JetBrains Mono (code/metrics)",
    visualElements: ["Glassmorphic cards", "Subtle neon borders", "3D Interactive Universe", "Smooth hover transitions"],
  },
  role: "Senior SEO Executive & Generative Engine Optimizer (GEO / AEO Specialist)",
  existingArchitecture: "Next.js App Router with modular sections in src/components/sections, 3D canvases in src/components/3d, and dynamic admin blog engine",
  constraints: [
    "Preserve live Nepal local clock accuracy",
    "Maintain 100/100 Core Web Vitals performance budget",
    "Zero horizontal scrollbar across all mobile viewports (320px - 1440px)",
    "Strict TypeScript typings with zero build errors",
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
