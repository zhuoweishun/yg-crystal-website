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
  // 允许开发环境跨域访问
  allowedDevOrigins: ['192.168.50.160', 'localhost', '127.0.0.1'],
  // 确保静态资源正确处理
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig
