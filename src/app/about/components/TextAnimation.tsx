"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TextAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const texts = ["ZNIT", "ZNSPACE", "ZNATURE", "ZNWAVE", "ZNUS", "ZNLINK"];
  // 텍스트 컨테이너 참조
  const textListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  useEffect(() => {
    // currentIndex가 바뀔 때마다 GSAP 애니메이션 실행
    if (textListRef.current) {
      gsap.to(textListRef.current, {
        y: -currentIndex * 80, // 80px: 텍스트 한 줄 높이(아래에서 스타일로 맞춤)
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="relative">
        <div className="flex flex-col sm:flex-row items-center text-xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 space-y-2 sm:space-y-0">
          <span className="mr-0 sm:mr-4">WE ARE</span>

          {/* 텍스트 애니메이션 영역 */}
          <div
            className="relative w-64 sm:w-80 lg:w-96 h-20 flex items-center justify-center overflow-hidden"
            style={{ height: 80 }} // 고정 높이(한 줄)
          >
            <div
              ref={textListRef}
              className="flex flex-col justify-center"
              style={{ willChange: "transform", marginTop:80 }}
            >
              {texts.map((text, index) => (
                <div
                  key={index}
                  className="h-20 flex items-center justify-center text-[#5051A2] font-bold text-3xl lg:text-4xl leading-[80px]"
                  // 80px = h-20, leading을 맞춰서 정확히 중앙 정렬
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          <span className="ml-0 sm:ml-1">!</span>
        </div>

        {/* 괄호 애니메이션 */}
        <div className="absolute -left-8 sm:-left-12 lg:-left-16 top-0 text-4xl sm:text-6xl lg:text-7xl text-blue-400 animate-pulse">
          [
        </div>
        <div className="absolute -right-8 sm:-right-12 lg:-right-16 top-0 text-4xl sm:text-6xl lg:text-7xl text-blue-400 animate-pulse">
          ]
        </div>
      </div>
    </div>
  );
};

export default TextAnimation;
