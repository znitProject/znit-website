"use client";


import MapCard from "../components/MapCard";
import ClockCard from "../components/ClockCard";
import WeOwnItCard from "../components/WeOwnItCard";
import WorkWithUsCard from "../components/WorkWithUsCard";
import CustomerCarousel from "../components/CustomerCarousel";
import DarkModeCard from "../components/DarkModeCard";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-center items-center w-full  mx-auto">
      {/* 상단: 타이포 + 대형 카드 */}
      <section className="w-full max-w-full flex flex-col md:flex-row items-center gap-8 pt-16 pb-8 px-20 md:justify-between">
        {/* 왼쪽: 큰 타이포 */}
        <div className="flex-1 flex flex-col justify-center items-start">
          <h1 className="font-normal text-5xl md:text-7xl leading-tight text-black whitespace-pre-line mb-4" style={{fontFamily:'Istok Web'}}>
            글씨{"\n"}글글씨{"\n"}글글글씨_
          </h1>
        </div>
        {/* 오른쪽: 대형 카드(다크모드/썸네일 등) */}
        <div className="flex-1 flex justify-end items-end">
          <div className="w-[700px] h-[700px] bg-[#D9D9D9] rounded-[30px] flex flex-col items-center justify-center">
            <span className="text-black text-2xl font-bold">다크모드 카드</span>
          </div>
        </div>
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
          <div className="card" style={{ gridArea: 'keyword' }}>
            <span className="text-lg font-semibold">Keyword</span>
          </div>

          {/* work 카드 */}
              <div className="card !text-3xl !font-bold" style={{ gridArea: 'work' }}>
                WORK
              </div>

              {/* clock+달력 카드 */}
              <ClockCard />

              {/* work with us 카드 */}
              <WorkWithUsCard />

              {/* contact 카드 */}
              <div className="card" style={{ gridArea: 'contact' }}>
                <span className="text-2xl font-semibold">Contact</span>
              </div>

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


      {/* 하단: WORK 카드 리스트 */}
      <section className="w-full max-w-full px-10 mb-12">
        <h2 className="text-3xl font-bold mb-4 text-black">WORK</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="bg-[#9ACCE8] opacity-60 rounded-[20px] h-48 flex items-center justify-center text-xl font-bold text-blue-900 border border-black/10">
              작업 {i}
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
}
