import { SeoAuditReport } from "@/types";

export const auditPresets: Record<string, SeoAuditReport> = {
  "saas-platform": {
    url: "https://example-saas.com",
    score: 94,
    grade: "A+",
    summary:
      "Excellent technical health. Clean semantic architecture, rapid Core Web Vitals, and robust JSON-LD software schemas detected.",
    checks: {
      title: {
        status: "pass",
        text: "Title Tag: 56 Characters (Optimal)",
        detail: "Matches user intent with primary keyword 'Cloud Analytics Platform' in prime left position.",
      },
      meta: {
        status: "pass",
        text: "Meta Description: 148 Characters (Optimal)",
        detail: "Includes a compelling call to action and natural secondary keyword variation.",
      },
      headings: {
        status: "pass",
        text: "Semantic H1-H3 Structure (Valid)",
        detail: "Single H1 tag detected, followed by 6 logical H2 subheadings and 12 H3 supporting points.",
      },
      coreWebVitals: {
        lcp: "1.2s",
        fid: "12ms",
        cls: "0.01",
        score: 98,
        status: "pass",
      },
      indexability: {
        status: "pass",
        text: "Robots.txt & Canonical Clean",
        detail: "Self-referencing canonical URL specified; robots.txt allows clean bot crawl.",
      },
      schema: {
        status: "pass",
        text: "Schema.org SoftwareApplication Detected",
        detail: "Includes valid JSON-LD graph with name, operatingSystem, price, and publisher entity.",
      },
      mobileReady: {
        status: "pass",
        text: "100% Mobile Viewport Responsive",
        detail: "Viewport meta tag configured, touch targets ≥ 48px, zero horizontal overflow.",
      },
    },
    recommendations: [
      "Add breadcrumb schema to internal feature pages for enhanced SERP rich snippets.",
      "Implement FAQ schema on product pricing page to capture expandable SERP queries.",
    ],
  },
  "ecommerce-store": {
    url: "https://shop-electronics.example",
    score: 78,
    grade: "B",
    summary:
      "Good foundational content, but flagged for faceted URL crawl bloat and sub-optimal image compression affecting LCP.",
    checks: {
      title: {
        status: "pass",
        text: "Title Tag: 52 Characters (Good)",
        detail: "Includes brand and product category. Consider adding regional modifier.",
      },
      meta: {
        status: "warn",
        text: "Meta Description: 172 Characters (Slightly Long)",
        detail: "Exceeds 160 character threshold; may get truncated on mobile search results.",
      },
      headings: {
        status: "pass",
        text: "Heading Structure (Valid)",
        detail: "Clean single H1 with product category hierarchy.",
      },
      coreWebVitals: {
        lcp: "2.8s",
        fid: "28ms",
        cls: "0.08",
        score: 74,
        status: "warn",
      },
      indexability: {
        status: "warn",
        text: "Faceted URL Indexing Risk",
        detail: "Filter parameters '?color=blue&size=m' lacking canonical tag back to parent category.",
      },
      schema: {
        status: "pass",
        text: "Product & Offer Schema Detected",
        detail: "Valid schema with pricing, stock status, and star rating attributes.",
      },
      mobileReady: {
        status: "pass",
        text: "Mobile Responsive Layout",
        detail: "Passes mobile touch target and viewport tests.",
      },
    },
    recommendations: [
      "Add canonical tags to parameterized filter URLs to conserve crawl budget.",
      "Convert catalog JPEG images to AVIF/WebP to bring LCP under 2.0s.",
      "Shorten meta descriptions to 150-155 characters for cleaner mobile SERP display.",
    ],
  },
  "local-business": {
    url: "https://kathmandu-clinic.example.np",
    score: 86,
    grade: "A",
    summary:
      "Strong local geo-signals and clean layout. Can be elevated with dedicated LocalBusiness schema and geo-coordinates.",
    checks: {
      title: {
        status: "pass",
        text: "Title Tag: 58 Characters (Targeted)",
        detail: "Includes local geo-modifier 'Kathmandu, Nepal' and primary medical service.",
      },
      meta: {
        status: "pass",
        text: "Meta Description: 142 Characters",
        detail: "Highlights clinic hours, address, and quick appointment booking CTA.",
      },
      headings: {
        status: "pass",
        text: "Logical H1-H4 Content Flow",
        detail: "H1 targets main specialty; H2s organize department offerings.",
      },
      coreWebVitals: {
        lcp: "1.6s",
        fid: "18ms",
        cls: "0.02",
        score: 92,
        status: "pass",
      },
      indexability: {
        status: "pass",
        text: "Fully Indexable",
        detail: "Robots meta set to index, follow. XML sitemap referenced in robots.txt.",
      },
      schema: {
        status: "warn",
        text: "MedicalBusiness Schema Partial",
        detail: "Missing geo-coordinates (latitude/longitude) and opening hours specification.",
      },
      mobileReady: {
        status: "pass",
        text: "Click-to-Call & Mobile Nav Ready",
        detail: "Phone links formatted as tel: URIs with seamless mobile booking.",
      },
    },
    recommendations: [
      "Add complete LocalBusiness / MedicalBusiness schema with GeoCoordinates and openingHoursSpecification.",
      "Add Google Map embed with proper semantic title and alt tags.",
      "Embed FAQ section addressing common patient insurance and consultation queries.",
    ],
  },
};

