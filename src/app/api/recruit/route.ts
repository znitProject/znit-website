import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// SendGrid API 키 설정 (환경변수에서 가져옴)
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      position, 
      experience, 
      portfolio, 
      message,
      resume 
    } = await request.json();

    // 필수 필드 검증
    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { error: '필수 정보를 모두 입력해주세요.' },
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

    // 전화번호 형식 검증 (한국 전화번호)
    const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: '유효한 전화번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    const msg = {
      to: process.env.HR_EMAIL || process.env.CONTACT_EMAIL || 'hr@znit.com', // HR 담당자
      from: process.env.FROM_EMAIL || 'noreply@znit.com',
      subject: `[ZNIT 채용지원] ${position} - ${name}`,
      text: `
        채용 지원서
        
        지원자 정보:
        - 이름: ${name}
        - 이메일: ${email}
        - 전화번호: ${phone}
        - 지원 포지션: ${position}
        - 경력: ${experience || '미입력'}
        - 포트폴리오: ${portfolio || '미입력'}
        - 자기소개: ${message || '미입력'}
        - 이력서 첨부: ${resume ? '있음' : '없음'}
      `,
      html: `
        <h2>ZNIT 채용 지원서</h2>
        
        <h3>지원자 정보</h3>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">이름</td>
            <td style="padding: 8px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">이메일</td>
            <td style="padding: 8px;">${email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">전화번호</td>
            <td style="padding: 8px;">${phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">지원 포지션</td>
            <td style="padding: 8px;">${position}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">경력</td>
            <td style="padding: 8px;">${experience || '미입력'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">포트폴리오</td>
            <td style="padding: 8px;">${portfolio ? `<a href="${portfolio}" target="_blank">${portfolio}</a>` : '미입력'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">이력서 첨부</td>
            <td style="padding: 8px;">${resume ? '있음' : '없음'}</td>
          </tr>
        </table>
        
        ${message ? `
        <h3>자기소개</h3>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        ` : ''}
        
        <p style="color: #666; font-size: 14px;">
          이 지원서는 ZNIT 웹사이트를 통해 접수되었습니다.
        </p>
      `,
    };

    await sgMail.send(msg);

    // 지원자에게 확인 이메일 발송
    const confirmationMsg = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@znit.com',
      subject: '[ZNIT] 채용 지원 접수 확인',
      text: `
        ${name}님,
        
        ZNIT에 지원해주셔서 감사합니다.
        
        지원 정보:
        - 지원 포지션: ${position}
        - 접수 일시: ${new Date().toLocaleString('ko-KR')}
        
        검토 후 1-2주 내에 연락드리겠습니다.
        
        감사합니다.
        ZNIT 인사팀
      `,
      html: `
        <h2>ZNIT 채용 지원 접수 확인</h2>
        
        <p>${name}님,</p>
        
        <p>ZNIT에 지원해주셔서 감사합니다.</p>
        
        <h3>지원 정보</h3>
        <ul>
          <li><strong>지원 포지션:</strong> ${position}</li>
          <li><strong>접수 일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
        </ul>
        
        <p>검토 후 1-2주 내에 연락드리겠습니다.</p>
        
        <p>감사합니다.<br>
        ZNIT 인사팀</p>
      `,
    };

    await sgMail.send(confirmationMsg);

    return NextResponse.json(
      { message: '채용 지원이 성공적으로 접수되었습니다. 확인 이메일을 발송했습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('채용 지원 접수 오류:', error);
    return NextResponse.json(
      { error: '지원 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 