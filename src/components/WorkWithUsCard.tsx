"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";

const WorkWithUsCard: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    // 이전 애니메이션 정리
    gsap.killTweensOf(cardRef.current);
    gsap.killTweensOf(bgRef.current);
    gsap.killTweensOf(textRef.current);

    // 카드 스케일 애니메이션
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    });

    // 파도 효과 배경 애니메이션
    gsap.fromTo(
      bgRef.current,
      {
        clipPath: "ellipse(0% 100% at 0% 50%)",
        opacity: 1,
      },
      {
        clipPath: "ellipse(150% 100% at 100% 50%)",
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // 텍스트 색상 변화
    gsap.to(textRef.current, {
      color: "#ffffff",
      duration: 0.3,
      delay: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    // 이전 애니메이션 정리
    gsap.killTweensOf(cardRef.current);
    gsap.killTweensOf(bgRef.current);
    gsap.killTweensOf(textRef.current);

    // 카드 원래 크기로
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // 배경 파도 효과 역방향
    gsap.to(bgRef.current, {
      clipPath: "ellipse(0% 100% at 100% 50%)",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(bgRef.current, { opacity: 0 });
      },
    });

    // 텍스트 색상 원래대로 (기본값과 동일하게 #1a1a1a로 복원)
    gsap.to(textRef.current, {
      color: "#1a1a1a",
      duration: 0.3,
      ease: "power2.inOut",
      // 애니메이션이 끝난 후 혹시 꼬임 방지용으로 한 번 더 명시적으로 지정
      onComplete: () => {
        if (textRef.current) {
          (textRef.current as HTMLElement).style.color = "#1a1a1a";
        }
      },
    });
  };

  return (
    <Link
      ref={cardRef}
      href="/career"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="relative block overflow-hidden px-6 py-4 rounded-xl bg-[#F5F5F5] cursor-pointer transform transition-transform duration-300 w-full h-full flex items-center justify-center"
    >
      {/* 파도 모양 그라디언트 배경 */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl"
        style={{
          opacity: 0,
          clipPath: "ellipse(0% 100% at 0% 50%)",
        }}
      />

      {/* 타이포그래피 텍스트 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <span
          ref={textRef}
          className="block text-center"
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            lineHeight: "0.9",
            color: "#1a1a1a",
          }}
        >
          <span
            style={{
              display: "block",
              marginBottom: "0.2em",
            }}
          >
            Work
          </span>
          <span
            style={{
              display: "block",
              fontSize: "0.75em",
              fontWeight: "400",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: "0.8",
            }}
          >
            with us
          </span>
        </span>

        {/* 장식적 요소 */}
        <div
          className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{
            boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
            animation: "pulse 2s infinite",
          }}
        />
      </div>

      {/* CSS 애니메이션을 위한 스타일 */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </Link>
  );
};

export default WorkWithUsCard;
