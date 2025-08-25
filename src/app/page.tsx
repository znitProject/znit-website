"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CultureCard from "../components/gridSection/CultureCard";
import WeOwnItCard from "../components/gridSection/WeOwnItCard";
import DarkModeCard from "../components/gridSection/DarkModeCard";
import ITCard from "../components/gridSection/ITCard";
import KeywordCard from "../components/gridSection/KeywordCard";
import DesignCard from "../components/gridSection/DesignCard";

import HeroRevealSection from "../components/HeroRevealSection";
import ITSection from "../components/ITSection";
import DesignSection from "../components/DesignSection";
import CultureSection from "../components/CultureSection";
import ClosingSection from "../components/ClosingSection";

const MapCard = dynamic(() => import("../components/gridSection/MapCard"), {
  ssr: false,
});
import NixieClock from "../components/gridSection/nixieClock";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setIsFooterVisible(rect.top < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 확인

    return () => window.removeEventListener("scroll", handleScroll);
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
          <DesignCard style={{ gridArea: "work" }} />
          <NixieClock style={{ gridArea: "clock" }} />
          <WeOwnItCard style={{ gridArea: "workus" }} />
          <ITCard style={{ gridArea: "contact" }} />
          {mounted && <MapCard style={{ gridArea: "map" }} />}
          <CultureCard style={{ gridArea: "weownit" }} />
          <DarkModeCard style={{ gridArea: "darkmode" }} />
        </section>

        {/* 태블릿 (md ~ lg): 2열 그리드, KeywordCard와 NixieClock 제외 */}
        <section className="w-full max-w-full hidden md:grid xl:hidden gap-6 grid-cols-2">
          {/* 핵심 CTA 카드들 (큰 크기, 터치 친화적) */}
          <div className="h-[200px]">
            <DesignCard />
          </div>
          <div className="h-[200px]">
            <ITCard />
          </div>

          <div className="h-[200px]">
            <WeOwnItCard />
          </div>
          <div className="h-[200px]">
            <CultureCard style={{}} />
          </div>

          {/* 보조 정보 카드들 - 동일한 높이로 통일 */}
          <div className="h-[200px]">{mounted && <MapCard />}</div>
          <div className="h-[200px]">
            <DarkModeCard style={{}} />
          </div>
        </section>

        {/* 모바일 (sm 이하): 1열, 명확한 구분과 적절한 간격 */}
        <section className="w-full max-w-full md:hidden">
          <div className="flex flex-col space-y-6">
            {/* 가장 중요한 CTA - 작업물 보기 */}
            <div className="w-full h-[220px] sm:h-[240px]">
              <DesignCard />
            </div>

            {/* 연락하기 - 두 번째로 중요한 CTA */}
            <div className="w-full h-[220px] sm:h-[240px]">
              <ITCard />
            </div>

            {/* 채용 정보 */}
            <div className="w-full h-[220px] sm:h-[240px]">
              <WeOwnItCard />
            </div>

            {/* 브랜드 스토리 - 겹침 방지를 위한 명확한 컨테이너 */}
            <div className="w-full h-[220px] sm:h-[240px] relative z-10">
              <CultureCard style={{}} />
            </div>

            {/* 지도 - 동일한 높이로 통일 */}
            <div className="w-full h-[220px] sm:h-[240px] relative z-10">
              {mounted && <MapCard />}
            </div>

            {/* 다크모드 토글 - 모바일에서 10px 증가 */}
            <div className="w-full h-[230px] sm:h-[250px]">
              <DarkModeCard style={{}} />
            </div>
          </div>
        </section>
      </div>

      {/* IT, Design Sections */}
      <div
        className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 ${backgroundColor}`}
      >
        <ITSection />
        <DesignSection />
      </div>

      {/* Culture Section - Full Width Background */}
      <div className={`w-full ${backgroundColor}`}>
        <CultureSection />
      </div>

      {/* Closing Section */}
      <div
        className={`w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 ${backgroundColor}`}
      >
        <ClosingSection />
      </div>

      {/* Floating Back to Top Button - 화면을 따라다니는 동그란 화살표 */}
      {!isFooterVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-transparent text-gray-900 dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          style={{
            border: `2px solid ${mounted && theme === "dark" ? "#ffffff" : "#000000"}`,
          }}
          aria-label="맨 위로 이동"
        >
          <svg
            className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              stroke: mounted && theme === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
              style={{
                stroke: mounted && theme === "dark" ? "#ffffff" : "#000000",
              }}
            />
          </svg>
        </button>
      )}
    </div>
  );
}
