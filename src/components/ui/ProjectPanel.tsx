"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, GitBranch } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

export function ProjectPanel() {
  const activePanel = useGameStore((s) => s.activePanel);
  const project = useGameStore((s) => s.activeProject);
  const closePanel = useGameStore((s) => s.closePanel);

  return (
    <AnimatePresence>
      {activePanel === "project" && project && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md z-50 p-6 flex flex-col"
        >
          <div
            className={cn(
              "flex-1 rounded-2xl border border-white/10 p-6 overflow-y-auto",
              "bg-slate-900/80 backdrop-blur-xl shadow-2xl"
            )}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div
                  className="w-3 h-3 rounded-full mb-3"
                  style={{ backgroundColor: project.color }}
                />
                <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              </div>
              <button
                onClick={closePanel}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/80 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
                Metrics
              </h3>
              <ul className="space-y-2">
                {project.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="text-white/70 text-sm flex items-center gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 mt-auto">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-sm font-medium"
              >
                <GitBranch size={16} />
                GitHub
              </a>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white transition-colors text-sm font-medium"
                style={{ backgroundColor: project.color }}
              >
                <ExternalLink size={16} />
                View Demo
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
