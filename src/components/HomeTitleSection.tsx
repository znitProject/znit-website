import React, { useRef, useEffect } from "react";

// 상단 왼쪽의 큰 타이포(제목) 영역 컴포넌트
const HomeTitleSection: React.FC = () => {
  // 텍스트와 커서를 각각 분리하여 ref 할당
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const fullText = "ZNIT\n당신과 우리의\n열정이 피어나는 장소 처처처";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 텍스트 초기화
    if (textRef.current) {
      textRef.current.textContent = "";
    }

    // 커서 깜박임 애니메이션 (타이핑 중에도 실행)
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "1";
      cursorRef.current.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], {
        duration: 1000,
        iterations: Infinity,
        direction: "alternate",
        easing: "ease-in-out"
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

  return (
    <div className="flex-1 flex flex-col justify-center items-start">
      {/* 메인 타이틀 */}
      <h1
        className="font-extrabold text-6xl md:text-8xl leading-tight text-black whitespace-pre-line mb-4"
        style={{ fontFamily: 'Istok Web' }}
      >
        {/* 타이핑 텍스트 */}
        <span ref={textRef}></span>
        {/* 깜박이는 커서 */}
        <span ref={cursorRef} className="inline-block w-[0.06em] h-[0.80em] bg-black ml-1 align-baseline relative -top-[1px]"></span>
      </h1>
    </div>
  );
};

export default HomeTitleSection; 