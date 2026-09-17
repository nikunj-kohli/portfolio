"use client";

import { Float } from "@react-three/drei";
import { ObservatoryHut } from "../ObservatoryHut";
import { TechGlobe } from "../TechGlobe";
import { ZoneLabel } from "../ZoneLabel";
import { GroundDecal } from "../GroundDecal";

export function SpawnPlaza() {
  return (
    <group>
      <GroundDecal
        position={[0, 0.1, 0]}
        size={[10, 10]}
        color="#00f5ff"
        opacity={0.22}
      />

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <ZoneLabel position={[0, 7, -3]} fontSize={1.2} color="#00f5ff">
          NIKUNJ KOHLI
        </ZoneLabel>
      </Float>

      <TechGlobe />
      <ObservatoryHut />
    </group>
  );
}
