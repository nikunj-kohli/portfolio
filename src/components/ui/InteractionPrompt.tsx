"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";

export function InteractionPrompt() {
  const nearbyLabel = useGameStore((s) => s.nearbyLabel);
  const interactionHint = useGameStore((s) => s.interactionHint);
  const activePanel = useGameStore((s) => s.activePanel);

  const action =
    interactionHint === "capture"
      ? "Capture"
      : interactionHint === "visit"
        ? "Visit"
        : "Explore";

  return (
    <AnimatePresence>
      {nearbyLabel && !activePanel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40"
        >
          <div className="px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-lg flex items-center gap-3">
            <kbd className="px-2.5 py-1 rounded-md bg-white/10 text-cyan-400 font-mono text-sm font-bold border border-white/10">
              E
            </kbd>
            <span className="text-white/80 text-sm">
              {action}{" "}
              <span className="text-cyan-400 font-medium">{nearbyLabel}</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
