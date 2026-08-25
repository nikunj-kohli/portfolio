"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Stars } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Character } from "./Character";
import { World } from "./World";
import { InteractionManager } from "./InteractionManager";

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
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#1a0a2e"]} />

      <fog attach="fog" args={["#16213e", 30, 80]} />

      <Sky
        distance={450000}
        sunPosition={[0, 0.4, 0]}
        inclination={0.5}
        azimuth={0.25}
        turbidity={8}
        rayleigh={0.4}
      />
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />

      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        position={[15, 25, 10]}
        intensity={1.2}
        shadow-mapSize={[2048, 2048]}
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
