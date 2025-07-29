import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

// 상단 왼쪽의 큰 타이포(제목) 영역 컴포넌트 - 모바일 퍼스트 최적화
const HomeTitleSection: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // 텍스트와 커서를 각각 분리하여 ref 할당
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const fullText = "ZNIT\n당신과 우리의\n열정이 피어나는\n장소";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    // 텍스트 초기화
    if (textRef.current) {
      textRef.current.textContent = "";
    }

    // 커서 깜박임 애니메이션 (타이핑 중에도 실행)
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "1";
      cursorRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 1000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out",
      });
    }

    // 자연스러운 타이핑 효과 (랜덤 딜레이)
    let currentIdx = 0;
    function typeText() {
      if (textRef.current) {
        textRef.current.textContent = fullText.substring(0, currentIdx + 1);
      }
      currentIdx++;
      if (currentIdx < fullText.length) {
        // 70~180ms 사이 랜덤 딜레이
        const delay = Math.floor(Math.random() * 110) + 80;
        timeoutRef.current = setTimeout(typeText, delay);
      }
    }
    typeText();

    // 언마운트 시 타임아웃 정리
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // 다크모드 여부에 따른 텍스트 색상 결정
  const textColorClass =
    mounted && theme === "dark" ? "text-white" : "text-black";
  const cursorColorClass =
    mounted && theme === "dark" ? "bg-white" : "bg-black";

  return (
    <div className="w-full flex flex-col justify-center items-center xl:items-start">
      {/* 메인 타이틀 - 모바일 퍼스트 타이포그래피 최적화 */}
      <h1
        className={`font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl 2xl:text-8xl leading-[0.9] sm:leading-[0.95] ${textColorClass} whitespace-pre-line mb-4 sm:mb-6 md:mb-8 text-center xl:text-left max-w-full px-2 sm:px-0 transition-colors duration-300`}
        style={{
          fontFamily: "Istok Web",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)", // 가독성 향상을 위한 미묘한 그림자
        }}
      >
        {/* 타이핑 텍스트 */}
        <span ref={textRef}></span>
        {/* 깜박이는 커서 - 모바일에서도 잘 보이도록 크기 조정 */}
        <span
          ref={cursorRef}
          className={`inline-block w-[0.08em] h-[0.85em] ${cursorColorClass} ml-2 align-baseline relative -top-[2px] transition-colors duration-300`}
        ></span>
      </h1>
    </div>
  );
};

export default HomeTitleSection;
