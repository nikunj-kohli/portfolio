"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useGameStore } from "@/store/gameStore";

export function UnlockNotification() {
  const showUnlockNotification = useGameStore((s) => s.showUnlockNotification);
  const hideUnlockNotification = useGameStore((s) => s.hideUnlockNotification);
  const openCustomization = useGameStore((s) => s.openCustomization);

  return (
    <AnimatePresence>
      {showUnlockNotification && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
        >
          <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={hideUnlockNotification}
              className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Sparkles size={32} className="text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">
                  🪐 Secrets Unlocked!
                </h3>
                <p className="text-sm text-white/70 mb-3">
                  You found the hidden planet! Character customization and sports car unlocked.
                </p>
                <button
                  onClick={() => {
                    hideUnlockNotification();
                    openCustomization();
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-medium text-sm transition-all"
                >
                  Customize Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}