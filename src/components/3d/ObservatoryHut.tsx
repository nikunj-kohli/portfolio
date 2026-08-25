"use client";

import { RigidBody } from "@react-three/rapier";
import { ZoneLabel } from "./ZoneLabel";

export function ObservatoryHut() {
  const postH = 3.2;

  return (
    <group position={[0, 0, -1.5]}>
      {(
        [
          [-2.4, -1.2],
          [2.4, -1.2],
          [-2.4, 1.2],
          [2.4, 1.2],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <RigidBody key={i} type="fixed" colliders="cuboid">
          <mesh castShadow position={[x, postH / 2, z]}>
            <boxGeometry args={[0.28, postH, 0.28]} />
            <meshStandardMaterial color="#5c4033" roughness={0.8} />
          </mesh>
        </RigidBody>
      ))}

      <RigidBody type="fixed" colliders="cuboid" position={[0, postH - 0.15, -1.2]}>
        <mesh castShadow>
          <boxGeometry args={[5, 0.22, 0.22]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[0, postH - 0.15, 1.2]}>
        <mesh castShadow>
          <boxGeometry args={[5, 0.22, 0.22]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[-2.4, postH - 0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.22, 2.6]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[2.4, postH - 0.15, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.22, 2.6]} />
          <meshStandardMaterial color="#5c4033" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="hull" position={[0, postH + 0.55, 0]}>
        <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[3.4, 1.3, 4]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.85} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[0, 0.55, -1.2]}>
        <mesh castShadow>
          <boxGeometry args={[4.6, 1.1, 0.18]} />
          <meshStandardMaterial color="#8B6914" roughness={0.85} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[0, 0.55, 1.2]}>
        <mesh castShadow>
          <boxGeometry args={[4.6, 1.1, 0.18]} />
          <meshStandardMaterial color="#8B6914" roughness={0.85} />
        </mesh>
      </RigidBody>

      <ZoneLabel position={[0, postH + 1.6, 0]} fontSize={0.22} color="#00f5ff">
        Observatory Hut
      </ZoneLabel>
    </group>
  );
}
