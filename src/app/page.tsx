import Image from "next/image";
import Link from "next/link";

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
          <div className="w-full max-w-lg h-[700px] bg-[#D9D9D9] rounded-[30px] flex flex-col items-center justify-center">
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
              'contact work clock workus'
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
              <div className="card" style={{ gridArea: 'clock' }}>
                <div className="text-2xl font-semibold">July</div>
                <div className="text-base">21</div>
                <div className="text-lg mt-1">12 : 12</div>
              </div>

              {/* work with us 카드 */}
              <div className="card text-xl font-medium" style={{ gridArea: 'workus' }}>
                Work with us
              </div>

              {/* contact 카드 */}
              <div className="card" style={{ gridArea: 'contact' }}>
                <span className="text-2xl font-semibold">Contact</span>
              </div>

              {/* map 카드 */}
              <div className="card bg-gray-200" style={{ gridArea: 'map' }}>
                <span className="text-xl font-medium">Map</span>
              </div>

              {/* we own it 카드 */}
              <div className="card text-center" style={{ gridArea: 'weownit' }}>
                <span className="text-3xl font-bold">WE OWN IT!</span>
              </div>

              {/* 고객사 카드 */}
              <div
                className="card !items-start !pl-6 sm:!pl-8 flex-col"
                style={{ gridArea: 'customer' }}
              >
                <div className="text-base sm:text-lg font-medium">
                  TOSS NAVER Coupang KAKAO KREAM MUSINSA
                </div>
                <div className="text-sm text-gray-600 mt-1">Customer</div>
              </div>

              {/* 다크모드 카드 */}
              <div
                className="card bg-black text-white text-sm sm:text-base font-semibold"
                style={{ gridArea: 'darkmode' }}
              >
                Dark Mode
              </div>
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
