"use client";

import { ZoneLabel } from "../ZoneLabel";
import { RigidBody } from "@react-three/rapier";
import { projects } from "@/data/projects";
import { Building } from "../Building";
import { GroundDecal } from "../GroundDecal";

export function ProjectCity() {
  return (
    <group>
      <GroundDecal
        position={[22, 0.1, 0]}
        size={[20, 16]}
        color="#1a1a3e"
        opacity={0.75}
      />

      <ZoneLabel position={[22, 4, -9]} fontSize={0.6} color="#ff6600">
        PROJECT CITY
      </ZoneLabel>

      <GroundDecal position={[22, 0.11, -1]} size={[18, 3]} color="#2a2a2a" />

      <GroundDecal position={[11, 0.11, 0]} size={[4, 14]} color="#333333" />

      {[-5, 3].map((z) => (
        <GroundDecal
          key={z}
          position={[22, 0.12, z]}
          size={[16, 0.15]}
          color="#ffea00"
          opacity={0.35}
        />
      ))}

      {projects.map((project, i) => (
        <Building key={project.id} project={project} index={i} />
      ))}
    </group>
  );
}
