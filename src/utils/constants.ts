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
export const SPAWN_POSITION: [number, number, number] = [0, 0.5, 0];
export const INTERACTION_RADIUS = 4;
export const CHARACTER_SPEED = 8;
export const CHARACTER_SPRINT = 14;
export const JUMP_VELOCITY = 7.8;
export const RESPAWN_Y = -8;

// ---------------------------------------------------------------------------
// Easter egg planet
// ---------------------------------------------------------------------------
// The planet visual floats in the sky at PLANET_POSITION, but its interaction
// trigger lives on the ground so it is actually reachable on foot / by car.
export const PLANET_POSITION: [number, number, number] = [-48, 32, -70];
export const PLANET_INTERACTION_RADIUS = 7; // Horizontal trigger radius on the ground
export const PLANET_SAFE_ZONE = 8; // Extra "fall protection" margin around the trigger
export const PLANET_TRIGGER: [number, number] = [-42, -52]; // Ground beacon (x, z)

// ---------------------------------------------------------------------------
// Car
// ---------------------------------------------------------------------------
export const CAR_SPAWN: [number, number, number] = [6, 0.8, 4];
export const CAR_ENTER_RADIUS = 3.5; // How close you must walk to press F
export const CAR_ACCEL = 22; // m/s^2 forward acceleration
export const CAR_BRAKE = 34; // m/s^2 when braking / reversing
export const CAR_MAX_SPEED = 26; // Top forward speed
export const CAR_MAX_REVERSE = 8; // Top reverse speed
export const CAR_DRAG = 10; // Engine braking - high so the car stops promptly
export const CAR_STEER_SPEED = 2.1; // rad/s steering at standstill
export const CAR_STEER_HIGH_SPEED = 0.9; // rad/s steering near top speed
export const CAR_GRIP = 0.82; // Lateral velocity damping per frame
