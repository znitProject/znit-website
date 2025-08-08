"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import React from "react";


interface CarouselItem {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  color: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
}



export default function Carousel3D({ items }: Carousel3DProps) {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  // 3D tilt 효과를 위한 상태 추가
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  
  // 타이핑 애니메이션을 위한 상태
  const [typingTexts, setTypingTexts] = useState<{[key: number]: string}>({});
  const [isTyping, setIsTyping] = useState<{[key: number]: boolean}>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);

  // Responsive settings
  const [radius, setRadius] = useState(380);
  const [cardWidth, setCardWidth] = useState(288);
  const [cardHeight, setCardHeight] = useState(224);
  const [perspective, setPerspective] = useState(900);
  const angleStep = 360 / items.length;


  // 타이핑 애니메이션 함수
  const startTypingAnimation = (itemId: number, text: string) => {
    if (isTyping[itemId]) return;
    
    setIsTyping(prev => ({ ...prev, [itemId]: true }));
    setTypingTexts(prev => ({ ...prev, [itemId]: '' }));
    
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= text.length) {
        setTypingTexts(prev => ({ 
          ...prev, 
          [itemId]: text.slice(0, index) + (index < text.length ? '|' : '')
        }));
        index++;
      } else {
        clearInterval(typeInterval);
        setTypingTexts(prev => ({ ...prev, [itemId]: text }));
        setIsTyping(prev => ({ ...prev, [itemId]: false }));
      }
    }, 80);
  };

  const stopTypingAnimation = (itemId: number) => {
    setTypingTexts(prev => ({ ...prev, [itemId]: '' }));
    setIsTyping(prev => ({ ...prev, [itemId]: false }));
  };

  // Enhanced GSAP 3D orbital animation with smoother motion
  useEffect(() => {
    if (!carouselRef.current || !isVisible) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    // Create ultra-smooth orbital motion with advanced easing
    tl.to(carouselRef.current, {
      rotationY: "+=360",
      duration: 25,
      ease: "power1.inOut",
    });

    // Add subtle floating animation
    gsap.to(carouselRef.current, {
      y: "+=8",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Add gentle scale pulsing
    gsap.to(carouselRef.current, {
      scale: 1.02,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(carouselRef.current);
    };
  }, [isVisible]);


  // Responsive and visibility setup
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setRadius(280);
        setPerspective(700);
        setCardWidth(224); // w-56
        setCardHeight(160); // h-40
      } else if (window.innerWidth < 1024) {
        setRadius(330);
        setPerspective(800);
        setCardWidth(256); // w-64
        setCardHeight(192); // h-48
      } else {
        setRadius(380);
        setPerspective(900);
        setCardWidth(288); // w-72
        setCardHeight(224); // h-56
      }
    };

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInView);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Enhanced mouse tracking with tilt effect
  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;

      if (!isDragging) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const normalizedX = (mouseEvent.clientX - centerX) / centerX;
        const normalizedY = (mouseEvent.clientY - centerY) / centerY;

        setMouseX((prev) => prev * 0.8 + normalizedX * 0.2);
        setMouseY((prev) => prev * 0.8 + normalizedY * 0.2);
        
        // 3D tilt 효과를 위한 값 설정
        setTiltX((prev) => prev * 0.9 + normalizedY * 5);
        setTiltY((prev) => prev * 0.9 + normalizedX * 5);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging]);

  // Enhanced interaction handlers with GSAP smoothing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
    setLastMouseY(e.clientY);
    document.body.style.cursor = "grabbing";
    
    // Pause automatic rotation when dragging
    if (carouselRef.current) {
      gsap.killTweensOf(carouselRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    // Use GSAP for smoother drag rotation
    const newRotationY = rotationY + deltaX * 0.4;
    const newRotationX = Math.max(-45, Math.min(45, rotationX - deltaY * 0.3));
    
    setRotationY(newRotationY);
    setRotationX(newRotationX);

    // Apply smooth GSAP transform
    gsap.to(carouselRef.current, {
      rotationY: newRotationY + mouseX * 8,
      rotationX: newRotationX + mouseY * 10,
      duration: 0.3,
      ease: "power2.out",
    });

    setLastMouseX(e.clientX);
    setLastMouseY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "grab";
    
    // Smoothly return to center and resume automatic rotation
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        rotationX: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setRotationX(0);
          // Resume automatic animations
          if (isVisible) {
            const tl = gsap.timeline({ repeat: -1 });
            tl.to(carouselRef.current, {
              rotationY: "+=360",
              duration: 25,
              ease: "power1.inOut",
            });
            
            gsap.to(carouselRef.current, {
              y: "+=8",
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
            
            gsap.to(carouselRef.current, {
              scale: 1.02,
              duration: 6,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            });
          }
        }
      });
    }
  };

  // Hopeful and modern card styles for career page
  const getHopefulCardStyle = (index: number) => {
    const colors = [
      { 
        bg: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(99,102,241,0.05) 100%)", 
        border: "rgba(59,130,246,0.6)", 
        glow: "rgba(59,130,246,0.4)", 
        accent: "#3b82f6",
        shadow: "rgba(59,130,246,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(59,130,246,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)", 
        border: "rgba(16,185,129,0.6)", 
        glow: "rgba(16,185,129,0.4)", 
        accent: "#10b981",
        shadow: "rgba(16,185,129,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(16,185,129,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(245,101,101,0.1) 0%, rgba(251,113,133,0.05) 100%)", 
        border: "rgba(245,101,101,0.6)", 
        glow: "rgba(245,101,101,0.4)", 
        accent: "#f56565",
        shadow: "rgba(245,101,101,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(245,101,101,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(147,51,234,0.05) 100%)", 
        border: "rgba(168,85,247,0.6)", 
        glow: "rgba(168,85,247,0.4)", 
        accent: "#a855f7",
        shadow: "rgba(168,85,247,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(168,85,247,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(22,163,74,0.05) 100%)", 
        border: "rgba(34,197,94,0.6)", 
        glow: "rgba(34,197,94,0.4)", 
        accent: "#22c55e",
        shadow: "rgba(34,197,94,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(34,197,94,0.1)"
        }
      },
      { 
        bg: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%)", 
        border: "rgba(251,191,36,0.6)", 
        glow: "rgba(251,191,36,0.4)", 
        accent: "#fbbf24",
        shadow: "rgba(251,191,36,0.15)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(251,191,36,0.1)"
        }
      },
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center select-none carousel-container min-h-screen relative"
      style={{ 
        opacity, 
        scale,
        background: "linear-gradient(180deg, #1e293b 0%, #334155 30%, #475569 60%, #1e293b 100%)",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => {
        document.body.style.cursor = "grab";
      }}
      onMouseLeave={() => {
        handleMouseUp();
        document.body.style.cursor = "default";
      }}
    >
      {/* Enhanced 3D Carousel Container */}
      <div
        className="relative h-[220px] sm:h-[280px] lg:h-[320px] mb-2 sm:mb-3 lg:mb-4"
        style={{ perspective: `${perspective}px` }}
        onMouseDown={handleMouseDown}
      >
        <div
          ref={carouselRef}
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: isDragging 
              ? `rotateY(${rotationY + mouseX * 8}deg) rotateX(${rotationX + mouseY * 10}deg)`
              : `rotateY(${rotationY + mouseX * 8}deg) rotateX(${rotationX + mouseY * 10}deg)`,
          }}
        >


          {items.map((item, index) => {
            const rotateY = index * angleStep;
            const cardStyle = getHopefulCardStyle(index);

            return (
              <div
                key={item.id}
                className="absolute w-56 sm:w-64 lg:w-72 h-40 sm:h-48 lg:h-56 z-0 group cursor-pointer"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `translate(-50%, -50%) rotateY(${rotateY}deg) translateZ(${radius}px)`,
                  transformOrigin: "center center",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  // GSAP를 사용한 부드러운 hover 애니메이션
                  gsap.to(e.currentTarget, {
                    rotationX: -tiltX * 0.2,
                    scale: 1.08,
                    duration: 0.6,
                    ease: "power2.out",
                    transformOrigin: "center center",
                  });
                  
                  // 타이핑 애니메이션 시작
                  setTimeout(() => {
                    startTypingAnimation(item.id, item.description);
                  }, 300);
                }}
                onMouseLeave={(e) => {
                  // GSAP를 사용한 부드러운 hover 해제 애니메이션
                  gsap.to(e.currentTarget, {
                    rotationX: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    transformOrigin: "center center",
                  });
                  
                  // 타이핑 애니메이션 정지
                  stopTypingAnimation(item.id);
                }}
                onClick={() => {}}
              >
                {/* 내부 flip 컨테이너 */}
                <div 
                  className="relative w-full h-full flip-container group-hover:flip-card"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* 카드 앞면 (Front Face) */}
                  <div 
                    className="absolute inset-0 w-full h-full flex flex-col justify-center items-center backface-hidden z-10 rounded-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      background: "white",
                      borderRadius: "1rem",
                      boxShadow: `
                        0 25px 45px rgba(0,0,0,0.15),
                        0 15px 30px rgba(0,0,0,0.1)
                      `,
                      border: `2px solid ${cardStyle.border}`,
                    }}
                  >
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center px-6 sm:px-7 lg:px-8 py-4">
                      <div
                        className="text-base sm:text-lg lg:text-xl font-bold text-center leading-tight mb-2"
                        style={{ 
                          fontFamily: "var(--font-stylish)",
                          textShadow: `0 2px 8px rgba(0,0,0,0.3)`,
                          letterSpacing: "0.02em",
                          color: cardStyle.accent,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="text-sm sm:text-base font-medium text-center leading-tight"
                        style={{ 
                          fontFamily: "var(--font-red-hat-display)",
                          color: cardStyle.accent,
                          letterSpacing: "0.01em",
                          opacity: 0.9,
                        }}
                      >
                        {item.titleEn}
                      </div>
                    </div>
                    
                    {/* Bottom geometric accent */}
                    <div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 opacity-50 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${cardStyle.accent}, transparent)`,
                      }}
                    />
                  </div>

                  {/* 카드 뒷면 (Back Face) */}
                  <div 
                    className="absolute inset-0 w-full h-full flex items-center justify-center backface-hidden z-10 rounded-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: `linear-gradient(145deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.95) 100%)`,
                      backdropFilter: "blur(40px) saturate(200%)",
                      border: `2px solid ${cardStyle.border}`,
                      borderRadius: "1rem",
                      boxShadow: `
                        inset 0 0 40px rgba(0,0,0,0.4),
                        0 0 50px ${cardStyle.glow},
                        inset 0 2px 4px rgba(255,255,255,0.05)
                      `,
                    }}
                  >
                    {/* 뒷면 콘텐츠 */}
                    <div className="text-center px-6 py-4 relative w-full h-full flex flex-col justify-center items-center">
                      {/* 아이콘 영역 */}
                      <div 
                        className="w-12 h-12 mb-4 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${cardStyle.accent}40, ${cardStyle.glow}20)`,
                          boxShadow: `0 0 20px ${cardStyle.glow}30`,
                        }}
                      >
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ background: cardStyle.accent }}
                        />
                      </div>
                      
                      {/* 타이핑 애니메이션 텍스트 */}
                      <div
                        className="text-sm sm:text-base lg:text-lg text-white leading-relaxed min-h-[2rem] flex items-center"
                        style={{ 
                          fontFamily: "var(--font-stylish)",
                          textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
                          lineHeight: "1.6",
                          letterSpacing: "0.01em",
                          color: cardStyle.accent,
                        }}
                      >
                        {typingTexts[item.id] || ''}
                      </div>
                      
                      {/* 버튼 */}
                      <button
                        className="mt-4 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${cardStyle.accent}80, ${cardStyle.glow}60)`,
                          color: 'white',
                          boxShadow: `0 4px 15px ${cardStyle.glow}40`,
                          border: `1px solid ${cardStyle.accent}40`,
                        }}
                      >
                        자세히 보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-2]">
        {/* Static gradient overlays only */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `
              radial-gradient(ellipse at 25% 25%, rgba(100,116,139,0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 75% 75%, rgba(148,163,184,0.15) 0%, transparent 60%),
              linear-gradient(135deg, rgba(203,213,225,0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <style jsx>{`
        /* Gradient Sweep Animation */
        @keyframes gradientSweep {
          0% {
            background-position: -300% -300%;
          }
          50% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 300% 300%;
          }
        }

        /* SF 홀로그래픽 효과 */
        @keyframes holographicSweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* 스캔라인 애니메이션 */
        @keyframes scanlines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 20px 0;
          }
        }

        /* 3D Flip 애니메이션을 위한 backface-visibility */
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Flip 애니메이션 */
        .flip-container {
          perspective: 1000px;
        }
        
        .flip-card {
          transform: rotateY(180deg);
        }

        .carousel-container {
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #0f172a 100%);
        }

        .carousel-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(100,116,139,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(148,163,184,0.06) 0%, transparent 50%),
            linear-gradient(135deg, rgba(203,213,225,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
        }

        /* Enhanced scrollbar styling for modern theme */
        .carousel-container::-webkit-scrollbar {
          width: 6px;
        }

        .carousel-container::-webkit-scrollbar-track {
          background: rgba(30,41,59,0.3);
        }

        .carousel-container::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #64748b, #94a3b8);
          border-radius: 3px;
        }

        .carousel-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #94a3b8, #cbd5e1);
        }
      `}</style>
    </motion.div>
  );
}