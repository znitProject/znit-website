import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateRecruitPDF, generateRecruitHTML } from '@/lib/pdfGenerator';

// Resend 인스턴스 생성
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting을 위한 간단한 메모리 저장소 (프로덕션에서는 Redis 사용 권장)
const rateLimitMap = new Map<string, { count: number; resetTime: number; lastEmail: string; lastMessage: string }>();

// Rate limiting 함수 (IP + 이메일 + 메시지 기반)
function checkRateLimit(ip: string, email: string, message: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5분으로 단축
  const maxRequests = 10; // 5분당 최대 10회로 증가
  const emailCooldown = 1 * 60 * 1000; // 같은 이메일로 1분 간격으로 단축
  const messageCooldown = 30 * 1000; // 같은 메시지로 30초 간격으로 단축

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

// 전화번호 검증 강화
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    let body: any = {};

    // FormData 또는 JSON 처리
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const resume = formData.get('resume') as File;
      
      // 폼 데이터 처리
      body = {
        name: formData.get('name') as string || '지원자',
        email: formData.get('email') as string || 'test@example.com',
        phone: formData.get('phone') as string || '010-0000-0000',
        position: formData.get('position') as string || '지원 포지션',
        experience: formData.get('experience') as string || '',
        portfolio: formData.get('portfolio') as string || '',
        message: formData.get('message') as string || '',
        resume: resume ? '첨부됨' : '없음'
      };

      // 실제 파일 데이터 저장 (이메일 첨부용)
      if (resume) {
        const fileBuffer = Buffer.from(await resume.arrayBuffer());
        
        // 파일 크기 제한 (Gmail 102KB 제한 고려)
        const maxFileSize = 1024 * 1024; // 1MB로 증가
        
        if (fileBuffer.length > maxFileSize) {
          console.log('파일 크기 초과:', {
            fileName: resume.name,
            fileSize: fileBuffer.length,
            maxSize: maxFileSize
          });
          
          // 파일이 너무 큰 경우 첨부하지 않고 경고만 표시
          body.resumeFile = {
            name: resume.name,
            type: resume.type,
            data: null,
            tooLarge: true
          };
        } else {
          body.resumeFile = {
            name: resume.name,
            type: resume.type,
            data: fileBuffer // Buffer 형태로 저장
          };
        }
      }
    } else if (contentType?.includes('application/json')) {
      body = await request.json();
    } else {
      return NextResponse.json(
        { error: '잘못된 요청 형식입니다.' },
        { status: 400 }
      );
    }

    // 필수 필드 검증
    const { 
      name, 
      email, 
      phone, 
      position, 
      experience, 
      portfolio, 
      message,
      resume 
    } = body;

    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { error: '필수 정보를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 입력 데이터 정제 및 검증
    const sanitizedName = sanitizeInput(name);
    const sanitizedPosition = sanitizeInput(position);
    const sanitizedExperience = experience ? sanitizeInput(experience) : '';
    const sanitizedPortfolio = portfolio ? sanitizeInput(portfolio) : '';
    const sanitizedMessage = message ? sanitizeInput(message) : '';

    // 길이 제한 검증
    if (sanitizedName.length < 2 || sanitizedName.length > 50) {
      return NextResponse.json(
        { error: '이름은 2-50자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    if (sanitizedPosition.length < 2 || sanitizedPosition.length > 100) {
      return NextResponse.json(
        { error: '지원 포지션은 2-100자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length > 2000) {
      return NextResponse.json(
        { error: '자기소개는 2000자 이하여야 합니다.' },
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

    // 전화번호 형식 검증
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: '유효한 전화번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // Rate limiting 체크
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    if (!checkRateLimit(ip, email, sanitizedMessage)) {
      return NextResponse.json(
        { error: '너무 많은 요청이 발생했습니다. 15분 후에 다시 시도해주세요.' },
        { status: 429 }
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

    // 지원 데이터를 JSON 파일로 변환
    const applicationData = {
      timestamp: new Date().toISOString(),
      name: sanitizedName,
      email: email.toLowerCase(),
      phone: phone.replace(/\s/g, ''),
      position: sanitizedPosition,
      experience: sanitizedExperience,
      portfolio: sanitizedPortfolio,
      message: sanitizedMessage,
      resume: resume ? '첨부됨' : '없음',
      ip: ip,
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // 파일 정보만 저장 (PDF 생성 안함)
    const fileName = `application_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.json`;

    // 첨부파일 정보 로깅
    console.log('첨부파일 정보:', {
      hasResumeFile: !!body.resumeFile,
      fileName: body.resumeFile?.name,
      fileType: body.resumeFile?.type,
      contentType: body.resumeFile?.type || 'application/octet-stream',
      fileSize: body.resumeFile?.data ? body.resumeFile.data.length : 0, // Buffer 크기
      isBuffer: body.resumeFile?.data instanceof Buffer,
      bufferType: typeof body.resumeFile?.data
    });

    // 첨부파일 객체 생성
    const attachment = body.resumeFile && !body.resumeFile.tooLarge ? {
      filename: body.resumeFile.name,
      content: body.resumeFile.data.toString('base64'),
      contentType: body.resumeFile.type || 'application/octet-stream'
    } : null;

    console.log('첨부파일 객체:', {
      hasAttachment: !!attachment,
      attachmentDetails: attachment ? {
        filename: attachment.filename,
        contentType: attachment.contentType,
        contentLength: attachment.content.length
      } : null,
      fileTooLarge: body.resumeFile?.tooLarge || false
    });

    // HR 담당자에게 지원서 전송
    console.log('이메일 전송 시작:', {
      to: process.env.HR_EMAIL || process.env.CONTACT_EMAIL || 'hr@znit.com',
      subject: `[ZNIT 채용지원] ${sanitizedPosition} - ${sanitizedName}`,
      hasAttachment: !!attachment,
      attachmentName: attachment?.filename,
      isTestMode: process.env.FROM_EMAIL?.includes('resend.dev') || false
    });

    // 테스트 모드에서도 첨부파일을 전송하도록 수정
    const emailData: any = {
      from: process.env.FROM_EMAIL || 'noreply@znit.com',
      to: process.env.HR_EMAIL || process.env.CONTACT_EMAIL || 'hr@znit.com',
      replyTo: email,
      subject: `[ZNIT 채용지원] ${sanitizedPosition} - ${sanitizedName}`,
      html: `
        <h2>지원서 이메일이 날라왔습니다.</h2>
        
        <p>파일 여기있습니다 다운로드해주세요</p>
        
        <p><strong>첨부파일:</strong> ${attachment ? attachment.filename : (body.resumeFile?.tooLarge ? `${body.resumeFile.name} (파일 크기 초과로 첨부되지 않음)` : '없음')}</p>
        
        ${body.resumeFile?.tooLarge ? '<p style="color: red;"><strong>⚠️ 경고:</strong> 파일 크기가 1MB를 초과하여 첨부되지 않았습니다.</p>' : ''}
        
        <hr>
        <p><small>IP: ${ip} | 시간: ${applicationData.timestamp}</small></p>
      `,
      text: `
        지원서 이메일이 날라왔습니다.
        
        파일 여기있습니다 다운로드해주세요
        
        첨부파일: ${attachment ? attachment.filename : (body.resumeFile?.tooLarge ? `${body.resumeFile.name} (파일 크기 초과로 첨부되지 않음)` : '없음')}
        
        ${body.resumeFile?.tooLarge ? '⚠️ 경고: 파일 크기가 1MB를 초과하여 첨부되지 않았습니다.' : ''}
        
        IP: ${ip}
        시간: ${applicationData.timestamp}
      `
    };

    // 테스트 모드에서도 첨부파일을 전송하도록 수정
    if (attachment) {
      emailData.attachments = [attachment];
      console.log('첨부파일 포함하여 전송');
    } else {
      console.log('첨부파일 없이 전송');
    }

    const { data: hrData, error: hrError } = await resend.emails.send(emailData);

    console.log('이메일 전송 완료:', {
      success: !hrError,
      emailId: hrData?.id,
      error: hrError,
      attachmentSent: attachment ? '예' : '아니오',
      attachmentCount: attachment ? 1 : 0
    });

    if (hrError) {
      console.error('HR 이메일 전송 오류:', hrError);
      return NextResponse.json(
        { error: '지원서 전송 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    console.log('채용 지원 성공:', { 
      hrData,
      resumeFile: body.resumeFile ? `첨부됨: ${body.resumeFile.name}` : '없음'
    });

    return NextResponse.json(
      { message: '채용 지원이 성공적으로 접수되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('채용 지원 접수 오류:', error);
    
    // 에러 로깅 (민감한 정보 제외)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Recruit application error:', {
      timestamp: new Date().toISOString(),
      error: errorMessage,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown'
    });

    return NextResponse.json(
      { error: '지원 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 