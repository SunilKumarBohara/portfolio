"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { formatNepalTime, cn } from "@/lib/utils";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, ArrowUpRight, Clock, Sparkles } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nepalTime, setNepalTime] = useState<string>("");

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Skills", href: "/#skills" },
    { name: "Journey", href: "/#journey" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    setNepalTime(formatNepalTime());
    const timer = setInterval(() => {
      setNepalTime(formatNepalTime());
    }, 1000);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-surface-300/90 backdrop-blur-xl border-b border-brand-green/20 shadow-glass-card"
            : "bg-surface-300/60 backdrop-blur-md border-b border-white/5"
        )}
      >
        {/* Top Utility Navbar */}
        <div className="border-b border-white/10 bg-surface-200/40 text-[11px] font-mono py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Live Nepal Time & Location */}
            <div className="flex items-center gap-3 text-gray-300">
              <div className="flex items-center gap-1.5" title="Asia/Kathmandu (UTC+5:45)">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="text-gray-400 font-sans text-[11px]">Nepal:</span>
                <span className="font-bold text-brand-green font-mono">{nepalTime || "--:--:-- --"}</span>
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-gray-400 hidden sm:inline">Kathmandu (UTC+5:45)</span>
            </div>

            {/* Center: Availability Pill */}
            <div className="hidden md:flex items-center">
              <Link
                href="/#contact"
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/25 text-brand-green text-[10px] hover:bg-brand-green/20 transition-colors font-sans"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span>Available for Q1/Q2 SEO Projects & Audits</span>
              </Link>
            </div>

            {/* Right: Direct Contacts */}
            <div className="flex items-center gap-3 text-gray-400 text-[11px] font-sans">
              <a
                href="mailto:sunilbohara3000@gmail.com"
                className="hover:text-brand-green transition-colors hidden sm:inline"
              >
                sunilbohara3000@gmail.com
              </a>
              <span className="text-white/20 hidden sm:inline">|</span>
              <a
                href="tel:+9779817268172"
                className="hover:text-brand-green transition-colors"
              >
                +977 9817268172
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
          {/* Brand Name / Logo: SUNIL KUMAR BOHARA */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-lg"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-green to-brand-cyan p-[1px] shrink-0">
              <div className="w-full h-full rounded-lg bg-surface-300 flex items-center justify-center">
                <span className="text-xs font-black text-brand-green font-mono">SKB</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold tracking-wider text-white group-hover:text-brand-green transition-colors font-display whitespace-nowrap">
                SUNIL KUMAR BOHARA
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase -mt-0.5 hidden sm:block">
                SEO Executive • Nepal
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-surface-200/60 border border-white/10 backdrop-blur-md px-3 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white rounded-full transition-all duration-200 hover:bg-white/5 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-green rounded-full group-hover:w-1/2 transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right Action, Nepal Clock & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Nepal Clock */}
            {nepalTime && (
              <div
                className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-100/70 border border-white/10 text-[11px] font-mono text-gray-300"
                title="Local Time in Kathmandu, Nepal (GMT+5:45)"
              >
                <Clock className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
                <span>Nepal: {nepalTime}</span>
              </div>
            )}

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Let's Talk CTA */}
            <MagneticButton href="/#contact" variant="primary" size="sm">
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-surface-100/80 border border-white/10 text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand-green" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                <span className="text-xs font-mono text-brand-green flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sunil Kumar Bohara
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
                    className="p-3 rounded-xl bg-surface-200/80 border border-white/5 text-xs font-medium text-gray-200 hover:text-brand-green hover:border-brand-green/30 transition-all"
                  >
                    <span>{link.name}</span>
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
