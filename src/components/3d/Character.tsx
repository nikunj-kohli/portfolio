"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody, RapierRigidBody, CapsuleCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";
import {
  CHARACTER_SPEED,
  CHARACTER_SPRINT,
  JUMP_VELOCITY,
  RESPAWN_Y,
  SPAWN_POSITION,
  WORLD_SIZE,
} from "@/utils/constants";

const direction = new THREE.Vector3();
const cameraForward = new THREE.Vector3();
const cameraRight = new THREE.Vector3();
const up = new THREE.Vector3(0, 1, 0);

function LegoBody({
  isMoving,
  isRunning,
}: {
  isMoving: boolean;
  isRunning: boolean;
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

  const skinColor = "#F5C518";
  const tuxColor = "#1a1a1a";
  const shirtColor = "#ffffff";

  return (
    <group ref={bodyRef}>
      <group position={[0, 1.15, 0]}>
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

      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[0.7, 0.65, 0.4]} />
        <meshStandardMaterial color={tuxColor} roughness={0.5} metalness={0.2} />
      </mesh>

      <mesh position={[0, 0.72, -0.18]}>
        <boxGeometry args={[0.35, 0.3, 0.05]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      <group position={[0, 0.82, -0.2]}>
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

      <group ref={leftArmRef} position={[-0.45, 0.6, 0]}>
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[0.2, 0.35, 0.2]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh castShadow position={[0, -0.38, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.45, 0.6, 0]}>
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[0.2, 0.35, 0.2]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh castShadow position={[0, -0.38, 0]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      <group ref={leftLegRef} position={[-0.18, 0.15, 0]}>
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxGeometry args={[0.22, 0.35, 0.25]} />
          <meshStandardMaterial color={tuxColor} />
        </mesh>
        <mesh castShadow position={[0, -0.38, 0]}>
          <boxGeometry args={[0.24, 0.12, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.18, 0.15, 0]}>
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
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const jumpPressed = useRef(false);
  const lastFacing = useRef(0);

  const setCharacterPosition = useGameStore((s) => s.setCharacterPosition);
  const setMovement = useGameStore((s) => s.setMovement);
  const isMoving = useGameStore((s) => s.isMoving);
  const isRunning = useGameStore((s) => s.isRunning);

  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      lastMouseX.current = e.clientX;
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      cameraAngle.current -= (e.clientX - lastMouseX.current) * 0.005;
      lastMouseX.current = e.clientX;
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

  useFrame(() => {
    const { forward, backward, left, right, shift, jump } = getKeys();
    const body = rigidBodyRef.current;
    if (!body) return;

    const pos = body.translation();
    const linvel = body.linvel();

    const dist = 12;
    const height = 8;
    camera.position.lerp(
      new THREE.Vector3(
        pos.x + Math.sin(cameraAngle.current) * dist,
        pos.y + height,
        pos.z + Math.cos(cameraAngle.current) * dist
      ),
      0.08
    );
    camera.lookAt(pos.x, pos.y + 1.5, pos.z);

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

    const half = WORLD_SIZE / 2 - 3;
    const fellOff =
      pos.y < RESPAWN_Y ||
      Math.abs(pos.x) > half ||
      Math.abs(pos.z) > half;

    if (fellOff) {
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

    const grounded = Math.abs(linvel.y) < 1.2 && pos.y < 2.8;
    if (jump && grounded && !jumpPressed.current) {
      jumpPressed.current = true;
      body.setLinvel({ x: linvel.x, y: JUMP_VELOCITY, z: linvel.z }, true);
    }
    if (!jump) {
      jumpPressed.current = false;
    }

    if (moving && visualRef.current) {
      const targetAngle = Math.atan2(direction.x, direction.z) + Math.PI;
      lastFacing.current = THREE.MathUtils.lerp(
        lastFacing.current,
        targetAngle,
        0.15
      );
      visualRef.current.rotation.y = lastFacing.current;
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      position={SPAWN_POSITION}
      enabledRotations={[false, false, false]}
      linearDamping={5}
      friction={1.5}
    >
      <CapsuleCollider args={[0.4, 0.3]} friction={2} restitution={0} />

      <group ref={visualRef}>
        <LegoBody isMoving={isMoving} isRunning={isRunning} />
      </group>
    </RigidBody>
  );
}
