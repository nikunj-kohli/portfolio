"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataCrystalProps {
  position: [number, number, number];
  color?: string;
  size?: number;
}

export function DataCrystal({
  position,
  color = "#00f5ff",
  size = 1,
}: DataCrystalProps) {
  const crystalRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      crystalRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.3;
    }
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        particle.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      }
    });
  });

  return (
    <group ref={crystalRef} position={position}>
      {/* Main crystal */}
      <mesh>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Inner glow */}
      <mesh scale={0.6}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Floating particles */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <group
            key={i}
            ref={(el) => {
              if (el) particlesRef.current[i] = el;
            }}
            position={[
              Math.cos(angle) * (size + 0.5),
              0,
              Math.sin(angle) * (size + 0.5),
            ]}
          >
            <mesh>
              <sphereGeometry args={[0.08, 4, 4]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
