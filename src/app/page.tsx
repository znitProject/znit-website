"use client";


import dynamic from "next/dynamic";
import ClockCard from "../components/ClockCard";
import WeOwnItCard from "../components/WeOwnItCard";
import WorkWithUsCard from "../components/WorkWithUsCard";
import CustomerCarousel from "../components/CustomerCarousel";
import DarkModeCard from "../components/DarkModeCard";
import ContactCard from "../components/ContactCard";
import KeywordCard from "../components/KeywordCard";
import WorkCard from "../components/WorkCard";
import Link from "next/link";
import WorkCardList from "../components/WorkCardList";
import HomeTitleSection from "../components/HomeTitleSection";
import HomeTitleVideoSection from "../components/HomeTitleVideoSection";
import StrokeFillTextSection from "../components/StrokeFillTextSection";

const MapCard = dynamic(() => import("../components/MapCard"), { ssr: false });

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center w-full  mx-auto">
      {/* 상단: 타이포 + 대형 카드 */}
      <section className="w-full max-w-full flex flex-col md:flex-row items-center gap-8 pt-16 pb-8 px-20 md:justify-between">
        {/* 왼쪽: 큰 타이포 */}
        <HomeTitleSection />
        {/* 오른쪽: 대형 카드(다크모드/썸네일 등) */}
        <HomeTitleVideoSection />
      </section>

      {/* 중간: Figma 1:1 정보 그리드 */}
      <div className="w-full flex justify-center bg-white px-20 py-30">
        <section
          className="w-full max-w-full grid gap-6 sm:grid-cols-4 sm:grid-rows-[repeat(7,minmax(140px,1fr))] auto-rows-min"
          style={{
            gridTemplateAreas: `
              'keyword work clock workus'
              'keyword work clock workus'
              'contact work clock map'
              'contact weownit weownit map'
              'contact weownit weownit map'
              'contact weownit weownit map'
              'customer customer customer darkmode'
            `,
          }}
        >
          {/* keyword 카드 */}
          <KeywordCard />

          {/* work 카드 */}
          <WorkCard />

          {/* clock+달력 카드 */}
          <ClockCard />

              {/* work with us 카드 */}
              <WorkWithUsCard />

              {/* contact 카드 */}
              <ContactCard />

              {/* map 카드 */}
              <MapCard />

              {/* we own it 카드 */}
              <WeOwnItCard style={{ gridArea: 'weownit' }} />

              {/* 고객사 카드 - 무한 슬라이드 */}
              <CustomerCarousel />

              {/* 다크모드 카드 */}
              <DarkModeCard style={{ gridArea: 'darkmode' }} />
            </section>
          </div>

      {/* 텍스트 stroke-fill 애니메이션 섹션 */}
      <StrokeFillTextSection />

      {/* 하단: WORK 카드 리스트 */}
      <WorkCardList />

      
    </div>
  );
}
