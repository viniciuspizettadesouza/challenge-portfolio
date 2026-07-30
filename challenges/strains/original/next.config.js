/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["admin.leafwell.com"],
  },
};

module.exports = nextConfig;
