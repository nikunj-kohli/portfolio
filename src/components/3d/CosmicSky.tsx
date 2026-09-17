"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { PLANET_TRIGGER, PLANET_INTERACTION_RADIUS } from "@/utils/constants";

const skyVertex = /* glsl */ `
  varying vec3 vWorldPos;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const skyFragment = /* glsl */ `
  varying vec3 vWorldPos;
  uniform float uTime;

  void main() {
    vec3 dir = normalize(vWorldPos);
    float h = dir.y * 0.5 + 0.5;

    vec3 zenith = vec3(0.18, 0.08, 0.42);
    vec3 mid    = vec3(0.32, 0.12, 0.55);
    vec3 horizon = vec3(0.08, 0.42, 0.58);
    vec3 band   = vec3(0.72, 0.22, 0.62);

    vec3 col = mix(horizon, mid, smoothstep(0.28, 0.62, h));
    col = mix(col, zenith, smoothstep(0.58, 0.95, h));

    float aurora = sin(dir.x * 6.0 + uTime * 0.18) * 0.5 + 0.5;
    aurora *= sin(dir.z * 4.5 - uTime * 0.12) * 0.5 + 0.5;
    aurora *= smoothstep(0.22, 0.55, h) * smoothstep(0.88, 0.55, h);
    col += band * aurora * 0.28;

    float nebula = sin(dir.x * 3.2 + dir.z * 2.4 + uTime * 0.05) * 0.5 + 0.5;
    col += vec3(0.12, 0.35, 0.55) * nebula * 0.18 * (1.0 - h);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * The easter-egg planet. Purely a visual hint — it sits in the sky above its
 * hidden landing zone and its ring breathes faster/brighter as the player
 * approaches the trigger area on the ground below.
 */
function PlanetWithRing() {
  const planetMat = useRef<THREE.MeshStandardMaterial>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const { x, z } = useGameStore.getState().characterPosition;
    const d = Math.hypot(x - PLANET_TRIGGER[0], z - PLANET_TRIGGER[1]);
    const closeness = THREE.MathUtils.clamp(1 - d / (PLANET_INTERACTION_RADIUS * 3), 0, 1);
    const t = state.clock.elapsedTime;

    const pulse = 0.45 + closeness * (0.9 + Math.sin(t * 3) * 0.35);
    if (planetMat.current) planetMat.current.emissiveIntensity = pulse;
    if (ringMat.current)
      ringMat.current.opacity = 0.5 + closeness * (0.3 + Math.sin(t * 4) * 0.2);
    if (planetRef.current) {
      const s = 1 + closeness * Math.sin(t * 3) * 0.03;
      planetRef.current.scale.setScalar(s);
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.1;
  });

  return (
    <group>
      <mesh ref={planetRef} position={[-48, 32, -70]}>
        <sphereGeometry args={[8, 24, 24]} />
        <meshStandardMaterial
          ref={planetMat}
          color="#5b21b6"
          emissive="#7c3aed"
          emissiveIntensity={0.45}
          roughness={0.7}
        />
      </mesh>
      <mesh ref={ringRef} position={[-48, 32, -70]} rotation={[0.4, 0.2, 0.3]}>
        <torusGeometry args={[11, 0.35, 8, 48]} />
        <meshBasicMaterial ref={ringMat} color="#f59e0b" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function AuroraRibbon({
  radius,
  height,
  color,
  speed,
}: {
  radius: number;
  height: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
    ref.current.scale.set(s, 1, s);
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, 0]} position={[0, height, 0]}>
      <torusGeometry args={[radius, 1.8, 12, 80]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export function CosmicSky() {
  // Uniform time is written imperatively in useFrame; keep the material and a
  // stable uniforms ref outside React's immutability contract.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: skyVertex,
        fragmentShader: skyFragment,
        uniforms: { uTime: { value: 0 } },
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );
  const uniformsRef = useRef(material.uniforms);

  useFrame((state) => {
    uniformsRef.current.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[220, 48, 32]} />
        <primitive object={material} attach="material" />
      </mesh>

      <Stars
        radius={140}
        depth={70}
        count={2000}
        factor={5}
        saturation={0.6}
        fade
        speed={0.6}
      />

      <AuroraRibbon radius={70} height={28} color="#00f5ff" speed={0.04} />
      <AuroraRibbon radius={85} height={38} color="#c026d3" speed={-0.03} />
      <AuroraRibbon radius={58} height={22} color="#22c55e" speed={0.025} />

      <PlanetWithRing />

      {/* Horizon glow so the green island never meets a white void */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
        <ringGeometry args={[58, 78, 64]} />
        <meshBasicMaterial
          color="#0ea5c9"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
