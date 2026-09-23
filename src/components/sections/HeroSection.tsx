"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import ScrollReveal from "../ui/ScrollReveal";
import { ArrowRight, Sparkles, TrendingUp, Search, ShieldCheck, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-background">
      {/* Background Cybernetic Glow Halos & Grid */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-radial from-brand-green/15 via-brand-cyan/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Availability Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-200/90 border border-brand-green/40 backdrop-blur-md shadow-glow-sm mb-6"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green" />
              </span>
              <span className="text-xs font-mono font-medium text-brand-green tracking-wide">
                SEO Executive • Available for Projects & Strategy
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-display"
            >
              I Turn{" "}
              <span className="bg-gradient-to-r from-brand-green via-brand-cyan to-teal-300 bg-clip-text text-transparent">
                Search Visibility
              </span>{" "}
              Into Digital Growth<span className="text-brand-green">.</span>
            </motion.h1>

            {/* Supporting Bio Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mt-6 max-w-2xl font-normal leading-relaxed"
            >
              I&apos;m <span className="text-white font-semibold">Sunil Kumar Bohara</span>, an <strong className="text-brand-green font-semibold">SEO Executive</strong> based in Nepal helping websites improve visibility, capture search intent, and grow through data-backed organic search optimization.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-8 w-full sm:w-auto"
            >
              <MagneticButton href="#projects" variant="primary" size="lg">
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton href="#contact" variant="secondary" size="lg">
                <span>Let&apos;s Work Together</span>
              </MagneticButton>
            </motion.div>

            {/* Quick SEO Pillar Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 pt-8 border-t border-white/10 w-full text-xs font-mono text-gray-300"
            >
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/50 border border-white/5 hover:border-brand-green/30 hover:scale-[1.02] transition-all">
                <Search className="w-4 h-4 text-brand-green" />
                <span>Technical SEO</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/50 border border-white/5 hover:border-brand-cyan/30 hover:scale-[1.02] transition-all">
                <TrendingUp className="w-4 h-4 text-brand-cyan" />
                <span>GEO & AI Search</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/50 border border-white/5 hover:border-brand-green/30 hover:scale-[1.02] transition-all">
                <Zap className="w-4 h-4 text-brand-green" />
                <span>AEO Answers</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/50 border border-white/5 hover:border-brand-cyan/30 hover:scale-[1.02] transition-all">
                <ShieldCheck className="w-4 h-4 text-brand-cyan" />
                <span>Schema Graph</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Photo Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Ambient Radial Glow Behind Photo Card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-green/25 via-brand-cyan/20 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Photo Card Container */}
            <div className="relative w-full max-w-[440px] sm:max-w-[480px] rounded-3xl p-3 sm:p-4 bg-surface-200/50 border border-white/10 backdrop-blur-xl shadow-glass-card group overflow-hidden">
              {/* Inner Picture Frame */}
              <div className="relative w-full aspect-[4/5] sm:h-[480px] lg:h-[500px] rounded-2xl overflow-hidden bg-surface-300 border border-white/10">
                <Image
                  src="/images/sunil-kumar-bohara.jpg"
                  alt="Sunil Kumar Bohara — SEO Executive"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                />

                {/* Subtle Gradient Shadow Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

                {/* Top Floating Badge: Verified SEO Executive */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-300/85 backdrop-blur-md border border-brand-green/40 shadow-lg text-[11px] font-mono text-white">
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    <span className="font-semibold">Sunil Kumar Bohara</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-surface-300/85 backdrop-blur-md border border-white/15 text-[10px] font-mono text-brand-cyan uppercase tracking-wider font-semibold">
                    SEO Executive
                  </span>
                </div>

                {/* Bottom Overlay: Role & Specialization */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="p-3.5 rounded-xl bg-surface-300/85 backdrop-blur-md border border-white/15 shadow-xl">
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-gray-200 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                        Organic Search Strategist
                      </span>
                      <span className="text-brand-green font-bold text-[11px]">Kathmandu, Nepal</span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-1 font-sans">
                      Technical SEO · Keyword Strategy · Core Web Vitals · SERP Growth
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Accent Pill */}
              <div className="absolute -bottom-1 -right-1 sm:bottom-6 sm:-right-3 px-3.5 py-2 rounded-2xl bg-surface-100/95 border border-brand-green/40 backdrop-blur-xl shadow-glow-sm flex items-center gap-2 text-xs font-mono text-white pointer-events-none z-20">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                <span className="text-gray-200 font-semibold">100% White-Hat SEO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
