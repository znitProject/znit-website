"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Carousel3D from "./Carousel3D";

const carouselItems = [
  {
    id: 1,
    title: "함께 할 수 있는 유대감",
    titleEn: "Bonding Together",
    description: "소통과 참여를 통해 함께 극복하는",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "변화에 대한 도전",
    titleEn: "Embracing Change",
    description: "두려움을 넘어서는 도전하는 자세",
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "긍정적인 마인드",
    titleEn: "Positive Mindset",
    description: "뛰어난 재능보다 중요한 마음가짐",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "지속적인 성장",
    titleEn: "Continuous Growth",
    description: "함께 변화의 시작점이 되고자 하는",
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "창의적 사고",
    titleEn: "Creative Thinking",
    description: "새로운 아이디어로 문제를 해결하는",
    color: "bg-red-500",
  },
  {
    id: 6,
    title: "팀워크 정신",
    titleEn: "Team Spirit",
    description: "함께 성장하고 함께 성공하는",
    color: "bg-pink-500",
  },
  {
    id: 7,
    title: "책임감과 열정",
    titleEn: "Responsibility & Passion",
    description: "자신의 역할에 최선을 다하는",
    color: "bg-indigo-500",
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
}) => (
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
    {/* 중앙 원형 별 - 작은 그림자 */}
    <div
      className="absolute rounded-full"
      style={{
        left: "50%",
        top: "50%",
        width: `${size}px`,
        height: `${size}px`,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
        boxShadow: "0 0 8px rgba(0,0,0,0.3)",
      }}
    />

    {/* 십자 빛 효과 - 작고 깔끔하게 */}
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        width: `${size * 2.5}px`,
        height: "2px",
        transform: "translate(-50%, -50%)",
        background:
          "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 80%, transparent 100%)",
        boxShadow: "0 0 6px rgba(0,0,0,0.2)",
      }}
    />
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        width: "2px",
        height: `${size * 2.5}px`,
        transform: "translate(-50%, -50%)",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 80%, transparent 100%)",
        boxShadow: "0 0 6px rgba(0,0,0,0.2)",
      }}
    />
  </motion.div>
);

// 우주 배경 컴포넌트
const SpaceBackground = () => {
  const [stars] = useState<
    Array<{ x: number; y: number; size: number; delay: number }>
  >([]);
  const [crossStars] = useState<
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

      // 십자 별들 생성 (더 특별한 별들)
      const newCrossStars = [];
      for (let i = 0; i < 5; i++) {
        newCrossStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 3, // 크기 증가: 2-4에서 3-6으로
          delay: Math.random() * 2,
        });
      }
      // setCrossStars(newCrossStars); // 사용하지 않음
    };

    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 모든 별을 십자 모양으로 */}
      {stars.map((star, index) => (
        <CrossStar key={index} {...star} />
      ))}

      {/* 큰 십자 별들 */}
      <CrossStar x={15} y={20} size={8} delay={0} />
      <CrossStar x={85} y={30} size={6} delay={0.5} />
      <CrossStar x={70} y={70} size={5} delay={1} />
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
          className="mt-6 sm:mt-8 lg:mt-10"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-black font-bold"
            style={{ fontFamily: "Istok Web" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{
              scale: 1.05,
              color: "#3B82F6",
              transition: { duration: 0.3 },
            }}
          ></motion.p>
        </motion.div>
      </motion.div>

      {/* 3D 캐러셀 - 타이틀 바로 아래 */}
      <motion.div
        className="mt-32 sm:mt-40 lg:mt-48 mb-10 sm:mb-30 lg:mb-38"
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
