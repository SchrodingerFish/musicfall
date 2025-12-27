import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出（Cloudflare Pages 需要）
  images: {
    unoptimized: true,
  },
  devIndicators: {
    buildActivity: false, // Hide the build indicator
  },
};

export default nextConfig;
