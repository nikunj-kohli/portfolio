// Mutable, non-reactive bridge for per-frame car data.
// Storing per-frame values in the zustand store triggered a React re-render on
// every animation frame (store update inside useFrame). This keeps the frame
// loop smooth while still letting UI components subscribe to occasional
// snapshots (mode changes, speed display).

export interface CarFrameState {
  x: number;
  z: number;
  rotation: number; // Y rotation the car body faces (nose points +X at r=0)
  speed: number; // Signed speed, forward (nose direction) positive
  accel: number; // Signed acceleration, used for body pitch
  wheelSpin: number; // Accumulated wheel rotation angle
  steerAngle: number; // Front wheel steer angle
  active: boolean; // True while the player is driving
}

export const carFrame: CarFrameState = {
  x: 0,
  z: 0,
  rotation: 0,
  speed: 0,
  accel: 0,
  wheelSpin: 0,
  steerAngle: 0,
  active: false,
};

// Dev/preview helper (mirrors window.__game): lets you inspect the live
// per-frame car state from the browser console.
if (typeof window !== "undefined") {
  (window as unknown as { __car: CarFrameState }).__car = carFrame;
}
