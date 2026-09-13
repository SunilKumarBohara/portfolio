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
} from "lucide-react";

const journeySteps = [
  {
    stepNumber: "01",
    phase: "DISCOVER",
    title: "Landscape & Asset Discovery",
    description: "Deep dive into the existing website architecture, current search visibility, target audience persona, and competitive market positioning.",
    icon: Compass,
    color: "from-blue-600 to-blue-500",
    badge: "border-blue-500/40 bg-blue-500/10 text-cyan-300",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.35)]",
    keyDeliverables: [
      "Full crawl diagnostics & domain health audit",
      "Search landscape & competitor benchmark analysis",
      "Audience search intent & pain point discovery",
      "Historical ranking baseline & indexing checks",
    ],
  },
  {
    stepNumber: "02",
    phase: "RESEARCH",
    title: "Keyword & Intent Matrix",
    description: "Uncovering high-intent commercial keyword clusters, semantic entities, search gaps, and high-ROI conversion opportunities.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    badge: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.35)]",
    keyDeliverables: [
      "Topical keyword clustering & volume forecasting",
      "Search intent categorization (Informational vs Commercial)",
      "SERP feature & Answer Engine gap analysis",
      "Prioritized roadmap of quick-win opportunities",
    ],
  },
  {
    stepNumber: "03",
    phase: "OPTIMIZE",
    title: "Technical & On-Page Execution",
    description: "Systematic remediation of crawl budget barriers, page speed bottlenecks, Core Web Vitals, metadata, and internal linking hierarchy.",
    icon: Sliders,
    color: "from-cyan-500 to-indigo-500",
    badge: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.35)]",
    keyDeliverables: [
      "Core Web Vitals & mobile rendering speed tuning",
      "HTML5 semantic outlines & Schema.org structured data",
      "Title tag, meta description, and heading optimization",
      "Internal linking siloing & URL structure clean-up",
    ],
  },
  {
    stepNumber: "04",
    phase: "BUILD",
    title: "Topical Authority & Content Hubs",
    description: "Architecting comprehensive E-E-A-T pillar-cluster models and authoritative content assets that command algorithmic trust.",
    icon: Layers,
    color: "from-indigo-500 to-purple-500",
    badge: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.35)]",
    keyDeliverables: [
      "Pillar page and topic cluster content architecture",
      "E-E-A-T entity signal creation & author profiles",
      "Rich media & structured FAQ integration for AEO",
      "High-value digital asset promotion & organic reach",
    ],
  },
  {
    stepNumber: "05",
    phase: "MEASURE",
    title: "Attribution & Telemetry Tracking",
    description: "Tracking organic search visibility, index coverage, keyword rank distribution, user conversion funnels, and organic revenue.",
    icon: BarChart3,
    color: "from-purple-500 to-rose-500",
    badge: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.35)]",
    keyDeliverables: [
      "Google Search Console crawl & index tracking",
      "GA4 conversion journey & organic event attribution",
      "Topical rank distribution & visibility index",
      "Executive reporting & performance telemetry",
    ],
  },
  {
    stepNumber: "06",
    phase: "EVOLVE",
    title: "Iterative Refinement & AI Adaptation",
    description: "Continuous adaptation to search algorithm updates, AI generative shifts (GEO), and emerging user search queries to sustain long-term dominance.",
    icon: TrendingUp,
    color: "from-rose-500 to-red-500",
    badge: "border-red-500/40 bg-red-500/10 text-red-300",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]",
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
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-blue/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-brand-red/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Strategic Methodology"
            title="SEO Journey & Evolution"
            subtitle="A cinematic 6-step framework engineered to guide websites from technical discovery to sustainable search dominance."
          />
        </ScrollReveal>

        {/* Vertical Timeline Track */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Glowing Vertical Line (Blue to Red progression) */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-blue via-purple-500 to-brand-red opacity-40 pointer-events-none hidden sm:block" />

          <div className="space-y-12 sm:space-y-16">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <ScrollReveal
                  key={step.stepNumber}
                  animation={isEven ? "slide-left" : "slide-right"}
                  delay={0.05}
                >
                  <div
                    className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${
                      isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Step Card Content */}
                    <div className="w-full sm:w-1/2">
                      <GlassCard className="p-6 sm:p-8 border-white/10 hover:border-brand-blue/40 transition-all group">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full border text-[11px] font-mono font-bold ${step.badge}`}>
                            {step.stepNumber} — {step.phase}
                          </span>
                          <span className="text-xs font-mono text-text-muted">
                            0{idx + 1}/06
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-text-primary font-display mb-2 group-hover:text-brand-cyan transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-xs text-text-secondary leading-relaxed mb-4">
                          {step.description}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-white/5">
                          {step.keyDeliverables.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-[11px] font-mono text-text-muted"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                              <span className="text-text-secondary">{item}</span>
                            </div>
                          ))}
                        </div>
                      </GlassCard>
                    </div>

                    {/* Central Node Icon */}
                    <div className="relative z-20 flex items-center justify-center shrink-0">
                      <div className={`w-12 h-12 rounded-2xl bg-surface-200 border-2 border-blue-500/50 ${step.glow} flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
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
