"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Palette } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

const COLOR_OPTIONS = {
  skin: [
    { name: "Default", value: "#F5C518" },
    { name: "Light", value: "#FFE4C4" },
    { name: "Medium", value: "#D2B48C" },
    { name: "Dark", value: "#8B4513" },
    { name: "Blue", value: "#4A90E2" },
    { name: "Green", value: "#50E3C2" },
  ],
  suit: [
    { name: "Black", value: "#1a1a1a" },
    { name: "Navy", value: "#1a237e" },
    { name: "Purple", value: "#4a148c" },
    { name: "Red", value: "#b71c1c" },
    { name: "Green", value: "#1b5e20" },
    { name: "Blue", value: "#0d47a1" },
  ],
  shirt: [
    { name: "White", value: "#ffffff" },
    { name: "Cyan", value: "#00f5ff" },
    { name: "Pink", value: "#ff69b4" },
    { name: "Yellow", value: "#ffd700" },
    { name: "Green", value: "#50fa7b" },
    { name: "Purple", value: "#9b59b6" },
    { name: "Orange", value: "#ff7f50" },
    { name: "Red", value: "#ff6b6b" },
  ],
};

export function CustomizationPanel() {
  const customizationUnlocked = useGameStore((s) => s.customizationUnlocked);
  const characterColors = useGameStore((s) => s.characterColors);
  const setCharacterColors = useGameStore((s) => s.setCharacterColors);
  const activePanel = useGameStore((s) => s.activePanel);
  const closePanel = useGameStore((s) => s.closePanel);

  if (!customizationUnlocked) return null;

  return (
    <AnimatePresence>
      {activePanel === "customization" && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed left-0 top-0 h-full w-full max-w-md z-50 p-6 flex flex-col"
        >
          <div
            className={cn(
              "flex-1 rounded-2xl border border-white/10 p-6 overflow-y-auto",
              "bg-slate-900/80 backdrop-blur-xl shadow-2xl"
            )}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Palette size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Character Customization</h2>
                  <p className="text-xs text-cyan-400/80">🪐 Planet Easter Egg Unlocked!</p>
                </div>
              </div>
              <button
                onClick={closePanel}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Skin Color
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_OPTIONS.skin.map((color) => (
                    <button
                      key={color.value}
                      onClick={() =>
                        setCharacterColors({ ...characterColors, skin: color.value })
                      }
                      className={cn(
                        "aspect-square rounded-lg border-2 transition-all",
                        characterColors.skin === color.value
                          ? "border-cyan-400 scale-110"
                          : "border-white/20 hover:border-white/40"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Suit Color
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_OPTIONS.suit.map((color) => (
                    <button
                      key={color.value}
                      onClick={() =>
                        setCharacterColors({ ...characterColors, suit: color.value })
                      }
                      className={cn(
                        "aspect-square rounded-lg border-2 transition-all",
                        characterColors.suit === color.value
                          ? "border-cyan-400 scale-110"
                          : "border-white/20 hover:border-white/40"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Shirt Color
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_OPTIONS.shirt.map((color) => (
                    <button
                      key={color.value}
                      onClick={() =>
                        setCharacterColors({ ...characterColors, shirt: color.value })
                      }
                      className={cn(
                        "aspect-square rounded-lg border-2 transition-all",
                        characterColors.shirt === color.value
                          ? "border-cyan-400 scale-110"
                          : "border-white/20 hover:border-white/40"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <p className="text-sm text-white/60 text-center">
                🎉 You discovered the secret planet! Customize your character to celebrate.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}