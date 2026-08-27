/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
          return [
            {
                      source: '/book',
                      destination: 'https://calendly.com/adil-ghazali-six50',
                      permanent: false,
            },
                ];
    },
    async rewrites() {
          return [
            {
                      source: '/risk-analyzer',
                      destination: '/risk-analyzer.html',
            },
                ];
    },
};

export default nextConfig;
