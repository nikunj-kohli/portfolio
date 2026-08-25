import type { ContactMethod } from "@/utils/models";

export const contacts: ContactMethod[] = [
  {
    id: "email",
    name: "Email",
    value: "nikunj.kohli.dev@gmail.com",
    href: "mailto:nikunj.kohli.dev@gmail.com",
    icon: "mail",
    position: { x: -4, z: 26 },
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
    icon: "message-circle",
    position: { x: 4, z: 26 },
  },
  {
    id: "discord",
    name: "Discord",
    value: "nikunj_kohli",
    href: "https://discord.com",
    icon: "gamepad-2",
    position: { x: 0, z: 30 },
  },
];
