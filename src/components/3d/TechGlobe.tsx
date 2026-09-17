"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TechGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group position={[0, 10, 0]}>
      {/* Main globe */}
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial
            color="#1a1a3e"
            emissive="#00f5ff"
            emissiveIntensity={0.15}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.95, 32, 32]} />
          <meshStandardMaterial
            color="#0a0a1e"
            transparent
            opacity={0.8}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Orbiting rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[4.5, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#52b788"
            emissive="#52b788"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Floating connection points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 3.2,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * 3.2,
            ]}
          >
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}
