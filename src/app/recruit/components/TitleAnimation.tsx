'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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
  const blur = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [5, 0, 0, 5]);

  // 각 글자별 애니메이션
  const letters = "Work with us.".split('');

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center"
    >

      {/* 메인 타이틀 */}
      <motion.div
        className="relative z-10 text-center"
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
               whileInView={{ 
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
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.6, delay: 1.2 }}
         >
           <motion.p 
             className="text-base sm:text-lg lg:text-xl text-black font-bold"
             style={{fontFamily:'Istok Web'}}
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 1.5 }}
             whileHover={{
               scale: 1.05,
               color: "#3B82F6",
               transition: { duration: 0.3 }
             }}
           >
             ZNIT가 바라는 인재상
           </motion.p>
         </motion.div>
      </motion.div>




    </div>
  );
} 