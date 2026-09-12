"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { formatNepalTime, cn } from "@/lib/utils";
import MagneticButton from "./MagneticButton";
import { Menu, X, ArrowUpRight, Clock, Sparkles, BookOpen } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nepalTime, setNepalTime] = useState<string>("");
  const [navLinks, setNavLinks] = useState([
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Approach", href: "/#approach" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "SEO Lab", href: "/#seo-lab" },
    { name: "Insights", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ]);

  useEffect(() => {
    setNepalTime(formatNepalTime());
    const timer = setInterval(() => {
      setNepalTime(formatNepalTime());
    }, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Fetch dynamic menus from CMS API if available
    fetch("/api/admin/menus")
      .then((res) => (res.ok ? res.json() : null))
      .then((menus) => {
        if (Array.isArray(menus) && menus.length > 0) {
          setNavLinks(
            menus.map((m) => ({
              name: m.label,
              href: m.url.startsWith("#") ? `/${m.url}` : m.url,
            }))
          );
        }
      })
      .catch(() => {});

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4",
          scrolled
            ? "bg-surface-300/85 backdrop-blur-xl border-b border-brand-green/20 shadow-glass-card py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-brand-cyan p-[1px]">
              <div className="w-full h-full rounded-lg bg-surface-300 flex items-center justify-center">
                <span className="text-sm font-black text-brand-green font-mono">S</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-wider text-white group-hover:text-brand-green transition-colors font-display">
                SUNIL<span className="text-brand-green">.</span>
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase -mt-1 hidden sm:block">
                SEO Specialist • Nepal
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface-200/60 border border-white/10 backdrop-blur-md px-3 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-gray-300 hover:text-white rounded-full transition-all duration-200 hover:bg-white/5 relative group"
              >
                {link.name}
                {link.name === "SEO Lab" && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green text-[9px] font-mono border border-brand-green/40">
                    DEMO
                  </span>
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-green rounded-full group-hover:w-1/2 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Action & Live Nepal Clock */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live Nepal Time Badge */}
            {nepalTime && (
              <div
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100/70 border border-white/10 text-[11px] font-mono text-gray-300"
                title="Local Time in Kathmandu, Nepal (GMT+5:45)"
              >
                <Clock className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                <span>Nepal: {nepalTime}</span>
              </div>
            )}

            <MagneticButton href="/#contact" variant="primary" size="sm">
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-surface-100/80 border border-white/10 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-brand-green" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[68px] z-40 p-4 lg:hidden"
          >
            <div className="rounded-2xl bg-surface-300/95 border border-brand-green/30 p-6 backdrop-blur-2xl shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-brand-green flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sunil Kumar Bohara Portfolio
                </span>
                {nepalTime && (
                  <span className="text-[11px] font-mono text-gray-400">
                    Kathmandu: {nepalTime}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-surface-200/80 border border-white/5 text-sm font-medium text-gray-200 hover:text-brand-green hover:border-brand-green/30 transition-all flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    {link.name === "SEO Lab" && (
                      <span className="text-[9px] px-1 rounded bg-brand-green/20 text-brand-green font-mono">
                        DEMO
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-green to-brand-cyan text-surface-300 font-bold text-center text-sm flex items-center justify-center gap-2 shadow-glow-sm"
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
