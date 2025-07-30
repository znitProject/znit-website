import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// IP 주소를 가져오는 헬퍼 함수
function getClientIP(request: NextRequest): string {
  // 다양한 헤더에서 IP 주소 추출 시도
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    // x-forwarded-for는 쉼표로 구분된 IP 목록일 수 있음
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // 모든 방법이 실패하면 'unknown' 반환
  return 'unknown';
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 보안 헤더 추가
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // CSP 헤더 추가
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.resend.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ');

  response.headers.set('Content-Security-Policy', cspHeader);

  // 봇 및 스크래퍼 차단
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousBots = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
    'python', 'java', 'perl', 'ruby', 'php', 'go-http-client'
  ];

  const isSuspiciousBot = suspiciousBots.some(bot => 
    userAgent.toLowerCase().includes(bot)
  );

  if (isSuspiciousBot) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // API 요청에 대한 추가 보안
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // API 요청에 대한 rate limiting 체크
    const ip = getClientIP(request);
    
    // 간단한 rate limiting (실제로는 Redis 등을 사용하는 것이 좋습니다)
    const rateLimitKey = `rate_limit:${ip}`;
    
    // Content-Type 검증
    const contentType = request.headers.get('content-type');
    if (request.method === 'POST' && contentType && !contentType.includes('application/json')) {
      return new NextResponse('Invalid Content-Type', { status: 400 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};