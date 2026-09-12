"use client";

import React, { useState, useEffect } from "react";
import { CMSPage } from "@/types";
import { Layers, Plus, Save, Edit, Loader2, CheckCircle2, FileText } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminPagesPage() {
  const { success, error } = useToast();
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pages");
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (err) {
      error("Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage?.title || !editingPage?.slug) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      });

      if (res.ok) {
        success("Page saved successfully!");
        setEditingPage(null);
        fetchPages();
      } else {
        error("Failed to save page");
      }
    } catch (err) {
      error("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">
            Pages Management
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Configure standalone and landing page structures & meta settings
          </p>
        </div>

        <button
          onClick={() =>
            setEditingPage({
              id: `page_${Date.now()}`,
              title: "",
              slug: "",
              content: "",
              status: "published",
              updatedAt: new Date().toISOString(),
            })
          }
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </button>
      </div>

      {editingPage ? (
        <div className="p-6 rounded-2xl bg-surface-200/90 border border-brand-green/30 space-y-6 shadow-glass-card">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-base font-bold text-white font-display">
              {editingPage.id.startsWith("page_new") ? "New Page" : `Edit "${editingPage.title}"`}
            </h2>
            <button
              onClick={() => setEditingPage(null)}
              className="text-xs font-mono text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Page Title</label>
                <input
                  type="text"
                  required
                  value={editingPage.title}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Slug</label>
                <input
                  type="text"
                  required
                  value={editingPage.slug}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, slug: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">SEO Meta Title</label>
                <input
                  type="text"
                  value={editingPage.seoTitle || ""}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, seoTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Meta Description</label>
                <input
                  type="text"
                  value={editingPage.metaDescription || ""}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, metaDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Page Content Summary / Blueprint</label>
              <textarea
                rows={6}
                value={editingPage.content}
                onChange={(e) =>
                  setEditingPage({ ...editingPage, content: e.target.value })
                }
                className="w-full p-3 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs font-mono text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-1.5"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Page</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-surface-200/90 overflow-hidden shadow-glass-card">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
              <span className="text-xs font-mono">Loading pages...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-100/90 text-[10px] font-mono text-gray-400 uppercase">
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold">Slug</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Last Updated</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pages.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-white font-display">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-green" />
                          <span>{p.title}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-brand-cyan text-[11px]">
                        /{p.slug}
                      </td>
                      <td className="p-4 font-mono">
                        <span className="px-2 py-0.5 rounded bg-brand-green/15 text-brand-green border border-brand-green/30 text-[10px]">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-gray-400 text-[11px]">
                        {new Date(p.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right font-mono">
                        <button
                          onClick={() => setEditingPage(p)}
                          className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-gray-300 hover:text-white transition-all"
                          title="Edit page"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
