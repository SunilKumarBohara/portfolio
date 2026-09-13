"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type SearchPlanetKey = "seo" | "geo" | "aeo";

interface SearchUniverse3DProps {
  activePlanet: SearchPlanetKey;
  onSelectPlanet: (planet: SearchPlanetKey) => void;
}

// Glowing Central SEARCH Core
function CentralSearchCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const blueRingRef = useRef<THREE.Mesh>(null);
  const redRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35;
      coreRef.current.rotation.x = t * 0.18;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z = -t * 0.25;
      const s = 1.35 + Math.sin(t * 2) * 0.05;
      coronaRef.current.scale.set(s, s, s);
    }
    if (blueRingRef.current) {
      blueRingRef.current.rotation.z = -t * 0.3;
      blueRingRef.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.5) * 0.1;
    }
    if (redRingRef.current) {
      redRingRef.current.rotation.x = Math.PI / 3.2;
      redRingRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group>
      {/* Primary Glowing Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#1d4ed8"
          emissiveIntensity={2.0}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing Wireframe Corona */}
      <mesh ref={coronaRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Central Core Label */}
      <Html position={[0, 0, 0]} center distanceFactor={13} pointerEvents="none">
        <div className="px-3 py-1 rounded-full bg-black/90 border border-blue-500/70 text-[11px] font-mono text-cyan-300 font-extrabold shadow-[0_0_20px_rgba(59,130,246,0.6)] select-none tracking-widest whitespace-nowrap">
          SEARCH
        </div>
      </Html>

      {/* Blue Energy Ring */}
      <mesh ref={blueRingRef}>
        <ringGeometry args={[1.7, 1.85, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>

      {/* Red Accent Orbital Ring */}
      <mesh ref={redRingRef}>
        <ringGeometry args={[2.05, 2.15, 64]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Orbiting Planet Component
function OrbitingPlanet({
  planetKey,
  radiusX,
  radiusZ,
  speed,
  inclination = 0,
  color,
  accentColor,
  label,
  fullName,
  size = 0.55,
  activePlanet,
  onSelectPlanet,
}: {
  planetKey: SearchPlanetKey;
  radiusX: number;
  radiusZ: number;
  speed: number;
  inclination?: number;
  color: string;
  accentColor: string;
  label: string;
  fullName: string;
  size?: number;
  activePlanet: SearchPlanetKey;
  onSelectPlanet: (planet: SearchPlanetKey) => void;
}) {
  const planetRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isSelected = activePlanet === planetKey;

  // Track planet orbital position
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (planetRef.current) {
      const rawX = Math.cos(t) * radiusX;
      const rawZ = Math.sin(t) * radiusZ;
      const y = Math.sin(t) * (radiusX * Math.sin(inclination)) + Math.sin(t * 2) * 0.25;
      planetRef.current.position.set(rawX, y, rawZ);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.015;
    }
  });

  return (
    <group>
      {/* Tilted Elliptical Orbit Line */}
      <mesh rotation={[Math.PI / 2 - inclination, 0, 0]}>
        <ringGeometry args={[radiusX - 0.025, radiusX + 0.025, 96]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.55 : 0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbiting Body */}
      <group ref={planetRef}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onSelectPlanet(planetKey)}
          scale={hovered || isSelected ? 1.35 : 1.0}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered || isSelected ? 2.4 : 1.3}
            roughness={0.15}
            metalness={0.75}
          />
        </mesh>

        {/* Planet Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0, 0]}>
          <ringGeometry args={[size * 1.3, size * 1.55, 32]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Planet Floating Tag */}
        <Html position={[0, size + 0.45, 0]} center distanceFactor={13}>
          <button
            onClick={() => onSelectPlanet(planetKey)}
            className={`px-3 py-1.5 rounded-xl text-left backdrop-blur-xl transition-all duration-300 select-none whitespace-nowrap cursor-pointer ${
              isSelected
                ? "bg-black/95 border-2 border-white shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-110"
                : "bg-black/80 border border-white/20 hover:border-white/70 hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-black font-display leading-tight tracking-wider" style={{ color }}>
                {label}
              </span>
            </div>
            <div className="text-[9px] font-mono text-gray-300 truncate max-w-[140px] mt-0.5">
              {hovered || isSelected ? fullName : label}
            </div>
          </button>
        </Html>
      </group>
    </group>
  );
}

// Background Starfield Particles
function CosmosParticles({ count = 280 }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      coords[i] = (Math.random() - 0.5) * 35;
      coords[i + 1] = (Math.random() - 0.5) * 35;
      coords[i + 2] = (Math.random() - 0.5) * 35;
    }
    return coords;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.065} color="#38bdf8" transparent opacity={0.6} />
    </points>
  );
}

// Scene Root with Camera & Lights
function UniverseScene({ activePlanet, onSelectPlanet }: SearchUniverse3DProps) {
  const { camera } = useThree();

  useFrame(({ mouse }) => {
    // Subtle, smooth camera parallax lerp
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2.2, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4.5 + mouse.y * 1.2, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={5} color="#3b82f6" distance={16} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ef4444" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#38bdf8" />

      <CosmosParticles count={260} />
      <CentralSearchCore />

      {/* Orbit 1: SEO Planet (Electric Blue) */}
      <OrbitingPlanet
        planetKey="seo"
        radiusX={4.4}
        radiusZ={3.9}
        speed={0.42}
        inclination={0.12}
        color="#3b82f6"
        accentColor="#38bdf8"
        label="SEO"
        fullName="Search Engine Optimization"
        size={0.62}
        activePlanet={activePlanet}
        onSelectPlanet={onSelectPlanet}
      />

      {/* Orbit 2: GEO Planet (Purple / AI Engine) */}
      <OrbitingPlanet
        planetKey="geo"
        radiusX={6.6}
        radiusZ={5.8}
        speed={0.3}
        inclination={-0.15}
        color="#a855f7"
        accentColor="#c084fc"
        label="GEO"
        fullName="Generative Engine Opt."
        size={0.58}
        activePlanet={activePlanet}
        onSelectPlanet={onSelectPlanet}
      />

      {/* Orbit 3: AEO Planet (Crimson Red / Direct Answer Engine) */}
      <OrbitingPlanet
        planetKey="aeo"
        radiusX={8.8}
        radiusZ={7.8}
        speed={0.2}
        inclination={0.08}
        color="#ef4444"
        accentColor="#f87171"
        label="AEO"
        fullName="Answer Engine Optimization"
        size={0.55}
        activePlanet={activePlanet}
        onSelectPlanet={onSelectPlanet}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 3.4}
        rotateSpeed={0.35}
      />
    </>
  );
}

export default function SearchUniverse3D({
  activePlanet,
  onSelectPlanet,
}: SearchUniverse3DProps) {
  return (
    <div className="w-full h-full min-h-[460px] sm:min-h-[540px] relative">
      <Canvas
        camera={{ position: [0, 4.8, 11], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <UniverseScene activePlanet={activePlanet} onSelectPlanet={onSelectPlanet} />
      </Canvas>
    </div>
  );
}
