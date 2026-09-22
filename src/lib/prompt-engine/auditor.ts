import { PromptAuditResult, PromptAuditDimension } from "./types";

/**
 * Performs an in-depth, transparent audit of a prompt across 8 core dimensions.
 * Avoids pseudo-scientific fake percentage scores; instead delivers clear qualitative
 * ratings ("High", "Medium", "Needs Improvement") paired with concrete observations.
 */
export function auditPrompt(prompt: string): PromptAuditResult {
  const trimmed = prompt.trim();
  const lower = trimmed.toLowerCase();

  const dimensions: PromptAuditDimension[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const actionableFixes: string[] = [];
  const detectedSections: string[] = [];
  const missingCrucialSections: string[] = [];

  // Detect present sections
  const sectionKeywords = [
    { label: "Role / Persona", regex: /role|you are|persona/i },
    { label: "Project Context", regex: /context|existing|codebase|background/i },
    { label: "Objective", regex: /objective|goal|purpose|target/i },
    { label: "Requirements", regex: /requirements|features|deliverable/i },
    { label: "Design / UI", regex: /design|ui|ux|color|typography|layout/i },
    { label: "Technical Specs", regex: /technical|architecture|typescript|api|component/i },
    { label: "Responsiveness", regex: /responsive|mobile|viewport|overflow|320px/i },
    { label: "Constraints / Guardrails", regex: /do not|constraints|avoid|prohibit/i },
    { label: "Testing / Verification", regex: /testing|verify|validation|npm run build/i },
    { label: "Final Checklist", regex: /\[\s*\]|checklist|verification/i },
  ];

  sectionKeywords.forEach((sec) => {
    if (sec.regex.test(trimmed)) {
      detectedSections.push(sec.label);
    } else {
      missingCrucialSections.push(sec.label);
    }
  });

  // Dimension 1: Clarity
  const clarityWordCount = trimmed.split(/\s+/).length;
  if (clarityWordCount < 30) {
    dimensions.push({
      name: "Clarity",
      rating: "Needs Improvement",
      summary: "Under-specified directive with high potential for AI hallucination or guesswork.",
      details: ["Input is under 30 words.", "Lacks clear scope or definitions of done."],
    });
    weaknesses.push("Ambiguous directives allow the AI to guess architectural details.");
    actionableFixes.push("Define the exact scope, user journey, and expected outputs.");
  } else if (clarityWordCount < 100) {
    dimensions.push({
      name: "Clarity",
      rating: "Medium",
      summary: "Intent is understandable, but lacks operational precision.",
      details: ["Core objective is identifiable.", "Secondary states are unstated."],
    });
  } else {
    dimensions.push({
      name: "Clarity",
      rating: "High",
      summary: "Clear, descriptive statements communicating explicit goals.",
      details: ["Well-articulated purpose.", "Low room for ambiguity."],
    });
    strengths.push("Unambiguous statement of project objectives.");
  }

  // Dimension 2: Context
  if (lower.includes("existing") || lower.includes("context") || lower.includes("stack") || lower.includes("codebase")) {
    dimensions.push({
      name: "Context",
      rating: "High",
      summary: "Establishes codebase environment, tech stack, and state.",
      details: ["Informs the AI whether to build greenfield or modify existing code.", "States tech stack or libraries."],
    });
    strengths.push("Context-aware: explicit guidance on existing project boundaries.");
  } else {
    dimensions.push({
      name: "Context",
      rating: "Needs Improvement",
      summary: "Missing environmental context; the AI cannot distinguish existing code from a blank canvas.",
      details: ["No existing file paths, installed libraries, or framework specified."],
    });
    weaknesses.push("Missing project context risks destructive file overwrites.");
    actionableFixes.push("Add a ## PROJECT CONTEXT section specifying frameworks, files, and existing behaviors.");
  }

  // Dimension 3: Specificity
  const hasSpecifics =
    lower.includes("px") ||
    lower.includes("typescript") ||
    lower.includes("component") ||
    lower.includes("interface") ||
    lower.includes("css") ||
    lower.includes("route");
  if (hasSpecifics) {
    dimensions.push({
      name: "Specificity",
      rating: "High",
      summary: "Includes concrete engineering specifications rather than vague wishes.",
      details: ["Identifies concrete technologies or measurements."],
    });
    strengths.push("Includes exact technical terms and measurable constraints.");
  } else {
    dimensions.push({
      name: "Specificity",
      rating: "Medium",
      summary: "Relies primarily on generic adjectives ('good', 'clean', 'modern') without technical parameters.",
      details: ["Lacks exact data types, dimensions, or API contracts."],
    });
    weaknesses.push("Vague descriptions may yield generic boilerplate.");
    actionableFixes.push("Replace qualitative wishes with concrete technical requirements.");
  }

  // Dimension 4: Structure
  const hasHeadings = (prompt.match(/^#{1,4}\s/gm) || []).length;
  if (hasHeadings >= 4) {
    dimensions.push({
      name: "Structure",
      rating: "High",
      summary: "Superb hierarchical structure with distinct numbered/headed sections.",
      details: [`Found ${hasHeadings} clear markdown headings.`, "Organized for step-by-step parsing."],
    });
    strengths.push("Rigid hierarchical headings guide AI attention sequentially.");
  } else if (hasHeadings >= 1) {
    dimensions.push({
      name: "Structure",
      rating: "Medium",
      summary: "Partial structure with few sections.",
      details: ["Contains basic headings but could benefit from numbered milestone sections."],
    });
  } else {
    dimensions.push({
      name: "Structure",
      rating: "Needs Improvement",
      summary: "Wall of text without headings or numbered milestones.",
      details: ["No markdown headings detected.", "High risk of AI skipping critical requirements."],
    });
    weaknesses.push("Unstructured text increases risk of instruction skipping.");
    actionableFixes.push("Divide prompt into numbered sections: Role, Context, Core Requirements, Constraints, Verification.");
  }

  // Dimension 5: Technical Completeness
  if (
    lower.includes("architecture") ||
    lower.includes("type") ||
    lower.includes("api") ||
    lower.includes("state") ||
    lower.includes("performance")
  ) {
    dimensions.push({
      name: "Technical Completeness",
      rating: "High",
      summary: "Covers crucial technical dimensions like architecture, types, and performance.",
      details: ["Addresses data models, performance, or system contracts."],
    });
    strengths.push("Technically comprehensive: accounts for runtime architecture and types.");
  } else {
    dimensions.push({
      name: "Technical Completeness",
      rating: "Medium",
      summary: "Focuses on surface features without specifying architecture, types, or state management.",
      details: ["Omitted typing rules and error-handling strategies."],
    });
    actionableFixes.push("Specify TypeScript conventions, error handling, and performance budgets.");
  }

  // Dimension 6: Constraints
  if (lower.includes("do not") || lower.includes("must not") || lower.includes("constraint") || lower.includes("avoid")) {
    dimensions.push({
      name: "Constraints",
      rating: "High",
      summary: "Defines negative constraints preventing unwanted AI actions.",
      details: ["Clear boundaries on what not to touch or build."],
    });
    strengths.push("Negative guardrails prevent hallucinations and code bloat.");
  } else {
    dimensions.push({
      name: "Constraints",
      rating: "Needs Improvement",
      summary: "Zero negative constraints detected; model may introduce unwanted dependencies or fake data.",
      details: ["No 'DO NOT' instructions found."],
    });
    weaknesses.push("Absence of negative constraints leaves room for hallucinated libraries.");
    actionableFixes.push("Add a 'DO NOT DO' section forbidding fake stats, broken imports, and destructive rewrites.");
  }

  // Dimension 7: Testability
  if (lower.includes("test") || lower.includes("build") || lower.includes("verify") || lower.includes("check")) {
    dimensions.push({
      name: "Testability",
      rating: "High",
      summary: "Specifies verification steps (build exit code, tests, or responsive checks).",
      details: ["Mentions build commands or verification checklists."],
    });
    strengths.push("Testable: gives the AI an objective test command (e.g. `npm run build`).");
  } else {
    dimensions.push({
      name: "Testability",
      rating: "Needs Improvement",
      summary: "No verification commands provided; cannot determine programmatic success.",
      details: ["Lacks `npm run build` or automated test commands."],
    });
    weaknesses.push("Missing testing commands prevents the AI from self-validating its work.");
    actionableFixes.push("Specify build commands (e.g., `npm run build`) and test expectations.");
  }

  // Dimension 8: AI Compatibility
  if (hasHeadings >= 3 && lower.includes("role") && (lower.includes("objective") || lower.includes("instruction"))) {
    dimensions.push({
      name: "AI Compatibility",
      rating: "High",
      summary: "Optimized for LLM attention allocation and systematic execution.",
      details: ["Clear system persona, unambiguous objective, and clean markdown framing."],
    });
    strengths.push("High model compatibility: optimal token attention structure.");
  } else {
    dimensions.push({
      name: "AI Compatibility",
      rating: "Medium",
      summary: "Acceptable, but can be improved with clearer role definition and numbered execution steps.",
      details: ["Could benefit from explicit persona framing and priority ordering."],
    });
    actionableFixes.push("Frame the prompt with an expert ROLE and a clear MOST IMPORTANT INSTRUCTION at the end.");
  }

  // Overall summary
  const highCount = dimensions.filter((d) => d.rating === "High").length;
  let overallSummary = "";
  if (highCount >= 6) {
    overallSummary =
      "Excellent prompt engineering quality. The prompt exhibits high structural discipline, technical depth, and clear validation criteria.";
  } else if (highCount >= 3) {
    overallSummary =
      "Solid foundation with moderate engineering rigor. Adding explicit negative constraints and verification commands will elevate it to production grade.";
  } else {
    overallSummary =
      "Needs structural refinement. The prompt currently relies on loose conversational instructions rather than actionable software specifications.";
  }

  return {
    dimensions,
    overallSummary,
    strengths,
    weaknesses,
    actionableFixes,
    detectedSections,
    missingCrucialSections,
  };
}
