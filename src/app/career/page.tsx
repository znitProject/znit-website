"use client";

import Benefits from "./components/Benefits";
import RecruitProcess from "./components/RecruitProcess";
import TitleAnimation from "./components/TitleAnimation";
import NetworkGraph from "./components/NetworkGraph";

export default function RecruitPage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      {/* 타이틀 섹션 */}
      <NetworkGraph />

      {/* 풀스크린 섹션 */}
      <div className="w-full bg-white transition-colors duration-300">
        <div className="w-full">
          {/* 8개 카드 그리드 */}
          <Benefits />

          {/* 채용 프로세스 */}
          <RecruitProcess />
        </div>
      </div>
    </div>
  );
}
