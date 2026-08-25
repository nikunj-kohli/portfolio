import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikunj Kohli | Developer's Observatory",
  description:
    "An immersive 3D portfolio showcasing projects, skills, and experience. Explore Nikunj Kohli's Developer Observatory.",
  openGraph: {
    title: "Nikunj Kohli | Developer's Observatory",
    description:
      "An immersive 3D portfolio — walk through projects, social links, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full h-full overflow-hidden">{children}</body>
    </html>
  );
}
