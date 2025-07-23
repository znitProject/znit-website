"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

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
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden h-24 rounded-2xl border border-neutral-500 shadow-[inset_0_0_0.5px_rgba(0,0,0,0.08)] bg-gradient-to-r from-white via-slate-50 to-white"
      style={{ gridArea: "customer" }}
    >
      {/* 고객사 슬라이드 트랙 */}
      <div
        ref={trackRef}
        className="flex whitespace-nowrap gap-8 px-6 h-full items-center"
        style={{ willChange: "transform" }}
      >
        {Array(10)
          .fill(null)
          .flatMap(() => CUSTOMERS)
          .map((name, idx) => (
            <span
              key={idx}
              className="carousel-item text-lg sm:text-4xl font-semibold tracking-tight text-neutral-800 dark:text-gray/90 px-2 select-none [text-shadow:0_1px_2px_rgba(0,0,0,0.05)]"
            >
              {name}
            </span>
          ))}
      </div>

      {/* 좌측 하단 라벨 */}
      <div className="absolute left-3 top-1.5  text-gray-300 text-[10px] font-mono uppercase tracking-widest ">
        customer
      </div>
    </div>
  );
}