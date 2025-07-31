"use client";

import WaveMaskText from "./components/WaveMaskText";
import ValuesSection from "./components/ValuesSection";


export default function SloganPage() {

  return (
    <div
      className="bg-gradient-to-b from-black via-blue-900 to-white min-h-screen transition-colors duration-300"
    >
      {/* 첫 번째 섹션 - 웨이브 마스크 (180vh) */}
      <div className="h-[180vh] relative">
        <WaveMaskText />
      </div>

      {/* 두 번째 섹션 - 핵심 가치 */}
      <ValuesSection />


    </div>
  );
}
