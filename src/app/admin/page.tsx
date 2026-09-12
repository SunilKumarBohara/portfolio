"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminStats, BlogPost } from "@/types";
import {
  FileText,
  FolderTree,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  FileEdit,
  PlusCircle,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Settings,
  Eye,
  Loader2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, postsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/posts"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setRecentPosts(postsData.slice(0, 6));
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
        <span className="text-xs font-mono">Loading CMS Dashboard metrics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Top Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            CMS Dashboard
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Website Overview, Post Metrics & Activity Log
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-1.5 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Post</span>
          </Link>
          <Link
            href="/admin/media"
            className="px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-gray-200 text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <ImageIcon className="w-4 h-4 text-brand-cyan" />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-200/90 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
            <span>Total Blog Posts</span>
            <FileText className="w-4 h-4 text-brand-green" />
          </div>
          <p className="text-3xl font-black text-white font-display">
            {stats?.totalPosts || 0}
          </p>
          <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-gray-400">
            <span className="text-brand-green">{stats?.publishedPosts || 0} Published</span>
            <span>•</span>
            <span className="text-amber-400">{stats?.draftPosts || 0} Drafts</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-200/90 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
            <span>Categories</span>
            <FolderTree className="w-4 h-4 text-brand-cyan" />
          </div>
          <p className="text-3xl font-black text-white font-display">
            {stats?.totalCategories || 0}
          </p>
          <p className="text-[11px] font-mono text-gray-400 mt-2">
            {stats?.totalTags || 0} Associated Tags
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-200/90 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
            <span>Media Library</span>
            <ImageIcon className="w-4 h-4 text-brand-green" />
          </div>
          <p className="text-3xl font-black text-white font-display">
            {stats?.totalMedia || 0}
          </p>
          <p className="text-[11px] font-mono text-gray-400 mt-2">
            Uploaded Assets & Images
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-200/90 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
            <span>CMS Users</span>
            <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
          </div>
          <p className="text-3xl font-black text-white font-display">
            {stats?.totalUsers || 0}
          </p>
          <p className="text-[11px] font-mono text-brand-green mt-2">
            Authenticated Access Active
          </p>
        </div>
      </div>

      {/* Main Grid: Recent Posts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Recent Posts Table */}
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-surface-200/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-green" />
              <span>Recent Blog Posts</span>
            </h2>
            <Link
              href="/admin/posts"
              className="text-xs font-mono text-brand-cyan hover:underline flex items-center gap-1"
            >
              <span>View All ({stats?.totalPosts})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-mono text-gray-400 uppercase">
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-4">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="font-semibold text-white hover:text-brand-green transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-3.5 pr-4 font-mono text-gray-400">
                      <span className="px-2 py-0.5 rounded bg-surface-100 border border-white/5 text-[10px]">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
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
                    <td className="py-3.5 pr-4 text-gray-400 font-mono text-[11px]">
                      {post.date}
                    </td>
                    <td className="py-3.5 text-right font-mono">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-brand-cyan hover:text-white inline-flex items-center"
                        title="Edit post"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent CMS Activity */}
        <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-surface-200/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" />
              <span>Activity Log</span>
            </h2>
          </div>

          <div className="space-y-3">
            {stats?.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-surface-100/70 border border-white/5 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono text-[11px]">
                      {act.action}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-gray-400 line-clamp-1 text-[11px] font-mono">
                    Target: {act.target}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-gray-500 py-6 text-center">
                No recent activity recorded.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
