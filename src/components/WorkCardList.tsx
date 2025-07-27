import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// WorkCardList 컴포넌트: 하단 WORK 카드 리스트 - 모바일 퍼스트 최적화
const WorkCardList: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지 및 테마 상태 초기화
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 모바일용 더 적은 수의 작품 표시
  const itemCount = isMobile ? 4 : 5;

  // 실제 이미지 데이터
  const workImages = [
    "/work_image.jpg",
    "/flower/fleur1.png",
    "/flower/fleur2.png",
    "/flower/fleur3.png",
    "/flower/fleur4.png",
    "/recruit-image.jpg",
    "/contact_us_image.jpg",
    "/contact_us_image2.jpg",
  ];

  return (
    <section className="w-full max-w-full mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-50">
      {/* 섹션 헤더 - 간소화 */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors duration-300">
          WORKS
        </h2>
      </div>

      {/* 반응형 그리드 - 모바일 퍼스트 접근 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {Array.from({ length: itemCount }, (_, i) => (
          <div
            key={i}
            className="group relative rounded-xl sm:rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl min-w-0 cursor-pointer"
            style={{
              // 모바일에서 터치 친화적인 최소 크기 보장
              minHeight: isMobile ? "160px" : "200px",
              zIndex: 9999,
            }}
          >
            {/* 세로로 긴 썸네일 (3:4 비율) - 모바일 최적화 */}
            <div className="w-full aspect-[3/4] relative overflow-hidden">
              {/* 실제 이미지 - 높은 z-index로 보장 */}
              <img
                src={workImages[i % workImages.length]}
                alt={`프로젝트 ${i + 1}`}
                className="w-full h-full object-cover z-50"
                style={{ zIndex: 9999, position: "relative" }}
                loading="lazy"
                onError={(e) => {
                  // 이미지 로드 실패 시 기본 이미지로 대체
                  const target = e.target as HTMLImageElement;
                  target.src = "/work_image.jpg";
                  console.log(
                    `이미지 로드 실패: ${workImages[i % workImages.length]}`
                  );
                }}
                onLoad={() => {
                  console.log(
                    `이미지 로드 성공: ${workImages[i % workImages.length]}`
                  );
                }}
              />

              {/* 호버/터치 효과 - 낮은 z-index */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 z-10"></div>

              {/* 모바일에서 터치 피드백을 위한 리플 효과 - 낮은 z-index */}
              <div className="absolute inset-0 bg-white bg-opacity-0 group-active:bg-opacity-20 transition-all duration-150 md:hidden z-20"></div>
            </div>

            {/* 프로젝트 정보 - 모바일에서 간소화 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
              <h3 className="font-semibold text-sm sm:text-base mb-1">
                프로젝트 {i + 1}
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                {isMobile ? "2024" : "2024 • 웹 개발"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkCardList;
