export type PanelType = "project" | "about" | "contact" | "resume" | "customization" | null;

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  metrics: string[];
  color: string;
  /** Live deployment / download link. Omit when the project isn't deployed. */
  demoUrl?: string;
  /** Label shown on the demo button (e.g. "Download APK"). Defaults to "View Demo". */
  demoLabel?: string;
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
