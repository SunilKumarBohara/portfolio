import { ProjectItem } from "@/types";

export const projects: ProjectItem[] = [
  {
    id: "tech-saas-visibility",
    title: "Global SaaS Platform — Technical & Topical SEO Growth",
    category: "Technical SEO & Topical Authority",
    industry: "B2B Software / Cloud Services",
    problem:
      "The platform experienced flatlined organic traffic due to unoptimized JS rendering, messy URL parameters causing duplicate content, and disjointed product pages lacking topical depth.",
    strategy:
      "Restructured crawl architecture, eliminated parameterized duplicate indexation with canonical directives, and built 6 topical content hubs targeting high-intent software buyers.",
    workCompleted: [
      "Resolved 120+ indexation anomalies & parameterized URL duplicates in Google Search Console",
      "Created structured Schema.org SoftwareApplication and Breadcrumb graph across all core pages",
      "Mapped keyword search intent across 4 distinct customer buyer journeys",
      "Optimized Core Web Vitals to achieve all-green scores (LCP < 1.8s, CLS < 0.05)",
    ],
    metricsPlaceholder: [
      { label: "Target Metric", value: "Organic Clicks", growth: "Add Verified Data" },
      { label: "SERP Trajectory", value: "Top 10 Keywords", growth: "Strategy Blueprint" },
      { label: "Technical Health", value: "98% Valid Index", growth: "Core Web Vitals Pass" },
    ],
    technologies: ["Google Search Console", "Screaming Frog", "SEMrush", "Next.js", "Schema.org"],
    isPlaceholder: true,
    featured: true,
  },
  {
    id: "ecommerce-catalog-audit",
    title: "E-Commerce Store — Multi-Category On-Page & Faceted Crawl Fix",
    category: "E-Commerce SEO & Hierarchy",
    industry: "Retail & Consumer Electronics",
    problem:
      "Faceted navigation generated 25,000+ thin filter URLs, wasting crawl budget and cannibalizing primary category rankings.",
    strategy:
      "Engineered a noindex/canonical filter governance system, consolidated variant product titles, and enriched parent category descriptions with semantic entity keywords.",
    workCompleted: [
      "Configured robots.txt directives and canonical links to stop faceted URL bloat",
      "Implemented Product & AggregateRating JSON-LD schema across 1,500+ SKUs",
      "Conducted extensive commercial search intent keyword mapping",
      "Boosted category page loading speed by 42% through responsive image optimization",
    ],
    metricsPlaceholder: [
      { label: "Crawl Efficiency", value: "Crawl Budget", growth: "Zero Wasted Crawls" },
      { label: "Category Rank", value: "Primary Keywords", growth: "Add Real Metrics" },
      { label: "Index Quality", value: "Clean Index Ratio", growth: "Documented Strategy" },
    ],
    technologies: ["Ahrefs", "Google Analytics 4", "PageSpeed Insights", "HTML/CSS", "Schema Generator"],
    isPlaceholder: true,
    featured: true,
  },
  {
    id: "regional-business-local-seo",
    title: "Regional Service Enterprise — Local SEO & Map Pack Optimization",
    category: "Local SEO & Geo-Targeting",
    industry: "Healthcare / Professional Services",
    problem:
      "Inconsistent NAP data across directories, neglected Google Business Profile, and zero localized service landing pages resulted in low local discovery.",
    strategy:
      "Audited citations, restructured GBP categories with local keyword anchors, generated city-specific service pages, and set up a systematic customer review process.",
    workCompleted: [
      "Cleaned up 40+ directory citations for 100% NAP consistency",
      "Authored localized landing pages with GeoCoordinates and LocalBusiness schema",
      "Established localized internal linking architecture",
      "Optimized Google Business Profile images, posts, and Q&A section",
    ],
    metricsPlaceholder: [
      { label: "Local Visibility", value: "Google Maps Pack", growth: "Strategy Template" },
      { label: "Direct Inquiries", value: "Call/Form Actions", growth: "Add Client Metrics" },
      { label: "Geo-Rankings", value: "Local Radius", growth: "Verified Flow" },
    ],
    technologies: ["Google Business Profile", "Google Maps", "Local Schema", "Google Search Console"],
    isPlaceholder: true,
    featured: true,
  },
  {
    id: "content-publisher-revamp",
    title: "Content Publisher — Decay Audit & Pillar-Cluster Restructure",
    category: "Content Strategy & Decay Remediation",
    industry: "Digital Media / Educational Blog",
    problem:
      "A library of 300+ legacy articles suffered from content decay, internal link voids, and declining organic impressions following recent search engine updates.",
    strategy:
      "Executed a comprehensive content audit, pruned obsolete articles, merged thin overlapping posts into high-authority pillar guides, and updated statistics.",
    workCompleted: [
      "Audited 300+ URLs classifying into Keep, Update, Merge, or 301 Redirect",
      "Built 4 comprehensive pillar articles with supporting topic clusters",
      "Implemented descriptive contextual anchor links across all published posts",
      "Standardized E-E-A-T author bios and editorial review credentials",
    ],
    metricsPlaceholder: [
      { label: "Topical Coverage", value: "Pillar Clusters", growth: "Refreshed Structure" },
      { label: "Impression Growth", value: "Search Impressions", growth: "Add Verified Data" },
      { label: "User Engagement", value: "Avg. Time on Page", growth: "Actionable Blueprint" },
    ],
    technologies: ["Google Search Console", "Google Trends", "SEMrush", "Looker Studio"],
    isPlaceholder: true,
    featured: false,
  },
];
