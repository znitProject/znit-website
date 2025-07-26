import React from "react";

// 상단 오른쪽의 비디오 영역 컴포넌트 - 모바일 퍼스트 최적화
const HomeTitleVideoSection: React.FC = () => {
  return (
    <div className="w-full flex justify-center xl:justify-end items-center xl:items-end">
      {/* 모바일 퍼스트 비디오 컨테이너 - 화면 비율에 맞는 적응형 크기 */}
      <div className="w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[680px] xl:max-w-[750px] aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* 반복 재생되는 비디오 - 모바일 성능 최적화 */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/TitleSectionVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata" // 모바일에서 데이터 절약을 위해 metadata만 미리 로드
          poster="/video-poster.jpg" // 포스터 이미지 추가 (실제 파일이 있다면)
          onLoadStart={() => {
            // 모바일에서 비디오 로딩 최적화
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              // 모바일에서는 품질을 조금 낮춘 버전을 사용할 수 있음
            }
          }}
        />

        {/* 로딩 상태를 위한 플레이스홀더 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 opacity-20 z-10 pointer-events-none"></div>

        {/* 모바일에서 터치 피드백을 위한 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-200 z-20 cursor-pointer md:cursor-default"></div>
      </div>
    </div>
  );
};

export default HomeTitleVideoSection;
