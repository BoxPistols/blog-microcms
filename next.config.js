// next.config.js
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["images.microcms-assets.io"],
  },
};

module.exports = nextConfig;
