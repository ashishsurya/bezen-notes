/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains:["img.icons8.com"]
  },
  typescript: {
    ignoreBuildErrors:true
  }
}

module.exports = nextConfig
