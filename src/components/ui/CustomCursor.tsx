"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.3 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const trailingConfig = { damping: 35, stiffness: 220, mass: 0.8 };
  const trailX = useSpring(cursorX, trailingConfig);
  const trailY = useSpring(cursorY, trailingConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer device
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("button") ||
            target.closest("a") ||
            target.closest("input") ||
            target.closest("textarea") ||
            target.closest("[data-cursor='pointer']") ||
            target.tagName === "BUTTON" ||
            target.tagName === "A"
        );
        setIsPointer(interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glowing Fluid Aura */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-brand-blue/40 mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 54 : 32,
          height: isPointer ? 54 : 32,
          backgroundColor: isPointer ? "rgba(59, 130, 246, 0.15)" : "rgba(56, 189, 248, 0.05)",
          borderColor: isPointer ? "rgba(59, 130, 246, 0.6)" : "rgba(56, 189, 248, 0.3)",
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      />

      {/* Center Precision Pin */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-brand-cyan shadow-glow-sm"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 8 : 5,
          height: isPointer ? 8 : 5,
          scale: isClicking ? 1.4 : 1,
          backgroundColor: isPointer ? "#38bdf8" : "#3b82f6",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
      />
    </>
  );
}
