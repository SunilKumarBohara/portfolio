"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import ScrollReveal from "../ui/ScrollReveal";
import { projects } from "@/data/projects";
import { ProjectItem } from "@/types";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Case Studies & Architectures"
            title="Selected Work"
            subtitle="Real-world SEO frameworks, technical crawl resolutions, and search visibility strategies engineered for sustainable performance."
          />
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.id} animation="fade-up" delay={idx * 0.1}>
              <GlassCard
                onClick={() => setActiveProject(project)}
                className="h-full flex flex-col justify-between p-8 border-white/10 hover:border-brand-blue/40 cursor-pointer group"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-cyan text-[11px] font-mono">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {project.industry}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors mb-3 font-display">
                    {project.title}
                  </h3>

                  {/* Problem & Strategy Summary */}
                  <div className="space-y-3 text-xs text-gray-300 mb-6">
                    <div className="p-3 rounded-xl bg-surface-100/70 border border-white/5">
                      <strong className="text-gray-400 block mb-1 font-mono text-[11px]">
                        The Challenge:
                      </strong>
                      <p className="line-clamp-2 text-gray-300">{project.problem}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/20">
                      <strong className="text-brand-cyan block mb-1 font-mono text-[11px]">
                        The SEO Strategy:
                      </strong>
                      <p className="line-clamp-2 text-gray-300">{project.strategy}</p>
                    </div>
                  </div>

                  {/* Metrics Row (Transparent Placeholder Structure) */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-100/90 border border-white/10 text-center font-mono">
                    {project.metricsPlaceholder.map((m, mIdx) => (
                      <div key={mIdx} className="space-y-0.5">
                        <p className="text-[10px] text-gray-500 uppercase">{m.label}</p>
                        <p className="text-xs font-bold text-white">{m.value}</p>
                        <p className="text-[10px] text-brand-cyan font-medium">{m.growth}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tools & Action */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface-100 text-[10px] font-mono text-gray-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-gray-500 self-center">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-brand-cyan group-hover:text-brand-red transition-colors">
                    <span>Explore Case Blueprint</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-surface-300 border border-brand-blue/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-surface-100 border border-white/10 text-gray-400 hover:text-white hover:border-brand-blue focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-cyan text-xs font-mono">
                  {activeProject.category}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {activeProject.industry}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-4">
                {activeProject.title}
              </h3>

              {/* Challenge & Strategy */}
              <div className="space-y-4 mb-6 text-sm text-gray-300">
                <div className="p-4 rounded-2xl bg-surface-200 border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Problem & Diagnosis:
                  </h4>
                  <p className="leading-relaxed">{activeProject.problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-brand-blue/5 border border-brand-blue/20">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-brand-cyan mb-1">
                    Strategic Execution Framework:
                  </h4>
                  <p className="leading-relaxed">{activeProject.strategy}</p>
                </div>
              </div>

              {/* Completed Work Points */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                  Work Completed & Technical Milestones:
                </h4>
                <div className="space-y-2">
                  {activeProject.workCompleted.map((task, tIdx) => (
                    <div
                      key={tIdx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-200 border border-white/5 text-xs text-gray-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Metrics Structure */}
              <div className="p-4 rounded-2xl bg-surface-200 border border-white/10 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-white font-bold">
                    Project Target Metrics & Evaluation:
                  </span>
                  <span className="text-[10px] font-mono text-brand-cyan">
                    Modular Case Data
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono">
                  {activeProject.metricsPlaceholder.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-surface-100 border border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase">{m.label}</p>
                      <p className="text-sm font-bold text-white mt-0.5">{m.value}</p>
                      <p className="text-[11px] text-brand-cyan mt-0.5">{m.growth}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  Toolkit & Diagnostics Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-surface-200 text-xs font-mono text-brand-cyan border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Modal Action */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-xs text-gray-300 font-medium"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-red text-white text-xs font-bold shadow-glow-sm hover:brightness-110 flex items-center gap-2"
                >
                  <span>Discuss a Similar Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
