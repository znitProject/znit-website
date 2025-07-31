import React, { useState, useEffect, useRef } from "react";

// 상단 오른쪽의 비디오 영역 컴포넌트 - 모바일 퍼스트 최적화
const HomeTitleVideoSection: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const videos = [
    "/TitleSectionVideo.mp4",
    "/titleSectionVideo2.mp4"
  ];

  // 비디오가 끝날 때마다 다음 비디오로 전환
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // 현재 비디오 인덱스가 변경될 때마다 비디오 소스 업데이트
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.log("비디오 자동 재생 실패:", error);
      });
    }
  }, [currentVideoIndex]);

  return (
    <div className="w-full flex justify-center xl:justify-end items-center xl:items-end relative z-50 mt-16">
      {/* 모바일 퍼스트 비디오 컨테이너 - 화면 비율에 맞는 적응형 크기 */}
      <div
        className="w-full max-w-[400px] xs:max-w-[420px] sm:max-w-[480px] md:max-w-[740px] lg:max-w-[920px] xl:max-w-[950px] aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        style={{ zIndex: 9999 }}
      >
        {/* 번갈아 재생되는 비디오 - 모바일 성능 최적화 */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-50"
          src={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          preload="metadata"
          style={{ zIndex: 9999, position: "absolute" }}
          onEnded={handleVideoEnded}
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
