import { VisualSection } from "./types";

export interface RefinementAction {
  type: "modify_section" | "add_section" | "remove_section" | "general_polish";
  sectionTarget?: string;
  instruction: string;
}

/**
 * Parses user conversational refinement instructions (e.g. "Add Supabase",
 * "Make animation 3D Three.js", "Remove auth system", "Make mobile test stricter")
 * and applies surgical modifications to the current prompt and its sections.
 */
export function refinePromptSections(
  currentSections: VisualSection[],
  currentMarkdown: string,
  userInstruction: string
): { updatedMarkdown: string; updatedSections: VisualSection[]; summaryOfChange: string } {
  const instructionLower = userInstruction.toLowerCase();
  const updatedSections = currentSections.map((sec) => ({ ...sec }));
  let summaryOfChange = "";

  // Scenario A: Add Supabase or Backend / Database
  if (instructionLower.includes("supabase") || instructionLower.includes("database") || instructionLower.includes("postgres")) {
    const existingBackend = updatedSections.find((s) => s.type === "backend" || s.type === "database");
    const supabaseDetails = `- **Database & Auth (Supabase)**: Connect via Supabase JavaScript Client with RLS (Row Level Security) enabled on all public tables.\n- **Authentication**: Leverage Supabase Auth helpers with protected server session cookies.\n- **Environment**: Read NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY safely from process.env; never leak service keys in client bundles.`;

    if (existingBackend) {
      existingBackend.content = `${existingBackend.content}\n${supabaseDetails}`;
      existingBackend.enabled = true;
    } else {
      updatedSections.push({
        id: `sec-supabase-${Date.now()}`,
        title: "DATABASE & AUTH (SUPABASE)",
        type: "database",
        enabled: true,
        content: supabaseDetails,
      });
    }
    summaryOfChange = "Injected Supabase database, RLS policies, and secure authentication architecture.";
  }

  // Scenario B: Animation / 3D / Visual polish
  else if (
    instructionLower.includes("animation") ||
    instructionLower.includes("motion") ||
    instructionLower.includes("3d") ||
    instructionLower.includes("three")
  ) {
    const animSection = updatedSections.find((s) => s.type === "animation" || s.type === "three_d" || s.type === "ui");
    const motionUpgrade = `- **Advanced Motion Choreography**: Integrate Framer Motion with physics-based spring transitions (stiffness: 260, damping: 20).\n- **3D Interactive Scene**: Render a lightweight Three.js / React Three Fiber interactive particle universe with dynamic viewport scaling (DPR clamped to 2.0).\n- **Accessibility**: Strictly honor \`prefers-reduced-motion\` media queries to prevent motion sickness.`;

    if (animSection) {
      animSection.content = `${animSection.content}\n${motionUpgrade}`;
      animSection.enabled = true;
    } else {
      updatedSections.push({
        id: `sec-motion-${Date.now()}`,
        title: "ADVANCED ANIMATION & 3D WEBGL",
        type: "animation",
        enabled: true,
        content: motionUpgrade,
      });
    }
    summaryOfChange = "Upgraded animation specifications with Framer Motion spring curves and 3D WebGL guidelines.";
  }

  // Scenario C: Remove auth / login / system
  else if (
    instructionLower.includes("remove") &&
    (instructionLower.includes("auth") || instructionLower.includes("login") || instructionLower.includes("user"))
  ) {
    const authIndex = updatedSections.findIndex((s) => s.type === "auth" || s.title.toLowerCase().includes("auth"));
    if (authIndex !== -1) {
      updatedSections.splice(authIndex, 1);
    }
    // Also clean up references in requirements
    const reqSec = updatedSections.find((s) => s.type === "requirements");
    if (reqSec) {
      reqSec.content = reqSec.content
        .split("\n")
        .filter((line) => !line.toLowerCase().includes("auth") && !line.toLowerCase().includes("login"))
        .join("\n");
    }
    summaryOfChange = "Removed authentication, user session, and login system requirements.";
  }

  // Scenario D: SEO / GEO / AEO
  else if (instructionLower.includes("seo") || instructionLower.includes("geo") || instructionLower.includes("aeo")) {
    const seoSec = updatedSections.find((s) => s.type === "seo");
    const seoEnhancement = `- **Advanced Generative Engine Optimization (GEO)**: Format key technical claims into citeable fact cards optimized for AI answer extraction (Perplexity, ChatGPT Search, Gemini).\n- **Rich Snippets**: Full Schema.org JSON-LD for Person, WebSite, FAQPage, and Article entities.\n- **Performance**: Zero Cumulative Layout Shift (CLS < 0.02) and INP < 100ms.`;

    if (seoSec) {
      seoSec.content = `${seoSec.content}\n${seoEnhancement}`;
      seoSec.enabled = true;
    } else {
      updatedSections.push({
        id: `sec-seo-${Date.now()}`,
        title: "ADVANCED SEO, AEO & GEO DOMINANCE",
        type: "seo",
        enabled: true,
        content: seoEnhancement,
      });
    }
    summaryOfChange = "Enhanced Generative Engine Optimization (GEO), structured data, and Core Web Vitals.";
  }

  // Scenario E: Stricter testing / validation
  else if (instructionLower.includes("test") || instructionLower.includes("verification") || instructionLower.includes("strict")) {
    const testSec = updatedSections.find((s) => s.type === "testing");
    const testEnhancement = `- **Exhaustive Automated Verification**: Execute \`npm run build\` and verify zero TypeScript or Next.js build errors.\n- **Console Audit**: Ensure clean browser console without any warnings, hydration errors, or failed network requests.\n- **Multi-Viewport Visual Audit**: Verify across 320px, 375px, 768px, 1024px, and 1440px with zero horizontal scroll.`;

    if (testSec) {
      testSec.content = `${testSec.content}\n${testEnhancement}`;
      testSec.enabled = true;
    }
    summaryOfChange = "Tightened testing criteria with strict multi-viewport checks and zero-console-warning mandates.";
  }

  // Scenario F: Generic refinement / user custom tweak
  else {
    // Append user modification to Requirements or add as targeted instruction
    const reqSec = updatedSections.find((s) => s.type === "requirements");
    if (reqSec) {
      reqSec.content = `${reqSec.content}\n- **Refinement Update**: ${userInstruction.trim()}`;
    } else {
      updatedSections.push({
        id: `sec-refinement-${Date.now()}`,
        title: "REFINED INSTRUCTION",
        type: "custom",
        enabled: true,
        content: `- ${userInstruction.trim()}`,
      });
    }
    summaryOfChange = `Applied refinement: "${userInstruction.trim()}"`;
  }

  // Re-assemble markdown
  const markdownLines: string[] = [];
  const titleMatch = currentMarkdown.match(/^#\s+[^\n]+/);
  if (titleMatch) {
    markdownLines.push(titleMatch[0] + "\n");
  } else {
    markdownLines.push("# REFINED AI SPECIFICATION\n");
  }

  updatedSections.forEach((sec) => {
    if (sec.enabled) {
      markdownLines.push(`## ${sec.title}\n${sec.content}\n`);
    }
  });

  return {
    updatedMarkdown: markdownLines.join("\n").trim(),
    updatedSections,
    summaryOfChange,
  };
}
