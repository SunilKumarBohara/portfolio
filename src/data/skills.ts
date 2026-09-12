import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Search Engine Optimization",
    description: "Core pillars of organic search visibility and search engine mechanics",
    skills: [
      { name: "Technical SEO", focus: "Crawlability, Indexing, Sitemaps, Canonicalization & Core Web Vitals" },
      { name: "Keyword Research", focus: "Search Intent Mapping, Search Volume, Keyword Difficulty & Gap Analysis" },
      { name: "On-Page SEO", focus: "Title Tags, Meta Descriptions, Semantic H1-H6 Hierarchy, Content Tuning" },
      { name: "Off-Page SEO", focus: "Ethical Link Building, Digital PR, Authority Signals & Brand Mentions" },
      { name: "Content SEO", focus: "Topical Clustering, Pillar Pages, E-E-A-T Optimization & Readability" },
      { name: "Local SEO", focus: "Google Business Profile, Local Citations, NAP Consistency & Geo-targeting" },
      { name: "SEO Auditing", focus: "Full-Site Diagnostics, Broken Links, Redirect Chains & Hierarchy Fixes" },
      { name: "Internal Linking", focus: "PageRank Flow, Contextual Anchor Text & Silo Architecture" },
    ],
  },
  {
    title: "Analytics & SEO Platforms",
    description: "Tools used for data extraction, ranking tracking, and performance diagnostics",
    skills: [
      { name: "Google Search Console", focus: "Index Coverage, Query Analysis, Sitemaps, Enhancements & Core Web Vitals" },
      { name: "Google Analytics 4", focus: "Traffic Acquisition, User Behavior, Event Tracking & Conversion Paths" },
      { name: "Competitor Analysis", focus: "SERP Dominance, Keyword Overlap, Backlink Profiling & Content Gaps" },
      { name: "Keyword Analysis", focus: "Long-Tail Discovery, Commercial Intent & SERP Feature Opportunities" },
      { name: "Website Optimization", focus: "PageSpeed, Image Compression, Asset Minification & UX Friction Fixes" },
    ],
  },
  {
    title: "Web Technologies & Development",
    description: "Technical foundation for SEO-first development and code-level optimization",
    skills: [
      { name: "HTML5", focus: "Semantic Markup, Meta Directives, OpenGraph, Microdata & Schema.org" },
      { name: "CSS3 / Modern CSS", focus: "Responsive Layouts, Critical CSS Inlining & Layout Shift (CLS) Prevention" },
      { name: "JavaScript", focus: "DOM Optimization, Asynchronous Script Loading & Client-Side SEO" },
      { name: "PHP", focus: "Server-side Rendering, Dynamic Meta Generation & CMS Architecture" },
      { name: "MySQL", focus: "Database Query Efficiency, CMS Data Structure & Response Time Optimization" },
    ],
  },
];
