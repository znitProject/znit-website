"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

// WorkCard 컴포넌트: Work 페이지로 이동하는 카드
export default function WorkCard({ style }: { style?: React.CSSProperties }) {

  return (
    <Link
      href="/work"
      className="card !text-3xl !font-bold relative overflow-hidden group"
      style={style}
    >
      {/* work_image.jpg 배경 이미지 */}
      <Image
        src="/work_image.jpg"
        alt="Work 배경 이미지"
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-80"
        aria-hidden="true"
        priority
      />
      {/* 어두운 오버레이 (호버 시 더 진해짐) */}
      <div
        className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300"
        aria-hidden="true"
      />

      {/* 텍스트 */}
      <span className="absolute left-0 bottom-0 z-10 text-white text-5xl font-extrabold p-6 drop-shadow-lg select-none">
        WORKS
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
    </Link>
  );
}
