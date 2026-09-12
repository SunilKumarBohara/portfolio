"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import {
  TrendingUp,
  Search,
  CheckCircle,
  Eye,
  Layers,
  ArrowUpRight,
  Activity,
  Zap,
  BarChart2,
} from "lucide-react";

export default function ResultsDashboard() {
  const [timeframe, setTimeframe] = useState<"28d" | "3m" | "12m">("3m");

  return (
    <section className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-green/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Search Telemetry & Analytics"
          title="SEO Performance Architecture"
          subtitle="A blueprint demonstrating how organic visibility, index coverage, keyword trajectory, and Core Web Vitals are monitored and systematically optimized."
        />

        {/* Dashboard Shell */}
        <div className="rounded-3xl border border-white/10 bg-surface-200/80 p-6 sm:p-8 backdrop-blur-xl shadow-glass-card">
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-glow-sm">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Organic Search Telemetry Console
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  Google Search Console & GA4 Performance Tracking Model
                </p>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-100 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setTimeframe("28d")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeframe === "28d"
                    ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Last 28 Days
              </button>
              <button
                onClick={() => setTimeframe("3m")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeframe === "3m"
                    ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Last 3 Months
              </button>
              <button
                onClick={() => setTimeframe("12m")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeframe === "12m"
                    ? "bg-brand-green/20 text-brand-green border border-brand-green/40"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Last 12 Months
              </button>
            </div>
          </div>

          {/* 4 Key Pillar Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-surface-100/90 border border-white/5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>Organic Impressions</span>
                <Eye className="w-4 h-4 text-brand-cyan" />
              </div>
              <p className="text-2xl font-black text-white font-display">
                Search Visibility
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-brand-green">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Optimized Growth Trajectory</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 mt-2 border-t border-white/5 pt-1.5">
                Target: High Search Demand
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-100/90 border border-white/5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>Keyword Distribution</span>
                <Search className="w-4 h-4 text-brand-green" />
              </div>
              <p className="text-2xl font-black text-white font-display">
                Top 3 & Top 10
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-brand-cyan">
                <Layers className="w-3.5 h-3.5" />
                <span>Topical Cluster Authority</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 mt-2 border-t border-white/5 pt-1.5">
                Focus: Commercial & Info Intent
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-100/90 border border-white/5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>Index Coverage</span>
                <CheckCircle className="w-4 h-4 text-brand-green" />
              </div>
              <p className="text-2xl font-black text-white font-display">
                Clean Indexing
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-brand-green">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Zero Crawl Errors</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 mt-2 border-t border-white/5 pt-1.5">
                Canonical & Sitemap Synchronized
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-100/90 border border-white/5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                <span>Core Web Vitals</span>
                <Zap className="w-4 h-4 text-brand-cyan" />
              </div>
              <p className="text-2xl font-black text-white font-display">
                100% Pass Rate
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-brand-green">
                <Zap className="w-3.5 h-3.5" />
                <span>LCP &lt; 1.8s | INP &lt; 150ms</span>
              </div>
              <p className="text-[10px] font-mono text-gray-500 mt-2 border-t border-white/5 pt-1.5">
                Zero Cumulative Layout Shift
              </p>
            </div>
          </div>

          {/* Visual Simulated SERP Chart Area */}
          <div className="p-6 rounded-2xl bg-surface-100/60 border border-white/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div>
                <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-brand-green" />
                  Search Visibility & Organic Index Growth Simulation
                </h4>
                <p className="text-xs text-gray-400 font-mono">
                  Illustrating the compound effect of continuous technical fixes + content clusters
                </p>
              </div>
              <span className="text-[11px] font-mono text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/30">
                Data Framework Model
              </span>
            </div>

            {/* Simulated Chart Bars */}
            <div className="h-44 sm:h-52 flex items-end justify-between gap-1.5 sm:gap-3 pt-6 pb-2 px-2 border-b border-white/10">
              {[
                { month: "W1", height: "25%", clicks: "Base" },
                { month: "W2", height: "30%", clicks: "Audit Fix" },
                { month: "W3", height: "38%", clicks: "Crawl Clean" },
                { month: "W4", height: "45%", clicks: "Clusters" },
                { month: "W5", height: "52%", clicks: "Entities" },
                { month: "W6", height: "60%", clicks: "Schema" },
                { month: "W7", height: "68%", clicks: "Authority" },
                { month: "W8", height: "76%", clicks: "SERP Top 5" },
                { month: "W9", height: "82%", clicks: "CTR Boost" },
                { month: "W10", height: "90%", clicks: "Scale" },
                { month: "W11", height: "94%", clicks: "Dominance" },
                { month: "W12", height: "98%", clicks: "Leader" },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[9px] font-mono text-brand-green opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.clicks}
                  </span>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: bar.height }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className="w-full bg-gradient-to-t from-brand-green/30 via-brand-cyan/40 to-brand-green rounded-t-lg group-hover:brightness-125 transition-all shadow-glow-sm cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-gray-500">
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-[11px] font-mono text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-brand-green" />
                  Search Impression Velocity
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-brand-cyan" />
                  Average Ranking Position Elevation
                </span>
              </div>
              <span className="text-gray-500">
                Verified reporting tailored per client engagement
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
