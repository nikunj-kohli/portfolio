"use client";

import { ZoneLabel } from "../ZoneLabel";
import { projects } from "@/data/projects";
import { Building } from "../Building";
import { GroundDecal } from "../GroundDecal";

export function ProjectCity() {
  return (
    <group>
      <GroundDecal
        position={[20, 0.1, -1]}
        size={[20, 14]}
        color="#1a1a3e"
        opacity={0.75}
      />

      <ZoneLabel position={[20, 4, -8]} fontSize={0.6} color="#ff6600">
        PROJECT CITY
      </ZoneLabel>

      {/* Horizontal pathways for 2x2 grid */}
      <GroundDecal position={[20, 0.11, -5]} size={[18, 2]} color="#2a2a2a" />
      <GroundDecal position={[20, 0.11, 3]} size={[18, 2]} color="#2a2a2a" />

      {/* Vertical pathway connecting the two rows */}
      <GroundDecal position={[20, 0.11, -1]} size={[2, 10]} color="#333333" />

      {/* Connecting pathways between buildings */}
      <GroundDecal position={[20, 0.12, -1]} size={[16, 0.15]} color="#ffea00" opacity={0.35} />

      {projects.map((project, i) => (
        <Building key={project.id} project={project} index={i} />
      ))}
    </group>
  );
}
