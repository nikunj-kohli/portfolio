import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
  customizationUnlocked: boolean;
  characterColors: {
    skin: string;
    suit: string;
    shirt: string;
  };
  showUnlockNotification: boolean;
  carUnlocked: boolean;
  inCarMode: boolean;
  nearCar: boolean;

  // Commands consumed by Character.tsx each frame (teleports, etc.)
  pendingTeleport: { x: number; y: number; z: number } | null;
  requestTeleport: (x: number, y: number, z: number) => void;
  clearTeleport: () => void;

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
  openCustomization: () => void;
  closePanel: () => void;
  setCaptureProgress: (progress: number) => void;
  unlockCustomization: () => void;
  setCharacterColors: (colors: { skin: string; suit: string; shirt: string }) => void;
  hideUnlockNotification: () => void;
  unlockCar: () => void;
  enterCar: () => void;
  exitCar: () => void;
  toggleCarMode: () => void;
  setNearCar: (near: boolean) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
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
      customizationUnlocked: false,
      characterColors: {
        skin: "#F5C518",
        suit: "#1a1a1a",
        shirt: "#ffffff",
      },
      showUnlockNotification: false,
      carUnlocked: false,
      inCarMode: false,
      nearCar: false,

      pendingTeleport: null,
      requestTeleport: (x, y, z) => set({ pendingTeleport: { x, y, z } }),
      clearTeleport: () => set({ pendingTeleport: null }),

      setNearby: (id, label = null, hint = null) => {
        const s = get();
        if (
          s.nearbyInteractable === id &&
          s.nearbyLabel === label &&
          s.interactionHint === hint
        )
          return; // Avoid redundant renders when nothing changed
        set({ nearbyInteractable: id, nearbyLabel: label, interactionHint: hint });
      },

      setCharacterPosition: (x, y, z) =>
        set({ characterPosition: { x, y, z } }),

      setMovement: (moving, running) => {
        const s = get();
        if (s.isMoving === moving && s.isRunning === running) return;
        set({ isMoving: moving, isRunning: running });
      },

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

      openCustomization: () =>
        set({
          activePanel: "customization",
          activeProject: null,
          activeContact: null,
        }),

      closePanel: () =>
        set({
          activePanel: null,
          activeProject: null,
          activeContact: null,
        }),

      setCaptureProgress: (progress) => {
        if (get().captureProgress === progress) return;
        set({ captureProgress: progress });
      },

      unlockCustomization: () =>
        set({
          customizationUnlocked: true,
          showUnlockNotification: true,
          carUnlocked: true, // Also unlock car
        }),

      setCharacterColors: (colors) => set({ characterColors: colors }),

      hideUnlockNotification: () => set({ showUnlockNotification: false }),

      unlockCar: () => set({ carUnlocked: true }),

      enterCar: () => {
        if (!get().carUnlocked || get().inCarMode) return;
        set({ inCarMode: true, nearCar: false });
      },

      exitCar: () => {
        if (!get().inCarMode) return;
        // Character visually reappears next to the car; the actual position
        // teleport is handled by Character.tsx via pendingTeleport.
        set({ inCarMode: false });
      },

      toggleCarMode: () => {
        const s = get();
        if (s.inCarMode) {
          s.exitCar();
        } else if (s.carUnlocked && s.nearCar) {
          s.enterCar();
        }
      },

      setNearCar: (near) => {
        if (get().nearCar === near) return;
        set({ nearCar: near });
      },
    }),
    {
      name: "portfolio-game-state",
      storage: createJSONStorage(() => localStorage),
      // Only persist progress the user has earned (and their look), never
      // transient world state like positions or open panels.
      partialize: (state) => ({
        customizationUnlocked: state.customizationUnlocked,
        characterColors: state.characterColors,
        carUnlocked: state.carUnlocked,
      }),
    }
  )
);

// Dev/preview helper: lets you poke game state from the browser console
// (e.g. `__game.unlockCustomization()` to preview the car without hunting
// for the beacon). Harmless in production.
if (typeof window !== "undefined") {
  (window as unknown as { __game: typeof useGameStore }).__game = useGameStore;
}
