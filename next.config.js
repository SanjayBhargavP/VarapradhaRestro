const path = require('path');
const isProd = process.env.NODE_ENV === 'production';


/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: 'export',
  // Ensure directories end with a slash (nice for Pages):
  trailingSlash: true,
  basePath:   '',
  assetPrefix: '',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
