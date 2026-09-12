import { TimelineItem } from "@/types";

export const timelineSteps: TimelineItem[] = [
  {
    phase: "Phase 01",
    title: "Web Technologies & Foundation",
    category: "Core Web Fundamentals",
    description:
      "Deep-dive into web architecture, semantic HTML5, modern CSS, JavaScript execution, DOM structures, and how browser rendering engines work.",
    keyLearnings: [
      "Semantic markup & document outline hierarchy",
      "Client-side vs server-side rendering performance",
      "Network waterfall & asset delivery optimization",
    ],
    status: "completed",
  },
  {
    phase: "Phase 02",
    title: "Search Engine Mechanics & Experimentation",
    category: "SEO Exploration",
    description:
      "Understanding crawler bots (Googlebot, Bingbot), server response codes, robots directives, sitemaps, indexation queues, and ranking algorithms.",
    keyLearnings: [
      "Crawl budget allocation & bot behavior analysis",
      "Algorithmic search mechanics & entity recognition",
      "Keyword research, search intent & SERP feature mapping",
    ],
    status: "completed",
  },
  {
    phase: "Phase 03",
    title: "Technical Auditing & Data Analytics",
    category: "Diagnostic Mastery",
    description:
      "Mastering diagnostic toolkits (Google Search Console, Screaming Frog, GA4, Lighthouse) to systematically diagnose and remedy complex crawl errors and UX bottlenecks.",
    keyLearnings: [
      "Faceted navigation & parameterized crawl resolution",
      "Core Web Vitals diagnostic troubleshooting (LCP, INP, CLS)",
      "Looker Studio custom reporting & organic attribution",
    ],
    status: "completed",
  },
  {
    phase: "Phase 04",
    title: "Holistic SEO Strategy & Topical Authority",
    category: "Advanced Execution",
    description:
      "Designing multi-phase SEO blueprints combining technical architecture, pillar-cluster content models, entity schema graphs, and digital outreach.",
    keyLearnings: [
      "Topical authority clustering for niche dominance",
      "Schema.org custom knowledge graph development",
      "White-hat outreach & brand equity cultivation",
    ],
    status: "current",
  },
  {
    phase: "Phase 05",
    title: "Continuous Innovation & Growth Lab",
    category: "Future Trajectory",
    description:
      "Ongoing research into generative AI search experiences (SGE), semantic knowledge graphs, predictive organic modeling, and cutting-edge web performance.",
    keyLearnings: [
      "Search Generative Experience (SGE) & AI answer optimization",
      "International & multi-lingual SEO expansion",
      "Continuous algorithmic testing & research",
    ],
    status: "future",
  },
];
