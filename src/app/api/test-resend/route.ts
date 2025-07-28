import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  try {
    // Resend API 키 확인
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          status: "error",
          message: "RESEND_API_KEY가 설정되지 않았습니다.",
          setup:
            "프로젝트 루트에 .env.local 파일을 생성하고 RESEND_API_KEY를 설정하세요.",
        },
        { status: 500 }
      );
    }

    // Resend 인스턴스 생성
    const resend = new Resend(apiKey);

    // 간단한 테스트 이메일 전송
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL || "test@example.com",
      subject: "Resend API 연결 테스트",
      html: "<p>Resend API가 정상적으로 연결되었습니다!</p>",
      text: "Resend API가 정상적으로 연결되었습니다!",
    });

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Resend API 연결 실패",
          error: error.message,
          details: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Resend API 연결 성공!",
        data: data,
        apiKey: apiKey.substring(0, 10) + "...", // API 키 일부만 표시
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend 테스트 오류:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Resend API 테스트 중 오류 발생",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
