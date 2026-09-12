"use client";

import React from "react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import ScrollReveal from "../ui/ScrollReveal";
import { Search, Code2, LineChart, FileText, Cpu, Rocket, MapPin, CheckCircle2, Award } from "lucide-react";

const capabilities = [
  {
    title: "Technical SEO",
    tag: "Core Engineering",
    icon: Cpu,
    description: "Crawl budget optimization, rendering diagnostics, XML sitemaps, robots directives, canonicalization, and Core Web Vitals.",
    color: "from-emerald-500/20 to-teal-500/5",
    accent: "text-brand-green",
  },
  {
    title: "Keyword & Intent",
    tag: "Search Psychology",
    icon: Search,
    description: "Deconstructing user intent, commercial queries, competitive gap analysis, and high-ROI semantic topical clustering.",
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-brand-cyan",
  },
  {
    title: "Content Strategy",
    tag: "Topical Authority",
    icon: FileText,
    description: "Architecting E-E-A-T driven pillar-cluster models that establish undeniable search authority and user trust.",
    color: "from-green-500/20 to-emerald-500/5",
    accent: "text-brand-green",
  },
  {
    title: "Data & Analytics",
    tag: "Attribution Engine",
    icon: LineChart,
    description: "Unraveling GSC index coverage, GA4 user conversion journeys, SERP volatility, and Looker Studio performance dashboards.",
    color: "from-blue-500/20 to-cyan-500/5",
    accent: "text-brand-cyan",
  },
  {
    title: "Web Technologies",
    tag: "Frontend Foundation",
    icon: Code2,
    description: "HTML5 semantic outlines, CSS optimization, JavaScript execution, DOM structures, and Schema.org JSON-LD graph architecture.",
    color: "from-teal-500/20 to-emerald-500/5",
    accent: "text-brand-green",
  },
  {
    title: "Organic Growth",
    tag: "Conversion & ROI",
    icon: Rocket,
    description: "Bridging the gap between raw organic search rankings and meaningful bottom-line business conversion funnels.",
    color: "from-lime-500/20 to-emerald-500/5",
    accent: "text-brand-green",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Entity & Methodology"
            title="Behind the Search Strategy"
            subtitle="Discover the methodology, technical understanding, and strategic mindset driving sustainable organic search visibility."
          />
        </ScrollReveal>

        {/* Narrative & Personal Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: Deep Story & Philosophy */}
          <ScrollReveal animation="slide-left" className="lg:col-span-7 space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
            <div className="p-6 rounded-2xl bg-surface-200/80 border border-white/10 backdrop-blur-md hover:border-brand-green/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 font-display">
                <MapPin className="w-5 h-5 text-brand-green" />
                SEO Specialist & Digital Strategist based in Nepal
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Modern search algorithms have evolved beyond basic meta tags and keyword stuffing. True search engine optimization requires a harmonious synthesis of <strong className="text-white">technical architecture</strong>, <strong className="text-white">search intent alignment</strong>, <strong className="text-white">topical authority</strong>, and <strong className="text-white">user-first page experience</strong>.
              </p>
            </div>

            <p className="text-sm sm:text-base text-gray-400">
              I specialize in taking websites from obscurity to prominence by eliminating technical crawling hurdles, deciphering user search psychology, and building content networks that search engines inherently trust. With a solid foundation in web technologies (HTML, CSS, JavaScript, and backend logic), I bridge the communication gap between search marketing goals and developer execution.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-green/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Search Intent & Commercial Mapping</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-green/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Core Web Vitals & Speed Optimization</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-green/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Schema.org Knowledge Graph Integration</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-100/60 border border-white/5 hover:border-brand-green/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                <span>Data-Driven Audits & Attribution</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Interactive 3D Entity Profile Card */}
          <ScrollReveal animation="slide-right" className="lg:col-span-5">
            <GlassCard className="p-8 border-brand-green/30 relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-[11px] font-mono text-brand-green uppercase tracking-widest">
                    Verified Entity
                  </span>
                  <h4 className="text-2xl font-bold text-white font-display mt-1">
                    Sunil Kumar Bohara
                  </h4>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    SEO Specialist • Nepal
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-green/20 to-brand-cyan/20 border border-brand-green/40 flex items-center justify-center text-brand-green shadow-glow-sm">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono text-gray-300 border-t border-b border-white/10 py-4 my-4">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Focus Discipline:</span>
                  <span className="text-white font-semibold">Technical & Organic SEO</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Location:</span>
                  <span className="text-brand-cyan">Kathmandu, Nepal</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Execution Framework:</span>
                  <span className="text-brand-green">White-Hat & Data-Backed</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Technical Foundation:</span>
                  <span className="text-white">HTML/CSS/JS/PHP/Schema</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-green">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  <span>Ready for Inquiries</span>
                </div>
                <a
                  href="#contact"
                  className="text-xs font-mono text-white underline underline-offset-4 hover:text-brand-green transition-colors"
                >
                  Consultation Details →
                </a>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>

        {/* 6 Interactive 3D Capability Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <ScrollReveal key={cap.title} animation="fade-up" delay={idx * 0.08}>
                <GlassCard className="h-full flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-green group-hover:border-brand-green/50 group-hover:shadow-glow-sm transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 px-2 py-0.5 rounded bg-surface-100 border border-white/5">
                        {cap.tag}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-brand-green transition-colors mb-2">
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
