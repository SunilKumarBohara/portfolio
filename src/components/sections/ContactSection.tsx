"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { siteConfig } from "@/data/siteConfig";
import ScrollReveal from "../ui/ScrollReveal";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Custom X (Twitter) Icon
function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialProfiles = [
  {
    name: "GitHub",
    handle: "SunilKumarBohara",
    url: siteConfig.socials.github,
    icon: Github,
    color: "hover:text-white hover:border-gray-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    badgeColor: "bg-gray-800 text-gray-200",
  },
  {
    name: "LinkedIn",
    handle: "Sunil Kumar Bohara",
    url: siteConfig.socials.linkedin,
    icon: Linkedin,
    color: "hover:text-sky-400 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]",
    badgeColor: "bg-sky-950 text-sky-300",
  },
  {
    name: "Facebook",
    handle: "sunilkumarbohara99",
    url: siteConfig.socials.facebook,
    icon: Facebook,
    color: "hover:text-blue-500 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    badgeColor: "bg-blue-950 text-blue-300",
  },
  {
    name: "Instagram",
    handle: "sunilkumarbohara7",
    url: siteConfig.socials.instagram,
    icon: Instagram,
    color: "hover:text-pink-400 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(244,114,182,0.3)]",
    badgeColor: "bg-pink-950 text-pink-300",
  },
  {
    name: "X (Twitter)",
    handle: "@SunilBohara66",
    url: siteConfig.socials.twitter,
    icon: XTwitterIcon,
    color: "hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    badgeColor: "bg-cyan-950 text-cyan-300",
  },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "Technical SEO & Audit",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to deliver enquiry. Please try emailing directly.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please try again or reach out via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-brand-blue/10 via-brand-red/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Direct Consultation & Inquiries"
            title="Let's Grow Your Search Presence."
            subtitle="Have a website ready for higher visibility, cleaner technical architecture, and organic search traffic? Let's discuss your project."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & 5 Verified Social Profiles */}
          <ScrollReveal animation="slide-left" className="lg:col-span-5 space-y-6">
            <GlassCard className="p-8 border-brand-blue/30">
              <h3 className="text-xl font-bold text-text-primary font-display mb-2">
                Get In Touch with Sunil
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-6">
                Whether you need a full technical SEO audit, a keyword roadmap, or guidance on optimizing for AI and Answer engines (GEO/AEO), I am available to help.
              </p>

              {/* Status Indicator */}
              <div className="p-4 rounded-xl bg-surface-100/90 border border-white/5 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="font-bold">Available for Inquiries & Consultation</span>
                </div>
                <p className="text-[11px] font-mono text-text-muted">
                  Location: Kathmandu, Nepal (GMT+5:45)
                </p>
              </div>

              {/* Email Information */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-100/70 border border-white/5">
                  <div className="flex items-center gap-2.5 text-text-muted">
                    <Mail className="w-4 h-4 text-brand-cyan" />
                    <span className="text-text-primary font-medium">{siteConfig.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-surface-200 hover:bg-surface-50 border border-white/10 text-text-muted hover:text-brand-cyan transition-all"
                    title="Copy email address"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-brand-cyan" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* 5 Verified Social Profiles with 3D Hover & Glow */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-cyan font-semibold">
                    Verified Social Profiles
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">Official Links</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {socialProfiles.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between p-3 rounded-xl bg-surface-100/80 border border-white/5 transition-all duration-300 transform hover:-translate-y-0.5 ${item.color}`}
                        aria-label={`${item.name} profile`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface-200 border border-white/10 flex items-center justify-center text-text-muted group-hover:scale-110 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-text-primary block group-hover:text-brand-cyan transition-colors font-display">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono text-text-muted">
                              {item.handle}
                            </span>
                          </div>
                        </div>

                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-brand-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Right Column: Server-Side Validated Contact Form */}
          <ScrollReveal animation="slide-right" className="lg:col-span-7">
            <GlassCard className="p-8 sm:p-10 border-white/10">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-blue/20 border-2 border-brand-blue flex items-center justify-center text-brand-cyan mx-auto shadow-glow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary font-display">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-xs text-text-muted max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, <strong className="text-text-primary">{formData.name}</strong>. Your message has been routed directly to Sunil&apos;s inbox. You will receive a response shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        website: "",
                        service: "Technical SEO & Audit",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-text-muted"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-text-muted">
                        Your Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-text-primary placeholder-text-muted/50 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-text-muted">
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-text-primary placeholder-text-muted/50 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company / Website */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-text-muted">
                        Website or Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-text-primary placeholder-text-muted/50 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all font-mono"
                      />
                    </div>

                    {/* Service Required */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-text-muted">
                        Requested Focus
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-text-primary text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                      >
                        <option value="Technical SEO & Audit">Technical SEO & Audit</option>
                        <option value="Generative Engine Optimization (GEO)">Generative Engine Optimization (GEO)</option>
                        <option value="Answer Engine Optimization (AEO)">Answer Engine Optimization (AEO)</option>
                        <option value="Keyword & Search Intent Strategy">Keyword & Search Intent Strategy</option>
                        <option value="On-Page & Semantic Architecture">On-Page & Semantic Architecture</option>
                        <option value="Core Web Vitals Remediation">Core Web Vitals Remediation</option>
                        <option value="Ongoing SEO Executive Retainer">Ongoing SEO Executive Retainer</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-text-muted">
                      Project Details & Search Goals <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share details about your site, target search audience, or specific challenges..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-text-primary placeholder-text-muted/50 text-xs focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-red text-white font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-glow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-mono text-xs">Sending to Sunil&apos;s Inbox...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
