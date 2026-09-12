export interface SiteConfig {
  name: string;
  role: string;
  title: string;
  location: string;
  country: string;
  availability: string;
  email: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  impact: string;
  gradient: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    focus: string;
    icon?: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  industry: string;
  problem: string;
  strategy: string;
  workCompleted: string[];
  metricsPlaceholder: {
    label: string;
    value: string;
    growth: string;
  }[];
  technologies: string[];
  isPlaceholder: boolean;
  featured: boolean;
}

export interface ToolItem {
  name: string;
  category: "Google Suite" | "Crawler & Auditing" | "Keyword & Competitive" | "Speed & Performance";
  description: string;
  badge: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId?: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  tags: string[];
  readUrl?: string;
  featuredImage?: string;
  status?: "published" | "draft" | "scheduled" | "trash";
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  authorName?: string;
  views?: number;
}

export interface TimelineItem {
  phase: string;
  title: string;
  category: string;
  description: string;
  keyLearnings: string[];
  status: "completed" | "current" | "future";
}

export interface SeoAuditReport {
  url: string;
  score: number;
  grade: "A+" | "A" | "B" | "C";
  summary: string;
  checks: {
    title: { status: "pass" | "warn" | "fail"; text: string; detail: string };
    meta: { status: "pass" | "warn" | "fail"; text: string; detail: string };
    headings: { status: "pass" | "warn" | "fail"; text: string; detail: string };
    coreWebVitals: {
      lcp: string;
      fid: string;
      cls: string;
      score: number;
      status: "pass" | "warn";
    };
    indexability: { status: "pass" | "warn" | "fail"; text: string; detail: string };
    schema: { status: "pass" | "warn" | "fail"; text: string; detail: string };
    mobileReady: { status: "pass" | "warn" | "fail"; text: string; detail: string };
  };
  recommendations: string[];
}

/* ==========================================================================
   WordPress-Style CMS Data Entities
   ========================================================================== */

export type UserRole = "super_admin" | "editor" | "author";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  altText: string;
  title: string;
  caption: string;
  description: string;
  createdAt: string;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft";
  seoTitle?: string;
  metaDescription?: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  target?: "_blank" | "_self";
  order: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  phone: string;
  address: string;
  socialLinkedin: string;
  socialGithub: string;
  socialTwitter: string;
  socialWebsite: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  robotsTxt: string;
  googleAnalyticsId: string;
  searchConsoleCode: string;
  headerLogo: string;
  headerCtaText: string;
  headerCtaUrl: string;
  footerText: string;
  copyrightText: string;
}

export interface AdminStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  trashPosts: number;
  totalCategories: number;
  totalTags: number;
  totalMedia: number;
  totalUsers: number;
  recentActivity: Array<{
    id: string;
    type: "post" | "media" | "category" | "user" | "setting";
    action: string;
    target: string;
    timestamp: string;
  }>;
}
