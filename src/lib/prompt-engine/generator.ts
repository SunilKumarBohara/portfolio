import {
  PromptDNA,
  ProjectMemory,
  TargetAI,
  ProjectType,
  ComplexityLevel,
  ProjectMode,
  VisualSection,
} from "./types";
import { DEFAULT_PROMPT_DNA } from "./prompt-dna-defaults";

export interface GeneratePromptOptions {
  userIdea: string;
  projectType: ProjectType;
  complexity: ComplexityLevel;
  targetAI: TargetAI;
  mode: ProjectMode;
  dna?: PromptDNA;
  projectMemory?: ProjectMemory | null;
  activeSections?: VisualSection[];
}

export interface GeneratedPromptPayload {
  title: string;
  markdown: string;
  sections: VisualSection[];
  detectedIntent: {
    projectType: ProjectType;
    complexity: ComplexityLevel;
    keyThemes: string[];
    isMobileResponsive: boolean;
    is3DOrVisual: boolean;
    isBackendOrAPI: boolean;
    isSEOOrGEO: boolean;
    isDebugging: boolean;
  };
}

/**
 * Intelligent prompt generation engine that transforms a simple user idea
 * into a production-grade software engineering specification prompt.
 */
export function generateEngineeredPrompt(options: GeneratePromptOptions): GeneratedPromptPayload {
  const {
    userIdea,
    projectType,
    complexity,
    targetAI,
    mode,
    dna = DEFAULT_PROMPT_DNA,
    projectMemory,
  } = options;

  const ideaLower = userIdea.toLowerCase();

  // Heuristic analysis of user intent
  const isMobileResponsive =
    ideaLower.includes("mobile") ||
    ideaLower.includes("responsive") ||
    ideaLower.includes("overflow") ||
    ideaLower.includes("screen") ||
    ideaLower.includes("breakpoint") ||
    ideaLower.includes("phone") ||
    projectType === "Mobile App";

  const is3DOrVisual =
    ideaLower.includes("3d") ||
    ideaLower.includes("three") ||
    ideaLower.includes("webgl") ||
    ideaLower.includes("canvas") ||
    ideaLower.includes("animation") ||
    ideaLower.includes("design") ||
    ideaLower.includes("ui") ||
    ideaLower.includes("portfolio") ||
    projectType === "UI/UX" ||
    projectType === "Image";

  const isBackendOrAPI =
    ideaLower.includes("backend") ||
    ideaLower.includes("api") ||
    ideaLower.includes("database") ||
    ideaLower.includes("supabase") ||
    ideaLower.includes("auth") ||
    ideaLower.includes("sql") ||
    ideaLower.includes("prisma") ||
    ideaLower.includes("route") ||
    projectType === "API" ||
    projectType === "SaaS";

  const isSEOOrGEO =
    ideaLower.includes("seo") ||
    ideaLower.includes("geo") ||
    ideaLower.includes("aeo") ||
    ideaLower.includes("schema") ||
    ideaLower.includes("sitemap") ||
    ideaLower.includes("search") ||
    ideaLower.includes("ranking") ||
    projectType === "SEO";

  const isDebugging =
    ideaLower.includes("fix") ||
    ideaLower.includes("bug") ||
    ideaLower.includes("error") ||
    ideaLower.includes("audit") ||
    ideaLower.includes("refine") ||
    ideaLower.includes("broken") ||
    projectType === "Debugging";

  // Derive a clean, professional project title
  let cleanTitle = userIdea.trim().replace(/^i want (a|an)?\s*/i, "").replace(/[.!?]+$/, "");
  if (!cleanTitle) cleanTitle = "Engineered AI Prompt";
  const capitalizedTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
  const projectTitle = `${capitalizedTitle} Specification`;

  const sections: VisualSection[] = [];

  // 1. ROLE
  let roleText = "You are an expert principal software engineer, solutions architect, and UI/UX artisan.";
  if (targetAI === "antigravity") {
    roleText =
      "You are an expert full-stack developer and AI pair programmer operating inside Google Antigravity. You specialize in systematic codebase navigation, non-destructive iterative refactoring, and verified production builds.";
  } else if (targetAI === "cursor") {
    roleText =
      "You are an expert software engineer operating in Cursor IDE with repository-wide context. You write modular, type-safe code with clear file boundaries and zero hallucinated dependencies.";
  } else if (targetAI === "claude") {
    roleText =
      "You are a principal systems architect and rigorous AI engineer. You think deeply through requirements, edge cases, and failure modes before executing complete solutions.";
  } else if (targetAI === "gemini") {
    roleText =
      "You are an elite AI engineer with deep knowledge of modern web standards, full-stack architecture, and Generative Engine Optimization.";
  } else if (targetAI === "image-ai") {
    roleText =
      "You are an award-winning creative director and photorealistic digital artist specializing in cinematic lighting, 8K architectural rendering, and composition.";
  }

  sections.push({
    id: "sec-role",
    title: "ROLE",
    type: "role",
    enabled: true,
    content: roleText,
  });

  // 2. PROJECT CONTEXT
  let contextText = "";
  if (mode === "existing") {
    if (projectMemory) {
      contextText = `You are working on an existing operational project: **${projectMemory.name}**.\n- Tech Stack: ${projectMemory.stack.join(", ")}\n- Style Aesthetic: ${projectMemory.style.colorTheme || "Modern dark theme"}\n- Role / Identity: ${projectMemory.role || "Software Specialist"}\n- Existing Architecture: ${projectMemory.existingArchitecture || "Modular component architecture"}\n- The application is active in production; all existing features must remain stable.`;
    } else {
      contextText =
        "You are working on an existing, operational codebase with established dependencies, component architecture, and styling rules. The application must not be broken or rebuilt from scratch.";
    }
  } else {
    contextText =
      "This is a greenfield project starting from initial architecture. The system must be engineered with scalable folder structures, clean dependency graphs, and production readiness from day one.";
  }

  sections.push({
    id: "sec-context",
    title: "PROJECT CONTEXT",
    type: "context",
    enabled: true,
    content: contextText,
  });

  // 3. OBJECTIVE
  let objectiveText = `Transform the user goal ("${userIdea}") into an actionable, production-ready implementation. Complete all required deliverables with zero regressions, complete type-safety, and validated responsiveness.`;
  if (isMobileResponsive) {
    objectiveText = `Perform a comprehensive responsive audit and remediation for "${userIdea}". Eliminate all horizontal overflow across all viewports (320px to 1440px), ensure fluid typography and touch targets, and verify visual integrity.`;
  } else if (isDebugging) {
    objectiveText = `Perform a systematic diagnostic and repair pass for "${userIdea}". Inspect existing implementation, locate root causes, apply non-destructive fixes, and verify build integrity.`;
  }

  sections.push({
    id: "sec-objective",
    title: "OBJECTIVE",
    type: "objective",
    enabled: true,
    content: objectiveText,
  });

  // 4. CORE REQUIREMENTS
  let coreReqs = "";
  if (mode === "existing") {
    coreReqs += `1. **First Inspect the Existing Codebase**: Inspect existing files, configuration, and dependencies before writing or changing any code.\n`;
    coreReqs += `2. **Non-Destructive Modification**: Do NOT rebuild from scratch. Preserve all existing working functionality, routes, and components.\n`;
    coreReqs += `3. **Targeted Implementation**: Modify only what is strictly necessary to fulfill the objective.\n`;
    coreReqs += `4. **Ripple Regression Check**: After modifying files, crawl the codebase to ensure no dependent components or types were broken.\n`;
  } else {
    coreReqs += `1. **Clean Modular Architecture**: Organize files by feature domain with strict separation of concerns.\n`;
    coreReqs += `2. **Typed Interfaces**: Provide complete TypeScript interfaces for all components, models, and API payloads.\n`;
    coreReqs += `3. **State Management**: Implement predictable, centralized state handling without unnecessary re-renders.\n`;
  }

  if (isMobileResponsive) {
    coreReqs += `5. **Responsive Overhaul**: Ensure every container respects max-width: 100vw and has overflow-x: clip/hidden.\n`;
    coreReqs += `6. **Touch Ergonomics**: All interactive elements (buttons, links, form inputs) must have minimum 44x44px touch targets.\n`;
  }

  sections.push({
    id: "sec-requirements",
    title: "1. CORE REQUIREMENTS",
    type: "requirements",
    enabled: true,
    content: coreReqs.trim(),
  });

  // 5. DESIGN SYSTEM & VISUAL (if applicable)
  if (is3DOrVisual || projectType === "Website" || projectType === "Web App") {
    let designText = "";
    if (projectMemory?.style?.colorTheme) {
      designText += `- **Color Palette**: ${projectMemory.style.colorTheme}\n`;
      designText += `- **Typography**: ${projectMemory.style.typography || "Inter (sans), Outfit (display), JetBrains Mono (metrics)"}\n`;
      designText += `- **Visual Details**: ${projectMemory.style.visualElements?.join(", ") || "Glass panels, subtle glow borders, smooth transitions"}\n`;
    } else {
      designText += `- **Color Palette**: Deep dark cyber background (#050816) with Electric Blue (#3b82f6) primary accents, Cyber Cyan (#38bdf8), and Crimson Red (#ef4444) highlights.\n`;
      designText += `- **Typography**: Modern font stack (sans-serif for body text, display font for major headers, monospace for metrics and code).\n`;
      designText += `- **Visual Elements**: Translucent glass panels (backdrop-blur-md), micro-glow borders, and disciplined visual hierarchy.\n`;
    }
    designText += `- **Aesthetic Guardrails**: Maintain a premium dark developer workspace feel. Avoid cluttered or blinding neon overload.`;

    sections.push({
      id: "sec-design",
      title: "2. DESIGN SYSTEM & UI",
      type: "ui",
      enabled: true,
      content: designText,
    });
  }

  // 6. FUNCTIONAL / TECHNICAL IMPLEMENTATION
  let techText = "";
  if (isBackendOrAPI) {
    techText += `- **API & Database**: Implement secure route handlers with structured error schemas.\n`;
    techText += `- **Validation**: Use strict Zod or JSON-schema input sanitization for all request bodies and query parameters.\n`;
    techText += `- **Security**: Enforce authentication guards, parameterized database queries, and CSRF protection.\n`;
  } else if (is3DOrVisual) {
    techText += `- **WebGL / 3D Canvas**: Use Three.js / React Three Fiber with dynamic pixel ratio clamped at Math.min(window.devicePixelRatio, 2).\n`;
    techText += `- **Memory Management**: Dispose geometries, textures, and event listeners on component unmount to prevent leaks.\n`;
    techText += `- **Performance**: Ensure 60fps frame rate on desktop and gracefully degrade to lightweight particles on mobile.\n`;
  } else {
    techText += `- **Component Modularity**: Break down complex UI into clean, reusable subcomponents under 150 lines.\n`;
    techText += `- **Type Safety**: Zero \`any\` types. Write complete TypeScript interfaces.\n`;
    techText += `- **Performance**: Avoid unnecessary component re-renders with memoization and lazy-loading.\n`;
  }

  sections.push({
    id: "sec-technical",
    title: "3. TECHNICAL IMPLEMENTATION",
    type: "backend",
    enabled: true,
    content: techText.trim(),
  });

  // 7. RESPONSIVENESS (Always included if mobile/UI/web)
  if (isMobileResponsive || projectType === "Website" || projectType === "Web App") {
    const responsiveText = `Audit and test the entire layout across all standard screen widths:
- **Mobile Devices**: 320px, 360px, 375px, 390px, 412px, 430px
- **Tablets & Foldables**: 768px, 834px, 1024px
- **Laptops & Desktops**: 1280px, 1440px, 1920px

**Remediation Checklist**:
- Fix any horizontal overflow: ensure \`overflow-x: clip\` or strict max-width constraints on all parent containers.
- Verify typography scaling: no text clipping, awkward word wraps, or micro-fonts (<12px).
- Navigation: mobile menu drawer must slide smoothly, trap focus correctly, and close on route change.
- Modals & Drawers: ensure dialogs fit within mobile viewport with accessible vertical scrolling.
- Animations: reduce motion complexity on mobile viewports to conserve battery and GPU cycles.
- There must be **ABSOLUTELY NO HORIZONTAL SCROLLBAR** at any screen size.`;

    sections.push({
      id: "sec-responsiveness",
      title: "4. RESPONSIVE DESIGN & VIEWPORTS",
      type: "responsiveness",
      enabled: true,
      content: responsiveText,
    });
  }

  // 8. SEO, AEO & GEO (if applicable)
  if (isSEOOrGEO || projectType === "Website") {
    const seoText = `- **Structured Data**: Provide valid JSON-LD schemas (Person, WebSite, ProfessionalService, Article) conforming to Schema.org standards.\n- **Metadata**: Configure dynamic OpenGraph (1200x630), Twitter Cards, canonical URLs, and robots directives.\n- **Generative Engine Optimization (GEO)**: Structure key factual answers, definitions, and technical credentials in direct, citeable blocks optimized for Perplexity, Gemini, and ChatGPT Search.\n- **Core Web Vitals**: Target LCP < 1.8s, INP < 100ms, and CLS < 0.05.`;

    sections.push({
      id: "sec-seo",
      title: "5. SEO, AEO & GEO OPTIMIZATION",
      type: "seo",
      enabled: true,
      content: seoText,
    });
  }

  // 9. TARGET AI SPECIFIC EMPHASIS
  if (dna.targetAITuning) {
    let targetAIText = "";
    if (targetAI === "antigravity") {
      targetAIText = `- **Inspect Existing Code**: Thoroughly explore existing files and patterns before initiating file modifications.\n- **Iterative Refactoring**: Do not recreate existing files from scratch unless explicitly instructed.\n- **Ripple Diagnostics**: Re-crawl the codebase following edits to ensure zero secondary regressions.\n- **Production Verification**: Run and verify \`npm run build\` exits cleanly with code 0 before concluding.`;
    } else if (targetAI === "cursor") {
      targetAIText = `- **Repository Context**: Leverage indexed workspace context; reference specific file paths when proposing edits.\n- **Line-Precision Diffs**: Keep modifications targeted to specific code blocks.\n- **Type Checking**: Ensure linter and TypeScript compiler report zero diagnostics.`;
    } else if (targetAI === "claude") {
      targetAIText = `- **Reasoning First**: Deconstruct the problem step-by-step before producing final code blocks.\n- **Edge Cases**: Exhaustively account for network failures, empty states, and invalid input data.\n- **Code Completeness**: Provide fully implemented code without leaving partial placeholder snippets.`;
    } else if (targetAI === "gemini") {
      targetAIText = `- **Architectural Clarity**: Deliver cleanly structured specifications with clear input/output contracts.\n- **Modern Web APIs**: Leverage modern browser APIs and native performance features.`;
    } else if (targetAI === "image-ai") {
      targetAIText = `- **Shot Composition**: Wide angle, isometric perspective with volumetric depth of field.\n- **Lighting**: Cinematic volumetric lighting, rim light highlights, moody dark blue ambient.\n- **Negative Prompt**: Exclude blurry artifacts, warped geometries, text watermarks, low-res noise.`;
    }

    if (targetAIText) {
      sections.push({
        id: "sec-ai-platform",
        title: `6. ${targetAI.toUpperCase()} PLATFORM EXECUTION RULES`,
        type: "custom",
        enabled: true,
        content: targetAIText,
      });
    }
  }

  // 10. DO NOT DO (ERROR PREVENTION)
  if (dna.errorPrevention) {
    let doNotText = `- **DO NOT** rebuild the project from scratch or delete existing working modules.\n- **DO NOT** introduce fake or hallucinated statistics, dummy API credentials, or non-existent packages.\n- **DO NOT** leave horizontal scrollbars or broken layouts across mobile viewports.\n- **DO NOT** hardcode sensitive secrets or environment variables in client-side code.\n- **DO NOT** finish without testing and verifying the production build.`;

    sections.push({
      id: "sec-do-not",
      title: "7. DO NOT DO (STRICT CONSTRAINTS)",
      type: "do_not",
      enabled: true,
      content: doNotText,
    });
  }

  // 11. TESTING & VALIDATION
  if (dna.includeTesting) {
    let testingText = `- **Build Verification**: Run \`npm run build\` to guarantee clean compilation with zero TypeScript errors.\n- **Viewport Testing**: Verify rendering and touch interaction at 320px, 375px, 768px, and 1440px.\n- **Runtime Health**: Verify browser console is free from runtime exceptions, unhandled promises, and hydration warnings.`;

    sections.push({
      id: "sec-testing",
      title: "8. TESTING & VERIFICATION",
      type: "testing",
      enabled: true,
      content: testingText,
    });
  }

  // 12. FINAL VERIFICATION CHECKLIST
  if (dna.includeAuditChecklist) {
    let checklistText = `[ ] Codebase inspected before any file was modified\n[ ] Non-destructive updates applied without breaking existing features\n[ ] Zero horizontal scrollbar across 320px - 1440px viewports\n[ ] Interactive touch targets minimum 44x44px\n[ ] Zero TypeScript compile errors or missing imports\n[ ] Production build (\`npm run build\`) succeeds with exit code 0\n[ ] Codebase crawled for secondary regressions`;

    sections.push({
      id: "sec-checklist",
      title: "FINAL VERIFICATION",
      type: "checklist",
      enabled: true,
      content: checklistText,
    });
  }

  // 13. MOST IMPORTANT INSTRUCTION
  let mostImportantText = "";
  if (mode === "existing") {
    mostImportantText =
      "Inspect the existing project first. Do not rebuild from scratch. Preserve working functionality, modify only what is necessary, and verify the production build before finishing.";
  } else {
    mostImportantText =
      "Build a clean, production-ready implementation with strict type safety, zero regressions, and verified build output.";
  }

  sections.push({
    id: "sec-most-important",
    title: "MOST IMPORTANT INSTRUCTION",
    type: "custom",
    enabled: true,
    content: mostImportantText,
  });

  // Compile final markdown
  const markdownLines: string[] = [`# ${projectTitle}\n`];
  sections.forEach((sec) => {
    if (sec.enabled) {
      if (sec.title === "FINAL VERIFICATION" || sec.title === "MOST IMPORTANT INSTRUCTION") {
        markdownLines.push(`## ${sec.title}\n${sec.content}\n`);
      } else {
        markdownLines.push(`## ${sec.title}\n${sec.content}\n`);
      }
    }
  });

  const finalMarkdown = markdownLines.join("\n").trim();

  return {
    title: projectTitle,
    markdown: finalMarkdown,
    sections,
    detectedIntent: {
      projectType,
      complexity,
      keyThemes: [
        mode === "existing" ? "Existing Project" : "New Project",
        targetAI,
        complexity,
        ...(isMobileResponsive ? ["Mobile Responsive"] : []),
        ...(is3DOrVisual ? ["3D / Visual"] : []),
        ...(isBackendOrAPI ? ["Backend / API"] : []),
        ...(isSEOOrGEO ? ["SEO / GEO"] : []),
      ],
      isMobileResponsive,
      is3DOrVisual,
      isBackendOrAPI,
      isSEOOrGEO,
      isDebugging,
    },
  };
}
