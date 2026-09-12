"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SeoEcosystem3D from "./SeoEcosystem3D";

function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-brand-green/20 via-brand-cyan/20 to-transparent blur-3xl animate-pulse-slow absolute" />
      <div className="relative z-10 text-center p-6 border border-brand-green/30 rounded-2xl bg-surface-200/60 backdrop-blur-xl shadow-glass-card">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-green/10 border border-brand-green/40 flex items-center justify-center text-brand-green">
          <svg className="w-6 h-6 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-white">Search Ecosystem Active</p>
        <p className="text-xs text-gray-400 mt-1">SEO Architecture Visualization</p>
      </div>
    </div>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return <div className="w-full h-full min-h-[420px]" />;
  }

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="w-full h-full min-h-[420px] lg:min-h-[560px] relative">
      <Suspense fallback={<WebGLFallback />}>
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 48 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#00e599" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#00e599" distance={6} />
          <SeoEcosystem3D />
        </Canvas>
      </Suspense>
    </div>
  );
}
