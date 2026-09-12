"use client";

import React, { useState, useEffect } from "react";
import { SiteSettings } from "@/types";
import {
  Settings,
  Save,
  Globe,
  Search,
  Layout,
  Layers,
  Sparkles,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminSettingsPage() {
  const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState<"general" | "seo" | "header" | "footer">("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "",
    tagline: "",
    logo: "",
    favicon: "",
    contactEmail: "",
    phone: "",
    address: "",
    socialLinkedin: "",
    socialGithub: "",
    socialTwitter: "",
    socialWebsite: "",
    defaultMetaTitle: "",
    defaultMetaDescription: "",
    defaultOgImage: "",
    robotsTxt: "",
    googleAnalyticsId: "",
    searchConsoleCode: "",
    headerLogo: "SUNIL",
    headerCtaText: "Let's Talk",
    headerCtaUrl: "#contact",
    footerText: "",
    copyrightText: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        success("Site settings updated successfully!");
      } else {
        const err = await res.json();
        error(err.error || "Failed to update settings");
      }
    } catch (err) {
      error("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-brand-green" />
        <span className="text-xs font-mono">Loading site settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-display">
            Website & Global CMS Settings
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Configure site metadata, brand identity, tracking scripts, and layout elements
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-xs shadow-glow-sm hover:brightness-110 flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 text-xs font-mono">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "general"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>General & Identity</span>
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "seo"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>SEO & Tracking</span>
        </button>
        <button
          onClick={() => setActiveTab("header")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "header"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Header Layout</span>
        </button>
        <button
          onClick={() => setActiveTab("footer")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "footer"
              ? "bg-brand-green/20 text-brand-green font-bold border border-brand-green/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Footer Layout</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings Tab */}
        {activeTab === "general" && (
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4 shadow-glass-card">
            <h2 className="text-sm font-bold text-white font-display pb-2 border-b border-white/10">
              General Identity & Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Website Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Tagline / Role</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Phone</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Location / Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-brand-green font-bold">
                Social Profile Links
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">LinkedIn URL</label>
                  <input
                    type="text"
                    value={settings.socialLinkedin}
                    onChange={(e) => setSettings({ ...settings, socialLinkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">GitHub URL</label>
                  <input
                    type="text"
                    value={settings.socialGithub}
                    onChange={(e) => setSettings({ ...settings, socialGithub: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">Twitter / X URL</label>
                  <input
                    type="text"
                    value={settings.socialTwitter}
                    onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">Personal Website URL</label>
                  <input
                    type="text"
                    value={settings.socialWebsite}
                    onChange={(e) => setSettings({ ...settings, socialWebsite: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Settings Tab */}
        {activeTab === "seo" && (
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-brand-green/30 space-y-4 shadow-glass-card">
            <h2 className="text-sm font-bold text-white font-display pb-2 border-b border-white/10 flex items-center gap-2">
              <Search className="w-4 h-4 text-brand-green" />
              <span>Default SEO Metadata & Analytics Verification</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Default Title Tag</label>
              <input
                type="text"
                value={settings.defaultMetaTitle}
                onChange={(e) => setSettings({ ...settings, defaultMetaTitle: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Default Meta Description</label>
              <textarea
                rows={3}
                value={settings.defaultMetaDescription}
                onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
                className="w-full p-3 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Google Analytics 4 Measurement ID</label>
                <input
                  type="text"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Google Search Console Verification Token</label>
                <input
                  type="text"
                  value={settings.searchConsoleCode}
                  onChange={(e) => setSettings({ ...settings, searchConsoleCode: e.target.value })}
                  placeholder="verification_code"
                  className="w-full px-3 py-2 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Robots.txt Directives</label>
              <textarea
                rows={4}
                value={settings.robotsTxt}
                onChange={(e) => setSettings({ ...settings, robotsTxt: e.target.value })}
                className="w-full p-3 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>
        )}

        {/* Header Tab */}
        {activeTab === "header" && (
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4 shadow-glass-card">
            <h2 className="text-sm font-bold text-white font-display pb-2 border-b border-white/10">
              Header Logo & CTA Button
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Logo Text</label>
                <input
                  type="text"
                  value={settings.headerLogo}
                  onChange={(e) => setSettings({ ...settings, headerLogo: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Header CTA Text</label>
                <input
                  type="text"
                  value={settings.headerCtaText}
                  onChange={(e) => setSettings({ ...settings, headerCtaText: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Header CTA URL</label>
                <input
                  type="text"
                  value={settings.headerCtaUrl}
                  onChange={(e) => setSettings({ ...settings, headerCtaUrl: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Tab */}
        {activeTab === "footer" && (
          <div className="p-6 rounded-2xl bg-surface-200/90 border border-white/10 space-y-4 shadow-glass-card">
            <h2 className="text-sm font-bold text-white font-display pb-2 border-b border-white/10">
              Footer Text & Copyright
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Footer Bio Text</label>
              <textarea
                rows={3}
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className="w-full p-3 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300">Copyright Line</label>
              <input
                type="text"
                value={settings.copyrightText}
                onChange={(e) => setSettings({ ...settings, copyrightText: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-100 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-brand-green"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
