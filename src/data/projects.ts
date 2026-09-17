import type { Project } from "@/utils/models";

export const projects: Project[] = [
  {
    id: "unify",
    name: "Unify",
    slug: "unify",
    description:
      "Multi-platform campus management platform connecting students, faculty, and events in one unified hub across Android, iOS, Web, and desktop.",
    techStack: ["Flutter", "Firebase", "Dart", "Android", "iOS", "Web"],
    metrics: ["72 Commits", "Multi-platform", "Firebase Integration"],
    color: "#22c55e",
    demoUrl:
      "https://github.com/nikunj-kohli/Unify/releases/download/apk/app-arm64-v8a-release.apk",
    demoLabel: "Download APK",
    githubUrl: "https://github.com/nikunj-kohli/Unify",
    position: { x: 16, z: -5 },
  },
  {
    id: "gossip",
    name: "Gossip",
    slug: "gossip",
    description:
      "Production-oriented social platform with communities, feed ranking modes, request-based messaging, media uploads, realtime sockets, gamification hooks, and hardened API runtime.",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "Redis", "Socket.IO", "Docker"],
    metrics: ["45 Commits", "Dockerized", "Real-time Features"],
    color: "#9333ea",
    demoUrl: "https://gossip-3a1.pages.dev/",
    githubUrl: "https://github.com/nikunj-kohli/Gossip",
    position: { x: 24, z: -5 },
  },
  {
    id: "queue-away",
    name: "Queue Away",
    slug: "queue-away",
    description:
      "Real-time queue management and appointment booking platform with live wait times and WebSocket updates.",
    techStack: ["Node.js", "Express", "Socket.io", "React", "Supabase"],
    metrics: ["8 DB tables", "WebSocket rooms", "10+ REST endpoints"],
    color: "#ff6600",
    demoUrl: "https://queue-away.pages.dev/",
    githubUrl: "https://github.com/nikunj-kohli/Gossip",
    position: { x: 16, z: 3 },
  },
  {
    id: "duel",
    name: "Duel",
    slug: "duel",
    description:
      "Collaborative coding platform where competition meets learning with live pair programming, tournament modes, AI-powered learning, and enterprise-grade anti-cheat systems.",
    techStack: ["React", "Node.js", "TypeScript", "Monaco Editor", "Socket.IO", "Docker", "PostgreSQL", "MongoDB"],
    metrics: ["5 Commits", "AI Integration", "Anti-cheat System"],
    color: "#ef4444",
    // Duel is not deployed yet — no demoUrl.
    githubUrl: "https://github.com/nikunj-kohli/Duel",
    position: { x: 24, z: 3 },
  },
];
