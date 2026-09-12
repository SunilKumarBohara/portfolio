"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { timelineSteps } from "@/data/timeline";
import { Sparkles, CheckCircle2, CircleDot, ArrowUpRight, Compass } from "lucide-react";

export default function TimelineSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-cyan/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Progression & Roadmap"
          title="SEO Journey & Evolution"
          subtitle="From foundational web engineering mechanics to holistic search architecture and predictive organic growth systems."
        />

        {/* Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Neon Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 sm:-translate-x-1/2 w-[2px] bg-gradient-to-b from-brand-green via-brand-cyan to-brand-green/20" />

          <div className="space-y-12">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-8 h-8 rounded-full bg-surface-300 border-2 border-brand-green flex items-center justify-center text-brand-green shadow-glow-sm z-20">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : step.status === "current" ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
                    ) : (
                      <CircleDot className="w-4 h-4 text-brand-cyan" />
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <GlassCard className="p-6 border-white/10 hover:border-brand-green/40 group">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono text-brand-green px-2 py-0.5 rounded bg-brand-green/10 border border-brand-green/30">
                          {step.phase}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500 uppercase">
                          {step.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-brand-green transition-colors font-display mb-2">
                        {step.title}
                      </h3>

                      <p className="text-xs text-gray-400 leading-relaxed mb-4">
                        {step.description}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-white/5">
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                          Key Focus & Outcomes:
                        </p>
                        {step.keyLearnings.map((item, kIdx) => (
                          <div
                            key={kIdx}
                            className="flex items-start gap-1.5 text-xs text-gray-300"
                          >
                            <span className="text-brand-cyan mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
