"use client";

import { Scene } from "@/components/3d/Scene";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { useMemo } from "react";
import { HUD } from "@/components/ui/HUD";
import { ControlsHint } from "@/components/ui/ControlsHint";
import { InteractionPrompt } from "@/components/ui/InteractionPrompt";
import { ProjectPanel } from "@/components/ui/ProjectPanel";
import { AboutPanel } from "@/components/ui/AboutPanel";
import { ContactPanel } from "@/components/ui/ContactPanel";
import { ResumePanel } from "@/components/ui/ResumePanel";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CustomizationPanel } from "@/components/ui/CustomizationPanel";
import { UnlockNotification } from "@/components/ui/UnlockNotification";

export default function Home() {
  const map = useMemo<KeyboardControlsEntry[]>(
    () => [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
      { name: "shift", keys: ["ShiftLeft", "ShiftRight"] },
      { name: "jump", keys: ["Space"] },
      { name: "interact", keys: ["KeyE"] },
      { name: "customize", keys: ["KeyC"] },
      { name: "car", keys: ["KeyF"] },
    ],
    []
  );

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#1e1040]">
      <LoadingScreen />

      <KeyboardControls map={map}>
        <Scene />
      </KeyboardControls>

      <HUD />
      <ControlsHint />
      <InteractionPrompt />
      <ProjectPanel />
      <AboutPanel />
      <ContactPanel />
      <ResumePanel />
      <CustomizationPanel />
      <UnlockNotification />
    </main>
  );
}
