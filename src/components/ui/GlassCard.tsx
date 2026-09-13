"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  tilt = true,
  glow = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rX = ((y - centerY) / centerY) * -7;
      const rY = ((x - centerX) / centerX) * 7;
      setRotateX(rX);
      setRotateY(rY);
    }

    if (glow) {
      setGlowPos({ x, y, opacity: 1 });
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-surface-200/70 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-brand-blue/40 shadow-glass-card group overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Radial Hover Spotlight Glow */}
      {glow && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: glowPos.opacity,
            background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, rgba(59, 130, 246, 0.18), transparent 60%)`,
          }}
        />
      )}

      {/* Card Content with 3D Depth Layering */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
