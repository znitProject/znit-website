import React, { useState, useEffect, useRef } from "react";
import { Building2, Brush, BarChart3, Play, Smartphone } from "lucide-react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Card {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  tags: string[];
  isVideo?: boolean;
}

const UICraftCards: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    if (titleRef.current) {
      const titleText = titleRef.current.textContent || "";
      titleRef.current.innerHTML = titleText
        .split("")
        .map((char, i) =>
          char === " "
            ? " "
            : `<span class="inline-block char-${i}">${char}</span>`
        )
        .join("");

      gsap.fromTo(
        titleRef.current.querySelectorAll("span"),
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: "50% 50% -50px",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Cards animation
    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
          },
        }
      );
    }
  }, [mounted]);

  const getIconColor = (theme: string | undefined) => {
    return theme === "dark" ? "text-gray-300" : "text-gray-600";
  };

  const cards: Card[] = [
    {
      id: 1,
      title: "모션 그래픽 디자인",
      description:
        "2D 모션 영상과 3D 기반 애니메이션까지,\n 목적에 맞는 다이나믹한 모션 콘텐츠를 제작합니다.",
      icon: <Play className="w-4 h-4" />,
      image: "/MotionGraphicVideo.mp4",
      tags: ["2D", "3D"],
      isVideo: true,
    },
    {
      id: 2,
      title: "공공 디자인",
      description:
        "버스정류장, 안내판 등 교통 시설물 디자인과\n 키오스크 UI 설계까지 모두 진행합니다.",
      icon: <Building2 className="w-4 h-4" />,
      image: "/works/3_4/busStopImg34.jpeg",
      tags: ["키오스크 디자인", "교통시설물 디자인"],
    },
    {
      id: 3,
      title: "컨셉 아트 디자인",
      description:
        "스케치 기반 원화부터 AI·합성 기술을 활용한 컨셉 아트까지,\n 비주얼의 시작을 함께 그립니다.",
      icon: <Brush className="w-4 h-4" />,
      image: "/works/3_4/conceptArtImg34.jpeg",
      tags: ["스케치", "AI 합성"],
    },
    {
      id: 4,
      title: "인포그래픽 디자인",
      description:
        "프레젠테이션용 PPT 디자인과 콘텐츠를 시각화한\n 컨셉 인포그래픽을 제작합니다.",
      icon: <BarChart3 className="w-4 h-4" />,
      image: "/works/3_4/Info3DImg34.jpeg",
      tags: ["PPT", "컨셉그래픽"],
    },
    {
      id: 5,
      title: "UI/UX 디자인",
      description:
        "웹사이트와 모바일 앱 모두에 최적화된 UI/UX 설계로\n 사용성과 디자인을 모두 잡습니다.",
      icon: <Smartphone className="w-4 h-4" />,
      image: "/works/3_4/KakaoTalk_Photo_2025-07-28-10-00-50 005.jpeg",
      tags: ["WEB", "APP"],
    },
  ];

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!mounted) return null;

  return (
    <div
      id="design-section"
      className={`min-h-screen flex flex-col items-center justify-center gap-4 p-4 sm:p-6 md:p-8 relative overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-850" : "bg-white"
      }`}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-7 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(950deg, ${theme === "dark" ? "#fff" : "#000"} 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 md:top-8 z-10">
        <h1
          ref={titleRef}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
          style={{ fontFamily: "Red Hat Display, sans-serif" }}
        >
          Design with ZNIT
        </h1>
      </div>

      {/* Accordion Cards Container */}
      <div className="flex flex-col w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl gap-2 sm:gap-3 pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8">
        {cards.map((card, index) => {
          const isOpen = expandedIndex === index;
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
                theme === "dark"
                  ? "bg-zinc-800 border-zinc-600"
                  : "bg-white border-gray-300"
              } ${
                isOpen
                  ? "h-56 sm:h-72 md:h-96 lg:h-112 xl:h-128 2xl:h-144"
                  : "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16"
              }`}
              onClick={() => handleCardClick(index)}
            >
              <article
                className={`relative w-full h-full font-mono ${
                  isOpen ? "p-3 sm:p-4 md:p-6 lg:p-8 xl:p-9" : ""
                }`}
              >
                {/* Background Image/Video - Only visible when expanded */}
                {isOpen && (
                  <>
                    {card.isVideo ? (
                      <video
                        src={card.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700"
                        style={{
                          pointerEvents: "none",
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    ) : (
                      <img
                        src={card.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 grayscale-0 brightness-100 scale-100 blur-0"
                      />
                    )}
                  </>
                )}

                {/* Header Content (icon + title + chevron) */}
                <div
                  className={`z-10 ${
                    isOpen
                      ? "relative flex items-start justify-between flex-col gap-2"
                      : // 닫힘: 상하 완전 중앙 정렬
                        "absolute inset-0 flex items-center justify-between px-3 sm:px-4 md:px-6"
                  }`}
                >
                  <div
                    className={`${isOpen ? "w-full flex items-center justify-between" : "relative flex items-center gap-4"}`}
                  >
                    <div
                      className={`flex items-center gap-4 ${
                        isOpen
                          ? "backdrop-blur-sm bg-white/80 px-4 py-2 rounded-lg shadow-sm"
                          : ""
                      }`}
                    >
                      <div
                        className={`transition-all duration-700 ${getIconColor(theme)}`}
                      >
                        {card.icon}
                      </div>

                      <h3
                        className={`
          text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
          font-extrabold uppercase leading-none  /* 👈 라인하이트 착시 제거 */
          ${theme === "dark" ? "text-white" : "text-gray-900"}
        `}
                        style={
                          isOpen
                            ? {
                                textShadow:
                                  theme === "dark"
                                    ? "1px 1px 2px rgba(0,0,0,0.8)"
                                    : "1px 1px 2px rgba(255,255,255,0.8)",
                              }
                            : {}
                        }
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Expand/Collapse Indicator */}
                    <div
                      className={`transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      aria-hidden
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 11L3 6h10L8 11z" />
                      </svg>
                    </div>
                  </div>

                  {/* Tags - Right below title when expanded */}
                  {isOpen && (
                    <div className="flex gap-2 flex-wrap mt-1">
                      {card.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border backdrop-blur-sm shadow-sm transition-colors duration-300 ${
                            theme === "dark"
                              ? "bg-zinc-800/80 border-zinc-600/60 text-gray-200"
                              : "bg-blue-100 border-gray-300 text-gray-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded Content - Description only */}
                {isOpen && (
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 z-10 transition-all duration-500 opacity-100 translate-y-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                    <p
                      className={`text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line backdrop-blur-sm bg-white/80 p-3 rounded-lg ${
                        theme === "dark"
                          ? "text-white shadow-lg"
                          : "text-gray-900 shadow-md"
                      }`}
                      style={{
                        textShadow:
                          theme === "dark"
                            ? "1px 1px 2px rgba(0,0,0,0.8)"
                            : "1px 1px 2px rgba(255,255,255,0.8)",
                      }}
                    >
                      {card.description}
                    </p>
                  </div>
                )}
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UICraftCards;
