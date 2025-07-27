"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Benefits from "./components/Benefits";
import RecruitProcess from "./components/RecruitProcess";
import TitleAnimation from "./components/TitleAnimation";
import ApplySection from "./components/ApplySection";

export default function RecruitPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 여부에 따른 배경색 결정
  const backgroundColor =
    mounted && theme === "dark" ? "bg-[#1F1F1F]" : "bg-white";

  const handleFileSubmit = async (file: File) => {
    // 간단한 폼 데이터 추가 (실제로는 사용자가 입력해야 함)
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("name", "지원자"); // 실제로는 사용자 입력
    formData.append("email", "test@example.com"); // 실제로는 사용자 입력
    formData.append("phone", "010-1234-5678"); // 실제로는 사용자 입력
    formData.append("position", "개발자"); // 실제로는 사용자 입력
    formData.append("experience", "3년"); // 실제로는 사용자 입력
    formData.append("message", "지원합니다."); // 실제로는 사용자 입력

    const response = await fetch("/api/recruit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "제출 중 오류가 발생했습니다.");
    }

    return result;
  };

  return (
    <div
      className={`min-h-screen ${backgroundColor} transition-colors duration-300`}
    >
      {/* Work with us 타이틀 애니메이션 - 풀스크린 */}
      <TitleAnimation />

      {/* 풀스크린 섹션 */}
      <div
        className={`w-full ${backgroundColor} transition-colors duration-300`}
      >
        <div className="w-full">
          {/* 8개 카드 그리드 */}
          <Benefits />

          {/* 채용 프로세스 */}
          <RecruitProcess />

          {/* 지원 섹션 */}
          <ApplySection onSubmit={handleFileSubmit} />
        </div>
      </div>
    </div>
  );
}
