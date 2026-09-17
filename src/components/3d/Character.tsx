"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, RapierRigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import { carFrame } from "@/utils/carState";
import {
  CHARACTER_SPEED,
  CHARACTER_SPRINT,
  JUMP_VELOCITY,
  RESPAWN_Y,
  SPAWN_POSITION,
  WORLD_SIZE,
  PLANET_TRIGGER,
  PLANET_INTERACTION_RADIUS,
  PLANET_SAFE_ZONE,
  CAR_ENTER_RADIUS,
  CAR_SPAWN,
  CAR_ACCEL,
  CAR_BRAKE,
  CAR_MAX_SPEED,
  CAR_MAX_REVERSE,
  CAR_DRAG,
  CAR_STEER_SPEED,
  CAR_STEER_HIGH_SPEED,
} from "@/utils/constants";

const direction = new THREE.Vector3();
const cameraForward = new THREE.Vector3();
const cameraRight = new THREE.Vector3();
const up = new THREE.Vector3(0, 1, 0);
const camTarget = new THREE.Vector3();
const camGoal = new THREE.Vector3();

function LegoBody({
  isMoving,
  isRunning,
  characterColors,
}: {
  isMoving: boolean;
  isRunning: boolean;
  characterColors: { skin: string; suit: string; shirt: string };
}) {
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const walkSpeed = isRunning ? 12 : 8;
    const swing = isMoving ? Math.sin(t * walkSpeed) * 0.5 : 0;
    const bob = isMoving
      ? Math.abs(Math.sin(t * walkSpeed)) * 0.05
      : Math.sin(t * 2) * 0.02;

    if (bodyRef.current) bodyRef.current.position.y = bob;
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = isMoving
        ? swing
        : Math.sin(t * 2) * 0.05;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = isMoving
        ? -swing
        : Math.sin(t * 2 + 1) * 0.05;
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = isMoving ? -swing * 0.8 : 0;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = isMoving ? swing * 0.8 : 0;
    }
  });

  const skinColor = characterColors.skin;
  const tuxColor = characterColors.suit;
  const shirtColor = characterColors.shirt;

  return (
    <group ref={bodyRef}>
      <group position={[0, 0.9, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        <mesh position={[-0.12, 0.05, -0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.12, 0.05, -0.28]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, -0.1, -0.27]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.12, 0.07, -0.3]}>
          <torusGeometry args={[0.08, 0.015, 8, 16]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>
        <mesh castShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[0.58, 0.15, 0.58]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.7} />
        </mesh>
      </group>

      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[0.7, 0.65, 0.4]} />
        <meshStandardMaterial color={tuxColor} roughness={0.5} metalness={0.2} />
      </mesh>

      <mesh position={[0, 0.57, -0.18]}>
        <boxGeometry args={[0.35, 0.3, 0.05]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      <group position={[0, 0.67, -0.2]}>
        <mesh position={[-0.08, 0, 0]}>
          <boxGeometry args={[0.1, 0.06, 0.05]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <boxGeometry args={[0.1, 0.06, 0.05]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
      </group>

      <group ref={leftArmRef} position={[-0.45, 0.45, 0]}>
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[0.2, 0.35, 0.2]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh castShadow position={[0, -0.38, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.45, 0.45, 0]}>
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[0.2, 0.35, 0.2]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh castShadow position={[0, -0.38, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      <group ref={leftLegRef} position={[-0.18, 0, 0]}>
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[0.22, 0.35, 0.25]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh castShadow position={[0, -0.38, 0]}>
          <boxGeometry args={[0.24, 0.12, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.18, 0, 0]}>
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[0.22, 0.35, 0.25]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh castShadow position={[0, -0.38, 0]}>
          <boxGeometry args={[0.24, 0.12, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

export function Character() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const visualRef = useRef<THREE.Group>(null);
  const [, getKeys] = useKeyboardControls();
  const { camera, gl } = useThree();
  const cameraAngle = useRef(0);
  const cameraHeight = useRef(8);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const jumpPressed = useRef(false);
  const lastFacing = useRef(0);

  const setCharacterPosition = useGameStore((s) => s.setCharacterPosition);
  const setMovement = useGameStore((s) => s.setMovement);
  const isMoving = useGameStore((s) => s.isMoving);
  const isRunning = useGameStore((s) => s.isRunning);
  const characterColors = useGameStore((s) => s.characterColors);
  const inCarMode = useGameStore((s) => s.inCarMode);

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      cameraAngle.current -= (e.clientX - lastMouseX.current) * 0.005;
      cameraHeight.current += (e.clientY - lastMouseY.current) * 0.02;
      cameraHeight.current = Math.max(4, Math.min(20, cameraHeight.current));
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [gl]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05); // Clamp long frames (tab switches)
    const { forward, backward, left, right, shift, jump } = getKeys();
    const body = rigidBodyRef.current;
    if (!body) return;

    const pos = body.translation();
    const linvel = body.linvel();

    // ------------------------------------------------------------ Teleports
    const { pendingTeleport, clearTeleport, exitCar } = useGameStore.getState();
    if (pendingTeleport) {
      const t = pendingTeleport;
      clearTeleport();
      const wasDriving = carFrame.active;
      if (wasDriving) {
        // Leaving the car: park the car where it stands, respawn player beside it.
        carFrame.active = false;
        carFrame.speed = 0;
        exitCar();
      }
      body.setTranslation({ x: t.x, y: t.y, z: t.z }, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      // The car stays parked where the player left it — even after a respawn.
      // Only recover it if it somehow ended up outside the world.
      const half = WORLD_SIZE / 2 - 2;
      if (Math.abs(carFrame.x) > half || Math.abs(carFrame.z) > half) {
        carFrame.x = CAR_SPAWN[0];
        carFrame.z = CAR_SPAWN[2];
        carFrame.rotation = 0;
      }
      setCharacterPosition(t.x, t.y, t.z);
      return;
    }

    // -------------------------------------------------------------- Camera
    const camDist = 12;
    camGoal.set(
      pos.x + Math.sin(cameraAngle.current) * camDist,
      pos.y + cameraHeight.current,
      pos.z + Math.cos(cameraAngle.current) * camDist
    );
    camera.position.lerp(camGoal, 0.08);
    camTarget.set(pos.x, pos.y + 1.5, pos.z);
    camera.lookAt(camTarget);

    // ------------------------------------------------------------ Car mode
    if (inCarMode) {
      carFrame.active = true;

      // --- Longitudinal: accel / brake / drag -----------------------------
      const maxSpeed = CAR_MAX_SPEED;
      const prevSpeed = carFrame.speed;
      if (forward) {
        carFrame.speed = Math.min(
          maxSpeed,
          carFrame.speed + CAR_ACCEL * delta
        );
      } else if (backward) {
        // Brake when rolling forward, reverse when (nearly) stopped.
        carFrame.speed =
          carFrame.speed > 0.5
            ? Math.max(0, carFrame.speed - CAR_BRAKE * delta)
            : Math.max(-CAR_MAX_REVERSE, carFrame.speed - CAR_ACCEL * 0.6 * delta);
      } else {
        // Engine braking / rolling drag
        const drop = CAR_DRAG * delta * (1 + Math.abs(carFrame.speed) * 0.15);
        carFrame.speed =
          carFrame.speed > 0
            ? Math.max(0, carFrame.speed - drop)
            : Math.min(0, carFrame.speed + drop);
      }
      carFrame.accel = (carFrame.speed - prevSpeed) / Math.max(delta, 1e-4);

      // --- Steering: stronger at low speed, tighter at high speed ---------
      const speedFactor = Math.min(Math.abs(carFrame.speed) / maxSpeed, 1);
      const steerAuthority =
        CAR_STEER_SPEED +
        (CAR_STEER_HIGH_SPEED - CAR_STEER_SPEED) * speedFactor;
      // Steering direction flips in reverse (like a real car).
      const steerInput = (left ? 1 : 0) - (right ? 1 : 0);
      carFrame.steerAngle = THREE.MathUtils.lerp(
        carFrame.steerAngle,
        steerInput * 0.42,
        0.18
      );
      if (Math.abs(carFrame.speed) > 0.5 && steerInput !== 0) {
        carFrame.rotation += steerInput * steerAuthority * delta * Math.sign(carFrame.speed);
      }

      // --- Move along the car's heading ----------------------------------
      // The car model faces +X, so its forward vector for a yaw of `rotation`
      // is (cos r, 0, -sin r) — NOT the usual (sin, cos) which assumes +Z.
      // Getting this wrong made W drive the car sideways.
      const moveX = Math.cos(carFrame.rotation) * carFrame.speed * delta;
      const moveZ = -Math.sin(carFrame.rotation) * carFrame.speed * delta;
      const nextX = pos.x + moveX;
      const nextZ = pos.z + moveZ;

      // Wheels & motion data for the Car visuals.
      carFrame.wheelSpin += carFrame.speed * delta * 3;

      // --- World bounds: soft wall + speed kill --------------------------
      const half = WORLD_SIZE / 2 - 4;
      let clampedX = nextX;
      let clampedZ = nextZ;
      let hitWall = false;
      if (Math.abs(nextX) > half) {
        clampedX = Math.sign(nextX) * half;
        hitWall = true;
      }
      if (Math.abs(nextZ) > half) {
        clampedZ = Math.sign(nextZ) * half;
        hitWall = true;
      }
      if (hitWall && Math.abs(carFrame.speed) > 4) {
        // Small bounce back on hard wall hits.
        carFrame.speed *= -0.25;
      } else if (hitWall) {
        carFrame.speed = 0;
      }

      // World bounds: soft wall + speed kill ------------------------------
      body.setLinvel({ x: 0, y: linvel.y, z: 0 }, true);
      body.setTranslation({ x: clampedX, y: pos.y, z: clampedZ }, true);

      setMovement(
        Math.abs(carFrame.speed) > 0.5,
        Math.abs(carFrame.speed) > CAR_MAX_SPEED * 0.6
      );
      setCharacterPosition(clampedX, pos.y, clampedZ);
      carFrame.x = clampedX;
      carFrame.z = clampedZ;
    } else {
      // ------------------------------------------------------- Walking mode
      carFrame.active = false;

      camera.getWorldDirection(cameraForward);
      cameraForward.y = 0;
      cameraForward.normalize();
      cameraRight.crossVectors(cameraForward, up).normalize();

      direction.set(0, 0, 0);
      if (forward) direction.add(cameraForward);
      if (backward) direction.sub(cameraForward);
      if (left) direction.sub(cameraRight);
      if (right) direction.add(cameraRight);

      const moving = direction.lengthSq() > 0;
      const speed = shift ? CHARACTER_SPRINT : CHARACTER_SPEED;

      if (moving) {
        direction.normalize().multiplyScalar(speed);
      }

      setMovement(moving, !!shift && moving);

      body.wakeUp();
      body.setLinvel({ x: direction.x, y: linvel.y, z: direction.z }, true);

      if (moving && visualRef.current) {
        const targetAngle = Math.atan2(direction.x, direction.z) + Math.PI;
        lastFacing.current = THREE.MathUtils.lerp(
          lastFacing.current,
          targetAngle,
          0.15
        );
        visualRef.current.rotation.y = lastFacing.current;
      }
    }

    // ------------------------------------------------- Bounds & easter egg
    const dx = pos.x - PLANET_TRIGGER[0];
    const dz = pos.z - PLANET_TRIGGER[1];
    const horizontalPlanetDist = Math.hypot(dx, dz);

    const nearPlanet =
      horizontalPlanetDist <
      PLANET_INTERACTION_RADIUS + PLANET_SAFE_ZONE;
    const half = WORLD_SIZE / 2 - 3;
    const fellOff =
      pos.y < RESPAWN_Y ||
      (!nearPlanet && (Math.abs(pos.x) > half || Math.abs(pos.z) > half));

    if (fellOff) {
      if (carFrame.active) {
        carFrame.active = false;
        carFrame.speed = 0;
        exitCar();
      }
      // If the car fell off with the player, recover it to spawn.
      if (
        Math.abs(carFrame.x) > WORLD_SIZE / 2 - 2 ||
        Math.abs(carFrame.z) > WORLD_SIZE / 2 - 2
      ) {
        carFrame.x = CAR_SPAWN[0];
        carFrame.z = CAR_SPAWN[2];
        carFrame.rotation = 0;
      }
      body.setTranslation(
        { x: SPAWN_POSITION[0], y: SPAWN_POSITION[1], z: SPAWN_POSITION[2] },
        true
      );
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      setCharacterPosition(
        SPAWN_POSITION[0],
        SPAWN_POSITION[1],
        SPAWN_POSITION[2]
      );
      return;
    }

    setCharacterPosition(pos.x, pos.y, pos.z);

    const grounded = Math.abs(linvel.y) < 1.2;
    if (jump && grounded && !jumpPressed.current && !inCarMode) {
      jumpPressed.current = true;
      body.setLinvel({ x: linvel.x, y: JUMP_VELOCITY, z: linvel.z }, true);
    }
    if (!jump) {
      jumpPressed.current = false;
    }
  });

  // Walk-to-car proximity check (drives the "Press F" prompt).
  useEffect(() => {
    const interval = setInterval(() => {
      const s = useGameStore.getState();
      if (s.inCarMode || !s.carUnlocked) {
        s.setNearCar(false);
        return;
      }
      const p = s.characterPosition;
      const near =
        Math.hypot(p.x - carFrame.x, p.z - carFrame.z) < CAR_ENTER_RADIUS;
      s.setNearCar(near);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={SPAWN_POSITION}
      enabledRotations={[false, false, false]}
      linearDamping={5}
      friction={3}
    >
      <CapsuleCollider args={[0.35, 0.35]} friction={3} restitution={0} />

      <group ref={visualRef} visible={!inCarMode}>
        <LegoBody isMoving={isMoving} isRunning={isRunning} characterColors={characterColors} />
      </group>
    </RigidBody>
  );
}
