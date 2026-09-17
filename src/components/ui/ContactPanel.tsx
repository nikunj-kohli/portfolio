"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gamepad2, Copy, Check, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  "gamepad-2": Gamepad2,
};

export function ContactPanel() {
  const activePanel = useGameStore((s) => s.activePanel);
  const contact = useGameStore((s) => s.activeContact);
  const closePanel = useGameStore((s) => s.closePanel);
  const [copied, setCopied] = useState(false);

  const Icon = contact ? iconMap[contact.icon] || Mail : Mail;

  const handleCopy = () => {
    if (contact) {
      navigator.clipboard.writeText(contact.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {activePanel === "contact" && contact && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePanel}
          />
          <div
            className={cn(
              "relative w-full max-w-sm rounded-2xl border border-white/10 p-8 text-center",
              "bg-slate-900/90 backdrop-blur-xl shadow-2xl"
            )}
          >
            <button
              onClick={closePanel}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-6">
              <Icon size={28} className="text-cyan-400" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{contact.name}</h2>
            <p className="text-white/60 mb-6 font-mono text-sm">{contact.value}</p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-sm"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white transition-colors text-sm font-medium"
              >
                Open
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
