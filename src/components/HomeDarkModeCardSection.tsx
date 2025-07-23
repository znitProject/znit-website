import React from "react";

// 상단 오른쪽의 다크모드 카드 영역 컴포넌트
const HomeDarkModeCardSection: React.FC = () => {
  return (
    <div className="flex-1 flex justify-end items-end">
      <div className="w-[700px] h-[700px] bg-[#D9D9D9] rounded-[30px] flex flex-col items-center justify-center">
        <span className="text-black text-2xl font-bold">다크모드 카드</span>
      </div>
    </div>
  );
};

export default HomeDarkModeCardSection; 