import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateContactPDF, generateContactHTML } from '@/lib/pdfGenerator';

// Resend 인스턴스 생성
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting을 위한 간단한 메모리 저장소 (프로덕션에서는 Redis 사용 권장)
const rateLimitMap = new Map<string, { count: number; resetTime: number; lastEmail: string; lastMessage: string }>();

// Rate limiting 함수 (IP + 이메일 + 메시지 기반)
function checkRateLimit(ip: string, email: string, message: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15분
  const maxRequests = 3; // 15분당 최대 3회
  const emailCooldown = 5 * 60 * 1000; // 같은 이메일로 5분 간격
  const messageCooldown = 2 * 60 * 1000; // 같은 메시지로 2분 간격

  const userData = rateLimitMap.get(ip);
  
  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, { 
      count: 1, 
      resetTime: now + windowMs,
      lastEmail: email,
      lastMessage: message
    });
    return true;
  }

  // 같은 이메일로 연속 전송 방지
  if (userData.lastEmail === email && now - userData.resetTime + windowMs < emailCooldown) {
    return false;
  }

  // 같은 메시지로 연속 전송 방지
  if (userData.lastMessage === message && now - userData.resetTime + windowMs < messageCooldown) {
    return false;
  }

  if (userData.count >= maxRequests) {
    return false;
  }

  userData.count++;
  userData.lastEmail = email;
  userData.lastMessage = message;
  return true;
}

// 입력 데이터 정제 함수
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // HTML 태그 제거
    .replace(/javascript:/gi, '') // JavaScript 프로토콜 제거
    .replace(/on\w+=/gi, '') // 이벤트 핸들러 제거
    .substring(0, 1000); // 최대 길이 제한
}

// 이메일 주소 검증 강화
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  try {
    // Content-Type 검증
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: '잘못된 요청 형식입니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // 필수 필드 검증
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Rate limiting 체크 (이메일 검증 후)
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    if (!checkRateLimit(ip, email, message)) {
      return NextResponse.json(
        { error: '너무 많은 요청이 발생했습니다. 15분 후에 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    // 입력 데이터 정제 및 검증
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // 길이 제한 검증
    if (sanitizedName.length < 2 || sanitizedName.length > 50) {
      return NextResponse.json(
        { error: '이름은 2-50자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    if (sanitizedSubject.length < 5 || sanitizedSubject.length > 100) {
      return NextResponse.json(
        { error: '제목은 5-100자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      return NextResponse.json(
        { error: '메시지는 10-1000자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Resend API 키 검증
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API 키가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 폼 데이터를 JSON 파일로 변환 (민감한 정보 제거)
    const formData = {
      timestamp: new Date().toISOString(),
      name: sanitizedName,
      email: email.toLowerCase(), // 이메일 정규화
      subject: sanitizedSubject,
      message: sanitizedMessage,
      ip: ip, // 스팸 방지를 위한 IP 기록
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // PDF 파일 생성
    const pdfBuffer = generateContactPDF(formData);
    const pdfFileName = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.pdf`;
    
    // JSON 파일도 함께 생성
    const jsonData = JSON.stringify(formData, null, 2);
    const jsonFileName = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.json`;

    // Resend로 이메일 전송
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@znit.com',
      to: process.env.CONTACT_EMAIL || 'contact@znit.com',
      replyTo: email, // 사용자가 답장할 수 있도록 설정
      subject: `[ZNIT 문의] ${sanitizedSubject}`,
      html: `
        <h2>ZNIT 웹사이트 문의</h2>
        <p><strong>이름:</strong> ${sanitizedName}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>제목:</strong> ${sanitizedSubject}</p>
        <p><strong>메시지:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>IP: ${ip} | 시간: ${formData.timestamp}</small></p>
        <p><small>문의서가 PDF 파일과 JSON 파일로 첨부되었습니다.</small></p>
      `,
      text: `
        이름: ${sanitizedName}
        이메일: ${email}
        제목: ${sanitizedSubject}
        메시지: ${sanitizedMessage}
        IP: ${ip}
        시간: ${formData.timestamp}
      `,
              attachments: [
          {
            filename: pdfFileName,
            content: pdfBuffer.toString('base64')
          },
          {
            filename: jsonFileName,
            content: Buffer.from(jsonData).toString('base64')
          }
        ]
    });

    if (error) {
      console.error('Resend 이메일 전송 오류:', error);
      return NextResponse.json(
        { error: '이메일 전송 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    console.log('문의 이메일 전송 성공:', data);

    return NextResponse.json(
      { message: '문의가 성공적으로 전송되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API 오류:', error);
    
    // 에러 로깅 (민감한 정보 제외)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Contact form error:', {
      timestamp: new Date().toISOString(),
      error: errorMessage,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown'
    });

    return NextResponse.json(
      { error: '문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 