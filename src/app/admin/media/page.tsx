"use client";

import React, { useState, useEffect } from "react";
import { MediaItem } from "@/types";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Save,
  Loader2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminMediaPage() {
  const { success, error } = useToast();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [savingSeo, setSavingSeo] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
        if (data.length > 0 && !selectedItem) {
          setSelectedItem(data[0]);
        }
      }
    } catch (err) {
      error("Failed to load media items");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newItem = await res.json();
        setMediaList((prev) => [newItem, ...prev]);
        setSelectedItem(newItem);
        success("Image uploaded successfully!");
      } else {
        const err = await res.json();
        error(err.error || "Upload failed");
      }
    } catch (err) {
      error("Network error during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setSavingSeo(true);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedItem),
      });

      if (res.ok) {
        const updated = await res.json();
        setMediaList((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        setSelectedItem(updated);
        success("Image SEO metadata updated!");
      } else {
        error("Failed to update Image SEO");
      }
    } catch (err) {
      error("Network error");
    } finally {
      setSavingSeo(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" from media library?`)) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        success("Image deleted");
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        if (selectedItem?.id === id) {
          setSelectedItem(null);
        }
      } else {
        error("Failed to delete image");
      }
    } catch (err) {
      error("Network error");
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const filtered = mediaList.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.altText?.toLowerCase().includes(search.toLowerCase()) ||
      m.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title & Upload Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">
            Media Library
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Manage image assets and optimize Image SEO metadata (Alt text, Title, Caption)
          </p>
        </div>

        <label className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs cursor-pointer shadow-glow-sm hover:brightness-110 flex items-center gap-2 transition-all">
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{uploading ? "Uploading..." : "Upload Image"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Main Grid: Gallery & Right SEO Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Search & Image Gallery */}
        <div className="lg:col-span-8 space-y-4">
          {/* Search Bar */}
          <div className="p-4 rounded-2xl bg-surface-200/90 border border-white/10 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search media by filename, alt text, or title..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
              />
            </div>
            <span className="text-xs font-mono text-gray-400 hidden sm:inline">
              {filtered.length} items
            </span>
          </div>

          {/* Gallery Grid */}
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
                <span className="text-xs font-mono">Loading media assets...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ImageIcon className="w-12 h-12 text-gray-600 mx-auto" />
                <p className="text-sm font-bold text-white">No media items found</p>
                <p className="text-xs text-gray-400">
                  Upload an image to start building your media library.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filtered.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`group relative rounded-2xl overflow-hidden aspect-square border cursor-pointer transition-all ${
                        isSelected
                          ? "border-brand-green ring-2 ring-brand-green shadow-glow-sm"
                          : "border-white/10 hover:border-brand-green/40 bg-surface-100"
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.altText || item.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-[10px] font-mono text-gray-300 truncate">
                        {item.filename}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right 4 Cols: Image SEO & Details Inspector */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-5 shadow-glass-card">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>Image Details & SEO</span>
            </h2>
          </div>

          {selectedItem ? (
            <div className="space-y-4">
              {/* Preview Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 bg-surface-100">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.altText || selectedItem.filename}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Badges */}
              <div className="space-y-1.5 text-[11px] font-mono text-gray-400 bg-surface-100/70 p-3 rounded-xl border border-white/5">
                <div className="flex justify-between">
                  <span>File:</span>
                  <span className="text-white truncate max-w-[180px]">
                    {selectedItem.filename}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="text-brand-cyan">
                    {Math.round(selectedItem.size / 1024)} KB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="text-gray-300">{selectedItem.mimeType}</span>
                </div>
              </div>

              {/* Copy URL Action */}
              <button
                type="button"
                onClick={() => handleCopyUrl(selectedItem.url)}
                className="w-full py-2 px-3 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                {copiedUrl === selectedItem.url ? (
                  <Check className="w-3.5 h-3.5 text-brand-green" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy Asset URL</span>
              </button>

              {/* Image SEO Form */}
              <form onSubmit={handleSaveSeo} className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-brand-green flex items-center justify-between font-semibold">
                    <span>Alt Text (Alternative Text)</span>
                    <span className="text-[9px] text-gray-400">SEO Required</span>
                  </label>
                  <input
                    type="text"
                    value={selectedItem.altText || ""}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, altText: e.target.value })
                    }
                    placeholder="Describe image for search crawlers..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-300">
                    Title Attribute
                  </label>
                  <input
                    type="text"
                    value={selectedItem.title || ""}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, title: e.target.value })
                    }
                    placeholder="Image title..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-300">
                    Caption
                  </label>
                  <input
                    type="text"
                    value={selectedItem.caption || ""}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, caption: e.target.value })
                    }
                    placeholder="Caption displayed under image..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-gray-300">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={selectedItem.description || ""}
                    onChange={(e) =>
                      setSelectedItem({ ...selectedItem, description: e.target.value })
                    }
                    placeholder="Internal asset description..."
                    className="w-full p-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    disabled={savingSeo}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    {savingSeo ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>Save Image SEO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedItem.id, selectedItem.filename)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-xs font-mono text-gray-500 py-12 text-center">
              Select an image from the gallery to inspect details and edit Image SEO.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
