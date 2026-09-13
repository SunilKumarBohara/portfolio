"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

interface NodeData {
  position: [number, number, number];
  color: string;
  size: number;
  label: string;
}

export default function SeoEcosystem3D() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Define orbital SEO nodes with Blue + Red identity
  const nodes: NodeData[] = useMemo(
    () => [
      { position: [2.6, 1.2, 0.5], color: "#38bdf8", size: 0.22, label: "Indexing" },
      { position: [-2.4, 1.5, -0.6], color: "#3b82f6", size: 0.25, label: "Core Web Vitals" },
      { position: [2.2, -1.4, 0.8], color: "#ef4444", size: 0.2, label: "Search Intent" },
      { position: [-2.7, -1.1, 0.4], color: "#60a5fa", size: 0.22, label: "SERP Dominance" },
      { position: [0.3, 2.5, -0.8], color: "#38bdf8", size: 0.18, label: "Schema Graph" },
      { position: [-0.4, -2.4, 0.7], color: "#ef4444", size: 0.22, label: "Topical Authority" },
      { position: [1.8, 0.2, -2.0], color: "#2563eb", size: 0.19, label: "Crawl Budget" },
      { position: [-1.9, 0.3, 2.0], color: "#f43f5e", size: 0.21, label: "Organic Growth" },
    ],
    []
  );

  // Generate background search data particles
  const particleCount = 180;
  const { particlePositions, particleColors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color("#3b82f6");
    const colorB = new THREE.Color("#ef4444");

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return { particlePositions: positions, particleColors: colors };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    if (groupRef.current) {
      // Smooth mouse follow parallax & subtle rotation
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        time * 0.12 + mouseX,
        2,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -mouseY * 0.5 + Math.sin(time * 0.2) * 0.05,
        2,
        delta
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.35;
      coreRef.current.rotation.y += delta * 0.5;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * 0.6;
      innerCoreRef.current.rotation.z += delta * 0.4;
      const scale = 1 + Math.sin(time * 2.5) * 0.08;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
      outerRingRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Search Engine Core */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Outer Wireframe Octahedron */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            wireframe
            emissive="#2563eb"
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner Glowing Algorithmic Core */}
        <mesh ref={innerCoreRef}>
          <icosahedronGeometry args={[0.7, 2]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#1d4ed8"
            emissiveIntensity={1.2}
            roughness={0.1}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Orbiting Quantum Rings */}
      <group ref={outerRingRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.2, 0.014, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.8, 0.014, 16, 100]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* Connected SEO Keyword Nodes & Energy Beams */}
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          <Float speed={3 + i * 0.4} rotationIntensity={0.4} floatIntensity={0.6}>
            <Sphere args={[node.size, 24, 24]}>
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.8}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>

            {/* Subtle glow halo */}
            <Sphere args={[node.size * 1.5, 16, 16]}>
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={0.15}
                wireframe
              />
            </Sphere>
          </Float>

          {/* Connection line back to center */}
          <Line
            points={[
              [0, 0, 0],
              [-node.position[0] * 0.7, -node.position[1] * 0.7, -node.position[2] * 0.7],
            ]}
            color={node.color}
            lineWidth={1}
            transparent
            opacity={0.28}
          />
        </group>
      ))}

      {/* Organic Traffic Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
