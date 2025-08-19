import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes";

// 텍스트 섹션 Props 타입 정의
interface StrokeFillTextSectionProps {
  className?: string;
}

// 여러 줄 문구 상수 - 모바일 친화적으로 조정
const TEXT_LINES = [
  "We question everything.",
  "We test every limit.",
  "We sharpen every detail.",
  "ZNIT delivers impact.",
];

// 모바일용 더 짧은 텍스트 라인
const MOBILE_TEXT_LINES = [
  "We question everything.",
  "We test every limit.",
  "We sharpen every detail.",
  "ZNIT delivers impact.",
];

const gradient = "linear-gradient(90deg, #facc15 0%, #fde68a 100%)"; // yellow-400~200


const StrokeFillTextSection: React.FC<StrokeFillTextSectionProps> = ({
  className,
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [fontSize, setFontSize] = useState("7vw"); // Default size

  // 화면 크기 감지 & 테마 상태 초기화
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);

      if (mobile) {
        setFontSize("20vw");
      } else if (width < 640) {
        setFontSize("18vw");
      } else if (width < 768) {
        setFontSize("15vw");
      } else if (width < 1024) {
        setFontSize("12vw");
      } else if (width < 1280) {
        setFontSize("10vw");
      } else if (width < 1536) {
        setFontSize("7.5vw");
      } else {
        setFontSize("7vw");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 다크모드 여부에 따른 스트로크 색상 결정
  const strokeColor = mounted && theme === "dark" ? "#ffffff" : "#111827";

  // 터치 디바이스에서는 탭으로, 데스크톱에서는 호버로 작동
  const handleInteractionStart = (idx: number) => {
    const text = textRefs.current[idx];
    if (text) {
      // 배경 그라디언트 채우기
      gsap.to(text, {
        backgroundSize: "100% 100%",
        duration: 0.7,
        ease: "power2.out",
      });
      // 모바일에서는 더 부드러운 애니메이션
      if (isMobile) {
        gsap.fromTo(
          text,
          { scale: 1 },
          {
            scale: 1.02,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power2.out",
          }
        );
      } else {
        // 데스크톱에서는 기존 애니메이션
        gsap.fromTo(
          text,
          { y: 0, rotation: 0 },
          {
            y: -12,
            rotation: gsap.utils.random(-7, 7),
            duration: 0.18,
            yoyo: true,
            repeat: 1,
            ease: "power1.out",
            clearProps: "y,rotation",
          }
        );
      }
    }
  };

  const handleInteractionEnd = (idx: number) => {
    const text = textRefs.current[idx];
    if (text) {
      gsap.to(text, {
        backgroundSize: "0% 100%",
        duration: 0.7,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    // 초기 상태: 얇은 stroke만 적용, 내부는 투명
    textRefs.current.forEach((text) => {
      if (text) {
        gsap.set(text, {
          backgroundSize: "0% 100%",
        });
      }
    });
  }, []);

  // 사용할 텍스트 라인 결정
  const displayLines = isMobile ? MOBILE_TEXT_LINES : TEXT_LINES;

  return (
    <div
      className={`relative w-full flex flex-col justify-center items-start py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 cursor-pointer transition-all duration-700 overflow-hidden ${className || ""}`}
      style={{ minHeight: isMobile ? "280px" : "320px" }}
      suppressHydrationWarning
    >

      {/* 여러 줄 텍스트에 stroke와 fill 효과 적용 - 모바일 최적화된 크기 */}
      <div className="relative z-10 w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        {displayLines.map((line, idx) => (
          <span
            key={idx}
            ref={(el) => {
              textRefs.current[idx] = el;
            }}
            className="block w-fit font-black select-none leading-tight text-left tracking-tight cursor-pointer active:scale-95 transition-transform duration-150 whitespace-nowrap mb-2"
            style={{
              fontSize: fontSize,
              WebkitTextStroke: isMobile
                ? `1px ${strokeColor}`
                : `1.5px ${strokeColor}`, // 다크모드에 따라 스트로크 색상 변경
              color: "transparent",
              background: gradient,
              backgroundSize: "0% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              touchAction: "manipulation", // 터치 최적화
              transition: "text-stroke 0.3s ease", // 스트로크 색상 변화 애니메이션
            }}
            onMouseEnter={() => !isMobile && handleInteractionStart(idx)}
            onMouseLeave={() => !isMobile && handleInteractionEnd(idx)}
            onTouchStart={() => isMobile && handleInteractionStart(idx)}
            onTouchEnd={() => isMobile && handleInteractionEnd(idx)}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StrokeFillTextSection;