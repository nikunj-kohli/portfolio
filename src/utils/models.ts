export type PanelType = "project" | "about" | "contact" | "resume" | null;

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  metrics: string[];
  color: string;
  demoUrl: string;
  githubUrl: string;
  position: { x: number; z: number };
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  position: { x: number; z: number };
}

export interface ContactMethod {
  id: string;
  name: string;
  value: string;
  href: string;
  icon: string;
  position: { x: number; z: number };
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}
