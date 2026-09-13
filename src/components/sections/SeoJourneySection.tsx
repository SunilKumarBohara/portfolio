"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import ScrollReveal from "../ui/ScrollReveal";
import {
  Compass,
  Search,
  Sliders,
  Layers,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const journeySteps = [
  {
    stepNumber: "STEP 01",
    phase: "DISCOVER",
    title: "Landscape & Asset Discovery",
    description: "Deep dive into existing website architecture, current index status, organic visibility baseline, competitive landscape, and crawl budget constraints.",
    icon: Compass,
    accent: "text-brand-blue",
    badge: "border-brand-blue/40 bg-brand-blue/10 text-brand-cyan",
    nodeBorder: "border-brand-blue/60 shadow-[0_0_20px_rgba(59,130,246,0.5)]",
    keyDeliverables: [
      "Full technical crawl diagnostics & domain health audit",
      "Search landscape & competitor benchmark analysis",
      "Audience search intent & pain point discovery",
      "Historical ranking baseline & indexing health checks",
    ],
  },
  {
    stepNumber: "STEP 02",
    phase: "RESEARCH",
    title: "Keyword & Intent Matrix",
    description: "Uncovering high-intent commercial keyword clusters, semantic entities, search gap matrices, and high-ROI transactional opportunities.",
    icon: Search,
    accent: "text-brand-cyan",
    badge: "border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan",
    nodeBorder: "border-brand-cyan/60 shadow-[0_0_20px_rgba(56,189,248,0.5)]",
    keyDeliverables: [
      "Topical keyword clustering & search volume forecasting",
      "Search intent categorization (Informational vs Commercial)",
      "SERP feature & Answer Engine gap analysis",
      "Prioritized roadmap of fast-ranking quick wins",
    ],
  },
  {
    stepNumber: "STEP 03",
    phase: "OPTIMIZE",
    title: "Technical & On-Page Execution",
    description: "Systematic remediation of crawl barriers, rendering bottlenecks, Core Web Vitals (LCP, INP, CLS), metadata, semantic outlines, and internal linking siloing.",
    icon: Sliders,
    accent: "text-indigo-400",
    badge: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
    nodeBorder: "border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.5)]",
    keyDeliverables: [
      "Core Web Vitals & mobile rendering speed tuning",
      "HTML5 semantic outlines & Schema.org structured data",
      "Title tag, meta description, and heading optimization",
      "Internal linking architecture & URL taxonomy clean-up",
    ],
  },
  {
    stepNumber: "STEP 04",
    phase: "BUILD",
    title: "Topical Authority & Content Hubs",
    description: "Architecting comprehensive E-E-A-T pillar-cluster models and authoritative content assets that build permanent domain authority and algorithmic trust.",
    icon: Layers,
    accent: "text-purple-400",
    badge: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    nodeBorder: "border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
    keyDeliverables: [
      "Pillar page and topical cluster content architecture",
      "E-E-A-T entity signal creation & verified author schema",
      "Rich media & structured FAQ integration for AEO answers",
      "High-value digital asset promotion & organic reach",
    ],
  },
  {
    stepNumber: "STEP 05",
    phase: "MEASURE",
    title: "Attribution & Telemetry Tracking",
    description: "Tracking organic search visibility, index coverage, keyword rank distribution, user conversion funnels, and business revenue impact.",
    icon: BarChart3,
    accent: "text-pink-400",
    badge: "border-pink-500/40 bg-pink-500/10 text-pink-300",
    nodeBorder: "border-pink-500/60 shadow-[0_0_20px_rgba(244,63,94,0.5)]",
    keyDeliverables: [
      "Google Search Console crawl & index tracking",
      "GA4 conversion journey & organic event attribution",
      "Topical rank distribution & visibility index telemetry",
      "Executive reporting & business KPI telemetry",
    ],
  },
  {
    stepNumber: "STEP 06",
    phase: "EVOLVE",
    title: "Iterative Refinement & AI Adaptation",
    description: "Continuous adaptation to search algorithm updates, AI generative shifts (GEO), and emerging user search queries to sustain long-term dominance.",
    icon: TrendingUp,
    accent: "text-brand-red",
    badge: "border-brand-red/40 bg-brand-red/10 text-brand-red",
    nodeBorder: "border-brand-red/60 shadow-[0_0_20px_rgba(239,68,68,0.5)]",
    keyDeliverables: [
      "Search algorithm update vulnerability checks",
      "Generative AI (GEO) and Answer Engine (AEO) expansion",
      "Content freshness & decay optimization",
      "Continuous growth testing & scaling",
    ],
  },
];

export default function SeoJourneySection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="journey" className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Background Glowing Ambient Gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-red/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Strategic Methodology"
            title="SEO Journey & Evolution"
            subtitle="A cinematic 6-step framework designed to take websites from technical discovery to sustainable search dominance."
          />
        </ScrollReveal>

        {/* Interactive Step Navigator Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 max-w-4xl mx-auto">
          {journeySteps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                  isCurrent
                    ? "bg-gradient-to-r from-brand-blue to-brand-red text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-105"
                    : "bg-surface-100 text-text-muted hover:text-text-primary hover:bg-surface-50 border border-white/5"
                }`}
              >
                0{idx + 1} {step.phase}
              </button>
            );
          })}
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Glowing Vertical Connecting Line with Blue -> Red Gradient */}
          <div className="absolute left-4 sm:left-1/2 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-blue via-purple-500 to-brand-red opacity-40 pointer-events-none hidden sm:block" />

          <div className="space-y-12 sm:space-y-16">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              const isHighlighted = activeStep === idx;

              return (
                <ScrollReveal
                  key={step.stepNumber}
                  animation={isEven ? "slide-left" : "slide-right"}
                  delay={0.05}
                >
                  <div
                    onClick={() => setActiveStep(idx)}
                    className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 cursor-pointer transition-all duration-300 ${
                      isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                    } ${isHighlighted ? "opacity-100 scale-[1.01]" : "opacity-85 hover:opacity-100"}`}
                  >
                    {/* Step Card Content */}
                    <div className="w-full sm:w-1/2">
                      <GlassCard
                        className={`p-6 sm:p-8 border-white/10 transition-all duration-300 group ${
                          isHighlighted
                            ? "border-brand-blue/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-surface-200/90"
                            : "hover:border-brand-blue/30"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full border text-[11px] font-mono font-bold ${step.badge}`}>
                            {step.stepNumber} • {step.phase}
                          </span>
                          <span className="text-xs font-mono text-text-muted font-bold">
                            0{idx + 1}/06
                          </span>
                        </div>

                        <h3 className={`text-xl font-bold font-display mb-2 transition-colors ${
                          isHighlighted ? "text-brand-cyan" : "text-text-primary group-hover:text-brand-blue"
                        }`}>
                          {step.title}
                        </h3>

                        <p className="text-xs text-text-secondary leading-relaxed mb-4">
                          {step.description}
                        </p>

                        <div className="space-y-2 pt-3 border-t border-white/10">
                          {step.keyDeliverables.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-[11px] font-mono text-text-secondary"
                            >
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${step.accent}`} />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </GlassCard>
                    </div>

                    {/* Central 3D Glowing Node Icon */}
                    <div className="relative z-20 flex items-center justify-center shrink-0">
                      <div className={`w-12 h-12 rounded-2xl bg-surface-200 border-2 flex items-center justify-center transition-all duration-300 ${
                        isHighlighted
                          ? `${step.nodeBorder} scale-110 bg-surface-100`
                          : "border-white/20 text-text-secondary hover:border-brand-blue hover:scale-105"
                      }`}>
                        <Icon className={`w-5 h-5 ${step.accent}`} />
                      </div>
                    </div>

                    {/* Empty spacer for alignment on desktop */}
                    <div className="hidden sm:block w-1/2" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
