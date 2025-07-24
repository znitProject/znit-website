'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// 🔸 타이핑 효과
const TypingTitle = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      setDisplayText('');
      setCurrentIndex(0);
    } else if (!isInView) {
      setHasStarted(false);
      setDisplayText('');
      setCurrentIndex(0);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (currentIndex < text.length && hasStarted) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, hasStarted]);

  return (
    <motion.h2 
      ref={ref}
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {displayText}
    </motion.h2>
  );
};

// 🔸 개별 스텝
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
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut" as const
      }}
    >
      {/* 원형 숫자 */}
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
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
      >
        {title}
      </motion.h3>

      {/* 설명 */}
      <motion.p 
        className="text-gray-600 max-w-xs leading-relaxed whitespace-pre-line"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// 🔸 메인 컴포넌트
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
      description: "온라인 지원서를 통해\n본인의 경력과 역량을\n소개해주세요."
    },
    {
      number: "02", 
      title: "서류 심사",
      description: "제출된 지원서와\n포트폴리오를 바탕으로\n1차 심사를 진행합니다."
    },
    {
      number: "03",
      title: "면접 진행", 
      description: "실무진과의 면접을 통해\n서로의 가치관과 역량을\n확인합니다."
    },
    {
      number: "04",
      title: "최종 합격",
      description: "모든 과정을 통과하시면\nZNIT의 새로운 멤버가\n됩니다!"
    }
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{ y }}
    >
      <div className="py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* 전체 배경색 영역 */}
          <div className="bg-gray-50 rounded-2xl p-12">
                {/* 타이틀 */}
                <div className="mb-20">
                  <TypingTitle text="Process." />
                </div>

                {/* 스텝 리스트 */}
                <div className="relative hidden lg:flex justify-between items-start">
                  {processSteps.map((step, index) => {
                    const isLast = index === processSteps.length - 1;
                    return (
                      <div key={index} className="relative flex flex-col items-center w-1/4">
                      <ProcessStep 
                        number={step.number}
                        title={step.title}
                        description={step.description}
                        index={index}
                      />
                    
                      {!isLast && (
                        <div className="absolute top-10 right-[-5rem] transform -translate-y-1/2 w-40 h-px border-t-2 border-dashed border-gray-300 z-0" />
                      )}
                    </div>
                    );
                  })}
                </div>

                {/* 모바일: 스택 방식 */}
                <div className="flex flex-col gap-16 lg:hidden">
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
              </div>
          </div>
        </div>
    </motion.div>
  );
};

export default RecruitProcess;
