import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

// 상단 왼쪽의 큰 타이포(제목) 영역 컴포넌트
const HomeTitleSection: React.FC = () => {
  const titleRef = useRef(null);
  const lines = ["ZNIT", "당신과 우리의", "열정이 피어나는 장소"];

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children, // Animate each child (line)
        { opacity: 0, y: 20 }, // Start from invisible and slightly below
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, ease: "power3.out" } // Animate to visible and original position
      );
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center items-start">
      {/* 메인 타이틀 */}
      <h1
        ref={titleRef}
        className="font-bold text-6xl md:text-8xl leading-tight text-black whitespace-pre-line mb-4"
        style={{ fontFamily: 'Istok Web' }}
      >
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default HomeTitleSection; 