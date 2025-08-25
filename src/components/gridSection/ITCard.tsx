"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { gsap } from "gsap";

export default function ITCard({ style }: { style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);

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

  const scrollToITSection = () => {
    const itSection = document.getElementById("it-section");
    if (itSection) {
      itSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden group rounded-2xl shadow-2xl cursor-pointer w-full h-full"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={scrollToITSection}
    >
      {/* 제목을 좌측 상단으로 이동 + 크기 확대 */}
      <div className="absolute top-0 left-0 p-4 z-10">
        <span
          className="text-4xl lg:text-5xl font-semibold text-white"
          style={{ fontFamily: "Red Hat Display" }}
        >
          IT Services
        </span>
      </div>

      <Image
        src="/ITCardImage.png"
        alt="IT Background"
        fill
        className="object-cover"
        aria-hidden="true"
      />
    </div>
  );
}
