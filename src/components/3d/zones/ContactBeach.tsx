"use client";

import { ZoneLabel } from "../ZoneLabel";
import { contacts } from "@/data/contact";
import { MessageBottle } from "../MessageBottle";
import { RigidBody } from "@react-three/rapier";

function PalmTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 2, 0]}>
        <cylinderGeometry args={[0.18, 0.24, 4, 6]} />
        <meshStandardMaterial color="#8B6914" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 4.2, 0]}>
        <coneGeometry args={[1.4, 2.2, 6]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.85} />
      </mesh>
    </group>
  );
}

export function ContactBeach() {
  return (
    <group>
      {/* Path from spawn - ends before beach starts */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, -0.02, 10]}>
        <mesh receiveShadow>
          <boxGeometry args={[4, 0.08, 20]} />
          <meshStandardMaterial color="#d4a574" roughness={0.95} />
        </mesh>
      </RigidBody>

      {/* Main beach sand - starts after path ends */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, -0.02, 28]}>
        <mesh receiveShadow>
          <boxGeometry args={[18, 0.08, 16]} />
          <meshStandardMaterial color="#e9c46a" roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Water edge (raised above the ground slab so it actually shows) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 39]}>
        <planeGeometry args={[60, 8]} />
        <meshStandardMaterial
          color="#0ea5c9"
          roughness={0.25}
          metalness={0.4}
          emissive="#083344"
          emissiveIntensity={0.4}
        />
      </mesh>

      <ZoneLabel position={[0, 3, 22]} fontSize={0.55} color="#00f5ff">
        CONTACT BEACH
      </ZoneLabel>

      {contacts.map((contact) => (
        <MessageBottle
          key={contact.id}
          id={`contact-${contact.id}`}
          name={contact.name}
          position={[contact.position.x, 0, contact.position.z]}
        />
      ))}

      <PalmTree position={[-8, 0, 24]} />
      <PalmTree position={[8, 0, 24]} />
    </group>
  );
}
