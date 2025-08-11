"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import React from "react";
import {
  ChatBubbleLeftRightIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ChartBarIcon,
  LightBulbIcon,
  FireIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

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

  // 타이핑 애니메이션을 위한 상태
  const [typingTexts, setTypingTexts] = useState<{ [key: number]: string }>({});
  const [isTyping, setIsTyping] = useState<{ [key: number]: boolean }>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Enhanced scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.7]
  );

  // Responsive settings
  const [radius, setRadius] = useState(380);
  const [cardWidth, setCardWidth] = useState(288);
  const [cardHeight, setCardHeight] = useState(224);
  const [perspective, setPerspective] = useState(900);
  const angleStep = 360 / items.length;

  // 타이핑 애니메이션 함수
  const startTypingAnimation = (itemId: number, text: string) => {
    if (isTyping[itemId]) return;

    setIsTyping((prev) => ({ ...prev, [itemId]: true }));
    setTypingTexts((prev) => ({ ...prev, [itemId]: "" }));

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= text.length) {
        setTypingTexts((prev) => ({
          ...prev,
          [itemId]: text.slice(0, index) + (index < text.length ? "|" : ""),
        }));
        index++;
      } else {
        clearInterval(typeInterval);
        setTypingTexts((prev) => ({ ...prev, [itemId]: text }));
        setIsTyping((prev) => ({ ...prev, [itemId]: false }));
      }
    }, 80);
  };

  const stopTypingAnimation = (itemId: number) => {
    setTypingTexts((prev) => ({ ...prev, [itemId]: "" }));
    setIsTyping((prev) => ({ ...prev, [itemId]: false }));
  };

  // Enhanced GSAP 3D orbital animation with smoother motion
  useEffect(() => {
    if (!carouselRef.current || !isVisible) return;

    const tl = gsap.timeline({ repeat: -1 });

    // Create ultra-smooth orbital motion with advanced easing
    tl.to(carouselRef.current, {
      rotationY: "+=360",
      duration: 45,
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
              duration: 45,
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
        },
      });
    }
  };

  // 각 카드별 메인 컬러 정의 (RecruitProcess 컬러 사용)
  const getCardMainColor = (index: number) => {
    const colors = [
      "#F6BF41", // 밝은 황금색 - 소통하는 연결
      "#4376AB", // 중간 하늘색 - 변화를 향한 도전
      "#DC143C", // 크림슨 레드 - 긍정의 힘
      "#1E3A8A", // 밝은 남색 - 끊임없는 성장
      "#02050A", // 검은색 - 창의력 있는 사고
      "#F6BF41", // 밝은 황금색 - 끈기와 몰입
      "#4376AB", // 중간 하늘색 - 열정과 책임
      "#DC143C", // 크림슨 레드 - 섬세한 관찰력
    ];
    return colors[index % colors.length];
  };

  // 테두리용 저채도 컬러 정의 (RecruitProcess 컬러 기반)
  const getCardBorderColor = (index: number) => {
    const colors = [
      "#FEF3C7", // very light gold (tone-on-tone with #F6BF41) - 소통하는 연결
      "#DBEAFE", // very light blue (tone-on-tone with #4376AB) - 변화를 향한 도전
      "#FEE2E2", // very light red (tone-on-tone with #DC143C) - 긍정의 힘
      "#E0E7FF", // very light indigo (tone-on-tone with #1E3A8A) - 끊임없는 성장
      "#F3F4F6", // very light gray (tone-on-tone with #02050A) - 창의력 있는 사고
      "#FEF3C7", // very light gold (tone-on-tone with #F6BF41) - 끈기와 몰입
      "#DBEAFE", // very light blue (tone-on-tone with #4376AB) - 열정과 책임
      "#FEE2E2", // very light red (tone-on-tone with #DC143C) - 섬세한 관찰력
    ];
    return colors[index % colors.length];
  };

  // 한글 텍스트용 색상 (RecruitProcess 컬러 기반)
  const getKoreanTextColor = (index: number) => {
    const colors = [
      "#F59E0B", // medium gold (darker than border) - 소통하는 연결
      "#3B82F6", // medium blue (darker than border) - 변화를 향한 도전
      "#DC2626", // medium red (darker than border) - 긍정의 힘
      "#4F46E5", // medium indigo (darker than border) - 끊임없는 성장
      "#6B7280", // medium gray (darker than border) - 창의력 있는 사고
      "#F59E0B", // medium gold (darker than border) - 끈기와 몰입
      "#3B82F6", // medium blue (darker than border) - 열정과 책임
      "#DC2626", // medium red (darker than border) - 섬세한 관찰력
    ];
    return colors[index % colors.length];
  };

  // 특정 글자에 컬러를 적용할 인덱스 정의
  const getColoredLetterIndices = (
    word: string,
    wordIndex: number,
    cardIndex: number
  ) => {
    // 각 카드별로 다른 패턴으로 컬러 적용
    const patterns = [
      [0, 2], // 첫 번째, 세 번째 글자
      [0, 1, 3], // 첫 번째, 두 번째, 네 번째 글자
      [1, 3, 5], // 두 번째, 네 번째, 여섯 번째 글자
      [0, 2, 4], // 첫 번째, 세 번째, 다섯 번째 글자
      [1, 2], // 두 번째, 세 번째 글자
      [0, 4], // 첫 번째, 다섯 번째 글자
      [2, 4, 6], // 세 번째, 다섯 번째, 일곱 번째 글자
      [0, 3], // 첫 번째, 네 번째 글자
    ];

    const pattern = patterns[cardIndex % patterns.length];
    return pattern.filter((index) => index < word.length);
  };

  // 인덱스 번호 디자인 스타일 정의
  const getIndexNumberStyle = (index: number) => {
    const styles = [
      // Index 0: 원형 테두리
      {
        shape: "circle",
        background: "transparent",
        border: `1px solid ${getCardMainColor(index)}`,
        borderRadius: "50%",
        width: "22px",
        height: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "700",
        color: getCardMainColor(index),
        position: "absolute" as const,
        top: "0.75rem",
        right: "0.75rem",
      },
      // Index 1: 사각형 테두리
      {
        shape: "square",
        background: "transparent",
        border: `1px solid ${getCardMainColor(index)}`,
        borderRadius: "3px",
        width: "22px",
        height: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "700",
        color: getCardMainColor(index),
        position: "absolute" as const,
        bottom: "0.75rem",
        right: "0.75rem",
      },
      // Index 2: 테두리 없는 원형 배경 (가운데 아래)
      {
        shape: "filled-circle",
        background: getCardMainColor(index),
        border: "none",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        fontWeight: "700",
        color: "white",
        position: "absolute" as const,
        bottom: "0.75rem",
        left: "50%",
        transform: "translateX(-50%)",
      },
      // Index 3: 둥근 사각형 배경
      {
        shape: "filled-rounded",
        background: getCardMainColor(index),
        border: "none",
        borderRadius: "4px",
        width: "22px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        fontWeight: "700",
        color: "white",
        position: "absolute" as const,
        top: "0.75rem",
        left: "0.75rem",
      },
      // Index 4: 원형 테두리 (다른 위치)
      {
        shape: "circle",
        background: "transparent",
        border: `1px solid ${getCardMainColor(index)}`,
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "700",
        color: getCardMainColor(index),
        position: "absolute" as const,
        top: "0.75rem",
        right: "0.75rem",
      },
      // Index 5: 테두리 없는 사각형 배경 (가운데 위)
      {
        shape: "filled-square",
        background: getCardMainColor(index),
        border: "none",
        borderRadius: "3px",
        width: "20px",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        fontWeight: "700",
        color: "white",
        position: "absolute" as const,
        top: "0.75rem",
        left: "50%",
        transform: "translateX(-50%)",
      },
      // Index 6: 다이아몬드 모양
      {
        shape: "diamond",
        background: getCardMainColor(index),
        border: "none",
        borderRadius: "3px",
        width: "18px",
        height: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "8px",
        fontWeight: "700",
        color: "white",
        position: "absolute" as const,
        top: "0.75rem",
        right: "0.75rem",
        transform: "rotate(45deg)",
      },
      // Index 7: 원형 테두리 (투명 배경, 가운데 위)
      {
        shape: "circle-outline",
        background: "rgba(255, 255, 255, 0.9)",
        border: `1px solid ${getCardMainColor(index)}`,
        borderRadius: "50%",
        width: "22px",
        height: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        fontWeight: "700",
        color: getCardMainColor(index),
        position: "absolute" as const,
        top: "0.75rem",
        left: "50%",
        transform: "translateX(-50%)",
      },
    ];
    return styles[index % styles.length];
  };

  // Black and white card styles
  const getBlackWhiteCardStyle = (index: number) => {
    const styles = [
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)",
        border: "rgba(0,0,0,0.8)",
        glow: "rgba(0,0,0,0.3)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.2)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 100%)",
        border: "rgba(0,0,0,0.9)",
        glow: "rgba(0,0,0,0.4)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.25)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)",
        border: "rgba(0,0,0,0.85)",
        glow: "rgba(0,0,0,0.35)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.22)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.03) 100%)",
        border: "rgba(0,0,0,0.9)",
        glow: "rgba(0,0,0,0.4)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.25)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)",
        border: "rgba(0,0,0,0.8)",
        glow: "rgba(0,0,0,0.3)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.2)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 100%)",
        border: "rgba(0,0,0,0.9)",
        glow: "rgba(0,0,0,0.4)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.25)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.02) 100%)",
        border: "rgba(0,0,0,0.85)",
        glow: "rgba(0,0,0,0.35)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.22)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
      {
        bg: "linear-gradient(135deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.03) 100%)",
        border: "rgba(0,0,0,0.9)",
        glow: "rgba(0,0,0,0.4)",
        accent: "#000000",
        shadow: "rgba(0,0,0,0.25)",
        neumorphism: {
          light: "rgba(255,255,255,0.1)",
          dark: "rgba(0,0,0,0.1)",
        },
      },
    ];
    return styles[index % styles.length];
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center select-none carousel-container min-h-screen relative"
      style={{
        opacity,
        scale,
        background:
          "linear-gradient(180deg, #1e293b 0%, #334155 30%, #475569 60%, #1e293b 100%)",
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
        className="relative h-[150px] sm:h-[200px] lg:h-[280px] mb-1 sm:mb-2 lg:mb-3 mt-15"
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
            const cardStyle = getBlackWhiteCardStyle(index);

            return (
              <div
                key={item.id}
                className="absolute w-56 sm:w-64 lg:w-72 h-40 sm:h-48 lg:h-56 z-0 group cursor-pointer"
                style={{
                  position: "absolute" as const,
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
                      border: `1px solid ${getCardBorderColor(index)}`,
                      boxShadow:
                        "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    {/* Content */}
                    <div className="relative z-10 w-full h-full flex flex-col px-4 sm:px-5 lg:px-6 py-3">
                      {/* 한글 제목 - 작고 깔끔하게 다양한 위치 */}
                      <div
                        className="text-xs sm:text-sm lg:text-base font-bold leading-tight absolute flex items-center gap-2"
                        style={{
                          fontFamily: "SUIT Variable, SUIT, Pretendard Variable, Pretendard, sans-serif",
                          color: getKoreanTextColor(index),
                          letterSpacing: "0.02em",
                          maxWidth: "70%",
                          wordBreak: "keep-all",
                          ...(index === 0 && {
                            bottom: "0.5rem",
                            right: "0.5rem",
                            textAlign: "right",
                          }),
                          ...(index === 1 && {
                            top: "0.5rem",
                            left: "0.5rem",
                            textAlign: "left",
                          }),
                          ...(index === 2 && {
                            bottom: "0.5rem",
                            right: "0.5rem",
                            textAlign: "right",
                          }),
                          ...(index === 3 && {
                            top: "0.5rem",
                            right: "0.5rem",
                            textAlign: "right",
                          }),
                          ...(index === 4 && {
                            bottom: "0.5rem",
                            left: "0.5rem",
                            textAlign: "left",
                          }),
                          ...(index === 5 && {
                            bottom: "0.5rem",
                            right: "0.5rem",
                            textAlign: "right",
                          }),
                          ...(index === 6 && {
                            top: "0.5rem",
                            left: "0.5rem",
                            textAlign: "left",
                          }),
                          ...(index === 7 && {
                            top: "75%",
                            right: "1rem",
                            textAlign: "right",
                          }),
                        }}
                      >
                        {/* Heroicons 아이콘 */}
                        <span className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: getKoreanTextColor(index) }}>
                          {index === 0 ? <ChatBubbleLeftRightIcon /> : // 소통하는 연결
                           index === 1 ? <RocketLaunchIcon /> : // 변화를 향한 도전
                           index === 2 ? <SparklesIcon /> : // 긍정의 힘
                           index === 3 ? <ChartBarIcon /> : // 끊임없는 성장
                           index === 4 ? <LightBulbIcon /> : // 창의력 있는 사고
                           index === 5 ? <FireIcon /> : // 끈기와 몰입
                           index === 6 ? <FireIcon /> : // 열정과 책임
                           index === 7 ? <EyeIcon /> : <SparklesIcon />} {/* 섬세한 관찰력 */}
                        </span>
                        {item.title}
                      </div>

                      {/* 영어 제목 - 타이포그래피 스타일로 다양한 위치 */}
                      <div
                        className="font-black leading-tight tracking-wider absolute"
                        style={{
                          color: "#000000",
                          letterSpacing: "0.05em",
                          fontWeight: "500",
                          textTransform: "uppercase",
                          fontFamily: "Kanit, sans-serif",
                          lineHeight: "0.75",
                          // 사선 텍스트는 작은 크기
                          ...(index === 0 && {
                            fontSize: "2.2rem",
                            top: "1rem",
                            left: "1rem",
                            textAlign: "left",
                            transform: "rotate(-5deg)",
                            width: "calc(100% - 2rem)",
                            maxWidth: "calc(100% - 2rem)",
                            lineHeight: "1.1",
                          }),
                          ...(index === 2 && {
                            fontSize: "2.2rem",
                            top: "1rem",
                            left: "1rem",
                            textAlign: "left",
                            transform: "none",
                            width: "calc(100% - 2rem)",
                            maxWidth: "calc(100% - 2rem)",
                            lineHeight: "1.1",
                          }),
                          ...(index === 4 && {
                            fontSize: "1.7rem",
                            top: "50%",
                            left: "50%",
                            textAlign: "center",
                            transform: "translate(-50%, -50%) rotate(15deg)",
                            width: "calc(100% - 2rem)",
                            maxWidth: "calc(100% - 2rem)",
                            lineHeight: "1.1",
                          }),
                          // 일반 텍스트는 새로로 긴 폰트
                          ...(index === 1 && {
                            fontSize: "1.8rem",
                            bottom: "1rem",
                            left: "1rem",
                            textAlign: "left",
                            fontStretch: "condensed",
                            width: "calc(100% - 2rem)",
                            maxWidth: "calc(100% - 2rem)",
                            lineHeight: "1.1",
                          }),
                          ...(index === 3 && {
                            fontSize: "1.8rem",
                            bottom: "1rem",
                            left: "1rem",
                            textAlign: "left",
                            fontStretch: "condensed",
                            width: "calc(100% - 2rem)",
                            maxWidth: "calc(100% - 2rem)",
                            lineHeight: "1.1",
                          }),
                          ...(index === 5 && {
                            fontSize: "1.7rem",
                            top: "50%",
                            left: "1rem",
                            transform: "translateY(-50%)",
                            textAlign: "left",
                            fontStretch: "condensed",
                            width: "calc(100% - 2rem)",
                            maxWidth: "calc(100% - 2rem)",
                            lineHeight: "1.1",
                          }),
                          ...(index === 6 && {
                            fontSize: "2.1rem",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            textAlign: "center",
                            fontStretch: "condensed",
                            width: "auto",
                            maxWidth: "none",
                            lineHeight: "1.1",
                          }),
                          ...(index === 7 && {
                            fontSize: "1.8rem",
                            top: "50%",
                            right: "1rem",
                            transform: "translateY(-50%)",
                            textAlign: "right",
                            fontStretch: "condensed",
                            width: "calc(100% - 2rem)",
                            maxWidth: "calc(100% - 2rem)",
                            lineHeight: "1.1",
                          }),
                        }}
                      >
                        {item.titleEn.split(" ").map((word, wordIndex) => {
                          const coloredIndices = getColoredLetterIndices(
                            word,
                            wordIndex,
                            index
                          );
                          const mainColor = getCardMainColor(index);

                          return (
                            <div
                              key={wordIndex}
                              style={{
                                fontSize:
                                  index === 6
                                    ? word.length > 10
                                      ? "2.1rem"
                                      : wordIndex === 0
                                        ? "2.5rem"
                                        : wordIndex === 1
                                          ? "1.9rem"
                                          : "2.3rem"
                                    : index === 3
                                      ? word.length > 10
                                        ? "2.1rem"
                                        : wordIndex === 0
                                          ? "2.4rem"
                                          : wordIndex === 1
                                            ? "1.8rem"
                                            : "2.2rem"
                                      : word.length > 10
                                        ? "2.2rem"
                                        : wordIndex === 0
                                          ? "2.5rem"
                                          : wordIndex === 1
                                            ? "1.9rem"
                                            : "2.3rem",
                                fontWeight:
                                  wordIndex === 0
                                    ? "700"
                                    : wordIndex === 1
                                      ? "500"
                                      : "600",
                                opacity: wordIndex === 1 ? "0.8" : "1",
                                display: "block",
                                margin: "0",
                                padding: "0",
                                whiteSpace: "nowrap",
                                transform:
                                  word.length > 10 ? "scaleX(0.75)" : "none",
                                transformOrigin:
                                  index === 1 || index === 4 || index === 7
                                    ? "right center"
                                    : index === 6
                                      ? "center center"
                                      : "left center",
                                overflow: "visible",
                                width: "auto",
                                maxWidth: "none",
                              }}
                            >
                              {word.split("").map((letter, letterIndex) => (
                                <span
                                  key={letterIndex}
                                  style={{
                                    color: coloredIndices.includes(letterIndex)
                                      ? mainColor
                                      : "#000000",
                                    transition: "color 0.3s ease",
                                  }}
                                >
                                  {letter}
                                </span>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
                      boxShadow:
                        "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
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
                        className="text-base sm:text-lg lg:text-xl text-white leading-relaxed min-h-[2rem] flex items-center"
                        style={{
                          fontFamily: "SUIT Variable, SUIT, Pretendard Variable, Pretendard, sans-serif",
                          textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
                          lineHeight: "1.6",
                          letterSpacing: "0.01em",
                          color: cardStyle.accent,
                        }}
                      >
                        {typingTexts[item.id] || ""}
                      </div>

                      {/* 버튼 */}
                      <button
                        className="mt-4 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${cardStyle.accent}80, ${cardStyle.glow}60)`,
                          color: "white",
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
          background: linear-gradient(
            180deg,
            #0f172a 0%,
            #1e293b 30%,
            #0f172a 100%
          );
        }

        .carousel-container::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(
              circle at 20% 30%,
              rgba(100, 116, 139, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 60%,
              rgba(148, 163, 184, 0.06) 0%,
              transparent 50%
            ),
            linear-gradient(
              135deg,
              rgba(203, 213, 225, 0.04) 0%,
              transparent 70%
            );
          pointer-events: none;
          z-index: -1;
        }

        /* Enhanced scrollbar styling for modern theme */
        .carousel-container::-webkit-scrollbar {
          width: 6px;
        }

        .carousel-container::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
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
