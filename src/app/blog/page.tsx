import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getPosts, getCategories, getSettings } from "@/lib/db";
import { Calendar, Clock, ArrowRight, BookOpen, Tag, Sparkles, Folder } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: `SEO Insights & Articles | ${settings.siteName}`,
    description: "In-depth technical SEO breakdowns, Core Web Vitals optimizations, keyword clustering playbooks, and algorithm update guides.",
  };
}

export default function BlogIndexPage() {
  const posts = getPosts().filter((p) => p.status === "published" || !p.status);
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-green/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100 border border-brand-green/30 text-xs font-mono text-brand-green uppercase shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEO Insights & Knowledge Base</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-display">
            Search Engine Optimization Insights
          </h1>
          <p className="text-base text-gray-400 font-normal leading-relaxed">
            Data-backed search strategies, technical crawl guides, and search visibility methodologies authored by Sunil Kumar Bohara.
          </p>
        </ScrollReveal>

        {/* Categories Bar */}
        <ScrollReveal animation="fade-up" delay={0.1} className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-xs font-mono bg-brand-green/20 text-brand-green border border-brand-green/50 shadow-glow-sm"
          >
            All Articles ({posts.length})
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="px-4 py-2 rounded-full text-xs font-mono bg-surface-200/80 text-gray-400 hover:text-white border border-white/10 hover:border-brand-green/30 transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </ScrollReveal>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <ScrollReveal key={post.id} animation="fade-up" delay={idx * 0.08}>
              <GlassCard className="h-full flex flex-col justify-between p-6 border-white/10 hover:border-brand-green/40 group">
                <div>
                  {/* Thumbnail */}
                  {post.featuredImage && (
                    <div className="relative rounded-xl overflow-hidden aspect-video mb-4 bg-surface-100 border border-white/5">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-300/90 backdrop-blur-md border border-brand-green/30 text-brand-green text-[10px] font-mono">
                        {post.category}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      {post.readingTime}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-bold text-white group-hover:text-brand-green transition-colors font-display mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-surface-100 text-[10px] font-mono text-gray-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-mono text-brand-cyan group-hover:text-brand-green transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
