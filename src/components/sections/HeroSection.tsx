"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import ScrollReveal from "../ui/ScrollReveal";
import { ArrowRight, Sparkles, TrendingUp, Search, ShieldCheck, Zap, Bot, Layers } from "lucide-react";

// Dynamically import Three.js canvas with SSR disabled for optimal hydration
const HeroCanvas = dynamic(() => import("../3d/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-brand-blue/15 animate-pulse-slow blur-2xl" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-background">
      {/* Background Cybernetic Glow Halos & Grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-radial from-brand-blue/15 via-purple-500/10 to-brand-red/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Availability Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-200/90 border border-brand-blue/40 backdrop-blur-md shadow-glow-sm mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-blue" />
              </span>
              <span className="text-xs font-mono font-medium text-brand-cyan tracking-wide">
                SEO Executive • Available for Projects & Strategy
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tight text-text-primary leading-[1.08] font-display"
            >
              I Turn{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-red bg-clip-text text-transparent">
                Search Visibility
              </span>{" "}
              Into Digital Growth<span className="text-brand-red">.</span>
            </motion.h1>

            {/* Supporting Bio Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-text-secondary mt-6 max-w-2xl font-normal leading-relaxed"
            >
              I&apos;m <span className="text-text-primary font-semibold">Sunil Kumar Bohara</span>, an <strong className="text-brand-blue font-semibold">SEO Executive</strong> based in Nepal helping websites improve visibility, capture search intent, and dominate search results through data-backed SEO, GEO, and AEO optimization.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-8 w-full sm:w-auto"
            >
              <MagneticButton href="#projects" variant="primary" size="lg">
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton href="#contact" variant="secondary" size="lg">
                <span>Let&apos;s Work Together</span>
              </MagneticButton>
            </motion.div>

            {/* Quick SEO Pillar Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 pt-8 border-t border-white/10 w-full text-xs font-mono text-text-secondary"
            >
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/60 border border-white/5 hover:border-brand-blue/40 hover:scale-[1.02] transition-all">
                <Search className="w-4 h-4 text-brand-blue" />
                <span className="text-text-primary font-medium">Technical SEO</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/60 border border-white/5 hover:border-purple-500/40 hover:scale-[1.02] transition-all">
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-text-primary font-medium">GEO & AI Search</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/60 border border-white/5 hover:border-brand-red/40 hover:scale-[1.02] transition-all">
                <Zap className="w-4 h-4 text-brand-red" />
                <span className="text-text-primary font-medium">AEO Answers</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/60 border border-white/5 hover:border-brand-cyan/40 hover:scale-[1.02] transition-all">
                <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                <span className="text-text-primary font-medium">Schema Graph</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Search Engine Ecosystem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* 3D Scene Viewport */}
            <div className="w-full h-[440px] sm:h-[500px] lg:h-[560px] relative rounded-3xl border border-blue-500/20 bg-surface-200/50 backdrop-blur-md overflow-hidden shadow-glass-card group">
              {/* Header bar within 3D widget */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-300/85 border border-brand-blue/30 backdrop-blur-md text-[11px] font-mono text-text-primary">
                  <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-spin-slow" />
                  <span>3D Search Ecosystem</span>
                </div>
                <span className="text-[10px] font-mono text-text-muted bg-surface-300/85 px-2 py-0.5 rounded border border-white/10">
                  Interactive WebGL
                </span>
              </div>

              {/* 3D Canvas */}
              <HeroCanvas />

              {/* Bottom Interactive Hint */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] font-mono text-text-muted pointer-events-none bg-surface-300/80 p-2.5 rounded-xl border border-white/10 backdrop-blur-md">
                <span>Move cursor to rotate & explore</span>
                <span className="text-brand-cyan font-bold">Active Telemetry</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
