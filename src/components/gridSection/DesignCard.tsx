"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { gsap } from "gsap";

// WorkCard 컴포넌트: DesignSection으로 스크롤하는 카드
export default function WorkCard({ style }: { style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const scrollToDesignSection = () => {
    const designSection = document.getElementById("design-section");
    if (designSection) {
      designSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      ref={cardRef}
      onClick={scrollToDesignSection}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="card !text-3xl !font-bold relative overflow-hidden group w-full h-full"
      style={style}
    >
      {/* work_image.jpg 배경 이미지 */}
      <Image
        src="/work_image.jpg"
        alt="Work 배경 이미지"
        fill
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
        priority
      />

      {/* 텍스트 */}
      <span className="absolute left-0 bottom-0 z-10 text-white text-5xl font-extrabold p-6 drop-shadow-lg select-none">
        DESIGN
      </span>

      {/* 핸드라이팅 효과를 위한 가상의 펜 스트로크 */}
      <div className="absolute inset-0 z-15 pointer-events-none opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <filter id="roughpaper">
              <feTurbulence
                baseFrequency="0.04"
                numOctaves="3"
                result="roughpaper"
                seed="1"
              />
              <feColorMatrix in="roughpaper" type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0.5 0.8 0.3 0.9 0.6" />
              </feComponentTransfer>
              <feComposite operator="multiply" in2="SourceGraphic" />
            </filter>
          </defs>
        </svg>
      </div>
    </button>
  );
}
