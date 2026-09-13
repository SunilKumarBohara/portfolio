"use client";

import React from "react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import ScrollReveal from "../ui/ScrollReveal";
import { Search, Code2, LineChart, FileText, Cpu, Rocket, MapPin, CheckCircle2, Award, Bot, MessageSquare } from "lucide-react";

const capabilities = [
  {
    title: "Technical SEO",
    tag: "Core Engineering",
    icon: Cpu,
    description: "Crawl budget optimization, rendering diagnostics, XML sitemaps, robots directives, canonicalization, and Core Web Vitals.",
    color: "from-blue-500/20 to-cyan-500/5",
    accent: "text-brand-blue",
  },
  {
    title: "GEO & AI Search",
    tag: "LLM Visibility",
    icon: Bot,
    description: "Structuring brand entity signals so AI engines (ChatGPT, Google AI Overviews, Perplexity) synthesize and cite your content.",
    color: "from-purple-500/20 to-indigo-500/5",
    accent: "text-purple-400",
  },
  {
    title: "AEO & Direct Answers",
    tag: "Answer Engines",
    icon: MessageSquare,
    description: "Optimizing for position-zero featured answers, question targeting, Schema.org graphs, and instant snippet captures.",
    color: "from-red-500/20 to-pink-500/5",
    accent: "text-brand-red",
  },
  {
    title: "Keyword & Intent",
    tag: "Search Psychology",
    icon: Search,
    description: "Deconstructing user intent, commercial queries, competitive gap analysis, and semantic topical clustering.",
    color: "from-blue-500/20 to-indigo-500/5",
    accent: "text-brand-cyan",
  },
  {
    title: "Content Architecture",
    tag: "Topical Authority",
    icon: FileText,
    description: "Architecting E-E-A-T driven pillar-cluster models that build undeniable search authority and user trust.",
    color: "from-indigo-500/20 to-purple-500/5",
    accent: "text-indigo-400",
  },
  {
    title: "Organic Growth",
    tag: "Conversion & ROI",
    icon: Rocket,
    description: "Bridging the gap between raw organic search rankings and meaningful bottom-line business conversion funnels.",
    color: "from-red-500/20 to-rose-500/5",
    accent: "text-brand-red",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Entity & Mindset"
            title="Behind the Search Strategy"
            subtitle="Discover the methodology, technical understanding, and strategic execution driving modern search visibility across Google, AI models, and answer engines."
          />
        </ScrollReveal>

        {/* Narrative & Personal Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: Story & Philosophy */}
          <ScrollReveal animation="slide-left" className="lg:col-span-7 space-y-6 text-text-secondary text-base sm:text-lg leading-relaxed">
            <div className="p-6 rounded-2xl bg-surface-200/80 border border-blue-500/20 backdrop-blur-md hover:border-brand-blue/40 transition-colors">
              <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center gap-2 font-display">
                <MapPin className="w-5 h-5 text-brand-red" />
                SEO Executive based in Nepal
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Modern search algorithms have evolved beyond basic meta tags and keywords. True search engine optimization requires a harmonious synthesis of <strong className="text-text-primary">technical architecture</strong>, <strong className="text-text-primary">search intent alignment</strong>, <strong className="text-text-primary">Generative Engine Optimization (GEO)</strong>, and <strong className="text-text-primary">Answer Engine Optimization (AEO)</strong>.
              </p>
            </div>

            <p className="text-sm sm:text-base text-text-secondary">
              As an SEO Executive, I specialize in helping websites improve organic discoverability by eliminating technical crawling barriers, deciphering search psychology, and structuring content networks that search engines inherently trust. With a solid foundation in web technologies (HTML, CSS, JavaScript, PHP, MySQL, and Schema graph models), I translate business goals into measurable organic search outcomes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-text-primary">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/70 border border-white/5 hover:border-brand-blue/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                <span>Search Intent & Commercial Mapping</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/70 border border-white/5 hover:border-brand-blue/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Core Web Vitals & Speed Optimization</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/70 border border-white/5 hover:border-purple-500/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Schema.org Knowledge Graph Integration</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/70 border border-white/5 hover:border-brand-red/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>GEO & AI Answer Optimization</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive 3D Entity Profile Card */}
          <ScrollReveal animation="slide-right" className="lg:col-span-5">
            <GlassCard className="p-8 border-blue-500/30 relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[11px] font-mono text-brand-blue uppercase tracking-widest font-bold">
                    Verified Professional Entity
                  </span>
                  <h4 className="text-2xl font-bold text-text-primary font-display mt-1">
                    Sunil Kumar Bohara
                  </h4>
                  <p className="text-xs text-brand-cyan font-mono mt-0.5 font-semibold">
                    SEO Executive • Nepal
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue/20 to-brand-red/20 border border-blue-500/40 flex items-center justify-center text-brand-cyan shadow-sm">
                  <Award className="w-6 h-6 text-brand-blue" />
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono text-text-secondary border-t border-b border-white/10 py-4 my-4">
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Official Role:</span>
                  <span className="text-text-primary font-semibold">SEO Executive</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Location:</span>
                  <span className="text-brand-cyan">Kathmandu, Nepal</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Core Disciplines:</span>
                  <span className="text-brand-blue font-semibold">SEO / GEO / AEO & Technical</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Methodology:</span>
                  <span className="text-text-primary">White-Hat & Data-Driven</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan">
                  <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                  <span>Available for Projects</span>
                </div>
                <a
                  href="#contact"
                  className="text-xs font-mono text-brand-red font-bold underline underline-offset-4 hover:text-red-400 transition-colors"
                >
                  Start Project →
                </a>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* 6 Capability Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <ScrollReveal key={cap.title} animation="fade-up" delay={idx * 0.08}>
                <GlassCard className="h-full flex flex-col justify-between p-6 hover:border-blue-500/40">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-cyan group-hover:border-brand-blue/50 group-hover:shadow-sm transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 rounded bg-surface-100 border border-white/5">
                        {cap.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-text-primary group-hover:text-brand-cyan transition-colors mb-2">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-brand-cyan">
                    <span>Explore Discipline</span>
                    <span>→</span>
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
