'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

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
    examples: string[];
  };
}

const values: ValueCardData[] = [
  {
    id: 1,
    title: "주체성",
    description: "Subjectivity\nAutonomy\nProactiveness",
    color: "bg-blue-500",
    image: "/recruit-abstract.jpg",
    detailContent: {
      subtitle: "자신의 생각과 판단으로 행동하는 능력",
      explanation: "주체성은 자신의 생각과 판단을 바탕으로 독립적으로 행동하고 결정하는 능력을 의미합니다. 타인의 의견에 좌우되지 않고 \n자신만의 가치관과 원칙을 가지고 살아가는 것을 말합니다.",
      examples: [
        "자신의 목표를 스스로 설정하고 추진하기",
        "의견이 다를 때 자신의 생각을 명확히 표현하기",
        "문제 상황에서 스스로 해결책을 찾아 실행하기"
      ]
    }
  },
  {
    id: 2,
    title: "공동체 의식",
    description: "Community spirit\nSense of community",
    color: "bg-green-500",
    image: "/recruit-handshake.jpg",
    detailContent: {
      subtitle: "함께 살아가는 공동체를 위한 마음가짐",
      explanation: "공동체 의식은 개인이 속한 집단이나 사회의 구성원으로서 \n공동의 이익과 발전을 위해 협력하고 기여하려는 마음가짐을 의미합니다. 개인의 이익보다 공동체의 발전을 우선시하는 \n태도를 말합니다.",
      examples: [
        "팀 프로젝트에서 개인보다 팀 성과를 우선시하기",
        "지역사회 문제에 관심을 가지고 참여하기",
        "동료들과 정보를 공유하고 서로 돕기"
      ]
    }
  },
  {
    id: 3,
    title: "능동성",
    description: "Activeness\nProactiveness",
    color: "bg-purple-500",
    image: "/work_image.jpg",
    detailContent: {
      subtitle: "적극적이고 주도적으로 행동하는 자세",
      explanation: "능동성은 상황을 기다리지 않고 적극적으로 행동하며, \n문제를 미리 예측하고 해결책을 준비하는 능동적인 자세를 \n의미합니다. 수동적이 아닌 주도적으로 상황을 이끌어가는 \n태도를 말합니다.",
      examples: [
        "새로운 기술을 배우기 위해 스스로 학습 계획을 세우기",
        "업무 개선 아이디어를 제안하고 실행하기",
        "문제가 발생하기 전에 예방 조치를 취하기"
      ]
    }
  },
  {
    id: 4,
    title: "책임감",
    description: "Sense of responsibility",
    color: "bg-orange-500",
    image: "/recruit-image.jpg",
    detailContent: {
      subtitle: "자신의 행동과 결정에 대한 책임을 지는 태도",
      explanation: "책임감은 자신이 맡은 일이나 행동에 대해 끝까지 책임을 지고 완수하려는 의지와 태도를 의미합니다. 결과에 대한 책임을 \n회피하지 않고 적극적으로 해결하려는 마음가짐을 말합니다.",
      examples: [
        "맡은 프로젝트를 기한 내에 완료하기",
        "실수를 했을 때 인정하고 수정하기",
        "팀원들의 업무를 지원하고 도움을 주기"
      ]
    }
  },
  {
    id: 5,
    title: "전략적 사고",
    description: "Strategic thinking",
    color: "bg-red-500",
    image: "/contact_us_image.jpg",
    detailContent: {
      subtitle: "장기적 관점에서 목표를 달성하는 사고방식",
      explanation: "전략적 사고는 현재의 상황을 분석하고 미래의 목표를 설정한 후, 그 목표를 달성하기 위한 체계적이고 장기적인 계획을 세우는 사고방식을 의미합니다. 단기적 이익보다는 장기적 성과를 고려하는 능력을 말합니다.",
      examples: [
        "업무 개선을 위한 단계별 계획 수립하기",
        "경쟁사 분석을 통한 차별화 전략 수립하기",
        "자원을 효율적으로 배분하여 목표 달성하기"
      ]
    }
  }
];

const StarryBackground = () => {
  const [stars, setStars] = useState<Array<{
    id: number;
    top: string;
    left: string;
    size: string;
    duration: number;
    delay: number;
  }>>([]);

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
      {stars.map(star => (
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
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const TypingAnimation = ({ text, className }: { text: string; className?: string }) => {
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
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const colorMap: { [key: string]: string } = {
  'bg-blue-500': 'text-blue-400',
  'bg-green-500': 'text-green-400',
  'bg-purple-500': 'text-purple-400',
  'bg-orange-500': 'text-orange-400',
  'bg-red-500': 'text-red-400',
};

export default function ValuesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const selectedValue = values.find(v => v.id === hoveredId);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-40 font-red-hat-display">
            {"Core Values".split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: Math.random() * 2, ease: "easeInOut" }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="mb-6">
                    <TypingAnimation 
                      text={selectedValue.title} 
                      className={`text-4xl font-bold ${colorMap[selectedValue.color]}`} 
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-300 leading-tight">
                    {selectedValue.detailContent.subtitle}
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg whitespace-pre-line">
                    {selectedValue.detailContent.explanation}
                  </p>
                  <div>
                    <ul className="space-y-3">
                      {selectedValue.detailContent.examples.map((example, index) => (
                        <li key={index} className="text-base text-gray-400 flex items-start leading-relaxed">
                          <span className="text-blue-400 mr-3 mt-1">•</span>
                          <span className="flex-1">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                onMouseEnter={() => setHoveredId(value.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="w-80 h-96 rounded-xl cursor-pointer relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: hoveredId === value.id ? 180 : 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Card Front */}
                  <div
                    className="absolute inset-0 rounded-xl p-6 flex flex-col justify-end text-right bg-black border border-white/20 overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <StarryBackground />
                    <div className="relative z-10 mb-4">
                      <h3 className="text-3xl font-bold mb-2 text-white">{value.title}</h3>
                      <p className="text-lg text-white/90 font-red-hat-display whitespace-pre-line">{value.description}</p>
                    </div>
                  </div>

                  {/* Card Back */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <Image 
                      src={value.image} 
                      alt={value.title} 
                      fill 
                      style={{ objectFit: 'cover' }}
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
                          repeatType: "loop"
                        }}
                      >
                        <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                    </div>
                    <div className="absolute top-6 right-6 text-right">
                        <h3 className="text-3xl font-bold mb-2 text-white">{value.title}</h3>
                        <p className="text-lg text-white/90 font-red-hat-display whitespace-pre-line">{value.description}</p>
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