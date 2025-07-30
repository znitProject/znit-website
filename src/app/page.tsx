"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import WeOwnItCard from "../components/WeOwnItCard";
import WorkWithUsCard from "../components/WorkWithUsCard";
import CustomerCarousel from "../components/CustomerCarousel";
import DarkModeCard from "../components/DarkModeCard";
import ContactCard from "../components/ContactCard";
import KeywordCard from "../components/KeywordCard";
import WorkCard from "../components/WorkCard";

import WorkCardList from "../components/WorkCardList";
import HomeTitleSection from "../components/HomeTitleSection";
import HomeTitleVideoSection from "../components/HomeTitleVideoSection";
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
      <section
        className={`w-full flex flex-col xl:flex-row items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12 pt-6 sm:pt-10 md:pt-14 lg:pt-18 xl:pt-20 pb-6 sm:pb-8 md:pb-10 lg:pb-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 xl:justify-between ${backgroundColor}`}
      >
        {/* 타이틀 섹션 - 모바일에서 더 임팩트 있게 */}
        <div className="w-full xl:flex-1 flex justify-center xl:justify-start order-1 mt-[100px] sm:mt-[150px] xl:mt-0">
          <HomeTitleSection />
        </div>
        {/* 비디오 섹션 - 모바일에서 적절한 크기로 */}
        <div className="w-full xl:flex-1 flex justify-center xl:justify-end order-2 xl:order-2">
          <HomeTitleVideoSection />
        </div>
      </section>

      {/* Main Content Grid - 모바일 퍼스트 정보 위계 적용 */}
      <div
        className={`w-full flex justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 transition-colors duration-300 ${backgroundColor}`}
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
          <div style={{ gridArea: "keyword" }}>
            <KeywordCard />
          </div>
          <div style={{ gridArea: "work" }}>
            <WorkCard />
          </div>
          <div style={{ gridArea: "clock" }}>
            <NixieClock />
          </div>
          <div style={{ gridArea: "workus" }}>
            <WorkWithUsCard />
          </div>
          <div style={{ gridArea: "contact" }}>
            <ContactCard />
          </div>
          <div style={{ gridArea: "map" }}>
            <MapCard />
          </div>
          <div style={{ gridArea: "weownit" }}>
            <WeOwnItCard />
          </div>
          <div style={{ gridArea: "darkmode" }}>
            <DarkModeCard />
          </div>
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
            <WeOwnItCard />
          </div>

          {/* 보조 정보 카드들 */}
          <div className="h-[180px]">
            <MapCard />
          </div>
          <div className="h-[180px]">
            <DarkModeCard />
          </div>

          {/* 기타 요소들 */}
          <div className="col-span-2 h-[120px]">
            <CustomerCarousel />
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
              <WeOwnItCard />
            </div>

            {/* 지도 - 완전히 분리된 컨테이너 */}
            <div className="w-full h-[80px] sm:h-[100px] relative z-10">
              <MapCard />
            </div>

            {/* 다크모드 토글 - 지도 바로 아래에 배치 */}
            <div className="w-full h-[80px] sm:h-[100px]">
              <DarkModeCard />
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
        <WorkCardList />
      </div>
    </div>
  );
}
