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
      // 핸드라이팅 효과를 위한 애니메이션
      gsap.fromTo(
        [itRef.current, andRef.current, designRef.current],
        { 
          opacity: 0, 
          scale: 0.8,
          rotation: -15,
          y: 30,
          x: -20,
          transformOrigin: "left bottom"
        },
        {
          opacity: 1,
          scale: 1,
          rotation: () => gsap.utils.random(-3, 3), // 각각 다른 약간의 기울기
          y: 0,
          x: 0,
          stagger: 0.15, // 순차적으로 나타나는 효과
          duration: 0.8,
          ease: "back.out(1.7)", // 탄성있는 이징
          onComplete: function() {
            // 쓰는 듯한 살짝의 흔들림 효과
            gsap.to(this.targets(), {
              rotation: () => gsap.utils.random(-1, 1),
              duration: 0.1,
              yoyo: true,
              repeat: 3,
              ease: "power2.inOut"
            });
          }
        }
      );

      // 글자별로 약간의 지연된 떨림 효과 추가
      gsap.to(itRef.current, {
        delay: 0.9,
        rotation: () => gsap.utils.random(-2, 2),
        duration: 0.1,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(andRef.current, {
        delay: 1.1,
        rotation: () => gsap.utils.random(-2, 2),
        duration: 0.1,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(designRef.current, {
        delay: 1.3,
        rotation: () => gsap.utils.random(-2, 2),
        duration: 0.1,
        repeat: 2,
        yoyo: true,
        ease: "power1.inOut"
      });

    } else {
      // 사라질 때는 빠르게 페이드아웃
      gsap.to(
        [itRef.current, andRef.current, designRef.current],
        {
          opacity: 0,
          scale: 0.9,
          rotation: () => gsap.utils.random(10, 20),
          y: -20,
          x: 30,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.in",
        }
      );
    }
  }, [isHovered]);

  return (
    <Link
      href="/work"
      className="card !text-3xl !font-bold transition-transform duration-300 hover:scale-105 relative overflow-hidden group"
      style={{ gridArea: 'work' }}
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
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" aria-hidden="true" />
      
      {/* 텍스트 */}
      <span className="absolute left-0 bottom-0 z-10 text-white text-5xl font-extrabold p-6 drop-shadow-lg select-none">
        WORK
      </span>

      {/* 핸드라이팅 스타일 Hover text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none gap-2">
        <span className="overflow-hidden">
          <span 
            ref={itRef} 
            className="inline-block text-white text-5xl font-extrabold opacity-0 drop-shadow-2xl select-none"
            style={{
            
              textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.3)',
              filter: 'contrast(1.2) brightness(1.1)',
            }}
          >
            IT
          </span>
        </span>
        
        <span className="overflow-hidden">
          <span 
            ref={andRef} 
            className="inline-block text-white text-4xl font-extrabold opacity-0 drop-shadow-2xl select-none"
            style={{
            
              textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.3)',
              filter: 'contrast(1.2) brightness(1.1)',
            }}
          >
            &
          </span>
        </span>
        
        <span className="overflow-hidden">
          <span 
            ref={designRef} 
            className="inline-block text-white text-5xl font-extrabold opacity-0 drop-shadow-2xl select-none"
            style={{
          
              textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.3)',
              filter: 'contrast(1.2) brightness(1.1)',
            }}
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
              <feTurbulence baseFrequency="0.04" numOctaves="3" result="roughpaper" seed="1"/>
              <feColorMatrix in="roughpaper" type="saturate" values="0"/>
              <feComponentTransfer>
                <feFuncA type="discrete" tableValues="0.5 0.8 0.3 0.9 0.6"/>
              </feComponentTransfer>
              <feComposite operator="multiply" in2="SourceGraphic"/>
            </filter>
          </defs>
        </svg>
      </div>
    </Link>
  );
}