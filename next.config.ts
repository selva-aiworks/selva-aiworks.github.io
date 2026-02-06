import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles image optimization automatically
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
