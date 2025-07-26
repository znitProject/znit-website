import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

// WorkCard 컴포넌트: Work 페이지로 이동하는 카드, 핸드라이팅 호버 애니메이션 포함
export default function WorkCard() {
  const [isHovered, setIsHovered] = useState(false);
  const itRef = useRef<HTMLSpanElement>(null);
  const andRef = useRef<HTMLSpanElement>(null);
  const designRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isHovered) {
      gsap.fromTo(
        [itRef.current, andRef.current, designRef.current],
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to([itRef.current, andRef.current, designRef.current], {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  return (
    <Link
      href="/work"
      className="card !text-3xl !font-bold transition-transform duration-300 hover:scale-105 relative overflow-hidden group"
      style={{ gridArea: "work" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* 핸드라이팅 스타일 Hover text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none py-4">
        <span>
          <span
            ref={itRef}
            className="inline-block text-white text-4xl font-nanumSquareNeo font-extrabold opacity-0 drop-shadow-2xl select-none"
          >
            IT
          </span>
        </span>

        <span>
          <span
            ref={andRef}
            className="inline-block text-white text-3xl font-nanumSquareNeo font-extrabold opacity-0 drop-shadow-2xl select-none"
          >
            &
          </span>
        </span>

        <span>
          <span
            ref={designRef}
            className="inline-block text-white text-4xl font-nanumSquareNeo font-extrabold opacity-0 drop-shadow-2xl select-none"
          >
            Design
          </span>
        </span>
      </div>

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
