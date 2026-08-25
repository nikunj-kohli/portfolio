import type { Experience, Skill } from "@/utils/models";

export const about = {
  name: "Nikunj Kohli",
  title: "Full-Stack Developer & Problem Solver",
  tagline: "The Developer's Observatory",
  bio: "I'm a passionate developer who loves building immersive web experiences. With 700+ LeetCode problems solved and a 1600+ rating, I bring strong algorithmic thinking to every project. When I'm not coding, you'll find me exploring new tech stacks and pushing the boundaries of what's possible on the web.",
  leetcode: {
    rating: "1600+",
    solved: "700+",
  },
  codeforces: {
    rating: "1400+",
  },
  resumeUrl: "/resume/NikunjKohli.pdf",
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
      title: "Full-Stack Developer",
      company: "Freelance & Open Source",
      period: "2022 — Present",
      description:
        "Building full-stack applications, real-time systems, and interactive 3D web experiences.",
    },
    {
      title: "Competitive Programmer",
      company: "LeetCode & Codeforces",
      period: "2020 — Present",
      description:
        "1600+ LeetCode rating with 700+ problems solved across algorithms, data structures, and system design.",
    },
    {
      title: "Open Source Contributor",
      company: "Various Projects",
      period: "2021 — Present",
      description:
        "Contributing to React, Node.js, and developer tooling projects.",
    },
  ] satisfies Experience[],
  position: { x: 0, z: -28 },
};
