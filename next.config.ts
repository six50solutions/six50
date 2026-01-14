import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/book',
        destination: 'https://calendly.com/adil-ghazali-six50',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
