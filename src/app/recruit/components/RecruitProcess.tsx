'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// 타이핑 효과 컴포넌트
const TypingTitle = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <motion.h2 
      className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {displayText}
    </motion.h2>
  );
};

// 개별 스텝 컴포넌트
const ProcessStep = ({ 
  number, 
  title, 
  description, 
  index 
}: { 
  number: string; 
  title: string; 
  description: string; 
  index: number; 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut" as const
      }}
    >
      {/* 스텝 원형 */}
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-6 relative z-10"
        style={{
          background: index === 0 ? '#ffffff' :
                    index === 1 ? '#cccccc' :
                    index === 2 ? '#666666' :
                    '#000000',
          color: index === 0 ? '#000000' : '#ffffff',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
        {number}
      </motion.div>

      {/* 제목 */}
      <motion.h3 
        className="text-xl md:text-2xl font-semibold mb-4 text-gray-900"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
      >
        {title}
      </motion.h3>

      {/* 설명 */}
      <motion.p 
        className="text-gray-600 max-w-xs leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// 점선 연결 컴포넌트
const DashedLine = ({ index }: { index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="absolute h-0.5"
      style={{ 
        top: '40px',
        left: `${10 + index * 25}%`,
        width: '30%',
        background: 'repeating-linear-gradient(to right, #9CA3AF 0px, #9CA3AF 6px, transparent 6px, transparent 12px)'
      }}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2 + 0.4,
        ease: "easeOut" as const
      }}
    />
  );
};

// 메인 Process 컴포넌트
const RecruitProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const processSteps = [
    {
      number: "01",
      title: "지원서 제출",
      description: "온라인 지원서를 통해 본인의 경력과 역량을 소개해주세요."
    },
    {
      number: "02", 
      title: "서류 심사",
      description: "제출된 지원서와 포트폴리오를 바탕으로 1차 심사를 진행합니다."
    },
    {
      number: "03",
      title: "면접 진행", 
      description: "실무진과의 면접을 통해 서로의 가치관과 역량을 확인합니다."
    },
    {
      number: "04",
      title: "최종 합격",
      description: "모든 과정을 통과하시면 ZNIT의 새로운 멤버가 됩니다!"
    }
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{ y }}
    >


      {/* 컨텐츠 영역 */}
      <div className="relative z-10">
        <div className="py-24">
          <div className="max-w-6xl mx-auto px-4">
            {/* 제목 */}
            <div className="mb-16">
              <TypingTitle text="Process." />
            </div>
            
            {/* 프로세스 스텝들 */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <ProcessStep 
                      number={step.number}
                      title={step.title}
                      description={step.description}
                      index={index}
                    />
                  </div>
                ))}
              </div>
              
              {/* 점선 연결을 별도로 배치 */}
              <div className="absolute top-0 left-0 right-0">
                {processSteps.map((step, index) => (
                  index < processSteps.length - 1 && (
                    <DashedLine key={`line-${index}`} index={index} />
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecruitProcess; 