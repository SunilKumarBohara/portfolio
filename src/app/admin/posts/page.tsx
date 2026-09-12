"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost, Category } from "@/types";
import {
  FileText,
  PlusCircle,
  Search,
  Trash2,
  Edit,
  Eye,
  CheckSquare,
  Square,
  Filter,
  CheckCircle2,
  Clock,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminPostsPage() {
  const { success, error } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Selection
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState("");
  const [processingBulk, setProcessingBulk] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [statusFilter, categoryFilter]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/posts", window.location.origin);
      if (statusFilter !== "all") url.searchParams.set("status", statusFilter);
      if (categoryFilter !== "all") url.searchParams.set("category", categoryFilter);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExecuteBulk = async () => {
    if (!bulkAction || selectedIds.length === 0) return;

    setProcessingBulk(true);
    try {
      let action = "";
      let value = "";

      if (bulkAction === "publish") {
        action = "status";
        value = "published";
      } else if (bulkAction === "draft") {
        action = "status";
        value = "draft";
      } else if (bulkAction === "trash") {
        action = "status";
        value = "trash";
      } else if (bulkAction === "delete") {
        action = "delete";
      }

      const res = await fetch("/api/admin/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, action, value }),
      });

      if (res.ok) {
        success(`Applied ${bulkAction} to ${selectedIds.length} posts`);
        setSelectedIds([]);
        setBulkAction("");
        fetchPosts();
      } else {
        error("Failed to execute bulk action");
      }
    } catch (err) {
      error("Error executing bulk action");
    } finally {
      setProcessingBulk(false);
    }
  };

  const handleDeleteSingle = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        success("Post deleted successfully");
        fetchPosts();
      } else {
        error("Failed to delete post");
      }
    } catch (err) {
      error("Network error");
    }
  };

  // Counts for status tabs
  const allCount = posts.length;
  const publishedCount = posts.filter((p) => p.status === "published" || !p.status).length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const trashCount = posts.filter((p) => p.status === "trash").length;

  return (
    <div className="space-y-6">
      {/* Top Title & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">
            Blog Posts
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Manage, edit, publish, and optimize your SEO blog articles
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-1.5 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Post</span>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 text-xs font-mono">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            statusFilter === "all"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          All ({allCount})
        </button>
        <button
          onClick={() => setStatusFilter("published")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            statusFilter === "published"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Published ({publishedCount})
        </button>
        <button
          onClick={() => setStatusFilter("draft")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            statusFilter === "draft"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Drafts ({draftCount})
        </button>
        <button
          onClick={() => setStatusFilter("scheduled")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            statusFilter === "scheduled"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Scheduled ({scheduledCount})
        </button>
        <button
          onClick={() => setStatusFilter("trash")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            statusFilter === "trash"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Trash ({trashCount})
        </button>
      </div>

      {/* Search & Bulk Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-surface-200/80 border border-white/10">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={bulkAction}
            onChange={(e) => setBulkAction(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-brand-green"
          >
            <option value="">Bulk Actions</option>
            <option value="publish">Mark as Published</option>
            <option value="draft">Move to Drafts</option>
            <option value="trash">Move to Trash</option>
            <option value="delete">Delete Permanently</option>
          </select>

          <button
            onClick={handleExecuteBulk}
            disabled={!bulkAction || selectedIds.length === 0 || processingBulk}
            className="px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-gray-200 disabled:opacity-40"
          >
            {processingBulk ? "Applying..." : "Apply"}
          </button>

          {selectedIds.length > 0 && (
            <span className="text-xs font-mono text-brand-green">
              {selectedIds.length} selected
            </span>
          )}
        </div>

        {/* Category Filter & Search Box */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-brand-green"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="pl-8 pr-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-green font-mono w-full sm:w-48"
            />
          </form>
        </div>
      </div>

      {/* Posts Table */}
      <div className="rounded-2xl border border-white/10 bg-surface-200/80 overflow-hidden shadow-glass-card">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
            <span className="text-xs font-mono">Loading blog posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <FileText className="w-10 h-10 text-gray-600 mx-auto" />
            <p className="text-sm font-bold text-white">No posts match criteria</p>
            <p className="text-xs text-gray-400">
              Create a new blog article or adjust your search filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 bg-surface-100/90 text-[10px] font-mono text-gray-400 uppercase">
                  <th className="p-4 w-10">
                    <button
                      onClick={handleSelectAll}
                      className="text-gray-400 hover:text-white"
                    >
                      {selectedIds.length === posts.length && posts.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-brand-green" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-4 pr-4 font-semibold">Title</th>
                  <th className="py-4 pr-4 font-semibold">Author</th>
                  <th className="py-4 pr-4 font-semibold">Category</th>
                  <th className="py-4 pr-4 font-semibold">Status</th>
                  <th className="py-4 pr-4 font-semibold">Date</th>
                  <th className="py-4 pr-6 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => {
                  const isSelected = selectedIds.includes(post.id);
                  return (
                    <tr
                      key={post.id}
                      className={`hover:bg-white/[0.02] transition-colors ${
                        isSelected ? "bg-brand-green/5" : ""
                      }`}
                    >
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleSelect(post.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-brand-green" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="space-y-1">
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="font-bold text-white hover:text-brand-green transition-colors text-sm line-clamp-1 font-display"
                          >
                            {post.title}
                          </Link>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                            <span>Slug: /{post.slug}</span>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 font-mono text-gray-300">
                        {post.authorName || "Sunil Kumar Bohara"}
                      </td>
                      <td className="py-4 pr-4 font-mono">
                        <span className="px-2.5 py-1 rounded-full bg-surface-100 border border-white/5 text-[10px] text-gray-300">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-4 pr-4 font-mono">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            post.status === "published" || !post.status
                              ? "bg-brand-green/15 text-brand-green border border-brand-green/30"
                              : post.status === "draft"
                              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                              : "bg-gray-500/15 text-gray-400"
                          }`}
                        >
                          {post.status || "published"}
                        </span>
                      </td>
                      <td className="py-4 pr-4 font-mono text-gray-400 text-[11px]">
                        {post.date}
                      </td>
                      <td className="py-4 pr-6 text-right font-mono">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-gray-400 hover:text-brand-cyan transition-all"
                            title="Preview post on site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/posts/${post.id}`}
                            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-gray-400 hover:text-white transition-all"
                            title="Edit post"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteSingle(post.id, post.title)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                            title="Delete post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
