"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BenefitCard from "./BenefitCard";

// 타이핑 효과 컴포넌트
function TypewriterText({
  text,
  speed = 100,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 스크롤이 50% 도달했을 때 타이핑 시작
  const shouldStartTyping = useTransform(
    scrollYProgress,
    [0.3, 0.5],
    [false, true]
  );

  useEffect(() => {
    const unsubscribe = shouldStartTyping.on("change", (latest) => {
      if (latest && !hasStarted) {
        setHasStarted(true);
        setIsTyping(true);
      }
    });

    return () => unsubscribe();
  }, [shouldStartTyping, hasStarted]);

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      setIsTyping(false);
    }
  }, [currentIndex, text, speed, isTyping]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
      {isTyping && <span className="animate-pulse text-black">|</span>}
    </span>
  );
}

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  backDescription: string; // 추가
  backImage?: string; // 추가
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "건강 챙기기",
    description: "4대 보험 완비로\n안전한 근무 환경을\n보장해드려요!",
    icon: "🛡️",
    color: "from-blue-50 to-blue-100",
    backDescription: "4대 보험을 완비하여\n안전한 근무 환경을\n제공합니다.",
    backImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 2,
    title: "휴식 타임",
    description: "다양한 휴가 제도와\n즐거운 사내 행사를\n운영하고 있어요!",
    icon: "🏖️",
    color: "from-green-50 to-green-100",
    backDescription:
      "다양한 휴가 제도와\n사내 행사를 통해\n즐거운 근무 환경을\n제공합니다.",
    backImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 3,
    title: "보상 시스템",
    description: "성과에 따른 보상과\n다양한 지원 제도를\n운영하고 있어요!",
    icon: "💰",
    color: "from-yellow-50 to-yellow-100",
    backDescription:
      "성과에 따른 보상과\n다양한 지원 제도를\n통해 구성원의 노력을\n인정합니다.",
    backImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 4,
    title: "성장 스쿨",
    description: "지속적인 성장을 위한\n교육과 자격증 취득을\n지원해드려요!",
    icon: "🎓",
    color: "from-purple-50 to-purple-100",
    backDescription:
      "교육과 자격증 취득을\n지원하여 개인의 성장과\n전문성 향상을 돕습니다.",
    backImage:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 5,
    title: "건강 관리",
    description:
      "사내 동호회와 건강검진으로\n건강한 조직 문화를\n조성하고 있어요!",
    icon: "🏥",
    color: "from-red-50 to-red-100",
    backDescription:
      "사내 동호회 활동과\n건강검진을 통해\n건강한 조직 문화를\n조성합니다.",
    backImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 6,
    title: "자유 스타일",
    description: "개성을 존중하는\n자유로운 복장 문화를\n제공해드려요!",
    icon: "👔",
    color: "from-indigo-50 to-indigo-100",
    backDescription:
      "개성을 존중하는\n자유로운 복장 문화로\n편안한 업무 환경을\n제공합니다.",
    backImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 7,
    title: "간식 바",
    description: "업무 효율성 향상을 위한\n다양한 간식과 음료를\n지원해드려요!",
    icon: "🍪",
    color: "from-orange-50 to-orange-100",
    backDescription:
      "다양한 간식과 음료를\n제공하여 업무 중간\n에너지 보충을 지원합니다.",
    backImage:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop&crop=center",
  },
  {
    id: 8,
    title: "도서관",
    description: "책을 읽읍시다!\n지속적인 자기계발과\n전문성 향상을 지원해요!",
    icon: "📚",
    color: "from-teal-50 to-teal-100",
    backDescription:
      "도서 구매를 지원하여\n지속적인 자기계발과\n전문성 향상을 돕습니다.",
    backImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
  },
];

function InfiniteMarquee({
  direction = "left",
  speed = 60,
  children,
}: {
  direction?: "left" | "right";
  speed?: number;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reqRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.scrollWidth / 2;
    setWidth(containerWidth);
    // 오른쪽 방향일 때는 초기 위치를 화면 오른쪽 끝으로 설정
    if (direction === "right") {
      setX(-containerWidth);
    }
  }, [direction]);

  useEffect(() => {
    if (width === 0) return;

    function animate(ts: number) {
      if (isPaused) {
        reqRef.current = requestAnimationFrame(animate);
        return;
      }

      if (startTimeRef.current === null) {
        startTimeRef.current = ts - pausedTimeRef.current;
      }

      const elapsed = ts - startTimeRef.current;
      const dist = (elapsed / 1000) * speed;
      let nextX = direction === "left" ? -dist : -width + dist;

      if (direction === "left" && Math.abs(nextX) >= width) {
        // 왼쪽 방향: 루프 리셋
        startTimeRef.current = ts;
        nextX = 0;
      } else if (direction === "right" && nextX >= 0) {
        // 오른쪽 방향: 루프 리셋
        startTimeRef.current = ts;
        nextX = -width;
      }

      setX(nextX);
      reqRef.current = requestAnimationFrame(animate);
    }

    reqRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [width, direction, speed, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (startTimeRef.current) {
      pausedTimeRef.current = performance.now() - startTimeRef.current;
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimeRef.current = null;
  };

  return (
    <div
      className="relative overflow-hidden w-full max-w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={containerRef}
        className="flex gap-6 lg:gap-8 min-h-[300px] h-auto py-2"
        style={{
          transform: `translateX(${x}px)`,
          transition: "none",
          willChange: "transform",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <div className="py-12">
      {/* 타이틀 부분 - 컨테이너 제한 */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-12 mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <TypewriterText text="Benefits." speed={150} />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              함께 성장하는 즐거운 환경을 만들어갑니다.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 캐러셀 부분 - 화면에 맞춤 */}
      <div className="space-y-8 overflow-hidden">
        {/* 첫 번째 줄 - 왼쪽 무한 루프 */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InfiniteMarquee direction="left" speed={100}>
            {benefits.map((benefit) => (
              <div
                key={`row1-${benefit.id}`}
                className="flex-shrink-0 w-72 lg:w-80"
              >
                <BenefitCard
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  backDescription={benefit.backDescription}
                  backImage={benefit.backImage}
                />
              </div>
            ))}
          </InfiniteMarquee>
        </motion.div>
        {/* 두 번째 줄 - 오른쪽 무한 루프 */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InfiniteMarquee direction="right" speed={120}>
            {benefits.map((benefit) => (
              <div
                key={`row2-${benefit.id}`}
                className="flex-shrink-0 w-72 lg:w-80"
              >
                <BenefitCard
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  backDescription={benefit.backDescription}
                  backImage={benefit.backImage}
                />
              </div>
            ))}
          </InfiniteMarquee>
        </motion.div>
      </div>
    </div>
  );
}
