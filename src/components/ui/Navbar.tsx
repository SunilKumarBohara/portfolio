"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { formatNepalTime, cn } from "@/lib/utils";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";
import ProfileModal from "./ProfileModal";
import { Menu, X, ArrowUpRight, Clock, Sparkles, User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [nepalTime, setNepalTime] = useState<string>("");

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Search Universe", href: "/#universe" },
    { name: "Skills", href: "/#skills" },
    { name: "Journey", href: "/#journey" },
    { name: "Projects", href: "/#projects" },
    { name: "SEO Insights", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    setNepalTime(formatNepalTime());
    const timer = setInterval(() => {
      setNepalTime(formatNepalTime());
    }, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

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
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8",
          scrolled
            ? "bg-surface-300/85 backdrop-blur-xl border-b border-brand-blue/20 shadow-glass-card py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Name / Logo: SUNIL KUMAR BOHARA */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-red p-[1px] shrink-0">
              <div className="w-full h-full rounded-lg bg-surface-300 flex items-center justify-center">
                <span className="text-xs font-black text-brand-blue font-mono group-hover:text-brand-cyan transition-colors">
                  SKB
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold tracking-wider text-text-primary group-hover:text-brand-blue transition-colors font-display whitespace-nowrap">
                SUNIL KUMAR BOHARA
              </span>
              <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase -mt-0.5 hidden sm:block">
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
                className="px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary rounded-full transition-all duration-200 hover:bg-white/5 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-blue rounded-full group-hover:w-1/2 transition-all duration-300" />
              </Link>
            ))}

            {/* Profile Button in Navigation */}
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-cyan hover:text-white rounded-full transition-all duration-200 hover:bg-brand-blue/20 relative group border border-brand-blue/30"
              title="View Sunil's Digital Profile"
            >
              <User className="w-3.5 h-3.5 text-brand-blue group-hover:text-brand-cyan" />
              <span>Profile</span>
            </button>
          </nav>

          {/* Right Action, Nepal Clock, Theme Toggle & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live Nepal Clock (Asia/Kathmandu) */}
            {nepalTime && (
              <div
                className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100/80 border border-brand-blue/20 text-[11px] font-mono text-text-secondary shadow-sm"
                title="Live Nepal Time (Asia/Kathmandu · UTC+5:45)"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
                </span>
                <span className="font-semibold text-text-primary">NEPAL</span>
                <span className="text-text-muted">·</span>
                <span className="text-brand-cyan font-bold">{nepalTime}</span>
              </div>
            )}

            {/* Profile Quick Button for medium screens */}
            <button
              onClick={() => setProfileModalOpen(true)}
              className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-100/80 border border-brand-blue/30 text-xs font-mono text-brand-blue hover:text-white hover:bg-brand-blue/20 transition-all"
              title="Open Digital Profile"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>

            {/* Theme Switcher Button */}
            <ThemeToggle />

            {/* Let's Talk CTA */}
            <MagneticButton href="/#contact" variant="primary" size="sm">
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setProfileModalOpen(true)}
              className="p-2 rounded-xl bg-surface-100/80 border border-brand-blue/30 text-brand-blue focus:outline-none"
              title="Open Digital Profile"
            >
              <User className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-surface-100/80 border border-white/10 text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand-red" /> : <Menu className="w-6 h-6" />}
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
            <div className="rounded-2xl bg-surface-300/95 border border-brand-blue/30 p-6 backdrop-blur-2xl shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-brand-blue flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sunil Kumar Bohara
                </span>
                {nepalTime && (
                  <span className="text-[11px] font-mono text-brand-cyan bg-surface-100 px-2.5 py-1 rounded-full border border-white/10">
                    NEPAL · {nepalTime}
                  </span>
                )}
              </div>

              {/* Profile Card Trigger inside Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProfileModalOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-brand-blue/15 to-brand-red/15 border border-brand-blue/30 text-xs font-mono text-text-primary"
              >
                <span className="flex items-center gap-2 font-bold text-brand-cyan">
                  <User className="w-4 h-4 text-brand-blue" />
                  View Digital Profile Card
                </span>
                <span className="text-[10px] text-brand-red font-bold">OPEN →</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl bg-surface-200/80 border border-white/5 text-xs font-medium text-text-secondary hover:text-brand-blue hover:border-brand-blue/30 transition-all"
                  >
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-red text-white font-bold text-center text-sm flex items-center justify-center gap-2 shadow-glow-sm"
                >
                  <span>Let&apos;s Work Together</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Digital Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
}
