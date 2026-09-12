import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategories, getPosts, getSettings } from "@/lib/db";
import { ArrowLeft, Calendar, Clock, ArrowRight, FolderTree, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = getCategories();
  const cat = categories.find((c) => c.slug === params.slug);
  const settings = getSettings();

  if (!cat) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${cat.name} SEO Articles | ${settings.siteName}`,
    description: cat.description || `Read comprehensive ${cat.name} articles and guides.`,
  };
}

export default function CategoryArchivePage({ params }: Props) {
  const categories = getCategories();
  const currentCategory = categories.find((c) => c.slug === params.slug);
  if (!currentCategory) {
    notFound();
  }

  const posts = getPosts().filter(
    (p) =>
      (p.status === "published" || !p.status) &&
      (p.category.toLowerCase() === currentCategory.name.toLowerCase() ||
        p.categoryId === currentCategory.id)
  );

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-green/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <ScrollReveal animation="fade-in">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100 border border-brand-green/30 text-xs font-mono text-brand-green uppercase shadow-glow-sm">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Category Archive</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white font-display">
            {currentCategory.name}
          </h1>

          {currentCategory.description && (
            <p className="text-base text-gray-400 max-w-2xl">
              {currentCategory.description}
            </p>
          )}
        </ScrollReveal>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-24 p-8 rounded-3xl bg-surface-200/50 border border-white/5 space-y-3">
            <p className="text-base font-bold text-white">No articles published in this category yet.</p>
            <Link
              href="/blog"
              className="text-xs font-mono text-brand-green underline"
            >
              Browse all other articles →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <ScrollReveal key={post.id} animation="fade-up" delay={idx * 0.08}>
                <GlassCard className="h-full flex flex-col justify-between p-6 border-white/10 hover:border-brand-green/40 group">
                  <div>
                    {post.featuredImage && (
                      <div className="relative rounded-xl overflow-hidden aspect-video mb-4 bg-surface-100 border border-white/5">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
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
        )}
      </div>
    </div>
  );
}
