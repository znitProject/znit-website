import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

// 텍스트 섹션 Props 타입 정의
interface StrokeFillTextSectionProps {
  className?: string;
}

// 여러 줄 문구 상수 - 모바일 친화적으로 조정
const TEXT_LINES = [
  "Join us.",
  "Shape the future.",
  "Grow together at ZNIT.",
  "Your next challenge starts",
  "right here.",
];

// 모바일용 더 짧은 텍스트 라인
const MOBILE_TEXT_LINES = [
  "Join us.",
  "Shape the future.",
  "Grow at ZNIT.",
  "Start here.",
];

const gradient = "linear-gradient(90deg, #facc15 0%, #fde68a 100%)"; // yellow-400~200

const NUM_BG_CIRCLES = 16; // 원형 그라디언트 개수

const StrokeFillTextSection: React.FC<StrokeFillTextSectionProps> = ({
  className,
}) => {
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const bgRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [bgStyles, setBgStyles] = useState<React.CSSProperties[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

    // 다양한 색상의 원형 그라디언트 스타일 배열 생성
    const generatedBgStyles = [
      // 노랑
      {
        width: 520,
        height: 520,
        left: "40%",
        top: "55%",
        background:
          "radial-gradient(circle, #fde68a88 0%, #facc1533 70%, transparent 100%)",
        opacity: 0.38,
        filter: "blur(32px)",
        zIndex: 0,
      },
      // 주황
      {
        width: 340,
        height: 340,
        left: "65%",
        top: "35%",
        background:
          "radial-gradient(circle, #fdba7488 0%, #f59e4233 70%, transparent 100%)",
        opacity: 0.32,
        filter: "blur(24px)",
        zIndex: 0,
      },
      // 연보라
      {
        width: 420,
        height: 420,
        left: "20%",
        top: "70%",
        background:
          "radial-gradient(circle, #c4b5fd88 0%, #a78bfa33 70%, transparent 100%)",
        opacity: 0.28,
        filter: "blur(40px)",
        zIndex: 0,
      },
      // 연파랑
      {
        width: 380,
        height: 380,
        left: "60%",
        top: "80%",
        background:
          "radial-gradient(circle, #7dd3fc88 0%, #38bdf833 70%, transparent 100%)",
        opacity: 0.22,
        filter: "blur(36px)",
        zIndex: 0,
      },
      // 연초록
      {
        width: 300,
        height: 300,
        left: "30%",
        top: "30%",
        background:
          "radial-gradient(circle, #bbf7d088 0%, #34d39933 70%, transparent 100%)",
        opacity: 0.19,
        filter: "blur(28px)",
        zIndex: 0,
      },
      // 연분홍
      {
        width: 260,
        height: 260,
        left: "80%",
        top: "60%",
        background:
          "radial-gradient(circle, #fbcfe888 0%, #f472b633 70%, transparent 100%)",
        opacity: 0.18,
        filter: "blur(24px)",
        zIndex: 0,
      },
      // 연노랑
      {
        width: 200,
        height: 200,
        left: "50%",
        top: "25%",
        background:
          "radial-gradient(circle, #fef9c388 0%, #fde68a33 70%, transparent 100%)",
        opacity: 0.15,
        filter: "blur(18px)",
        zIndex: 0,
      },
      // 연청록
      {
        width: 180,
        height: 180,
        left: "15%",
        top: "50%",
        background:
          "radial-gradient(circle, #99f6e488 0%, #22d3ee33 70%, transparent 100%)",
        opacity: 0.13,
        filter: "blur(16px)",
        zIndex: 0,
      },
      // 추가 원들은 랜덤 색상/위치/크기로 생성
      ...Array.from({ length: NUM_BG_CIRCLES - 8 }).map(() => {
        // 랜덤 색상 팔레트
        const palette = [
          ["#fde68a88", "#facc1533"], // 노랑
          ["#fdba7488", "#f59e4233"], // 주황
          ["#c4b5fd88", "#a78bfa33"], // 연보라
          ["#7dd3fc88", "#38bdf833"], // 연파랑
          ["#bbf7d088", "#34d39933"], // 연초록
          ["#fbcfe888", "#f472b633"], // 연분홍
          ["#fef9c388", "#fde68a33"], // 연노랑
          ["#99f6e488", "#22d3ee33"], // 연청록
        ];
        const [c1, c2] = palette[Math.floor(Math.random() * palette.length)];
        return {
          width: 120 + Math.random() * 400,
          height: 120 + Math.random() * 400,
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          background: `radial-gradient(circle, ${c1} 0%, ${c2} 70%, transparent 100%)`,
          opacity: 0.1 + Math.random() * 0.25,
          filter: `blur(${12 + Math.random() * 32}px)`,
          zIndex: 0,
        };
      }),
    ];
    setBgStyles(generatedBgStyles);

    // 여러 개의 원형 그라디언트 slow move 애니메이션
    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        gsap.to(bg, {
          x: 60 * (i % 2 === 0 ? 1 : -1),
          y: 40 * ((i % 3) - 1),
          scale: 1.1 + i * 0.12,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 1.2,
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
      {/* 여러 개의 흐릿한 원형 그라디언트 배경 */}
      {bgStyles.map((style, i) => (
        <div
          key={i}
          ref={(el) => {
            bgRefs.current[i] = el;
          }}
          className="absolute pointer-events-none"
          style={{
            ...style,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* 여러 줄 텍스트에 stroke와 fill 효과 적용 - 모바일 최적화된 크기 */}
      <div className="relative z-10 w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        {displayLines.map((line, idx) => (
          <span
            key={idx}
            ref={(el) => {
              textRefs.current[idx] = el;
            }}
            className="block w-fit text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black select-none leading-tight text-left tracking-tighter cursor-pointer active:scale-95 transition-transform duration-150"
            style={{
              WebkitTextStroke: isMobile ? "1px #111827" : "1.5px #111827", // 모바일에서 더 얇은 스트로크
              color: "transparent",
              background: gradient,
              backgroundSize: "0% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              touchAction: "manipulation", // 터치 최적화
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
