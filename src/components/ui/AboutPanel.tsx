"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { about } from "@/data/about";
import { cn } from "@/lib/utils";

export function AboutPanel() {
  const activePanel = useGameStore((s) => s.activePanel);
  const closePanel = useGameStore((s) => s.closePanel);

  return (
    <AnimatePresence>
      {activePanel === "about" && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-x-0 bottom-0 z-50 p-6 flex justify-center"
        >
          <div
            className={cn(
              "w-full max-w-2xl rounded-2xl border border-white/10 p-8 max-h-[70vh] overflow-y-auto",
              "bg-slate-900/85 backdrop-blur-xl shadow-2xl"
            )}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white">{about.name}</h2>
                <p className="text-cyan-400 mt-1">{about.title}</p>
              </div>
              <button
                onClick={closePanel}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-white/70 mb-8 leading-relaxed">{about.bio}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4 text-center">
                <p className="text-2xl font-bold text-orange-400">
                  {about.leetcode.rating}
                </p>
                <p className="text-sm text-white/50">LeetCode Rating</p>
              </div>
              <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4 text-center">
                <p className="text-2xl font-bold text-orange-400">
                  {about.leetcode.solved}
                </p>
                <p className="text-sm text-white/50">Problems Solved</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                Skills
              </h3>
              <div className="space-y-3">
                {about.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-white/40">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-green-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                Experience
              </h3>
              <div className="space-y-4">
                {about.experience.map((exp) => (
                  <div
                    key={exp.title}
                    className="border-l-2 border-cyan-400/30 pl-4"
                  >
                    <h4 className="text-white font-medium">{exp.title}</h4>
                    <p className="text-cyan-400/70 text-sm">
                      {exp.company} · {exp.period}
                    </p>
                    <p className="text-white/50 text-sm mt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
