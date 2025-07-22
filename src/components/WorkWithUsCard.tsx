'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import { gsap } from 'gsap';

const WorkWithUsCard = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.to(bgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    });
    gsap.to(bgRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  };

  return (
    <Link
      ref={cardRef}
      href="/recruit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ gridArea: 'workus' }}
      className="relative inline-block overflow-hidden px-8 py-5 text-xl font-semibold rounded-xl bg-neutral-900 text-white shadow-md"
    >
      {/* 부드럽게 등장하는 배경 */}
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl -z-10"
        style={{
          opacity: 0,
          transform: 'scale(1.05)',
        }}
      />

      <span className="relative z-10">Work with us</span>
    </Link>
  );
};

export default WorkWithUsCard;
