'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import React from 'react'; // Added for React.useState

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  color: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
}

interface BlackHoleProps {
  parentRotationY: number;
  parentRotationX: number;
}

// 블랙홀 컴포넌트
const BlackHole = ({ parentRotationY, parentRotationX }: BlackHoleProps) => {
  const blackHoleRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<HTMLDivElement[]>([]);
  const accretionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!blackHoleRef.current) return;

    // Continuously apply inverse rotation to counteract parent's rotation
    gsap.set(blackHoleRef.current, {
      rotationY: -parentRotationY,
      rotationX: -parentRotationX,
      z: 0 // Ensure it stays at the same depth
    });

    // 메인 블랙홀 펄스 애니메이션 (더 강렬하게)
    gsap.to(blackHoleRef.current, {
      scale: 1.3,
      duration: 1.5,
      ease: "power3.inOut",
      repeat: -1,
      yoyo: true
    });

    // ... (rest of your existing animations for rings, accretion disk, etc.)

  }, [parentRotationY, parentRotationX]); // Add parent rotations to dependency array

  // 파티클 속성 타입 정의
  interface Particle {
    width: number;
    height: number;
    backgroundColor: string;
    translateX: number;
    rotate: number;
    animationDuration: number;
    animationDelay: number;
  }

  // 소용돌이 파티클 속성 타입 정의
  interface SpiralParticle {
    backgroundColor: string;
    translateX: number;
    rotate: number;
    animationDuration: number;
    animationDelay: number;
  }

  const PARTICLE_COUNT = 12;
  const SPIRAL_COUNT = 8;

  // 파티클 랜덤값을 CSR에서만 생성
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const [spiralParticles, setSpiralParticles] = React.useState<SpiralParticle[]>([]);

  React.useEffect(() => {
    // 블랙홀 주변 파티클 랜덤값 생성
    const generatedParticles: Particle[] = Array.from({ length: PARTICLE_COUNT }).map((_, index) => ({
      width: 1 + Math.random() * 2,
      height: 1 + Math.random() * 2,
      backgroundColor: `rgba(0,0,0,${0.6 + Math.random() * 0.4})`,
      translateX: 40 + Math.random() * 30,
      rotate: index * 30,
      animationDuration: 2 + Math.random() * 3,
      animationDelay: Math.random() * 2,
    }));
    setParticles(generatedParticles);

    // 소용돌이 파티클 랜덤값 생성
    const generatedSpirals: SpiralParticle[] = Array.from({ length: SPIRAL_COUNT }).map((_, index) => ({
      backgroundColor: `rgba(20, 20, 20, ${0.5 + Math.random() * 0.3})`,
      translateX: 60 + Math.random() * 20,
      rotate: index * 45,
      animationDuration: 4 + Math.random() * 2,
      animationDelay: Math.random() * 3,
    }));
    setSpiralParticles(generatedSpirals);
  }, []);

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        transformStyle: 'preserve-3d',
        zIndex: -1 // Ensure it's behind the cards
      }}
    >
      <div 
        ref={blackHoleRef}
        className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 중력 렌즈 효과 - 가장 외곽 */}
        <div
          className="outer-lens absolute rounded-full opacity-5"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.1) 60%, transparent 100%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(3px)'
          }}
        />
        <div
          className="gravity-lens absolute rounded-full opacity-10"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, transparent 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(2px)'
          }}
        />

        {/* 강착원반 (Accretion Disk) - 여러 층 */}
        {[0, 1, 2].map((index) => (
          <div
            key={`accretion-${index}`}
            ref={(el) => {
              if (el) accretionRefs.current[index] = el;
            }}
            className="absolute rounded-full"
            style={{
              width: `${180 + index * 25}px`,
              height: `${180 + index * 25}px`,
              background: `conic-gradient(from ${index * 45}deg, 
                transparent 0%, 
                rgba(30,30,30,0.3) 10%, 
                rgba(0,0,0,0.6) 25%, 
                rgba(50,50,50,0.4) 40%, 
                transparent 50%, 
                rgba(20,20,20,0.5) 60%, 
                rgba(0,0,0,0.8) 75%, 
                rgba(40,40,40,0.3) 90%, 
                transparent 100%)`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.7 - index * 0.1,
              filter: `blur(${index * 0.5}px)`
            }}
          />
        ))}

        {/* 외부 링들 - 사건 지평선 효과 (더 다양하게) */}
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) ringRefs.current[index] = el;
            }}
            className="absolute rounded-full border"
            style={{
              width: `${90 + index * 18}px`,
              height: `${90 + index * 18}px`,
              borderColor: `rgba(0, 0, 0, ${0.4 - index * 0.06})`,
              borderWidth: `${3 - index * 0.4}px`,
              borderStyle: index % 2 === 0 ? 'dashed' : 'dotted',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.6 - index * 0.08
            }}
          />
        ))}

        {/* 중간 소용돌이 링들 */}
        {[0, 1, 2, 3].map((index) => (
          <div
            key={`middle-${index}`}
            ref={(el) => {
              if (el) ringRefs.current[index + 5] = el;
            }}
            className="absolute rounded-full"
            style={{
              width: `${70 + index * 15}px`,
              height: `${70 + index * 15}px`,
              background: `conic-gradient(from ${index * 90}deg, 
                transparent, 
                rgba(0,0,0,0.4), 
                transparent, 
                rgba(0,0,0,0.6), 
                transparent, 
                rgba(0,0,0,0.3), 
                transparent)`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.5 - index * 0.08
            }}
          />
        ))}

        {/* 블랙홀 중심부 (더 디테일하게) */}
        <div 
          className="black-hole-center relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full z-10"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, #000000 0%, #0a0a0a 20%, #1a1a1a 40%, #2a2a2a 70%, transparent 100%),
              radial-gradient(circle at 70% 70%, #000000 0%, #151515 30%, #333333 60%, transparent 100%)
            `,
            boxShadow: `
              0 0 20px rgba(0,0,0,0.9),
              inset 0 0 20px rgba(0,0,0,1),
              0 0 40px rgba(0,0,0,0.7),
              0 0 60px rgba(0,0,0,0.5),
              inset 0 0 10px rgba(0,0,0,0.8)
            `
          }}
        >
          {/* 중심의 완전한 검은 구멍 - 다층 구조 */}
          <div 
            className="absolute inset-1 sm:inset-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, #000000 0%, #000000 60%, rgba(0,0,0,0.8) 100%)',
              boxShadow: `
                inset 0 0 15px rgba(0,0,0,1),
                inset 0 0 8px rgba(0,0,0,1),
                0 0 10px rgba(0,0,0,0.8)
              `
            }}
          >
            {/* 최종 특이점 */}
            <div 
              className="absolute inset-1 rounded-full bg-black"
              style={{
                boxShadow: 'inset 0 0 5px rgba(0,0,0,1)'
              }}
            />
          </div>
        </div>

        {/* 블랙홀 주변 파티클 효과 (더 많고 다양하게) */}
        {particles.map((p, index) => (
          <div
            key={`particle-${index}`}
            className="absolute rounded-full opacity-70"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              backgroundColor: p.backgroundColor,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${p.rotate}deg) translateX(${p.translateX}px)`,
              animation: `particleOrbit ${p.animationDuration}s linear infinite`,
              animationDelay: `${p.animationDelay}s`,
            }}
          />
        ))}

        {/* 추가 소용돌이 파티클 */}
        {spiralParticles.map((p, index) => (
          <div
            key={`spiral-${index}`}
            className="absolute w-1 h-1 rounded-full opacity-50"
            style={{
              backgroundColor: p.backgroundColor,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${p.rotate}deg) translateX(${p.translateX}px)`,
              animation: `spiralOrbit ${p.animationDuration}s linear infinite reverse`,
              animationDelay: `${p.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes particleOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(40px);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg) translateX(40px);
          }
        }
        
        @keyframes spiralOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(60px) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(60px) scale(0.8);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg) translateX(60px) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default function Carousel3D({ items }: Carousel3DProps) {
    const [rotationY, setRotationY] = useState(0);
    const [rotationX, setRotationX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouseX, setLastMouseX] = useState(0);
    const [lastMouseY, setLastMouseY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
    });

    // 스크롤에 따른 애니메이션
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
    // 반응형 반지름과 카드 크기 (더 작게)
    const [radius, setRadius] = useState(280); // Default to desktop size
    const [cardMarginLeft, setCardMarginLeft] = useState(-128); // Default to desktop size
    const [cardMarginTop, setCardMarginTop] = useState(-96); // Default to desktop size
    const [perspective, setPerspective] = useState(800); // Default to desktop size
    const angleStep = 360 / items.length; // 카드 하나당 각도
  
    // 스크롤 위치에 따른 가시성 제어
    useEffect(() => {
      const handleResize = () => {
        setRadius(window.innerWidth < 768 ? 200 : 280);
        setPerspective(window.innerWidth < 768 ? 600 : 800);
        if (window.innerWidth < 768) {
          setCardMarginLeft(-96);
          setCardMarginTop(-72);
        } else if (window.innerWidth < 1024) {
          setCardMarginLeft(-112);
          setCardMarginTop(-80);
        } else {
          setCardMarginLeft(-128);
          setCardMarginTop(-96);
        }
      };

      const handleScroll = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          setIsVisible(isInView);
        }
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      handleResize(); // Initial check
      handleScroll(); // Initial check
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    // 지속적인 자동 회전 (가시성에 따라 제어)
    useEffect(() => {
      const interval = setInterval(() => {
        if (!isDragging && isVisible) {
          setRotationY((prev: number) => prev - 0.2); // 더 느리게 회전
        }
      }, 16); // 60fps로 부드러운 애니메이션
  
      return () => clearInterval(interval);
    }, [isDragging, isVisible]);

    // 마우스 위치 추적
    useEffect(() => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        
        if (!isDragging) {
          // 전체 화면 기준으로 마우스 위치 계산
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          
          // 마우스 위치를 -1에서 1 사이의 값으로 정규화 (전체 화면 기준)
          const normalizedX = (mouseEvent.clientX - centerX) / centerX;
          const normalizedY = (mouseEvent.clientY - centerY) / centerY;
          
          // 부드러운 마우스 추적을 위한 보간
          setMouseX(prev => prev * 0.7 + normalizedX * 0.3);
          setMouseY(prev => prev * 0.7 + normalizedY * 0.3);
        }
      };

      // 전체 문서에 마우스 이벤트 리스너 추가
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [isDragging]);
  
    // 마우스 드래그 시작
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setLastMouseX(e.clientX);
      setLastMouseY(e.clientY);
      document.body.style.cursor = 'crosshair';
    };
  
    // 마우스 드래그 중 (3D 회전)
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;
      
      // Y축 회전 (좌우)
      setRotationY((prev: number) => prev + deltaX * 0.5);
      // X축 회전 (상하) - 제한된 범위
      setRotationX((prev: number) => {
        const newRotation = prev - deltaY * 0.3;
        return Math.max(-45, Math.min(45, newRotation)); // -45도에서 45도로 제한
      });
      
      setLastMouseX(e.clientX);
      setLastMouseY(e.clientY);
    };
  
    // 마우스 드래그 종료 - 자연스럽게 정지
    const handleMouseUp = () => {
      setIsDragging(false);
      
      // 드래그 종료 시 자연스럽게 정지 (스냅 없음)
      // X축은 중앙으로 부드럽게 복귀
      setRotationX(0);
      document.body.style.cursor = 'default';
    };
  
    return (
      <motion.div 
        ref={containerRef}
        className="flex flex-col items-center select-none carousel-container"
        style={{ opacity, scale }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => {
          document.body.style.cursor = 'crosshair';
        }}
        onMouseLeave={() => {
          handleMouseUp();
          document.body.style.cursor = 'default';
        }}
      >

        {/* 3D 캐러셀 컨테이너 */}
        <div 
          className="relative h-[190px] sm:h-[240px] lg:h-[280px] mb-1 sm:mb-1 lg:mb-2" 
          style={{ perspective: `${perspective}px` }}
          onMouseDown={handleMouseDown}
        >
          <div 
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotationY + mouseX * 8}deg) rotateX(${rotationX + mouseY * 12}deg)`,
              transition: isDragging ? 'none' : 'transform 0.4s ease-out'
            }}
          >
            {/* 블랙홀 애니메이션 - 3D 공간 내부에 위치 */}
            <BlackHole parentRotationY={rotationY + mouseX * 8} parentRotationX={rotationX + mouseY * 12} />
            
            {items.map((item, index) => {
              const rotateY = index * angleStep;
              
              return (
                <div
                  key={item.id}
                  className="absolute w-48 sm:w-56 lg:w-64 h-36 sm:h-40 lg:h-48 flex flex-col justify-center items-center border-2 sm:border-4 border-gray-300 shadow-lg rounded-lg bg-white z-0"
                  style={{
                    transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
                    transformOrigin: 'center center',
                    left: '50%',
                    top: '50%',
                    marginLeft: `${cardMarginLeft}px`,
                    marginTop: `${cardMarginTop}px`,
                  }}
                  onClick={() => {}} // 카드 클릭 이벤트
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{item.id}</div>
                  <div className="text-xs sm:text-sm text-gray-600 text-center px-2 sm:px-3 lg:px-4 opacity-90 font-medium">{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }