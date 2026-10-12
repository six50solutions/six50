/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bundle newsletter issue files with the route that serves them.
  outputFileTracingIncludes: {
    '/api/ai-arbitrage-issue/[file]': ['./public/ai-arbitrage/**/*'],
  },
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
    return {
      // Checked before /public files, so every newsletter issue passes through
      // the compliance transform (disclaimer, contrast, no CPA title).
      beforeFiles: [
        {
          source: '/ai-arbitrage/:file([A-Za-z0-9_-]+\\.html)',
          destination: '/api/ai-arbitrage-issue/:file',
        },
      ],
      afterFiles: [
      {
        source: '/risk-analyzer',
        destination: '/risk-analyzer.html',
      },
      {
        source: '/risk-analyzer/thanks',
        destination: '/risk-analyzer-thanks.html',
      },
      ],
    };
  },
};

export default nextConfig;
