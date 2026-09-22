import { VisualSection, SavedPrompt } from "./types";

export interface LibraryTemplate {
  id: string;
  title: string;
  category: "Development" | "Design" | "SEO" | "Marketing" | "AI";
  subcategory: string;
  targetAI: "antigravity" | "claude" | "gemini" | "chatgpt" | "cursor" | "lovable" | "bolt" | "replit" | "windsurf" | "v0" | "image-ai" | "generic";
  description: string;
  prompt: string;
  tags: string[];
}

export const AVAILABLE_SECTION_DEFS: {
  type: VisualSection["type"];
  title: string;
  description: string;
  defaultTemplate: string;
}[] = [
  {
    type: "role",
    title: "ROLE",
    description: "Define the persona, seniority, and specialization of the AI model.",
    defaultTemplate: "You are a world-class principal software engineer, enterprise solutions architect, and UI/UX artisan with deep mastery in modern web standards, performance optimization, and clean architecture.",
  },
  {
    type: "context",
    title: "PROJECT CONTEXT",
    description: "Describe the existing project background, active tech stack, and state.",
    defaultTemplate: "The project is an existing high-performance application built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Framer Motion. It is already partially operational in production.",
  },
  {
    type: "objective",
    title: "OBJECTIVE",
    description: "Crisp, unambiguous goal definition stating exactly what must be achieved.",
    defaultTemplate: "Achieve complete end-to-end implementation of the requested features, resolve all runtime and build errors, and ensure visual perfection across all breakpoints without breaking existing functionality.",
  },
  {
    type: "requirements",
    title: "1. CORE REQUIREMENTS",
    description: "Primary functional mandates and essential deliverables.",
    defaultTemplate: "- Audit existing files and dependencies prior to modifying code.\n- Implement high-quality component modularity with clean prop interfaces.\n- Ensure resilient error boundaries and smooth fallback UI states.\n- Preserve existing working data pipelines and routing logic.",
  },
  {
    type: "ui",
    title: "2. DESIGN SYSTEM & UI",
    description: "Visual aesthetics, color tokens, typography, borders, and glassmorphic cards.",
    defaultTemplate: "- Color Palette: Deep dark background (#050816) with Electric Blue (#3b82f6) primary accents, Cyber Cyan (#38bdf8), and Crimson Red (#ef4444) highlights.\n- Typography: Inter for body, Outfit for display headings, JetBrains Mono for metrics and code.\n- Visual Language: Translucent glass cards (backdrop-blur-md), micro-glow borders, and disciplined visual hierarchy without overwhelming neon clutter.",
  },
  {
    type: "ux",
    title: "3. USER EXPERIENCE & INTERACTIONS",
    description: "Interaction states, focus indicators, tactile feedback, and transitions.",
    defaultTemplate: "- Interactive states: Subtly animated hover glows, active button presses, and keyboard navigation indicators.\n- Loading States: Skeleton loaders for all async operations with shimmer effects.\n- Feedback: Contextual toast notifications for user interactions with clear dismiss controls.",
  },
  {
    type: "animation",
    title: "ANIMATION & MOTION",
    description: "Framer Motion curves, stagger choreography, and 60fps performance budgets.",
    defaultTemplate: "- Use spring physics with gentle damping (damping: 25, stiffness: 200).\n- Stagger child animations by 0.08s for smooth reveal choreography.\n- Honor `prefers-reduced-motion` media queries with immediate fallbacks.\n- Hardware-accelerate transforms (`translate3d`, `scale`, `opacity`) to eliminate paint recalculations.",
  },
  {
    type: "three_d",
    title: "3D VISUALS & WEBGL",
    description: "Three.js / React Three Fiber scene controls, camera, shaders, and frame optimization.",
    defaultTemplate: "- Render Three.js / R3F canvases with dynamic pixel ratio capped at Math.min(window.devicePixelRatio, 2).\n- Implement frustum culling and dispose geometries / materials on unmount to prevent WebGL context loss and memory leaks.\n- Ensure canvas containers have explicit CSS aspect ratios and touch-action: pan-y.",
  },
  {
    type: "backend",
    title: "4. BACKEND & ARCHITECTURE",
    description: "Server architecture, server actions, route handlers, and data mutations.",
    defaultTemplate: "- Server-side handlers must use standard Next.js App Router route handlers with strict request validation.\n- Sanitize all inbound parameters with Zod schemas.\n- Implement structured JSON responses with explicit HTTP status codes (200, 400, 401, 404, 500).",
  },
  {
    type: "database",
    title: "DATABASE & STATE MANAGEMENT",
    description: "Data schemas, migrations, caching, indexes, and optimistic updates.",
    defaultTemplate: "- Design normalized schemas with foreign key relationships and index critical query fields.\n- Implement atomic transactions for operations affecting multiple tables.\n- Use optimistic client-side UI updates with rollback on mutation failure.",
  },
  {
    type: "api",
    title: "API INTEGRATIONS",
    description: "Third-party APIs, webhooks, rate limiting, and timeout resilience.",
    defaultTemplate: "- Wrap external API calls in try-catch with 8000ms AbortController timeout.\n- Centralize error logging and sanitize outbound request payloads.\n- Never hardcode API keys or secret tokens; read exclusively from process.env.",
  },
  {
    type: "auth",
    title: "AUTHENTICATION & ACCESS CONTROL",
    description: "Sessions, tokens, RBAC roles, protected middleware, and CSRF defense.",
    defaultTemplate: "- Implement secure httpOnly cookie session management or signed JWTs.\n- Guard administrative routes with server-side middleware checking role authorizations.\n- Prevent brute-force attempts with rate-limiting buckets on login and auth endpoints.",
  },
  {
    type: "seo",
    title: "5. SEO, AEO & GEO OPTIMIZATION",
    description: "Search Engine Optimization, Answer Engine Optimization, and Generative Engine Optimization.",
    defaultTemplate: "- Comprehensive JSON-LD structured data (Person, WebSite, Article, Organization, BreadcrumbList).\n- Canonical URLs, Open Graph images (1200x630), Twitter Cards, and dynamic XML sitemap.\n- Optimize content structure for AI answer engines (Perplexity, ChatGPT Search, Gemini): concise summary lead-ins, definition lists, and factual entity schemas.",
  },
  {
    type: "performance",
    title: "6. PERFORMANCE & CORE WEB VITALS",
    description: "LCP, FID/INP, CLS optimization, bundle splitting, and image formats.",
    defaultTemplate: "- LCP < 1.8s, INP < 100ms, CLS < 0.05 across all audit runs.\n- Next.js Image component (`next/image`) with modern WebP/AVIF formats, priority flags on above-the-fold assets, and explicit dimensions.\n- Code-split heavy components (e.g. 3D canvas, rich text editors) using `next/dynamic` with SSR disabled.",
  },
  {
    type: "responsiveness",
    title: "7. RESPONSIVE DESIGN & VIEWPORTS",
    description: "Viewport breakpoints, mobile ergonomics, touch targets, and layout safety.",
    defaultTemplate: "Audit the entire interface across all real-world screen widths:\n- Mobile: 320px, 360px, 375px, 390px, 412px, 430px\n- Tablet: 768px, 834px, 1024px\n- Desktop: 1280px, 1440px, 1920px\nEnsure:\n- Absolutely ZERO horizontal scrollbar (`overflow-x: clip` or proper max-width constraints).\n- Touch targets are minimum 44x44px with comfortable padding.\n- Typography scales gracefully via clamp() or fluid Tailwind utility scales.",
  },
  {
    type: "accessibility",
    title: "8. ACCESSIBILITY (A11Y WCAG 2.1 AA)",
    description: "ARIA roles, keyboard trap prevention, contrast ratios, and screen reader labels.",
    defaultTemplate: "- WCAG 2.1 AA compliant color contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text).\n- Visible focus rings (`focus-visible:ring-2 focus-visible:ring-brand-blue`).\n- Explicit `aria-label`, `aria-expanded`, and `aria-hidden` attributes for modal dialogs, drawers, and icon-only buttons.\n- Fully traversable via Tab, Enter, Space, and Escape keyboard events.",
  },
  {
    type: "security",
    title: "9. SECURITY & SANITIZATION",
    description: "XSS prevention, CSP headers, input hygiene, and secrets insulation.",
    defaultTemplate: "- Sanitize all user-generated content and raw HTML before rendering.\n- Implement Content Security Policy (CSP) headers and disallow unsafe-inline scripts where possible.\n- Never leak internal server paths, database credentials, or secret keys to the client.",
  },
  {
    type: "constraints",
    title: "10. CONSTRAINTS & NON-DESTRUCTIVE RULES",
    description: "Inviolable operational boundaries and preservation rules.",
    defaultTemplate: "- First inspect the existing codebase thoroughly before altering files.\n- Do not rebuild from scratch; respect existing folder structures, conventions, and style tokens.\n- Modify only the files strictly required to accomplish the objective.\n- Preserve existing working functionality, routes, and data models.",
  },
  {
    type: "do_not",
    title: "11. DO NOT DO (ERROR PREVENTION)",
    description: "Explicit prohibitions to eliminate regressions and low-quality code.",
    defaultTemplate: "- DO NOT use fake placeholder statistics or hallucinated API endpoints.\n- DO NOT leave unfinished TODO stubs or broken import statements.\n- DO NOT hardcode secrets or private credentials anywhere in the code.\n- DO NOT introduce horizontal overflow or break mobile responsiveness.\n- DO NOT wipe out existing working components or change unrelated files.",
  },
  {
    type: "testing",
    title: "12. TESTING & VALIDATION",
    description: "Verification procedures, automated checks, and build validations.",
    defaultTemplate: "- Run full production build verification (`npm run build`) to ensure zero TypeScript errors or missing imports.\n- Perform end-to-end smoke test verifying key user journeys, modals, and forms.\n- Check browser console for zero runtime warnings, hydration mismatches, or WebGL context failures.\n- Crawl the modified files to ensure ripple changes are cleanly integrated.",
  },
  {
    type: "checklist",
    title: "FINAL VERIFICATION CHECKLIST",
    description: "Actionable markdown checkbox list for final acceptance.",
    defaultTemplate: "[ ] Codebase inspected before modification\n[ ] All core functional requirements implemented completely\n[ ] Zero horizontal scrollbar on mobile (320px - 430px)\n[ ] WCAG 2.1 AA accessible with visible keyboard focus rings\n[ ] Zero build errors (`npm run build` exits with code 0)\n[ ] Zero console runtime errors or hydration issues\n[ ] Non-destructive modification preserved existing features",
  },
];