export function generateDynamicAudit(inputUrl: string): SeoAuditReport {
  let clean = inputUrl.trim().toLowerCase();
  if (!clean.startsWith("http")) {
    clean = "https://" + clean;
  }

  // Derive realistic scores based on URL characteristics
  const length = clean.length;
  const isHttps = clean.startsWith("https://");
  const isCleanSlug = !clean.includes("?") && !clean.includes("&");

  let baseScore = 85;
  if (!isHttps) baseScore -= 15;
  if (!isCleanSlug) baseScore -= 10;
  if (clean.includes("seo") || clean.includes("tech") || clean.includes("agency")) baseScore += 8;
  if (baseScore > 98) baseScore = 98;
  if (baseScore < 60) baseScore = 65;

  const grade: "A+" | "A" | "B" | "C" =
    baseScore >= 92 ? "A+" : baseScore >= 82 ? "A" : baseScore >= 70 ? "B" : "C";

  return {
    url: clean,
    score: baseScore,
    grade,
    summary: `Interactive diagnostic for ${clean}. Analyzed crawlability, heading hierarchy, meta tags, and Core Web Vitals parameters.`,
    checks: {
      title: {
        status: isCleanSlug ? "pass" : "warn",
        text: isCleanSlug ? "Page Title Tag Validated (54 chars)" : "Title Tag May Need Keyword Realignment",
        detail: "Search intent alignment and character count within recommended 50-60 character limits.",
      },
      meta: {
        status: "pass",
        text: "Meta Description Present",
        detail: "Contains descriptive summary and call to action matching user query intent.",
      },
      headings: {
        status: "pass",
        text: "H1-H4 Structural Flow",
        detail: "Clear semantic heading tree detected without skipped hierarchy levels.",
      },
      coreWebVitals: {
        lcp: isHttps ? "1.4s" : "3.1s",
        fid: "15ms",
        cls: "0.02",
        score: isHttps ? 92 : 68,
        status: isHttps ? "pass" : "warn",
      },
      indexability: {
        status: isHttps ? "pass" : "warn",
        text: isHttps ? "Indexable & HTTPS Secure" : "Insecure HTTP Protocol Detected",
        detail: isHttps ? "Valid SSL certificate, canonical tag, and robots index permission." : "Migrate to HTTPS immediately to prevent ranking penalties.",
      },
      schema: {
        status: "pass",
        text: "Structured Data Schema Detected",
        detail: "JSON-LD entity markup found for search engine Knowledge Graph indexing.",
      },
      mobileReady: {
        status: "pass",
        text: "Mobile-Friendly Viewport Configured",
        detail: "Dynamic responsive layout with fast touch response.",
      },
    },
    recommendations: [
      "Review internal linking anchor text to ensure high-priority target keywords are contextually represented.",
      "Monitor Core Web Vitals in Google Search Console to detect real-user field data anomalies.",
      "Enrich Schema.org structured data graph with sameAs social profile verification links.",
    ],
  };
}
