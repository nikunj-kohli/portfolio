"use client";

import { Billboard, Text } from "@react-three/drei";

interface ZoneLabelProps {
  children: string;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
  outlineColor?: string;
}

export function ZoneLabel({
  children,
  position,
  fontSize = 0.5,
  color = "#ffffff",
  outlineColor = "#000",
}: ZoneLabelProps) {
  return (
    <Billboard position={position} follow>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor={outlineColor}
      >
        {children}
      </Text>
    </Billboard>
  );
}
