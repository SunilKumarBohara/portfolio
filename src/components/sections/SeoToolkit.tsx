"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { seoTools } from "@/data/tools";
import {
  Search,
  BarChart3,
  Layers,
  TrendingUp,
  Bug,
  Zap,
  Globe,
  Link2,
  Cpu,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Search,
  BarChart3,
  Layers,
  TrendingUp,
  Bug,
  Zap,
  Globe,
  Link2,
};

const categories = [
  "All Tools",
  "Google Suite",
  "Crawler & Auditing",
  "Keyword & Competitive",
  "Speed & Performance",
];

export default function SeoToolkit() {
  const [filter, setFilter] = useState("All Tools");

  const filteredTools =
    filter === "All Tools"
      ? seoTools
      : seoTools.filter((t) => t.category === filter);

  return (
    <section className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Diagnostic & Intelligence Suite"
          title="SEO Toolkit & Platforms"
          subtitle="Industry-standard diagnostic tools and analytical suites leveraged to uncover deep crawl anomalies, SERP opportunities, and ranking trends."
        />

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border ${
                  isActive
                    ? "bg-brand-green/20 text-brand-green border-brand-green/60 shadow-glow-sm"
                    : "bg-surface-200 text-gray-400 border-white/10 hover:text-white hover:border-brand-green/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredTools.map((tool, idx) => {
            const Icon = iconMap[tool.icon] || Search;
            return (
              <motion.div
                key={tool.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <GlassCard className="h-full flex flex-col justify-between p-6 border-white/10 hover:border-brand-green/40 group">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green/10 group-hover:border-brand-green/40 group-hover:shadow-glow-sm transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono text-brand-cyan px-2 py-0.5 rounded bg-surface-100 border border-white/5">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-brand-green transition-colors font-display mb-1">
                      {tool.name}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-500 block mb-2">
                      {tool.category}
                    </span>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>Proficiency: Advanced</span>
                    <span className="text-brand-green">Active Use</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
