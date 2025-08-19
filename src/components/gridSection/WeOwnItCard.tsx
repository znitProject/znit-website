"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function WeOwnItCard({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".line"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!glowRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glowRef.current.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 40%)
    `;
  };

  const handleMouseEnter = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.03,
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current && glowRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
        duration: 0.4,
        ease: "power3.out",
      });

      glowRef.current.style.background = "transparent";
    }
  };

  return (
    <Link
      href="/about"
      passHref
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="block w-full h-full"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex justify-center items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 bg-black overflow-hidden rounded-2xl sm:rounded-[24px] md:rounded-[30px] border border-gray-200/20 cursor-pointer group"
        style={{
          containerType: "inline-size", // 컨테이너 쿼리 지원
        }}
      >
        {/* Glow Layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-0 pointer-events-none transition duration-300 ease-out"
        />

        {/* Main Content */}
        <div className="z-10 text-center w-full h-full flex flex-col justify-center items-center px-2">
          <h1
            className="line font-extrabold leading-tight tracking-tight text-white text-xl sm:text-2xl md:text-xl lg:text-4xl xl:text-7xl"
            style={{
              fontFamily: "Playfair Display, serif",
              marginBottom: "clamp(0.25rem, 1.5vw, 1rem)",
              maxWidth: "100%",
              wordWrap: "break-word",
            }}
          >
            We Own It.
          </h1>

          <p
            className="line font-light text-white leading-relaxed text-center text-sm sm:text-base md:text-sm lg:text-xl xl:text-2xl"
            style={{
              fontFamily: "Inter, sans-serif",
              marginBottom: "clamp(0.25rem, 1vw, 0.75rem)",
              maxWidth: "100%",
              lineHeight: "1.4",
            }}
          >
            기술로 설계하고,{" "}
            <span className="font-medium text-white">
              디자인으로 설득합니다.
            </span>
            <br />
            숨겨진 맥락까지{" "}
            <span className="font-medium text-white">온전히 간직합니다.</span>
          </p>

          <p
            className="line text-gray-500 italic text-center text-xs sm:text-sm md:text-xs lg:text-lg xl:text-xl"
            style={{
              maxWidth: "100%",
              lineHeight: "1.3",
            }}
          >
            이 과정이 우리가 자부하는 방식입니다.
          </p>
        </div>
      </div>
    </Link>
  );
}
