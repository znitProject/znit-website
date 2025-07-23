'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import FileUpload from './FileUpload';

interface ApplySectionProps {
  onSubmit: (file: File) => Promise<any>;
}

// 텍스트 Block Reveal 효과 애니메이션 컴포넌트
const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 0.1, 
        delay: delay
      }}
    >
      {/* 배경 블록 (덮는 효과) */}
      <motion.div
        className="absolute inset-0 bg-black z-10"
        initial={{ x: "0%" }}
        animate={isInView ? { x: "100%" } : { x: "0%" }}
        transition={{ 
          duration: 0.8, 
          delay: delay + 0.1,
          ease: "easeInOut"
        }}
      />
      
      {/* 텍스트 */}
      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium relative z-0"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          delay: delay + 0.2,
          ease: "easeOut"
        }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default function ApplySection({ onSubmit }: ApplySectionProps) {
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });

  return (
    <div className="mt-12 sm:mt-16 lg:mt-20 mb-12 sm:mb-16 lg:mb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* 왼쪽 영역 - 2/3 */}
            <div className="flex flex-col order-2 lg:order-1 lg:col-span-2">
              {/* 글귀 */}
              <div className="text-center lg:text-left lg:ml-20 mb-8 lg:mb-12 space-y-4">
                <AnimatedText 
                  text="우리와 함께 꿈을 이루고" 
                  delay={0}
                />
                <AnimatedText 
                  text="더 큰 성장을 경험할 멤버를 찾고 있습니다." 
                  delay={0.3}
                />
                <AnimatedText 
                  text="ZNIT와 함께 할 재능있는 여러분을 기다립니다." 
                  delay={0.6}
                />
              </div>

              {/* 파일 업로드 버튼 */}
              <div className="flex justify-center lg:justify-end lg:mr-10 mt-10 lg:mt-80">
                <FileUpload onSubmit={onSubmit} />
              </div>
            </div>

            {/* 오른쪽 이미지 영역 - 1/3 (풀스크린 느낌) */}
            <div className="w-full lg:w-full h-96 sm:h-[500px] lg:h-[600px] order-1 lg:order-2 lg:col-span-1 relative">
              <motion.div
                ref={imageRef}
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={isImageInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  x: 0 
                } : { 
                  opacity: 0, 
                  scale: 0.8, 
                  x: 50 
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.5,
                  ease: "easeOut"
                }}
              >
                <img
                  src="/Image_fx (1).jpg"
                  alt="ZNIT 채용 - 미래지향적인 성장과 혁신"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 이미지 로드 실패시 기본 이미지로 대체
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial' font-size='24' fill='%236b7280'%3EZNIT 채용%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 