"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";

interface SocialIconProps {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
}

export function SocialIcon({ id, name, color, position }: SocialIconProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nearbyId = useGameStore((s) => s.nearbyInteractable);
  const isNearby = nearbyId === id;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Floating platform */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.3, 6]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Icon block */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isNearby ? 0.7 : 0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Neon ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <ringGeometry args={[1.5, 1.8, 32]} />
        <meshBasicMaterial
          color={isNearby ? "#ff00ff" : "#00f5ff"}
          transparent
          opacity={isNearby ? 0.6 : 0.25}
        />
      </mesh>

      <Billboard position={[0, 1.5, 0]} follow>
        <Text
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}
