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
import Image from "next/image";

interface Card {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const UICraftCards: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [gridColumns, setGridColumns] = useState("10fr 1fr 1fr 1fr 1fr 1fr");
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mobileGridRows, setMobileGridRows] = useState(
    "10fr 1fr 1fr 1fr 1fr 1fr"
  );
  const listRef = useRef<HTMLUListElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cards: Card[] = [
    {
      id: 1,
      title: "IT 서비스 솔루션",
      description:
        "SI 구축부터 DX 기반 시스템 운영까지, 기업 맞춤형 IT 서비스를 설계하고 유지보수합니다.",
      icon: <Server className="w-4 h-4" />,
      image: "/works/openGoKrImg.png",
    },
    {
      id: 2,
      title: "공공 디자인",
      description:
        "버스정류장, 안내판 등 교통 시설물 디자인과 키오스크 UI 설계까지 모두 진행합니다.",
      icon: <Building2 className="w-4 h-4" />,
      image: "/works/3_4/busStopImg34.jpeg",
    },
    {
      id: 3,
      title: "컨셉 아트 디자인",
      description:
        "스케치 기반 원화부터 AI·합성 기술을 활용한 컨셉 아트까지, 비주얼의 시작을 함께 그립니다.",
      icon: <Brush className="w-4 h-4" />,
      image: "/works/3_4/conceptArtImg34.jpeg",
    },
    {
      id: 4,
      title: "인포그래픽 디자인",
      description:
        "프레젠테이션용 PPT 디자인과 콘텐츠를 시각화한 컨셉 인포그래픽을 제작합니다.",
      icon: <BarChart3 className="w-4 h-4" />,
      image: "/works/3_4/Info3DImg34.jpeg",
    },
    {
      id: 5,
      title: "모션 그래픽 디자인",
      description:
        "2D 모션 영상과 3D 기반 애니메이션까지, 목적에 맞는 다이나믹한 모션 콘텐츠를 제작합니다.",
      icon: <Play className="w-4 h-4" />,
      image: "/works/motion2D2.jpeg",
    },
    {
      id: 6,
      title: "UI/UX 디자인",
      description:
        "웹사이트와 모바일 앱 모두에 최적화된 UI/UX 설계로 사용성과 디자인을 모두 잡습니다.",
      icon: <Smartphone className="w-4 h-4" />,
      image: "/works/3_4/KakaoTalk_Photo_2025-07-28-10-00-50 005.jpeg",
    },
  ];

  const handleCardInteraction = (index: number) => {
    setActiveIndex(index);
    const cols = new Array(cards.length)
      .fill("")
      .map((_, i) => (index === i ? "10fr" : "1fr"))
      .join(" ");
    setGridColumns(cols);
  };

  const handleMobileCardInteraction = (index: number) => {
    setMobileActiveIndex(index);
    const rows = new Array(cards.length)
      .fill("")
      .map((_, i) => (index === i ? "10fr" : "1fr"))
      .join(" ");
    setMobileGridRows(rows);
  };

  useEffect(() => {
    // Initialize with first card active
    handleCardInteraction(0);
    handleMobileCardInteraction(0);
  }, [handleCardInteraction, handleMobileCardInteraction]);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center gap-4 p-8 relative overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-850" : "bg-white"
      }`}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-7 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(950deg, ${theme === "dark" ? "#fff" : "#000"} 1px, transparent 1px),
            linear-gradient(${theme === "dark" ? "#fff" : "#000"} 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Header */}
      <div className="text-center mb-16 z-10">
        <h1
          className={`text-4xl md:text-6xl font-bold mb-6 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          What We Do
        </h1>
        <p
          className={`max-w-1xl mx-auto text-sm font-mono leading-relaxed opacity-80 transition-colors duration-300 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          아이디어를 현실로 바꾸는 팀, ZNIT는 생각만 하지 않고, 직접 만듭니다.
          끊임없는 도전과 세심한 손길로 완성도 높은 결과물을 만들어냅니다.
        </p>
      </div>

      {/* Cards Container */}
      {/* 모바일: 세로 레이아웃 (접힘/펼침 기능 포함) */}
      <div
        ref={mobileListRef}
        className="grid md:hidden w-full max-w-lg h-96 gap-2 transition-all duration-700 ease-out"
        style={{
          gridTemplateRows: mobileGridRows,
          transition: "grid-template-rows 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`relative border rounded-lg overflow-hidden min-h-16 cursor-pointer group transition-colors duration-300 ${
              theme === "dark"
                ? "bg-zinc-800 border-zinc-600"
                : "bg-white border-gray-300"
            }`}
            onMouseEnter={() => handleMobileCardInteraction(index)}
            onFocus={() => handleMobileCardInteraction(index)}
            onClick={() => handleMobileCardInteraction(index)}
            tabIndex={0}
          >
            <article className="absolute inset-0 flex flex-col justify-end p-4 font-mono">
              {/* Background Image */}
              <Image
                src={card.image}
                alt=""
                fill
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                  mobileActiveIndex === index
                    ? "grayscale-0 brightness-100 scale-100"
                    : "grayscale brightness-150 scale-110"
                }`}
                style={{
                  mask: "radial-gradient(100% 100% at 100% 0, #fff, transparent)",
                }}
              />

              {/* Title */}
              <h3
                className={`text-md font-medium uppercase whitespace-nowrap transition-opacity duration-700 mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } ${
                  mobileActiveIndex === index ? "opacity-100" : "opacity-60"
                }`}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className={`text-xs leading-tight mb-4 transition-all duration-700 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                } ${
                  mobileActiveIndex === index
                    ? "opacity-80 delay-150"
                    : "opacity-0"
                }`}
              >
                {card.description}
              </p>

              {/* Icon */}
              <div
                className={`mb-2 transition-opacity duration-700 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } ${
                  mobileActiveIndex === index ? "opacity-100" : "opacity-60"
                }`}
              >
                {card.icon}
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* 태블릿/데스크톱: 기존 가로 레이아웃 */}
      <ul
        ref={listRef}
        className="hidden md:grid gap-2 h-96 w-full max-w-4xl transition-all duration-700 ease-out"
        style={{
          gridTemplateColumns: gridColumns,
          transition:
            "grid-template-columns 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {cards.map((card, index) => (
          <li
            key={card.id}
            className={`relative border rounded-lg overflow-hidden min-w-16 cursor-pointer group transition-colors duration-300 ${
              theme === "dark"
                ? "bg-zinc-800 border-zinc-600"
                : "bg-white border-gray-300"
            }`}
            onMouseEnter={() => handleCardInteraction(index)}
            onFocus={() => handleCardInteraction(index)}
            onClick={() => handleCardInteraction(index)}
            tabIndex={0}
          >
            <article className="absolute inset-0 flex flex-col justify-end p-4 font-mono">
              {/* Background Image */}
              <Image
                src={card.image}
                alt=""
                fill
                className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-700 ${
                  activeIndex === index
                    ? "grayscale-0 brightness-100 scale-100"
                    : "grayscale brightness-150 scale-110"
                }`}
                style={{
                  mask: "radial-gradient(100% 100% at 100% 0, #fff, transparent)",
                }}
              />

              {/* Title (Rotated) */}
              <h3
                className={`absolute top-4 left-4 text-md font-bold uppercase whitespace-nowrap origin-left transition-opacity duration-700 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } ${activeIndex === index ? "opacity-100" : "opacity-70"}`}
                style={{ transform: "rotate(90deg)" }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p
                className={`text-xs leading-tight mb-4 transition-all duration-700 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                } ${
                  activeIndex === index ? "opacity-80 delay-150" : "opacity-0"
                }`}
              >
                {card.description}
              </p>

              {/* Icon */}
              <div
                className={`mb-4 transition-opacity duration-700 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                } ${activeIndex === index ? "opacity-100" : "opacity-60"}`}
              >
                {card.icon}
              </div>

              {/* Watch Now Link */}
            </article>
          </li>
        ))}
      </ul>

      {/* Footer Link - 제거됨 */}
    </div>
  );
};

export default UICraftCards;
