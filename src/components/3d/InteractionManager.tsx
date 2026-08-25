"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useGameStore } from "@/store/gameStore";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { contacts } from "@/data/contact";
import { about } from "@/data/about";
import { INTERACTION_RADIUS } from "@/utils/constants";

export function InteractionManager() {
  const [, getKeys] = useKeyboardControls();
  const interactPressed = useRef(false);
  const captureStartTime = useRef<number | null>(null);
  const CAPTURE_DURATION = 4; // seconds

  const setNearby = useGameStore((s) => s.setNearby);
  const closePanel = useGameStore((s) => s.closePanel);
  const setCaptureProgress = useGameStore((s) => s.setCaptureProgress);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePanel]);

  useFrame((state) => {
    const gameState = useGameStore.getState();
    if (gameState.activePanel) return;

    const { x, y, z } = gameState.characterPosition;
    const items: { id: string; label: string; distance: number; hint?: "capture" }[] = [];

    const summitDist = Math.hypot(about.position.x - x, about.position.z - z);
    if (y >= 5.8 && summitDist < INTERACTION_RADIUS) {
      items.push({
        id: "resume",
        label: "Resume Flag",
        distance: summitDist,
        hint: "capture",
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

function handleInteraction(id: string) {
  const { openProject, openContact } = useGameStore.getState();
  const { about } = require("@/data/about");

  if (id === "resume") {
    // Open resume directly in new tab
    window.open(about.resumeUrl, "_blank", "noopener,noreferrer");
    return;
  }

  if (id.startsWith("project-")) {
    const project = projects.find((p) => `project-${p.id}` === id);
    if (project) openProject(project);
    return;
  }

  if (id.startsWith("social-")) {
    const social = socials.find((s) => `social-${s.id}` === id);
    if (social) window.open(social.url, "_blank", "noopener,noreferrer");
    return;
  }

  if (id.startsWith("contact-")) {
    const contact = contacts.find((c) => `contact-${c.id}` === id);
    if (contact) openContact(contact);
  }
}
