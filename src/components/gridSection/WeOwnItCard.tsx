"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WorkWithUsCard: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".line"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1.0, ease: "power3.out" }
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!glowRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background =
      `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 40%)`;
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.03,
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
        duration: 0.35,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current && glowRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.35,
        ease: "power3.out",
      });
      glowRef.current.style.background = "transparent";
    }
  };

  return (
    <Link
      href="/career"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="block w-full h-full"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex justify-center items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 bg-black overflow-hidden rounded-2xl sm:rounded-[24px] md:rounded-[30px] border border-gray-200/20 cursor-pointer group"
      >
        {/* Glow */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-0 pointer-events-none transition duration-300 ease-out"
        />

        {/* === 4줄 고정 === */}
        <div className="z-10 w-full h-full flex flex-col justify-center items-center text-center gap-2 sm:gap-3 md:gap-4 px-2">
          {/* 1) 섹션 제목 */}
          <div className="line title whitespace-nowrap font-extrabold tracking-tight text-white">
            We Own IT
          </div>

          {/* 2) 본문 1 */}
          <div className="line body1 whitespace-nowrap text-white font-light">
            기술로 설계하고 <span className="font-medium">디자인으로 설득합니다.</span>
          </div>

          {/* 3) 본문 2 */}
          <div className="line body2 whitespace-nowrap text-white font-light">
            숨겨진 맥락까지 <span className="font-medium">온전히 간직합니다.</span>
          </div>

          {/* 4) 서브 */}
          <div className="line sub whitespace-nowrap italic text-gray-400">
            그리고 그 모든 것을 우리 안에 담아냅니다.
          </div>
        </div>

        <style jsx>{`
          /* ===== 기본 (모바일~md): 줄수 유지 위해 clamp 축소 ===== */
          .title {
            font-family: "Playfair Display", serif;
            line-height: 1.1;
            font-size: clamp(20px, 8vw, 36px);
          }
          .body1,
          .body2 {
            font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto,
              "Helvetica Neue", Arial, "Noto Sans";
            line-height: 1.25;
            font-size: clamp(12px, 4.5vw, 18px);
          }
          .sub {
            font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto,
              "Helvetica Neue", Arial, "Noto Sans";
            line-height: 1.2;
            font-size: clamp(11px, 4vw, 16px);
          }

          /* ===== 큰 화면 (1080p/16:9 기준 복원) ===== */
          @media (min-width: 1280px) {
            .title {
              font-size: 3rem; /* text-5xl 정도 */
            }
            .body1,
            .body2 {
              font-size: 1.125rem; /* text-lg */
            }
            .sub {
              font-size: 1rem; /* text-base */
            }
          }
          @media (min-width: 1536px) {
            .title {
              font-size: 3.5rem; /* 더 큰 화면에서 제목만 키움 */
            }
          }

          /* ===== 15인치(1280~1536px) 구간에서만 본문 3줄 살짝 축소 ===== */
          @media (min-width: 1280px) and (max-width: 1536px) {
            .body1,
            .body2 {
              font-size: 1.0625rem; /* 17px 정도 */
            }
            .sub {
              font-size: 0.9375rem; /* 15px 정도 */
            }
          }

          /* 극단적으로 좁은 화면에서 글자 간격 줄이기 */
          @media (max-width: 340px) {
            .title {
              letter-spacing: -0.02em;
            }
            .body1,
            .body2,
            .sub {
              letter-spacing: -0.015em;
            }
          }
        `}</style>
      </div>
    </Link>
  );
};

export default WorkWithUsCard;
