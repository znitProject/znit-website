"use client";

import WaveMaskText from "./components/WaveMaskText";
import ValuesSection from "./components/ValuesSection";
import IntroSection from "./components/IntroSection";

export default function SloganPage() {
  return (
    <div
      className="bg-gradient-to-b from-black via-blue-900 to-white min-h-screen transition-colors duration-300"
    >
      {/* 첫 번째 섹션 - 웨이브 마스크 (200vh로 증가) */}
      <div className="h-[200vh] relative">
        <WaveMaskText />
      </div>

      {/* 두 번째 섹션 - 인트로 섹션 */}
      <IntroSection />

      {/* 세 번째 섹션 - 핵심 가치 */}
      <ValuesSection />
    </div>
  );
}
