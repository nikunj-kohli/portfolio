"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Character } from "./Character";
import { World } from "./World";
import { InteractionManager } from "./InteractionManager";
import { CosmicSky } from "./CosmicSky";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00f5ff" wireframe />
    </mesh>
  );
}

export function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 8, 12], fov: 55 }}
      className="w-full h-screen"
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#1e1040"]} />
      <fog attach="fog" args={["#2a1860", 55, 140]} />

      <CosmicSky />

      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#7c3aed", "#1a4d3a", 0.35]} />
      <directionalLight
        castShadow
        position={[15, 25, 10]}
        intensity={1.05}
        color="#ffe4c4"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <pointLight position={[-10, 8, -10]} intensity={0.4} color="#ff00ff" />
      <pointLight position={[20, 6, 5]} intensity={0.3} color="#00f5ff" />

      <Suspense fallback={<LoadingFallback />}>
        <Physics gravity={[0, -20, 0]}>
          <World />
          <Character />
        </Physics>
        <InteractionManager />
      </Suspense>
    </Canvas>
  );
}
