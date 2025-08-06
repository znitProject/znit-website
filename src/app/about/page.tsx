"use client";

import WaveMaskText from "./components/WaveMaskText";
import ValuesSection from "./components/ValuesSection";
import IntroSection from "./components/IntroSection";
import ParticleBackground from "./components/ParticleBackground";
import ClosingSection from "./components/ClosingSection";

export default function SloganPage() {
  return (
    <div className="bg-black min-h-screen transition-colors duration-300">
      {/* 파티클 배경 */}
      <ParticleBackground />

      {/* 첫 번째 섹션 - 웨이브 마스크 (200vh로 증가) */}
      <div className="h-[200vh] relative">
        <WaveMaskText />
      </div>

      {/* 두 번째 섹션 - 인트로 섹션 */}
      <IntroSection />

      {/* 세 번째 섹션 - 핵심 가치 */}
      <ValuesSection />

      {/* 네 번째 섹션 - 마무리 */}
      <ClosingSection />
    </div>
  );
}
