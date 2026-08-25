"use client";

import { ZoneLabel } from "../ZoneLabel";
import { socials } from "@/data/socials";
import { SocialIcon } from "../SocialIcon";
import { GroundDecal } from "../GroundDecal";

export function SocialPlaza() {
  return (
    <group>
      <GroundDecal
        position={[-17, 0.1, -4]}
        size={[16, 16]}
        color="#1a0a2e"
        opacity={0.9}
      />

      {Array.from({ length: 5 }).map((_, i) => (
        <GroundDecal
          key={`h-${i}`}
          position={[-17, 0.11, -12 + i * 4]}
          size={[16, 0.05]}
          color="#00f5ff"
          opacity={0.25}
        />
      ))}

      <ZoneLabel position={[-17, 3, -12]} fontSize={0.6} color="#ff00ff">
        SOCIAL PLAZA
      </ZoneLabel>

      {socials.map((social) => (
        <SocialIcon
          key={social.id}
          id={`social-${social.id}`}
          name={social.name}
          color={social.color}
          position={[social.position.x, 1.5, social.position.z]}
        />
      ))}
    </group>
  );
}
