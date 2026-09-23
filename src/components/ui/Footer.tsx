"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import {
  ArrowUp,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Sparkles,
} from "lucide-react";

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-surface-300 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-brand-green/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Role */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-brand-cyan p-[1px]">
                <div className="w-full h-full rounded-lg bg-surface-300 flex items-center justify-center">
                  <span className="text-xs font-black text-brand-green font-mono">SKB</span>
                </div>
              </div>
              <span className="text-lg font-black tracking-wider text-white font-display">
                SUNIL KUMAR BOHARA
              </span>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-mono font-bold">
              SEO Executive
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Building better search visibility through SEO, content, and modern web experiences.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-brand-green" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li>
                <Link href="/#about" className="hover:text-brand-green transition-colors">
                  About Sunil
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-brand-green transition-colors">
                  SEO Services
                </Link>
              </li>
              <li>
                <Link href="/#journey" className="hover:text-brand-green transition-colors">
                  SEO Journey
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-brand-green transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/prompt-studio" className="hover:text-brand-cyan transition-colors flex items-center gap-1.5 text-brand-green font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>Prompt Studio IDE</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-green transition-colors">
                  SEO Insights
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-brand-green transition-colors">
                  Get In Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links & CTA */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Connect With Sunil
            </h4>
            <p className="text-xs text-gray-400">
              Follow along for technical SEO strategies, AI search optimization (GEO), and answer engineering (AEO).
            </p>

            <div className="flex items-center gap-2.5">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-surface-100 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Twitter X Profile"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-100 hover:bg-surface-50 border border-brand-green/30 text-xs font-mono text-brand-green transition-all shadow-glow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start a Project Consultation</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© 2026 Sunil Kumar Bohara. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-brand-green transition-colors focus:outline-none"
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
