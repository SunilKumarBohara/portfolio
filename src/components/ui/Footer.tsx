"use client";

import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUp, MapPin, Mail, ShieldCheck, Github, Linkedin, Twitter, Globe } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-surface-300 text-gray-400 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-brand-green/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Location Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-brand-cyan p-[1px]">
                <div className="w-full h-full rounded-lg bg-surface-300 flex items-center justify-center">
                  <span className="text-sm font-black text-brand-green font-mono">S</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white font-display">
                Sunil Kumar Bohara<span className="text-brand-green">.</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              SEO Specialist & Digital Marketing Professional based in Nepal. Architecting search-engine-accessible, high-intent organic growth systems.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                <span>Kathmandu, Nepal (GMT+5:45)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2 text-brand-green">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span>Open for Client Projects & SEO Audits</span>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              SEO Services
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-brand-green transition-colors">
                  Technical SEO Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-green transition-colors">
                  Keyword Research & Intent
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-green transition-colors">
                  On-Page & Semantic Hierarchy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-green transition-colors">
                  Content Strategy & Authority
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-green transition-colors">
                  Local SEO & Map Pack
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-green transition-colors">
                  Core Web Vitals Diagnostics
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Navigation
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Sunil
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  SEO Approach
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Technical Arsenal
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#seo-lab" className="hover:text-white transition-colors">
                  Interactive SEO Lab
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors">
                  SEO Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Structured Entity & Social Column */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Connect & Schema
            </p>
            <div className="flex items-center gap-3 text-gray-300">
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-200 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Sunil Kumar Bohara LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-200 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Sunil Kumar Bohara GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-200 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Sunil Kumar Bohara Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-200 border border-white/10 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Personal Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-surface-200/90 border border-brand-green/30 text-[11px] font-mono text-gray-400 flex items-start gap-2 mt-4">
              <ShieldCheck className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <span>
                Schema.org Person & WebSite JSON-LD entity structured data verified.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Sunil Kumar Bohara. All rights reserved. Crafted for organic search prominence & high performance.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-200 hover:bg-surface-100 border border-white/10 text-gray-300 hover:text-brand-green transition-all"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
