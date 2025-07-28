// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Resend 인스턴스 생성
const resend = new Resend(process.env.RESEND_API_KEY!);

// Rate limiting 메모리 저장소
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number; lastEmail: string; lastMessage: string }
>();

function checkRateLimit(ip: string, email: string, message: string): boolean {
  // 개발·테스트 환경에서는 제한 해제
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15분
  const maxRequests = 3; // 3회
  const emailCooldown = 5 * 60 * 1000; // 같은 이메일 5분
  const messageCooldown = 2 * 60 * 1000; // 같은 메시지 2분

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
    // 1) multipart/form-data 확인
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "multipart/form-data로 요청해주세요." },
        { status: 400 }
      );
    }

    // 2) FormData에서 필드 꺼내기
    const formData = await request.formData();
    const projectTypeRaw = formData.get("projectType");
    const projectTitle = formData.get("projectTitle") as string;
    const projectDescription = formData.get("projectDescription") as string;
    const companyName = formData.get("companyName") as string;
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const projectFile = formData.get("projectFile") as File | null;

    // 3) 필수 필드 체크
    if (
      !projectTypeRaw ||
      !projectTitle ||
      !projectDescription ||
      !companyName ||
      !name ||
      !position ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 프로젝트 타입 JSON 파싱
    let projectType: string[];
    try {
      projectType = JSON.parse(projectTypeRaw as string);
    } catch {
      projectType = [];
    }

    // 4) Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip, email, projectTitle + projectDescription)) {
      return NextResponse.json(
        { error: "너무 많은 요청입니다. 15분 후 다시 시도해주세요." },
        { status: 429 }
      );
    }

    // 5) 입력값 정제
    const sProjectTitle = sanitizeInput(projectTitle);
    const sProjectDesc = sanitizeInput(projectDescription);
    const sCompanyName = sanitizeInput(companyName);
    const sName = sanitizeInput(name);
    const sPosition = sanitizeInput(position);
    const sEmail = email.trim().toLowerCase();
    const sPhone = sanitizeInput(phone);

    if (sProjectTitle.length < 2 || sProjectTitle.length > 100) {
      return NextResponse.json(
        { error: "프로젝트 제목은 2-100자 사이여야 합니다." },
        { status: 400 }
      );
    }
    // 설명은 최대 1000자만 체크
    if (sProjectDesc.length > 1000) {
      return NextResponse.json(
        { error: "프로젝트 설명은 최대 1000자까지만 입력 가능합니다." },
        { status: 400 }
      );
    }
    if (!isValidEmail(sEmail)) {
      return NextResponse.json(
        { error: "유효한 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // 6) Resend로 메일 전송 (HTML+텍스트 테이블)
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.HR_EMAIL!,
      replyTo: sEmail,
      subject: `🌟 새로운 문의가 접수되었습니다!`,
      html: `
        <div style="
          font-family: 'Malgun Gothic', sans-serif;
          color: #333;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          line-height: 1.6;
        ">
          <h2 style="
            color: #000;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
          ">
            📬 새로운 문의가 도착했습니다!
          </h2>
          <p style="margin: 16px 0;">
            아래 내용으로 문의가 접수되었습니다:
          </p>
          <table style="
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          ">
            <tbody>
              ${[
                ["프로젝트 유형", projectType.join(", ")],
                ["프로젝트 제목", sProjectTitle],
                ["프로젝트 설명", sProjectDesc.replace(/\n/g, "<br/>")],
                ["회사명", sCompanyName],
                ["성함", sName],
                ["직함", sPosition],
                ["연락처", sPhone],
                ["이메일", sEmail],
              ]
                .map(
                  ([label, val], i) => `
                <tr style="background: ${i % 2 ? "#fafafa" : "#fff"};">
                  <td style="padding: 8px; border: 1px solid #eee; font-weight: bold;">${label}</td>
                  <td style="padding: 8px; border: 1px solid #eee;">${val}</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
          ${
            projectFile
              ? `<p style="margin-bottom:20px;"><strong>첨부파일:</strong> ${projectFile.name}</p>`
              : ""
          }
          <p style="font-size:12px; color:#666;">
            IP: ${ip} | 접수시간: ${timestamp}
          </p>
        </div>
      `,
      text: `
프로젝트 유형: ${projectType.join(", ")}
프로젝트 제목: ${sProjectTitle}
프로젝트 설명: ${sProjectDesc}
회사명: ${sCompanyName}
성함: ${sName}
직함: ${sPosition}
연락처: ${sPhone}
이메일: ${sEmail}
${projectFile ? `첨부파일: ${projectFile.name}` : ""}
IP: ${ip}
접수시간: ${timestamp}
      `,
      attachments: projectFile
        ? [
            {
              filename: projectFile.name,
              content: Buffer.from(await projectFile.arrayBuffer()).toString(
                "base64"
              ),
              contentType: projectFile.type,
            },
          ]
        : [],
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
