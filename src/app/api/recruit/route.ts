// src/app/api/recruit/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function getMimeTypeByExt(ext: string): string {
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
    const ct = request.headers.get("content-type") ?? "";
    if (!ct.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "multipart/form-data로 요청해주세요." },
        { status: 400 }
      );
    }

    const fd = await request.formData();
    const resume = fd.get("resume") as File | null;
    if (!resume) {
      return NextResponse.json(
        { error: "이력서를 첨부해주세요." },
        { status: 400 }
      );
    }

    const filename = resume.name;
    const ext = filename.split(".").pop()?.toLowerCase();
    const allowed = ["pdf", "hwp", "doc", "docx"];
    if (!ext || !allowed.includes(ext)) {
      return NextResponse.json(
        { error: `허용된 확장자: ${allowed.join(", ")}` },
        { status: 400 }
      );
    }

    const buf = Buffer.from(await resume.arrayBuffer());
    console.log("resume buffer length:", buf.length);
    const attachment = {
      filename,
      content: buf.toString("base64"),
      contentType: resume.type || getMimeTypeByExt(ext),
    };

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.HR_EMAIL!,
      replyTo: (fd.get("email") as string) || undefined,
      subject: `📩 [ZNIT 채용지원] 새로운 지원서 도착 – ${filename}`,
      html: `
        <div style="font-family:sans-serif;color:#000;line-height:1.5;">
          <h2 style="color:#0070f3;">✨ 새로운 채용 지원서가 도착했습니다!</h2>
          <p>지원자가 업로드한 이력서를 전달드립니다.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><th style="padding:8px;background:#f0f0f0;">파일명</th><td style="padding:8px;">${filename}</td></tr>
          </table>
          <p>첨부된 이력서를 다운로드하여 검토해 주세요.</p>
          <hr style="border-top:1px solid #ddd;margin:30px 0;"/>
          <p style="font-size:12px;color:#777;">이 메일은 자동 발송되었습니다.</p>
        </div>
      `,
      attachments: [attachment],
    });

    return NextResponse.json(
      { message: "이력서를 성공적으로 전송했습니다." },
      { status: 200 }
    );
  } catch (e) {
    console.error("Recruit API 오류:", e);
    return NextResponse.json({ error: "메일 전송 실패" }, { status: 500 });
  }
}
