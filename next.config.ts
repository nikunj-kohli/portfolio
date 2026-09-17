import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export -> deployable anywhere (Cloudflare Pages, GitHub Pages, etc.)
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  compress: true,
  experimental: {
    optimizePackageImports: ['@react-three/drei', '@react-three/fiber', '@react-three/rapier', 'three']
  }
};

export default nextConfig;
