import type { Experience, Skill } from "@/utils/models";

export const about = {
  name: "Nikunj Kohli",
  title: "Full-Stack Developer & DSA Problem Solver",
  tagline: "The Developer's Observatory",
  bio: "Full-stack developer and DSA problem solver, studying Software Product Engineering at Chitkara (Kalvium); learning-first and collaboration-minded. I love building immersive web experiences and solving complex algorithmic problems. With 700+ LeetCode problems solved and a 1600+ rating, I bring strong algorithmic thinking to every project. When I'm not coding, you'll find me exploring new tech stacks and pushing the boundaries of what's possible on the web.",
  leetcode: {
    rating: "1600+",
    solved: "700+",
  },
  codeforces: {
    rating: "1400+",
  },
  resumeUrl: "https://drive.google.com/file/d/1QdzxQvoFgHlnHUOnL3__01sFKzVw5H3D/view?usp=sharing",
  skills: [
    { name: "TypeScript", level: 95 },
    { name: "React / Next.js", level: 92 },
    { name: "Node.js", level: 88 },
    { name: "Three.js / WebGL", level: 85 },
    { name: "System Design", level: 80 },
    { name: "Python", level: 78 },
    { name: "PostgreSQL", level: 82 },
    { name: "DevOps / Docker", level: 75 },
  ] satisfies Skill[],
  experience: [
    {
      title: "Software Product Engineering Student",
      company: "Chitkara University (Kalvium)",
      period: "2024 — Present",
      description:
        "Studying Software Product Engineering with focus on full-stack development, algorithms, and collaborative learning.",
    },
    {
      title: "Full-Stack Developer",
      company: "Freelance & Open Source",
      period: "2022 — Present",
      description:
        "Building full-stack applications, real-time systems, and interactive 3D web experiences. 52+ public repositories on GitHub.",
    },
    {
      title: "Competitive Programmer",
      company: "LeetCode & Codeforces",
      period: "2020 — Present",
      description:
        "1600+ LeetCode rating with 700+ problems solved across algorithms, data structures, and system design. Active participant in coding competitions.",
    },
    {
      title: "Open Source Contributor",
      company: "GitHub Community",
      period: "2021 — Present",
      description:
        "Contributing to various open source projects and maintaining active repositories with 16 followers and growing community engagement.",
    },
  ] satisfies Experience[],
  position: { x: 0, z: -28 },
};
