import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 关键配置：启用静态导出
  images: {
    unoptimized: true,  // 必须禁用图片优化（Cloudflare Pages不支持）
  },
};

export default nextConfig;
