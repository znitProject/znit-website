import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ===== 보안 헤더 추가 =====
  
  // DNS 프리페치 비활성화 - DNS 스푸핑 공격 방지
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  
  // 파일 다운로드 옵션 제한 - 악성 파일 실행 방지
  response.headers.set('X-Download-Options', 'noopen');
  
  // 크로스 도메인 정책 제한 - 크로스 사이트 공격 방지
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // ===== CSP (Content Security Policy) 헤더 추가 =====
  const cspHeader = [
    // 기본적으로 모든 리소스는 같은 도메인에서만 로드 허용
    "default-src 'self'",
    
    // 스크립트는 같은 도메인, 인라인, eval 허용 (GSAP 등 라이브러리용)
    // Google Tag Manager도 허용 (분석용)
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    
    // 스타일은 같은 도메인, 인라인, Google Fonts 허용
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    
    // 폰트는 같은 도메인, Google Fonts 허용
    "font-src 'self' https://fonts.gstatic.com",
    
    // 이미지는 같은 도메인, data URL, HTTPS, blob 허용
    "img-src 'self' data: https: blob:",
    
    // 연결은 같은 도메인, Resend API 허용 (이메일 전송용)
    "connect-src 'self' https://api.resend.com",
    
    // iframe 완전 차단 - 클릭재킹 방지
    "frame-src 'none'",
    
    // object, embed 태그 차단 - 악성 플러그인 방지
    "object-src 'none'",
    
    // base 태그는 같은 도메인만 허용 - 상대 경로 공격 방지
    "base-uri 'self'",
    
    // 폼 제출은 같은 도메인만 허용 - CSRF 방지
    "form-action 'self'",
    
    // iframe에 의한 임베딩 완전 차단 - 클릭재킹 방지
    "frame-ancestors 'none'",
    
    // HTTP를 HTTPS로 자동 업그레이드 - 중간자 공격 방지
    "upgrade-insecure-requests"
  ].join('; ');

  response.headers.set('Content-Security-Policy', cspHeader);

  // ===== 봇 및 스크래퍼 차단 =====
  const userAgent = request.headers.get('user-agent') || '';
  
  // 의심스러운 봇/스크래퍼 목록
  const suspiciousBots = [
    'bot', 'crawler', 'spider', 'scraper',  // 일반적인 봇
    'curl', 'wget',                         // 파일 다운로더
    'python', 'java', 'perl', 'ruby', 'php', 'go-http-client'  // 프로그래밍 언어 기반 스크래퍼
  ];

  // User-Agent에 의심스러운 키워드가 포함되어 있는지 확인
  const isSuspiciousBot = suspiciousBots.some(bot => 
    userAgent.toLowerCase().includes(bot)
  );

  // 의심스러운 봇이면 접근 차단
  if (isSuspiciousBot) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // ===== API 요청에 대한 추가 보안 =====
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // 클라이언트 IP 주소 추출 (프록시 환경 고려)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Rate Limiting 키 생성 (실제로는 Redis 등을 사용하는 것이 좋습니다)
    const rateLimitKey = `rate_limit:${ip}`;
    
    // POST 요청의 Content-Type 검증
    const contentType = request.headers.get('content-type');
    if (request.method === 'POST' && contentType && !contentType.includes('application/json')) {
      // JSON이 아닌 Content-Type으로 POST 요청 시 차단
      return new NextResponse('Invalid Content-Type', { status: 400 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * 미들웨어가 적용될 경로 설정
     * 
     * 제외되는 경로들:
     * - _next/static: Next.js 정적 파일들
     * - _next/image: Next.js 이미지 최적화 파일들  
     * - favicon.ico: 파비콘 파일
     * - public/: 공개 폴더 내 파일들
     * 
     * 이렇게 설정하면 성능에 영향을 주지 않으면서
     * 필요한 페이지들에만 보안 기능을 적용할 수 있습니다.
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 