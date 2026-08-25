"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";

interface FlagProps {
  id: string;
  label: string;
  position: [number, number, number];
  color?: string;
}

export function Flag({ id, label, position, color = "#00f5ff" }: FlagProps) {
  const groupRef = useRef<THREE.Group>(null);
  const clothRef = useRef<THREE.Mesh>(null);
  const nearbyId = useGameStore((s) => s.nearbyInteractable);
  const captureProgress = useGameStore((s) => s.captureProgress);

  const isNearby = nearbyId === id;

  useFrame((state) => {
    if (clothRef.current) {
      clothRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 3) * 0.15 + Math.PI / 2;
    }
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + (isNearby ? Math.sin(state.clock.elapsedTime * 4) * 0.15 : 0);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Pole */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 3, 8]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Flag cloth */}
      <mesh ref={clothRef} castShadow position={[0.6, 2.5, 0]}>
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isNearby ? 0.8 : 0.3}
        />
      </mesh>

      {/* Capture progress ring */}
      {isNearby && captureProgress > 0 && (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          {/* Background ring */}
          <mesh>
            <ringGeometry args={[1.2, 1.8, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
          {/* Progress arc */}
          <mesh rotation={[0, 0, -Math.PI / 2 + (captureProgress * Math.PI * 2)]}>
            <ringGeometry args={[1.2, 1.8, 32, 1, 0, captureProgress * Math.PI * 2]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        </group>
      )}

      {/* Glow ring when nearby but not capturing */}
      {isNearby && captureProgress === 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[1.2, 1.8, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      )}

      <Billboard position={[0, 3.5, 0]} follow>
        <Text
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}
