"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import ScrollReveal from "../ui/ScrollReveal";
import { services } from "@/data/services";
import {
  Cpu,
  Search,
  FileCode2,
  BookOpen,
  Share2,
  ShieldAlert,
  MapPin,
  BarChart3,
  CheckCircle,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import { ServiceItem } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Search,
  FileCode2,
  BookOpen,
  Share2,
  ShieldAlert,
  MapPin,
  BarChart3,
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-background border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-brand-blue/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="SEO Engineering & Solutions"
            title="What I Do"
            subtitle="Specialized, end-to-end SEO services engineered to capture search demand, elevate domain authority, and scale revenue."
          />
        </ScrollReveal>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Search;
            return (
              <ScrollReveal key={service.id} animation="fade-up" delay={index * 0.06}>
                <GlassCard
                  onClick={() => setSelectedService(service)}
                  className="h-full flex flex-col justify-between p-6 border-white/10 hover:border-blue-500/50 cursor-pointer group"
                >
                  <div>
                    {/* Top Icon & Index */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue/10 group-hover:border-brand-blue/40 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-text-muted font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-blue transition-colors mb-1 font-display">
                      {service.title}
                    </h3>
                    <p className="text-[11px] font-mono text-brand-cyan mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-muted group-hover:text-brand-blue transition-colors">
                    <span>View Deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-surface-300 border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-surface-100 border border-white/10 text-text-muted hover:text-text-primary hover:border-brand-red focus:outline-none"
              >
                <X className="w-5 h-5 text-brand-red" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 rounded-xl bg-brand-blue/10 border border-brand-blue/30 text-brand-cyan">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-text-primary font-display">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-cyan">
                    {selectedService.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                {selectedService.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-brand-blue font-bold">
                  Key Deliverables & Execution Scope:
                </h4>
                <div className="space-y-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-200/80 border border-white/5 text-xs text-text-primary font-mono"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Impact */}
              <div className="p-4 rounded-xl bg-surface-100 border border-blue-500/20 text-xs text-text-secondary">
                <strong className="text-brand-blue block mb-1 font-mono font-bold">
                  PRIMARY SEARCH IMPACT:
                </strong>
                {selectedService.impact}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-xs text-text-secondary font-medium"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-red text-white text-xs font-bold shadow-sm hover:brightness-110 flex items-center gap-2"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
