import React from "react";

// 상단 오른쪽의 다크모드 카드 영역 컴포넌트
const HomeTitleVideoSection: React.FC = () => {
  return (
    <div className="flex-1 flex justify-end items-end">
      <div className="w-[700px] h-[700px] bg-[#D9D9D9] rounded-[30px] flex flex-col items-center justify-center relative overflow-hidden">
        {/* 반복 재생되는 비디오 - 컨트롤러, 멈춤 등 모두 숨김 */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/TitleSectionVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      
      </div>
    </div>
  );
};

export default HomeTitleVideoSection; 