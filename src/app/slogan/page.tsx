"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import WaveMaskText from "./components/WaveMaskText";
import ValuesSection from "./components/ValuesSection";
import RibbonAnimation from "./components/RibbonAnimation";
import TextAnimation from "./components/TextAnimation";

export default function SloganPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 여부에 따른 배경색 결정
  const backgroundClass =
    mounted && theme === "dark"
      ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700"
      : "bg-gradient-to-b from-black via-blue-900 to-white";

  return (
    <div
      className={`${backgroundClass} min-h-screen transition-colors duration-300`}
    >
      {/* 첫 번째 섹션 - 웨이브 마스크 (180vh) */}
      <div className="h-[180vh] relative">
        <WaveMaskText />
      </div>

      {/* 두 번째 섹션 - 핵심 가치 */}
      <ValuesSection />

      {/* 세 번째 섹션 - 리본 애니메이션 */}
      <div className="mt-[100px]">
        <RibbonAnimation />
      </div>

      {/* 네 번째 섹션 - ZNIT 브랜딩 */}
      <TextAnimation />
    </div>
  );
}
