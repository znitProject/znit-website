'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Carousel3D from './Carousel3D';

const carouselItems = [
  { id: 1, title: "함께 할 수 있는 유대감", description: "소통과 참여를 통해 함께 극복하는", color: "bg-blue-500" },
  { id: 2, title: "변화에 대한 도전", description: "두려움을 넘어서는 도전하는 자세", color: "bg-purple-500" },
  { id: 3, title: "긍정적인 마인드", description: "뛰어난 재능보다 중요한 마음가짐", color: "bg-green-500" },
  { id: 4, title: "지속적인 성장", description: "함께 변화의 시작점이 되고자 하는", color: "bg-orange-500" },
  { id: 5, title: "창의적 사고", description: "새로운 아이디어로 문제를 해결하는", color: "bg-red-500" },
  { id: 6, title: "팀워크 정신", description: "함께 성장하고 함께 성공하는", color: "bg-pink-500" },
  { id: 7, title: "책임감과 열정", description: "자신의 역할에 최선을 다하는", color: "bg-indigo-500" }
];

export default function TitleAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 스크롤에 따른 다양한 애니메이션 효과
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  


  // 각 글자별 애니메이션
  const letters = "Work with us.".split('');

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[130vh] bg-white overflow-hidden flex flex-col items-center justify-center py-20"
    >

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
              style={{fontFamily:'Istok Web'}}
              initial={{ 
                opacity: 0, 
                y: 20, 
                scale: 0.95
              }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1
              }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

                 {/* 서브 타이틀 */}
         <motion.div
           className="mt-6 sm:mt-8 lg:mt-10"
           initial={{ opacity: 0, y: 20, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.6, delay: 1.2 }}
         >
           <motion.p 
             className="text-base sm:text-lg lg:text-xl text-black font-bold"
             style={{fontFamily:'Istok Web'}}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 1.5 }}
             whileHover={{
               scale: 1.05,
               color: "#3B82F6",
               transition: { duration: 0.3 }
             }}
           >
           </motion.p>
         </motion.div>
      </motion.div>

      {/* 3D 캐러셀 - 타이틀 바로 아래 */}
      <motion.div
        className="mt-32 sm:mt-40 lg:mt-48 mb-10 sm:mb-30 lg:mb-38"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        <Carousel3D items={carouselItems} />
      </motion.div>




    </div>
  );
} 