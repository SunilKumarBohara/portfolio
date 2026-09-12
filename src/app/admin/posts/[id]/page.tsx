"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { BlogPost, Category } from "@/types";
import RichEditor from "@/components/admin/RichEditor";
import MediaModal from "@/components/admin/MediaModal";
import {
  ArrowLeft,
  Save,
  Globe,
  Eye,
  Sparkles,
  Image as ImageIcon,
  Tag as TagIcon,
  FolderTree,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Share2,
  Search,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const isNew = postId === "new";
  const { success, error } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("All changes saved");
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState<"featured" | "og">("featured");

  // Post Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "Technical SEO",
    tags: ["SEO", "Technical SEO"],
    featuredImage: "/og-image.png",
    status: "draft",
    seoTitle: "",
    metaDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "/og-image.png",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchCategories();
    if (!isNew) {
      fetchPost();
    }
  }, [postId]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      } else {
        error("Post not found");
        router.push("/admin/posts");
      }
    } catch (err) {
      error("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setFormData((prev) => {
      const slug = isNew && !prev.slug
        ? newTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        : prev.slug;
      return {
        ...prev,
        title: newTitle,
        slug,
        seoTitle: prev.seoTitle || newTitle,
        ogTitle: prev.ogTitle || newTitle,
      };
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tagToRemove) || [],
    }));
  };

  const handleSave = async (statusOverride?: "published" | "draft" | "scheduled") => {
    if (!formData.title) {
      error("Post title is required");
      return;
    }

    setSaving(true);
    setSaveStatus("Saving...");

    try {
      const payload = {
        ...formData,
        status: statusOverride || formData.status || "draft",
      };

      const url = isNew ? "/api/admin/posts" : `/api/admin/posts/${postId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        setFormData(saved);
        const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setSaveStatus(`Saved at ${timeStr}`);
        success(isNew ? "Post created successfully!" : "Post updated successfully!");

        if (isNew) {
          router.push(`/admin/posts/${saved.id}`);
        }
      } else {
        const err = await res.json();
        error(err.error || "Failed to save post");
        setSaveStatus("Failed to save");
      }
    } catch (err) {
      error("Network error while saving");
      setSaveStatus("Save error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
        <span className="text-xs font-mono">Loading post editor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-surface-200 hover:bg-surface-100 text-gray-400 hover:text-white transition-all border border-white/5"
            title="Back to Posts"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white font-display">
              {isNew ? "Add New Post" : "Edit Post"}
            </h1>
            <p className="text-[11px] font-mono text-gray-400">
              {saveStatus}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {!isNew && formData.slug && (
            <Link
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 text-gray-300 hover:text-brand-cyan text-xs font-mono border border-white/5 flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 text-gray-200 text-xs font-mono border border-white/10 transition-all disabled:opacity-40"
          >
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={saving}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Publish Post</span>
          </button>
        </div>
      </div>

      {/* Editor Grid: Main Left Editor & Right Sidebar Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Title, Slug, Content & SEO Box */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Title & Slug */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4">
            <div className="space-y-1.5">
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Add blog post title here..."
                className="w-full text-xl sm:text-2xl font-bold bg-transparent text-white placeholder-gray-500 focus:outline-none border-b border-white/10 pb-2 font-display"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="text-gray-500">Permalink:</span>
              <span className="text-brand-cyan">/blog/</span>
              <input
                type="text"
                value={formData.slug || ""}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "") })
                }
                placeholder="post-slug"
                className="bg-surface-100 px-2 py-1 rounded border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>

          {/* WordPress Rich Content Editor */}
          <div>
            <label className="text-xs font-mono text-gray-300 block mb-2 font-semibold">
              Post Body Content (Markdown & HTML Blocks Supported):
            </label>
            <RichEditor
              value={formData.content || ""}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>

          {/* Excerpt */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-2">
            <label className="text-xs font-mono text-white font-bold block">
              Post Excerpt (Summary for Cards & RSS)
            </label>
            <textarea
              rows={3}
              value={formData.excerpt || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  excerpt: e.target.value,
                  metaDescription: formData.metaDescription || e.target.value,
                })
              }
              placeholder="A concise 1-2 sentence summary of this article..."
              className="w-full p-3 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-green font-mono"
            />
          </div>

          {/* SEO & Search Engine Optimization Box */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-brand-green/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-green" />
                <h3 className="text-sm font-bold text-white font-display">
                  SEO & Structured Data Settings
                </h3>
              </div>
              <span className="text-[10px] font-mono text-brand-green bg-brand-green/10 px-2 py-0.5 rounded border border-brand-green/30">
                Search Engine Optimized
              </span>
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="p-4 rounded-xl bg-[#0f1117] border border-white/10 space-y-1 font-sans">
              <p className="text-[10px] font-mono text-gray-400">
                Google SERP Snippet Preview:
              </p>
              <div className="text-sm font-medium text-[#8ab4f8] truncate cursor-pointer hover:underline">
                {formData.seoTitle || formData.title || "SEO Post Title"}
              </div>
              <div className="text-[11px] font-mono text-[#00e599] truncate">
                https://sunilbohara.com/blog/{formData.slug || "example-post"}
              </div>
              <div className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {formData.metaDescription ||
                  formData.excerpt ||
                  "Meta description snippet describing this in-depth search engine optimization guide..."}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">
                  SEO Title Tag
                </label>
                <input
                  type="text"
                  value={formData.seoTitle || ""}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Optimal length 50-60 characters"
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  value={formData.focusKeyword || ""}
                  onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                  placeholder="e.g. Core Web Vitals"
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={formData.metaDescription || ""}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Recommended 140-160 characters..."
                className="w-full p-3 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">
                Canonical URL (Leave empty for self-referencing default)
              </label>
              <input
                type="text"
                value={formData.canonicalUrl || ""}
                onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                placeholder="https://sunilbohara.com/blog/..."
                className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Publishing, Category, Featured Image, Tags */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publish Box */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold pb-2 border-b border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
              <span>Publishing Controls</span>
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <select
                  value={formData.status || "draft"}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                  className="px-2 py-1 rounded-lg bg-surface-100 border border-white/10 text-white text-xs font-mono"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="trash">Trash</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">Author:</span>
                <span className="text-white font-semibold">
                  {formData.authorName || "Sunil Kumar Bohara"}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleSave()}
                disabled={saving}
                className="w-full py-2.5 rounded-xl bg-brand-green/20 hover:bg-brand-green/30 border border-brand-green/40 text-brand-green font-bold text-xs font-mono transition-all"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Category Selector */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold pb-2 border-b border-white/10 flex items-center gap-2">
              <FolderTree className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Category</span>
            </h3>

            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 text-xs font-mono text-gray-300 cursor-pointer hover:text-white"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={formData.category === cat.name}
                    onChange={() => setFormData({ ...formData, category: cat.name, categoryId: cat.id })}
                    className="accent-brand-green"
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold pb-2 border-b border-white/10 flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5 text-brand-green" />
              <span>Featured Image</span>
            </h3>

            {formData.featuredImage ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10 bg-surface-100">
                  <img
                    src={formData.featuredImage}
                    alt="Featured Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMediaTarget("featured");
                      setMediaModalOpen(true);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-gray-300"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, featuredImage: "" })}
                    className="py-1.5 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-mono"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMediaTarget("featured");
                  setMediaModalOpen(true);
                }}
                className="w-full py-8 border-2 border-dashed border-white/10 hover:border-brand-green/40 rounded-xl text-center text-xs font-mono text-gray-400 hover:text-brand-green transition-all block"
              >
                <ImageIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                <span>Select Featured Image</span>
              </button>
            )}
          </div>

          {/* Tags */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold pb-2 border-b border-white/10 flex items-center gap-2">
              <TagIcon className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Tags</span>
            </h3>

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type tag & press Enter..."
              className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
            />

            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 rounded-lg bg-surface-100 text-xs font-mono text-gray-300 border border-white/5 flex items-center gap-1.5"
                >
                  <span>#{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(t)}
                    className="text-gray-500 hover:text-red-400 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => {
          if (mediaTarget === "featured") {
            setFormData({ ...formData, featuredImage: url, ogImage: formData.ogImage || url });
          } else {
            setFormData({ ...formData, ogImage: url });
          }
        }}
        title="Choose Featured Image"
      />
    </div>
  );
}
