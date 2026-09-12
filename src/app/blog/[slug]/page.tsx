import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostBySlug, getPosts, getSettings } from "@/lib/db";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  User,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  FolderTree,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  const settings = getSettings();

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.seoTitle || `${post.title} | ${settings.siteName}`;
  const description = post.metaDescription || post.excerpt;
  const canonical = post.canonicalUrl || `https://sunilkumarbohara.com/blog/${post.slug}`;
  const ogImage = post.ogImage || post.featuredImage || "/og-image.png";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle || title,
      description: post.ogDescription || description,
      images: [ogImage],
    },
  };
}

export default function SingleBlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post || (post.status && post.status !== "published")) {
    notFound();
  }

  const allPosts = getPosts().filter((p) => p.status === "published" || !p.status);
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // Article Schema.org JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || "https://sunilkumarbohara.com/og-image.png",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.authorName || "Sunil Kumar Bohara",
      url: "https://sunilkumarbohara.com",
    },
    publisher: {
      "@type": "Person",
      name: "Sunil Kumar Bohara",
      url: "https://sunilkumarbohara.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sunilkumarbohara.com/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <article className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Glow */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-brand-green/10 blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Back Link */}
        <ScrollReveal animation="fade-in">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-brand-green transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Insights</span>
          </Link>
        </ScrollReveal>

        {/* Header Block */}
        <ScrollReveal animation="fade-up" className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-mono">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                {post.readingTime}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center justify-between py-4 border-y border-white/10 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-surface-200 border border-brand-green/40 flex items-center justify-center text-brand-green">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-bold block">{post.authorName || "Sunil Kumar Bohara"}</span>
                <span className="text-[10px] text-gray-500">SEO Specialist • Nepal</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-brand-cyan">Verified Strategy Guide</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Image */}
        {post.featuredImage && (
          <ScrollReveal animation="scale-up">
            <div className="rounded-3xl overflow-hidden aspect-video border border-white/10 bg-surface-200 shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        )}

        {/* Body Content */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-200/70 border border-white/10 backdrop-blur-xl space-y-6 text-gray-200 leading-relaxed whitespace-pre-line text-sm sm:text-base font-sans prose prose-invert max-w-none shadow-glass-card">
            {post.content}
          </div>
        </ScrollReveal>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <Tag className="w-4 h-4 text-brand-cyan mr-1" />
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-xl bg-surface-200 border border-white/10 text-xs font-mono text-gray-300"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-green" />
              <span>Related SEO Guides</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <GlassCard key={rel.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-brand-cyan px-2 py-0.5 rounded bg-surface-100 border border-white/5 mb-2 inline-block">
                      {rel.category}
                    </span>
                    <Link href={`/blog/${rel.slug}`}>
                      <h4 className="text-base font-bold text-white hover:text-brand-green transition-colors font-display line-clamp-2">
                        {rel.title}
                      </h4>
                    </Link>
                  </div>

                  <Link
                    href={`/blog/${rel.slug}`}
                    className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-brand-green"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
