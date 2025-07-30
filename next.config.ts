import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // XSS 방지
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // 클릭재킹 방지
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // MIME 타입 스니핑 방지
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // 리퍼러 정책
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // 권한 정책
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // HSTS (HTTPS 강제)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ]
      }
    ];
  },
  // 이미지 도메인 허용
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // 보안 관련 환경변수
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
