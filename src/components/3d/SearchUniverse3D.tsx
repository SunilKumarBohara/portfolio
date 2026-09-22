"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type SearchPlanetKey = "seo" | "geo" | "aeo";

interface SearchUniverse3DProps {
  activePlanet: SearchPlanetKey;
  onSelectPlanet: (planet: SearchPlanetKey) => void;
}

// Central Glowing Search Core
function CentralSearchCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.x = t * 0.2;
    }
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z = -t * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.25;
      outerRingRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group>
      {/* Primary Glowing Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#00e599"
          emissive="#00e599"
          emissiveIntensity={1.8}
          roughness={0.15}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Pulsing Wireframe Corona */}
      <mesh scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[1.3, 18, 18]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Central Core Label */}
      <Html position={[0, 0, 0]} center distanceFactor={14} pointerEvents="none">
        <div className="px-2.5 py-1 rounded-full bg-black/90 border border-brand-green/60 text-[11px] font-mono text-brand-green font-bold shadow-glow-sm select-none tracking-wider whitespace-nowrap">
          SEARCH CORE
        </div>
      </Html>

      {/* Equatorial Energy Rings */}
      <mesh ref={glowRingRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[1.8, 1.95, 64]} />
        <meshBasicMaterial color="#00e599" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0.4, 0]}>
        <ringGeometry args={[2.2, 2.3, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} side={THREE.DoubleSide} />
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
  color,
  label,
  sublabel,
  size = 0.55,
  activePlanet,
  onSelectPlanet,
}: {
  planetKey: SearchPlanetKey;
  radiusX: number;
  radiusZ: number;
  speed: number;
  color: string;
  label: string;
  sublabel: string;
  size?: number;
  activePlanet: SearchPlanetKey;
  onSelectPlanet: (planet: SearchPlanetKey) => void;
}) {
  const planetRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isSelected = activePlanet === planetKey;

  // Track planet orbital position
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (planetRef.current) {
      const x = Math.cos(t) * radiusX;
      const z = Math.sin(t) * radiusZ;
      planetRef.current.position.set(x, Math.sin(t * 2) * 0.4, z);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group>
      {/* Orbit Path Visual Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radiusX - 0.03, radiusX + 0.03, 96]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isSelected ? 0.45 : 0.15}
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
          scale={hovered || isSelected ? 1.3 : 1.0}
        >
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered || isSelected ? 2.2 : 1.2}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Outer Orbital Atmosphere Ring */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[size * 1.3, size * 1.5, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

        {/* Planet Floating Label */}
        <Html position={[0, size + 0.4, 0]} center distanceFactor={14}>
          <button
            onClick={() => onSelectPlanet(planetKey)}
            className={`px-2.5 py-1 rounded-xl text-left backdrop-blur-md transition-all duration-300 select-none whitespace-nowrap cursor-pointer ${
              isSelected
                ? "bg-black/90 border-2 border-white shadow-glow-md scale-110"
                : "bg-black/75 border border-white/20 hover:border-white/60 hover:scale-105"
            }`}
          >
            <div className="text-[11px] font-bold font-display leading-tight" style={{ color }}>
              {label}
            </div>
            <div className="text-[9px] font-mono text-gray-300">{sublabel}</div>
          </button>
        </Html>
      </group>
    </group>
  );
}

// Background Starfield Particles
function CosmosParticles({ count = 350 }) {
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
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
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
      <pointsMaterial size={0.06} color="#00f0ff" transparent opacity={0.65} />
    </points>
  );
}

// Scene Root with Camera & Lights
function UniverseScene({ activePlanet, onSelectPlanet }: SearchUniverse3DProps) {
  const { camera } = useThree();

  useFrame(({ mouse }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2.5, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 4 + mouse.y * 1.5, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={4.5} color="#00e599" distance={15} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#10b981" />

      <CosmosParticles count={300} />
      <CentralSearchCore />

      {/* Orbit 1: SEO (Search Engine Optimization) */}
      <OrbitingPlanet
        planetKey="seo"
        radiusX={4.2}
        radiusZ={3.8}
        speed={0.45}
        color="#00e599"
        label="SEO"
        sublabel="Search Engine Opt."
        activePlanet={activePlanet}
        onSelectPlanet={onSelectPlanet}
      />

      {/* Orbit 2: GEO (Generative Engine Optimization) */}
      <OrbitingPlanet
        planetKey="geo"
        radiusX={6.4}
        radiusZ={5.8}
        speed={0.32}
        color="#00f0ff"
        label="GEO"
        sublabel="Generative AI Engine"
        activePlanet={activePlanet}
        onSelectPlanet={onSelectPlanet}
      />

      {/* Orbit 3: AEO (Answer Engine Optimization) */}
      <OrbitingPlanet
        planetKey="aeo"
        radiusX={8.6}
        radiusZ={7.8}
        speed={0.22}
        color="#38bdf8"
        label="AEO"
        sublabel="Answer Engine Opt."
        activePlanet={activePlanet}
        onSelectPlanet={onSelectPlanet}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3.2}
        rotateSpeed={0.4}
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
        camera={{ position: [0, 4.5, 11], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <UniverseScene activePlanet={activePlanet} onSelectPlanet={onSelectPlanet} />
      </Canvas>
    </div>
  );
}
