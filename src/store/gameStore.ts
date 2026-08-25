import { create } from "zustand";
import type { PanelType, Project, ContactMethod } from "@/utils/models";

interface GameState {
  activePanel: PanelType;
  activeProject: Project | null;
  activeContact: ContactMethod | null;
  nearbyInteractable: string | null;
  nearbyLabel: string | null;
  interactionHint: "visit" | "capture" | null;
  characterPosition: { x: number; y: number; z: number };
  isMoving: boolean;
  isRunning: boolean;
  captureProgress: number;

  setNearby: (
    id: string | null,
    label?: string | null,
    hint?: "visit" | "capture" | null
  ) => void;
  setCharacterPosition: (x: number, y: number, z: number) => void;
  setMovement: (moving: boolean, running: boolean) => void;
  openProject: (project: Project) => void;
  openAbout: () => void;
  openContact: (contact: ContactMethod) => void;
  openResume: () => void;
  closePanel: () => void;
  setCaptureProgress: (progress: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  activePanel: null,
  activeProject: null,
  activeContact: null,
  nearbyInteractable: null,
  nearbyLabel: null,
  interactionHint: null,
  characterPosition: { x: 0, y: 0, z: 0 },
  isMoving: false,
  isRunning: false,
  captureProgress: 0,

  setNearby: (id, label = null, hint = null) =>
    set({ nearbyInteractable: id, nearbyLabel: label, interactionHint: hint }),

  setCharacterPosition: (x, y, z) =>
    set({ characterPosition: { x, y, z } }),

  setMovement: (moving, running) =>
    set({ isMoving: moving, isRunning: running }),

  openProject: (project) =>
    set({
      activePanel: "project",
      activeProject: project,
      activeContact: null,
    }),

  openAbout: () =>
    set({
      activePanel: "about",
      activeProject: null,
      activeContact: null,
    }),

  openContact: (contact) =>
    set({
      activePanel: "contact",
      activeContact: contact,
      activeProject: null,
    }),

  openResume: () =>
    set({
      activePanel: "resume",
      activeProject: null,
      activeContact: null,
    }),

  closePanel: () =>
    set({
      activePanel: null,
      activeProject: null,
      activeContact: null,
    }),

  setCaptureProgress: (progress) =>
    set({ captureProgress: progress }),
}));
