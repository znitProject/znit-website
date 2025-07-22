"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

// 고객사 리스트
const CUSTOMERS = [
  "TOSS",
  "NAVER",
  "Coupang",
  "KAKAO",
  "KREAM",
  "MUSINSA",
];

export default function CustomerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = track.querySelectorAll(".carousel-item");
    const itemCount = items.length;
    const itemWidth = items[0]?.clientWidth ?? 0;
    const totalWidth = itemWidth * itemCount;

    const ctx = gsap.context(() => {
      gsap.to(items, {
        x: -totalWidth,
        duration: 30,
        ease: "linear",
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="overflow-hidden w-full bg-white border border-black/10 rounded-[20px] h-30 flex items-center relative"
      style={{ gridArea: "customer" }}
    >
      {/* 슬라이드 트랙 */}
      <div
        ref={trackRef}
        className="flex whitespace-nowrap gap-8 px-4"
        style={{ willChange: "transform" }}
      >
        {/* 고객사 이름 반복 */}
        {Array(10)
          .fill(null)
          .flatMap(() => CUSTOMERS)
          .map((name, idx) => (
            <span
              key={idx}
              className="carousel-item text-base sm:text-lg font-medium text-blue-900 px-2 select-none"
            >
              {name}
            </span>
          ))}
      </div>

      {/* 좌측 하단 텍스트 */}
      <div className="absolute left-6 bottom-2 text-xs text-gray-500 hidden sm:block">
        customer
      </div>
    </div>
  );
}
