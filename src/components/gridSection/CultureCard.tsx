"use client";

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

  const scrollToCultureSection = () => {
    const cultureSection = document.getElementById("culture-section");
    if (cultureSection) {
      cultureSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      onClick={scrollToCultureSection}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="block w-full h-full"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex justify-center items-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 overflow-hidden rounded-2xl sm:rounded-[24px] md:rounded-[30px] border border-gray-200/20 cursor-pointer group"
        style={{
          containerType: "inline-size", // 컨테이너 쿼리 지원
          backgroundImage: "url('/cultureImgae.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 z-5 rounded-2xl sm:rounded-[24px] md:rounded-[30px]"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)"
          }}
        />
        
        {/* Glow Layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-10 pointer-events-none transition duration-300 ease-out"
        />

        {/* Main Content */}
        <div className="z-20 text-center w-full h-full flex flex-col justify-center items-center px-2">
          <h1
            className="line leading-tight tracking-tight text-black text-xl sm:text-2xl md:text-xl lg:text-4xl xl:text-7xl"
            style={{
              fontFamily: "Inter, sans-serif",
              maxWidth: "100%",
              wordWrap: "break-word",
              WebkitTextStroke: "1px white",
              fontWeight: "900",
            }}
          >
            CULTURE
          </h1>
        </div>
      </div>
    </button>
  );
}
