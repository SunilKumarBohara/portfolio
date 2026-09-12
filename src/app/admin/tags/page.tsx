"use client";

import React, { useState, useEffect } from "react";
import { Tag } from "@/types";
import { Tags, Plus, Trash2, Edit, Save, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminTagsPage() {
  const { success, error } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tags");
      if (res.ok) {
        const data = await res.json();
        setTags(data);
      }
    } catch (err) {
      error("Failed to load tags");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      const payload = {
        id: editingId || undefined,
        name,
        slug,
      };

      const res = await fetch("/api/admin/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        success(editingId ? "Tag updated!" : "Tag created!");
        resetForm();
        fetchTags();
      } else {
        const err = await res.json();
        error(err.error || "Failed to save tag");
      }
    } catch (err) {
      error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (tag: Tag) => {
    setEditingId(tag.id);
    setName(tag.name);
    setSlug(tag.slug);
  };

  const handleDelete = async (id: string, tagName: string) => {
    if (!confirm(`Delete tag "${tagName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/tags?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        success("Tag deleted");
        fetchTags();
      } else {
        error("Failed to delete tag");
      }
    } catch (err) {
      error("Network error");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setSlug("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white font-display">
          Post Tags
        </h1>
        <p className="text-xs text-gray-400 font-mono mt-0.5">
          Manage keyword and topic tags assigned to blog posts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Add / Edit Tag */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4 shadow-glass-card">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Tags className="w-4 h-4 text-brand-green" />
              <span>{editingId ? "Edit Tag" : "Add New Tag"}</span>
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-[11px] font-mono text-gray-400 hover:text-white underline"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Core Web Vitals"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="core-web-vitals"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{editingId ? "Update Tag" : "Add Tag"}</span>
            </button>
          </form>
        </div>

        {/* Right Table: Tags List */}
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-surface-200/90 overflow-hidden shadow-glass-card">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
              <span className="text-xs font-mono">Loading tags...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-100/90 text-[10px] font-mono text-gray-400 uppercase">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Slug</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tags.map((tag) => (
                    <tr key={tag.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-bold text-white font-mono">
                        #{tag.name}
                      </td>
                      <td className="p-4 font-mono text-brand-cyan text-[11px]">
                        {tag.slug}
                      </td>
                      <td className="p-4 text-right font-mono">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEdit(tag)}
                            className="p-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-gray-300 hover:text-white transition-all"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(tag.id, tag.name)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
