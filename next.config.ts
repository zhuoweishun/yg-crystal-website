import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  // 确保静态资源正确处理
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
}

export default nextConfig
