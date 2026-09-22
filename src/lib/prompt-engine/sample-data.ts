import { SavedPrompt, ProjectMemory } from "./types";
import { DEFAULT_SUNIL_PORTFOLIO_MEMORY } from "./prompt-dna-defaults";
import { BUILTIN_PROMPTS_LIBRARY } from "./master-templates";

export const INITIAL_PROJECT_MEMORIES: ProjectMemory[] = [
  DEFAULT_SUNIL_PORTFOLIO_MEMORY,
  {
    id: "memory-saas-platform",
    name: "Enterprise Analytics SaaS",
    description: "Next-gen analytics platform with real-time telemetry dashboards",
    stack: ["Next.js 14", "Tailwind CSS", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
    style: {
      colorTheme: "Obsidian dark with Emerald Cyan and Electric Indigo",
      mode: "dark",
      typography: "Inter & JetBrains Mono",
      visualElements: ["Data-dense tables", "Interactive charts", "Compact cards"],
    },
    role: "Lead Frontend Systems Architect",
    existingArchitecture: "Next.js App Router with Server Actions and Tailwind UI components",
    constraints: ["Zero layout shift on streaming data", "WCAG AA contrast compliant"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const INITIAL_SAVED_PROMPTS: SavedPrompt[] = [
  {
    id: "prompt-3d-seo-portfolio",
    title: "3D SEO Portfolio",
    description: "Cinematic 3D WebGL developer portfolio with live Nepal time and search universe",
    category: "Design",
    tags: ["3D", "SEO", "Portfolio", "Three.js", "Nepal Time"],
    targetAI: "antigravity",
    projectType: "Website",
    complexity: "Production",
    mode: "existing",
    projectMemoryId: "memory-sunil-portfolio",
    sections: [],
    versions: [
      {
        version: 1,
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        content: BUILTIN_PROMPTS_LIBRARY[2].prompt,
        changeNote: "Initial comprehensive 3D SEO architecture",
        wordCount: BUILTIN_PROMPTS_LIBRARY[2].prompt.split(/\s+/).length,
        characterCount: BUILTIN_PROMPTS_LIBRARY[2].prompt.length,
      },
    ],
    activeVersionIndex: 0,
    isFavorite: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "prompt-antigravity-fix",
    title: "Antigravity Portfolio Fix",
    description: "Non-destructive UI refinement, mobile overflow prevention, and build verification",
    category: "Development",
    tags: ["Antigravity", "Refinement", "Mobile", "Fix"],
    targetAI: "antigravity",
    projectType: "Debugging",
    complexity: "Production",
    mode: "existing",
    projectMemoryId: "memory-sunil-portfolio",
    sections: [],
    versions: [
      {
        version: 1,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        content: BUILTIN_PROMPTS_LIBRARY[0].prompt,
        changeNote: "Non-destructive codebase crawl and mobile fix",
        wordCount: BUILTIN_PROMPTS_LIBRARY[0].prompt.split(/\s+/).length,
        characterCount: BUILTIN_PROMPTS_LIBRARY[0].prompt.length,
      },
    ],
    activeVersionIndex: 0,
    isFavorite: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "prompt-seo-content-generator",
    title: "SEO Content Generator",
    description: "Generative Engine Optimization (GEO) content blueprint for AI search engines",
    category: "SEO",
    tags: ["SEO", "Content", "GEO", "AEO", "Perplexity"],
    targetAI: "gemini",
    projectType: "SEO",
    complexity: "Advanced",
    mode: "new",
    sections: [],
    versions: [
      {
        version: 1,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        content: BUILTIN_PROMPTS_LIBRARY[5].prompt,
        changeNote: "Full technical SEO and entity citation prompt",
        wordCount: BUILTIN_PROMPTS_LIBRARY[5].prompt.split(/\s+/).length,
        characterCount: BUILTIN_PROMPTS_LIBRARY[5].prompt.length,
      },
    ],
    activeVersionIndex: 0,
    isFavorite: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "prompt-linkedin-post-generator",
    title: "LinkedIn Post Generator",
    description: "High-authority technical thought leadership post creator with hook formulas",
    category: "Marketing",
    tags: ["Marketing", "LinkedIn", "Thought Leadership", "Hooks"],
    targetAI: "claude",
    projectType: "Marketing",
    complexity: "Intermediate",
    mode: "new",
    sections: [],
    versions: [
      {
        version: 1,
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        content: `# LINKEDIN THOUGHT LEADERSHIP GENERATOR SPECIFICATION

## ROLE
You are a premier B2B Tech Thought Leadership ghostwriter and viral content strategist.

## OBJECTIVE
Create an engaging, authentic, and highly citeable LinkedIn post analyzing modern engineering trade-offs.

## 1. HOOK FORMULA
- First line must be under 90 characters to avoid mobile truncation.
- Challenge conventional wisdom or reveal an unexpected benchmark metric.

## 2. BODY STRUCTURE
- 1-2 sentence paragraphs for rapid mobile scannability.
- Concrete bullet points detailing 3 tactical lessons or failure cases.
- Avoid buzzwords, corporate jargon, and generic inspirational fluff.

## 3. CALL TO ENGAGEMENT
- End with an open, debate-sparking question encouraging peer practitioners to comment.
- Include 3 targeted, lowercase hashtags (#webdev, #nextjs, #seo).`,
        changeNote: "Initial viral framework with hook scannability rules",
        wordCount: 130,
        characterCount: 880,
      },
    ],
    activeVersionIndex: 0,
    isFavorite: false,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "prompt-website-audit",
    title: "Website Audit",
    description: "Holistic Core Web Vitals, accessibility, and visual regression audit",
    category: "Development",
    tags: ["Audit", "Performance", "Core Web Vitals", "Accessibility"],
    targetAI: "antigravity",
    projectType: "Debugging",
    complexity: "Production",
    mode: "existing",
    projectMemoryId: "memory-sunil-portfolio",
    sections: [],
    versions: [
      {
        version: 1,
        createdAt: new Date(Date.now() - 21600000).toISOString(),
        content: `# ENTERPRISE WEB AUDIT & HEURISTIC EVALUATION

## ROLE
You are a Principal Web Performance Engineer and WCAG Accessibility Specialist.

## PROJECT CONTEXT
Evaluating an existing modern Next.js web application for performance bottlenecks, accessibility failures, and responsive regressions.

## AUDIT OBJECTIVES
1. Audit Largest Contentful Paint (LCP < 2.0s), Interaction to Next Paint (INP < 150ms), Cumulative Layout Shift (CLS < 0.05).
2. Check color contrast against WCAG 2.1 AA benchmarks.
3. Test all viewports for horizontal overflow from 320px to 1440px.
4. Verify full keyboard navigation and ARIA attributes for interactive controls.

## OUTPUT FORMAT
Deliver a prioritized remediation table (P0, P1, P2) with concrete code corrections.`,
        changeNote: "Full enterprise web audit specification",
        wordCount: 110,
        characterCount: 780,
      },
    ],
    activeVersionIndex: 0,
    isFavorite: true,
    createdAt: new Date(Date.now() - 21600000).toISOString(),
    updatedAt: new Date(Date.now() - 21600000).toISOString(),
  },
];
