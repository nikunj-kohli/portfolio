"use client";

import { PORTFOLIO_CONFIG } from "@/data/config";

export function HUD() {
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
      </div>
    </div>
  );
}
