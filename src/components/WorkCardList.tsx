import React from "react";

// WorkCardList 컴포넌트: 하단 WORK 카드 리스트를 렌더링합니다.
const WorkCardList: React.FC = () => {
  return (
    <section className="w-full max-w-full px-10 mb-12">
      <h2 className="text-3xl font-bold mb-4 text-black">WORK</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[1,2,3,4,5].map((i) => (
          <div
            key={i}
            className="relative rounded-xl shadow-lg overflow-hidden bg-white flex flex-col justify-end transition-transform duration-200 hover:scale-105 min-w-0"
          >
            {/* 세로로 긴 썸네일 (3:4 비율) - 제목 없이 */}
            <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center text-gray-400 text-3xl font-bold">
              썸네일
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkCardList; 