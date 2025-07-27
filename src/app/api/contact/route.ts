// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateContactPDF } from "@/lib/pdfGenerator";

// Resend 인스턴스 생성
const resend = new Resend(process.env.RESEND_API_KEY!);

// Rate limiting 메모리 저장소
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number; lastEmail: string; lastMessage: string }
>();

function checkRateLimit(ip: string, email: string, message: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15분
  const maxRequests = 3;
  const emailCooldown = 5 * 60 * 1000;
  const messageCooldown = 2 * 60 * 1000;

  const userData = rateLimitMap.get(ip);
  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
      lastEmail: email,
      lastMessage: message,
    });
    return true;
  }

  if (
    userData.lastEmail === email &&
    now - (userData.resetTime - windowMs) < emailCooldown
  ) {
    return false;
  }
  if (
    userData.lastMessage === message &&
    now - (userData.resetTime - windowMs) < messageCooldown
  ) {
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

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .substring(0, 1000);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  try {
    // 1) Content-Type 검증
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "잘못된 요청 형식입니다." },
        { status: 400 }
      );
    }

    // 2) Body 파싱
    const { name, email, subject, message } = await request.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 3) Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip, email, message)) {
      return NextResponse.json(
        { error: "너무 많은 요청입니다. 15분 후 다시 시도해주세요." },
        { status: 429 }
      );
    }

    // 4) 데이터 정제 & 검증
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    if (sanitizedName.length < 2 || sanitizedName.length > 50) {
      return NextResponse.json(
        { error: "이름은 2-50자 사이여야 합니다." },
        { status: 400 }
      );
    }
    if (sanitizedSubject.length < 5 || sanitizedSubject.length > 100) {
      return NextResponse.json(
        { error: "제목은 5-100자 사이여야 합니다." },
        { status: 400 }
      );
    }
    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 1000) {
      return NextResponse.json(
        { error: "메시지는 10-1000자 사이여야 합니다." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "유효한 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    // 5) PDF 및 JSON 생성
    const timestamp = new Date().toISOString();
    const formData = {
      timestamp,
      name: sanitizedName,
      email: email.toLowerCase(),
      subject: sanitizedSubject,
      message: sanitizedMessage,
      ip,
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    const pdfBuffer = generateContactPDF(formData);
    const pdfFileName = `contact_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}.pdf`;
    const jsonData = JSON.stringify(formData, null, 2);
    const jsonFileName = `contact_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}.json`;

    // 6) Resend로 이메일 전송
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `📩 [ZNIT 문의] ${sanitizedSubject}`,
      html: `
        <div style="font-family:sans-serif;color:#000;line-height:1.5;">
          <h2 style="color:#0070f3;">📩 새로운 문의가 도착했습니다!</h2>
          <p>웹사이트를 통해 새로운 문의가 접수되었습니다.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr>
              <th align="left" style="padding:8px;background:#f0f0f0;">이름</th>
              <td style="padding:8px;">${sanitizedName}</td>
            </tr>
            <tr>
              <th align="left" style="padding:8px;background:#f0f0f0;">이메일</th>
              <td style="padding:8px;">${email}</td>
            </tr>
            <tr>
              <th align="left" style="padding:8px;background:#f0f0f0;">제목</th>
              <td style="padding:8px;">${sanitizedSubject}</td>
            </tr>
            <tr>
              <th align="left" style="padding:8px;background:#f0f0f0;">메시지</th>
              <td style="padding:8px;">${sanitizedMessage.replace(
                /\n/g,
                "<br/>"
              )}</td>
            </tr>
          </table>
          <p>첨부된 PDF와 JSON 파일을 다운로드하여 확인해 주세요.</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:30px 0;"/>
          <p style="font-size:12px;color:#777;">IP: ${ip} | 시간: ${timestamp}</p>
          <p style="font-size:12px;color:#777;">이 메일은 자동 발송되었습니다.</p>
        </div>
      `,
      text: `
        이름: ${sanitizedName}
        이메일: ${email}
        제목: ${sanitizedSubject}
        메시지: ${sanitizedMessage}
        IP: ${ip}
        시간: ${timestamp}
      `,
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer.toString("base64"),
          contentType: "application/pdf",
        },
        {
          filename: jsonFileName,
          content: Buffer.from(jsonData).toString("base64"),
          contentType: "application/json",
        },
      ],
    });

    if (error) {
      console.error("Resend 오류:", error);
      return NextResponse.json(
        { error: "이메일 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "문의가 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API 오류:", err);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
