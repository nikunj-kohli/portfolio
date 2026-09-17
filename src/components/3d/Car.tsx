"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { carFrame } from "@/utils/carState";
import { CAR_SPAWN } from "@/utils/constants";

const BODY_COLOR = "#e02424";

/**
 * Parked + drivable sports car.
 *
 * Visuals are driven entirely from `carFrame` (updated by Character.tsx while
 * driving). No physics collider: the player's own rigid body handles collisions
 * while driving, and a walk-through parked car is preferable to a static
 * collider that can't follow the car around.
 */
export function Car() {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headlightL = useRef<THREE.SpotLight>(null);
  const headlightR = useRef<THREE.SpotLight>(null);

  const carUnlocked = useGameStore((s) => s.carUnlocked);
  const inCarMode = useGameStore((s) => s.inCarMode);
  const nearbyId = useGameStore((s) => s.nearbyInteractable);

  // Spotlight targets must live in the scene graph to update each frame.
  const targetL = useMemo(() => new THREE.Object3D(), []);
  const targetR = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;

    if (inCarMode) {
      g.position.set(carFrame.x, 0, carFrame.z);
      g.rotation.y = carFrame.rotation;

      // Body roll into turns (around the forward axis = X) + pitch under
      // acceleration (around the lateral axis = Z).
      if (bodyRef.current) {
        const roll = THREE.MathUtils.clamp(
          carFrame.steerAngle * carFrame.speed * 0.012,
          -0.09,
          0.09
        );
        const pitch = THREE.MathUtils.clamp(carFrame.accel * 0.004, -0.05, 0.04);
        bodyRef.current.rotation.x = THREE.MathUtils.lerp(
          bodyRef.current.rotation.x,
          roll,
          0.12
        );
        bodyRef.current.rotation.z = THREE.MathUtils.lerp(
          bodyRef.current.rotation.z,
          pitch,
          0.12
        );
      }

      if (headlightL.current) headlightL.current.intensity = 20;
      if (headlightR.current) headlightR.current.intensity = 20;
    } else {
      // Parked: gentle idle bob.
      const t = state.clock.elapsedTime;
      g.position.set(carFrame.x, Math.sin(t * 1.2) * 0.04, carFrame.z);
      g.rotation.y = carFrame.rotation;

      if (headlightL.current) headlightL.current.intensity = 0;
      if (headlightR.current) headlightR.current.intensity = 0;
      if (bodyRef.current) {
        bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, 0, 0.1);
        bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, 0, 0.1);
      }
    }
  });

  if (!carUnlocked) return null;

  return (
    <group ref={groupRef} position={CAR_SPAWN}>
      {/* Soft glow ring so players notice the parked car */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.1, 2.5, 48]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.25} />
      </mesh>

      {!inCarMode && nearbyId === "car" && (
        <Billboard position={[0, 2.2, 0]} follow>
          <Text fontSize={0.28} color="#ffd700" anchorX="center" anchorY="middle">
            Press F to drive
          </Text>
        </Billboard>
      )}

      <group ref={bodyRef}>
        {/* ------------------------------------------- Low-poly body ------- */}
        {/* Lower chassis */}
        <mesh castShadow position={[0, 0.32, 0]}>
          <boxGeometry args={[3.6, 0.42, 1.5]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.75} roughness={0.22} />
        </mesh>

        {/* Sloped nose (front +X) */}
        <mesh castShadow position={[1.45, 0.38, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.8, 0.3, 1.3]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.75} roughness={0.22} />
        </mesh>

        {/* Cabin */}
        <mesh castShadow position={[-0.15, 0.78, 0]}>
          <boxGeometry args={[1.55, 0.5, 1.34]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.75} roughness={0.22} />
        </mesh>
        {/* Cabin top (greenhouse) */}
        <mesh castShadow position={[-0.15, 1.02, 0]}>
          <boxGeometry args={[1.35, 0.18, 1.2]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.75} roughness={0.22} />
        </mesh>

        {/* Rear deck */}
        <mesh castShadow position={[-1.35, 0.55, 0]}>
          <boxGeometry args={[0.75, 0.34, 1.42]} />
          <meshStandardMaterial color={BODY_COLOR} metalness={0.75} roughness={0.22} />
        </mesh>

        {/* Rear wing */}
        <mesh castShadow position={[-1.72, 0.86, 0]}>
          <boxGeometry args={[0.34, 0.06, 1.5]} />
          <meshStandardMaterial color="#111118" metalness={0.6} roughness={0.4} />
        </mesh>
        {[-0.55, 0.55].map((z) => (
          <mesh key={z} castShadow position={[-1.68, 0.7, z]}>
            <boxGeometry args={[0.08, 0.3, 0.08]} />
            <meshStandardMaterial color="#111118" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}

        {/* ------------------------------------------- Glass --------------- */}
        {/* Windshield (angled back) */}
        <mesh position={[0.78, 0.78, 0]} rotation={[0, 0, 0.42]}>
          <boxGeometry args={[0.06, 0.62, 1.26]} />
          <meshStandardMaterial
            color="#0a0f1e"
            metalness={0.9}
            roughness={0.06}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Rear window */}
        <mesh position={[-0.95, 0.78, 0]} rotation={[0, 0, -0.38]}>
          <boxGeometry args={[0.06, 0.5, 1.2]} />
          <meshStandardMaterial
            color="#0a0f1e"
            metalness={0.9}
            roughness={0.06}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Side windows */}
        {[1, -1].map((side) => (
          <mesh key={side} position={[-0.18, 0.82, side * 0.68]}>
            <boxGeometry args={[1.3, 0.32, 0.04]} />
            <meshStandardMaterial
              color="#0a0f1e"
              metalness={0.9}
              roughness={0.06}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}

        {/* ------------------------------------------- Accents ------------- */}
        {/* Side skirts */}
        {[1, -1].map((side) => (
          <mesh key={side} castShadow position={[0, 0.16, side * 0.78]}>
            <boxGeometry args={[2.6, 0.14, 0.1]} />
            <meshStandardMaterial color="#111118" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}

        {/* Racing stripes on hood + roof */}
        {[0.12, -0.12].map((z) => (
          <mesh key={z} position={[1.45, 0.53, z]}>
            <boxGeometry args={[1.7, 0.015, 0.14]} />
            <meshStandardMaterial color="#f5f5f5" metalness={0.4} roughness={0.3} />
          </mesh>
        ))}
        {[0.12, -0.12].map((z) => (
          <mesh key={`roof-${z}`} position={[-0.15, 1.115, z]}>
            <boxGeometry args={[1.35, 0.015, 0.14]} />
            <meshStandardMaterial color="#f5f5f5" metalness={0.4} roughness={0.3} />
          </mesh>
        ))}

        {/* Front splitter */}
        <mesh castShadow position={[1.85, 0.14, 0]}>
          <boxGeometry args={[0.3, 0.08, 1.5]} />
          <meshStandardMaterial color="#111118" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* ------------------------------------------- Lights -------------- */}
        {/* Headlights */}
        {[0.5, -0.5].map((z) => (
          <mesh key={`hl-${z}`} position={[1.82, 0.42, z]}>
            <boxGeometry args={[0.06, 0.1, 0.28]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#fffbe6"
              emissiveIntensity={2.2}
            />
          </mesh>
        ))}
        {/* Tail light bar */}
        <mesh position={[-1.78, 0.6, 0]}>
          <boxGeometry args={[0.05, 0.09, 1.3]} />
          <meshStandardMaterial
            color="#ff2222"
            emissive="#ff1a1a"
            emissiveIntensity={1.6}
          />
        </mesh>

        {/* Exhaust pipes */}
        {[0.3, -0.3].map((z) => (
          <mesh key={`ex-${z}`} position={[-1.82, 0.28, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.16, 12]} />
            <meshStandardMaterial color="#b8b8c0" metalness={0.95} roughness={0.15} />
          </mesh>
        ))}

        {/* ------------------------------------------- Wheels -------------- */}
        <Wheel position={[1.15, 0.33, 0.82]} steerable />
        <Wheel position={[1.15, 0.33, -0.82]} steerable />
        <Wheel position={[-1.15, 0.33, 0.82]} />
        <Wheel position={[-1.15, 0.33, -0.82]} />
      </group>

      {/* Headlight spotlights (real lights, on while driving) */}
      <primitive object={targetL} position={[8, -0.6, 0.5]} />
      <primitive object={targetR} position={[8, -0.6, -0.5]} />
      <spotLight
        ref={headlightL}
        position={[1.8, 0.5, 0.5]}
        target={targetL}
        angle={0.45}
        penumbra={0.6}
        distance={18}
        color="#fff3c4"
        intensity={0}
      />
      <spotLight
        ref={headlightR}
        position={[1.8, 0.5, -0.5]}
        target={targetR}
        angle={0.45}
        penumbra={0.6}
        distance={18}
        color="#fff3c4"
        intensity={0}
      />
    </group>
  );
}

/**
 * Wheel with axle along Z (car faces +X). Nested groups: steer (Y) wraps
 * spin (Z) so front wheels turn and roll correctly.
 */
function Wheel({
  position,
  steerable = false,
}: {
  position: [number, number, number];
  steerable?: boolean;
}) {
  const steerRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (spinRef.current) spinRef.current.rotation.z = -carFrame.wheelSpin;
    if (steerable && steerRef.current) {
      steerRef.current.rotation.y = carFrame.steerAngle;
    }
  });

  return (
    <group position={position}>
      <group ref={steerRef}>
        <group ref={spinRef}>
          {/* Tire */}
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.33, 0.33, 0.26, 20]} />
            <meshStandardMaterial color="#141414" roughness={0.9} metalness={0.1} />
          </mesh>
          {/* Rims on both axle ends */}
          {[0.13, -0.13].map((z) => (
            <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.04, 12]} />
              <meshStandardMaterial color="#d8d8dc" metalness={0.9} roughness={0.15} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
