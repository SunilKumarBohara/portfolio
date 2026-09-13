"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import ScrollReveal from "../ui/ScrollReveal";
import { SearchPlanetKey } from "../3d/SearchUniverse3D";
import {
  Sparkles,
  Search,
  Bot,
  MessageSquare,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingUp,
  Globe,
  Radio,
} from "lucide-react";

// Dynamically import 3D Solar System to avoid SSR mismatch
const SearchUniverse3D = dynamic(() => import("../3d/SearchUniverse3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] sm:h-[540px] flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-brand-blue/15 animate-pulse-slow blur-2xl" />
    </div>
  ),
});

const planetDetails: Record<
  SearchPlanetKey,
  {
    code: string;
    title: string;
    fullName: string;
    subtitle: string;
    description: string;
    accentColor: string;
    badgeColor: string;
    glowColor: string;
    icon: React.ElementType;
    concepts: string[];
    roleInStrategy: string;
  }
> = {
  seo: {
    code: "SEO",
    title: "Search Engine Optimization",
    fullName: "Search Engine Optimization (SEO)",
    subtitle: "Foundational Organic Crawlability & Keyword Architecture",
    description:
      "The core discipline of optimizing technical web infrastructure, keyword relevance, on-page semantics, and backlink authority to guarantee maximum visibility across traditional search engines.",
    accentColor: "text-brand-blue",
    badgeColor: "border-brand-blue/40 bg-brand-blue/10 text-brand-cyan",
    glowColor: "rgba(59, 130, 246, 0.4)",
    icon: Search,
    concepts: [
      "Technical SEO",
      "On-Page",
      "Off-Page",
      "Keywords",
      "Organic Growth",
    ],
    roleInStrategy:
      "Captures high-volume intent and guarantees crawl accessibility across Google, Bing, and traditional search crawlers.",
  },
  geo: {
    code: "GEO",
    title: "Generative Engine Optimization",
    fullName: "Generative Engine Optimization (GEO)",
    subtitle: "AI Search, LLM Synthesis & Entity Prominence",
    description:
      "Positioning your digital brand inside large language models and conversational search engines (ChatGPT, Google Gemini & AI Overviews, Perplexity) to become a recommended, cited source.",
    accentColor: "text-purple-400",
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-400",
    glowColor: "rgba(168, 85, 247, 0.4)",
    icon: Bot,
    concepts: [
      "AI Search",
      "Generative Results",
      "Entities",
      "Visibility",
      "Discovery",
    ],
    roleInStrategy:
      "Ensures your website is synthesized, cited, and recommended in AI answer summaries and generative search boxes.",
  },
  aeo: {
    code: "AEO",
    title: "Answer Engine Optimization",
    fullName: "Answer Engine Optimization (AEO)",
    subtitle: "Direct Solutions, Featured Snippets & Structured Graph",
    description:
      "Structuring content with precision schema graphs and intent hierarchies to instantly resolve user questions through position-zero featured snippets, Knowledge Panels, and direct search cards.",
    accentColor: "text-brand-red",
    badgeColor: "border-brand-red/40 bg-brand-red/10 text-brand-red",
    glowColor: "rgba(239, 68, 68, 0.4)",
    icon: MessageSquare,
    concepts: [
      "Questions",
      "Answers",
      "Search Intent",
      "Structured Content",
      "Direct Answers",
    ],
    roleInStrategy:
      "Wins position-zero featured snippets, rich cards, and voice search direct answers across search interfaces.",
  },
};

export default function SearchUniverseSection() {
  const [activePlanet, setActivePlanet] = useState<SearchPlanetKey>("seo");
  const current = planetDetails[activePlanet];
  const CurrentIcon = current.icon;

  return (
    <section
      id="universe"
      className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden"
    >
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-radial from-brand-blue/15 via-purple-500/10 to-brand-red/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="The Evolution of Search"
            title="The 3D Search Universe"
            subtitle="Search is no longer just 10 blue links. Explore how Sunil interconnects traditional SEO, Generative AI Engines (GEO), and Answer Optimization (AEO) into a unified growth engine."
          />
        </ScrollReveal>

        {/* 3D Solar System & Interactive Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
          {/* Left Column: 3D Solar System Viewport */}
          <ScrollReveal animation="scale-up" className="lg:col-span-7">
            <div className="relative rounded-3xl border border-blue-500/20 bg-surface-200/70 backdrop-blur-xl overflow-hidden shadow-glass-card group min-h-[480px] sm:min-h-[540px]">
              {/* Top Hint Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-300/85 border border-brand-blue/30 backdrop-blur-md text-[11px] font-mono text-text-primary">
                  <Radio className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                  <span>3D Search Solar System</span>
                </div>
                <span className="text-[10px] font-mono text-text-muted bg-surface-300/85 px-2.5 py-1 rounded-full border border-white/10 hidden sm:inline-block">
                  Click or tap planets
                </span>
              </div>

              {/* 3D Canvas */}
              <SearchUniverse3D
                activePlanet={activePlanet}
                onSelectPlanet={(p) => setActivePlanet(p)}
              />

              {/* Bottom Interactive Planet Switcher (Desktop & Mobile) */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-2 bg-surface-300/90 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                {(["seo", "geo", "aeo"] as SearchPlanetKey[]).map((key) => {
                  const isSelected = activePlanet === key;
                  const item = planetDetails[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setActivePlanet(key)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 uppercase flex items-center gap-1.5 ${
                        isSelected
                          ? key === "seo"
                            ? "bg-brand-blue/25 text-brand-cyan border border-brand-blue shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-105"
                            : key === "geo"
                            ? "bg-purple-500/25 text-purple-300 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                            : "bg-brand-red/25 text-brand-red border border-brand-red shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-105"
                          : "text-text-muted hover:text-text-primary hover:bg-white/5"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: key === "seo" ? "#3b82f6" : key === "geo" ? "#a855f7" : "#ef4444" }} />
                      <span>{item.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Live Telemetry & Core Breakdown */}
          <ScrollReveal animation="slide-right" className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlanet}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <GlassCard className="p-7 sm:p-8 border-white/10 hover:border-brand-blue/40 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${current.badgeColor}`}>
                      {current.code} System
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-cyan">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-text-primary font-display mb-1">
                    {current.fullName}
                  </h3>
                  <p className="text-xs font-mono text-brand-cyan mb-4">
                    {current.subtitle}
                  </p>

                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {current.description}
                  </p>

                  {/* Supporting Core Concepts */}
                  <div className="space-y-2.5 mb-6">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Supporting Concepts:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {current.concepts.map((concept) => (
                        <div
                          key={concept}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-100 border border-white/5 text-xs font-mono text-text-primary"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                          <span>{concept}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Impact Box */}
                  <div className="p-4 rounded-xl bg-surface-100 border border-blue-500/20 text-xs text-text-secondary">
                    <strong className="text-brand-blue block mb-1 font-mono text-[11px] font-bold">
                      STRATEGIC VALUE:
                    </strong>
                    {current.roleInStrategy}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
