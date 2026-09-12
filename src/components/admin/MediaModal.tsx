"use client";

import React, { useState, useEffect } from "react";
import { MediaItem } from "@/types";
import { X, Upload, Search, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string, alt?: string) => void;
  title?: string;
}

export default function MediaModal({
  isOpen,
  onClose,
  onSelect,
  title = "Select Image from Media Library",
}: MediaModalProps) {
  const { success, error } = useToast();
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch (err) {
      console.error("Failed to fetch media:", err);
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
        setTab("library");
        success("Image uploaded successfully!");
      } else {
        const err = await res.json();
        error(err.error || "Failed to upload image");
      }
    } catch (err) {
      error("Network error during upload");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  const filtered = mediaList.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      m.altText?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-surface-300 border border-brand-green/30 rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3 border-b border-white/5 bg-surface-200/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab("library")}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all ${
                tab === "library"
                  ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Media Library
            </button>
            <button
              onClick={() => setTab("upload")}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all ${
                tab === "upload"
                  ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Upload New
            </button>
          </div>

          {tab === "library" && (
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search images..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-green font-mono"
              />
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "library" ? (
            loading ? (
              <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
                <span className="text-xs font-mono">Loading media library...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ImageIcon className="w-12 h-12 text-gray-600 mx-auto" />
                <p className="text-sm font-semibold text-gray-300">No images found</p>
                <p className="text-xs text-gray-500">Upload an image to get started.</p>
                <button
                  onClick={() => setTab("upload")}
                  className="px-4 py-2 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-mono"
                >
                  Switch to Upload
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
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
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-green text-surface-300 flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 font-bold" />
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-[10px] font-mono text-gray-300 truncate">
                        {item.filename}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-12 text-center bg-surface-200/40">
              <Upload className="w-12 h-12 text-brand-cyan mb-4 animate-bounce" />
              <h4 className="text-sm font-bold text-white mb-1">
                Drop files here or click to browse
              </h4>
              <p className="text-xs text-gray-400 mb-6 font-mono">
                Supports JPG, PNG, WEBP, SVG, AVIF (Max 10MB)
              </p>
              <label className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs cursor-pointer shadow-glow-sm hover:brightness-110 flex items-center gap-2">
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Select Local File</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-surface-200/80">
          <div className="text-xs font-mono text-gray-400">
            {selectedItem ? (
              <span>
                Selected: <strong className="text-white">{selectedItem.filename}</strong>
              </span>
            ) : (
              <span>No image selected</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-xs text-gray-300 font-medium"
            >
              Cancel
            </button>
            <button
              disabled={!selectedItem}
              onClick={() => {
                if (selectedItem) {
                  onSelect(selectedItem.url, selectedItem.altText);
                  onClose();
                }
              }}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 text-xs font-bold shadow-glow-sm disabled:opacity-40"
            >
              Insert Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
