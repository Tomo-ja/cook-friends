/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['spoonacular.com'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
    compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  swcMinify: true,
}

module.exports = nextConfig
