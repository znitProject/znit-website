import React, { useState, useEffect, useRef } from "react";
import {
  Server,
  Building2,
  Brush,
  BarChart3,
  Play,
  Smartphone,
} from "lucide-react";
import { useTheme } from "next-themes";

interface Card {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  tags: string[];
}

const UICraftCards: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cards: Card[] = [
    {
      id: 1,
      title: "공공 디자인",
      description:
        "버스정류장, 안내판 등 교통 시설물 디자인과 키오스크 UI 설계까지 모두 진행합니다.",
      icon: <Building2 className="w-4 h-4" />,
      image: "/works/3_4/busStopImg34.jpeg",
      tags: ["키오스크 디자인", "교통시설물 디자인"],
    },
    {
      id: 2,
      title: "컨셉 아트 디자인",
      description:
        "스케치 기반 원화부터 AI·합성 기술을 활용한 컨셉 아트까지, 비주얼의 시작을 함께 그립니다.",
      icon: <Brush className="w-4 h-4" />,
      image: "/works/3_4/conceptArtImg34.jpeg",
      tags: ["스케치", "AI 합성성"],
    },
    {
      id: 3,
      title: "인포그래픽 디자인",
      description:
        "프레젠테이션용 PPT 디자인과 콘텐츠를 시각화한 컨셉 인포그래픽을 제작합니다.",
      icon: <BarChart3 className="w-4 h-4" />,
      image: "/works/3_4/Info3DImg34.jpeg",
      tags: ["PPT", "컨셉그래픽"],
    },
    {
      id: 4,
      title: "모션 그래픽 디자인",
      description:
        "2D 모션 영상과 3D 기반 애니메이션까지, 목적에 맞는 다이나믹한 모션 콘텐츠를 제작합니다.",
      icon: <Play className="w-4 h-4" />,
      image: "/works/motion2D2.jpeg",
      tags: ["2D", "3D"],
    },
    {
      id: 5,
      title: "UI/UX 디자인",
      description:
        "웹사이트와 모바일 앱 모두에 최적화된 UI/UX 설계로 사용성과 디자인을 모두 잡습니다.",
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
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-10">
        <h1
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
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
              theme === "dark"
                ? "bg-zinc-800 border-zinc-600"
                : "bg-white border-gray-300"
            } ${
              expandedIndex === index
                ? "h-56 sm:h-72 md:h-96 lg:h-112 xl:h-128 2xl:h-144"
                : "h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16"
            }`}
            onClick={() => handleCardClick(index)}
          >
            <article className="relative w-full h-full p-3 sm:p-4 md:p-6 lg:p-8 xl:p-9 font-mono">
              {/* Background Image */}
              <img
                src={card.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                  expandedIndex === index
                    ? "grayscale-0 brightness-100 scale-100"
                    : "grayscale brightness-150 scale-110"
                }`}
                style={{
                  mask: "radial-gradient(140% 140% at 100% 0, #fff, transparent)",
                }}
              />

              {/* Header Content */}
              <div
                className={`relative z-10 flex items-center justify-between ${
                  expandedIndex === index ? "" : "h-full"
                }`}
              >
                <div className="relative flex items-center gap-4">
                  {/* 블러 오버레이 */}
                  <div
                    className="absolute inset-0 rounded-md pointer-events-none
                    backdrop-blur-[3px] backdrop-brightness-95"
                  />

                  {/* 실제 아이콘 + 타이틀 */}
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`transition-opacity duration-700 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {card.icon}
                    </div>

                    <h3
                      className={`
                text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                font-extrabold uppercase
                transition-opacity duration-700
                ${theme === "dark" ? "text-white" : "text-gray-900"}
            `}
                    >
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Expand/Collapse Indicator */}
                <div
                  className={`transform transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : "rotate-0"
                  } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
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

              {/* Description and Tags - Bottom Left */}
              <div
                className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-1/2 z-10 transition-all duration-500 ${
                  expandedIndex === index
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p
                  className={`text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {card.description}
                </p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {card.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 text-xs sm:text-sm rounded-full border transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-zinc-700 border-zinc-600 text-gray-300"
                          : "bg-blue-100 border-gray-300 text-gray-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Footer Link - 제거됨 */}
    </div>
  );
};

export default UICraftCards;
