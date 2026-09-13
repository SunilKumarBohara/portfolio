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
    color: "from-purple-500/20 to-blue-500/5",
    accent: "text-brand-cyan",
  },
  {
    title: "AEO & Direct Answers",
    tag: "Answer Engines",
    icon: MessageSquare,
    description: "Optimizing for position-zero featured answers, question targeting, Schema.org graphs, and instant snippet captures.",
    color: "from-red-500/20 to-orange-500/5",
    accent: "text-brand-red",
  },
  {
    title: "Keyword & Intent",
    tag: "Search Psychology",
    icon: Search,
    description: "Deconstructing user intent, commercial queries, competitive gap analysis, and semantic topical clustering.",
    color: "from-blue-500/20 to-indigo-500/5",
    accent: "text-brand-blue",
  },
  {
    title: "Content Architecture",
    tag: "Topical Authority",
    icon: FileText,
    description: "Architecting E-E-A-T driven pillar-cluster models that build undeniable search authority and user trust.",
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-brand-cyan",
  },
  {
    title: "Organic Growth",
    tag: "Conversion & ROI",
    icon: Rocket,
    description: "Bridging the gap between raw organic search rankings and meaningful bottom-line business conversion funnels.",
    color: "from-red-500/20 to-pink-500/5",
    accent: "text-brand-red",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-red/5 blur-[120px] pointer-events-none" />

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
          <ScrollReveal animation="slide-left" className="lg:col-span-7 space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
            <div className="p-6 rounded-2xl bg-surface-200/80 border border-white/10 backdrop-blur-md hover:border-brand-blue/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-display">
                <MapPin className="w-5 h-5 text-brand-red" />
                SEO Executive based in Nepal
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Modern search algorithms have evolved beyond basic meta tags and keywords. True search engine optimization requires a harmonious synthesis of <strong className="text-white">technical architecture</strong>, <strong className="text-white">search intent alignment</strong>, <strong className="text-white">Generative Engine Optimization (GEO)</strong>, and <strong className="text-white">Answer Engine Optimization (AEO)</strong>.
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-400">
              As an SEO Executive, I specialize in helping websites improve organic discoverability by eliminating technical crawling barriers, deciphering search psychology, and structuring content networks that search engines inherently trust. With a solid foundation in web technologies (HTML, CSS, JavaScript, and Schema graph models), I translate business goals into measurable organic search outcomes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-blue/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Search Intent & Commercial Mapping</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-blue/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Core Web Vitals & Speed Optimization</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-blue/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>Schema.org Knowledge Graph Integration</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-blue/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>GEO & AI Answer Optimization</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive 3D Entity Profile Card */}
          <ScrollReveal animation="slide-right" className="lg:col-span-5">
            <GlassCard className="p-8 border-brand-blue/30 relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[11px] font-mono text-brand-cyan uppercase tracking-widest font-bold">
                    Verified Professional Profile
                  </span>
                  <h4 className="text-2xl font-bold text-white font-display mt-1">
                    Sunil Kumar Bohara
                  </h4>
                  <p className="text-xs text-brand-cyan font-mono mt-0.5 font-semibold">
                    SEO Executive • Nepal
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-blue/20 to-brand-red/20 border border-brand-blue/40 flex items-center justify-center text-brand-cyan shadow-glow-sm">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono text-gray-300 border-t border-b border-white/10 py-4 my-4">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Official Role:</span>
                  <span className="text-white font-semibold">SEO Executive</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-brand-cyan">Kathmandu, Nepal</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Core Expertise:</span>
                  <span className="text-brand-blue font-semibold">SEO / GEO / AEO & Technical</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Methodology:</span>
                  <span className="text-white">White-Hat & Data-Driven</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  <span>Ready for Inquiries</span>
                </div>
                <a
                  href="#contact"
                  className="text-xs font-mono text-white underline underline-offset-4 hover:text-brand-cyan transition-colors"
                >
                  Consultation Details →
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
                <GlassCard className="h-full flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-cyan group-hover:border-brand-blue/50 group-hover:shadow-glow-sm transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 px-2 py-0.5 rounded bg-surface-100 border border-white/5">
                        {cap.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors mb-2">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-brand-cyan">
                    <span>Explore Methodology</span>
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
