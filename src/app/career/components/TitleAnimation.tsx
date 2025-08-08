"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Carousel3D from "./Carousel3D";

const carouselItems = [
  {
    id: 1,
    title: "함께 나누는 유대감",
    titleEn: "Shared Connections",

 
  },
  {
    id: 2,
    title: "변화를 향한 도전",
    titleEn: "Embracing Change",
 
  },
  {
    id: 3,
    title: "긍정의 힘",
    titleEn: "Power of Positivity",

  },
  {
    id: 4,
    title: "끊임없는 성장",
    titleEn: "Continuous Growth",
 
  },
  {
    id: 5,
    title: "창의력 있는 사고",
    titleEn: "Creative Thinking",
  
  },
  {
    id: 6,
    title: "끈기와 몰입",
    titleEn: "Perseverance & Focus",
    description: "끝까지 해내는 힘과 깊이 있는 집중",
    color: "bg-pink-500",
  },
  {
    id: 7,
    title: "열정과 책임",
    titleEn: "Passion and Responsibility",
 
  },
  {
    id: 8,
    title: "섬세한 관찰력",
    titleEn: "Attention to Detail",

  },
];

// 별 컴포넌트 (사용하지 않음)
// const Star = () => null;

// 십자 빛나는 별 컴포넌트
const CrossStar = ({
  x,
  y,
  size,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
}) => {
  // 황금색 통일 색상 조합
  const colors = {
    primary: "rgba(246,191,65,1)", // #F6BF41 - 밝은 황금색
    secondary: "rgba(246,191,65,0.8)", // 황금색 (투명도 낮춤)
    tertiary: "rgba(246,191,65,0.6)", // 황금색 (투명도 더 낮춤)
    dark: "rgba(246,191,65,0.4)", // 황금색 (가장 투명)
    glow: "rgba(246,191,65,0.3)", // 황금색 빛 (약하게)
    outerGlow: "rgba(246,191,65,0.1)", // 황금색 빛무리 (매우 약하게)
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size * 5}px`,
        height: `${size * 5}px`,
      }}
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0.8, 1],
        scale: [0, 1, 0.8, 1],
        x: [0, Math.random() * 15 - 7.5, Math.random() * 10 - 5, 0],
        y: [0, Math.random() * 15 - 7.5, Math.random() * 10 - 5, 0],
      }}
      transition={{
        duration: 6 + Math.random() * 3,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {/* 외부 빛무리 - 밝은 색상 */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 8}px`,
          height: `${size * 8}px`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors.outerGlow} 0%, transparent 70%)`,
          filter: "blur(3px)",
        }}
      />

      {/* 추가 빛무리 레이어 - 더 밝은 효과 */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 12}px`,
          height: `${size * 12}px`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(246,191,65,0.2) 0%, rgba(246,191,65,0.1) 30%, transparent 80%)`,
          filter: "blur(5px)",
        }}
      />

      {/* 황금빛 빛무리 - 가장 밝은 효과 */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 15}px`,
          height: `${size * 15}px`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(246,191,65,0.15) 0%, rgba(246,191,65,0.05) 50%, transparent 90%)`,
          filter: "blur(8px)",
        }}
      />

      {/* 중앙 원형 별 - 황금색 통일 */}
      <div
        className="absolute rounded-full"
        style={{
          left: "50%",
          top: "50%",
          width: `${size}px`,
          height: `${size}px`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 30%, ${colors.tertiary} 60%, ${colors.dark} 100%)`,
          boxShadow: `
             0 0 6px ${colors.glow},
             0 0 8px ${colors.outerGlow}
           `,
        }}
      />

      {/* 별 모양 십자 효과 - 8방향 빛 */}
      {/* 상단 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 0.8}px`,
          height: `${size * 2.5}px`,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(180deg, transparent 0%, ${colors.tertiary} 10%, ${colors.secondary} 30%, ${colors.primary} 50%, ${colors.secondary} 70%, ${colors.tertiary} 90%, transparent 100%)`,
          boxShadow: `0 0 4px ${colors.glow}`,
          clipPath:
            "polygon(50% 0%, 0% 20%, 0% 80%, 50% 100%, 100% 80%, 100% 20%)",
        }}
      />
      {/* 하단 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 0.8}px`,
          height: `${size * 2.5}px`,
          transform: "translate(-50%, -50%) rotate(180deg)",
          background: `linear-gradient(180deg, transparent 0%, ${colors.tertiary} 10%, ${colors.secondary} 30%, ${colors.primary} 50%, ${colors.secondary} 70%, ${colors.tertiary} 90%, transparent 100%)`,
          boxShadow: `0 0 4px ${colors.glow}`,
          clipPath:
            "polygon(50% 0%, 0% 20%, 0% 80%, 50% 100%, 100% 80%, 100% 20%)",
        }}
      />
      {/* 좌측 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 2.5}px`,
          height: `${size * 0.8}px`,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 10%, ${colors.secondary} 30%, ${colors.primary} 50%, ${colors.secondary} 70%, ${colors.tertiary} 90%, transparent 100%)`,
          boxShadow: `0 0 4px ${colors.glow}`,
          clipPath:
            "polygon(0% 50%, 20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%)",
        }}
      />
      {/* 우측 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 2.5}px`,
          height: `${size * 0.8}px`,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 10%, ${colors.secondary} 30%, ${colors.primary} 50%, ${colors.secondary} 70%, ${colors.tertiary} 90%, transparent 100%)`,
          boxShadow: `0 0 4px ${colors.glow}`,
          clipPath:
            "polygon(0% 50%, 20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%)",
        }}
      />

      {/* 대각선 방향 빛 - 별 모양 완성 */}
      {/* 좌상단 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 1.8}px`,
          height: `${size * 0.6}px`,
          transform: "translate(-50%, -50%) rotate(-45deg)",
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 15%, ${colors.secondary} 40%, ${colors.primary} 50%, ${colors.secondary} 60%, ${colors.tertiary} 85%, transparent 100%)`,
          boxShadow: `0 0 3px ${colors.glow}`,
          clipPath:
            "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)",
        }}
      />
      {/* 우상단 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 1.8}px`,
          height: `${size * 0.6}px`,
          transform: "translate(-50%, -50%) rotate(45deg)",
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 15%, ${colors.secondary} 40%, ${colors.primary} 50%, ${colors.secondary} 60%, ${colors.tertiary} 85%, transparent 100%)`,
          boxShadow: `0 0 3px ${colors.glow}`,
          clipPath:
            "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)",
        }}
      />
      {/* 좌하단 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 1.8}px`,
          height: `${size * 0.6}px`,
          transform: "translate(-50%, -50%) rotate(-135deg)",
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 15%, ${colors.secondary} 40%, ${colors.primary} 50%, ${colors.secondary} 60%, ${colors.tertiary} 85%, transparent 100%)`,
          boxShadow: `0 0 3px ${colors.glow}`,
          clipPath:
            "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)",
        }}
      />
      {/* 우하단 */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: `${size * 1.8}px`,
          height: `${size * 0.6}px`,
          transform: "translate(-50%, -50%) rotate(135deg)",
          background: `linear-gradient(90deg, transparent 0%, ${colors.tertiary} 15%, ${colors.secondary} 40%, ${colors.primary} 50%, ${colors.secondary} 60%, ${colors.tertiary} 85%, transparent 100%)`,
          boxShadow: `0 0 3px ${colors.glow}`,
          clipPath:
            "polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)",
        }}
      />
    </motion.div>
  );
};

