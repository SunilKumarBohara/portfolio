"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Laptop, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "button" | "dropdown";
}

export default function ThemeToggle({ className, variant = "button" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleNext = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  if (variant === "button") {
    return (
      <button
        onClick={toggleNext}
        className={cn(
          "relative p-2 rounded-xl bg-surface-100/80 hover:bg-surface-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-gray-300 hover:text-brand-green transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green",
          className
        )}
        title={`Current theme: ${theme} (Click to toggle)`}
        aria-label="Toggle Theme"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4 text-brand-green transition-transform duration-300 rotate-0" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 rotate-90" />
        )}
      </button>
    );
  }

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-100/80 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all"
        aria-label="Select Theme"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-3.5 h-3.5 text-brand-green" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
        <span className="capitalize">{theme}</span>
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-xl bg-surface-200 border border-white/10 shadow-2xl p-1.5 z-50 space-y-1 text-xs font-mono">
          <button
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors",
              theme === "dark" ? "bg-brand-green/20 text-brand-green font-bold" : "text-gray-300 hover:bg-white/5"
            )}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors",
              theme === "light" ? "bg-brand-green/20 text-brand-green font-bold" : "text-gray-300 hover:bg-white/5"
            )}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light</span>
          </button>
          <button
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors",
              theme === "system" ? "bg-brand-green/20 text-brand-green font-bold" : "text-gray-300 hover:bg-white/5"
            )}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
}
