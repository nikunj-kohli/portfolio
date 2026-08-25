"use client";

import { Float } from "@react-three/drei";
import { ObservatoryHut } from "../ObservatoryHut";
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
        <ZoneLabel position={[0, 5, -3]} fontSize={1.2} color="#00f5ff">
          NIKUNJ KOHLI
        </ZoneLabel>
      </Float>

      <ZoneLabel position={[0, 3.8, -3]} fontSize={0.4} color="#ffffff">
        The Developer&apos;s Observatory
      </ZoneLabel>

      <ObservatoryHut />

      <ZoneLabel position={[8, 1, 0]} fontSize={0.35} color="#ff6600">
        → Projects
      </ZoneLabel>
      <ZoneLabel position={[-8, 1, 0]} fontSize={0.35} color="#ff00ff">
        ← Social
      </ZoneLabel>
      <ZoneLabel position={[0, 1, -8]} fontSize={0.35} color="#52b788">
        ↑ About
      </ZoneLabel>
      <ZoneLabel position={[0, 1, 8]} fontSize={0.35} color="#e9c46a">
        ↓ Contact
      </ZoneLabel>
    </group>
  );
}
