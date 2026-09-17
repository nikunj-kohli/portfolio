"use client";

import { useState } from "react";
import { Gamepad2, X } from "lucide-react";

const CONTROLS = [
  ["WASD / Arrows", "Move"],
  ["Shift", "Sprint"],
  ["Space", "Jump"],
  ["Mouse Drag", "Look around"],
  ["E", "Interact / Visit"],
  ["Esc", "Close panel"],
  ["C", "Customize (when unlocked)"],
  ["F near car", "Drive (when unlocked)"],
  ["W/S in car", "Accelerate / Brake & reverse"],
  ["A/D in car", "Steer"],
] as const;

export function ControlsHint() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:border-cyan-400/40 transition-all shadow-lg"
        aria-expanded={open}
        aria-label={open ? "Hide controls" : "Show controls"}
      >
        <Gamepad2 size={16} className="text-cyan-400" />
        <span className="text-sm font-medium">Controls</span>
      </button>

      {open && (
        <div className="mt-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 space-y-1.5 shadow-xl w-56">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
              Controls
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              aria-label="Close controls"
            >
              <X size={14} />
            </button>
          </div>
          {CONTROLS.map(([key, action]) => (
            <div key={key} className="flex items-center gap-3 text-xs">
              <kbd className="min-w-[88px] px-2 py-0.5 rounded bg-white/10 text-cyan-400 font-mono text-[10px] text-center border border-white/5">
                {key}
              </kbd>
              <span className="text-white/50">{action}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
