import { PromptImprovementResult } from "./types";

/**
 * Evaluates an existing prompt for engineering flaws (ambiguity, missing constraints,
 * absent testing, lack of technical specificity) and generates an improved, structured prompt.
 */
export function improvePrompt(rawPrompt: string): PromptImprovementResult {
  const trimmed = rawPrompt.trim();
  const lower = trimmed.toLowerCase();
  const issuesFound: string[] = [];
  const rationale: string[] = [];

  // Check 1: Length and Depth
  if (trimmed.length < 120) {
    issuesFound.push("Prompt is too brief, vague, or conversational for reliable production execution.");
    rationale.push("Expanded broad directives into explicit software engineering specifications.");
  }

  // Check 2: Structure
  const hasHeadings = /^#{1,3}\s/m.test(trimmed);
  const hasNumberedList = /^\d+\.\s/m.test(trimmed);
  if (!hasHeadings && !hasNumberedList) {
    issuesFound.push("Missing structured hierarchy (no numbered sections, clear headings, or milestones).");
    rationale.push("Restructured prompt into standard numbered engineering sections.");
  }

  // Check 3: Context & Existing Codebase
  if (!lower.includes("context") && !lower.includes("existing") && !lower.includes("inspect")) {
    issuesFound.push("Missing codebase context: Does not specify whether this is a greenfield or existing project.");
    rationale.push("Injected non-destructive inspection rules to protect existing code from being overwritten.");
  }

  // Check 4: Testing & Verification
  if (!lower.includes("test") && !lower.includes("verify") && !lower.includes("build") && !lower.includes("check")) {
    issuesFound.push("Missing testing and verification criteria (the AI will not know how to validate its output).");
    rationale.push("Added automated build checks (`npm run build`) and viewport testing matrices.");
  }

  // Check 5: Constraints / What NOT to do
  if (!lower.includes("do not") && !lower.includes("constraint") && !lower.includes("avoid")) {
    issuesFound.push("Missing negative constraints (DO NOT DO): Vulnerable to hallucinated libraries or fake data.");
    rationale.push("Added explicit guardrails forbidding fake credentials, hallucinated dependencies, or regressions.");
  }

  // Check 6: Responsiveness & Viewports
  if (
    (lower.includes("ui") || lower.includes("page") || lower.includes("app") || lower.includes("web") || lower.includes("design")) &&
    !lower.includes("responsive") &&
    !lower.includes("mobile") &&
    !lower.includes("viewport")
  ) {
    issuesFound.push("Missing mobile responsive benchmarks: Leaves open risks of horizontal overflow.");
    rationale.push("Injected viewport breakpoints from 320px to 1440px with zero-horizontal-overflow rules.");
  }

  // Check 7: Acceptance Checklist
  if (!lower.includes("[ ]") && !lower.includes("checklist")) {
    issuesFound.push("Missing final verification checklist for definitive acceptance.");
    rationale.push("Appended an actionable final verification checklist to conclude the prompt.");
  }

  // Default issue fallback if prompt was already fairly good
  if (issuesFound.length === 0) {
    issuesFound.push("Prompt can be strengthened with more explicit technical contracts and edge-case definitions.");
    rationale.push("Sharpened technical terminology and strengthened error boundaries.");
  }

  // Construct Improved Prompt
  let improvedPrompt = "";

  // Title extraction
  const firstLine = trimmed.split("\n")[0].replace(/^#+\s*/, "").replace(/[.!?]+$/, "");
  const title = firstLine.length > 50 ? "Engineered Implementation Specification" : firstLine;

  improvedPrompt = `# ${title.toUpperCase()} — ENHANCED IMPLEMENTATION SPECIFICATION

## ROLE
You are a Principal Software Engineer and Enterprise Solutions Architect. You produce robust, production-grade, type-safe solutions with zero regressions.

## PROJECT CONTEXT
You are working on an operational codebase. Before modifying or adding any code, inspect existing patterns, installed dependencies, and project conventions.

## OBJECTIVE
Deliver a comprehensive, bug-free implementation for the following requirements:
> ${trimmed.replace(/\n+/g, " ")}

## 1. CORE REQUIREMENTS & IMPLEMENTATION
- First inspect existing components and configurations to preserve architectural consistency.
- Maintain non-destructive development: do not rebuild from scratch or remove working functionality.
- Provide clean TypeScript interfaces with strict typing (no loose \`any\` types).
- Decompose complex logic into modular, readable subcomponents with clear prop contracts.

## 2. RESPONSIVENESS & UI INTEGRITY
- Test layouts across mobile (320px, 375px, 412px), tablet (768px, 1024px), and desktop (1440px).
- Guarantee ABSOLUTELY ZERO horizontal scrollbar (\`overflow-x: clip\` or strict container bounds).
- Ensure interactive targets meet the minimum 44x44px ergonomic touch standard.

## 3. ERROR HANDLING & EDGE CASES
- Wrap all async operations and API requests with structured error handling and graceful fallbacks.
- Prevent layout shifts (CLS) by reserving space for dynamically loaded content.
- Ensure proper unmount cleanup for event listeners, timers, and WebGL contexts.

## 4. STRICT CONSTRAINTS (DO NOT DO)
- DO NOT rewrite working project architecture from scratch.
- DO NOT use fake placeholder statistics, dummy keys, or non-existent external libraries.
- DO NOT ignore mobile viewport responsiveness or introduce overflow regressions.
- DO NOT consider the task finished without testing the production build.

## 5. TESTING & VERIFICATION
- Execute \`npm run build\` and ensure clean exit code 0 with zero TypeScript or linter errors.
- Verify browser console output is completely free of runtime errors and hydration warnings.
- Perform a complete user flow smoke test across desktop and mobile.

## FINAL VERIFICATION
[ ] Existing codebase inspected and architecture respected
[ ] Non-destructive edits applied without breaking existing features
[ ] Zero horizontal scrollbar across 320px - 1440px
[ ] All TypeScript types explicitly defined
[ ] Production build compiles with code 0
[ ] No console errors or unresolved promises

## MOST IMPORTANT INSTRUCTION
Inspect first, preserve existing working functionality, and verify the production build before finishing.`;

  return {
    original: rawPrompt,
    issuesFound,
    improvedPrompt,
    rationale,
  };
}