// 우주 배경 컴포넌트
const SpaceBackground = () => {
  const [stars] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);

  useEffect(() => {
    // 랜덤한 별들 생성
    const generateStars = () => {
      const newStars = [];
      // 전체 영역에 10개의 별
      for (let i = 0; i < 10; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2, // 크기 증가: 1-4에서 2-6으로
          delay: Math.random() * 2,
        });
      }
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 모든 별을 십자 모양으로 */}
      {stars.map((star, index) => (
        <CrossStar key={index} {...star} />
      ))}

      {/* 큰 십자 별들 - 통일된 색상 */}
      <CrossStar x={15} y={20} size={8} delay={0} />
      <CrossStar x={85} y={30} size={6} delay={0.5} />
      <CrossStar x={70} y={70} size={5} delay={1} />
      <CrossStar x={25} y={80} size={4} delay={1.5} />
      <CrossStar x={90} y={80} size={3} delay={2} />
      <CrossStar x={50} y={15} size={7} delay={2.5} />
    </div>
  );
};

export default function TitleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 스크롤에 따른 다양한 애니메이션 효과
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  // 각 글자별 애니메이션 - 스크롤 기반
  const letters = "Work with us.".split("");

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[130vh] bg-white overflow-hidden flex flex-col items-center justify-center py-20"
    >
      {/* 우주 배경 */}
      <SpaceBackground />

      {/* 메인 타이틀 */}
      <motion.div
        className="relative z-10 text-center mt-5 sm:mt-5 lg:mt-5"
        style={{ opacity, scale, y, rotateX }}
      >
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 lg:gap-6">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight"
              style={{ fontFamily: "Istok Web" }}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* 서브 타이틀 */}
        <motion.div
          className="mt-4 sm:mt-6 lg:mt-8"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-700 font-medium"
            style={{ fontFamily: "Pretendard Variable" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{
              scale: 1.02,
              color: "#374151",
              transition: { duration: 0.3 },
            }}
          >
            znit와 함께 하실 인재를 구합니다.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* 3D 캐러셀 - 타이틀 바로 아래 */}
      <motion.div
        className="mt-32 sm:mt-36 lg:mt-40 mb-4 sm:mb-8 lg:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Carousel3D items={carouselItems} />
      </motion.div>
    </div>
  );
}
