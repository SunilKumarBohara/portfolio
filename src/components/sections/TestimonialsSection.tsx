"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { MessageSquareQuote, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-brand-green/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Client Feedback & Endorsements"
          title="Client Testimonials"
          subtitle="Honest feedback from founders, marketing leads, and agency partners on search visibility and organic growth collaborations."
        />

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 sm:p-12 text-center border-brand-green/30 relative">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/30 flex items-center justify-center text-brand-green mx-auto mb-6 shadow-glow-sm">
              <MessageSquareQuote className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-3">
              Client testimonials will appear here.
            </h3>

            <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed mb-8">
              Verified client testimonials and agency reviews will be published here upon completion of active SEO consulting engagements and case milestones.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface-100 border border-white/10 text-xs font-mono text-gray-300">
              <ShieldCheck className="w-4 h-4 text-brand-green" />
              <span>Authentic Reviews Policy • 100% Real Feedback</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
