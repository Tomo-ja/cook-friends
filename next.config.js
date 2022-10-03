/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['spoonacular.com'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
  swcMinify: true,
}

module.exports = nextConfig
