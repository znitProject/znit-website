import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import { useTheme } from "next-themes";
import ImageProtection from "./ImageProtection";

// GSAP 플러그인 등록
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// 프로젝트 데이터 타입 정의
interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// 커스텀 HTMLElement 타입 정의
interface CustomHTMLElement extends HTMLElement {
  _wheelListener?: (e: WheelEvent) => void;
  _hoverListeners?: {
    start: () => void;
    end: () => void;
    isMobile: boolean;
  };
}

// WorkCardList 컴포넌트: GSAP 스크롤 카드 캐러셀
const WorkCardList: React.FC = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';
  const [scrollProgress, setScrollProgress] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  // 프로젝트 데이터
  const projects: ProjectData[] = [
    {
      id: 1,
      title: "IT 서비스 솔루션",
      description: "-SI\n-DX",
      image: "/works/openGoKrImg.png",
      category: "IT"
    },
    {
      id: 2,
      title: "공공 디자인",
      description: "-키오스크 디자인\n-교통 시설물 디자인",
      image: "/works/3_4/busStopImg34.jpeg",
      category: "Public Design"
    },
    {
      id: 3,
      title: "컨셉 아트 디자인",
      description: "-스케치\n-AI/합성",
      image: "/works/3_4/conceptArtImg34.jpeg",
      category: "Concept Art"
    },
    {
      id: 4,
      title: "인포그래픽 디자인",
      description: "-PPT\n-컨셉 그래픽",
      image: "/works/3_4/Info3DImg34.jpeg",
      category: "3D Visualization"
    },
    {
      id: 5,
      title: "모션그래픽 디자인",
      description: "-2D\n-3D",
      image: "/works/motion2D2.jpeg",
      category: "MotionGraphic Design"
    },
    {
      id: 6,
      title: "UI/UX 디자인",
      description: "-WEB\n-APP",
      image: "/works/3_4/KakaoTalk_Photo_2025-07-28-10-00-50 005.jpeg",
      category: "UI/UX Design"
    }
  ];

  // 카드 5개 고정 (gap 포함 전체 너비 계산)
  const CARD_COUNT = 5;
  const CARD_GAP = 24; // px, 적당한 여백
  const [cardWidth, setCardWidth] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);

  // 카드 크기 계산 (한 화면에 5개)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const containerPadding = 32 * 2; // px, 좌우 패딩 (px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 중 가장 큰 값)
      const totalGap = CARD_GAP * (CARD_COUNT - 1);
      const availableWidth = window.innerWidth - containerPadding - 2; // 여유
      const width = Math.floor((availableWidth - totalGap) / CARD_COUNT);
      const height = Math.floor(width * 1.333); // 3:4 비율
      setCardWidth(width);
      setCardHeight(height);
    }
  }, []);

  // 스크롤 진행률 계산 - throttle 적용
  const updateScrollProgress = useCallback(() => {
    if (!carouselRef.current || isScrollingRef.current) return;
    
    const scrollLeft = carouselRef.current.scrollLeft;
    const scrollWidth = carouselRef.current.scrollWidth;
    const clientWidth = carouselRef.current.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    
    const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
    setScrollProgress(progress);
  }, []);

  // GSAP 애니메이션 및 휠 이벤트
  useEffect(() => {
    if (!carouselRef.current || !cardsRef.current) return;
    
    const carouselElement = carouselRef.current;
    const cardsContainer = cardsRef.current;
    const cards = cardsContainer?.children;
    
    if (!cards || cards.length === 0) return;
    
    // 카드 컨테이너 너비 설정
    const totalCardsWidth = (cards.length * cardWidth) + ((cards.length - 1) * CARD_GAP);
    gsap.set(cardsContainer, { width: `${totalCardsWidth}px`, x: 0 });
    gsap.set(cards, { clearProps: "all" });
    
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = requestAnimationFrame(() => {
        updateScrollProgress();
      });
    };
    
    carouselElement.addEventListener("scroll", handleScroll, { passive: true });
    
    // GSAP 부드러운 가로 스크롤 (캐러셀 위에서만)
    const handleWheel = (e: WheelEvent) => {
      // 캐러셀 영역 위에서만 동작
      if (e.deltaY === 0) return;
      e.preventDefault();
      const current = carouselElement.scrollLeft;
      const maxScroll = carouselElement.scrollWidth - carouselElement.clientWidth;
      let target = current + e.deltaY * 2.2; // 감도
      target = Math.max(0, Math.min(target, maxScroll));
      
      gsap.to(carouselElement, {
        scrollTo: { x: target },
        duration: 0.6,
        ease: "power2.out"
      });
    };
    
    carouselElement.addEventListener("wheel", handleWheel, { passive: false });
    (carouselElement as CustomHTMLElement)._wheelListener = handleWheel;
    
    // 호버 효과 최적화
    Array.from(cards).forEach((card) => {
      const cardElement = card as CustomHTMLElement;
      cardElement.style.willChange = 'transform';
      
      const handleInteractionStart = () => {
        gsap.to(cardElement, {
          scale: 1.03,
          y: -8,
          duration: 0.2,
          ease: "power1.out",
          force3D: true
        });
      };
      
      const handleInteractionEnd = () => {
        gsap.to(cardElement, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: "power1.out",
          force3D: true
        });
      };
      
      cardElement.addEventListener("mouseenter", handleInteractionStart);
      cardElement.addEventListener("mouseleave", handleInteractionEnd);
      
      cardElement._hoverListeners = {
        start: handleInteractionStart,
        end: handleInteractionEnd,
        isMobile: false
      };
    });
    
    updateScrollProgress();
    
    // Cleanup
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", handleScroll);
        const wheelListener = (carouselElement as CustomHTMLElement)._wheelListener;
        if (wheelListener) carouselElement.removeEventListener("wheel", wheelListener);
      }
      
      // cardsRef.current 값을 cleanup function 실행 시점에 저장
      const currentCardsContainer = cardsContainer;
      if (currentCardsContainer) {
        const cards = currentCardsContainer.children;
        Array.from(cards).forEach((card) => {
          const cardElement = card as CustomHTMLElement;
          const listeners = cardElement._hoverListeners;
          cardElement.style.willChange = 'auto';
          
          if (listeners) {
            cardElement.removeEventListener("mouseenter", listeners.start);
            cardElement.removeEventListener("mouseleave", listeners.end);
          }
        });
      }
      
      gsap.killTweensOf(carouselElement);
      gsap.killTweensOf(cards);
    };
  }, [cardWidth, cardHeight, updateScrollProgress]);

  return (
    <section className="w-full max-w-full mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-50 mt-10">
      {/* 섹션 헤더 */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        >
          WORKS
        </h2>
        <h3 className="text-black mt-3">ZNIT에서 진행중인 프로젝트입니다.</h3>       
      </div>
      
      {/* 캐러셀 컨테이너 */}
      <div className="relative">
        <div 
          ref={carouselRef}
          className="relative w-full overflow-x-auto scrollbar-hide"
          style={{ 
            height: `${cardHeight + 40}px`,
            scrollBehavior: "auto"
          }}
        >
          <div 
            ref={cardsRef}
            className="flex pb-4"
            style={{ 
              height: "100%",
              gap: `${CARD_GAP}px`
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className={`group relative rounded-xl shadow-lg overflow-hidden transition-all duration-200 cursor-pointer flex-shrink-0 flex flex-col ${
                  darkMode ? 'bg-zinc-700/50 shadow-gray-900/50' : 'bg-gray-100 shadow-gray-200/50'
                }`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  minWidth: `${cardWidth}px`,
                  maxWidth: `${cardWidth}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  transform: 'translateZ(0)'
                }}
              >
                {/* 이미지 컨테이너 */}
                <ImageProtection 
                  className="w-full relative overflow-hidden flex-shrink-0 image-container" 
                  style={{ 
                    height: `${cardHeight * 0.7}px`,
                    minHeight: `${cardHeight * 0.7}px`,
                    maxHeight: `${cardHeight * 0.7}px`
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={cardWidth}
                    height={cardHeight * 0.7}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
                    style={{ 
                      width: `${cardWidth}px`, 
                      height: `${cardHeight * 0.7}px`,
                      objectFit: 'cover',
                      pointerEvents: 'none'
                    }}
                    priority={project.id <= 3}
                    loading={project.id <= 3 ? "eager" : "lazy"}
                    draggable={false}
                  />
                  {/* 이미지 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"></div>
                </ImageProtection>
                
                {/* 카드 정보 섹션 */}
                <div 
                  className="w-full relative overflow-hidden flex flex-col flex-1" 
                  style={{ 
                    height: `${cardHeight * 0.3}px`,
                    minHeight: `${cardHeight * 0.3}px`,
                    maxHeight: `${cardHeight * 0.3}px`
                  }}
                >
                  {/* 통합 정보 */}
                  <div className="absolute inset-0 flex flex-col justify-start"
                       style={{ 
                         padding: `${Math.max(8, cardWidth * 0.03)}px ${Math.max(10, cardWidth * 0.04)}px`,
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'flex-start',
                         alignItems: 'flex-start'
                       }}>
                    <span className={`font-semibold uppercase tracking-wide block text-sky-600 text-sm mb-1`}>
                      {project.category}
                    </span>
                    <h3 className={`font-bold leading-tight ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    } text-lg mb-1`}
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          wordBreak: 'keep-all'
                        } as React.CSSProperties}>
                      {project.title}
                    </h3>
                    <p className={`leading-tight overflow-hidden ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    } text-sm`}
                       style={{ 
                         display: '-webkit-box',
                         WebkitLineClamp: 3,
                         WebkitBoxOrient: 'vertical',
                         overflow: 'hidden',
                         wordBreak: 'keep-all',
                         whiteSpace: 'pre-line'
                       } as React.CSSProperties}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 스크롤 프로그레스 바 */}
        <div className="flex justify-center mt-6">
          <div className={`rounded-full overflow-hidden ${
            darkMode ? 'bg-gray-600' : 'bg-gray-300'
          } w-64 h-1`}>
            <div 
              className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${scrollProgress * 100}%`,
                transformOrigin: 'left center'
              }}
            />
          </div>
        </div>
        
        {/* 스크롤 힌트 텍스트 */}
        {scrollProgress < 0.1 && (
          <div className="flex justify-center mt-3">
            <p className={`text-center ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            } text-sm`}>
              {'마우스 휠로 더 많은 프로젝트를 확인해보세요'}
            </p>
          </div>
        )}
      </div>
      
      {/* 커스텀 스크롤바 숨김 스타일 - 성능 최적화 */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* 이미지 컨테이너 보호 */
        .image-container {
          pointer-events: none;
        }
        
        .image-container img {
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default WorkCardList;