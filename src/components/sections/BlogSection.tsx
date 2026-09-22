"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import ScrollReveal from "../ui/ScrollReveal";
import { BlogPost } from "@/types";
import { blogPosts as fallbackPosts } from "@/data/blog";
import {
  Calendar,
  Clock,
  ArrowRight,
  X,
  Tag,
  User,
  ExternalLink,
} from "lucide-react";

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [categories, setCategories] = useState<string[]>(["All Insights"]);
  const [selectedCat, setSelectedCat] = useState("All Insights");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          setPosts(data);
          const uniqueCats = Array.from(
            new Set(data.map((p: BlogPost) => p.category))
          ) as string[];
          setCategories(["All Insights", ...uniqueCats]);
        }
      }
    } catch {
      // fallback to static data
    }
  };

  const filteredPosts =
    selectedCat === "All Insights"
      ? posts
      : posts.filter((p) => p.category === selectedCat);

  return (
    <section
      id="insights"
      className="relative py-24 sm:py-32 bg-surface-300 border-t border-white/5 overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-green/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeading
            badge="Written Insights & Strategy"
            title="SEO Insights"
            subtitle="In-depth technical breakdowns, keyword intent analysis, and structured search methodologies authored by Sunil Kumar Bohara."
          />
        </ScrollReveal>

        {/* Category Pills */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => {
              const isActive = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border ${
                    isActive
                      ? "bg-brand-green/20 text-brand-green border-brand-green/60 shadow-glow-sm"
                      : "bg-surface-200 text-gray-400 border-white/10 hover:text-white hover:border-brand-green/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.slice(0, 4).map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 0.1}>
              <GlassCard
                onClick={() => setActiveArticle(post)}
                className="h-full flex flex-col justify-between p-8 border-white/10 hover:border-brand-green/40 cursor-pointer group"
              >
                <div>
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-[11px] font-mono">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-green transition-colors mb-3 font-display leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Tags & Action Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-surface-100 text-[10px] font-mono text-gray-400 border border-white/5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-brand-cyan group-hover:text-brand-green transition-colors font-semibold">
                    <span>Quick Preview</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Blog Link */}
        <ScrollReveal animation="fade-up" delay={0.2} className="text-center pt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-200 hover:bg-surface-100 border border-white/10 text-xs font-mono text-white hover:text-brand-green hover:border-brand-green/40 transition-all shadow-glass-card group"
          >
            <span>Browse Full Insights Library</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </ScrollReveal>
      </div>

      {/* Clean Professional Article Reading / Quick Preview Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-surface-300 border border-brand-green/40 rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-surface-100 border border-white/10 text-gray-400 hover:text-white hover:border-brand-green focus:outline-none"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category & Read Time */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-mono">
                  {activeArticle.category}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {activeArticle.readingTime}
                </span>
              </div>

              {/* Insight Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-4 leading-tight">
                {activeArticle.title}
              </h2>

              {/* Author & Meta */}
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-1.5 text-white">
                  <User className="w-3.5 h-3.5 text-brand-green" />
                  <span className="font-semibold">Sunil Kumar Bohara</span>
                </div>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>SEO Executive</span>
              </div>

              {/* Short Introduction */}
              <div className="p-4 rounded-xl bg-surface-200/80 border border-white/5 mb-6 text-sm text-gray-300 leading-relaxed font-sans">
                <strong className="text-white block mb-1 font-mono text-xs uppercase tracking-wider text-brand-green">
                  Introduction:
                </strong>
                {activeArticle.excerpt}
              </div>

              {/* Main Useful Written Content */}
              <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                {activeArticle.content}
              </div>

              {/* Tags & Action Button */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-brand-cyan" />
                  {activeArticle.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-surface-100 text-xs font-mono text-gray-300 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${activeArticle.slug}`}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 text-xs font-bold shadow-glow-sm hover:brightness-110 flex items-center gap-2"
                >
                  <span>Read Full Insight</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
