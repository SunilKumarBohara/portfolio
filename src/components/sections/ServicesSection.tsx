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
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-blue/5 blur-[150px] pointer-events-none" />

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
                  className="h-full flex flex-col justify-between p-6 border-white/10 hover:border-brand-blue/50 cursor-pointer group"
                >
                  <div>
                    {/* Top Icon & Index */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-100 border border-white/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-blue/10 group-hover:border-brand-blue/40 group-hover:shadow-glow-sm transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors mb-1 font-display">
                      {service.title}
                    </h3>
                    <p className="text-[11px] font-mono text-brand-cyan mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-300 group-hover:text-brand-cyan transition-colors">
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
              className="relative w-full max-w-2xl bg-surface-300 border border-brand-blue/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-surface-100 border border-white/10 text-gray-400 hover:text-white hover:border-brand-blue focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 rounded-xl bg-brand-blue/10 border border-brand-blue/30 text-brand-cyan">
                  <Sparkles className="w-5 h-5 text-brand-red" />
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {selectedService.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-cyan">
                    {selectedService.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {selectedService.description}
              </p>

              {/* Deliverables List */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-brand-cyan">
                  Key Deliverables & Execution Scope:
                </h4>
                <div className="space-y-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-200/80 border border-white/5 text-xs text-gray-200"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Impact */}
              <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20 text-xs text-gray-300">
                <strong className="text-brand-cyan block mb-1 font-mono">
                  Primary Organic Search Impact:
                </strong>
                {selectedService.impact}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-xl bg-surface-100 hover:bg-surface-200 border border-white/10 text-xs text-gray-300 font-medium"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-red text-white text-xs font-bold shadow-glow-sm hover:brightness-110 flex items-center gap-2"
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
