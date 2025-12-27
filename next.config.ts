import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出（Cloudflare Pages 需要）
  images: {
    unoptimized: true,  // Cloudflare Pages 需要禁用图片优化
  },
};

export default nextConfig;
