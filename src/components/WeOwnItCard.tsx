'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function WeOwnItCard({ style }: { style?: React.CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.line'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.03,
        boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  };

  return (
    <Link
      href="/slogan"
      passHref
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex justify-center items-center px-6 py-16 bg-black overflow-hidden rounded-[30px] border border-gray-200/20 cursor-pointer"
      >
        {/* 배경 텍스처 (흑색 배경에 텍스처 유지) */}
        <div className="absolute inset-0 bg-[url('/texture/noise.png')] opacity-10 z-0 pointer-events-none" />

        {/* 메인 콘텐츠 */}
        <div className="z-10 text-center max-w-4xl">
          <h1
            className="line text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            We Own It.
          </h1>

          <p
            className="line text-lg md:text-2xl font-light text-white leading-relaxed mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            기술로 설계하고,{' '}
            <span className="font-medium text-white">디자인으로 설득합니다.</span>
            <br />
            숨겨진 맥락까지 <span className="font-medium text-white">온전히 간직합니다.</span>
          </p>

          <p className="line text-base md:text-xl text-gray-300 italic">
            이 과정이 우리가 자부하는 방식입니다.
          </p>
        </div>
      </div>
    </Link>
  );
}