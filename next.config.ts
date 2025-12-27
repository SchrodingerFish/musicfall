import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除 output: 'export' 以支持 Cloudflare Pages Functions
  // 这样可以使用动态路由而不需要 generateStaticParams()
  images: {
    unoptimized: true,  // Cloudflare Pages 需要禁用图片优化
  },
};

export default nextConfig;
