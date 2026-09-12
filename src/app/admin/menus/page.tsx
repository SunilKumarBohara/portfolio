"use client";

import React, { useState, useEffect } from "react";
import { MenuItem } from "@/types";
import { MenuSquare, Plus, Trash2, ArrowUp, ArrowDown, Save, Loader2, Link2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminMenusPage() {
  const { success, error } = useToast();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New Item State
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/menus");
      if (res.ok) {
        const data = await res.json();
        setMenus(data);
      }
    } catch (err) {
      error("Failed to load navigation menus");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newUrl) return;

    const newItem: MenuItem = {
      id: `menu_${Date.now()}`,
      label: newLabel,
      url: newUrl,
      order: menus.length + 1,
    };

    setMenus([...menus, newItem]);
    setNewLabel("");
    setNewUrl("");
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const newItems = [...menus];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // re-index order
    const updated = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setMenus(updated);
  };

  const handleDelete = (id: string) => {
    setMenus(menus.filter((m) => m.id !== id));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menus),
      });

      if (res.ok) {
        success("Navigation menu updated!");
      } else {
        error("Failed to save menu changes");
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
            Navigation Menu Manager
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Configure, reorder, and link items displayed across the public navbar
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Navigation Menu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Add Menu Link */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4 shadow-glass-card">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-white/10">
            <Plus className="w-4 h-4 text-brand-green" />
            <span>Add Menu Item</span>
          </h2>

          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Link Label</label>
              <input
                type="text"
                required
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g. Case Studies"
                className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Target URL / Anchor</label>
              <input
                type="text"
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="e.g. #projects or /blog"
                className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-white flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-brand-green" />
              <span>Add to Menu Structure</span>
            </button>
          </form>

          {/* Quick Presets */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <p className="text-[10px] font-mono text-gray-500 uppercase">
              Quick Anchor Presets:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "About", url: "#about" },
                { label: "Services", url: "#services" },
                { label: "Approach", url: "#approach" },
                { label: "Skills", url: "#skills" },
                { label: "Projects", url: "#projects" },
                { label: "SEO Lab", url: "#seo-lab" },
                { label: "Blog", url: "/blog" },
                { label: "Contact", url: "#contact" },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setNewLabel(preset.label);
                    setNewUrl(preset.url);
                  }}
                  className="px-2 py-1 rounded bg-surface-100 border border-white/5 text-[10px] font-mono text-gray-400 hover:text-brand-green"
                >
                  +{preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right List: Menu Items with Reorder */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4 shadow-glass-card">
          <h2 className="text-sm font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-white/10">
            <MenuSquare className="w-4 h-4 text-brand-cyan" />
            <span>Menu Order & Hierarchy</span>
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
              <span className="text-xs font-mono">Loading menu items...</span>
            </div>
          ) : menus.length === 0 ? (
            <p className="text-xs font-mono text-gray-500 py-12 text-center">
              No menu items yet. Add items using the left form.
            </p>
          ) : (
            <div className="space-y-2">
              {menus.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-surface-100 border border-white/5 hover:border-brand-green/30 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-surface-200 text-gray-400 font-mono flex items-center justify-center text-[10px] font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-bold text-white font-display block">
                        {item.label}
                      </span>
                      <span className="text-[11px] font-mono text-brand-cyan">
                        {item.url}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, "up")}
                      className="p-1.5 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-400 hover:text-white disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === menus.length - 1}
                      onClick={() => handleMove(index, "down")}
                      className="p-1.5 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-400 hover:text-white disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
