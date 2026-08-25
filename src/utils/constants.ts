export const COLORS = {
  sky: {
    top: "#1a0a2e",
    mid: "#16213e",
    bottom: "#0f3460",
  },
  ground: {
    grass: "#2d6a4f",
    grassLight: "#40916c",
    grassBright: "#52b788",
    sand: "#e9c46a",
    sandDark: "#d4a574",
    rock: "#6b705c",
    snow: "#f8f9fa",
  },
  neon: {
    cyan: "#00f5ff",
    magenta: "#ff00ff",
    yellow: "#ffea00",
  },
  ui: {
    glass: "rgba(15, 23, 42, 0.75)",
    glassBorder: "rgba(255, 255, 255, 0.12)",
  },
} as const;

export const WORLD_SIZE = 120;
export const SPAWN_POSITION: [number, number, number] = [0, 1.5, 0];
export const INTERACTION_RADIUS = 4;
export const CHARACTER_SPEED = 8;
export const CHARACTER_SPRINT = 14;
export const JUMP_VELOCITY = 7.8;
export const RESPAWN_Y = -8;
