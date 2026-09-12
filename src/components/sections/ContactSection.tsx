"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { siteConfig } from "@/data/siteConfig";
import MagneticButton from "../ui/MagneticButton";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Linkedin,
  Github,
  Twitter,
  Sparkles,
  Globe,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    service: "Technical SEO Audit",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-brand-green/10 via-brand-cyan/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Direct Inquiries & Strategy"
          title="Let's Grow Something That Gets Found."
          subtitle="Have a website that needs better visibility? Let's talk about your SEO goals."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Availability */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <GlassCard className="p-8 border-brand-green/30">
              <h3 className="text-xl font-bold text-white font-display mb-2">
                Start an SEO Conversation
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Whether you need a comprehensive technical audit, a long-term organic growth roadmap, or guidance on search engine algorithms, I am ready to collaborate.
              </p>

              {/* Status Indicator */}
              <div className="p-4 rounded-xl bg-surface-100/90 border border-white/5 space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-green">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                  <span className="font-bold">Available for Q3/Q4 Projects</span>
                </div>
                <p className="text-[11px] font-mono text-gray-400">
                  Response Time: Typically within 24 business hours.
                </p>
              </div>

              {/* Email & Location Information */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-100/70 border border-white/5">
                  <div className="flex items-center gap-2.5 text-gray-300">
                    <Mail className="w-4 h-4 text-brand-cyan" />
                    <span>{siteConfig.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-surface-200 hover:bg-surface-50 border border-white/10 text-gray-300 hover:text-brand-green transition-all"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-brand-green" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-100/70 border border-white/5 text-gray-300">
                  <MapPin className="w-4 h-4 text-brand-green" />
                  <span>Kathmandu, Nepal (GMT+5:45)</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-3">
                  Verified Social Channels
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                    aria-label="Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column: Interactive Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 sm:p-10 border-white/10">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-brand-green/20 border-2 border-brand-green flex items-center justify-center text-brand-green mx-auto shadow-glow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Message Dispatched Successfully!
                  </h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Sunil will review your website details and reply promptly with initial thoughts.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        website: "",
                        service: "Technical SEO Audit",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-white/10 text-xs font-mono text-gray-300"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300">
                        Your Name <span className="text-brand-green">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300">
                        Email Address <span className="text-brand-green">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company / Website */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300">
                        Company or Website URL
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all font-mono"
                      />
                    </div>

                    {/* Service Required */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-gray-300">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                      >
                        <option value="Technical SEO Audit">Technical SEO Audit</option>
                        <option value="Keyword & Search Intent Strategy">Keyword & Search Intent Strategy</option>
                        <option value="On-Page & Semantic Optimization">On-Page & Semantic Optimization</option>
                        <option value="Content Strategy & Authority">Content Strategy & Authority</option>
                        <option value="Local SEO & Google Maps">Local SEO & Google Maps</option>
                        <option value="Core Web Vitals Remediation">Core Web Vitals Remediation</option>
                        <option value="Full Organic Growth Partnership">Full Organic Growth Partnership</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300">
                      Project Details & SEO Goals <span className="text-brand-green">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describe your current search challenges, traffic goals, or timelines..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-100/90 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-green via-teal-400 to-brand-cyan text-surface-300 font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-glow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="font-mono text-xs">Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message & Inquire</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