export const BUILTIN_PROMPTS_LIBRARY: LibraryTemplate[] = [
  {
    id: "lib-antigravity-fix",
    title: "Antigravity Final Fix & Premium UI Refinement Prompt",
    category: "Development",
    subcategory: "Next.js / UI Polish",
    targetAI: "antigravity",
    description: "The gold-standard prompt for deep debugging, non-destructive UI refinements, and production build verification.",
    tags: ["antigravity", "refinement", "non-destructive", "nextjs", "production-ready"],
    prompt: `# PROJECT TITLE: Antigravity Final Fix & Premium UI Refinement

## ROLE
You are an expert full-stack engineer and UI/UX artisan specializing in high-performance Next.js 14, Tailwind CSS, TypeScript, and modern 3D WebGL applications.

## CONTEXT
You are working on an existing production-grade Next.js portfolio application. The project already has functioning components, a dark aesthetic with Blue (#3b82f6), Cyan (#38bdf8), and Red (#ef4444) accents, and live features.

## OBJECTIVE
Perform a comprehensive audit and precision refinement pass across the application. Fix all visual inconsistencies, resolve all responsive overflow glitches, and ensure the production build passes with zero errors without rebuilding working code from scratch.

## 1. CORE REQUIREMENTS
- Inspect the existing codebase thoroughly before writing or altering any file.
- Understand the existing component architecture, folder conventions, and style tokens.
- Apply non-destructive updates: preserve all working features, data bindings, and layouts.
- Re-crawl the codebase after completing changes to fix any ripple regressions.

## 2. DESIGN & VISUAL POLISH
- Maintain the signature dark aesthetic (#050816) with subtle glowing accents.
- Refine typography hierarchy using Inter for body, Outfit for headings, and JetBrains Mono for metrics.
- Ensure consistent glassmorphism with backdrop-blur-md and delicate 1px border glows.
- Ensure all interactive elements have responsive micro-animations on hover and focus.

## 3. RESPONSIVENESS & OVERFLOW AUDIT
- Test the viewport layout across all mobile breakpoints: 320px, 360px, 375px, 390px, 412px, 430px, 768px, 1024px, 1280px, 1440px.
- Eliminate ANY horizontal scrollbar. All root containers must fit cleanly within 100vw.
- Verify mobile navigation drawer, modal dialogs, and cards fit comfortably without clipping.

## 4. TECHNICAL IMPLEMENTATION & PERFORMANCE
- Fix any TypeScript type mismatches, missing imports, or unused parameters.
- Ensure all dynamic client imports are properly configured to prevent SSR hydration errors.
- Verify performance budget: zero unnecessary re-renders, clean unmount cleanup on timers/canvases.

## 5. DO NOT DO
- DO NOT rebuild the project or replace existing working sections with generic templates.
- DO NOT break existing state management, route endpoints, or blog storage.
- DO NOT introduce fake statistics, dummy API keys, or hallucinated libraries.
- DO NOT leave unhandled promise rejections or console warning spam.

## 6. TESTING & VALIDATION
- Execute a full production build (\`npm run build\`) and verify it exits cleanly with code 0.
- Verify that every route renders without runtime exceptions.
- Ensure browser console has zero hydration errors.

## FINAL VERIFICATION
[ ] Existing codebase inspected first
[ ] Non-destructive edits applied cleanly
[ ] Zero horizontal scrollbar across 320px - 1440px
[ ] All interactive elements accessible via keyboard
[ ] Production build passes with exit code 0
[ ] Codebase crawled for secondary regressions

## MOST IMPORTANT INSTRUCTION
Do not rebuild from scratch. Preserve working functionality and verify the production build before finishing.`,
  },
  {
    id: "lib-antigravity-update-portfolio",
    title: "Antigravity Update Existing Portfolio Prompt",
    category: "Development",
    subcategory: "Portfolio / Feature Expansion",
    targetAI: "antigravity",
    description: "Iterative feature addition and architectural enhancements for existing portfolios.",
    tags: ["antigravity", "feature-addition", "portfolio", "existing-project"],
    prompt: `# PROJECT TITLE: Antigravity Update Existing Portfolio

## ROLE
You are an expert Next.js and frontend systems developer working as a trusted pair programmer.

## PROJECT CONTEXT
The user has an existing operational portfolio built with Next.js App Router, React 18, Tailwind CSS, TypeScript, and Three.js. The portfolio showcases technical expertise, live tools, and case studies.

## OBJECTIVE
Seamlessly integrate the requested new capabilities into the existing portfolio architecture while maintaining visual harmony, performance benchmarks, and code cleanliness.

## 1. CORE REQUIREMENTS
- First inspect the existing project structure in \`src/\` including components, data files, and styles.
- Identify the exact files that need modification and where the new feature naturally integrates.
- Integrate the feature without altering unrelated components or degrading existing page speed.

## 2. DESIGN HARMONY
- Match the existing color scheme: deep dark background (#050816), Electric Blue accents, and subtle Red/Cyan highlights.
- Reuse existing button components, modals, and container wrappers for visual consistency.
- Maintain fluid typography and responsive grid systems.

## 3. TECHNICAL IMPLEMENTATION
- Write type-safe TypeScript code with explicit interfaces for all props and data contracts.
- Follow existing file conventions (client components marked with "use client" only when interactive).
- Avoid adding heavy third-party npm packages when native code or existing libraries suffice.

## 4. NON-DESTRUCTIVE CONSTRAINTS
- DO NOT delete or overwrite existing sections unless explicitly requested.
- DO NOT alter existing environment configurations, analytics, or SEO metadata.
- Preserve backward compatibility for any shared utilities.

## 5. TESTING & VERIFICATION
- Test navigation between the home page, internal routes, and the new feature.
- Verify responsive layout on mobile (375px) and desktop (1440px).
- Verify build success with \`npm run build\`.

## FINAL VERIFICATION
[ ] Existing folder structure and conventions honored
[ ] New feature integrated without breaking existing features
[ ] Mobile layout fully responsive with zero overflow
[ ] Full \`npm run build\` executed and verified clean

## MOST IMPORTANT INSTRUCTION
Inspect first, modify only what is necessary, and test thoroughly.`,
  },
  {
    id: "lib-3d-seo-portfolio",
    title: "3D High-Conversion SEO Portfolio Specification",
    category: "Design",
    subcategory: "3D Web / Portfolio",
    targetAI: "antigravity",
    description: "Engineering prompt for a cutting-edge 3D interactive portfolio tailored for SEO & Digital Marketing leaders.",
    tags: ["3d", "seo", "threejs", "portfolio", "geo", "aeo"],
    prompt: `# PROJECT TITLE: 3D High-Conversion SEO Portfolio Specification

## ROLE
You are a master Creative Developer and Technical SEO Architect who blends WebGL visual storytelling with search engine dominance.

## PROJECT CONTEXT
Building or upgrading a developer portfolio for an SEO Executive specializing in Technical SEO, Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO).

## OBJECTIVE
Deliver a cinematic, interactive 3D web experience with sub-second load times, interactive search universe visualization, and structured data that wins Google and AI search citations.

## 1. CORE REQUIREMENTS
- Interactive 3D Search Universe canvas powered by Three.js / React Three Fiber.
- Live local clock displaying Nepal Time (+05:45) with real-time second updates.
- Deep technical showcases: Core Web Vitals audit dashboard, Keyword Architecture, and GEO case studies.
- Dynamic blog/insights engine with full Schema.org structured data.

## 2. DESIGN SYSTEM
- Theme: Dark cyber-command aesthetic. Background #050816, Electric Blue (#3b82f6) primary, Crimson Red (#ef4444) secondary, Cyber Cyan (#38bdf8).
- Typography: Inter for UI copy, Outfit for cinematic headers, JetBrains Mono for data counters.
- Visual elements: Translucent glassmorphism (surface-200/70), soft glowing halos, interactive particle constellations.

## 3. 3D WEBGL IMPLEMENTATION
- 3D galaxy / constellation node graph representing interconnected search entities (Keywords, Backlinks, Crawlers, AI Nodes).
- Dynamic DPR scaling capped at 2.0 to ensure 60fps on mobile devices.
- Fallback CSS canvas when WebGL is unavailable or user has reduced motion enabled.

## 4. SEO, GEO & AEO DOMINANCE
- Comprehensive Schema.org JSON-LD: Person, WebSite, ProfessionalService, and Article schemas.
- Complete OpenGraph and Twitter card integration with 1200x630 dynamic previews.
- Fast LCP (< 1.5s), zero Cumulative Layout Shift (CLS = 0.00), and INP < 100ms.

## 5. RESPONSIVENESS & ACCESSIBILITY
- Strict mobile testing at 320px, 375px, 390px, 412px, 768px, 1024px, 1440px.
- Zero horizontal overflow.
- WCAG 2.1 AA compliant color contrast and full keyboard navigation.

## 6. DO NOT DO
- DO NOT load multi-megabyte 3D GLTF models on initial mobile viewport.
- DO NOT use dummy fake SEO metrics; use authentic technical methodologies.
- DO NOT allow 3D canvas touch gestures to trap or freeze native mobile vertical scrolling.

## FINAL VERIFICATION
[ ] 3D canvas loads smoothly at 60fps with graceful mobile fallback
[ ] Live Nepal clock accurate and tick synchronizing every second
[ ] Zero horizontal scrollbar on any screen width
[ ] Schema.org structured data validated via Google Rich Results syntax
[ ] Production build compiles with zero errors

## MOST IMPORTANT INSTRUCTION
Deliver a stunning visual experience without compromising Core Web Vitals or mobile ergonomics.`,
  },
  {
    id: "lib-cursor-fullstack",
    title: "Cursor Full-Stack Next.js Feature Engineering",
    category: "Development",
    subcategory: "Next.js / Cursor Rules",
    targetAI: "cursor",
    description: "Multi-file implementation spec structured for Cursor Composer and Repository Context.",
    tags: ["cursor", "nextjs", "typescript", "architecture"],
    prompt: `# PROJECT TITLE: Full-Stack Feature Implementation

## ROLE
You are a Principal Software Engineer operating in Cursor with full repository indexing.

## REPOSITORY CONTEXT
- Framework: Next.js App Router (TypeScript)
- Styling: Tailwind CSS
- State/Data: Server Actions, React hooks, Zod validation
- Files to focus on:
  - \`src/lib/api/\`
  - \`src/components/features/\`
  - \`src/types/\`

## OBJECTIVE
Implement the requested feature end-to-end with typed data contracts, resilient error boundaries, and unit tests.

## 1. ARCHITECTURAL INSTRUCTIONS
- Define all TypeScript types and interfaces in \`src/types/\` before building components.
- Implement server-side business logic with strict Zod schema validation.
- Create modular React components under 150 lines per file; decompose complex sub-views.

## 2. CODE CONVENTIONS
- Use named exports rather than default exports for non-page modules.
- Ensure all async operations have explicit error boundaries and fallback states.
- Follow functional programming paradigms with immutable state updates.

## 3. TESTING REQUIREMENTS
- Write unit tests covering edge cases, null inputs, and network failures.
- Verify test coverage across newly introduced utility functions.

## FINAL VERIFICATION
[ ] Types defined and exported in dedicated types file
[ ] Server actions validated with Zod schemas
[ ] UI components split into focused subcomponents
[ ] Zero TypeScript or linter errors reported by Cursor`,
  },
  {
    id: "lib-claude-deep-reasoning",
    title: "Claude Deep Architecture & Systems Design",
    category: "Development",
    subcategory: "System Architecture",
    targetAI: "claude",
    description: "Spec designed to trigger Claude's deep step-by-step reasoning, threat modeling, and trade-off analysis.",
    tags: ["claude", "architecture", "deep-reasoning", "security"],
    prompt: `# PROJECT TITLE: Enterprise System Architecture & Security Audit

## ROLE
You are an enterprise software architect and security auditor. Think through all edge cases, failure modes, and scalability bottlenecks before proposing solutions.

## OBJECTIVE
Design an enterprise-grade solution for the specified requirements, evaluating architectural trade-offs, security attack surfaces, and database performance implications.

## 1. SYSTEM MODELING & REASONING
- Deconstruct the problem into domain entities, state machines, and data pipelines.
- Formulate three architectural options, comparing: latency, operational cost, engineering complexity, and security guarantees.
- Recommend the optimal option with justified rationale.

## 2. SECURITY & THREAT MITIGATION
- Model potential threat vectors (OWASP Top 10, SSRF, IDOR, race conditions, replay attacks).
- Specify mitigation layers (rate limiting, cryptographic signatures, token rotation, parameterized queries).

## 3. IMPLEMENTATION SPECIFICATION
- Provide concrete TypeScript code blocks for the core data schemas and business logic.
- Include invariant assertions and exhaustive error categorization.

## 4. VERIFICATION & ACCEPTANCE CRITERIA
- Define exact automated test matrices (unit, integration, load testing).
- Provide a rollback protocol in case of migration anomalies.`,
  },
  {
    id: "lib-technical-seo-audit",
    title: "Technical SEO, AEO & GEO Enterprise Audit Spec",
    category: "SEO",
    subcategory: "Audit & Strategy",
    targetAI: "gemini",
    description: "Master prompt for generating exhaustive technical SEO, Answer Engine Optimization, and Generative Engine Optimization plans.",
    tags: ["seo", "technical-seo", "aeo", "geo", "schema", "gemini"],
    prompt: `# PROJECT TITLE: Comprehensive Technical SEO, AEO & GEO Audit

## ROLE
You are a world-recognized Technical SEO Consultant and AI Search (GEO / AEO) Strategist.

## OBJECTIVE
Produce an actionable, enterprise-grade audit and tactical roadmap to maximize organic search visibility and citations across Google Search, Google AI Overviews, Perplexity, and ChatGPT Search.

## 1. CRAWL & INDEXING ARCHITECTURE
- Analyze robots.txt directives, XML sitemap architecture, and canonical tag hierarchies.
- Audit status code distribution (301 redirects, 404 chains, 500 errors).
- Evaluate crawl budget efficiency and internal PageRank distribution.

## 2. CORE WEB VITALS & RENDERING
- Audit Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).
- Diagnose Server-Side Rendering (SSR) vs Client-Side Rendering (CSR) indexability risks.

## 3. GENERATIVE ENGINE OPTIMIZATION (GEO)
- Structure content around clear entity nodes recognizable by LLM knowledge graphs.
- Add structured definition tables, authoritative statistic citations, and factual entity schemas.
- Craft question-and-answer blocks directly addressing conversational user intents.

## 4. STRUCTURED DATA MATRIX
- Specify complete JSON-LD schemas: Organization, WebSite, Person, Article, FAQPage, BreadcrumbList.
- Ensure all schema properties map directly to visible on-page content.

## 5. ACTIONABLE DELIVERABLES
- Prioritized issue matrix: Critical (P0), High (P1), Medium (P2), Low (P3).
- Code snippets ready for copy-pasting into Next.js metadata and HTML headers.`,
  },
  {
    id: "lib-react-modern",
    title: "React 19 & Server Components Architecture Spec",
    category: "Development",
    subcategory: "React",
    targetAI: "cursor",
    description: "Enterprise React specification with Server Components, Actions, Suspense boundaries, and zero-hydration-flicker state.",
    tags: ["react", "server-components", "typescript", "architecture"],
    prompt: `# PROJECT TITLE: React 19 & Server Components Architecture

## ROLE
You are a Principal Frontend Architect specializing in React 19, Server Components, and Concurrent Mode optimization.

## CONTEXT
Migrating or developing high-throughput React interfaces with strict performance budgets (LCP < 1.2s).

## OBJECTIVE
Deliver a clean, modular component architecture leveraging async Server Components, optimistic mutations, and resilient Suspense fallbacks.

## 1. CORE REQUIREMENTS
- Split server and client boundaries with precision ("use client" only on interactive leaves).
- Use React 19 useActionState, useOptimistic, and use() hooks where appropriate.
- Maintain immutable state transitions with zero unnecessary re-renders.

## 2. ERROR BOUNDARIES & RESILIENCE
- Wrap asynchronous component trees in granular Suspense boundaries with shimmer skeleton loaders.
- Implement React Error Boundaries that capture stack traces and provide safe retry buttons.

## 3. TESTING & VERIFICATION
- Verify clean TypeScript compilation with strict null checks.
- Test fallback states under simulated 3G network throttling.

## FINAL VERIFICATION
[ ] Strict Server vs Client component boundaries respected
[ ] Suspense skeleton fallbacks on all async operations
[ ] Zero console hydration warnings
[ ] Zero TypeScript compile diagnostics`,
  },
  {
    id: "lib-php-laravel-api",
    title: "PHP & Laravel High-Throughput RESTful API",
    category: "Development",
    subcategory: "PHP",
    targetAI: "claude",
    description: "Production PHP / Laravel API engineering specification with FormRequests, Eloquent optimization, and rate limiting.",
    tags: ["php", "laravel", "api", "backend", "postgresql"],
    prompt: `# PROJECT TITLE: PHP & Laravel Enterprise API Specification

## ROLE
You are a Senior Backend Systems Architect and PHP 8.3 / Laravel specialist.

## OBJECTIVE
Build high-concurrency, secure RESTful API endpoints with structured JSON responses, FormRequest validation, and zero N+1 queries.

## 1. ARCHITECTURE & CONVENTIONS
- Implement PSR-12 coding standards with strict typing (\`declare(strict_types=1);\`).
- Decouple controllers from business logic via dedicated Service and Action classes.
- Prevent N+1 queries by eager-loading relations (\`with(['relation'])\`) and indexing foreign keys.

## 2. SECURITY & INPUT SANITIZATION
- Validate all incoming payloads with dedicated FormRequest classes.
- Implement token-based authentication (Sanctum) with rate-limiting middleware (60 req/min).
- Protect against SQL injection by using parameterized Eloquent queries exclusively.

## 3. TESTING
- Write Pest / PHPUnit feature tests verifying 200, 422, 401, and 500 HTTP responses.
- Run PHPStan / Psalm at level 8 to guarantee type soundness.`,
  },
  {
    id: "lib-database-postgres-supabase",
    title: "PostgreSQL & Supabase Architecture with RLS",
    category: "Development",
    subcategory: "Database",
    targetAI: "antigravity",
    description: "Relational database schema, Row Level Security (RLS) policies, indexes, and atomic RPC functions.",
    tags: ["database", "postgresql", "supabase", "rls", "sql"],
    prompt: `# PROJECT TITLE: PostgreSQL & Supabase Relational Architecture

## ROLE
You are a Database Architect and PostgreSQL performance tuning specialist.

## OBJECTIVE
Engineer a normalized, high-performance PostgreSQL schema with bulletproof Row Level Security (RLS) policies and optimized B-tree/GIN indexes.

## 1. SCHEMA DESIGN
- Use UUIDv4 primary keys with default gen_random_uuid().
- Enforce foreign key constraints with explicit ON DELETE CASCADE or RESTRICT rules.
- Add created_at and updated_at timestamps with automatic trigger updates.

## 2. ROW LEVEL SECURITY (RLS)
- Enable RLS on EVERY public table (\`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;\`).
- Create granular policies for SELECT, INSERT, UPDATE, DELETE checking \`auth.uid() = user_id\`.
- Use security definer functions with search_path = public for elevated operations.

## 3. PERFORMANCE & INDEXING
- Add composite B-tree indexes for multi-column WHERE clauses.
- Add GIN indexes for JSONB and full-text search columns.
- Verify query performance with EXPLAIN ANALYZE.`,
  },
  {
    id: "lib-deep-debugging",
    title: "Deep Codebase Debugging & Root-Cause Remediation",
    category: "Development",
    subcategory: "Debugging",
    targetAI: "antigravity",
    description: "Systematic root-cause diagnosis, ripple error prevention, and regression testing for complex bugs.",
    tags: ["debugging", "troubleshooting", "antigravity", "root-cause", "fix"],
    prompt: `# PROJECT TITLE: Deep Codebase Diagnostic & Remediation Spec

## ROLE
You are an expert Systems Debugger and Fault-Tolerance Engineer.

## CONTEXT
An unexpected bug, runtime exception, or build failure has occurred in an active codebase.

## OBJECTIVE
Systematically diagnose the root cause, isolate the offending line or state cycle, implement a non-destructive patch, and verify zero regressions.

## 1. DIAGNOSTIC PROTOCOL
- DO NOT randomly change code or apply guesswork fixes.
- Inspect the stack trace, error logs, and recent commit diffs.
- Identify the exact condition triggering the failure (null pointer, race condition, state loop).

## 2. NON-DESTRUCTIVE REMEDIATION
- Fix the root cause with the minimum surface area edit required.
- Do not refactor unrelated working components.
- Preserve backward compatibility for all callers and API consumers.

## 3. VERIFICATION & POST-CRAWL
- Crawl the codebase to ensure the fix does not break downstream components.
- Run \`npm run build\` or test suite to confirm 100% build pass rate.`,
  },
  {
    id: "lib-landing-page-conversion",
    title: "High-Conversion Landing Page & SaaS Wireframe",
    category: "Design",
    subcategory: "Landing Page",
    targetAI: "v0",
    description: "Conversion-optimized landing page blueprint with hero value proposition, social proof, and sticky CTAs.",
    tags: ["landing-page", "conversion", "cro", "saas", "ui"],
    prompt: `# PROJECT TITLE: High-Conversion SaaS Landing Page Specification

## ROLE
You are a Principal Conversion Rate Optimization (CRO) Designer and Tailwind UI Architect.

## OBJECTIVE
Deliver a high-converting, modern landing page with compelling visual hierarchy, crisp copywriting hooks, and frictionless conversion funnels.

## 1. VISUAL STRUCTURE & SECTIONS
- **Hero Section**: 8-word magnetic headline, sub-headline articulating primary outcome, dual CTA buttons (Primary: "Get Started Free", Secondary: "Live Demo"), and floating interactive UI preview.
- **Social Proof Bar**: Trusted-by logo cloud with subtle grayscale-to-color hover effects.
- **Problem vs Solution Grid**: Side-by-side comparison illustrating transformation.
- **Interactive Feature Tabs**: Tabbed interface previewing core platform capabilities.
- **FAQ Section**: Collapsible accordion answering top 6 sales objections.
- **Sticky CTA Footer**: Persistent bottom bar on mobile with 1-click registration.

## 2. PERFORMANCE & ACCESSIBILITY
- First Contentful Paint < 0.8s; zero CLS shift on image and font loads.
- Fully WCAG 2.1 AA compliant contrast across dark background surfaces.`,
  },
  {
    id: "lib-saas-dashboard-ui",
    title: "Enterprise Telemetry & Analytics SaaS Dashboard",
    category: "Design",
    subcategory: "Dashboard",
    targetAI: "lovable",
    description: "Data-dense analytics dashboard with time-series charts, metric KPI cards, and filterable data tables.",
    tags: ["dashboard", "analytics", "saas", "charts", "tailwind"],
    prompt: `# PROJECT TITLE: Enterprise Telemetry & Analytics Dashboard

## ROLE
You are a Senior Product Designer and Dashboard UI Specialist.

## OBJECTIVE
Create an enterprise-grade analytics dashboard with high information density, dark futuristic aesthetics, and responsive layout.

## 1. COMPONENT ARCHITECTURE
- **KPI Summary Cards**: 4 key metrics with percentage trend indicators (+18.4% vs last week) and sparkline mini-charts.
- **Time-Series Chart**: Interactive area chart with time-range selector (24h, 7d, 30d, 90d) and custom hover tooltips.
- **Data Table**: Server-side paginated table with sorting, search filtering, and status badge pills.
- **Activity Feed**: Real-time event stream with user avatars and timestamp telemetry.

## 2. DESIGN SYSTEM
- Theme: Deep obsidian (#070b1e) with cyan and sapphire blue indicators.
- Grid: CSS Grid with minmax columns adapting from single-column mobile to multi-column 4K displays.`,
  },
  {
    id: "lib-keyword-research-clustering",
    title: "Keyword Research & Search Intent Clustering Blueprint",
    category: "SEO",
    subcategory: "Keyword Research",
    targetAI: "gemini",
    description: "Strategic keyword clustering model mapping transactional, informational, and navigational intents.",
    tags: ["seo", "keyword-research", "clustering", "search-intent", "semrush"],
    prompt: `# PROJECT TITLE: Keyword Architecture & Search Intent Clustering

## ROLE
You are a Senior Search Strategist and SEO Data Scientist.

## OBJECTIVE
Generate an exhaustive keyword universe mapped into semantic topical clusters with search intent classification, business priority, and target URL mappings.

## 1. CLUSTER TAXONOMY
- Group keywords into Pillar Topics and Supporting Cluster Subtopics.
- Classify Search Intent: Informational (I), Navigational (N), Commercial (C), Transactional (T).
- Map SERP Features: Featured Snippet, AI Overview, People Also Ask (PAA), Local Pack.

## 2. DELIVERABLES MATRIX
- Formulate a structured Markdown table:
  | Topic Cluster | Primary Keyword | Search Volume | Keyword Difficulty | Intent | Content Type | Target URL Slug |
- Prioritize quick-win keywords (High Volume, Low Difficulty KD < 35).`,
  },
  {
    id: "lib-content-strategy-pillar",
    title: "Content Strategy & Authority Pillar Architecture",
    category: "SEO",
    subcategory: "Content Strategy",
    targetAI: "claude",
    description: "Topical authority blueprint establishing interlinking silos, content briefs, and entity-rich knowledge graphs.",
    tags: ["seo", "content-strategy", "topical-authority", "pillar-pages"],
    prompt: `# PROJECT TITLE: Topical Authority & Pillar Content Strategy

## ROLE
You are an Enterprise Content Director and Organic Search Authority Architect.

## OBJECTIVE
Design an end-to-end topical authority blueprint that establishes domain dominance in the specified industry niche.

## 1. SILO & INTERLINKING ARCHITECTURE
- Define 3 Core Pillar Guides (3,500+ words) covering macro domains.
- Establish 10-15 Cluster Articles per pillar linking bidirectional to the parent guide with contextual anchor text.
- Prevent keyword cannibalization by strictly separating intent boundaries.

## 2. CONTENT BRIEF SPECIFICATION
- Specify exact H1, H2, H3 heading trees for each article.
- Include required semantic entities, related questions, and structured data recommendations.`,
  },
  {
    id: "lib-tiktok-viral-script",
    title: "TikTok & Short-Form Video Virality Engine",
    category: "Marketing",
    subcategory: "TikTok",
    targetAI: "chatgpt",
    description: "Short-form video script generator utilizing 3-second visual hooks, retention pacing, and sound cues.",
    tags: ["tiktok", "reels", "shorts", "video-script", "marketing"],
    prompt: `# PROJECT TITLE: Viral Short-Form Video (TikTok / Reels / Shorts) Engine

## ROLE
You are a Viral Social Video Director and Creative Strategist with over 100M organic views.

## OBJECTIVE
Script a 45-60 second high-retention video engineered for maximum completion rate, shares, and comment controversy.

## 1. 3-SECOND HOOK FORMULA
- Visual Pattern Interrupt: Unexpected action, bold on-screen text question, or dramatic prop.
- Audio Hook: Dynamic sound effect or shocking declaration that stops scrolling immediately.

## 2. RETENTION SCRIPT FORMAT
- Break the script into a 3-column table:
  | Timestamp | Visual / Action / B-Roll | Voiceover / Audio Script | On-Screen Text Graphic |
- Keep visual transitions every 2.5 seconds to prevent audience drop-off.
- Conclude with a strong, open-ended question to fuel comment debates.`,
  },
  {
    id: "lib-paid-ads-matrix",
    title: "High-ROAS Paid Social Ad Creative Matrix (Meta & Google)",
    category: "Marketing",
    subcategory: "Ads",
    targetAI: "claude",
    description: "Full funnel advertising creative matrix with primary text variations, headlines, and audience angles.",
    tags: ["ads", "paid-social", "meta-ads", "google-ads", "roas"],
    prompt: `# PROJECT TITLE: High-ROAS Paid Advertising Creative Matrix

## ROLE
You are a Direct-Response Copywriter and Performance Marketing Media Buyer.

## OBJECTIVE
Develop a multi-angle ad creative suite engineered to lower Customer Acquisition Cost (CAC) and scale Return on Ad Spend (ROAS).

## 1. PSYCHOLOGICAL ANGLES
- Angle 1: Pain-Agitate-Solve (PAS)
- Angle 2: Social Proof & Industry Authority
- Angle 3: Direct Us vs. Them Comparison
- Angle 4: Contrarian / Counter-Intuitive Truth

## 2. AD SPECIFICATIONS
- For each angle, produce:
  - 3 Primary Text variations (Short: 50 words, Medium: 120 words, Long-form story: 250 words)
  - 5 High-CTR Headlines (under 40 characters)
  - Visual Creative direction (Stat image, UGC video brief, Carousel slides)`,
  },
  {
    id: "lib-autonomous-ai-agent",
    title: "Autonomous Multi-Agent System & Tool Calling Spec",
    category: "AI",
    subcategory: "AI Agent",
    targetAI: "antigravity",
    description: "Architectural blueprint for autonomous AI agents with LangGraph / CrewAI tool definitions, memory, and guardrails.",
    tags: ["ai-agent", "autonomous", "tool-calling", "langgraph", "crewai"],
    prompt: `# PROJECT TITLE: Autonomous Multi-Agent Orchestration Specification

## ROLE
You are a Principal AI Systems Engineer specializing in Autonomous Agentic Architectures and Tool Execution Loops.

## OBJECTIVE
Design a resilient multi-agent workflow featuring specialized agent roles, tool-calling schemas, state memory, and infinite-loop circuit breakers.

## 1. AGENT ROLES & TOPOLOGY
- **Planner Agent**: Deconstructs user goals into DAG (Directed Acyclic Graph) task steps.
- **Executor Agent**: Executes atomic tool calls with strict JSON parameter schemas.
- **Critic / Auditor Agent**: Evaluates step outputs against acceptance criteria before handoff.

## 2. TOOL CALL CONTRACTS
- Define typed interfaces for all tools with parameter descriptions and return schemas.
- Implement sandbox isolation and strict 10-second timeout limits on external tool invocations.

## 3. GUARDRAILS & CIRCUIT BREAKERS
- Maximum iteration limit (capped at 15 steps to prevent runaway API billing).
- Human-in-the-loop (HITL) approval trigger for dangerous operations (file deletions, financial transactions).`,
  },
  {
    id: "lib-enterprise-automation-n8n",
    title: "Enterprise Automation Pipeline (n8n & Webhooks)",
    category: "AI",
    subcategory: "Automation",
    targetAI: "gemini",
    description: "Event-driven webhook automation workflows with error retry buckets, payload transformations, and notifications.",
    tags: ["automation", "n8n", "webhooks", "zapier", "pipelines"],
    prompt: `# PROJECT TITLE: Enterprise Event-Driven Automation Pipeline

## ROLE
You are an Enterprise Integration Architect and Workflow Automation Specialist.

## OBJECTIVE
Engineer an automated, resilient data pipeline connecting incoming webhooks to backend processing nodes, notifications, and analytics.

## 1. EVENT LIFECYCLE
- Inbound webhook authentication via HMAC signature verification.
- Payload schema validation and normalization into canonical internal events.
- Asynchronous queuing with exponential backoff retries (3 attempts).

## 2. ERROR RECOVERY & TELEMETRY
- Dead Letter Queue (DLQ) for payloads failing all retry attempts.
- Instant Slack / Telegram notification alert on system failures with sanitized debug context.`,
  },
  {
    id: "lib-cinematic-video-generation",
    title: "Cinematic Video Generation Spec (Runway Gen-3 / Sora / Kling)",
    category: "AI",
    subcategory: "Video Generation",
    targetAI: "image-ai",
    description: "Precision camera motion, lighting continuity, and physics prompts for next-gen generative video models.",
    tags: ["video-generation", "runway", "sora", "kling", "cinematography"],
    prompt: `# PROJECT TITLE: Generative AI Video Direction & Camera Prompt

## ROLE
You are a Hollywood Cinematographer and Generative AI Video Prompt Director.

## OBJECTIVE
Author ultra-precise, cinematic video generation prompts engineered for Runway Gen-3, OpenAI Sora, or Kling AI.

## 1. CAMERA CHOREOGRAPHY
- Shot Type: Slow tracking push-in shot (Dolly forward) at eye level.
- Camera Motion: Smooth mechanical gimbal movement with subtle focal parallax.
- Lens: 50mm anamorphic prime lens with soft bokeh oval highlights.

## 2. ENVIRONMENT & LIGHTING
- Scene: Cyberpunk neon research laboratory in Kathmandu at dusk.
- Volumetric blue atmospheric haze with amber practical rim lights reflecting off brushed steel.
- Consistent fluid physics: realistic smoke wisps and rain droplets cascading on glass.

## 3. NEGATIVE PROMPTS (PREVENT GLITCHES)
- Exclude: morphing limbs, sudden jitter, frame stuttering, floating artifacts, warped perspective.`,
  },
];
