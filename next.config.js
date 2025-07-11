/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shopify.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // Removed optimizeCss to fix build issues
  },
  serverExternalPackages: ['@sendgrid/mail'],
};

module.exports = nextConfig;