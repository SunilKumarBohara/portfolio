"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import {
  X,
  MapPin,
  Briefcase,
  Sparkles,
  Code2,
  CheckCircle2,
  Layers,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  User,
} from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Easily editable profile photo asset location
const profileImage = "/images/profile.jpg";

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [imageError, setImageError] = useState(false);

  // Close on ESC and lock background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const socialIcons = [
    { name: "LinkedIn", href: siteConfig.socials.linkedin, icon: Linkedin, color: "hover:bg-[#0a66c2]/20 hover:text-[#0a66c2] hover:border-[#0a66c2]/50" },
    { name: "GitHub", href: siteConfig.socials.github, icon: Github, color: "hover:bg-white/20 hover:text-white hover:border-white/50" },
    { name: "X (Twitter)", href: siteConfig.socials.twitter, icon: Twitter, color: "hover:bg-[#1da1f2]/20 hover:text-[#1da1f2] hover:border-[#1da1f2]/50" },
    { name: "Facebook", href: siteConfig.socials.facebook, icon: Facebook, color: "hover:bg-[#1877f2]/20 hover:text-[#1877f2] hover:border-[#1877f2]/50" },
    { name: "Instagram", href: siteConfig.socials.instagram, icon: Instagram, color: "hover:bg-[#e4405f]/20 hover:text-[#e4405f] hover:border-[#e4405f]/50" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            className="relative w-full max-w-lg rounded-3xl bg-surface-200/95 border border-blue-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.25)] text-text-primary z-10 my-8 overflow-hidden"
          >
            {/* Ambient Background Gradient Halos */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-surface-100/90 border border-white/10 hover:border-brand-red text-text-secondary hover:text-brand-red transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red z-20"
              aria-label="Close Profile"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Circular Photo & Monogram */}
            <div className="flex flex-col items-center text-center space-y-4 pt-2">
              {/* Profile Photo Area with Animated Blue/Red Gradient Ring */}
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-red opacity-80 blur-[8px] group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 animate-pulse-slow" />
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2.5px] bg-gradient-to-tr from-brand-blue via-purple-500 to-brand-red shadow-2xl overflow-hidden flex items-center justify-center bg-surface-300 group-hover:scale-105 transition-transform duration-300">
                  {!imageError ? (
                    <img
                      src={profileImage}
                      alt="Sunil Kumar Bohara — SEO Executive"
                      onError={() => setImageError(true)}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-surface-100 flex flex-col items-center justify-center text-center p-2">
                      <div className="w-12 h-12 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-brand-cyan mb-1">
                        <User className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-brand-cyan tracking-wider">
                        SKB
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Identity & Badges */}
              <div>
                <h2 id="profile-modal-title" className="text-2xl sm:text-3xl font-black font-display tracking-tight text-text-primary">
                  Sunil Kumar Bohara
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/40 text-xs font-mono font-semibold text-brand-cyan">
                    <Briefcase className="w-3.5 h-3.5 text-brand-blue" />
                    SEO Executive
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-100 border border-white/10 text-xs font-mono text-text-secondary">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    Nepal
                  </span>
                </div>
              </div>

              {/* Bio Statement */}
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-md italic border-l-2 border-brand-red/60 pl-3.5 py-1 text-left bg-surface-100/50 rounded-r-xl">
                &ldquo;SEO Executive focused on search visibility, keyword research, content optimization, technical SEO and the evolving search landscape.&rdquo;
              </p>
            </div>

            {/* Information Grid */}
            <div className="space-y-3.5 mt-6">
              {/* Focus Pillars (SEO, GEO, AEO) */}
              <div className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted mb-2.5 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Strategic Focus</span>
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-surface-200 border border-blue-500/25">
                    <span className="text-xs font-black font-display text-brand-blue block">SEO</span>
                    <span className="text-[9px] font-mono text-text-muted">Search Engines</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-200 border border-purple-500/25">
                    <span className="text-xs font-black font-display text-purple-400 block">GEO</span>
                    <span className="text-[9px] font-mono text-text-muted">AI & LLM Search</span>
                  </div>
                  <div className="p-2 rounded-xl bg-surface-200 border border-brand-red/25">
                    <span className="text-xs font-black font-display text-brand-red block">AEO</span>
                    <span className="text-[9px] font-mono text-text-muted">Direct Answers</span>
                  </div>
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-brand-red" />
                  <span>Core SEO Skills</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Technical SEO",
                    "Keyword Research",
                    "On-Page SEO",
                    "Content Strategy",
                    "Off-Page SEO",
                    "Web Optimization",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-surface-200 border border-white/10 text-[11px] font-mono text-text-secondary flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-brand-blue shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="p-3.5 rounded-2xl bg-surface-100/80 border border-white/10">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Web Technologies</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["HTML", "CSS", "JavaScript", "PHP", "MySQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-surface-200 border border-blue-500/20 text-[11px] font-mono text-brand-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Links Footer (Circular Buttons) */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-text-muted">Connect with Sunil:</span>
              <div className="flex items-center gap-2">
                {socialIcons.map((soc) => {
                  const Icon = soc.icon;
                  return (
                    <a
                      key={soc.name}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-full bg-surface-100 border border-white/10 flex items-center justify-center text-text-secondary ${soc.color} hover:scale-110 hover:shadow-glow-sm transition-all duration-200`}
                      title={soc.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
