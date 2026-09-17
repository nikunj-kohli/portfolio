"use client";

import { PORTFOLIO_CONFIG } from "@/data/config";
import { useGameStore } from "@/store/gameStore";
import { Palette } from "lucide-react";

export function HUD() {
  const customizationUnlocked = useGameStore((s) => s.customizationUnlocked);
  const openCustomization = useGameStore((s) => s.openCustomization);
  const activePanel = useGameStore((s) => s.activePanel);

  const handleCustomizeClick = () => {
    if (activePanel === "customization") {
      // If already open, close it
      const closePanel = useGameStore.getState().closePanel;
      closePanel();
    } else {
      openCustomization();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-lg font-bold text-white drop-shadow-lg">
            {PORTFOLIO_CONFIG.name}
          </h1>
          <p className="text-xs text-cyan-400/80 drop-shadow">
            {PORTFOLIO_CONFIG.tagline}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {customizationUnlocked && (
            <button
              onClick={handleCustomizeClick}
              className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 text-sm transition-all"
            >
              <Palette size={14} />
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
