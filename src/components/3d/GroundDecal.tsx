"use client";

interface GroundDecalProps {
  position: [number, number, number];
  size: [number, number];
  color: string;
  opacity?: number;
}

export function GroundDecal({
  position,
  size,
  color,
  opacity = 1,
}: GroundDecalProps) {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
      receiveShadow
      renderOrder={1}
    >
      <planeGeometry args={size} />
      <meshStandardMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
        roughness={0.95}
        polygonOffset
        polygonOffsetFactor={-4}
        polygonOffsetUnits={-4}
        depthWrite={opacity >= 0.95}
      />
    </mesh>
  );
}
