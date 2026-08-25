"use client";

import { RigidBody } from "@react-three/rapier";
import { WORLD_SIZE } from "@/utils/constants";
import { SpawnPlaza } from "./zones/SpawnPlaza";
import { ProjectCity } from "./zones/ProjectCity";
import { SocialPlaza } from "./zones/SocialPlaza";
import { AboutPeak } from "./zones/AboutPeak";
import { ContactBeach } from "./zones/ContactBeach";

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 2, 6]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh castShadow position={[0, 2.5, 0]}>
        <coneGeometry args={[1, 2, 6]} />
        <meshStandardMaterial color="#2d6a4f" />
      </mesh>
    </group>
  );
}

export function World() {
  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid" friction={1}>
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[WORLD_SIZE, 1, WORLD_SIZE]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid" position={[0, 2, -WORLD_SIZE / 2]}>
        <mesh visible={false}>
          <boxGeometry args={[WORLD_SIZE, 4, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[0, 2, WORLD_SIZE / 2]}>
        <mesh visible={false}>
          <boxGeometry args={[WORLD_SIZE, 4, 1]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[-WORLD_SIZE / 2, 2, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[1, 4, WORLD_SIZE]} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" position={[WORLD_SIZE / 2, 2, 0]}>
        <mesh visible={false}>
          <boxGeometry args={[1, 4, WORLD_SIZE]} />
        </mesh>
      </RigidBody>

      <Tree position={[-10, 0, 10]} />
      <Tree position={[10, 0, 12]} />
      <Tree position={[-12, 0, -8]} />
      <Tree position={[8, 0, -10]} />
      <Tree position={[-6, 0, 18]} />
      <Tree position={[6, 0, 18]} />

      <SpawnPlaza />
      <ProjectCity />
      <SocialPlaza />
      <AboutPeak />
      <ContactBeach />
    </group>
  );
}
