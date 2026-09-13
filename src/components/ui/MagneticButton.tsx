"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glow";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  target,
  rel,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (clientX - centerX) * 0.25;
    const distanceY = (clientY - centerY) * 0.25;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-medium",
    md: "px-6 py-3 text-sm font-semibold tracking-wide",
    lg: "px-8 py-4 text-base font-semibold tracking-wide",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-brand-blue to-brand-red text-white font-bold hover:shadow-glow-md shadow-glow-sm border border-brand-blue/40 hover:brightness-110",
    secondary:
      "bg-surface-100/80 text-white hover:text-brand-cyan border border-white/10 hover:border-brand-blue/40 backdrop-blur-md hover:bg-surface-50/80",
    outline:
      "bg-transparent text-gray-200 border border-brand-cyan/40 hover:border-brand-cyan hover:text-brand-cyan hover:shadow-glow-cyan",
    glow:
      "bg-brand-blue/10 text-brand-cyan border border-brand-blue/50 hover:bg-brand-blue hover:text-white hover:shadow-glow-md",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.2 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 group cursor-pointer overflow-hidden select-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {/* Subtle sheen highlight on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button {...props} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-xl">
      {content}
    </button>
  );
}
