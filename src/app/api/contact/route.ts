import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// SendGrid API 키 설정 (환경변수에서 가져옴)
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // 필수 필드 검증
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    const msg = {
      to: process.env.CONTACT_EMAIL || 'contact@znit.com', // 받는 사람
      from: process.env.FROM_EMAIL || 'noreply@znit.com', // 보내는 사람 (인증된 도메인)
      subject: `[ZNIT 문의] ${subject}`,
      text: `
        이름: ${name}
        이메일: ${email}
        제목: ${subject}
        메시지: ${message}
      `,
      html: `
        <h2>ZNIT 웹사이트 문의</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>제목:</strong> ${subject}</p>
        <p><strong>메시지:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: '문의가 성공적으로 전송되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return NextResponse.json(
      { error: '문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 