import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move 'serverComponentsExternalPackages' to 'serverExternalPackages'
  serverExternalPackages: ["pdf-parse"],

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("canvas");
    }
    return config;
  },
};

export default nextConfig;
