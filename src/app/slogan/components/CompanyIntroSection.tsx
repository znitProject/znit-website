'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CompanyIntroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const sentences = [
    {
      text: "우리는 하나의 일을 깊이 있게, 꾸준히 해온 팀입니다.",
      color: "text-blue-300"
    },
    {
      text: "흐름에 휩쓸리지 않고, 방향을 스스로 정하며 주체적으로 움직입니다.",
      color: "text-purple-300"
    },
    {
      text: "변화에 앞서 준비하고, 새로움 속에서도 중심을 지킵니다.",
      color: "text-green-300"
    },
    {
      text: "디자인은 우리의 언어이며, 완성도는 우리의 자존심입니다.",
      color: "text-red-300"
    },
    {
      text: "오래도록, 멀리 보며, 제대로 만들어가는 팀.",
      color: "text-indigo-300"
    },
    {
      text: "우리는 그렇게 일합니다.",
      color: "text-teal-300"
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[200vh] bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 py-20"
    >
      {/* 첫 번째 섹션 */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-blue-300 leading-tight">
            <span className="block">This is our</span>
            <span className="block">way of working.</span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-blue-200 leading-tight">
            <span className="block">우리는</span>
            <span className="block">이렇게 일합니다.</span>
          </h2>

        </div>
      </div>

      {/* 문장들 - 지그재그로 배치 */}
      <div className="relative">
        {sentences.map((sentence, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                x: isEven ? -50 : 50,
                y: 20
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.2
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`py-16 flex items-center justify-center px-8 ${
                isEven ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className={`${sentence.color} text-center max-w-4xl`}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed">
                  {sentence.text}
                </h2>
              </div>
            </motion.div>
          );
        })}
      </div>



      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-300/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
      </div>
    </section>
  );
};

export default CompanyIntroSection; 