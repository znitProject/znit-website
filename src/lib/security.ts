// 보안 관련 유틸리티 함수들

/**
 * 입력값 정제 (XSS 방지)
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // HTML 태그 제거
    .replace(/javascript:/gi, '') // JavaScript 프로토콜 제거
    .replace(/on\w+=/gi, '') // 이벤트 핸들러 제거
    .trim();
}

/**
 * 이메일 형식 검증
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * 파일 확장자 검증
 */
export function validateFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

/**
 * 파일 크기 검증 (MB 단위)
 */
export function validateFileSize(sizeInBytes: number, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return sizeInBytes <= maxSizeInBytes;
}

/**
 * IP 주소 검증
 */
export function validateIP(ip: string): boolean {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * CSRF 토큰 생성
 */
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * 비밀번호 강도 검증
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // 길이 검증
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('비밀번호는 최소 8자 이상이어야 합니다.');
  }

  // 대문자 포함
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('대문자를 포함해야 합니다.');
  }

  // 소문자 포함
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('소문자를 포함해야 합니다.');
  }

  // 숫자 포함
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('숫자를 포함해야 합니다.');
  }

  // 특수문자 포함
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push('특수문자를 포함해야 합니다.');
  }

  return {
    isValid: score >= 4,
    score,
    feedback
  };
}

/**
 * Rate Limiting 체크
 */
export class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 5, windowMs: number = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userData = this.requests.get(identifier);

    if (!userData || now > userData.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }

    if (userData.count >= this.maxRequests) {
      return false;
    }

    userData.count++;
    return true;
  }

  getRemainingTime(identifier: string): number {
    const userData = this.requests.get(identifier);
    if (!userData) return 0;
    
    const remaining = userData.resetTime - Date.now();
    return Math.max(0, remaining);
  }
}

/**
 * 로깅 유틸리티 (민감한 정보 제외)
 */
export function secureLog(message: string, data?: any): void {
  const sanitizedData = data ? JSON.stringify(data, (key, value) => {
    // 민감한 정보 마스킹
    const sensitiveKeys = ['password', 'token', 'key', 'secret', 'api_key'];
    if (sensitiveKeys.some(sensitiveKey => key.toLowerCase().includes(sensitiveKey))) {
      return '[REDACTED]';
    }
    return value;
  }) : '';

  console.log(`[SECURE] ${message}`, sanitizedData);
} 