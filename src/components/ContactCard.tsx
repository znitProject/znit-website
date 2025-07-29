"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { gsap } from "gsap";

// ContactCard 컴포넌트: 호버 시 배경 이미지가 변경되는 애니메이션 포함
export default function ContactCard({ style }: { style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <Link
      href="/contact"
      ref={cardRef}
      className="card relative overflow-hidden group"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 기본 배경 이미지 */}
      <Image
        src="/contact_us_image.jpg"
        alt="Contact Background"
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-0"
        aria-hidden="true"
      />
      {/* 호버 시 나타나는 배경 이미지 */}
      <Image
        src="/contact_us_image2.jpg"
        alt="Contact Background Hover"
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-95"
        aria-hidden="true"
      />
      {/* Contact 아이콘 및 텍스트 */}
      <div className="absolute top-0 right-0 p-4 z-10">
        <span
          className="text-3xl font-semibold text-white"
          style={{ fontFamily: "Red Hat Display" }}
        >
          Contact Us
        </span>
      </div>
    </Link>
  );
}
