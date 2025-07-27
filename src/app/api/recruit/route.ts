// src/app/api/recruit/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// 확장자 → MIME 타입 간단 맵핑
function getMimeTypeByExt(ext: string) {
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "hwp":
      return "application/x-hwp";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1) multipart/form-data 확인
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "multipart/form-data로 보내주세요." },
        { status: 400 }
      );
    }

    // 2) FormData 파싱 & 파일 추출
    const formData = await request.formData();
    const resume = formData.get("resume") as File | null;
    if (!resume) {
      return NextResponse.json(
        { error: "이력서를 첨부해주세요." },
        { status: 400 }
      );
    }

    // 3) 확장자 검증
    const filename = resume.name;
    const ext = filename.split(".").pop()?.toLowerCase();
    const allowed = ["pdf", "hwp", "doc", "docx"];
    if (!ext || !allowed.includes(ext)) {
      return NextResponse.json(
        { error: `허용된 파일형식: ${allowed.join(", ")}` },
        { status: 400 }
      );
    }

    // 4) ArrayBuffer → Buffer → base64
    const buffer = Buffer.from(await resume.arrayBuffer());
    console.log("📦 resume buffer length:", buffer.length);

    const attachment = {
      filename,
      content: buffer.toString("base64"),
      contentType: resume.type || getMimeTypeByExt(ext),
    };

    // 5) Resend로 이메일 발송
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.HR_EMAIL!,
      replyTo: (formData.get("email") as string) || undefined,
      subject: `📩 [ZNIT 채용지원] 새로운 지원서 도착 – ${filename}`,
      html: `
        <div style="font-family:sans-serif;color:#000;line-height:1.5;">
          <h2 style="color:#0070f3;">✨ 새로운 채용 지원서가 도착했습니다!</h2>
          <p>지원자가 업로드한 이력서를 전달드립니다.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr>
              <th align="left" style="padding:8px;background:#f0f0f0;">파일명</th>
              <td style="padding:8px;">${filename}</td>
            </tr>
          </table>
          <p>첨부된 이력서를 다운로드하여 검토해 주세요.</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:30px 0;"/>
          <p style="font-size:12px;color:#777;">이 메일은 자동 발송되었습니다.</p>
        </div>
      `,
      attachments: [attachment],
    });

    return NextResponse.json(
      { message: "이력서를 성공적으로 전송했습니다." },
      { status: 200 }
    );
  } catch (err) {
    console.error("채용 지원 오류:", err);
    return NextResponse.json(
      { error: "메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}
