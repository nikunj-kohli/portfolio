"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { contacts } from "@/data/contact";
import { about } from "@/data/about";
import {
  INTERACTION_RADIUS,
  PLANET_TRIGGER,
  PLANET_INTERACTION_RADIUS,
  CAR_ENTER_RADIUS,
} from "@/utils/constants";
import { carFrame } from "@/utils/carState";

export function InteractionManager() {
  const [, getKeys] = useKeyboardControls();
  const interactPressed = useRef(false);
  const captureStartTime = useRef<number | null>(null);
  const CAPTURE_DURATION = 4; // seconds

  const setNearby = useGameStore((s) => s.setNearby);
  const closePanel = useGameStore((s) => s.closePanel);
  const setCaptureProgress = useGameStore((s) => s.setCaptureProgress);
  const unlockCustomization = useGameStore((s) => s.unlockCustomization);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePanel();
        return;
      }
      if (e.repeat) return; // Ignore key auto-repeat
      const gameState = useGameStore.getState();

      if (e.key === "c" || e.key === "C") {
        if (gameState.customizationUnlocked) {
          if (gameState.activePanel === "customization") {
            gameState.closePanel();
          } else {
            gameState.openCustomization();
          }
        }
      }

      if (e.key === "f" || e.key === "F") {
        if (gameState.activePanel) return; // Don't enter/exit car behind a panel
        if (gameState.inCarMode) {
          // Step out on the car's LEFT side (heading is (cos r, -sin r),
          // so left = (-sin r, -cos r)).
          gameState.requestTeleport(
            carFrame.x - Math.sin(carFrame.rotation) * 2.2,
            0.6,
            carFrame.z - Math.cos(carFrame.rotation) * 2.2
          );
        } else if (gameState.nearCar) {
          gameState.enterCar();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePanel]);

  useFrame((state) => {
    const gameState = useGameStore.getState();

    const { x, y, z } = gameState.characterPosition;

    // ---------------------------------------------------------- Easter egg
    // Trigger is the ground beacon below the sky planet (horizontal check so
    // it can actually be reached on foot or by car).
    const planetDist = Math.hypot(
      x - PLANET_TRIGGER[0],
      z - PLANET_TRIGGER[1]
    );

    if (
      planetDist < PLANET_INTERACTION_RADIUS &&
      !gameState.customizationUnlocked &&
      !gameState.showUnlockNotification
    ) {
      unlockCustomization();
    }

    if (gameState.activePanel) {
      setNearby(null, null, null);
      return;
    }

    // --------------------------------------------------- Nearby interactable
    const items: {
      id: string;
      label: string;
      distance: number;
      hint?: "capture";
    }[] = [];

    // Resume flag on the summit (capture-and-hold).
    const summitDist = Math.hypot(about.position.x - x, about.position.z - z);
    if (y >= 4.5 && summitDist < INTERACTION_RADIUS) {
      items.push({
        id: "resume",
        label: "Resume Flag",
        distance: summitDist,
        hint: "capture",
      });
    }

    // About tablet on the mountain slope (instant open).
    const tabletDist = Math.hypot(
      about.position.x + 3.5 - x,
      about.position.z + 4 - z
    );
    if (tabletDist < INTERACTION_RADIUS) {
      items.push({
        id: "about-tablet",
        label: "About Me",
        distance: tabletDist,
      });
    }

    for (const p of projects) {
      items.push({
        id: `project-${p.id}`,
        label: p.name,
        distance: Math.hypot(p.position.x - x, p.position.z - z),
      });
    }

    for (const s of socials) {
      items.push({
        id: `social-${s.id}`,
        label: s.name,
        distance: Math.hypot(s.position.x - x, s.position.z - z),
      });
    }

    for (const c of contacts) {
      items.push({
        id: `contact-${c.id}`,
        label: c.name,
        distance: Math.hypot(c.position.x - x, c.position.z - z),
      });
    }

    // The car itself is an interactable when parked nearby.
    if (gameState.carUnlocked && !gameState.inCarMode) {
      const carDist = Math.hypot(carFrame.x - x, carFrame.z - z);
      if (carDist < CAR_PROMPT_RADIUS) {
        items.push({ id: "car", label: "Sports Car", distance: carDist });
      }
    }

    const closest = items
      .filter((item) => item.distance < INTERACTION_RADIUS)
      .sort((a, b) => a.distance - b.distance)[0];

    setNearby(
      closest?.id ?? null,
      closest?.label ?? null,
      closest?.hint ?? null
    );

    const { interact } = getKeys();

    // Handle capture mechanic for flags
    if (closest?.hint === "capture") {
      if (interact) {
        if (!captureStartTime.current) {
          captureStartTime.current = state.clock.elapsedTime;
        }
        const elapsed = state.clock.elapsedTime - captureStartTime.current;
        const progress = Math.min(elapsed / CAPTURE_DURATION, 1);
        setCaptureProgress(progress);

        if (progress >= 1 && !interactPressed.current) {
          interactPressed.current = true;
          handleInteraction(closest.id);
          captureStartTime.current = null;
          setCaptureProgress(0);
        }
      } else {
        captureStartTime.current = null;
        setCaptureProgress(0);
        interactPressed.current = false;
      }
    } else {
      // Handle instant interactions for other items
      captureStartTime.current = null;
      setCaptureProgress(0);

      if (interact && !interactPressed.current && closest) {
        interactPressed.current = true;
        handleInteraction(closest.id);
      }
      if (!interact) {
        interactPressed.current = false;
      }
    }
  });

  return null;
}

const CAR_PROMPT_RADIUS = CAR_ENTER_RADIUS;

function handleInteraction(id: string) {
  const { openProject, openContact, openAbout } = useGameStore.getState();

  if (id === "resume") {
    // window.open may be blocked if not user-initiated; fall back gracefully.
    const win = window.open(about.resumeUrl, "_blank", "noopener,noreferrer");
    if (!win) useGameStore.getState().openResume();
    return;
  }

  if (id === "about-tablet") {
    openAbout();
    return;
  }

  if (id.startsWith("project-")) {
    const project = projects.find((p) => `project-${p.id}` === id);
    if (project) openProject(project);
    return;
  }

  if (id.startsWith("social-")) {
    const social = socials.find((s) => `social-${s.id}` === id);
    if (social) {
      const win = window.open(social.url, "_blank", "noopener,noreferrer");
      if (!win) {
        // Popup blocked — surface the URL in the contact panel instead.
        useGameStore.getState().openContact({
          id: social.id,
          name: social.name,
          value: social.url,
          href: social.url,
          icon: "link",
          position: social.position,
        });
      }
    }
    return;
  }

  if (id.startsWith("contact-")) {
    const contact = contacts.find((c) => `contact-${c.id}` === id);
    if (contact) openContact(contact);
  }
}
