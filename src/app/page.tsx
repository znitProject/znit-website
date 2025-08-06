"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import WeOwnItCard from "../components/WeOwnItCard";
import WorkWithUsCard from "../components/WorkWithUsCard";
import DarkModeCard from "../components/DarkModeCard";
import ContactCard from "../components/ContactCard";
import KeywordCard from "../components/KeywordCard";
import WorkCard from "../components/WorkCard";

import WorkList from "../components/WorkList";
import HeroRevealSection from "../components/HeroRevealSection";
import StrokeFillTextSection from "../components/StrokeFillTextSection";

const MapCard = dynamic(() => import("../components/MapCard"), { ssr: false });
import NixieClock from "../components/nixieClock";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 여부에 따른 배경색 결정
  const backgroundColor =
    mounted && theme === "dark" ? "bg-[#1F1F1F]" : "bg-white";

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-center items-center mx-auto ${backgroundColor} transition-colors duration-300`}
    >
      {/* Hero Section - 모바일 최적화된 비율과 레이아웃 */}
      <section className={`w-full ${backgroundColor}`}>
        <HeroRevealSection />
      </section>

      {/* Main Content Grid - 모바일 퍼스트 정보 위계 적용 */}
      <div
        className={`w-full flex justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-2 sm:py-4 md:py-6 lg:py-6 xl:py-20 transition-colors duration-300 ${backgroundColor}`}
      >
        {/* 데스크톱 (xl 이상): 기존 복합 grid 레이아웃 유지 */}
        <section
          className="w-full max-w-full hidden xl:grid gap-6 grid-cols-4 grid-rows-[repeat(6,minmax(140px,1fr))]"
          style={{
            gridTemplateAreas: `
              'keyword work clock workus'
              'keyword work clock workus'
              'contact work clock map'
              'contact weownit weownit map'
              'contact weownit weownit map'
              'contact weownit weownit darkmode'
            `,
          }}
        >
          <KeywordCard style={{ gridArea: "keyword" }} />
          <WorkCard style={{ gridArea: "work" }} />
          <NixieClock style={{ gridArea: "clock" }} />
          <WorkWithUsCard style={{ gridArea: "workus" }} />
          <ContactCard style={{ gridArea: "contact" }} />
          {mounted && <MapCard style={{ gridArea: "map" }} />}
          <WeOwnItCard style={{ gridArea: "weownit" }} />
          <DarkModeCard style={{ gridArea: "darkmode" }} />
        </section>

        {/* 태블릿 (md ~ lg): 2열 그리드, KeywordCard와 NixieClock 제외 */}
        <section className="w-full max-w-full hidden md:grid xl:hidden gap-6 grid-cols-2">
          {/* 핵심 CTA 카드들 (큰 크기, 터치 친화적) */}
          <div className="h-[200px]">
            <WorkCard />
          </div>
          <div className="h-[200px]">
            <ContactCard />
          </div>

          <div className="h-[200px]">
            <WorkWithUsCard />
          </div>
          <div className="h-[200px]">
            <WeOwnItCard style={{}} />
          </div>

          {/* 보조 정보 카드들 */}
          <div className="h-[180px]">
            {mounted && <MapCard />}
          </div>
          <div className="h-[180px]">
            <DarkModeCard style={{}} />
          </div>

         
        </section>

        {/* 모바일 (sm 이하): 1열, 명확한 구분과 적절한 간격 */}
        <section className="w-full max-w-full md:hidden">
          <div className="flex flex-col space-y-6">
            {/* 가장 중요한 CTA - 작업물 보기 */}
            <div className="w-full h-[220px] sm:h-[240px]">
              <WorkCard />
            </div>

            {/* 연락하기 - 두 번째로 중요한 CTA */}
            <div className="w-full h-[220px] sm:h-[240px]">
              <ContactCard />
            </div>

            {/* 채용 정보 */}
            <div className="w-full h-[220px] sm:h-[240px]">
              <WorkWithUsCard />
            </div>

            {/* 브랜드 스토리 - 겹침 방지를 위한 명확한 컨테이너 */}
            <div className="w-full h-[220px] sm:h-[240px] relative z-10">
              <WeOwnItCard style={{}} />
            </div>

            {/* 지도 - 완전히 분리된 컨테이너 */}
            <div className="w-full h-[80px] sm:h-[100px] relative z-10">
              {mounted && <MapCard />}
            </div>

            {/* 다크모드 토글 - 지도 바로 아래에 배치 */}
            <div className="w-full h-[80px] sm:h-[100px]">
              <DarkModeCard style={{}} />
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section - 모바일에서 더 강력한 임팩트 */}
      <div
        className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 ${backgroundColor}`}
      >
        <StrokeFillTextSection />
      </div>

      {/* Work Showcase - 모바일 최적화된 그리드 */}
      <div
        className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 ${backgroundColor}`}
      >
        <WorkList />
      </div>
    </div>
  );
}
