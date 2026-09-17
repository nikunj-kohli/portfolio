"use client";

import { useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { carFrame } from "@/utils/carState";
import {
  WORLD_SIZE,
  CAR_SPAWN,
  PLANET_TRIGGER,
  PLANET_INTERACTION_RADIUS,
} from "@/utils/constants";
import { SpawnPlaza } from "./zones/SpawnPlaza";
import { ProjectCity } from "./zones/ProjectCity";
import { SocialPlaza } from "./zones/SocialPlaza";
import { AboutPeak } from "./zones/AboutPeak";
import { ContactBeach } from "./zones/ContactBeach";
import { DataCrystal } from "./DataCrystal";
import { Car } from "./Car";

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk is solid so the car and player can't clip through it */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh castShadow position={[0, 1, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 2, 6]} />
          <meshStandardMaterial color="#8B6914" />
        </mesh>
      </RigidBody>
      <mesh castShadow position={[0, 2.5, 0]}>
        <coneGeometry args={[1, 2, 6]} />
        <meshStandardMaterial color="#2d6a4f" />
      </mesh>
    </group>
  );
}

/**
 * Deliberately subtle: a faint sigil on the ground where the sky planet's
 * "landing zone" is. No pole, no bright marker — the easter egg should feel
 * hidden. The sky planet itself pulses when you get close (see CosmicSky).
 */
function PlanetSigil() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[PLANET_TRIGGER[0], 0.06, PLANET_TRIGGER[1]]}
    >
      <ringGeometry args={[PLANET_INTERACTION_RADIUS - 0.4, PLANET_INTERACTION_RADIUS - 0.1, 48]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.12} depthWrite={false} />
    </mesh>
  );
}

export function World() {
  // Keep the parked car position in sync once on mount (CAR_SPAWN -> carFrame).
  useEffect(() => {
    carFrame.x = CAR_SPAWN[0];
    carFrame.z = CAR_SPAWN[2];
  }, []);

  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid" friction={1}>
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[WORLD_SIZE, 1, WORLD_SIZE]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </RigidBody>

      <Tree position={[-10, 0, 10]} />
      <Tree position={[10, 0, 12]} />
      <Tree position={[-12, 0, -8]} />
      <Tree position={[8, 0, -10]} />
      <Tree position={[-6, 0, 18]} />
      <Tree position={[6, 0, 18]} />

      {/* Floating data crystals scattered around */}
      <DataCrystal position={[15, 3, 15]} color="#ff6600" size={0.8} />
      <DataCrystal position={[-15, 4, 12]} color="#ff00ff" size={1} />
      <DataCrystal position={[12, 2.5, -15]} color="#52b788" size={0.7} />
      <DataCrystal position={[-12, 3.5, -18]} color="#e9c46a" size={0.9} />
      <DataCrystal position={[20, 4, 8]} color="#00f5ff" size={0.6} />
      <DataCrystal position={[-20, 3, -8]} color="#9333ea" size={0.8} />

      <PlanetSigil />

      <SpawnPlaza />
      <ProjectCity />
      <SocialPlaza />
      <AboutPeak />
      <ContactBeach />
      <Car />
    </group>
  );
}
