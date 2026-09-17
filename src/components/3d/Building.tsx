"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { Project } from "@/utils/models";
import { useGameStore } from "@/store/gameStore";

interface BuildingProps {
  project: Project;
  index: number;
}

export function Building({ project, index }: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nearbyId = useGameStore((s) => s.nearbyInteractable);
  const isNearby = nearbyId === `project-${project.id}`;

  const height = 3.5 + (index % 4) * 0.8;
  const { x, z } = project.position;

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetY = isNearby
      ? Math.sin(state.clock.elapsedTime * 2) * 0.05
      : 0;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1
    );
  });

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      <RigidBody type="fixed" colliders="cuboid">
        <group>
          <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
            <boxGeometry args={[2.2, height, 2.2]} />
            <meshStandardMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={isNearby ? 0.5 : 0.12}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>

          <mesh castShadow position={[0, height + 0.25, 0]}>
            <boxGeometry args={[2.5, 0.35, 2.5]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.5} />
          </mesh>

          {Array.from({ length: Math.floor(height) }).map((_, row) =>
            [-0.55, 0.55].map((wx) => (
              <mesh key={`${row}-${wx}`} position={[wx, 1 + row, 1.11]}>
                <planeGeometry args={[0.45, 0.45]} />
                <meshStandardMaterial
                  color={project.color}
                  emissive={project.color}
                  emissiveIntensity={0.8 + (row % 2) * 0.4}
                  transparent
                  opacity={0.7 + (row % 2) * 0.2}
                />
              </mesh>
            ))
          )}
        </group>
      </RigidBody>

      <Billboard position={[0, height + 1, 0]} follow>
        <Text
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {project.name}
        </Text>
      </Billboard>

      {isNearby && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[2, 3.2, 32]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.35} />
        </mesh>
      )}
    </group>
  );
}
