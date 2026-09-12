"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import {
  Compass,
  Target,
  FileSearch,
  PenTool,
  Cpu,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Research & Discovery",
    tag: "Intelligence",
    icon: Compass,
    summary: "Auditing domain baseline, market landscape, technical health, and competitive SERP positioning.",
    details: "Deep exploration of historical indexing, crawl errors, competitor backlink distribution, and market footprint to identify untapped search opportunities.",
  },
  {
    step: "02",
    title: "Search Intent Mapping",
    tag: "User Psychology",
    icon: Target,
    summary: "Categorizing user queries into informational, navigational, commercial, and transactional intent.",
    details: "Understanding the exact problem a user wants to solve before crafting content, ensuring 100% search satisfaction and minimal bounce rate.",
  },
  {
    step: "03",
    title: "Keyword & Entity Strategy",
    tag: "Topical Blueprint",
    icon: FileSearch,
    summary: "Developing semantic keyword clusters, long-tail opportunities, and entity knowledge trees.",
    details: "Mapping parent pillar themes with supporting subtopic nodes to build topical authority that search engines naturally reward.",
  },
  {
    step: "04",
    title: "Content Architecture",
    tag: "E-E-A-T Execution",
    icon: PenTool,
    summary: "Creating high-value, comprehensive content structures with semantic heading hierarchies.",
    details: "Structuring pages for both human readers and search crawlers with rich schema markup, original insights, and engaging media.",
  },
  {
    step: "05",
    title: "Technical SEO Infrastructure",
    tag: "Crawl & Speed",
    icon: Cpu,
    summary: "Optimizing Core Web Vitals, server response times, canonical directives, and sitemaps.",
    details: "Ensuring zero crawl barriers, lightning-fast TTFB, perfect mobile viewport rendering, and valid structured data graphs.",
  },
  {
    step: "06",
    title: "Authority & Trust Building",
    tag: "Off-Page Signals",
    icon: ShieldCheck,
    summary: "Earning genuine digital PR mentions, authoritative citations, and ethical editorial backlinks.",
    details: "Strengthening domain trust by acquiring brand mentions in relevant publications and building an authentic link profile.",
  },
  {
    step: "07",
    title: "Iterative Optimization",
    tag: "CTR & Testing",
    icon: Zap,
    summary: "A/B testing title tags, meta descriptions, internal linking paths, and user conversion funnels.",
    details: "Continuous performance audits using Google Search Console data to revive decaying pages and capture high-intent snippet positions.",
  },
  {
    step: "08",
    title: "Organic Scaled Growth",
    tag: "Business Impact",
    icon: TrendingUp,
    summary: "Converting sustained top-tier rankings into high-value organic traffic, leads, and revenue.",
    details: "Translating search engine prominence into measurable pipeline growth with custom Looker Studio performance tracking.",
  },
];

export default function SeoApproach() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="approach" className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden">
      {/* Background Energy Flow Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-brand-green/10 via-brand-cyan/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="End-to-End Pipeline"
          title="How I Approach SEO"
          subtitle="A systematic, scientific, and connected 8-stage methodology designed for predictable search visibility and compounding organic growth."
        />

        {/* Interactive Stepper Navigation / Pipeline Conduits */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-10">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`relative p-3 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between group ${
                  isActive
                    ? "bg-surface-100 border-brand-green shadow-glow-sm"
                    : "bg-surface-200/60 border-white/10 hover:border-brand-green/30"
                }`}
              >
                {/* Active Indicator bar */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-brand-green rounded-full shadow-glow-sm" />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isActive ? "text-brand-green" : "text-gray-500"
                    }`}
                  >
                    {item.step}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-brand-green" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                </div>

                <p
                  className={`text-xs font-bold leading-tight font-display ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.title.split(" ")[0]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of the Active Stage */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GlassCard className="p-8 sm:p-10 border-brand-green/40 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-brand-green/15 border border-brand-green/40 text-brand-green text-xs font-mono">
                    Stage {steps[activeStep].step} • {steps[activeStep].tag}
                  </span>
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                    Structured Pipeline
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {steps[activeStep].title}
                </h3>

                <p className="text-base text-gray-200 leading-relaxed font-medium">
                  {steps[activeStep].summary}
                </p>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {steps[activeStep].details}
                </p>

                {/* Next Step Quick Trigger */}
                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="inline-flex items-center gap-2 text-xs font-mono text-brand-green hover:underline"
                  >
                    <span>Next Stage: {steps[(activeStep + 1) % steps.length].title}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Graphical Blueprint Indicator */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-surface-100/90 border border-white/10 space-y-4 font-mono text-xs text-gray-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-gray-400">Execution Phase:</span>
                  <span className="text-brand-cyan font-bold">{activeStep + 1} of 8</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-gray-400">Target Outcome:</span>
                  <span className="text-brand-green">Algorithmic Trust</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-gray-400">Verification:</span>
                  <span className="text-white">GSC & GA4 Metrics</span>
                </div>
                <div className="pt-2">
                  <div className="w-full h-2 rounded-full bg-surface-300 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-green to-brand-cyan transition-all duration-500 rounded-full"
                      style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
