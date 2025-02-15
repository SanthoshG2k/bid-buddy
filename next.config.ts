import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        hostname: 'pub-e4e62cf1873d45ac8ecffb0aa9cd508b.r2.dev',
        protocol: 'https',
        port: '',
      }
    ]
  }
};

export default nextConfig;
