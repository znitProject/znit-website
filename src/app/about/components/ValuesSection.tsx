"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

// --- INTERFACES & DATA ---
interface ValueCardData {
  id: number;
  title: string;
  description: string;
  color: string;
  image: string;
  detailContent: {
    subtitle: string;
    explanation: string;
  };
}

const values: ValueCardData[] = [
  {
    id: 1,
    title: "주체성",
    description: "Independence\nProactiveness",
    color: "bg-blue-500",
    image: "/values/independence.png",
    detailContent: {
      subtitle: "자신의 생각과 판단으로 행동하는 능력",
      explanation:
        "주체성은 우리가 만들어내는 혁신과 창의성의 핵심 동력입니다.\n 모든 팀원이 스스로 사고하고, 능동적으로 문제를 해결하며,\n 자신의 아이디어를 실현해 나갈 때\n 비로소 최고의 결과물이 탄생한다고 믿습니다.",
    },
  },
  {
    id: 2,
    title: "공동체 의식",
    description: "Community spirit\nTogetherness",
    color: "bg-red-500",
    image: "/values/community.png",
    detailContent: {
      subtitle: "함께 살아가는 공동체를 위한 마음가짐",
      explanation:
        "우리는 공동체 의식을 바탕으로 함께 나아갑니다.\n 긴밀한 협력과 활발한 소통을 통해 서로의 성장을 돕고,\n 동반자로서 더 나은 미래를 함께 만들어 나갑니다.",
    },
  },
  {
    id: 3,
    title: "전문성",
    description: "Professionalism\nExpertise",
    color: "bg-purple-500",
    image: "/values/professionalism.png",
    detailContent: {
      subtitle: "자신이 맡은 분야에 대한 전문적인 지식과 경험",
      explanation:
        "우리는 끊임없는 배움과 도전을 통해 전문성을 갈고닦습니다.\n 각자의 분야에서 최고가 되기 위한 노력을 멈추지 않으며,\n 이러한 전문성이 모여 혁신적인 결과물을 만들어냅니다.",
    },
  },
  {
    id: 4,
    title: "책임감",
    description: "Responsibility",
    color: "bg-orange-500",
    image: "/values/responsibility.png",
    detailContent: {
      subtitle: "자신의 행동과 결정에 대한 책임을 지는 태도",
      explanation:
        "우리는 맡은 업무에 대한 책임감을 바탕으로 신뢰를 구축합니다.\n 약속을 지키고, 최고의 결과물을 위해 끊임없이 노력하며,\n 우리의 행동이 가져올 영향에 대해 깊이 생각합니다.",
    },
  },
  {
    id: 5,
    title: "전략적 사고",
    description: "Strategic thinking",
    color: "bg-green-500",
    image: "/values/stratigic.png",
    detailContent: {
      subtitle: "나무가 아니라 숲을 보고, 더 나은 방법을 모색하는 태도",
      explanation:
        "우리는 전략적 사고를 통해 눈앞의 문제뿐만 아니라\n 그 이면에 있는 근본 원인까지 깊이 파고듭니다.\n 다양한 이해관계자들의 복합적인 요구사항을 면밀히 분석하여,\n미래를 선도할 혁신적이고 지속 가능한 해결책을 제시합니다.",
    },
  },
];

const StarryBackground = () => {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      top: string;
      left: string;
      size: string;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // 클라이언트에서만 별들을 생성하여 hydration 오류 방지
    const generatedStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const TypingAnimation = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const characters = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const colorMap: { [key: string]: string } = {
  "bg-blue-500": "text-blue-300",
  "bg-green-500": "text-green-300",
  "bg-purple-500": "text-purple-300",
  "bg-orange-500": "text-orange-300",
  "bg-red-500": "text-red-300",
};

export default function ValuesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const selectedValue = values.find((v) => v.id === hoveredId);

  return (
    <section className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-40 font-red-hat-display">
            {"We own what defines us.".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left-side Description Area */}
          <div className="lg:sticky lg:top-40">
            <motion.div
              className="w-full p-8 text-white min-h-[500px] flex items-center"
              animate={{ opacity: selectedValue ? 1 : 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {selectedValue && (
                <motion.div
                  key={selectedValue.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full -ml-8"
                >
                  <div className="mb-6">
                    <TypingAnimation
                      text={selectedValue.title}
                      className={`text-5xl font-bold ${colorMap[selectedValue.color]}`}
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-8 text-gray-200 leading-tight">
                    {selectedValue.detailContent.subtitle}
                  </h3>
                  <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">
                    {selectedValue.detailContent.explanation
                      .split("\n")
                      .map((line, index) => (
                        <span key={index}>
                          {line}
                          {index <
                            selectedValue.detailContent.explanation.split("\n")
                              .length -
                              1 && <br />}
                        </span>
                      ))}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right-side Card Area */}
          <div className="space-y-16">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                onMouseEnter={() => setHoveredId(value.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="w-80 h-120 rounded-xl cursor-pointer relative"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: hoveredId === value.id ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Card Front */}
                  <div
                    className="absolute inset-0 rounded-xl p-6 flex flex-col justify-end text-right bg-black border border-white/20 overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <StarryBackground />
                    <div className="relative z-10 mb-4">
                      <h3 className="text-3xl font-bold mb-2 text-white">
                        {value.title}
                      </h3>
                      <p className="text-lg text-white/90 font-red-hat-display whitespace-pre-line">
                        {value.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <motion.svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ x: [-4, 4, -4] }}
                        transition={{
                          duration: 2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                    <div className="absolute top-6 right-6 text-right">
                      <h3 className="text-3xl font-bold mb-2 text-white">
                        {value.title}
                      </h3>
                      <p className="text-lg text-white/90 font-red-hat-display whitespace-pre-line">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
