export default function WorkPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* 상단바 */}
      <div className="w-full max-w-md flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <span className="font-bold text-lg tracking-widest">ZNIT</span>
        <button className="w-7 h-7 flex flex-col justify-between items-center">
          {/* 햄버거 메뉴 */}
          <span className="block w-7 h-0.5 bg-black"></span>
          <span className="block w-7 h-0.5 bg-black"></span>
          <span className="block w-7 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="w-full max-w-md px-4 flex flex-col gap-6 mt-6">
        {/* 좌측 타이포 + 우측 대표 이미지 */}
        <div className="flex flex-row gap-4">
          <div className="flex-1 flex flex-col justify-start">
            <span className="text-2xl font-bold leading-tight">글씨</span>
            <span className="text-2xl font-bold leading-tight">글글씨</span>
            <span className="text-2xl font-bold leading-tight">글글글씨_</span>
          </div>
          <div className="flex-1 flex justify-end">
            {/* 대표 이미지 플레이스홀더 */}
            <div className="w-28 h-28 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* 중간 그리드 영역 */}
        <div className="grid grid-cols-4 grid-rows-3 gap-2 h-64">
          {/* 각 사각형은 와이어프레임 비율에 맞춰 col-span, row-span 조정 */}
          <div className="col-span-1 row-span-1 bg-gray-200 flex items-center justify-center text-xs font-bold">Contact</div>
          <div className="col-span-2 row-span-1 bg-gray-200 flex items-center justify-center text-xs font-bold">WORK</div>
          <div className="col-span-1 row-span-1 bg-gray-200 flex flex-col items-center justify-center text-xs font-bold">
            <span>July</span>
            <span className="text-[10px] mt-1">22일</span>
            <span className="text-[10px]">월</span>
            <span className="text-[10px] mt-2">12:12</span>
          </div>
          <div className="col-span-1 row-span-2 bg-gray-200 flex items-center justify-center text-xs font-bold">Contact1</div>
          <div className="col-span-2 row-span-2 bg-gray-200 flex items-center justify-center text-xs font-bold">WE OWN IT !</div>
          <div className="col-span-1 row-span-2 bg-gray-200 flex flex-col items-center justify-center text-xs font-bold">
            <span>Work with us</span>
            {/* 지도 플레이스홀더 */}
            <div className="w-16 h-12 bg-white border border-gray-300 mt-1" />
          </div>
          <div className="col-span-4 row-span-1 bg-gray-100 flex items-center px-2 text-[10px] justify-between">
            <span>TOSS HAVER Coupang KAKAO KREAM MUSINSA</span>
            <button className="bg-black text-white text-[10px] px-2 py-1 rounded-full">Dark Mode</button>
          </div>
        </div>

        {/* 하단 WORK 리스트 */}
        <div className="mt-6">
          <span className="font-bold text-lg">WORK</span>
          <div className="flex flex-row gap-2 mt-2">
            {/* 5개의 동일한 비율의 박스 */}
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="flex-1 aspect-square bg-blue-100 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 