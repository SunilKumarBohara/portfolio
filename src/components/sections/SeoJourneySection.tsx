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
    stepNumber: "STEP 01",
    phase: "Discover",
    title: "Landscape & Asset Discovery",
    description: "Deep dive into the existing website architecture, current search visibility, target audience persona, and competitive market positioning.",
    icon: Compass,
    color: "from-emerald-500 to-teal-500",
    accent: "text-brand-green",
    keyDeliverables: [
      "Full crawl diagnostics & domain health audit",
      "Search landscape & competitor benchmark analysis",
      "Audience search intent & pain point discovery",
      "Historical ranking baseline & indexing checks",
    ],
  },
  {
    stepNumber: "STEP 02",
    phase: "Research",
    title: "Keyword & Intent Matrix",
    description: "Uncovering high-intent commercial keyword clusters, semantic entities, search gaps, and high-ROI conversion opportunities.",
    icon: Search,
    color: "from-teal-500 to-cyan-500",
    accent: "text-brand-cyan",
    keyDeliverables: [
      "Topical keyword clustering & volume forecasting",
      "Search intent categorization (Informational vs Commercial)",
      "SERP feature & Answer Engine gap analysis",
      "Prioritized roadmap of quick-win opportunities",
    ],
  },
  {
    stepNumber: "STEP 03",
    phase: "Optimize",
    title: "Technical & On-Page Execution",
    description: "Systematic remediation of crawl budget barriers, page speed bottlenecks, Core Web Vitals, metadata, and internal linking hierarchy.",
    icon: Sliders,
    color: "from-cyan-500 to-blue-500",
    accent: "text-brand-cyan",
    keyDeliverables: [
      "Core Web Vitals & mobile rendering speed tuning",
      "HTML5 semantic outlines & Schema.org structured data",
      "Title tag, meta description, and heading optimization",
      "Internal linking siloing & URL structure clean-up",
    ],
  },
  {
    stepNumber: "STEP 04",
    phase: "Build",
    title: "Topical Authority & Content Hubs",
    description: "Architecting comprehensive E-E-A-T pillar-cluster models and authoritative content assets that command algorithmic trust.",
    icon: Layers,
    color: "from-blue-500 to-emerald-500",
    accent: "text-brand-green",
    keyDeliverables: [
      "Pillar page and topic cluster content architecture",
      "E-E-A-T entity signal creation & author profiles",
      "Rich media & structured FAQ integration for AEO",
      "High-value digital asset promotion & organic reach",
    ],
  },
  {
    stepNumber: "STEP 05",
    phase: "Measure",
    title: "Attribution & Telemetry Tracking",
    description: "Tracking organic search visibility, index coverage, keyword rank distribution, user conversion funnels, and organic revenue.",
    icon: BarChart3,
    color: "from-emerald-500 to-green-500",
    accent: "text-brand-green",
    keyDeliverables: [
      "Google Search Console crawl & index tracking",
      "GA4 conversion journey & organic event attribution",
      "Topical rank distribution & visibility index",
      "Executive reporting & performance telemetry",
    ],
  },
  {
    stepNumber: "STEP 06",
    phase: "Evolve",
    title: "Iterative Refinement & AI Adaptation",
    description: "Continuous adaptation to search algorithm updates, AI generative shifts (GEO), and emerging user search queries to sustain long-term dominance.",
    icon: TrendingUp,
    color: "from-green-500 to-teal-400",
    accent: "text-brand-cyan",
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
      {/* Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-green/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Strategic Methodology"
            title="SEO Journey & Evolution"
            subtitle="A structured 6-step framework designed to take websites from technical discovery to sustainable search dominance."
          />
        </ScrollReveal>

        {/* Vertical Timeline Track */}
        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Glowing Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-green via-brand-cyan to-teal-400 opacity-30 pointer-events-none hidden sm:block" />

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
                      <GlassCard className="p-6 sm:p-8 border-white/10 hover:border-brand-green/40 transition-all group">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-[11px] font-mono font-bold">
                            {step.stepNumber} • {step.phase}
                          </span>
                          <span className="text-xs font-mono text-gray-500">
                            0{idx + 1}/06
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-brand-green transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-xs text-gray-300 leading-relaxed mb-4">
                          {step.description}
                        </p>

                        <div className="space-y-1.5 pt-3 border-t border-white/5">
                          {step.keyDeliverables.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-[11px] font-mono text-gray-400"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </GlassCard>
                    </div>

                    {/* Central 3D Node Icon */}
                    <div className="relative z-20 flex items-center justify-center shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-surface-200 border-2 border-brand-green/60 shadow-glow-sm flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
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
