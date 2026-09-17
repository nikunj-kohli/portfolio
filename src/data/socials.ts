import type { SocialLink } from "@/utils/models";

export const socials: SocialLink[] = [
  {
    id: "leetcode",
    name: "LeetCode",
    url: "https://leetcode.com/xuozea",
    icon: "code",
    color: "#ffa116",
    position: { x: 5, z: 3 },
  },
  {
    id: "codeforces",
    name: "Codeforces",
    url: "https://codeforces.com/profile/xuozea",
    icon: "terminal",
    color: "#b91c1c",
    position: { x: -5, z: 3 },
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/nikunj-kohli",
    icon: "github",
    color: "#ffffff",
    position: { x: -16, z: -3 },
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/nikunj-/",
    icon: "linkedin",
    color: "#0077b5",
    position: { x: -18, z: -6 },
  },
];
