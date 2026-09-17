"use client";

import { Billboard, Text } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";

interface MessageBottleProps {
  id: string;
  name: string;
  position: [number, number, number];
}

export function MessageBottle({ id, name, position }: MessageBottleProps) {
  const nearbyId = useGameStore((s) => s.nearbyInteractable);
  const isNearby = nearbyId === id;

  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.25, 0.35, 0.8, 8]} />
        <meshStandardMaterial
          color="#74c69d"
          transparent
          opacity={0.85}
          emissive="#52b788"
          emissiveIntensity={isNearby ? 0.35 : 0.08}
        />
      </mesh>

      <mesh castShadow position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 8]} />
        <meshStandardMaterial color="#8B6914" roughness={0.8} />
      </mesh>

      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.4, 0.05]} />
        <meshStandardMaterial color="#fff8e7" />
      </mesh>

      {isNearby && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.8, 1.2, 32]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
        </mesh>
      )}

      <Billboard position={[0, 1.3, 0]} follow>
        <Text
          fontSize={0.3}
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
