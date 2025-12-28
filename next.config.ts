import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 启用静态导出（Cloudflare Pages 需要）
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'music.163.com',
      },
      {
        protocol: 'https',
        hostname: 'p1.music.126.net',
      },
      {
        protocol: 'https',
        hostname: 'p2.music.126.net',
      },
      {
        protocol: 'http',
        hostname: 'p1.music.126.net',
      },
      {
        protocol: 'http',
        hostname: 'p2.music.126.net',
      },
      {
        protocol: 'https',
        hostname: 'y.gtimg.cn',
      },
      {
        protocol: 'https', 
        hostname: 'imgessl.kugou.com'
      },
      {
        protocol: 'https',
        hostname: 'userimg.web.kugou.com'
      }, 
      {
        protocol: 'https',
        hostname: 'img.kwcdn.kuwo.cn'
      },
      {
         protocol: 'https',
         hostname: 'cdn.music.migu.cn'
      },
      {
          protocol: 'https',
          hostname: 'i.ytimg.com'
      }, 
      {
          protocol: 'https',
          hostname: 'i.scdn.co'
      }
    ],
  },
  devIndicators: false,
};

export default nextConfig;
