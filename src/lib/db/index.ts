import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  User,
  BlogPost,
  Category,
  Tag,
  MediaItem,
  CMSPage,
  MenuItem,
  SiteSettings,
  AdminStats,
} from "@/types";
import { blogPosts as initialBlogPosts } from "@/data/blog";
import { siteConfig } from "@/data/siteConfig";

const DB_DIR = path.join(process.cwd(), "data", "cms");

// Helper to ensure data/cms directory exists
function ensureDbDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

// Atomic File Read & Write Helpers
function readJson<T>(fileName: string, defaultValue: T): T {
  ensureDbDir();
  const filePath = path.join(DB_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    writeJson(fileName, defaultValue);
    return defaultValue;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${fileName}:`, err);
    return defaultValue;
  }
}

function writeJson<T>(fileName: string, data: T): void {
  ensureDbDir();
  const filePath = path.join(DB_DIR, fileName);
  const tempPath = `${filePath}.tmp`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error writing ${fileName}:`, err);
  }
}

// Global Activity Log Helper
export function logActivity(action: string, target: string, type: "post" | "media" | "category" | "user" | "setting") {
  const activities = readJson<Array<{ id: string; type: any; action: string; target: string; timestamp: string }>>("activities.json", []);
  activities.unshift({
    id: `act_${Date.now()}`,
    type,
    action,
    target,
    timestamp: new Date().toISOString(),
  });
  // Keep last 50 activities
  writeJson("activities.json", activities.slice(0, 50));
}

// Initial Seed Database Initialization
export function initDatabase() {
  ensureDbDir();

  // 1. Seed Users (Default Super Admin: admin / Admin@123456)
  const users = readJson<User[]>("users.json", []);
  if (users.length === 0) {
    const defaultPasswordHash = bcrypt.hashSync("Admin@123456", 10);
    const superAdmin: User = {
      id: "usr_admin",
      name: "Sunil Kumar Bohara",
      email: "contact@sunilkumarbohara.com",
      username: "admin",
      passwordHash: defaultPasswordHash,
      role: "super_admin",
      avatar: "/og-image.png",
      createdAt: new Date().toISOString(),
    };
    writeJson("users.json", [superAdmin]);
  }

  // 2. Seed Categories
  const categories = readJson<Category[]>("categories.json", []);
  if (categories.length === 0) {
    const initialCategories: Category[] = [
      { id: "cat_technical", name: "Technical SEO", slug: "technical-seo", description: "Crawlability, indexing, and Core Web Vitals", createdAt: new Date().toISOString() },
      { id: "cat_keyword", name: "Keyword Strategy", slug: "keyword-strategy", description: "Search intent & topical clustering", createdAt: new Date().toISOString() },
      { id: "cat_content", name: "Content Optimization", slug: "content-optimization", description: "E-E-A-T & pillar page models", createdAt: new Date().toISOString() },
      { id: "cat_vitals", name: "Core Web Vitals", slug: "core-web-vitals", description: "LCP, INP, and CLS performance tuning", createdAt: new Date().toISOString() },
      { id: "cat_algo", name: "Algorithm Updates", slug: "algorithm-updates", description: "Search engine core update resilience", createdAt: new Date().toISOString() },
    ];
    writeJson("categories.json", initialCategories);
  }

  // 3. Seed Tags
  const tags = readJson<Tag[]>("tags.json", []);
  if (tags.length === 0) {
    const initialTags: Tag[] = [
      { id: "tag_cwv", name: "Core Web Vitals", slug: "core-web-vitals", createdAt: new Date().toISOString() },
      { id: "tag_inp", name: "INP", slug: "inp", createdAt: new Date().toISOString() },
      { id: "tag_schema", name: "Schema.org", slug: "schema-org", createdAt: new Date().toISOString() },
      { id: "tag_intent", name: "Search Intent", slug: "search-intent", createdAt: new Date().toISOString() },
      { id: "tag_eeat", name: "E-E-A-T", slug: "e-e-a-t", createdAt: new Date().toISOString() },
    ];
    writeJson("tags.json", initialTags);
  }

  // 4. Seed Posts
  const posts = readJson<BlogPost[]>("posts.json", []);
  if (posts.length === 0) {
    const seededPosts: BlogPost[] = initialBlogPosts.map((p, idx) => ({
      ...p,
      status: "published",
      featuredImage: "/og-image.png",
      seoTitle: p.title,
      metaDescription: p.excerpt,
      focusKeyword: p.tags[0] || "SEO",
      canonicalUrl: `https://sunilkumarbohara.com/blog/${p.slug}`,
      ogTitle: p.title,
      ogDescription: p.excerpt,
      ogImage: "/og-image.png",
      authorName: "Sunil Kumar Bohara",
      views: 120 + idx * 45,
    }));
    writeJson("posts.json", seededPosts);
  }

  // 5. Seed Media
  readJson<MediaItem[]>("media.json", []);

  // 6. Seed Pages
  const pages = readJson<CMSPage[]>("pages.json", []);
  if (pages.length === 0) {
    writeJson("pages.json", [
      { id: "page_home", title: "Home", slug: "home", content: "Home page main layout", status: "published", updatedAt: new Date().toISOString() },
      { id: "page_about", title: "About", slug: "about", content: "About Sunil Kumar Bohara", status: "published", updatedAt: new Date().toISOString() },
      { id: "page_contact", title: "Contact", slug: "contact", content: "Get in touch for SEO inquiries", status: "published", updatedAt: new Date().toISOString() },
    ]);
  }

  // 7. Seed Menus
  const menus = readJson<MenuItem[]>("menus.json", []);
  if (menus.length === 0) {
    writeJson("menus.json", [
      { id: "menu_1", label: "About", url: "#about", order: 1 },
      { id: "menu_2", label: "Services", url: "#services", order: 2 },
      { id: "menu_4", label: "Skills", url: "#skills", order: 3 },
      { id: "menu_5", label: "Journey", url: "#journey", order: 4 },
      { id: "menu_6", label: "Projects", url: "#projects", order: 5 },
      { id: "menu_8", label: "Contact", url: "#contact", order: 6 },
    ]);
  }

  // 8. Seed Site Settings
  const settings = readJson<SiteSettings | null>("settings.json", null);
  if (!settings) {
    writeJson<SiteSettings>("settings.json", {
      siteName: siteConfig.name,
      tagline: siteConfig.role,
      logo: "/icon.png",
      favicon: "/favicon.ico",
      contactEmail: siteConfig.email,
      phone: "+977-9800000000",
      address: "Kathmandu, Nepal",
      socialLinkedin: siteConfig.socials.linkedin,
      socialGithub: siteConfig.socials.github,
      socialTwitter: siteConfig.socials.twitter,
      socialWebsite: siteConfig.socials.website || "",
      defaultMetaTitle: siteConfig.seo.defaultTitle,
      defaultMetaDescription: siteConfig.seo.defaultDescription,
      defaultOgImage: siteConfig.seo.ogImage,
      robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/",
      googleAnalyticsId: "G-MEASUREMENT_ID",
      searchConsoleCode: "google-site-verification-code",
      headerLogo: "SUNIL KUMAR BOHARA",
      headerCtaText: "Let's Talk",
      headerCtaUrl: "#contact",
      footerText: "Building better search visibility through SEO, content, and modern web experiences.",
      copyrightText: `© ${new Date().getFullYear()} Sunil Kumar Bohara. All rights reserved.`,
    });
  }
}

