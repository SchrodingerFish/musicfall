import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出（Cloudflare Workers 需要）
  output: 'export',
  
  // 图片配置（静态导出必须）
  images: {
    unoptimized: true,
  },
  
  // 开发时 sourcemap
  productionBrowserSourceMaps: false,
  
  // 基础路径
  basePath: '',
};

export default nextConfig;
