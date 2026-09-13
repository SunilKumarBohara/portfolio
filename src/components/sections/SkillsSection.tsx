"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { skillCategories } from "@/data/skills";
import { Sparkles, Terminal, CheckCircle2, Layers, Cpu, Code2 } from "lucide-react";

export default function SkillsSection() {
  const [selectedCat, setSelectedCat] = useState<number>(0);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-brand-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Technical & Strategy Arsenal"
          title="Skills & Core Proficiencies"
          subtitle="A comprehensive breakdown of search engine optimization disciplines, analytical platforms, and foundational web engineering technologies."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {skillCategories.map((cat, idx) => {
            const isActive = selectedCat === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setSelectedCat(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? "bg-brand-blue/20 text-brand-cyan border-brand-blue/60 shadow-glow-sm"
                    : "bg-surface-200/80 text-gray-400 border-white/10 hover:text-white hover:border-brand-blue/30"
                }`}
              >
                {idx === 0 && <Cpu className="w-3.5 h-3.5" />}
                {idx === 1 && <Layers className="w-3.5 h-3.5" />}
                {idx === 2 && <Code2 className="w-3.5 h-3.5" />}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          key={selectedCat}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories[selectedCat].skills.map((skill, idx) => (
            <GlassCard
              key={skill.name}
              className="p-6 flex flex-col justify-between border-white/10 hover:border-brand-blue/40 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-glow-cyan" />
                    <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors font-display">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 px-2 py-0.5 rounded bg-surface-100 border border-white/5">
                    Verified Skill
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {skill.focus}
                </p>
              </div>

              {/* Technical Indicator */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span className="flex items-center gap-1.5 text-brand-cyan">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Execution Standard
                </span>
                <span className="text-gray-500">Core Expertise</span>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Bottom Technical Assurance Callout */}
        <div className="mt-16 p-6 rounded-2xl bg-surface-200/50 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center text-brand-cyan shrink-0">
              <Terminal className="w-4 h-4 text-brand-red" />
            </div>
            <div>
              <p className="text-white font-bold">SEO & Web Development Synergy</p>
              <p className="text-gray-400 text-[11px]">
                Able to audit, diagnose, and directly execute fixes in code without handing off ambiguous requests.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-surface-100 text-brand-cyan border border-brand-blue/30 shrink-0">
            Full-Stack Technical Literacy
          </span>
        </div>
      </div>
    </section>
  );
}