// ============================================================================
// CRUD API Services
// ============================================================================

// Users
export function getUsers(): User[] {
  initDatabase();
  return readJson<User[]>("users.json", []);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function getUserByUsernameOrEmail(identifier: string): User | undefined {
  const clean = identifier.trim().toLowerCase();
  return getUsers().find(
    (u) => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean
  );
}

export function saveUser(user: User): void {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    users[idx] = user;
  } else {
    users.push(user);
  }
  writeJson("users.json", users);
  logActivity(idx >= 0 ? "Updated user" : "Created user", user.username, "user");
}

export function deleteUser(id: string): boolean {
  let users = getUsers();
  const target = users.find((u) => u.id === id);
  if (!target) return false;
  users = users.filter((u) => u.id !== id);
  writeJson("users.json", users);
  logActivity("Deleted user", target.username, "user");
  return true;
}

// Posts
export function getPosts(): BlogPost[] {
  initDatabase();
  return readJson<BlogPost[]>("posts.json", []);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function getPostById(id: string): BlogPost | undefined {
  return getPosts().find((p) => p.id === id);
}

export function savePost(post: BlogPost): void {
  const posts = getPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  writeJson("posts.json", posts);
  logActivity(idx >= 0 ? "Updated post" : "Created post", post.title, "post");
}

export function deletePost(id: string): boolean {
  let posts = getPosts();
  const target = posts.find((p) => p.id === id);
  if (!target) return false;
  posts = posts.filter((p) => p.id !== id);
  writeJson("posts.json", posts);
  logActivity("Deleted post", target.title, "post");
  return true;
}

// Categories
export function getCategories(): Category[] {
  initDatabase();
  return readJson<Category[]>("categories.json", []);
}

export function saveCategory(category: Category): void {
  const list = getCategories();
  const idx = list.findIndex((c) => c.id === category.id);
  if (idx >= 0) {
    list[idx] = category;
  } else {
    list.push(category);
  }
  writeJson("categories.json", list);
  logActivity(idx >= 0 ? "Updated category" : "Created category", category.name, "category");
}

export function deleteCategory(id: string): boolean {
  let list = getCategories();
  const target = list.find((c) => c.id === id);
  if (!target) return false;
  list = list.filter((c) => c.id !== id);
  writeJson("categories.json", list);
  logActivity("Deleted category", target.name, "category");
  return true;
}

// Tags
export function getTags(): Tag[] {
  initDatabase();
  return readJson<Tag[]>("tags.json", []);
}

export function saveTag(tag: Tag): void {
  const list = getTags();
  const idx = list.findIndex((t) => t.id === tag.id);
  if (idx >= 0) {
    list[idx] = tag;
  } else {
    list.push(tag);
  }
  writeJson("tags.json", list);
}

export function deleteTag(id: string): boolean {
  let list = getTags();
  list = list.filter((t) => t.id !== id);
  writeJson("tags.json", list);
  return true;
}

// Media
export function getMediaItems(): MediaItem[] {
  initDatabase();
  return readJson<MediaItem[]>("media.json", []);
}

export function saveMediaItem(item: MediaItem): void {
  const list = getMediaItems();
  const idx = list.findIndex((m) => m.id === item.id);
  if (idx >= 0) {
    list[idx] = item;
  } else {
    list.unshift(item);
  }
  writeJson("media.json", list);
  logActivity(idx >= 0 ? "Updated media SEO" : "Uploaded image", item.filename, "media");
}

export function deleteMediaItem(id: string): boolean {
  let list = getMediaItems();
  const target = list.find((m) => m.id === id);
  if (!target) return false;
  list = list.filter((m) => m.id !== id);
  writeJson("media.json", list);
  logActivity("Deleted media item", target.filename, "media");
  return true;
}

// Pages
export function getPages(): CMSPage[] {
  initDatabase();
  return readJson<CMSPage[]>("pages.json", []);
}

export function savePage(page: CMSPage): void {
  const list = getPages();
  const idx = list.findIndex((p) => p.id === page.id);
  if (idx >= 0) {
    list[idx] = page;
  } else {
    list.push(page);
  }
  writeJson("pages.json", list);
}

// Menus
export function getMenus(): MenuItem[] {
  initDatabase();
  return readJson<MenuItem[]>("menus.json", []);
}

export function saveMenus(menus: MenuItem[]): void {
  writeJson("menus.json", menus);
  logActivity("Updated navigation menu", "Main Navbar Menu", "setting");
}

// Site Settings
export function getSettings(): SiteSettings {
  initDatabase();
  return readJson<SiteSettings>("settings.json", {
    siteName: siteConfig.name,
    tagline: siteConfig.role,
    logo: "/icon.png",
    favicon: "/favicon.ico",
    contactEmail: siteConfig.email,
    phone: "+977-9800000000",
    address: "Kathmandu, Nepal",
    socialLinkedin: siteConfig.socials.linkedin || "",
    socialGithub: siteConfig.socials.github || "",
    socialTwitter: siteConfig.socials.twitter || "",
    socialWebsite: siteConfig.socials.website || "",
    defaultMetaTitle: siteConfig.seo.defaultTitle,
    defaultMetaDescription: siteConfig.seo.defaultDescription,
    defaultOgImage: siteConfig.seo.ogImage,
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin/",
    googleAnalyticsId: "G-MEASUREMENT_ID",
    searchConsoleCode: "verification-code",
    headerLogo: "SUNIL",
    headerCtaText: "Let's Talk",
    headerCtaUrl: "#contact",
    footerText: "SEO Specialist & Digital Marketing Professional based in Nepal.",
    copyrightText: `© ${new Date().getFullYear()} Sunil Kumar Bohara. All rights reserved.`,
  });
}

export function saveSettings(settings: SiteSettings): void {
  writeJson("settings.json", settings);
  logActivity("Updated site settings", "Global Config", "setting");
}

// Dashboard Admin Stats
export function getAdminStats(): AdminStats {
  const posts = getPosts();
  const categories = getCategories();
  const tags = getTags();
  const media = getMediaItems();
  const users = getUsers();
  const activities = readJson<Array<{ id: string; type: any; action: string; target: string; timestamp: string }>>("activities.json", []);

  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p) => p.status === "published" || !p.status).length,
    draftPosts: posts.filter((p) => p.status === "draft").length,
    scheduledPosts: posts.filter((p) => p.status === "scheduled").length,
    trashPosts: posts.filter((p) => p.status === "trash").length,
    totalCategories: categories.length,
    totalTags: tags.length,
    totalMedia: media.length,
    totalUsers: users.length,
    recentActivity: activities.slice(0, 10),
  };
}
