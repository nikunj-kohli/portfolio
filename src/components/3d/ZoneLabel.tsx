"use client";

import { Billboard, Text } from "@react-three/drei";

interface ZoneLabelProps {
  children: string;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
}

export function ZoneLabel({
  children,
  position,
  fontSize = 0.5,
  color = "#ffffff",
}: ZoneLabelProps) {
  return (
    <Billboard position={position} follow>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {children}
      </Text>
    </Billboard>
  );
}
