import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// GSAP 플러그인 등록
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 프로젝트 데이터 타입 정의
interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// WorkCardList 컴포넌트: GSAP 스크롤 카드 캐러셀
const WorkCardList: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // 프로젝트 데이터
  const projects: ProjectData[] = [
    {
      id: 1,
      title: "정보공개 유지보수",
      description: "종합 정보공개시스템의 유지보수 및 운영을 담당하는 프로젝트입니다.",
      image: "/works/openGoKrImg.png",
      category: "IT"
    },
    {
      id: 2,
      title: "공공 디자인",
      description: "사용자 친화적인 버스정류장 인터페이스 디자인으로 일상의 대중교통을 더욱 편리하게 만드는 프로젝트입니다.",
      image: "/works/3_4/busStopImg34.jpeg",
      category: "Public Design"
    },
    {
      id: 3,
      title: "컨셉 아트 디자인",
      description: "창의적인 아이디어를 시각적으로 구현하는 컨셉 아트 작업으로 프로젝트의 비전을 명확하게 전달합니다.",
      image: "/works/3_4/conceptArtImg34.jpeg",
      category: "Concept Art"
    },
    {
      id: 4,
      title: "3D 정보 시각화",
      description: "복잡한 데이터를 직관적인 3D 시각화로 표현하여 정보 전달의 효율성을 극대화한 프로젝트입니다.",
      image: "/works/3_4/Info3DImg34.jpeg",
      category: "3D Visualization"
    },
    {
      id: 5,
      title: "모션그래픽 디자인",
      description: "모바일 환경에 최적화된 사용자 인터페이스로 터치 기반 상호작용을 고려한 직관적인 디자인을 제공합니다.",
      image: "/works/motion2D2.jpeg",
      category: "MotionGraphic Design"
    },
    {
      id: 6,
      title: "UI/UX 디자인",
      description: "사용자 경험을 중심으로 한 인터랙티브 프로토타입으로 실제 사용 시나리오를 미리 검증할 수 있습니다.",
      image: "/works/3_4/KakaoTalk_Photo_2025-07-28-10-00-50 005.jpeg",
      category: "UI/UX Design"
    }
  ];

  // 반응형 카드 크기 계산 (3:4 비율 고정)
  const getCardDimensions = () => {
    if (isMobile) {
      return { width: 240, height: 320 }; // 모바일: 3:4 비율
    } else if (isTablet) {
      return { width: 270, height: 360 }; // 태블릿: 3:4 비율
    } else {
      return { width: 300, height: 400 }; // 데스크톱: 3:4 비율, 5개씩 보이게
    }
  };

  // 스크롤 위치에 따른 활성 인덱스 계산
  const updateActiveIndex = () => {
    if (!carouselRef.current) return;
    
    const scrollLeft = carouselRef.current.scrollLeft;
    const { width: cardWidth } = getCardDimensions();
    const gap = 20;
    const cardWithGap = cardWidth + gap;
    
    const newIndex = Math.round(scrollLeft / cardWithGap);
    setActiveIndex(Math.min(Math.max(newIndex, 0), projects.length - 1));
  };

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // GSAP 애니메이션 설정
  useEffect(() => {
    if (!carouselRef.current || !cardsRef.current) return;

    // 기존 ScrollTrigger 정리
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const carouselElement = carouselRef.current;
    const cardsContainer = cardsRef.current;
    const cards = cardsContainer?.children;
    
    if (!cards || cards.length === 0) return;

    const { width: cardWidth } = getCardDimensions();
    const gap = 20;
    const totalCardsWidth = (cards.length * cardWidth) + ((cards.length - 1) * gap);

    // 카드 컨테이너의 너비를 설정하여 가로 스크롤 가능하게 함
    gsap.set(cardsContainer, { 
      width: `${totalCardsWidth}px`,
      x: 0
    });
    
    // 개별 카드에 설정된 GSAP 속성 초기화
    gsap.set(cards, { 
      clearProps: "all"
    });

    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      updateActiveIndex();
    };

    carouselElement.addEventListener("scroll", handleScroll);

    // 데스크톱에서만 커스텀 스크롤 로직 적용
    if (!isMobile && !isTablet) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const scrollAmount = e.deltaY * 2;
        gsap.to(carouselElement, {
          scrollLeft: carouselElement.scrollLeft + scrollAmount,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      carouselElement.addEventListener("wheel", handleWheel, { passive: false });
      (carouselElement as HTMLElement & { _wheelListener?: (e: WheelEvent) => void })._wheelListener = handleWheel;
    }

    // 호버 효과 추가
    Array.from(cards).forEach((card) => {
      const cardElement = card as HTMLElement;
      
      const handleMouseEnter = () => {
        gsap.to(cardElement, {
          scale: 1.03,
          y: -8,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cardElement, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      };

      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);

      const cardWithListeners = cardElement as HTMLElement & { _hoverListeners?: { mouseenter: () => void; mouseleave: () => void } };
      cardWithListeners._hoverListeners = {
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave
      };
    });

    // Cleanup function
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", handleScroll);
        const carouselWithListener = carouselElement as HTMLElement & { _wheelListener?: (e: WheelEvent) => void };
        const wheelListener = carouselWithListener._wheelListener;
        if (wheelListener) {
          carouselElement.removeEventListener("wheel", wheelListener);
        }
      }

      const currentCardsRef = cardsRef.current;
      if (currentCardsRef) {
        const cards = currentCardsRef.children;
        Array.from(cards).forEach((card) => {
          const cardElement = card as HTMLElement;
          const cardWithListeners = cardElement as HTMLElement & { _hoverListeners?: { mouseenter: () => void; mouseleave: () => void } };
          const listeners = cardWithListeners._hoverListeners;
          if (listeners) {
            cardElement.removeEventListener("mouseenter", listeners.mouseenter);
            cardElement.removeEventListener("mouseleave", listeners.mouseleave);
          }
        });
      }
      
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, isTablet, getCardDimensions, updateActiveIndex]);

  // 인디케이터 클릭 핸들러
  const handleIndicatorClick = (index: number) => {
    if (!carouselRef.current) return;
    
    const { width: cardWidth } = getCardDimensions();
    const gap = 20;
    const scrollPosition = index * (cardWidth + gap);
    
    gsap.to(carouselRef.current, {
      scrollLeft: scrollPosition,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const { width: cardWidth, height: cardHeight } = getCardDimensions();

  return (
    <section className="w-full max-w-full mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-50">
      {/* 섹션 헤더 */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold transition-colors duration-300 text-black"
        >
          WORKS
        </h2>
        <p className="text-lg mt-2 transition-colors duration-300 text-gray-600">
          {isMobile ? '좌우로 스와이프하여 프로젝트를 탐색해보세요' : '스크롤하여 프로젝트를 탐색해보세요'}
        </p>
      </div>

      {/* 캐러셀 컨테이너 */}
      <div className="relative">
        <div 
          ref={carouselRef}
          className="relative w-full overflow-x-auto scrollbar-hide"
          style={{ 
            height: `${cardHeight + 40}px`,
            scrollBehavior: (isMobile || isTablet) ? "smooth" : "auto"
          }}
        >
          <div 
            ref={cardsRef}
            className="flex gap-5 pb-4"
            style={{ 
              height: "100%"
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer flex-shrink-0 bg-white shadow-gray-200/50"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  minWidth: `${cardWidth}px`,
                  maxWidth: `${cardWidth}px`
                }}
              >
                {/* 이미지 컨테이너 - 3:4 비율에서 상단 55% */}
                <div className="w-full relative overflow-hidden" style={{ height: `${cardHeight * 0.55}px` }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={cardWidth}
                    height={cardHeight * 0.55}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      width: `${cardWidth}px`, 
                      height: `${cardHeight * 0.55}px`,
                      objectFit: 'cover'
                    }}
                    priority={false}
                  />
                  
                  {/* 이미지 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>

                {/* 카드 정보 섹션 - 3:4 비율에서 하단 45% */}
                <div className="w-full relative overflow-hidden" style={{ height: `${cardHeight * 0.45}px` }}>
                  {/* 기본 정보 */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-start transition-all duration-300 group-hover:opacity-0">
                    <span className="text-xs font-semibold uppercase tracking-wide mb-2 block text-blue-600">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-lg leading-tight text-gray-900">
                      {project.title}
                    </h3>
                  </div>

                  {/* 호버 시 상세 정보 */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-start opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed overflow-hidden" 
                       style={{ 
                         display: '-webkit-box',
                         WebkitLineClamp: isMobile ? 3 : 4,
                         WebkitBoxOrient: 'vertical'
                       } as React.CSSProperties}>
                      {project.description}
                    </p>
                  </div>

                  {/* 호버 시 배경 오버레이 */}
                 
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 스크롤 인디케이터 - 데스크톱에서만 표시 */}
        {!isMobile && !isTablet && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleIndicatorClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                    index === activeIndex ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                  aria-label={`프로젝트 ${index + 1}로 이동`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 커스텀 스크롤바 숨김 스타일 */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default WorkCardList;