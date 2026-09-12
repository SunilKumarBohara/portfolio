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
} from "lucide-react";

// Dynamically import 3D Solar System to avoid SSR mismatch
const SearchUniverse3D = dynamic(() => import("../3d/SearchUniverse3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-brand-green/10 animate-pulse-slow blur-2xl" />
    </div>
  ),
});

const planetDetails: Record<
  SearchPlanetKey,
  {
    title: string;
    subtitle: string;
    description: string;
    accentColor: string;
    badgeColor: string;
    icon: React.ElementType;
    capabilities: string[];
    roleInStrategy: string;
  }
> = {
  seo: {
    title: "Search Engine Optimization (SEO)",
    subtitle: "Foundational Organic Crawlability & Keyword Architecture",
    description:
      "The proven discipline of optimizing technical web structure, crawl budgets, content semantics, and backlink authority so traditional search engines rank your pages for commercial search queries.",
    accentColor: "text-brand-green",
    badgeColor: "border-brand-green/40 bg-brand-green/10 text-brand-green",
    icon: Search,
    capabilities: [
      "Search Engine Optimization",
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Keyword Strategy",
      "Organic Growth",
    ],
    roleInStrategy:
      "Captures high-volume search queries and guarantees flawless crawler accessibility across Google and Bing.",
  },
  geo: {
    title: "Generative Engine Optimization (GEO)",
    subtitle: "AI Search, LLM Synthesis & Entity Prominence",
    description:
      "Optimizing brand entity footprints so AI search models (ChatGPT, Google AI Overviews, Perplexity, Gemini) reference, cite, and recommend your authoritative content in synthesized answer boxes.",
    accentColor: "text-brand-cyan",
    badgeColor: "border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan",
    icon: Bot,
    capabilities: [
      "Generative Engine Optimization",
      "AI Search",
      "Generative Results",
      "Entity Visibility",
      "Answer Discovery",
      "AI Search Optimization",
    ],
    roleInStrategy:
      "Ensures your website is cited as a trusted source within AI-generated overviews and conversational discovery engines.",
  },
  aeo: {
    title: "Answer Engine Optimization (AEO)",
    subtitle: "Direct Solutions, Featured Snippets & Structured Graph",
    description:
      "Structuring content to immediately answer specific user questions through schema graphs, FAQ hierarchies, and targeted intent matching for position-zero featured snippets and voice search.",
    accentColor: "text-sky-400",
    badgeColor: "border-sky-400/40 bg-sky-400/10 text-sky-400",
    icon: MessageSquare,
    capabilities: [
      "Answer Engine Optimization",
      "Featured Answers",
      "Question Optimization",
      "Structured Content",
      "Search Intent",
      "Direct Answers",
    ],
    roleInStrategy:
      "Wins featured snippets, Knowledge Graph inclusion, and instant direct answers across search interfaces.",
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-radial from-brand-green/10 via-brand-cyan/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="The Evolution of Search"
            title="The New Search Universe"
            subtitle="Search is no longer just traditional 10 blue links. Explore how Sunil navigates the interconnected ecosystem of SEO, Generative AI Engines (GEO), and Answer Optimization (AEO)."
          />
        </ScrollReveal>

        {/* 3D Solar System & Interactive Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          {/* Left Column: 3D Solar System Viewport */}
          <ScrollReveal animation="scale-up" className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/10 bg-surface-200/60 backdrop-blur-xl overflow-hidden shadow-glass-card group min-h-[480px] sm:min-h-[540px]">
              {/* Top Hint Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-300/80 border border-brand-green/30 backdrop-blur-md text-[11px] font-mono text-gray-300">
                  <Sparkles className="w-3.5 h-3.5 text-brand-green animate-spin-slow" />
                  <span>Interactive 3D Universe</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-surface-300/80 px-2.5 py-1 rounded-full border border-white/10">
                  Click planets to inspect
                </span>
              </div>

              {/* 3D Canvas */}
              <SearchUniverse3D
                activePlanet={activePlanet}
                onSelectPlanet={(p) => setActivePlanet(p)}
              />

              {/* Bottom Interactive Planet Switcher */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-2 bg-surface-300/85 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                {(["seo", "geo", "aeo"] as SearchPlanetKey[]).map((key) => {
                  const isSelected = activePlanet === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActivePlanet(key)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 uppercase ${
                        isSelected
                          ? "bg-brand-green/20 text-brand-green border border-brand-green/50 shadow-glow-sm scale-105"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {key.toUpperCase()} Planet
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
                <GlassCard className="p-8 border-white/10 hover:border-brand-green/40 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono border ${current.badgeColor}`}>
                      {activePlanet.toUpperCase()} Dimension
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-green">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-white font-display mb-1">
                    {current.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-cyan mb-4">
                    {current.subtitle}
                  </p>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    {current.description}
                  </p>

                  {/* 6 Explicit Pillar Capabilities */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-400">
                      Core Optimization Focus:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {current.capabilities.map((cap) => (
                        <div
                          key={cap}
                          className="flex items-center gap-2 p-2 rounded-xl bg-surface-100/70 border border-white/5 text-[11px] font-mono text-gray-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="p-3.5 rounded-xl bg-surface-100 border border-brand-green/20 text-xs text-gray-300">
                    <strong className="text-brand-green block mb-0.5 font-mono text-[11px]">
                      Search Impact:
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
