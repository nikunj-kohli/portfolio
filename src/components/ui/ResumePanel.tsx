"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { about } from "@/data/about";
import { cn } from "@/lib/utils";

/** Google Drive /view links send X-Frame-Options: SAMEORIGIN and never embed.
 *  /preview is the embeddable variant. */
function drivePreviewUrl(url: string): string {
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
}
const RESUME_EMBED_URL = drivePreviewUrl(about.resumeUrl);

export function ResumePanel() {
  const activePanel = useGameStore((s) => s.activePanel);
  const closePanel = useGameStore((s) => s.closePanel);

  return (
    <AnimatePresence>
      {activePanel === "resume" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePanel}
          />

          <div
            className={cn(
              "relative w-full max-w-4xl h-[85vh] flex flex-col rounded-2xl border border-white/10 overflow-hidden",
              "bg-slate-900/95 backdrop-blur-xl shadow-2xl"
            )}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <p className="text-xs uppercase tracking-widest text-green-400/80 font-semibold">
                  Flag Captured
                </p>
                <h2 className="text-xl font-bold text-white">{about.name}&apos;s Resume</h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={about.resumeUrl}
                  download
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                >
                  <Download size={16} />
                  Download
                </a>
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-400 text-white text-sm font-medium transition-colors"
                >
                  <ExternalLink size={16} />
                  Open
                </a>
                <button
                  onClick={closePanel}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <iframe
              src={RESUME_EMBED_URL}
              title="Nikunj Kohli Resume"
              className="flex-1 w-full bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
