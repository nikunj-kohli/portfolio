"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Billboard, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { about } from "@/data/about";
import { useGameStore } from "@/store/gameStore";
import { Flag } from "../Flag";
import { ZoneLabel } from "../ZoneLabel";

const ROCK = "#6b705c";

function Cloud({
  position,
  label,
}: {
  position: [number, number, number];
  label: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x =
        position[0] + Math.sin(state.clock.elapsedTime * 0.3 + position[2]) * 0.4;
    }
  });

  return (
    <group ref={ref} position={position}>
      <Float speed={1.2} floatIntensity={0.2}>
        <mesh>
          <sphereGeometry args={[0.7, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0.5, 0.08, 0]}>
          <sphereGeometry args={[0.45, 8, 8]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.55} />
        </mesh>
        <Billboard position={[0, 1.1, 0]} follow>
          <Text fontSize={0.2} color="#16213e" anchorX="center" anchorY="middle">
            {label}
          </Text>
        </Billboard>
      </Float>
    </group>
  );
}

/** Solid walkable mountain surface - climb by walking up */
function MountainClimbingSurface() {
  return (
    <group>
      {/* Main mountain body with walkable surface - gentler slope */}
      <RigidBody
        type="fixed"
        colliders="hull"
        friction={8}
        position={[0, 3, 0]}
      >
        <mesh castShadow receiveShadow>
          <coneGeometry args={[12, 6, 8]} />
          <meshStandardMaterial color={ROCK} roughness={0.95} />
        </mesh>
      </RigidBody>
    </group>
  );
}

/**
 * Interactable holographic tablet standing on the mountain slope.
 * Opens the About panel (which previously had no trigger in the world).
 */
function AboutTablet() {
  const tabletRef = useRef<THREE.Group>(null);
  const nearbyId = useGameStore((s) => s.nearbyInteractable);
  const isNearby = nearbyId === "about-tablet";

  useFrame((state) => {
    if (tabletRef.current) {
      tabletRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group position={[3.5, 1.6, -4]} rotation={[0, -0.6, 0]}>
      <group ref={tabletRef}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 1.9, 0.08]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.7}
            roughness={0.3}
            emissive="#22d3ee"
            emissiveIntensity={isNearby ? 0.5 : 0.15}
          />
        </mesh>
        <mesh position={[0, 0.2, 0.05]}>
          <boxGeometry args={[1.1, 0.5, 0.02]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[-0.2, -0.2, 0.05]}>
          <boxGeometry args={[0.7, 0.1, 0.02]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-0.2, -0.42, 0.05]}>
          <boxGeometry args={[0.5, 0.1, 0.02]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {isNearby && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <ringGeometry args={[0.9, 1.3, 32]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
        </mesh>
      )}

      <Billboard position={[0, 1.35, 0]} follow>
        <Text fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          About Me
        </Text>
      </Billboard>
    </group>
  );
}


export function AboutPeak() {
  const { x, z } = about.position;

  return (
    <group position={[x, 0, z]}>
      <MountainClimbingSurface />
      <AboutTablet />

      <RigidBody type="fixed" colliders="cuboid" friction={2.5} position={[0, 5.5, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[2.2, 2.6, 0.35, 8]} />
          <meshStandardMaterial color="#52b788" />
        </mesh>
      </RigidBody>

      <ZoneLabel position={[0, 7, 0]} fontSize={0.6} color="#52b788">
        ABOUT PEAK
      </ZoneLabel>

      <Flag
        id="resume"
        label="Capture Flag"
        position={[0, 5.8, 0]}
        color="#52b788"
      />

      {about.skills.slice(0, 6).map((skill, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 6 + (i % 2) * 2;
        return (
          <Cloud
            key={skill.name}
            position={[
              Math.cos(angle) * radius,
              4 + (i % 3) * 1.5,
              Math.sin(angle) * radius,
            ]}
            label={skill.name}
          />
        );
      })}
    </group>
  );
}
