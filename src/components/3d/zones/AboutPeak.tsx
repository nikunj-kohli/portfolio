"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Billboard, Text } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { about } from "@/data/about";
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

/** Continuous sloped climbing surface around the mountain */
function MountainClimbingSurface() {
  return (
    <group>
      {/* Main spiral climbing ramp wrapping around the mountain */}
      <RigidBody
        type="fixed"
        colliders="trimesh"
        friction={3}
        position={[0, 3, 0]}
      >
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[8.5, 4, 6.5, 8, 1, true]} />
          <meshStandardMaterial color={ROCK} roughness={0.95} />
        </mesh>
      </RigidBody>

      {/* Additional climbing planes on each side for easier access */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        friction={3}
        position={[0, 2, 6]}
        rotation={[-0.4, 0, 0]}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5, 0.5, 3]} />
          <meshStandardMaterial color={ROCK} roughness={0.95} />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        friction={3}
        position={[0, 2, -6]}
        rotation={[0.4, 0, 0]}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5, 0.5, 3]} />
          <meshStandardMaterial color={ROCK} roughness={0.95} />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        friction={3}
        position={[6, 2, 0]}
        rotation={[0, 0, 0.4]}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.5, 5]} />
          <meshStandardMaterial color={ROCK} roughness={0.95} />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        friction={3}
        position={[-6, 2, 0]}
        rotation={[0, 0, -0.4]}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3, 0.5, 5]} />
          <meshStandardMaterial color={ROCK} roughness={0.95} />
        </mesh>
      </RigidBody>
    </group>
  );
}


export function AboutPeak() {
  const { x, z } = about.position;

  return (
    <group position={[x, 0, z]}>
      <mesh castShadow receiveShadow position={[0, 3, 0]}>
        <coneGeometry args={[8, 6, 8]} />
        <meshStandardMaterial color={ROCK} roughness={0.9} />
      </mesh>

      <mesh castShadow position={[0, 5.5, 0]}>
        <coneGeometry args={[3, 2, 8]} />
        <meshStandardMaterial color="#f8f9fa" roughness={0.8} />
      </mesh>

      <MountainClimbingSurface />

      <RigidBody type="fixed" colliders="cuboid" friction={2.5} position={[0, 6.35, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[2.2, 2.6, 0.35, 8]} />
          <meshStandardMaterial color="#52b788" />
        </mesh>
      </RigidBody>

      <ZoneLabel position={[0, 8.2, 0]} fontSize={0.6} color="#52b788">
        ABOUT PEAK
      </ZoneLabel>

      <Flag
        id="resume"
        label="Capture Flag"
        position={[0, 6.8, 0]}
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
